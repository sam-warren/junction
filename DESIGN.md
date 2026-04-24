# DESIGN.md — Junction Technologies LTD. Website Redesign

| | |
|---|---|
| **Status** | Draft for user review |
| **Date** | 2026-04-23 |
| **Author** | Sam Warren (with Claude) |
| **Implementation plan** | `docs/superpowers/plans/2026-04-23-junction-redesign-implementation.md` (written after this spec is approved) |
| **Linear project** | [Junction](https://linear.app/junction-technologies/project/junction-b0ec29dfcc32/overview) |
| **Branch** | New branch `redesign/v2` off `main` (created in Phase 0) |

---

## How to use this document

This is the **what + why**. It describes the design of the Junction Technologies LTD. website — the visual system, information architecture, page-by-page sections, component structure, content model, and the rationale behind every major decision.

The companion **implementation plan** at `docs/superpowers/plans/2026-04-23-junction-redesign-implementation.md` is the **how** — bite-sized step-by-step tasks an agent can execute in a fresh context window. The plan references this doc by section number; this doc references the plan by phase number.

Read this first. Then run the plan.

---

## Table of contents

1. [Vision](#1-vision)
2. [Goals & non-goals](#2-goals--non-goals)
3. [Decisions log](#3-decisions-log)
4. [Visual system](#4-visual-system)
5. [Information architecture](#5-information-architecture)
6. [Page-by-page design](#6-page-by-page-design)
7. [Component architecture](#7-component-architecture)
8. [Content model](#8-content-model)
9. [Package upgrade plan](#9-package-upgrade-plan)
10. [Magic UI setup](#10-magic-ui-setup)
11. [Motion language](#11-motion-language)
12. [Implementation phases](#12-implementation-phases)
13. [Open risks & deferred decisions](#13-open-risks--deferred-decisions)
14. [Out of scope / future work](#14-out-of-scope--future-work)

---

## 1. Vision

Rebrand and redesign the JunctionTech portfolio site as **Junction Technologies LTD.** — a sleek, minimal, technically-credible consultancy site in the visual lineage of vercel.com, linear.app, supabase.com, and cloudflare.com. The redesign:

- **Replaces** AI-generic blue text-gradients, glass-morphism cards, and templated 4-up service grids with a disciplined visual system rooted in **lattices, dot matrices, and grids**.
- **Strips** the blog and packages sections. Removes pricing from the public surface.
- **Adds** a single signature visual moment — an `AnimatedBeam` *Convergence Diagram* that literally visualizes Junction's value proposition: connecting legacy systems to modern stacks.
- **Modernizes** the React + Vite stack to current major versions (React 19, Tailwind 4, Vite 7).
- **Standardizes** content as typed modules so future content edits are one-file changes.

The design takes inspiration from four references but is not a copy of any one of them. The intent is for a first-time visitor to think *"this is the kind of consultancy that ships polished work,"* not *"this looks like another agency template."*

The brand promise — bridging legacy and modern systems — is reflected at three levels:
1. **Wordmark**: the existing Junction logo (two paths converging on a horizontal line)
2. **Section copy**: the Convergence section title is *"We Build Interfaces."*
3. **Signature visual**: the Convergence Diagram with `AnimatedBeam`s flowing through the brand mark

---

## 2. Goals & non-goals

### Goals
- **G1.** A single-scroll homepage + dedicated `/contact` form that converts.
- **G2.** A consistent visual language: dark-first, single brand-blue palette, Geist typography, generous whitespace, subtle motion.
- **G3.** A signature visual moment — the Convergence Diagram — that no other consultancy in the BC market has.
- **G4.** Code-quality refresh: latest stable React/Tailwind/Vite/TypeScript, removed dead code (blog, packages, lodash), introduced typed content modules.
- **G5.** Implementation feasible in 22-30 hours of focused work, delivered as 14 phased commits.
- **G6.** Production-ready accessibility (WCAG AA at minimum), reduced-motion respected, mobile-responsive throughout.

### Non-goals
- **NG1.** Public pricing pages or self-serve checkout. Engagements are bespoke; clients contact for scoping.
- **NG2.** Blog. Removed entirely (`public/blog/`, `BlogList`, `BlogPost`, MDX dependencies). Can be reintroduced later as a separate effort.
- **NG3.** CMS. Content lives in typed TS modules in `src/content/`. No headless CMS, no admin UI.
- **NG4.** Authentication. Contact submission is anonymous via Resend.
- **NG5.** Analytics changes. Vercel Analytics + Speed Insights stay as-is.
- **NG6.** Tailwind v3 backwards-compatibility. We commit fully to v4.
- **NG7.** Test coverage beyond smoke tests. Marketing site, low test ROI.

---

## 3. Decisions log

The decisions made during brainstorming, with rationale. Each line is an explicit "we chose X because Y, knowing the tradeoff is Z."

| # | Decision | Rationale | Tradeoff |
|---|---|---|---|
| D1 | Single long-scroll homepage + `/contact` only | Modern marketing-site convention (Vercel, Linear, Supabase). Maximum scroll choreography, fewest navigation hops. | Less SEO real-estate per topic; mitigated by single high-quality page. |
| D2 | Capability cards, no pricing | Pricing in `/packages` was creating tension with bespoke work. Lets the work speak; gates pricing to discovery calls. | Loses self-serve sales funnel; intentional given engagement size. |
| D3 | Dark-first canvas | Photogenic for the lattice/dot/grid aesthetic; matches Vercel/Linear lineage; toggle remains. | Some users prefer light; toggle plus full light theme implementation mitigates. |
| D4 | Brand palette anchored at `#2642A9` (og-image blue) | Brand-identity carryover; deep saturated cobalt is distinctively NOT generic Tailwind blue. Generated 50→950 scale ensures both brand identity AND interactive contrast on dark canvas. | Slight learning curve managing two interactive blues (brand-300 for text, brand-700 for fills). |
| D5 | Geist Sans + Geist Mono only, no serif | Disciplined, fewer fonts to load, matches "sleek/minimal/elegant." Fraunces serif was only for the dropped testimonial. | Loses the editorial pull-quote moment; reclaim later if a strong testimonial returns. |
| D6 | AnimatedBeam Convergence Diagram as signature visual | Junction's actual value prop is system integration; the diagram literally shows it. Differentiates from generic consultancy sites. | One non-trivial implementation (Phase 7); mobile fallback needed. |
| D7 | Tailwind 4 + React 19 + Vite 7 | The redesign rewrites every component; layering migrations on top costs less than future migrations. Tailwind 4's `@theme` aligns with our CSS-custom-property tokens. | Tailwind 4 is newer; some plugins may lag. Mitigated by dropping our only plugin dependency. |
| D8 | Magic UI for animation primitives | Curated, free, motion-backed; covers exactly the patterns we want. Saves us from rolling each by hand. | Vendored components; we own them once installed. Customization required to match tokens. |
| D9 | Skip social-proof section | Logan testimonial dropped at user request; client wanted discipline over filler. Lets case studies carry credibility. | Loses emotional social proof; relies on case study quality. |
| D10 | Content as typed TS modules in `src/content/` | Centralized content makes edits one-file changes; no CMS overhead. Typed = compile-time validation. | Non-developers need a developer to edit; acceptable for a solo consultancy. |
| D11 | Delete `GridBackground` floating-logo background | Particle backgrounds are 2024-portfolio-template trope; conflicts with "sleek/minimal." DotPattern + AnimatedGridPattern give us the lattice/dot aesthetic without particles. | If missed, re-introduce as a contained continuous draw-loop on the central BrandMark in the Convergence section. |
| D12 | DESIGN.md at project root | User explicit naming; root-level DESIGN.md is conventional alongside README.md and LICENSE. | None. |
| D13 | Two-blue interactive system: brand-700 for fills, brand-300/400 for inline text & focus | Deep brand blue lacks contrast on near-black canvas (3:1 — fails WCAG AA for normal text). Sibling lighter blues in the same hue family solve this without abandoning brand identity. | Two values to remember; codified in §4 usage rules. |
| D14 | In-flow footer (not fixed) | Fixed footer constrained the scroll viewport and prevented scroll choreography. In-flow is the modern marketing-site convention. | Mobile users see footer on scroll-to-bottom rather than always; expected behavior. |
| D15 | Header has `Start a project` CTA in nav, not just nav links | Conversion-first: every header view includes a CTA. Matches Vercel/Linear patterns. | Slightly busier header; offset by minimalism elsewhere. |

---

## 4. Visual system

### 4.1 Color tokens

The palette is **monochrome + a single brand-blue family**. No greens, no oranges, no purples, no rainbow. All chromatic accents share the brand hue (HSL 229°).

#### Surface tokens (CSS custom properties on `:root`)

```css
/* Dark theme (default) */
--canvas:           #0A0A0A;
--surface-1:        #0F0F10;   /* cards, sticky header bg */
--surface-2:        #16171A;   /* popover, code, dialogs */
--surface-elevated: #1B1D22;   /* hover/raised */
--border:           rgba(255, 255, 255, 0.08);
--border-strong:    rgba(255, 255, 255, 0.14);
--text-primary:     #F5F5F7;
--text-secondary:   #A1A1AA;
--text-tertiary:    #71717A;

/* Light theme (`.light` class on html) */
--canvas:           #FAFAF9;
--surface-1:        #FFFFFF;
--surface-2:        #F4F4F5;
--surface-elevated: #E4E4E7;
--border:           rgba(0, 0, 0, 0.07);
--border-strong:    rgba(0, 0, 0, 0.14);
--text-primary:     #0A0A0A;
--text-secondary:   #52525B;
--text-tertiary:    #71717A;
```

#### Brand palette (theme-invariant, but interactive usage varies by theme)

Generated as a 50→950 scale from `#2642A9` (sampled from `public/og-image.png`, the existing brand mark backdrop). All values share HSL hue 229°.

```css
--brand-50:  #EEF1FB;
--brand-100: #DDE3F7;
--brand-200: #BCC7EF;
--brand-300: #94A4E2;   /* inline links on dark, NumberTicker on dark */
--brand-400: #6B7ED4;   /* focus rings, hover highlights */
--brand-500: #4A60C7;   /* AnimatedBeam mid gradient stop */
--brand-600: #3650B6;   /* button hover bg */
--brand-700: #2642A9;   /* THE BRAND BLUE (og-image), button bg, brand surfaces */
--brand-800: #1F3690;   /* active/pressed */
--brand-900: #1A2D75;   /* deepest brand surface */
--brand-950: #131F50;   /* shadow tints */

--brand-soft: rgba(75, 96, 199, 0.12);          /* subtle hover tints */
--brand-glow: 0 0 24px rgba(38, 66, 169, 0.55); /* CTA outer glow */
```

#### Semantic tokens

```css
--success: #3FCFB7;   /* form success only — never decorative */
--danger:  #F87171;   /* form error, destructive actions */
```

#### Usage rules (THIS is the discipline that prevents AI-blue cliché)

| Job | Token | Why |
|---|---|---|
| Page background | `--canvas` | |
| Card / panel background | `--surface-1` | Single subtle elevation |
| Inset block (code, input bg, secondary nesting) | `--surface-2` | Inner contrast in cards |
| Hovered raised elements | `--surface-elevated` | One step brighter than surface-2 |
| Default 1px divider | `--border` | |
| Focused / active 1px stroke | `--border-strong` | |
| Body text | `--text-primary` | Maximum legibility |
| Secondary copy | `--text-secondary` | Sub-headers, labels |
| Muted meta | `--text-tertiary` | Timestamps, captions, footer copyright |
| Primary button bg | `--brand-700` | with `text: white`, `hover: --brand-600`, `active: --brand-800` |
| Primary button hover glow | `--brand-glow` | layered on hover only |
| **Inline link on dark** | `--brand-300` | Achieves 4.5:1 vs `--canvas` (passes WCAG AA) |
| **Inline link on light** | `--brand-700` | Achieves 8:1 vs `--canvas` |
| Focus outline (any theme) | `--brand-400` | 2px, 2px offset |
| NumberTicker / metric highlight (dark) | `--brand-300` | |
| NumberTicker / metric highlight (light) | `--brand-700` | |
| AnimatedBeam gradient | `from --brand-300 via --brand-500 to --brand-700` | |
| Brand surfaces (hero panel bg if used, footer accent strip) | `--brand-700` | |
| Subtle hover tints (card lift bg) | `--brand-soft` | |

**Forbidden:** using `--brand-700` as raw text color on `--canvas`. Always white-on-brand-700 (when brand-700 is a fill behind text) or brand-300/400 (when brand color *is* the text).

### 4.2 Radius scale (concentric — outer = inner + padding)

```css
--r-xs:  4px;   /* chips, kbd */
--r-sm:  8px;   /* inputs, inner buttons */
--r-md:  12px;  /* card inner blocks */
--r-lg:  16px;  /* capability cards, work cards */
--r-xl:  24px;  /* hero panel, bento feature cell */
--r-2xl: 32px;  /* full-bleed CTA panel */
```

Concentric rule (per make-interfaces-feel-better): **inner radius = outer radius − padding**, in pixels. If padding ≥ outer radius, inner is square (0px). When the math forces a square inner, either bump the outer up to the next step or reduce padding.

**Codified concentric pairings used in this design:**

| Outer | Padding | Inner |
|---|---|---|
| `--r-lg` (16) | `p-2` (8) | `--r-sm` (8) |
| `--r-xl` (24) | `p-2` (8) | `--r-lg` (16) |
| `--r-xl` (24) | `p-4` (16) | `--r-sm` (8) |
| `--r-2xl` (32) | `p-2` (8) | `--r-xl` (24) |

When in doubt, the make-interfaces-feel-better skill principle applies: **outer radius = inner radius + padding** (in pixels).

### 4.3 Shadow language (layered, not borders)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.6);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.7);
```

**Rule:** elevation is shadows, not borders. Borders are 1px dividers in `--border` only. Cards use `--shadow-md` resting, `--shadow-lg` on hover. The `--brand-glow` is exclusively for the primary CTA button on hover.

### 4.4 Typography

#### Fonts (self-hosted via `@fontsource-variable/*`)

| Family | Use | Weights loaded |
|---|---|---|
| **Geist Sans** (variable) | All UI, body, headings | 400, 500, 600, 700 (variable axis 100-900 available) |
| **Geist Mono** (variable) | Tech chips, kbd, NumberTicker, `<code>`, eyebrows | 400, 500 |

No serif. No system fallback to Inter or San Francisco.

#### Type scale (Tailwind theme extension)

| Token | Size / Line-height | Tracking | Weight | Use |
|---|---|---|---|---|
| `display-2xl` | 96 / 96 | -0.04em | 600 | Hero headline (desktop) |
| `display-xl`  | 72 / 72 | -0.03em | 600 | Hero headline (mobile), section H2 (desktop) |
| `display-lg`  | 56 / 60 | -0.02em | 500 | Section H2 (mobile), card title XL |
| `display-md`  | 40 / 44 | -0.01em | 500 | Card titles |
| `body-lg`     | 18 / 28 | -0.005em | 400 | Lead paragraphs |
| `body`        | 16 / 24 | 0 | 400 | Default |
| `body-sm`     | 14 / 20 | 0 | 400 | Meta, captions |
| `mono-sm`     | 13 / 20 | 0 | 400 | Eyebrows, chips, callouts (Geist Mono) |

#### Universal typography rules (applied at root layout)

```css
html, body {
  font-family: "Geist Variable", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;       /* per make-interfaces-feel-better */
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "ss01", "cv01", "cv11";  /* Geist stylistic sets if desired */
}

h1, h2, h3, h4 { text-wrap: balance; }
p, li { text-wrap: pretty; }

/* Tabular numerals for any animated/changing number */
.tabular-nums { font-variant-numeric: tabular-nums; }
```

### 4.5 Background / pattern system (the lattice lean-in)

| Section | Pattern | Opacity | Notes |
|---|---|---|---|
| Hero | `DotPattern` (Magic UI) | 4% | dot 1px, gap 24px, with radial mask centered on text |
| Section dividers (between major sections) | `GridPattern` strip | 3% | 1 cell tall, full-width, single beam animates left→right on viewport entry |
| Convergence section | `AnimatedGridPattern` | 6% | cells fade in/out softly |
| CTA panel | static — no pattern | — | `BorderBeam` on perimeter on hover instead |
| Footer | none | — | rest the eye |

Light-theme pattern colors invert: dark uses `rgba(255, 255, 255, 0.08)`; light uses `rgba(0, 0, 0, 0.06)`.

### 4.6 Iconography

- **Library**: `lucide-react` (already installed, agency-standard, free). 1500+ icons.
- **Stroke width**: override default `2` → `1.5` at root for elegance. `<LucideProvider strokeWidth={1.5}>` or set per-icon.
- **Sizes**: `16` (chip/inline), `20` (button), `24` (card), `32` (hero feature)
- Always inherit `currentColor`. Never multi-color emojis. Never `text-blue-500` hardcoded — use `text-[--text-secondary]` etc.

### 4.7 Imagery

- Logan portrait removed; future case-study covers + founder portrait when added all get a subtle 1px outline:
  - Dark theme: `outline: 1px solid rgba(255, 255, 255, 0.1)`
  - Light theme: `outline: 1px solid rgba(0, 0, 0, 0.1)`
  - **Never** a tinted neutral (slate, zinc) — picks up surface color underneath as visible "dirt" on the edge (per make-interfaces-feel-better §11)
- Aspect ratios standardized: 16:9 hero shots, 1:1 portraits, 4:3 case study covers
- All `<img>` get `loading="lazy"` except hero (above the fold)

### 4.8 Anti-patterns we explicitly avoid

| ❌ Avoid | ✅ Use instead |
|---|---|
| Text gradients (`bg-clip-text text-transparent`) | Solid colors. Headings use `--text-primary`. Brand emphasis via brand color or italic — not gradients. |
| Glass-morphism (`bg-white/20 backdrop-blur`) | Crisp surfaces with `--surface-1`, `--border`, `--shadow-md` |
| Generic 4-up icon-card services grid | Bento layout with one feature cell + cursor-tracking spotlights (`MagicCard`) |
| Inter / system-ui | Geist Sans variable |
| Multi-color icon emojis (🚀 🎉 ✨) | Lucide icons inheriting `currentColor` |
| Marketing speak ("Empower", "Unlock", "Elevate", "Transform") | Plain language ("Build", "Connect", "Modernize", "Ship") |
| `transition: all` | Specific properties: `transition-colors`, `transition-transform`, `transition-opacity`, etc. |
| `forwardRef` (in new components) | React 19 ref-as-prop |
| Particle backgrounds | Lattice/dot/grid patterns |
| Fixed footer | In-flow footer |
| Identical blue gradient on every heading | Solid `--text-primary`, with brand color only on links/CTAs |

---

## 5. Information architecture

### 5.1 Routes

| Route | Purpose | Implementation |
|---|---|---|
| `/` | Single long-scroll homepage | `src/app/home/HomePage.tsx` composes 7 sections + footer |
| `/contact` | Focused form (separate route → trackable conversion) | `src/app/contact/ContactPage.tsx` |
| `/api/contact` | Resend handler | `api/contact.mjs` (unchanged behavior) |

### 5.2 Removed routes & files

#### Routes removed from `src/config/routes.tsx`
- `/packages`
- `/blog`
- `/blog/:slug`

#### Files & directories deleted
| Path | Reason |
|---|---|
| `src/components/packages/` (whole dir) | Pricing removed (D2) |
| `src/components/blog/` (whole dir) | Blog removed (NG2) |
| `src/components/about/AboutSection.tsx` | Replaced by `src/app/home/sections/About.tsx` |
| `src/components/home/HeroSection.tsx` | Replaced by `src/app/home/sections/Hero.tsx` |
| `src/components/ui/FrostedCard.tsx` | Glass-morphism out (anti-pattern) |
| `src/components/ui/BloomBackground.tsx` | Replaced by Magic UI `DotPattern` |
| `src/components/ui/GridBackground.tsx` | Particle bg out (D11) |
| `src/components/ui/CollapsibleSection.tsx` | Mobile accordion not needed in new IA |
| `src/utils/blog.ts` | Blog removed |
| `public/blog/` (all `.mdx`) | Blog removed |
| `public/Logan.jpg` | Testimonial removed (D9) |
| `BLOG_SETUP.md` | Blog removed |
| `src/App.css` | Confirm unused; if tailwind-only, delete |

#### Tooling changes
- `vite.config.ts`: drop `mdx()` plugin import + entry
- `tailwind.config.js`: file may go away entirely under Tailwind 4 (CSS-first config); if kept, drop `@tailwindcss/typography` plugin
- `package.json`: see §9

### 5.3 Header behavior

- **Initial state**: `bg-transparent`, `border-b border-transparent`. Logo + nav + CTA + theme toggle visible.
- **Scrolled state** (when `window.scrollY > 80`):
  - `bg-[--canvas]/80`
  - `backdrop-blur-xl`
  - `border-b border-[--border]`
  - Smooth transition: `background-color 200ms`, `backdrop-filter 200ms`, `border-color 200ms` — NOT `transition: all`
- **Nav items** are anchor links to homepage sections: `#capabilities`, `#how`, `#work`, `#about`. CSS `scroll-behavior: smooth` on `html`.
- **Scrollspy** highlights the active section's nav anchor with `text-[--text-primary]` + 2px `--brand-400` underline. Default state: `text-[--text-secondary]`.
- **Right side**: `Start a project →` CTA button (`bg-brand-700`, `hover:bg-brand-600`, `--brand-glow` on hover, `BorderBeam` 8s loop on hover).
- **Theme toggle** pinned far right.
- **Mobile**: hamburger → full-screen overlay (black at 40% opacity), `surface-1` panel slides in from right (w-72), nav items stagger in 50ms each. Hamburger icon morphs to X via cross-fade.

### 5.4 Footer behavior

- **In-flow** (not fixed). Bottom of page after CTA section.
- **Layout** (desktop): three columns
  - Left: small `BrandMark` (24px) + 1-line tagline ("Junction Technologies LTD.")
  - Center: anchor nav (Capabilities, Work, About, Contact)
  - Right: social icons (GitHub, LinkedIn) — currentColor, 1.5px stroke
- **Bottom strip**: `© <currentYear> Junction Technologies LTD.` in `text-tertiary`, mono-sm
- **Top edge**: 1px `--border`. No pattern (rest the eye).
- **Mobile**: stacked single column, centered alignment, generous vertical spacing.

### 5.5 Universal layout constants

| Token | Value | Use |
|---|---|---|
| Section vertical padding | `py-24 lg:py-32` | All major sections |
| Inner content max-width | `max-w-7xl` | Section containers |
| Container horizontal padding | `px-6 lg:px-8` | Section containers |
| Card internal padding | `p-6 lg:p-8` | Capability/work cards |
| Hero vertical padding | `pt-24 pb-32 lg:pt-32 lg:pb-40` | Slightly tighter top, looser bottom |
| CTA vertical padding | `py-32 lg:py-40` | Generous to give the CTA breathing room |

---

## 6. Page-by-page design

### 6.1 Homepage `/`

Composed in `src/app/home/HomePage.tsx`. Each section is its own file under `src/app/home/sections/`.

#### Section order (top to bottom)

1. **Hero** (`#hero`)
2. **Capabilities** (`#capabilities`)
3. **Convergence Diagram** (`#how`) ← signature visual moment
4. **Work** (`#work`)
5. **Stack marquee** (`#stack`)
6. **About** (`#about`)
7. **CTA** (`#cta`)
8. Footer (not anchored — always at bottom)

#### 6.1.1 Hero (`#hero`)

- **Layout**: full viewport, content centered horizontally + vertically
- **Background**: `DotPattern` (1px dot, 24px gap, 4% opacity) with a fading radial mask centered on the headline — pattern softens behind text
- **Mouse parallax**: dot pattern translates ±2px max in response to mouse position (desktop only, disabled on `prefers-reduced-motion`)
- **Content** (centered, `max-w-4xl`):
  - Eyebrow: `Junction Technologies` (mono-sm, `text-[--brand-300]`)
  - Headline (`display-2xl` desktop, `display-xl` mobile, `text-wrap: balance`):
    - **Suggested copy** (placeholder, finalize during user review): *"Modernize without rewriting."*
    - Alternates: *"Build bridges, not rewrites."* / *"Software that meets your systems where they are."* / *"The integration layer your enterprise was missing."*
  - Sub: `body-lg`, `text-secondary`, `max-w-2xl`
    - **Suggested copy**: *"Junction is an independent software consultancy that bridges legacy systems with modern technology — without forcing a rebuild."*
  - CTA row:
    - Primary: `Start a project →` → `/contact` (brand-700 button, `BorderBeam` on hover)
    - Ghost: `See our work` → smooth-scrolls to `#work`
- **Scroll cue**: thin chevron at viewport bottom, fades on scroll past 100px
- **Motion**: each line of hero content `BlurFade`s in with 100ms staggered delays (eyebrow → H1 line 1 → H1 line 2 → sub → CTAs → cue)

#### 6.1.2 Capabilities (`#capabilities`)

- **Eyebrow**: `What we do` (mono-sm, brand-300)
- **H2**: `Capabilities` (display-xl, balance)
- **Layout**: Magic UI `BentoGrid` — desktop is 2 rows × 3 cols with one cell spanning 2 cols (the *feature*); mobile is single-column stacked
- **Cards** (sourced from `src/content/capabilities.ts`):

  | # | Title | One-liner | Notes |
  |---|---|---|---|
  | 1 | **System Integration** | Connect legacy systems to modern stacks without rebuilding from scratch. | **Feature cell** — 2 cols, larger title, brief 2-3 sentence description |
  | 2 | Custom Software | Bespoke web and internal tools, from spec to ship. | |
  | 3 | Modernization | Refactor and migrate aging codebases safely. | |
  | 4 | Cloud & DevOps | Infrastructure, CI/CD, observability. | |
  | 5 | AI Integration | Embed LLMs into existing workflows. | |

- **Card chrome**: `MagicCard` wrapper with cursor-tracking spotlight in `--brand-soft`. Outer `--r-lg` (16px), `p-8` padding, inner blocks `--r-sm` (8px). `--shadow-md` resting, `--shadow-lg` on hover.
- **Iconography**: lucide 32px, `text-brand-300` on dark / `text-brand-700` on light, top-aligned in card
- **Motion**: `BlurFade` per card, `delay={i * 0.08}`

Suggested icon mapping:
- System Integration → `Network` or `Workflow`
- Custom Software → `Code2`
- Modernization → `RefreshCw` or `GitBranch`
- Cloud & DevOps → `Cloud` or `Server`
- AI Integration → `Sparkles` or `Brain`

#### 6.1.3 Convergence Diagram (`#how`) — the signature visual moment

- **Eyebrow**: `How we connect systems`
- **H2**: *"We Build Interfaces."*
- **Layout**: full-width section, centered diagram (`max-w-5xl`, ~480px tall on desktop)
- **Diagram structure**:
  - **Left column** (3 stacked `TechNode` tiles, vertical): legacy stack — e.g., `.NET`, `OpenShift`, `MS Dynamics`
  - **Center**: large `BrandMark` (~96px square, brand-700 stroke, optional slow continuous draw-loop every 12s as easter egg)
  - **Right column** (3 stacked `TechNode` tiles, vertical): modern stack — e.g., `React`, `Postgres`/`Supabase`, `Vercel`
  - **6 `AnimatedBeam`s** total — structured as 3 *pairs*, one pair per row. Each pair is one beam (left tile → BrandMark) plus one beam (BrandMark → right tile). The two halves of a pair animate together so visually the row reads as one continuous flow that converges into the BrandMark and emerges on the other side.
- **Beam timing** (continuous staggered flow — not sequential one-at-a-time):
  - Pair 1 (top row): both beams `delay 0s, duration 1.5s, repeat infinite`
  - Pair 2 (mid row): both beams `delay 0.5s, duration 1.5s, repeat infinite`
  - Pair 3 (bot row): both beams `delay 1.0s, duration 1.5s, repeat infinite`
  - At any given moment, ~2-3 beams visible in different stages of fade
- **Beam color**: gradient `from --brand-300 via --brand-500 to --brand-700`
- **Background**: `AnimatedGridPattern` at 6% opacity — cells fade in/out softly
- **Motion**: entire diagram `BlurFade`s in on scroll-into-view (IntersectionObserver, 60% threshold). Beams begin animating after fade-in completes.
- **Mobile**: rotate 90° → vertical layout (legacy nodes on top, BrandMark middle, modern bottom). Reduces to 3 beams (one per pair) for performance.
- **Reduced-motion**: static beams (lines drawn instantly, no animation), AnimatedGridPattern frozen at full visibility

#### 6.1.4 Work (`#work`)

- **Eyebrow**: `Selected work`
- **H2**: *"Where we've shipped."* (placeholder; alternates: *"Selected projects."* / *"Work."*)
- **Source**: `src/content/case-studies.ts` (typed `CaseStudy[]` array)
- **Layout**: asymmetric grid — 1 feature card (col-span-2 on desktop) + 2 standard cards in row 1; subsequent cases as 3-col rows. Mobile: single column stacked.
- **Card anatomy** (per `WorkCard.tsx`):
  - Optional cover image (16:9, `--r-md` corners, 1px outline)
  - Top row: client name (mono-sm, `text-brand-300`) · year (mono-sm, `text-tertiary`)
  - Title (display-md, balance)
  - One-line outcome (body)
  - Tech chip row (max 5 chips, mono-sm in `--surface-2` pill containers)
  - `View case study →` link (`text-brand-300`, `underline-offset-4`)
- **Card chrome**: `--r-lg` outer, `--surface-1` bg, `1px --border`, `--shadow-md`. On hover: `--shadow-lg` + `BorderBeam` (8s loop, brand-300 → brand-700 gradient stops).
- **Initial content** (3 ports from existing AboutSection):
  - BC Justice DevOps (BC Ministry of Public Safety and Solicitor General)
  - Road Safety Initiative (BC Ministry of Public Safety and Solicitor General)
  - Health Gateway (BC Ministry of Health)
- **Empty state**: if `case-studies.ts` array length < 3, render a placeholder card with copy: *"More case studies coming soon."*
- **Motion**: `BlurFade` per card, `delay={i * 0.15}`

#### 6.1.5 Stack marquee (`#stack`)

- **Eyebrow**: `Stack`
- **Layout**: full-width band, two-row `Marquee` (top scrolls left, bottom scrolls right)
- **Source**: `src/content/tech-stack.ts`
- **Logos**: monochrome wordmarks/glyphs — `text-white/40` on dark, `text-black/40` on light. **No color, ever.**
- **Hover**: opacity → 100%, scale 1.04 (200ms `opacity, transform`)
- **Mask**: `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` — soft edges
- **Motion**: continuous infinite loop, `pause-on-hover` on each row
- **Reduced-motion**: render first 6 logos statically in a fixed flex row, no animation

#### 6.1.6 About (`#about`)

- **Eyebrow**: `About`
- **H2**: `Junction`
- **Layout** (desktop): two-column, equal width
  - Left: company paragraph + founder paragraph
  - Right: small portrait (1:1, 1px outline) + facts list (definition-list style)
- **Layout** (mobile): stacked, portrait above copy
- **Suggested copy** (placeholders — refine during review):
  - Company: *"Junction Technologies LTD. is an independent software consultancy. We design and build integrations and applications that connect legacy systems with modern stacks — for governments, enterprises, and the engineering teams that maintain them."*
  - Founder: *"Sam Warren is a senior full-stack engineer with seven years building public-sector software in Canada. UVic Software Engineering grad. Has shipped to BC Justice, BC Health, and BC Public Safety in roles spanning frontend, backend, and DevOps."*
  - Facts (right column):
    - *Based in* — Victoria, BC
    - *Founded* — 2024
    - *Specialty* — Legacy ↔ modern integration
- **Motion**: `BlurFade` for whole section; portrait fades in 100ms after copy

#### 6.1.7 CTA (`#cta`)

- **Layout**: centered panel, ~720px wide, `py-32 lg:py-40`
- **Background**: subtle radial-gradient mask using `--brand-soft` to give the panel a soft glow centered on the headline
- **H2**: *"Let's build something."* (placeholder; alternates: *"Start a project."* / *"Talk to Junction."*)
- **Sub**: *"Free 30-minute consult. No deck, no pitch — just a conversation about what you're building."*
- **Primary CTA**: large `Start a project →` button (brand-700, white text, `BorderBeam` 8s loop on hover, `--brand-glow`, `active:scale-[0.96]`) → `/contact`
- **Secondary**: small `or email →` link below pointing to `BRAND.contactEmail`

### 6.2 Contact page `/contact`

- **Layout**: centered, single column, `max-w-2xl`
- **Eyebrow**: `Contact`
- **H1**: *"Let's talk."* (display-xl)
- **Sub**: *"Drop a note. Replies within one business day."*
- **Form chrome**: `--surface-1` bg, `1px --border`, `--r-lg` outer, `--shadow-md`, `p-8 lg:p-10`
- **Inputs**:
  - `--surface-2` bg (subtle inner contrast against form)
  - `1px --border`
  - `--r-sm` (8px) — concentric with the form's `--r-lg` (16px) and `p-2` inner padding within the form
  - Focus: `outline: 2px solid --brand-400; outline-offset: 2px`
  - Placeholder text: subtle (use `text-tertiary`, italic optional)
- **Submit button**: brand-700 bg, white text, `BorderBeam` on hover, `active:scale-[0.96]`, full-width on mobile, right-aligned on desktop
- **Errors**: `--danger` color, smooth `error-in` height anim (existing pattern restyled with new tokens)
- **Success**: existing `Alert` component, restyled to use `--success` and concentric radii
- **Honeypot field**: kept hidden (current pattern works)
- **API**: POSTs to `/api/contact` (Resend handler unchanged)

---

## 7. Component architecture

### 7.1 New file tree

```
src/
  App.tsx                              ← simplified: Router + Layout + 2 routes
  main.tsx                             ← unchanged
  globals.css                          ← was index.css; expanded with @theme tokens, font-face
  vite-env.d.ts

  app/                                 ← page-level orchestration
    home/
      HomePage.tsx                     ← composes all home sections
      sections/
        Hero.tsx
        Capabilities.tsx
        Convergence.tsx
        Work.tsx
        StackMarquee.tsx
        About.tsx
        CTA.tsx
    contact/
      ContactPage.tsx                  ← eyebrow + H1 + form composition
      ContactForm.tsx                  ← form logic only (extracted from old ContactForm)

  components/
    layout/
      Layout.tsx                       ← rewritten: in-flow, no fixed header/footer
      Header.tsx                       ← rewritten: scroll-aware blur, anchor nav, scrollspy
      Footer.tsx                       ← rewritten: in-flow, three-column
      ThemeToggle.tsx                  ← restyled, scale-on-press, icon cross-fade
    magicui/                           ← vendored Magic UI components
      dot-pattern.tsx
      grid-pattern.tsx
      animated-grid-pattern.tsx
      blur-fade.tsx
      magic-card.tsx
      bento-grid.tsx
      animated-beam.tsx
      marquee.tsx
      number-ticker.tsx
      border-beam.tsx
    ui/
      brand-mark.tsx                   ← was Logo.tsx; static + animated variants by prop
      button.tsx                       ← variants: primary/ghost/link via cva
      tech-chip.tsx                    ← was TechnologyChip; restyled, mono font
      tech-node.tsx                    ← NEW: 80×80 surface tile for convergence diagram
      alert.tsx                        ← was Alert.tsx; restyled
      kbd.tsx                          ← NEW: small mono pill for keyboard hints / inline tags

  content/                             ← NEW: all copy lives here, not in components
    site.ts                            ← BRAND, social, copy slots
    capabilities.ts                    ← typed CapabilityCard[]
    case-studies.ts                    ← typed CaseStudy[]; placeholders + 3 ports
    tech-stack.ts                      ← typed Tech[]; for marquee + diagram nodes

  hooks/
    use-scroll-progress.ts             ← header blur trigger
    use-section-spy.ts                 ← scrollspy via IntersectionObserver
    use-reduced-motion.ts              ← prefers-reduced-motion wrapper

  lib/
    utils.ts                           ← cn() = twMerge(clsx(...))
    motion.ts                          ← shared spring/ease/duration presets

  config/
    routes.tsx                         ← simplified to / and /contact
    constants.ts                       ← optional re-exports from content/site.ts for back-compat

  assets/                              ← unchanged
  api/                                 ← types for /api/contact (api/contact.mjs unchanged)
  types/                               ← content types if not co-located
```

### 7.2 Component responsibilities

| Component | Responsibility |
|---|---|
| `App.tsx` | Mount Router, wrap in Layout, register routes |
| `Layout.tsx` | Render Header, page outlet, Footer. No fixed positioning. Apply page-level CSS vars. |
| `Header.tsx` | Scroll-aware blur, anchor nav with scrollspy, theme toggle, primary CTA, mobile hamburger |
| `Footer.tsx` | Three-column in-flow footer with brand mark, anchor nav, social, copyright |
| `ThemeToggle.tsx` | Toggle dark/light, persist to localStorage, scale-on-press, cross-fade sun/moon icons |
| `BrandMark` | The Junction logo SVG. Props: `variant: "static" \| "draw" \| "loop"`, `size`, `className` |
| `Button` | Variants: `primary` (brand-700 fill), `ghost` (transparent w/ border), `link` (no chrome). Scale-on-press. Optional `withBorderBeam` prop. |
| `TechChip` | mono-sm pill in `--surface-2` with optional icon and href |
| `TechNode` | 80×80 surface tile for convergence diagram. Props: `icon`, `name`, `size?` (matches `Tech` schema field names so call sites are spread-friendly) |
| `Alert` | Toast-style success/error notification, dismissable |
| `Kbd` | Small mono pill for keyboard hints. Used sparingly. |
| `HomePage` | Compose 7 sections + Footer. No logic of its own. |
| `Hero` etc. (sections/) | Each section is self-contained: its own copy refs from `content/`, its own `BlurFade` orchestration, its own breakpoints |
| `ContactPage` | Eyebrow, H1, sub, then `ContactForm` |
| `ContactForm` | Form state, validation, submit to `/api/contact`, error/success display |

### 7.3 What gets deleted

See §5.2.

### 7.4 What gets kept and restyled

| File | Change |
|---|---|
| `src/components/contact/ContactForm.tsx` | Split into `ContactPage.tsx` + `ContactForm.tsx` under `src/app/contact/` |
| `src/components/layout/{Header,Footer,Layout}.tsx` | Full rewrites (see §5.3, §5.4, §7.2) |
| `src/components/ui/Alert.tsx` | Restyled to use new tokens, moved to `src/components/ui/alert.tsx` (lowercase per shadcn convention) |
| `src/components/ui/ThemeToggle.tsx` | Restyled with cross-fade icons (per make-interfaces-feel-better §7), scale-on-press |
| `src/components/ui/Logo.tsx` | Renamed to `src/components/ui/brand-mark.tsx`, extended with variant prop |
| `src/components/ui/TechnologyChip.tsx` | Renamed to `src/components/ui/tech-chip.tsx`, restyled with mono font |
| `src/config/constants.ts` | Trimmed; SOCIAL_LINKS moved to `content/site.ts`, kept as re-export for back-compat or deleted |
| `src/config/routes.tsx` | Simplified to `/` and `/contact` only |
| `src/api/contact.mjs` | Behavior unchanged; optional TypeScript schema added |
| `index.html` | Updated `<title>`, OG tags, meta description for new brand |
| `vite.config.ts` | Drop MDX plugin import |
| `vercel.json` | Unchanged (current rewrites still correct) |
| `tailwind.config.js` | Replaced by `globals.css` `@theme` directive under Tailwind 4; OR if v4 doesn't fit, kept minimal under v3 |
| `index.css` → `globals.css` | Renamed; expanded with all CSS custom properties + font-face declarations + universal rules |
| `README.md` | Rewritten for new project name, architecture, dev workflow, content edit instructions |

---

## 8. Content model

All copy lives in `src/content/`. Components import from there; never hardcode strings.

### 8.1 `src/content/site.ts`

```ts
export const BRAND = {
  full: "Junction Technologies LTD.",
  short: "Junction",
  legalSuffix: "LTD.",
  domain: "junctiontech.ca",
  contactEmail: "sam@junctiontech.ca",
  founded: 2024,
  founder: {
    name: "Sam Warren",
    title: "Founder & Principal Engineer",
    location: "Victoria, BC",
  },
} as const;

export const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/sam-warren/junction", icon: "github" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/junctiontech", icon: "linkedin" },
] as const;

export const COPY = {
  hero: {
    eyebrow: "Junction Technologies",
    headline: "Modernize without rewriting.", // [HERO_HEADLINE] — finalize during review
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
} as const;
```

### 8.2 `src/content/capabilities.ts`

```ts
import { Brain, Cloud, Code2, Network, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  feature?: boolean; // true for the 2-col feature card
}

export const CAPABILITIES: CapabilityCard[] = [
  {
    id: "system-integration",
    title: "System Integration",
    description: "Connect legacy systems to modern stacks without rebuilding from scratch. Junction designs the integration layer that lets your existing tools talk to new ones — REST, GraphQL, message queues, identity bridges, custom protocols.",
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

### 8.3 `src/content/case-studies.ts`

```ts
export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  year: string;
  outcome: string;       // 1-line outcome
  description?: string;  // longer copy for future case-study deep pages
  tech: string[];        // tech chip labels
  cover?: string;        // optional image path under /public/case-studies/
  link?: string;         // optional external link to a deep page
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "bc-justice-devops",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Justice and Public Sector DevOps",
    year: "2018–2024",
    outcome: "Application management for a dozen public-facing apps including liquor licensing, disaster assistance, and victim services.",
    tech: ["Angular", "TypeScript", ".NET", "Dynamics", "OpenShift", "Docker", "Kubernetes"],
  },
  {
    slug: "road-safety-initiative",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Road Safety Initiative",
    year: "2020–2022",
    outcome: "Digitized paper forms for RCMP and BC police, streamlining roadside prohibitions with seamless legacy integration.",
    tech: ["React", "Redux", "TypeScript", "Python", "PostgreSQL", "OpenShift"],
  },
  {
    slug: "health-gateway",
    client: "BC Ministry of Health",
    title: "Health Gateway",
    year: "2019–2021",
    outcome: "Cross-sector health information platform giving BC residents secure access to their health records.",
    tech: ["Vue.js", "TypeScript", ".NET", "PostgreSQL", "OpenShift"],
  },
  // PLACEHOLDER: add new case studies here as they're delivered.
  // The empty state will trigger if this array is empty;
  // a "More case studies coming soon" card renders if length < 3.
];
```

### 8.4 `src/content/tech-stack.ts`

```ts
export interface Tech {
  name: string;
  icon: string; // path to imported asset OR lucide icon name
  href?: string;
  category: "frontend" | "backend" | "database" | "devops" | "ai";
}

export const TECH_STACK: Tech[] = [
  // Frontend
  { name: "React", icon: "/tech/react.svg", category: "frontend", href: "https://react.dev/" },
  { name: "Next.js", icon: "/tech/nextjs.svg", category: "frontend", href: "https://nextjs.org/" },
  { name: "TypeScript", icon: "/tech/typescript.svg", category: "frontend", href: "https://www.typescriptlang.org/" },
  // ...port from existing AboutSection technologies array
];
```

### 8.5 Branding sweep

All occurrences of "JunctionTech", "JunctionTech Inc." across the codebase (currently 11+ in 6 files plus `index.html`, `README.md`, `BLOG_SETUP.md`) are replaced with `BRAND.full` or `BRAND.short`. Listed branding hits to fix:

| File | Line(s) | Current | Replace with |
|---|---|---|---|
| `src/components/layout/Header.tsx` | 37 | `JunctionTech` | `{BRAND.short}` |
| `src/components/layout/Header.tsx` | 160 | `JunctionTech Inc. — {currentYear}` | `{BRAND.full} — {currentYear}` |
| `src/components/layout/Footer.tsx` | 30 | `JunctionTech Inc. — {currentYear}` | `{BRAND.full} — {currentYear}` |
| `src/components/about/AboutSection.tsx` | (deleted) | — | — |
| `src/components/packages/PackagesSection.tsx` | (deleted) | — | — |
| `src/config/constants.ts` | 7, 12 | URLs containing `junctiontech` | Keep slugs (SEO continuity); display text via `BRAND` |
| `index.html` | 18, 33, 44 | `Junction: We Build Interfaces.` | `Junction Technologies LTD.` |
| `README.md` | 1-9 | Various | Full rewrite for new brand + architecture |
| `BLOG_SETUP.md` | (file deleted) | — | — |

---

## 9. Package upgrade plan

### 9.1 Strategy

The user explicitly asked for "update them to latest versions, reconcile any issues with the upgrade." We embrace the major migrations now, while every component is being rewritten — landing them piecemeal later would force re-touching every file again.

### 9.2 Removed

| Package | Reason |
|---|---|
| `@mdx-js/react`, `@mdx-js/rollup` | Blog removed (NG2) |
| `@tailwindcss/typography` | Blog removed; Tailwind 4 also restructures plugins |
| `gray-matter` | Blog removed |
| `lodash`, `@types/lodash` | Only used by `GridBackground` (deleted, D11) |
| `vercel` (in dependencies) | CLI shouldn't be a project dep — install globally |
| `path` | Browser polyfill, unused — Node's built-in `path` works in `vite.config.ts` |

### 9.3 Added

| Package | Use |
|---|---|
| `motion` | Magic UI animation engine (Framer Motion's successor package) |
| `clsx` | `lib/utils.ts` `cn()` helper |
| `tailwind-merge` | `lib/utils.ts` `cn()` helper |
| `class-variance-authority` | `Button` and chip variants |
| `@fontsource-variable/geist` | Geist Sans variable, self-hosted |
| `@fontsource-variable/geist-mono` | Geist Mono variable, self-hosted |

### 9.4 Major bumps

| Package | From → To | Notes |
|---|---|---|
| `react`, `react-dom` | 18.3 → **19.x latest** | `forwardRef` no longer needed for new components; ref-as-prop. Don't enable React Compiler. |
| `@types/react`, `@types/react-dom` | 18.3 → **19.x** | matches React 19 |
| `tailwindcss` | 3.4 → **4.x latest** | CSS-first config (`@theme` in `globals.css`, no more `tailwind.config.js`); class renames; plugin restructure. Run the official codemod (`npx @tailwindcss/upgrade`). |
| `vite` | 6 → **7.x latest** | Mostly internal changes; verify `@vitejs/plugin-react` peer-dep |
| `typescript` | 5.6 → **5.7+** | additive |
| `eslint`, `typescript-eslint` | latest | additive |
| `lucide-react` | 0.471 → **latest** | additive (icon library) |
| `@vercel/analytics`, `@vercel/speed-insights`, `@vercel/node`, `resend` | each → **latest stable** | additive |
| `react-router-dom` | 7.1 → **7.x latest** | additive |

### 9.5 Tailwind 4 migration notes

Major changes to be aware of in Phase 1:

- **CSS-first config**: `tailwind.config.js` is replaced by `@theme` block in `globals.css`. Token definitions live in CSS, referenced by Tailwind utilities.
- **Class renames** (run `npx @tailwindcss/upgrade` codemod):
  - `shadow-sm` → `shadow-xs`
  - `rounded` (no suffix) → `rounded-sm`
  - Various focus utilities consolidated
- **Postcss → Lightning CSS**: faster builds; postcss.config.js may go away
- **`@import` ordering**: Tailwind 4 expects `@import "tailwindcss"` at the top of CSS; no more `@tailwind base/components/utilities`
- **Plugin compatibility**: `@tailwindcss/typography` not needed (we drop it). Other plugins may need v4-compatible versions.

If a critical plugin lacks v4 support and we discover it during Phase 0 install: revert to Tailwind 3.4-latest. The migration can be redone post-redesign as an isolated effort.

### 9.6 React 19 migration notes

- `forwardRef` no longer required: `function MyButton({ ref, ...props }: { ref?: Ref<HTMLButtonElement> })` — refs as props
- `useFormStatus`, `useOptimistic`, `useFormState` available; we don't need these initially but Contact Form could use them later
- `<title>`, `<meta>` rendered by React directly; we manage these in `index.html` so no change
- Don't enable React Compiler in this redesign (separate decision)

### 9.7 Final `package.json` (target shape)

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
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  },
  "dependencies": {
    "@fontsource-variable/geist": "^5.x",
    "@fontsource-variable/geist-mono": "^5.x",
    "@vercel/analytics": "latest",
    "@vercel/node": "latest",
    "@vercel/speed-insights": "latest",
    "class-variance-authority": "^0.7.x",
    "clsx": "^2.x",
    "lucide-react": "latest",
    "motion": "^12.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "react-router-dom": "^7.x",
    "resend": "latest",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "@eslint/js": "latest",
    "@types/node": "^22.x",
    "@types/react": "^19.x",
    "@types/react-dom": "^19.x",
    "@vitejs/plugin-react": "latest",
    "eslint": "latest",
    "eslint-plugin-react-hooks": "latest",
    "eslint-plugin-react-refresh": "latest",
    "globals": "latest",
    "prettier": "latest",
    "prettier-plugin-tailwindcss": "latest",
    "tailwindcss": "^4.x",
    "@tailwindcss/vite": "^4.x",
    "typescript": "~5.x",
    "typescript-eslint": "latest",
    "vite": "^7.x"
  }
}
```

`"latest"` is used here for clarity; the implementation plan includes `bun add` commands that resolve to specific versions and lock them.

---

## 10. Magic UI setup

### 10.1 Setup commands (Phase 1)

```bash
# 1. shadcn init (Magic UI requires components.json)
npx shadcn@latest init -d   # defaults: Tailwind, src dir, alias @

# 2. Install our component subset
npx shadcn@latest add "https://magicui.design/r/dot-pattern.json"
npx shadcn@latest add "https://magicui.design/r/grid-pattern.json"
npx shadcn@latest add "https://magicui.design/r/animated-grid-pattern.json"
npx shadcn@latest add "https://magicui.design/r/blur-fade.json"
npx shadcn@latest add "https://magicui.design/r/magic-card.json"
npx shadcn@latest add "https://magicui.design/r/bento-grid.json"
npx shadcn@latest add "https://magicui.design/r/animated-beam.json"
npx shadcn@latest add "https://magicui.design/r/marquee.json"
npx shadcn@latest add "https://magicui.design/r/number-ticker.json"
npx shadcn@latest add "https://magicui.design/r/border-beam.json"
```

After install, components live under `src/components/magicui/`.

### 10.2 Components used and their slots

| Magic UI component | Used in section | Purpose |
|---|---|---|
| `DotPattern` | Hero | Ambient backdrop, 4% opacity, radial mask |
| `GridPattern` | Section dividers (optional) | 1-cell strip with beam transition |
| `AnimatedGridPattern` | Convergence | 6% opacity backdrop behind beam diagram |
| `BlurFade` | All sections | Universal text/section reveal |
| `MagicCard` | Capabilities | Cursor-tracking spotlight on cards |
| `BentoGrid` | Capabilities | Asymmetric grid layout (1 feature + 4 standard) |
| `AnimatedBeam` | Convergence | The 6 beams connecting tech nodes through BrandMark |
| `Marquee` | Stack section | Two-row scrolling tech logo strip |
| `NumberTicker` | (none initially; available for future stats) | Animates numerical values |
| `BorderBeam` | Primary CTA, Work cards (hover) | Animated perimeter beam |

### 10.3 Customization required after install

For each Magic UI component, after `shadcn add`:

1. **Replace hardcoded colors** with our CSS custom properties:
   - `text-foreground` → `text-[--text-primary]`
   - `bg-muted` → `bg-[--surface-1]`
   - `border-border` → `border-[--border]`
   - Accent colors → `--brand-300/400/500/700`
2. **Standardize spring config** in animation props: `{ type: "spring", duration: 0.3, bounce: 0 }` (bounce always 0 per make-interfaces-feel-better §7)
3. **Wire `useReducedMotion`** for: `BlurFade`, `AnimatedBeam`, `Marquee`, `AnimatedGridPattern`, `BorderBeam`. Each component needs to check `prefers-reduced-motion` and return a static fallback when reduced. Magic UI's coverage here is uneven; audit each at install time.
4. **Specific token tweaks**:
   - `MagicCard`: change spotlight color to `var(--brand-soft)`
   - `AnimatedBeam`: gradient stops `from-[--brand-300] via-[--brand-500] to-[--brand-700]`
   - `BorderBeam`: 8s duration, brand-300 → brand-700 stops, opacity gated to hover via parent CSS class

### 10.4 Note on motion library

Magic UI docs reference Framer Motion, but the package was renamed to **`motion`** (v12+). Imports change:

```ts
// Old
import { motion, AnimatePresence } from "framer-motion";
// New
import { motion, AnimatePresence } from "motion/react";
```

The Phase 1 install script includes a sed pass to update Magic UI imports from `framer-motion` to `motion/react`.

---

## 11. Motion language

### 11.1 Curves and durations

```ts
// src/lib/motion.ts
export const EASE = {
  default: [0.2, 0, 0, 1] as const, // Apple-flavored snap-out
  exit: [0.4, 0, 1, 1] as const,    // ease-in for exits
};

export const DURATION = {
  state: 200,    // hover, color shifts
  enter: 400,    // BlurFade entrances
  hero: 800,    // hero choreography
};

export const SPRING = {
  default: { type: "spring", duration: 0.3, bounce: 0 } as const,
  // bounce always 0 per make-interfaces-feel-better §7
};
```

### 11.2 Page-load choreography (`/`)

```
t=0ms     Header                instant fade (no BlurFade)
t=0ms     Hero eyebrow          BlurFade (delay 0)
t=100ms   Hero H1 line 1        BlurFade (delay 0.1)
t=200ms   Hero H1 line 2        BlurFade (delay 0.2)
t=300ms   Hero sub              BlurFade (delay 0.3)
t=400ms   Hero CTAs             BlurFade (delay 0.4)
t=600ms   Scroll cue            BlurFade (delay 0.6)
```

All subsequent sections are triggered by `IntersectionObserver` (threshold 0.1, rootMargin `0px 0px -10% 0px`). Cards within a section stagger 80ms each.

### 11.3 Hover behaviors (universal)

| Element | Behavior | Properties transitioned |
|---|---|---|
| Primary button | bg `brand-700` → `brand-600`, `--brand-glow` outer, `BorderBeam` shows, `active:scale-[0.96]` | `background-color`, `box-shadow`, `transform` |
| Ghost button / link | `text-tertiary` → `text-primary`, `underline-offset-2 → 4` | `color`, `text-underline-offset` |
| Card | `--shadow-md` → `--shadow-lg`, optional `BorderBeam` (Work cards only) | `box-shadow` |
| Theme toggle | Icon cross-fade per make-interfaces-feel-better §7: scale 0.25→1, opacity 0→1, blur 4→0px | spring `{duration: 0.3, bounce: 0}` |
| Marquee tech logo | opacity 40→100%, scale 1.04 | `opacity`, `transform` |
| Tech chip | bg `surface-2` → `surface-elevated`, `border` → `border-strong` | `background-color`, `border-color` |
| Inline link | `brand-300` → `brand-200`, `underline-offset-4` (no thickness change — jitter risk) | `color` |

**Forbidden:** `transition: all` anywhere. Use specific properties.

### 11.4 Scroll behaviors

- **Header bg blur**: triggers when `window.scrollY > 80`. Transition: `background-color 200ms`, `backdrop-filter 200ms`, `border-color 200ms`.
- **Scrollspy**: `IntersectionObserver` on each `<section id="...">`. Active when 50% in view. Active nav anchor: `text-[--text-primary]` + 2px `--brand-400` underline.
- **Smooth scroll**: `scroll-behavior: smooth` on `html`, with `prefers-reduced-motion` override to `auto`.
- **AnimatedBeam loop**: starts when convergence section ≥60% visible.
- **Marquee**: starts on mount (CSS animation, free).
- **Mouse parallax on hero dot pattern**: ±2px max in response to mouse position. Disabled on `prefers-reduced-motion` and below 1024px.

### 11.5 Reduced-motion fallbacks

`@media (prefers-reduced-motion: reduce)` and the `useReducedMotion` hook used in JS-driven motion:

| Effect | Fallback |
|---|---|
| `BlurFade` | Pure `opacity` 0→1, 200ms, no blur, no translate |
| `AnimatedBeam` | Static `<line>` elements drawn instantly |
| `Marquee` | Render first 6 logos in a fixed flex row, no animation |
| `AnimatedGridPattern` | Static grid (cells visible at 6%, no fade in/out) |
| `BorderBeam` | 1px static border in `--brand-soft` |
| `MagicCard` cursor spotlight | Disabled (just static surface) |
| `NumberTicker` | Static final number rendered immediately |
| Smooth scroll | Native `scroll-behavior: auto` |
| Hover transitions | Colors keep, durations clamp to ≤100ms |
| Mouse-parallax on hero dot pattern | Disabled |

### 11.6 Polish principles applied (the make-interfaces-feel-better skill checklist)

Every component implementation must satisfy:

- [ ] Concentric border radii (outer = inner + padding) — see §4.2
- [ ] Optical icon centering (manual offsets where geometric centering looks off)
- [ ] Shadows over borders for elevation — see §4.3
- [ ] Tabular nums on dynamic numbers (`font-variant-numeric: tabular-nums`)
- [ ] `text-wrap: balance` on headings
- [ ] `text-wrap: pretty` on body
- [ ] `-webkit-font-smoothing: antialiased` on root
- [ ] Image outlines: 1px black/white only, never tinted
- [ ] `active:scale-[0.96]` on buttons (0.96 exactly, never <0.95)
- [ ] `AnimatePresence initial={false}` on persistent UI
- [ ] No `transition: all` — specific properties only
- [ ] `will-change` only on `transform`, `opacity`, `filter` — never `all`
- [ ] Min 40×40 hit area on interactive elements (extend with pseudo-elements where needed)
- [ ] Icon cross-fade pattern (scale 0.25→1, opacity 0→1, blur 4→0, spring bounce 0)
- [ ] Split + stagger entrances (~100ms per chunk)
- [ ] Subtle exits (translateY 4px + opacity, never collapse-height)

The Phase 13 polish pass walks this checklist top-to-bottom across every component.

---

## 12. Implementation phases

Each phase ends with a green `bun run typecheck && bun run lint && bun run build` and a commit. The companion plan doc expands each phase into bite-sized TDD-style steps with exact file paths and code snippets.

| Phase | Title | Hours | Deliverable |
|---|---|---|---|
| 0 | **Branch + deps** | 1-2 | New branch `redesign/v2` from `main`. `package.json` rewritten (adds, removes, bumps). `bun install` clean. Dev server still runs on the existing site code. Linear board mirror task. Commit: `chore: dependency overhaul (foundation)`. |
| 1 | **Visual system** | 3-4 | `globals.css` with all CSS custom properties. Tailwind 4 `@theme` referencing them. Geist + Geist Mono loaded. `lib/utils.ts`, `lib/motion.ts`. shadcn init. All Magic UI components installed and color-customized. Demo route at `/__styles` (deleted before merge) showing tokens. Commit: `feat(design): foundational visual system`. |
| 2 | **Demolition + branding sweep** | 1-2 | Delete `blog/`, `packages/`, `BloomBackground`, `FrostedCard`, `CollapsibleSection`, `GridBackground`, `AboutSection`, `HeroSection`, `Logan.jpg`, `BLOG_SETUP.md`, MDX plugin from `vite.config.ts`. Routes simplified. `BRAND` in `content/site.ts`. All "JunctionTech" → `BRAND.short`/`full`. `index.html`, `README.md` updated. Commit: `refactor: drop blog/packages, rebrand to Junction Technologies LTD.`. |
| 3 | **Layout reset** | 2-3 | New `Layout.tsx` (in-flow). New `Header.tsx` (scroll-aware blur, anchor nav, scrollspy). New `Footer.tsx` (in-flow three-column). `ThemeToggle` restyled. `App.tsx` + `routes.tsx` simplified. `HomePage.tsx` + `ContactPage.tsx` shells render. Commit: `feat(layout): in-flow layout, scroll-aware header, anchor nav`. |
| 4 | **Content modules** | 1 | `content/site.ts`, `capabilities.ts`, `case-studies.ts`, `tech-stack.ts`. Existing 3 case studies ported. Capabilities populated. Tech-stack populated. Commit: `feat(content): typed content modules`. |
| 5 | **Hero** | 1-2 | `Hero.tsx` with DotPattern, BlurFade staggers, CTAs, scroll cue, mouse parallax. Mobile responsive. Commit. |
| 6 | **Capabilities** | 1-2 | `Capabilities.tsx` with BentoGrid, MagicCard cards, BlurFade. Mobile stacked. Commit. |
| 7 | **Convergence (the signature)** | 3-4 | `Convergence.tsx` with `TechNode`s, BrandMark center, 6 `AnimatedBeam`s with continuous staggered loop, `AnimatedGridPattern` bg. Mobile rotated 90° to vertical with 3 beams. Reduced-motion fallback. Commit. |
| 8 | **Work** | 2 | `Work.tsx` asymmetric grid, WorkCard with BorderBeam hover, source from `content/case-studies.ts`, empty state. Mobile stacked. Commit. |
| 9 | **Stack marquee** | 1 | `StackMarquee.tsx` two-row Marquee, monochrome logos, soft mask, hover. Commit. |
| 10 | **About** | 1 | `About.tsx` two-column, portrait, facts. Commit. |
| 11 | **CTA + assemble homepage** | 1 | `CTA.tsx` centered panel with BorderBeam button. Wire all sections into `HomePage.tsx`. Verify scroll. Commit. |
| 12 | **`/contact` page** | 1-2 | `ContactPage.tsx` + `ContactForm.tsx` extracted. Restyled inputs, brand-400 focus ring, Alert restyled, success/error flows. Submit end-to-end test. Commit. |
| 13 | **Polish pass** | 2-3 | Run the make-interfaces-feel-better checklist top to bottom (concentric radii, optical centering, shadows, tabular nums, text-wrap, font-smoothing, image outlines, scale-on-press, AnimatePresence initial=false, no transition:all, will-change audit, 40×40 hit areas). Reduced-motion audit. Lighthouse. Cross-browser. Commit. |
| 14 | **Tests + docs + deploy** | 2 | Minimal Vitest setup. Smoke tests (HomePage renders, ContactForm submits with valid input). README rewrite. CONTRIBUTING.md for content updates. New OG image generated. Push, verify Vercel preview, walk through every section. Commit. |

**Total: 22-30 focused hours.** A single dedicated implementation session over a few days, or 2-3 sittings.

The implementation plan at `docs/superpowers/plans/2026-04-23-junction-redesign-implementation.md` expands each row into its constituent bite-sized steps with exact file paths, code snippets, and commands.

---

## 13. Open risks & deferred decisions

| # | Item | Resolution |
|---|---|---|
| 1 | **Tailwind 4 plugin compatibility** | Low risk (we drop the only plugin). Phase 0 includes a checkpoint to revert to Tailwind 3.4 if a critical plugin is missing. |
| 2 | **AnimatedBeam mobile performance** | 6 beams + AnimatedGridPattern can be heavy on low-end mobile. Phase 7 includes a mobile branch that drops to 3 beams (one per pair) and pauses the grid pattern animation below 768px. |
| 3 | **Case study cover images** | All `CaseStudy.cover` start as `null`. Cards render without images by default; the design must look complete with no images. If images are supplied later, add to `public/case-studies/`. |
| 4 | **OG image regeneration** | Current `og-image.png` is JunctionTech-branded. Phase 14 generates a new one matching the new visual system (Junction wordmark + tagline on near-black with brand-700 accent). The deep blue can stay as a backdrop in the new OG to preserve brand carryover. |
| 5 | ~~**Domain & email**~~ **RESOLVED 2026-04-23** | Domain: `junctiontech.ca` (kept). Contact email: `sam@junctiontech.ca` (replaces `samwarren4@gmail.com`). Both live in `src/content/site.ts` `BRAND`. |
| 6 | ~~**GridBackground floating-logo**~~ **RESOLVED 2026-04-23** | Decision: **delete** (no easter-egg variant). The convergence section's central BrandMark `variant="loop"` already provides any continuity-of-motion the deleted background offered. |
| 7 | **Hero copy** *(needs user decision during spec review or Phase 5)* | All hero/CTA copy in spec is marked as placeholders with 2-3 alternatives. Sign off on copy during user review of DESIGN.md or in Phase 5. |
| 8 | **LinkedIn slug** | `linkedin.com/company/junctiontech` — keep slug for SEO continuity, just update display name in LinkedIn admin. No code change needed. |
| 9 | **Test scope** | Marketing site, low test ROI. Plan includes minimal smoke tests; if you want fuller coverage (a11y tests, visual regression with Playwright), add a follow-up phase. |
| 10 | **Linear board mirror** | Phase 0 of the plan includes a step to authenticate Linear MCP (interactive flow), then create one Linear issue per phase, each linking back to the plan section. The user kicks off auth the first time the implementation agent runs. |
| 11 | **Tech stack icon assets** | Existing `src/assets/*.svg` icons are used by current AboutSection. They port directly to the new `tech-stack.ts` and the StackMarquee. If any are color-tinted SVGs, they need to be re-rendered as monochrome (currentColor). |
| 12 | **`api/contact.mjs` schema typing** | Optional improvement. Could add Zod validation. Out of scope unless user wants it. |

---

## 14. Out of scope / future work

These were considered but explicitly deferred to keep this redesign tight:

- **Blog reintroduction** — could come back as `/notes` later. Not now.
- **Headless CMS** — content as code is the right call for v2. CMS only justified once non-engineers edit weekly.
- **Case study deep pages** — when case studies grow past 1-line outcomes, consider individual `/work/<slug>` pages. The `case-studies.ts` schema already supports `description` and `link` for this future expansion.
- **Multilingual support (FR for BC public sector)** — possibly relevant for government work; defer until requested.
- **Booking calendar embed** — `/contact` is a form for now. Cal.com or Savvycal embed is an easy add later.
- **Analytics dashboards** — Vercel Analytics and Speed Insights stay; no PostHog or custom tracking added.
- **Newsletter signup** — no plan for one currently.
- **Tailwind 4 → 5** — when it ships, easy migration since v4 is CSS-first already.
- **React Compiler** — when the team is comfortable; not enabled in this redesign.
- **Storybook for components** — useful if the design system grows beyond this project. Not justified for one site.
- **Visual regression tests** — Playwright + percy would be lovely but out of scope.
- **Per-section A/B testing** — Vercel feature flags could enable this. Not now.

---

## Appendix A — Reference inspiration links

- [vercel.com](https://vercel.com) — restraint, dot patterns, typographic monumentality
- [linear.app](https://linear.app) — narrative scroll, gradient accents
- [supabase.com](https://supabase.com) — developer-technical aesthetic, dark canvas
- [cloudflare.com](https://cloudflare.com) — system-architectural visual storytelling
- [magicui.design](https://magicui.design) — component primitives we vendor

## Appendix B — Skills referenced

- `frontend-design:frontend-design` — distinctive frontend with bold aesthetic direction
- `make-interfaces-feel-better` — polish principles applied throughout (see §11.6 checklist)
- `superpowers:brainstorming` — process used to produce this spec
- `superpowers:writing-plans` — used to produce the companion implementation plan

---

*End of design document. Companion implementation plan: `docs/superpowers/plans/2026-04-23-junction-redesign-implementation.md`.*
