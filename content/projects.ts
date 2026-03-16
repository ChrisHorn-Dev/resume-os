export interface Project {
  id: string;
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
      "Production SaaS platform coordinating appointment workflows between pharmaceutical reps and physician practices.",
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    label: "case-study",
    featured: true,
    details: {
      overview:
        "Production SaaS platform connecting pharmaceutical representatives with physician practices to coordinate scheduling, hosted meetings, and approval workflows. The application provides role-based dashboards and appointment workflows for representatives, physicians, and practice administrators.",
      problem:
        "The platform had core functionality in place but needed stable end-to-end workflows, clearer role-based behavior, and stronger handling of authentication and protected routes in order to move toward MVP readiness.",
      solution:
        "Helped move the product toward MVP readiness by refining representative booking flows, tightening role-based dashboards, and stabilizing authentication and protected access patterns across the application.",
      architecture:
        "Next.js and TypeScript application with role-based dashboards and protected routes for different user types. Core workflows focus on appointment requests, approval states, and scheduling across representatives, physicians, and practice administrators.",
      features: [
        "Representative booking and appointment request workflows",
        "Role-based dashboards for reps, physicians, and practice administrators",
        "Authentication and protected route behavior across multi-role access",
        "Stabilizing core workflows as the product moved toward MVP readiness",
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
      "Verification-oriented API for analyzing image authenticity and returning signed results.",
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
        "Designed and implemented a detector-driven analysis API with single and batch endpoints, file-hash caching, optional ensemble analysis across multiple Hugging Face detectors, and HMAC-signed authenticity records with a dedicated verification route.",
      architecture:
        "Next.js API routes in TypeScript organized around an orchestrator, detector registry, and cache. Requests pass through validation, hashing, cache lookup, detector execution, and signing. Responses use a structured record that captures verdict, detectors, and media, alongside a signature that can be checked via POST /api/verify. Optional API keys and in-memory rate limiting protect the surface area.",
      features: [
        "Single and batch image analysis endpoints with size and dimension validation",
        "Detector abstraction with support for single-detector and ensemble analysis modes",
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
      "Experimental OS-style portfolio with a desktop window manager, terminal, and mobile shell.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    label: "interface",
    featured: true,
    link: undefined,
    details: {
      overview:
        "OS-inspired portfolio that treats projects, resume, and tech stack as applications inside a desktop and mobile shell.",
      problem:
        "Traditional resume sites flatten a developer into static sections and fail to show how they think about systems, UX, and product craft.",
      solution:
        "Designed ChrisOS as a small operating system: a desktop, dock, terminal, and mobile shell that expose projects, resume, and tech stack as first-class apps.",
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
