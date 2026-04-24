// src/components/ui/ThemeToggle.tsx
//
// Theme toggle with a View-Transitions-API circular reveal that emanates
// from the button's click origin. When the browser supports
// `document.startViewTransition`, the incoming theme is clipped to a
// growing circle rooted at the button's center; fallback is an instant
// class swap. Users with `prefers-reduced-motion` also skip the reveal.
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { SPRING } from "@/lib/motion";

type DocWithViewTransitions = Document & {
  startViewTransition?: (cb: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;

    const apply = () => {
      setIsDark(next);
      document.documentElement.classList.toggle("dark", next);
      document.documentElement.classList.toggle("light", !next);
      document.body.classList.toggle("dark", next);
      document.body.classList.toggle("light", !next);
      localStorage.theme = next ? "dark" : "light";
    };

    const doc = document as DocWithViewTransitions;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reducedMotion || !buttonRef.current) {
      apply();
      return;
    }

    // Origin of the reveal: the button center. Radius: distance to the
    // farthest viewport corner so the reveal always fills the page.
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      flushSync(apply);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-md text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-400)] active:scale-[0.96]",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          className="absolute inset-0 grid place-items-center"
          initial={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
          transition={SPRING.default}
        >
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggle;
