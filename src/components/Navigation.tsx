import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { namesFor } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { LanguageSwitcher } from "./LanguageSwitcher.tsx"
import { MusicControl } from "./MusicControl.tsx"

export function Navigation() {
  const { locale, t } = useLocale()
  const names = namesFor(locale)
  const [open, setOpen] = useState(false)

  const links = [
    ["#invitation", t.nav.invitation],
    ["#save-the-date", t.saveTheDate],
    ["#story", t.ourStory],
    ["#events", t.nav.events],
    ["#contact", t.nav.contact],
  ] as const

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="site-header no-print">
      <a className="brand" href="#invitation">
        {names.brideGiven} <span>&</span> {names.groomGiven}
      </a>
      <nav className="nav-desktop" aria-label={t.nav.home}>
        {links.map(([href, label]) => (
          <a key={href} className="nav-link" href={href}>
            {label}
          </a>
        ))}
        <LanguageSwitcher />
      </nav>
      <MusicControl />
      <button
        className="icon-btn menu-toggle"
        style={{ color: "#7a1f3d", borderColor: "rgba(166,132,61,0.7)", background: "transparent" }}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span className="sr-only">{open ? t.closeMenu : t.openMenu}</span>
      </button>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label={t.nav.home}>
          {links.map(([href, label]) => (
            <a key={href} className="nav-link" href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <LanguageSwitcher onChange={() => setOpen(false)} />
        </nav>
      )}
    </header>
  )
}
