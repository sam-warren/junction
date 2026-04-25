// src/app/home/sections/Approach.tsx
import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { COPY } from "@/content/site";

export function Approach() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  // Gate the pattern's continuous square fades to viewport visibility.
  // The amount/margin lets the grid spin up just before the section
  // enters and stop after it's clearly past.
  const inView = useInView(sectionRef, {
    amount: 0.15,
    margin: "0px 0px -10% 0px",
  });

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative overflow-hidden py-24 [contain:layout_paint] lg:py-32"
    >
      {/* Left-anchored radial mask: densest grid sits behind the headline
          on the left column and fades out before reaching the terminal on
          the right. Distinct from Convergence's centered-radial mask so
          the two sections don't read as duplicate atmosphere. */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        {inView && !reduced && (
          <AnimatedGridPattern
            numSquares={28}
            maxOpacity={0.08}
            duration={4}
            repeatDelay={1.5}
            className="absolute inset-0 [mask-image:radial-gradient(800px_circle_at_15%_50%,white,transparent_65%)]"
          />
        )}
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <BlurFade delay={0} inView>
            <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] tracking-[0.18em] text-[var(--color-brand-300)] uppercase">
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

        <BlurFade delay={0.2} inView className="min-w-0">
          <Terminal>
            <TypingAnimation delay={0} duration={40}>
              {"$ junction build"}
            </TypingAnimation>
            <AnimatedSpan
              delay={1200}
              className="text-[var(--color-brand-300)]"
            >
              <span>[1/4] research</span>
            </AnimatedSpan>
            <AnimatedSpan
              delay={1400}
              className="pl-6 text-[var(--text-secondary)]"
            >
              <span>interviews · stakeholder mapping · domain audit</span>
            </AnimatedSpan>
            <AnimatedSpan
              delay={1900}
              className="text-[var(--color-brand-300)]"
            >
              <span>[2/4] design</span>
            </AnimatedSpan>
            <AnimatedSpan
              delay={2100}
              className="pl-6 text-[var(--text-secondary)]"
            >
              <span>system · components · prototypes</span>
            </AnimatedSpan>
            <AnimatedSpan
              delay={2600}
              className="text-[var(--color-brand-300)]"
            >
              <span>[3/4] implement</span>
            </AnimatedSpan>
            <AnimatedSpan
              delay={2800}
              className="pl-6 text-[var(--text-secondary)]"
            >
              <span>frontend · backend · platform</span>
            </AnimatedSpan>
            <AnimatedSpan
              delay={3300}
              className="text-[var(--color-brand-300)]"
            >
              <span>[4/4] ship</span>
            </AnimatedSpan>
            <AnimatedSpan
              delay={3500}
              className="pl-6 text-[var(--text-secondary)]"
            >
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
