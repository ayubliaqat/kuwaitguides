export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
        <p className="text-xs font-medium text-brand uppercase tracking-wide mb-3">
          About Us
        </p>
        <h1 className="text-3xl lg:text-4xl font-semibold text-text tracking-tight leading-tight mb-6">
          Kuwait, explained by people who actually live here
        </h1>

        <div className="space-y-5 text-text-muted leading-relaxed">
          <p>
            Kuwait Guides started because most travel advice online felt
            outdated or written by someone who&apos;d never set foot here.
            We built the guide we wished existed — honest, current, and
            written by locals who know which restaurant is actually worth
            the wait.
          </p>
          <p>
            Every place we write about, we&apos;ve visited ourselves. No
            copied listings, no recycled brochures — just real
            recommendations, kept up to date, from people who call Kuwait
            home.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-[14px] border border-border bg-surface p-5">
            <p className="text-2xl font-semibold text-text mb-1">100%</p>
            <p className="text-sm text-text-muted">Locally written</p>
          </div>
          <div className="rounded-[14px] border border-border bg-surface p-5">
            <p className="text-2xl font-semibold text-text mb-1">Free</p>
            <p className="text-sm text-text-muted">No sign-up needed</p>
          </div>
          <div className="rounded-[14px] border border-border bg-surface p-5">
            <p className="text-2xl font-semibold text-text mb-1">Updated</p>
            <p className="text-sm text-text-muted">Kept current, regularly</p>
          </div>
        </div>
      </div>
    </div>
  );
}