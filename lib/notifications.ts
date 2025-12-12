// lib/notifications.ts
// Minimal notifications helper (stub) — safe for local development.
// Replace with real provider code (Twilio, Vonage, etc.) when ready.

export async function sendWhatsAppMessage(phone: string, message: string) {
  try {
    // Normalize phone if you want (e.g., add country code)
    const to = String(phone).trim();
    console.log(`[WhatsApp - STUB] To: ${to} — Message: ${message}`);

    // Simulate provider response
    return { ok: true, provider: "stub", messageId: `stub-${Date.now()}` };
  } catch (err) {
    console.error("sendWhatsAppMessage stub error:", err);
    return { ok: false, error: String(err) };
  }
}
