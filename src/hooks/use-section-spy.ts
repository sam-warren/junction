// src/hooks/use-section-spy.ts
import { useEffect, useState } from "react";

/**
 * Watches a list of section IDs and returns the ID of the section
 * currently most-visible in the viewport. Used by Header for scrollspy.
 *
 * @param ids array of element IDs (without the leading "#")
 * @returns the active section ID, or null if none
 */
export function useSectionSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
        )[0];
        setActive(top.target.id);
      },
      { threshold: [0.5], rootMargin: "0px 0px -40% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
