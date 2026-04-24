// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { BrandMark } from "@/components/ui/brand-mark";
import { BRAND, SOCIAL_LINKS } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:items-start lg:px-8">
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2 text-[var(--text-primary)]">
            <BrandMark variant="static" size="h-6 w-auto" />
            <span className="text-base font-semibold tracking-tight">{BRAND.short}</span>
          </Link>
          <p className="text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
            {BRAND.full}
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <span className="text-[length:var(--text-mono-sm)] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--text-tertiary)]">
            Elsewhere
          </span>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="grid h-10 w-10 place-items-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]"
              >
                <img src={link.icon} alt="" className="h-5 w-5 dark:invert" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--border)] px-6 pt-6 lg:px-8">
        <p className="text-center text-[length:var(--text-mono-sm)] font-[family-name:var(--font-mono)] text-[var(--text-tertiary)]">
          © {year} {BRAND.full}
        </p>
      </div>
    </footer>
  );
}
