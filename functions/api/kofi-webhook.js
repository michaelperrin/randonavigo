const GITHUB_API = "https://api.github.com";
const TESTIMONIALS_PATH = "src/data/testimonials.json";

export async function onRequestPost(context) {
  const { request, env } = context;

  // Parse form-urlencoded body sent by Ko-Fi
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return new Response("Invalid request body", { status: 400 });
  }

  const raw = formData.get("data");
  if (!raw) {
    return new Response("Missing data field", { status: 400 });
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("Invalid JSON in data field", { status: 400 });
  }

  // Verify the Ko-Fi token
  const expectedToken = env.KOFI_VERIFICATION_TOKEN;
  if (!expectedToken || payload.verification_token !== expectedToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Only process donations with a public message
  if (!payload.is_public) {
    return new Response("Private donation, skipping", { status: 200 });
  }
  if (!payload.message || payload.message.trim() === "") {
    return new Response("No message, skipping", { status: 200 });
  }

  const newTestimonial = {
    name: payload.from_name || "Anonyme",
    message: payload.message.trim(),
    date: payload.timestamp
      ? payload.timestamp.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  };

  // Update testimonials.json via GitHub API
  try {
    await updateTestimonialsJson(env, newTestimonial);
  } catch (err) {
    console.error("Failed to update testimonials.json:", err);
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}

async function updateTestimonialsJson(env, newTestimonial) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = env;
  const branch = GITHUB_BRANCH || "main";
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "randonavigo-kofi-webhook",
  };

  // Fetch the current file (to get its SHA and content)
  const getUrl = `${GITHUB_API}/repos/${GITHUB_REPO}/contents/${TESTIMONIALS_PATH}?ref=${branch}`;
  const getRes = await fetch(getUrl, { headers });

  if (!getRes.ok) {
    const text = await getRes.text();
    throw new Error(`GitHub GET failed (${getRes.status}): ${text}`);
  }

  const fileData = await getRes.json();
  const sha = fileData.sha;
  const existingContent = JSON.parse(
    atob(fileData.content.replace(/\n/g, ""))
  );

  // Prepend the new testimonial
  const updatedContent = [newTestimonial, ...existingContent];
  const encodedContent = btoa(
    unescape(encodeURIComponent(JSON.stringify(updatedContent, null, 2)))
  );

  // Commit the updated file
  const putUrl = `${GITHUB_API}/repos/${GITHUB_REPO}/contents/${TESTIMONIALS_PATH}`;
  const putRes = await fetch(putUrl, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `feat: add Ko-Fi testimonial from ${newTestimonial.name}`,
      content: encodedContent,
      sha,
      branch,
    }),
  });

  if (!putRes.ok) {
    const text = await putRes.text();
    throw new Error(`GitHub PUT failed (${putRes.status}): ${text}`);
  }
}
