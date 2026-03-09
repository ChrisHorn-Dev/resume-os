"use client";

import { contactEmail, contactBlurb } from "@/content/contact";
import { Mail } from "lucide-react";

export default function ContactApp() {
  return (
    <div className="p-4">
      <p className="text-sm text-zinc-400">{contactBlurb}</p>
      <a
        href={`mailto:${contactEmail}`}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-zinc-800/80 px-4 py-2 text-sm text-[var(--accent)] hover:bg-zinc-700/80 hover:text-[var(--accent-hover)]"
      >
        <Mail size={16} />
        {contactEmail}
      </a>
    </div>
  );
}
