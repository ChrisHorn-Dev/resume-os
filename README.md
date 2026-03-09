# Resume OS

A resume and portfolio site built as a desktop-style UI. Navigation is window-based instead of scrolling: open apps from the taskbar to view Resume, Projects, Tech Stack, About, and Contact.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (window state)
- react-rnd (draggable/resizable windows)
- Framer Motion (animations)
- Lucide React (icons)

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Deploy

Configured for Vercel. Push to a connected repo or run `vercel` from the project root.

## Content

Copy and data live under `content/`. Update `content/contact.ts` with your email before going live.
