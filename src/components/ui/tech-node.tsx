// src/components/ui/tech-node.tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { techFilterClass } from "@/content/tech-stack";

export interface TechNodeProps {
  name: string;
  icon: string;
  size?: number;
  className?: string;
  /** Aggressive filter for fully-black logos that should pop white in dark
   *  mode. See `techFilterClass` for the curve. */
  darkLogo?: boolean;
  /** Muted filter for high-contrast monochrome logos (white- or
   *  black-dominant) that should blend with the colored logos as mid-gray. */
  softLogo?: boolean;
}

export const TechNode = forwardRef<HTMLDivElement, TechNodeProps>(
  ({ name, icon, size = 80, className, darkLogo, softLogo }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative grid place-items-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-1)] shadow-[var(--shadow-md)]",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={name}
      title={name}
    >
      <img
        src={icon}
        alt=""
        className={cn("h-9 w-9", techFilterClass({ darkLogo, softLogo }))}
        draggable={false}
      />
    </div>
  ),
);
TechNode.displayName = "TechNode";
