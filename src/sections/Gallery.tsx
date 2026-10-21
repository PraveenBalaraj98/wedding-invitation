import { useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useReducedMotion } from "framer-motion"
import { photographs } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Lightbox } from "../components/Lightbox.tsx"
import { Reveal } from "../components/Reveal.tsx"
import { PhotoVisual } from "../components/Photograph.tsx"

export function Gallery() {
  const { t } = useLocale()
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const drag = useRef({ id: -1, x: 0, y: 0, dx: 0, axis: "" as "" | "x" | "y" })
  const dragged = useRef(false)
  const wheeled = useRef(0)
  const [offset, setOffset] = useState(0)
  const last = photographs.length - 1

  function go(next: number) {
    if (next < 0 || next > last) return
    setIndex(next)
  }

  function openPhoto(photoIndex: number) {
    setIndex(photoIndex)
    setActive(photoIndex)
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return
    dragged.current = false
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, axis: "" }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerId !== drag.current.id) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    if (!drag.current.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      drag.current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y"
      if (drag.current.axis === "y") {
        drag.current.id = -1
        return
      }
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (drag.current.axis !== "x") return
    dragged.current = true
    drag.current.dx = dx
    setOffset(dx)
  }

  function finishDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerId !== drag.current.id && drag.current.axis !== "x") return
    const dx = event.pointerId === drag.current.id ? event.clientX - drag.current.x : drag.current.dx
    const horizontal = drag.current.axis === "x"
    drag.current.id = -1
    drag.current.axis = ""
    setOffset(0)
    if (!horizontal || Math.abs(dx) < 40) return
    dragged.current = true
    go(dx < 0 ? index + 1 : index - 1)
  }

  function onWheel(event: WheelEvent) {
    if (Math.abs(event.deltaX) < 30 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return
    const now = Date.now()
    if (now - wheeled.current < 450) return
    wheeled.current = now
    go(event.deltaX > 0 ? index + 1 : index - 1)
  }

  return (
    <section id="story" className="section">
      <Reveal className="section-inner">
        <p className="section-kicker">{t.ourStory}</p>
        <h2>{t.galleryHeading}</h2>
        <p className="section-intro">{t.galleryIntro}</p>
        <div
          className="carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label={t.ourStory}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(index - 1)
            if (event.key === "ArrowRight") go(index + 1)
          }}
          onWheel={onWheel}
        >
          <div
            className="carousel-viewport"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
          >
            <div
              className={`carousel-track${reduced || offset !== 0 ? " is-instant" : ""}`}
              style={{ transform: `translateX(calc(${-index} * var(--slide-step) + ${offset}px))` }}
            >
              {photographs.map((photo, photoIndex) => (
                <div className="carousel-slide" key={photo.src}>
                  <button
                    className="photo-button"
                    type="button"
                    onClick={() => {
                      if (dragged.current) {
                        dragged.current = false
                        return
                      }
                      openPhoto(photoIndex)
                    }}
                    aria-label={t.photoCount(photoIndex + 1, photographs.length)}
                  >
                    <PhotoVisual
                      photo={photo}
                      priority={photoIndex === index}
                      preload={photoIndex === index + 1}
                      frameClassName="carousel-frame"
                    />
                    {photo.caption ? <p className="photo-caption">{photo.caption}</p> : null}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-controls">
            <button className="icon-btn carousel-arrow" type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label={t.photoPrev}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <div className="carousel-dots">
              {photographs.map((photo, photoIndex) => (
                <button
                  key={photo.src}
                  type="button"
                  className={photoIndex === index ? "is-current" : ""}
                  aria-label={t.photoCount(photoIndex + 1, photographs.length)}
                  aria-current={photoIndex === index ? "true" : undefined}
                  onClick={() => go(photoIndex)}
                />
              ))}
            </div>
            <button className="icon-btn carousel-arrow" type="button" onClick={() => go(index + 1)} disabled={index === last} aria-label={t.photoNext}>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <p className="carousel-count">{t.photoCount(index + 1, photographs.length)}</p>
        </div>
      </Reveal>
      {active !== null && (
        <Lightbox
          index={active}
          onClose={() => setActive(null)}
          onChange={(next) => {
            setActive(next)
            setIndex(next)
          }}
        />
      )}
    </section>
  )
}
