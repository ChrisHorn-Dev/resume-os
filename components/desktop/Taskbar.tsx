"use client";

import { useWindowStore } from "@/lib/windowStore";
import { getDockApps, getCenterPosition } from "@/lib/apps";
import { APP_ICONS } from "@/lib/icons";
import type { AppId } from "@/lib/types";
import { useState, useEffect } from "react";

function useTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () => {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes();
      const am = h < 12;
      const h12 = h % 12 || 12;
      setTime(`${h12}:${m.toString().padStart(2, "0")} ${am ? "AM" : "PM"}`);
    };
    format();
    const id = setInterval(format, 60_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Taskbar() {
  const { windows, focusedWindowId, openApp, focusWindow, setMinimized } =
    useWindowStore();
  const clock = useTime();

  const handleAppClick = (appId: AppId) => {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        setMinimized(existing.id, false);
        focusWindow(existing.id);
      } else {
        setMinimized(existing.id, true);
      }
    } else {
      const pos =
        appId === "projects" ? getCenterPosition("projects") : undefined;
      openApp(appId, pos);
    }
  };

  const dockApps = getDockApps();

  return (
    <footer
      className="absolute bottom-0 left-0 right-0 z-[100] flex h-14 items-center gap-1 border-t border-[var(--border)] bg-[var(--surface)] px-2"
      role="toolbar"
      aria-label="Application launcher"
    >
      <div className="flex items-center gap-1 px-2">
        <span className="text-xs font-medium text-zinc-500">Resume OS</span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-1">
        {dockApps.map((app) => {
          const isOpen = windows.some((w) => w.appId === app.id);
          const isFocused = windows.some(
            (w) => w.appId === app.id && w.id === focusedWindowId
          );
          const Icon = APP_ICONS[app.id];
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => handleAppClick(app.id)}
              className={`flex h-10 min-h-10 min-w-[3rem] flex-1 max-w-20 items-center justify-center gap-2 rounded px-2 text-sm transition-colors touch-manipulation sm:min-w-[4rem] sm:max-w-none ${
                isFocused
                  ? "bg-[var(--accent)] text-white"
                  : isOpen
                    ? "bg-zinc-700/80 text-[var(--foreground)]"
                    : "text-zinc-400 hover:bg-zinc-700/60 hover:text-zinc-200 active:bg-zinc-700/80"
              }`}
              aria-pressed={isFocused}
              aria-label={`Open ${app.title}`}
            >
              {Icon && <Icon size={20} aria-hidden />}
              <span className="hidden sm:inline">{app.title}</span>
            </button>
          );
        })}
      </div>
      <div className="flex shrink-0 items-center px-3 text-xs tabular-nums text-zinc-500">
        {clock}
      </div>
    </footer>
  );
}
