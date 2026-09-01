"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="faq-item bg-white dark:bg-zinc-900/80 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.3)] backdrop-blur-md border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-blue-600 dark:text-blue-400 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 text-blue-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-black dark:text-zinc-100 text-sm sm:text-base leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}