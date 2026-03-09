"use client";

import Desktop from "@/components/desktop/Desktop";
import BootScreen from "@/components/desktop/BootScreen";
import MobileTopBar from "@/components/mobile/MobileTopBar";
import MobileLauncher from "@/components/mobile/MobileLauncher";
import MobileAppView from "@/components/mobile/MobileAppView";
import MobileSystemBar from "@/components/mobile/MobileSystemBar";
import { useWindowStore } from "@/lib/windowStore";

export default function MobileShell() {
  const { windows, focusedWindowId } = useWindowStore();

  const nonMinimized = windows.filter((w) => !w.isMinimized);
  const activeWin =
    windows.find((w) => w.id === focusedWindowId) ?? nonMinimized[nonMinimized.length - 1];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--background)]">
      <BootScreen />

      {/* Wallpaper behind mobile shell for consistent brand */}
      <div className="pointer-events-none absolute inset-0">
        <Desktop />
      </div>

      <div className="relative z-10 flex h-full flex-col bg-gradient-to-b from-black/40 via-black/20 to-black/40">
        <MobileTopBar />
        <div className="flex-1 overflow-hidden">
          {activeWin ? <MobileAppView win={activeWin} /> : <MobileLauncher />}
        </div>
        <MobileSystemBar />
      </div>
    </div>
  );
}

