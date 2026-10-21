import { namesFor } from "../data/weddingConfig.ts"
import { useLocale } from "../context/LocaleContext.tsx"
import { Reveal } from "../components/Reveal.tsx"

export function Footer() {
  const { locale, t } = useLocale()
  const names = namesFor(locale)
  return (
    <footer className="section" style={{ paddingTop: "1rem" }}>
      <Reveal className="section-inner text-center">
        <p className="font-script text-5xl text-magenta">
          {names.brideGiven} <span className="text-gold">&</span> {names.groomGiven}
        </p>
        <p className="footer-closing">{t.footerClosing}</p>
        <p className="mt-4">{t.footerNote}</p>
        <a className="back-to-top" href="#invitation">
          {t.backToTop}
        </a>
      </Reveal>
    </footer>
  )
}
