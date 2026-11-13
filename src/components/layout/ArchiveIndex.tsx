"use client";

import React from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useArchive } from "@/components/context/ArchiveProvider";
import { useModalDialog } from "@/components/ui/useModalDialog";
import { ARCHIVE_SECTIONS } from "@/data/now";

const INDEX_ITEMS = ARCHIVE_SECTIONS.filter(
  (s) => Number(s.num) >= 1 && Number(s.num) <= 8
);

export function ArchiveIndex() {
  const {
    archiveOpen,
    closeArchive,
    activeSection,
    scrollToSection,
    gravityOn,
    toggleGravity,
    openCommandPalette,
  } = useArchive();

  const dialogRef = useModalDialog({
    isOpen: archiveOpen,
    onClose: closeArchive,
  });

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="archive-index-title"
      className="m-auto max-h-[92vh] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto border border-line bg-paper p-0 text-ink shadow-2xl"
    >
      <div className="flex flex-col">
        {/* Table of Contents Header */}
        <div className="flex items-end justify-between px-6 pt-8 pb-6 md:px-12 md:pt-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              exhibition catalogue
            </p>
            <h2
              id="archive-index-title"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-ink uppercase md:text-3xl"
            >
              Contents
            </h2>
          </div>
          <button
            type="button"
            autoFocus
            onClick={closeArchive}
            aria-label="Close contents"
            className="inline-flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-blue"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Book Table of Contents */}
        <nav
          aria-label="Archive chapters"
          className="px-6 pb-6 md:px-12 md:pb-8"
        >
          <ul className="divide-y divide-line/80 border-t border-line/80">
            {INDEX_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex w-full items-baseline justify-between py-4 text-left md:py-5"
                  >
                    <div className="flex items-baseline gap-6 md:gap-10">
                      <span
                        className={`font-mono text-xs ${
                          isActive ? "text-blue" : "text-muted"
                        }`}
                      >
                        {item.num}
                      </span>
                      <span
                        className={`font-display text-2xl font-semibold tracking-tight transition-transform duration-200 group-hover:translate-x-2 md:text-4xl ${
                          isActive
                            ? "text-blue"
                            : "text-ink/85 group-hover:text-ink"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    <span className="flex items-center gap-2 font-mono text-xs text-muted">
                      {isActive ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                      ) : null}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quiet Footer Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/80 px-6 py-5 md:px-12">
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToSection("arrival")}
              className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-ink"
            >
              00 Arrival
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("exit")}
              className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-ink"
            >
              09 Exit
            </button>
            <button
              type="button"
              onClick={toggleGravity}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-ink uppercase transition-colors hover:text-blue"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  gravityOn ? "bg-ink" : "bg-blue"
                }`}
              />
              Gravity: {gravityOn ? "on" : "off"}
            </button>
          </div>

          <button
            type="button"
            onClick={openCommandPalette}
            className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-blue"
          >
            Command Palette (Ctrl + K)
          </button>
        </div>
      </div>
    </dialog>
  );
}
