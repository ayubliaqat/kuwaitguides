import PageBanner from "@/components/layout/PageBanner";
import Link from "next/link";

const VALUES = [
  {
    title: "Honesty",
    description: "We say when a place isn't worth it, not just when it is.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12.75l1.5 1.5 3.75-3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Local knowledge",
    description: "Written by people who live here, not visitors passing through.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    ),
  },
  {
    title: "Staying current",
    description: "Prices and hours change, so we go back and check.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    ),
  },
];

const PROCESS = [
  {
    step: "01",
    title: "We visit in person",
    description: "Someone on our team goes there, orders the food, checks the prices, tries the thing.",
  },
  {
    step: "02",
    title: "We write it up straight",
    description: "No copy-paste from a brochure. If it's overhyped, the page says so.",
  },
  {
    step: "03",
    title: "We go back and check",
    description: "Places change. When they do, we update the page instead of leaving it stale.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageBanner
        eyebrow="About us"
        title="Kuwait, explained by people who actually live here"
        subtitle="We built the guide we wished existed — honest, current, and written by locals who know which restaurant is actually worth the wait."
      />

      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20 space-y-20">
        {/* Story */}
        <div>
          <h2 className="text-2xl font-semibold text-text tracking-tight mb-4">
            Why we started
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              Most travel advice about Kuwait online felt outdated, or written
              by someone who&apos;d never actually set foot here. Listings
              that hadn&apos;t been checked in years. Recommendations copied
              from one brochure to the next. We got tired of it, so we
              started writing the guide we wished existed.
            </p>
            <p>
              Every place on this site has been visited by someone on our
              team. Not scraped, not guessed at — actually tried, timed, and
              priced. If something closes down or changes, we go back and
              update the page. That&apos;s the whole idea.
            </p>
          </div>
        </div>

        {/* Values — icon badges instead of plain text tiles */}
        <div>
          <h2 className="text-2xl font-semibold text-text tracking-tight mb-6">
            What we care about
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-[14px] border border-border bg-surface p-5"
              >
                <div className="w-9 h-9 rounded-[10px] bg-brand/10 flex items-center justify-center mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-brand"
                  >
                    {value.icon}
                  </svg>
                </div>
                <p className="text-sm font-medium text-text mb-1.5">
                  {value.title}
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How we work — a real numbered process, not decorative numbering */}
        <div>
          <h2 className="text-2xl font-semibold text-text tracking-tight mb-6">
            How each guide gets made
          </h2>
          <div className="relative">
            <div
              className="absolute left-[19px] top-2 bottom-2 w-px bg-border hidden sm:block"
              aria-hidden="true"
            />
            <div className="space-y-6">
              {PROCESS.map((item) => (
                <div key={item.step} className="relative flex gap-5">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-xs font-semibold text-brand">
                    {item.step}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-sm font-medium text-text mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-[16px] border border-border bg-surface p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-semibold text-brand mb-1">100%</p>
              <p className="text-sm text-text-muted">Locally written</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-brand mb-1">Free</p>
              <p className="text-sm text-text-muted">No sign-up needed</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-brand mb-1">
                Updated
              </p>
              <p className="text-sm text-text-muted">Checked regularly</p>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center pt-4">
          <p className="text-text-muted leading-relaxed mb-4">
            Have a question, or think we missed somewhere worth visiting?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-sm font-medium text-white bg-brand hover:bg-brand-dark transition rounded-[10px] px-6 py-3"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}