import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const REACTION_TYPES = ["inspire", "prepare", "done"] as const;
export type ReactionType = (typeof REACTION_TYPES)[number];

export const comments = sqliteTable(
  "comments",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    routeSlug: text("route_slug").notNull(),
    authorName: text("author_name").notNull().default("Randonneur"),
    content: text("content").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    isApproved: integer("is_approved", { mode: "boolean" }).notNull().default(true),
  },
  (t) => [index("comments_route_slug_idx").on(t.routeSlug)],
);

export const reactions = sqliteTable(
  "reactions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    routeSlug: text("route_slug").notNull(),
    type: text("type").notNull(),
    sessionId: text("session_id").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("reactions_route_slug_idx").on(t.routeSlug),
    uniqueIndex("reactions_route_session_type_uidx").on(
      t.routeSlug,
      t.sessionId,
      t.type,
    ),
  ],
);
