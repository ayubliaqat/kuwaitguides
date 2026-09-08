import Link from "next/link";

export default function HomeHero() {
  return (
    <section
      className="relative bg-[#FFFFFF] bg-cover bg-center border-y border-[#D2D2D7]"
      style={{ backgroundImage: "url('/images/contact-image.png')" }}
    >
      {/* Stronger scrim on left where text sits, fading out before it reaches the towers */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl px-4 sm:px-6 pt-16 sm:pt-12 md:pt-16 pb-8 sm:pb-8 md:pb-12 flex flex-col items-start text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#333333] tracking-tight leading-[1.1]">
            Your Complete Guide <br />
            <span className="text-[#0071E3]">to Kuwait</span>
          </h1>

          <p className="text-black mt-5 sm:mt-6 max-w-md text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Visas, flights, residency laws, and everyday life in Kuwait,
            explained simply by people who actually live here.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center text-sm sm:text-base font-medium text-[#FFFFFF] bg-[#0071E3] hover:bg-[#0058B0] transition rounded-xl px-6 sm:px-7 py-3 sm:py-3.5 shadow-md shadow-[#0071E3]/20"
            >
              Explore Blogs
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center text-sm sm:text-base font-medium text-[#1D1D1F] bg-[#FFFFFF] border border-[#0071E3] hover:bg-[#F5F5F7] transition rounded-xl px-6 sm:px-7 py-3 sm:py-3.5 shadow-md shadow-[#0071E3]/10"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}