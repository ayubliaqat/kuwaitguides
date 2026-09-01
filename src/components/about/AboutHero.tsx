export default function AboutHero() {
  return (
    <div className="relative bg-blue-600 pt-20 pb-28 sm:pt-28 sm:pb-36 px-4 sm:px-6 text-white overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
        <span className="inline-block px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white bg-white/15 rounded-full border border-white/25">
          About Us
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          The Kuwait locals actually know
        </h1>

        <p className="text-blue-100 max-w-md mx-auto text-xs sm:text-sm font-medium leading-relaxed">
          Real streets, real prices, written by people who live here — not
          copied from a brochure.
        </p>
      </div>

      {/* Smooth bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-16 sm:h-24"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="
              M0 80
              C180 125 300 145 480 115
              C680 82 760 35 960 50
              C1150 64 1280 105 1440 75
              L1440 160
              L0 160
              Z
            "
          />
        </svg>
      </div>
    </div>
  );
}