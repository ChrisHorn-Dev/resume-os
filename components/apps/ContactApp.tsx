"use client";

import { Mail, Github, Linkedin, Phone } from "lucide-react";

const CONTACT_ITEMS = [
  {
    id: "email",
    label: "Email",
    value: "chris@capefearweb.co",
    href: "mailto:chris@capefearweb.co",
    icon: Mail,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/ChrisHorn-Dev",
    href: "https://github.com/ChrisHorn-Dev",
    icon: Github,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/chris-horn-5b70ab369",
    href: "https://www.linkedin.com/in/chris-horn-5b70ab369/",
    icon: Linkedin,
    external: true,
  },
  {
    id: "phone",
    label: "Phone",
    value: "(470) 263-1395",
    href: "tel:+14702631395",
    icon: Phone,
  },
] as const;

function ContactItem(props: (typeof CONTACT_ITEMS)[number]) {
  const { id, label, value, href, icon: Icon, external } = props;
  const isPrimary = id === "email";

  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noreferrer noopener" }
        : undefined)}
      className={`group relative flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-sm text-zinc-200 transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${
        isPrimary
          ? "border-white/12 bg-gradient-to-br from-white/[0.07] to-white/[0.03] shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
          : "border-white/8 bg-white/[0.02] shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
      } hover:bg-white/[0.06]`}
    >
      <div
        className={`flex items-center justify-center rounded-xl bg-white/[0.03] text-zinc-300 shadow-inner shadow-white/5 ring-1 ring-white/5 transition-colors ${
          isPrimary ? "h-10 w-10" : "h-9 w-9"
        } group-hover:text-[var(--accent)]`}
      >
        <Icon size={18} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          {label}
        </span>
        <span className="truncate text-[13px] text-zinc-100 group-hover:text-zinc-50">
          {value}
        </span>
      </div>
      <span className="text-[11px] font-medium text-zinc-500 transition-colors group-hover:text-[var(--accent)]">
        {external ? "Open" : "Tap"}
      </span>
    </a>
  );
}

export default function ContactApp() {
  return (
    <div className="flex h-full flex-col px-3 py-4 sm:px-4 sm:py-5">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-3xl border border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-white/[0.01] px-4 py-4 shadow-[0_22px_60px_rgba(0,0,0,0.85)] ring-1 ring-black/40">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Contact
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">
            Open to full-time product-focused SWE roles, freelance
            opportunities, and select collaborations.
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Direct Contact
          </p>
          <div className="mt-2 space-y-2.5">
            {CONTACT_ITEMS.map((item) => (
              <ContactItem key={item.id} {...item} />
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-[12px] text-zinc-500">
          Best way to reach me is email.
        </p>
      </div>
    </div>
  );
}
