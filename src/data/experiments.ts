export interface LabExperiment {
  id: string;
  code: string;
  title: string;
  status: "EXPERIMENTAL" | "IN PROGRESS" | "LOADING...";
  domain: string;
  updated: string;
  hypothesis: string;
  notes: string[];
  stack: string[];
  progress: number;
}

export const EXPERIMENTS: LabExperiment[] = [
  {
    id: "ai-portfolio-reviewer",
    code: "LAB_001",
    title: "AI PORTFOLIO REVIEWER",
    status: "EXPERIMENTAL",
    domain: "EVALUATION / DESIGN CRITIQUE",
    updated: "REV 0.4",
    hypothesis:
      "Can a vision-and-DOM pipeline critique a developer's portfolio for hierarchy, narrative clarity, and signal-to-noise ratio instead of generic checklist scores?",
    notes: [
      "Extracts typographic scale, fold density, and project storytelling depth.",
      "Separates structural feedback from cosmetic style preferences.",
      "Testing calibrated critique prompts against curated editorial benchmarks.",
    ],
    stack: ["Python", "Playwright", "Vision LLM", "Next.js"],
    progress: 64,
  },
  {
    id: "github-intelligence",
    code: "LAB_002",
    title: "GITHUB INTELLIGENCE",
    status: "IN PROGRESS",
    domain: "CODEBASE TOPOLOGY / OSS",
    updated: "REV 0.2",
    hypothesis:
      "Mapping an open-source repository by contribution entry points, module coupling, and maintainer rhythm so first-time contributors find real leverage fast.",
    notes: [
      "Parses commit velocity, issue label entropy, and PR review turnaround.",
      "Identifies 'high-clarity, low-blast-radius' modules for initial PRs.",
      "Built directly out of friction experienced when entering unfamiliar repos.",
    ],
    stack: ["TypeScript", "GitHub GraphQL", "AST Analysis"],
    progress: 42,
  },
  {
    id: "unknown-project",
    code: "LAB_003",
    title: "UNKNOWN PROJECT",
    status: "LOADING...",
    domain: "UNCLASSIFIED / EARLY SIGNAL",
    updated: "REV 0.0",
    hypothesis:
      "An unannounced study hovering between spatial typography, audio-reactive editorial grids, and local-first personal knowledge.",
    notes: [
      "Collecting fragments in private notebooks.",
      "Waiting for the smallest viable form to reveal itself.",
    ],
    stack: ["Canvas", "Web Audio", "TypeScript"],
    progress: 14,
  },
];
