import type { LucideIcon } from "lucide-react";
import { FileText, FolderGit2, Layers, User, Mail } from "lucide-react";
import type { AppId } from "./types";

export const APP_ICONS: Record<AppId, LucideIcon> = {
  resume: FileText,
  projects: FolderGit2,
  techstack: Layers,
  about: User,
  contact: Mail,
};
