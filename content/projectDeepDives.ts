import type { ProjectId } from "./projects";

export type DeepDiveSectionId =
  | "overview"
  | "architecture"
  | "flow"
  | "code"
  | "decisions"
  | "future";

export interface DeepDiveSectionMeta {
  id: DeepDiveSectionId;
  label: string;
}

export const DEEP_DIVE_SECTIONS: DeepDiveSectionMeta[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "flow", label: "System Flow" },
  { id: "code", label: "Code Structure" },
  { id: "decisions", label: "Engineering Decisions" },
  { id: "future", label: "Future Improvements" },
];

type DeepDiveBlock =
  | { type: "text"; body: string }
  | { type: "bullet-list"; items: string[] }
  | { type: "steps"; title?: string; items: string[] }
  | {
      type: "architecture-diagram";
      title?: string;
      nodes: { id: string; label: string; role?: string }[];
      flows: { from: string; to: string; label?: string }[];
    }
  | {
      type: "module-map";
      title?: string;
      groups: { label: string; modules: string[] }[];
    };

export interface DeepDiveSection {
  id: DeepDiveSectionId;
  summary?: string;
  blocks: DeepDiveBlock[];
}

export interface ProjectDeepDive {
  id: ProjectId;
  quickSummary: string;
  sections: DeepDiveSection[];
}

