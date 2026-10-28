/**
 * All wedding information lives in this file.
 *
 * Edit names, wording, dates, times, and venues here. Components read this
 * configuration, so you do not need to hunt through the layout to update a detail.
 *
 * Dates use the Asia/Kolkata timezone. Times are 24-hour "HH:mm".
 * Leave `end`, `venueName`, `address`, or `mapsUrl` as null until that detail
 * is confirmed. The site will not invent a venue, a map link, or a closing time.
 */

export const TIMEZONE = "Asia/Kolkata"

/**
 * The address guests should open from WhatsApp. No public site URL is
 * configured yet. Set this to the deployed https address, or set
 * VITE_PUBLIC_INVITATION_URL when building. A private address such as
 * localhost or 192.168.x.x is never placed in the message.
 */
export const publicInvitationUrl: string | null = "https://wedding-invitation-red-rho.vercel.app/"

export const MAPS_URL = "https://maps.app.goo.gl/WYPcB7q9DJuc2n3r9"

export const BENGALURU_VENUE = "Asthitva Teak Meadows"

export const BENGALURU_ADDRESS =
  "63/1, Kachohalli Main Rd, opp. to HP petrol bunk, Kempegowdanagar, Byadarahalli, Bengaluru, Karnataka 562162"

export const CHENNAI_VENUE = "Soundrapandian Kalyana Mandapam"

export const CHENNAI_ADDRESS =
  "356, 1C, Kundrathur Main Rd, Madhanandapuram, Chennai, Tamil Nadu 600125"

export const CHENNAI_MAPS_URL = "https://maps.app.goo.gl/cHtGdWoD3weMy2EY9"

/** Shown wherever a venue has not been confirmed. Do not replace this with a guessed address. */
export const AWAITING_VENUE = "Awaiting confirmed venue details."

/** Muhurtham: 11 November 2026, 6:00 AM IST. */
export const MUHURTHAM_START = new Date("2026-11-11T06:00:00+05:30")

export const BRIDE = "Ch. Sow. B. Pushpalatha"
export const GROOM = "Ch. Ry. G. Gokul"
export const BRIDE_GIVEN = "Pushpalatha"
export const GROOM_GIVEN = "Gokul"

/**
 * Ch. is Chiranjivi. Sow. is Sowbhagyavati.
 * B., Ry., and G. are the family initials, written in each script.
 */
export const coupleByLocale: Record<
  Locale,
  { bride: string; groom: string; brideGiven: string; groomGiven: string }
> = {
  en: { bride: BRIDE, groom: GROOM, brideGiven: BRIDE_GIVEN, groomGiven: GROOM_GIVEN },
  kn: {
    bride: "ಚಿರಂಜೀವಿ ಸೌಭಾಗ್ಯವತಿ ಬಿ. ಪುಷ್ಪಲತಾ",
    groom: "ಚಿರಂಜೀವಿ ರಾಜಾ. ಜಿ. ಗೋಕುಲ್",
    brideGiven: "ಪುಷ್ಪಲತಾ",
    groomGiven: "ಗೋಕುಲ್",
  },
  ta: {
    bride: "சிரஞ்சீவி சௌபாக்யவதி பி. புஷ்பலதா",
    groom: "சிரஞ்சீவி ராஜா. ஜி. கோகுல்",
    brideGiven: "புஷ்பலதா",
    groomGiven: "கோகுல்",
  },
}

const CHENNAI_ADDRESS_KN =
  "356, 1C, ಕುಂದ್ರತ್ತೂರ್ ಮುಖ್ಯ ರಸ್ತೆ, ಮಧನಂದಾಪುರಂ, ಚೆನ್ನೈ, ತಮಿಳುನಾಡು 600125"
const CHENNAI_ADDRESS_TA =
  "356, 1C, குன்றத்தூர் பிரதான சாலை, மதனந்தபுரம், சென்னை, தமிழ்நாடு 600125"

const BENGALURU_VENUE_KN = "ಅಸ್ಥಿತ್ವ ಟೀಕ್ ಮೆಡೋಸ್"
const BENGALURU_VENUE_TA = "அஸ்தித்வா டீக் மெடோஸ்"

const CHENNAI_VENUE_KN = "ಸೌಂದ್ರಪಾಂಡಿಯ ಕಲ್ಯಾಣ ಮಂಟಪ"
const CHENNAI_VENUE_TA = "சௌந்திரபாண்டிய கல்யாண மண்டபம்"

const BENGALURU_ADDRESS_KN =
  "63/1, ಕಾಚೋಹಳ್ಳಿ ಮುಖ್ಯ ರಸ್ತೆ, ಎಚ್.ಪಿ. ಪೆಟ್ರೋಲ್ ಬಂಕ್ ಎದುರು, ಕೆಂಪೇಗೌಡನಗರ, ಬ್ಯಾಡರಹಳ್ಳಿ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 562162"
const BENGALURU_ADDRESS_TA =
  "63/1, காச்சோஹள்ளி பிரதான சாலை, எச்.பி. பெட்ரோல் பங்கிற்கு எதிரில், கெம்பேகவுடநகர், பியாதரஹள்ளி, பெங்களூர், கர்நாடகா 562162"

export function namesFor(locale: Locale) {
  return coupleByLocale[locale]
}

/** Guest-facing venue name. Calendar files keep the English name. */
export function venueForDisplay(venueName: string | null, locale: Locale): string | null {
  if (venueName === BENGALURU_VENUE && locale === "kn") return BENGALURU_VENUE_KN
  if (venueName === BENGALURU_VENUE && locale === "ta") return BENGALURU_VENUE_TA
  if (venueName === CHENNAI_VENUE && locale === "kn") return CHENNAI_VENUE_KN
  if (venueName === CHENNAI_VENUE && locale === "ta") return CHENNAI_VENUE_TA
  return venueName
}

