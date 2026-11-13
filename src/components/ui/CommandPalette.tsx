"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight, Command, Sparkles, X } from "lucide-react";
import { useArchive } from "@/components/context/ArchiveProvider";
import { useModalDialog } from "@/components/ui/useModalDialog";
import { PROJECTS } from "@/data/projects";

interface CommandAction {
  id: string;
  label: string;
  category: string;
  run: () => void;
}

export function CommandPalette() {
  const {
    commandOpen,
    closeCommandPalette,
    scrollToSection,
    readRandomThought,
    toggleGravity,
    gravityOn,
    setMindPortal,
    openProjectModal,
  } = useArchive();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dialogRef = useModalDialog({
    isOpen: commandOpen,
    onClose: () => {
      setQuery("");
      setSelectedIndex(0);
      closeCommandPalette();
    },
  });

  const actions = useMemo<CommandAction[]>(() => {
    const base: CommandAction[] = [
      {
        id: "go-work",
        label: "Go to Selected Work",
        category: "02 · Work",
        run: () => scrollToSection("work"),
      },
      {
        id: "replay-intro",
        label: "Replay Opening Cinematic Sequence",
        category: "00 · Title Sequence",
        run: () => {
          closeCommandPalette();
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "instant" });
            window.dispatchEvent(new CustomEvent("ys:replay-intro"));
          }
        },
      },
      {
        id: "enter-lab",
        label: "Enter the Lab",
        category: "05 · Experiments",
        run: () => scrollToSection("lab"),
      },
      {
        id: "open-mind",
        label: "Open /Mind",
        category: "07 · Notebook",
        run: () => {
          setMindPortal("thinking");
          scrollToSection("mind");
        },
      },
      {
        id: "random-thought",
        label: "Read a Random Thought",
        category: "07 · /Mind",
        run: () => readRandomThought(),
      },
      {
        id: "toggle-gravity",
        label: `Toggle Gravity (Currently ${gravityOn ? "on" : "off"})`,
        category: "Sketchbook Physics",
        run: () => {
          toggleGravity();
          closeCommandPalette();
        },
      },
      {
        id: "go-who-i-am",
        label: "Jump to Who I Am",
        category: "01 · Identity",
        run: () => scrollToSection("who-i-am"),
      },
      {
        id: "go-journey",
        label: "Read The Journey So Far",
        category: "03 · Journey",
        run: () => scrollToSection("journey"),
      },
      {
        id: "go-oss",
        label: "Open Engineering Story (Open Source)",
        category: "04 · Open Source",
        run: () => scrollToSection("open-source"),
      },
      {
        id: "go-visual-archive",
        label: "Explore Visual Archive",
        category: "05 · Visual Archive",
        run: () => scrollToSection("visual-archive"),
      },
      {
        id: "go-now",
        label: "Check Now",
        category: "08 · Current",
        run: () => scrollToSection("now"),
      },
      {
        id: "go-exit",
        label: "Jump to Exit & Links",
        category: "09 · Closing",
        run: () => scrollToSection("exit"),
      },
    ];

    const projectItems: CommandAction[] = PROJECTS.slice(0, 3).map((p) => ({
      id: `project-${p.slug}`,
      label: `Open Story: ${p.title}`,
      category: `Chapter ${p.number}`,
      run: () => {
        closeCommandPalette();
        openProjectModal(p.slug);
      },
    }));

    return [...base, ...projectItems];
  }, [
    closeCommandPalette,
    gravityOn,
    openProjectModal,
    readRandomThought,
    scrollToSection,
    setMindPortal,
    toggleGravity,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [actions, query]);

  const activeIndex = filtered.length
    ? Math.min(selectedIndex, filtered.length - 1)
    : 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(
        filtered.length ? (activeIndex + 1) % filtered.length : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        filtered.length
          ? (activeIndex - 1 + filtered.length) % filtered.length
          : 0
      );
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      filtered[activeIndex].run();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="command-palette-title"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl border border-line bg-paper p-0 text-ink shadow-2xl"
    >
      <div onKeyDown={handleKeyDown} className="flex flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 md:px-6">
          <div className="flex items-center gap-2.5">
            <Command className="h-4 w-4 text-blue" aria-hidden="true" />
            <h2
              id="command-palette-title"
              className="font-mono text-xs tracking-[0.12em] text-muted uppercase"
            >
              Jump to a page
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCommandPalette}
            aria-label="Close command palette"
            className="inline-flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-blue"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="border-b border-line px-5 py-3.5 md:px-6">
          <label htmlFor="command-search" className="visually-hidden">
            Search archive pages and actions
          </label>
          <input
            id="command-search"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Where would you like to go? (e.g. Lab, Mind, Gravity)..."
            className="w-full bg-transparent font-sans text-base text-ink placeholder:text-muted focus:outline-none"
          />
        </div>

        <ul
          aria-label="Available commands"
          className="max-h-[54vh] divide-y divide-line/60 overflow-y-auto"
        >
          {filtered.length === 0 ? (
            <li className="px-6 py-10 text-center font-mono text-xs text-muted">
              Nothing in the sketchbook matches that.
            </li>
          ) : (
            filtered.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={item.run}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors md:px-6 ${
                      active
                        ? "bg-paper-soft text-blue"
                        : "bg-paper text-ink hover:bg-paper-soft"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-display text-sm font-semibold md:text-base">
                        {item.label}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.1em] text-muted uppercase">
                        {item.category}
                      </span>
                    </div>
                    {item.id === "random-thought" ? (
                      <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="flex items-center justify-between border-t border-line bg-paper-soft px-5 py-2.5 font-mono text-[10px] tracking-[0.12em] text-muted uppercase md:px-6">
          <span>↑↓ Navigate · Enter</span>
          <span>ESC Close</span>
        </div>
      </div>
    </dialog>
  );
}
