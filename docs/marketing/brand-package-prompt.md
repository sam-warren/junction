# Junction Technologies — Marketing Package Brief

This document is the authoritative brand brief to hand to ChatGPT Image 2.0 (via Codex or directly) when generating marketing assets for Junction Technologies LTD. Feed it as the system / persistent context, then ask for each asset by name.

The facts below are extracted from the shipped product site (`redesign/v2` on GitHub) so every asset ties back to something a prospective client can see at https://junction-technologies.com.

---

## 1. Brand Identity

| Field | Value |
|---|---|
| Legal name | Junction Technologies LTD. |
| Short name | Junction |
| Domain | junction-technologies.com |
| Founder | Sam Warren, Founder & Principal Engineer |
| Founded | 2024 |
| Location | Victoria, BC |
| Positioning | Independent software consultancy specializing in interface design and full-stack implementation |
| Primary audience | Governments, energy operators, engineering teams that need polished, reliable tooling |

## 2. Positioning & Voice

**One-line pitch**
> An independent software consultancy. We design and build interfaces, from UX research through production code.

**Rotating tagline** (live on the site hero, `We Build ___`)
> Interfaces · Dashboards · Platforms · Products · Tools

**Voice**
- Concise, professional, technically literate.
- No em dashes, no filler adverbs ("actually", "really"), no marketing-buzzword stacks.
- Sentences are short. Claims are specific. Every promise links to evidence in the Selected Work section.

**Capabilities** (the six practice areas)
1. Interface Design. UX research, design systems, design-to-code pipelines.
2. Full-Stack Implementation. TypeScript front to back. Spec to ship.
3. Data Visualization. Dashboards for complex datasets, built so non-technical stakeholders can use them.
4. System Integration. APIs, queues, identity bridges, custom protocols.
5. AI Integration. LLMs embedded into existing workflows (agents, RAG, structured extraction).
6. Platform & DevOps. Container orchestration, CI/CD, cloud infrastructure.

## 3. Visual System

Extracted verbatim from `src/globals.css` and the site components. Use these exact values in generated assets.

### 3.1 Color palette

| Token | Hex | Role |
|---|---|---|
| `--color-brand-300` | `#94A4E2` | Light accent, rotating headline word, beam start |
| `--color-brand-400` | `#6B7ED4` | Focus rings |
| `--color-brand-500` | `#4A60C7` | **Primary action color** (buttons, lamp, beam stop) |
| `--color-brand-600` | `#3650B6` | Hover state |
| `--color-brand-700` | `#2642A9` | Brand anchor (press feedback only) |
| `--color-brand-900` | `#1A2D75` | Deep accent (rare) |
| `--canvas` (dark) | `#0A0A0A` | Default page background |
| `--canvas` (light) | `#FAFAF9` | Light theme page background |
| `--text-primary` (dark) | `#F5F5F7` | Headline text on dark |
| `--text-primary` (light) | `#0A0A0A` | Headline text on light |

Default theme: **dark**. Most social assets should land in dark mode. Light variants exist for contexts that demand it (LinkedIn feed images mixed with bright UGC).

### 3.2 Gradients & effects

- **Lamp gradient**: two conic gradients seeded at brand-500 converging downward into a blurred horizontal bar. Think "theatrical spotlight pooling onto text". Low saturation, high blur, subtle opacity (0.2 to 0.55 at peak).
- **Dot pattern**: ambient dot grid at 8% white opacity (dark) or 6% black (light), with a radial mask that reveals dots near the edges and hides them in the center where text sits.
- **Convergence beams**: animated gradient beams flowing from legacy tech nodes on the left, through a central Junction brandmark, to modern tech nodes on the right. Beam color gradient: `#94A4E2` to `#4A60C7`.

### 3.3 Typography

| Usage | Family | Weight | Notes |
|---|---|---|---|
| Display / body | Geist Variable | 400 / 600 | Variable font, broad weight range |
| Mono (eyebrows, terminal, tech chips) | Geist Mono Variable | 400 | Used for UPPERCASE tracking-wider eyebrows |

