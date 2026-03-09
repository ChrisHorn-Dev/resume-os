"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useWindowStore } from "@/lib/windowStore";
import { getCenterPosition } from "@/lib/apps";
import { useProjectsEntryStore } from "@/lib/projectsEntryStore";
import {
  getCommandDef,
  HELP_OUTPUT_TEXT,
  TAPPABLE_COMMAND_IDS,
  type TerminalAction,
} from "@/lib/terminalCommands";

const PROMPT = "> ";

const CHAR_MS = 26;
const PAUSE_BEFORE_OUTPUT_MS = 150;
const LINE_REVEAL_MS = 80;
const ACTIONS_DELAY_MS = 120;

type HistoryEntry = {
  command: string;
  output: string;
  actions?: TerminalAction[];
};

const INITIAL_HISTORY: HistoryEntry[] = [
  { command: "whoami", output: "Chris Horn — product-focused developer" },
  { command: "help", output: HELP_OUTPUT_TEXT },
];

function splitOutputLines(output: string): string[] {
  return output.split("\n");
}

export default function TerminalMobile() {
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [lastCommand, setLastCommand] = useState<string | null>("help");
  const [phase, setPhase] = useState<"idle" | "typing" | "revealing">("idle");
  const [typingCommand, setTypingCommand] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [revealCommand, setRevealCommand] = useState("");
  const [revealLines, setRevealLines] = useState<string[]>([]);
  const [revealIndex, setRevealIndex] = useState(0);
  const [revealActions, setRevealActions] = useState<TerminalAction[] | null>(null);
  const [actionsVisible, setActionsVisible] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { openApp } = useWindowStore();
  const setInitialProjectId = useProjectsEntryStore((s) => s.setInitialProjectId);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, phase, typingIndex, revealIndex, actionsVisible, scrollToBottom]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

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

  const startCommand = useCallback(
    (cmd: string) => {
      clearTimers();

      if (cmd === "clear") {
        setHistory(INITIAL_HISTORY);
        setLastCommand("help");
        setPhase("idle");
        setTypingCommand("");
        setTypingIndex(0);
        setRevealCommand("");
        setRevealLines([]);
        setRevealIndex(0);
        setRevealActions(null);
        setActionsVisible(false);
        return;
      }

      if (cmd === "whoami") {
        const output = "Chris Horn — product-focused developer";
        setTypingCommand("whoami");
        setTypingIndex(0);
        setPhase("typing");
        const len = "whoami".length;
        let i = 0;
        const tick = () => {
          i++;
          setTypingIndex(i);
          if (i < len) {
            const t = setTimeout(tick, CHAR_MS);
            timersRef.current.push(t);
          } else {
            timersRef.current.push(
              setTimeout(() => {
                setPhase("revealing");
                setRevealCommand("whoami");
                setRevealLines([output]);
                setRevealIndex(0);
                setRevealActions(null);
                setActionsVisible(false);
                timersRef.current.push(
                  setTimeout(() => {
                    setRevealIndex(1);
                    setHistory((prev) => [
                      ...prev,
                      { command: "whoami", output },
                    ]);
                    setLastCommand("whoami");
                    setPhase("idle");
                    setTypingCommand("");
                    setRevealCommand("");
                    setRevealLines([]);
                  }, LINE_REVEAL_MS)
                );
              }, PAUSE_BEFORE_OUTPUT_MS)
            );
          }
        };
        timersRef.current.push(setTimeout(tick, CHAR_MS));
        return;
      }

      const def = getCommandDef(cmd);
      if (!def) return;

      const lines = splitOutputLines(def.output);
      setTypingCommand(cmd);
      setTypingIndex(0);
      setPhase("typing");
      setActionsVisible(false);

      let charIndex = 0;
      const typeTick = () => {
        charIndex++;
        setTypingIndex(charIndex);
        if (charIndex < cmd.length) {
          const t = setTimeout(typeTick, CHAR_MS);
          timersRef.current.push(t);
        } else {
          timersRef.current.push(
            setTimeout(() => {
              setPhase("revealing");
              setRevealCommand(cmd);
              setRevealLines(lines);
              setRevealIndex(0);
              setRevealActions(def.actions ?? null);

              let lineIndex = 0;
              const revealNext = () => {
                lineIndex++;
                setRevealIndex(lineIndex);
                if (lineIndex < lines.length) {
                  const t = setTimeout(revealNext, LINE_REVEAL_MS);
                  timersRef.current.push(t);
                } else {
                  if (def.actions && def.actions.length > 0) {
                    setActionsVisible(true);
                    timersRef.current.push(
                      setTimeout(() => {
                        setHistory((prev) => [
                          ...prev,
                          {
                            command: cmd,
                            output: def.output,
                            actions: def.actions,
                          },
                        ]);
                        setLastCommand(cmd);
                        setPhase("idle");
                        setTypingCommand("");
                        setRevealCommand("");
                        setRevealLines([]);
                        setRevealIndex(0);
                        setRevealActions(null);
                        setActionsVisible(false);
                      }, ACTIONS_DELAY_MS)
                    );
                  } else {
                    setHistory((prev) => [
                      ...prev,
                      { command: cmd, output: def.output, actions: def.actions },
                    ]);
                    setLastCommand(cmd);
                    setPhase("idle");
                    setTypingCommand("");
                    setRevealCommand("");
                    setRevealLines([]);
                    setRevealIndex(0);
                  }
                }
              };
              timersRef.current.push(setTimeout(revealNext, LINE_REVEAL_MS));
            }, PAUSE_BEFORE_OUTPUT_MS)
          );
        }
      };
      timersRef.current.push(setTimeout(typeTick, CHAR_MS));
    },
    [clearTimers]
  );

  const executeCommand = (cmd: string) => {
    if (phase !== "idle") {
      clearTimers();
      setPhase("idle");
      setTypingCommand("");
      setTypingIndex(0);
      setRevealCommand("");
      setRevealLines([]);
      setRevealIndex(0);
      setRevealActions(null);
      setActionsVisible(false);
      const runNext = () => startCommand(cmd);
      requestAnimationFrame(() => {
        requestAnimationFrame(runNext);
      });
      return;
    }
    startCommand(cmd);
  };

  const revealedOutput = revealLines.slice(0, revealIndex).join("\n");

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0d0d0f] font-mono text-[11px] leading-snug">
      <div className="min-h-[120px] flex-1 overflow-auto px-3 py-3">
        {history.map((entry, i) => (
          <div key={i} className="mb-3">
            <p className="text-zinc-400">
              <span className="text-emerald-400/90">{PROMPT}</span>
              {entry.command}
            </p>
            <p
              className="mt-1 whitespace-pre-wrap pl-2 text-zinc-300"
              style={{ wordBreak: "break-word" }}
            >
              {entry.output}
            </p>
            {entry.actions && entry.actions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5 pl-2">
                {entry.actions.map((action, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => handleAction(action)}
                    className="rounded border border-white/[0.12] bg-white/[0.06] px-2 py-1 text-[10px] text-zinc-300 transition-colors active:border-emerald-500/40 active:bg-white/[0.1] active:text-zinc-100"
                    aria-label={action.label}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {phase === "typing" && (
          <div className="mb-3">
            <p className="text-zinc-400">
              <span className="text-emerald-400/90">{PROMPT}</span>
              <span className="text-zinc-100">
                {typingCommand.slice(0, typingIndex)}
              </span>
            </p>
          </div>
        )}

        {phase === "revealing" && (
          <div
            className={`mb-3 ${actionsVisible ? "" : "terminal-output-enter"}`}
          >
            <p className="text-zinc-400">
              <span className="text-emerald-400/90">{PROMPT}</span>
              {revealCommand}
            </p>
            <p
              className="mt-1 whitespace-pre-wrap pl-2 text-zinc-300"
              style={{ wordBreak: "break-word" }}
            >
              {revealedOutput}
            </p>
            {revealActions && revealActions.length > 0 && actionsVisible && (
              <div className="mt-2 flex flex-wrap gap-1.5 pl-2 terminal-actions-enter">
                {revealActions.map((action, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => handleAction(action)}
                    className="rounded border border-white/[0.12] bg-white/[0.06] px-2 py-1 text-[10px] text-zinc-300 transition-colors active:border-emerald-500/40 active:bg-white/[0.1] active:text-zinc-100"
                    aria-label={action.label}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="shrink-0 border-t border-white/[0.06] bg-[#0a0a0c]/80 px-3 py-3">
        <p className="mb-2 flex items-center gap-1 text-zinc-500">
          <span className="text-emerald-400/70">{PROMPT}</span>
          <span className="truncate">
            {phase === "typing"
              ? typingCommand.slice(0, typingIndex)
              : lastCommand ?? "Tap a command below"}
          </span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {TAPPABLE_COMMAND_IDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-left text-zinc-300 transition-colors hover:border-emerald-500/30 hover:bg-white/[0.08] hover:text-zinc-100 active:scale-[0.98]"
              aria-label={`Run ${cmd}`}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
