import type { AppConfig } from "./types";

const TASKBAR_HEIGHT = 56;

function centerPosition(width: number, height: number) {
  if (typeof window === "undefined")
    return { x: 100, y: 80 };
  const x = Math.max(0, (window.innerWidth - width) / 2);
  const y = Math.max(0, (window.innerHeight - TASKBAR_HEIGHT - height) / 2);
  return { x, y };
}

export const APPS: AppConfig[] = [
  {
    id: "welcome",
    title: "Welcome",
    icon: "Hand",
    defaultSize: { w: 420, h: 260 },
    defaultPosition: undefined,
    showInDock: false,
  },
  {
    id: "resume",
    title: "Resume",
    icon: "FileText",
    defaultSize: { w: 520, h: 360 },
    defaultPosition: { x: 80, y: 60 },
    showInDock: true,
  },
  {
    id: "projects",
    title: "Projects",
    icon: "FolderGit2",
    defaultSize: { w: 760, h: 520 },
    defaultPosition: undefined,
    showInDock: true,
  },
  {
    id: "techstack",
    title: "Tech Stack",
    icon: "Layers",
    defaultSize: { w: 600, h: 420 },
    defaultPosition: { x: 160, y: 100 },
    showInDock: true,
  },
  {
    id: "about",
    title: "About",
    icon: "User",
    defaultSize: { w: 500, h: 360 },
    defaultPosition: { x: 200, y: 120 },
    showInDock: true,
  },
  {
    id: "contact",
    title: "Contact",
    icon: "Mail",
    defaultSize: { w: 480, h: 320 },
    defaultPosition: { x: 240, y: 140 },
    showInDock: true,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "Terminal",
    defaultSize: { w: 520, h: 340 },
    defaultPosition: { x: 280, y: 80 },
    showInDock: true,
  },
];

export const getAppById = (id: AppConfig["id"]) => APPS.find((a) => a.id === id);

export const getDockApps = () => APPS.filter((a) => a.showInDock !== false);

export const getCenterPosition = (appId: AppConfig["id"]) => {
  const app = getAppById(appId);
  if (!app) return { x: 100, y: 80 };
  return centerPosition(app.defaultSize.w, app.defaultSize.h);
};
