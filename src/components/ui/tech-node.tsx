// src/components/ui/tech-node.tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TechNodeProps {
  name: string;
  icon: string;
  size?: number;
  className?: string;
  /** True for black-on-transparent source SVGs that collapse to invisible
   *  under the default grayscale+dark:invert combo. Substitutes a mid-gray
   *  filter that stays legible in both themes. */
  darkLogo?: boolean;
}

export const TechNode = forwardRef<HTMLDivElement, TechNodeProps>(
  ({ name, icon, size = 80, className, darkLogo }, ref) => (
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
        className={cn(
          "h-9 w-9",
          darkLogo
            ? "[filter:grayscale(1)_invert(0.55)] dark:[filter:grayscale(1)_invert(0.9)]"
            : "grayscale dark:invert",
        )}
        draggable={false}
      />
    </div>
  ),
);
TechNode.displayName = "TechNode";
