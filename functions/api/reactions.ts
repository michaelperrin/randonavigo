import { parse, serialize } from "cookie";
import { and, count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../src/db/schema";
import {
  emptyReactionActive,
  emptyReactionCounts,
  isReactionType,
  isValidRouteKey,
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

  const session = getSession(context.request, url);
  const db = drizzle(context.env.DB, { schema });

  const countRows = await db
    .select({ type: schema.reactions.type, n: count() })
    .from(schema.reactions)
    .where(eq(schema.reactions.routeSlug, routeKey))
    .groupBy(schema.reactions.type);

  const counts = emptyReactionCounts();
  for (const row of countRows) {
    if (isReactionType(row.type)) {
      counts[row.type] = Number(row.n);
    }
  }

  const active = emptyReactionActive();
  const mine = await db
    .select({ type: schema.reactions.type })
    .from(schema.reactions)
    .where(
      and(
        eq(schema.reactions.routeSlug, routeKey),
        eq(schema.reactions.sessionId, session.id),
      ),
    );

  for (const row of mine) {
    if (isReactionType(row.type)) {
      active[row.type] = true;
    }
  }

  const headers = new Headers();
  if (session.setCookie) {
    headers.append("Set-Cookie", session.setCookie);
  }

  return json({ counts, active }, { headers });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const url = new URL(context.request.url);
  const session = getSession(context.request, url);

  let body: { routeKey?: string; type?: string };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "JSON invalide" }, { status: 400 });
  }

  const routeKey = typeof body.routeKey === "string" ? body.routeKey : "";
  if (!isValidRouteKey(routeKey)) {
    return json({ error: "routeKey invalide" }, { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : "";
  if (!isReactionType(type)) {
    return json({ error: "type invalide" }, { status: 400 });
  }

  const db = drizzle(context.env.DB, { schema });

  const existingRows = await db
    .select({ id: schema.reactions.id })
    .from(schema.reactions)
    .where(
      and(
        eq(schema.reactions.routeSlug, routeKey),
        eq(schema.reactions.sessionId, session.id),
        eq(schema.reactions.type, type),
      ),
    )
    .limit(1);
  const existing = existingRows[0];

  if (existing) {
    await db
      .delete(schema.reactions)
      .where(eq(schema.reactions.id, existing.id));
  } else {
    await db.insert(schema.reactions).values({
      routeSlug: routeKey,
      sessionId: session.id,
      type,
    });
  }

  const countRows = await db
    .select({ type: schema.reactions.type, n: count() })
    .from(schema.reactions)
    .where(eq(schema.reactions.routeSlug, routeKey))
    .groupBy(schema.reactions.type);

  const counts = emptyReactionCounts();
  for (const row of countRows) {
    if (isReactionType(row.type)) {
      counts[row.type] = Number(row.n);
    }
  }

  const active = emptyReactionActive();
  const mine = await db
    .select({ type: schema.reactions.type })
    .from(schema.reactions)
    .where(
      and(
        eq(schema.reactions.routeSlug, routeKey),
        eq(schema.reactions.sessionId, session.id),
      ),
    );

  for (const row of mine) {
    if (isReactionType(row.type)) {
      active[row.type] = true;
    }
  }

  const headers = new Headers();
  if (session.setCookie) {
    headers.append("Set-Cookie", session.setCookie);
  }

  return json({ counts, active }, { headers });
}
