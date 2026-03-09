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
      "Operational SaaS platform managing pharmaceutical rep access to healthcare practices.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Drizzle ORM", "Playwright", "Vitest"],
    label: "case-study",
    featured: true,
    details: {
      overview:
        "Operational SaaS platform coordinating pharmaceutical representatives, physician practices, and administrators through a centralized scheduling and workflow system. The platform provides role-based dashboards, appointment workflows, and operational visibility across multiple user roles.",
      problem:
        "The platform had core functionality in place but lacked stability, clear role-based flows, and operational tooling needed for a controlled launch. Several workflows required refinement and the system needed stronger monitoring, testing, and administrative visibility.",
      solution:
        "Worked on bringing the platform toward launch readiness by improving application structure, refining the user experience across multiple roles, implementing testing coverage, and building operational tooling for administrators.",
      architecture:
        "Modern Next.js and TypeScript application backed by PostgreSQL and Drizzle ORM. The platform uses role-based routing and server-side workflows to support different user types, with dashboards and internal tools for operational oversight. Automated testing with Playwright and Vitest was introduced to protect critical application flows.",
      features: [
        "Stabilizing and refining a multi-role SaaS platform approaching launch",
        "Improving dashboard UX and role-based navigation across reps, physicians, practice staff, and administrators",
        "Implementing internal error logging and resolution workflows",
        "Building super-admin operational dashboards and system monitoring tools",
        "Strengthening key application flows with Playwright and Vitest testing",
        "Improving application reliability and preparing the system for MVP launch",
      ],
      links: [],
    },
  },
  {
    id: "cape-fear-web",
    name: "Cape Fear Web Co",
    description:
      "Production web platform and internal tooling for real business clients.",
    tech: ["Next.js", "React", "Tailwind", "Vercel"],
    link: "https://capefearweb.co",
    label: "live",
    featured: true,
    details: {
      overview:
        "Cape Fear Web Co is the website for my web design and development studio. It was built to showcase my services, highlight past work, and provide small to mid-sized businesses with a clear path to launching a modern, high-performance website. The site focuses on speed, clarity, and strong visual presentation while communicating the value of professional web design for growing businesses.",
      problem:
        "Many small and mid-sized businesses rely on outdated websites or restrictive site builders that limit performance, customization, and long-term growth. These options are often either too limited or too expensive when working with large agencies.",
      solution:
        "I designed and built the Cape Fear Web Co website as a fast, modern marketing site that clearly communicates services, builds trust with potential clients, and demonstrates the level of quality businesses can expect from working with the studio. The goal was to create a polished online presence that makes it easy for businesses to understand the value of a professionally built website while positioning Cape Fear Web Co as an approachable and affordable option for high-quality web design.",
      architecture:
        "Built with Next.js and React and deployed on Vercel, the site prioritizes performance, responsiveness, and clean design across devices.",
      features: [
        "Fast-loading pages optimized for performance and SEO",
        "Clear service presentation tailored to small and mid-sized businesses",
        "Modern design that emphasizes readability and visual hierarchy",
        "Responsive layouts that adapt seamlessly across devices",
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
      "Experimental mobile portfolio interface exploring OS-style navigation patterns for developer portfolios.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    label: "interface",
    featured: true,
    link: undefined,
    details: {
      overview:
        "Experimental OS-style portfolio that treats projects and experience as applications inside a desktop and mobile shell.",
      problem:
        "Traditional resume sites flatten a developer into static sections and fail to show how they think about systems, UX, and product craft.",
      solution:
        "Designed ChrisOS as a small operating system: a desktop, dock, and mobile shell that expose projects, resume, and tech stack as first-class apps.",
      architecture:
        "Next.js App Router with a shared window store, TypeScript throughout, Tailwind for design tokens, and Framer Motion for subtle transitions.",
      features: [
        "Desktop-style window manager with draggable, resizable apps",
        "Dedicated mobile shell with launcher, system bar, and app panels",
        "Curated project and resume views tuned for recruiters",
        "Shared data model powering both desktop and mobile experiences",
      ],
      links: [],
    },
  },
];
