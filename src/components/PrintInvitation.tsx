import { addressForDisplay, events, venueForDisplay, type InvitationLine, type WeddingEvent } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Ganesha, OfficialName } from "./Ornaments.tsx"
import { QrCodeBlock } from "./QrCodeBlock.tsx"

function PrintLine({ line }: { line: InvitationLine }) {
  if (line.role === "name") return <OfficialName name={line.text} print />
  const className = line.role === "blessing" ? "print-blessing" : "print-copy"
  return <p className={className}>{line.text}</p>
}

function PrintEvent({ event }: { event: WeddingEvent }) {
  const { locale, t } = useLocale()
  const magenta = event.id === "chennai-reception"

  return (
    <section className={magenta ? "print-panel magenta" : "print-panel"}>
      <h3>{t.eventTitles[event.id]}</h3>
      <p>
        {t.dateLabel}: {event.dateLabel[locale]}
      </p>
      {event.schedule.length > 0 ? (
        event.schedule.map((item) => (
          <p key={item.time}>
            {item.label[locale]}: {item.clock[locale]}
          </p>
        ))
      ) : (
        <p>
          {t.timeLabel}: {event.timeLabel[locale]}
        </p>
      )}
      <p>
        {t.venueLabel}: {event.address ? `${venueForDisplay(event.venueName, locale) ?? ""} ${addressForDisplay(event.address, locale)}`.trim() : t.awaitingVenue}
      </p>
    </section>
  )
}

export function PrintInvitation() {
  const { t } = useLocale()
  const chennai = events.find((event) => event.id === "chennai-reception")
  const wedding = events.find((event) => event.id === "wedding-ceremony")
  const bengaluru = events.find((event) => event.id === "bengaluru-reception")

  return (
    <div className="print-root">
      <article className="print-sheet">
        <div className="print-border">
          <Ganesha label={t.ganeshaLabel} className="mx-auto h-16 w-auto" />
          {t.invitation.map((line) => (
            <PrintLine key={`${line.role}-${line.text}`} line={line} />
          ))}
          {wedding && <PrintEvent event={wedding} />}
          {chennai && <PrintEvent event={chennai} />}
        </div>
      </article>
      <article className="print-sheet">
        <div className="print-border print-center">
          {bengaluru && <PrintEvent event={bengaluru} />}
          <QrCodeBlock print />
          <p className="print-copy">{t.footerNote}</p>
        </div>
      </article>
    </div>
  )
}
