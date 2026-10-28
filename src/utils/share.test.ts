import { describe, expect, it } from "vitest"
import { buildInvitationMessage, normalizePublicHttps, shareableInvitationUrl, whatsAppUrl } from "./share.ts"

const message = `❤️ We warmly invite you to celebrate the wedding of Pushpalatha & Gokul! 💍

Your presence and blessings mean a lot to us.

💌 Invitation & Event Details:
https://wedding.example/invite

With love, ❤️`

describe("invitation sharing", () => {
  it("sends only the short invitation and a public page link", () => {
    const page = "https://wedding.example/invite"
    const text = buildInvitationMessage("en", page)

    expect(text).toBe(message)
    expect(text).not.toContain("Tuesday")
    expect(text).not.toContain("Soundrapandian")
    expect(text).not.toContain("Asthitva")
    expect(text).not.toContain("192.168")
    expect(whatsAppUrl(text)).toBe(`https://wa.me/?text=${encodeURIComponent(text)}`)
    expect(decodeURIComponent(whatsAppUrl(text).split("text=")[1] ?? "")).toBe(text)
    expect(text).toContain("💍")
    expect(text).toContain("💌")
  })

  it("never puts a private network address in the message", () => {
    const local = "http://192.168.31.72:5173/"
    expect(shareableInvitationUrl(local)).toBe("")
    expect(buildInvitationMessage("ta", local)).not.toContain("192.168")
    expect(buildInvitationMessage("kn", local)).not.toContain("5173")
    expect(buildInvitationMessage("en", "http://localhost:5173/")).not.toContain("localhost")
    expect(shareableInvitationUrl("https://wedding.example/invite")).toBe("https://wedding.example/invite")
  })

  it("uses a configured public https address and rejects a private one", () => {
    const local = "http://192.168.31.72:5173/"
    expect(shareableInvitationUrl(local, "https://wedding.example/invite")).toBe("https://wedding.example/invite")
    expect(buildInvitationMessage("en", local)).not.toContain("192.168")
    expect(normalizePublicHttps("http://192.168.31.72:5173/")).toBe("")
    expect(normalizePublicHttps("http://wedding.example/invite")).toBe("")
    expect(normalizePublicHttps("https://wedding.example/invite")).toBe("https://wedding.example/invite")
  })
})
