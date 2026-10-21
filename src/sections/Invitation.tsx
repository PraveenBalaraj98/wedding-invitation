import { useLocale } from "../context/LocaleContext.tsx"
import { Reveal } from "../components/Reveal.tsx"
import { Ganesha, InvitationFrame, Kolam, OfficialName, Peacock } from "../components/Ornaments.tsx"

export function Invitation() {
  const { t } = useLocale()
  const blessings = t.invitation.filter((line) => line.role === "blessing")
  const rest = t.invitation.filter((line) => line.role !== "blessing")
  const firstName = rest.findIndex((line) => line.role === "name")

  return (
    <section id="invitation" className="section invitation-section">
      <Reveal className="section-inner">
        <InvitationFrame>
          <Ganesha label={t.ganeshaLabel} className="ganesha-mark" />
          <Kolam />
          {blessings.map((line, index) => (
            <p key={`${line.text}-${index}`} className="invite-blessing">
              {line.text}
            </p>
          ))}
          <h1 className="wedding-heading">{t.weddingHeading}</h1>
          {rest.map((line, index) => {
            if (line.role === "name") {
              return (
                <div key={`${line.text}-${index}`}>
                  {index === firstName && (
                    <div className="name-row">
                      <Peacock className="name-peacock" />
                      <OfficialName name={line.text} />
                      <Peacock flip className="name-peacock" />
                    </div>
                  )}
                  {index !== firstName && <OfficialName name={line.text} />}
                  {index === firstName && <div className="gold-shimmer" />}
                </div>
              )
            }
            return (
              <p key={`${line.role}-${index}`} className={`invite-${line.role}`}>
                {line.text}
              </p>
            )
          })}
        </InvitationFrame>
      </Reveal>
    </section>
  )
}
