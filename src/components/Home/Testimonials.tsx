"use client";

import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Finally a Kuwait guide that isn't ten years old. Every place we tried was actually still open.",
    name: "Fatima Al-Sabah",
    role: "Visited from Dubai",
  },
  {
    quote:
      "The directions were spot on. No more guessing which mall entrance to use.",
    name: "James Carter",
    role: "Expat, 2 years in Kuwait",
  },
  {
    quote:
      "Found three restaurants I'd never have known about otherwise. Exactly what I needed.",
    name: "Layla Hassan",
    role: "Local resident",
  },
  {
    quote:
      "Planned our whole weekend around this site. Every recommendation held up.",
    name: "Ahmed Al-Rashid",
    role: "Visited from Riyadh",
  },
  {
    quote:
      "The prices listed were accurate, which honestly never happens with travel guides.",
    name: "Sarah Mitchell",
    role: "Expat, 6 months in Kuwait",
  },
  {
    quote:
      "Clear, current, and written like someone who actually cares. Rare these days.",
    name: "Noura Al-Fahad",
    role: "Local resident",
  },
  {
    quote:
      "We used it for a business trip and it saved us so much guesswork. Highly recommend.",
    name: "David Chen",
    role: "Visited from Singapore",
  },
  {
    quote:
      "Every timing and opening hour was correct. Small thing, but it makes all the difference.",
    name: "Mariam Al-Otaibi",
    role: "Local resident",
  },
  {
    quote:
      "This is now my go-to whenever friends visit and ask what to do in Kuwait.",
    name: "Omar Al-Kandari",
    role: "Kuwait resident",
  },
  {
    quote:
      "Simple, honest, no fluff. Told us exactly what to expect before we went.",
    name: "Emily Torres",
    role: "Visited from London",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  "#2563eb",
  "#0284c7",
  "#059669",
  "#d97706",
  "#7c3aed",
  "#0891b2",
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      container.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
    }
  }

  function handlePrev() {
    const newIndex = Math.max(0, activeIndex - 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  }

  function handleNext() {
    const newIndex = Math.min(testimonials.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  }

  function handleDotClick(index: number) {
    setActiveIndex(index);
    scrollToIndex(index);
  }

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function handleScroll() {
      if (!container) return;
      const children = Array.from(container.children) as HTMLElement[];
      const scrollLeft = container.scrollLeft;
      let closest = 0;
      let closestDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - 24 - scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-zinc-950 border-y border-blue-200/60 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            What People Say
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text dark:text-zinc-100 tracking-tight leading-tight">
            Trusted by people who&apos;ve actually used it
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
            className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-blue-200 dark:border-zinc-700 shadow-md items-center justify-center text-text dark:text-zinc-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 transition disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === testimonials.length - 1}
            aria-label="Next testimonial"
            className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-blue-200 dark:border-zinc-700 shadow-md items-center justify-center text-text dark:text-zinc-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 transition disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 pb-6 -mx-6 px-6 scrollbar-hide"
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-6 shadow-[0_10px_25px_rgba(37,99,235,0.15)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.25)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all transform hover:-translate-y-1"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600/30 dark:text-blue-400/30 mb-3">
                  <path d="M7.17 6C4.87 8.13 3.5 11.19 3.5 14.5c0 3.31 2.34 5.5 5 5.5 2.21 0 4-1.79 4-4 0-1.94-1.37-3.56-3.19-3.92.36-2.24 2.06-4.16 4.19-4.87L12.5 5C10.5 5.3 8.7 5.5 7.17 6zm10 0c-2.3 2.13-3.67 5.19-3.67 8.5 0 3.31 2.34 5.5 5 5.5 2.21 0 4-1.79 4-4 0-1.94-1.37-3.56-3.19-3.92.36-2.24 2.06-4.16 4.19-4.87L22.5 5c-2 .3-3.8.5-5.33 1z" />
                </svg>
                <p className="text-text dark:text-zinc-200 leading-relaxed mb-6 text-[15px]">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text dark:text-zinc-100">{t.name}</p>
                    <p className="text-xs text-text-muted dark:text-zinc-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => handleDotClick(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all ${
                activeIndex === i
                  ? "w-6 h-2 bg-blue-600 dark:bg-blue-400"
                  : "w-2 h-2 bg-blue-200 dark:bg-zinc-800 hover:bg-blue-400 dark:hover:bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}