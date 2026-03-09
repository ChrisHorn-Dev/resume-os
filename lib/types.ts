export type AppId =
  | "resume"
  | "projects"
  | "techstack"
  | "about"
  | "contact"
  | "welcome"
  | "terminal";

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface AppConfig {
  id: AppId;
  title: string;
  icon: string;
  defaultSize: { w: number; h: number };
  defaultPosition?: { x: number; y: number };
  showInDock?: boolean;
}
