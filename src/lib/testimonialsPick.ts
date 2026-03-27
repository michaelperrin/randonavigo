export type Testimonial = {
  name: string;
  message: string;
  date?: string;
};

/** Jour calendaire à Paris (YYYY-MM-DD), stable pour tout le monde en France ce jour-là. */
export function parisCalendarDateString(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Graine 32 bits dérivée d’une chaîne (FNV-1a). */
export function hashString32(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Générateur pseudo-aléatoire déterministe (0 inclus, 1 exclu). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Mélange Fisher–Yates : on parcourt le tableau de la fin vers le début,
 * et à chaque position i on échange l’élément avec un autre choisi au hasard
 * parmi les indices 0..i (inclus). Complexité O(n), permutation uniforme si le RNG l’est.
 */
export function shuffleDeterministic<T>(items: T[], random: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SEED_PREFIX = "randonavigo-testimonials-v1|";

/** Sous-ensemble du jour : même ordre pour tous les visiteurs ce jour-là (fuseau Paris). */
export function pickTestimonialsForDate(
  all: readonly Testimonial[],
  count: number,
  dateKey: string,
): Testimonial[] {
  if (all.length === 0 || count <= 0) return [];
  const seed = hashString32(`${SEED_PREFIX}${dateKey}`);
  const rand = mulberry32(seed);
  const shuffled = shuffleDeterministic([...all], rand);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
