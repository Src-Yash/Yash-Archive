"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { ARCHIVE_SECTIONS } from "@/data/now";
import { THOUGHTS } from "@/data/mind";

export type MindPortal = "listening" | "watching" | "thinking";

interface ArchiveContextValue {
  gravityOn: boolean;
  toggleGravity: () => void;
  setGravityOn: (val: boolean) => void;
  activeSection: string;
  archiveOpen: boolean;
  openArchive: () => void;
  closeArchive: () => void;
  commandOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  selectedProjectSlug: string | null;
  openProjectModal: (slug: string) => void;
  closeProjectModal: () => void;
  mindPortal: MindPortal;
  setMindPortal: (portal: MindPortal) => void;
  activeThoughtIndex: number;
  setActiveThoughtIndex: (index: number) => void;
  readRandomThought: () => void;
  scrollToSection: (sectionId: string) => void;
  reducedMotion: boolean;
}

const ArchiveContext = createContext<ArchiveContextValue | null>(null);

export function ArchiveProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [gravityOn, setGravityOn] = useState(true);
  const [activeSection, setActiveSection] = useState("arrival");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(
    null
  );
  const [mindPortal, setMindPortal] = useState<MindPortal>("thinking");
  const [activeThoughtIndex, setActiveThoughtIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Track active section based on viewport intersection
  useEffect(() => {
    const elements = ARCHIVE_SECTIONS.map((s) =>
      document.getElementById(s.id)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Global CTRL + K / CMD + K keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setArchiveOpen(false);
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleGravity = useCallback(() => {
    setGravityOn((prev) => !prev);
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      setArchiveOpen(false);
      setCommandOpen(false);
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
        setActiveSection(sectionId);
      } else {
        router.push(`/#${sectionId}`);
      }
    },
    [reducedMotion, router]
  );

  const readRandomThought = useCallback(() => {
    setMindPortal("thinking");
    setActiveThoughtIndex((prev) => {
      if (THOUGHTS.length <= 1) return 0;
      let next = Math.floor(Math.random() * THOUGHTS.length);
      if (next === prev) {
        next = (prev + 1) % THOUGHTS.length;
      }
      return next;
    });
    scrollToSection("mind");
  }, [scrollToSection]);

  const openArchive = useCallback(() => {
    setCommandOpen(false);
    setArchiveOpen(true);
  }, []);

  const closeArchive = useCallback(() => setArchiveOpen(false), []);

  const openCommandPalette = useCallback(() => {
    setArchiveOpen(false);
    setCommandOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => setCommandOpen(false), []);

  const openProjectModal = useCallback((slug: string) => {
    setSelectedProjectSlug(slug);
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProjectSlug(null);
  }, []);

  const value = useMemo<ArchiveContextValue>(
    () => ({
      gravityOn,
      toggleGravity,
      setGravityOn,
      activeSection,
      archiveOpen,
      openArchive,
      closeArchive,
      commandOpen,
      openCommandPalette,
      closeCommandPalette,
      selectedProjectSlug,
      openProjectModal,
      closeProjectModal,
      mindPortal,
      setMindPortal,
      activeThoughtIndex,
      setActiveThoughtIndex,
      readRandomThought,
      scrollToSection,
      reducedMotion,
    }),
    [
      gravityOn,
      toggleGravity,
      activeSection,
      archiveOpen,
      openArchive,
      closeArchive,
      commandOpen,
      openCommandPalette,
      closeCommandPalette,
      selectedProjectSlug,
      openProjectModal,
      closeProjectModal,
      mindPortal,
      activeThoughtIndex,
      readRandomThought,
      scrollToSection,
      reducedMotion,
    ]
  );

  return (
    <ArchiveContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ArchiveContext.Provider>
  );
}

export function useArchive() {
  const ctx = useContext(ArchiveContext);
  if (!ctx) {
    throw new Error("useArchive must be used within ArchiveProvider");
  }
  return ctx;
}
