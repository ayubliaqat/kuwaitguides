export default function WhoWeAre() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text side */}
        <div>
          <p className="text-xs font-medium text-brand uppercase tracking-wide mb-3">
            Who We Are
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-5">
  <span className="text-brand">Kuwait, explained</span>{" "}
  <span className="text-text">by people who actually live here</span>
</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            We started Kuwait Guides because most travel advice online felt
            outdated or written by someone who&apos;d never set foot here.
            So we built the guide we wished existed — honest, current, and
            written by locals who know which restaurant is actually worth
            the wait.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              <span className="text-text">Written by real residents</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              <span className="text-text">Updated regularly, not archived</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              <span className="text-text">Honest picks, no filler</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              <span className="text-text">Prices and timings included</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              <span className="text-text">Clear directions, no guesswork</span>
            </li>
          </ul>
        </div>

<div className="rounded-[14px] overflow-hidden aspect-[5/4] border border-border shadow-lg">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src="/images/whoarewe.avif"
    alt="Kuwait City skyline"
    className="w-full h-full object-cover"
  />
</div>
      </div>
    </section>
  );
}