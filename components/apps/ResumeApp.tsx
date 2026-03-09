"use client";

import { resumeIntro } from "@/content/resume";

export default function ResumeApp() {
  return (
    <div className="p-4 text-sm">
      <p className="leading-relaxed text-zinc-300">{resumeIntro}</p>
      <p className="mt-4 text-xs text-zinc-500">
        Full resume and timeline can be shared on request.
      </p>
    </div>
  );
}