export const projectDeepDives: Record<ProjectId, ProjectDeepDive> = {
  "media-auth-api": {
    id: "media-auth-api",
    quickSummary:
      "Verification-oriented API that analyzes images for likely synthetic vs likely authentic, returns signed authenticity records, and exposes a verification endpoint.",
    sections: [
      {
        id: "overview",
        summary:
          "Media Authenticity API provides a focused way to analyze images for authenticity and verify that results came from this service and were not tampered with.",
        blocks: [
          {
            type: "text",
            body:
              "The API accepts uploaded images, runs them through one or more Hugging Face–based detectors, and returns a structured authenticity record. Each record is signed with HMAC-SHA256 so downstream systems can verify that the result came from this service.",
          },
          {
            type: "bullet-list",
            items: [
              "Single-image and batch analysis endpoints with consistent response shape",
              "Detector abstraction that supports multiple image models and ensemble runs",
              "Signed authenticity records plus a dedicated POST /api/verify endpoint",
            ],
          },
        ],
      },
      {
        id: "architecture",
        summary:
          "Requests flow through validation, hashing, cache lookup, detector orchestration, and signing. Verification recomputes the HMAC over a canonical payload and compares it in constant time.",
        blocks: [
          {
            type: "architecture-diagram",
            title: "Analysis pipeline",
            nodes: [
              { id: "http", label: "HTTP layer", role: "Next.js API route" },
              { id: "validate", label: "Validator", role: "size/type checks" },
              { id: "hash", label: "Hasher", role: "file hash" },
              { id: "cache", label: "Cache", role: "in-memory or file-backed" },
              { id: "orchestrator", label: "Orchestrator", role: "mode + detector selection" },
              { id: "detectors", label: "Detectors", role: "Hugging Face models" },
              { id: "sign", label: "Signer", role: "HMAC-SHA256" },
              { id: "response", label: "Signed record", role: "verdict + metadata" },
            ],
            flows: [
              { from: "http", to: "validate" },
              { from: "validate", to: "hash", label: "valid image" },
              { from: "hash", to: "cache", label: "lookup/set" },
              { from: "cache", to: "orchestrator", label: "miss" },
              { from: "orchestrator", to: "detectors", label: "single / ensemble" },
              { from: "detectors", to: "sign", label: "verdict" },
              { from: "sign", to: "response" },
            ],
          },
          {
            type: "module-map",
            title: "Modules at a glance",
            groups: [
              {
                label: "Routes",
                modules: ["/api/analyze", "/api/analyze/batch", "/api/verify", "/api/health"],
              },
              {
                label: "Core",
                modules: ["lib/orchestrator", "lib/cache", "lib/signing", "lib/rateLimit"],
              },
              {
                label: "Detectors",
                modules: [
                  "lib/detectors/image/huggingface-image-v1",
                  "lib/detectors/image/huggingface-image-v2",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "flow",
        summary: "Two core flows: analyze media and verify a previously issued authenticity record.",
        blocks: [
          {
            type: "steps",
            title: "Analyze flow",
            items: [
              "Client uploads an image to POST /api/analyze or /api/analyze/batch.",
              "The server validates format, size, and dimensions.",
              "The file is hashed and the cache is checked for an existing record.",
              "On a cache miss, the orchestrator selects detectors based on mode and detector_id.",
              "Detectors run via the Hugging Face Inference API and produce raw predictions.",
              "The orchestrator aggregates results into a verdict and builds an authenticity record.",
              "The record is signed with HMAC-SHA256 and returned to the client.",
            ],
          },
          {
            type: "steps",
            title: "Verification flow",
            items: [
              "Client posts analysis_id, timestamp, prediction, confidence, model, and signature to POST /api/verify.",
              "The server rebuilds the canonical payload and recomputes the HMAC using SIGNING_SECRET.",
              "The signature is compared using a constant-time comparison.",
              "The endpoint returns { valid: true } or { valid: false, reason }.",
            ],
          },
        ],
      },
      {
        id: "code",
        summary: "Code is organized by HTTP surface area, orchestration core, detectors, and cross-cutting concerns like caching and signing.",
        blocks: [
          {
            type: "module-map",
            groups: [
              {
                label: "Surface",
                modules: ["app/api/analyze/route.ts", "app/api/analyze/batch/route.ts", "app/api/verify/route.ts"],
              },
              {
                label: "Core orchestration",
                modules: ["lib/orchestrator.ts", "lib/buildRecord.ts"],
              },
              {
                label: "Infrastructure",
                modules: ["lib/cache.ts", "lib/rateLimit.ts", "lib/signing.ts", "lib/env.ts"],
              },
              {
                label: "Detectors",
                modules: ["lib/detectors/image/*"],
              },
            ],
          },
        ],
      },
      {
        id: "decisions",
        summary: "Design choices focus on making the API easy to integrate while keeping verification straightforward and explicit.",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Use HMAC with a shared secret instead of public-key infrastructure for simpler deployment.",
              "Keep analysis and verification as separate endpoints so verification can be performed offline or by downstream services.",
              "Represent detectors via an explicit registry to make adding or swapping models straightforward.",
              "Use a TTL cache keyed by file hash to avoid repeatedly analyzing the same media while keeping behavior simple to reason about.",
              "Include mode and detector identifiers in the signed payload so clients can understand which models were used.",
            ],
          },
        ],
      },
      {
        id: "future",
        summary: "Areas to extend include additional media types, stronger persistence, and richer operational tooling.",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Add audio and video detectors to match the existing type and validation layout.",
              "Introduce persistent storage for analysis records instead of cache-only operation.",
              "Expose richer operational metrics and dashboards around detector performance and cache efficiency.",
              "Evaluate additional models as the generative media landscape evolves.",
            ],
          },
        ],
      },
    ],
  },
  "physician-connection": {
    id: "physician-connection",
    quickSummary:
      "Modular Next.js SaaS application coordinating scheduling workflows between pharmaceutical reps and physician practices with role-based dashboards and operational tooling.",
    sections: [
      {
        id: "overview",
        summary:
          "Physician Connection is a modular Next.js SaaS application that connects pharmaceutical representatives with physician practices through scheduling workflows, multi-role dashboards, and administration tooling.",
        blocks: [
          {
            type: "text",
            body:
              "The platform coordinates access between reps, practice staff, physicians, and super-admins. Work centered on stabilizing end-to-end scheduling flows, clarifying role-based behavior, and making the system feel predictable as it moved toward MVP readiness.",
          },
          {
            type: "bullet-list",
            items: [
              "Role-specific dashboards for reps, practice staff, physicians, and super-admins.",
              "Scheduling workflows that coordinate rep visits with practice calendars instead of ad-hoc booking.",
              "Operational views and tooling for seeding test data and monitoring system health.",
            ],
          },
        ],
      },
      {
        id: "architecture",
        summary:
          "A Next.js and TypeScript application with role-partitioned routing, domain modules for calendar and messaging, and workflows centered on rep–practice scheduling and coordination.",
        blocks: [
          {
            type: "architecture-diagram",
            title: "High-level platform layout",
            nodes: [
              { id: "client", label: "Client UI", role: "Next.js pages & React views" },
              { id: "auth", label: "Auth & roles", role: "protected routes + role-aware routing" },
              { id: "api", label: "Application API", role: "scheduling, calendar, and messaging endpoints" },
              { id: "db", label: "Database (Drizzle ORM)", role: "appointments, practices, users, roles" },
              { id: "ops", label: "Ops & admin", role: "super-admin and operational tooling surfaces" },
            ],
            flows: [
              { from: "client", to: "auth", label: "login + role resolution" },
              { from: "auth", to: "api", label: "authorized requests" },
              { from: "api", to: "db", label: "query/update domain tables" },
              { from: "db", to: "ops", label: "seed, cleanup, and debugging actions" },
            ],
          },
          {
            type: "bullet-list",
            items: [
              "Role-aware routing: each role (physician, practice admin, rep, super-admin) has its own application surface.",
              "Calendar and scheduling modules integrate with Cal.com rather than implementing a custom scheduling engine.",
              "Messaging modules support presence and coordination features around visits.",
              "Operational tooling exists in the same application so super-admins can seed data and debug issues directly.",
            ],
          },
        ],
      },
      {
        id: "flow",
        summary: "Core flows revolve around booking, approving, and executing appointments while keeping access rules explicit.",
        blocks: [
          {
            type: "steps",
            title: "Representative booking flow",
            items: [
              "Representative signs in and lands on a dashboard filtered to their territories and practices.",
              "Rep requests a visit slot at a given practice using scheduling workflows backed by Cal.com.",
              "Platform evaluates practice-specific access rules and availability.",
              "Practice users review pending requests and approve, modify, or decline.",
              "Confirmed visits surface on dashboards for both reps and practice staff.",
            ],
          },
          {
            type: "steps",
            title: "Admin / super-admin flow",
            items: [
              "Super-admin uses dedicated surfaces and API routes to seed test physicians, practices, and reps.",
              "Operational endpoints and error-log views help debug issues in lower environments.",
              "Configuration and cleanup actions are performed through API routes rather than ad-hoc scripts.",
            ],
          },
        ],
      },
      {
        id: "code",
        summary:
          "Implementation work focused on tightening auth, role-aware routing, and end-to-end scheduling and coordination workflows rather than designing a new scheduling engine.",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Clarified role checks at the routing and component level to reduce accidental access.",
              "Hardened scheduling and approval flows by making states explicit and easier to reason about across roles.",
              "Improved error handling and operational paths so issues surface through admin tools instead of user confusion.",
            ],
          },
        ],
      },
      {
        id: "decisions",
        summary:
          "Engineering decisions emphasized predictable workflows, clear roles, and stability as the product moved toward MVP.",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Favor explicit role checks over implicit behavior to make access rules reviewable by product and operations.",
              "Use Cal.com integration for scheduling rather than building a bespoke engine, keeping ownership clear.",
              "Push more information into dashboards and admin tools so support teams do not need database access to debug issues.",
              "Iterate on workflows in-place instead of large rewrites so the team could ship improvements safely.",
            ],
          },
        ],
      },
      {
        id: "future",
        summary:
          "Future work would deepen reporting, automation, and self-serve configuration for markets and practices.",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Richer analytics around appointment patterns, cancellations, and rule effectiveness.",
              "More self-serve configuration for markets and practices, with safe defaults per region.",
              "Stronger audit trails for access rule changes and appointment overrides.",
            ],
          },
        ],
      },
    ],
  },
  chrisos: {
    id: "chrisos",
    quickSummary:
      "Desktop-style, browser-based portfolio that exposes projects, resume, and tech stack as applications inside a windowed shell and mobile interface.",
    sections: [
      {
        id: "overview",
        summary:
          "ChrisOS treats a portfolio as an OS-inspired, desktop-style interface: windows, dock, terminal, and a mobile shell that all share the same application model inside the browser.",
        blocks: [
          {
            type: "text",
            body:
              "Instead of a flat resume site, ChrisOS presents projects, resume, and tech stack as first-class applications running in a windowed desktop-style shell and a mobile shell. The goal is to show how I think about frontend systems, shared state, and product storytelling — not just list bullets.",
          },
          {
            type: "bullet-list",
            items: [
              "Desktop shell with wallpaper, menu bar, dock, launcher, and draggable windows.",
              "Mobile shell that keeps the same apps but adapts the chrome and interaction.",
              "Terminal that exposes portfolio content as commands, mirroring real-world tooling.",
            ],
          },
        ],
      },
      {
        id: "architecture",
        summary:
          "A Next.js App Router app composed of shared window state, desktop and mobile shells, and a theming system for light/dark tokens.",
        blocks: [
          {
            type: "architecture-diagram",
            title: "Surface layout",
            nodes: [
              { id: "desktop-shell", label: "DesktopShell", role: "wallpaper + windows + dock" },
              { id: "mobile-shell", label: "MobileShell", role: "launcher + app view + system bar" },
              { id: "window-store", label: "windowStore", role: "shared window & focus state" },
              { id: "apps", label: "App components", role: "resume, projects, tech stack, about, contact, deep-dive, terminal" },
              { id: "theme", label: "ThemeProvider + themeStore", role: "light/dark theme tokens" },
            ],
            flows: [
              { from: "desktop-shell", to: "window-store", label: "openApp / focus / layout" },
              { from: "mobile-shell", to: "window-store", label: "shared window model" },
              { from: "window-store", to: "apps", label: "WindowState + payload" },
              { from: "theme", to: "desktop-shell", label: "CSS variables" },
              { from: "theme", to: "mobile-shell", label: "CSS variables" },
            ],
          },
          {
            type: "module-map",
            title: "Shell & system modules",
            groups: [
              {
                label: "Desktop",
                modules: [
                  "components/layout/DesktopShell",
                  "components/desktop/WindowManager",
                  "components/desktop/Window",
                  "components/desktop/DesktopLauncher",
                  "components/desktop/Taskbar",
                ],
              },
              {
                label: "Mobile",
                modules: [
                  "components/layout/MobileShell",
                  "components/mobile/MobileLauncher",
                  "components/mobile/MobileAppView",
                  "components/mobile/MobileSystemBar",
                  "components/mobile/MobileTerminalScene",
                ],
              },
              {
                label: "State",
                modules: [
                  "lib/windowStore",
                  "lib/WindowContext",
                  "lib/themeStore",
                  "components/theme/ThemeProvider",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "flow",
        summary:
          "Windows are opened through a shared store, rendered into desktop or mobile shells, and themed through CSS variables.",
        blocks: [
          {
            type: "steps",
            title: "Opening an app",
            items: [
              "User taps a launcher tile, dock icon, or runs a terminal command.",
              "The interaction calls openApp(appId, options) on the shared windowStore.",
              "windowStore either focuses an existing window (updating payload) or creates a new WindowState.",
              "DesktopShell or MobileShell renders WindowManager / MobileAppView against the current windows array.",
              "The targeted app component reads its WindowState via WindowContext and uses any payload for deep-linking.",
            ],
          },
          {
            type: "steps",
            title: "Mobile terminal flow",
            items: [
              "On mobile, the terminal runs as a full-screen overlay (MobileTerminalScene) instead of an in-window view.",
              "Commands share definitions with the desktop terminal but are presented as tappable chips.",
              "Actions from the terminal call openApp just like the dock, keeping behavior consistent.",
            ],
          },
        ],
      },
      {
        id: "code",
        summary:
          "Core code is split between shell/layout components, app-level components, and small libraries that hold shared state and config.",
        blocks: [
          {
            type: "module-map",
            title: "Code organization",
            groups: [
              {
                label: "Apps",
                modules: [
                  "components/apps/ProjectsApp",
                  "components/apps/ResumeApp",
                  "components/apps/TechStackApp",
                  "components/apps/AboutApp",
                  "components/apps/ContactApp",
                  "components/apps/TerminalApp",
                  "components/apps/ProjectDeepDiveApp",
                ],
              },
              {
                label: "Terminal",
                modules: [
                  "components/apps/TerminalDesktop",
                  "components/apps/TerminalMobile",
                  "lib/terminalCommands",
                ],
              },
              {
                label: "Data",
                modules: [
                  "content/projects",
                  "content/projectDeepDives",
                  "content/resume",
                  "content/about",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "decisions",
        summary:
          "Design decisions emphasize using OS metaphors to communicate systems thinking while keeping the implementation approachable.",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Treat portfolio sections as apps rather than pages to model real product surfaces.",
              "Use a single window store so both desktop and mobile shells share the same abstraction.",
              "Keep deep-dive content in a data file instead of hardcoded JSX so content and presentation stay decoupled.",
              "Use the terminal as a narrative device that still maps cleanly onto real engineering workflows.",
            ],
          },
        ],
      },
      {
        id: "future",
        summary:
          "There is room to expand ChrisOS into a richer environment for live demos, experiments, and interactive case studies.",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Add live mini-demos for specific flows (e.g. auth, background jobs) alongside descriptions.",
              "Introduce more app types (logs, metrics, experiments) to model how production environments feel.",
              "Explore persistence for terminal history or window layouts to make the OS feel more personal over time.",
            ],
          },
        ],
      },
    ],
  },
  "cape-fear-web": {
    id: "cape-fear-web",
    quickSummary:
      "Identity and marketing surface used to route people into case studies, portfolio content, and contact paths.",
    sections: [],
  },
  "thank-you-for-dying": {
    id: "thank-you-for-dying",
    quickSummary:
      "Experimental immersive brand and event concept; details are not exposed as a deep dive here.",
    sections: [],
  },
  "regal-rides": {
    id: "regal-rides",
    quickSummary:
      "Client-facing booking experience built on a customized frontend; no deep dive content is currently published.",
    sections: [],
  },
  "ronald-wayne": {
    id: "ronald-wayne",
    quickSummary:
      "Informational and ecommerce site; deep dive content is omitted to keep the focus on core engineering work.",
    sections: [],
  },
  siteos: {
    id: "siteos",
    quickSummary:
      "Construction execution intelligence platform — private repo with public architecture case study draft.",
    sections: [],
  },
  "elite-touch-client-portal": {
    id: "elite-touch-client-portal",
    quickSummary:
      "Client companion and ops portal for commercial cleaning — SOS path, notifications, admin triage.",
    sections: [],
  },
  "elite-touch-proposals": {
    id: "elite-touch-proposals",
    quickSummary:
      "Internal Elite Touch proposal and PDF generation tool — related to client portal case study.",
    sections: [],
  },
  "regen-profits": {
    id: "regen-profits",
    quickSummary:
      "Mobile-first sales PWA for reps and admins — private client work with staging deployment.",
    sections: [],
  },
  "remember-me": {
    id: "remember-me",
    quickSummary:
      "Consumer gifting MVP with demo mode and honest Phase 1 scope boundaries.",
    sections: [],
  },
  "genesis-mastery": {
    id: "genesis-mastery",
    quickSummary: "EdTech curriculum platform scaffold — private, early stage.",
    sections: [],
  },
  "wilmington-engine": {
    id: "wilmington-engine",
    quickSummary: "News/content automation engine R&D — experimental private repo.",
    sections: [],
  },
  "visual-conversations": {
    id: "visual-conversations",
    quickSummary: "UI intent Chrome extension + CLI — experimental dev tool.",
    sections: [],
  },
  "pathbound-mobile": {
    id: "pathbound-mobile",
    quickSummary: "Godot 4 game lab — personal project, optional portfolio signal.",
    sections: [],
  },
};

