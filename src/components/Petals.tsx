const petals = [
  { left: "6%", delay: "-2s", duration: "18s", size: 11 },
  { left: "18%", delay: "-9s", duration: "22s", size: 14 },
  { left: "32%", delay: "-5s", duration: "16s", size: 10 },
  { left: "58%", delay: "-12s", duration: "20s", size: 13 },
  { left: "74%", delay: "-3s", duration: "17s", size: 11 },
  { left: "88%", delay: "-8s", duration: "21s", size: 15 },
]

export function Petals() {
  return (
    <div className="no-print" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.left}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size + 5,
          }}
        />
      ))}
    </div>
  )
}
