export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link?: string;
  label: "case-study" | "private" | "live";
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "physician-connection",
    name: "Physician Connection Platform",
    description: "Operational SaaS platform coordinating pharmaceutical representatives, physician practices, and administrators through a role-based system. Multi-role dashboards, appointment scheduling workflows, operational analytics, and an internal error monitoring and resolution system.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Drizzle ORM", "Playwright", "Vitest"],
    label: "case-study",
    featured: true,
  },
  {
    id: "cape-fear-web",
    name: "Cape Fear Web Co",
    description: "Production web development and platform design for real businesses: fast, conversion-focused websites and small business digital infrastructure. Marketing sites, booking systems, and custom web applications.",
    tech: ["Next.js", "React", "Tailwind", "Vercel"],
    link: "https://capefearweb.co",
    label: "live",
    featured: true,
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
];
