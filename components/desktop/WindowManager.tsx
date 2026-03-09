"use client";

import { useWindowStore } from "@/lib/windowStore";
import { useIsMobile } from "@/lib/useMediaQuery";
import { useEffect } from "react";
import Window from "./Window";
import MobileAppView from "./MobileAppView";
import { getCenterPosition } from "@/lib/apps";
import ResumeApp from "@/components/apps/ResumeApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import TechStackApp from "@/components/apps/TechStackApp";
import AboutApp from "@/components/apps/AboutApp";
import ContactApp from "@/components/apps/ContactApp";
import WelcomeApp from "@/components/apps/WelcomeApp";
import TerminalApp from "@/components/apps/TerminalApp";

const APP_COMPONENTS = {
  welcome: WelcomeApp,
  resume: ResumeApp,
  projects: ProjectsApp,
  techstack: TechStackApp,
  about: AboutApp,
  contact: ContactApp,
  terminal: TerminalApp,
} as const;

export default function WindowManager() {
  const { windows, clearFocus, openApp } = useWindowStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    openApp("welcome", getCenterPosition("welcome"));
    const visited = sessionStorage.getItem("resume-os-visited");
    if (!visited) {
      sessionStorage.setItem("resume-os-visited", "1");
      openApp("projects", getCenterPosition("projects"));
    }
  }, [openApp]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const inWindow = (target as Element).closest?.("[data-window-chrome]");
      const inTaskbar = (target as Element).closest?.("footer");
      if (!inWindow && !inTaskbar) clearFocus();
    };
    document.addEventListener("mousedown", onMouseDown, true);
    return () => document.removeEventListener("mousedown", onMouseDown, true);
  }, [clearFocus]);

  return (
    <>
      {isMobile && <MobileAppView />}
      <div
        className={`absolute inset-0 z-10 ${isMobile ? "max-md:invisible max-md:pointer-events-none" : ""}`}
      >
        {windows.map((win) => {
          if (isMobile) return null;
          const AppComponent = APP_COMPONENTS[win.appId];
          return (
            <Window key={win.id} win={win}>
              {AppComponent ? <AppComponent /> : null}
            </Window>
          );
        })}
      </div>
    </>
  );
}
