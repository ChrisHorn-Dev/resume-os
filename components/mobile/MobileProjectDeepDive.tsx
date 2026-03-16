"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WindowState } from "@/lib/types";
import { useWindow } from "@/lib/WindowContext";
import { projects } from "@/content/projects";
import {
  DEEP_DIVE_SECTIONS,
  projectDeepDives,
} from "@/content/projectDeepDives";
import type { ProjectId } from "@/content/projects";

const FEATURED_PROJECTS: ProjectId[] = [
  "media-auth-api",
  "physician-connection",
  "chrisos",
];

export default function MobileProjectDeepDive() {
  const win = useWindow() as WindowState | null;

  const initialProjectId = useMemo(() => {
    const payloadProject = (win?.payload?.projectId as ProjectId | undefined) ?? null;
    if (payloadProject && FEATURED_PROJECTS.includes(payloadProject)) {
      return payloadProject;
    }
    return "media-auth-api" as ProjectId;
  }, [win?.payload?.projectId]);

  const [activeProjectId, setActiveProjectId] = useState<ProjectId>(initialProjectId);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentKey = activeProjectId;

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: 0, behavior: "auto" });
  }, [activeProjectId]);

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? projects[0];
  const deepDive = projectDeepDives[activeProjectId];

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--surface-elevated)]/95 text-[13px] text-zinc-200">
      <header className="space-y-2 border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]/95 px-3 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Engineering Deep Dives
        </p>
        <div className="space-y-1">
          <p className="text-[13px] font-medium text-[var(--foreground)]">
            {activeProject.name}
          </p>
          <p className="text-[11px] text-[color:var(--muted)]">
            {deepDive.quickSummary}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {FEATURED_PROJECTS.map((id) => {
            const project = projects.find((p) => p.id === id);
            if (!project) return null;
            const isActive = id === activeProjectId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveProjectId(id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "border-[var(--accent)]/70 bg-[var(--accent)]/22 text-zinc-50"
                    : "border-[var(--border-subtle)] bg-[var(--surface)]/80 text-zinc-300 hover:border-zinc-500/90 hover:bg-white/[0.05]"
                }`}
              >
                <span className="truncate">{project.name}</span>
              </button>
            );
          })}
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-hidden">
        <div
          key={contentKey}
          ref={scrollRef}
          className="h-full min-h-0 overflow-auto px-3 py-3 space-y-3"
        >
          {DEEP_DIVE_SECTIONS.map((meta) => {
            const section = deepDive.sections.find((s) => s.id === meta.id);
            return (
              <section
                key={meta.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/88 px-3.5 py-3.5"
              >
                <header className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      {meta.label}
                    </p>
                    {section?.summary && (
                      <p className="mt-1 text-[11px] leading-relaxed text-zinc-300">
                        {section.summary}
                      </p>
                    )}
                  </div>
                </header>

                {section && section.blocks.length > 0 ? (
                  <div className="mt-2.5 space-y-3">
                    {section.blocks.map((block, idx) => {
                      if (block.type === "text") {
                        return (
                          <p
                            key={idx}
                            className="text-[12px] leading-relaxed text-zinc-200"
                          >
                            {block.body}
                          </p>
                        );
                      }

                      if (block.type === "bullet-list") {
                        return (
                          <ul
                            key={idx}
                            className="space-y-1.5 text-[12px] leading-relaxed text-zinc-200"
                          >
                            {block.items.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-zinc-400/85" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      if (block.type === "steps") {
                        return (
                          <div key={idx} className="space-y-2">
                            {block.title && (
                              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                                {block.title}
                              </p>
                            )}
                            <ol className="space-y-1.5 text-[12px] text-zinc-200">
                              {block.items.map((item, stepIndex) => (
                                <li key={item} className="flex items-start gap-2">
                                  <span className="mt-[1px] h-5 w-5 shrink-0 rounded-full bg-zinc-800 text-center text-[10px] font-medium text-zinc-200">
                                    {stepIndex + 1}
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        );
                      }

                      if (block.type === "architecture-diagram") {
                        return (
                          <div key={idx} className="space-y-2.5">
                            {block.title && (
                              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                                {block.title}
                              </p>
                            )}
                            <div className="space-y-1.5">
                              {block.nodes.map((node) => (
                                <div
                                  key={node.id}
                                  className="rounded-xl border border-white/[0.09] bg-black/35 px-3 py-2.5"
                                >
                                  <p className="text-[12px] font-medium text-zinc-50">
                                    {node.label}
                                  </p>
                                  {node.role && (
                                    <p className="mt-0.5 text-[11px] text-zinc-400">
                                      {node.role}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                            {block.flows.length > 0 && (
                              <div className="rounded-xl border border-white/[0.08] bg-black/45 px-3 py-2.5">
                                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                  Flow
                                </p>
                                <ul className="space-y-1 text-[11px] text-zinc-200">
                                  {block.flows.map((flow, i) => (
                                    <li key={`${flow.from}-${flow.to}-${i}`}>
                                      <span className="font-mono text-[10px] text-zinc-400">
                                        {flow.from} → {flow.to}
                                      </span>
                                      {flow.label && (
                                        <span className="text-zinc-200">
                                          {" "}
                                          — {flow.label}
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (block.type === "module-map") {
                        return (
                          <div key={idx} className="space-y-2">
                            {block.title && (
                              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                                {block.title}
                              </p>
                            )}
                            <div className="space-y-2">
                              {block.groups.map((group) => (
                                <div
                                  key={group.label}
                                  className="rounded-xl bg-black/35 px-3 py-2.5"
                                >
                                  <p className="text-[12px] font-medium text-zinc-200">
                                    {group.label}
                                  </p>
                                  <ul className="mt-1.5 space-y-0.75 text-[11px] text-zinc-300">
                                    {group.modules.map((mod) => (
                                      <li
                                        key={mod}
                                        className="font-mono text-[10px] text-zinc-400"
                                      >
                                        {mod}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                ) : (
                  <p className="mt-2 text-[11px] text-zinc-400">
                    Deep-dive content for this section is still being curated.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

