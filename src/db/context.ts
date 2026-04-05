import { AsyncLocalStorage } from 'node:async_hooks';

// AsyncLocalStorage allows each request to carry its own D1 binding reference,
// even across await boundaries and concurrent requests in miniflare local dev.
const dbContext = new AsyncLocalStorage<D1Database>();

export function runWithDB<T>(db: D1Database, fn: () => T): T {
  return dbContext.run(db, fn);
}

export function getDB(): D1Database {
  const db = dbContext.getStore();
  if (!db) throw new Error('No D1 database in async context. Did the middleware run?');
  return db;
}
