"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Suparank?",
    answer:
      "Suparank is a free, open-source set of 8 Claude Code Skills for AI-powered SEO content creation. It covers keyword research, content writing, optimization, and publishing. Install all skills with `npx skills add egebese/suparank --global --all`.",
  },
  {
    question: "How do Claude Code Skills work?",
    answer:
      "Install Suparank skills with `npx skills add egebese/suparank --global --all`, then use slash commands like `/suparank/research`, `/suparank/create`, and `/suparank/publish` directly in Claude Code to run SEO workflows from your terminal.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Everything runs locally on your machine. The code is fully open source on GitHub with no server or cloud dependency, so you can audit every line. Your credentials and content never leave your computer.",
  },
  {
    question: "What do I need?",
    answer:
      "You need Claude Code, Anthropic's official CLI. Optionally, pair Suparank with seo-mcp to get real Ahrefs keyword data for more accurate research and difficulty scores.",
  },
  {
    question: "Can I publish directly to my blog?",
    answer:
      "Yes. Use `/suparank/publish` to publish directly to WordPress or Ghost. It supports both draft and published status so you can review before going live.",
  },
  {
    question: "What is GEO optimization?",
    answer:
      "GEO (Generative Engine Optimization) optimizes content for AI search engines like ChatGPT, Perplexity, and Google SGE, helping your content appear in AI-generated answers.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="pt-10 md:pt-16 pb-16 md:pb-32 section-divider">
      <div className="container mx-auto px-6">
        <div className="text-center pb-10 md:pb-16 relative">
          <p className="text-sm font-medium text-primary mb-3 md:mb-4">FAQ</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Questions & answers
          </h2>
          {/* Divider after header */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-border" />
        </div>

        <div className="max-w-3xl mx-auto border-x border-border relative">
          {/* Top border */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-screen h-px bg-border" />

          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <FAQCard
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                isLast={index === faqs.length - 1}
              />
            ))}
          </div>

          {/* Bottom border */}
          <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-screen h-px bg-border" />
        </div>
      </div>
    </section>
  );
}

type FAQCardProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  isLast: boolean;
};

function FAQCard({
  question,
  answer,
  isOpen,
  onClick,
  isLast,
}: FAQCardProps) {
  return (
    <div
      className={cn(
        "bg-background p-6 md:p-8 cursor-pointer transition-colors hover:bg-muted/30",
        !isLast && "border-b border-border"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-medium text-foreground text-sm md:text-base tracking-tight">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
