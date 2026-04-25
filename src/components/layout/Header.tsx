// src/components/layout/Header.tsx
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSectionSpy } from "@/hooks/use-section-spy";
import { HOMEPAGE_SECTIONS } from "@/config/routes";
import { BRAND } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  // Scroll-driven backdrop opacity. Ramps 0 -> 1 across the first 16px
  // of scroll so the header reaches opaque early — keeps the hero's
  // patterns (FlickeringGrid, dot mask) from creating a sharp seam at
  // the header's bottom edge. Uses a motion value (not a boolean + CSS
  // transition) so there is no async window during which the hero
  // bleeds through a transitioning header.
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 16], [0, 1]);
  const sectionIds = HOMEPAGE_SECTIONS.map((s) => s.id);
  const activeSection = useSectionSpy(sectionIds);
  // While a click-driven smooth scroll is in flight, pin the underline to
  // the click target so the spy doesn't tick through every section in
  // between. Without this pin, layoutId animates capabilities -> how ->
  // approach -> work in four separate springs that visibly settle between
  // each — the "detent" effect.
  const [pinnedActive, setPinnedActive] = useState<string | null>(null);
  const visualActive = pinnedActive ?? activeSection;
  const releasePinTimers = useRef<{
    idle?: ReturnType<typeof setTimeout>;
    safety?: ReturnType<typeof setTimeout>;
    onScroll?: () => void;
    onScrollEnd?: () => void;
  }>({});
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [location.pathname]);

  // Clear any in-flight pin if the user navigates away from the home page.
  useEffect(() => {
    if (!isHome) setPinnedActive(null);
  }, [isHome]);

  function pinActiveSection(id: string) {
    if (id === activeSection) return;
    setPinnedActive(id);

    const timers = releasePinTimers.current;
    const cleanup = () => {
      if (timers.idle) clearTimeout(timers.idle);
      if (timers.safety) clearTimeout(timers.safety);
      if (timers.onScroll)
        window.removeEventListener("scroll", timers.onScroll);
      if (timers.onScrollEnd)
        window.removeEventListener("scrollend", timers.onScrollEnd);
      timers.idle = undefined;
      timers.safety = undefined;
      timers.onScroll = undefined;
      timers.onScrollEnd = undefined;
    };
    cleanup();

    const release = () => {
      cleanup();
      setPinnedActive(null);
    };

    timers.onScrollEnd = release;
    window.addEventListener("scrollend", release, { once: true });

    timers.onScroll = () => {
      if (timers.idle) clearTimeout(timers.idle);
      timers.idle = setTimeout(release, 100);
    };
    window.addEventListener("scroll", timers.onScroll, { passive: true });

    timers.safety = setTimeout(release, 1500);
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        {/* Bg + blur, feathered at the bottom so the backdrop-blur boundary
            doesn't cut a sharp horizontal seam across the hero lamp during
            the 0 -> 1 opacity ramp. */}
        <motion.div
          aria-hidden
          style={{
            opacity: bgOpacity,
            maskImage:
              "linear-gradient(to bottom, black calc(100% - 14px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black calc(100% - 14px), transparent)",
          }}
          className="pointer-events-none absolute inset-0 bg-[var(--canvas)]/80 backdrop-blur-xl"
        />
        {/* Hairline border kept on its own un-masked layer so it still reads
            as a clean 1px edge once the header is fully opaque. */}
        <motion.div
          aria-hidden
          style={{ opacity: bgOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--border)]"
        />
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-8">
          <Link
            to="/"
            onClick={(e) => {
              // On home, intercept and scroll to top instead of letting the
              // <Link> no-op (same-route clicks don't trigger ScrollToTop).
              // Skip when modifier keys are held so cmd/ctrl-click can still
              // open in a new tab. CSS scroll-behavior on <html> handles the
              // smooth/instant split for prefers-reduced-motion.
              if (
                e.button !== 0 ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey
              )
                return;
              if (!isHome) return;
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-[var(--text-primary)]"
          >
            <BrandMark variant="static" size="h-5 w-auto sm:h-6" />
            <span className="text-lg font-semibold tracking-tight sm:text-xl">
              {BRAND.short}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {isHome &&
              HOMEPAGE_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => pinActiveSection(s.id)}
                  className={cn(
                    "relative px-3 py-2 text-[length:var(--text-body-sm)] font-medium transition-colors duration-200",
                    visualActive === s.id
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {s.label}
                  {visualActive === s.id && (
                    <motion.span
                      layoutId="header-active-underline"
                      transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--color-brand-400)]"
                    />
                  )}
                </a>
              ))}
            {!isHome && (
              <NavLink
                to="/"
                className="px-3 py-2 text-[length:var(--text-body-sm)] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Home
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden sm:block">
              <Button
                size="sm"
                withBorderBeam
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Start a project
              </Button>
            </Link>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-[0.96] md:hidden"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute top-0 right-0 h-full w-72 border-l border-[var(--border)] bg-[var(--surface-1)] p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            >
              <nav className="mt-12 flex flex-col gap-2">
                {(isHome ? HOMEPAGE_SECTIONS : []).map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-md px-3 py-3 text-[length:var(--text-body)] font-medium text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
                    onClick={() => setOpen(false)}
                  >
                    {s.label}
                  </a>
                ))}
                <Link
                  to="/contact"
                  className="rounded-md px-3 py-3 text-[length:var(--text-body)] font-medium text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
                >
                  Contact
                </Link>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
