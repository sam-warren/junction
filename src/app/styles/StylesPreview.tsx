// src/app/styles/StylesPreview.tsx
// Temporary token-system preview. Delete this file before merging Phase 2.
import { DotPattern } from "@/components/magicui/dot-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function StylesPreview() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-[length:var(--text-display-xl)] font-semibold leading-none tracking-tight">
        Tokens preview
      </h1>

      <section className="mt-8 grid grid-cols-11 gap-2">
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((s) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <div
              className="h-12 w-12 rounded-md"
              style={{ background: `var(--color-brand-${s})` }}
            />
            <span className="font-[family-name:var(--font-mono)] text-xs">{s}</span>
          </div>
        ))}
      </section>

      <section className="relative mt-8 h-48 overflow-hidden rounded-lg border border-[var(--border)]">
        <DotPattern className="absolute inset-0" />
        <div className="relative p-6">DotPattern at 4% opacity (default)</div>
      </section>

      <section className="mt-8 grid grid-cols-3 gap-4">
        <MagicCard className="rounded-lg border border-[var(--border)] p-6">
          MagicCard with cursor spotlight
        </MagicCard>
        <div className="relative rounded-lg border border-[var(--border)] p-6">
          BorderBeam on perimeter
          <BorderBeam />
        </div>
        <BlurFade delay={0.2}>
          <div className="rounded-lg border border-[var(--border)] p-6">
            BlurFade reveal (delay 0.2s)
          </div>
        </BlurFade>
      </section>
    </div>
  );
}
