"use client";

import { resumeIntro } from "@/content/resume";

export default function ResumeApp() {
  return (
    <div className="flex justify-center px-3 py-3 sm:px-4 sm:py-4">
      <div className="w-full max-w-[580px] text-sm text-zinc-200">
        <section className="space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Summary
          </h2>
          <p className="leading-relaxed text-zinc-300">{resumeIntro}</p>
        </section>

        <section className="mt-6 space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Focus Areas
          </h2>
          <ul className="mt-1.5 space-y-1.75 text-[13px] text-zinc-200">
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-zinc-400/80" />
              <span>SaaS-style web applications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-zinc-400/80" />
              <span>Role-based dashboards and internal tools</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-zinc-400/80" />
              <span>Automation, workflows, and integrations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-zinc-400/80" />
              <span>Modern frontend development and UX</span>
            </li>
          </ul>
        </section>

        <section className="mt-6 space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Availability
          </h2>
          <div className="text-[13px] text-zinc-300">
            <span className="text-zinc-400">Full resume and project timeline:</span>{" "}
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[12px] text-zinc-200 underline-offset-4 transition-colors hover:bg-white/[0.05] hover:underline"
            >
              Request full resume →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
