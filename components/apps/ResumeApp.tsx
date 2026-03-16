"use client";

import { resumeIntro } from "@/content/resume";
import { socialLinks } from "@/content/social";

export default function ResumeApp() {
  return (
    <div className="flex justify-center px-3 py-3 sm:px-4 sm:py-4">
      <div className="w-full max-w-[580px] space-y-6 text-sm text-[color:var(--foreground)]">
        <section className="space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Summary
          </h2>
          <p className="leading-relaxed text-[color:var(--muted)]">{resumeIntro}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Focus Areas
          </h2>
          <ul className="mt-1.5 space-y-1.75 text-[13px] text-[color:var(--foreground)]">
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-[color:var(--muted)]/70" />
              <span>SaaS platforms and workflow software</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-[color:var(--muted)]/70" />
              <span>API architecture, verification flows, and backend services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-[color:var(--muted)]/70" />
              <span>Role-based dashboards and internal tools</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-[color:var(--muted)]/70" />
              <span>Full-stack product development and modern frontend UX</span>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Key Projects
          </h2>
          <ul className="mt-1.5 space-y-1.75 text-[13px] text-[color:var(--muted)]">
            <li className="flex flex-col gap-0.5">
              <span className="font-medium text-[color:var(--foreground)]">
                Physician Connection Platform
              </span>
              <span>
                Production SaaS platform coordinating appointment workflows between pharmaceutical reps and physician practices.
              </span>
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="font-medium text-[color:var(--foreground)]">
                Media Authenticity API
              </span>
              <span>
                Verification-oriented API that analyzes images for likely synthetic vs authentic and returns signed results with a verification endpoint.
              </span>
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="font-medium text-[color:var(--foreground)]">
                ChrisOS
              </span>
              <span>
                OS-inspired, desktop-style portfolio shell with a window manager, guided terminal, and mobile shell for exploring projects and experience in the browser.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Availability
          </h2>
          <div className="space-y-3 text-[13px] text-[color:var(--muted)]">
            <p className="text-[color:var(--foreground)]/75">
              For a full timeline, additional context, and current availability, connect with me here:
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="chrisos-inline-cta inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[12px] text-[var(--foreground)] underline-offset-4 transition-colors hover:bg-white/[0.05] hover:underline"
              >
                View LinkedIn profile →
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/[0.06] bg-transparent px-3 py-1.5 text-[12px] text-[color:var(--muted)] underline-offset-4 transition-colors hover:bg-white/[0.04] hover:text-[var(--foreground)] hover:underline"
              >
                View GitHub →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
