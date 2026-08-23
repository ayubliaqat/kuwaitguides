export default function PageBanner({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section
      className="relative bg-white bg-cover bg-center"
      style={{ backgroundImage: "url('/images/blog-banner-image.png')" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-28 pb-14 sm:pb-20 md:pb-24 flex flex-col items-center text-center">
        <p className="text-xs font-medium text-brand uppercase tracking-wide mb-3">
          {eyebrow}
        </p>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold text-blue-600 tracking-tight leading-[1.1] max-w-2xl">
          {title}
        </h1>
        <p className="text-text-muted mt-4 sm:mt-5 max-w-md sm:max-w-lg text-sm sm:text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}