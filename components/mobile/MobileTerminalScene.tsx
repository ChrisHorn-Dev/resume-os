"use client";

import type { WindowState } from "@/lib/types";
import TerminalApp from "@/components/apps/TerminalApp";
import { ChevronLeft } from "lucide-react";

interface MobileTerminalSceneProps {
  win: WindowState;
  onClose: () => void;
}

/**
 * Full-screen fixed terminal layer for mobile. Renders as its own scene
 * (header + terminal) so the terminal is not embedded in the normal app flow.
 * Parent must set position: fixed and viewport-aware dimensions.
 */
export default function MobileTerminalScene({ win, onClose }: MobileTerminalSceneProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0d0d0f] shadow-[0_18px_45px_rgba(0,0,0,0.9)]">
      <header className="flex min-h-12 shrink-0 items-center justify-between border-b border-[var(--border)]/90 px-3">
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 hover:bg-zinc-700/80 hover:text-zinc-50"
          aria-label="Back to home"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="flex-1 truncate px-1 text-center text-sm font-medium text-[var(--foreground)]">
          {win.title}
        </span>
        <div className="h-9 w-9" aria-hidden />
      </header>
      <div className="min-h-[120px] min-w-0 flex-1 overflow-hidden">
        <TerminalApp mobile />
      </div>
    </div>
  );
}
