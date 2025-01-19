export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface ApiResponse {
  success?: boolean;
  error?: string;
  data?: unknown;
}
