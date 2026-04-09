import { parse, serialize } from "cookie";
import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../src/db/schema";
import {
  isValidRouteKey,
  sanitizeAuthor,
  sanitizeComment,
  SESSION_COOKIE,
} from "../../src/lib/engagementShared";

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
  }));

  return json({ comments });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const url = new URL(context.request.url);
  const session = getSession(context.request, url);

  let body: { routeKey?: string; authorName?: string; content?: string };
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

  const authorName = sanitizeAuthor(
    typeof body.authorName === "string" ? body.authorName : "",
  );

  const db = drizzle(context.env.DB, { schema });
  await db.insert(schema.comments).values({
    routeSlug: routeKey,
    authorName,
    content,
    isApproved: true,
  });

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
