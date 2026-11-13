"use client";

import React from "react";
import { motion } from "framer-motion";
import { CONTRIBUTIONS } from "@/data/contributions";

export function OpenSource() {
  return (
    <section id="open-source" className="border-t border-line py-24 md:py-36">
      <div className="editorial-container">
        <div className="grid grid-cols-4 gap-10 md:grid-cols-12 md:gap-12">
          <div className="col-span-4 space-y-4 md:col-span-4">
            <p className="font-mono text-xs text-muted">
              <span className="mr-3 text-blue">04</span>
              OPEN SOURCE
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink uppercase md:text-5xl">
              LEARNING IN REAL CODEBASES.
            </h2>
            <p className="font-sans text-sm leading-relaxed text-muted md:text-base">
              Less about green commit squares—more about opening unfamiliar
              repositories, reading maintainer patterns, and fixing small things
              carefully.
            </p>
          </div>

          <div className="col-span-4 space-y-16 md:col-span-8">
            {CONTRIBUTIONS.map((entry) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="space-y-8 border-t border-line pt-8 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-4xl">
                      {entry.repo}
                    </h3>
                    <p className="mt-2 font-sans text-lg text-ink/90">
                      {entry.summary}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-blue">
                    {entry.year}
                    {entry.prRef ? ` · ${entry.prRef}` : ""}
                  </span>
                </div>

                {entry.codeFragment ? (
                  <div className="border border-line bg-[#121212] p-5 text-[#F2EFE8] md:p-6">
                    <p className="mb-3 font-mono text-[11px] text-[#9F9B93]">
                      {entry.codeFragment.filename}
                    </p>
                    <div className="space-y-2 font-mono text-xs leading-relaxed">
                      <p className="text-[#9F9B93] line-through decoration-[#1D3FFF]">
                        - {entry.codeFragment.before}
                      </p>
                      <pre className="overflow-x-auto whitespace-pre-wrap text-[#F2EFE8]">
                        <code>+ {entry.codeFragment.after}</code>
                      </pre>
                    </div>
                  </div>
                ) : null}

                <dl className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="space-y-2">
                    <dt className="font-mono text-xs tracking-[0.12em] text-blue uppercase">
                      THE PROBLEM
                    </dt>
                    <dd className="font-sans text-sm leading-relaxed text-ink/85">
                      {entry.issue}
                    </dd>
                  </div>

                  <div className="space-y-2">
                    <dt className="font-mono text-xs tracking-[0.12em] text-blue uppercase">
                      WHAT I CHANGED
                    </dt>
                    <dd className="font-sans text-sm leading-relaxed text-ink/85">
                      {entry.contribution}
                    </dd>
                  </div>

                  <div className="space-y-2">
                    <dt className="font-mono text-xs tracking-[0.12em] text-blue uppercase">
                      WHAT I LEARNED
                    </dt>
                    <dd className="font-sans text-sm leading-relaxed text-ink/85">
                      {entry.learned}
                    </dd>
                  </div>
                </dl>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
