"use client";

import { useWindowStore } from "@/lib/windowStore";
import { useIsMobile } from "@/lib/useMediaQuery";
import Window from "./Window";
import MobileAppView from "./MobileAppView";
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
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <MobileAppView />}
      <div className={`absolute inset-0 pointer-events-none ${isMobile ? "max-md:invisible max-md:pointer-events-none" : ""}`}>
        <div className="pointer-events-auto absolute inset-0">
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
      </div>
    </>
  );
}
