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
            className={`rounded-lg border border-[var(--border)] bg-zinc-900/50 p-3 ${p.featured ? "ring-1 ring-[var(--accent)]/30" : ""}`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-[var(--foreground)]">{p.name}</h3>
              {p.label === "live" && p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[var(--accent)] hover:underline"
                  aria-label={`Open ${p.name}`}
                >
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="shrink-0 rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-400">
                  {p.label === "case-study" ? "Case study" : "Private"}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              {p.description}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {p.tech.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
