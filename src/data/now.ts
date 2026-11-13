export interface NowEntry {
  label: string;
  value: string;
  note?: string;
}

export interface SocialLinkConfig {
  id: "github" | "linkedin" | "email";
  label: string;
  /**
   * Paste your confirmed URL (or email address for `email`).
   * Leave empty until ready — never guess profile handles.
   */
  value: string;
  placeholder: string;
}

/**
 * Central link configuration — replace `value` strings with confirmed links.
 */
export const SOCIAL_LINKS: SocialLinkConfig[] = [
  {
    id: "github",
    label: "GITHUB",
    value: "",
    placeholder: "[INSERT CONFIRMED GITHUB URL HERE]",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: "",
    placeholder: "[INSERT CONFIRMED LINKEDIN URL HERE]",
  },
  {
    id: "email",
    label: "EMAIL",
    value: "",
    placeholder: "[INSERT EMAIL HERE]",
  },
];

export const NOW_DATA: {
  lastUpdated: string;
  entries: NowEntry[];
} = {
  lastUpdated: "Nov 2026",
  entries: [
    {
      label: "Building",
      value: "College Club Workspace",
      note: "refining project rooms & cohort archive flows",
    },
    {
      label: "Learning",
      value: "Backend Systems & AI",
      note: "reliability, stream pipelines, clean API boundaries",
    },
    {
      label: "Exploring",
      value: "Open Source codebases",
      note: "reading maintainer patterns & shipping small PRs",
    },
    {
      label: "Favorite Song Right Now",
      value: "Nils Frahm — \"Says\" (Spaces)",
      note: "eight quiet minutes while building late at night",
    },
  ],
};

export const IDENTITY_LINES = [
  { first: "DEVELOPER", second: "CREATOR", third: "THINKER" },
  { first: "DEVELOPER", second: "BUILDER", third: "EXPLORER" },
  { first: "DEVELOPER", second: "EDITOR", third: "LEARNER" },
];

export const ARCHIVE_SECTIONS = [
  { num: "00", label: "ARRIVAL", id: "arrival" },
  { num: "01", label: "WHO I AM", id: "who-i-am" },
  { num: "02", label: "SELECTED WORK", id: "work" },
  { num: "03", label: "THE JOURNEY", id: "journey" },
  { num: "05", label: "VISUAL ARCHIVE", id: "visual-archive" },
  { num: "07", label: "MIND", id: "mind" },
  { num: "08", label: "NOW", id: "now" },
  { num: "09", label: "EXIT", id: "exit" },
] as const;
