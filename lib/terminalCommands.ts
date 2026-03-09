import type { AppId } from "./types";

export type TerminalAction = {
  label: string;
  appId: AppId;
  /** When appId is "projects", open to this project id (e.g. physician-connection). */
  projectId?: string;
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
  cape-fear       — Cape Fear Web Co overview
  chrisos         — ChrisOS interface overview
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

/** Shared command definitions: output text + optional actions. Same vocabulary for desktop and mobile. */
export const TERMINAL_COMMANDS: Record<string, TerminalCommandDef> = {
  help: {
    output: HELP_OUTPUT,
  },
  projects: {
    output: `Loaded featured work:
- Physician Connection Platform
- Cape Fear Web Co
- ChrisOS

Actions:`,
    actions: [
      { label: "Open Physician Connection", appId: "projects", projectId: "physician-connection" },
      { label: "Open Cape Fear Web Co", appId: "projects", projectId: "cape-fear-web" },
      { label: "Open ChrisOS", appId: "projects", projectId: "chrisos" },
    ],
  },
  physician: {
    output: `Physician Connection Platform
────────────────────────────────
Operational SaaS for pharmaceutical rep access to healthcare practices.

• Multi-role dashboards (reps, practice staff, admins)
• Centralized appointment workflows and access rules
• Internal error logging and resolution flows
• Super-admin views for system health

Focus: taking an unstable MVP toward launch-ready.`,
    actions: [{ label: "View Case Study", appId: "projects", projectId: "physician-connection" }],
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
Experimental portfolio that behaves like an operating system.

• Desktop and mobile shells, windows, dock, launcher
• Projects, resume, tech stack as first-class "apps"
• Interaction design and product storytelling

Goal: portfolio as software, not a static site.`,
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
