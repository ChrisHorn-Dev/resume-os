"use client";

import { useState, useEffect } from "react";

function PhysicianDemo() {
  const [view, setView] = useState<"overview" | "appointments" | "practices" | "admin">("overview");

  const chipClass = (id: typeof view) =>
    `inline-flex items-center justify-center rounded-full px-2.5 py-1.25 text-[11px] transition-colors ${
      view === id
        ? "bg-white/[0.12] text-zinc-50"
        : "bg-white/[0.04] text-zinc-400 hover:bg-white/[0.07] hover:text-zinc-100"
    }`;

  return (
    <div className="space-y-3 text-[12px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Physician Connection
        </p>
        <p className="mt-0.5 text-[12px] text-zinc-300">
          Representative product interface for scheduling, practice access, and admin workflows.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => setView("overview")}
          className={chipClass("overview")}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setView("appointments")}
          className={chipClass("appointments")}
        >
          Appointments
        </button>
        <button
          type="button"
          onClick={() => setView("practices")}
          className={chipClass("practices")}
        >
          Practices
        </button>
        <button type="button" onClick={() => setView("admin")} className={chipClass("admin")}>
          Admin
        </button>
      </div>

      {view === "overview" && (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[11px] text-zinc-400">Today&apos;s visits</p>
              <p className="text-[20px] font-semibold text-zinc-50">8</p>
            </div>
            <p className="mt-1 text-[11px] text-emerald-300/90">+3 vs last week</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[11px] text-zinc-400">Pending approvals</p>
              <p className="text-[20px] font-semibold text-zinc-50">12</p>
            </div>
            <p className="mt-1 text-[11px] text-amber-300/90">Requires practice review</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[11px] text-zinc-400">Practices online</p>
              <p className="text-[20px] font-semibold text-zinc-50">34</p>
            </div>
            <p className="mt-1 text-[11px] text-zinc-400">Across 3 markets</p>
          </div>
        </div>
      )}

      {view === "appointments" && (
        <div className="space-y-1.5">
          {[
            {
              practice: "Harbor View Cardiology",
              rep: "J. Miller",
              time: "Today · 2:30 PM",
              status: "Confirmed",
            },
            {
              practice: "Cape Primary Care",
              rep: "S. Patel",
              time: "Today · 4:00 PM",
              status: "Pending practice",
            },
            {
              practice: "Coastal Oncology Group",
              rep: "L. Nguyen",
              time: "Tomorrow · 9:15 AM",
              status: "Awaiting rep",
            },
          ].map((appt) => (
            <div
              key={appt.practice}
              className="rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[13px] text-zinc-100">{appt.practice}</p>
                <span className="whitespace-nowrap rounded-full border border-emerald-500/40 bg-emerald-500/8 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  {appt.status}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11px] text-zinc-400">
                Rep {appt.rep} · {appt.time}
              </p>
            </div>
          ))}
        </div>
      )}

      {view === "practices" && (
        <div className="space-y-1.5">
          {[
            { name: "Harbor View Cardiology", city: "Wilmington, NC", access: "Standard access" },
            { name: "Cape Primary Care", city: "Wilmington, NC", access: "Limited access" },
            { name: "Coastal Oncology Group", city: "Raleigh, NC", access: "High-sensitivity rules" },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] text-zinc-100">{p.name}</p>
                <p className="text-[11px] text-zinc-400">{p.city}</p>
              </div>
              <span className="whitespace-nowrap text-[11px] text-zinc-300">{p.access}</span>
            </div>
          ))}
        </div>
      )}

      {view === "admin" && (
        <div className="space-y-1.5">
          <div className="rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400">
              System status
            </p>
            <p className="mt-1 text-[13px] text-emerald-300">Healthy · No active incidents</p>
            <p className="mt-1 text-[11px] text-zinc-400">
              Last deployment: 2 hours ago · Region: us-east-1
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400">
              Recent events
            </p>
            <ul className="mt-1.5 space-y-0.5 text-[11px] text-zinc-300">
              <li>• 3 new practices onboarded this week</li>
              <li>• 12 appointment rules updated by admins</li>
              <li>• Error rate under 0.2% over last 24h</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
import { projects } from "@/content/projects";
import { ChevronLeft } from "lucide-react";
import { useWindow } from "@/lib/WindowContext";
import { useProjectsEntryStore } from "@/lib/projectsEntryStore";

function StatusPill({
  label,
  variant,
}: {
  label: string;
  variant: "case-study" | "live" | "private" | "interface";
}) {
  const styles = {
    "case-study":
      "bg-amber-500/15 text-amber-400/90 border-amber-500/25",
    live: "bg-emerald-500/15 text-emerald-400/90 border-emerald-500/25",
    private: "chrisos-pill-private bg-zinc-700/60 text-zinc-400 border-[var(--border)]",
    interface:
      "bg-sky-500/15 text-sky-300/90 border-sky-500/30",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.16em] ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

export default function ProjectsApp() {
  const curatedOrder = ["physician-connection", "cape-fear-web", "chrisos"] as const;
  const curated = projects
    .filter((p) => curatedOrder.includes(p.id as (typeof curatedOrder)[number]))
    .sort(
      (a, b) =>
        curatedOrder.indexOf(a.id as (typeof curatedOrder)[number]) -
        curatedOrder.indexOf(b.id as (typeof curatedOrder)[number]),
    );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = curated.find((p) => p.id === selectedId) ?? null;

  const win = useWindow();
  const initialProjectIdFromStore = useProjectsEntryStore((s) => s.initialProjectId);
  const setInitialProjectId = useProjectsEntryStore((s) => s.setInitialProjectId);

  useEffect(() => {
    const initialId =
      (win?.payload?.projectId as string | undefined) ?? initialProjectIdFromStore ?? null;
    if (initialId && curated.some((p) => p.id === initialId)) {
      setSelectedId(initialId);
      setInitialProjectId(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- only run when entry point changes
  }, [win?.payload?.projectId, initialProjectIdFromStore]);

  if (selected && selected.details) {
    return (
      <div className="p-4">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="chrisos-back-pill inline-flex items-center gap-1.5 rounded-full bg-white/[0.02] px-2.5 py-1 text-[11px] text-zinc-300 underline-offset-4 transition hover:bg-white/[0.05] hover:text-[var(--foreground)] hover:underline"
        >
          <ChevronLeft size={14} />
          <span>Back to projects</span>
        </button>
        <section className="chrisos-project-detail mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/95 p-4 text-sm text-zinc-200 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[var(--foreground)]">
                {selected.name}
              </h3>
            </div>
            <StatusPill
              label={
                selected.label === "case-study"
                  ? "Case Study"
                  : selected.label === "live"
                    ? "Live"
                    : selected.label === "interface"
                      ? "Interface"
                      : "Private"
              }
              variant={selected.label}
            />
          </div>
          <div className="mt-3 space-y-4">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Overview
              </h4>
              <p className="mt-1.5 leading-relaxed text-zinc-300">
                {selected.details.overview}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Problem
                </h4>
                <p className="mt-1.5 leading-relaxed text-zinc-300">
                  {selected.details.problem}
                </p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Solution
                </h4>
                <p className="mt-1.5 leading-relaxed text-zinc-300">
                  {selected.details.solution}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Architecture
              </h4>
              <p className="mt-1.5 leading-relaxed text-zinc-300">
                {selected.details.architecture}
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Key Features
              </h4>
              <ul className="mt-1.5 space-y-1.25 text-[13px] text-zinc-200">
                {selected.details.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-zinc-400/80" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Tech Stack
              </h4>
              <p className="mt-1.5 text-[13px] text-zinc-300">
                {selected.tech.join(" · ")}
              </p>
            </div>
            {selected.details.links && selected.details.links.length > 0 && (
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Links
                </h4>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {selected.details.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chrisos-link-pill inline-flex items-center rounded-full border border-[var(--border)]/80 bg-transparent px-3 py-1.5 text-[12px] text-zinc-200 underline-offset-4 transition hover:border-[var(--accent)]/60 hover:bg-white/[0.04] hover:text-[var(--accent)] hover:underline"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {selected.id === "physician-connection" && (
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Platform Preview
                </h4>
                <div className="mt-1.5 rounded-xl border border-white/[0.06] bg-[rgba(20,20,24,0.85)] p-3.5">
                  <PhysicianDemo />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-3.5">
        <h2 className="text-[13px] font-semibold tracking-tight text-[var(--foreground)]">
          Projects
        </h2>
        <p className="mt-1 text-[11px] text-[color:var(--muted)]">
          Selected systems and products I&apos;ve built.
        </p>
      </div>
      <ul className="space-y-3.5">
        {curated.map((p) => (
          <li
            key={p.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedId(p.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedId(p.id);
              }
            }}
            className={`chrisos-project-card group cursor-pointer rounded-xl border bg-[var(--surface-elevated)]/90 p-4 transition-all duration-200 hover:border-zinc-600 hover:bg-[var(--surface-elevated)]/95 hover:shadow-[0_18px_45px_rgba(0,0,0,0.55)] ${
              p.featured
                ? "border-[var(--border)] shadow-[0_14px_40px_rgba(0,0,0,0.55)] ring-1 ring-[var(--accent)]/12"
                : "border-[var(--border-subtle)] shadow-[0_10px_32px_rgba(0,0,0,0.45)]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-[var(--foreground)]">
                  {p.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[color:var(--muted)]">
                  {p.description}
                </p>
              </div>
              <StatusPill
                label={
                  p.label === "case-study"
                    ? "Case Study"
                    : p.label === "live"
                      ? "Live"
                      : p.label === "interface"
                        ? "Interface"
                        : "Private"
                }
                variant={p.label}
              />
            </div>
            <div className="mt-3.5 flex flex-wrap gap-x-2 gap-y-1.5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="chrisos-tech-tag rounded-md bg-zinc-800/70 px-2.5 py-0.5 text-[11px] text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <span className="chrisos-view-details text-[11px] text-zinc-500 transition-colors group-hover:text-zinc-300">
                View details →
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
