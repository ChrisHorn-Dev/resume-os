"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowStore } from "@/lib/windowStore";
import Window from "./Window";
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
  const { windows, clearFocus } = useWindowStore();

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const inWindow = (target as Element).closest?.("[data-window-chrome]");
      const inTaskbar = (target as Element).closest?.("footer");
      const inMenuBar = (target as Element).closest?.("[data-menu-bar]");
      const inDesktopIcons = (target as Element).closest?.("[data-desktop-icons]");
      if (!inWindow && !inTaskbar && !inMenuBar && !inDesktopIcons) clearFocus();
    };
    document.addEventListener("mousedown", onMouseDown, true);
    return () => document.removeEventListener("mousedown", onMouseDown, true);
  }, [clearFocus]);

  const visibleWindows = windows.filter((w) => !w.isMinimized);

  return (
    <AnimatePresence>
      {visibleWindows.map((win) => {
        const AppComponent = APP_COMPONENTS[win.appId];
        return (
          <motion.div
            key={win.id}
            className="pointer-events-auto absolute inset-0"
            style={{ zIndex: win.zIndex }}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Window win={win}>
              {AppComponent ? <AppComponent /> : null}
            </Window>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
