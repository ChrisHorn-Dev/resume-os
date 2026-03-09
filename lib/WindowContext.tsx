"use client";

import { createContext, useContext } from "react";
import type { WindowState } from "@/lib/types";

const WindowContext = createContext<WindowState | null>(null);

export function useWindow(): WindowState | null {
  return useContext(WindowContext);
}

export function WindowProvider({
  win,
  children,
}: {
  win: WindowState;
  children: React.ReactNode;
}) {
  return (
    <WindowContext.Provider value={win}>
      {children}
    </WindowContext.Provider>
  );
}
