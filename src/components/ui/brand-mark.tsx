import { cn } from "@/lib/utils";

const PATHS = ["M15,50 L95,50", "M15,20 L55,20 L70,50", "M15,80 L55,80 L70,50"];

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("h-5 w-5", className)}
      aria-hidden
    >
      {PATHS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={10}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
