"use client";

import { useCallback, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { useWindowStore } from "@/lib/windowStore";
import { APP_ICONS } from "@/lib/icons";
import type { WindowState } from "@/lib/types";
import type { AppId } from "@/lib/types";

const iconMap = APP_ICONS;

interface WindowProps {
  win: WindowState;
  children: React.ReactNode;
}

export default function Window({ win, children }: WindowProps) {
  const rndRef = useRef<Rnd>(null);
  const {
    closeWindow,
    focusWindow,
    setPosition,
    setSize,
    setMinimized,
    setMaximized,
    setWindowZIndex,
    focusedWindowId,
  } = useWindowStore();

  const isFocused = focusedWindowId === win.id;

  const handleFocus = useCallback(() => {
    if (focusedWindowId !== win.id) focusWindow(win.id);
  }, [focusWindow, focusedWindowId, win.id]);

  const handleDragStop = useCallback(
    (_e: unknown, d: { x: number; y: number }) => {
      setPosition(win.id, d.x, d.y);
    },
    [win.id, setPosition]
  );

  const handleResizeStop = useCallback(
    (_e: unknown, _dir: unknown, ref: HTMLElement) => {
      setSize(win.id, ref.offsetWidth, ref.offsetHeight);
    },
    [win.id, setSize]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFocused) closeWindow(win.id);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeWindow, win.id, isFocused]);

  const IconComponent = iconMap[win.appId];

  if (win.isMinimized) return null;

  const position = win.isMaximized
    ? { x: 0, y: 0 }
    : { x: win.position.x, y: win.position.y };
  const size = win.isMaximized
    ? { width: "100%", height: "100%" }
    : { width: win.size.w, height: win.size.h };

  return (
    <Rnd
      ref={rndRef}
      position={position}
      size={size}
      minWidth={320}
      minHeight={240}
      disableDragging={win.isMaximized}
      enableResizing={!win.isMaximized}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onMouseDown={handleFocus}
      dragHandleClassName="window-drag-handle"
      style={{ zIndex: win.zIndex }}
      className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-xl"
    >
      <div className="flex h-full flex-col">
        <header
          className="window-drag-handle flex min-h-10 shrink-0 items-center gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-3"
          onDoubleClick={() => setMaximized(win.id, !win.isMaximized)}
        >
          {IconComponent && (
            <span className="flex shrink-0 text-zinc-500" aria-hidden>
              <IconComponent size={14} />
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--foreground)]">
            {win.title}
          </span>
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={() => setMinimized(win.id, true)}
              className="flex h-6 w-7 items-center justify-center rounded text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
              aria-label="Minimize"
            >
              <span className="text-xs leading-none">−</span>
            </button>
            <button
              type="button"
              onClick={() => setMaximized(win.id, !win.isMaximized)}
              className="flex h-6 w-7 items-center justify-center rounded text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
              aria-label={win.isMaximized ? "Restore" : "Maximize"}
            >
              <span className="text-xs leading-none">□</span>
            </button>
            <button
              type="button"
              onClick={() => closeWindow(win.id)}
              className="flex h-6 w-7 items-center justify-center rounded text-zinc-400 hover:bg-red-600/80 hover:text-white"
              aria-label="Close"
            >
              <span className="text-xs leading-none">×</span>
            </button>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
