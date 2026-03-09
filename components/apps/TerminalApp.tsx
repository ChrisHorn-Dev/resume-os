"use client";

import { useViewportMode } from "@/lib/useViewportMode";
import TerminalDesktop from "@/components/apps/TerminalDesktop";
import TerminalMobile from "@/components/apps/TerminalMobile";

type TerminalAppProps = {
  /** When true, force mobile console (e.g. from MobileTerminalScene). Otherwise use viewport. */
  mobile?: boolean;
};

/**
 * Renders the appropriate terminal by viewport:
 * - Mobile (≤767px or mobile prop): TerminalMobile (tappable commands, no keyboard).
 * - Tablet/Desktop: TerminalDesktop (typing-based terminal).
 */
export default function TerminalApp({ mobile = false }: TerminalAppProps) {
  const mode = useViewportMode();
  const useMobile = mobile || mode === "mobile";

  return useMobile ? <TerminalMobile /> : <TerminalDesktop />;
}
