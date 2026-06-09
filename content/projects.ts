export type ProjectId =
  | "physician-connection"
  | "siteos"
  | "elite-touch-client-portal"
  | "elite-touch-proposals"
  | "regen-profits"
  | "remember-me"
  | "media-auth-api"
  | "cape-fear-web"
  | "genesis-mastery"
  | "wilmington-engine"
  | "visual-conversations"
  | "pathbound-mobile"
  | "thank-you-for-dying"
  | "regal-rides"
  | "ronald-wayne"
  | "chrisos";

export interface Project {
  id: ProjectId;
  name: string;
  description: string;
  tech: string[];
  link?: string;
  label: "case-study" | "private" | "live" | "interface" | "mvp" | "experimental";
  featured?: boolean;
  status?: string;
  details?: {
    overview: string;
    problem: string;
    solution: string;
    architecture: string;
    features: string[];
    links?: { label: string; href: string }[];
  };
}

const CASE_STUDIES = "https://github.com/ChrisHorn-Dev/case-studies";

export const projects: Project[] = [
  {
    id: "siteos",
    name: "SiteOS",
    description:
      "Construction dashboard system built around field updates, project signals, and executive-level views.",
    tech: ["FastAPI", "Celery", "Next.js", "Expo", "PostgreSQL"],
    label: "private",
    featured: true,
    status: "In development · private repo",
    details: {
      overview:
        "Python backend with workers, Next.js dashboards, and a mobile field app. Includes a separate signal-ingestion service for county-level data.",
      problem:
        "Construction ops data tends to live in spreadsheets, photos, and disconnected tools.",
      solution:
        "One platform shape for ingestion, project intelligence, and role-specific dashboards, with demo seed data for walkthroughs.",
      architecture:
        "FastAPI + Celery + PostgreSQL/TimescaleDB; Next.js frontends; Expo mobile; ML and LLM hooks for document/RFI workflows.",
      features: [
        "Multi-persona dashboard surfaces",
        "Background jobs for ingestion and scraping",
        "Demo project seeding for stakeholder review",
      ],
      links: [],
    },
  },
  {
    id: "physician-connection",
    name: "Physician Connection",
    description:
      "Healthcare SaaS for scheduling and coordination between pharma reps and physician practices.",
    tech: ["Next.js", "TypeScript", "Drizzle", "Better Auth", "Cal.com"],
    label: "case-study",
    featured: true,
    status: "Private repo · public case study",
    details: {
      overview:
        "Multi-role app: reps, practice staff, physicians, and super-admin tooling around Cal.com-backed scheduling.",
      problem:
        "Coordination lived in email and fragile production behavior blocked real-office use.",
      solution:
        "Structured request flows, clearer role boundaries, and hardening work on auth, database writes, and hosting.",
      architecture:
        "Next.js App Router, Drizzle on Neon, Better Auth, self-hosted Cal.com, Sentry on critical server paths.",
      features: [
        "Guided rep request flows",
        "Practice-side calendar and lifecycle views",
        "Production stabilization and infra migration",
      ],
      links: [
        {
          label: "Case study →",
          href: `${CASE_STUDIES}/blob/main/physician-connection.md`,
        },
      ],
    },
  },
  {
    id: "elite-touch-client-portal",
    name: "Elite Touch Cleaning Companion App",
    description:
      "Client portal for cleaning requests, emergency/SOS messages, admin triage, and ops notifications.",
    tech: ["Next.js", "Prisma", "Twilio", "Resend", "HubSpot"],
    label: "case-study",
    featured: true,
    status: "MVP · private repo",
    details: {
      overview:
        "Mobile-first client launcher plus admin queues for a commercial cleaning company.",
      problem:
        "Phone and email didn't give ops a durable record of requests or urgency.",
      solution:
        "Typed request lifecycle, separate SOS path, notification audit trail, and admin triage UI.",
      architecture:
        "Next.js App Router, Prisma, cookie sessions, centralized SMS/email fan-out with per-recipient logging.",
      features: [
        "Client modal flows for issues, notes, and supplies",
        "SOS emergency pipeline",
        "Admin triage with threads and attachments",
        "HubSpot contact sync",
      ],
      links: [
        {
          label: "Case study →",
          href: `${CASE_STUDIES}/blob/main/elite-touch-cleaning.md`,
        },
      ],
    },
  },
  {
    id: "elite-touch-proposals",
    name: "Elite Touch Proposal App",
    description:
      "Internal app for scope-of-work proposals and branded PDF output for Elite Touch sales.",
    tech: ["Next.js", "Prisma", "React PDF"],
    label: "private",
    featured: false,
    status: "Internal tool · private repo",
    details: {
      overview:
        "Proposal builder in the same client ecosystem as the companion portal, focused on PDF generation.",
      problem: "Manual proposal assembly was slow and inconsistent.",
      solution:
        "Structured proposal data model with PDF rendering and auth-gated admin flows.",
      architecture: "Next.js, Prisma, @react-pdf/renderer.",
      features: ["Branded PDF generation", "Proposal admin flows"],
      links: [
        {
          label: "Related case study →",
          href: `${CASE_STUDIES}/blob/main/elite-touch-cleaning.md`,
        },
      ],
    },
  },
  {
    id: "regen-profits",
    name: "Regen Profits Sales App",
    description:
      "Mobile sales PWA for logging activity, leaderboards, and admin oversight.",
    tech: ["Next.js", "Supabase", "PWA"],
    label: "private",
    featured: true,
    status: "Client project · private repo",
    details: {
      overview:
        "Rep dashboard, sales entry, funnel, leaderboard, and admin command center.",
      problem: "Reps needed a fast mobile surface without a native app release.",
      solution: "PWA-first Next.js app with Supabase auth and row-level security.",
      architecture: "Next.js App Router, Supabase SSR, installable PWA shell.",
      features: [
        "Rep and admin surfaces",
        "Leaderboard and competitions",
        "Documented staging QA for client review",
      ],
      links: [],
    },
  },
  {
    id: "remember-me",
    name: "Remember Me",
    description:
      "Small consumer MVP for reminders, wishlists, and remembering when to follow up with people.",
    tech: ["Next.js", "Supabase", "TypeScript"],
    label: "mvp",
    featured: true,
    status: "MVP · private repo",
    details: {
      overview:
        "Phase 1 app with honest scope: no payments or gift delivery yet. Includes a demo mode that runs without a backend.",
      problem:
        "Dates and gift ideas get scattered across notes apps and messages.",
      solution:
        "One calm MVP for reminders, wishlists, events, and a gift draft flow.",
      architecture:
        "Next.js App Router, Supabase when configured, localStorage demo store for walkthroughs.",
      features: [
        "Wishlist and reminder CRUD",
        "Thinking of You draft flow",
        "Demo mode at /demo",
      ],
      links: [],
    },
  },
  {
    id: "media-auth-api",
    name: "Media Authenticity API",
    description:
      "Checks an uploaded image, stores a signed result, and lets someone verify later that it wasn't changed.",
    tech: ["Next.js", "TypeScript", "Hugging Face", "Vitest"],
    link: "https://github.com/ChrisHorn-Dev/media-auth-api",
    label: "case-study",
    featured: true,
    status: "Public repo",
    details: {
      overview:
        "Small HTTP API with detector registry, caching, optional rate limits, and HMAC-signed responses.",
      problem: "Raw model scores aren't enough—you need verifiable API responses.",
      solution:
        "Signed authenticity records plus a verify endpoint and tests around both paths.",
      architecture:
        "Next.js API routes, orchestrator, detector registry, file-hash cache, Vitest.",
      features: [
        "Single and batch analyze endpoints",
        "Ensemble or single-detector modes",
        "POST /api/verify",
      ],
      links: [
        {
          label: "Repository →",
          href: "https://github.com/ChrisHorn-Dev/media-auth-api",
        },
        {
          label: "Case study →",
          href: `${CASE_STUDIES}/blob/main/media-auth-api.md`,
        },
      ],
    },
  },
  {
    id: "cape-fear-web",
    name: "Cape Fear Web Co",
    description:
      "Studio site and client delivery portal for custom software work.",
    tech: ["Vite", "React", "Supabase", "Tailwind"],
    link: "https://capefearweb.co",
    label: "live",
    featured: true,
    status: "Live site · private repo",
    details: {
      overview:
        "Marketing site, blog, case summaries, and a Supabase-backed /portal for client messages and requests.",
      problem:
        "Studio needed credible positioning plus structured delivery beyond email.",
      solution:
        "One Vite SPA for public pages and authenticated portal routes.",
      architecture:
        "React Router, Supabase Auth/RLS, Vercel serverless notify hook, build-time sitemap.",
      features: [
        "Topic pages and markdown blog",
        "Client portal for messages, requests, and files",
        "Links out to GitHub case studies for depth",
      ],
      links: [
        { label: "Live site →", href: "https://capefearweb.co" },
        {
          label: "Case study →",
          href: `${CASE_STUDIES}/blob/main/cape-fear-web-co.md`,
        },
      ],
    },
  },
  {
    id: "chrisos",
    name: "ChrisOS",
    description:
      "Interactive portfolio — desktop-style windows, project cards, and a mobile shell.",
    tech: ["Next.js", "Zustand", "Framer Motion"],
    link: "https://chrisos.dev",
    label: "interface",
    featured: true,
    status: "Live · public repo",
    details: {
      overview:
        "Portfolio as a small OS-like workspace instead of a single scrolling resume page.",
      problem: "Static portfolios flatten how you think about systems and product work.",
      solution:
        "Window manager, dock, terminal, and shared content model for project deep dives.",
      architecture: "Next.js App Router, Zustand window store, content/*.ts data files.",
      features: [
        "Draggable/resizable app windows",
        "Mobile launcher and deep-dive views",
        "Project cards linking to case studies where they exist",
      ],
      links: [
        { label: "Open ChrisOS →", href: "https://chrisos.dev" },
        {
          label: "Repository →",
          href: "https://github.com/ChrisHorn-Dev/resume-os",
        },
      ],
    },
  },
  {
    id: "genesis-mastery",
    name: "Genesis Mastery",
    description: "EdTech scaffold for a Genesis curriculum platform with admin CMS patterns.",
    tech: ["Next.js", "Prisma", "NextAuth"],
    label: "private",
    featured: false,
    status: "Scaffold · private repo",
  },
  {
    id: "wilmington-engine",
    name: "Wilmington Engine",
    description: "News/content automation pipeline experiment — monorepo with workers and a web admin stub.",
    tech: ["Next.js", "Neon", "TypeScript"],
    label: "experimental",
    featured: false,
    status: "R&D · private repo",
  },
  {
    id: "visual-conversations",
    name: "Visual Conversations",
    description: "Chrome extension + CLI experiment for UI intent assistance.",
    tech: ["TypeScript", "Chrome Extension", "OpenAI"],
    label: "experimental",
    featured: false,
    status: "Experimental · private repo",
  },
  {
    id: "pathbound-mobile",
    name: "Pathbound Mobile",
    description: "Dark-fantasy 2D game prototype in Godot 4 (Expo prototype archived).",
    tech: ["Godot 4"],
    label: "experimental",
    featured: false,
    status: "Lab project · private repo",
  },
  {
    id: "thank-you-for-dying",
    name: "Thank You For Dying",
    description: "Event brand and website concept — private client work.",
    tech: ["Next.js", "Tailwind CSS"],
    label: "private",
    featured: false,
    status: "Private client work",
  },
  {
    id: "regal-rides",
    name: "Regal Rides Platform",
    description: "Limo service site and booking experience — private client work.",
    tech: ["Next.js"],
    label: "private",
    status: "Private client work",
  },
  {
    id: "ronald-wayne",
    name: "Ronald G. Wayne Website",
    description: "Content and ecommerce site for Apple's third co-founder — private client work.",
    tech: ["Next.js"],
    label: "private",
    status: "Private client work",
  },
];
