interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

interface ApiResponse {
  success?: boolean;
  error?: string;
}

export async function submitContactForm(
  formData: ContactFormData,
): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send message");
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to send message",
    };
  }
}
