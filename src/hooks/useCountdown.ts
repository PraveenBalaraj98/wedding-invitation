import { useEffect, useState } from "react"
import { MUHURTHAM_START, getCountdown, type CountdownParts } from "../utils/countdown.ts"

export function useCountdown(): CountdownParts | null {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    let interval = 0
    const timeout = window.setTimeout(
      () => {
        setNow(Date.now())
        interval = window.setInterval(() => setNow(Date.now()), 1000)
      },
      1000 - (Date.now() % 1000),
    )
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  return getCountdown(now, MUHURTHAM_START.getTime())
}
