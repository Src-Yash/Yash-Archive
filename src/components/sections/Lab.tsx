"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EXPERIMENTS } from "@/data/experiments";
import { useArchive } from "@/components/context/ArchiveProvider";
import { HandScribble } from "@/components/ui/SketchMarks";

const CARD_LAYOUTS = [
  "col-span-4 md:col-span-5 md:col-start-1 md:-rotate-[0.8deg]",
  "col-span-4 md:col-span-5 md:col-start-7 md:mt-14 md:rotate-[0.9deg]",
  "col-span-4 md:col-span-6 md:col-start-4 md:mt-4 md:-rotate-[0.4deg]",
];

export function Lab() {
  const { gravityOn, reducedMotion } = useArchive();
  const [openId, setOpenId] = useState<string | null>(EXPERIMENTS[0].id);

  return (
    <div id="lab" className="mt-20 border-t border-line pt-16 md:mt-28 md:pt-24">
      <div className="mb-14 grid grid-cols-4 items-end gap-6 md:mb-20 md:grid-cols-12">
        <div className="col-span-4 md:col-span-6">
          <p className="mb-3 font-mono text-xs text-muted">
            <span className="mr-3 text-blue">05.1</span>
            EXPERIMENTS &amp; UNFINISHED SKETCHES
          </p>
          <div className="flex items-center gap-4">
            <h3 className="font-display text-3xl font-bold tracking-tight text-ink uppercase md:text-5xl">
              INCOMPLETE WORKBENCH
            </h3>
            <HandScribble
              className={`h-9 w-9 transition-transform duration-700 ${
                !gravityOn && !reducedMotion ? "-translate-y-2 rotate-12" : ""
              }`}
              color="#1D3FFF"
            />
          </div>
        </div>

        <div className="col-span-4 md:col-span-5 md:col-start-8">
          <p className="font-sans text-base leading-relaxed text-ink/85 md:text-lg">
            Code experiments I&apos;m building before I know what they&apos;ll
            turn into.
          </p>
        </div>
      </div>

      {/* Unexpected scattered sketchbook notes */}
      <div className="grid grid-cols-4 gap-8 md:grid-cols-12 md:gap-10">
          {EXPERIMENTS.map((exp, idx) => {
            const isOpen = openId === exp.id;
            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={`${CARD_LAYOUTS[idx] ?? "col-span-4 md:col-span-5"} ${
                  !gravityOn && !reducedMotion ? "md:-translate-y-2" : ""
                } border border-line bg-paper p-6 transition-all duration-300 hover:rotate-0 hover:border-blue md:p-8`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenId((prev) => (prev === exp.id ? null : exp.id))
                  }
                  data-cursor="OPEN"
                  className="flex w-full flex-col gap-4 text-left"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                    <span>{exp.code.toLowerCase()}</span>
                    <span
                      className={
                        exp.status === "EXPERIMENTAL"
                          ? "text-blue"
                          : "text-muted"
                      }
                    >
                      {exp.status.toLowerCase()}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink uppercase md:text-3xl">
                    {exp.title}
                  </h3>

                  <p className="font-sans text-sm leading-relaxed text-ink/85 md:text-base">
                    {exp.hypothesis}
                  </p>

                  <span className="font-mono text-[11px] text-blue">
                    {isOpen ? "hide field notes ↑" : "open field notes →"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 space-y-4 border-t border-line pt-5">
                        <ul className="space-y-2 font-sans text-sm leading-relaxed text-muted">
                          {exp.notes.map((note) => (
                            <li key={note} className="flex gap-2.5">
                              <span aria-hidden="true" className="text-blue">
                                —
                              </span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="font-mono text-[11px] text-ink/75">
                          {exp.stack.join(" · ")}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
    </div>
  );
}
