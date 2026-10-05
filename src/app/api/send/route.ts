import { NextResponse } from "next/server";
import { Resend } from "resend";

// Adresses publiques, pas des secrets : seule RESEND_API_KEY passe par l'environnement.
const TO_EMAIL = "contact@zignnnit.com";
const FROM_EMAIL = "ZignnnIt Contact <contact@zignnnit.com>";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  firstName: 100,
  lastName: 100,
  company: 150,
  email: 254,
  country: 50,
  phone: 30,
  message: 5000,
} as const;

type ContactPayload = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  message: string;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(body: Record<string, unknown>): { data?: ContactPayload; error?: string } {
  const data: ContactPayload = {
    firstName: str(body.firstName),
    lastName: str(body.lastName),
    company: str(body.company),
    email: str(body.email),
    country: str(body.country),
    phone: str(body.phone),
    message: str(body.message),
  };

  if (!data.firstName && !data.lastName) return { error: "Please provide your name." };
  if (!data.email) return { error: "Email address is required." };
  if (!EMAIL_REGEX.test(data.email)) return { error: "Please provide a valid email address." };
  if (!data.message) return { error: "Message is required." };
  if (data.message.length < 10) return { error: "Message must be at least 10 characters long." };
  if (data.phone && !/^[0-9+()\-.\s]+$/.test(data.phone)) {
    return { error: "Phone number contains invalid characters." };
  }

  for (const [field, max] of Object.entries(LIMITS)) {
    if (data[field as keyof ContactPayload].length > max) {
      return { error: `Field "${field}" is too long (max ${max} characters).` };
    }
  }

  return { data };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Champ piège anti-spam : invisible pour un humain, rempli par les bots.
  // On répond « succès » sans rien envoyer pour ne pas renseigner le bot.
  if (str(body.website)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { data, error } = validate(body);
  if (!data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/send] RESEND_API_KEY is not set.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const phone = data.phone ? `${data.country ? `${data.country} ` : ""}${data.phone}` : "";

  const rows: [string, string][] = [
    ["Name", fullName],
    ["Email", data.email],
    ["Company", data.company],
    ["Phone", phone],
  ];

  const text = [
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.5">
      <h2 style="margin:0 0 16px">New contact request</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:bold;vertical-align:top">${k}</td><td>${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { data: sent, error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: data.email,
      subject: `New contact request from ${fullName}`.replace(/[\r\n]+/g, " "),
      text,
      html,
    });

    if (sendError) {
      console.error("[api/send] Resend error:", sendError);
      return NextResponse.json({ error: "Failed to send your message. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: sent?.id }, { status: 200 });
  } catch (err) {
    console.error("[api/send] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send your message. Please try again later." }, { status: 500 });
  }
}
