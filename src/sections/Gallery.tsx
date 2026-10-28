import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { photographs } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Lightbox } from "../components/Lightbox.tsx"
import { Reveal } from "../components/Reveal.tsx"
import { PhotoVisual } from "../components/Photograph.tsx"
import { useCarouselSwipe } from "../hooks/useCarouselSwipe.ts"

export function Gallery() {
  const { t } = useLocale()
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const last = photographs.length - 1
  const swipe = useCarouselSwipe({
    index,
    count: photographs.length,
    onChange: setIndex,
    allowFromControls: true,
  })

  function openPhoto(photoIndex: number) {
    setIndex(photoIndex)
    setActive(photoIndex)
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
          {...swipe.regionProps}
        >
          <div className="carousel-viewport" {...swipe.viewportProps}>
            <div className={swipe.trackClassName} style={swipe.trackStyle}>
              {photographs.map((photo, photoIndex) => (
                <div className="carousel-slide" key={photo.src}>
                  <button
                    className="photo-button"
                    type="button"
                    onClick={() => openPhoto(photoIndex)}
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
            <button className="icon-btn carousel-arrow" type="button" onClick={() => swipe.go(index - 1)} disabled={index === 0} aria-label={t.photoPrev}>
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
                  onClick={() => swipe.go(photoIndex)}
                />
              ))}
            </div>
            <button className="icon-btn carousel-arrow" type="button" onClick={() => swipe.go(index + 1)} disabled={index === last} aria-label={t.photoNext}>
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
