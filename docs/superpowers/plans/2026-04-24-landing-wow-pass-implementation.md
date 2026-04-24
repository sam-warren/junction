# Landing Wow Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the content + motion + wow-factor changes specified in `docs/superpowers/specs/2026-04-24-landing-wow-pass-design.md` on branch `redesign/v2`.

**Architecture:** Work bottom-up through the content model, then motion primitives, then section-level integrations. Extend existing types rather than replacing them. All new Magic UI + Aceternity components are authored locally (no registry fetch). Each task produces a self-contained commit.

**Tech Stack:** React 19, TypeScript, Tailwind 4, Vite 7, motion/react, Magic UI + Aceternity patterns (locally authored), lucide-react, CSS `@property`.

---

## File Structure

### Create
- `src/components/magicui/word-rotate.tsx`
- `src/components/magicui/terminal.tsx`
- `src/components/aceternity/lamp.tsx`
- `src/app/home/sections/Approach.tsx`

### Modify
- `src/content/capabilities.ts` (add 6th)
- `src/content/case-studies.ts` (extend type, rewrite 6 entries)
- `src/content/tech-stack.ts` (darkLogo flag)
- `src/content/site.ts` (hero split, approach copy)
- `src/globals.css` (@property + smoothStop styles)
- `src/components/magicui/marquee.tsx` (smoothStop prop)
- `src/components/ui/tech-node.tsx` (darkLogo filter)
- `src/app/home/sections/StackMarquee.tsx`
- `src/app/home/sections/Convergence.tsx`
- `src/app/home/sections/Hero.tsx`
- `src/app/home/sections/Work.tsx`
- `src/app/home/HomePage.tsx` (insert Approach)
- `src/app/home/HomePage.test.tsx` (match new hero prefix)
- `src/config/routes.tsx` (approach anchor, if present)

---

## Task 1: Extend CaseStudy type and rewrite case studies

**Files:** Modify `src/content/case-studies.ts`

- [ ] **Step 1: Replace file**

```ts
export interface CaseStudyMetric {
  label: string;
  value: string;
}

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
  kind?: "client" | "product";
  metrics?: CaseStudyMetric[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "jupiter-power",
    client: "Jupiter Power",
    title: "Application redesign and UX research",
    year: "2026-Present",
    outcome:
      "Application redesign, UX research, and implementation for an energy storage operator.",
    tech: ["Figma", "React", "Python", "Azure", "TypeScript"],
    kind: "client",
  },
  {
    slug: "vantix-alberta",
    client: "Vantix Systems / Gov. of Alberta",
    title: "Government energy portals",
    year: "2025-2026",
    outcome: "Net-new government portals for energy management and data organization.",
    tech: ["React", "Python", "Azure", "TypeScript", "TanStack", "shadcn", "Tailwind", "Recharts"],
    kind: "client",
  },
  {
    slug: "bc-justice-devops",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Justice DevOps",
    year: "2024-2025",
    outcome:
      "Application management for a dozen public-facing apps including liquor licensing, disaster assistance, and victim services.",
    tech: ["Angular", "TypeScript", ".NET", "Dynamics", "OpenShift", "Docker", "Kubernetes"],
    kind: "client",
  },
  {
    slug: "road-safety-initiative",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Road Safety Initiative",
    year: "2023-2024",
    outcome:
      "Digitized paper forms for RCMP and BC police, streamlining roadside prohibitions with legacy integration.",
    tech: ["React", "Redux", "TypeScript", "Python", "PostgreSQL", "OpenShift"],
    kind: "client",
  },
  {
    slug: "health-gateway",
    client: "BC Ministry of Health",
    title: "Health Gateway",
    year: "2019-2021",
    outcome:
      "Cross-sector health information platform giving BC residents secure access to their health records.",
    tech: ["Vue.js", "TypeScript", ".NET", "PostgreSQL", "OpenShift"],
    kind: "client",
  },
  {
    slug: "cedh-io",
    client: "cedh.io",
    title: "Competitive EDH deck analysis",
    year: "2024-Present",
    outcome:
      "Full-stack Magic: The Gathering analytics product. Proprietary aggregation of tournament APIs recommends cards for Competitive EDH decks.",
    tech: ["Next.js", "Vercel", "Supabase", "Redis", "TypeScript", "shadcn", "Tailwind", "TanStack", "Recharts"],
    kind: "product",
    metrics: [
      { label: "Active users", value: "1,500+" },
      { label: "MRR", value: "$250 CAD" },
    ],
    link: "https://cedh.io",
  },
];
```

