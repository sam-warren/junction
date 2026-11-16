import { Resend } from "resend";

function formatMessage(message: string) {
  return message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" style="color: #007bff; text-decoration: underline;">$1</a>',
    )
    .split("\n")
    .join("<br>");
}

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL;
  if (!from || !to || !process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "Email configuration missing" },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `${name} | JunctionTech Inquiry`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #333; max-width: 600px;">
          <div style="white-space: pre-wrap;">${formatMessage(message)}</div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            From: ${escape(name)} (${escape(email)})
          </div>
        </div>
      `,
      replyTo: email,
    });
    if (error) throw new Error(error.message);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Error sending email" }, { status: 500 });
  }
}
