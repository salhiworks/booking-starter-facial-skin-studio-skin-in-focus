# Facial & Skin Studio "Skin in Focus" Starter — project rules

A one-page booking website for an independent esthetician, shipped as **Morrow Skin Studio** (a
fictional one-room, one-esthetician skin studio in Rockridge, Oakland: a signature facial, a hydration
facial, a calm & reset facial, an express facial, a facial massage and a skincare consultation) for
the owner to make their own. Its identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is the prompt
that personalizes it. Built around **@profitstudio/booking-engine** **2.0.1** (pinned; lock in
`booking-engine.lock.json`). The engine owns booking; this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll review your appointment and confirm the time shortly.",
  confirmed → "Your appointment is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- Read the engine's answer strictly (`src/lib/bookingStatus.ts`): say "booked" only when `status === 'confirmed'`
  and "request received" only when it is `'pending'` — never treat "not pending" as booked. `BOOKING_INACTIVE`
  (the code was accepted earlier, but the request was declined, cancelled or not confirmed in time) is never a
  success: show "This request is no longer active. Please choose a new time or contact the business." with the
  reference, go back to the times, and forget the remembered code so no recovery path verifies it again.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one appointment: a reserved block of the esthetician's time with one client, on one
calendar (one esthetician, one treatment table).** Its length is the real time on the table. Prices
are paid at the studio — never online. The esthetician reviews and confirms every request
(`autoConfirm: false`).

**Cosmetic, not medical.** Facials here are cosmetic, non-medical skin care. Never diagnose, never
name a skin condition as something a treatment treats, never promise or imply results ("glowing",
"clear", "anti-ageing", "flawless"), never use clinical framing (patients, prescriptions,
medical-grade). The *Good for:* line describes the client's situation in their own terms ("skin that
feels tight or dry", "a lunch break") — never a condition. Anything medical (under a doctor's care for
skin, pregnancy, a recent procedure, a changing mole) → "check with your doctor first and tell us
before your appointment". The booking system screens nobody and the site never implies it does.

A new booking feature needs a new engine version — never custom database code or browser-side logic:

- intake, consent or health forms, allergy or medication records, skin-analysis records or client
  photo histories;
- linked bookings (a consultation that unlocks a facial), courses or series of sessions;
- deposits, cancellation fees, packages, memberships, gift cards, product sales or any online payment;
- several estheticians or calendars, room allocation.

The booking notes field is **Anything we should know? (optional)** with the helper "For example how
your skin has felt lately, or whether this is your first facial. Please don't include medical details
here — if you're under a doctor's care for your skin or pregnant, tell us when we confirm." Never ask
for health, allergy, medication or pregnancy details in the form. Proposed engine work:
`docs/ENGINE-PROPOSAL-facial-skin.md` in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/Los_Angeles`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample treatments, hours, policies; "clients"/"appointments") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Groups (Facials · Massage · Also by appointment · the consultation, from the name, then the description), index order, the photograph per treatment (`photoKindOf`), the consultation (`consultationService`, owner's name via `setConsultName`), "Good for:" parsing, length and price terms | `src/lib/services.ts` |
| What the owner can edit (every text, photo and caption — hero photo, the six treatment photos, three skin-in-detail photos, the studio room and a moment in it, four visit photos, booking photo — the consultation heading/text/service name, studio facts, visit moments, approach points, questions & policies, booking words, finding-us note, logo, accent colour) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variable (`--accent`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero `#top` (live "from" price), TreatmentIndex `#treatments` (two featured · tiles · consultation), SkinDetail `#skin`, Studio `#studio`, Expect `#your-visit` (four moments), Approach `#approach`, GoodToKnow `#questions`, BookingSection `#book` (persimmon band), Visit `#visit`, Footer); scroll reveals `src/lib/reveal.ts` (`data-reveal`); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated by `concepts/facial-skin-studio-skin-in-focus/photo-pipeline/photos.mjs`) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Treatments, prices,
  lengths, hours, the address, phone and email are NOT content: they come from the engine.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A treatment row's Book
  passes that service's engine id (the consultation row too) — never a stored price or id.
- **Lengths and prices:** always from the engine (`minutesLabel`, `durationLabel`, `priceLabel`, `priceTerms`).
  Never hard-code a treatment, length, price or id in copy (questions and visit steps included — the
  visit steps describe a typical facial in minutes the owner sets, not a service's engine length).
- **Sample photos:** every photo carries a "Sample photo" label until the owner replaces that field
  (`ownerFields`). Never present a stock photograph as the studio's work or a client's result, never
  show before/after images, never invent a client, a name, a licence, qualifications, years of
  experience, awards, press, reviews or testimonials.
- **Default photos:** add variants to `public/photos/` via the photo pipeline, keep the default `src`
  in `site.ts` equal to a key in `photoVariants.ts`, record the source in `PHOTOS.md`. If the
  first-screen default changes, update both `<link rel="preload">` in `index.html` (`imagesizes` must
  match `HERO_SIZES` / `SMALL` in `src/components/Hero.tsx`).
- **Policies:** Questions & policies shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** calm, plain, specific ("we look at your skin in daylight…"); no "flawless", "perfect",
  "luxury", "transform", "glow up", no result promises, no pressure, no clinical words.
- **Style:** plain CSS with the tokens; no UI kit. 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, every text/background pair at 4.5:1 (`contrast.mjs`). The button colour
  is owner-editable and always carries white text (`--on-accent`). Photographs square-cornered;
  controls crisp (2 px).
- **Composition:** photography leads (DESIGN.md): large, warm, closely cropped frames on a 12-column
  grid; one grotesk at campaign scale; no ornaments, icons or beauty clip-art, no gradients, no gold,
  no serif headlines. Motion is limited to the photo reveals, the hero settle and hover zooms — all
  off under `prefers-reduced-motion`; never hide content without `html.js-reveal`.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5203 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
