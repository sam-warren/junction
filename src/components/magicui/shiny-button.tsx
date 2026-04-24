// src/components/magicui/shiny-button.tsx
// Primary CTA button with a diagonal shine sweeping across the surface
// every ~3.5s. Adapted from Magic UI's ShinyButton pattern. Keeps the
// Junction brand fill and glow; adds an animated overlay gradient that
// sweeps left-to-right on a loop.
import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

interface ShinyButtonProps
  extends Omit<HTMLMotionProps<"button">, "children" | "size"> {
  children: ReactNode;
  size?: Size;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3 text-[length:var(--text-body-sm)]",
  md: "h-11 px-5 text-[length:var(--text-body)]",
  lg: "h-14 px-7 text-[length:var(--text-body-lg)]",
};

export function ShinyButton({
  children,
  className,
  size = "md",
  iconLeft,
  iconRight,
  ...props
}: ShinyButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md bg-[var(--color-brand-500)] font-medium text-white shadow-md transition-shadow duration-200 hover:bg-[var(--color-brand-600)] hover:shadow-[var(--brand-glow)] active:bg-[var(--color-brand-700)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-400)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {/* Shine overlay: a diagonal white gradient that sweeps across the
          button surface. backgroundPosition animates off-right to off-left
          over the duration then waits repeatDelay before cycling again. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.25) 55%, transparent 80%)",
          backgroundSize: "250% 100%",
        }}
        initial={{ backgroundPosition: "250% 0" }}
        animate={{ backgroundPosition: "-150% 0" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
      />
      {iconLeft && <span className="relative z-10">{iconLeft}</span>}
      <span className="relative z-10">{children}</span>
      {iconRight && <span className="relative z-10">{iconRight}</span>}
    </motion.button>
  );
}

export default ShinyButton;
