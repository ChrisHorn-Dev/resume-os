export interface StackGroup {
  name: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    name: "Frontend",
    items: [
      "JavaScript / TypeScript",
      "React",
      "Next.js (App Router)",
      "Tailwind CSS",
      "ShadCN UI",
      "Radix UI",
      "HTML5 / CSS3",
      "Responsive UI / component architecture",
    ],
  },
  {
    name: "Backend",
    items: ["Node.js", "Next.js API routes", "Server actions", "REST APIs"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "Neon", "SQL", "Drizzle ORM"],
  },
  {
    name: "DevOps / Infrastructure",
    items: [
      "Git / GitHub",
      "Vercel",
      "Railway",
      "Docker (familiar)",
      "Environment-based config",
    ],
  },
  {
    name: "Tooling",
    items: [
      "Playwright (E2E)",
      "Vitest (unit/integration)",
      "PNPM",
      "Resend (email)",
    ],
  },
  {
    name: "Product / Platform",
    items: [
      "Role-based SaaS architecture",
      "Admin dashboards",
      "Error monitoring and logging",
      "Analytics dashboards",
      "Scheduling workflows",
      "Notification systems",
    ],
  },
];
