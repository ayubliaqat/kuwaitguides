export type SeoCheck = {
  label: string;
  status: "good" | "ok" | "bad";
  message: string;
};

export function analyzeSeo({
  focusKeyphrase,
  seoTitle,
  title,
  metaDescription,
  slug,
  content,
}: {
  focusKeyphrase: string;
  seoTitle: string;
  title: string;
  metaDescription: string;
  slug: string;
  content: string;
}): { checks: SeoCheck[]; score: number } {
  const checks: SeoCheck[] = [];
  const plainContent = content.replace(/<[^>]*>/g, " ").toLowerCase();
  const kp = focusKeyphrase.trim().toLowerCase();
  const effectiveTitle = (seoTitle || title).toLowerCase();

  if (!kp) {
    checks.push({
      label: "Focus keyphrase",
      status: "bad",
      message: "Add a focus keyphrase to unlock SEO analysis.",
    });
    return { checks, score: 0 };
  }

  checks.push({
    label: "Keyphrase in SEO title",
    status: effectiveTitle.includes(kp) ? "good" : "bad",
    message: effectiveTitle.includes(kp)
      ? "The keyphrase appears in your SEO title."
      : "The keyphrase does not appear in your SEO title.",
  });

  checks.push({
    label: "Keyphrase in slug",
    status: slug.toLowerCase().includes(kp.replace(/\s+/g, "-")) ? "good" : "ok",
    message: slug.toLowerCase().includes(kp.replace(/\s+/g, "-"))
      ? "The slug contains the keyphrase."
      : "Consider including the keyphrase in the slug.",
  });

  checks.push({
    label: "Keyphrase in meta description",
    status: metaDescription.toLowerCase().includes(kp) ? "good" : "bad",
    message: metaDescription.toLowerCase().includes(kp)
      ? "The keyphrase appears in the meta description."
      : "The meta description is missing the keyphrase.",
  });

  const wordCount = plainContent.split(/\s+/).filter(Boolean).length;
  const kpOccurrences = plainContent.split(kp).length - 1;
  const density = wordCount > 0 ? (kpOccurrences / wordCount) * 100 : 0;
  checks.push({
    label: "Keyphrase density",
    status: density >= 0.5 && density <= 3 ? "good" : density > 0 ? "ok" : "bad",
    message:
      density === 0
        ? "The keyphrase doesn't appear in the content."
        : `Keyphrase found ${kpOccurrences} time(s), density ${density.toFixed(1)}%. Aim for 0.5–3%.`,
  });

  const titleLen = effectiveTitle.length;
  checks.push({
    label: "SEO title length",
    status: titleLen >= 40 && titleLen <= 60 ? "good" : titleLen > 0 ? "ok" : "bad",
    message: `${titleLen} characters. Aim for 40–60.`,
  });

  const metaLen = metaDescription.length;
  checks.push({
    label: "Meta description length",
    status: metaLen >= 120 && metaLen <= 160 ? "good" : metaLen > 0 ? "ok" : "bad",
    message: `${metaLen} characters. Aim for 120–160.`,
  });

  checks.push({
    label: "Content length",
    status: wordCount >= 300 ? "good" : wordCount >= 150 ? "ok" : "bad",
    message: `${wordCount} words. Aim for 300+ for solid coverage.`,
  });

  const goodCount = checks.filter((c) => c.status === "good").length;
  const score = Math.round((goodCount / checks.length) * 100);

  return { checks, score };
}