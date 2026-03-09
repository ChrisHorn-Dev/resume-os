"use client";

export default function WelcomeApp() {
  return (
    <div className="p-5 text-sm">
      <p className="font-medium text-[var(--foreground)]">
        Hi, I&apos;m Chris Horn.
      </p>
      <p className="mt-2 leading-relaxed text-zinc-400">
        Product-focused developer building operational SaaS platforms and
        real-world software systems.
      </p>
      <p className="mt-4 text-zinc-500">
        Use the dock below to explore:
      </p>
      <ul className="mt-1 list-disc pl-5 space-y-0.5 text-zinc-400">
        <li>Projects</li>
        <li>Tech Stack</li>
        <li>Resume</li>
      </ul>
    </div>
  );
}
