export type ProjectId =
  | "physician-connection"
  | "siteos"
  | "elite-touch-client-portal"
  | "elite-touch-proposals"
  | "regen-profits"
  | "remember-me"
  | "cape-fear-web"
  | "cape-fear-client-portal"
  | "media-auth-api"
  | "chrisos"
  | "genesis-mastery"
  | "wilmington-engine"
  | "visual-conversations"
  | "pathbound-mobile";

export type ProjectLabel =
  | "case-study"
  | "live"
  | "private"
  | "interface"
  | "mvp"
  | "experimental";

export type Project = {
  id: ProjectId;
  name: string;
  description: string;
  stack: string[];
  status: string;
  label: ProjectLabel;
  link?: string;
  details?: {
    overview: string;
    highlights: string[];
    architecture?: string;
    tradeoffs?: string;
  };
};

export const projects: Project[] = [
  {
    id: "physician-connection",
    name: "Physician Connection Platform",
    description:
      "Scheduling platform for rep-practice appointment workflows and multi-role dashboards.",
    stack: ["Next.js", "TypeScript", "Drizzle ORM", "Tailwind"],
    status: "Case study",
    label: "case-study",
    link: "https://github.com/ChrisHorn-Dev/case-studies/tree/main/physician-connection",
    details: {
      overview:
        "Multi-role scheduling platform for rep-practice appointment workflows, with dashboards for reps, practices, and admins.",
      highlights: [
        "Rep and practice scheduling flows",
        "Multi-role dashboards",
        "Appointment lifecycle and status tracking",
        "Admin oversight for users and operations",
      ],
      architecture:
        "Next.js app with role-based routes, Drizzle-backed data layer, and Tailwind UI for rep, practice, and admin views.",
      tradeoffs:
        "Focused on scheduling clarity and role separation over a single unified inbox.",
    },
  },
  {
    id: "siteos",
    name: "SiteOS",
    description:
      "Construction dashboard system built around field updates, project signals, and executive views.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Celery", "Expo"],
    status: "Private project",
    label: "private",
    details: {
      overview:
        "Construction dashboard system built around project signals, field/mobile workflows, and executive views.",
      highlights: [
        "Project signals and dashboard views",
        "Field and mobile workflow support",
        "Signal engine under the SiteOS architecture",
        "Executive and project-level visibility",
      ],
      architecture:
        "FastAPI backend with PostgreSQL, Celery workers, Next.js dashboards, and Expo mobile clients.",
    },
  },
  {
    id: "elite-touch-client-portal",
    name: "Elite Touch Cleaning Companion App",
    description:
      "Client portal for cleaning requests, emergency messages, admin triage, and notifications.",
    stack: ["Next.js", "Prisma", "Twilio", "Resend"],
    status: "Private project",
    label: "private",
    details: {
      overview:
        "Client portal for service requests, emergency messaging, admin triage, and notification audit.",
      highlights: [
        "Service request flow with attachments",
        "SOS and emergency path",
        "Admin triage and status updates",
        "Messaging and notification audit trail",
      ],
      architecture:
        "Next.js app with Prisma data layer, Twilio and Resend for outbound messaging.",
    },
  },
  {
    id: "elite-touch-proposals",
    name: "Elite Touch Proposal App",
    description:
      "Proposal tool for building service quotes and client-facing proposal views.",
    stack: ["Next.js", "Prisma", "React PDF"],
    status: "Private project",
    label: "private",
    details: {
      overview:
        "Internal sales tool for proposal creation, quote configuration, and generated proposal preview.",
      highlights: [
        "Proposal creation workflow",
        "Quote and configuration flow",
        "Generated proposal and PDF preview",
        "Internal sales handoff",
      ],
    },
  },
  {
    id: "regen-profits",
    name: "Regen Profits Sales App",
    description:
      "Mobile-first sales app for rep dashboards, leaderboards, and admin oversight.",
    stack: ["Next.js", "Supabase", "Tailwind"],
    status: "Private project",
    label: "private",
    details: {
      overview:
        "Mobile-first sales PWA with rep dashboards, leaderboard views, and admin command center.",
      highlights: [
        "Rep dashboard and sales entry flow",
        "Leaderboard and performance views",
        "Admin command center",
        "Mobile-first layout for field reps",
      ],
    },
  },
  {
    id: "cape-fear-web",
    name: "Cape Fear Web Co",
    description: "Studio site and client delivery system for custom software work.",
    stack: ["Vite", "React", "Supabase", "Vercel"],
    status: "Live site",
    label: "live",
    link: "https://capefearweb.co",
    details: {
      overview:
        "Studio marketing site with a case-study content system and client delivery layer.",
      highlights: [
        "Marketing site and studio positioning",
        "Case-study and content system",
        "Client portal and delivery workflows",
        "Deployed on Vite, React, and Supabase",
      ],
    },
  },
  {
    id: "cape-fear-client-portal",
    name: "Cape Fear Client Portal",
    description:
      "Private client delivery layer for requests, project communication, and handoff workflows.",
    stack: ["Supabase", "React", "Vercel"],
    status: "Private project",
    label: "private",
    details: {
      overview:
        "Client-facing portal for project requests, communication, and delivery handoff.",
      highlights: [
        "Client request intake",
        "Project communication threads",
        "Delivery and handoff workflows",
        "Tied to Cape Fear Web Co studio operations",
      ],
    },
  },
  {
    id: "remember-me",
    name: "RememberMe",
    description:
      "Small consumer MVP for reminders, wishlists, and remembering when to follow up with people.",
    stack: ["Next.js", "Supabase", "Tailwind"],
    status: "MVP",
    label: "mvp",
    details: {
      overview:
        "Consumer MVP focused on relationship reminders, wishlists, and thoughtful outreach timing.",
      highlights: [
        "Contact and relationship reminders",
        "Wishlist and reminder flows",
        "Thoughtful follow-up concept",
        "Demo mode for early testing",
      ],
    },
  },
  {
    id: "media-auth-api",
    name: "Media Authenticity API",
    description:
      "API that checks an uploaded image, stores a signed result, and lets someone verify later that the result was not changed.",
    stack: ["Next.js", "TypeScript", "Node.js"],
    status: "Public repo",
    label: "case-study",
    link: "https://github.com/ChrisHorn-Dev/media-auth-api",
    details: {
      overview:
        "Upload an image, get a signed authenticity result, and verify later that nothing was tampered with.",
      highlights: [
        "Image upload and analysis endpoint",
        "Signed result storage",
        "Public verification flow",
        "Tamper-evident result checking",
      ],
      architecture:
        "Next.js API routes with signed payloads and a verification endpoint for third-party checks.",
    },
  },
  {
    id: "chrisos",
    name: "ChrisOS",
    description:
      "OS-style portfolio shell with windows, terminal, project views, and a mobile layout.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    status: "Public repo",
    label: "interface",
    link: "https://github.com/ChrisHorn-Dev/resume-os",
    details: {
      overview:
        "Desktop-style portfolio shell with draggable windows, terminal, project browser, and mobile layout.",
      highlights: [
        "Window manager and app shell",
        "Terminal and project views",
        "Mobile-responsive layout",
        "Deployed at chrisos.dev",
      ],
    },
  },
  {
    id: "genesis-mastery",
    name: "Genesis Mastery",
    description:
      "Learning platform scaffold for structured lessons, auth, and progress-oriented product flows.",
    stack: ["Next.js", "Prisma", "NextAuth"],
    status: "Private project",
    label: "private",
    details: {
      overview:
        "Early learning platform scaffold with structured lessons, auth, and progress tracking hooks.",
      highlights: [
        "Lesson and module structure",
        "Auth and user sessions",
        "Progress-oriented product flows",
        "Scaffold stage — not a shipped product",
      ],
    },
  },
  {
    id: "wilmington-engine",
    name: "Wilmington Engine",
    description: "Content and automation R&D around local news and data workflows.",
    stack: ["Next.js", "Neon", "TypeScript"],
    status: "Lab",
    label: "experimental",
    details: {
      overview:
        "Automation lab for local news ingestion, content workflows, and data experiments.",
      highlights: [
        "Local news and data workflow experiments",
        "Content pipeline R&D",
        "Low-emphasis lab project",
      ],
    },
  },
  {
    id: "visual-conversations",
    name: "Visual Conversations",
    description:
      "Experiment around visual context, browser interaction, and AI-assisted UI review.",
    stack: ["TypeScript", "Chrome Extension", "OpenAI"],
    status: "Experimental",
    label: "experimental",
    details: {
      overview:
        "Dev tool experiment combining visual context capture, browser interaction, and AI-assisted UI review.",
      highlights: [
        "Visual context capture",
        "Browser interaction layer",
        "AI-assisted UI review workflow",
      ],
    },
  },
  {
    id: "pathbound-mobile",
    name: "Pathbound Mobile",
    description:
      "Mobile game lab focused on movement, interaction, and small-screen systems.",
    stack: ["Godot 4"],
    status: "Lab",
    label: "experimental",
    details: {
      overview:
        "Mobile game lab exploring movement mechanics, touch interaction, and small-screen game systems.",
      highlights: [
        "Movement and interaction prototypes",
        "Small-screen game systems",
        "Godot 4 mobile targets",
      ],
    },
  },
];

export function getProjectById(id: ProjectId): Project | undefined {
  return projects.find((p) => p.id === id);
}