/** Guest-facing address. Calendar files keep the English postal address. */
export function addressForDisplay(address: string | null, locale: Locale): string | null {
  if (address === CHENNAI_ADDRESS && locale === "kn") return CHENNAI_ADDRESS_KN
  if (address === CHENNAI_ADDRESS && locale === "ta") return CHENNAI_ADDRESS_TA
  if (address === BENGALURU_ADDRESS && locale === "kn") return BENGALURU_ADDRESS_KN
  if (address === BENGALURU_ADDRESS && locale === "ta") return BENGALURU_ADDRESS_TA
  return address
}
export const BRIDE_PARENTS = "Smt. K. Mahalakshmi and Sri. K. Balaraju"
export const GROOM_PARENTS = "Smt. G. Shanthi and Sri. G. Govindaraji"

export type Locale = "en" | "kn" | "ta"
export type EventId = "chennai-reception" | "wedding-ceremony" | "bengaluru-reception"

export type InvitationRole =
  | "blessing"
  | "lead"
  | "hosts"
  | "invite"
  | "name"
  | "relation"
  | "with"
  | "closing"
  | "complimentsLabel"
  | "compliments"

export type InvitationLine = {
  role: InvitationRole
  text: string
}

export type ScheduleItem = {
  /** 24-hour time in Asia/Kolkata. */
  time: string
  label: Record<Locale, string>
  clock: Record<Locale, string>
}

export type WeddingEvent = {
  id: EventId
  /** Calendar date, YYYY-MM-DD, in Asia/Kolkata. */
  date: string
  /** Confirmed start, HH:mm. */
  start: string
  /**
   * Confirmed end, HH:mm. Leave null until the family confirms a closing time.
   * Calendar exports will not invent a duration while this is null.
   */
  end: string | null
  dateLabel: Record<Locale, string>
  timeLabel: Record<Locale, string>
  venueName: string | null
  address: string | null
  /** Verified Google Maps link. Leave null until the venue is confirmed. */
  mapsUrl: string | null
  schedule: ScheduleItem[]
}

export const events: WeddingEvent[] = [
  {
    id: "chennai-reception",
    date: "2026-11-10",
    start: "18:00",
    end: "22:00",
    dateLabel: {
      en: "Tuesday, 10 November 2026",
      kn: "ಮಂಗಳವಾರ, 10 ನವೆಂಬರ್ 2026",
      ta: "செவ்வாய்க்கிழமை, 10 நவம்பர் 2026",
    },
    timeLabel: {
      en: "6:00 PM–10:00 PM",
      kn: "ಸಂಜೆ 6:00–ರಾತ್ರಿ 10:00",
      ta: "மாலை 6:00–இரவு 10:00",
    },
    venueName: CHENNAI_VENUE,
    address: CHENNAI_ADDRESS,
    mapsUrl: CHENNAI_MAPS_URL,
    schedule: [
      {
        time: "18:00",
        label: { en: "Reception begins", kn: "ಸ್ವಾಗತ ಪ್ರಾರಂಭ", ta: "வரவேற்பு தொடக்கம்" },
        clock: { en: "6:00 PM", kn: "ಸಂಜೆ 6:00", ta: "மாலை 6:00" },
      },
      {
        time: "19:00",
        label: { en: "Music", kn: "ಸಂಗೀತ", ta: "இசை" },
        clock: { en: "7:00 PM", kn: "ಸಂಜೆ 7:00", ta: "மாலை 7:00" },
      },
      {
        time: "19:30",
        label: { en: "Dinner", kn: "ಊಟ", ta: "விருந்து" },
        clock: { en: "7:30 PM", kn: "ಸಂಜೆ 7:30", ta: "இரவு 7:30" },
      },
    ],
  },
  {
    id: "wedding-ceremony",
    date: "2026-11-11",
    start: "06:00",
    end: "07:30",
    dateLabel: {
      en: "Wednesday, 11 November 2026",
      kn: "ಬುಧವಾರ, 11 ನವೆಂಬರ್ 2026",
      ta: "புதன்கிழமை, 11 நவம்பர் 2026",
    },
    timeLabel: {
      en: "6:00 AM–7:30 AM",
      kn: "ಬೆಳಗ್ಗೆ 6:00–7:30",
      ta: "காலை 6:00–7:30",
    },
    venueName: CHENNAI_VENUE,
    address: CHENNAI_ADDRESS,
    mapsUrl: CHENNAI_MAPS_URL,
    schedule: [],
  },
  {
    id: "bengaluru-reception",
    date: "2026-11-29",
    start: "11:30",
    end: "14:30",
    dateLabel: {
      en: "Sunday, 29 November 2026",
      kn: "ಭಾನುವಾರ, 29 ನವೆಂಬರ್ 2026",
      ta: "ஞாயிற்றுக்கிழமை, 29 நவம்பர் 2026",
    },
    timeLabel: {
      en: "11:30 AM–2:30 PM",
      kn: "ಬೆಳಗ್ಗೆ 11:30–ಮಧ್ಯಾಹ್ನ 2:30",
      ta: "காலை 11:30–மதியம் 2:30",
    },
    venueName: BENGALURU_VENUE,
    address: BENGALURU_ADDRESS,
    mapsUrl: MAPS_URL,
    schedule: [],
  },
]

export type Photograph = {
  /** Path inside public/. Replace the file, keep the name, or change this path. */
  src: string
  alt: string
  /** Optional. Leave empty to hide the caption. */
  caption: string
  orientation: "portrait" | "landscape" | "square"
}

