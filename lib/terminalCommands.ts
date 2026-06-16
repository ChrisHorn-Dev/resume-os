import type { AppId } from "./types";

export type TerminalAction = {
  label: string;
  appId: AppId;
  /** When appId is "projects", open to this project id (e.g. physician-connection). */
  projectId?: string;
  /** Optional deep-dive section hint (e.g. "architecture"). */
  sectionId?: string;
};

export type TerminalCommandDef = {
  output: string;
  /** Clickable terminal-style actions (e.g. Open Resume). Omit for help, dev commands. */
  actions?: TerminalAction[];
};

const HELP_OUTPUT = `Available commands:
  help            — show this help
  projects        — featured work overview
  physician       — Physician Connection Platform case study
  siteos          — SiteOS construction intelligence overview
  elite-touch     — Elite Touch client ops portal overview
  cape-fear       — Cape Fear Web Co overview
  chrisos         — ChrisOS portfolio shell overview
  architecture    — system architecture
  stack           — tech stack
  build-log       — build notes
  resume          — open resume
  contact         — open contact
  about           — open about
  pnpm lint       — run lint checks
  pnpm typecheck  — run type check
  pnpm build      — production build
  clear           — clear console`;

const PROJECT_ALIAS_TO_ID: Record<string, string> = {
  physician: "physician-connection",
  "physician-connection": "physician-connection",
  "media-api": "media-auth-api",
  "media-auth": "media-auth-api",
  "media-auth-api": "media-auth-api",
  chrisos: "chrisos",
  siteos: "siteos",
  "elite-touch": "elite-touch-client-portal",
};

