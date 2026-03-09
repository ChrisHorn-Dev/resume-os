"use client";

import { useEffect, useState } from "react";

/**
 * Returns the height of the visible viewport (e.g. below the keyboard on iOS).
 * Updates on visualViewport resize/scroll so the UI can constrain height and avoid page drag.
 */
export function useVisualViewportHeight(): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) {
      setHeight(window.innerHeight);
      return;
    }

    const update = () => setHeight(vv.height);

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return height;
}

type RefObject = React.RefObject<HTMLElement | null>;

/**
 * Returns the full visual viewport rect: { top, left, width, height }.
 * Use for a fixed overlay that must track the visible viewport (e.g. when the keyboard opens on iOS).
 * Updates on visualViewport resize and scroll.
 */
export function useVisualViewportRect(): {
  top: number;
  left: number;
  width: number;
  height: number;
} {
  const [rect, setRect] = useState({
    top: 0,
    left: 0,
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) {
      setRect({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      return;
    }

    const update = () => {
      requestAnimationFrame(() => {
        const vv = window.visualViewport;
        if (!vv) return;
        const h = Math.max(1, vv.height);
        setRect({
          top: vv.offsetTop,
          left: vv.offsetLeft,
          width: vv.width,
          height: h,
        });
      });
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  return rect;
}

/**
 * Returns { top, height } for a fixed overlay that fills from the top of the given
 * element to the bottom of the visual viewport. Use when the overlay should resize
 * with the keyboard (e.g. mobile terminal scene).
 */
export function useFixedOverlayRect(anchorRef: RefObject): { top: number; height: number } {
  const [rect, setRect] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) {
      setRect({ top: 0, height: window.innerHeight });
      return;
    }

    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const height = Math.max(100, vv.height - top);
      setRect({ top, height });
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [anchorRef]);

  return rect;
}

/**
 * Returns the height to use for a content area that starts below a header element,
 * so the content fits exactly in the visual viewport (e.g. above the keyboard on iOS).
 * Updates when visualViewport resizes or scrolls.
 */
export function useVisualViewportContentHeight(headerRef: RefObject): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) {
      setHeight(window.innerHeight);
      return;
    }

    const update = () => {
      const header = headerRef.current;
      if (!header) return;
      const headerBottom = header.getBoundingClientRect().bottom;
      const vv = window.visualViewport!;
      const contentHeight = vv.height - headerBottom;
      setHeight(Math.max(100, contentHeight));
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headerRef]);

  return height;
}
