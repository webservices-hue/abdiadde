import { SITE } from "@/lib/site";

export function buildWhatsAppUrl(message?: string) {
  const baseUrl = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

/** True when running inside an iframe (e.g. Lovable preview), where WhatsApp is often CSP-blocked. */
export function isEmbedded() {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * Try to open an external URL in a new tab. Returns true on success, false if blocked
 * (popup blocker, sandboxed iframe, CSP). Caller can then show a fallback UI.
 */
export function openExternalBlank(url: string): boolean {
  if (typeof window === "undefined") return false;

  // Inside iframes (preview), WhatsApp's redirect is frequently blocked. Surface fallback instead.
  if (isEmbedded()) return false;

  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) return true;
  } catch {
    // fall through
  }

  try {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    return true;
  } catch {
    return false;
  }
}
