import {
  BENGALURU_ADDRESS,
  BENGALURU_VENUE,
  CHENNAI_ADDRESS,
  addressForDisplay,
  events,
  getCopy,
  venueForDisplay,
  type Locale,
} from "../data/weddingConfig.ts"

export function currentPageUrl(): string {
  const url = new URL(window.location.href)
  url.hash = ""
  url.search = ""
  return url.toString()
}

export function buildInvitationMessage(locale: Locale, pageUrl: string): string {
  const text = getCopy(locale)
  const lines = [
    text.shareLead,
    "",
    ...events.map(
      (event) => `${text.eventTitles[event.id]}: ${event.dateLabel[locale]}, ${event.timeLabel[locale]}`,
    ),
    addressForDisplay(CHENNAI_ADDRESS, locale) ?? CHENNAI_ADDRESS,
    `${venueForDisplay(BENGALURU_VENUE, locale) ?? BENGALURU_VENUE}, ${addressForDisplay(BENGALURU_ADDRESS, locale) ?? BENGALURU_ADDRESS}`,
    "",
    `${text.invitationWord}: ${pageUrl}`,
  ]
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
