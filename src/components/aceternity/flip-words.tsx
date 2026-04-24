// src/components/aceternity/flip-words.tsx
// Aceternity-style rotating text: each word enters with a blur+rise and
// exits with a blur+lift. `initial={false}` keeps the first word from
// double-animating with its parent BlurFade on page load.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  /** Cycle duration in ms. */
  duration?: number;
  className?: string;
}

export function FlipWords({
  words,
  duration = 2500,
  className,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(id);
  }, [words.length, duration]);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={cn("inline-block", className)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
