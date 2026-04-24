// src/app/home/sections/Work.tsx
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TechChip } from "@/components/ui/tech-chip";
import { CASE_STUDIES, type CaseStudy } from "@/content/case-studies";
import { COPY } from "@/content/site";
import { cn } from "@/lib/utils";

function ClientCard({
  study,
  feature,
}: {
  study: CaseStudy;
  feature?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] p-8 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]",
        feature && "lg:col-span-2",
      )}
    >
      <div className="flex items-baseline justify-between gap-4 font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)]">
        <span className="text-[var(--color-brand-300)]">{study.client}</span>
        <span className="shrink-0 text-[var(--text-tertiary)]">
          {study.year}
        </span>
      </div>
      <h3 className="text-[length:var(--text-display-md)] leading-tight font-semibold tracking-tight">
        {study.title}
      </h3>
      <p className="text-[length:var(--text-body)] text-[var(--text-secondary)]">
        {study.outcome}
      </p>
      {feature && study.description && (
        <p className="text-[length:var(--text-body)] text-[var(--text-secondary)]">
          {study.description}
        </p>
      )}
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {study.tech.slice(0, feature ? 8 : 6).map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>
      {study.link && (
        <a
          href={study.link}
          className="mt-2 inline-flex items-center gap-1 text-[length:var(--text-body-sm)] text-[var(--color-brand-300)] transition-colors duration-150 hover:text-[var(--color-brand-200)]"
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
            {study.link ? (
              <a
                href={study.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--text-primary)] transition-colors duration-150 hover:text-[var(--color-brand-300)]"
              >
                {study.client}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="text-[var(--text-primary)]">{study.client}</span>
            )}
          </span>
          <span className="text-[var(--text-tertiary)]">{study.year}</span>
        </div>
        <h3 className="mt-4 text-[length:var(--text-display-md)] leading-tight font-semibold tracking-tight">
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
      </div>
      {study.metrics && study.metrics.length > 0 && (
        <div className="flex shrink-0 gap-8 lg:flex-col lg:gap-6 lg:border-l lg:border-[var(--border)] lg:pl-12">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] tracking-[0.12em] text-[var(--text-tertiary)] uppercase">
                {metric.label}
              </span>
              <span className="text-[length:var(--text-display-md)] font-semibold tracking-tight text-[var(--text-primary)] tabular-nums">
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
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] tracking-[0.18em] text-[var(--color-brand-300)] uppercase">
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
