import { useLocale } from "../context/LocaleContext.tsx"
import { Reveal } from "../components/Reveal.tsx"
import { Ganesha, InvitationFrame, Kolam, OfficialName, Peacock } from "../components/Ornaments.tsx"
import type { InvitationLine } from "../data/weddingConfig.ts"

export function Invitation() {
  const { t } = useLocale()
  const blessings = t.invitation.filter((line) => line.role === "blessing")
  const rest = t.invitation.filter((line) => line.role !== "blessing")
  const before: InvitationLine[] = []
  const people: { name: string; relation: string }[] = []
  const after: InvitationLine[] = []
  let withText = ""
  let pendingName: string | null = null
  let seenPeople = false

  for (const line of rest) {
    if (line.role === "name") {
      pendingName = line.text
      seenPeople = true
      continue
    }
    if (line.role === "relation" && pendingName) {
      people.push({ name: pendingName, relation: line.text })
      pendingName = null
      continue
    }
    if (line.role === "with") {
      withText = line.text
      continue
    }
    if (seenPeople) after.push(line)
    else before.push(line)
  }

  const [bride, groom] = people

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
          {before.map((line, index) => (
            <p key={`${line.role}-${index}`} className={`invite-${line.role}`}>
              {line.text}
            </p>
          ))}
          {bride && groom && (
            <div className="couple-row">
              <div className="couple-person couple-bride">
                <div className="name-row">
                  <Peacock className="name-peacock" />
                  <OfficialName name={bride.name} />
                  <Peacock flip className="name-peacock" />
                </div>
                <p className="invite-relation">{bride.relation}</p>
              </div>
              {withText && <p className="invite-with couple-with">{withText}</p>}
              <div className="couple-person couple-groom">
                <div className="name-row">
                  <Peacock className="name-peacock groom-peacock" />
                  <OfficialName name={groom.name} />
                  <Peacock flip className="name-peacock groom-peacock" />
                </div>
                <p className="invite-relation">{groom.relation}</p>
              </div>
            </div>
          )}
          <div className="gold-divider">
            <img src="/images/gold-ornamental-divider.png" alt="" />
          </div>
          {after.map((line, index) => (
            <p key={`${line.role}-${index}`} className={`invite-${line.role}`}>
              {line.text}
            </p>
          ))}
        </InvitationFrame>
      </Reveal>
    </section>
  )
}
