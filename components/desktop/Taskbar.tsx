"use client";

import { useState, useEffect, useRef } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getDockApps, getCenterPosition } from "@/lib/apps";
import { APP_ICONS } from "@/lib/icons";
import type { AppId } from "@/lib/types";
import { motion } from "framer-motion";
import { Grid3X3 } from "lucide-react";

export default function Taskbar() {
  const { windows, focusedWindowId, openApp, focusWindow, setMinimized } =
    useWindowStore();
  const [launcherOpen, setLauncherOpen] = useState(false);
  const launcherRef = useRef<HTMLDivElement>(null);
  const dockApps = getDockApps();

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (launcherRef.current && !launcherRef.current.contains(e.target as Node)) {
        setLauncherOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleWindowClick = (winId: string, isMinimized: boolean) => {
    if (isMinimized) {
      setMinimized(winId, false);
      focusWindow(winId);
    } else {
      const isFocused = focusedWindowId === winId;
      if (isFocused) {
        setMinimized(winId, true);
      } else {
        focusWindow(winId);
      }
    }
  };

  const handleLauncherApp = (appId: AppId) => {
    const pos = appId === "projects" ? getCenterPosition("projects") : undefined;
    openApp(appId, pos);
    setLauncherOpen(false);
  };

  return (
    <footer
      className="absolute bottom-0 left-0 right-0 flex h-14 items-center gap-2 border-t border-[var(--border-subtle)]/80 bg-[var(--surface)]/85 px-2 backdrop-blur-xl"
      role="toolbar"
      aria-label="Dock"
    >
      {/* Launcher button — opens app menu when nothing is open or to add more apps */}
      <div className="relative shrink-0" ref={launcherRef}>
        <button
          type="button"
          onClick={() => setLauncherOpen(!launcherOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-[var(--foreground)]"
          aria-label="App launcher"
          aria-expanded={launcherOpen}
        >
          <Grid3X3 size={20} />
        </button>
        {launcherOpen && (
          <div
            className="absolute bottom-full left-0 mb-1.5 flex min-w-[180px] flex-wrap gap-1 rounded-lg border border-[var(--border-subtle)]/80 bg-[var(--surface-elevated)]/95 p-2 shadow-xl backdrop-blur-xl"
            role="menu"
          >
            {dockApps.map((app) => {
              const Icon = APP_ICONS[app.id];
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => handleLauncherApp(app.id)}
                  className="flex flex-col items-center gap-0.5 rounded-md p-2 text-[var(--foreground)] transition-colors hover:bg-white/[0.08]"
                  role="menuitem"
                >
                  {Icon && <Icon size={24} aria-hidden />}
                  <span className="text-[11px] font-medium">{app.title}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Open windows only — one item per window */}
      <div className="flex flex-1 items-center justify-center gap-1 overflow-x-auto">
        {windows.map((win) => {
          const isFocused = focusedWindowId === win.id;
          const Icon = APP_ICONS[win.appId];
          return (
            <motion.button
              key={win.id}
              type="button"
              onClick={() => handleWindowClick(win.id, win.isMinimized)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className={`relative flex h-10 min-w-[3rem] max-w-[5rem] flex-col items-center justify-center gap-0 rounded-lg px-2 transition-colors duration-200 ease-[var(--ease-out)] touch-manipulation ${
                isFocused
                  ? "bg-white/[0.14] text-[var(--foreground)]"
                  : "bg-white/[0.06] text-zinc-400 hover:bg-white/[0.10] hover:text-[var(--foreground)]"
              }`}
              aria-pressed={isFocused}
              aria-label={win.title}
            >
              {isFocused && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-1 -translate-x-1/2 rounded-full bg-white/80" />
              )}
              {Icon && <Icon size={20} aria-hidden className="shrink-0" />}
              <span className="max-w-full truncate text-[11px] font-medium">
                {win.title}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="w-10 shrink-0" aria-hidden />
    </footer>
  );
}
