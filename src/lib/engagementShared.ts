import type { ReactionType } from "../db/schema";
import { REACTION_TYPES } from "../db/schema";

export const SESSION_COOKIE = "rn_session";

export const MAX_COMMENT_LEN = 2000;
export const MAX_AUTHOR_LEN = 80;

export function isValidRouteKey(key: string | null): key is string {
  if (!key || key.length > 200) return false;
  return /^\d{4}\/\d{2}\/\d{2}\/[^/]+$/.test(key);
}

export function sanitizeComment(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim().slice(0, MAX_COMMENT_LEN);
}

export function sanitizeAuthor(name: string): string {
  const t = name.replace(/<[^>]*>/g, "").trim().slice(0, MAX_AUTHOR_LEN);
  return t.length > 0 ? t : "Randonneur";
}

export function normalizeAuthorName(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function isReservedAuthorName(
  rawName: string,
  displayName: string,
): boolean {
  const normalized = normalizeAuthorName(rawName);
  if (!normalized) return false;
  const normDisplay = normalizeAuthorName(displayName);
  return !!normDisplay && normalized === normDisplay;
}

export function isReactionType(t: string): t is ReactionType {
  return (REACTION_TYPES as readonly string[]).includes(t);
}

export function emptyReactionCounts(): Record<ReactionType, number> {
  return { inspire: 0, prepare: 0, done: 0 };
}

export function emptyReactionActive(): Record<ReactionType, boolean> {
  return { inspire: false, prepare: false, done: false };
}
