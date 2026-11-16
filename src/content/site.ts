import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Treatments, prices, lengths, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 *
 * Headings may wrap words in *asterisks*: those words are set light, in the
 * accent colour (Emphasis).
 *
 * Copy rules (CLAUDE.md): facials here are cosmetic, non-medical care — no
 * diagnoses, no treating conditions, no promised results, no invented
 * credentials, reviews or awards.
 */
const SAMPLE_HELP =
  'A “Sample photo” label stays on it until you replace it with your own photo — use only photos of your own studio and work (with your client’s permission) or photos you have the right to use. Never show before/after pictures or another studio’s work as yours.';

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const L = (name: string, alt: string): Img => ({ src: `/photos/${name}-960.webp`, alt, width: 960, height: 640 });
const T = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 600 });
const Q = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 800 });
const EMPHASIS = 'Wrap a word or two in *asterisks* to set them light, in the accent colour.';
const T_PHOTO = `Shown with treatments of this kind in the facials section. Landscape (4:3), with some room around the subject. ${SAMPLE_HELP}`;

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo and the colour of the main buttons.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and, very large, in the footer. One word reads best.',
          default: 'Morrow',
          maxLength: 22,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name mark',
          help: 'What you are, in two or three words. Shown small beside the name.',
          default: 'Skin Studio',
          maxLength: 28,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header is a warm off-white. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Accent colour',
          help: 'The main buttons, selected choices and the light highlighted words. Buttons carry white text, so pick a deep colour — persimmon (the original), clay, oxblood, deep plum, ink. Light colours are refused because white text would not read on them.',
          default: '#b04a2e',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
      ],
    },
    {
      id: 'hero',
      label: 'First screen',
      description: 'The headline, a short introduction and the main photograph.',
      fields: [
        { type: 'text', id: 'hero.kicker', label: 'What you are', default: 'Facial & skin studio', maxLength: 40 },
        { type: 'text', id: 'hero.place', label: 'Where you are', help: 'A neighbourhood and city.', default: 'Rockridge, Oakland', maxLength: 40 },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: `Short — it is set very large. Say what you stand for, not a promise about results. ${EMPHASIS}`,
          default: 'Skin, *in focus.*',
          maxLength: 40,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'Unhurried facials by one esthetician, in one quiet room above College Avenue. Every step chosen for your skin on the day — nothing rushed, nothing oversold.',
          maxLength: 220,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', default: 'Book a facial', maxLength: 28, required: true },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (square)',
          help: `Square, shown beside the headline (cropped upright on phones, so keep the subject near the middle). Real skin in good light works best. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-campaign-1200.webp',
            alt: 'A woman in a cream robe in warm window light, touching her jaw and holding a small jar of cream, a band of shadow on the wall behind her.',
            width: 1200,
            height: 1200,
          },
          aspectRatio: 1,
        },
      ],
    },
    {
      id: 'index',
      label: 'Facials',
      description:
        'The words and photographs around your treatments. The treatments themselves — names, descriptions, lengths and prices — are edited in Services; the first two are featured large. A description can end with “Good for: a first visit”, shown as its own line.',
      fields: [
        { type: 'text', id: 'index.title', label: 'Heading', help: EMPHASIS, default: 'Choose your *facial.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'index.intro',
          label: 'Introduction',
          default: 'Every appointment starts with a close look at your skin. Lengths are the real time on the table; prices are paid at the studio.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'text', id: 'index.consultTitle', label: 'Consultation — heading', default: 'Not sure where to start?', maxLength: 48 },
        {
          type: 'longText',
          id: 'index.consultText',
          label: 'Consultation — text',
          help: 'Shown with the consultation’s length and price from Services. Keep it honest: a skincare consultation is a cosmetic conversation, not a medical assessment.',
          default: 'Bring the products you use now. We’ll look at your skin together and suggest a facial — or tell you that you don’t need one. It isn’t a medical assessment.',
          maxLength: 260,
          rows: 3,
        },
        {
          type: 'text',
          id: 'index.consultService',
          label: 'Consultation service (exact name in Services)',
          help: 'Leave empty to find it by name (“Skincare Consultation”). If you rename it, write the new name here.',
          default: '',
          maxLength: 120,
        },
        {
          type: 'image',
          id: 'index.photoSignature',
          label: 'Photo — facials',
          help: T_PHOTO,
          default: T('t-signature', 'Two hands resting on a client’s forehead during a facial; a thin cream mask covers her skin.'),
          aspectRatio: 4 / 3,
        },
        {
          type: 'image',
          id: 'index.photoHydration',
          label: 'Photo — hydrating facials',
          help: T_PHOTO,
          default: T('t-hydration', 'A swirl of rich white cream on a warm apricot background.'),
          aspectRatio: 4 / 3,
        },
        {
          type: 'image',
          id: 'index.photoCalm',
          label: 'Photo — calming facials',
          help: T_PHOTO,
          default: T('t-calm', 'An esthetician’s hands resting at a client’s jaw as she lies with her eyes closed, candles glowing behind.'),
          aspectRatio: 4 / 3,
        },
        {
          type: 'image',
          id: 'index.photoExpress',
          label: 'Photo — short facials',
          help: T_PHOTO,
          default: T('t-express', 'An esthetician brushing a pale clay mask onto a client’s face with a wooden brush.'),
          aspectRatio: 4 / 3,
        },
        {
          type: 'image',
          id: 'index.photoMassage',
          label: 'Photo — massage',
          help: T_PHOTO,
          default: T('t-massage', 'Hands supporting a client’s neck and head in a slow massage on a warm, linen-covered table.'),
          aspectRatio: 4 / 3,
        },
        {
          type: 'image',
          id: 'index.photoConsult',
          label: 'Photo — consultation',
          help: T_PHOTO,
          default: T('t-consult', 'An esthetician in a dark green top sitting on the edge of a treatment table by tall loft windows, smiling.'),
          aspectRatio: 4 / 3,
        },
        {
          type: 'text',
          id: 'index.footnote',
          label: 'Small print under the facials',
          default: 'Facials here are cosmetic, non-medical treatments. How your skin feels afterwards varies from person to person.',
          maxLength: 180,
        },
      ],
    },
    {
      id: 'detail',
      label: 'Skin in detail',
      description: 'An image-led moment: three photographs and a few words about how you see skin.',
      fields: [
        { type: 'text', id: 'detail.title', label: 'Heading', help: EMPHASIS, default: 'Real skin. *Real light.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'detail.text',
          label: 'Text',
          default:
            'We look at skin as it is — up close, in daylight, without filters. Texture, freckles, the odd breakout: all of it is normal, and none of it needs fixing in an hour.',
          maxLength: 260,
          rows: 3,
        },
        {
          type: 'image',
          id: 'detail.photo1',
          label: 'Photo 1 (upright, large)',
          help: `Upright (4:5), shown large. ${SAMPLE_HELP}`,
          default: P('detail-skin', 'An extreme close-up of an eye, brow and cheek, with natural skin texture visible in soft light.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'detail.caption1', label: 'Photo 1 — caption', default: 'Up close, in daylight', maxLength: 48 },
        {
          type: 'image',
          id: 'detail.photo2',
          label: 'Photo 2 (wide)',
          help: `Wide (3:2). ${SAMPLE_HELP}`,
          default: L('detail-light', 'An eye and a strand of hair crossed by stripes of window light and shadow.'),
          aspectRatio: 3 / 2,
        },
        { type: 'text', id: 'detail.caption2', label: 'Photo 2 — caption', default: 'Window light, mid-morning', maxLength: 48 },
        {
          type: 'image',
          id: 'detail.photo3',
          label: 'Photo 3 (upright, small)',
          help: `Upright (4:5). ${SAMPLE_HELP}`,
          default: P('detail-cleanse', 'A woman in a cream robe pressing a cotton pad to her cheek in warm window light.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'detail.caption3', label: 'Photo 3 — caption', default: 'Cleanse first, always', maxLength: 48 },
      ],
    },
    {
      id: 'studio',
      label: 'The studio',
      description: 'The room and the person who works in it. Write only what is true — no invented qualifications, years or awards.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Heading', help: EMPHASIS, default: 'One room. *One esthetician.*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'A single treatment room on the second floor, with tall windows and no front desk. The same esthetician sees you from your first visit on, and keeps short notes on what your skin liked — so each facial builds on the last.',
          maxLength: 420,
          rows: 4,
        },
        {
          type: 'list',
          id: 'studio.facts',
          label: 'Facts',
          itemLabel: 'Fact',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'label', label: 'Label', default: '', maxLength: 24, required: true },
            { type: 'text', id: 'value', label: 'Value', default: '', maxLength: 40, required: true },
          ],
          default: [
            { label: 'Appointments', value: 'One client at a time' },
            { label: 'Your esthetician', value: 'The same one, every visit' },
            { label: 'Products', value: 'Fragrance-free options on hand' },
          ],
        },
        {
          type: 'image',
          id: 'studio.photo',
          label: 'Photo — the room (wide)',
          help: `Wide (3:2): the room itself. ${SAMPLE_HELP}`,
          default: L('studio-room', 'A loft treatment room with tall black-framed windows: an esthetician in a dark green top talks with a client beside the treatment table.'),
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'studio.detail',
          label: 'Photo — a moment in the room (upright)',
          help: `Upright (4:5): a treatment in progress, a corner of the room, your hands at work. ${SAMPLE_HELP}`,
          default: P('studio-window', 'An esthetician in a white T-shirt giving a facial by the window, candles on a small table beside the treatment bed.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'studio.caption', label: 'Caption', default: 'Second floor, north light', maxLength: 60 },
      ],
    },
    {
      id: 'expect',
      label: 'Your visit',
      description: 'What happens during a facial, in up to four moments — each with a photograph.',
      fields: [
        { type: 'text', id: 'expect.title', label: 'Heading', help: EMPHASIS, default: 'Your hour, *in four moments.*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'expect.intro',
          label: 'Introduction',
          default: 'A Signature Facial from start to finish. The others follow the same shape — shorter, slower or with fewer steps.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'list',
          id: 'expect.steps',
          label: 'Moments',
          help: 'Up to four, shown with photos 1–4 in order. Minutes are optional.',
          itemLabel: 'Moment',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 28, required: true },
            { type: 'text', id: 'minutes', label: 'Minutes', default: '', maxLength: 4 },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 160, rows: 2 },
          ],
          default: [
            { title: 'Talk & look', minutes: '10', text: 'How your skin has felt and what you use at home. Then a close look in daylight, in plain words.' },
            { title: 'Cleanse', minutes: '10', text: 'A double cleanse and a gentle exfoliation chosen for today. Extractions only if you’d like them.' },
            { title: 'Mask & massage', minutes: '30', text: 'A mask, and while it works, slow face, neck and shoulder massage. Most people close their eyes here.' },
            { title: 'Finish', minutes: '10', text: 'Moisturiser and SPF, a glass of water and a note of what we used — so you can find it again.' },
          ],
        },
        { type: 'image', id: 'expect.photo1', label: 'Photo 1 (square)', help: `Square. ${SAMPLE_HELP}`, default: Q('step-talk', 'An esthetician leaning over a client on the treatment table, talking with her before a facial.'), aspectRatio: 1 },
        { type: 'image', id: 'expect.photo2', label: 'Photo 2 (square)', help: `Square. ${SAMPLE_HELP}`, default: Q('step-cleanse', 'Hands resting at a client’s temples as she lies with her eyes closed.'), aspectRatio: 1 },
        { type: 'image', id: 'expect.photo3', label: 'Photo 3 (square)', help: `Square. ${SAMPLE_HELP}`, default: Q('step-mask', 'A client resting with a pale clay mask on her face and a soft band holding back her hair.'), aspectRatio: 1 },
        { type: 'image', id: 'expect.photo4', label: 'Photo 4 (square)', help: `Square. ${SAMPLE_HELP}`, default: Q('step-finish', 'A woman in a cream robe touching her cheek and holding a small jar of cream in window light.'), aspectRatio: 1 },
      ],
    },
    {
      id: 'approach',
      label: 'Approach',
      description: 'How you work — and where your work stops.',
      fields: [
        { type: 'text', id: 'approach.title', label: 'Heading', help: EMPHASIS, default: 'Skin care, *not skin claims.*', maxLength: 56, required: true },
        {
          type: 'list',
          id: 'approach.points',
          label: 'Points',
          itemLabel: 'Point',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 40, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 200, rows: 3 },
          ],
          default: [
            { title: 'Said plainly', text: 'We describe what we see and feel at the table in everyday words. We don’t diagnose, and we don’t promise results.' },
            { title: 'Gentle before strong', text: 'The mildest step that could help comes first. We build over visits, not in one sitting — and if something stings, we stop.' },
            { title: 'Used, not pushed', text: 'You’ll hear what we used and why. If your routine at home works, we’ll say so.' },
            { title: 'We know where we stop', text: 'A changing mole, a rash that won’t settle, breakouts that hurt — that’s for a doctor or dermatologist, and we’ll say so.' },
          ],
        },
        {
          type: 'longText',
          id: 'approach.note',
          label: 'Small print',
          default:
            'If you’re under a doctor’s care for your skin, are pregnant, or have recently had a cosmetic or medical procedure, please check with your doctor first and tell us before your appointment.',
          maxLength: 260,
          rows: 3,
        },
      ],
    },
    {
      id: 'faq',
      label: 'Questions & policies',
      description: 'Practical answers before a first visit. Until you edit them they are labelled “Sample policies”.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Heading', help: EMPHASIS, default: 'Good to *know.*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 90, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'Which facial should I book first?',
              answer:
                'The Signature Facial if you’d simply like a facial; the Skincare Consultation if you’d rather talk first. If you book the wrong one, tell us when we confirm and we’ll swap it if the time allows.',
            },
            {
              question: 'Is a facial a medical treatment?',
              answer:
                'No. Facials here are cosmetic, non-medical skin care. We can’t diagnose or treat skin conditions, and we’ll suggest seeing a doctor or dermatologist if something looks like it needs one.',
            },
            {
              question: 'How should I prepare?',
              answer:
                'Come as you are — makeup is fine, we cleanse first. If you use a retinoid or exfoliating acids, pause them for two or three days before, unless your doctor has told you otherwise.',
            },
            {
              question: 'Do you need my medical details?',
              answer:
                'Not when you book — please don’t put them in the booking form. At your first visit we ask a few short questions about the products you use. If you’re pregnant or under a doctor’s care for your skin, check with your doctor first and tell us before your appointment.',
            },
            {
              question: 'What if I need to cancel?',
              answer:
                'Please let us know at least 24 hours before so someone else can have the time. Arriving more than 15 minutes late may mean a shorter facial or a new time.',
            },
            {
              question: 'How do I pay?',
              answer: 'At the studio, after your appointment, by card or cash. Nothing is paid online, and there are no deposits.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The closing booking band and the top of the booking sheet.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Heading', help: EMPHASIS, default: 'Book your *facial.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a treatment and a time. Every request is read and confirmed by the esthetician, usually within a day.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'image',
          id: 'book.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5), beside the closing booking band. Remove it for text only. ${SAMPLE_HELP}`,
          default: P('book-hands', 'Two hands cradling a client’s face during a facial, candlelight glowing behind.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Hours, address, phone and email come from your Business settings. Add how to find you.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Heading', help: EMPHASIS, default: 'Find the *studio.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'The blue door beside the stationery shop, then up one flight of stairs — Suite 2 is on the right. Metered parking on College Avenue; Rockridge BART is a six-minute walk.',
          maxLength: 400,
          rows: 3,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [{ type: 'text', id: 'footer.tagline', label: 'Line under the name', default: 'Facial & skin studio · Rockridge, Oakland', maxLength: 80 }],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Morrow Skin Studio — facials in Rockridge, Oakland',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An independent skin studio in Rockridge, Oakland: signature, hydration, calming and express facials, facial massage and skincare consultations with one esthetician. Book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
  ],
});
