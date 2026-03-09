"use client";

import Desktop from "@/components/desktop/Desktop";
import Taskbar from "@/components/desktop/Taskbar";
import MenuBar from "@/components/desktop/MenuBar";
import DesktopIcons from "@/components/desktop/DesktopIcons";
import WindowManager from "@/components/desktop/WindowManager";
import BootScreen from "@/components/desktop/BootScreen";
import { MENU_BAR_HEIGHT, TASKBAR_HEIGHT } from "@/lib/apps";

/**
 * Desktop layer stack (bottom → top):
 * - WallpaperLayer (z-0)
 * - Icon column (z-110) — left strip; clickable when not covered by a window
 * - WindowLayer (z-120) — above icons so windows capture clicks when they overlap
 * - DockLayer (z-200)
 * - MenuBarLayer (z-300)
 * BootScreen renders above all when visible.
 */
export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--background)]">
      <BootScreen />

      {/* WallpaperLayer: z-0 */}
      <div className="absolute inset-0 z-0">
        <Desktop />
      </div>

      {/* Icon column: z-110 — clickable when no window is over it */}
      <div
        className="absolute left-0 z-[110] pointer-events-auto"
        style={{ top: MENU_BAR_HEIGHT, bottom: TASKBAR_HEIGHT, width: 116 }}
        aria-hidden
      >
        <DesktopIcons />
      </div>

      {/* WindowLayer: z-120 — wrapper has pointer-events-none so clicks pass through to icons when not on a window */}
      <div
        className="absolute left-0 right-0 z-[120] pointer-events-none"
        style={{ top: MENU_BAR_HEIGHT, bottom: TASKBAR_HEIGHT }}
        data-window-layer
      >
        <WindowManager />
      </div>

      {/* DockLayer: z-200 — always above windows */}
      <div className="absolute inset-x-0 bottom-0 z-[200]">
        <Taskbar />
      </div>

      {/* MenuBarLayer: z-300 — above everything */}
      <div className="absolute inset-x-0 top-0 z-[300]">
        <MenuBar />
      </div>
    </div>
  );
}
