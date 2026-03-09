"use client";

import { useEffect, useState } from "react";

type ViewportMode = "mobile" | "tablet" | "desktop";

const MOBILE_MAX = 767;
const TABLET_MAX = 1023;

function getMode(width: number | null): ViewportMode {
  if (width == null) return "desktop";
  if (width <= MOBILE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

export function useViewportMode(): ViewportMode {
  // Start in "desktop" mode so that server-rendered HTML and the
  // first client render match, avoiding hydration mismatches.
  // We then refine to the real viewport mode after mount.
  const [mode, setMode] = useState<ViewportMode>("desktop");

  useEffect(() => {
    const handleResize = () => {
      setMode(getMode(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return mode;
}

export function useIsDesktop() {
  return useViewportMode() === "desktop";
}

