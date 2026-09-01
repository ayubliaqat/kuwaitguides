import AboutHero from "@/components/about/AboutHero";
import AboutPurpose from "@/components/about/AboutPurpose";
import AboutValues from "@/components/about/AboutValues";
import AboutInclusions from "@/components/about/AboutInclusions";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      <AboutHero />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 pb-20 space-y-24 relative z-20">
        <AboutPurpose />
        <AboutValues />
        <AboutInclusions />
        <AboutCTA />
      </div>
    </div>
  );
}