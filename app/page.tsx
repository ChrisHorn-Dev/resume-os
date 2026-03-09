"use client";

import Desktop from "@/components/desktop/Desktop";
import Taskbar from "@/components/desktop/Taskbar";
import WindowManager from "@/components/desktop/WindowManager";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Desktop />
      <div className="absolute inset-0 bottom-12">
        <WindowManager />
      </div>
      <Taskbar />
    </div>
  );
}
