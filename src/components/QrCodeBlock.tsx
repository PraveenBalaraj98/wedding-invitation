import { useEffect, useState } from "react"
import { useLocale } from "../context/LocaleContext.tsx"
import { QR_CONTENTS, createQrDataUrl } from "../utils/qrCode.ts"

export function QrCodeBlock({ print = false, url = QR_CONTENTS }: { print?: boolean; url?: string }) {
  const { t } = useLocale()
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setImage(null)
    setError(false)
    createQrDataUrl(url)
      .then((value) => {
        if (!cancelled) setImage(value)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <figure className={print ? "qr-block print-qr" : "qr-block"}>
      <div className="qr-pad">
        {image ? (
          <img src={image} width={640} height={640} alt={t.qrAlt} />
        ) : error ? (
          <p className="qr-fallback" role="alert">
            {t.qrError}{" "}
            <a href={url}>{url}</a>
          </p>
        ) : (
          <div className="qr-pending" role="status" aria-label={t.preparingQr} />
        )}
      </div>
      <figcaption>SCAN FOR DIRECTIONS</figcaption>
    </figure>
  )
}
