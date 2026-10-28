import { describe, expect, it } from "vitest"
import {
  AWAITING_VENUE,
  BENGALURU_ADDRESS,
  BENGALURU_VENUE,
  BRIDE,
  BRIDE_PARENTS,
  CHENNAI_ADDRESS,
  CHENNAI_MAPS_URL,
  CHENNAI_VENUE,
  GROOM,
  GROOM_PARENTS,
  MAPS_URL,
  addressForDisplay,
  coupleByLocale,
  events,
  getCopy,
  invitationPlain,
  photographs,
  venueForDisplay,
} from "./weddingConfig.ts"

describe("official invitation wording", () => {
  it("reproduces the English invitation exactly", () => {
    expect(invitationPlain("en")).toBe(
      [
        "With the blessings of the Almighty and our beloved families,",
        "we joyfully invite you and your family to grace the wedding of",
        BRIDE,
        `Daughter of ${BRIDE_PARENTS}`,
        "with",
        GROOM,
        `Son of ${GROOM_PARENTS}`,
        "Your gracious presence and blessings will make our celebration truly special.",
        "With best compliments from:",
        "Relatives and Friends.",
      ].join("\n"),
    )
    expect(GROOM_PARENTS).toContain("Govindaraji")
    expect(GROOM_PARENTS).not.toContain("Govindaraju")
  })

  it("keeps the official names in Kannada and Tamil", () => {
    expect(invitationPlain("kn")).toContain(coupleByLocale.kn.bride)
    expect(invitationPlain("kn")).toContain(coupleByLocale.kn.groom)
    expect(invitationPlain("ta")).toContain(coupleByLocale.ta.bride)
    expect(invitationPlain("ta")).toContain(coupleByLocale.ta.groom)
    expect(invitationPlain("kn")).not.toContain(BRIDE)
    expect(invitationPlain("ta")).not.toContain(GROOM)
    expect(invitationPlain("kn")).toContain("ಗೋವಿಂದರಾಜಿ")
    expect(invitationPlain("ta")).toContain("கோவிந்தராஜி")
  })
})

describe("venues", () => {
  it("uses only the supplied Bengaluru address and maps link", () => {
    const bengaluru = events.find((event) => event.id === "bengaluru-reception")
    const chennai = events.find((event) => event.id === "chennai-reception")
    const wedding = events.find((event) => event.id === "wedding-ceremony")

    expect(bengaluru?.venueName).toBe(BENGALURU_VENUE)
    expect(bengaluru?.address).toBe(BENGALURU_ADDRESS)
    expect(bengaluru?.address).toBe(
      "63/1, Kachohalli Main Rd, opp. to HP petrol bunk, Kempegowdanagar, Byadarahalli, Bengaluru, Karnataka 562162",
    )
    expect(bengaluru?.mapsUrl).toBe(MAPS_URL)
    expect(bengaluru?.mapsUrl).toBe("https://maps.app.goo.gl/WYPcB7q9DJuc2n3r9")
    expect(chennai?.venueName).toBe(CHENNAI_VENUE)
    expect(chennai?.address).toBe(CHENNAI_ADDRESS)
    expect(chennai?.mapsUrl).toBe(CHENNAI_MAPS_URL)
    expect(chennai?.end).toBe("22:00")
    expect(chennai?.timeLabel).toEqual({
      en: "6:00 PM–10:00 PM",
      kn: "ಸಂಜೆ 6:00–ರಾತ್ರಿ 10:00",
      ta: "மாலை 6:00–இரவு 10:00",
    })
    expect(wedding?.venueName).toBe(CHENNAI_VENUE)
    expect(wedding?.address).toBe(CHENNAI_ADDRESS)
    expect(wedding?.mapsUrl).toBe(CHENNAI_MAPS_URL)
    expect(AWAITING_VENUE).toBe("Awaiting confirmed venue details.")
  })

  it("shows the Bengaluru venue and address in Kannada and Tamil", () => {
    expect(venueForDisplay(CHENNAI_VENUE, "en")).toBe(CHENNAI_VENUE)
    expect(venueForDisplay(CHENNAI_VENUE, "kn")).toBe("ಸೌಂದ್ರಪಾಂಡಿಯನ್ ಕಲ್ಯಾಣ ಮಂಟಪ")
    expect(venueForDisplay(CHENNAI_VENUE, "ta")).toBe("சௌந்திரபாண்டியன் கல்யாண மண்டபம்")
    expect(getCopy("ta").eventKickers["bengaluru-reception"]).toBe("கறி விருந்து")
    expect(getCopy("ta").eventTitles["bengaluru-reception"]).toContain("கறி விருந்து")
    expect(getCopy("ta").eventTitles["bengaluru-reception"]).not.toContain("பீகர")
    expect(getCopy("kn").dateNote).toBe("ನಮ್ಮ ಜೊತೆಗಿನ ಜೀವನಕ್ಕೆ ಇದೊಂದು ಸುಂದರ ಆರಂಭ.")
    expect(getCopy("ta").dateNote).toBe("எங்கள் இணைந்த வாழ்க்கைக்கு இது ஓர் அழகிய தொடக்கம்.")
    expect(venueForDisplay(BENGALURU_VENUE, "en")).toBe("Asthitva Teak Meadows")
    expect(venueForDisplay(BENGALURU_VENUE, "kn")).toBe("ಅಸ್ಥಿತ್ವ ಟೀಕ್ ಮೆಡೋಸ್")
    expect(venueForDisplay(BENGALURU_VENUE, "ta")).toBe("அஸ்தித்வா டீக் மெடோஸ்")
    expect(addressForDisplay(BENGALURU_ADDRESS, "en")).toBe(BENGALURU_ADDRESS)
    expect(addressForDisplay(BENGALURU_ADDRESS, "kn")).toBe(
      "63/1, ಕಾಚೋಹಳ್ಳಿ ಮುಖ್ಯ ರಸ್ತೆ, ಎಚ್.ಪಿ. ಪೆಟ್ರೋಲ್ ಬಂಕ್ ಎದುರು, ಕೆಂಪೇಗೌಡನಗರ, ಬ್ಯಾಡರಹಳ್ಳಿ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 562162",
    )
    expect(addressForDisplay(BENGALURU_ADDRESS, "ta")).toBe(
      "63/1, காச்சோஹள்ளி பிரதான சாலை, எச்.பி. பெட்ரோல் பங்கிற்கு எதிரில், கெம்பேகவுடநகர், பியாதரஹள்ளி, பெங்களூர், கர்நாடகா 562162",
    )
    expect(addressForDisplay(BENGALURU_ADDRESS, "kn")).not.toContain("Kachohalli")
    expect(addressForDisplay(BENGALURU_ADDRESS, "ta")).not.toContain("Bengaluru")
  })

  it("lists the photograph filenames guests will replace", () => {
    expect(photographs.map((photo) => photo.src)).toEqual([
      "/images/01-hero.jpg",
      "/images/02-portrait.jpg",
      "/images/03-together.jpg",
      "/images/04-candid.jpg",
      "/images/05-details.jpg",
      "/images/06-celebration.jpg",
    ])
  })
})
