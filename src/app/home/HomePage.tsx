import { useEffect, type ReactNode } from "react";
import { ContactForm } from "@/app/contact/ContactForm";
import { BrandMark } from "@/components/ui/brand-mark";
import { buttonClass } from "@/components/ui/button-styles";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CASE_STUDIES } from "@/content/case-studies";
import {
  ABOUT,
  BRAND,
  CONTACT,
  HERO,
  NAV,
  SERVICES,
  SOCIAL_LINKS,
} from "@/content/site";

const gutter = "mx-auto w-full max-w-5xl px-4 sm:px-7 lg:px-9";

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-hairline bg-canvas">
      <div className={`${gutter} flex h-14 items-center justify-between gap-4`}>
        <a href="#top" className="flex items-center gap-2 text-supporting font-semibold">
          <BrandMark />
          {BRAND.short}
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${item.href === "#contact" ? "inline-flex" : "hidden sm:inline-flex"} h-10 items-center rounded-md px-3 text-supporting text-fg-muted transition-colors duration-150 [@media(hover:hover)]:hover:text-fg`}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-hairline">
      <div className={`${gutter} grid gap-6 py-14 md:grid-cols-[12rem_1fr] md:gap-10 md:py-20`}>
        <h2 id={`${id}-title`} className="text-title font-semibold">
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className={`${gutter} py-16 md:py-28`}>
      <h1 className="max-w-3xl text-display-sm font-semibold md:text-display">
        {HERO.headline}
      </h1>
      <p className="mt-4 max-w-xl text-body text-fg-muted">{HERO.sub}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#contact" className={buttonClass("brand")}>
          {HERO.primaryCta}
        </a>
        <a href="#work" className={buttonClass("outline")}>
          {HERO.secondaryCta}
        </a>
      </div>
    </section>
  );
}

function Work() {
  return (
    <Section id="work" title="Work">
      <ol className="divide-y divide-hairline">
        {CASE_STUDIES.map((study) => (
          <li
            key={study.slug}
            className="grid gap-1 py-5 first:pt-0 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-x-6"
          >
            <p className="font-mono text-meta tabular-nums text-fg-subtle sm:pt-0.5">
              {study.years}
            </p>
            <div>
              <h3 className="text-body font-semibold">
                {study.link ? (
                  <a
                    href={study.link}
                    className="text-link underline-offset-4 [@media(hover:hover)]:hover:underline"
                  >
                    {study.title} ↗
                  </a>
                ) : (
                  study.title
                )}
              </h3>
              <p className="text-supporting text-fg-muted">{study.client}</p>
              <p className="mt-2 max-w-[65ch] text-supporting">{study.summary}</p>
              <p className="mt-2 font-mono text-meta text-fg-subtle">
                {study.tech.join(" · ")}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services" title="Services">
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <div key={service.name}>
            <dt className="text-body font-semibold">{service.name}</dt>
            <dd className="mt-1 text-supporting text-fg-muted">{service.description}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-[65ch] space-y-4 text-body">
        {ABOUT.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title={CONTACT.title}>
      <p className="text-body">
        {CONTACT.sub} Email{" "}
        <a
          href={`mailto:${BRAND.contactEmail}`}
          className="text-link underline underline-offset-4"
        >
          {BRAND.contactEmail}
        </a>{" "}
        or write here.
      </p>
      <div className="mt-6 max-w-2xl">
        <ContactForm />
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div
        className={`${gutter} flex flex-wrap items-center justify-between gap-4 py-8 text-meta text-fg-subtle`}
      >
        <p>
          © {new Date().getFullYear()} {BRAND.full}
        </p>
        <ul className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="transition-colors duration-150 [@media(hover:hover)]:hover:text-fg"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default function HomePage() {
  useEffect(() => {
    if (window.location.pathname.replace(/\/$/, "") === "/contact") {
      document.getElementById("contact")?.scrollIntoView();
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
