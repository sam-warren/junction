import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { buttonClass } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}
type FormField = "name" | "email" | "message";
type FormErrors = Partial<Record<FormField, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; message: string };

const EMPTY: FormData = { name: "", email: "", message: "", honeypot: "" };

function validate(field: FormField, value: string): string | undefined {
  if (field === "name" && !value.trim()) return "Name is required";
  if (field === "email") {
    if (!value) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
      return "Enter a valid email address";
  }
  if (field === "message") {
    if (!value.trim()) return "Message is required";
    if (value.trim().length < 10)
      return "Message must be at least 10 characters";
  }
  return undefined;
}

const inputClass =
  "w-full rounded-md border bg-canvas px-3 py-2 text-body text-fg placeholder:text-fg-subtle sm:text-supporting";

export function ContactForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status.kind !== "sending") setStatus({ kind: "idle" });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data.honeypot) return;
    const next: FormErrors = {
      name: validate("name", data.name),
      email: validate("email", data.email),
      message: validate("message", data.message),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      });
      const body: { success?: boolean; error?: string } = await res.json();
      if (!res.ok) throw new Error(body.error || "The message didn't send.");
      setStatus({ kind: "sent" });
      setData(EMPTY);
    } catch (err) {
      setStatus({
        kind: "failed",
        message:
          err instanceof Error ? err.message : "The message didn't send.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <input
        type="text"
        name="honeypot"
        value={data.honeypot}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            value={data.name}
            onChange={onChange}
            aria-invalid={Boolean(errors.name)}
            className={cn(
              inputClass,
              errors.name ? "border-danger" : "border-hairline",
            )}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={data.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            className={cn(
              inputClass,
              errors.email ? "border-danger" : "border-hairline",
            )}
          />
        </Field>
      </div>
      <Field label="Message" htmlFor="message" error={errors.message}>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={data.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          className={cn(
            inputClass,
            "resize-y",
            errors.message ? "border-danger" : "border-hairline",
          )}
        />
      </Field>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className={buttonClass("brand")}
        >
          {status.kind === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" className="text-supporting">
          {status.kind === "sent" && (
            <span className="text-positive">
              Message sent. We reply within one business day.
            </span>
          )}
          {status.kind === "failed" && (
            <span className="text-danger">{status.message}</span>
          )}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-meta text-fg-muted font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-meta text-danger">{error}</p>}
    </div>
  );
}
