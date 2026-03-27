import {
  parisCalendarDateString,
  pickTestimonialsForDate,
  type Testimonial,
} from "~/lib/testimonialsPick";

function createSlide(t: Testimonial): HTMLElement {
  const slide = document.createElement("div");
  slide.className = "carousel-slide shrink-0 px-5 md:px-8 lg:px-10";
  slide.setAttribute("data-slide", "");

  const bq = document.createElement("blockquote");
  bq.className = "h-full flex flex-col justify-center py-2 md:py-4";

  const p = document.createElement("p");
  p.className = "font-serif text-stone-700 text-sm md:text-base leading-relaxed mb-3";
  p.textContent = t.message;

  const footer = document.createElement("footer");
  footer.className = "font-sans-serif text-xs font-semibold text-zinc-900";
  footer.textContent = `— ${t.name}`;

  bq.append(p, footer);
  slide.append(bq);
  return slide;
}

/** Dernier slide du carrousel : accès à la page complète (remplace un 8ᵉ témoignage). */
function createCtaSlide(): HTMLElement {
  const slide = document.createElement("div");
  slide.className =
    "carousel-slide carousel-slide--cta shrink-0 px-5 md:px-8 lg:px-10";
  slide.setAttribute("data-slide", "");

  const wrap = document.createElement("div");
  wrap.className =
    "cta-slide-inner h-full flex flex-col items-center justify-center py-2 md:py-4";

  const a = document.createElement("a");
  a.href = "/temoignages/";
  a.className =
    "font-sans-serif text-center text-sm font-semibold text-sky-800 leading-snug underline decoration-sky-800/35 underline-offset-[3px] transition-colors hover:text-sky-900 hover:decoration-sky-900";
  a.textContent = "Voir tous les témoignages";

  wrap.append(a);
  slide.append(wrap);
  return slide;
}

function initCarousel(carousel: HTMLElement) {
  const track = carousel.querySelector<HTMLElement>("[data-track]");
  const prevBtn = carousel.querySelector<HTMLButtonElement>("[data-prev]");
  const nextBtn = carousel.querySelector<HTMLButtonElement>("[data-next]");
  const dotsContainer = carousel.querySelector<HTMLElement>("[data-dots]");
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = () => carousel.querySelectorAll<HTMLElement>("[data-slide]");

  let currentIndex = 0;
  let itemsPerView = 1;

  function getItemsPerView(): number {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getMaxIndex(): number {
    return Math.max(0, slides().length - itemsPerView);
  }

  function renderDots() {
    const count = getMaxIndex() + 1;
    dotsContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `h-1.5 rounded-full transition-colors ${
        i === currentIndex ? "w-5 bg-amber-600" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
      }`;
      dot.setAttribute("aria-label", `Témoignage ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.append(dot);
    }
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= getMaxIndex();
  }

  function goTo(index: number) {
    currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
    const slideWidth = 100 / itemsPerView;
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    renderDots();
    updateButtons();
  }

  function onResize() {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView !== itemsPerView) {
      itemsPerView = newItemsPerView;
      if (currentIndex > getMaxIndex()) {
        currentIndex = getMaxIndex();
      }
      goTo(currentIndex);
    }
  }

  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
      }
    },
    { passive: true },
  );

  window.addEventListener("resize", onResize);

  itemsPerView = getItemsPerView();
  goTo(0);
}

const DEFAULT_CAROUSEL_COUNT = 7;

export function mountHomeTestimonialsCarousel(): void {
  const jsonEl = document.getElementById("testimonials-json");
  const carousel = document.querySelector<HTMLElement>("[data-carousel]");
  if (!jsonEl?.textContent || !carousel) return;

  const parsed = Number.parseInt(carousel.dataset.carouselCount ?? "", 10);
  const carouselCount =
    Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CAROUSEL_COUNT;

  let all: Testimonial[];
  try {
    all = JSON.parse(jsonEl.textContent) as Testimonial[];
  } catch {
    return;
  }

  const dateKey = parisCalendarDateString();
  const picked = pickTestimonialsForDate(all, carouselCount, dateKey);

  const track = carousel.querySelector<HTMLElement>("[data-track]");
  if (!track) return;

  const testimonialSlides = picked.map(createSlide);
  const slides: HTMLElement[] = [...testimonialSlides, createCtaSlide()];
  track.replaceChildren(...slides);

  initCarousel(carousel);
}
