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
  label: "case-study" | "private" | "live" | "interface" | "staging" | "mvp" | "experimental";
  featured?: boolean;
  status?: string;
  proofType?: string;
  privacyLabel?: string;
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
      "Construction execution intelligence platform — field signals, multi-persona dashboards, mobile field app, and ML/LLM-assisted workflows.",
    tech: ["FastAPI", "Celery", "Next.js", "Expo", "PostgreSQL", "TimescaleDB"],
    label: "case-study",
    featured: true,
    status: "Active development",
    proofType: "Private repo + public case study (draft)",
    privacyLabel: "Client-sensitive — code private",
    details: {
      overview:
        "Full-stack construction intelligence platform spanning FastAPI services, background workers, Next.js dashboards, and an Expo mobile app.",
      problem:
        "Construction ops data is fragmented across tools, delaying executive visibility and field coordination.",
      solution:
        "Built a platform architecture for signal ingestion, project intelligence, and persona-specific dashboards with demo-ready seed projects.",
      architecture:
        "FastAPI + Celery + PostgreSQL/TimescaleDB backend; Next.js dashboards; Expo mobile; ML/CV and Claude API integration points.",
      features: [
        "Multi-persona dashboard surfaces",
        "Docker-compose local full stack",
        "SiteOS signal engine for county-level foundation data",
        "Demo runbooks and audit documentation",
      ],
      links: [
        { label: "Case study (draft) →", href: `${CASE_STUDIES}/blob/main/siteos.md` },
      ],
    },
  },
  {
    id: "physician-connection",
    name: "Physician Connection Platform",
    description:
      "Multi-tenant healthcare SaaS coordinating scheduling workflows between pharmaceutical reps and physician practices.",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "Better Auth", "Cal.com"],
    label: "case-study",
    featured: true,
    status: "Beta-ready",
    proofType: "Private repo + public case study",
    privacyLabel: "Healthcare client — code private",
    details: {
      overview:
        "Role-based SaaS connecting reps and practices through guided scheduling workflows, dashboards, and super-admin operational tooling.",
      problem:
        "Fragmented coordination and fragile production behavior blocked real-office rollout.",
      solution:
        "Stabilized auth, database writes, Cal.com integration, and hosting migration toward controlled beta readiness.",
      architecture:
        "Next.js App Router with role partitions, Drizzle on Neon, Better Auth, self-hosted Cal.com on Railway, Sentry on critical paths.",
      features: [
        "Multi-role dashboards and guided rep request flows",
        "Cal.com-backed scheduling with domain-specific behavior",
        "Production hardening and observability improvements",
      ],
      links: [{ label: "View Case Study →", href: CASE_STUDIES }],
    },
  },
  {
    id: "elite-touch-client-portal",
    name: "Elite Touch Cleaning Companion App",
    description:
      "Client companion and admin ops portal for commercial cleaning — typed requests, SOS emergencies, notifications, and HubSpot sync.",
    tech: ["Next.js", "Prisma", "Twilio", "Resend", "HubSpot"],
    label: "case-study",
    featured: true,
    status: "MVP-ready",
    proofType: "Private repo + public case study",
    privacyLabel: "Client work — code private",
    details: {
      overview:
        "Mobile-first client portal with separate SOS pipeline, admin triage queues, and mockable Twilio/Resend integrations.",
      problem:
        "Client communication fragmented across phone and email with no durable operational record.",
      solution:
        "Structured request lifecycle, emergency path, notification audit logging, and admin triage surfaces.",
      architecture:
        "Next.js App Router, Prisma persistence, cookie sessions, centralized notify-ops fan-out with NotificationEvent audit trail.",
      features: [
        "Client launcher + modal task flows",
        "SOS emergency broadcasts",
        "Admin queues with threaded messages and attachments",
        "HubSpot read/sync path",
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
      "Internal proposal builder generating branded scope-of-work PDFs for Elite Touch sales and onboarding.",
    tech: ["Next.js", "Prisma", "React PDF", "NextAuth"],
    label: "private",
    featured: false,
    status: "Internal MVP",
    proofType: "Private repo",
    privacyLabel: "Internal client tool",
    details: {
      overview:
        "Proposal and PDF generation workflow supporting Elite Touch commercial scoping and employee approval flows.",
      problem: "Manual proposal assembly slowed sales and onboarding consistency.",
      solution:
        "Structured proposal data model with PDF rendering, auth, and verification scripts.",
      architecture:
        "Next.js App Router, Prisma, @react-pdf/renderer, Playwright e2e for critical flows.",
      features: [
        "Branded PDF generation",
        "Proposal lifecycle and approval-oriented flows",
        "Documented Neon/Vercel deployment path",
      ],
      links: [
        {
          label: "Related case study (client portal) →",
          href: `${CASE_STUDIES}/blob/main/elite-touch-cleaning.md`,
        },
      ],
    },
  },
  {
    id: "regen-profits",
    name: "Regen Profits Sales App",
    description:
      "Mobile-first PWA for sales reps and admins — dashboards, leaderboards, sales logging, and command center.",
    tech: ["Next.js", "Supabase", "PWA", "Tailwind CSS"],
    label: "staging",
    featured: true,
    status: "Staging",
    proofType: "Private repo + case study draft",
    privacyLabel: "Client work — anonymize publicly",
    link: "https://regen-profits-sales-app.vercel.app",
    details: {
      overview:
        "Sales performance PWA with rep and admin surfaces, Supabase auth/RLS, and documented client demo materials.",
      problem: "Distributed reps needed fast mobile logging and accountability tooling.",
      solution:
        "PWA-first Next.js app with staging deployment and QA documentation for client review.",
      architecture:
        "Next.js 16 App Router, Supabase SSR, service worker + manifest, admin command center.",
      features: [
        "Rep dashboard, sales funnel, leaderboard, competitions",
        "Admin oversight surfaces",
        "Staging deployment with verification docs",
      ],
      links: [
        {
          label: "Case study draft →",
          href: `${CASE_STUDIES}/blob/main/regen-profits-sales-app.md`,
        },
      ],
    },
  },
  {
    id: "remember-me",
    name: "Remember Me",
    description:
      "Relationship gifting MVP — wishlists, reminders, events, and Thinking of You drafts with honest Phase 1 boundaries.",
    tech: ["Next.js", "Supabase", "TypeScript"],
    label: "mvp",
    featured: true,
    status: "MVP",
    proofType: "Private repo + case study draft",
    privacyLabel: "Personal product",
    details: {
      overview:
        "Phase 1 consumer app for relationship context, gift ideas, and draft gifting flows — demo mode included.",
      problem:
        "Important dates and gift ideas scatter across apps without a calm, focused workflow.",
      solution:
        "Unified MVP with Supabase auth and local demo mode for stakeholder walkthroughs.",
      architecture:
        "Next.js App Router, Supabase SSR when configured, localStorage demo store for /demo path.",
      features: [
        "Wishlist, reminders, events CRUD",
        "Thinking of You draft flow (no delivery in Phase 1)",
        "Demo mode with reset banner",
      ],
      links: [
        {
          label: "Case study draft →",
          href: `${CASE_STUDIES}/blob/main/remember-me.md`,
        },
      ],
    },
  },
  {
    id: "media-auth-api",
    name: "Media Authenticity API",
    description:
      "Signed image authenticity API with detector-based analysis and independent verification endpoint.",
    tech: ["Next.js", "TypeScript", "Hugging Face", "Vitest"],
    link: "https://github.com/ChrisHorn-Dev/media-auth-api",
    label: "case-study",
    featured: true,
    status: "Public repo",
    proofType: "Public code + case study overview",
    details: {
      overview:
        "HTTP API analyzing images for authenticity with HMAC-signed records and POST /api/verify.",
      problem:
        "Teams need verifiable API responses, not just model scores.",
      solution:
        "Detector registry, caching, signing, and verification route with tests.",
      architecture:
        "Next.js API routes, orchestrator, detector registry, in-memory/file cache, Vitest coverage.",
      features: [
        "Single and batch analyze endpoints",
        "Ensemble and single-detector modes",
        "Signed authenticity records + verify endpoint",
      ],
      links: [
        {
          label: "Repository →",
          href: "https://github.com/ChrisHorn-Dev/media-auth-api",
        },
        {
          label: "Case study overview →",
          href: `${CASE_STUDIES}/blob/main/media-auth-api.md`,
        },
      ],
    },
  },
  {
    id: "cape-fear-web",
    name: "Cape Fear Web Co",
    description:
      "Studio website and Supabase client delivery portal for operational software — live at capefearweb.co.",
    tech: ["Vite", "React", "Supabase", "Tailwind CSS", "Vercel"],
    link: "https://capefearweb.co",
    label: "live",
    featured: true,
    status: "Live site",
    proofType: "Live site + public case study",
    details: {
      overview:
        "Marketing, SEO content system, and authenticated /portal delivery companion in one Vite SPA.",
      problem:
        "Studio needed credible positioning plus structured client delivery beyond email threads.",
      solution:
        "Unified site with case summaries linking to GitHub writeups and Supabase-backed portal.",
      architecture:
        "Vite/React SPA, Supabase Auth/RLS, Vercel serverless notify API, build-time sitemap + JSON-LD.",
      features: [
        "Topic anchor pages and markdown blog cluster",
        "Client portal: messages, requests, files, activity feed",
        "Cross-links to public case studies repo",
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
      "Interactive desktop-style portfolio — windowed workspace, terminal, and mobile shell for project deep dives.",
    tech: ["Next.js", "TypeScript", "Zustand", "Framer Motion"],
    link: "https://chrisos.dev",
    label: "interface",
    featured: true,
    status: "Live",
    proofType: "Public repo + live site",
    details: {
      overview:
        "OS-inspired portfolio treating projects, resume, and stack as first-class apps.",
      problem: "Static portfolios flatten systems thinking and product craft.",
      solution:
        "Browser-based desktop shell with deep-dive content model shared across desktop and mobile.",
      architecture:
        "Next.js App Router, Zustand window store, structured content in content/*.ts.",
      features: [
        "Window manager with dock and terminal",
        "Mobile launcher and deep-dive views",
        "Curated project cards linking to case studies",
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
    description:
      "Master's-level Genesis curriculum platform scaffold with admin CMS patterns and seeded course structure.",
    tech: ["Next.js", "Prisma", "NextAuth"],
    label: "private",
    featured: false,
    status: "Scaffold",
    proofType: "Private repo",
    privacyLabel: "EdTech — not yet public-facing",
  },
  {
    id: "wilmington-engine",
    name: "Wilmington Engine",
    description:
      "Policy-driven news/content automation engine — monorepo with pipeline workers and web admin stub.",
    tech: ["Next.js", "Neon", "TypeScript"],
    label: "experimental",
    featured: false,
    status: "R&D",
    proofType: "Private repo",
    privacyLabel: "Experimental automation",
  },
  {
    id: "visual-conversations",
    name: "Visual Conversations",
    description:
      "Experimental UI intent assistant — Chrome extension + CLI with LLM-backed session summaries.",
    tech: ["TypeScript", "Chrome Extension", "OpenAI"],
    label: "experimental",
    featured: false,
    status: "Experimental",
    proofType: "Private repo",
  },
  {
    id: "pathbound-mobile",
    name: "Pathbound Mobile",
    description:
      "Dark-fantasy 2D top-down MMO-lite — active Godot 4 prototype with archived Expo exploration.",
    tech: ["Godot 4", "GDScript"],
    label: "experimental",
    featured: false,
    status: "In progress",
    proofType: "Private repo",
    privacyLabel: "Personal game lab",
  },
  {
    id: "thank-you-for-dying",
    name: "Thank You For Dying",
    description:
      "Immersive event brand and website concept with dark, artistic aesthetic and theatrical tone.",
    tech: ["Next.js", "Tailwind CSS", "custom UI"],
    label: "private",
    featured: false,
    privacyLabel: "Client/private — no public case study",
  },
  {
    id: "regal-rides",
    name: "Regal Rides Platform",
    description:
      "Conversion-focused limo service website and booking experience built from a customized travel template.",
    tech: ["Next.js", "frontend UI"],
    label: "private",
    privacyLabel: "Client work — details private",
  },
  {
    id: "ronald-wayne",
    name: "Ronald G. Wayne Website",
    description:
      "Website for Apple's third co-founder — financial education content, books, and merchandise architecture.",
    tech: ["Next.js", "ecommerce", "content architecture"],
    label: "private",
    privacyLabel: "Client work — details private",
  },
];
