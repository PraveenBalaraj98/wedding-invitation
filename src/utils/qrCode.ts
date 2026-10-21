import { toDataURL, type QRCodeToDataURLOptions } from "qrcode"
import { MAPS_URL } from "../data/weddingConfig.ts"

/**
 * The QR payload is the verified Bengaluru Maps link and nothing else.
 * High error correction, a four-module quiet zone, and black-on-white keep it scannable.
 * Do not overlay a logo, gradient, or pattern on the image this produces.
 */
export const QR_CONTENTS = MAPS_URL

export const QR_RENDER_OPTIONS = {
  errorCorrectionLevel: "H",
  margin: 4,
  width: 640,
  color: {
    dark: "#000000",
    light: "#FFFFFF",
  },
} as const satisfies QRCodeToDataURLOptions

export function createQrDataUrl(text: string = QR_CONTENTS): Promise<string> {
  return toDataURL(text, QR_RENDER_OPTIONS)
}

/** Used by the automated scan test. The decoded text must be the Maps URL exactly. */
export function assertQrContents(decoded: string | null | undefined, expected: string = QR_CONTENTS): void {
  if (decoded !== expected) {
    throw new Error(`QR contents did not match. Expected "${expected}", received "${decoded ?? ""}".`)
  }
}
