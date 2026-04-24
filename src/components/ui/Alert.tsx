// src/components/ui/Alert.tsx
import { CheckCircle2, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface AlertProps {
  type: "success" | "error";
  message: string;
  onDismiss?: () => void;
}

export default function Alert({ type, message, onDismiss }: AlertProps) {
  const Icon = type === "success" ? CheckCircle2 : XCircle;
  const tone =
    type === "success"
      ? "border-[var(--success)]/40 text-[var(--success)] bg-[color-mix(in_oklab,var(--success)_10%,transparent)]"
      : "border-[var(--danger)]/40 text-[var(--danger)] bg-[color-mix(in_oklab,var(--danger)_10%,transparent)]";

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        className={cn(
          "fixed left-1/2 top-20 z-50 flex max-w-md -translate-x-1/2 items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 shadow-[var(--shadow-lg)]",
          tone,
        )}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <p className="text-[length:var(--text-body-sm)]">{message}</p>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="ml-auto grid h-6 w-6 place-items-center rounded text-current opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
