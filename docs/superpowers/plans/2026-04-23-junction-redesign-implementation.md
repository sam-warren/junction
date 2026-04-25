# Junction Technologies LTD. Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the design specified in `DESIGN.md` (project root). Rebuild the JunctionTech site as Junction Technologies LTD. — single-page + `/contact`, dark-first, Geist + Magic UI on a brand-blue palette anchored at `#2642A9`, with an `AnimatedBeam` Convergence Diagram as the signature visual moment.

**Architecture:** React 19 + Vite 7 + Tailwind CSS 4 + TypeScript 5.7+. Magic UI components vendored under `src/components/magicui/`. Content lives in typed TS modules under `src/content/`. Single homepage at `/` composed of 7 sections (Hero / Capabilities / Convergence / Work / Stack marquee / About / CTA) plus an in-flow Footer; one additional route at `/contact`. Motion via `motion` (Framer Motion v12 successor); `AnimatedBeam` is the signature visual on `#how`.

**Tech Stack:**
- React 19, TypeScript 5.7+, Vite 7
- Tailwind CSS 4 (CSS-first config via `@theme` in `globals.css`)
- Magic UI components (shadcn-style vendored): DotPattern, GridPattern, AnimatedGridPattern, BlurFade, MagicCard, BentoGrid, AnimatedBeam, Marquee, NumberTicker, BorderBeam
- `motion` v12+, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`
- `@fontsource-variable/geist` + `@fontsource-variable/geist-mono`
- `@vercel/analytics`, `@vercel/speed-insights`, `@vercel/node`, `resend`
- React Router DOM v7
- Bun for package management; npm/pnpm/yarn equally fine — adjust commands

**Prerequisites for the implementation agent:**
- Node 20+ and Bun installed (or substitute `npm`/`pnpm` in commands)
- Working directory: `/home/sam/Documents/Code/Personal/junction` (or wherever the repo lives)
- Design spec at `DESIGN.md` (root) is the source of truth for what we're building. Read it first.
- Linear MCP optional (for §15 mirror task); design works fine without it.

**Read order before starting:**
1. `DESIGN.md` (root) — full design spec
2. This plan top-to-bottom
3. `src/App.tsx`, `src/components/layout/Layout.tsx`, `src/config/routes.tsx` (current state)

---

## Conventions used throughout this plan

- **File paths** are absolute from the project root. The agent should treat the project root as `pwd`.
- **Verification commands** assume Bun (`bun run typecheck`, `bun install`, etc.). Substitute as needed.
- **Each task ends with a commit.** Commit messages follow Conventional Commits format: `<type>(<scope>): <subject>`.
- **DESIGN.md references** look like `(spec §N.N)` — open the spec at that section for the full design context.
- **Smoke tests** (Phase 14) are the only formal tests. Visual UI components are verified by inspection in the dev server. Backend logic (form submission) gets a real test in Phase 12.
- **Reduced-motion compliance** is enforced throughout — every motion effect needs a `prefers-reduced-motion: reduce` fallback.

---

# Phase 0 — Branch + dependencies (1-2 hours)

Goal: Working tree on a fresh branch with the new dependency set installed and the existing site still rendering. We do not yet write new components.

## Task 0.1: Create branch from main

**Files:** none

- [ ] **Step 1: Verify clean working tree on the current branch**

Run: `git status`
Expected: working tree clean (no uncommitted changes other than the existing DESIGN.md commit on `site-changes`)

- [ ] **Step 2: Create and check out the redesign branch from main**

Run:
```bash
git fetch origin
git checkout main
git pull origin main
git checkout -b redesign/v2
```

Expected: now on branch `redesign/v2`

## Task 0.2: Rewrite package.json

**Files:** Modify `package.json`

- [ ] **Step 1: Replace `package.json` contents**

Replace the entire file with:

```json
{
  "name": "junction",
  "private": true,
  "version": "0.2.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@fontsource-variable/geist": "^5.1.0",
    "@fontsource-variable/geist-mono": "^5.1.0",
    "@vercel/analytics": "^1.4.1",
    "@vercel/node": "^5.0.2",
    "@vercel/speed-insights": "^1.1.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.500.0",
    "motion": "^12.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.3",
    "resend": "^4.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "^22.10.6",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "@vitest/ui": "^2.1.0",
    "eslint": "^9.17.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "jsdom": "^25.0.0",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.10",
    "tailwindcss": "^4.0.0",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.18.2",
    "vite": "^7.0.0",
    "vitest": "^2.1.0"
  }
}
```

Notes:
- Versions like `^19.0.0` resolve to the latest in the `19.x.x` range at install time.
- `@tailwindcss/vite` is the new Vite integration plugin for Tailwind 4.
- `vitest` + `@vitest/ui` + `jsdom` added for Phase 14 smoke tests.
- `path` package removed (was an unused browser polyfill).
- `lodash` + `@types/lodash` removed (was only used by `GridBackground`, which is being deleted).
- `vercel` (CLI) removed from deps — install globally if needed.
- `@mdx-js/*`, `gray-matter`, `@tailwindcss/typography` removed — blog gone.

## Task 0.3: Install dependencies and verify dev server

**Files:** none (touches `bun.lock` / `node_modules`)

- [ ] **Step 1: Clean install**

Run:
```bash
rm -rf node_modules bun.lock package-lock.json
bun install
```

Expected: clean install, no peer-dep errors. If errors appear, investigate before continuing.

- [ ] **Step 2: Run typecheck on the existing code**

Run: `bun run typecheck`

Expected: TypeScript errors related to deleted/missing things (lodash, MDX) — these are EXPECTED until Phase 2's demolition. The build may also fail for the same reasons. We're confirming `bun install` worked; Phase 2 fixes the resulting type errors.

- [ ] **Step 3: Skip verifying dev server until Phase 2 cleans up**

The current code references `lodash` and MDX which are now removed. Dev server will fail to start until the `GridBackground.tsx` (lodash) and `vite.config.ts` MDX import are removed in Phase 2. Don't try to run dev yet.

## Task 0.4: Commit Phase 0

**Files:** `package.json`, `bun.lock`

- [ ] **Step 1: Stage and commit**

```bash
git add package.json bun.lock
git commit -m "chore(deps): React 19 + Tailwind 4 + Vite 7 dependency overhaul

Adds: motion, clsx, tailwind-merge, class-variance-authority,
fontsource-variable/geist + geist-mono, vitest stack, @tailwindcss/vite.
Removes: mdx, gray-matter, tailwindcss/typography, lodash, path, vercel CLI.
Major bumps: React 18→19, Tailwind 3→4, Vite 6→7, TypeScript 5.6→5.7.

Per DESIGN.md §9. Existing components will fail to compile until
Phase 2 removes deleted-package consumers (GridBackground/lodash, vite mdx).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 1 — Visual system (3-4 hours)

Goal: All design tokens, fonts, motion presets, and Magic UI primitives are installed and ready. A temporary `/__styles` route lets us visually verify the system before building real components.

## Task 1.1: Create `src/lib/utils.ts`

**Files:** Create `src/lib/utils.ts`

- [ ] **Step 1: Create the file**

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely. Used by Magic UI components
 * and our own ui/* primitives.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Task 1.2: Create `src/lib/motion.ts`

**Files:** Create `src/lib/motion.ts`

- [ ] **Step 1: Create the file with shared motion presets**

```ts
// src/lib/motion.ts

/** Cubic Beziér curves used across the site. */
export const EASE = {
  /** Apple-flavored snap-out. Default for state changes. */
  default: [0.2, 0, 0, 1] as const,
  /** Ease-in for exits. */
  exit: [0.4, 0, 1, 1] as const,
};

/** Durations in ms. Match make-interfaces-feel-better cadence. */
export const DURATION = {
  state: 200,
  enter: 400,
  hero: 800,
};

/**
 * Spring config for `motion` library.
 * bounce is ALWAYS 0 per make-interfaces-feel-better §7.
 */
export const SPRING = {
  default: { type: "spring", duration: 0.3, bounce: 0 } as const,
};
```

## Task 1.3: Create `src/hooks/use-reduced-motion.ts`

**Files:** Create `src/hooks/use-reduced-motion.ts`

- [ ] **Step 1: Create the file**

```ts
// src/hooks/use-reduced-motion.ts
import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion.
 * Initial render returns false to keep SSR/CSR boundary stable.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
```

## Task 1.4: Create `src/hooks/use-scroll-progress.ts`

**Files:** Create `src/hooks/use-scroll-progress.ts`

- [ ] **Step 1: Create the file**

```ts
// src/hooks/use-scroll-progress.ts
import { useEffect, useState } from "react";

/**
 * Returns true when the page has scrolled past `threshold` pixels.
 * Used by the Header to toggle backdrop-blur and border on scroll.
 */
export function useScrollProgress(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}
```

## Task 1.5: Create `src/hooks/use-section-spy.ts`

**Files:** Create `src/hooks/use-section-spy.ts`

- [ ] **Step 1: Create the file**

```ts
// src/hooks/use-section-spy.ts
import { useEffect, useState } from "react";

/**
 * Watches a list of section IDs and returns the ID of the section
 * currently most-visible in the viewport. Used by Header for scrollspy.
 *
 * @param ids array of element IDs (without the leading "#")
 * @returns the active section ID, or null if none
 */
export function useSectionSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
        )[0];
        setActive(top.target.id);
      },
      { threshold: [0.5], rootMargin: "0px 0px -40% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
```

## Task 1.6: Replace `src/index.css` with `src/globals.css`

**Files:** Delete `src/index.css`, Create `src/globals.css`, Modify `src/main.tsx`

- [ ] **Step 1: Create `src/globals.css` with full token system**

```css
/* src/globals.css */
@import "tailwindcss";

@import "@fontsource-variable/geist";
@import "@fontsource-variable/geist-mono";

/* ------------------------------------------------------------------------- */
/* Theme tokens (Tailwind 4 @theme directive)                                */
/* ------------------------------------------------------------------------- */
@theme {
  --font-sans: "Geist Variable", system-ui, sans-serif;
  --font-mono: "Geist Mono Variable", ui-monospace, monospace;

  /* Brand palette — anchored at #2642A9 from public/og-image.png. */
  --color-brand-50: #EEF1FB;
  --color-brand-100: #DDE3F7;
  --color-brand-200: #BCC7EF;
  --color-brand-300: #94A4E2;
  --color-brand-400: #6B7ED4;
  --color-brand-500: #4A60C7;
  --color-brand-600: #3650B6;
  --color-brand-700: #2642A9;
  --color-brand-800: #1F3690;
  --color-brand-900: #1A2D75;
  --color-brand-950: #131F50;

  /* Type scale */
  --text-display-2xl: 96px;
  --text-display-xl: 72px;
  --text-display-lg: 56px;
  --text-display-md: 40px;
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-body-sm: 14px;
  --text-mono-sm: 13px;

  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
}

/* ------------------------------------------------------------------------- */
/* Surface tokens (theme-aware via :root and .light / .dark)                 */
/* ------------------------------------------------------------------------- */
:root,
.dark {
  --canvas: #0A0A0A;
  --surface-1: #0F0F10;
  --surface-2: #16171A;
  --surface-elevated: #1B1D22;
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.14);
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1AA;
  --text-tertiary: #71717A;

  --brand-soft: rgba(75, 96, 199, 0.12);
  --brand-glow: 0 0 24px rgba(38, 66, 169, 0.55);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.7);

  --pattern-color: rgba(255, 255, 255, 0.08);

  --success: #3FCFB7;
  --danger: #F87171;
}

.light {
  --canvas: #FAFAF9;
  --surface-1: #FFFFFF;
  --surface-2: #F4F4F5;
  --surface-elevated: #E4E4E7;
  --border: rgba(0, 0, 0, 0.07);
  --border-strong: rgba(0, 0, 0, 0.14);
  --text-primary: #0A0A0A;
  --text-secondary: #52525B;
  --text-tertiary: #71717A;

  --brand-soft: rgba(75, 96, 199, 0.08);
  --brand-glow: 0 0 24px rgba(38, 66, 169, 0.35);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);

  --pattern-color: rgba(0, 0, 0, 0.06);
}

/* ------------------------------------------------------------------------- */
/* Universal element rules                                                   */
/* ------------------------------------------------------------------------- */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

