export interface ContributionEntry {
  id: string;
  year: string;
  repo: string;
  summary: string;
  status: "MERGED" | "OPENING";
  prRef?: string;
  issue: string;
  contribution: string;
  learned: string;
  codeFragment?: {
    filename: string;
    before: string;
    after: string;
  };
}

export const CONTRIBUTIONS: ContributionEntry[] = [
  {
    id: "accordproject-apap",
    year: "2026",
    repo: "AccordProject / APAP",
    summary: "Improved query parameter validation.",
    status: "MERGED",
    prRef: "pull request · query validation",
    issue:
      "Query endpoints accepted loosely shaped filter parameters without explicit boundary checks, letting malformed queries propagate downstream until they triggered ambiguous runtime errors.",
    contribution:
      "Traced the request lifecycle through the router and parser, introduced strict parameter validation at the boundary with readable error messages, and added targeted tests for missing and malformed fields.",
    learned:
      "Reading an unfamiliar codebase starts at its failure edges. Fixing one small contract teaches you more about how maintainers reason about reliability than building ten solo demos.",
    codeFragment: {
      filename: "packages/apap-server/src/validateQuery.ts",
      before: "const { filter, limit } = req.query;",
      after:
        "const parsed = QuerySchema.safeParse(req.query);\nif (!parsed.success) return res.status(400).json({ error: parsed.error.issues });",
    },
  },
  {
    id: "next-contribution",
    year: "2026",
    repo: "Next Pull Request",
    summary: "Currently reading issue threads across backend tooling and TypeScript infrastructure.",
    status: "OPENING",
    issue:
      "Finding small, real-world friction points where reproduction tests and careful reading help maintainers directly.",
    contribution:
      "Tracing local test suites and isolating minimal patches before opening a PR.",
    learned:
      "Understanding someone else's design decisions slowly builds architectural empathy.",
  },
];
