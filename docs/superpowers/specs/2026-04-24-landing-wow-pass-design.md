# Landing Wow Pass — Design

**Date**: 2026-04-24
**Branch**: `redesign/v2`
**Status**: Design approved, pending spec review

## 1. Problem

The Junction landing page (shipped 2026-04-23) has a strong foundation but reads as "another consultancy site." It needs signature interactions and truthful content that reflect Sam's actual practice: interface design, full-stack implementation, and a portfolio spanning public sector, energy, and a bootstrapped product (cedh.io).

## 2. Goals

1. Add a 6th capability so the bento reads as a complete practice.
2. Rewrite Selected Work with 6 real entries and corrected dates.
3. Introduce 2 wow-factor interactions without cheapening the brand.
4. Fix motion polish issues (marquee stop, invisible dark icons).
5. Keep copy concise, professional, no em dashes.

## 3. Non-goals

- No gimmicky effects (meteors, sparkles, wobble cards).
- No full content model overhaul. Existing types extend cleanly.
- No mobile-only redesign. Mobile parity through existing patterns.
- No new "By the Numbers" section (deferred; user skipped NumberTicker add).

## 4. Decisions

### 4.1 Sixth capability: Platform & DevOps

```ts
{
  id: "platform-devops",
  title: "Platform & DevOps",
  description:
    "Container orchestration, CI/CD, and cloud infrastructure. OpenShift, Kubernetes, Azure, and Vercel: the plumbing that keeps shipped software running.",
  icon: Server, // lucide-react
}
```

Position in bento grid: 6th slot. `feature: true` stays on Interface Design only.

### 4.2 Convergence icon pairings (α)

Three rows, legacy to modern:

| Layer | Legacy | Modern |
|---|---|---|
| UI | Angular | React |
| Runtime | .NET | Python |
| Platform | OpenShift | Azure |

Requires adding Python + Azure as `MODERN` and preserving Angular + .NET + OpenShift as `LEGACY`. Tech stack entries exist for all six.

### 4.3 Hero rotating word

- Component: Magic UI `WordRotate` (install: not currently in `src/components/magicui/`).
- Words: `["Interfaces", "Dashboards", "Platforms", "Products", "Tools"]`.
- Cycle: 2500ms.
- Hero headline becomes: `We Build <WordRotate>.`
- Fixed-height container prevents layout shift.

### 4.4 Wow-factor components

Two approved additions:

**A. Aceternity Lamp Effect (Hero background)**
- Source: https://ui.aceternity.com/components/lamp-effect
- Usage: wraps the Hero text block. Gradient "lamp" pools light behind the rotating headline.
- Placement: behind the existing DotPattern layer, in front of the section background.
- Z-index sequencing: DotPattern (z-0, mask-gated) then Lamp (z-1, behind text) then Text (z-10).

**B. Magic UI Terminal (new "Approach" micro-section)**
- Source: https://magicui.design/docs/components/terminal
- Usage: animated terminal typing through a build sequence.
- Placement: new section between Convergence and Work.
- Content (tentative, to refine during implementation):
  ```
  $ junction
  > research       [ok] interviews, stakeholder mapping, domain audit
  > design         [ok] system, components, prototypes
  > implement      [ok] frontend, backend, platform
  > ship           [ok] CI/CD, observability, iteration
  ```
- Eyebrow: "Approach". Heading: "How work moves."

**Skipped**: NumberTicker (no "By the Numbers" section), 3D Pin on cedh.io, Tracing Beam.

## 5. Selected Work overhaul

### 5.1 Case studies rewrite (6 entries)

Extend `CaseStudy` type with optional `kind: "client" | "product"` and optional `metrics?: { label: string; value: string }[]` for cedh.io.

```ts
// src/content/case-studies.ts
{
  slug: "jupiter-power",
  client: "Jupiter Power",
  title: "Application redesign + UX research",
  year: "2026-Present",
  outcome: "Application redesign, UX research, and implementation for an energy storage operator.",
  tech: ["Figma", "React", "Python", "Azure", "TypeScript"],
  kind: "client",
},
{
  slug: "vantix-alberta",
  client: "Vantix Systems / Gov. of Alberta",
  title: "Government energy portals",
  year: "2025-2026",
  outcome: "Built net-new government portals for energy management and data organization.",
  tech: ["React", "Python", "Azure", "TypeScript", "TanStack", "shadcn", "Tailwind", "Recharts"],
  kind: "client",
},
{
  slug: "bc-justice-devops",
  client: "BC Ministry of Public Safety and Solicitor General",
  title: "Justice DevOps",
  year: "2024-2025",                    // corrected from 2018-2024
  outcome: "Application management for a dozen public-facing apps including liquor licensing, disaster assistance, and victim services.",
  tech: ["Angular", "TypeScript", ".NET", "Dynamics", "OpenShift", "Docker", "Kubernetes"],
  kind: "client",
},
{
  slug: "road-safety-initiative",
  client: "BC Ministry of Public Safety and Solicitor General",
  title: "Road Safety Initiative",
  year: "2023-2024",                    // corrected from 2020-2022
  outcome: "Digitized paper forms for RCMP and BC police, streamlining roadside prohibitions with legacy integration.",
  tech: ["React", "Redux", "TypeScript", "Python", "PostgreSQL", "OpenShift"],
  kind: "client",
},
{
  slug: "health-gateway",
  client: "BC Ministry of Health",
  title: "Health Gateway",
  year: "2019-2021",
  outcome: "Cross-sector health information platform giving BC residents secure access to their health records.",
  tech: ["Vue.js", "TypeScript", ".NET", "PostgreSQL", "OpenShift"],
  kind: "client",
},
{
  slug: "cedh-io",
  client: "cedh.io",
  title: "Competitive EDH deck analysis",
  year: "2024-Present",
  outcome: "Full-stack Magic: The Gathering analytics product. Proprietary aggregation of tournament APIs recommends cards for Competitive EDH decks.",
  tech: ["Next.js", "Vercel", "Supabase", "Redis", "TypeScript", "shadcn", "Tailwind", "TanStack", "Recharts"],
  kind: "product",
  metrics: [
    { label: "Active users", value: "1,500+" },
    { label: "MRR", value: "$250 CAD" },
  ],
  link: "https://cedh.io",
},
```

