import { useState } from "react"
import { Link2, Printer } from "lucide-react"
import { rsvp, rsvpIsConfigured } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Button } from "../components/Button.tsx"
import { Reveal } from "../components/Reveal.tsx"
import { RsvpForm } from "../components/RsvpForm.tsx"
import { buildInvitationMessage, copyText, currentPageUrl, whatsAppUrl } from "../utils/share.ts"

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.14h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.39.96-.39h.28c.24 0 .36-.01.52.4.2.48.68 1.66.74 1.78.06.12.1.27.02.43-.08.17-.12.27-.24.41-.12.14-.25.32-.36.43-.12.12-.24.25-.1.48.14.24.62 1.02 1.33 1.65.91.81 1.68 1.07 1.92 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
    </svg>
  )
}

export function Contact() {
  const { locale, t } = useLocale()
  const [status, setStatus] = useState("")
  const message = buildInvitationMessage(locale, currentPageUrl())

  async function onCopy() {
    setStatus((await copyText(currentPageUrl())) ? t.linkCopied : t.copyFailed)
  }

  return (
    <section id="contact" className="section">
      <Reveal className="section-inner">
        <p className="section-kicker">{t.nav.contact}</p>
        <h2>{t.contactHeading}</h2>
        <p className="section-intro">{t.contactIntro}</p>
        <div className="share-card">
        <div className="action-grid two">
          <Button href={whatsAppUrl(message)} external>
            <WhatsAppIcon />
            {t.whatsapp}
          </Button>
          <Button variant="ghost" onClick={() => void onCopy()}>
            <Link2 aria-hidden="true" />
            {t.copyLink}
          </Button>
          <Button variant="gold" onClick={() => window.print()}>
            <Printer aria-hidden="true" />
            {t.print}
          </Button>
        </div>
        <p className="status text-center" role="status">
          {status}
        </p>
        </div>
        {rsvpIsConfigured() && rsvp.endpoint ? <RsvpForm endpoint={rsvp.endpoint} /> : null}
      </Reveal>
    </section>
  )
}
