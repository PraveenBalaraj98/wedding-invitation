import { useState } from "react"
import { Copy, MapPin, Navigation, Share2 } from "lucide-react"
import { addressForDisplay, events, venueForDisplay } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Button } from "../components/Button.tsx"
import { QrCodeBlock } from "../components/QrCodeBlock.tsx"
import { directionsUrl, viewOnMapsUrl } from "../utils/maps.ts"
import { copyText, shareOrCopy } from "../utils/share.ts"

export function Venue() {
  const { locale, t } = useLocale()
  const [status, setStatus] = useState("")
  const bengaluru = events.find((event) => event.id === "bengaluru-reception")
  const pending = events.filter((event) => event.id !== "bengaluru-reception")

  async function onCopy() {
    if (!bengaluru?.address) return
    setStatus((await copyText(bengaluru.address)) ? t.addressCopied : t.copyFailed)
  }

  async function onShare() {
    if (!bengaluru?.mapsUrl || !bengaluru.address) return
    const result = await shareOrCopy({
      title: bengaluru.venueName ?? t.eventTitles[bengaluru.id],
      text: `${bengaluru.venueName ?? ""}\n${bengaluru.address}`.trim(),
      url: bengaluru.mapsUrl,
    })
    if (result === "shared") setStatus(t.locationShared)
    else if (result === "copied") setStatus(t.locationCopied)
    else if (result === "failed") setStatus(t.shareFailed)
  }

  return (
    <section id="venue" className="section">
      <div className="section-inner">
        <p className="section-kicker">{t.venueLabel}</p>
        <h2>{t.venueHeading}</h2>
        <p className="section-intro">{t.venueIntro}</p>
        {bengaluru?.mapsUrl && bengaluru.address && (
          <article className="event-card event-bengaluru mx-auto max-w-xl">
            <p className="event-kicker">{t.eventKickers[bengaluru.id]}</p>
            <h3>{t.eventTitles[bengaluru.id]}</h3>
            <p>
              {bengaluru.dateLabel[locale]} · {bengaluru.timeLabel[locale]}
            </p>
            <address className="venue-confirmed not-italic">
              <strong className="block">{venueForDisplay(bengaluru.venueName, locale)}</strong>
              {addressForDisplay(bengaluru.address, locale)}
            </address>
            <QrCodeBlock />
            <div className="action-grid">
              <Button href={viewOnMapsUrl(bengaluru.mapsUrl)} external>
                <MapPin aria-hidden="true" />
                {t.viewMaps}
              </Button>
              <Button variant="ghost" href={directionsUrl(bengaluru.mapsUrl)} external>
                <Navigation aria-hidden="true" />
                {t.directions}
              </Button>
              <Button variant="ghost" onClick={() => void onCopy()}>
                <Copy aria-hidden="true" />
                {t.copyAddress}
              </Button>
              <Button variant="ghost" onClick={() => void onShare()}>
                <Share2 aria-hidden="true" />
                {t.shareLocation}
              </Button>
            </div>
            <p className="status" role="status">
              {status}
            </p>
          </article>
        )}
        <div className="event-grid mt-6">
          {pending.map((event) => (
            <article key={event.id} className="event-card">
              <h3>{t.eventTitles[event.id]}</h3>
              <p>
                {event.dateLabel[locale]} · {event.timeLabel[locale]}
              </p>
              {event.address ? (
                <address className="venue-confirmed not-italic">{event.address}</address>
              ) : (
                <p className="venue-placeholder">{t.awaitingVenue}</p>
              )}
              {event.mapsUrl && (
                <a className="btn btn-primary" href={event.mapsUrl}>
                  {t.viewOnMap}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
