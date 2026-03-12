"use client";

import { useEffect } from "react";
import { useThemeStore, getInitialTheme } from "@/lib/themeStore";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const preference = useThemeStore((s) => s.preference);
  const getResolvedTheme = useThemeStore((s) => s.getResolvedTheme);

  useEffect(() => {
    const resolved = preference === "system" ? getResolvedTheme() : preference;
    applyTheme(resolved);
  }, [preference, getResolvedTheme]);

  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyTheme(getResolvedTheme());
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [preference, getResolvedTheme]);

  return <>{children}</>;
}

/** Call from inline script in <head> to set data-theme before paint and avoid flash. */
export function applyInitialTheme() {
  const theme = getInitialTheme();
  document.documentElement.setAttribute("data-theme", theme);
}
