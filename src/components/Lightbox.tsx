import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { photographs } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { PhotoVisual } from "./Photograph.tsx"

export function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number
  onClose: () => void
  onChange: (index: number) => void
}) {
  const { t } = useLocale()
  const dialogRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const photo = photographs[index]
  const last = photographs.length - 1

  function go(nextIndex: number) {
    if (nextIndex >= 0 && nextIndex <= last) onChange(nextIndex)
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.querySelector<HTMLElement>("[data-close]")?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") go(index - 1)
      if (event.key === "ArrowRight") go(index + 1)
      if (event.key !== "Tab" || !dialogRef.current) return
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>("button:not(:disabled)")]
      const first = items[0]
      const lastItem = items[items.length - 1]
      if (!first || !lastItem) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [index, last, onClose, onChange])

  if (!photo) return null

  return createPortal(
    <div className="lightbox no-print" onClick={onClose}>
      <div
        ref={dialogRef}
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={t.photoCount(index + 1, photographs.length)}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          startX.current = event.changedTouches[0]?.clientX ?? 0
        }}
        onTouchEnd={(event) => {
          const delta = (event.changedTouches[0]?.clientX ?? startX.current) - startX.current
          if (delta > 48) go(index - 1)
          if (delta < -48) go(index + 1)
        }}
      >
        <div className="lightbox-bar">
          <p>{t.photoCount(index + 1, photographs.length)}</p>
          <button className="icon-btn" type="button" data-close onClick={onClose} aria-label={t.photoClose}>
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="lightbox-photo">
          <PhotoVisual key={photo.src} photo={photo} priority lightbox />
          {photo.caption ? <p className="photo-caption">{photo.caption}</p> : null}
        </div>
        <div className="lightbox-nav">
          <button
            className="icon-btn"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              go(index - 1)
            }}
            disabled={index === 0}
            aria-label={t.photoPrev}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <p>{t.photoCount(index + 1, photographs.length)}</p>
          <button
            className="icon-btn"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              go(index + 1)
            }}
            disabled={index === last}
            aria-label={t.photoNext}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
