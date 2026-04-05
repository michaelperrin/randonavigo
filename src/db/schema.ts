import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ==========================================
// TABLE 1 : LES COMMENTAIRES
// ==========================================
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  routeSlug: text('route_slug').notNull(),
  authorName: text('author_name').notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  isApproved: integer('is_approved', { mode: 'boolean' }).notNull().default(true),
});

// ==========================================
// TABLE 2 : LES RÉACTIONS
// ==========================================
export const reactions = sqliteTable('reactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  routeSlug: text('route_slug').notNull(),
  type: text('type', { enum: ['inspire', 'prepare', 'done'] }).notNull(),
  sessionId: text('session_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});
