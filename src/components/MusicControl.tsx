import { useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { music } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Tanpura } from "../utils/tanpura.ts"

export function MusicControl() {
  const { t } = useLocale()
  const tanpura = useRef<Tanpura | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [starting, setStarting] = useState(false)
  const [problem, setProblem] = useState("")

  async function playFile(player: HTMLAudioElement) {
    setStarting(true)
    try {
      await player.play()
      setProblem("")
    } catch (error) {
      const blocked = error instanceof DOMException && error.name === "NotAllowedError"
      if (blocked) {
        setProblem(t.musicUnavailable)
        setStarting(false)
        return
      }
      // The first play() can be interrupted while a cold file is still buffering.
      // Wait until the same element can play, then try once more.
      try {
        if (player.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
          await new Promise<void>((resolve, reject) => {
            const ready = () => {
              cleanup()
              resolve()
            }
            const failed = () => {
              cleanup()
              reject(new Error("audio-load-failed"))
            }
            const cleanup = () => {
              player.removeEventListener("canplay", ready)
              player.removeEventListener("error", failed)
            }
            player.addEventListener("canplay", ready, { once: true })
            player.addEventListener("error", failed, { once: true })
          })
        }
        await player.play()
        setProblem("")
      } catch {
        setProblem(t.musicUnavailable)
      }
    } finally {
      setStarting(false)
    }
  }

  async function toggle() {
    setProblem("")
    const player = audioRef.current

    if (playing) {
      player?.pause()
      tanpura.current?.stop()
      setPlaying(false)
      setStarting(false)
      return
    }

    if (player && music.src) {
      await playFile(player)
      return
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

  const label = starting ? t.musicLoading : playing ? t.pauseMusic : t.playMusic

  return (
    <div className="no-print">
      {music.src ? (
        <audio
          ref={audioRef}
          className="music-file"
          src={music.src}
          preload="auto"
          loop
          playsInline
          onPlay={() => {
            setPlaying(true)
            setStarting(false)
          }}
          onPause={() => {
            setPlaying(false)
            setStarting(false)
          }}
        />
      ) : null}
      <button
        className={`music-btn${starting ? " is-loading" : ""}`}
        type="button"
        aria-pressed={playing}
        aria-busy={starting}
        aria-label={label}
        onClick={() => void toggle()}
      >
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
