import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  handle: string;
  content: string;
  twitterUrl: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    handle: "@sarahchen_seo",
    content: "Suparank cut our content production time by 70%. The keyword research alone saves hours every week.",
    twitterUrl: "https://twitter.com/sarahchen_seo",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Marcus Rodriguez",
    handle: "@marcusrod",
    content: "Finally, an AI tool that understands SEO. The topical maps it generates are incredibly thorough.",
    twitterUrl: "https://twitter.com/marcusrod",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Emma Thompson",
    handle: "@emmawrites",
    content: "Publishing directly to WordPress from Claude? Game changer. My workflow has never been smoother.",
    twitterUrl: "https://twitter.com/emmawrites",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "David Park",
    handle: "@davidpark_dev",
    content: "The schema markup generation is spot-on. Our rich snippets improved within weeks of using Suparank.",
    twitterUrl: "https://twitter.com/davidpark_dev",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Lisa Martinez",
    handle: "@lisamartinez",
    content: "I was skeptical about AI content, but Suparank produces articles that actually rank. Impressive quality.",
    twitterUrl: "https://twitter.com/lisamartinez",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "James Wilson",
    handle: "@jameswilson_io",
    content: "The internal linking suggestions alone are worth it. Our site architecture has improved dramatically.",
    twitterUrl: "https://twitter.com/jameswilson_io",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Anna Kowalski",
    handle: "@annakowalski",
    content: "From keyword to published post in under an hour. Suparank is now essential to our content strategy.",
    twitterUrl: "https://twitter.com/annakowalski",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    name: "Ryan Foster",
    handle: "@ryanfoster",
    content: "The GEO optimization feature is ahead of its time. Already seeing results in AI search visibility.",
    twitterUrl: "https://twitter.com/ryanfoster",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
];

// X (Twitter) Logo SVG
function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

type TestimonialGridProps = React.ComponentProps<"div">;

export function TestimonialGrid({ className, ...props }: TestimonialGridProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >

      {/* Row 1 */}
      <TestimonialCard
        className="relative border-r border-b border-border bg-muted/50"
        testimonial={testimonials[0]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50"
          strokeWidth={1}
        />
      </TestimonialCard>

      <TestimonialCard
        className="border-b border-border lg:border-r"
        testimonial={testimonials[1]}
      />

      <TestimonialCard
        className="relative border-r border-b border-border sm:bg-muted/50 lg:bg-background"
        testimonial={testimonials[2]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50 sm:block lg:hidden"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 text-muted-foreground/50 lg:block"
          strokeWidth={1}
        />
      </TestimonialCard>

      <TestimonialCard
        className="border-b border-border bg-muted/50 sm:bg-background lg:bg-muted/50"
        testimonial={testimonials[3]}
      />

      {/* Row 2 */}
      <TestimonialCard
        className="relative border-r border-b border-border bg-muted/50 sm:bg-background lg:border-b-0"
        testimonial={testimonials[4]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50 sm:hidden"
          strokeWidth={1}
        />
      </TestimonialCard>

      <TestimonialCard
        className="border-b border-border sm:bg-muted/50 lg:border-r lg:border-b-0 lg:bg-background"
        testimonial={testimonials[5]}
      />

      <TestimonialCard
        className="relative border-r border-b border-border sm:border-b-0 lg:bg-muted/50"
        testimonial={testimonials[6]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50 sm:hidden"
          strokeWidth={1}
        />
      </TestimonialCard>

      <TestimonialCard
        className="bg-muted/50 sm:bg-background lg:bg-background"
        testimonial={testimonials[7]}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-border" />
    </div>
  );
}

type TestimonialCardProps = React.ComponentProps<"div"> & {
  testimonial: Testimonial;
};

function TestimonialCard({ testimonial, className, children, ...props }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-background p-6 md:p-10",
        className
      )}
      {...props}
    >
      <a
        href={testimonial.twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 inline-flex w-fit text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`${testimonial.name} on X`}
      >
        <XLogo className="size-4" />
      </a>

      <p className="text-sm text-foreground/90 leading-relaxed mb-4 flex-1">
        "{testimonial.content}"
      </p>

      <div className="mt-auto flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.handle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
