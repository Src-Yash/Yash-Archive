import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/now";

interface SocialLinksProps {
  variant?: "editorial" | "compact";
}

/**
 * Shared accessible renderer for confirmed owner links configured in src/data/now.ts.
 * Never invents URLs when unconfigured; renders secure external links once provided.
 */
export function SocialLinks({ variant = "editorial" }: SocialLinksProps) {
  const isCompact = variant === "compact";

  return (
    <ul
      aria-label="Contact and social profiles"
      className={
        isCompact
          ? "flex flex-wrap items-center gap-5"
          : "flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-10"
      }
    >
      {SOCIAL_LINKS.map((item) => {
        const trimmed = item.value.trim();
        const isConfigured =
          trimmed.length > 0 && !trimmed.startsWith("[INSERT");

        if (!isConfigured) {
          return (
            <li key={item.id}>
              <span
                aria-label={`${item.label} link awaiting confirmation in src/data/now.ts`}
                className={
                  isCompact
                    ? "font-mono text-[11px] tracking-[0.12em] text-muted uppercase"
                    : "inline-flex items-baseline gap-2.5 font-mono text-xs tracking-[0.12em] text-muted uppercase"
                }
              >
                <span className="text-ink">{item.label}</span>
                {!isCompact ? (
                  <span className="text-[11px] text-muted">
                    {item.placeholder}
                  </span>
                ) : null}
              </span>
            </li>
          );
        }

        const isEmail = item.id === "email";
        const href = isEmail
          ? trimmed.startsWith("mailto:")
            ? trimmed
            : `mailto:${trimmed}`
          : trimmed;

        return (
          <li key={item.id}>
            <a
              href={href}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              aria-label={
                isEmail
                  ? `Send email to ${trimmed}`
                  : `Visit ${item.label} profile (opens in new tab)`
              }
              data-cursor="OPEN"
              className={
                isCompact
                  ? "inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.14em] text-ink uppercase transition-colors hover:text-blue"
                  : "group inline-flex items-center gap-2 font-display text-lg font-medium tracking-tight text-ink underline decoration-line underline-offset-4 transition-colors hover:text-blue hover:decoration-blue md:text-xl"
              }
            >
              <span>{item.label}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
