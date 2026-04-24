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
