export function GardenButterflies() {
  return (
    <div className="garden no-print" aria-hidden="true">
      <Butterfly className="garden-butterfly b1" />
      <Butterfly className="garden-butterfly b2" />
      <Butterfly className="garden-butterfly b3" />
    </div>
  )
}

function Butterfly({ className }: { className: string }) {
  return (
    <span className={className}>
      <svg viewBox="0 0 80 52" fill="none">
        <g className="wing left">
          <path
            d="M38 26c-2-12-16-20-28-16-8 12-2 24 10 28 8 2 16-2 18-12z"
            fill="#c98291"
            fillOpacity="0.82"
          />
          <path d="M36 28c-4-6-12-8-18-4" stroke="#fff8f0" strokeWidth="0.6" />
        </g>
        <g className="wing right">
          <path
            d="M42 26c2-12 16-20 28-16 8 12 2 24-10 28-8 2-16-2-18-12z"
            fill="#d6b574"
            fillOpacity="0.78"
          />
          <path d="M44 28c4-6 12-8 18-4" stroke="#fff8f0" strokeWidth="0.6" />
        </g>
        <path d="M40 16c1 6 1 16 0 24" stroke="#642d43" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </span>
  )
}
