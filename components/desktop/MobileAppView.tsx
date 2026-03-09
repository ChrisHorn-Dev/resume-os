"use client";

import { useWindowStore } from "@/lib/windowStore";
import ResumeApp from "@/components/apps/ResumeApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import TechStackApp from "@/components/apps/TechStackApp";
import AboutApp from "@/components/apps/AboutApp";
import ContactApp from "@/components/apps/ContactApp";
import WelcomeApp from "@/components/apps/WelcomeApp";
import TerminalApp from "@/components/apps/TerminalApp";
import { X } from "lucide-react";

const APP_COMPONENTS = {
  welcome: WelcomeApp,
  resume: ResumeApp,
  projects: ProjectsApp,
  techstack: TechStackApp,
  about: AboutApp,
  contact: ContactApp,
  terminal: TerminalApp,
} as const;

export default function MobileAppView() {
  const { windows, focusedWindowId, closeWindow } = useWindowStore();
  const win = windows.find((w) => w.id === focusedWindowId) ?? windows[windows.length - 1];
  if (!win) return null;

  const AppComponent = APP_COMPONENTS[win.appId];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--surface)] md:hidden">
      <header className="flex min-h-12 shrink-0 items-center justify-between border-b border-[var(--border)] px-3">
        <span className="text-sm font-medium text-[var(--foreground)]">{win.title}</span>
        <button
          type="button"
          onClick={() => closeWindow(win.id)}
          className="flex h-9 w-9 items-center justify-center rounded text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-auto">
        {AppComponent ? <AppComponent /> : null}
      </div>
    </div>
  );
}
