// src/components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";

const buttonStyles = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[background-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-brand-400)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] hover:shadow-[var(--brand-glow)] active:bg-[var(--color-brand-700)]",
        ghost:
          "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-1)] hover:border-[var(--border-strong)]",
        link: "text-[var(--color-brand-300)] underline-offset-4 hover:text-[var(--color-brand-200)] hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-[length:var(--text-body-sm)]",
        md: "h-11 px-5 text-[length:var(--text-body)]",
        lg: "h-14 px-7 text-[length:var(--text-body-lg)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  withBorderBeam?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      withBorderBeam,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        buttonStyles({ variant, size }),
        "group overflow-hidden",
        className,
      )}
      {...props}
    >
      {iconLeft}
      <span className="relative z-10">{children}</span>
      {iconRight}
      {withBorderBeam && (
        <BorderBeam className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  ),
);
Button.displayName = "Button";
