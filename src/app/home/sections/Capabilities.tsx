// src/app/home/sections/Capabilities.tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { CAPABILITIES } from "@/content/capabilities";
import { COPY } from "@/content/site";
import { cn } from "@/lib/utils";

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BlurFade delay={0} inView>
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
            {COPY.capabilities.eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <h2 className="mt-3 text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
            {COPY.capabilities.title}
          </h2>
        </BlurFade>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <BlurFade key={cap.id} delay={0.15 + i * 0.08} inView>
                <MagicCard
                  className={cn(
                    "group relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] p-8 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]",
                    cap.feature && "lg:col-span-2",
                  )}
                  gradientColor="var(--brand-soft)"
                  gradientOpacity={1}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <Icon
                      className="h-8 w-8 text-[var(--color-brand-300)]"
                      aria-hidden
                    />
                    <h3 className="mt-6 text-[length:var(--text-display-md)] font-semibold tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-[length:var(--text-body)] text-[var(--text-secondary)]">
                      {cap.description}
                    </p>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
