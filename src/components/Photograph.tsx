import { useState } from "react"
import type { Photograph as PhotographData } from "../data/weddingConfig.ts"
import { photoVariants } from "../data/photoVariants.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Kolam } from "./Ornaments.tsx"

export function usePhotoState(src: string) {
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading")
  const [trackedSrc, setTrackedSrc] = useState(src)
  if (trackedSrc !== src) {
    setTrackedSrc(src)
    setState("loading")
  }
  return {
    state,
    onLoad: () => setState("ready"),
    onError: () => setState("missing"),
    src,
  }
}

export function PhotoVisual({
  photo,
  priority = false,
  preload = false,
  lightbox = false,
  frameClassName = "",
}: {
  photo: PhotographData
  priority?: boolean
  preload?: boolean
  lightbox?: boolean
  frameClassName?: string
}) {
  const { t } = useLocale()
  const { state, onLoad, onError } = usePhotoState(photo.src)
  const filename = photo.src.replace("/images/", "")
  const variant = photoVariants[photo.src]
  const sources = variant?.sources ?? []
  const webpSrcSet = sources.map((source) => `${source.webp} ${source.width}w`).join(", ")
  const jpegSrcSet = sources.map((source) => `${source.jpeg} ${source.width}w`).join(", ")
  const fallback = sources.find((source) => source.width >= 960)?.jpeg ?? sources.at(-1)?.jpeg ?? photo.src
  const sizes = lightbox ? "(max-width: 1100px) 100vw, 1100px" : "(max-width: 40rem) 90vw, 34rem"
  const frameClass = [
    "photo-frame",
    lightbox ? "lightbox-frame" : frameClassName ? "" : photo.orientation,
    frameClassName,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={frameClass}>
      {state !== "missing" && (
        <picture>
          {webpSrcSet ? <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} /> : null}
          <img
            className={state === "ready" ? "photo-img is-ready" : "photo-img"}
            src={fallback}
            srcSet={jpegSrcSet || undefined}
            sizes={sizes}
            width={variant?.width}
            height={variant?.height}
            alt={state === "ready" ? photo.alt : ""}
            loading={priority || preload ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
            onLoad={onLoad}
            onError={onError}
          />
        </picture>
      )}
      {state === "loading" && (
        <div className="photo-pending" role="status">
          <span className="sr-only">{t.photoLoading}</span>
        </div>
      )}
      {state === "missing" && (
        <div className="photo-placeholder">
          <Kolam />
          <p>{t.photoPlaceholder}</p>
          <p>{t.photoPlaceholderHint}</p>
          <code>public/images/{filename}</code>
        </div>
      )}
    </div>
  )
}
