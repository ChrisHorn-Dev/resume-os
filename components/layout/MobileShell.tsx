"use client";

import { useEffect, useRef, useState } from "react";
import Desktop from "@/components/desktop/Desktop";
import BootScreen from "@/components/desktop/BootScreen";
import MobileTopBar from "@/components/mobile/MobileTopBar";
import MobileLauncher from "@/components/mobile/MobileLauncher";
import MobileAppView from "@/components/mobile/MobileAppView";
import MobileSystemBar from "@/components/mobile/MobileSystemBar";
import MobileTerminalScene from "@/components/mobile/MobileTerminalScene";
import { useWindowStore } from "@/lib/windowStore";
import { useViewportMode } from "@/lib/useViewportMode";

export default function MobileShell() {
  const { windows, focusedWindowId, closeWindow } = useWindowStore();
  const mode = useViewportMode();
  const [entryAnimationDone, setEntryAnimationDone] = useState(false);
  const entryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Frozen layout viewport size when terminal opens; overlay never resizes on keyboard so no blank gap */
  const terminalOverlaySizeRef = useRef<{ w: number; h: number } | null>(null);

  const nonMinimized = windows.filter((w) => !w.isMinimized);
  const activeWin =
    windows.find((w) => w.id === focusedWindowId) ?? nonMinimized[nonMinimized.length - 1];

  const isMobile = mode === "mobile";
  const isTerminalActive = isMobile && activeWin?.appId === "terminal";

  // Clear frozen size when leaving terminal so next open captures fresh layout viewport
  useEffect(() => {
    if (!isTerminalActive) {
      terminalOverlaySizeRef.current = null;
    }
  }, [isTerminalActive]);

  // Run entry animation only once when overlay first mounts; then static (no re-entry on refocus)
  useEffect(() => {
    if (!isTerminalActive || !activeWin) return;
    if (entryAnimationDone) return;
    entryTimeoutRef.current = setTimeout(() => {
      setEntryAnimationDone(true);
      entryTimeoutRef.current = null;
    }, 200);
    return () => {
      if (entryTimeoutRef.current) {
        clearTimeout(entryTimeoutRef.current);
        entryTimeoutRef.current = null;
      }
    };
  }, [isTerminalActive, activeWin?.id, entryAnimationDone]);

  // Reset entry state when leaving terminal so next open gets the animation
  useEffect(() => {
    if (!isTerminalActive) {
      setEntryAnimationDone(false);
      if (entryTimeoutRef.current) {
        clearTimeout(entryTimeoutRef.current);
        entryTimeoutRef.current = null;
      }
    }
  }, [isTerminalActive]);

  useEffect(() => {
    if (!isTerminalActive) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.documentElement.scrollLeft = 0;
      return;
    }
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.body.style.touchAction = prevTouchAction;
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.documentElement.scrollLeft = 0;
    };
  }, [isTerminalActive]);

  const handleCloseTerminal = () => {
    if (activeWin) closeWindow(activeWin.id);
  };

  return (
    <div className="relative min-h-[100dvh] h-full w-screen overflow-hidden bg-[var(--background)]">
      <BootScreen />

      <div className="pointer-events-none absolute inset-0">
        <Desktop />
      </div>

      <div
        className="relative z-10 flex h-full min-h-[100dvh] flex-col bg-gradient-to-b from-black/40 via-black/20 to-black/40 pt-[env(safe-area-inset-top)] pb-[calc(env(safe-area-inset-bottom)+3.5rem)]"
        style={{ minHeight: "100dvh" }}
      >
        <MobileTopBar />
        <div className="min-h-0 flex-1 overflow-hidden">
          {isTerminalActive ? null : activeWin ? (
            <MobileAppView win={activeWin} />
          ) : (
            <MobileLauncher />
          )}
        </div>
        <MobileSystemBar />
      </div>

      {isTerminalActive && activeWin && (() => {
        const size =
          typeof window !== "undefined"
            ? terminalOverlaySizeRef.current ||
              (terminalOverlaySizeRef.current = {
                w: window.innerWidth,
                h: window.innerHeight,
              })
            : null;
        return (
          <div
            className={
              entryAnimationDone
                ? "fixed left-0 top-0 z-20 bg-[#0d0d0f]"
                : "mobile-terminal-enter fixed left-0 top-0 z-20 bg-[#0d0d0f]"
            }
            style={
              size
                ? { width: size.w, height: size.h }
                : { inset: 0 }
            }
          >
            <MobileTerminalScene win={activeWin} onClose={handleCloseTerminal} />
          </div>
        );
      })()}
    </div>
  );
}
