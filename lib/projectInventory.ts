import { projects, type Project, type ProjectId } from "@/content/projects";

/** Visible Projects window inventory (legacy client cards excluded). */
export const PROJECT_INVENTORY_ORDER: ProjectId[] = [
  "physician-connection",
  "siteos",
  "elite-touch-client-portal",
  "elite-touch-proposals",
  "regen-profits",
  "cape-fear-web",
  "cape-fear-client-portal",
  "remember-me",
  "media-auth-api",
  "chrisos",
  "genesis-mastery",
  "wilmington-engine",
  "visual-conversations",
  "pathbound-mobile",
];

export type ProjectFilter = "all" | "case-studies" | "private" | "public" | "labs";

const projectById = new Map(projects.map((p) => [p.id, p]));

export function getInventoryProjects(filter: ProjectFilter = "all"): Project[] {
  const ordered = PROJECT_INVENTORY_ORDER.map((id) => projectById.get(id)).filter(
    (p): p is Project => Boolean(p),
  );

  switch (filter) {
    case "case-studies":
      return ordered.filter((p) => p.label === "case-study");
    case "private":
      return ordered.filter((p) => p.label === "private");
    case "public":
      return ordered.filter(
        (p) =>
          p.id === "media-auth-api" ||
          p.id === "chrisos" ||
          Boolean(p.link?.includes("github.com/ChrisHorn-Dev")),
      );
    case "labs":
      return ordered.filter((p) => p.label === "experimental" || p.label === "mvp");
    default:
      return ordered;
  }
}

export function statusPillText(project: Project): string {
  if (project.status) return project.status;
  switch (project.label) {
    case "case-study":
      return "Case study";
    case "live":
      return "Live site";
    case "interface":
      return "Public repo";
    case "mvp":
      return "MVP";
    case "experimental":
      return "Lab";
    default:
      return "Private project";
  }
}

export type StatusPillVariant = "case-study" | "live" | "private" | "interface" | "mvp" | "lab";

export function statusPillVariant(project: Project): StatusPillVariant {
  if (project.label === "case-study") return "case-study";
  if (project.label === "live") return "live";
  if (project.label === "interface") return "interface";
  if (project.label === "mvp") return "mvp";
  if (project.label === "experimental") return "lab";
  return "private";
}

export const PROJECT_FILTER_OPTIONS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "case-studies", label: "Case studies" },
  { id: "private", label: "Private projects" },
  { id: "public", label: "Public code" },
  { id: "labs", label: "Labs" },
];

export const EXPECTED_INVENTORY_TITLES = [
  "Physician Connection Platform",
  "SiteOS",
  "Elite Touch Cleaning Companion App",
  "Elite Touch Proposal App",
  "Regen Profits Sales App",
  "Cape Fear Web Co",
  "Cape Fear Client Portal",
  "RememberMe",
  "Media Authenticity API",
  "ChrisOS",
  "Genesis Mastery",
  "Wilmington Engine",
  "Visual Conversations",
  "Pathbound Mobile",
] as const;
