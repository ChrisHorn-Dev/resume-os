"use client";

import { projects } from "@/content/projects";
import { ExternalLink } from "lucide-react";

export default function ProjectsApp() {
  return (
    <div className="p-4">
      <ul className="space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="rounded-xl border border-[var(--border)] bg-zinc-900/40 p-4 shadow-sm"
          >
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              {p.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {p.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[var(--border)] bg-zinc-800/80 px-2 py-1 text-xs text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.label === "case-study" && (
                <span className="inline-flex items-center rounded-md bg-zinc-700/80 px-3 py-1.5 text-xs font-medium text-zinc-300">
                  Case Study
                </span>
              )}
              {p.label === "live" && p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)]/20 px-3 py-1.5 text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent)]/30"
                >
                  <ExternalLink size={12} />
                  Live Demo
                </a>
              )}
              {p.label === "private" && (
                <span className="inline-flex items-center rounded-md bg-zinc-700/80 px-3 py-1.5 text-xs font-medium text-zinc-400">
                  Private
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
