"use client";

import { socialLinks } from "@/content/social";

export default function MobileIdentityModule() {
  return (
    <section
      aria-label="Developer identity"
      className="mt-6 flex items-center justify-center pb-2"
    >
      <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-black/4 px-4 py-3 text-center text-[11px] text-zinc-400 backdrop-blur-xl shadow-[0_3px_14px_rgba(0,0,0,0.35)]">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-black/60 shadow-[0_5px_18px_rgba(0,0,0,0.55)] sm:h-20 sm:w-20">
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
          className="text-[11px] text-zinc-300 underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:underline"
        >
          View LinkedIn →
        </a>
      </div>
    </section>
  );
}

