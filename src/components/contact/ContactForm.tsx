import Alert from "@/components/ui/Alert";
import FrostedCard from "@/components/ui/FrostedCard";
import { Loader, Mail, Pencil, UserCircle, XCircle } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  [key: string]: string;
}

interface AlertState {
  type: "success" | "error";
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
  const [alert, setAlert] = useState<AlertState | null>(null);
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
      setAlert({
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

      setAlert({
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
      setAlert({
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
      "relative w-full px-4 py-2 rounded-md border bg-white/20 dark:bg-gray-900/20 backdrop-blur-[5px] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400";
    return `${baseClasses} ${
      errors[fieldName]
        ? "border-red-500 focus:border-red-500"
        : "border-gray-200 dark:border-gray-800 focus:border-blue-400 dark:focus:border-blue-400"
    }`;
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl p-4 pb-6 pt-6 px-2 sm:px-6 lg:px-8 lg:pt-8">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onDismiss={() => setAlert(null)}
        />
      )}

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
            Ready to start your next project? Share your vision and we'll help
            bring it to life.
          </p>
        </div>

        {/* Form with delayed fade-up animation */}
        <FrostedCard className="relative w-full animate-fade-up-200 p-4 opacity-0 lg:w-1/2">
          <form onSubmit={handleSubmit} noValidate>
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
            </div>
          </form>
        </FrostedCard>
      </div>
    </div>
  );
};

export default ContactForm;
