import type { APIRoute } from 'astro';
import { drizzle } from 'drizzle-orm/d1';
import { getDB } from '~/db/context';
import { comments } from '~/db/schema';

export const prerender = false;

// POST /api/comments  body: { slug, authorName, content }
export const POST: APIRoute = async ({ request }) => {
  const db = drizzle(getDB());

  let body: { slug?: string; authorName?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { slug, authorName, content } = body;

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });
  }
  if (!authorName || authorName.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'Le prénom est obligatoire.' }), { status: 422 });
  }
  if (!content || content.trim().length < 10) {
    return new Response(
      JSON.stringify({ error: 'Le commentaire doit faire au moins 10 caractères.' }),
      { status: 422 },
    );
  }
  if (content.trim().length > 500) {
    return new Response(
      JSON.stringify({ error: 'Le commentaire ne peut pas dépasser 500 caractères.' }),
      { status: 422 },
    );
  }

  await db.insert(comments).values({
    routeSlug: slug,
    authorName: authorName.trim(),
    content: content.trim(),
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
