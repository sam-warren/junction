// src/components/aceternity/lamp.tsx
// Single-element lamp. Two stacked radial gradients pool brand light from
// the top-center of the hero. Predictable across viewports because there
// is exactly one DOM node and no absolute-positioned sub-layers to
// misalign.
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LampProps {
  className?: string;
  /** Color of the lamp gradient. Defaults to the brand mid-tone. */
  color?: string;
}

export function Lamp({
  className,
  color = "var(--color-brand-500)",
}: LampProps) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 h-[70vh]",
        className,
      )}
      style={{
        background: `
          radial-gradient(ellipse 60% 45% at 50% 0%, color-mix(in oklab, ${color} 40%, transparent), transparent 70%),
          radial-gradient(ellipse 35% 28% at 50% 0%, color-mix(in oklab, ${color} 55%, transparent), transparent 75%)
        `,
      }}
    />
  );
}
