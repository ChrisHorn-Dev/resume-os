import type { AppConfig } from "./types";

export const APPS: AppConfig[] = [
  { id: "resume", title: "Resume", icon: "FileText", defaultSize: { w: 520, h: 420 }, defaultPosition: { x: 80, y: 60 } },
  { id: "projects", title: "Projects", icon: "FolderGit2", defaultSize: { w: 640, h: 480 }, defaultPosition: { x: 120, y: 80 } },
  { id: "techstack", title: "Tech Stack", icon: "Layers", defaultSize: { w: 480, h: 400 }, defaultPosition: { x: 160, y: 100 } },
  { id: "about", title: "About", icon: "User", defaultSize: { w: 440, h: 380 }, defaultPosition: { x: 200, y: 120 } },
  { id: "contact", title: "Contact", icon: "Mail", defaultSize: { w: 380, h: 320 }, defaultPosition: { x: 240, y: 140 } },
];

export const getAppById = (id: AppConfig["id"]) => APPS.find((a) => a.id === id);
