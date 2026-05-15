import { parse, serialize } from "cookie";
import { and, desc, eq, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../src/db/schema";
import {
  isReservedAuthorName,
  isValidRouteKey,
  sanitizeAuthor,
  sanitizeComment,
  SESSION_COOKIE,
} from "../../src/lib/engagementShared";

const DEFAULT_AUTHOR_DISPLAY_NAME = "RandoNavigo";

function resolveAuthorIdentity(
  rawName: string,
  env: { AUTHOR_SECRET_NAME?: string; AUTHOR_DISPLAY_NAME?: string },
): { authorName: string; isAuthor: boolean } {
  const trimmed = rawName.trim();
  if (env.AUTHOR_SECRET_NAME && trimmed === env.AUTHOR_SECRET_NAME) {
    return {
      authorName: env.AUTHOR_DISPLAY_NAME ?? DEFAULT_AUTHOR_DISPLAY_NAME,
      isAuthor: true,
    };
  }
  return { authorName: sanitizeAuthor(rawName), isAuthor: false };
}

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { ...init, headers });
}

function getSession(request: Request, url: URL): { id: string; setCookie?: string } {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  let id = cookies[SESSION_COOKIE];
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    id = crypto.randomUUID();
    const secure = url.protocol === "https:";
    return {
      id,
      setCookie: serialize(SESSION_COOKIE, id, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 400,
        secure,
      }),
    };
  }
  return { id };
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const url = new URL(context.request.url);
  const routeKey = url.searchParams.get("routeKey");
  if (!isValidRouteKey(routeKey)) {
    return json({ error: "routeKey invalide" }, { status: 400 });
  }

  const db = drizzle(context.env.DB, { schema });
  const rows = await db
    .select({
      id: schema.comments.id,
      authorName: schema.comments.authorName,
      content: schema.comments.content,
      createdAt: schema.comments.createdAt,
      parentId: schema.comments.parentId,
      isAuthor: schema.comments.isAuthor,
    })
    .from(schema.comments)
    .where(
      and(
        eq(schema.comments.routeSlug, routeKey),
        eq(schema.comments.isApproved, true),
      ),
    )
    .orderBy(desc(schema.comments.createdAt))
    .limit(200);

  const comments = rows.map((r) => ({
    id: r.id,
    authorName: r.authorName,
    content: r.content,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
    parentId: r.parentId,
    isAuthor: r.isAuthor,
  }));

  return json({ comments });
}

type ExtendedEnv = Env & {
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  AUTHOR_SECRET_NAME?: string;
  AUTHOR_DISPLAY_NAME?: string;
};

async function notifyNewComment(
  env: ExtendedEnv,
  routeKey: string,
  authorName: string,
  content: string,
  parentId: number | null,
) {
  if (!env.RESEND_API_KEY || !env.NOTIFICATION_EMAIL) return;
  const kind = parentId !== null ? "Nouvelle réponse" : "Nouveau commentaire";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RandoNavigo <notifications@randonavigo.fr>",
        to: [env.NOTIFICATION_EMAIL],
        subject: `${kind} — ${routeKey}`,
        html: `<p><strong>Randonnée :</strong> <a href="https://www.randonavigo.fr/${routeKey}">https://www.randonavigo.fr/${routeKey}</a></p><p><strong>Auteur :</strong> ${authorName || "Anonyme"}</p>${parentId !== null ? `<p><strong>Réponse au commentaire #${parentId}</strong></p>` : ""}<p><strong>Message :</strong></p><p>${content.replace(/\n/g, "<br>")}</p>`,
      }),
    });
  } catch {
    // Silently ignore — email notification is best-effort
  }
}

export async function onRequestPost(context: {
  request: Request;
  env: ExtendedEnv;
  waitUntil: (promise: Promise<unknown>) => void;
}): Promise<Response> {
  const url = new URL(context.request.url);
  const session = getSession(context.request, url);

  let body: {
    routeKey?: string;
    authorName?: string;
    content?: string;
    turnstileToken?: string;
    parentId?: unknown;
  };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "JSON invalide" }, { status: 400 });
  }

  const routeKey = typeof body.routeKey === "string" ? body.routeKey : "";
  if (!isValidRouteKey(routeKey)) {
    return json({ error: "routeKey invalide" }, { status: 400 });
  }

  const content = sanitizeComment(
    typeof body.content === "string" ? body.content : "",
  );
  if (content.length === 0) {
    return json({ error: "Message vide" }, { status: 400 });
  }

  const rawAuthorName = typeof body.authorName === "string" ? body.authorName : "";
  const { authorName, isAuthor } = resolveAuthorIdentity(
    rawAuthorName,
    context.env,
  );

  if (!isAuthor) {
    const displayName =
      context.env.AUTHOR_DISPLAY_NAME ?? DEFAULT_AUTHOR_DISPLAY_NAME;
    if (isReservedAuthorName(rawAuthorName, displayName)) {
      return json({ error: "Ce pseudo est réservé" }, { status: 400 });
    }
  }

  let parsedParentId: number | null = null;
  if (body.parentId !== undefined && body.parentId !== null) {
    if (
      typeof body.parentId !== "number" ||
      !Number.isInteger(body.parentId) ||
      body.parentId <= 0
    ) {
      return json({ error: "parentId invalide" }, { status: 400 });
    }
    parsedParentId = body.parentId;
  }

  if (context.env.TURNSTILE_SECRET_KEY) {
    const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: context.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: context.request.headers.get("CF-Connecting-IP") ?? "",
      }),
    });
    const verifyJson = (await verifyRes.json()) as { success: boolean };
    if (!verifyJson.success) {
      return json({ error: "Vérification anti-spam échouée" }, { status: 403 });
    }
  }

  const db = drizzle(context.env.DB, { schema });

  let parentId: number | null = null;
  if (parsedParentId !== null) {
    const parentRows = await db
      .select({ id: schema.comments.id })
      .from(schema.comments)
      .where(
        and(
          eq(schema.comments.id, parsedParentId),
          eq(schema.comments.routeSlug, routeKey),
          eq(schema.comments.isApproved, true),
          isNull(schema.comments.parentId),
        ),
      )
      .limit(1);
    if (parentRows.length === 0) {
      return json({ error: "Commentaire parent introuvable" }, { status: 400 });
    }
    parentId = parsedParentId;
  }

  await db.insert(schema.comments).values({
    routeSlug: routeKey,
    authorName,
    content,
    isApproved: true,
    parentId,
    isAuthor,
  });

  if (!isAuthor) {
    context.waitUntil(
      notifyNewComment(context.env, routeKey, authorName, content, parentId),
    );
  }

  const headers = new Headers();
  if (session.setCookie) {
    headers.append("Set-Cookie", session.setCookie);
  }

  return json(
    { ok: true },
    {
      status: 201,
      headers,
    },
  );
}
