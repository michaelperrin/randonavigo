import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void },
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? "";

type ReactionType = "inspire" | "prepare" | "done";

type CommentRow = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
};

const REACTIONS: {
  type: ReactionType;
  label: string;
  emoji: string;
}[] = [
  { type: "inspire", label: "Ça donne envie", emoji: "✨" },
  { type: "done", label: "J’y suis allé(e)", emoji: "🥾" },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function HikeEngagement({ routeKey }: { routeKey: string }) {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [counts, setCounts] = useState<Record<ReactionType, number>>({
    inspire: 0,
    prepare: 0,
    done: 0,
  });
  const [active, setActive] = useState<Record<ReactionType, boolean>>({
    inspire: false,
    prepare: false,
    done: false,
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || document.querySelector("script[src*='turnstile']")) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      if (turnstileRef.current && window.turnstile) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  const q = encodeURIComponent(routeKey);

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const [rRes, cRes] = await Promise.all([
        fetch(`/api/reactions?routeKey=${q}`, { credentials: "same-origin" }),
        fetch(`/api/comments?routeKey=${q}`, { credentials: "same-origin" }),
      ]);
      if (!rRes.ok) {
        const j = await rRes.json().catch(() => ({}));
        throw new Error((j as { error?: string }).error ?? rRes.statusText);
      }
      if (!cRes.ok) {
        const j = await cRes.json().catch(() => ({}));
        throw new Error((j as { error?: string }).error ?? cRes.statusText);
      }
      const rJson = (await rRes.json()) as {
        counts: Record<ReactionType, number>;
        active: Record<ReactionType, boolean>;
      };
      const cJson = (await cRes.json()) as { comments: CommentRow[] };
      setCounts(rJson.counts);
      setActive(rJson.active);
      setComments(cJson.comments);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Chargement impossible");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggleReaction(type: ReactionType) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ routeKey, type }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((j as { error?: string }).error ?? res.statusText);
      }
      setCounts((j as { counts: Record<ReactionType, number> }).counts);
      setActive((j as { active: Record<ReactionType, boolean> }).active);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Erreur");
    }
  }

  async function sendComment(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          routeKey,
          authorName: authorName.trim() || undefined,
          content: content.trim(),
          turnstileToken,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((j as { error?: string }).error ?? res.statusText);
      }
      setContent("");
      setShowThankYou(true);
      setTurnstileToken("");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
      await load();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="not-prose font-sans text-stone-800 border-t border-gray-200 pt-10 mt-10"
      aria-labelledby="hike-engagement-title"
    >
      <h2
        id="hike-engagement-title"
        className="font-condensed text-center text-xl font-semibold tracking-tight text-stone-900 md:text-2xl"
      >
        Un mot sur cette randonnée ?
      </h2>

<div className="mt-6 flex flex-wrap justify-center gap-3">
        {REACTIONS.map(({ type, label, emoji }) => {
          const on = active[type];
          return (
            <button
              key={type}
              type="button"
              onClick={() => void toggleReaction(type)}
              className={`inline-flex min-w-30 cursor-pointer flex-col items-center gap-1 rounded-lg border px-3 py-2 text-sm transition ${
                on
                  ? "border-softblue bg-softblue/10 text-softblue-dark"
                  : "border-stone-200 bg-stone-50/80 text-stone-700 hover:border-stone-300"
              }`}
            >
              <span className="text-lg" aria-hidden>
                {emoji}
              </span>
              <span className="font-medium leading-tight">{label}</span>
              <span className="text-xs tabular-nums text-stone-500">
                {counts[type] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <div className="mb-4">
          <h3 className="font-condensed text-lg font-semibold text-stone-900">
            Commentaires
            {!loading && (
              <span className="ml-2 font-normal text-stone-500">
                ({comments.length})
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-stone-500">
            Des conseils, un retour d'expérience sur cette randonnée ? Les commentaires sont là pour ça.{" "}
            Vous pouvez aussi{" "}
            <a
              href="https://ko-fi.com/W7W46TRZ2"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-stone-700"
            >
              soutenir le site sur Ko-fi
            </a>{" "}
            si vous avez apprécié !
          </p>
        </div>

        <form onSubmit={(e) => void sendComment(e)} className="space-y-3">
          <label className="block">
            <span className="sr-only">Pseudo</span>
            <input
              type="text"
              name="author"
              placeholder="Votre prénom ou pseudo (optionnel)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength={80}
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:border-softblue focus:outline-none focus:ring-1 focus:ring-softblue"
              autoComplete="nickname"
            />
          </label>
          <label className="block">
            <span className="sr-only">Commentaire</span>
            <textarea
              name="content"
              required
              rows={4}
              placeholder="Votre message…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={2000}
              className="w-full resize-y rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:border-softblue focus:outline-none focus:ring-1 focus:ring-softblue"
            />
          </label>
          {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="mt-1" />}
          {submitError && (
            <p className="text-sm text-red-700" role="alert">
              {submitError}
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !content.trim() || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
              className="rounded-lg bg-softblue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Envoi…" : "Publier"}
            </button>
          </div>
        </form>

        {showThankYou && (
          <div className="mt-6 rounded-lg bg-stone-50 border border-stone-200 px-4 py-4 text-sm text-stone-700">
            <p>
              Merci pour votre retour ! RandoNavigo est 100% gratuit et sans pub.
              Si cette randonnée vous a plu, vous pouvez soutenir le projet en m'offrant un café.
            </p>
            <a
              href="https://ko-fi.com/W7W46TRZ2"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-stone-400 bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-300"
            >
              <span>☕</span> Soutenir sur Ko-fi
            </a>
          </div>
        )}

        {loading && (
          <p className="mt-6 text-sm text-stone-500">Chargement…</p>
        )}
        {loadError && (
          <p className="mt-6 text-sm text-red-700" role="alert">
            {loadError}
          </p>
        )}

        {!loading && comments.length > 0 && (
          <ul className="mt-6 space-y-4">
            {comments.map((c) => (
              <li
                key={c.id}
                className="rounded-lg border border-stone-100 bg-stone-50/50 px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="font-semibold text-stone-900">
                    {c.authorName}
                  </span>
                  <time
                    className="text-xs text-stone-500"
                    dateTime={c.createdAt}
                  >
                    {formatDate(c.createdAt)}
                  </time>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-800">
                  {c.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
