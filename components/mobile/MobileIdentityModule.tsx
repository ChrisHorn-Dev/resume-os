"use client";

import { socialLinks } from "@/content/social";

export default function MobileIdentityModule() {
  return (
    <section
      aria-label="Developer identity"
      className="flex justify-center pb-3 sm:pb-4"
    >
      <div
        className="chrisos-identity-card flex w-full max-w-md flex-col items-center rounded-2xl bg-black/4 text-center text-[11px] text-zinc-400 backdrop-blur-xl shadow-[0_3px_14px_rgba(0,0,0,0.35)] sm:max-w-lg"
        style={{
          maxWidth: "var(--mobile-home-card-max-width)",
          paddingBlock: "var(--mobile-home-card-padding-y)",
          paddingInline: "var(--mobile-home-card-padding-x)",
          gap: "var(--mobile-home-card-gap)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-full border border-white/10 bg-black/60 shadow-[0_5px_18px_rgba(0,0,0,0.55)]"
          style={{
            width: "var(--mobile-home-avatar-size)",
            height: "var(--mobile-home-avatar-size)",
          }}
        >
          <img
            src="/avatar-chris-bw.jpg"
            alt="Chris Horn"
            className="h-full w-full object-cover grayscale"
          />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[12px] font-medium text-[var(--foreground)]">
            Chris Horn
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            Product-Focused
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            Software Engineer
          </span>
        </div>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="chrisos-identity-cta text-[11px] text-zinc-300 underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:underline"
        >
          View LinkedIn →
        </a>
      </div>
    </section>
  );
}