- [ ] **Step 2: Typecheck (Work.tsx may error, fixed in Task 13)**

`pnpm -C /home/sam/Documents/Code/junction tsc --noEmit 2>&1 | head -20`

- [ ] **Step 3: Commit**

```
git add src/content/case-studies.ts
git commit -m "feat(content): rewrite case studies to 6 entries with product kind"
```

---

## Task 2: Add Platform & DevOps capability

**Files:** Modify `src/content/capabilities.ts`

- [ ] **Step 1: Add Server icon import and 6th entry**

```ts
import { Brain, Code2, LineChart, Network, PenTool, Server, type LucideIcon } from "lucide-react";

export interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  feature?: boolean;
}

export const CAPABILITIES: CapabilityCard[] = [
  {
    id: "interface-design",
    title: "Interface Design",
    description:
      "UX research, design systems, and design-to-code pipelines. We build component libraries and polished production interfaces with the underlying systems thinking that makes them work.",
    icon: PenTool,
    feature: true,
  },
  {
    id: "full-stack-implementation",
    title: "Full-Stack Implementation",
    description:
      "TypeScript front to back. Frontend, backend, infrastructure, and the glue in between. Spec to ship, owned end to end.",
    icon: Code2,
  },
  {
    id: "data-visualization",
    title: "Data Visualization",
    description:
      "Dashboards and exploration interfaces for complex datasets. Built so non-technical stakeholders can use them.",
    icon: LineChart,
  },
  {
    id: "system-integration",
    title: "System Integration",
    description:
      "APIs, message queues, identity bridges, and custom protocols. We connect what you have to what you are building.",
    icon: Network,
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "Embed LLMs into existing workflows. Agents, RAG, and structured extraction integrated with your data and tools.",
    icon: Brain,
  },
  {
    id: "platform-devops",
    title: "Platform & DevOps",
    description:
      "Container orchestration, CI/CD, and cloud infrastructure. OpenShift, Kubernetes, Azure, and Vercel. The plumbing that keeps shipped software running.",
    icon: Server,
  },
];
```

- [ ] **Step 2: Commit**

```
git add src/content/capabilities.ts
git commit -m "feat(content): add Platform & DevOps as 6th capability"
```

---

## Task 3: Flag dark logos in tech-stack

**Files:** Modify `src/content/tech-stack.ts`

- [ ] **Step 1: Extend Tech interface + flag entries**

Add to interface:
```ts
export interface Tech {
  name: string;
  icon: string;
  href?: string;
  category: TechCategory;
  darkLogo?: boolean;
}
```

Flag these three entries:
```ts
{ name: "Next.js", icon: nextjsIcon, category: "frontend", href: "https://nextjs.org/", darkLogo: true },
{ name: "shadcn/ui", icon: shadcnIcon, category: "frontend", href: "https://ui.shadcn.com/", darkLogo: true },
{ name: "Vercel", icon: vercelIcon, category: "devops", href: "https://vercel.com/", darkLogo: true },
```

- [ ] **Step 2: Commit**

```
git add src/content/tech-stack.ts
git commit -m "feat(content): flag dark-on-transparent logos"
```

---

## Task 4: Author WordRotate component

**Files:** Create `src/components/magicui/word-rotate.tsx`

- [ ] **Step 1: Author component**

```tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: HTMLMotionProps<"span">;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: "-100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(id);
  }, [words.length, duration]);

  return (
    <span className={cn("inline-block overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait">
        <motion.span key={words[index]} {...motionProps} className="inline-block">
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```
git add src/components/magicui/word-rotate.tsx
git commit -m "feat(magicui): add WordRotate component"
```

---

## Task 5: Marquee smoothStop + @property speed variable

**Files:** Modify `src/globals.css`, `src/components/magicui/marquee.tsx`

- [ ] **Step 1: Add @property to globals.css**

Append after existing @import lines:

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

- [ ] **Step 2: Replace marquee.tsx**

```tsx
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  smoothStop?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  smoothStop = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        smoothStop && "marquee-smooth-root",
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around gap-(--gap)",
              vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
              smoothStop && "marquee-smooth-track",
              !smoothStop && pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]",
              "motion-reduce:[animation-play-state:paused]",
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```
git add src/globals.css src/components/magicui/marquee.tsx
git commit -m "feat(marquee): smoothStop prop with @property-driven ease-out"
```

---

## Task 6: Author Lamp component

**Files:** Create `src/components/aceternity/lamp.tsx`

- [ ] **Step 1: Check for surface/bg variable**

Run: `grep -n -E "\-\-surface-0|\-\-bg\\b" /home/sam/Documents/Code/junction/src/globals.css | head -5`
Note the variable name used for the page background. The plan below uses `--surface-0` (fallback: `--bg`).

- [ ] **Step 2: Author component**

```tsx
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LampProps {
  className?: string;
  color?: string;
}

export function Lamp({
  className,
  color = "var(--color-brand-300)",
}: LampProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 isolate z-0 flex items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${color}, transparent, transparent)`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible"
        >
          <div className="absolute w-full left-0 bg-[var(--surface-0)] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-[var(--surface-0)] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${color})`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]"
        >
          <div className="absolute w-40 h-full right-0 bg-[var(--surface-0)] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[var(--surface-0)] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[var(--surface-0)] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: color }}
        />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: color }}
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
```

Replace `--surface-0` with whatever variable Step 1 identified if different.

- [ ] **Step 3: Commit**

```
git add src/components/aceternity/lamp.tsx
git commit -m "feat(aceternity): add Lamp gradient background"
```

---

## Task 7: Wire WordRotate + Lamp into Hero

**Files:** Modify `src/content/site.ts`, `src/app/home/sections/Hero.tsx`, `src/app/home/HomePage.test.tsx`

- [ ] **Step 1: Split headline in site.ts**

Replace the `hero` block inside `COPY`:

```ts
hero: {
  eyebrow: "",
  headlinePrefix: "We Build",
  headlineWords: ["Interfaces", "Dashboards", "Platforms", "Products", "Tools"],
  sub: "An independent software consultancy. We design and build interfaces, from UX research through production code.",
  primaryCta: "Start a project",
  secondaryCta: "See our work",
},
```

- [ ] **Step 2: Update Hero.tsx**

Add these imports:
```tsx
import { Lamp } from "@/components/aceternity/lamp";
import { WordRotate } from "@/components/magicui/word-rotate";
```

Inside the `<section>` element, add `<Lamp />` as the first child. Update the headline block:

```tsx
<h1 className="text-[length:var(--text-display-xl)] font-semibold leading-[0.95] tracking-tight md:text-[length:var(--text-display-2xl)]">
  <BlurFade delay={0} inView>
    <span className="block whitespace-nowrap">
      {COPY.hero.headlinePrefix}{" "}
      <WordRotate
        words={[...COPY.hero.headlineWords]}
        className="text-[var(--color-brand-300)]"
      />
      <span aria-hidden>.</span>
    </span>
  </BlurFade>
</h1>
```

Also bump the parallax layer to `z-[1]` so Lamp (z-0) sits below it:
```tsx
<motion.div
  className="pointer-events-none absolute inset-0 z-[1]"
  ...
