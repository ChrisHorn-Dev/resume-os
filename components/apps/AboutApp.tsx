"use client";

import { aboutBio, capabilities } from "@/content/about";

export default function AboutApp() {
  return (
    <div className="p-4">
      <p className="text-sm leading-relaxed text-zinc-300">{aboutBio}</p>
      <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Capabilities
      </h3>
      <ul className="mt-2 space-y-1.5 text-sm text-zinc-400">
        {capabilities.map((c) => (
          <li key={c} className="flex gap-2">
            <span className="text-[var(--accent)]">·</span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
