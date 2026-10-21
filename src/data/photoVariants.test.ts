import { existsSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { photographs } from "./weddingConfig.ts"
import { photoVariants } from "./photoVariants.ts"

describe("pre-wedding photograph variants", () => {
  it("keeps a sharp source for every photograph without upscaling it", () => {
    for (const photo of photographs) {
      const set = photoVariants[photo.src]
      expect(set, photo.src).toBeTruthy()
      expect(set?.width).toBeGreaterThan(1000)
      expect(set?.height).toBeGreaterThan(set?.width ?? 0)
      for (const source of set?.sources ?? []) {
        expect(source.width).toBeLessThanOrEqual(set?.width ?? 0)
        expect(source.width).toBeLessThanOrEqual(3200)
        expect(existsSync(new URL(`../../public${source.webp}`, import.meta.url))).toBe(true)
        expect(existsSync(new URL(`../../public${source.jpeg}`, import.meta.url))).toBe(true)
      }
      const largest = set?.sources.at(-1)
      expect(largest?.width).toBe(Math.min(set?.width ?? 0, 3200))
    }
  })
})
