// src/components/magicui/terminal.tsx
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedSpanProps extends HTMLMotionProps<"div"> {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export function AnimatedSpan({
  delay = 0,
  className,
  children,
  ...props
}: AnimatedSpanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={cn(
        "grid font-[family-name:var(--font-mono)] text-[11px] sm:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface TypingAnimationProps extends Omit<
  HTMLMotionProps<"div">,
  "children"
> {
  children: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export function TypingAnimation({
  children,
  delay = 0,
  duration = 50,
  className,
  ...props
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      if (i < children.length) {
        setDisplayed(children.slice(0, i + 1));
        i++;
      } else {
        clearInterval(id);
      }
    }, duration);
    return () => clearInterval(id);
  }, [started, children, duration]);

  return (
    <motion.div
      className={cn("font-[family-name:var(--font-mono)] text-[11px] sm:text-sm", className)}
      {...props}
    >
      {displayed}
    </motion.div>
  );
}

interface TerminalProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  children: React.ReactNode;
}

export function Terminal({ className, children, ...props }: TerminalProps) {
  return (
    <div
      className={cn(
        "z-0 w-full min-w-0 max-w-2xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] shadow-[var(--shadow-lg)]",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-y-2 border-b border-[var(--border)] p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <div className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
      </div>
      <pre className="m-0 overflow-x-auto p-4 text-[var(--text-primary)]">
        <code className="grid gap-y-1">{children}</code>
      </pre>
    </div>
  );
}
