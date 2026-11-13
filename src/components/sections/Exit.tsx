import React from "react";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { BlueThread, HandUnderline } from "@/components/ui/SketchMarks";

export function Exit() {
  return (
    <section
      id="exit"
      className="relative overflow-x-clip border-t border-line py-28 md:py-40 lg:py-48"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-14 right-[-3%] hidden w-[26%] md:block"
      >
        <BlueThread variant="sweep" className="h-8 w-full opacity-70" />
      </div>

      <div className="editorial-container relative z-10">
        <div className="grid grid-cols-4 gap-12 md:grid-cols-12">
          <div className="col-span-4 space-y-14 md:col-span-10">
            <p className="font-mono text-xs text-muted">
              <span className="mr-3 text-blue">09</span>
              EXIT
            </p>

            <div className="space-y-8">
              <p className="font-display text-[clamp(2rem,5vw,4.1rem)] leading-[0.98] font-bold tracking-[-0.035em] text-muted uppercase">
                THE INTERNET
                <br />
                IS FULL OF WEBSITES.
              </p>

              <p className="font-display text-[clamp(2rem,5vw,4.1rem)] leading-[0.98] font-bold tracking-[-0.035em] text-ink uppercase">
                THANKS FOR
                <br />
                SPENDING TIME
                <br />
                IN MINE.
              </p>
            </div>

            <div className="pt-4">
              <h2 className="relative inline-block font-display text-[clamp(2.2rem,5.8vw,4.8rem)] leading-[0.95] font-bold tracking-[-0.04em] text-ink uppercase">
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                INTERESTING.
                <span
                  aria-hidden="true"
                  className="pointer-events-none mt-2 block w-[60%]"
                >
                  <HandUnderline className="h-5 w-full" color="#1D3FFF" />
                </span>
              </h2>
            </div>

            <div className="pt-4">
              <SocialLinks variant="editorial" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