/**
 * Drop photographs into public/images/ using these filenames, then update
 * `alt` and `caption`. Until a file is present, the site shows a labelled
 * frame. Those frames are not photographs of the couple.
 */
export const photographs: Photograph[] = [
  {
    src: "/images/01-hero.jpg",
    alt: "Pre-wedding photograph",
    caption: "",
    orientation: "landscape",
  },
  {
    src: "/images/02-portrait.jpg",
    alt: "Pre-wedding portrait",
    caption: "",
    orientation: "portrait",
  },
  {
    src: "/images/03-together.jpg",
    alt: "Pre-wedding photograph",
    caption: "",
    orientation: "portrait",
  },
  {
    src: "/images/04-candid.jpg",
    alt: "Pre-wedding photograph",
    caption: "",
    orientation: "landscape",
  },
  {
    src: "/images/05-details.jpg",
    alt: "Pre-wedding photograph",
    caption: "",
    orientation: "square",
  },
  {
    src: "/images/06-celebration.jpg",
    alt: "Pre-wedding photograph",
    caption: "",
    orientation: "landscape",
  },
]

/**
 * RSVP stays hidden until this is a real https endpoint that accepts a JSON POST:
 * { name, guests, events, message, locale }.
 * Example: a Formspree endpoint or a Google Apps Script web app URL.
 */
export const rsvp: { endpoint: string | null } = {
  endpoint: null,
}

/**
 * The play button uses public/audio/music.mp3. It does not start by itself.
 */
export const music: { src: string | null } = {
  src: "/audio/music.mp3",
}

function line(role: InvitationRole, text: string): InvitationLine {
  return { role, text }
}

const en = {
  metaTitle: "Pushpalatha & Gokul — Wedding Invitation",
  splashTitle: "A Beautiful Beginning",
  ganeshaLabel: "Lord Ganesha",
  omLabel: "Om",
  nav: {
    home: "Home",
    invitation: "Invitation",
    events: "Events",
    gallery: "Gallery",
    venue: "Venue",
    contact: "Contact",
  },
  openMenu: "Open menu",
  closeMenu: "Close menu",
  languageLabel: "Language",
  skipToContent: "Skip to invitation",
  scrollHint: "Scroll to explore",
  invitation: [
    line("lead", "With the blessings of the Almighty and our beloved families,"),
    line("invite", "we joyfully invite you and your family to grace the wedding of"),
    line("name", BRIDE),
    line("relation", `Daughter of ${BRIDE_PARENTS}`),
    line("with", "with"),
    line("name", GROOM),
    line("relation", `Son of ${GROOM_PARENTS}`),
    line("closing", "Your gracious presence and blessings will make our celebration truly special."),
    line("complimentsLabel", "With best compliments from:"),
    line("compliments", "Relatives and Friends."),
  ],
  and: "and",
  countdownLabels: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  celebration: "The muhurtham has begun. Thank you for blessing Pushpalatha and Gokul.",
  eventsHeading: "Event details",
  eventsIntro: "Three gatherings, in the order they will be held.",
  eventTitles: {
    "chennai-reception": "Chennai Reception",
    "wedding-ceremony": "Wedding Ceremony",
    "bengaluru-reception": "Bengaluru Reception / Beegara Oota",
  },
  eventKickers: {
    "chennai-reception": "Reception",
    "wedding-ceremony": "Muhurtham",
    "bengaluru-reception": "Beegara Oota",
  },
  dateLabel: "Date",
  timeLabel: "Time",
  venueLabel: "Venue",
  awaitingVenue: AWAITING_VENUE,
  endUnconfirmed: "Closing time: to be confirmed.",
  chennaiEndNote:
    "The calendar entry marks the 6:00 PM start and includes the music and dinner schedule. The closing time will be added once it is confirmed.",
  viewMaps: "View on Google Maps",
  directions: "Get Directions",
  copyAddress: "Copy Address",
  shareLocation: "Share Location",
  addressCopied: "Address copied.",
  locationShared: "Location shared.",
  locationCopied: "Location link copied.",
  copyFailed: "Could not copy. Please select the text and copy it manually.",
  shareFailed: "Could not share. The location link is ready to copy.",
  addCalendar: "Add to Google Calendar",
  downloadCalendar: "Download Calendar Event",
  galleryHeading: "Pre-wedding photographs",
  galleryIntro:
    "A glimpse into the days before the wedding, capturing Pushpalatha and Gokul’s pre-wedding moments, candid smiles, special memories, and the joy of getting ready for their big day.",
  photoPlaceholder: "Your photograph will appear here",
  photoPlaceholderHint: "Add this file when the photograph is ready:",
  photoPrev: "Previous photograph",
  photoNext: "Next photograph",
  photoClose: "Close photograph",
  photoLoading: "Loading photograph",
  photoCount: (current: number, total: number) => `Photograph ${current} of ${total}`,
  venueHeading: "Venue and directions",
  venueIntro:
    "Directions are ready for the Bengaluru reception. The Chennai reception and the wedding ceremony will be added here once their venues are confirmed.",
  contactHeading: "Share the invitation",
  contactIntro: "Send this page to family and friends. The message is a short invitation with this website link.",
  whatsapp: "Share on WhatsApp",
  copyLink: "Copy Website Link",
  linkCopied: "Website link copied.",
  share: "Share Invitation",
  shared: "Invitation shared.",
  print: "Print / Save as PDF",
  playMusic: "Play music",
  pauseMusic: "Pause music",
  musicUnavailable: "Music could not start in this browser. You can try again.",
  musicLoading: "Starting music",
  cordiallyInvited: "You're cordially invited",
  weddingHeading: "Wedding Invitation",
  saveTheDate: "Save the Date",
  dateNote: "A beautiful beginning to our forever.",
  cityBengaluru: "Bengaluru",
  ourStory: "Our Story",
  scrollTitle: "The celebrations",
  viewOnMap: "View on Map",
  addToCalendar: "Add to Calendar",
  calendarOnDevice: "Add to your calendar",
  shareEvent: "Share Event",
  prevEvent: "Previous Event",
  nextEvent: "Next Event",
  eventPosition: (current: number, total: number) => `Event ${current} of ${total}`,
  backToTop: "Back to Top",
  footerNote: "With best compliments from Relatives and Friends.",
  footerClosing: "With love and gratitude.",
  shareJoy: (bride: string, groom: string) =>
    `With immense joy, we invite you to celebrate the wedding of ${bride} and ${groom}! ❤️`,
  shareBlessing: "Your presence and blessings would mean the world to us.",
  shareJoin:
    "Join us for our wedding celebrations and find all the event details, venue information, and directions in our invitation.",
  shareSignoff: (bride: string, groom: string) => `With love,\n${bride} & ${groom}`,
  invitationWord: "Invitation",
  preparingQr: "Preparing the directions code",
  qrError: "The directions code could not be drawn. Open the maps link instead.",
  qrAlt: "QR code for the Bengaluru reception on Google Maps",
  rsvpHeading: "RSVP",
  rsvpIntro: "Please tell the family you will be there.",
  rsvpName: "Your name",
  rsvpGuests: "Number of guests",
  rsvpEvents: "Which celebrations will you attend?",
  rsvpMessage: "Message",
  rsvpSubmit: "Send RSVP",
  rsvpSending: "Sending",
  rsvpSuccess: "Thank you. Your RSVP has been sent.",
  rsvpError: "The RSVP could not be sent. Please try again in a moment.",
}

