"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useWindow } from "@/lib/WindowContext";
import { projects } from "@/content/projects";
import {
  DEEP_DIVE_SECTIONS,
  projectDeepDives,
} from "@/content/projectDeepDives";
import type { ProjectId } from "@/content/projects";

type DeepDiveSectionId =
  | "overview"
  | "architecture"
  | "flow"
  | "code"
  | "decisions"
  | "future";

const FEATURED_PROJECTS: ProjectId[] = [
  "siteos",
  "physician-connection",
  "elite-touch-client-portal",
  "media-auth-api",
  "chrisos",
];

export default function ProjectDeepDiveApp() {
  const win = useWindow();

  const initialProjectId = useMemo(() => {
    const payloadProject = (win?.payload?.projectId as ProjectId | undefined) ?? null;
    if (payloadProject && FEATURED_PROJECTS.includes(payloadProject)) {
      return payloadProject;
    }
    return "media-auth-api" as ProjectId;
  }, [win?.payload?.projectId]);

  const initialSectionId = useMemo(() => {
    const payloadSection = win?.payload?.sectionId as DeepDiveSectionId | undefined;
    return payloadSection ?? "overview";
  }, [win?.payload?.sectionId]);

  const [activeProjectId, setActiveProjectId] = useState<ProjectId>(initialProjectId);
  const [activeSectionId, setActiveSectionId] = useState<DeepDiveSectionId>(initialSectionId);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentKey = `${activeProjectId}-${activeSectionId}`;

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: 0, behavior: "auto" });
  }, [activeProjectId, activeSectionId]);

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? projects[0];
  const deepDive = projectDeepDives[activeProjectId];
  const section = deepDive.sections.find((s) => s.id === activeSectionId);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--surface-elevated)]/90 text-sm text-zinc-200">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]/95 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Engineering Deep Dives
          </p>
          <p className="mt-0.5 max-w-xl text-[12px] text-[color:var(--muted)]">
            System-focused notes for how these projects are structured, how they flow, and why they look the way they do.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {FEATURED_PROJECTS.map((id) => {
            const project = projects.find((p) => p.id === id);
            if (!project) return null;
            const isActive = id === activeProjectId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveProjectId(id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "border-[var(--accent)]/70 bg-[var(--accent)]/20 text-zinc-50"
                    : "border-[var(--border-subtle)] bg-[var(--surface)]/80 text-zinc-300 hover:border-zinc-500/90 hover:bg-white/[0.05]"
                }`}
              >
                <span className="truncate">{project.name}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden w-52 shrink-0 border-r border-[var(--border-subtle)] bg-[var(--surface)]/80 px-3 py-3 md:block">
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Sections
          </p>
          <nav className="space-y-1.5">
            {DEEP_DIVE_SECTIONS.map((s) => {
              const isActive = s.id === activeSectionId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSectionId(s.id as DeepDiveSectionId)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.75 text-left text-[13px] transition-colors ${
                    isActive
                      ? "bg-[var(--accent)]/18 text-zinc-50"
                      : "text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-50"
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-h-0 flex-1 overflow-hidden">
          <div
            key={contentKey}
            ref={scrollRef}
            className="h-full min-h-0 overflow-auto px-4 py-4 md:px-6 md:py-5"
          >
          <div className="mb-4 space-y-1.5">
            <h2 className="text-[15px] font-semibold text-[var(--foreground)]">
              {activeProject.name}
            </h2>
            <p className="text-[12px] text-zinc-400">
              {deepDive.quickSummary}
            </p>
            {section?.summary && (
              <p className="text-[13px] leading-relaxed text-zinc-300">
                {section.summary}
              </p>
            )}
          </div>

          {section && section.blocks.length > 0 ? (
            <div className="space-y-4">
              {section.blocks.map((block, idx) => {
                if (block.type === "text") {
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/80 p-4 leading-relaxed text-zinc-200"
                    >
                      <p>{block.body}</p>
                    </div>
                  );
                }

                if (block.type === "bullet-list") {
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/82 p-4"
                    >
                      <ul className="space-y-1.5 text-[13px] text-zinc-200">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-zinc-400/80" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (block.type === "steps") {
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/82 p-4"
                    >
                      {block.title && (
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                          {block.title}
                        </p>
                      )}
                      <ol className="space-y-1.75 text-[13px] text-zinc-200">
                        {block.items.map((item, stepIndex) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-[1px] h-5 w-5 shrink-0 rounded-full bg-zinc-800 text-center text-[11px] font-medium text-zinc-200">
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
                    <div
                      key={idx}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-b from-[var(--surface)]/90 to-black/80 p-4"
                    >
                      {block.title && (
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                          {block.title}
                        </p>
                      )}
                      <div className="grid gap-3 md:grid-cols-3">
                        {block.nodes.map((node) => (
                          <div
                            key={node.id}
                            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
                          >
                            <p className="text-[13px] font-medium text-zinc-50">
                              {node.label}
                            </p>
                            {node.role && (
                              <p className="mt-1 text-[11px] text-zinc-400">
                                {node.role}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      {block.flows.length > 0 && (
                        <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/40 p-3">
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                            Request path
                          </p>
                          <ul className="space-y-1.25 text-[12px] text-zinc-200">
                            {block.flows.map((flow, i) => (
                              <li key={`${flow.from}-${flow.to}-${i}`}>
                                <span className="font-mono text-[11px] text-zinc-400">
                                  {flow.from} → {flow.to}
                                </span>
                                {flow.label && (
                                  <span className="text-zinc-300"> — {flow.label}</span>
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
                    <div
                      key={idx}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/82 p-4"
                    >
                      {block.title && (
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                          {block.title}
                        </p>
                      )}
                      <div className="grid gap-3 md:grid-cols-2">
                        {block.groups.map((group) => (
                          <div key={group.label} className="rounded-xl bg-black/30 p-3">
                            <p className="text-[12px] font-medium text-zinc-200">
                              {group.label}
                            </p>
                            <ul className="mt-1.5 space-y-1 text-[12px] text-zinc-300">
                              {group.modules.map((mod) => (
                                <li key={mod} className="font-mono text-[11px] text-zinc-400">
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
            <p className="text-[13px] text-zinc-400">
              Deep-dive content for this section is still being curated.
            </p>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}