html, body {
  background-color: var(--canvas);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "ss01", "cv11";
}

h1, h2, h3, h4 { text-wrap: balance; }
p, li { text-wrap: pretty; }

img { outline: 1px solid rgba(255, 255, 255, 0.1); outline-offset: -1px; }
.light img { outline-color: rgba(0, 0, 0, 0.1); }

/* Lucide icons: use stroke-width 1.5 site-wide for elegance. */
svg.lucide { stroke-width: 1.5 !important; }

/* Tabular nums utility (animated numbers must use this). */
.tabular-nums { font-variant-numeric: tabular-nums; }
```

- [ ] **Step 2: Delete `src/index.css`**

Run: `rm src/index.css`

- [ ] **Step 3: Update import in `src/main.tsx`**

Modify `src/main.tsx`. Change:
```ts
import "./index.css";
```
to:
```ts
import "./globals.css";
```

- [ ] **Step 4: Delete `src/App.css` if it exists and is unused**

```bash
[ -f src/App.css ] && rm src/App.css
```

(Confirm via `git grep "App.css"` first; if no consumers, delete.)

## Task 1.7: Configure Vite for Tailwind 4

**Files:** Modify `vite.config.ts`, Delete `tailwind.config.js`, Delete `postcss.config.js`

- [ ] **Step 1: Replace `vite.config.ts`**

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

(MDX plugin removed; Tailwind 4 plugin added.)

- [ ] **Step 2: Delete legacy Tailwind/PostCSS configs**

Tailwind 4 uses CSS-first config — `tailwind.config.js` and `postcss.config.js` are no longer needed.

```bash
rm -f tailwind.config.js postcss.config.js
```

- [ ] **Step 3: Verify dev server starts (smoke test of token system)**

Run: `bun run dev`

Expected: dev server starts on localhost:5173 with NO compile errors related to Tailwind/PostCSS. Existing component code may still error (it references deleted things from Phase 2) — that's OK. The CSS pipeline is what we're verifying here.

If errors: typically `@import "tailwindcss"` ordering or missing peer-dep. Fix before continuing.

- [ ] **Step 4: Stop the dev server**

Press Ctrl+C.

## Task 1.8: Initialize shadcn (for Magic UI registry support)

**Files:** Modify (auto-generated): `components.json`, possibly tweaks to `tsconfig.json`

- [ ] **Step 1: Run shadcn init**

Run:
```bash
npx shadcn@latest init -d
```

When prompted:
- Style: `default` (we'll override colors)
- Base color: `neutral` (will be overridden by our tokens)
- CSS variables: `yes`
- React Server Components: `no` (Vite + SPA)

Result: creates `components.json` at root and may add aliases to `tsconfig.json`.

- [ ] **Step 2: Verify `components.json` exists and aliases match our structure**

Open `components.json` and confirm aliases reference `@/components`, `@/lib`, `@/hooks`. If shadcn defaulted them differently, edit to match.

## Task 1.9: Install Magic UI components

**Files:** Creates `src/components/magicui/*.tsx`

- [ ] **Step 1: Install all required Magic UI components in one batch**

Run:
```bash
npx shadcn@latest add "https://magicui.design/r/dot-pattern.json" --yes
npx shadcn@latest add "https://magicui.design/r/grid-pattern.json" --yes
npx shadcn@latest add "https://magicui.design/r/animated-grid-pattern.json" --yes
npx shadcn@latest add "https://magicui.design/r/blur-fade.json" --yes
npx shadcn@latest add "https://magicui.design/r/magic-card.json" --yes
npx shadcn@latest add "https://magicui.design/r/bento-grid.json" --yes
npx shadcn@latest add "https://magicui.design/r/animated-beam.json" --yes
npx shadcn@latest add "https://magicui.design/r/marquee.json" --yes
npx shadcn@latest add "https://magicui.design/r/number-ticker.json" --yes
npx shadcn@latest add "https://magicui.design/r/border-beam.json" --yes
```

Components install under `src/components/magicui/`.

- [ ] **Step 2: Migrate `framer-motion` imports → `motion/react`**

Magic UI components are written for `framer-motion`. We use the renamed `motion` package. Run:

```bash
find src/components/magicui -type f -name "*.tsx" -print0 \
  | xargs -0 sed -i 's|"framer-motion"|"motion/react"|g'
```

Verify with: `grep -rn "framer-motion" src/components/magicui/` — should return nothing.

- [ ] **Step 3: Verify build passes**

Run: `bun run typecheck`

Expected: errors related to existing components (Phase 2 fixes them), but NO errors from `src/components/magicui/`. Magic UI components should typecheck clean.

## Task 1.10: Customize Magic UI tokens

**Files:** Modify each file in `src/components/magicui/`

- [ ] **Step 1: AnimatedBeam — set default gradient stops**

Open `src/components/magicui/animated-beam.tsx`. Find the props interface and the default `gradientStartColor` / `gradientStopColor`. Change defaults to our brand stops:

```tsx
gradientStartColor = "#94A4E2",  // brand-300
gradientStopColor  = "#2642A9",  // brand-700
```

Find any `motion.svg` or `motion.path` `transition` prop. Change `bounce` references to `0`.

- [ ] **Step 2: BorderBeam — brand colors and 8s duration default**

Open `src/components/magicui/border-beam.tsx`. Set defaults:

```tsx
duration = 8,
colorFrom = "#94A4E2",  // brand-300
colorTo   = "#2642A9",  // brand-700
```

- [ ] **Step 3: MagicCard — spotlight color**

Open `src/components/magicui/magic-card.tsx`. Find the spotlight/gradient color and replace with `var(--brand-soft)`. The exact prop varies by Magic UI version — search for `gradientColor`, `spotlightColor`, or similar.

- [ ] **Step 4: DotPattern, GridPattern, AnimatedGridPattern — pattern color**

Each pattern component has a fill or stroke color prop. Default it to `var(--pattern-color)` (defined in `globals.css`). Look for `cx`, `cy`, `fill`, or `className` defaults.

If the default uses Tailwind class names like `fill-neutral-400/30`, replace with: `fill-[var(--pattern-color)]`.

- [ ] **Step 5: BlurFade — verify `useReducedMotion` integration**

Open `src/components/magicui/blur-fade.tsx`. Confirm it imports `useReducedMotion` from `motion/react`. If not, add:

```tsx
import { useReducedMotion } from "motion/react";

// inside the component:
const prefersReduced = useReducedMotion();
const blur = prefersReduced ? "0px" : "6px";
```

- [ ] **Step 6: Marquee — pause-on-hover and reduced-motion fallback**

Open `src/components/magicui/marquee.tsx`. Add a `pauseOnHover` prop (default `true`) wired to a CSS class that pauses the animation on `:hover`. Add a reduced-motion check that disables the animation entirely.

## Task 1.11: Build a temporary `/__styles` route to verify tokens

**Files:** Create `src/app/styles/StylesPreview.tsx`, Modify `src/config/routes.tsx`

- [ ] **Step 1: Create `src/app/styles/StylesPreview.tsx`**

```tsx
// src/app/styles/StylesPreview.tsx
// Temporary token-system preview. Delete this file before merging Phase 2.
import { DotPattern } from "@/components/magicui/dot-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function StylesPreview() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-[length:var(--text-display-xl)] font-semibold leading-none tracking-tight">
        Tokens preview
      </h1>

      <section className="mt-8 grid grid-cols-11 gap-2">
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((s) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <div
              className="h-12 w-12 rounded-md"
              style={{ background: `var(--color-brand-${s})` }}
            />
            <span className="font-[family-name:var(--font-mono)] text-xs">{s}</span>
          </div>
        ))}
      </section>

      <section className="relative mt-8 h-48 overflow-hidden rounded-lg border border-[var(--border)]">
        <DotPattern className="absolute inset-0" />
        <div className="relative p-6">DotPattern at 4% opacity (default)</div>
      </section>

      <section className="mt-8 grid grid-cols-3 gap-4">
        <MagicCard className="rounded-lg border border-[var(--border)] p-6">
          MagicCard with cursor spotlight
        </MagicCard>
        <div className="relative rounded-lg border border-[var(--border)] p-6">
          BorderBeam on perimeter
          <BorderBeam />
        </div>
        <BlurFade delay={0.2}>
          <div className="rounded-lg border border-[var(--border)] p-6">
            BlurFade reveal (delay 0.2s)
          </div>
        </BlurFade>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Wire the route in `src/config/routes.tsx`**

Open `src/config/routes.tsx`. Add to the `ROUTES` array temporarily:

```tsx
import StylesPreview from "@/app/styles/StylesPreview";
// ... existing imports ...

export const ROUTES: RouteConfig[] = [
  // ... existing routes ...
  {
    path: "/__styles",
    label: "__styles",
    icon: Home, // doesn't matter, hidden
    element: <StylesPreview />,
    showInNav: false,
  },
];
```

- [ ] **Step 3: Verify in browser**

Run `bun run dev` and visit `http://localhost:5173/__styles`.

Expected:
- Brand palette swatches 50→950 displayed in order, hue shifts smoothly
- DotPattern visible at low opacity
- MagicCard responds to mouse hover with subtle spotlight
- BorderBeam rotates around its container
- BlurFade reveals after 0.2s on load
- Geist Variable font visible (not system font)

If anything looks off, fix before committing.

- [ ] **Step 4: Stop dev server**

## Task 1.12: Commit Phase 1

- [ ] **Step 1: Stage and commit**

```bash
git add -A
git commit -m "feat(design): foundational visual system

- globals.css with @theme tokens (brand palette 50-950, type scale, radii)
- Geist Sans + Mono via @fontsource-variable
- lib/utils.ts (cn helper) and lib/motion.ts (spring/ease/duration presets)
- hooks: use-reduced-motion, use-scroll-progress, use-section-spy
- shadcn init for Magic UI registry support
- 10 Magic UI components vendored under src/components/magicui/
- Magic UI imports migrated framer-motion → motion/react
- Magic UI defaults customized to brand-300/500/700 stops, --pattern-color
- Tailwind 4 via @tailwindcss/vite; legacy tailwind.config.js + postcss.config.js removed
- Temporary /__styles preview route (deleted in Phase 2)

Per DESIGN.md §4, §10, §11.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 2 — Demolition + branding sweep (1-2 hours)

Goal: Remove all dead code (blog, packages, particle bg, glass-morphism), rename brand throughout, and establish content modules. The build will be temporarily broken mid-phase but green by the end.

## Task 2.1: Delete blog and packages directories

**Files:** Delete entire directories

- [ ] **Step 1: Remove blog and packages**

```bash
rm -rf src/components/blog
rm -rf src/components/packages
rm -f src/utils/blog.ts
rm -rf public/blog
rm -f public/Logan.jpg
rm -f BLOG_SETUP.md
```

## Task 2.2: Delete obsolete UI components

**Files:** Delete files

- [ ] **Step 1: Remove components**

```bash
rm -f src/components/ui/FrostedCard.tsx
rm -f src/components/ui/BloomBackground.tsx
rm -f src/components/ui/CollapsibleSection.tsx
rm -f src/components/ui/GridBackground.tsx
rm -f src/components/about/AboutSection.tsx
rm -f src/components/home/HeroSection.tsx
```

## Task 2.3: Delete temporary styles preview

**Files:** Delete `src/app/styles/StylesPreview.tsx`, Modify `src/config/routes.tsx`

- [ ] **Step 1: Remove the styles preview file**

```bash
rm -rf src/app/styles
```

- [ ] **Step 2: Remove the `/__styles` route from `src/config/routes.tsx`**

Edit `src/config/routes.tsx` and remove the `StylesPreview` import + the `/__styles` route entry. The next task will rewrite this file fully, so you can simply over-prepare.

## Task 2.4: Simplify routes config

**Files:** Modify `src/config/routes.tsx`

- [ ] **Step 1: Replace the file**

```tsx
// src/config/routes.tsx
import HomePage from "@/app/home/HomePage";
import ContactPage from "@/app/contact/ContactPage";
import { Home, Mail, type LucideIcon } from "lucide-react";
import type { ReactElement } from "react";

export interface RouteConfig {
  path: string;
  label: string;
  icon: LucideIcon;
  element: ReactElement;
  showInNav: boolean;
}

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    icon: Home,
    element: <HomePage />,
    showInNav: false, // navigation uses anchor links to homepage sections
  },
  {
    path: "/contact",
    label: "Contact",
    icon: Mail,
    element: <ContactPage />,
    showInNav: true,
  },
];

/** Section anchors used by the Header for scrollspy + nav. */
export const HOMEPAGE_SECTIONS = [
  { id: "capabilities", label: "Capabilities" },
  { id: "how", label: "How" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
] as const;
```

This file imports `HomePage` and `ContactPage` which don't exist yet — that's fine, Phase 3 creates them. Build will fail until Phase 3 is done.

## Task 2.5: Create `src/content/site.ts` with BRAND

**Files:** Create `src/content/site.ts`

- [ ] **Step 1: Create the file**

Per DESIGN.md §8.1:

```ts
// src/content/site.ts
import githubIcon from "@/assets/github.svg";
import linkedinIcon from "@/assets/linkedin.svg";

export const BRAND = {
  full: "Junction Technologies LTD.",
  short: "Junction",
  legalSuffix: "LTD.",
  // Resolved 2026-04-23 (HANDOFF.md): domain stays junction-technologies.com,
  // contact moves to brand-domain inbox.
  domain: "junction-technologies.com",
  contactEmail: "sam@junction-technologies.com",
  founded: 2024,
  founder: {
    name: "Sam Warren",
    title: "Founder & Principal Engineer",
    location: "Victoria, BC",
  },
} as const;

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/sam-warren/junction",
    icon: githubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/junctiontech",
    icon: linkedinIcon,
  },
] as const;

