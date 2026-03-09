"use client";

import { useState, useRef, useEffect } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getCenterPosition } from "@/lib/apps";

type Line = { type: "input" | "output"; text: string; cmd?: string };

const PROMPT = "> ";

const HELP_OUTPUT = `Available commands:
  help        — show this help
  projects    — overview of major projects
  physician   — Physician Connection Platform case study
  cape-fear   — Cape Fear Web Co overview
  chrisos     — ChrisOS interface overview
  architecture— high-level system architecture
  stack       — tech stack summary
  build-log   — notes on building ChrisOS
  resume      — open resume window
  techstack   — open tech stack window
  contact     — open contact window
  about       — open about window
  clear       — clear terminal`;

function parseCommand(input: string): string {
  return input.trim().toLowerCase();
}

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { type: "input", text: "whoami" },
    {
      type: "output",
      text: "Chris Horn — product-focused developer",
    },
    { type: "input", text: "help" },
    { type: "output", text: HELP_OUTPUT, cmd: "help" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { openApp } = useWindowStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = parseCommand(raw);
    const out: Line[] = [{ type: "input", text: raw }];

    if (cmd === "help") {
      out.push({ type: "output", text: HELP_OUTPUT, cmd: "help" });
    } else if (cmd === "projects") {
      out.push({
        type: "output",
        cmd: "projects",
        text: `Projects:

- Physician Connection Platform — operational SaaS for coordinating pharmaceutical reps, practices, and administrators.
- Cape Fear Web Co — high-performance marketing site for my web studio serving small and mid-sized businesses.
- ChrisOS — experimental OS-style portfolio that treats projects and experience as applications.`,
      });
    } else if (cmd === "physician") {
      out.push({
        type: "output",
        cmd: "physician",
        text: `Physician Connection Platform
---
Operational SaaS platform managing pharmaceutical rep access to healthcare practices.

- Multi-role dashboards for reps, practice staff, and admins
- Centralized appointment workflows and access rules
- Internal error logging and resolution flows
- Super-admin views for system health and operations

Focus: taking an unstable MVP toward launch-ready, refining workflows, and hardening the system.`,
      });
    } else if (cmd === "cape-fear") {
      out.push({
        type: "output",
        cmd: "cape-fear",
        text: `Cape Fear Web Co
---
Marketing site for my web design and development studio.

- Fast, SEO-friendly pages tuned for small/mid-sized businesses
- Clear service framing and trust-building content
- Component-driven frontend used to accelerate new client builds

Focus: modern, affordable web presence for businesses that outgrew template builders.`,
      });
    } else if (cmd === "chrisos") {
      out.push({
        type: "output",
        cmd: "chrisos",
        text: `ChrisOS
---
Experimental portfolio that behaves like an operating system.

- Desktop and mobile shells with windows, dock, and launcher
- Projects, resume, and tech stack as first-class “apps”
- Focus on interaction design, hierarchy, and product storytelling

Goal: make a portfolio feel like software, not a static site.`,
      });
    } else if (cmd === "architecture") {
      out.push({
        type: "output",
        cmd: "architecture",
        text: `Architecture
---
- Frontend: Next.js (App Router) + React + TypeScript
- Styling: Tailwind + custom glassmorphism tokens
- Data layer (for client work): PostgreSQL + Drizzle ORM
- Testing: Vitest + Playwright for critical flows
- Deployment: Vercel

Bias toward simple, explicit service boundaries and clear ownership of responsibilities per layer.`,
      });
    } else if (cmd === "stack") {
      out.push({
        type: "output",
        cmd: "stack",
        text: `Tech Stack
---
Frontend: Next.js, React, TypeScript, Tailwind
Backend: Node, PostgreSQL, Drizzle ORM
Testing: Vitest, Playwright
Infra: Vercel + lightweight cloud services per project

Comfortable moving between product, backend architecture, and frontend implementation.`,
      });
    } else if (cmd === "build-log") {
      out.push({
        type: "output",
        cmd: "build-log",
        text: `Build Log — ChrisOS
---
- I wanted a portfolio that behaves more like a small operating system.
- Windows, dock, and launcher emphasize “apps” instead of static sections.
- Desktop and mobile share the same concepts, adapted by viewport.
- The focus is on product storytelling: each project is a system, not just a screenshot.
- The terminal and project demos are used as narrative tools, not gimmicks.`,
      });
    } else if (cmd === "projects") {
      openApp("projects", getCenterPosition("projects"));
      out.push({
        type: "output",
        text: "Opening Projects window…",
        cmd: "projects-open",
      });
    } else if (cmd === "resume") {
      openApp("resume");
      out.push({ type: "output", text: "Opening Resume...", cmd: "resume" });
    } else if (cmd === "techstack") {
      openApp("techstack");
      out.push({
        type: "output",
        text: "Opening Tech Stack…",
        cmd: "techstack-open",
      });
    } else if (cmd === "contact") {
      openApp("contact");
      out.push({
        type: "output",
        text: "Opening Contact...",
        cmd: "contact",
      });
    } else if (cmd === "about") {
      openApp("about", getCenterPosition("about"));
      out.push({
        type: "output",
        text: "Opening About...",
        cmd: "about",
      });
    } else if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    } else if (cmd) {
      out.push({
        type: "output",
        text: `Unknown command: ${raw}. Type 'help' for available commands.`,
      });
    }

    setLines((prev) => [...prev, ...out]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0d0d0f] font-mono text-[13px]">
      <div className="min-h-0 flex-1 overflow-auto p-4">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            {line.type === "input" ? (
              <p className="text-zinc-400">
                <span className="text-emerald-400/90">{PROMPT}</span>
                {line.text}
              </p>
            ) : (
              <p
                className="whitespace-pre-wrap pl-4 text-zinc-300"
                style={{ wordBreak: "break-word" }}
              >
                {line.text}
              </p>
            )}
          </div>
        ))}
        <div className="flex items-center gap-0" ref={bottomRef}>
          <span className="text-emerald-400/90">{PROMPT}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-[120px] flex-1 border-none bg-transparent pl-0 text-zinc-300 outline-none placeholder:text-zinc-600"
            placeholder="Type a command..."
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
