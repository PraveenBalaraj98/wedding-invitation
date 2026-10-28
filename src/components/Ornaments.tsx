import { useState, type ReactNode } from "react"

const GANESHA_SRC = "/images/ganesha.png"

export function Ganesha({ label, className = "mx-auto h-32 w-auto" }: { label: string; className?: string }) {
  const [useDrawing, setUseDrawing] = useState(false)

  if (!useDrawing) {
    return (
      <img
        className={`ganesha-image ${className}`}
        src={GANESHA_SRC}
        alt={label}
        onError={() => setUseDrawing(true)}
      />
    )
  }

  return (
    <svg className={className} viewBox="0 0 220 268" role="img" aria-label={label}>
      <circle cx="110" cy="96" r="72" fill="none" stroke="#c6a15b" strokeWidth="1.2" />
      <circle cx="110" cy="96" r="64" fill="none" stroke="#7a1f3d" strokeWidth="0.6" strokeDasharray="1.2 3" />
      <path d="M74 72 L84 34 L96 58 L110 18 L124 58 L136 34 L146 72 Z" fill="#e4c98a" stroke="#7a1f3d" strokeWidth="1.1" />
      <circle cx="110" cy="18" r="3.2" fill="#7a1f3d" />
      <path d="M58 100 C36 72 34 128 54 146 C64 132 66 112 58 100 Z" fill="#f8e7c4" stroke="#1c1412" strokeWidth="1.3" />
      <path d="M162 100 C184 72 186 128 166 146 C156 132 154 112 162 100 Z" fill="#f8e7c4" stroke="#1c1412" strokeWidth="1.3" />
      <path d="M52 108 C44 112 44 130 54 138" fill="none" stroke="#7a1f3d" strokeWidth="1" />
      <path d="M168 108 C176 112 176 130 166 138" fill="none" stroke="#7a1f3d" strokeWidth="1" />
      <ellipse cx="110" cy="104" rx="44" ry="42" fill="#fffaf3" stroke="#1c1412" strokeWidth="1.5" />
      <path d="M82 92 Q94 84 106 94" fill="none" stroke="#1c1412" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M114 94 Q126 84 138 92" fill="none" stroke="#1c1412" strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="94" cy="102" rx="6.5" ry="4.2" fill="#1c1412" />
      <ellipse cx="128" cy="102" rx="6.5" ry="4.2" fill="#1c1412" />
      <circle cx="96" cy="101" r="1.3" fill="#fffaf3" />
      <circle cx="130" cy="101" r="1.3" fill="#fffaf3" />
      <path d="M110 78 C110 88 104 92 110 100 C116 92 110 88 110 78" fill="#7a1f3d" />
      <path d="M102 118 Q110 124 118 118" fill="none" stroke="#1c1412" strokeWidth="1.1" />
      <path
        d="M108 120 C108 138 112 148 100 160 C86 176 70 172 66 186"
        fill="none"
        stroke="#1c1412"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="62" cy="192" r="8" fill="#e4c98a" stroke="#7a1f3d" strokeWidth="1.2" />
      <path d="M62 184 v-5" stroke="#7a1f3d" strokeWidth="1.2" />
      <path d="M120 122 Q138 140 128 158" fill="none" stroke="#c6a15b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M68 156 C56 196 72 222 110 228 C148 222 164 196 152 156 C136 176 84 176 68 156 Z" fill="#fffaf3" stroke="#1c1412" strokeWidth="1.5" />
      <circle cx="110" cy="190" r="11" fill="none" stroke="#c6a15b" strokeWidth="1.2" />
      <path d="M152 164 C172 156 184 170 176 184" fill="none" stroke="#1c1412" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M174 166 l8 -12 M176 174 l12 -2 M174 182 l8 10" fill="none" stroke="#1c1412" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M78 214 Q98 236 110 226 Q122 236 142 214" fill="none" stroke="#1c1412" strokeWidth="1.3" />
      <path d="M36 236 Q74 214 110 232 Q146 214 184 236 Q150 252 110 242 Q70 252 36 236 Z" fill="#7a1f3d" />
      <path d="M52 234 Q78 222 110 230 Q142 222 168 234" fill="none" stroke="#e4c98a" strokeWidth="1.2" />
    </svg>
  )
}