export const COPY = {
  hero: {
    eyebrow: "Junction Technologies",
    // PLACEHOLDER (DESIGN.md Risk #7) — confirm during user review or in Phase 5.
    headline: "Modernize without rewriting.",
    sub: "Junction is an independent software consultancy that bridges legacy systems with modern technology — without forcing a rebuild.",
    primaryCta: "Start a project",
    secondaryCta: "See our work",
  },
  cta: {
    headline: "Let's build something.",
    sub: "Free 30-minute consult. No deck, no pitch — just a conversation about what you're building.",
    primary: "Start a project",
    secondaryLabel: "or email",
  },
  about: {
    eyebrow: "About",
    title: "Junction",
    company:
      "Junction Technologies LTD. is an independent software consultancy. We design and build integrations and applications that connect legacy systems with modern stacks — for governments, enterprises, and the engineering teams that maintain them.",
    founderBio:
      "Sam Warren is a senior full-stack engineer with seven years building public-sector software in Canada. UVic Software Engineering grad. Has shipped to BC Justice, BC Health, and BC Public Safety in roles spanning frontend, backend, and DevOps.",
    facts: [
      { label: "Based in", value: "Victoria, BC" },
      { label: "Founded", value: "2024" },
      { label: "Specialty", value: "Legacy ↔ modern integration" },
    ] as const,
  },
  work: {
    eyebrow: "Selected work",
    title: "Where we've shipped.",
  },
  capabilities: {
    eyebrow: "What we do",
    title: "Capabilities",
  },
  convergence: {
    eyebrow: "How we connect systems",
    title: "We Build Interfaces.",
  },
  stack: {
    eyebrow: "Stack",
  },
} as const;
```

## Task 2.6: Update `src/config/constants.ts` to re-export from content

**Files:** Modify `src/config/constants.ts`

- [ ] **Step 1: Replace contents**

```ts
// src/config/constants.ts
// Back-compat re-exports — prefer importing from "@/content/site" directly in new code.
export { SOCIAL_LINKS, BRAND } from "@/content/site";
```

## Task 2.7: Update `index.html` for new brand

**Files:** Modify `index.html`

- [ ] **Step 1: Replace contents**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Junction Technologies LTD. — independent software consultancy bridging legacy systems with modern technology."
    />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://junction-technologies.com/" />
    <meta property="og:title" content="Junction Technologies LTD." />
    <meta
      property="og:description"
      content="Independent software consultancy bridging legacy systems with modern technology."
    />
    <meta property="og:image" content="https://junction-technologies.com/og-image.png" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://junction-technologies.com/" />
    <meta property="twitter:title" content="Junction Technologies LTD." />
    <meta
      property="twitter:description"
      content="Independent software consultancy bridging legacy systems with modern technology."
    />
    <meta property="twitter:image" content="https://junction-technologies.com/og-image.png" />

    <title>Junction Technologies LTD.</title>
  </head>
  <body class="dark">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
<script>
  // Theme persistence + system fallback. Default is dark.
  (function () {
    var stored = localStorage.theme;
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    var useLight = stored === "light" || (!stored && prefersLight);
    document.documentElement.classList.toggle("light", useLight);
    document.documentElement.classList.toggle("dark", !useLight);
    // Keep <body> in sync with <html> for our token vars.
    document.body.classList.toggle("light", useLight);
    document.body.classList.toggle("dark", !useLight);
  })();
</script>
```

## Task 2.8: Rewrite `README.md`

**Files:** Modify `README.md`

- [ ] **Step 1: Replace contents**

```md
# Junction Technologies LTD.

Marketing site for Junction Technologies LTD. — an independent software consultancy bridging legacy systems with modern technology.

## Stack

- React 19 + TypeScript 5.7 + Vite 7
- Tailwind CSS 4 (CSS-first config in `src/globals.css`)
- Magic UI components (vendored under `src/components/magicui/`)
- `motion` v12 for animations
- React Router DOM v7
- Vercel for hosting + Resend for the contact form

## Architecture

```
src/
  app/                    page-level orchestration
    home/HomePage.tsx     composes 7 homepage sections
    home/sections/        Hero, Capabilities, Convergence, Work,
                          StackMarquee, About, CTA
    contact/              ContactPage + ContactForm
  components/
    layout/               Header (scroll-aware), Footer (in-flow), Layout
    magicui/              vendored Magic UI primitives
    ui/                   our reusable primitives (BrandMark, Button, ...)
  content/                typed copy modules — edit these to change content
  hooks/                  small one-purpose hooks
  lib/                    utils.ts (cn helper), motion.ts (motion presets)
  config/                 routes
```

## Development

```bash
bun install
bun run dev       # dev server at http://localhost:5173
bun run build     # production build
bun run typecheck
bun run lint
bun run test      # smoke tests
```

## Editing content

All copy is in `src/content/`:

- `site.ts` — brand, contact info, hero/CTA/about copy
- `capabilities.ts` — the "What we do" cards
- `case-studies.ts` — the Work section (add new entries here)
- `tech-stack.ts` — logos shown in the Stack marquee + Convergence diagram

## Deployment

Configured for Vercel. The `vercel.json` SPA rewrites and `/api/contact` Resend handler in `api/contact.mjs` deploy as-is.

Required env vars (set in Vercel dashboard):
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_EMAIL`

## License

MIT — see `LICENSE`.
```

## Task 2.9: Verify the build is now reproducibly broken (expected)

- [ ] **Step 1: Run typecheck**

Run: `bun run typecheck`

Expected errors only:
- Routes file imports `HomePage` and `ContactPage` from `@/app/home/HomePage` and `@/app/contact/ContactPage` — these don't exist yet (Phase 3 creates them).
- `src/components/layout/Header.tsx`, `Footer.tsx`, `Layout.tsx` may reference deleted components (`Logo`, etc.) — Phase 3 rewrites them.

Anything else means the demolition wasn't clean. Investigate.

## Task 2.10: Commit Phase 2

- [ ] **Step 1: Stage and commit**

```bash
git add -A
git commit -m "refactor: drop blog/packages, rebrand to Junction Technologies LTD.

- Delete src/components/blog/, packages/, about/AboutSection, home/HeroSection
- Delete ui/FrostedCard, BloomBackground, CollapsibleSection, GridBackground
- Delete public/blog/, public/Logan.jpg, BLOG_SETUP.md
- Routes simplified to '/' and '/contact' (anchor nav for sections)
- src/content/site.ts establishes BRAND constant + COPY namespace
- index.html, README.md updated for new brand
- src/config/constants.ts re-exports from content/site for back-compat

Build will be broken until Phase 3 creates HomePage/ContactPage shells.

Per DESIGN.md §5.2, §8.5.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 3 — Layout reset (2-3 hours)

Goal: Header, Footer, Layout rewritten. App shell renders empty `HomePage` and `ContactPage`. Build is green again by end of phase.

## Task 3.1: Create `src/components/ui/brand-mark.tsx`

**Files:** Create `src/components/ui/brand-mark.tsx`, Delete `src/components/ui/Logo.tsx`

- [ ] **Step 1: Create the new component**

```tsx
// src/components/ui/brand-mark.tsx
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  /**
   * - "static": render the SVG immediately, no animation
   * - "draw": animate the strokes drawing on mount (one-shot)
   * - "loop": continuously redraw on a 12s loop (used in Convergence section)
   */
  variant?: "static" | "draw" | "loop";
  className?: string;
  /** Tailwind size classes; default scales for header use. */
  size?: string;
}

const PATHS = [
  "M15,50 L95,50",
  "M15,20 L55,20 L70,50",
  "M15,80 L55,80 L70,50",
];

export function BrandMark({
  variant = "static",
  className,
  size = "h-6 w-auto sm:h-7 md:h-8 lg:h-9",
}: BrandMarkProps) {
  const [drawn, setDrawn] = useState(variant !== "draw");

  useEffect(() => {
    if (variant !== "draw") return;
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, [variant]);

  const dashLengths = [120, 100, 100];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn(size, className)}
      aria-label="Junction"
    >
      {PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={dashLengths[i]}
          strokeDashoffset={drawn ? 0 : dashLengths[i]}
          style={{
            transition: variant === "draw" ? "stroke-dashoffset 1.4s ease 0.1s" : undefined,
            animation:
              variant === "loop"
                ? `brand-mark-loop 12s ease-in-out infinite ${i * 0.3}s`
                : undefined,
          }}
        />
      ))}
      {variant === "loop" && (
        <style>{`
          @keyframes brand-mark-loop {
            0% { stroke-dashoffset: ${dashLengths[0]}; }
            30%, 80% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: ${dashLengths[0]}; }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes brand-mark-loop { from, to { stroke-dashoffset: 0; } }
          }
        `}</style>
      )}
    </svg>
  );
}
```

- [ ] **Step 2: Delete old Logo file**

```bash
rm -f src/components/ui/Logo.tsx
```

## Task 3.2: Create `src/components/ui/button.tsx`

**Files:** Create `src/components/ui/button.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";

const buttonStyles = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[background-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-brand-400)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-700)] text-white hover:bg-[var(--color-brand-600)] hover:shadow-[var(--brand-glow)] active:bg-[var(--color-brand-800)]",
        ghost:
          "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-1)] hover:border-[var(--border-strong)]",
        link:
          "text-[var(--color-brand-300)] underline-offset-4 hover:text-[var(--color-brand-200)] hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-[length:var(--text-body-sm)]",
        md: "h-11 px-5 text-[length:var(--text-body)]",
        lg: "h-14 px-7 text-[length:var(--text-body-lg)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  withBorderBeam?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, withBorderBeam, iconLeft, iconRight, children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(buttonStyles({ variant, size }), "group overflow-hidden", className)}
      {...props}
    >
      {iconLeft}
      <span className="relative z-10">{children}</span>
      {iconRight}
      {withBorderBeam && (
        <BorderBeam
          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </button>
  ),
);
Button.displayName = "Button";
```

## Task 3.3: Restyle ThemeToggle

**Files:** Modify `src/components/ui/ThemeToggle.tsx`

- [ ] **Step 1: Replace contents**

```tsx
// src/components/ui/ThemeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SPRING } from "@/lib/motion";

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
    document.body.classList.toggle("dark", next);
    document.body.classList.toggle("light", !next);
    localStorage.theme = next ? "dark" : "light";
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-md text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)] hover:bg-[var(--surface-1)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-400)] focus-visible:outline-offset-2",
        className,
      )}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        className="absolute inset-0 grid place-items-center"
        initial={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
        transition={SPRING.default}
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </motion.span>
    </button>
  );
}

export default ThemeToggle;
```

## Task 3.4: Rewrite Header

**Files:** Modify `src/components/layout/Header.tsx`

- [ ] **Step 1: Replace contents**

