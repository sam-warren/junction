// src/app/home/sections/Convergence.tsx
import { createRef, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { TechNode } from "@/components/ui/tech-node";
import { TECH_STACK } from "@/content/tech-stack";
import { COPY } from "@/content/site";

// Left column: design / planning tools that converge on the build.
// Right column: implementation tools that ship the work.
//   Row 1 - Discovery / specs     Notion -> React
//   Row 2 - Planning / tracking   Linear -> Supabase
//   Row 3 - Visual design         Figma  -> Vercel
function pair(name: string) {
  const t = TECH_STACK.find((x) => x.name === name);
  if (!t) throw new Error(`tech-stack missing entry: ${name}`);
  return t;
}
const DESIGN = [pair("Notion"), pair("Linear"), pair("Figma")];
const BUILD = [pair("React"), pair("Supabase"), pair("Vercel")];

const BRAND_PATHS = [
  "M15,50 L95,50",
  "M15,20 L55,20 L70,50",
  "M15,80 L55,80 L70,50",
];

export function Convergence() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // Gate the heavy beam rAF loops to visibility — stops compositor work
  // and animation subscriptions when section is off-screen.
  const inView = useInView(sectionRef, {
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  });

  // Stable ref arrays so AnimatedBeam doesn't re-subscribe each render.
  const leftRefs = useRef([0, 1, 2].map(() => createRef<HTMLDivElement>()));
  const rightRefs = useRef([0, 1, 2].map(() => createRef<HTMLDivElement>()));

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative overflow-hidden py-24 [contain:layout_paint] lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        {inView && !reduced && (
          <AnimatedGridPattern
            numSquares={20}
            maxOpacity={0.06}
            duration={3}
            repeatDelay={1}
            className="absolute inset-0 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          />
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <BlurFade delay={0} inView>
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] tracking-[0.18em] text-[var(--color-brand-300)] uppercase">
            {COPY.convergence.eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <h2 className="mt-3 max-w-3xl text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
            {COPY.convergence.title}
          </h2>
        </BlurFade>

        {/* Desktop */}
        <BlurFade delay={0.2} inView className="hidden lg:block">
          <div
            ref={containerRef}
            className="relative mx-auto mt-16 grid h-[480px] max-w-5xl grid-cols-3 items-center gap-8"
          >
            {/* Columns + center sit above beam SVG */}
            <div className="relative z-10 flex flex-col items-center gap-12">
              {DESIGN.map((tech, i) => (
                <TechNode
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  darkLogo={tech.darkLogo}
                  softLogo={tech.softLogo}
                  ref={leftRefs.current[i]}
                />
              ))}
            </div>

            <div className="relative z-10 flex justify-center">
              <div
                ref={centerRef}
                className="grid h-32 w-32 place-items-center rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-1)] shadow-[var(--shadow-lg)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="h-16 w-16 text-[var(--color-brand-300)]"
                  aria-label="Junction"
                >
                  {BRAND_PATHS.map((d, i) => (
                    <path
                      key={i}
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={10}
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-12">
              {BUILD.map((tech, i) => (
                <TechNode
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  darkLogo={tech.darkLogo}
                  softLogo={tech.softLogo}
                  ref={rightRefs.current[i]}
                />
              ))}
            </div>

            {/* Beams only mount while the section is in view; AnimatedBeam's
                rAF loop dies when unmounted, so we don't burn frames when
                the user isn't looking at them. */}
            {inView &&
              !reduced &&
              [0, 1, 2].map((row) => (
                <div key={row} className="contents">
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={leftRefs.current[row]}
                    toRef={centerRef}
                    duration={1.5}
                    delay={row * 0.5}
                    curvature={20}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={centerRef}
                    toRef={rightRefs.current[row]}
                    duration={1.5}
                    delay={row * 0.5}
                    curvature={20}
                  />
                </div>
              ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <p className="mx-auto mt-8 max-w-3xl text-[length:var(--text-body-lg)] text-[var(--text-secondary)] lg:mt-16">
            {COPY.convergence.sub}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
