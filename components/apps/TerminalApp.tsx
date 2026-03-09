"use client";

import { useState, useRef, useEffect } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getCenterPosition } from "@/lib/apps";

type Line = { type: "input" | "output"; text: string; cmd?: string };

const PROMPT = "> ";

const HELP_OUTPUT = `Available commands:
  projects  — open projects window
  resume    — open resume window
  stack     — open tech stack window
  about     — open about window
  contact   — open contact window
  clear     — clear terminal`;

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
      openApp("projects", getCenterPosition("projects"));
      out.push({
        type: "output",
        text: "Opening Projects...",
        cmd: "projects",
      });
    } else if (cmd === "resume") {
      openApp("resume");
      out.push({ type: "output", text: "Opening Resume...", cmd: "resume" });
    } else if (cmd === "stack") {
      openApp("techstack");
      out.push({
        type: "output",
        text: "Opening Tech Stack...",
        cmd: "stack",
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
