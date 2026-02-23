"use client";

import { LogoCloud2 } from "./ui/logo-cloud-2";

export function LogoCloudSection() {
  return (
    <div className="w-full pt-10 md:pt-16">
      <div className="container mx-auto px-6 pb-10 md:pb-16 relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight text-center">
          Works with the tools you{" "}
          <span className="text-primary">already use</span>
        </h2>
        {/* Divider after header */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-border" />
      </div>

      <div className="max-w-4xl mx-auto">
        <LogoCloud2 />
      </div>
    </div>
  );
}
