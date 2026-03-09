import { create } from "zustand";
import type { WindowState } from "./types";
import { getAppById, MENU_BAR_HEIGHT, TASKBAR_HEIGHT } from "./apps";

// Start windows above the menu bar (z-100) and icons/taskbar layers
let nextZ = 200;
const genId = () => `win_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

type OpenAppOptions = { position?: { x: number; y: number }; payload?: Record<string, unknown> };

interface WindowManagerState {
  windows: WindowState[];
  focusedWindowId: string | null;
  openApp: (appId: WindowState["appId"], options?: OpenAppOptions) => void;
  closeWindow: (id: string) => void;
  closeAllWindows: () => void;
  focusWindow: (id: string) => void;
  clearFocus: () => void;
  setPosition: (id: string, x: number, y: number) => void;
  setSize: (id: string, w: number, h: number) => void;
  setMinimized: (id: string, isMinimized: boolean) => void;
  minimizeAll: () => void;
  setMaximized: (id: string, isMaximized: boolean) => void;
  setWindowZIndex: (id: string, zIndex: number) => void;
  getNextZIndex: () => number;
}

export const useWindowStore = create<WindowManagerState>((set, get) => ({
  windows: [],
  focusedWindowId: null,

  getNextZIndex: () => {
    nextZ += 1;
    return nextZ;
  },

  openApp: (appId, options) => {
    const app = getAppById(appId);
    if (!app) return;
    const { position: overridePosition, payload } = options ?? {};
    const existing = get().windows.find((w) => w.appId === appId);
    if (existing) {
      if (payload != null && Object.keys(payload).length > 0) {
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === existing.id ? { ...w, payload } : w
          ),
          focusedWindowId: existing.id,
        }));
      } else {
        get().focusWindow(existing.id);
        set({ focusedWindowId: existing.id });
      }
      return;
    }
    const id = genId();
    const z = get().getNextZIndex();
    const baseSize = app.defaultSize;

    let size = baseSize;
    if (typeof window !== "undefined") {
      const maxWidth = Math.max(320, window.innerWidth - 32);
      const maxHeight = Math.max(
        240,
        window.innerHeight - MENU_BAR_HEIGHT - TASKBAR_HEIGHT - 32
      );

      size = {
        w: Math.min(baseSize.w, maxWidth),
        h: Math.min(baseSize.h, maxHeight),
      };
    }

    let position = overridePosition ?? app.defaultPosition ?? { x: 100, y: 80 };
    const minY = MENU_BAR_HEIGHT + 16;
    position = { x: position.x, y: Math.max(position.y, minY) };
    const newWindow: WindowState = {
      id,
      appId,
      title: app.title,
      position,
      size,
      zIndex: z,
      isMinimized: false,
      isMaximized: false,
      ...(payload != null && Object.keys(payload).length > 0 ? { payload } : {}),
    };
    set((s) => ({
      windows: [...s.windows, newWindow],
      focusedWindowId: id,
    }));
  },

  closeWindow: (id) => {
    set((s) => {
      const next = s.windows.filter((w) => w.id !== id);
      const nextFocused = s.focusedWindowId === id
        ? (next[next.length - 1]?.id ?? null)
        : s.focusedWindowId;
      return { windows: next, focusedWindowId: nextFocused };
    });
  },

  closeAllWindows: () => {
    set({ windows: [], focusedWindowId: null });
  },

  focusWindow: (id) => {
    const win = get().windows.find((w) => w.id === id);
    if (!win) return;
    const z = get().getNextZIndex();
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, zIndex: z } : w
      ),
      focusedWindowId: id,
    }));
  },

  clearFocus: () => {
    set({ focusedWindowId: null });
  },

  setPosition: (id, x, y) => {
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, position: { x, y } } : w
      ),
    }));
  },

  setSize: (id, w, h) => {
    set((s) => ({
      windows: s.windows.map((win) =>
        win.id === id ? { ...win, size: { w, h } } : win
      ),
    }));
  },

  setMinimized: (id, isMinimized) => {
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, isMinimized } : w
      ),
    }));
  },

  minimizeAll: () => {
    set((s) => ({
      windows: s.windows.map((w) => ({ ...w, isMinimized: true })),
      focusedWindowId: null,
    }));
  },

  setMaximized: (id, isMaximized) => {
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, isMaximized } : w
      ),
    }));
  },

  setWindowZIndex: (id, zIndex) => {
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, zIndex } : w
      ),
    }));
  },
}));
