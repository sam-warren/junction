// src/app/contact/ContactForm.tsx
import { Loader, Mail, Pencil, UserCircle, XCircle } from "lucide-react";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}
type FormField = "name" | "email" | "message";
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
export function ContactForm() {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(field: FormField, value: string): string | undefined {
    if (field === "name" && !value.trim()) return "Name is required";
    if (field === "email") {
      if (!value) return "Email is required";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
        return "Invalid email address";
    }
    if (field === "message") {
      if (!value.trim()) return "Message is required";
      if (value.length < 10) return "Message must be at least 10 characters";
    }
    return undefined;
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data.honeypot) {
      toast.error("Form submission failed.");
      return;
    }
    const next: FormErrors = {
      name: validate("name", data.name),
      email: validate("email", data.email),
      message: validate("message", data.message),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      });
      const body: { success?: boolean; error?: string } = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed to send message");
      toast.success(
        "Message sent. We'll get back to you within one business day.",
      );
      setData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    "w-full rounded-[var(--radius-sm)] border bg-[var(--surface-2)] px-4 py-3 text-[length:var(--text-body)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-brand-400)] focus-visible:outline-offset-2";

  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-1)] p-2 shadow-[var(--shadow-md)] lg:p-2"
      >
        <div className="space-y-4 p-4 sm:p-6 lg:p-8">
          <input
            type="text"
            name="honeypot"
            value={data.honeypot}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <Field
            label="Name"
            htmlFor="name"
            icon={<UserCircle className="h-5 w-5" />}
            error={errors.name}
          >
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={onChange}
              placeholder="Your name"
              className={cn(
                inputBase,
                errors.name
                  ? "border-[var(--danger)]"
                  : "border-[var(--border)]",
              )}
            />
          </Field>

          <Field
            label="Email"
            htmlFor="email"
            icon={<Mail className="h-5 w-5" />}
            error={errors.email}
          >
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={onChange}
              placeholder="you@example.com"
              className={cn(
                inputBase,
                errors.email
                  ? "border-[var(--danger)]"
                  : "border-[var(--border)]",
              )}
            />
          </Field>

          <Field
            label="Message"
            htmlFor="message"
            icon={<Pencil className="h-5 w-5" />}
            error={errors.message}
          >
            <textarea
              name="message"
              id="message"
              value={data.message}
              onChange={onChange}
              rows={6}
              placeholder="What are you building? What problem are you trying to solve?"
              className={cn(
                inputBase,
                "h-40 resize-none",
                errors.message
                  ? "border-[var(--danger)]"
                  : "border-[var(--border)]",
              )}
            />
          </Field>

          <div className="pt-2">
            <ShinyButton
              type="submit"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" /> Sending…
                </span>
              ) : (
                "Send message"
              )}
            </ShinyButton>
          </div>
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  htmlFor,
  icon,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-[length:var(--text-body-sm)] text-[var(--text-secondary)]"
      >
        {icon}
        {label}
      </label>
      {children}
      <div
        className={cn(
          "overflow-hidden text-[length:var(--text-body-sm)] text-[var(--danger)] transition-[max-height,opacity] duration-200",
          error ? "max-h-6 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {error && (
          <span className="inline-flex items-center gap-1">
            <XCircle className="h-4 w-4" /> {error}
          </span>
        )}
      </div>
    </div>
  );
}
