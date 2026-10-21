/**
 * Google Maps actions for a verified destination link.
 * The supplied short link is used as-is. It is never replaced with a search guess.
 */

export function viewOnMapsUrl(mapsUrl: string): string {
  return mapsUrl
}

export function directionsUrl(mapsUrl: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsUrl)}`
}
