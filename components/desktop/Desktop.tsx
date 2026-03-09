"use client";

export default function Desktop() {
  return (
    <div
      className="absolute inset-0 z-0 bg-[var(--background)]"
      aria-hidden
    >
      {/* Deep navy/charcoal base with radial bloom at center */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 40%, rgba(30, 35, 50, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 50% 35%, rgba(15, 20, 35, 0.4) 0%, transparent 45%),
            var(--background)
          `,
        }}
      />
      {/* Extremely subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Darkened corners for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 140px rgba(0,0,0,0.35)",
        }}
      />
    </div>
  );
}