export function Peacock({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 170"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path d="M78 150 C40 150 18 118 28 78" fill="none" stroke="#a6843d" strokeWidth="1.4" />
      <path d="M74 148 C30 130 16 90 36 48" fill="none" stroke="#a6843d" strokeWidth="1.4" />
      <path d="M70 146 C36 112 34 70 58 34" fill="none" stroke="#7a1f3d" strokeWidth="1.3" />
      <path d="M66 144 C48 108 62 68 84 40" fill="none" stroke="#a6843d" strokeWidth="1.2" />
      <circle cx="30" cy="74" r="5" fill="#fffaf3" stroke="#7a1f3d" />
      <circle cx="30" cy="74" r="2" fill="#1c1412" />
      <circle cx="40" cy="46" r="5" fill="#fffaf3" stroke="#7a1f3d" />
      <circle cx="40" cy="46" r="2" fill="#1c1412" />
      <circle cx="62" cy="32" r="5" fill="#fffaf3" stroke="#7a1f3d" />
      <circle cx="62" cy="32" r="2" fill="#1c1412" />
      <circle cx="86" cy="42" r="4.5" fill="#fffaf3" stroke="#a6843d" />
      <circle cx="86" cy="42" r="1.8" fill="#7a1f3d" />
      <path d="M72 112 C64 96 70 78 86 70 C96 92 92 112 80 120 Z" fill="#7a1f3d" />
      <path d="M84 74 C90 58 82 42 88 30" fill="none" stroke="#1c1412" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="90" cy="26" r="5.5" fill="#1c1412" />
      <path d="M94 26 L106 28 L94 30 Z" fill="#e4c98a" />
      <path d="M88 20 L86 10 M91 18 L94 8 M94 20 L102 12" fill="none" stroke="#c6a15b" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function Kolam({ className = "mx-auto my-2 h-5 w-28" }: { className?: string }) {
  const dots = [
    [60, 4],
    [48, 12],
    [72, 12],
    [36, 20],
    [60, 20],
    [84, 20],
  ]
  return (
    <svg viewBox="0 0 120 28" className={className} aria-hidden="true">
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.7" fill="#a6843d" />
      ))}
    </svg>
  )
}

const FRAME_CORNERS = [
  ["invitation-frame-top-left.png", "frame-corner frame-tl"],
  ["invitation-frame-top-right.png", "frame-corner frame-tr"],
  ["invitation-frame-bottom-left.png", "frame-corner frame-bl"],
  ["invitation-frame-bottom-right.png", "frame-corner frame-br"],
] as const

export function InvitationFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`invitation-frame ${className}`}>
      {FRAME_CORNERS.map(([file, cornerClass]) => (
        <img
          key={file}
          className={cornerClass}
          src={`/images/${file}`}
          alt=""
          draggable={false}
          aria-hidden="true"
        />
      ))}
      <div className="invitation-inner">{children}</div>
    </div>
  )
}

export function OfficialName({ name, print = false }: { name: string; print?: boolean }) {
  const splitAt = name.lastIndexOf(" ")
  const prefix = name.slice(0, splitAt)
  const given = name.slice(splitAt + 1)

  if (print) {
    return (
      <p className="print-name">
        <span className="sr-only">{name}</span>
        <span aria-hidden="true" className="print-prefix">{prefix}</span>
        <span aria-hidden="true">{given}</span>
      </p>
    )
  }

  return (
    <p className="official-name">
      <span className="sr-only">{name}</span>
      <span aria-hidden="true" className="official-prefix">{prefix}</span>
      <span aria-hidden="true" className="official-given">{given}</span>
    </p>
  )
}

export function TempleArch() {
  return (
    <svg viewBox="0 0 220 36" className="mx-auto mb-1 h-8 w-40" aria-hidden="true">
      <path d="M10 34 V20 Q10 6 30 6 H70 Q80 6 80 16 V34" fill="none" stroke="#a6843d" strokeWidth="1.3" />
      <path d="M140 34 V16 Q140 6 150 6 H190 Q210 6 210 20 V34" fill="none" stroke="#a6843d" strokeWidth="1.3" />
      <path d="M78 34 V14 Q110 -6 142 14 V34" fill="none" stroke="#7a1f3d" strokeWidth="1.4" />
      <circle cx="110" cy="16" r="2" fill="#a6843d" />
    </svg>
  )
}
