import { Component, useCallback, useState, type ReactNode } from "react"
import { LocaleProvider, useLocale } from "./context/LocaleContext.tsx"
import { Navigation } from "./components/Navigation.tsx"
import { OpeningExperience } from "./components/OpeningExperience.tsx"
import { GardenButterflies } from "./components/GardenButterflies.tsx"
import { Petals } from "./components/Petals.tsx"
import { PrintInvitation } from "./components/PrintInvitation.tsx"
import { CelebrationScroll } from "./sections/CelebrationScroll.tsx"
import { Contact } from "./sections/Contact.tsx"
import { Events } from "./sections/Events.tsx"
import { Footer } from "./sections/Footer.tsx"
import { Gallery } from "./sections/Gallery.tsx"
import { Invitation } from "./sections/Invitation.tsx"
import { SaveTheDate } from "./sections/SaveTheDate.tsx"

class EnvelopeBoundary extends Component<{ children: ReactNode; onFail: () => void }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true }
  }

  componentDidCatch(): void {
    this.props.onFail()
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

function Site() {
  const { t } = useLocale()
  const [entered, setEntered] = useState(false)
  const [splash, setSplash] = useState(true)
  const reveal = useCallback(() => setEntered(true), [])
  const dismiss = useCallback(() => {
    setEntered(true)
    setSplash(false)
  }, [])

  return (
    <>
      {splash && (
        <EnvelopeBoundary onFail={dismiss}>
          <OpeningExperience onReveal={reveal} onDone={() => setSplash(false)} />
        </EnvelopeBoundary>
      )}
      <div className={`site-ui${entered ? " is-entered" : ""}`} inert={!entered}>
        <a className="sr-only" href="#invitation">
          {t.skipToContent}
        </a>
        <Petals />
        <GardenButterflies />
        <Navigation />
        <main>
          <Invitation />
          <SaveTheDate />
          <CelebrationScroll />
          <Gallery />
          <Events />
          <Contact />
        </main>
        <Footer />
      </div>
      <PrintInvitation />
    </>
  )
}

export default function App() {
  return (
    <LocaleProvider>
      <Site />
    </LocaleProvider>
  )
}
