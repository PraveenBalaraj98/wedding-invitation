import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { namesFor } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"

const HOLD_MS = 2400
const FADE_MS = 700

export function OpeningExperience({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const reduced = useReducedMotion()
  const { locale, t } = useLocale()
  const names = namesFor(locale)
  const [leaving, setLeaving] = useState(false)
  const onRevealRef = useRef(onReveal)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onRevealRef.current = onReveal
    onDoneRef.current = onDone
  }, [onReveal, onDone])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const hold = reduced ? 400 : HOLD_MS
    const fade = reduced ? 180 : FADE_MS
    const revealTimer = window.setTimeout(() => {
      setLeaving(true)
      onRevealRef.current()
    }, hold)
    const doneTimer = window.setTimeout(() => onDoneRef.current(), hold + fade)
    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(doneTimer)
    }
  }, [reduced])

  return (
    <div className={`opening-screen no-print${leaving ? " is-leaving" : ""}`}>
      <div className="splash-butterflies" aria-hidden="true">
        <Butterfly className="flight-a" />
        <Butterfly className="flight-b" />
        <Butterfly className="flight-c" />
      </div>
      <div className="opening-stage">
        <p className="splash-names">
          {names.brideGiven} <span>&</span> {names.groomGiven}
        </p>
        <h1 className="splash-title">{t.splashTitle}</h1>
      </div>
    </div>
  )
}

function Butterfly({ className }: { className: string }) {
  return (
    <div className={`butterfly-flight ${className}`}>
      <span className="mote mote-a" />
      <span className="mote mote-b" />
      <svg className="butterfly" viewBox="0 0 160 100">
        <g className="wing wing-left">
          <path
            d="M78 50 C62 18 18 12 14 36 C10 58 36 62 58 54 C40 70 22 86 36 92 C52 98 70 74 78 56 Z"
            fill="#642d43"
          />
          <path d="M76 48 C58 28 30 24 28 40 C34 52 54 52 70 48 Z" fill="#d6b574" opacity="0.9" />
        </g>
        <g className="wing wing-right">
          <path
            d="M82 50 C98 18 142 12 146 36 C150 58 124 62 102 54 C120 70 138 86 124 92 C108 98 90 74 82 56 Z"
            fill="#642d43"
          />
          <path d="M84 48 C102 28 130 24 132 40 C126 52 106 52 90 48 Z" fill="#d6b574" opacity="0.9" />
        </g>
        <ellipse cx="80" cy="52" rx="3.2" ry="16" fill="#4a2031" />
        <circle cx="80" cy="34" r="3.4" fill="#4a2031" />
      </svg>
    </div>
  )
}