```tsx
// src/components/layout/Header.tsx
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useSectionSpy } from "@/hooks/use-section-spy";
import { HOMEPAGE_SECTIONS } from "@/config/routes";
import { BRAND } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollProgress(80);
  const sectionIds = HOMEPAGE_SECTIONS.map((s) => s.id);
  const activeSection = useSectionSpy(sectionIds);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-200",
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--canvas)]/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 text-[var(--text-primary)]">
            <BrandMark variant="static" />
            <span className="text-lg font-semibold tracking-tight sm:text-xl">{BRAND.short}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {isHome &&
              HOMEPAGE_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn(
                    "relative px-3 py-2 text-[length:var(--text-body-sm)] font-medium transition-colors duration-200",
                    activeSection === s.id
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {s.label}
                  {activeSection === s.id && (
                    <motion.span
                      layoutId="header-active-underline"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--color-brand-400)]"
                    />
                  )}
                </a>
              ))}
            {!isHome && (
              <NavLink
                to="/"
                className="px-3 py-2 text-[length:var(--text-body-sm)] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Home
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden sm:block">
              <Button size="sm" withBorderBeam iconRight={<ArrowRight className="h-4 w-4" />}>
                Start a project
              </Button>
            </Link>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-[0.96] md:hidden"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute right-0 top-0 h-full w-72 border-l border-[var(--border)] bg-[var(--surface-1)] p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            >
              <nav className="mt-12 flex flex-col gap-2">
                {(isHome ? HOMEPAGE_SECTIONS : []).map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-md px-3 py-3 text-[length:var(--text-body)] font-medium text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
                    onClick={() => setOpen(false)}
                  >
                    {s.label}
                  </a>
                ))}
                <Link
                  to="/contact"
                  className="rounded-md px-3 py-3 text-[length:var(--text-body)] font-medium text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
                >
                  Contact
                </Link>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

## Task 3.5: Rewrite Footer

**Files:** Modify `src/components/layout/Footer.tsx`

- [ ] **Step 1: Replace contents**

```tsx
// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { BrandMark } from "@/components/ui/brand-mark";
import { BRAND, SOCIAL_LINKS } from "@/content/site";
import { HOMEPAGE_SECTIONS } from "@/config/routes";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-3 lg:px-8">
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2 text-[var(--text-primary)]">
            <BrandMark variant="static" size="h-6 w-auto" />
            <span className="text-base font-semibold tracking-tight">{BRAND.short}</span>
          </Link>
          <p className="text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
            {BRAND.full}
          </p>
        </div>

        <nav className="flex flex-col gap-2 lg:items-center lg:justify-self-center">
          <span className="text-[length:var(--text-mono-sm)] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--text-tertiary)]">
            Pages
          </span>
          {HOMEPAGE_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              className="text-[length:var(--text-body-sm)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {s.label}
            </a>
          ))}
          <Link
            to="/contact"
            className="text-[length:var(--text-body-sm)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex flex-col gap-3 lg:items-end">
          <span className="text-[length:var(--text-mono-sm)] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--text-tertiary)]">
            Elsewhere
          </span>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="grid h-10 w-10 place-items-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]"
              >
                <img src={link.icon} alt="" className="h-5 w-5 dark:invert" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--border)] px-6 pt-6 lg:px-8">
        <p className="text-center text-[length:var(--text-mono-sm)] font-[family-name:var(--font-mono)] text-[var(--text-tertiary)]">
          © {year} {BRAND.full}
        </p>
      </div>
    </footer>
  );
}
```

## Task 3.6: Rewrite Layout (in-flow, no fixed wrapper)

**Files:** Modify `src/components/layout/Layout.tsx`

- [ ] **Step 1: Replace contents**

```tsx
// src/components/layout/Layout.tsx
import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">{children}</main>
      <Footer />
    </>
  );
}
```

The `pt-16 lg:pt-20` offsets the page content past the fixed header height.

## Task 3.7: Create HomePage shell

**Files:** Create `src/app/home/HomePage.tsx`

- [ ] **Step 1: Create the shell**

```tsx
// src/app/home/HomePage.tsx
export default function HomePage() {
  return (
    <>
      {/* Sections added in Phases 5-11 */}
      <section id="hero" className="grid min-h-[80vh] place-items-center">
        <h1 className="text-[length:var(--text-display-xl)] font-semibold tracking-tight">
          (Hero — Phase 5)
        </h1>
      </section>
      <section id="capabilities" className="min-h-[60vh]" />
      <section id="how" className="min-h-[60vh]" />
      <section id="work" className="min-h-[60vh]" />
      <section id="stack" className="min-h-[40vh]" />
      <section id="about" className="min-h-[60vh]" />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
```

## Task 3.8: Create ContactPage shell

**Files:** Create `src/app/contact/ContactPage.tsx`

- [ ] **Step 1: Create the shell**

```tsx
// src/app/contact/ContactPage.tsx
export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 lg:py-32">
      <h1 className="text-[length:var(--text-display-xl)] font-semibold tracking-tight">
        (Contact — Phase 12)
      </h1>
    </section>
  );
}
```

## Task 3.9: Verify the shell renders

- [ ] **Step 1: Run typecheck**

Run: `bun run typecheck`

Expected: clean, no errors.

- [ ] **Step 2: Run dev server**

Run: `bun run dev`

Visit `http://localhost:5173/`. Expected:
- Header visible at top with `Junction` brandmark, no nav highlight (sections are empty)
- "Hero — Phase 5" placeholder text in display-xl
- Footer visible at bottom with three columns
- Theme toggle works (click → light theme inverts colors)
- Header bg becomes blurred when scrolling past 80px

Visit `http://localhost:5173/contact`. Expected:
- "Contact — Phase 12" placeholder
- Header still functional, theme toggle works

- [ ] **Step 3: Stop dev server**

## Task 3.10: Commit Phase 3

- [ ] **Step 1: Stage and commit**

```bash
git add -A
git commit -m "feat(layout): in-flow layout, scroll-aware header, anchor nav

- Layout: removed fixed-header/fixed-footer wrapper; now standard flow
- Header: scroll-aware backdrop-blur, anchor nav with scrollspy via
  useScrollProgress + useSectionSpy hooks; primary CTA + theme toggle
- Footer: in-flow three-column layout (brand, page nav, social)
- BrandMark component (replaces Logo) with static/draw/loop variants
- Button component with primary/ghost/link variants via cva, optional BorderBeam
- ThemeToggle restyled with Sun/Moon cross-fade per make-interfaces-feel-better §7
- HomePage and ContactPage shells with section anchors

Per DESIGN.md §5.3, §5.4, §7.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 4 — Content modules (1 hour)

Goal: All typed content modules in `src/content/` populated. No component changes — just data.

## Task 4.1: Create `src/content/capabilities.ts`

**Files:** Create `src/content/capabilities.ts`

- [ ] **Step 1: Create the file (exact contents per DESIGN.md §8.2)**

```ts
// src/content/capabilities.ts
import { Brain, Cloud, Code2, Network, RefreshCw, type LucideIcon } from "lucide-react";

export interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** True for the 2-col-spanning feature card on desktop. */
  feature?: boolean;
}

export const CAPABILITIES: CapabilityCard[] = [
  {
    id: "system-integration",
    title: "System Integration",
    description:
      "Connect legacy systems to modern stacks without rebuilding from scratch. Junction designs the integration layer that lets your existing tools talk to new ones — REST, GraphQL, message queues, identity bridges, custom protocols.",
    icon: Network,
    feature: true,
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description: "Bespoke web and internal tools, from spec to ship. End-to-end ownership of design, implementation, and delivery.",
    icon: Code2,
  },
  {
    id: "modernization",
    title: "Modernization",
    description: "Refactor and migrate aging codebases incrementally. Modernize the parts that matter without rewriting the parts that don't.",
    icon: RefreshCw,
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Infrastructure, CI/CD, observability. We deploy on AWS, Azure, GCP, Vercel, and on-prem OpenShift.",
    icon: Cloud,
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Embed LLMs into existing workflows. We build production AI features — agents, RAG, structured extraction — that integrate with your data and tools.",
    icon: Brain,
  },
];
```

## Task 4.2: Create `src/content/case-studies.ts`

**Files:** Create `src/content/case-studies.ts`

- [ ] **Step 1: Create the file**

```ts
// src/content/case-studies.ts
export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  year: string;
  outcome: string;
  description?: string;
  tech: string[];
  cover?: string;
  link?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "bc-justice-devops",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Justice and Public Sector DevOps",
    year: "2018–2024",
    outcome:
      "Application management for a dozen public-facing apps including liquor licensing, disaster assistance, and victim services.",
    tech: ["Angular", "TypeScript", ".NET", "Dynamics", "OpenShift", "Docker", "Kubernetes"],
  },
  {
    slug: "road-safety-initiative",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Road Safety Initiative",
    year: "2020–2022",
    outcome:
      "Digitized paper forms for RCMP and BC police, streamlining roadside prohibitions with seamless legacy integration.",
    tech: ["React", "Redux", "TypeScript", "Python", "PostgreSQL", "OpenShift"],
  },
  {
    slug: "health-gateway",
    client: "BC Ministry of Health",
    title: "Health Gateway",
    year: "2019–2021",
    outcome:
      "Cross-sector health information platform giving BC residents secure access to their health records.",
    tech: ["Vue.js", "TypeScript", ".NET", "PostgreSQL", "OpenShift"],
  },
  // PLACEHOLDER (DESIGN.md Risk #3): add new case studies here. Empty-state
  // logic in Work.tsx renders "More case studies coming soon" if length < 3.
];
```

## Task 4.3: Create `src/content/tech-stack.ts`

**Files:** Create `src/content/tech-stack.ts`

- [ ] **Step 1: Create the file**

```ts
// src/content/tech-stack.ts
//
// Tech logos for the Stack marquee + the Convergence diagram.
// Existing SVG icon assets ship in src/assets/ (already imported by the
// previous AboutSection — we keep using them).
import angularIcon from "@/assets/angular.svg";
import azureIcon from "@/assets/azure.svg";
import dockerIcon from "@/assets/docker.svg";
import dotnetIcon from "@/assets/dotnet.svg";
import dynamicsIcon from "@/assets/dynamics.svg";
import gitIcon from "@/assets/git.svg";
import graphqlIcon from "@/assets/graphql.svg";
import kubernetesIcon from "@/assets/kubernetes.svg";
import mongoIcon from "@/assets/mongodb.svg";
import muiIcon from "@/assets/mui.svg";
import mysqlIcon from "@/assets/mysql.svg";
import nextjsIcon from "@/assets/nextjs.svg";
import nodeIcon from "@/assets/node.svg";
import openshiftIcon from "@/assets/openshift.svg";
import postgresIcon from "@/assets/postgresql.svg";
import pythonIcon from "@/assets/python.svg";
import reactIcon from "@/assets/react.svg";
import reduxIcon from "@/assets/redux.svg";
import shadcnIcon from "@/assets/shadcn.svg";
import supabaseIcon from "@/assets/supabase.svg";
import tailwindIcon from "@/assets/tailwind.svg";
import tanstackIcon from "@/assets/tanstack.svg";
import typescriptIcon from "@/assets/typescript.svg";
import vercelIcon from "@/assets/vercel.svg";
import vueIcon from "@/assets/vue.svg";

export type TechCategory = "frontend" | "backend" | "database" | "devops" | "ai" | "legacy";

export interface Tech {
  name: string;
  icon: string;
  href?: string;
  category: TechCategory;
}

