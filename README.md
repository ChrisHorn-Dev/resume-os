# Resume OS (ChrisOS)

ChrisOS is an OS-inspired, desktop-style resume and portfolio built as a browser-based workspace.  
Instead of scrolling through sections, you open apps in windows: Resume, Projects, Tech Stack, About,
Contact, Terminal, and a deep-dive explorer for engineering case studies.

The goal is to show how a frontend systems project can model windows, shared app state, and
payload-driven navigation while still telling a clear product story.

## Architecture overview

- **Desktop shell**
  - `DesktopShell` renders the wallpaper, menu bar, window layer, and dock/taskbar.
  - `WindowManager` + `Window` (via `react-rnd`) handle positioning, focus, and resizing.
  - Apps (Resume, Projects, Tech Stack, About, Contact, Terminal, Deep Dive) are rendered into
    windows from a shared app registry.

- **Mobile shell**
  - `MobileShell` provides a mobile launcher, top bar, app chrome, and system bar.
  - Non-terminal apps render inside `MobileAppView`; the terminal runs as a full-screen overlay
    (`MobileTerminalScene`) with its own header.

- **Shared window/app state**
  - `windowStore` (Zustand) owns all window state: which apps are open, positions, sizes, z-index,
    minimization/maximization, and optional payload.
  - `WindowContext` lets apps read their own `WindowState` (including `payload`) so they can
    deep-link into specific content.

- **Navigation and payloads**
  - The dock, desktop launcher, and terminal all call `openApp(appId, options)` on `windowStore`.
  - When a deep-dive window already exists, `openApp("deepdive", { payload })` updates the payload
    and focuses that window instead of opening a new one.
  - This allows payload-driven navigation such as
    “open the Media Authenticity API deep dive, Architecture section” from the terminal or
    Projects app.

- **Deep-dive content model**
  - `content/projectDeepDives.ts` defines a structured deep-dive model per project:
    sections (Overview, Architecture, System Flow, Code Structure, Engineering Decisions,
    Future Improvements) and typed blocks (text, bullet lists, steps, architecture diagrams,
    module maps).
  - `ProjectDeepDiveApp` (desktop) and `MobileProjectDeepDive` (mobile) both use this model to
    render project deep dives in layouts tuned for their surfaces.

- **Terminal**
  - Desktop terminal (`TerminalDesktop`) is a typing-based console.
  - Mobile terminal (`TerminalMobile` inside `MobileTerminalScene`) uses tappable commands and
    terminal-style action buttons.
  - Both share the same command definitions in `lib/terminalCommands.ts` (e.g. `projects`,
    `physician`, `media-api`, `open media-api`, `show architecture physician-connection`),
    and actions can open apps (including deep dives) via `openApp`.

- **Content model**
  - All portfolio copy (about, resume, projects, deep dives, social links, stack) lives under
    `content/`. Components read from this layer rather than hard-coding text, which keeps the UI
    focused on layout and interaction.

- **Theming**
  - A theme provider and simple store manage light/dark mode, exposing tokens via CSS variables.
  - Desktop and mobile shells, windows, and controls all use these variables for a consistent
    glass-like desktop aesthetic.

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

Configured for Vercel. Push to a connected repo or run `vercel` from the project root. For Open Graph
and canonical URLs, set `metadataBase` in `app/layout.tsx` to the production URL.

## Content

Copy and config live under `content/`: contact, social links, about, resume, projects, stack,
and deep-dive project details.