const kn: typeof en = {
  metaTitle: "ಪುಷ್ಪಲತಾ ಮತ್ತು ಗೋಕುಲ್ — ವಿವಾಹ ಆಮಂತ್ರಣ",
  splashTitle: "ಒಂದು ಸುಂದರ ಆರಂಭ",
  ganeshaLabel: "ಶ್ರೀ ಗಣೇಶ",
  omLabel: "ಓಂ",
  nav: {
    home: "ಮುಖಪುಟ",
    invitation: "ಆಮಂತ್ರಣ",
    events: "ಕಾರ್ಯಕ್ರಮಗಳು",
    gallery: "ಚಿತ್ರಗಳು",
    venue: "ಸ್ಥಳ",
    contact: "ಸಂಪರ್ಕ",
  },
  openMenu: "ಮೆನು ತೆರೆಯಿರಿ",
  closeMenu: "ಮೆನು ಮುಚ್ಚಿರಿ",
  languageLabel: "ಭಾಷೆ",
  skipToContent: "ಆಮಂತ್ರಣಕ್ಕೆ ಹೋಗಿ",
  scrollHint: "ಇನ್ನಷ್ಟು ನೋಡಲು ಕೆಳಗೆ ಸರಿಸಿ",
  invitation: [
    line("lead", "ಪರಮಾತ್ಮನ ಹಾಗೂ ನಮ್ಮ ಪ್ರೀತಿಯ ಕುಟುಂಬಗಳ ಆಶೀರ್ವಾದದೊಂದಿಗೆ,"),
    line("invite", "ತಾವು ಹಾಗೂ ತಮ್ಮ ಕುಟುಂಬದವರನ್ನು ಈ ಮಂಗಳಕರ ವಿವಾಹಕ್ಕೆ ಸಂತೋಷದಿಂದ ಆಹ್ವಾನಿಸುತ್ತೇವೆ"),
    line("name", coupleByLocale.kn.bride),
    line("relation", "ಶ್ರೀಮತಿ ಕೆ. ಮಹಾಲಕ್ಷ್ಮಿ ಮತ್ತು ಶ್ರೀ ಕೆ. ಬಾಲರಾಜು ಅವರ ಪುತ್ರಿ"),
    line("with", "ಜೊತೆ"),
    line("name", coupleByLocale.kn.groom),
    line("relation", "ಶ್ರೀಮತಿ ಜಿ. ಶಾಂತಿ ಮತ್ತು ಶ್ರೀ ಜಿ. ಗೋವಿಂದರಾಜಿ ಅವರ ಪುತ್ರ"),
    line("closing", "ತಾವು ದಯಮಾಡಿಸಿ ನೀಡುವ ಆಶೀರ್ವಾದ ನಮ್ಮ ಸಂಭ್ರಮವನ್ನು ಇನ್ನಷ್ಟು ವಿಶೇಷವನ್ನಾಗಿಸುತ್ತದೆ."),
    line("complimentsLabel", "ವಂದನೆಗಳೊಂದಿಗೆ:"),
    line("compliments", "ಬಂಧುಗಳು ಮತ್ತು ಸ್ನೇಹಿತರು."),
  ],
  and: "ಮತ್ತು",
  countdownLabels: {
    days: "ದಿನಗಳು",
    hours: "ಗಂಟೆಗಳು",
    minutes: "ನಿಮಿಷಗಳು",
    seconds: "ಸೆಕೆಂಡುಗಳು",
  },
  celebration: "ಮುಹೂರ್ತ ಪ್ರಾರಂಭವಾಗಿದೆ. ಪುಷ್ಪಲತಾ ಮತ್ತು ಗೋಕುಲ್ ಅವರನ್ನು ಆಶೀರ್ವಾದಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
  eventsHeading: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು",
  eventsIntro: "ಮೂರು ಕಾರ್ಯಕ್ರಮಗಳು, ನಡೆಯುವ ಕ್ರಮದಲ್ಲಿ.",
  eventTitles: {
    "chennai-reception": "ಚೆನ್ನೈ ಸ್ವಾಗತ",
    "wedding-ceremony": "ವಿವಾಹ ಸಮಾರಂಭ",
    "bengaluru-reception": "ಬೆಂಗಳೂರು ಸ್ವಾಗತ / ಬೀಗರ ಊಟ",
  },
  eventKickers: {
    "chennai-reception": "ಸ್ವಾಗತ",
    "wedding-ceremony": "ಮುಹೂರ್ತ",
    "bengaluru-reception": "ಬೀಗರ ಊಟ",
  },
  dateLabel: "ದಿನಾಂಕ",
  timeLabel: "ಸಮಯ",
  venueLabel: "ಸ್ಥಳ",
  awaitingVenue: "ಸ್ಥಳದ ವಿವರ ಖಚಿತವಾದ ನಂತರ ತಿಳಿಸಲಾಗುವುದು.",
  endUnconfirmed: "ಮುಕ್ತಾಯದ ಸಮಯ: ಇನ್ನೂ ಖಚಿತವಾಗಿಲ್ಲ.",
  chennaiEndNote:
    "ಕ್ಯಾಲೆಂಡರ್ ದಾಖಲೆ ಸಂಜೆ 6:00 ರ ಪ್ರಾರಂಭವನ್ನು ಗುರುತಿಸುತ್ತದೆ ಮತ್ತು ಸಂಗೀತ ಹಾಗೂ ಊಟದ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಒಳಗೊಂಡಿದೆ. ಮುಕ್ತಾಯದ ಸಮಯ ಖಚಿತವಾದ ನಂತರ ಸೇರಿಸಲಾಗುವುದು.",
  viewMaps: "ಗೂಗಲ್ ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ",
  directions: "ದಾರಿ ಪಡೆಯಿರಿ",
  copyAddress: "ವಿಳಾಸ ನಕಲಿಸಿ",
  shareLocation: "ಸ್ಥಳ ಹಂಚಿಕೊಳ್ಳಿ",
  addressCopied: "ವಿಳಾಸ ನಕಲಿಸಲಾಗಿದೆ.",
  locationShared: "ಸ್ಥಳ ಹಂಚಲಾಗಿದೆ.",
  locationCopied: "ಸ್ಥಳದ ಕೊಂಡಿ ನಕಲಿಸಲಾಗಿದೆ.",
  copyFailed: "ನಕಲಿಸಲು ಆಗಲಿಲ್ಲ. ಪಠ್ಯವನ್ನು ಆರಿಸಿ ನಕಲಿಸಿ.",
  shareFailed: "ಹಂಚಲು ಆಗಲಿಲ್ಲ. ಸ್ಥಳದ ಕೊಂಡಿ ನಕಲಿಸಲು ಸಿದ್ಧವಾಗಿದೆ.",
  addCalendar: "ಗೂಗಲ್ ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ",
  downloadCalendar: "ಕ್ಯಾಲೆಂಡರ್ ಫೈಲ್ ಡೌನ್‌ಲೋಡ್",
  galleryHeading: "ಮದುವೆಗೆ ಮುನ್ನಿನ ಚಿತ್ರಗಳು",
  galleryIntro:
    "ಮದುವೆಗೆ ಮುನ್ನಿನ ದಿನಗಳ ಒಂದು ನೋಟ. ಪುಷ್ಪಲತಾ ಮತ್ತು ಗೋಕುಲ್ ಅವರ ಮದುವೆಗೆ ಮುನ್ನಿನ ಕ್ಷಣಗಳು, ನೈಸರ್ಗಿಕ ನಗುಗಳು, ವಿಶೇಷ ನೆನಪುಗಳು, ಮತ್ತು ದೊಡ್ಡ ದಿನಕ್ಕೆ ಸಿದ್ಧವಾಗುವ ಸಂತೋಷ ಇಲ್ಲಿದೆ.",
  photoPlaceholder: "ನಿಮ್ಮ ಚಿತ್ರ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ",
  photoPlaceholderHint: "ಚಿತ್ರ ಸಿದ್ಧವಾದಾಗ ಈ ಫೈಲ್ ಸೇರಿಸಿ:",
  photoPrev: "ಹಿಂದಿನ ಚಿತ್ರ",
  photoNext: "ಮುಂದಿನ ಚಿತ್ರ",
  photoClose: "ಚಿತ್ರ ಮುಚ್ಚಿ",
  photoLoading: "ಚಿತ್ರ ತೆರೆಯುತ್ತಿದೆ",
  photoCount: (current: number, total: number) => `ಚಿತ್ರ ${current} / ${total}`,
  venueHeading: "ಸ್ಥಳ ಮತ್ತು ದಾರಿ",
  venueIntro:
    "ಬೆಂಗಳೂರು ಸ್ವಾಗತದ ದಾರಿ ಸಿದ್ಧವಾಗಿದೆ. ಚೆನ್ನೈ ಸ್ವಾಗತ ಮತ್ತು ವಿವಾಹದ ಸ್ಥಳ ಖಚಿತವಾದ ನಂತರ ಇಲ್ಲಿ ಸೇರಿಸಲಾಗುವುದು.",
  contactHeading: "ಆಮಂತ್ರಣ ಹಂಚಿಕೊಳ್ಳಿ",
  contactIntro: "ಈ ಪುಟವನ್ನು ಬಂಧುಗಳು ಮತ್ತು ಸ್ನೇಹಿತರಿಗೆ ಕಳುಹಿಸಿ. ಸಂದೇಶದಲ್ಲಿ ಒಂದು ಚಿಕ್ಕ ಆಮಂತ್ರಣ ಮತ್ತು ಈ ಜಾಲತಾಣದ ಕೊಂಡಿ ಇರುತ್ತವೆ.",
  whatsapp: "ವಾಟ್ಸ್‌ಆ್ಯಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ",
  copyLink: "ಜಾಲತಾಣದ ಕೊಂಡಿ ನಕಲಿಸಿ",
  linkCopied: "ಜಾಲತಾಣದ ಕೊಂಡಿ ನಕಲಿಸಲಾಗಿದೆ.",
  share: "ಆಮಂತ್ರಣ ಹಂಚಿಕೊಳ್ಳಿ",
  shared: "ಆಮಂತ್ರಣ ಹಂಚಲಾಗಿದೆ.",
  print: "ಮುದ್ರಿಸಿ / PDF ಆಗಿ ಉಳಿಸಿ",
  playMusic: "ಸಂಗೀತ ನುಡಿಸಿ",
  pauseMusic: "ಸಂಗೀತ ನಿಲ್ಲಿಸಿ",
  musicUnavailable: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸಂಗೀತ ಪ್ರಾರಂಭವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  musicLoading: "ಸಂಗೀತ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ",
  cordiallyInvited: "ನಿಮ್ಮನ್ನು ಆದರಪೂರ್ವಕವಾಗಿ ಆಹ್ವಾನಿಸಲಾಗಿದೆ",
  weddingHeading: "ವಿವಾಹ ಆಮಂತ್ರಣ",
  saveTheDate: "ದಿನಾಂಕ ಉಳಿಸಿಕೊಳ್ಳಿ",
  dateNote: "ನಮ್ಮ ಜೊತೆಗಿನ ಜೀವನಕ್ಕೆ ಇದೊಂದು ಸುಂದರ ಆರಂಭ.",
  cityBengaluru: "ಬೆಂಗಳೂರು",
  ourStory: "ನಮ್ಮ ಕಥೆ",
  scrollTitle: "ಸಂಭ್ರಮಗಳು",
  viewOnMap: "ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ",
  addToCalendar: "ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ",
  calendarOnDevice: "ನಿಮ್ಮ ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ",
  shareEvent: "ಕಾರ್ಯಕ್ರಮ ಹಂಚಿಕೊಳ್ಳಿ",
  prevEvent: "ಹಿಂದಿನ ಕಾರ್ಯಕ್ರಮ",
  nextEvent: "ಮುಂದಿನ ಕಾರ್ಯಕ್ರಮ",
  eventPosition: (current: number, total: number) => `ಕಾರ್ಯಕ್ರಮ ${current} / ${total}`,
  backToTop: "ಮೇಲಕ್ಕೆ",
  footerNote: "ಬಂಧುಗಳು ಮತ್ತು ಸ್ನೇಹಿತರ ವಂದನೆಗಳು.",
  footerClosing: "ಪ್ರೀತಿ ಮತ್ತು ಕೃತಜ್ಞತೆಯೊಂದಿಗೆ.",
  shareJoy: (bride: string, groom: string) =>
    `${bride} ಮತ್ತು ${groom} ಅವರ ವಿವಾಹವನ್ನು ಸಂಭ್ರಮಿಸಲು ನಿಮ್ಮನ್ನು ಮನಃಪೂರ್ವಕವಾಗಿ ಆಹ್ವಾನಿಸುತ್ತೇವೆ! ❤️`,
  shareBlessing: "ನಿಮ್ಮ ಆಗಮನ ಮತ್ತು ಆಶೀರ್ವಾದ ನಮಗೆ ಅತ್ಯಂತ ಅಮೂಲ್ಯ.",
  shareJoin: "ನಮ್ಮ ವಿವಾಹ ಸಂಭ್ರಮಗಳಿಗೆ ಬನ್ನಿ. ಕಾರ್ಯಕ್ರಮ, ಸ್ಥಳ ಮತ್ತು ದಾರಿಯ ವಿವರಗಳೆಲ್ಲ ಈ ಆಮಂತ್ರಣದಲ್ಲಿವೆ.",
  shareSignoff: (bride: string, groom: string) => `ಪ್ರೀತಿಯಿಂದ,\n${bride} ಮತ್ತು ${groom}`,
  invitationWord: "ಆಮಂತ್ರಣ",
  preparingQr: "ದಾರಿಯ ಸಂಕೇತ ಸಿದ್ಧವಾಗುತ್ತಿದೆ",
  qrError: "ದಾರಿಯ ಸಂಕೇತ ರಚಿಸಲು ಆಗಲಿಲ್ಲ. ನಕ್ಷೆಯ ಕೊಂಡಿಯನ್ನು ತೆರೆಯಿರಿ.",
  qrAlt: "ಬೆಂಗಳೂರು ಸ್ವಾಗತದ ಗೂಗಲ್ ನಕ್ಷೆಗೆ ದಾರಿ ತೋರಿಸುವ ಕ್ಯೂಆರ್ ಸಂಕೇತ",
  rsvpHeading: "ಹಾಜರಾತಿ ತಿಳಿಸಿ",
  rsvpIntro: "ನೀವು ಬರುತ್ತೀರಿ ಎಂದು ಕುಟುಂಬಕ್ಕೆ ತಿಳಿಸಿ.",
  rsvpName: "ನಿಮ್ಮ ಹೆಸರು",
  rsvpGuests: "ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ",
  rsvpEvents: "ಯಾವ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಬರುತ್ತೀರಿ?",
  rsvpMessage: "ಸಂದೇಶ",
  rsvpSubmit: "ಕಳುಹಿಸಿ",
  rsvpSending: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ",
  rsvpSuccess: "ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಹಾಜರಾತಿ ತಲುಪಿದೆ.",
  rsvpError: "ಕಳುಹಿಸಲು ಆಗಲಿಲ್ಲ. ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
}

