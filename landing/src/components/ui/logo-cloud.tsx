import { cn } from "@/lib/utils";

type Logo = {
  name: string;
  icon: React.ReactNode;
};

type LogoCloudProps = React.ComponentProps<"div">;

// Integration icons as SVG components
const ClaudeCodeIcon = () => (
  <svg className="h-5 md:h-6" viewBox="0 0 160 24" fill="currentColor">
    <text x="0" y="18" className="text-[16px] font-medium tracking-tight">Claude Code</text>
  </svg>
);

const SeoMcpIcon = () => (
  <svg className="h-5 md:h-6" viewBox="0 0 120 24" fill="currentColor">
    <text x="0" y="18" className="text-[16px] font-medium tracking-tight">seo-mcp</text>
  </svg>
);

const AhrefsIcon = () => (
  <svg className="h-5 md:h-6" viewBox="0 0 120 24" fill="currentColor">
    <text x="0" y="18" className="text-[16px] font-medium tracking-tight">Ahrefs</text>
  </svg>
);

const WordPressIcon = () => (
  <svg className="h-5 md:h-6" viewBox="0 0 140 24" fill="currentColor">
    <text x="0" y="18" className="text-[16px] font-medium tracking-tight">WordPress</text>
  </svg>
);

const GhostIcon = () => (
  <svg className="h-5 md:h-6" viewBox="0 0 100 24" fill="currentColor">
    <text x="0" y="18" className="text-[16px] font-medium tracking-tight">Ghost</text>
  </svg>
);

const FalAIIcon = () => (
  <svg className="h-5 md:h-6" viewBox="0 0 80 24" fill="currentColor">
    <text x="0" y="18" className="text-[16px] font-medium tracking-tight">fal.ai</text>
  </svg>
);

const MakeIcon = () => (
  <svg className="h-5 md:h-6" viewBox="0 0 90 24" fill="currentColor">
    <text x="0" y="18" className="text-[16px] font-medium tracking-tight">Make</text>
  </svg>
);

const ZapierIcon = () => (
  <svg className="h-5 md:h-6" viewBox="0 0 100 24" fill="currentColor">
    <text x="0" y="18" className="text-[16px] font-medium tracking-tight">Zapier</text>
  </svg>
);

const logos: Logo[] = [
  { name: "Claude Code", icon: <ClaudeCodeIcon /> },
  { name: "seo-mcp", icon: <SeoMcpIcon /> },
  { name: "Ahrefs", icon: <AhrefsIcon /> },
  { name: "WordPress", icon: <WordPressIcon /> },
  { name: "Ghost", icon: <GhostIcon /> },
  { name: "fal.ai", icon: <FalAIIcon /> },
  { name: "Make", icon: <MakeIcon /> },
  { name: "Zapier", icon: <ZapierIcon /> },
];

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 md:grid-cols-4",
        className
      )}
      {...props}
    >

      <LogoCard
        className="border-r border-b border-border bg-muted/30"
        logo={logos[0]}
      />

      <LogoCard
        className="border-b border-border md:border-r"
        logo={logos[1]}
      />

      <LogoCard
        className="border-r border-b border-border md:bg-muted/30"
        logo={logos[2]}
      />

      <LogoCard
        className="border-b border-border bg-muted/30 md:bg-background"
        logo={logos[3]}
      />

      <LogoCard
        className="border-r border-b border-border bg-muted/30 md:border-b-0 md:bg-background"
        logo={logos[4]}
      />

      <LogoCard
        className="border-b border-border bg-background md:border-r md:border-b-0 md:bg-muted/30"
        logo={logos[5]}
      />

      <LogoCard
        className="border-r border-border"
        logo={logos[6]}
      />

      <LogoCard
        className="bg-muted/30"
        logo={logos[7]}
      />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-6 md:px-8 md:py-8",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none select-none text-foreground/80 font-medium text-sm md:text-base tracking-tight">
        {logo.name}
      </span>
      {children}
    </div>
  );
}
