import { useState, useEffect } from 'react';

type ReactionType = 'inspire' | 'prepare' | 'done';

interface ReactionConfig {
  type: ReactionType;
  emoji: string;
  label: string;
}

const REACTIONS: ReactionConfig[] = [
  { type: 'inspire', emoji: '🌿', label: "Ça m'inspire" },
  { type: 'prepare', emoji: '🎒', label: 'Je la prépare' },
  { type: 'done', emoji: '🏅', label: "Je l'ai faite !" },
];

interface Counts {
  inspire: number;
  prepare: number;
  done: number;
}

interface Props {
  slug: string;
}

interface ReactionsApiResponse {
  counts: Counts;
  activeReactions: ReactionType[];
}

export default function Reactions({ slug }: Props) {
  const [counts, setCounts] = useState<Counts>({ inspire: 0, prepare: 0, done: 0 });
  const [activeReactions, setActiveReactions] = useState<ReactionType[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [pending, setPending] = useState<ReactionType | null>(null);

  useEffect(() => {
    fetch(`/api/reactions?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json() as Promise<ReactionsApiResponse>)
      .then((data) => {
        setCounts(data.counts);
        setActiveReactions(data.activeReactions);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [slug]);

  const handleReaction = async (type: ReactionType) => {
    if (pending) return;
    setPending(type);

    const wasActive = activeReactions.includes(type);

    // Mise à jour optimiste
    setActiveReactions((prev) =>
      wasActive ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setCounts((prev) => ({
      ...prev,
      [type]: wasActive ? Math.max(0, prev[type] - 1) : prev[type] + 1,
    }));

    try {
      const res = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type }),
      });
      const data = (await res.json()) as ReactionsApiResponse;
      setCounts(data.counts);
      setActiveReactions(data.activeReactions);
    } catch {
      // Annuler la mise à jour optimiste en cas d'erreur
      setActiveReactions((prev) =>
        wasActive ? [...prev, type] : prev.filter((t) => t !== type),
      );
      setCounts((prev) => ({
        ...prev,
        [type]: wasActive ? prev[type] + 1 : Math.max(0, prev[type] - 1),
      }));
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
            type="button"
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
