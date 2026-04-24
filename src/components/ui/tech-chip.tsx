// src/components/ui/tech-chip.tsx
import { cn } from "@/lib/utils";

export interface TechChipProps {
  label: string;
  href?: string;
  className?: string;
}

export function TechChip({ label, href, className }: TechChipProps) {
  const Tag = href ? "a" : "span";
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-xs)] border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1 font-[family-name:var(--font-mono)] text-[length:var(--text-mono-sm)] text-[var(--text-secondary)] transition-colors duration-200",
        href && "hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]",
        className,
      )}
    >
      {label}
    </Tag>
  );
}
