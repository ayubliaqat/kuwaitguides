import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://kuwaitguides.vercel.app";
const SITE_NAME = "Kuwait Guides";
const CONTACT_EMAIL = "hello@kuwaitguides.com";
const LAST_UPDATED = "September 9, 2026";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description: `Learn how ${SITE_NAME} collects, uses, and protects your information when you use our site.`,
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* =====================================================
          COMPACT WAVY HERO
          ===================================================== */}
      <section className="relative h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden bg-brand">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/[0.10]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full border border-white/[0.08]" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 sm:px-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center flex-wrap justify-center gap-1.5 text-sm sm:text-base font-bold">
              <li>
                <Link href="/" className="text-white hover:text-white/80 transition">
                  Home
                </Link>
              </li>
              <li className="text-white/70">/</li>
              <li className="text-white">Privacy Policy</li>
            </ol>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Privacy Policy
          </h1>
        </div>

        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-[36px] w-full sm:h-[44px] md:h-[50px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,80 C180,135 330,10 520,55 C700,100 820,135 1000,65 C1080,35 1140,35 1200,55 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================
          CONTENT
          ===================================================== */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-sm text-zinc-500 mb-8 sm:mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div
          className="prose prose-sm sm:prose-base max-w-none
            prose-headings:text-zinc-900 prose-p:text-zinc-700 prose-a:text-blue-600
            prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
            prose-p:leading-relaxed prose-p:my-4
            prose-ul:my-4 prose-li:my-1.5 prose-li:leading-relaxed"
        >
          <p>
            {SITE_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates{" "}
            <Link href="/">{SITE_URL.replace("https://", "")}</Link> (the
            &ldquo;Site&rdquo;). This Privacy Policy explains how we collect, use,
            and protect information when you visit or interact with the Site.
            By using the Site, you agree to the practices described in this
            policy.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Information you provide directly</strong> — such as your
              name, email address, or message content when you contact us,
              subscribe to updates, or submit a place recommendation.
            </li>
            <li>
              <strong>Automatically collected information</strong> — such as
              your IP address, browser type, device information, pages
              visited, and time spent on the Site, gathered through standard
              analytics tools.
            </li>
            <li>
              <strong>Cookies and similar technologies</strong> — used to
              remember your preferences and understand how visitors use the
              Site.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Operate, maintain, and improve the Site and its content</li>
            <li>Respond to your inquiries, comments, or suggestions</li>
            <li>Understand how visitors use the Site so we can improve it</li>
            <li>Send updates or newsletters, if you have opted in</li>
            <li>Detect, prevent, and address technical issues or abuse</li>
          </ul>

          <h2>3. Cookies</h2>
          <p>
            The Site uses cookies and similar tracking technologies to
            enhance your browsing experience. You can control or disable
            cookies through your browser settings, though doing so may affect
            some features of the Site.
          </p>

          <h2>4. Third-Party Links and Services</h2>
          <p>
            The Site may contain links to third-party websites, services, or
            content that we do not own or control (for example, restaurants,
            venues, or businesses we feature in our guides). We are not
            responsible for the privacy practices of those third parties, and
            we encourage you to review their privacy policies separately.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We take reasonable measures to protect the information we
            collect from unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the
            internet or electronic storage is completely secure, and we
            cannot guarantee absolute security.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain information only for as long as necessary to fulfill
            the purposes described in this policy, unless a longer retention
            period is required or permitted by law.
          </p>

          <h2>7. Children&rsquo;s Privacy</h2>
          <p>
            The Site is not directed at children under the age of 13, and we
            do not knowingly collect personal information from children. If
            you believe a child has provided us with personal information,
            please contact us so we can remove it.
          </p>

          <h2>8. Your Choices</h2>
          <p>
            You may opt out of receiving communications from us at any time
            by following the unsubscribe instructions included in our
            emails, or by contacting us directly.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated &ldquo;Last
            updated&rdquo; date. Your continued use of the Site after changes
            are posted constitutes acceptance of the revised policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please
            contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or through
            our <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}