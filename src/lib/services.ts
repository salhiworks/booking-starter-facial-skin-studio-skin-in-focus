import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The studio’s facials: its groups (Facials · Massage · Consultation), the photograph each
 * treatment shows in the facials section, who a treatment is usually good for, and honest length and price terms.
 *
 * The engine (2.0.0-beta.4) has no service categories and no per-service metadata, and a service's id
 * is a database UUID this site cannot know when it is built — so everything is read from the
 * service's own engine data:
 *
 *   1. its GROUP, from its NAME, else its DESCRIPTION, else "Also by appointment":
 *        - consult   a consultation      (consultation, consult, skin chat, skin check-in)
 *        - massage   massage on its own ("Facial Massage", lymphatic, gua sha, sculpt) — unless the name also names a facial
 *        - facials   facial, peel, mask, cleanse, hydrat…, glow, express, mini
 *   2. its PHOTO KIND (which photograph it shows in the facials section): consult · massage · hydration · calm ·
 *      express · signature (the default facial);
 *   3. who it is GOOD FOR: the part after "Good for:" in the description;
 *   4. its LENGTH: the real time on the table; its PRICE: paid at the studio, never online; zero is free.
 *
 * The owner can pin which service is the consultation by name (Website → Treatment index), so a renamed
 * consultation stays set apart. Stable categories need an engine version — see
 * docs/ENGINE-PROPOSAL-facial-skin.md in the Niche Pack workspace.
 */
export type GroupId = 'facials' | 'massage' | 'consult' | 'more';
export type PhotoKind = 'signature' | 'hydration' | 'calm' | 'express' | 'massage' | 'consult';

const CONSULT = /\b(consult(?:ation)?s?|skin[- ]?(?:chat|check[- ]?in|plan(?:ning)?)|first[- ]?look)\b/i;
const FACIAL = /\b(facials?|peels?|masks?|cleanse|hydra\w*|glow|dermaplan\w*|extractions?)\b/i;
const MASSAGE = /\b(massage|lymphatic|gua[- ]?sha|sculpt\w*|kobido)\b/i;

const norm = (s: string | null | undefined) => (s ?? '').trim().replace(/\s+/g, ' ').toLowerCase();

/**
 * The owner's own name for the consultation (Website → Treatment index → "Consultation service"), set
 * once per render by App from the published content. Empty = automatic (by name).
 */
let chosenConsult = '';
export function setConsultName(name: string | null | undefined): void {
  chosenConsult = norm(name);
}

function groupFromText(raw: string): GroupId | null {
  if (CONSULT.test(raw)) return 'consult';
  // "Facial Massage" (or "Face Massage") is a massage: the word before "massage" only says where.
  const text = raw.replace(/\b(facial|face)\s+(?=massage)/gi, '');
  if (MASSAGE.test(text) && !FACIAL.test(text)) return 'massage';
  if (FACIAL.test(text)) return 'facials';
  if (MASSAGE.test(text)) return 'massage';
  return null;
}

export function groupOf(service: Pick<Service, 'name' | 'description'>): GroupId {
  if (chosenConsult && norm(service.name) === chosenConsult) return 'consult';
  return groupFromText(service.name) ?? groupFromText(lead(service.description)) ?? 'more';
}

const GROUPS: Record<GroupId, { label: string }> = {
  facials: { label: 'Facials' },
  massage: { label: 'Massage' },
  more: { label: 'Also by appointment' },
  consult: { label: 'Not sure where to start' },
};

/** The order groups are shown in on the page and in the booking sheet. */
const ORDER: GroupId[] = ['facials', 'massage', 'more', 'consult'];

export interface Kind {
  id: GroupId;
  label: string;
  services: Service[];
}

/** Services in their groups, keeping the owner's display order inside each; empty groups are left out. */
export function kinds(services: readonly Service[]): Kind[] {
  const map = new Map<GroupId, Kind>();
  for (const service of services) {
    const id = groupOf(service);
    let k = map.get(id);
    if (!k) {
      k = { id, ...GROUPS[id], services: [] };
      map.set(id, k);
    }
    k.services.push(service);
  }
  return ORDER.flatMap((id) => (map.has(id) ? [map.get(id)!] : []));
}

/** The services in index order (the order of kinds()), so numbers 01, 02… match the page. */
export function indexOrder(services: readonly Service[]): Service[] {
  return kinds(services).flatMap((k) => k.services);
}

/** The consultation among the engine's CURRENT services (owner's chosen name first, then by name), or none. */
export function consultationService(services: readonly Service[]): Service | null {
  return services.find((s) => groupOf(s) === 'consult') ?? null;
}

