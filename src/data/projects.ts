export interface ProjectStory {
  idea: string;
  problem: string;
  built: string;
  learned: string;
  architectureNodes: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  year: string;
  tagline: string;
  summary: string;
  stack: string[];
  role: string;
  worldMood: "technical" | "human" | "studio" | "sketch";
  plateVariant: "echo" | "yojana" | "workspace" | "future";
  marginAnnotation: string;
  codeExcerpt?: {
    label: string;
    lines: string[];
  };
  story: ProjectStory;
  links: {
    github?: string;
    live?: string;
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "echosentinel",
    number: "01",
    slug: "echosentinel",
    title: "ECHOSENTINEL",
    year: "2026",
    tagline: "A system built to listen when other systems go quiet.",
    summary:
      "AI-assisted observability that reads raw event streams against rolling behavioral baselines—catching silent drift early without burying engineers under noisy alert thresholds.",
    stack: ["Python", "FastAPI", "React"],
    role: "Architecture, Ingestion Pipeline & Investigation UI",
    worldMood: "technical",
    plateVariant: "echo",
    marginAnnotation: "catching quiet drift before uptime pages turn red",
    codeExcerpt: {
      label: "listener.py",
      lines: [
        "async def watch_stream(events: AsyncIterator[Signal]):",
        "    baseline = RollingWindow(horizon='15m')",
        "    async for signal in events:",
        "        if baseline.z_score(signal) > DRIFT_LIMIT:",
        "            await triage.explain(signal, context=baseline.tail())",
      ],
    },
    story: {
      idea:
        "What if monitoring software read behavioral silence and subtle statistical drift the way an engineer listens to an engine—instead of screaming after an outage already happened?",
      problem:
        "Modern services degrade quietly long before an uptime ping turns red, while rigid threshold alerts drown teams in false positives across thousands of log lines.",
      built:
        "An asynchronous FastAPI stream listener paired with rolling 15-minute baseline scoring, LLM-assisted trace summarization, and a calm React investigation surface.",
      learned:
        "Signal clarity matters more than dashboard density. Designing for calm triage forced me to think deeply about latency budgets, false-positive ratios, and concise narrative error states.",
      architectureNodes: [
        "Event Stream",
        "FastAPI Ingest",
        "Rolling Baseline",
        "Context Synthesizer",
        "Narrative Trace",
      ],
    },
    links: {},
  },
  {
    id: "yojana-saathi",
    number: "02",
    slug: "yojana-saathi",
    title: "YOJANA SAATHI",
    year: "2026",
    tagline:
      "Turning dense public welfare circulars into warm, human-readable guidance.",
    summary:
      "A civic discovery companion that anchors plain conversational answers directly to verified government scheme clauses—built so eligibility doesn't remain trapped in forty-page PDFs.",
    stack: ["Next.js", "TypeScript", "Python", "RAG"],
    role: "Product Engineering & Citation Retrieval",
    worldMood: "human",
    plateVariant: "yojana",
    marginAnnotation: "every answer anchored to its original circular clause",
    story: {
      idea:
        "Build a translator between bureaucratic gazettes and the everyday families those welfare schemes were actually written to help.",
      problem:
        "Hundreds of public schemes exist, yet eligibility rules, income ceilings, and required annexures stay locked inside legalese PDFs that intimidate first-time readers.",
      built:
        "A retrieval pipeline indexing verified scheme circulars into clause-level chunks with direct citation pointers, wrapped in a warm, accessible Next.js dialogue flow.",
      learned:
        "In civic software, trust is fragile. Showing the exact source clause next to plain human guidance made the system dramatically more honest than a generic chat response.",
      architectureNodes: [
        "Official Circulars",
        "Clause Chunks",
        "Citation Index",
        "Guided Query",
        "Citizen Summary",
      ],
    },
    links: {},
  },
  {
    id: "college-club-workspace",
    number: "03",
    slug: "college-club-workspace",
    title: "COLLEGE CLUB WORKSPACE",
    year: "2026",
    tagline:
      "A shared studio built so student projects outlive a single semester.",
    summary:
      "Replacing expiring chat threads and scattered sheets with calm project rooms, event handoffs, and living cohort memory.",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS"],
    role: "System Design & Full-Stack Interface",
    worldMood: "studio",
    plateVariant: "workspace",
    marginAnnotation: "built so context doesn't graduate with seniors",
    story: {
      idea:
        "Give student collectives one quiet studio where specs, assets, and event postmortems survive from one graduating batch to the next.",
      problem:
        "Every academic year, campus teams lose half their institutional knowledge inside buried drive folders and disconnected group chats.",
      built:
        "A relational Next.js and PostgreSQL workspace organized around studio rooms, milestone handoff notes, and an archival cohort ledger.",
      learned:
        "Software for busy volunteers succeeds through low friction—modeling real club rituals beat over-engineering complex permissions.",
      architectureNodes: [
        "Studio Rooms",
        "Handoff Notes",
        "Event Ledger",
        "Asset Shelf",
        "Cohort Memory",
      ],
    },
    links: {},
  },
  {
    id: "future-archive-engine",
    number: "04",
    slug: "future-archive-engine",
    title: "WHAT COMES NEXT",
    year: "2026+",
    tagline:
      "An open frame reserved for the next tool taking shape in the margins.",
    summary:
      "Exploring local-first developer tools and calmer web software before rushing into implementation.",
    stack: ["Systems", "AI Tooling", "Web"],
    role: "Research & Prototyping",
    worldMood: "sketch",
    plateVariant: "future",
    marginAnnotation: "drafted in ink before code",
    story: {
      idea:
        "Keep a visible blank page in the archive for ideas currently incubating in notebooks and late-night prototypes.",
      problem:
        "Rushing straight into heavy boilerplate kills fragile early ideas before their real shape emerges.",
      built:
        "Small standalone primitives in the Create workbench—testing latency, typography, and real utility before graduating one here.",
      learned:
        "Patience before writing production code usually saves weeks of refactoring later.",
      architectureNodes: ["Margin Notes", "Prototype", "System Spec", "Release"],
    },
    links: {},
  },
];
