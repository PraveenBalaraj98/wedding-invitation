import { useState, type FormEvent } from "react"
import { events, type EventId } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"

export function RsvpForm({ endpoint }: { endpoint: string }) {
  const { locale, t } = useLocale()
  const [name, setName] = useState("")
  const [guests, setGuests] = useState(1)
  const [selected, setSelected] = useState<EventId[]>([])
  const [message, setMessage] = useState("")
  const [phase, setPhase] = useState<"idle" | "sending" | "sent" | "error">("idle")

  function toggle(id: EventId) {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPhase("sending")
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, guests, events: selected, message, locale }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setPhase("sent")
    } catch {
      setPhase("error")
    }
  }

  return (
    <form className="rsvp" onSubmit={(event) => void onSubmit(event)}>
      <h3 className="font-serif text-3xl text-magenta">{t.rsvpHeading}</h3>
      <p>{t.rsvpIntro}</p>
      <label>
        {t.rsvpName}
        <input className="field" name="name" required value={name} autoComplete="name" onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        {t.rsvpGuests}
        <input
          className="field"
          name="guests"
          type="number"
          min={1}
          max={20}
          required
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
        />
      </label>
      <fieldset className="checks">
        <legend>{t.rsvpEvents}</legend>
        {events.map((item) => (
          <label key={item.id}>
            <input
              className="check"
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => toggle(item.id)}
            />
            {t.eventTitles[item.id]}
          </label>
        ))}
      </fieldset>
      <label>
        {t.rsvpMessage}
        <textarea className="field" name="message" rows={3} value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      <button className="btn btn-primary" type="submit" disabled={phase === "sending"}>
        {phase === "sending" ? t.rsvpSending : t.rsvpSubmit}
      </button>
      {phase === "sent" && <p role="status">{t.rsvpSuccess}</p>}
      {phase === "error" && <p role="alert">{t.rsvpError}</p>}
    </form>
  )
}
