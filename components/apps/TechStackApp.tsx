"use client";

import { stackGroups } from "@/content/stack";

export default function TechStackApp() {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {stackGroups.map((group) => (
          <section key={group.name}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
              {group.name}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="chrisos-stack-chip rounded-md border border-[var(--border)] bg-zinc-800/80 px-2.5 py-1 text-sm text-zinc-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
