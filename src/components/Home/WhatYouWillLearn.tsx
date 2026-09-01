export default function WhatYouWillLearn() {
  const guides = [
    {
      title: "Places to Visit",
      description:
        "Discover iconic landmarks, hidden gems, and places worth adding to your Kuwait itinerary.",
      span: "md:col-span-4",
      icon: (
        <svg className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Food & Cafés",
      description:
        "Explore Kuwaiti food, local dishes, and popular restaurants.",
      span: "md:col-span-2",
      icon: (
        <svg className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Visa & Entry",
      description:
        "Understand visa requirements, entry rules, and documents before your trip.",
      span: "md:col-span-3",
      icon: (
        <svg className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Culture & Heritage",
      description:
        "Learn about Kuwait's traditions, customs, history, and local life.",
      span: "md:col-span-3",
      icon: (
        <svg className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
    },
    {
      title: "Travel Tips & Planning",
      description:
        "Get practical advice about weather, budgeting, transportation, and complete itineraries.",
      span: "md:col-span-6",
      icon: (
        <svg className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-zinc-950 border-y border-blue-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Introduction */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            What You Can Explore
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            <span className="text-blue-600 dark:text-blue-400">Your complete guide</span> to discovering Kuwait
          </h2>

          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            From planning your journey and finding great food to exploring iconic places, Kuwait Guides brings everything together.
          </p>
        </div>

        {/* Guide Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-5">
          {guides.map((guide, index) => (
            <article
              key={index}
              className={`
                group relative rounded-2xl border border-blue-400/60 dark:border-blue-700/80
                bg-blue-600 dark:bg-blue-900/90 p-6
                transition-all duration-300
                hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500
                shadow-[0_12px_35px_rgba(37,99,235,0.18)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.6)]
                flex flex-col justify-between overflow-hidden
                ${guide.span}
              `}
            >
              {/* Top Row: Icon & Title Grouped Tightly */}
              <div className="flex items-center gap-3.5">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/40 dark:bg-blue-800/60 border border-blue-300/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:scale-110 shadow-sm">
                  {guide.icon}
                </div>
                <h3 className="font-bold tracking-tight text-white text-lg sm:text-xl">
                  {guide.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-3 text-blue-100 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
                {guide.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}