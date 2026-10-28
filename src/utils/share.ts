import { publicInvitationUrl, type Locale } from "../data/weddingConfig.ts"

export function currentPageUrl(): string {
  const url = new URL(window.location.href)
  url.hash = ""
  url.search = ""
  return url.toString()
}

function isPrivateHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "")
  if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host.endsWith(".local")) return true
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host)
  if (!match) return false
  const parts = match.slice(1).map(Number)
  if (parts.some((part) => part > 255)) return false
  const [a, b] = parts
  return a === 10 || a === 127 || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31)
}

export function normalizePublicHttps(value: string | null | undefined): string {
  if (!value?.trim()) return ""
  try {
    const url = new URL(value.trim())
    if (url.protocol !== "https:" || isPrivateHost(url.hostname)) return ""
    url.hash = ""
    url.search = ""
    return url.toString()
  } catch {
    return ""
  }
}

function configuredInvitationUrl(): string | null {
  const env = (import.meta as ImportMeta & { env?: { VITE_PUBLIC_INVITATION_URL?: string } }).env
  const fromEnv = env?.VITE_PUBLIC_INVITATION_URL
  if (typeof fromEnv === "string" && fromEnv.trim()) return fromEnv.trim()
  return publicInvitationUrl
}

/** A link other people can open. Private development addresses are left out. */
export function shareableInvitationUrl(pageUrl: string, configured: string | null = configuredInvitationUrl()): string {
  const preferred = normalizePublicHttps(configured)
  if (preferred) return preferred
  try {
    const url = new URL(pageUrl)
    if (isPrivateHost(url.hostname)) return ""
    if (url.protocol !== "https:" && url.protocol !== "http:") return ""
    url.hash = ""
    url.search = ""
    return url.toString()
  } catch {
    return ""
  }
}

export function buildInvitationMessage(_locale: Locale, pageUrl: string): string {
  const url = shareableInvitationUrl(pageUrl)
  const lines = [
    "❤️ We warmly invite you to celebrate the wedding of Pushpalatha & Gokul! 💍",
    "",
    "Your presence and blessings mean a lot to us.",
    "",
    "💌 Invitation & Event Details:",
  ]
  if (url) lines.push(url)
  lines.push("", "With love, ❤️")
  return lines.join("\n")
}

export function whatsAppUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fall through to the older selection path.
  }

  try {
    const area = document.createElement("textarea")
    area.value = text
    area.setAttribute("readonly", "")
    area.style.position = "fixed"
    area.style.left = "-9999px"
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand("copy")
    area.remove()
    return ok
  } catch {
    return false
  }
}

export type ShareResult = "shared" | "copied" | "cancelled" | "failed"

export async function shareOrCopy(payload: { title: string; text: string; url: string }): Promise<ShareResult> {
  if (typeof navigator.share === "function") {
    try {
      await navigator.share(payload)
      return "shared"
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "cancelled"
    }
  }

  const ok = await copyText(`${payload.text}\n${payload.url}`.trim())
  return ok ? "copied" : "failed"
}
