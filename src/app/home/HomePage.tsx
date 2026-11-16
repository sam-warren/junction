import { useEffect, type ReactNode } from "react";
import { ContactForm } from "@/app/contact/ContactForm";
import { BrandMark } from "@/components/ui/brand-mark";
import { buttonClass } from "@/components/ui/button-styles";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { JunctionLines } from "@/components/ui/junction-lines";
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
    <header className="border-hairline bg-canvas sticky top-0 z-10 border-b">
      <div className={`${gutter} flex h-14 items-center justify-between gap-4`}>
        <a
          href="#top"
          className="text-supporting flex items-center gap-2 font-semibold"
        >
          <BrandMark />
          {BRAND.short}
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${item.href === "#contact" ? "inline-flex" : "hidden sm:inline-flex"} text-supporting text-fg-muted [@media(hover:hover)]:hover:text-fg h-10 items-center rounded-md px-3 transition-colors duration-150`}
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
  raised,
}: {
  id: string;
  title: string;
  children: ReactNode;
  raised?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`border-hairline border-t ${raised ? "bg-surface" : ""}`}
    >
      <div
        className={`${gutter} grid gap-6 py-14 md:grid-cols-[12rem_1fr] md:gap-10 md:py-20`}
      >
        <h2
          id={`${id}-title`}
          className="text-title flex items-baseline gap-3 font-semibold"
        >
          <span
            aria-hidden
            className="bg-brand-line h-[3px] w-4 translate-y-[-0.3em] rounded-full"
          />
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className="overflow-x-clip">
      <div
        className={`${gutter} grid items-center gap-12 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:py-24`}
      >
        <div>
          <h1 className="text-display-sm md:text-display max-w-3xl font-semibold">
            {HERO.headline}
          </h1>
          <p className="text-body text-fg-muted mt-4 max-w-xl">{HERO.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={buttonClass("brand")}>
              {HERO.primaryCta}
            </a>
            <a href="#work" className={buttonClass("outline")}>
              {HERO.secondaryCta}
            </a>
          </div>
        </div>
        <JunctionLines className="w-full max-w-md md:max-w-none" />
      </div>
    </section>
  );
}

function Work() {
  return (
    <Section id="work" title="Work">
      <ol className="divide-hairline divide-y">
        {CASE_STUDIES.map((study) => (
          <li
            key={study.slug}
            className="grid gap-1 py-5 first:pt-0 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-x-6"
          >
            <p className="text-meta text-fg-subtle font-mono tabular-nums sm:pt-0.5">
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
              <p className="text-supporting mt-2 max-w-[65ch]">
                {study.summary}
              </p>
              <p className="text-meta text-fg-subtle mt-2 font-mono">
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
            <dd className="text-supporting text-fg-muted mt-1">
              {service.description}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" title="About">
      <div className="text-body max-w-[65ch] space-y-4">
        {ABOUT.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title={CONTACT.title} raised>
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
    <footer className="border-hairline border-t">
      <div
        className={`${gutter} text-meta text-fg-subtle flex flex-wrap items-center justify-between gap-4 py-8`}
      >
        <p>
          © {new Date().getFullYear()} {BRAND.full}
        </p>
        <ul className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="[@media(hover:hover)]:hover:text-fg transition-colors duration-150"
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
