"use client";

export default function TerminalApp() {
  return (
    <div className="h-full bg-zinc-950 p-4 font-mono text-sm">
      <div className="space-y-1 text-zinc-400">
        <p>
          <span className="text-emerald-400/90">&gt;</span> whoami
        </p>
        <p className="text-zinc-300 pl-4">
          Chris Horn — product-focused developer
        </p>
      </div>
      <div className="mt-3 space-y-1 text-zinc-400">
        <p>
          <span className="text-emerald-400/90">&gt;</span> skills
        </p>
        <p className="text-zinc-300 pl-4">
          Next.js, TypeScript, PostgreSQL, SaaS architecture
        </p>
      </div>
      <div className="mt-3 space-y-1 text-zinc-400">
        <p>
          <span className="text-emerald-400/90">&gt;</span> projects
        </p>
        <p className="text-zinc-300 pl-4">
          Physician Connection Platform
        </p>
        <p className="text-zinc-300 pl-4">Cape Fear Web Co</p>
        <p className="text-zinc-300 pl-4">Thank You For Dying</p>
      </div>
    </div>
  );
}
