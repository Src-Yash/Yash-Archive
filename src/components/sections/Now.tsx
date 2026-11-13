"use client";

import React from "react";
import { NOW_DATA } from "@/data/now";
import { useArchive } from "@/components/context/ArchiveProvider";

export function Now() {
  const { setMindPortal, scrollToSection } = useArchive();

  const openSongInMind = () => {
    setMindPortal("listening");
    scrollToSection("mind");
  };

  return (
    <section id="now" className="border-t border-line py-24 md:py-32">
      <div className="editorial-container">
        <div className="grid grid-cols-4 gap-10 md:grid-cols-12">
          <div className="col-span-4 space-y-3 md:col-span-4">
            <p className="font-mono text-xs text-muted">
              <span className="mr-3 text-blue">08</span>
              NOW
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink uppercase md:text-4xl">
              CURRENTLY
            </h2>
            <p className="font-sans text-xs italic text-muted">
              updated {NOW_DATA.lastUpdated}
            </p>
          </div>

          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <dl className="divide-y divide-line">
              {NOW_DATA.entries.map((item) => {
                const isSong = item.label.toLowerCase().includes("song");
                return (
                  <div
                    key={item.label}
                    className="grid grid-cols-1 gap-1.5 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                  >
                    <dt className="font-mono text-xs text-muted sm:col-span-4">
                      {item.label}
                    </dt>
                    <dd className="space-y-1 sm:col-span-8">
                      <p className="font-display text-lg font-semibold text-ink md:text-xl">
                        {item.value}
                      </p>
                      {item.note ? (
                        <p className="font-sans text-xs italic text-muted">
                          {item.note}
                          {isSong ? (
                            <>
                              {" "}
                              —{" "}
                              <button
                                type="button"
                                onClick={openSongInMind}
                                className="font-mono text-[11px] not-italic text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue"
                              >
                                open listening liner notes →
                              </button>
                            </>
                          ) : null}
                        </p>
                      ) : null}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
