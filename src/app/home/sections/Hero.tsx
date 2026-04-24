// src/app/home/sections/Hero.tsx
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const node = ref.current;
    if (!node) return;

    function onMove(e: MouseEvent) {
      const rect = node!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setParallax({ x: dx * 4, y: dy * 4 });
    }
    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, [reduced]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden lg:min-h-[calc(100vh-5rem)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%)",
        }}
      >
        <DotPattern className="absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <BlurFade delay={0} inView>
          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
            {COPY.hero.eyebrow}
          </p>
        </BlurFade>

        <h1 className="mt-6 text-[length:var(--text-display-xl)] font-semibold leading-[0.95] tracking-tight md:text-[length:var(--text-display-2xl)]">
          <BlurFade delay={0.1} inView>
            <span className="block">{COPY.hero.headline}</span>
          </BlurFade>
        </h1>

        <BlurFade delay={0.3} inView>
          <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] text-[var(--text-secondary)]">
            {COPY.hero.sub}
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact">
              <Button
                size="lg"
                withBorderBeam
                iconRight={<ArrowRight className="h-5 w-5" />}
              >
                {COPY.hero.primaryCta}
              </Button>
            </Link>
            <a href="#work">
              <Button size="lg" variant="ghost">
                {COPY.hero.secondaryCta}
              </Button>
            </a>
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.6} inView>
        <a
          href="#capabilities"
          aria-label="Scroll to capabilities"
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-tertiary)] transition-opacity duration-300 hover:text-[var(--text-secondary)]",
            scrolled ? "opacity-0" : "opacity-100",
          )}
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </BlurFade>
    </section>
  );
}
