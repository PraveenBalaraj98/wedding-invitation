import { Buffer } from "node:buffer"
import { PNG } from "pngjs"
import jsQR from "jsqr"
import { describe, expect, it } from "vitest"
import { MAPS_URL } from "../data/weddingConfig.ts"
import { QR_CONTENTS, QR_RENDER_OPTIONS, assertQrContents, createQrDataUrl } from "./qrCode.ts"

function toRgba(data: Buffer, width: number, height: number): Uint8ClampedArray {
  const pixels = width * height
  if (data.length === pixels * 4) return new Uint8ClampedArray(data)
  if (data.length === pixels * 3) {
    const rgba = new Uint8ClampedArray(pixels * 4)
    for (let source = 0, target = 0; source < data.length; source += 3, target += 4) {
      rgba[target] = data[source] ?? 0
      rgba[target + 1] = data[source + 1] ?? 0
      rgba[target + 2] = data[source + 2] ?? 0
      rgba[target + 3] = 255
    }
    return rgba
  }
  throw new Error(`Unexpected PNG size ${data.length} for ${width}x${height}`)
}

describe("Bengaluru directions QR code", () => {
  it("decodes to the exact Google Maps URL", async () => {
    expect(QR_CONTENTS).toBe("https://maps.app.goo.gl/WYPcB7q9DJuc2n3r9")
    expect(QR_CONTENTS).toBe(MAPS_URL)
    expect(QR_RENDER_OPTIONS.margin).toBeGreaterThanOrEqual(4)
    expect(QR_RENDER_OPTIONS.color.dark).toBe("#000000")
    expect(QR_RENDER_OPTIONS.color.light).toBe("#FFFFFF")

    const dataUrl = await createQrDataUrl()
    expect(dataUrl.startsWith("data:image/png;base64,")).toBe(true)

    const png = PNG.sync.read(Buffer.from(dataUrl.slice("data:image/png;base64,".length), "base64"))
    const pixels = toRgba(png.data, png.width, png.height)
    const decoded = jsQR(pixels, png.width, png.height)

    expect(decoded).not.toBeNull()
    assertQrContents(decoded?.data, MAPS_URL)
    expect(decoded?.data).toBe("https://maps.app.goo.gl/WYPcB7q9DJuc2n3r9")

    expect(pixels[0]).toBe(255)
    expect(pixels[1]).toBe(255)
    expect(pixels[2]).toBe(255)
    expect(png.width).toBeGreaterThanOrEqual(640)
  })
})
