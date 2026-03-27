/**
 * Scroll reveal pour les cartes témoignages. Désactivé si prefers-reduced-motion.
 * Le contenu reste visible par défaut dans le HTML ; l’attribut data-reveal-scroll
 * n’est posé qu’après ce check pour éviter un bloc invisible sans JS.
 */
const root = document.getElementById("temoignages-page");
if (root && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  root.dataset.revealScroll = "true";

  const items = root.querySelectorAll<HTMLElement>(".testimonial-reveal");
  if (items.length === 0) {
    delete root.dataset.revealScroll;
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    for (const el of items) {
      observer.observe(el);
    }
  }
}
