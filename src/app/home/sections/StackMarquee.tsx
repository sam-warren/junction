// src/app/home/sections/StackMarquee.tsx
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