export const TECH_STACK: Tech[] = [
  { name: "React", icon: reactIcon, category: "frontend", href: "https://react.dev/" },
  { name: "Next.js", icon: nextjsIcon, category: "frontend", href: "https://nextjs.org/" },
  { name: "Vue.js", icon: vueIcon, category: "frontend", href: "https://vuejs.org/" },
  { name: "Angular", icon: angularIcon, category: "legacy", href: "https://angular.io/" },
  { name: "TypeScript", icon: typescriptIcon, category: "frontend", href: "https://www.typescriptlang.org/" },
  { name: "Tailwind CSS", icon: tailwindIcon, category: "frontend", href: "https://tailwindcss.com/" },
  { name: "shadcn/ui", icon: shadcnIcon, category: "frontend", href: "https://ui.shadcn.com/" },
  { name: "TanStack", icon: tanstackIcon, category: "frontend", href: "https://tanstack.com/" },
  { name: "Redux", icon: reduxIcon, category: "frontend", href: "https://redux.js.org/" },
  { name: "Material UI", icon: muiIcon, category: "frontend", href: "https://mui.com/" },
  { name: "Node.js", icon: nodeIcon, category: "backend", href: "https://nodejs.org/" },
  { name: ".NET", icon: dotnetIcon, category: "legacy", href: "https://dotnet.microsoft.com/" },
  { name: "Python", icon: pythonIcon, category: "backend", href: "https://www.python.org/" },
  { name: "GraphQL", icon: graphqlIcon, category: "backend", href: "https://graphql.org/" },
  { name: "PostgreSQL", icon: postgresIcon, category: "database", href: "https://www.postgresql.org/" },
  { name: "Supabase", icon: supabaseIcon, category: "database", href: "https://supabase.com/" },
  { name: "MySQL", icon: mysqlIcon, category: "database", href: "https://www.mysql.com/" },
  { name: "MongoDB", icon: mongoIcon, category: "database", href: "https://www.mongodb.com/" },
  { name: "OpenShift", icon: openshiftIcon, category: "legacy", href: "https://www.openshift.com/" },
  { name: "Microsoft Dynamics", icon: dynamicsIcon, category: "legacy", href: "https://dynamics.microsoft.com/" },
  { name: "Azure", icon: azureIcon, category: "devops", href: "https://azure.microsoft.com/" },
  { name: "Docker", icon: dockerIcon, category: "devops", href: "https://www.docker.com/" },
  { name: "Kubernetes", icon: kubernetesIcon, category: "devops", href: "https://kubernetes.io/" },
  { name: "Vercel", icon: vercelIcon, category: "devops", href: "https://vercel.com/" },
  { name: "Git", icon: gitIcon, category: "devops", href: "https://git-scm.com/" },
];

/** Helper: tech logos by category, used by Convergence + StackMarquee. */
export const techByCategory = (cat: TechCategory) =>
  TECH_STACK.filter((t) => t.category === cat);
```

If any of those `@/assets/*.svg` imports fail (file doesn't exist), check the actual filenames in `src/assets/` and adjust. The original `src/assets/index.ts` has the canonical mapping.

## Task 4.4: Verify the build is green

- [ ] **Step 1: Run typecheck**

Run: `bun run typecheck` — expect clean.

- [ ] **Step 2: Run lint**

Run: `bun run lint` — expect clean.

## Task 4.5: Commit Phase 4

```bash
git add -A
git commit -m "feat(content): typed content modules

- src/content/capabilities.ts: 5 CapabilityCard entries with System
  Integration as the feature card
- src/content/case-studies.ts: 3 ports of existing case studies
  (BC Justice, Road Safety, Health Gateway) typed as CaseStudy[]
- src/content/tech-stack.ts: 25 Tech entries grouped by category for
  Convergence diagram + StackMarquee, sourced from existing svg assets

Per DESIGN.md §8.2, §8.3, §8.4.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 5 — Hero section (1-2 hours)

Goal: Full-viewport hero with `DotPattern` background, BlurFade-staggered copy, dual CTAs, scroll cue, and mouse parallax.

## Task 5.1: Create `src/app/home/sections/Hero.tsx`

**Files:** Create `src/app/home/sections/Hero.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/app/home/sections/Hero.tsx
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  // Mouse-parallax on the dot pattern (desktop only).
  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const node = ref.current;
    if (!node) return;

    function onMove(e: MouseEvent) {
      const rect = node!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setParallax({ x: dx * 4, y: dy * 4 });
    }
    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, [reduced]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden lg:min-h-[calc(100vh-5rem)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%)",
        }}
      >
        <DotPattern className="absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <BlurFade delay={0} inView>
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
            {COPY.hero.eyebrow}
          </p>
        </BlurFade>

        <h1 className="mt-6 text-[length:var(--text-display-xl)] font-semibold leading-[0.95] tracking-tight md:text-[length:var(--text-display-2xl)]">
          <BlurFade delay={0.1} inView>
            <span className="block">{COPY.hero.headline}</span>
          </BlurFade>
        </h1>

        <BlurFade delay={0.3} inView>
          <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] text-[var(--text-secondary)]">
            {COPY.hero.sub}
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact">
              <Button
                size="lg"
                withBorderBeam
                iconRight={<ArrowRight className="h-5 w-5" />}
              >
                {COPY.hero.primaryCta}
              </Button>
            </Link>
            <a href="#work">
              <Button size="lg" variant="ghost">
                {COPY.hero.secondaryCta}
              </Button>
            </a>
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.6} inView>
        <a
          href="#capabilities"
          aria-label="Scroll to capabilities"
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-tertiary)] transition-opacity duration-300 hover:text-[var(--text-secondary)]",
            scrolled ? "opacity-0" : "opacity-100",
          )}
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </BlurFade>
    </section>
  );
}
```

## Task 5.2: Wire Hero into HomePage

**Files:** Modify `src/app/home/HomePage.tsx`

- [ ] **Step 1: Update HomePage**

```tsx
// src/app/home/HomePage.tsx
import { Hero } from "./sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Sections below added in Phases 6-11 */}
      <section id="capabilities" className="min-h-[60vh]" />
      <section id="how" className="min-h-[60vh]" />
      <section id="work" className="min-h-[60vh]" />
      <section id="stack" className="min-h-[40vh]" />
      <section id="about" className="min-h-[60vh]" />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
```

## Task 5.3: Verify Hero in browser

- [ ] **Step 1: Run dev server**

Run: `bun run dev`. Visit `http://localhost:5173/`.

Expected:
- Hero takes full viewport height (minus header)
- Eyebrow "Junction Technologies" in mono caps, brand-300 color
- Headline "Modernize without rewriting." in display-2xl on desktop
- Sub paragraph in body-lg, secondary text color
- Two CTAs: amber-blue primary + ghost secondary
- DotPattern visible behind text with radial soft-mask
- Scroll cue chevron at bottom, fades after scrolling 100px
- BlurFade entrance choreography on load (~0ms eyebrow → 100ms H1 → 300ms sub → 400ms CTAs → 600ms cue)
- Mouse movement causes pattern to translate ±4px max
- Header backdrop-blur kicks in past 80px

If any element is missing or off, fix before continuing.

- [ ] **Step 2: Toggle reduced-motion in OS settings**

On macOS: System Settings → Accessibility → Display → Reduce motion.
Reload page. Expected: BlurFade reduced to opacity-only, mouse parallax disabled, smooth-scroll disabled.

- [ ] **Step 3: Stop dev server**

## Task 5.4: Commit Phase 5

```bash
git add -A
git commit -m "feat(home): Hero section with DotPattern, BlurFade, parallax

- Full-viewport hero with brand eyebrow, display-2xl headline, lead sub
- Primary CTA (BorderBeam on hover) + ghost CTA
- DotPattern background with radial mask centered on text
- Mouse parallax on pattern (±4px max, desktop only, reduced-motion aware)
- Scroll cue (animated bounce chevron, fades past 100px scroll)
- BlurFade entrance choreography 0/100/300/400/600ms staggers

Per DESIGN.md §6.1.1, §11.2.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 6 — Capabilities section (1-2 hours)

Goal: Bento grid of 5 capability cards with `MagicCard` cursor spotlight, BlurFade staggers, mobile-stacked.

## Task 6.1: Create `src/app/home/sections/Capabilities.tsx`

**Files:** Create `src/app/home/sections/Capabilities.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/app/home/sections/Capabilities.tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { CAPABILITIES } from "@/content/capabilities";
import { COPY } from "@/content/site";
import { cn } from "@/lib/utils";

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BlurFade delay={0} inView>
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
            {COPY.capabilities.eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <h2 className="mt-3 text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
            {COPY.capabilities.title}
          </h2>
        </BlurFade>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <BlurFade key={cap.id} delay={0.15 + i * 0.08} inView>
                <MagicCard
                  className={cn(
                    "group relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] p-8 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]",
                    cap.feature && "lg:col-span-2",
                  )}
                  gradientColor="var(--brand-soft)"
                  gradientOpacity={1}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <Icon
                      className="h-8 w-8 text-[var(--color-brand-300)]"
                      aria-hidden
                    />
                    <h3
                      className={cn(
                        "mt-6 font-semibold tracking-tight",
                        cap.feature
                          ? "text-[length:var(--text-display-md)]"
                          : "text-[length:var(--text-display-md)]",
                      )}
                    >
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-[length:var(--text-body)] text-[var(--text-secondary)]">
                      {cap.description}
                    </p>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

## Task 6.2: Wire Capabilities into HomePage

- [ ] **Step 1: Update `src/app/home/HomePage.tsx`**

```tsx
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <section id="how" className="min-h-[60vh]" />
      <section id="work" className="min-h-[60vh]" />
      <section id="stack" className="min-h-[40vh]" />
      <section id="about" className="min-h-[60vh]" />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
```

## Task 6.3: Verify Capabilities

- [ ] **Step 1: `bun run dev` and visit `/`**

Expected:
- Section visible after Hero with `Capabilities` H2
- 5 cards in a bento layout (System Integration spans 2 cols on desktop, others single)
- Mobile: cards stack single column
- Hover on each card: subtle brand-tinted spotlight follows the cursor
- BlurFade per card with 80ms staggers
- Scrollspy: header `Capabilities` nav anchor highlighted when section in view

- [ ] **Step 2: Stop dev server**

## Task 6.4: Commit Phase 6

```bash
git add -A
git commit -m "feat(home): Capabilities bento section with MagicCard spotlights

- 5 capability cards from src/content/capabilities.ts
- BentoGrid layout with System Integration as 2-col feature card
- MagicCard cursor-tracking spotlight tinted with --brand-soft
- BlurFade staggered entrances (80ms per card)
- Concentric radii: outer rounded-lg, p-8 padding
- Hover: shadow-md → shadow-lg

Per DESIGN.md §6.1.2.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 7 — Convergence diagram (3-4 hours, the signature)

Goal: The signature visual moment — `AnimatedBeam` connecting tech logos through the central BrandMark with a continuous staggered loop.

## Task 7.1: Create `src/components/ui/tech-node.tsx`

**Files:** Create `src/components/ui/tech-node.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/tech-node.tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TechNodeProps {
  name: string;
  icon: string;
  size?: number;
  className?: string;
}

export const TechNode = forwardRef<HTMLDivElement, TechNodeProps>(
  ({ name, icon, size = 80, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative grid place-items-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-1)] shadow-[var(--shadow-md)]",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={name}
      title={name}
    >
      <img
        src={icon}
        alt=""
        className="h-9 w-9 grayscale dark:invert"
        draggable={false}
      />
    </div>
  ),
);
TechNode.displayName = "TechNode";
```

The `grayscale dark:invert` filter renders all logos as monochrome regardless of source colors — keeps the diagram visually unified.

## Task 7.2: Create `src/app/home/sections/Convergence.tsx`

**Files:** Create `src/app/home/sections/Convergence.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/app/home/sections/Convergence.tsx
import { useRef } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BrandMark } from "@/components/ui/brand-mark";
import { TechNode } from "@/components/ui/tech-node";
import { techByCategory } from "@/content/tech-stack";
import { COPY } from "@/content/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Convergence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // 3 legacy + 3 modern. Pick the most recognizable per row.
  const legacy = techByCategory("legacy").slice(0, 3); // .NET, Dynamics, OpenShift
  const modern = [
    techByCategory("frontend").find((t) => t.name === "React")!,
    techByCategory("database").find((t) => t.name === "Supabase")!,
    techByCategory("devops").find((t) => t.name === "Vercel")!,
  ];

  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section
      id="how"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.06}
          duration={3}
          repeatDelay={1}
          className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] absolute inset-0"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <BlurFade delay={0} inView>
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
            {COPY.convergence.eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <h2 className="mt-3 max-w-3xl text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
            {COPY.convergence.title}
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div
            ref={containerRef}
            className="relative mx-auto mt-16 grid h-[480px] max-w-5xl grid-cols-3 items-center gap-8"
          >
            {/* LEFT column — legacy stack */}
            <div className="flex flex-col items-center gap-12">
              {legacy.map((tech, i) => (
                <TechNode
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  ref={(el) => (leftRefs.current[i] = el)}
                />
              ))}
            </div>

            {/* CENTER — BrandMark */}
            <div className="flex justify-center">
              <div
                ref={centerRef}
                className="grid h-32 w-32 place-items-center rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-1)] shadow-[var(--shadow-lg)]"
              >
                <BrandMark
                  variant="loop"
                  size="h-16 w-16"
                  className="text-[var(--color-brand-300)]"
                />
              </div>
            </div>

            {/* RIGHT column — modern stack */}
            <div className="flex flex-col items-center gap-12">
              {modern.map((tech, i) => (
                <TechNode
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  ref={(el) => (rightRefs.current[i] = el)}
                />
              ))}
            </div>

            {/* 6 beams = 3 pairs (left→center, center→right). Pair delays
                stagger the rows so beams overlap continuously. */}
            {[0, 1, 2].map((row) => (
              <div key={row} className="contents">
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={{ current: leftRefs.current[row] }}
                  toRef={centerRef}
                  duration={1.5}
                  delay={row * 0.5}
                  curvature={20}
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={centerRef}
                  toRef={{ current: rightRefs.current[row] }}
                  duration={1.5}
                  delay={row * 0.5}
                  curvature={20}
                />
              </div>
            ))}
          </div>
        </BlurFade>

        {reduced && (
          <p className="mt-6 text-center text-[length:var(--text-body-sm)] text-[var(--text-tertiary)]">
            (Animations disabled per your reduced-motion preference)
          </p>
        )}
      </div>
    </section>
  );
}
```

Notes for the implementer:
- `AnimatedBeam` uses `containerRef` and `fromRef`/`toRef` — pass refs by mutating an array, then constructing inline `{ current: ... }` shapes (or use `useRef` per node for cleaner code, your call)
- The 6 beams render as 3 pairs (L→C, C→R) with staggered `delay` props of `0`, `0.5`, `1` seconds → continuous overlapping flow
- `AnimatedGridPattern` numSquares/duration/repeatDelay are reasonable defaults; tune if visually too busy
- The `reduced` user message is a small UX kindness — optional

## Task 7.3: Mobile responsive layout

**Files:** Modify `src/app/home/sections/Convergence.tsx`

- [ ] **Step 1: Add a mobile branch that rotates layout 90° to vertical**

Wrap the diagram in a responsive container. On mobile (`<768px`), render a simpler vertical layout with 3 beams instead of 6:

Insert above the existing diagram a `useMediaQuery` check OR use a `lg:` breakpoint with two separate layouts:

```tsx
{/* Mobile: vertical stack, 3 single beams */}
<div className="block lg:hidden">
  <div className="flex flex-col items-center gap-6">
    {legacy.map((tech) => (
      <TechNode key={tech.name} name={tech.name} icon={tech.icon} />
    ))}
    <div className="grid h-24 w-24 place-items-center rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] shadow-[var(--shadow-lg)]">
      <BrandMark size="h-12 w-12" className="text-[var(--color-brand-300)]" />
    </div>
    {modern.map((tech) => (
      <TechNode key={tech.name} name={tech.name} icon={tech.icon} />
    ))}
  </div>
