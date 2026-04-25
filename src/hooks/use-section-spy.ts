// src/hooks/use-section-spy.ts
import { useEffect, useState } from "react";

/**
 * Watches a list of section IDs and returns the ID of the section the
 * reader is currently in. "Currently in" = the topmost section whose top
 * edge has crossed the active line (header offset + small buffer).
 *
 * Implementation note: an earlier version used IntersectionObserver with
 * threshold 0.5, but tall sections (taller than the observation band)
 * could never satisfy the threshold, so clicking nav links into them
 * left the underline stuck on the previous section.
 */
export function useSectionSpy(
  ids: readonly string[],
  offset: number = 100,
): string | null {
  const [active, setActive] = useState<string | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionIds = idsKey ? idsKey.split(",") : [];
    if (sectionIds.length === 0) return;

    function update() {
      let activeId: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          activeId = id;
        } else {
          break;
        }
      }
      setActive(activeId);
    }

    update();

    let raf = 0;
    function onChange() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    }

    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange, { passive: true });
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [idsKey, offset]);

  return active;
}
