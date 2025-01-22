import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Loader,
  UserCircle,
  Mail,
  Pencil,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  [key: string]: string;
}

interface SubmitStatus {
  type: "" | "success" | "error";
  message: string;
}

interface ApiResponse {
  success?: boolean;
  error?: string;
  data?: unknown;
}

type FormField = keyof Omit<FormData, "honeypot">;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: FormField, value: string): string => {
    switch (name) {
      case "name":
        return !value.trim() ? "Name is required" : "";
      case "email":
        return !value
          ? "Email is required"
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ? "Invalid email address"
            : "";
      case "message":
        return !value.trim()
          ? "Message is required"
          : value.length < 10
            ? "Message must be at least 10 characters"
            : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (formData.honeypot) {
      setSubmitStatus({
        type: "error",
        message: "Form submission failed.",
      });
      return;
    }

    const newErrors: FormErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
        honeypot: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName: string): string => {
    const baseClasses =
      "relative w-full px-4 py-2 rounded-md border bg-white/100 dark:bg-gray-900/100 text-gray-600 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500 z-10";
    return `${baseClasses} ${
      errors[fieldName]
        ? "border-red-500 focus:border-red-500"
        : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
    }`;
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl p-4 sm:px-6 lg:px-8 lg:pt-40">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
        {/* Text content with fade-up animation */}
        <div className="mb-4 animate-fade-up opacity-0 lg:mb-0 lg:flex-1 lg:self-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-500 dark:to-blue-500">
              Connect
            </span>
          </h2>
          <p className="pt-2 text-lg text-gray-600 dark:text-gray-400">
            Your enterprise deserves solutions that bridge the gap between
            established and emerging technologies. Let's make it happen.
          </p>
        </div>

        {/* Form with delayed fade-up animation */}
        <div className="w-full animate-fade-up-400 bg-opacity-100 lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative rounded-lg border border-gray-200 bg-white/20 p-4 backdrop-blur-[3px] dark:border-gray-800 dark:bg-gray-900/20"          >
            <div className="hidden">
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 flex items-center text-gray-600 dark:text-gray-400"
                >
                  <UserCircle className="mr-2 h-5 w-5" />
                  Name
                </label>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={getInputClassName("name")}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <XCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`overflow-hidden transition-all ${errors.name ? "animate-error-in" : "h-0 opacity-0"}`}
                  >
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 flex items-center text-gray-600 dark:text-gray-400"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </label>
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={getInputClassName("email")}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <XCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`overflow-hidden transition-all ${errors.email ? "animate-error-in" : "h-0 opacity-0"}`}
                  >
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 flex items-center text-gray-600 dark:text-gray-400"
                >
                  <Pencil className="mr-2 h-5 w-5" />
                  Message
                </label>
                <div>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`${getInputClassName("message")} h-48 resize-none overflow-y-auto`}
                      placeholder="Your message here..."
                    />
                    {errors.message && (
                      <div className="absolute right-3 top-[0.7rem]">
                        <XCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`overflow-hidden transition-all ${errors.message ? "animate-error-in" : "h-0 opacity-0"}`}
                  >
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
              {submitStatus.message && (
                <div
                  className={`rounded-md border p-4 ${
                    submitStatus.type === "success"
                      ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/30 dark:text-green-200"
                      : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/30 dark:text-red-200"
                  }`}
                >
                  <div className="flex items-center">
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="mr-2 h-5 w-5 text-red-600" />
                    )}
                    <p>{submitStatus.message}</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
