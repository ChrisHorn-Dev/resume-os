"use client";

export default function Desktop() {
  return (
    <div
      className="absolute inset-0 z-0 bg-[var(--background)]"
      aria-hidden
    >
      {/* Deep navy/charcoal base with layered radial bloom */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 110% 80% at 50% 30%, rgba(28, 34, 54, 0.75) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 50% 18%, rgba(10, 16, 32, 0.85) 0%, transparent 52%),
            radial-gradient(circle at 10% 90%, rgba(12, 16, 30, 0.6) 0%, transparent 45%),
            radial-gradient(circle at 90% 85%, rgba(8, 12, 24, 0.55) 0%, transparent 42%),
            radial-gradient(ellipse 140% 120% at 50% 100%, rgba(6, 8, 16, 0.95) 0%, rgba(3, 4, 10, 1) 55%),
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
