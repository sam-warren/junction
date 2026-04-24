// src/app/home/sections/CTA.tsx
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Particles } from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import { COPY, BRAND } from "@/content/site";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden py-32 lg:py-40"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 50% 40% at 50% 50%, var(--brand-soft), transparent 70%)",
      }}
    >
      <Particles
        className="absolute inset-0"
        quantity={80}
        staticity={60}
        ease={50}
        size={0.5}
        color="#94A4E2"
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <BlurFade delay={0} inView>
          <h2 className="text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
            {COPY.cta.headline}
          </h2>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <p className="mx-auto mt-6 max-w-xl text-[length:var(--text-body-lg)] text-[var(--text-secondary)]">
            {COPY.cta.sub}
          </p>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/contact">
              <Button
                size="lg"
                withBorderBeam
                iconRight={<ArrowRight className="h-5 w-5" />}
              >
                {COPY.cta.primary}
              </Button>
            </Link>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="inline-flex items-center gap-2 text-[length:var(--text-body)] text-[var(--color-brand-300)] underline-offset-4 hover:text-[var(--color-brand-200)] hover:underline"
            >
              <Mail className="h-4 w-4" /> {COPY.cta.secondaryLabel}{" "}
              {BRAND.contactEmail}
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
