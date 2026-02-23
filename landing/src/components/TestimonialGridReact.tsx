"use client";

import { TestimonialGrid } from "./ui/testimonial-grid";

export function TestimonialGridSection() {
  return (
    <div className="w-full pt-10 md:pt-16">
      <div className="container mx-auto px-6 pb-10 md:pb-16 relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
          Loved by content creators
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
          See what SEO professionals and content teams are saying about their experience with Suparank.
        </p>
        {/* Divider after header */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-border" />
      </div>

      <div className="max-w-[1280px] mx-auto border-x border-border relative">
        {/* Top border line connecting to header divider */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-screen h-px bg-border" />
        <TestimonialGrid />
        {/* Bottom border line */}
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-screen h-px bg-border" />
      </div>
    </div>
  );
}
