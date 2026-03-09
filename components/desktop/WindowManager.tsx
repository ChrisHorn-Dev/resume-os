"use client";

import { useWindowStore } from "@/lib/windowStore";
import Window from "./Window";
import ResumeApp from "@/components/apps/ResumeApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import TechStackApp from "@/components/apps/TechStackApp";
import AboutApp from "@/components/apps/AboutApp";
import ContactApp from "@/components/apps/ContactApp";

const APP_COMPONENTS = {
  resume: ResumeApp,
  projects: ProjectsApp,
  techstack: TechStackApp,
  about: AboutApp,
  contact: ContactApp,
} as const;

export default function WindowManager() {
  const { windows } = useWindowStore();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="pointer-events-auto absolute inset-0">
        {windows.map((win) => {
          const AppComponent = APP_COMPONENTS[win.appId];
          return (
            <Window key={win.id} win={win}>
              {AppComponent ? <AppComponent /> : null}
            </Window>
          );
        })}
      </div>
    </div>
  );
}
