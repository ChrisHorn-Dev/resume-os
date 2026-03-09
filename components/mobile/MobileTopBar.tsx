"use client";

import { useState, useRef, useEffect } from "react";
import { getDockApps } from "@/lib/apps";
import { APP_ICONS } from "@/lib/icons";
import { useWindowStore } from "@/lib/windowStore";
import type { AppId } from "@/lib/types";
import { Menu } from "lucide-react";

export default function MobileTopBar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dockApps = getDockApps();
  const { openApp } = useWindowStore();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleOpenApp = (id: AppId) => {
    openApp(id);
    setOpen(false);
  };

  return (
    <header
      className="relative z-[40] flex h-11 items-stretch border-b border-white/[0.05] bg-[rgba(12,12,14,0.9)] px-3 pb-1 pt-1 text-[13px] shadow-[0_4px_12px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:h-13 sm:px-4"
      aria-label="Mobile top bar"
    >
      <div className="flex h-full w-9 items-center justify-start" aria-hidden />
      <div className="flex flex-1 items-center justify-center">
        <span className="text-[13px] tracking-[0.02em] text-white/90">
          <span className="font-semibold">Chris</span>
          <span className="font-medium text-white/60">OS</span>
        </span>
      </div>
      <div className="relative flex h-full shrink-0 items-center justify-end" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={18} />
        </button>
        {open && (
          <div
            className="absolute right-0 top-full z-20 mt-1.5 min-w-[190px] rounded-2xl border border-[var(--border-subtle)]/90 bg-[var(--surface-elevated)]/98 p-2 shadow-xl backdrop-blur-2xl"
            role="menu"
          >
            {dockApps.map((app) => {
              const Icon = APP_ICONS[app.id];
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => handleOpenApp(app.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-[var(--foreground)] transition-colors hover:bg-white/[0.08]"
                  role="menuitem"
                >
                  {Icon && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.06]">
                      <Icon size={18} />
                    </span>
                  )}
                  <span className="truncate">{app.title}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

