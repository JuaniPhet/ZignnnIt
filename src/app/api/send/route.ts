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

/**
 * Stable error codes: the client translates them (messages/*.json → contact.errors.<code>).
 * The English `error` text is kept for logs and API consumers.
 */
type ErrorCode =
  | "invalid_body"
  | "name_required"
  | "email_required"
  | "email_invalid"
  | "message_required"
  | "message_too_short"
  | "phone_invalid"
  | "field_too_long"
  | "security_failed"
  | "service_unavailable"
  | "send_failed";

function fail(code: ErrorCode, error: string, status: number) {
  return NextResponse.json({ code, error }, { status });
}

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

function validate(body: Record<string, unknown>): { data?: ContactPayload; code?: ErrorCode; error?: string } {
  const data: ContactPayload = {
    firstName: str(body.firstName),
    lastName: str(body.lastName),
    company: str(body.company),
    email: str(body.email),
    country: str(body.country),
    phone: str(body.phone),
    message: str(body.message),
  };

  if (!data.firstName && !data.lastName) return { code: "name_required", error: "Please provide your name." };
  if (!data.email) return { code: "email_required", error: "Email address is required." };
  if (!EMAIL_REGEX.test(data.email)) return { code: "email_invalid", error: "Please provide a valid email address." };
  if (!data.message) return { code: "message_required", error: "Message is required." };
  if (data.message.length < 10) return { code: "message_too_short", error: "Message must be at least 10 characters long." };
  if (data.phone && !/^[0-9+()\-.\s]+$/.test(data.phone)) {
    return { code: "phone_invalid", error: "Phone number contains invalid characters." };
  }

  for (const [field, max] of Object.entries(LIMITS)) {
    if (data[field as keyof ContactPayload].length > max) {
      return { code: "field_too_long", error: `Field "${field}" is too long (max ${max} characters).` };
    }
  }

  return { data };
}

async function verifyTurnstileToken(token: string, ip?: string | null): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  // Si la clé secrète n'est pas encore configurée, on ne bloque pas pour permettre le dev
  if (!secretKey) {
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await res.json();
    return Boolean(result.success);
  } catch (err) {
    console.error("[api/send] Turnstile verification failed:", err);
    return false;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("invalid_body", "Invalid request body.", 400);
  }

  // Champ piège anti-spam : invisible pour un humain, rempli par les bots.
  // On répond « succès » sans rien envoyer pour ne pas renseigner le bot.
  if (str(body.website)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Vérification Cloudflare Turnstile anti-bot
  const turnstileToken = str(body.turnstileToken);
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip");
  const isHuman = await verifyTurnstileToken(turnstileToken, clientIp);
  if (!isHuman) {
    return fail("security_failed", "Security check failed. Please refresh and try again.", 400);
  }

  const { data, code, error } = validate(body);
  if (!data) {
    return fail(code ?? "invalid_body", error ?? "Invalid request.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/send] RESEND_API_KEY is not set.");
    return fail("service_unavailable", "Email service is not configured.", 500);
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
      return fail("send_failed", "Failed to send your message. Please try again later.", 500);
    }

    return NextResponse.json({ success: true, id: sent?.id }, { status: 200 });
  } catch (err) {
    console.error("[api/send] Unexpected error:", err);
    return fail("send_failed", "Failed to send your message. Please try again later.", 500);
  }
}
