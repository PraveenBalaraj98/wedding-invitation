import { useLocale } from "../context/LocaleContext.tsx"
import type { Locale } from "../data/weddingConfig.ts"

const locales: { id: Locale; label: string }[] = [
  { id: "en", label: "English" },
  { id: "kn", label: "ಕನ್ನಡ" },
  { id: "ta", label: "தமிழ்" },
]

export function LanguageSwitcher({ onChange }: { onChange?: () => void }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="lang-switch" role="group" aria-label={t.languageLabel}>
      {locales.map((item) => (
        <button
          key={item.id}
          type="button"
          lang={item.id}
          aria-pressed={locale === item.id}
          onClick={() => {
            setLocale(item.id)
            onChange?.()
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
