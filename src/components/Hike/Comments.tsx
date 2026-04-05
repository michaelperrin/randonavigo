import { useState, useEffect } from 'react';

interface Comment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

interface Props {
  slug: string;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <span className="font-sans-serif font-semibold text-stone-800 text-sm">
          {comment.authorName}
        </span>
        <time className="text-stone-400 text-xs font-sans-serif">
          {formatDate(comment.createdAt)}
        </time>
      </div>
      <p className="font-serif text-stone-700 text-base leading-relaxed">{comment.content}</p>
    </li>
  );
}

export default function Comments({ slug }: Props) {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        setCommentsList(data.comments ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
          authorName: authorName.trim() || undefined,
          content: content.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Une erreur est survenue.');
        return;
      }

      // Ajout optimiste du commentaire en tête de liste
      const newComment: Comment = {
        id: Date.now(),
        authorName: authorName.trim() || 'Randonneur',
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };
      setCommentsList((prev) => [newComment, ...prev]);
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
      {/* Compteur de commentaires */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-condensed text-2xl font-bold text-stone-800">
          {loading ? '—' : commentCount === 0 ? 'Aucun commentaire' : commentCount === 1 ? '1 commentaire' : `${commentCount} commentaires`}
        </span>
      </div>

      {/* Liste des commentaires */}
      {!loading && commentsList.length > 0 && (
        <ul className="flex flex-col divide-y divide-stone-100 mb-8">
          {commentsList.map((comment) => (
            <li key={comment.id} className="py-5 first:pt-0">
              <CommentItem comment={comment} />
            </li>
          ))}
        </ul>
      )}

      {!loading && commentsList.length === 0 && !success && (
        <p className="text-stone-400 text-sm font-sans-serif italic mb-8">
          Pas encore de commentaires. Partagez votre expérience !
        </p>
      )}

      {/* Formulaire */}
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
              Votre prénom{' '}
              <span className="font-normal normal-case tracking-normal text-stone-400">
                (optionnel)
              </span>
            </label>
            <input
              id={`comment-name-${slug}`}
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Randonneur"
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
                isOverLimit
                  ? 'text-red-500 font-semibold'
                  : isUnderMin
                    ? 'text-stone-400'
                    : 'text-stone-400',
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
            disabled={submitting || isOverLimit || charCount === 0}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white text-sm font-sans-serif font-semibold uppercase tracking-wide py-3 px-4 rounded-lg transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          >
            {submitting ? 'Envoi en cours…' : 'Publier le commentaire'}
          </button>
        </form>
      )}
    </div>
  );
}
