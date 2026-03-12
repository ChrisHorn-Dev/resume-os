"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { useViewportMode } from "@/lib/useViewportMode";
import { useThemeStore } from "@/lib/themeStore";
import { Sun, Moon } from "lucide-react";

function useSystemTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function MobileSystemBar() {
  const time = useSystemTime();
  const { windows, focusedWindowId } = useWindowStore();
  const mode = useViewportMode();
  const toggleTheme = useThemeStore((s) => s.toggle);
  const preference = useThemeStore((s) => s.preference);
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [preference]);
  const resolvedTheme =
    preference === "system" ? (systemDark ? "dark" : "light") : preference;

  const nonMinimized = windows.filter((w) => !w.isMinimized);
  const activeWin =
    windows.find((w) => w.id === focusedWindowId) ?? nonMinimized[nonMinimized.length - 1];
  const hideForTerminal = mode === "mobile" && activeWin?.appId === "terminal";

  if (hideForTerminal) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+8px)] z-50 flex items-center justify-center px-4">
      <div className="chrisos-dock pointer-events-auto flex w-full max-w-xl items-center justify-between rounded-2xl border border-white/[0.05] bg-[var(--menu-bar)]/80 px-3 py-2 text-[11px] text-[color:var(--muted)] shadow-[0_12px_35px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        <div className="chrisos-live-chip">
          <span className="chrisos-live-dot" aria-hidden />
          <span className="uppercase tracking-[0.16em] font-semibold">
            LIVE
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
          <span className="h-1 w-1 rounded-full bg-zinc-500/70" />
          <span className="h-1 w-1 rounded-full bg-zinc-500/50" />
          <span className="h-1 w-1 rounded-full bg-zinc-600/40" />
        </div>
        <div className="flex items-center gap-1 tabular-nums text-[11px] text-[var(--foreground)]/80">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-1.5 transition-colors active:bg-white/10"
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {resolvedTheme === "dark" ? (
              <Sun size={14} className="text-amber-400/90" />
            ) : (
              <Moon size={14} className="text-indigo-500/90" />
            )}
          </button>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

