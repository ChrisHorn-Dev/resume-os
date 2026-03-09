"use client";

export default function Desktop() {
  return (
    <div
      className="absolute inset-0 bg-[var(--background)]"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(24,24,27,0.4) 0%, transparent 50%),
          linear-gradient(90deg, rgba(39,39,42,0.04) 1px, transparent 1px),
          linear-gradient(rgba(39,39,42,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px, 40px 40px, 40px 40px",
      }}
      aria-hidden
    />
  );
}
