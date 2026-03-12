"use client";

import { useWindowStore } from "@/lib/windowStore";
import { getCenterPosition } from "@/lib/apps";

export default function WelcomeApp() {
  const { openApp } = useWindowStore();

  const handleOpenProjects = () => {
    openApp("projects", { position: getCenterPosition("projects") });
  };

  const handleOpenResume = () => {
    openApp("resume");
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Chris Horn
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[color:var(--muted)]">
        Product-focused developer building operational SaaS platforms and
        real-world software systems.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleOpenProjects}
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-out hover:bg-[var(--accent-hover)] hover:shadow-md active:scale-[0.98]"
        >
          View Projects
        </button>
        <button
          type="button"
          onClick={handleOpenResume}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/80 px-5 py-2.5 text-sm font-medium text-[var(--foreground)] backdrop-blur-sm transition-all duration-200 ease-out hover:border-zinc-500 hover:bg-white/[0.06] active:scale-[0.98]"
        >
          Open Resume
        </button>
      </div>
      <p className="mt-8 text-xs text-[color:var(--muted)]">
        Use the dock or desktop icons to open Tech Stack, About, and more.
      </p>
    </div>
  );
}
