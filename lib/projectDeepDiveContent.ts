import { getProjectById, type ProjectId } from "@/content/projects";
import {
  projectDeepDives,
  type DeepDiveSection,
  type ProjectDeepDive,
} from "@/content/projectDeepDives";
import { PROJECT_INVENTORY_ORDER } from "@/lib/projectInventory";

function overviewSectionFromProject(projectId: ProjectId): DeepDiveSection | null {
  const project = getProjectById(projectId);
  if (!project?.details) return null;

  const blocks: DeepDiveSection["blocks"] = [
    { type: "text", body: project.details.overview },
  ];

  if (project.details.highlights.length > 0) {
    blocks.push({ type: "bullet-list", items: project.details.highlights });
  }

  if (project.details.architecture) {
    blocks.push({ type: "text", body: project.details.architecture });
  }

  return {
    id: "overview",
    summary: project.description,
    blocks,
  };
}

export function getProjectDeepDive(projectId: ProjectId): ProjectDeepDive {
  const base = projectDeepDives[projectId];
  const project = getProjectById(projectId);

  if (base.sections.length > 0) {
    return {
      ...base,
      quickSummary: project?.description ?? base.quickSummary,
    };
  }

  const overview = overviewSectionFromProject(projectId);

  return {
    id: projectId,
    quickSummary: project?.description ?? base.quickSummary,
    sections: overview ? [overview] : [],
  };
}

export function getDeepDiveSection(
  projectId: ProjectId,
  sectionId: DeepDiveSection["id"],
): DeepDiveSection | undefined {
  const deepDive = getProjectDeepDive(projectId);
  const section = deepDive.sections.find((s) => s.id === sectionId);
  if (section && section.blocks.length > 0) return section;

  if (sectionId === "overview") {
    return overviewSectionFromProject(projectId) ?? section;
  }

  return section;
}

export const DEEP_DIVE_PROJECT_IDS = PROJECT_INVENTORY_ORDER;
