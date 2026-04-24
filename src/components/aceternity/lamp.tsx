// src/components/aceternity/lamp.tsx
// Lamp gradient background. Renders two conic gradients converging to a
// horizontal blur bar so the text block sitting on top appears pooled
// under a theatrical lamp.
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LampProps {
  className?: string;
  /** Color of the lamp gradient. Defaults to the brand mid-tone. */
  color?: string;
}

export function Lamp({
  className,
  // Deeper brand tone so the lamp doesn't collide chromatically with
  // brand-300 text sitting on top of it.
  color = "var(--color-brand-500)",
}: LampProps) {
  return (
    <div
      className={cn(
        // Constrain lamp to a 55vh band starting 10vh from the top of the
        // hero so the bright region pools above the headline instead of
        // sitting at the top edge.
        "pointer-events-none absolute inset-x-0 top-[10vh] isolate z-0 flex h-[55vh] items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.2, width: "15rem" }}
          whileInView={{ opacity: 0.55, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${color}, transparent, transparent)`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-[var(--canvas)] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-[var(--canvas)] [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.2, width: "15rem" }}
          whileInView={{ opacity: 0.55, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${color})`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]"
        >
          <div className="absolute right-0 bottom-0 z-20 h-full w-40 bg-[var(--canvas)] [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute right-0 bottom-0 z-20 h-40 w-full bg-[var(--canvas)] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[var(--canvas)] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: color }}
        />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full opacity-60 blur-2xl"
          style={{ backgroundColor: color }}
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] opacity-70"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