>
```

- [ ] **Step 3: Update HomePage.test.tsx if it matches the full headline**

Run: `grep -n "We Build" /home/sam/Documents/Code/junction/src/app/home/HomePage.test.tsx`

If the test asserts `"We Build Interfaces."`, change to assert just `"We Build"` — the rotating word makes exact match unreliable.

- [ ] **Step 4: Run tests + typecheck**

```
pnpm -C /home/sam/Documents/Code/junction tsc --noEmit
pnpm -C /home/sam/Documents/Code/junction test
```

Expected: pass.

- [ ] **Step 5: Commit**

```
git add src/content/site.ts src/app/home/sections/Hero.tsx src/app/home/HomePage.test.tsx
git commit -m "feat(hero): rotating word + Lamp gradient"
```

---

## Task 8: Author Terminal component

**Files:** Create `src/components/magicui/terminal.tsx`

- [ ] **Step 1: Author Terminal + AnimatedSpan + TypingAnimation**

```tsx
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedSpanProps extends HTMLMotionProps<"div"> {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export function AnimatedSpan({
  delay = 0,
  className,
  children,
  ...props
}: AnimatedSpanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={cn("grid text-sm font-[family-name:var(--font-mono)]", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface TypingAnimationProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export function TypingAnimation({
  children,
  delay = 0,
  duration = 50,
  className,
  ...props
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      if (i < children.length) {
        setDisplayed(children.slice(0, i + 1));
        i++;
      } else {
        clearInterval(id);
      }
    }, duration);
    return () => clearInterval(id);
  }, [started, children, duration]);

  return (
    <motion.div
      className={cn("text-sm font-[family-name:var(--font-mono)]", className)}
      {...props}
    >
      {displayed}
    </motion.div>
  );
}

interface TerminalProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  children: React.ReactNode;
}

