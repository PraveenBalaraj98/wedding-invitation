# Pushpalatha & Gokul — Wedding Invitation

A mobile-first website for the wedding of Ch. Sow. B. Pushpalatha and Ch. Ry. G. Gokul. Guests open one public link. The page is an invitation they can read, share, save to a calendar, and use for directions. It is not a poster.

English wording, names, dates, and the supplied venue addresses are kept exactly as given. Kannada and Tamil are provided as a language option. A venue stays marked **Awaiting confirmed venue details** only while its address is still empty.

## What guests can do

- The first screen is a P & G wax stamp. Tap the stamp to unfold the paper. The butterfly screen stays until **Continue** is clicked. A plain copy is shown when JavaScript is unavailable.
- Read the invitation, the three celebrations, and a live countdown to the muhurtham (11 November 2026, 6:00 AM, Asia/Kolkata).
- Open the Bengaluru reception in Google Maps, get directions, copy the address, share the location, or scan the QR code.
- Add each celebration to Google Calendar, or download an `.ics` file.
- Share the page on WhatsApp, copy the link, or use the phone’s share menu.
- Look through the photograph frames. Real pictures appear when you add them.
- Print the invitation, or choose **Save as PDF** in the print dialog. It is laid out for A5 portrait, two pages.
- Switch among English, Kannada, and Tamil.
- Play or pause a quiet background drone. Music never starts by itself.

The Chennai reception and the wedding ceremony do not offer map buttons until you add a confirmed venue.

## Edit the wedding

All names, blessings, dates, times, venues, and translations live in `src/data/weddingConfig.ts`.

| What you want to change | Where |
| --- | --- |
| Wording, names, translations | `copy` in `weddingConfig.ts` |
| A date or time | the matching item in `events` |
| Chennai closing time | `events` → `chennai-reception` → `end`, as `"HH:mm"` |
| A confirmed venue | `venueName`, `address`, and `mapsUrl` on that event |
| Bengaluru address or map | `BENGALURU_ADDRESS` and `MAPS_URL` |
| Chennai and muhurtham address or map | `CHENNAI_ADDRESS` and `CHENNAI_MAPS_URL` |
| Photographs | `photographs`, and the files in `public/images/` |
| Your own music | `music.src`, usually `"/audio/music.mp3"` |
| RSVP | `rsvp.endpoint`, an `https://` address that accepts a JSON POST |

Times are 24-hour and interpreted in Asia/Kolkata. Leave `end`, `venueName`, `address`, or `mapsUrl` as `null` until that detail is confirmed. The calendar will not invent a closing time while `end` is null. For Chennai, the file records the 6:00 PM start and puts the music and dinner times in the description.

The Bengaluru map link must stay:

`https://maps.app.goo.gl/WYPcB7q9DJuc2n3r9`

The Bengaluru address must stay:

`63/1, Kachohalli Main Rd, opp. to HP petrol bunk, Kempegowdanagar, Byadarahalli, Bengaluru, Karnataka 562162`

The Chennai reception and the muhurtham share this address and map link:

`356, 1C, Kundrathur Main Rd, Madhanandapuram, Chennai, Tamil Nadu 600125`

`https://maps.app.goo.gl/cHtGdWoD3weMy2EY9`

## Photographs

The gallery frames are empty on purpose. They are not pictures of the couple. Replace them with your own files:

| File | Use |
| --- | --- |
| `public/images/01-hero.jpg` | Large photograph |
| `public/images/02-portrait.jpg` | Portrait |
| `public/images/03-together.jpg` | Portrait |
| `public/images/04-candid.jpg` | Landscape |
| `public/images/05-details.jpg` | Square |
| `public/images/06-celebration.jpg` | Landscape |

About 1600 pixels wide is enough for the hero, and about 1200 for the others. JPG or WebP both work; if you change the extension, change the path in `photographs` as well. Then set `alt` to a short description and `caption` if you want a line under the picture.

The same filenames are listed in `public/images/REPLACE-PHOTOS.txt`.

## Music and RSVP

**Play music** plays `public/audio/music.mp3`. It does not start by itself. Press the button again to pause it. Use music you have the right to share.

The RSVP form stays hidden until `rsvp.endpoint` is an `https://` URL. A Formspree endpoint or a Google Apps Script web app is enough. The form posts JSON:

```json
{ "name": "", "guests": 2, "events": ["wedding-ceremony"], "message": "", "locale": "en" }
```

## Run it locally

```bash
npm install
npm test
npm run dev
```

Open the address Vite prints, usually `http://localhost:5173/`.

```bash
npm run build
npm run preview
```

`npm test` checks the invitation wording, the Asia/Kolkata countdown, the calendar files, the map links, and the QR code. The QR test draws the Bengaluru code and reads it back. It must contain `https://maps.app.goo.gl/WYPcB7q9DJuc2n3r9` and nothing else.

## Publish the public link

The site is a static Vite build. The output folder is `dist`.

**Vercel:** import the project, leave the framework as Vite, and deploy. `vercel.json` already sets the build command to `npm run build` and the output to `dist`.

**Netlify:** the repository includes `netlify.toml` with the same build command and publish folder. Deploy, then copy the site URL.

Send that URL on WhatsApp. The **Share on WhatsApp** button uses the address of whatever page the guest is viewing, so once the site is published the message contains the public link.

Before you share it, set any confirmed venues and the Chennai closing time, and add the photographs if they are ready.

## Print

**Print / Save as PDF** opens the browser print dialog. Choose A5 if it is offered, portrait, and turn on background graphics so the ivory, magenta, and gold print. Save as PDF from that dialog.

Page 1 is the invitation, the wedding ceremony, and the Chennai reception. Page 2 is the Bengaluru reception, the full address, and the directions QR code. Buttons and the music control are left out of the print.

## Interaction checklist

- The first screen shows the P & G stamp. After the paper opens, the butterfly screen waits until **Continue** is clicked. Music does not start on its own.
- Invitation text matches the supplied English wording, including Govindaraji.
- Countdown reaches 11 November 2026, 6:00 AM India time, and shows a celebration message at that moment instead of a negative number.
- Chennai lists 6:00 PM, 7:00 PM, and 7:30 PM at 356, 1C, Kundrathur Main Rd, Madhanandapuram, Chennai, Tamil Nadu 600125. It has no invented closing time.
- The wedding ceremony is 6:00 AM–7:30 AM at the same Chennai address.
- Bengaluru shows Asthitva Teak Meadows, the full supplied address, and the supplied map link.
- **View on Map** for Bengaluru opens `https://maps.app.goo.gl/WYPcB7q9DJuc2n3r9`.
- **View on Map** for Chennai and the muhurtham opens `https://maps.app.goo.gl/cHtGdWoD3weMy2EY9`.
- **Get Directions** opens Google Maps directions to that same link.
- **Copy Address** copies the supplied address.
- **Share Location** uses the device share menu, or copies the map link.
- The QR code is black on white, has a quiet margin, is captioned SCAN FOR DIRECTIONS, and scans to the map link. `npm test` checks this.
- Each event can be added to Google Calendar and downloaded as `.ics`. Chennai starts at 6:00 PM and does not invent an end time.
- Gallery frames open, move previous and next, accept a swipe, and close. They do not pretend to be the couple.
- WhatsApp, copy link, share, and print each do what they say.
- English, Kannada, and Tamil all show the same couple.
- The printed invitation fits two A5 pages without cutting the names, the address, or the border.
