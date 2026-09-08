import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#0071E3] px-4 pt-16 pb-24 text-white sm:px-6 sm:pt-20 sm:pb-28">
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, white 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, white 1px, transparent 1px),
            radial-gradient(circle at 50% 20%, white 0.8px, transparent 0.8px)
          `,
          backgroundSize: "42px 42px, 58px 58px, 34px 34px",
        }}
      />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full border border-white/10" />

      <div className="pointer-events-none absolute -right-36 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-white/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
Explore Kuwait with Us        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-white/80 sm:text-base sm:leading-7">
          We helps you discover the places, food, culture, beaches,
          shopping spots, and experiences that make Kuwait worth exploring.
          We keep things simple, useful, and focused on what is actually worth
          your time.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/blog"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0071E3] transition hover:bg-white/90"
          >
            Explore the Blog
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Smooth bottom wave */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-12 w-full sm:h-16"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="white"
            d="
              M0 55
              C240 95 420 90 650 55
              C880 20 1080 20 1440 58
              L1440 100
              L0 100
              Z
            "
          />
        </svg>
      </div>
    </section>
  );
}