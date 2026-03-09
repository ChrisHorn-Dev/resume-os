"use client";

import { useEffect, useState } from "react";

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

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+8px)] z-50 flex items-center justify-center px-4">
      <div className="pointer-events-auto flex w-full max-w-xl items-center justify-between rounded-2xl border border-white/[0.05] bg-[var(--menu-bar)]/80 px-3 py-2 text-[11px] text-zinc-400 shadow-[0_12px_35px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
          <span className="uppercase tracking-[0.16em] text-emerald-100/90">
            Live
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
          <span className="h-1 w-1 rounded-full bg-zinc-500/70" />
          <span className="h-1 w-1 rounded-full bg-zinc-500/50" />
          <span className="h-1 w-1 rounded-full bg-zinc-600/40" />
        </div>
        <div className="flex items-center gap-1 tabular-nums text-[11px] text-zinc-300">
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

