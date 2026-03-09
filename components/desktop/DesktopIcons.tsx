"use client";

import { useState, useEffect } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getDockApps, getCenterPosition } from "@/lib/apps";
import { APP_ICONS } from "@/lib/icons";
import type { AppId } from "@/lib/types";

export default function DesktopIcons() {
  const { openApp, windows, focusWindow, setMinimized, focusedWindowId } =
    useWindowStore();
  const dockApps = getDockApps();
  const [selectedId, setSelectedId] = useState<AppId | null>(null);

  const handleSelect = (appId: AppId) => {
    setSelectedId(appId);
  };

  const handleOpen = (appId: AppId) => {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        setMinimized(existing.id, false);
        focusWindow(existing.id);
      } else {
        focusWindow(existing.id);
      }
    } else {
      const pos =
        appId === "projects" ? getCenterPosition("projects") : undefined;
      openApp(appId, pos);
    }
    setSelectedId(null);
  };

  const focusedAppId =
    focusedWindowId != null
      ? windows.find((w) => w.id === focusedWindowId)?.appId ?? null
      : null;
  const selected = selectedId ?? focusedAppId;

  useEffect(() => {
    if (focusedWindowId === null) setSelectedId(null);
  }, [focusedWindowId]);

  return (
    <div
      data-desktop-icons
      className="absolute left-5 top-5 grid w-[88px] grid-cols-1 gap-[6px]"
      role="list"
      aria-label="Desktop icons"
    >
      {dockApps.map((app) => {
        const Icon = APP_ICONS[app.id];
        const isOpen = windows.some((w) => w.appId === app.id);
        const isSelected = selected === app.id;
        return (
          <button
            key={app.id}
            type="button"
            onClick={() => handleSelect(app.id)}
            onDoubleClick={() => handleOpen(app.id)}
            className="group flex flex-col items-center gap-[5px] rounded-md px-1 py-2 outline-none transition-all duration-200 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            aria-label={`Open ${app.title}`}
            style={{
              background: isSelected
                ? "rgba(255,255,255,0.08)"
                : "transparent",
              boxShadow: isSelected
                ? "0 0 0 1px rgba(255,255,255,0.12)"
                : undefined,
            }}
          >
            <div
              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200 ease-out ${
                isSelected
                  ? "bg-white/[0.12] shadow-md"
                  : "bg-white/[0.04] group-hover:bg-white/[0.1] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.06)]"
              } ${isOpen && !isSelected ? "ring-1 ring-[var(--accent)]/30" : ""}`}
            >
              {Icon && (
                <Icon
                  size={30}
                  className={
                    isOpen
                      ? "text-[var(--accent)]"
                      : "text-zinc-200 group-hover:text-white"
                  }
                />
              )}
            </div>
            <span
              className="max-w-full truncate text-center text-[11px] leading-tight text-[var(--foreground)] drop-shadow-sm"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
            >
              {app.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
