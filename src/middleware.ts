import { defineMiddleware } from 'astro:middleware';
import { env } from 'cloudflare:workers';
import { runWithDB } from '~/db/context';

// Capture env.DB synchronously at request start and store it in AsyncLocalStorage.
// This ensures each request uses its own D1 binding, even across await boundaries
// and when miniflare processes concurrent requests.
export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname.startsWith('/api/')) {
    return runWithDB(env.DB, () => next());
  }
  return next();
});
