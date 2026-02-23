import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud2({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-border md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-border" />

      {/* Row 1 */}
      <LogoCard
        className="relative border-r border-b border-border bg-muted/50"
        name="Claude Code"
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-border md:border-r"
        name="seo-mcp"
      />

      <LogoCard
        className="relative border-r border-b border-border md:bg-muted/50"
        name="Ahrefs"
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 text-muted-foreground/50 md:block"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-border bg-muted/50 md:bg-background"
        name="WordPress"
      />

      {/* Row 2 */}
      <LogoCard
        className="relative border-r border-b border-border bg-muted/50 md:border-b-0 md:bg-background"
        name="Ghost"
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50 md:hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-border md:border-r md:border-b-0 md:bg-muted/50"
        name="fal.ai"
      />

      <LogoCard
        className="border-r border-border"
        name="Make"
      />

      <LogoCard
        className="bg-muted/50"
        name="Zapier"
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-border" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  name: string;
};

function LogoCard({ name, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background p-6 md:p-8",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none select-none text-foreground/80 font-medium text-sm md:text-base tracking-tight">
        {name}
      </span>
      {children}
    </div>
  );
}
