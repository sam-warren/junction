import { cn } from "@/lib/utils";

const base =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-supporting font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60";

export function buttonClass(
  variant: "brand" | "outline" = "brand",
  className?: string,
) {
  return cn(
    base,
    variant === "brand" &&
      "bg-brand text-brand-fg [@media(hover:hover)]:hover:bg-brand-hover",
    variant === "outline" &&
      "border border-hairline text-fg [@media(hover:hover)]:hover:bg-surface",
    className,
  );
}