### 5.2 Layout

Desktop grid (3 columns):
- Row 1: Jupiter (feature, col-span-2) + Vantix (1 col)
- Row 2: Justice DevOps + Road Safety + Health Gateway (3 x 1 col)
- Row 3: cedh.io (full-width product card)

cedh.io spans full width as the closer. Product-kind card uses a distinct visual: right-aligned stat column (`1,500+ users / $250 MRR`) balanced against left-side copy. Tags still present.

### 5.3 cedh.io card visual differentiation

- Eyebrow color shifts from brand-300 to a secondary accent (warm neutral) to signal "this one's ours."
- "Product" micro-tag in the corner.
- External link arrow to cedh.io.
- Metrics row rendered as two mono-font stat blocks, not a chip list.

## 6. Motion + icon fixes

### 6.1 Ease-out marquee stop

Extend `Marquee` with opt-in `smoothStop` prop:

```tsx
interface MarqueeProps {
  // existing props
  smoothStop?: boolean; // default false, preserves current pauseOnHover behavior
}
```

Implementation uses `@property --marquee-speed` declared in `globals.css`:

```css
@property --marquee-speed {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}

.marquee-smooth-track {
  animation-duration: calc(var(--duration) / var(--marquee-speed));
  transition: --marquee-speed 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.marquee-smooth-root:hover .marquee-smooth-track {
  --marquee-speed: 0.01;
}
```

Applied to StackMarquee only. Other callers unchanged.

### 6.2 Invisible dark icon fix

Extend `Tech` type with optional `darkLogo?: true` flag on entries whose source SVGs are dark-on-transparent and collapse under `grayscale dark:invert`:

- `shadcn/ui`
- `Vercel`
- `Next.js`
- `Express` (if added later)

Rendering logic in StackMarquee + TechNode:

```tsx
const filterClass = tech.darkLogo
  ? "[filter:invert(0.55)_grayscale(1)] dark:[filter:invert(0.9)_grayscale(1)]"
  : "grayscale dark:invert";
```

Result: dark logos render as ~55% gray in light mode and ~90% gray (bright) in dark mode. Other logos keep current treatment.

## 7. Copy policy

- No em dashes in user-facing strings. Hyphens where needed ("spec-to-ship" style) or periods/colons for pauses.
- Concise: single-thought sentences. Cut filler adverbs ("actually", "really").
- Professional: avoid idioms and self-deprecating tone.
- Scope: applies to all new copy in this pass and any sentences touched while editing.

Final pass sweeps `src/content/site.ts`, `capabilities.ts`, `case-studies.ts` for em dashes and verbose phrasing. Existing strings stay unless they're being edited anyway (YAGNI).

## 8. Order of operations

Each item is a separate commit and Linear issue.

1. Content model: extend types (`kind`, `metrics`, `darkLogo`), rewrite case-studies + capabilities, flag dark logos.
2. Motion primitives: extend Marquee with `smoothStop`, install/author `WordRotate`.
3. Hero: integrate WordRotate + Lamp Effect.
4. Approach section: author Terminal micro-section between Convergence and Work.
5. Work section: 6-card layout + product-kind treatment for cedh.io.
6. Convergence: swap pairings to α.
7. Gray icon fix: apply `darkLogo` rendering in StackMarquee + TechNode.
8. Copy polish: em-dash audit + tightening pass.

## 9. Assets needed from svgl.app

Sam to fetch and drop into `src/assets/`:

- **`recharts.svg`**: required for Vantix + cedh.io case study tags.

All other icons already present (azure, python, typescript, nextjs, vercel, supabase, redis, shadcn, tailwind, tanstack, react).

## 10. Risks

- **`@property` browser support**: Safari 16.4+, Chrome 85+, Firefox 128+. Acceptable for a 2026 marketing site. Graceful fallback: without `@property`, the variable is untyped and the transition is skipped; marquee still pauses on hover without the ease-out. No broken state.
- **Lamp Effect contrast**: gradient must not obscure the rotating text. Implementation checks contrast in both light and dark themes.
- **Terminal section length**: if the typed animation runs too long, users bounce. Cap total animation at ~4 seconds.
- **cedh.io "product" styling drift**: if differentiation is too subtle, reads as "just another card." Visual distinction (stat columns, accent color) must be legible at a glance.

## 11. Testing

- Existing `HomePage.test.tsx` smoke test should continue to pass.
- Visual check in light + dark, desktop + mobile, for:
  - Marquee ease-out stop on hover
  - Dark logo visibility
  - Rotating word layout stability (no CLS)
  - Lamp Effect contrast
  - Terminal section responsive behavior
  - cedh.io card treatment
- No new unit tests needed (content changes + visual-layer additions).

## 12. Linear

Issues to create under Junction project:

1. Extend content types + rewrite case studies + add Platform & DevOps
2. Marquee smoothStop + install WordRotate
3. Hero: WordRotate + Lamp Effect
4. Approach: Terminal micro-section
5. Work: 6-card layout + cedh.io product treatment
6. Convergence: pairing swap to α
7. Dark-logo gray fix
8. Copy polish sweep

Each issue links back to this spec.
