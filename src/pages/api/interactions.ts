import type { APIRoute } from 'astro';
import { drizzle } from 'drizzle-orm/d1';
import { getDB } from '~/db/context';
import { comments } from '~/db/schema';
import { reactions } from '~/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

export const prerender = false;

function getSessionId(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie') ?? '';
  const match = cookieHeader.match(/(?:^|;\s*)session_id=([^;]+)/);
  return match ? match[1] : null;
}

// GET /api/interactions?slug=xxx
// Returns both reactions and comments in a single request to avoid concurrent D1 access
export const GET: APIRoute = async ({ request }) => {
  try {
  const db = drizzle(getDB());
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });
  }

  const sessionId = getSessionId(request);

  // Fetch reaction counts
  const reactionCounts = await db
    .select({
      type: reactions.type,
      count: sql<number>`count(*)`.as('count'),
    })
    .from(reactions)
    .where(eq(reactions.routeSlug, slug))
    .groupBy(reactions.type);

  // Fetch active reactions for this session
  let activeReactions: string[] = [];
  if (sessionId) {
    const sessionRows = await db
      .select({ type: reactions.type })
      .from(reactions)
      .where(and(eq(reactions.routeSlug, slug), eq(reactions.sessionId, sessionId)));
    activeReactions = sessionRows.map((r) => r.type);
  }

  const counts = {
    inspire: 0,
    prepare: 0,
    done: 0,
    ...Object.fromEntries(reactionCounts.map((c) => [c.type, c.count])),
  };

  // Fetch approved comments
  const commentRows = await db
    .select()
    .from(comments)
    .where(and(eq(comments.routeSlug, slug), eq(comments.isApproved, true)))
    .orderBy(desc(comments.createdAt));

  const serializedComments = commentRows.map((row) => ({
    id: row.id,
    authorName: row.authorName,
    content: row.content,
    createdAt: row.createdAt instanceof Date
      ? row.createdAt.toISOString()
      : new Date(Number(row.createdAt) * 1000).toISOString(),
  }));

  return new Response(
    JSON.stringify({
      reactions: { counts, activeReactions },
      comments: serializedComments,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
