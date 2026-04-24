// src/app/home/sections/Hero.tsx
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "motion/react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { BlurFade } from "@/components/magicui/blur-fade";
import { FlipWords } from "@/components/aceternity/flip-words";
import { Lamp } from "@/components/aceternity/lamp";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cueRef = useRef<HTMLAnchorElement | null>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.3 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.3 });

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const node = sectionRef.current;
    if (!node) return;

    let rafId = 0;
    let nextX = 0;
    let nextY = 0;

    function onMove(e: MouseEvent) {
      const rect = node!.getBoundingClientRect();
      nextX = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 4;
      nextY = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 4;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        mx.set(nextX);
        my.set(nextY);
        rafId = 0;
      });
    }
    node.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      node.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced, mx, my]);

  useEffect(() => {
    function onScroll() {
      const el = cueRef.current;
      if (!el) return;
      el.style.opacity = window.scrollY > 100 ? "0" : "1";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden [contain:layout_paint] lg:min-h-[calc(100vh-5rem)]"
    >
      <Lamp className="hidden md:flex" />

      {/* Dot pattern fades out AT the text block (blank center) and reveals
          toward the edges. Ellipse sized generously so the full text block
          (headline + sub + CTAs) fits inside the blank core. */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          x,
          y,
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 40%, black 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 40%, black 90%)",
        }}
      >
        <FlickeringGrid
          className="absolute inset-0"
          color="rgb(148, 164, 226)"
          squareSize={4}
          gridGap={6}
          flickerChance={0.25}
          maxOpacity={0.35}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-[clamp(40px,8.5vw,80px)] leading-[0.95] font-semibold tracking-tight md:text-[clamp(50px,10.5vw,108px)]">
          <BlurFade delay={0} inView>
            <span className="block">{COPY.hero.headlinePrefix}</span>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <span className="mt-2 block md:mt-3">
              <FlipWords
                words={[...COPY.hero.headlineWords]}
                className="text-[var(--color-brand-300)]"
              />
            </span>
          </BlurFade>
        </h1>

        <BlurFade delay={0.2} inView>
          <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] text-[var(--text-primary)]/85">
            {COPY.hero.sub}
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="mx-auto mt-10 flex w-full max-w-xs flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <Link to="/contact" className="block">
              <Button
                size="lg"
                withBorderBeam
                iconRight={<ArrowRight className="h-5 w-5" />}
                className="w-full sm:w-auto"
              >
                {COPY.hero.primaryCta}
              </Button>
            </Link>
            <a href="#work" className="block">
              <Button
                size="lg"
                variant="ghost"
                className="w-full bg-white/5 backdrop-blur-md hover:bg-white/10 sm:w-auto"
              >
                {COPY.hero.secondaryCta}
              </Button>
            </a>
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.5} inView className="hidden sm:block">
        <a
          ref={cueRef}
          href="#capabilities"
          aria-label="Scroll to capabilities"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-tertiary)] transition-opacity duration-300 hover:text-[var(--text-secondary)]"
          style={{ opacity: 1 }}
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </BlurFade>
    </section>
  );
}