export function Terminal({ className, children, ...props }: TerminalProps) {
  return (
    <div
      className={cn(
        "z-0 h-full min-h-[420px] w-full max-w-2xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] shadow-[var(--shadow-lg)]",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-y-2 border-b border-[var(--border)] p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <div className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
      </div>
      <pre className="m-0 p-4 text-[var(--text-primary)]">
        <code className="grid gap-y-1">{children}</code>
      </pre>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```
git add src/components/magicui/terminal.tsx
git commit -m "feat(magicui): add Terminal + typing components"
```

---

## Task 9: Create Approach section

**Files:** Modify `src/content/site.ts`, create `src/app/home/sections/Approach.tsx`, modify `src/app/home/HomePage.tsx`, optionally `src/config/routes.tsx`

- [ ] **Step 1: Add approach copy**

In `COPY`:
```ts
approach: {
  eyebrow: "Approach",
  title: "How work moves.",
  sub: "Research to production through four phases. Each reviewed, each demoable, each shipped.",
},
```

- [ ] **Step 2: Author Approach.tsx**

```tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/magicui/terminal";
import { COPY } from "@/content/site";

export function Approach() {
  return (
    <section id="approach" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <BlurFade delay={0} inView>
            <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
              {COPY.approach.eyebrow}
            </p>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="mt-3 text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
              {COPY.approach.title}
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="mt-6 max-w-md text-[length:var(--text-body-lg)] text-[var(--text-secondary)]">
              {COPY.approach.sub}
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} inView>
          <Terminal>
            <TypingAnimation delay={0} duration={40}>
              {"$ junction build"}
            </TypingAnimation>
            <AnimatedSpan delay={1200} className="text-[var(--color-brand-300)]">
              <span>[1/4] research</span>
            </AnimatedSpan>
            <AnimatedSpan delay={1400} className="pl-6 text-[var(--text-secondary)]">
              <span>interviews · stakeholder mapping · domain audit</span>
            </AnimatedSpan>
            <AnimatedSpan delay={1900} className="text-[var(--color-brand-300)]">
              <span>[2/4] design</span>
            </AnimatedSpan>
            <AnimatedSpan delay={2100} className="pl-6 text-[var(--text-secondary)]">
              <span>system · components · prototypes</span>
            </AnimatedSpan>
            <AnimatedSpan delay={2600} className="text-[var(--color-brand-300)]">
              <span>[3/4] implement</span>
            </AnimatedSpan>
            <AnimatedSpan delay={2800} className="pl-6 text-[var(--text-secondary)]">
              <span>frontend · backend · platform</span>
            </AnimatedSpan>
            <AnimatedSpan delay={3300} className="text-[var(--color-brand-300)]">
              <span>[4/4] ship</span>
            </AnimatedSpan>
            <AnimatedSpan delay={3500} className="pl-6 text-[var(--text-secondary)]">
              <span>CI/CD · observability · iteration</span>
            </AnimatedSpan>
            <AnimatedSpan delay={4100} className="text-[var(--text-primary)]">
              <span>✓ shipped</span>
            </AnimatedSpan>
          </Terminal>
        </BlurFade>
      </div>
    </section>
  );
}
```

The mid-dots (`·`) are U+00B7, not em dashes.

- [ ] **Step 3: Insert into HomePage.tsx**

Add `<Approach />` between `<Convergence />` and `<Work />`. Import from `./sections/Approach`.

- [ ] **Step 4: Check routes.tsx for anchor nav**

Run: `grep -n "how\|work\|capabilities" /home/sam/Documents/Code/junction/src/config/routes.tsx`
If there is an anchor list like `[{ id: "capabilities" }, { id: "how" }, { id: "work" }]`, insert `{ id: "approach", label: "Approach" }` between `how` and `work`. If no such list exists, skip.

- [ ] **Step 5: Commit**

```
git add src/content/site.ts src/app/home/sections/Approach.tsx src/app/home/HomePage.tsx src/config/routes.tsx
git commit -m "feat(home): add Approach section with animated terminal"
```

---

## Task 10: Convergence pairings to α

**Files:** Modify `src/app/home/sections/Convergence.tsx`

- [ ] **Step 1: Update LEGACY/MODERN arrays + comment**

```ts
// Rows pair legacy with modern along the same layer:
//   Row 1 - UI layer              Angular   -> React
//   Row 2 - Runtime / API         .NET      -> Python
//   Row 3 - Deployment platform   OpenShift -> Azure
function pair(name: string) {
  const t = TECH_STACK.find((x) => x.name === name);
  if (!t) throw new Error(`tech-stack missing entry: ${name}`);
  return t;
}
const LEGACY = [pair("Angular"), pair(".NET"), pair("OpenShift")];
const MODERN = [pair("React"), pair("Python"), pair("Azure")];
```

- [ ] **Step 2: Commit**

```
git add src/app/home/sections/Convergence.tsx
git commit -m "feat(convergence): swap pairings to Python + Azure"
```

---

## Task 11: darkLogo in TechNode + Convergence

**Files:** Modify `src/components/ui/tech-node.tsx`, `src/app/home/sections/Convergence.tsx`

- [ ] **Step 1: Extend TechNode**

```tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TechNodeProps {
  name: string;
  icon: string;
  size?: number;
  className?: string;
  darkLogo?: boolean;
}

export const TechNode = forwardRef<HTMLDivElement, TechNodeProps>(
  ({ name, icon, size = 80, className, darkLogo }, ref) => (
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
        className={cn(
          "h-9 w-9",
          darkLogo
            ? "[filter:grayscale(1)_invert(0.55)] dark:[filter:grayscale(1)_invert(0.9)]"
            : "grayscale dark:invert",
        )}
        draggable={false}
      />
    </div>
  ),
);
TechNode.displayName = "TechNode";
```

- [ ] **Step 2: Pass darkLogo through in Convergence.tsx**

Both the desktop LEGACY/MODERN maps and the mobile block:
```tsx
<TechNode
  key={tech.name}
  name={tech.name}
  icon={tech.icon}
  darkLogo={tech.darkLogo}
  ref={leftRefs.current[i]}   // desktop only; omit for mobile
/>
```

- [ ] **Step 3: Commit**

```
git add src/components/ui/tech-node.tsx src/app/home/sections/Convergence.tsx
git commit -m "fix(icons): gray treatment for dark logos in TechNode"
```

---

## Task 12: darkLogo + smoothStop in StackMarquee

**Files:** Modify `src/app/home/sections/StackMarquee.tsx`

- [ ] **Step 1: Replace file**

```tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { TECH_STACK } from "@/content/tech-stack";
import { COPY } from "@/content/site";
import { cn } from "@/lib/utils";

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
        <Marquee smoothStop className="[--duration:60s]">
          {top.map((tech) => (
            <a
              key={tech.name}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tech.name}
              className="mx-8 inline-block opacity-40 transition-[opacity,transform] duration-200 hover:scale-[1.04] hover:opacity-100"
            >
              <img
                src={tech.icon}
                alt=""
                className={cn(
                  "h-10 w-10",
                  tech.darkLogo
                    ? "[filter:grayscale(1)_invert(0.55)] dark:[filter:grayscale(1)_invert(0.9)]"
                    : "grayscale dark:invert",
                )}
              />
            </a>
          ))}
        </Marquee>
        <Marquee smoothStop reverse className="mt-6 [--duration:55s]">
          {bottom.map((tech) => (
            <a
              key={tech.name}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tech.name}
              className="mx-8 inline-block opacity-40 transition-[opacity,transform] duration-200 hover:scale-[1.04] hover:opacity-100"
            >
              <img
                src={tech.icon}
                alt=""
                className={cn(
                  "h-10 w-10",
                  tech.darkLogo
                    ? "[filter:grayscale(1)_invert(0.55)] dark:[filter:grayscale(1)_invert(0.9)]"
                    : "grayscale dark:invert",
                )}
              />
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```
git add src/app/home/sections/StackMarquee.tsx
git commit -m "feat(stack): smoothStop + gray treatment for dark logos"
```

---

## Task 13: Work 6-card layout + product treatment

**Files:** Modify `src/app/home/sections/Work.tsx`

- [ ] **Step 1: Replace Work.tsx**

```tsx
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TechChip } from "@/components/ui/tech-chip";
import { CASE_STUDIES, type CaseStudy } from "@/content/case-studies";
import { COPY } from "@/content/site";
import { cn } from "@/lib/utils";

function ClientCard({ study, feature }: { study: CaseStudy; feature?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] p-8 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]",
        feature && "lg:col-span-2",
      )}
    >
      <div className="flex items-baseline justify-between gap-4 font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)]">
        <span className="text-[var(--color-brand-300)]">{study.client}</span>
        <span className="shrink-0 text-[var(--text-tertiary)]">{study.year}</span>
      </div>
      <h3 className="text-[length:var(--text-display-md)] font-semibold leading-tight tracking-tight">
        {study.title}
      </h3>
      <p className="text-[length:var(--text-body)] text-[var(--text-secondary)]">
        {study.outcome}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {study.tech.slice(0, 6).map((t) => (
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

function ProductCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group relative col-span-full flex flex-col gap-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] p-8 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)] lg:flex-row lg:items-start lg:gap-12">
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2 font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)]">
          <span className="inline-flex items-center gap-2">
            <span className="rounded-[var(--radius-xs)] bg-[var(--brand-soft)] px-2 py-0.5 text-[var(--color-brand-300)]">
              Product
            </span>
            <span className="text-[var(--text-primary)]">{study.client}</span>
          </span>
          <span className="text-[var(--text-tertiary)]">{study.year}</span>
        </div>
        <h3 className="mt-4 text-[length:var(--text-display-md)] font-semibold leading-tight tracking-tight">
          {study.title}
        </h3>
        <p className="mt-4 max-w-2xl text-[length:var(--text-body)] text-[var(--text-secondary)]">
          {study.outcome}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {study.tech.slice(0, 9).map((t) => (
            <TechChip key={t} label={t} />
          ))}
        </div>
        {study.link && (
          <a
            href={study.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-[length:var(--text-body-sm)] text-[var(--color-brand-300)] hover:text-[var(--color-brand-200)]"
          >
            Visit cedh.io
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
      {study.metrics && study.metrics.length > 0 && (
        <div className="flex shrink-0 gap-8 lg:flex-col lg:gap-6 lg:border-l lg:border-[var(--border)] lg:pl-12">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                {metric.label}
              </span>
              <span className="text-[length:var(--text-display-md)] font-semibold tracking-tight text-[var(--text-primary)]">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}
      <BorderBeam className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}

export function Work() {
  const studies = CASE_STUDIES;
  const products = studies.filter((s) => s.kind === "product");
  const clients = studies.filter((s) => s.kind !== "product");
  const [feature, ...rest] = clients;

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
              <ClientCard study={feature} feature />
            </BlurFade>
          )}
          {rest.map((study, i) => (
            <BlurFade key={study.slug} delay={0.15 + (i + 1) * 0.08} inView>
              <ClientCard study={study} />
            </BlurFade>
          ))}
          {products.map((study, i) => (
            <BlurFade
              key={study.slug}
              delay={0.15 + (rest.length + i + 1) * 0.08}
              inView
              className="lg:col-span-3"
            >
              <ProductCard study={study} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```
git add src/app/home/sections/Work.tsx
git commit -m "feat(work): 6-card layout with product treatment for cedh.io"
```

---

## Task 14: Copy polish sweep

- [ ] **Step 1: Em-dash audit**

Run: `grep -rn "—" /home/sam/Documents/Code/junction/src/content/ /home/sam/Documents/Code/junction/src/app/`

Code comments acceptable. User-facing strings in content files must not contain em dashes.

- [ ] **Step 2: Commit any fixes**

```
git add -u
git commit -m "polish(copy): em-dash audit sweep"
```

(If no changes, skip commit.)

---

## Task 15: Final QA

- [ ] **Step 1: Typecheck**

Run: `pnpm -C /home/sam/Documents/Code/junction tsc --noEmit`
Expected: no errors.

- [ ] **Step 2: Test**

Run: `pnpm -C /home/sam/Documents/Code/junction test`
Expected: pass.

- [ ] **Step 3: Build**

Run: `pnpm -C /home/sam/Documents/Code/junction build`
Expected: clean build.

- [ ] **Step 4: Dev server visual walkthrough**

```
pnpm -C /home/sam/Documents/Code/junction dev
```

Verify:
- Hero rotating words + Lamp visible
- Capabilities shows 6 cards including Platform & DevOps
- Convergence: Angular/React, .NET/Python, OpenShift/Azure
- Approach section terminal types sequence
- Work: Jupiter feature + Vantix + 3 BC apps + cedh.io product card with metrics
- StackMarquee eases to stop on hover
- shadcn, Vercel, Next.js visible as gray in light + dark

- [ ] **Step 5: Push**

```
git push origin redesign/v2
```

---

## Self-Review

**Spec coverage:**
- 4.1 Platform & DevOps -> Task 2
- 4.2 pairings α -> Task 10
- 4.3 WordRotate -> Tasks 4, 7
- 4.4 Lamp + Terminal -> Tasks 6, 7, 8, 9
- 5 Selected Work 6 cards -> Tasks 1, 13
- 6.1 smooth stop -> Tasks 5, 12
- 6.2 dark logo fix -> Tasks 3, 11, 12
- 7 copy policy -> Task 14
- 11 testing -> Task 15

**Placeholder scan:** No TBDs, every code-requiring step has full code.

**Type consistency:**
- `Tech.darkLogo?: boolean` (Tasks 3, 11, 12)
- `CaseStudy.kind` + `CaseStudy.metrics` (Tasks 1, 13)
- `COPY.hero.headlinePrefix` + `COPY.hero.headlineWords` (Task 7 Step 1 defines, Task 7 Step 2 uses)
- `COPY.approach` (Task 9 Step 1 defines, Step 2 uses)

Plan complete.