</div>

{/* Desktop: 3-col grid with 6 animated beams */}
<div className="hidden lg:block">
  {/* the grid above */}
</div>
```

The mobile layout omits beams to avoid perf issues on lower-end devices and to keep the visual readable on narrow viewports.

## Task 7.4: Wire Convergence into HomePage

- [ ] **Step 1: Update `src/app/home/HomePage.tsx`**

```tsx
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Convergence } from "./sections/Convergence";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Convergence />
      <section id="work" className="min-h-[60vh]" />
      <section id="stack" className="min-h-[40vh]" />
      <section id="about" className="min-h-[60vh]" />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
```

## Task 7.5: Verify Convergence

- [ ] **Step 1: `bun run dev` and visit `/#how`**

Expected:
- Section title "We Build Interfaces."
- 3 left tech nodes (legacy: .NET, Dynamics, OpenShift)
- Central BrandMark in a larger surface tile, monochrome
- 3 right tech nodes (modern: React, Supabase, Vercel)
- 6 animated beams continuously flowing left→center→right with staggered delays — at any moment ~2-3 beams visible in different fade stages
- AnimatedGridPattern background at 6% opacity behind the diagram
- Beams use brand-blue gradient (300→500→700)
- BrandMark has a slow continuous draw-loop (per `variant="loop"`)
- Mobile (resize to <768px): layout switches to vertical stack, no beams
- Reduced-motion: beams render as static lines, GridPattern frozen

- [ ] **Step 2: Cross-check beam rendering**

The trickiest part of this section. If beams aren't visible:
- Check that `containerRef` is passed to the parent grid div
- Check that `fromRef`/`toRef` point to actual DOM nodes (use React DevTools to verify the ref value isn't null at render time)
- Confirm the `AnimatedBeam` component is wrapped inside the same container that has `position: relative` — it draws an absolutely-positioned SVG inside that container

## Task 7.6: Commit Phase 7

```bash
git add -A
git commit -m "feat(home): Convergence diagram — the signature visual

- TechNode component (80x80 surface tile, monochrome via grayscale+invert)
- 3 legacy tech (.NET, Dynamics, OpenShift) → BrandMark center → 3 modern
  tech (React, Supabase, Vercel)
- 6 AnimatedBeams (3 pairs of L→C and C→R) with staggered 0/0.5/1s delays
  for continuous overlapping flow
- AnimatedGridPattern backdrop at 6% opacity with radial mask
- BrandMark with continuous draw-loop variant (12s cycle)
- Mobile: vertical stack with no beams (perf + readability)
- Reduced-motion fallback: static beams, frozen pattern, user message

Per DESIGN.md §6.1.3.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 8 — Work section (2 hours)

Goal: Asymmetric grid of case study cards from `src/content/case-studies.ts`, with `BorderBeam` hover and empty-state.

## Task 8.1: Create `src/components/ui/tech-chip.tsx`

**Files:** Create `src/components/ui/tech-chip.tsx`, Delete `src/components/ui/TechnologyChip.tsx`

- [ ] **Step 1: Create new tech chip**

```tsx
// src/components/ui/tech-chip.tsx
import { cn } from "@/lib/utils";

export interface TechChipProps {
  label: string;
  href?: string;
  className?: string;
}

export function TechChip({ label, href, className }: TechChipProps) {
  const Tag = href ? "a" : "span";
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-xs)] border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1 font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] text-[var(--text-secondary)] transition-colors duration-200",
        href && "hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]",
        className,
      )}
    >
      {label}
    </Tag>
  );
}
```

- [ ] **Step 2: Delete old chip**

```bash
rm -f src/components/ui/TechnologyChip.tsx
```

## Task 8.2: Create `src/app/home/sections/Work.tsx`

**Files:** Create `src/app/home/sections/Work.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/app/home/sections/Work.tsx
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TechChip } from "@/components/ui/tech-chip";
import { CASE_STUDIES, type CaseStudy } from "@/content/case-studies";
import { COPY } from "@/content/site";
import { cn } from "@/lib/utils";

