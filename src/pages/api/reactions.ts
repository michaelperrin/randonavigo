import type { APIRoute } from 'astro';
import { drizzle } from 'drizzle-orm/d1';
import { getDB } from '~/db/context';
import { reactions } from '~/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export const prerender = false;

const REACTION_TYPES = ['inspire', 'prepare', 'done'] as const;
type ReactionType = (typeof REACTION_TYPES)[number];

function getSessionId(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie') ?? '';
  const match = cookieHeader.match(/(?:^|;\s*)session_id=([^;]+)/);
  return match ? match[1] : null;
}

// POST /api/reactions  body: { slug, type }
export const POST: APIRoute = async ({ request }) => {
  const db = drizzle(getDB());

  let body: { slug?: string; type?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { slug, type } = body;

  if (!slug || !type || !REACTION_TYPES.includes(type as ReactionType)) {
    return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
  }

  let sessionId = getSessionId(request);
  const isNewSession = !sessionId;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
  }

  const existing = await db
    .select({ id: reactions.id })
    .from(reactions)
    .where(
      and(
        eq(reactions.routeSlug, slug),
        eq(reactions.type, type as ReactionType),
        eq(reactions.sessionId, sessionId),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(reactions)
      .where(
        and(
          eq(reactions.routeSlug, slug),
          eq(reactions.type, type as ReactionType),
          eq(reactions.sessionId, sessionId),
        ),
      );
  } else {
    await db.insert(reactions).values({
      routeSlug: slug,
      type: type as ReactionType,
      sessionId,
    });
  }

  const counts = await db
    .select({
      type: reactions.type,
      count: sql<number>`count(*)`.as('count'),
    })
    .from(reactions)
    .where(eq(reactions.routeSlug, slug))
    .groupBy(reactions.type);

  const allSessionReactions = await db
    .select({ type: reactions.type })
    .from(reactions)
    .where(and(eq(reactions.routeSlug, slug), eq(reactions.sessionId, sessionId)));

  const result = {
    inspire: 0,
    prepare: 0,
    done: 0,
    ...Object.fromEntries(counts.map((c) => [c.type, c.count])),
  };

  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (isNewSession) {
    headers.append(
      'Set-Cookie',
      `session_id=${sessionId}; HttpOnly; SameSite=Lax; Max-Age=31536000; Path=/`,
    );
  }

  return new Response(
    JSON.stringify({
      counts: result,
      activeReactions: allSessionReactions.map((r) => r.type),
    }),
    { headers },
  );
};
