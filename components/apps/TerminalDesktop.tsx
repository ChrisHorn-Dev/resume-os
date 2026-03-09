"use client";

import { useState, useRef, useEffect } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getCenterPosition } from "@/lib/apps";
import { useProjectsEntryStore } from "@/lib/projectsEntryStore";
import {
  parseCommand,
  getCommandDef,
  HELP_OUTPUT_TEXT,
  type TerminalAction,
} from "@/lib/terminalCommands";

type Line = {
  type: "input" | "output";
  text: string;
  actions?: TerminalAction[];
};

const PROMPT = "> ";

const INITIAL_LINES: Line[] = [
  { type: "input", text: "whoami" },
  { type: "output", text: "Chris Horn — product-focused developer" },
  { type: "input", text: "help" },
  { type: "output", text: HELP_OUTPUT_TEXT },
];

export default function TerminalDesktop() {
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { openApp } = useWindowStore();
  const setInitialProjectId = useProjectsEntryStore((s) => s.setInitialProjectId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleAction = (action: TerminalAction) => {
    if (action.appId === "projects" && action.projectId) {
      setInitialProjectId(action.projectId);
    }
    const pos =
      action.appId === "projects" || action.appId === "about"
        ? getCenterPosition(action.appId)
        : undefined;
    const payload =
      action.appId === "projects" && action.projectId
        ? { projectId: action.projectId }
        : undefined;
    openApp(action.appId, { position: pos, payload });
  };

  const runCommand = (raw: string) => {
    const cmd = parseCommand(raw);
    if (!cmd) return;

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (cmd === "whoami") {
      setLines((prev) => [
        ...prev,
        { type: "input", text: raw },
        { type: "output", text: "Chris Horn — product-focused developer" },
      ]);
      setInput("");
      return;
    }

    const def = getCommandDef(cmd);
    if (!def) {
      setLines((prev) => [
        ...prev,
        { type: "input", text: raw },
        { type: "output", text: `Unknown command: ${raw}. Type 'help' for available commands.` },
      ]);
      setInput("");
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: "input", text: raw },
      { type: "output", text: def.output, actions: def.actions },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0d0d0f] font-mono text-[13px]">
      <div className="min-h-0 flex-1 overflow-auto px-4 py-3">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            {line.type === "input" ? (
              <p className="text-zinc-400">
                <span className="text-emerald-400/90">{PROMPT}</span>
                {line.text}
              </p>
            ) : (
              <>
                <p
                  className="whitespace-pre-wrap pl-4 text-zinc-300"
                  style={{ wordBreak: "break-word" }}
                >
                  {line.text}
                </p>
                {line.actions && line.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-4">
                    {line.actions.map((action, j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() => handleAction(action)}
                        className="rounded border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-emerald-500/40 hover:bg-white/[0.1] hover:text-zinc-100"
                        aria-label={action.label}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex shrink-0 items-center gap-1 border-t border-white/[0.06] px-4 py-2">
        <span className="shrink-0 text-emerald-400/90">{PROMPT}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 border-none bg-transparent pl-0 text-zinc-300 outline-none placeholder:text-zinc-600"
          placeholder="Type a command..."
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
        <button
          type="button"
          onClick={() => runCommand(input)}
          className="shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.06] px-2.5 py-1.5 font-medium text-zinc-300 transition-colors hover:border-emerald-500/40 hover:bg-white/[0.1] hover:text-emerald-200/90 active:scale-[0.98]"
          aria-label="Run command"
        >
          Run
        </button>
      </div>
    </div>
  );
}
