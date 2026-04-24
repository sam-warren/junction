// src/app/home/sections/Convergence.tsx
import { createRef, useRef } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BrandMark } from "@/components/ui/brand-mark";
import { TechNode } from "@/components/ui/tech-node";
import { techByCategory, TECH_STACK } from "@/content/tech-stack";
import { COPY } from "@/content/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Convergence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const legacy = techByCategory("legacy").slice(0, 3);
  const modern = [
    TECH_STACK.find((t) => t.name === "React")!,
    TECH_STACK.find((t) => t.name === "Supabase")!,
    TECH_STACK.find((t) => t.name === "Vercel")!,
  ];

  // Stable ref arrays (createRef wrappers don't churn across renders).
  const leftRefs = useRef([0, 1, 2].map(() => createRef<HTMLDivElement>()));
  const rightRefs = useRef([0, 1, 2].map(() => createRef<HTMLDivElement>()));

  return (
    <section id="how" className="relative overflow-hidden py-24 lg:py-32">
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

        {/* Desktop: 3-col grid with 6 animated beams */}
        <BlurFade delay={0.2} inView className="hidden lg:block">
          <div
            ref={containerRef}
            className="relative mx-auto mt-16 grid h-[480px] max-w-5xl grid-cols-3 items-center gap-8"
          >
            <div className="flex flex-col items-center gap-12">
              {legacy.map((tech, i) => (
                <TechNode
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  ref={leftRefs.current[i]}
                />
              ))}
            </div>

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

            <div className="flex flex-col items-center gap-12">
              {modern.map((tech, i) => (
                <TechNode
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  ref={rightRefs.current[i]}
                />
              ))}
            </div>

            {[0, 1, 2].map((row) => (
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

        {/* Mobile: vertical stack, no beams for perf + readability */}
        <BlurFade delay={0.2} inView className="block lg:hidden">
          <div className="mt-12 flex flex-col items-center gap-6">
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
