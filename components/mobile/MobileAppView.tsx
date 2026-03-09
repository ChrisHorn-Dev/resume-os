"use client";

import type { WindowState } from "@/lib/types";
import ResumeApp from "@/components/apps/ResumeApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import TechStackApp from "@/components/apps/TechStackApp";
import AboutApp from "@/components/apps/AboutApp";
import ContactApp from "@/components/apps/ContactApp";
import WelcomeApp from "@/components/apps/WelcomeApp";
import TerminalApp from "@/components/apps/TerminalApp";
import { useWindowStore } from "@/lib/windowStore";
import { ChevronLeft } from "lucide-react";

const APP_COMPONENTS = {
  welcome: WelcomeApp,
  resume: ResumeApp,
  projects: ProjectsApp,
  techstack: TechStackApp,
  about: AboutApp,
  contact: ContactApp,
  terminal: TerminalApp,
} as const;

interface MobileAppViewProps {
  win: WindowState;
}

export default function MobileAppView({ win }: MobileAppViewProps) {
  const { closeWindow } = useWindowStore();
  const AppComponent = APP_COMPONENTS[win.appId];

  const handleBack = () => {
    closeWindow(win.id);
  };

  return (
    <section
      aria-label={win.title}
      className="flex h-full flex-col bg-[var(--surface)]/96 shadow-[0_18px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
    >
      <header className="flex min-h-12 shrink-0 items-center justify-between border-b border-[var(--border)]/90 px-3 sm:px-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 hover:bg-zinc-700/80 hover:text-zinc-50"
          aria-label="Back to home"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="flex-1 truncate px-1 text-center text-sm font-medium text-[var(--foreground)]">
          {win.title}
        </span>
        <div className="h-9 w-9" aria-hidden />
      </header>
      <div className="min-h-0 flex-1 overflow-auto px-3 py-3 sm:px-4 sm:py-4">
        {AppComponent ? <AppComponent /> : null}
      </div>
    </section>
  );
}

