import PageBanner from "@/components/layout/PageBanner";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageBanner
        eyebrow="About Us"
        title="Kuwait, explained by people who actually live here"
        subtitle="We built the guide we wished existed — honest, current, and written by locals who know which restaurant is actually worth the wait."
      />

      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20 space-y-16">
        {/* Story */}
        <div>
          <h2 className="text-2xl font-semibold text-text tracking-tight mb-4">
            Why we started
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              Most travel advice about Kuwait online felt outdated, or
              written by someone who&apos;d never actually set foot here.
              Listings that hadn&apos;t been checked in years. Recommendations
              copied from one brochure to the next. We got tired of it, so we
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

        {/* Values */}
        <div>
          <h2 className="text-2xl font-semibold text-text tracking-tight mb-6">
            What we care about
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-[14px] border border-border bg-surface p-5">
              <p className="text-sm font-medium text-text mb-1.5">Honesty</p>
              <p className="text-sm text-text-muted leading-relaxed">
                We say when a place isn&apos;t worth it, not just when it is.
              </p>
            </div>
            <div className="rounded-[14px] border border-border bg-surface p-5">
              <p className="text-sm font-medium text-text mb-1.5">
                Local knowledge
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Written by people who live here, not visitors passing through.
              </p>
            </div>
            <div className="rounded-[14px] border border-border bg-surface p-5">
              <p className="text-sm font-medium text-text mb-1.5">
                Staying current
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Prices and hours change — so we go back and check.
              </p>
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