If Geist is not available in image gen, approximate with: Inter, then Söhne, then system-ui. **Never use Arial, Roboto, or Helvetica**. They collapse the brand to "generic SaaS" territory.

Type scale:
- Display 2xl: 96px
- Display xl: 72px
- Display lg: 56px
- Display md: 40px
- Body: 16px
- Mono sm: 13px

### 3.4 Logo mark

The `BrandMark` is three strokes drawn in SVG inside a 100x100 viewBox:

```
stroke 1: M15,50 L95,50        (horizontal spine, 80px long)
stroke 2: M15,20 L55,20 L70,50  (top bracket joining spine at midpoint)
stroke 3: M15,80 L55,80 L70,50  (bottom bracket joining spine at midpoint)
```

**Interpretation**: two side paths merging into a single main line, a literal "junction". Strokes are 10px, round caps, rendered in brand-300 on dark canvases and brand-700 on light canvases.

On the site, the mark draws itself via stroke-dashoffset as the user scrolls into the Convergence section. Any generated logo variant should preserve this three-stroke, two-merge-into-one silhouette.

### 3.5 Spatial vocabulary

- **Concentric radii**: outer radius = inner radius + padding. Cards `rounded-[16px]` with `p-8` use `rounded-[8px]` children. Match in generated compositions.
- **Grid rhythm**: 3-column bento on desktop. Feature cards span 2 columns.
- **Shadows over borders**: layered low-opacity box shadows for depth; solid borders only at token boundaries.
- **Dot matrices, not photography**: background texture in assets should be geometric (dots, grids, beams), not stock photos.

## 4. Asset Manifest

Each entry below is its own prompt template. Feed the brand section above as context, then the specific prompt.

### 4.1 OG image, default share card

- **Dimensions**: 1200x630
- **File**: `public/og-image.png`
- **Prompt**:
  > Horizontal 1200x630 social share card. Dark background `#0A0A0A`. Subtle radial dot-matrix texture in the upper-left and lower-right corners at 8% white opacity, faded toward the center. Centered horizontally: three-stroke Junction brandmark in `#94A4E2` (two side paths merging into a horizontal spine). Below the mark, 72px Geist semibold white: "We Build Interfaces." Below that, 18px Geist light gray `#A1A1AA`: "An independent software consultancy." A soft brand-500 `#4A60C7` lamp gradient pools from above, halo effect, not dominating. Tight margins, generous negative space. No photography. No gradients on text. Period after "Interfaces" is subtle, not decorative.

### 4.2 OG image, secondary variants (one per rotating word)

Same prompt as 4.1, replacing the headline:
- `We Build Dashboards.`
- `We Build Platforms.`
- `We Build Products.`
- `We Build Tools.`

Intended for A/B testing LinkedIn shares.

### 4.3 LinkedIn company banner

- **Dimensions**: 1128x191
- **Prompt**:
  > Wide horizontal banner 1128x191. Dark `#0A0A0A` background. Three convergence beams flowing left-to-right: each beam starts as a small `#94A4E2` tech-node square on the left, traces a curved path rightward, passes through a central Junction brandmark (three-stroke merge, `#4A60C7` stroke), and ends at a second tech-node square on the right. Beams animated-gradient style but rendered as a still frame with motion-blur artifacts along the path. Subtle dot matrix in the background. Bottom-right corner: small mono-font text in `#71717A`: "junction-technologies.com". No marketing copy. No stock photography.

### 4.4 LinkedIn personal banner (Sam Warren)

- **Dimensions**: 1584x396
- **Prompt**:
  > Wide banner 1584x396. Dark `#0A0A0A`. Left third: Sam Warren's profile silhouette framed against a subtle dot-matrix background with a `#4A60C7` lamp halo behind the head. Right two-thirds: vertically centered mono-font eyebrow in `#94A4E2` "FOUNDER & PRINCIPAL ENGINEER", below it in 56px Geist semibold white "Junction Technologies", below that in 16px gray "Victoria, BC · Interface design + full-stack implementation". Small brandmark in the far right as a watermark at 20% opacity.

