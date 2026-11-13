export interface JourneyMilestone {
  id: string;
  year: string;
  headline: string;
  note: string;
  marginWhisper: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "y-2024",
    year: "2024",
    headline: "Started taking web development seriously.",
    note: "Moved past copying layouts—spent months wrestling with state, layouts, and why good interfaces feel effortless when small details are respected.",
    marginWhisper: "first pages built from blank files",
  },
  {
    id: "y-2025",
    year: "2025",
    headline: "Built more. Broke more. Learned more.",
    note: "Shipped messy full-stack prototypes, broke production APIs at 2 AM, discovered film pacing and editorial typography, and began caring equally about architecture and taste.",
    marginWhisper: "where bugs turned into real intuition",
  },
  {
    id: "y-2026",
    year: "2026",
    headline:
      "Started contributing to open source and building projects that pushed me beyond tutorials.",
    note: "Opened unfamiliar repositories like AccordProject / APAP, shipped EchoSentinel and Yojana Saathi, and treated software as real craft rather than portfolio checklists.",
    marginWhisper: "reading real-world codebases",
  },
  {
    id: "y-now",
    year: "NOW",
    headline: "Still learning. Still building. Still curious about what comes next.",
    note: "Exploring backend reliability, AI systems that actually clarify complexity, and keeping a personal sketchbook alive on the internet.",
    marginWhisper: "page still open",
  },
];
