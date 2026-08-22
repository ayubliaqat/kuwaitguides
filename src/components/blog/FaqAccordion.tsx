"use client";

import { useState } from "react";

type Faq = {
  id: string;
  question: string;
  answer: string;
};

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="rounded-[14px] border border-border bg-surface overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <h3 className="text-base font-medium text-text">{faq.question}</h3>
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
                <p className="text-text-muted leading-relaxed px-5 pb-5">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}