/** Which photograph a treatment shows (the six "Photo — …" fields in Website → Facials). */
export function photoKindOf(service: Pick<Service, 'name' | 'description'>): PhotoKind {
  const group = groupOf(service);
  if (group === 'consult') return 'consult';
  if (group === 'massage') return 'massage';
  const text = `${service.name} ${lead(service.description)}`;
  if (/\b(express|mini|quick|lunch\w*)\b/i.test(service.name)) return 'express';
  if (/\bhydra\w*|moistur\w*|dry\b/i.test(service.name)) return 'hydration';
  if (/\b(calm|sooth\w*|sensitiv\w*|reset|gentle)\b/i.test(service.name)) return 'calm';
  if (/\bhydra\w*/i.test(text)) return 'hydration';
  return 'signature';
}

export interface Described {
  lead: string;
  /** "A first visit, or choosing between facials" — the part after "Good for:", or null. */
  goodFor: string | null;
}

const GOOD_FOR = /(?:^|[\s.])(?:good for|best for|ideal for)\s*:\s*/i;

function lead(description: string | null | undefined): string {
  return splitDescription(description).lead;
}

/** "…massage. Good for: resting" → { lead: "…massage.", goodFor: "Resting" }. */
export function splitDescription(description: string | null | undefined): Described {
  const text = (description ?? '').trim();
  const m = GOOD_FOR.exec(text);
  if (!m) return { lead: text, goodFor: null };
  const raw = text.slice(m.index + m[0].length).trim().replace(/\.$/, '');
  return {
    lead: text.slice(0, m.index + (m[0].startsWith('.') ? 1 : 0)).trim(),
    goodFor: raw ? raw[0].toUpperCase() + raw.slice(1) : null,
  };
}

/** Kept for the shared booking flow: every appointment is at the studio, so there is no format to show. */
export function formatOf(_service: Pick<Service, 'description'>): { kind: 'studio'; label: string } | null {
  return null;
}

/** Kept for the shared booking flow: treatment names carry no size. */
export function splitName(name: string): { base: string; size: string | null } {
  return { base: name, size: null };
}

export type Role = 'consult' | 'massage' | 'facial';
export function roleOf(service: Pick<Service, 'name' | 'description'>): Role {
  const g = groupOf(service);
  return g === 'consult' ? 'consult' : g === 'massage' ? 'massage' : 'facial';
}

/** "45 min", "1 h 15 min", "2 h" — the appointment's length, straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** Index figures: "60 min", "75 min" — a facial menu reads in minutes up to two hours. */
export function minutesLabel(minutes: number): string {
  return minutes < 120 ? `${minutes} min` : durationLabel(minutes);
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/** What the booking's LENGTH means: the time on the table. */
export interface TimeTerms {
  role: Role;
  label: string;
  note: string | null;
}

export function timeTerms(service: Pick<Service, 'name' | 'description'>): TimeTerms {
  const role = roleOf(service);
  if (role === 'consult') return { role, label: 'Time', note: 'A conversation, not a treatment' };
  return { role, label: 'Time', note: null };
}

type PriceInput = Pick<Service, 'priceCents' | 'priceFrom' | 'currency' | 'name'>;

/** Whole dollars print without ".00" — "$95", not "$95.00". */
const money = (cents: number, currency: string, locale: string) => formatMoney(cents, currency, locale).replace(/([.,])00(?!\d)/, '');

/**
 * What the engine's price MEANS on this site:
 *   free    → no charge
 *   from    → a starting price; the esthetician confirms it before the appointment
 *   fixed   → the price of this appointment, paid at the studio — not online
 *   request → no price shown: ask the studio
 */
export interface PriceTerms {
  kind: 'free' | 'from' | 'fixed' | 'request';
  label: string;
  amount: string;
  note: string | null;
}

export function priceTerms(service: PriceInput, locale: string): PriceTerms {
  if (service.priceCents === null) return { kind: 'request', label: 'Price', amount: 'Ask the studio', note: null };
  if (service.priceCents === 0) return { kind: 'free', label: 'Price', amount: 'Free', note: 'No charge' };
  const amount = money(service.priceCents, service.currency, locale);
  if (service.priceFrom) return { kind: 'from', label: 'From', amount, note: 'Confirmed with you before the appointment' };
  return { kind: 'fixed', label: 'Price', amount, note: null };
}

/** One line: "$95", "from $95", "Free", "Ask the studio". */
export function priceLabel(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  return t.amount;
}
