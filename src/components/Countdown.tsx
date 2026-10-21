import { useLocale } from "../context/LocaleContext.tsx"
import { useCountdown } from "../hooks/useCountdown.ts"

function pad(value: number): string {
  return value.toString().padStart(2, "0")
}

export function Countdown() {
  const { t } = useLocale()
  const parts = useCountdown()

  if (!parts) {
    return <p className="celebration">{t.celebration}</p>
  }

  const units = [
    [t.countdownLabels.days, pad(parts.days)],
    [t.countdownLabels.hours, pad(parts.hours)],
    [t.countdownLabels.minutes, pad(parts.minutes)],
    [t.countdownLabels.seconds, pad(parts.seconds)],
  ] as const

  const spoken = `${parts.days} ${t.countdownLabels.days}, ${parts.hours} ${t.countdownLabels.hours}, ${parts.minutes} ${t.countdownLabels.minutes}`

  return (
    <div>
      <p className="sr-only" aria-live="polite">
        {spoken}
      </p>
      <div className="countdown" aria-hidden="true">
        {units.map(([label, value]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
