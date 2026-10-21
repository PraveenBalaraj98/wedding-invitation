import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { copy, type Copy, type Locale } from "../data/weddingConfig.ts"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Copy
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readLocale(): Locale {
  try {
    const saved = window.localStorage.getItem("wedding-locale")
    if (saved === "en" || saved === "kn" || saved === "ta") return saved
  } catch {
    // Private browsing can block storage. English remains available.
  }
  return "en"
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    setLocaleState(readLocale())
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem("wedding-locale", next)
    } catch {
      // The selection still applies for this visit.
    }
  }

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = copy[locale].metaTitle
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale, t: copy[locale] }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error("useLocale must be used within LocaleProvider")
  return value
}
