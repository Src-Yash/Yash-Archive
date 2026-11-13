"use client";

import React from "react";
import { PROJECTS } from "@/data/projects";
import { EchoSentinelWorld } from "./work/EchoSentinelWorld";
import { YojanaSaathiWorld } from "./work/YojanaSaathiWorld";
import { CollegeWorkspaceWorld } from "./work/CollegeWorkspaceWorld";

export function SelectedWork() {
  const [echo, yojana, workspace] = PROJECTS;

  return (
    <section
      id="work"
      className="overflow-x-clip border-t border-line py-24 md:py-36"
    >
      <div className="editorial-container">
        {/* Exhibition Section Header */}
        <div className="mb-20 grid grid-cols-1 items-end gap-6 md:mb-28 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-blue">02</span>
              <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
                SELECTED WORK
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink uppercase">
              WORK AS WORLDS<span className="text-blue">.</span>
            </h2>
          </div>

          <div className="md:col-span-4">
            <p className="font-sans text-base leading-relaxed text-muted md:text-lg">
              Three distinct environments—each shaped by the specific problem it
              began with rather than a repeated template.
            </p>
          </div>
        </div>

        {/* The Three Immersive Project Worlds */}
        <div className="space-y-24 md:space-y-36">
          
          {/* 01 · ECHOSENTINEL (Technical / Dark / Signal-driven World) */}
          {echo && <EchoSentinelWorld project={echo} />}

          {/* Transition 01 → 02: From Machine Telemetry to Civic Policy */}
          <div
            aria-hidden="true"
            className="flex flex-col items-center justify-between gap-4 border-y border-line/70 py-8 text-center sm:flex-row sm:text-left"
          >
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
              <span className="text-ink font-semibold">TRANSITION 01 → 02</span>
              <span className="text-blue">·</span>
              <span>FROM SYSTEM SIGNALS TO CIVIC CLARITY</span>
            </div>
            <p className="font-sans text-xs italic text-muted">
              &ldquo;Different questions demand fundamentally different architectures.&rdquo;
            </p>
          </div>

          {/* 02 · YOJANA SAATHI (Warm / Human / Document Translation World) */}
          {yojana && <YojanaSaathiWorld project={yojana} />}

          {/* Transition 02 → 03: From Civic Guidance to Collaborative Studio */}
          <div
            aria-hidden="true"
            className="flex flex-col items-center justify-between gap-4 border-y border-line/70 py-8 text-center sm:flex-row sm:text-left"
          >
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
              <span className="text-ink font-semibold">TRANSITION 02 → 03</span>
              <span className="text-blue">·</span>
              <span>FROM DOCUMENT PARSING TO SHARED WORKSPACES</span>
            </div>
            <p className="font-sans text-xs italic text-muted">
              &ldquo;Software that helps teams remember what they learned together.&rdquo;
            </p>
          </div>

          {/* 03 · COLLEGE CLUB WORKSPACE (Studio / In-Progress / Pinned Wall World) */}
          {workspace && <CollegeWorkspaceWorld project={workspace} />}

        </div>
      </div>
    </section>
  );
}
