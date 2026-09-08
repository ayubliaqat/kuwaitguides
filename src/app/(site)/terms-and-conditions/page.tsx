import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://kuwaitguides.vercel.app";
const SITE_NAME = "Kuwait Guides";
const CONTACT_EMAIL = "hello@kuwaitguides.com";
const LAST_UPDATED = "September 9, 2026";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${SITE_NAME}`,
  description: `Read the terms and conditions governing your use of ${SITE_NAME}.`,
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
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
              <li className="text-white">Terms &amp; Conditions</li>
            </ol>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Terms &amp; Conditions
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
            Welcome to {SITE_NAME}. These Terms &amp; Conditions
            (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
            <Link href="/">{SITE_URL.replace("https://", "")}</Link> (the
            &ldquo;Site&rdquo;). By accessing or using the Site, you agree to
            be bound by these Terms. If you do not agree, please do not use
            the Site.
          </p>

          <h2>1. Use of the Site</h2>
          <p>
            The Site provides guides, recommendations, and general
            information about Kuwait for informational purposes only. You
            agree to use the Site only for lawful purposes and in a manner
            that does not infringe the rights of, or restrict or inhibit the
            use of, the Site by any third party.
          </p>

          <h2>2. No Professional Advice</h2>
          <p>
            Content on the Site — including guides on visas, residency,
            dining, travel, and local life — is provided for general
            informational purposes only and does not constitute legal,
            immigration, financial, or professional advice. Laws, prices,
            hours, and availability change frequently; always verify
            important details directly with the relevant authority or
            business before relying on them.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on the Site, including text, graphics, logos,
            images, and articles, is the property of {SITE_NAME} or its
            content contributors and is protected by applicable copyright and
            intellectual property laws. You may not reproduce, distribute,
            modify, or create derivative works from any content on the Site
            without our prior written permission, except for personal,
            non-commercial use.
          </p>

          <h2>4. User Submissions</h2>
          <p>
            If you submit suggestions, place recommendations, comments, or
            other content to us (for example, through our contact form), you
            grant {SITE_NAME} a non-exclusive, royalty-free, worldwide
            license to use, edit, and publish that content in connection with
            operating the Site. You are solely responsible for the content
            you submit and confirm that it does not violate any third
            party&rsquo;s rights.
          </p>

          <h2>5. Third-Party Links and Content</h2>
          <p>
            The Site may include links to third-party websites, businesses,
            or services that are not owned or controlled by {SITE_NAME}. We
            are not responsible for the content, accuracy, or practices of
            any third-party sites, and inclusion of a link does not imply
            endorsement.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The Site and its content are provided &ldquo;as is&rdquo; and
            &ldquo;as available&rdquo; without warranties of any kind, either
            express or implied. We do not warrant that the Site will be
            uninterrupted, error-free, or completely accurate or up to date.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE_NAME} and its
            contributors shall not be liable for any indirect, incidental,
            special, or consequential damages arising out of or related to
            your use of, or inability to use, the Site or its content.
          </p>

          <h2>8. Changes to the Site or Terms</h2>
          <p>
            We reserve the right to modify or discontinue the Site, in whole
            or in part, at any time without notice. We may also revise these
            Terms from time to time; the updated version will be indicated
            by an updated &ldquo;Last updated&rdquo; date at the top of this
            page. Continued use of the Site after changes are posted
            constitutes your acceptance of the revised Terms.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance
            with applicable local law, without regard to its conflict of law
            principles.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us
            at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or
            through our <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}