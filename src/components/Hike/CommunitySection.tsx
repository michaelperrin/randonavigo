import { useState, useEffect } from 'react';

// ==========================================
// Types
// ==========================================

type ReactionType = 'inspire' | 'prepare' | 'done';

interface ReactionConfig {
  type: ReactionType;
  emoji: string;
  label: string;
}

interface Counts {
  inspire: number;
  prepare: number;
  done: number;
}

interface Comment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

interface Props {
  slug: string;
}

const REACTIONS: ReactionConfig[] = [
  { type: 'inspire', emoji: '🌿', label: "Ça m'inspire" },
  { type: 'prepare', emoji: '🎒', label: 'Je la prépare' },
  { type: 'done', emoji: '🏅', label: "Je l'ai faite !" },
];

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ==========================================
// Reactions sub-component
// ==========================================

function ReactionButtons({
  slug,
  counts,
  activeReactions,
  onUpdate,
  loaded,
}: {
  slug: string;
  counts: Counts;
  activeReactions: ReactionType[];
  onUpdate: (counts: Counts, active: ReactionType[]) => void;
  loaded: boolean;
}) {
  const [pending, setPending] = useState<ReactionType | null>(null);

  const handleReaction = async (type: ReactionType) => {
    if (pending) return;
    setPending(type);

    const wasActive = activeReactions.includes(type);

    // Optimistic update
    onUpdate(
      { ...counts, [type]: wasActive ? Math.max(0, counts[type] - 1) : counts[type] + 1 },
      wasActive ? activeReactions.filter((t) => t !== type) : [...activeReactions, type],
    );

    try {
      const res = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type }),
      });
      const data = await res.json();
      onUpdate(data.counts, data.activeReactions);
    } catch {
      // Revert
      onUpdate(
        { ...counts, [type]: wasActive ? counts[type] + 1 : Math.max(0, counts[type] - 1) },
        wasActive ? [...activeReactions, type] : activeReactions.filter((t) => t !== type),
      );
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {REACTIONS.map(({ type, emoji, label }) => {
        const isActive = activeReactions.includes(type);
        const count = counts[type];

        return (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            disabled={pending !== null}
            aria-pressed={isActive}
            className={[
              'flex items-center gap-2 px-4 py-2.5 rounded-full font-sans-serif text-sm font-medium',
              'border transition-all duration-200 cursor-pointer',
              isActive
                ? 'bg-amber-700 text-white border-amber-700 shadow-sm scale-105'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300',
              pending === type ? 'opacity-70 cursor-wait' : '',
              !loaded ? 'opacity-0' : 'opacity-100',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="text-base leading-none">{emoji}</span>
            <span>{label}</span>
            {loaded && (count > 0 || isActive) && (
              <span
                className={[
                  'text-xs font-bold ml-0.5 px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center',
                  isActive ? 'bg-amber-800/50 text-amber-100' : 'bg-stone-200 text-stone-600',
                ].join(' ')}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ==========================================
// Comments sub-component
// ==========================================

function CommentsList({
  slug,
  commentsList,
  loading,
  onCommentAdded,
}: {
  slug: string;
  commentsList: Comment[];
  loading: boolean;
  onCommentAdded: (comment: Comment) => void;
}) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authorName.trim().length === 0) {
      setError('Le prénom est obligatoire.');
      return;
    }
    if (content.trim().length < 10) {
      setError('Le commentaire doit faire au moins 10 caractères.');
      return;
    }
    if (content.trim().length > 500) {
      setError('Le commentaire ne peut pas dépasser 500 caractères.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          authorName: authorName.trim(),
          content: content.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Une erreur est survenue.');
        return;
      }

      onCommentAdded({
        id: Date.now(),
        authorName: authorName.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
      setContent('');
      setAuthorName('');
    } catch {
      setError('Une erreur réseau est survenue. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  const charCount = content.length;
  const isOverLimit = charCount > 500;
  const isUnderMin = charCount > 0 && charCount < 10;
  const commentCount = commentsList.length;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="font-condensed text-2xl font-bold text-stone-800">
          {loading
            ? '—'
            : commentCount === 0
              ? 'Aucun commentaire'
              : commentCount === 1
                ? '1 commentaire'
                : `${commentCount} commentaires`}
        </span>
      </div>

      {!loading && commentsList.length > 0 && (
        <ul className="flex flex-col divide-y divide-stone-100 mb-8">
          {commentsList.map((comment) => (
            <li key={comment.id} className="py-5 first:pt-0">
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="font-sans-serif font-semibold text-stone-800 text-sm">
                  {comment.authorName}
                </span>
                <time className="text-stone-400 text-xs font-sans-serif">
                  {formatDate(comment.createdAt)}
                </time>
              </div>
              <p className="font-serif text-stone-700 text-base leading-relaxed mt-1.5">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!loading && commentsList.length === 0 && !success && (
        <p className="text-stone-400 text-sm font-sans-serif italic mb-8">
          Pas encore de commentaires. Partagez votre expérience !
        </p>
      )}

      {success ? (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-stone-700 font-sans-serif text-sm flex items-center gap-2">
          <span className="text-green-600 font-bold text-base">✓</span>
          Merci pour votre commentaire, il est maintenant visible !
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor={`comment-name-${slug}`}
              className="block font-sans-serif text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1.5"
            >
              Votre prénom
            </label>
            <input
              id={`comment-name-${slug}`}
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              maxLength={60}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 font-sans-serif text-sm text-stone-800 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-shadow"
            />
          </div>

          <div>
            <label
              htmlFor={`comment-content-${slug}`}
              className="block font-sans-serif text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1.5"
            >
              Votre commentaire
            </label>
            <textarea
              id={`comment-content-${slug}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Partagez votre expérience de cette randonnée…"
              className={[
                'w-full border rounded-lg px-3 py-2.5 font-serif text-sm text-stone-800 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-shadow',
                isOverLimit
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-stone-200 focus:ring-amber-600',
              ].join(' ')}
            />
            <div
              className={[
                'text-right text-xs mt-1 font-sans-serif tabular-nums',
                isOverLimit ? 'text-red-500 font-semibold' : 'text-stone-400',
              ].join(' ')}
            >
              {charCount} / 500
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm font-sans-serif bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || isOverLimit || charCount === 0 || authorName.trim().length === 0}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white text-sm font-sans-serif font-semibold uppercase tracking-wide py-3 px-4 rounded-lg transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          >
            {submitting ? 'Envoi en cours…' : 'Publier le commentaire'}
          </button>
        </form>
      )}
    </div>
  );
}

// ==========================================
// Main component — single fetch on mount
// ==========================================

export default function CommunitySection({ slug }: Props) {
  const [counts, setCounts] = useState<Counts>({ inspire: 0, prepare: 0, done: 0 });
  const [activeReactions, setActiveReactions] = useState<ReactionType[]>([]);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/interactions?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        setCounts(data.reactions.counts);
        setActiveReactions(data.reactions.activeReactions);
        setCommentsList(data.comments ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [slug]);

  return (
    <>
      <div className="mb-10">
        <p className="font-sans-serif text-xs font-semibold uppercase tracking-wide text-stone-500 mb-3">
          Cette randonnée vous parle ?
        </p>
        <ReactionButtons
          slug={slug}
          counts={counts}
          activeReactions={activeReactions}
          loaded={loaded}
          onUpdate={(newCounts, newActive) => {
            setCounts(newCounts);
            setActiveReactions(newActive);
          }}
        />
      </div>

      <div>
        <CommentsList
          slug={slug}
          commentsList={commentsList}
          loading={!loaded}
          onCommentAdded={(comment) => setCommentsList((prev) => [comment, ...prev])}
        />
      </div>
    </>
  );
}