/** Shared command definitions: output text + optional actions. Same vocabulary for desktop and mobile. */
export const TERMINAL_COMMANDS: Record<string, TerminalCommandDef> = {
  help: {
    output: HELP_OUTPUT,
  },
  projects: {
    output: `Loaded featured work:
- Physician Connection Platform
- SiteOS
- Elite Touch Client Portal
- Cape Fear Web Co
- ChrisOS (this portfolio)

Actions:`,
    actions: [
      { label: "Open Physician Connection", appId: "projects", projectId: "physician-connection" },
      { label: "Open SiteOS", appId: "projects", projectId: "siteos" },
      { label: "Open Elite Touch", appId: "projects", projectId: "elite-touch-client-portal" },
      { label: "Open Cape Fear Web Co", appId: "projects", projectId: "cape-fear-web" },
    ],
  },
  physician: {
    output: `Physician Connection Platform
────────────────────────────────
Multi-role healthcare SaaS for rep–practice appointment coordination.

• Guided booking flows that prevent partial/ambiguous state
• Role-based dashboards for reps, practices, physicians, and admins
• Cal.com integration with domain ownership in PC
• Production migration and observability hardening

Focus: fragile prototype → MVP-ready production software.`,
    actions: [{ label: "View Case Study", appId: "projects", projectId: "physician-connection" }],
  },
  siteos: {
    output: `SiteOS
──────
Construction intelligence platform for custom builders.

• Portfolio signals, executive dashboards, and cost intelligence
• FastAPI + Celery ingestion pipelines and time-series data
• Document intelligence with cited project Q&A
• Expo mobile client for field workflows

Private repo — public architecture case study available.`,
    actions: [{ label: "View Case Study", appId: "projects", projectId: "siteos" }],
  },
  "elite-touch": {
    output: `Elite Touch Client Portal
─────────────────────────
Client ops system for a commercial cleaning company.

• Typed service requests and separate SOS emergency path
• Admin triage queue with notification audit trail
• Twilio SMS + Resend email with mock mode for demos
• Proposal/PDF generator in the same client ecosystem

Private repo — public case study available.`,
    actions: [{ label: "View Case Study", appId: "projects", projectId: "elite-touch-client-portal" }],
  },
  "cape-fear": {
    output: `Cape Fear Web Co
────────────────
Marketing site for my web design and development studio.

• Fast, SEO-friendly pages for small/mid-sized businesses
• Clear service framing and trust-building content
• Component-driven frontend for client builds

Focus: modern, affordable web presence.`,
    actions: [{ label: "View Case Study", appId: "projects", projectId: "cape-fear-web" }],
  },
  chrisos: {
    output: `ChrisOS
───────
Interactive portfolio shell — window manager, terminal, and mobile layout.

• Presents architecture case studies for private flagship work
• Desktop and mobile shells share the same project model
• Resume, projects, and deep dives as first-class "apps"

Goal: senior positioning with proof, not a static PDF.`,
    actions: [{ label: "Open ChrisOS Overview", appId: "about" }],
  },
  architecture: {
    output: `Displaying system overview…
- Next.js application shell
- windowed desktop/mobile UI modes
- shared surface primitives
- responsive launcher and workspace logic`,
    actions: [{ label: "View System Overview", appId: "about" }],
  },
  stack: {
    output: `Primary technologies:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- PostgreSQL
- Drizzle ORM`,
    actions: [{ label: "Open Tech Stack", appId: "techstack" }],
  },
  "build-log": {
    output: `Build Log — ChrisOS
────────────────────
• Portfolio as a small operating system
• Windows, dock, launcher as narrative tools
• Desktop and mobile share the same concepts
• Product storytelling over static sections
• Terminal and demos as part of the story`,
  },
  resume: {
    output: `Opening resume panel…

Actions:`,
    actions: [{ label: "Open Resume", appId: "resume" }],
  },
  contact: {
    output: `Opening contact panel…

Actions:`,
    actions: [{ label: "Open Contact Panel", appId: "contact" }],
  },
  about: {
    output: `Opening about panel…

Actions:`,
    actions: [{ label: "Open About", appId: "about" }],
  },
  techstack: {
    output: `Primary technologies:
- Next.js
- React
- TypeScript
- Tailwind CSS

Actions:`,
    actions: [{ label: "Open Tech Stack", appId: "techstack" }],
  },
  "pnpm lint": {
    output: `Running lint checks…
✓ No lint issues found`,
  },
  "pnpm typecheck": {
    output: `Checking TypeScript…
✓ Typecheck passed`,
  },
  "pnpm build": {
    output: `Creating production build…
✓ Build completed`,
  },
  "open physician-connection": {
    output: `Opening Physician Connection Platform deep dive (overview)…`,
    actions: [
      {
        label: "Open Physician Connection Overview",
        appId: "deepdive",
        projectId: PROJECT_ALIAS_TO_ID["physician-connection"],
        sectionId: "overview",
      },
    ],
  },
  "open media-api": {
    output: `Opening Media Authenticity API deep dive (overview)…`,
    actions: [
      {
        label: "Open Media Authenticity API Overview",
        appId: "deepdive",
        projectId: PROJECT_ALIAS_TO_ID["media-api"],
        sectionId: "overview",
      },
    ],
  },
  "open chrisos": {
    output: `Opening ChrisOS deep dive (overview)…`,
    actions: [
      {
        label: "Open ChrisOS Overview",
        appId: "deepdive",
        projectId: PROJECT_ALIAS_TO_ID["chrisos"],
        sectionId: "overview",
      },
    ],
  },
  "show architecture media-api": {
    output: `Opening Media Authenticity API — Architecture…`,
    actions: [
      {
        label: "View Media Auth API Architecture",
        appId: "deepdive",
        projectId: PROJECT_ALIAS_TO_ID["media-api"],
        sectionId: "architecture",
      },
    ],
  },
  "show architecture physician-connection": {
    output: `Opening Physician Connection Platform — Architecture…`,
    actions: [
      {
        label: "View Physician Connection Architecture",
        appId: "deepdive",
        projectId: PROJECT_ALIAS_TO_ID["physician-connection"],
        sectionId: "architecture",
      },
    ],
  },
  "show architecture chrisos": {
    output: `Opening ChrisOS — Architecture…`,
    actions: [
      {
        label: "View ChrisOS Architecture",
        appId: "deepdive",
        projectId: PROJECT_ALIAS_TO_ID["chrisos"],
        sectionId: "architecture",
      },
    ],
  },
  "show flow physician-connection": {
    output: `Opening Physician Connection Platform — System Flow…`,
    actions: [
      {
        label: "View Physician Connection Flow",
        appId: "deepdive",
        projectId: PROJECT_ALIAS_TO_ID["physician-connection"],
        sectionId: "flow",
      },
    ],
  },
  "show flow media-api": {
    output: `Opening Media Authenticity API — System Flow…`,
    actions: [
      {
        label: "View Media Auth API Flow",
        appId: "deepdive",
        projectId: PROJECT_ALIAS_TO_ID["media-api"],
        sectionId: "flow",
      },
    ],
  },
};

export const HELP_OUTPUT_TEXT = HELP_OUTPUT;

/** Normalize user input to a command key (e.g. "pnpm lint" or "projects"). */
export function parseCommand(raw: string): string | null {
  const t = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (!t) return null;
  if (t === "pnpm lint" || t === "pnpm typecheck" || t === "pnpm build") return t;
  if (TERMINAL_COMMANDS[t] != null) return t;
  if (t === "whoami") return "whoami";
  return t;
}

export function getCommandDef(cmd: string): TerminalCommandDef | null {
  return TERMINAL_COMMANDS[cmd] ?? null;
}

export const TAPPABLE_COMMAND_IDS = [
  "help",
  "projects",
  "physician",
  "cape-fear",
  "chrisos",
  "architecture",
  "stack",
  "build-log",
  "resume",
  "contact",
  "about",
  "pnpm lint",
  "pnpm typecheck",
  "pnpm build",
  "clear",
] as const;
