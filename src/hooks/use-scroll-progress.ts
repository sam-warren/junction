// src/hooks/use-scroll-progress.ts
import { useEffect, useState } from "react";

/**
 * Returns true when the page has scrolled past `threshold` pixels.
 * Used by the Header to toggle backdrop-blur and border on scroll.
 */
export function useScrollProgress(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}
