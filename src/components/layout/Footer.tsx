"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { useArchive } from "@/components/context/ArchiveProvider";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const { scrollToSection } = useArchive();

  return (
    <footer className="border-t border-line/80 bg-paper py-10">
      <div className="editorial-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
          <span className="font-semibold text-ink">YASH SRIVASTAVA</span>
          <span>DEVELOPER / CREATOR / THINKER</span>
          <span className="text-muted/70">— built slowly, by hand</span>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <SocialLinks variant="compact" />

          <button
            type="button"
            onClick={() => scrollToSection("arrival")}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-ink uppercase transition-colors hover:text-blue"
          >
            Top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
