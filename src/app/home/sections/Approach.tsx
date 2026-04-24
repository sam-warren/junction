// src/app/home/sections/Approach.tsx
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