### 4.5 Twitter / X header

- **Dimensions**: 1500x500
- **Prompt**:
  > Wide banner 1500x500. Dark `#0A0A0A`. Centered convergence diagram: three small squares on the left labeled `Angular · .NET · OpenShift` in mono 13px gray, three on the right labeled `React · Python · Azure` in mono 13px `#94A4E2`, Junction brandmark in the center in `#4A60C7`. Animated-beam style curves connecting each pair through the center. Above the diagram, 40px Geist semibold white: "Where design meets implementation." No photography. No gradients on text.

### 4.6 Instagram post (square)

- **Dimensions**: 1080x1080
- **Prompt**:
  > Square 1080x1080. Dark `#0A0A0A` background. Top-left mono eyebrow in `#94A4E2`: "WE BUILD". Below it, giant 120px Geist semibold white "Interfaces." (or rotate with Dashboards, Platforms, Products, Tools). Below, 18px gray `#A1A1AA`: "An independent software consultancy. From UX research through production code." Bottom: three-stroke brandmark + "junction-technologies.com" in mono. Subtle lamp halo from above.

### 4.7 Favicon set

- **Dimensions**: 16x16, 32x32, 48x48, 180x180 (Apple touch), 512x512 (PWA)
- **Prompt**:
  > Just the three-stroke Junction brandmark, `#4A60C7` on a transparent background. Strokes must remain crisp at 16x16: round caps, 10px stroke (relative to 100px viewBox). No background fill, no surrounding text. For the 180x180 Apple touch variant, add a 12% horizontal padding and a dark `#0A0A0A` rounded-square backdrop so it reads on iOS home screens.

### 4.8 Logo mark variants (assets/)

Export each as SVG + PNG:
1. **Mono dark**: `#94A4E2` strokes on transparent (for dark backgrounds)
2. **Mono light**: `#2642A9` strokes on transparent (for light backgrounds)
3. **Reversed**: white `#FFFFFF` strokes on transparent (for colored backgrounds)
4. **Stacked with wordmark**: mark above "JUNCTION" wordmark in Geist Mono uppercase, tracking-wider
5. **Inline with wordmark**: mark to the left of "Junction Technologies" in Geist semibold
6. **Glyph only**: just the mark, trimmed to bounding box

### 4.9 Email signature banner

- **Dimensions**: 600x150
- **Prompt**:
  > Email-signature-sized banner 600x150. Dark `#0A0A0A` left two-thirds, light `#FAFAF9` right one-third, separated by a diagonal blend. Left: brandmark in `#94A4E2` + "JUNCTION TECHNOLOGIES" in Geist Mono 13px tracking-wider. Right: three mono-font lines in `#52525B`: "Sam Warren / Founder & Principal Engineer / sam@junctiontech.ca". No photos. No CTAs.

### 4.10 Business card (front + back)

- **Dimensions**: 1050x600 at 300 DPI (3.5" x 2")
- **Front prompt**:
  > Dark `#0A0A0A` business card front. Centered horizontal three-stroke brandmark in `#94A4E2`, stroke width 10px at 100px reference. Below the mark in Geist semibold white 24px: "Junction Technologies". Below that in Geist Mono 10px `#71717A` tracking-wider uppercase: "SOFTWARE CONSULTANCY".
- **Back prompt**:
  > Light `#FAFAF9` business card back. Top-left Geist Mono 9px tracking-wider `#4A60C7` uppercase: "FOUNDER & PRINCIPAL ENGINEER". Below in Geist 20px semibold black: "Sam Warren". Below in Geist 12px `#52525B`: "sam@junctiontech.ca / +1 (XXX) XXX-XXXX". Bottom-right: brandmark in `#2642A9` at 40% opacity.

