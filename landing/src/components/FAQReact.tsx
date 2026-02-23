"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Suparank?",
    answer:
      "Suparank is an MCP tool that adds SEO content creation capabilities to AI clients like Claude Desktop, Cursor, or ChatGPT. It provides 19 tools for keyword research, content writing, optimization, and publishing.",
  },
  {
    question: "How does MCP work?",
    answer:
      "MCP (Model Context Protocol) is a standard for connecting AI clients to external tools. Run `npx suparank` to start the server, configure it in your AI client, and the tools become available in your conversations.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your CMS credentials are stored only on your machine in ~/.suparank/credentials.json and never sent to our servers. Only your Suparank API key is used for authentication.",
  },
  {
    question: "Which AI clients work with Suparank?",
    answer:
      "Any MCP-compatible client works, including Claude Desktop, Cursor, and ChatGPT. The MCP protocol is open, so new clients are added regularly.",
  },
  {
    question: "Can I publish directly to my blog?",
    answer:
      "Yes. Suparank supports WordPress (via application passwords) and Ghost (via Admin API). You can also use webhooks for Make, Zapier, or custom integrations.",
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
