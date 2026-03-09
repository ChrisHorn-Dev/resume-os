import { create } from "zustand";
import type { WindowState } from "./types";
import { getAppById } from "./apps";

let nextZ = 1;
const genId = () => `win_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

interface WindowManagerState {
  windows: WindowState[];
  focusedWindowId: string | null;
  openApp: (appId: WindowState["appId"]) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  setPosition: (id: string, x: number, y: number) => void;
  setSize: (id: string, w: number, h: number) => void;
  setMinimized: (id: string, isMinimized: boolean) => void;
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

  openApp: (appId) => {
    const app = getAppById(appId);
    if (!app) return;
    const existing = get().windows.find((w) => w.appId === appId);
    if (existing) {
      get().focusWindow(existing.id);
      set({ focusedWindowId: existing.id });
      return;
    }
    const id = genId();
    const z = get().getNextZIndex();
    const newWindow: WindowState = {
      id,
      appId,
      title: app.title,
      position: app.defaultPosition ?? { x: 100, y: 80 },
      size: app.defaultSize,
      zIndex: z,
      isMinimized: false,
      isMaximized: false,
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
