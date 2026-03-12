"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "chrisos-theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

interface ThemeState {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  /** Resolved theme for applying to DOM (only valid in browser). */
  getResolvedTheme: () => "light" | "dark";
  /** Toggle between light and dark; when "system", goes to "dark" then "light". */
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      preference: "dark",
      setPreference: (preference) => set({ preference }),
      getResolvedTheme: () => {
        const { preference } = get();
        if (preference === "system") return getSystemTheme();
        return preference;
      },
      toggle: () => {
        const resolved = get().getResolvedTheme();
        const next: ThemePreference = resolved === "dark" ? "light" : "dark";
        set({ preference: next });
      },
    }),
    { name: STORAGE_KEY }
  )
);

/** For use in inline script / SSR: read stored preference and return "light" | "dark". */
export function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "dark";
    const parsed = JSON.parse(raw) as { state?: { preference?: ThemePreference } };
    const pref = parsed?.state?.preference;
    if (pref === "light" || pref === "dark") return pref;
    if (pref === "system") return getSystemTheme();
  } catch {
    // ignore
  }
  return "dark";
}
