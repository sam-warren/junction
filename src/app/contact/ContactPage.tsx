// src/app/contact/ContactPage.tsx
import { BlurFade } from "@/components/magicui/blur-fade";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 lg:py-32 lg:px-8">
      <BlurFade delay={0} inView>
        <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[var(--color-brand-300)]">
          Contact
        </p>
      </BlurFade>
      <BlurFade delay={0.1} inView>
        <h1 className="mt-3 text-[length:var(--text-display-lg)] font-semibold tracking-tight md:text-[length:var(--text-display-xl)]">
          Let's talk.
        </h1>
      </BlurFade>
      <BlurFade delay={0.2} inView>
        <p className="mt-3 text-[length:var(--text-body-lg)] text-[var(--text-secondary)]">
          Drop a note. Replies within one business day.
        </p>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <div className="mt-10">
          <ContactForm />
        </div>
      </BlurFade>
    </section>
  );
}
