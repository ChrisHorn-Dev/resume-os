"use client";

import { useWindowStore } from "@/lib/windowStore";
import { APPS } from "@/lib/apps";
import { APP_ICONS } from "@/lib/icons";

export default function Taskbar() {
  const { windows, focusedWindowId, openApp, focusWindow } = useWindowStore();

  return (
    <footer
      className="absolute bottom-0 left-0 right-0 z-[100] flex h-12 items-center gap-1 border-t border-[var(--border)] bg-[var(--surface)] px-2"
      role="toolbar"
      aria-label="Application launcher"
    >
      <div className="flex items-center gap-1 px-2">
        <span className="text-xs font-medium text-zinc-500">Resume OS</span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-1">
        {APPS.map((app) => {
          const isOpen = windows.some((w) => w.appId === app.id);
          const isFocused = windows.some(
            (w) => w.appId === app.id && w.id === focusedWindowId
          );
          const Icon = APP_ICONS[app.id];
          const handleClick = () => {
            if (isOpen) {
              const w = windows.find((x) => x.appId === app.id);
              if (w) focusWindow(w.id);
            } else {
              openApp(app.id);
            }
          };
          return (
            <button
              key={app.id}
              type="button"
              onClick={handleClick}
              className={`flex h-9 min-w-[4rem] items-center justify-center gap-2 rounded px-3 text-sm transition-colors ${
                isFocused
                  ? "bg-[var(--accent)] text-white"
                  : isOpen
                    ? "bg-zinc-700/80 text-[var(--foreground)]"
                    : "text-zinc-400 hover:bg-zinc-700/60 hover:text-zinc-200"
              }`}
              aria-pressed={isFocused}
              aria-label={`Open ${app.title}`}
            >
              {Icon && <Icon size={18} aria-hidden />}
              <span className="hidden sm:inline">{app.title}</span>
            </button>
          );
        })}
      </div>
      <div className="w-16 shrink-0" aria-hidden />
    </footer>
  );
}
