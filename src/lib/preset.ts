import type { Preset } from '@profitstudio/booking-engine';

/**
 * Morrow Skin Studio's own preset (INTEGRATION.md §5): the sample treatments,
 * hours and policies preview mode shows, and the starter set the dashboard
 * offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE appointment: a reserved block of
 * the esthetician's time with ONE client, on the studio's one calendar (one
 * esthetician, one treatment table). Its length is the real time on the table.
 * The esthetician reviews and confirms every request (`autoConfirm: false`).
 *
 * WHAT A FACIAL IS HERE. Cosmetic, non-medical skin care. Nothing in a service
 * description diagnoses, treats a condition or promises a result, and the booking
 * form never asks health questions (see CLAUDE.md).
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the price of that
 * appointment, paid at the studio — never online. Zero reads as free.
 *
 * A description may end with "Good for: …" — who the treatment usually suits, in
 * the client's own terms. The website shows it as its own line (src/lib/services.ts).
 */
export const sitePreset = {
  id: 'facial-skin-studio',
  label: 'Facial & Skin Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'appointment', bookings: 'appointments' },
  previewBusiness: {
    name: 'Sample Facial & Skin Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 510-555-0100',
      address: '100 Example Street, Oakland, CA',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 720,
    maxAdvanceDays: 60,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // One esthetician: Tuesday to Saturday, a later Thursday for after work; closed Sunday and Monday.
  workingHours: [
    { weekday: 2, start: '10:00', end: '18:00' },
    { weekday: 3, start: '10:00', end: '18:00' },
    { weekday: 4, start: '12:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '18:00' },
    { weekday: 6, start: '09:00', end: '15:00' },
  ],
  services: [
    {
      name: 'Signature Facial',
      description:
        'A double cleanse, a close look under the lamp, gentle exfoliation, a mask chosen on the day and a long face, neck and shoulder massage. Good for: a first facial here',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 14500,
      priceFrom: false,
    },
    {
      name: 'Hydration Facial',
      description:
        'A slower facial built in layers — enzyme exfoliation, a hydrating mask under warm towels and a longer massage. Good for: skin that feels tight or dry',
      durationMinutes: 75,
      bufferAfterMinutes: 15,
      priceCents: 16500,
      priceFrom: false,
    },
    {
      name: 'Calm & Reset Facial',
      description:
        'Fewer steps and fragrance-free products, with no extractions or acids — cool compresses and slow, light massage. Good for: skin that reacts easily',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 15000,
      priceFrom: false,
    },
    {
      name: 'Express Facial',
      description:
        'Cleanse, exfoliation and a mask while your hands and scalp are massaged, then moisturiser and SPF. Good for: a lunch break',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 8500,
      priceFrom: false,
    },
    {
      name: 'Facial Massage',
      description:
        'No masks, no exfoliation — slow face, scalp, neck and shoulder massage with a light oil, on clean skin. Good for: an hour off your feet',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 9500,
      priceFrom: false,
    },
    {
      name: 'Skincare Consultation',
      description:
        'A conversation at the table, not a treatment: we look at your skin in daylight, talk through your routine and suggest a facial — if any. Good for: choosing where to start',
      durationMinutes: 30,
      bufferAfterMinutes: 10,
      priceCents: 4000,
      priceFrom: false,
    },
  ],
} satisfies Preset;
