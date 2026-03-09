"use client";

import DesktopShell from "@/components/layout/DesktopShell";
import MobileShell from "@/components/layout/MobileShell";
import { useViewportMode } from "@/lib/useViewportMode";

export default function Home() {
  const mode = useViewportMode();

  if (mode === "desktop") {
    return <DesktopShell />;
  }

  return <MobileShell />;
}

