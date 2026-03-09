"use client";

import { useState, useEffect, useRef } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getCenterPosition } from "@/lib/apps";
import { socialLinks } from "@/content/social";
import type { AppId } from "@/lib/types";
import { Github, Linkedin } from "lucide-react";

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

export default function MenuBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { openApp, windows, focusWindow, minimizeAll, closeAllWindows } = useWindowStore();
  const clock = useTime();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleFileOpenResume = () => {
    openApp("resume", { position: getCenterPosition("resume") });
    setOpenMenu(null);
  };

  const handleViewBringAllToFront = () => {
    const top = windows.filter((w) => !w.isMinimized).sort((a, b) => b.zIndex - a.zIndex)[0];
    if (top) focusWindow(top.id);
    setOpenMenu(null);
  };

  const handleWindowMinimizeAll = () => {
    minimizeAll();
    setOpenMenu(null);
  };

  const handleWindowCloseAll = () => {
    closeAllWindows();
    setOpenMenu(null);
  };

  const handleHelpAbout = () => {
    openApp("about", { position: getCenterPosition("about") });
    setOpenMenu(null);
  };

  return (
    <header
      ref={ref}
      data-menu-bar
      className="absolute top-0 left-0 right-0 flex h-7 items-center justify-between border-b border-[var(--border-subtle)]/80 bg-[var(--menu-bar)]/70 px-3 backdrop-blur-xl"
      role="menubar"
      aria-label="Menu bar"
    >
      <div className="flex items-center gap-1">
        <span className="px-1.5 py-0.5 text-[13px] font-semibold text-[var(--foreground)]">
          ChrisOS
        </span>
        {["file", "view", "window", "help"].map((id) => (
          <div key={id} className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === id ? null : id)}
              className={`rounded px-1.5 py-0.5 text-[12px] font-normal text-[var(--foreground)]/90 transition-colors hover:bg-white/[0.08] ${
                openMenu === id ? "bg-white/[0.08]" : ""
              }`}
              aria-haspopup="true"
              aria-expanded={openMenu === id}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
            {openMenu === id && id === "file" && (
              <div
                className="absolute left-0 top-full mt-0.5 min-w-[140px] rounded-md border border-[var(--border-subtle)]/80 bg-[var(--surface-elevated)]/95 py-1 shadow-lg backdrop-blur-xl"
                role="menu"
              >
                <button
                  type="button"
                  onClick={handleFileOpenResume}
                  className="w-full px-3 py-1.5 text-left text-[12px] text-[var(--foreground)] hover:bg-white/[0.08]"
                  role="menuitem"
                >
                  Open Resume
                </button>
              </div>
            )}
            {openMenu === id && id === "view" && (
              <div
                className="absolute left-0 top-full mt-0.5 min-w-[160px] rounded-md border border-[var(--border-subtle)]/80 bg-[var(--surface-elevated)]/95 py-1 shadow-lg backdrop-blur-xl"
                role="menu"
              >
                <button
                  type="button"
                  onClick={handleViewBringAllToFront}
                  className="w-full px-3 py-1.5 text-left text-[12px] text-[var(--foreground)] hover:bg-white/[0.08]"
                  role="menuitem"
                >
                  Bring All to Front
                </button>
              </div>
            )}
            {openMenu === id && id === "window" && (
              <div
                className="absolute left-0 top-full mt-0.5 min-w-[140px] rounded-md border border-[var(--border-subtle)]/80 bg-[var(--surface-elevated)]/95 py-1 shadow-lg backdrop-blur-xl"
                role="menu"
              >
                <button
                  type="button"
                  onClick={handleWindowMinimizeAll}
                  className="w-full px-3 py-1.5 text-left text-[12px] text-[var(--foreground)] hover:bg-white/[0.08]"
                  role="menuitem"
                >
                  Minimize All
                </button>
                <button
                  type="button"
                  onClick={handleWindowCloseAll}
                  className="w-full px-3 py-1.5 text-left text-[12px] text-[var(--foreground)] hover:bg-white/[0.08]"
                  role="menuitem"
                >
                  Close All
                </button>
              </div>
            )}
            {openMenu === id && id === "help" && (
              <div
                className="absolute left-0 top-full mt-0.5 min-w-[120px] rounded-md border border-[var(--border-subtle)]/80 bg-[var(--surface-elevated)]/95 py-1 shadow-lg backdrop-blur-xl"
                role="menu"
              >
                <button
                  type="button"
                  onClick={handleHelpAbout}
                  className="w-full px-3 py-1.5 text-left text-[12px] text-[var(--foreground)] hover:bg-white/[0.08]"
                  role="menuitem"
                >
                  About
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded p-1 text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-[var(--foreground)]"
          aria-label="GitHub profile"
        >
          <Github size={13} />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded p-1 text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-[var(--foreground)]"
          aria-label="LinkedIn profile"
        >
          <Linkedin size={13} />
        </a>
        <span className="ml-1 text-[11px] tabular-nums text-zinc-500">
          {clock}
        </span>
      </div>
    </header>
  );
}
