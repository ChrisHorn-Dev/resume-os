"use client";

import { useCallback, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { useWindowStore } from "@/lib/windowStore";
import { APP_ICONS } from "@/lib/icons";
import { WindowProvider } from "@/lib/WindowContext";
import type { WindowState } from "@/lib/types";

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
    focusedWindowId,
  } = useWindowStore();

  const isFocused = focusedWindowId === win.id;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && contentRef.current) {
      contentRef.current.focus({ preventScroll: true });
    }
  }, [isFocused]);

  const handleFocus = useCallback(() => {
    if (focusedWindowId !== win.id) focusWindow(win.id);
  }, [focusWindow, focusedWindowId, win.id]);

  const handleDragStop = useCallback(
    (_e: unknown, d: { x: number; y: number }) => {
      setPosition(win.id, d.x, d.y);
    },
    [win.id, setPosition]
  );

  const handleDragStart = useCallback(() => {
    focusWindow(win.id);
  }, [focusWindow, win.id]);

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
      bounds="parent"
      minWidth={320}
      minHeight={240}
      disableDragging={win.isMaximized}
      enableResizing={!win.isMaximized}
      onDragStop={handleDragStop}
      onDragStart={handleDragStart}
      onResizeStop={handleResizeStop}
      onMouseDown={handleFocus}
      dragHandleClassName="window-drag-handle"
      className={`pointer-events-auto overflow-hidden rounded-xl border bg-[var(--window-glass)] shadow-[var(--window-inner-highlight)] backdrop-blur-[40px] transition-all duration-200 ease-[var(--ease-out)] ${
        isFocused
          ? "border-white/[0.08] shadow-[var(--window-shadow-active),var(--window-inner-highlight)] opacity-100"
          : "border-[var(--border)]/50 shadow-[var(--window-shadow),var(--window-inner-highlight)] opacity-95"
      }`}
      style={{ zIndex: win.zIndex }}
      data-window-chrome
    >
      <div className="flex h-full flex-col">
        <header
          className={`window-drag-handle flex min-h-[40px] shrink-0 items-center gap-3 border-b border-[var(--border)]/50 pl-3 pr-2 pt-1.5 pb-1.5 backdrop-blur-lg ${
            isFocused ? "bg-[var(--window-glass-title-focused)]" : "bg-[var(--window-glass-title)]"
          }`}
          onDoubleClick={() => setMaximized(win.id, !win.isMaximized)}
        >
          {IconComponent && (
            <span className="flex shrink-0 text-zinc-500" aria-hidden>
              <IconComponent size={14} />
            </span>
          )}
          <span className="min-w-0 flex-1 truncate pl-0.5 text-[13px] font-medium text-[var(--foreground)]">
            {win.title}
          </span>
          {/* Window controls (right): minimize, maximize, close — custom glass + subtle glow */}
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setMinimized(win.id, true)}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border bg-white/5 backdrop-blur-sm transition-all duration-200 ease-[var(--ease-out)] active:scale-95 ${
                isFocused
                  ? "border-white/10 text-zinc-300 hover:bg-white/10 hover:shadow-[var(--control-glow-amber)]"
                  : "border-white/5 text-zinc-500 hover:bg-white/[0.08] hover:shadow-[var(--control-glow-amber)]"
              }`}
              aria-label="Minimize"
            >
              <span className="text-[13px] font-light leading-none">−</span>
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setMaximized(win.id, !win.isMaximized)}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border bg-white/5 backdrop-blur-sm transition-all duration-200 ease-[var(--ease-out)] active:scale-95 ${
                isFocused
                  ? "border-white/10 text-zinc-300 hover:bg-white/10 hover:shadow-[var(--control-glow-blue)]"
                  : "border-white/5 text-zinc-500 hover:bg-white/[0.08] hover:shadow-[var(--control-glow-blue)]"
              }`}
              aria-label={win.isMaximized ? "Restore" : "Maximize"}
            >
              <span className="text-[13px] font-light leading-none">□</span>
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => closeWindow(win.id)}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border bg-white/5 backdrop-blur-sm transition-all duration-200 ease-[var(--ease-out)] active:scale-95 ${
                isFocused
                  ? "border-white/10 text-zinc-300 hover:bg-white/10 hover:shadow-[var(--control-glow-red)] hover:text-red-400/90"
                  : "border-white/5 text-zinc-500 hover:bg-white/[0.08] hover:shadow-[var(--control-glow-red)] hover:text-red-400/80"
              }`}
              aria-label="Close"
            >
              <span className="text-[13px] font-light leading-none">✕</span>
            </button>
          </div>
        </header>
        <div
          ref={contentRef}
          tabIndex={-1}
          className="min-h-0 flex-1 overflow-auto bg-[var(--window-glass-content-tint)] outline-none"
          role="region"
          aria-label={win.title}
        >
          <WindowProvider win={win}>
            {children}
          </WindowProvider>
        </div>
      </div>
    </Rnd>
  );
}
