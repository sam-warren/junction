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
