import { useLayoutEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { namesFor } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { LanguageSwitcher } from "./LanguageSwitcher.tsx"
import { MusicControl } from "./MusicControl.tsx"

export function Navigation() {
  const { locale, t } = useLocale()
  const names = namesFor(locale)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const [menuTop, setMenuTop] = useState(0)

  const links = [
    ["#invitation", t.nav.invitation],
    ["#save-the-date", t.saveTheDate],
    ["#story", t.ourStory],
    ["#events", t.nav.events],
    ["#contact", t.nav.contact],
  ] as const

  useLayoutEffect(() => {
    if (!open) return
    const header = headerRef.current
    const measure = () => setMenuTop(header?.getBoundingClientRect().bottom ?? 0)
    measure()

    const scrollY = window.scrollY
    const body = document.body
    const root = document.documentElement
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      scrollBehavior: root.style.scrollBehavior,
    }
    const scrollbar = window.innerWidth - root.clientWidth
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    body.style.overflow = "hidden"
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const onTouchMove = (event: TouchEvent) => {
      const target = event.target
      if (target instanceof Node && navRef.current?.contains(target)) return
      event.preventDefault()
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("resize", measure)

    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("resize", measure)
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.left = previous.left
      body.style.right = previous.right
      body.style.width = previous.width
      body.style.overflow = previous.overflow
      body.style.paddingRight = previous.paddingRight
      root.style.scrollBehavior = "auto"
      window.scrollTo(0, scrollY)
      root.style.scrollBehavior = previous.scrollBehavior
    }
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <>
      <header ref={headerRef} className="site-header no-print">
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
      </header>
      {open && (
        <div className="nav-overlay">
          <button type="button" className="nav-backdrop" aria-label={t.closeMenu} onClick={close} />
          <nav
            ref={navRef}
            id="mobile-nav"
            className="mobile-nav"
            aria-label={t.nav.home}
            style={{ top: menuTop }}
          >
            {links.map(([href, label]) => (
              <a key={href} className="nav-link" href={href} onClick={close}>
                {label}
              </a>
            ))}
            <LanguageSwitcher onChange={close} />
          </nav>
        </div>
      )}
    </>
  )
}