### 4.11 Slide deck title slide template

- **Dimensions**: 1920x1080 (16:9)
- **Prompt**:
  > Dark `#0A0A0A` deck title slide. Top-left quadrant: brandmark + "JUNCTION TECHNOLOGIES" wordmark in Geist Mono. Center-left: 72px Geist semibold white headline slot (placeholder "Proposal title goes here."). Below: 20px gray subtitle slot. Right third: soft `#4A60C7` lamp gradient + dot matrix. Bottom mono 13px `#71717A`: "junction-technologies.com · YYYY".

---

## 5. SEO Copy Library

Use these verbatim for meta tags, link previews, and CTA buttons. They already live on the site, so keeping marketing assets aligned reduces friction.

### 5.1 Meta tags (already shipping)

```html
<title>Junction Technologies, Software consultancy in Victoria, BC</title>
<meta name="description" content="Independent software consultancy. Interface design and full-stack implementation for governments, energy operators, and engineering teams. Victoria, BC.">
<meta property="og:title" content="Junction Technologies">
<meta property="og:description" content="We design and build interfaces, from UX research through production code.">
<meta property="og:image" content="https://junction-technologies.com/og-image.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@junctiontech">
```

### 5.2 CTA variants

| Context | Copy |
|---|---|
| Hero primary | Start a project |
| Hero secondary | See our work |
| CTA section primary | Start a project |
| CTA section secondary | or email sam@junctiontech.ca |
| Contact form submit | Send message |
| Selected Work link | View case study |
| Product card link | Visit cedh.io |

### 5.3 Short descriptions (75, 150, 300 chars)

- **75 chars** (bio line / LinkedIn headline slot): *Independent software consultancy. Interfaces, end-to-end.*
- **150 chars** (LinkedIn About intro / Twitter bio): *Independent software consultancy. We design and build interfaces, from UX research through production code. Victoria, BC.*
- **300 chars** (Link preview body / Instagram bio blurb): *Junction Technologies is an independent software consultancy in Victoria, BC. We design and build interfaces for governments, energy operators, and engineering teams. UX research through production code, plus the platform plumbing that keeps shipped software running.*

---

## 6. How to Use This Brief in Codex / ChatGPT Image 2.0

**Codex CLI session**

```
codex exec --model gpt-image-2 \
  --system "$(cat docs/marketing/brand-package-prompt.md)" \
  --prompt "Generate asset 4.1: the default OG image. Output as PNG at 1200x630."
```

**Direct ChatGPT Image 2.0**

1. Paste Section 1 through Section 3 into the system context.
2. Ask: "Generate the asset described in Section 4.1. Output as PNG at 1200x630."
3. Repeat for 4.2 through 4.11, one call per asset.

**Batch generation tip**: when generating logo variants (4.8), ask for them as a single grid image first to verify they share the same silhouette, then regenerate the selected variant at full resolution.

---

## 7. What NOT to generate

- No human photography that looks like stock (business handshakes, laptops on desks, cityscapes). Silhouettes and abstract treatments only.
- No iridescent purple-to-pink gradients. No "AI startup" aesthetics.
- No circuit-board motifs, no neural-network graphs, no glowing orbs.
- No overused typography: Inter, Arial, Roboto, Helvetica, Times.
- No generic "code editor screenshot" hero images.
- No emojis on the brandmark or wordmark.

---

## 8. Verification Checklist

Before approving generated assets, confirm:
- [ ] Colors match the exact hex codes in Section 3.1 (not close, exact)
- [ ] Brandmark has three strokes, two merging into one (not a monogram, not a sphere)
- [ ] Typography uses Geist or a listed fallback, never a banned family
- [ ] Dark assets use `#0A0A0A` canvas, not pure black `#000000`
- [ ] No em dashes in generated copy
- [ ] Asset dimensions match the spec exactly
- [ ] No stray brand elements (ghost shapes, floating dots) outside the composition
