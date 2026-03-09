"use client";

import { projects } from "@/content/projects";
import { ExternalLink } from "lucide-react";

function StatusPill({
  label,
  variant,
}: {
  label: string;
  variant: "case-study" | "live" | "private";
}) {
  const styles = {
    "case-study":
      "bg-amber-500/15 text-amber-400/90 border-amber-500/25",
    live: "bg-emerald-500/15 text-emerald-400/90 border-emerald-500/25",
    private: "bg-zinc-700/60 text-zinc-400 border-[var(--border)]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

export default function ProjectsApp() {
  return (
    <div className="p-4">
      <ul className="space-y-3">
        {projects.map((p) => (
          <li
            key={p.id}
            className={`group rounded-xl border bg-[var(--surface-elevated)] p-4 transition-all duration-200 hover:border-zinc-600 hover:shadow-md ${
              p.featured
                ? "border-[var(--border)] shadow-sm ring-1 ring-[var(--accent)]/10"
                : "border-[var(--border-subtle)]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-[var(--foreground)]">
                  {p.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                  {p.description}
                </p>
              </div>
              <StatusPill
                label={
                  p.label === "case-study"
                    ? "Case Study"
                    : p.label === "live"
                      ? "Live"
                      : "Private"
                }
                variant={p.label}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[11px] text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.label === "live" && p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
                >
                  <ExternalLink size={12} />
                  Live Demo
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
