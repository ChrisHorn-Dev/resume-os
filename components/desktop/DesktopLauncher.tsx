"use client";

import { getDockApps, getCenterPosition } from "@/lib/apps";
import { APP_ICONS } from "@/lib/icons";
import { useWindowStore } from "@/lib/windowStore";
import type { AppId } from "@/lib/types";

export default function DesktopLauncher() {
  const { openApp, windows } = useWindowStore();
  const dockApps = getDockApps();

  const handleOpen = (id: AppId) => {
    openApp(id, { position: getCenterPosition(id) });
  };

  const openAppIds = new Set(windows.map((w) => w.appId));

  return (
    <section
      aria-label="Apps"
      className="pointer-events-auto mx-auto flex h-full max-w-3xl flex-col px-6 pb-10 pt-6"
    >
      <div className="mb-3 flex justify-center">
        <div className="rounded-full border border-white/[0.05] bg-white/[0.03] px-4 py-1.5 text-[11px] text-zinc-300 shadow-[0_14px_40px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
          Launch an app to get started
        </div>
      </div>
      <div className="rounded-3xl border border-white/[0.05] bg-white/[0.02] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
        <div className="grid grid-cols-3 gap-y-4 gap-x-4">
          {dockApps.map((app) => {
            const Icon = APP_ICONS[app.id];
            const isOpen = openAppIds.has(app.id);
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => handleOpen(app.id)}
                className="group flex flex-col items-stretch rounded-2xl border border-white/[0.06] bg-white/[0.04] p-3 text-left text-[var(--foreground)] shadow-[0_18px_45px_rgba(0,0,0,0.78)] backdrop-blur-2xl transition-all duration-200 ease-[var(--ease-out)] hover:-translate-y-[2px] hover:border-white/[0.16] hover:bg-white/[0.08] active:translate-y-0 active:scale-[0.96]"
              >
                <div className="mb-2.5 flex items-center gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] shadow-[0_0_18px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.16]">
                    {Icon && (
                      <Icon
                        size={22}
                        className="text-zinc-50 group-hover:text-white"
                      />
                    )}
                  </div>
                  <span className="flex-1 truncate text-[13px] font-medium">
                    {app.title}
                  </span>
                </div>
                {isOpen && (
                  <div className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-300/80">
                    <span className="h-1 w-1 rounded-full bg-emerald-300/80" />
                    <span className="truncate">Currently open</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

