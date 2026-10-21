import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { music } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Tanpura } from "../utils/tanpura.ts"

export function MusicControl() {
  const { t } = useLocale()
  const tanpura = useRef<Tanpura | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [problem, setProblem] = useState("")

  useEffect(() => {
    return () => {
      tanpura.current?.stop()
      audio.current?.pause()
    }
  }, [])

  async function toggle() {
    setProblem("")
    if (playing) {
      audio.current?.pause()
      tanpura.current?.stop()
      setPlaying(false)
      return
    }

    if (music.src) {
      const player = audio.current ?? new Audio(music.src)
      player.loop = true
      audio.current = player
      try {
        await player.play()
        setPlaying(true)
        return
      } catch {
        setProblem(t.musicUnavailable)
        return
      }
    }

    try {
      const player = new Audio("/audio/music.mp3")
      player.loop = true
      await player.play()
      audio.current = player
      setPlaying(true)
      return
    } catch {
      audio.current = null
    }

    const drone = tanpura.current ?? new Tanpura()
    tanpura.current = drone
    try {
      await drone.start()
      setPlaying(true)
    } catch {
      setProblem(t.musicUnavailable)
    }
  }

  return (
    <div className="no-print">
      <button className="music-btn" type="button" aria-pressed={playing} aria-label={playing ? t.pauseMusic : t.playMusic} onClick={() => void toggle()}>
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </button>
      {problem && (
        <p className="music-status" role="alert">
          {problem}
        </p>
      )}
    </div>
  )
}