function WorkCard({ study, feature }: { study: CaseStudy; feature?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] p-8 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]",
        feature && "lg:col-span-2",
      )}
    >
      <div className="flex items-baseline justify-between font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)]">
        <span className="text-[var(--color-brand-300)]">{study.client}</span>
        <span className="text-[var(--text-tertiary)]">{study.year}</span>
      </div>
      <h3 className="text-[length:var(--text-display-md)] font-semibold leading-tight tracking-tight">
        {study.title}
      </h3>
      <p className="text-[length:var(--text-body)] text-[var(--text-secondary)]">
        {study.outcome}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {study.tech.slice(0, 5).map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>
      {study.link && (
        <a
          href={study.link}
          className="mt-2 inline-flex items-center gap-1 text-[length:var(--text-body-sm)] text-[var(--color-brand-300)] hover:text-[var(--color-brand-200)]"
        >
          View case study
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
      <BorderBeam className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}

function EmptyCard() {
  return (
    <article className="grid place-items-center rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface-1)] p-8 text-center text-[var(--text-tertiary)]">
      More case studies coming soon.
    </article>
  );
}

export function Work() {
  const studies = CASE_STUDIES;
  const showEmpty = studies.length < 3;
  const [feature, ...rest] = studies;

  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BlurFade delay={0} inView>
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
            {COPY.work.eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <h2 className="mt-3 text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
            {COPY.work.title}
          </h2>
        </BlurFade>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {feature && (
            <BlurFade delay={0.15} inView className="lg:col-span-2">
              <WorkCard study={feature} feature />
            </BlurFade>
          )}
          {rest.map((study, i) => (
            <BlurFade key={study.slug} delay={0.15 + (i + 1) * 0.1} inView>
              <WorkCard study={study} />
            </BlurFade>
          ))}
          {showEmpty && <EmptyCard />}
        </div>
      </div>
    </section>
  );
}
```

## Task 8.3: Wire Work into HomePage

- [ ] **Step 1: Update `src/app/home/HomePage.tsx`**

```tsx
import { Work } from "./sections/Work";
// ... add <Work /> after <Convergence />
```

## Task 8.4: Verify Work

- [ ] **Step 1: `bun run dev` and visit `/#work`**

Expected:
- Section title "Where we've shipped."
- First case study (BC Justice) renders as 2-col feature card
- Other 2 case studies render as standard cards on the right and below
- Each card: client name (mono brand-300) + year (mono tertiary) + title (display-md) + outcome + tech chips
- Hover: shadow lifts, BorderBeam appears on perimeter
- Mobile: stacks single column

## Task 8.5: Commit Phase 8

```bash
git add -A
git commit -m "feat(home): Work section with asymmetric case study grid

- Sourced from src/content/case-studies.ts
- Asymmetric layout: 1 feature card (col-span-2) + standard cards
- WorkCard: client (mono brand) + year (mono tertiary) + title +
  outcome + tech chips + optional View link
- BorderBeam appears on hover (opacity 0 → 100)
- Empty-state card if fewer than 3 case studies
- TechChip primitive (mono font, surface-2 bg, hover lift)
- Old TechnologyChip.tsx deleted

Per DESIGN.md §6.1.4.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 9 — Stack marquee (1 hour)

Goal: Two-row scrolling marquee of monochrome tech logos with soft edge mask and pause-on-hover.

## Task 9.1: Create `src/app/home/sections/StackMarquee.tsx`

**Files:** Create `src/app/home/sections/StackMarquee.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/app/home/sections/StackMarquee.tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { TECH_STACK } from "@/content/tech-stack";
import { COPY } from "@/content/site";

export function StackMarquee() {
  const half = Math.ceil(TECH_STACK.length / 2);
  const top = TECH_STACK.slice(0, half);
  const bottom = TECH_STACK.slice(half);

  return (
    <section id="stack" className="relative overflow-hidden py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BlurFade delay={0} inView>
          <p className="text-center font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
            {COPY.stack.eyebrow}
          </p>
        </BlurFade>
      </div>

      <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee className="[--duration:60s]">
          {top.map((tech) => (
            <a
              key={tech.name}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tech.name}
              className="mx-8 inline-block opacity-40 transition-[opacity,transform] duration-200 hover:scale-[1.04] hover:opacity-100"
            >
              <img src={tech.icon} alt="" className="h-10 w-10 grayscale dark:invert" />
            </a>
          ))}
        </Marquee>
        <Marquee reverse className="mt-6 [--duration:55s]">
          {bottom.map((tech) => (
            <a
              key={tech.name}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tech.name}
              className="mx-8 inline-block opacity-40 transition-[opacity,transform] duration-200 hover:scale-[1.04] hover:opacity-100"
            >
              <img src={tech.icon} alt="" className="h-10 w-10 grayscale dark:invert" />
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
```

The `[--duration:60s]` and `[--duration:55s]` use CSS custom properties on the Marquee — reading the Marquee component to confirm the prop name (`--duration` is standard for Magic UI Marquee).

## Task 9.2: Wire and verify

- [ ] **Step 1: Add to HomePage**

```tsx
import { StackMarquee } from "./sections/StackMarquee";
// ... add <StackMarquee /> after <Work />
```

- [ ] **Step 2: `bun run dev`, visit `/#stack`**

Expected:
- Two rows of tech logos scrolling in opposite directions
- Logos at 40% opacity, monochrome (no color)
- Hover individual logo: opacity 100% + slight scale
- Soft edge masks fading to transparent on left and right

## Task 9.3: Commit Phase 9

```bash
git add -A
git commit -m "feat(home): StackMarquee with bidirectional monochrome tech strip

- Two Marquee rows scrolling in opposite directions
- Tech logos at 40% opacity, grayscale + dark:invert
- Hover: opacity 100, scale 1.04
- Soft edge mask via CSS mask-image

Per DESIGN.md §6.1.5.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 10 — About section (1 hour)

Goal: Two-column about with founder facts; mobile stacked.

## Task 10.1: Create `src/app/home/sections/About.tsx`

**Files:** Create `src/app/home/sections/About.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/app/home/sections/About.tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { COPY, BRAND } from "@/content/site";

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BlurFade delay={0} inView>
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
            {COPY.about.eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <h2 className="mt-3 text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
            {COPY.about.title}
          </h2>
        </BlurFade>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <BlurFade delay={0.2} inView>
            <div className="flex flex-col gap-6 text-[length:var(--text-body-lg)] text-[var(--text-secondary)]">
              <p>{COPY.about.company}</p>
              <p>{COPY.about.founderBio}</p>
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-[auto_1fr] sm:gap-x-6">
              {COPY.about.facts.map((fact) => (
                <div key={fact.label} className="contents">
                  <dt className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                    {fact.label}
                  </dt>
                  <dd className="text-[length:var(--text-body)] text-[var(--text-primary)]">
                    {fact.value}
                  </dd>
                </div>
              ))}
              <div className="contents">
                <dt className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  Founder
                </dt>
                <dd className="text-[length:var(--text-body)] text-[var(--text-primary)]">
                  {BRAND.founder.name}, {BRAND.founder.title}
                </dd>
              </div>
            </dl>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
```

(Founder portrait removed since `Logan.jpg` was deleted; if a portrait is added later it goes here as an `<img>` with subtle outline.)

## Task 10.2: Wire and verify

- [ ] **Step 1: Add to HomePage**

```tsx
import { About } from "./sections/About";
// add after <StackMarquee />
```

- [ ] **Step 2: Verify in browser**

## Task 10.3: Commit Phase 10

```bash
git add -A
git commit -m "feat(home): About section with founder facts

- Two-column on desktop (copy left, facts dl right), stacked on mobile
- Company + founder paragraphs from COPY.about
- Definition list with mono labels in tracked uppercase

Per DESIGN.md §6.1.6.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 11 — CTA section + final homepage assembly (1 hour)

Goal: Centered CTA panel with BorderBeam button. All 7 sections wired into HomePage.

## Task 11.1: Create `src/app/home/sections/CTA.tsx`

**Files:** Create `src/app/home/sections/CTA.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/app/home/sections/CTA.tsx
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { COPY, BRAND } from "@/content/site";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden py-32 lg:py-40"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 50% 40% at 50% 50%, var(--brand-soft), transparent 70%)",
      }}
    >
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <BlurFade delay={0} inView>
          <h2 className="text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
            {COPY.cta.headline}
          </h2>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <p className="mx-auto mt-6 max-w-xl text-[length:var(--text-body-lg)] text-[var(--text-secondary)]">
            {COPY.cta.sub}
          </p>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/contact">
              <Button
                size="lg"
                withBorderBeam
                iconRight={<ArrowRight className="h-5 w-5" />}
              >
                {COPY.cta.primary}
              </Button>
            </Link>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="inline-flex items-center gap-2 text-[length:var(--text-body)] text-[var(--color-brand-300)] underline-offset-4 hover:text-[var(--color-brand-200)] hover:underline"
            >
              <Mail className="h-4 w-4" /> {COPY.cta.secondaryLabel} {BRAND.contactEmail}
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
```

## Task 11.2: Final HomePage assembly

**Files:** Modify `src/app/home/HomePage.tsx`

- [ ] **Step 1: Replace contents**

```tsx
// src/app/home/HomePage.tsx
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Convergence } from "./sections/Convergence";
import { Work } from "./sections/Work";
import { StackMarquee } from "./sections/StackMarquee";
import { About } from "./sections/About";
import { CTA } from "./sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Convergence />
      <Work />
      <StackMarquee />
      <About />
      <CTA />
    </>
  );
}
```

## Task 11.3: Verify full homepage scroll

- [ ] **Step 1: `bun run dev`, scroll through entire page**

Expected:
- Hero → Capabilities → Convergence (with beams) → Work → Stack marquee → About → CTA → Footer
- Scrollspy: nav anchors highlight correctly as sections enter viewport
- All BlurFade entrances trigger on scroll-into-view
- Header backdrop-blur active when scrolled
- Mobile: clean stack with no horizontal overflow
- Console: no errors or warnings

## Task 11.4: Commit Phase 11

```bash
git add -A
git commit -m "feat(home): CTA section + complete homepage assembly

- CTA: centered panel with brand-soft radial background, BorderBeam
  primary button, secondary mailto link
- HomePage composes all 7 sections in order

Per DESIGN.md §6.1.7, §6.1.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 12 — `/contact` page (1-2 hours)

Goal: Restyled contact page with concentric form chrome, brand-400 focus rings, restyled Alert.

## Task 12.1: Restyle Alert

**Files:** Replace `src/components/ui/Alert.tsx`

- [ ] **Step 1: Replace the file**

```tsx
// src/components/ui/Alert.tsx
import { CheckCircle2, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface AlertProps {
  type: "success" | "error";
  message: string;
  onDismiss?: () => void;
}

export default function Alert({ type, message, onDismiss }: AlertProps) {
  const Icon = type === "success" ? CheckCircle2 : XCircle;
  const tone =
    type === "success"
      ? "border-[var(--success)]/40 text-[var(--success)] bg-[color-mix(in_oklab,var(--success)_10%,transparent)]"
      : "border-[var(--danger)]/40 text-[var(--danger)] bg-[color-mix(in_oklab,var(--danger)_10%,transparent)]";

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        className={cn(
          "fixed left-1/2 top-20 z-50 flex max-w-md -translate-x-1/2 items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 shadow-[var(--shadow-lg)]",
          tone,
        )}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <p className="text-[length:var(--text-body-sm)]">{message}</p>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="ml-auto grid h-6 w-6 place-items-center rounded text-current opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Task 12.2: Refactor ContactForm

**Files:** Move `src/components/contact/ContactForm.tsx` → `src/app/contact/ContactForm.tsx` and restyle

- [ ] **Step 1: Create new ContactForm**

Create `src/app/contact/ContactForm.tsx`:

```tsx
// src/app/contact/ContactForm.tsx
import { Loader, Mail, Pencil, UserCircle, XCircle } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import Alert from "@/components/ui/Alert";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}
type FormField = "name" | "email" | "message";
interface FormErrors { name?: string; email?: string; message?: string; }
interface AlertState { type: "success" | "error"; message: string; }

export function ContactForm() {
  const [data, setData] = useState<FormData>({ name: "", email: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  function validate(field: FormField, value: string): string | undefined {
    if (field === "name" && !value.trim()) return "Name is required";
    if (field === "email") {
      if (!value) return "Email is required";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Invalid email address";
    }
    if (field === "message") {
      if (!value.trim()) return "Message is required";
      if (value.length < 10) return "Message must be at least 10 characters";
    }
    return undefined;
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data.honeypot) {
      setAlert({ type: "error", message: "Form submission failed." });
      return;
    }
    const next: FormErrors = {
      name: validate("name", data.name),
      email: validate("email", data.email),
      message: validate("message", data.message),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      });
      const body: { success?: boolean; error?: string } = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed to send message");
      setAlert({ type: "success", message: "Message sent. We'll get back to you within one business day." });
      setData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err) {
      setAlert({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to send message. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    "w-full rounded-[var(--radius-sm)] border bg-[var(--surface-2)] px-4 py-3 text-[length:var(--text-body)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-brand-400)] focus-visible:outline-offset-2";

  return (
    <>
      {alert && <Alert type={alert.type} message={alert.message} onDismiss={() => setAlert(null)} />}

      <form onSubmit={onSubmit} noValidate className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] p-2 shadow-[var(--shadow-md)] lg:p-2">
        <div className="space-y-4 p-6 lg:p-8">
          <input
            type="text"
            name="honeypot"
            value={data.honeypot}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <Field
            label="Name"
            icon={<UserCircle className="h-5 w-5" />}
            error={errors.name}
          >
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={onChange}
              placeholder="Your name"
              className={cn(inputBase, errors.name ? "border-[var(--danger)]" : "border-[var(--border)]")}
            />
          </Field>

          <Field
            label="Email"
            icon={<Mail className="h-5 w-5" />}
            error={errors.email}
          >
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={onChange}
              placeholder="you@example.com"
              className={cn(inputBase, errors.email ? "border-[var(--danger)]" : "border-[var(--border)]")}
            />
          </Field>

          <Field
            label="Message"
            icon={<Pencil className="h-5 w-5" />}
            error={errors.message}
          >
            <textarea
              name="message"
              id="message"
              value={data.message}
              onChange={onChange}
              rows={6}
              placeholder="What are you building? What problem are you trying to solve?"
              className={cn(inputBase, "h-40 resize-none", errors.message ? "border-[var(--danger)]" : "border-[var(--border)]")}
            />
          </Field>

          <div className="pt-2">
            <Button type="submit" disabled={submitting} withBorderBeam className="w-full">
              {submitting ? (
                <span className="inline-flex items-center gap-2"><Loader className="h-5 w-5 animate-spin" /> Sending…</span>
              ) : (
                "Send message"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
        {icon}
        {label}
      </label>
      {children}
      <div
        className={cn(
          "overflow-hidden text-[length:var(--text-body-sm)] text-[var(--danger)] transition-[max-height,opacity] duration-200",
          error ? "max-h-6 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {error && (
          <span className="inline-flex items-center gap-1">
            <XCircle className="h-4 w-4" /> {error}
          </span>
        )}
      </div>
    </div>
  );
}
```

## Task 12.3: Replace ContactPage

**Files:** Modify `src/app/contact/ContactPage.tsx`

- [ ] **Step 1: Replace contents**

```tsx
// src/app/contact/ContactPage.tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { ContactForm } from "./ContactForm";
import { COPY } from "@/content/site";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 lg:py-32 lg:px-8">
      <BlurFade delay={0} inView>
        <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
          Contact
        </p>
      </BlurFade>
      <BlurFade delay={0.1} inView>
        <h1 className="mt-3 text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
          Let's talk.
        </h1>
      </BlurFade>
      <BlurFade delay={0.2} inView>
        <p className="mt-3 text-[length:var(--text-body-lg)] text-[var(--text-secondary)]">
          Drop a note. Replies within one business day.
        </p>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <div className="mt-10">
          <ContactForm />
        </div>
      </BlurFade>
    </section>
  );
}
```

## Task 12.4: Delete old contact form

```bash
rm -f src/components/contact/ContactForm.tsx
rmdir src/components/contact 2>/dev/null || true
```

## Task 12.5: Verify form submission

- [ ] **Step 1: `bun run dev`, visit `/contact`**

Expected:
- Eyebrow "Contact" in mono brand-300
- H1 "Let's talk." in display-xl
- Form panel with concentric chrome (rounded-lg outer, rounded-sm inputs, p-2 outer + p-6/p-8 inner padding)
- Inputs: surface-2 bg, border, focus shows brand-400 outline
- Submit fails validation → inline error appears with smooth height-anim
- Submit succeeds → success Alert appears top-center, form clears
- Mobile: form full-width

If `RESEND_API_KEY` env is unset, the form submission will fail silently — that's expected for local dev.

## Task 12.6: Commit Phase 12

```bash
git add -A
git commit -m "feat(contact): restyled /contact page

- ContactPage with eyebrow + H1 + sub + form
- ContactForm: extracted to src/app/contact, restyled with concentric
  chrome (outer rounded-lg + inner rounded-sm), brand-400 focus rings,
  smooth error reveal
- Alert restyled with success/danger semantic colors and motion entrance
- Old src/components/contact/ContactForm.tsx removed

Per DESIGN.md §6.2.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 13 — Polish pass (2-3 hours)

Goal: Walk the make-interfaces-feel-better checklist top-to-bottom across every component, fix violations, add reduced-motion fallbacks where missing, run Lighthouse, cross-browser test.

## Task 13.1: Run the make-interfaces-feel-better checklist

For each item, audit the new code and fix violations.

- [ ] **Concentric border radii**: every nested rounded element. Form chrome (Phase 12) is a reference example.
- [ ] **Optical icon centering**: spot-check Header brand mark, button icons, social icons. Adjust padding if any look off.
- [ ] **Shadows over borders for elevation**: Cards use `--shadow-md`/`lg`. No 1px solid borders for elevation.
- [ ] **Tabular nums on dynamic numbers**: anywhere a counter, year, or animated number renders, ensure `font-variant-numeric: tabular-nums` (use `.tabular-nums` utility from globals.css).
- [ ] **`text-wrap: balance` on headings**: applied globally on h1-h4 in globals.css. Verify it's not being overridden anywhere.
- [ ] **`text-wrap: pretty` on body**: applied globally on p/li.
- [ ] **`-webkit-font-smoothing: antialiased`**: applied globally.
- [ ] **Image outlines**: applied globally on img. Verify it doesn't make tech-stack logos look "boxed in" (override on `.lucide` if needed; tech-stack uses img tags with grayscale dark:invert — if the outline is visible, override per-image).
- [ ] **Scale on press (`active:scale-[0.96]`)**: Button has it. Verify on Header CTA, ThemeToggle, social links, theme toggle.
- [ ] **`AnimatePresence initial={false}`**: only used in Header mobile menu — confirm it's set to `false`.
- [ ] **No `transition: all`**: search the codebase: `grep -rn "transition: all\|transition-all" src/` should return only intentional uses. We have none.
- [ ] **`will-change` audit**: only on transform/opacity/filter, not `all`. Search: `grep -rn "will-change" src/`.
- [ ] **Min 40×40 hit areas**: Header nav anchors are `px-3 py-2` (~24×40) — extend if needed. Theme toggle is 40×40. Social links in footer are 40×40.

## Task 13.2: Reduced-motion audit

- [ ] **Step 1: Test with `prefers-reduced-motion: reduce` enabled**

In Chrome DevTools: ⌘⇧P → "Show Rendering" → "Emulate CSS media feature prefers-reduced-motion: reduce". Reload page.

Expected:
- BlurFade animations: instant (no blur, no translate, just opacity)
- AnimatedBeam: static lines
- AnimatedGridPattern: frozen
- BorderBeam: static thin border
- Marquee: stopped
- Hero parallax: disabled
- Smooth scroll: disabled

Fix any animation that still moves.

## Task 13.3: Lighthouse audit

- [ ] **Step 1: Build for production**

```bash
bun run build
bun run preview
```

- [ ] **Step 2: Run Lighthouse on `http://localhost:4173/`**

Use Chrome DevTools → Lighthouse → Mobile + Desktop, all categories.

Targets:
- Performance: ≥ 90 (mobile may be lower; that's OK if image weight isn't fixable)
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

Common findings to address:
- Missing `alt` text → add `aria-label` or `alt=""` for decorative imgs
- Insufficient color contrast → check brand-300 on canvas (should pass)
- Missing meta description → already in index.html

## Task 13.4: Cross-browser smoke test

- [ ] **Step 1: Chrome (desktop) — primary target — confirm visually**
- [ ] **Step 2: Safari (desktop) — backdrop-filter compat**
- [ ] **Step 3: Firefox (desktop) — `text-wrap: balance` + mask-image compat**
- [ ] **Step 4: Mobile Safari (iOS, BrowserStack or actual device)**

Note any layout/animation regressions per browser. Fix or document.

## Task 13.5: Commit Phase 13

```bash
git add -A
git commit -m "polish: make-interfaces-feel-better checklist sweep

- Audited concentric radii, optical centering, shadows, tabular nums,
  text-wrap, font smoothing, image outlines, scale-on-press, hit areas
- Verified no transition:all and minimal will-change usage
- Reduced-motion fallbacks confirmed on BlurFade, AnimatedBeam,
  AnimatedGridPattern, BorderBeam, Marquee, hero parallax, smooth scroll
- Lighthouse: a11y >= 95, best-practices >= 95
- Cross-browser smoke tests: Chrome, Safari, Firefox, Mobile Safari

Per DESIGN.md §11.5, §11.6.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 14 — Tests + docs + deploy (2 hours)

Goal: Smoke tests for HomePage and ContactForm, regenerated OG image, README + CONTRIBUTING in place, Vercel preview deploy verified.

## Task 14.1: Set up Vitest

**Files:** Create `vitest.config.ts`, `src/test/setup.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    globals: true,
  },
});
```

- [ ] **Step 2: Create `src/test/setup.ts`**

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Add `@testing-library/react` and `@testing-library/jest-dom`**

```bash
bun add -d @testing-library/react @testing-library/jest-dom
```

## Task 14.2: HomePage smoke test

**Files:** Create `src/app/home/HomePage.test.tsx`

- [ ] **Step 1: Create the test**

```tsx
// src/app/home/HomePage.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders all 7 section anchors", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    ["hero", "capabilities", "how", "work", "stack", "about", "cta"].forEach((id) => {
      expect(document.getElementById(id)).not.toBeNull();
    });
  });

  it("renders the hero headline copy", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Modernize without rewriting/i)).toBeInTheDocument();
  });
});
```

## Task 14.3: ContactForm smoke test

**Files:** Create `src/app/contact/ContactForm.test.tsx`

- [ ] **Step 1: Create the test**

```tsx
// src/app/contact/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);
  });

  it("shows validation errors on empty submit", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
    });
  });

  it("submits successfully with valid input", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "This is a test message that is longer than ten chars." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => {
      expect(screen.getByText(/Message sent/i)).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 2: Run tests**

```bash
bun run test
```

Expected: 3 tests pass.

## Task 14.4: Generate new OG image

**Files:** Create `public/og-image.png`

- [ ] **Step 1: Create a simple OG generator (manual or scripted)**

Options:
1. **Manual**: open Figma/Sketch/Canva, design a 1200×630 image with the new visual system (Junction wordmark + tagline on canvas color #0A0A0A with brand-700 accent stripe). Export as PNG to `public/og-image.png`.
2. **Scripted via Satori**: install `@vercel/og`, write a small Node script that renders an OG image. Out of scope unless desired.

For now, the existing `public/og-image.png` (blue background + white logo) is a reasonable placeholder. The DESIGN.md flags this as Risk #4 — lower priority than ship-blocking.

## Task 14.5: Add CONTRIBUTING.md

**Files:** Create `CONTRIBUTING.md`

- [ ] **Step 1: Create the file**

```md
# Contributing to junction

This site uses typed TypeScript modules for content. To update copy, edit
the relevant file under `src/content/` — no component code changes needed.

## Common edits

| Want to change... | Edit... |
|---|---|
| Hero headline / sub copy | `src/content/site.ts` (`COPY.hero`) |
| CTA copy | `src/content/site.ts` (`COPY.cta`) |
| About company / founder bio / facts | `src/content/site.ts` (`COPY.about`) |
| Capability cards (titles, descriptions) | `src/content/capabilities.ts` |
| Add a new case study | append to `CASE_STUDIES` in `src/content/case-studies.ts` |
| Add a new tech logo | append to `TECH_STACK` in `src/content/tech-stack.ts` |
| Brand name / contact email | `src/content/site.ts` (`BRAND`) |
| Social links | `src/content/site.ts` (`SOCIAL_LINKS`) |
| OG / SEO meta | `index.html` |
| Page title | `index.html` `<title>` |

After editing, run `bun run typecheck` to confirm no type errors, then `bun run dev` to verify visually.

## Adding a new homepage section

1. Create `src/app/home/sections/<Name>.tsx`
2. Import and render in `src/app/home/HomePage.tsx` in the desired position
3. If anchored in nav, add to `HOMEPAGE_SECTIONS` in `src/config/routes.tsx`

## Style guidelines

- Use existing color tokens from `src/globals.css` (`--text-primary`, `--color-brand-700`, etc.) — don't hardcode hex values
- Use `BlurFade` from Magic UI for entrance animations
- Buttons should use the `Button` component from `src/components/ui/button.tsx`
- Always wrap interactive elements with `min-h-10 min-w-10` for hit area
- See `DESIGN.md` (project root) for the full design spec
```

## Task 14.6: Push and verify Vercel preview

- [ ] **Step 1: Push branch**

```bash
git push -u origin redesign/v2
```

- [ ] **Step 2: Vercel auto-deploys preview**

Wait for the preview URL (visible in the Vercel dashboard or GitHub PR).

- [ ] **Step 3: Walk through every section on the preview URL**

Check:
- Hero loads, parallax works, CTAs link correctly
- Capabilities render, hover spotlight works
- Convergence diagram renders with beams
- Work cards render with current case studies
- Stack marquee scrolls
- About reads correctly
- CTA button works → `/contact` loads
- Contact form submits (with real Resend creds)
- Theme toggle persists across reloads
- Mobile responsive on real device

## Task 14.7: Final commit

```bash
git add -A
git commit -m "test: vitest smoke tests + CONTRIBUTING.md

- Vitest + jsdom setup for component tests
- HomePage test: confirms all 7 section anchors render and hero copy present
- ContactForm test: validation errors + successful submit flow
- CONTRIBUTING.md guides content edits via src/content/ modules

Per DESIGN.md §12 Phase 14.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

# Phase 15 — Linear board mirror (optional, ~30 min)

Goal: Mirror the 14 phases as Linear issues on the Junction project board for ongoing tracking.

## Task 15.1: Authenticate Linear MCP

- [ ] **Step 1: Run authentication**

If using Claude Code with Linear MCP plugin, invoke:

```
mcp__plugin_linear_linear__authenticate
```

Follow the OAuth URL returned. Complete authentication. The MCP returns a confirmation.

If authentication is not available (MCP not installed, or running without it), skip this phase.

## Task 15.2: Create one Linear issue per phase

- [ ] **Step 1: For each phase 0-14, create an issue**

Use the Linear MCP issue-creation tool with:
- **Project**: `b0ec29dfcc32` (Junction)
- **Title**: `Phase N: <phase title>`
- **Description**: One-line phase deliverable + link to `docs/superpowers/plans/2026-04-23-junction-redesign-implementation.md#phase-N`
- **Estimate**: hours from §12 of DESIGN.md
- **Labels**: `redesign`, `phase-N`

15 issues total (Phases 0-14, but Phase 15 itself doesn't need an issue).

---

# Self-review

After writing this complete plan, the implementer should run a final review:

**1. Spec coverage** — confirmed each section of `DESIGN.md` maps to a phase or task:
- §4 Visual system → Phase 1
- §5 IA + §5.2 deletions → Phase 2-3
- §6.1 each homepage section → Phases 5-11 (one per section)
- §6.2 contact page → Phase 12
- §7 component architecture → built incrementally Phases 1-12
- §8 content modules → Phase 4
- §9 packages → Phase 0
- §10 Magic UI → Phase 1
- §11 motion + polish checklist → Phase 13
- §12 phase table → matches phases here

**2. Placeholder scan** — no "TBD", no "implement later", no "similar to Task N" without code, no "add appropriate error handling" — every step has actual code or commands.

**3. Type consistency** — `Tech.name` matches `TechNode` props (`name`); `CapabilityCard.feature` is boolean; `CaseStudy.tech` is `string[]` consistently used in WorkCard.

**4. Cross-references** — every "(per DESIGN.md §X)" reference points to a real section.

If any of the above fail, fix inline before handing off to the implementation agent.

---

# Execution handoff

This plan is complete and ready to execute.

**Two execution options:**

1. **Subagent-Driven (recommended)** — Dispatch a fresh subagent per task using `superpowers:subagent-driven-development`. The driving agent reviews after each task, catches drift early, and iterates fast. Best for a redesign of this scope where consistency across phases matters.

2. **Inline Execution** — Execute tasks in a single session using `superpowers:executing-plans`. Batch execution with checkpoints between phases. Faster wall-clock but uses more context per task.

Either approach reads this plan top-to-bottom and ticks each `- [ ]` checkbox as work completes.

---

*Companion design spec: `DESIGN.md` (project root).*
