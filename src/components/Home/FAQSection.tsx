"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is Kuwait Guides free to use?",
    answer:
      "Yes, everything on the site is free. No sign-up needed to browse our guides.",
  },
  {
    question: "How often is the content updated?",
    answer:
      "We review and update our guides regularly, so prices, timings, and recommendations stay current.",
  },
  {
    question: "Who writes the guides?",
    answer:
      "Local residents and long-term expats who actually visit and test the places we write about.",
  },
  {
    question: "Can I suggest a place to be featured?",
    answer:
      "Yes — reach out through our contact page and we'll check it out.",
  },
  {
    question: "Do you cover places outside Kuwait City?",
    answer:
      "Yes, we cover spots across Kuwait, not just the capital.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
         <h2 className="text-3xl lg:text-4xl font-semibold text-brand tracking-tight leading-tight">
  Frequently Asked questions
</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="rounded-[14px] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base font-medium text-text">
                    {faq.question}
                  </h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-text-muted leading-relaxed px-5 pb-5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}