const ta: typeof en = {
  metaTitle: "புஷ்பலதா மற்றும் கோகுல் — திருமண அழைப்பிதழ்",
  splashTitle: "ஒரு அழகிய தொடக்கம்",
  ganeshaLabel: "விநாயகர்",
  omLabel: "ஓம்",
  nav: {
    home: "முகப்பு",
    invitation: "அழைப்பிதழ்",
    events: "நிகழ்வுகள்",
    gallery: "படங்கள்",
    venue: "இடம்",
    contact: "தொடர்பு",
  },
  openMenu: "பட்டியலைத் திற",
  closeMenu: "பட்டியலை மூடு",
  languageLabel: "மொழி",
  skipToContent: "அழைப்பிதழுக்குச் செல்",
  scrollHint: "மேலும் காண கீழே செல்லுங்கள்",
  invitation: [
    line("lead", "இறைவன் மற்றும் எங்கள் அன்புக் குடும்பங்களின் ஆசியுடன்,"),
    line("invite", "தங்களையும் தங்கள் குடும்பத்தினரையும் இந்த மங்களகரமான திருமணத்திற்கு மகிழ்ச்சியுடன் அழைக்கிறோம்"),
    line("name", coupleByLocale.ta.bride),
    line("relation", "திருமதி கே. மகாலட்சுமி மற்றும் திரு கே. பாலராஜு அவர்களின் புதல்வி"),
    line("with", "உடன்"),
    line("name", coupleByLocale.ta.groom),
    line("relation", "திருமதி ஜி. சாந்தி மற்றும் திரு ஜி. கோவிந்தராஜி அவர்களின் புதல்வர்"),
    line("closing", "தாங்கள் வருகை தந்து அளிக்கும் ஆசி எங்கள் விழாவை மேலும் சிறப்பாக்கும்."),
    line("complimentsLabel", "இனிய அன்புடன்:"),
    line("compliments", "உறவினர்களும் நண்பர்களும்."),
  ],
  and: "மற்றும்",
  countdownLabels: {
    days: "நாட்கள்",
    hours: "மணிநேரம்",
    minutes: "நிமிடங்கள்",
    seconds: "விநாடிகள்",
  },
  celebration: "முகூர்த்தம் தொடங்கிவிட்டது. புஷ்பலதா மற்றும் கோகுல் அவர்களை ஆசீர்வதித்ததற்கு நன்றி.",
  eventsHeading: "நிகழ்வு விவரங்கள்",
  eventsIntro: "மூன்று நிகழ்வுகள், நடைபெறும் வரிசையில்.",
  eventTitles: {
    "chennai-reception": "சென்னை வரவேற்பு",
    "wedding-ceremony": "திருமண விழா",
    "bengaluru-reception": "பெங்களூர் வரவேற்பு / கறி விருந்து",
  },
  eventKickers: {
    "chennai-reception": "வரவேற்பு",
    "wedding-ceremony": "முகூர்த்தம்",
    "bengaluru-reception": "கறி விருந்து",
  },
  dateLabel: "நாள்",
  timeLabel: "நேரம்",
  venueLabel: "இடம்",
  awaitingVenue: "இடம் உறுதிசெய்யப்பட்டதும் தெரிவிக்கப்படும்.",
  endUnconfirmed: "நிறைவு நேரம்: இன்னும் உறுதியாகவில்லை.",
  chennaiEndNote:
    "நாள்காட்டி பதிவு மாலை 6:00 தொடக்கத்தைக் குறிக்கிறது; இசை மற்றும் விருந்தின் அட்டவணையும் அதில் உள்ளது. நிறைவு நேரம் உறுதியானதும் சேர்க்கப்படும்.",
  viewMaps: "கூகுள் வரைபடத்தில் காண",
  directions: "வழிகாட்டல்",
  copyAddress: "முகவரியை நகலெடு",
  shareLocation: "இடத்தைப் பகிர்",
  addressCopied: "முகவரி நகலெடுக்கப்பட்டது.",
  locationShared: "இடம் பகிரப்பட்டது.",
  locationCopied: "இடத்தின் இணைப்பு நகலெடுக்கப்பட்டது.",
  copyFailed: "நகலெடுக்க முடியவில்லை. உரையைத் தேர்ந்தெடுத்து நகலெடுக்கவும்.",
  shareFailed: "பகிர முடியவில்லை. இடத்தின் இணைப்பு நகலெடுக்கத் தயாராக உள்ளது.",
  addCalendar: "கூகுள் நாள்காட்டியில் சேர்",
  downloadCalendar: "நாள்காட்டி கோப்பைப் பதிவிறக்கு",
  galleryHeading: "திருமணத்திற்கு முந்தைய படங்கள்",
  galleryIntro:
    "திருமணத்திற்கு முந்தைய நாட்களின் ஒரு பார்வை. புஷ்பலதா மற்றும் கோகுல் அவர்களின் திருமணத்திற்கு முந்தைய தருணங்கள், இயல்பான புன்னகைகள், சிறப்பு நினைவுகள், மற்றும் பெரிய நாளுக்குத் தயாராகும் மகிழ்ச்சி இங்கே.",
  photoPlaceholder: "உங்கள் படம் இங்கே தோன்றும்",
  photoPlaceholderHint: "படம் தயாரானதும் இந்தக் கோப்பைச் சேர்க்கவும்:",
  photoPrev: "முந்தைய படம்",
  photoNext: "அடுத்த படம்",
  photoClose: "படத்தை மூடு",
  photoLoading: "படம் திறக்கிறது",
  photoCount: (current: number, total: number) => `படம் ${current} / ${total}`,
  venueHeading: "இடமும் வழியும்",
  venueIntro:
    "பெங்களூர் வரவேற்புக்கான வழி தயாராக உள்ளது. சென்னை வரவேற்பு மற்றும் திருமண இடம் உறுதியானதும் இங்கே சேர்க்கப்படும்.",
  contactHeading: "அழைப்பிதழைப் பகிர",
  contactIntro: "இந்தப் பக்கத்தை உறவினர்களுக்கும் நண்பர்களுக்கும் அனுப்புங்கள். செய்தியில் ஒரு சிறிய அழைப்பும் இந்த இணையதள இணைப்பும் இருக்கும்.",
  whatsapp: "வாட்ஸ்அப்பில் பகிர்",
  copyLink: "இணையதள இணைப்பை நகலெடு",
  linkCopied: "இணையதள இணைப்பு நகலெடுக்கப்பட்டது.",
  share: "அழைப்பிதழைப் பகிர்",
  shared: "அழைப்பிதழ் பகிரப்பட்டது.",
  print: "அச்சிடு / PDF ஆகச் சேமி",
  playMusic: "இசையை இயக்கு",
  pauseMusic: "இசையை நிறுத்து",
  musicUnavailable: "இந்த உலாவியில் இசையைத் தொடங்க முடியவில்லை. மீண்டும் முயலவும்.",
  musicLoading: "இசை தொடங்குகிறது",
  cordiallyInvited: "தங்களை அன்புடன் அழைக்கிறோம்",
  weddingHeading: "திருமண அழைப்பிதழ்",
  saveTheDate: "தேதியைச் சேமிக்க",
  dateNote: "எங்கள் இணைந்த வாழ்க்கைக்கு இது ஓர் அழகிய தொடக்கம்.",
  cityBengaluru: "பெங்களூர்",
  ourStory: "எங்கள் கதை",
  scrollTitle: "விழாக்கள்",
  viewOnMap: "வரைபடத்தில் காண",
  addToCalendar: "நாள்காட்டியில் சேர்",
  calendarOnDevice: "உங்கள் நாள்காட்டியில் சேர்க்க",
  shareEvent: "நிகழ்வைப் பகிர்",
  prevEvent: "முந்தைய நிகழ்வு",
  nextEvent: "அடுத்த நிகழ்வு",
  eventPosition: (current: number, total: number) => `நிகழ்வு ${current} / ${total}`,
  backToTop: "மேலே",
  footerNote: "உறவினர்களும் நண்பர்களும் அன்புடன்.",
  footerClosing: "அன்புடனும் நன்றியுடனும்.",
  shareJoy: (bride: string, groom: string) =>
    `${bride} மற்றும் ${groom} அவர்களின் திருமணத்தைக் கொண்டாட உங்களை மகிழ்ச்சியுடன் அழைக்கிறோம்! ❤️`,
  shareBlessing: "தங்கள் வருகையும் ஆசியும் எங்களுக்கு மிகவும் அர்த்தமுள்ளவை.",
  shareJoin:
    "எங்கள் திருமண விழாக்களில் கலந்துகொள்ளுங்கள். நிகழ்வு விவரங்கள், இடம் மற்றும் வழிகாட்டல் அனைத்தும் இந்த அழைப்பிதழில் உள்ளன.",
  shareSignoff: (bride: string, groom: string) => `அன்புடன்,\n${bride} & ${groom}`,
  invitationWord: "அழைப்பிதழ்",
  preparingQr: "வழிக் குறியீடு தயாராகிறது",
  qrError: "வழிக் குறியீட்டை வரைய முடியவில்லை. வரைபட இணைப்பைத் திறக்கவும்.",
  qrAlt: "பெங்களூர் வரவேற்பின் கூகுள் வரைபடத்திற்கான QR குறியீடு",
  rsvpHeading: "வருகை தெரிவிக்க",
  rsvpIntro: "நீங்கள் வருவதைக் குடும்பத்திற்குத் தெரியப்படுத்துங்கள்.",
  rsvpName: "உங்கள் பெயர்",
  rsvpGuests: "விருந்தினர்களின் எண்ணிக்கை",
  rsvpEvents: "எந்த விழாக்களுக்கு வருவீர்கள்?",
  rsvpMessage: "செய்தி",
  rsvpSubmit: "அனுப்பு",
  rsvpSending: "அனுப்பப்படுகிறது",
  rsvpSuccess: "நன்றி. உங்கள் வருகை தெரிவிப்பு அனுப்பப்பட்டது.",
  rsvpError: "அனுப்ப முடியவில்லை. சிறிது நேரம் கழித்து மீண்டும் முயலவும்.",
}

export const copy = { en, kn, ta }

export type Copy = typeof en

export function getCopy(locale: Locale): Copy {
  return copy[locale]
}

export function invitationPlain(locale: Locale): string {
  return copy[locale].invitation.map((entry) => entry.text).join("\n")
}

export function rsvpIsConfigured(): boolean {
  return typeof rsvp.endpoint === "string" && rsvp.endpoint.startsWith("https://")
}

export function eventById(id: EventId): WeddingEvent {
  const event = events.find((item) => item.id === id)
  if (!event) throw new Error(`Unknown event ${id}`)
  return event
}
