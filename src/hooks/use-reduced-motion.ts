// src/hooks/use-reduced-motion.ts
import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion.
 * Initial render returns false to keep SSR/CSR boundary stable.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
