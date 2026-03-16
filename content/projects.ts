export type ProjectId =
  | "physician-connection"
  | "media-auth-api"
  | "cape-fear-web"
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
  label: "case-study" | "private" | "live" | "interface";
  featured?: boolean;
  details?: {
    overview: string;
    problem: string;
    solution: string;
    architecture: string;
    features: string[];
    links?: { label: string; href: string }[];
  };
}

export const projects: Project[] = [
  {
    id: "physician-connection",
    name: "Physician Connection Platform",
    description:
      "Modular Next.js SaaS application coordinating scheduling workflows between pharmaceutical reps and physician practices.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Drizzle ORM"],
    label: "case-study",
    featured: true,
    details: {
      overview:
        "Modular Next.js SaaS application that connects pharmaceutical representatives with physician practices through role-based dashboards, scheduling workflows, and operational administration tooling.",
      problem:
        "The platform had core flows in place, but role-based routing, scheduling coordination, and operational tooling needed to be tightened so that reps, practices, and admins could rely on the system as it moved toward MVP readiness.",
      solution:
        "Helped move the product toward MVP readiness by refining rep–practice scheduling workflows, clarifying role-aware dashboards and routing, and stabilizing authentication and protected API routes alongside operational/admin tooling.",
      architecture:
        "Next.js and TypeScript application with role-partitioned routing (physician, practice admin, rep, super-admin), domain modules for calendar and messaging, a Drizzle ORM database layer, and protected API routes that back core scheduling and coordination workflows.",
      features: [
        "Role-partitioned dashboards for reps, practice staff, physicians, and super-admins",
        "Rep–practice scheduling workflows built on Cal.com integration and calendar domain modules",
        "Messaging and presence features for coordination around visits and access",
        "Protected API routes and role-aware routing for all major application surfaces",
        "Operational and super-admin tooling for seeding test data, debugging errors, and managing environments",
      ],
      links: [
        {
          label: "View Case Study →",
          href: "https://github.com/ChrisHorn-Dev/case-studies",
        },
      ],
    },
  },
  {
    id: "media-auth-api",
    name: "Media Authenticity API",
    description:
      "Verification-oriented API that analyzes uploaded images for authenticity and returns signed results plus a verification endpoint.",
    tech: ["Next.js", "TypeScript", "Node.js"],
    link: "https://github.com/ChrisHorn-Dev/media-auth-api",
    label: "case-study",
    featured: true,
    details: {
      overview:
        "Backend API that analyzes uploaded images for likely synthetic vs likely authentic, returns structured authenticity records, and signs responses so clients can verify results independently via a verification endpoint.",
      problem:
        "Teams exploring media authenticity often need more than a raw model score. They need a clear API surface, caching, rate limiting, and a way to verify that results actually came from the service and were not tampered with.",
      solution:
        "Designed and implemented a detector-driven analysis API with single and batch endpoints, file-hash caching, optional ensemble analysis across a pair of Hugging Face detectors, and HMAC-signed authenticity records with a dedicated verification route.",
      architecture:
        "Next.js API routes in TypeScript organized around an orchestrator, detector registry, and cache. Requests pass through validation, hashing, cache lookup, detector execution via the Hugging Face Inference API, and signing. Responses use a structured record that captures verdict, detectors, and media alongside a signature that can be checked via POST /api/verify. Optional API keys, in-memory rate limiting, and a simple health endpoint protect and monitor the surface area.",
      features: [
        "Single and batch image analysis endpoints with size and dimension validation",
        "Detector abstraction with support for single-detector and ensemble analysis modes across registered image detectors",
        "File-hash caching with configurable TTL and optional file-backed persistence",
        "Signed authenticity records and a POST /api/verify endpoint for independent verification",
        "Optional API key enforcement and per-key/IP rate limiting with consistent error shapes",
      ],
      links: [
        {
          label: "View Repository →",
          href: "https://github.com/ChrisHorn-Dev/media-auth-api",
        },
      ],
    },
  },
  {
    id: "cape-fear-web",
    name: "Cape Fear Web Co",
    description:
      "Personal site and identity surface used to present projects, case studies, and contact paths.",
    tech: ["Next.js", "React", "Tailwind", "Vercel"],
    link: "https://capefearweb.co",
    label: "live",
    featured: false,
    details: {
      overview:
        "Cape Fear Web Co is a lightweight marketing and identity site I use to host case studies, describe my work, and route engineering-focused inquiries. It serves as a public entry point into my portfolio and operational work rather than a small-business web design storefront.",
      problem:
        "I previously used Cape Fear Web Co as a small-business web design brand. As my focus moved toward SaaS platforms, APIs, and product engineering, the site needed to better reflect that work without taking on a full redesign.",
      solution:
        "Repurposed the Cape Fear Web Co site as a focused portfolio surface that highlights software projects, case studies, and ways to contact me for engineering work, while keeping the implementation fast, simple, and maintainable.",
      architecture:
        "Built with Next.js and React and deployed on Vercel, the site favors straightforward content structure, responsive layouts, and a minimal implementation that is easy to evolve as my portfolio shifts.",
      features: [
        "Fast-loading pages optimized for reading case studies and project overviews",
        "Clear navigation into technical work and portfolio material",
        "Responsive layouts that adapt cleanly across devices",
      ],
      links: [
        {
          label: "View Live Site →",
          href: "https://capefearweb.co",
        },
      ],
    },
  },
  {
    id: "thank-you-for-dying",
    name: "Thank You For Dying",
    description: "Immersive event brand and website concept with a dark, artistic aesthetic and theatrical tone. Promotes ticketed experiences and merchandise while building a cult-style audience.",
    tech: ["Next.js", "Tailwind CSS", "custom UI"],
    label: "private",
    featured: true,
  },
  {
    id: "regal-rides",
    name: "Regal Rides Platform",
    description: "Conversion-focused limo service website and booking experience. Transformed a travel template into a production site with frontend UI customization.",
    tech: ["Next.js", "frontend UI customization"],
    label: "private",
  },
  {
    id: "ronald-wayne",
    name: "Ronald G. Wayne Website",
    description: "Website for Apple's third co-founder: financial education content, books, and merchandise around silver bullion investing. Next.js ecommerce structure and custom content architecture.",
    tech: ["Next.js", "ecommerce", "custom content architecture"],
    label: "private",
  },
  {
    id: "chrisos",
    name: "ChrisOS",
    description:
      "Experimental desktop-style portfolio built as a browser-based windowed workspace with a terminal and mobile shell.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    label: "interface",
    featured: true,
    link: undefined,
    details: {
      overview:
        "OS-inspired portfolio that treats projects, resume, and tech stack as applications inside a desktop-style and mobile shell in the browser.",
      problem:
        "Traditional resume sites flatten a developer into static sections and fail to show how they think about systems, UX, and product craft.",
      solution:
        "Designed ChrisOS as a browser-based desktop-style workspace: a windowed shell, dock, terminal, and mobile experience that expose projects, resume, and tech stack as first-class apps.",
      architecture:
        "Next.js App Router with a shared window store, TypeScript throughout, Tailwind for design tokens, and Framer Motion for subtle transitions.",
      features: [
        "Desktop-style window manager with draggable, resizable apps",
        "Dedicated mobile shell with launcher, system bar, and guided terminal experience",
        "Curated project and resume views tuned for hiring managers and engineers",
        "Shared data model and state powering both desktop and mobile experiences",
      ],
      links: [],
    },
  },
];
