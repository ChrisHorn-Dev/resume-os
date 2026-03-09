"use client";

import Desktop from "@/components/desktop/Desktop";
import Taskbar from "@/components/desktop/Taskbar";
import MenuBar from "@/components/desktop/MenuBar";
import WindowManager from "@/components/desktop/WindowManager";
import DesktopLauncher from "@/components/desktop/DesktopLauncher";
import { useWindowStore } from "@/lib/windowStore";
import BootScreen from "@/components/desktop/BootScreen";
import { MENU_BAR_HEIGHT, TASKBAR_HEIGHT } from "@/lib/apps";

export default function DesktopShell() {
  const { windows } = useWindowStore();
  const hasActiveWindows = windows.some((w) => !w.isMinimized);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--background)]">
      <BootScreen />

      {/* Layer 1 — wallpaper */}
      <div className="absolute inset-0 z-0">
        <Desktop />
      </div>

      {/* Layer 2 — launcher surface (always present, fades + disables interaction under windows) */}
      <div
        className="absolute left-0 right-0 z-[80]"
        style={{ top: MENU_BAR_HEIGHT, bottom: TASKBAR_HEIGHT }}
        aria-hidden={hasActiveWindows}
      >
        <div
          className={`flex h-full items-center justify-center px-4 transition-all duration-200 ease-[var(--ease-out)] ${
            hasActiveWindows
              ? "pointer-events-none opacity-50 [filter:blur(2px)]"
              : "pointer-events-auto opacity-100 filter-none"
          }`}
        >
          <DesktopLauncher />
        </div>
      </div>

      {/* Layer 3 — application windows */}
      <div
        className="absolute left-0 right-0 z-[120] pointer-events-none"
        style={{ top: MENU_BAR_HEIGHT, bottom: TASKBAR_HEIGHT }}
        data-window-layer
      >
        <WindowManager />
      </div>

      {/* Layer 4 — dock */}
      <div className="absolute inset-x-0 bottom-0 z-[200]">
        <Taskbar />
      </div>

      {/* Layer 5 — menu bar */}
      <div className="absolute inset-x-0 top-0 z-[300]">
        <MenuBar />
      </div>
    </div>
  );
}

