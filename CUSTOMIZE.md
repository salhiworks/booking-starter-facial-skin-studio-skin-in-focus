# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session opened in
this folder. It changes identity and words only, so it finishes in one short session.

```text
Customize this facial & skin studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Los_Angeles>
How I work and my personality in a few words: <e.g. gentle, unhurried facials for sensitive-feeling skin; plain-spoken>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark and the line
   beside it, what I am and where, the headline (short — it is set very large), introduction and
   main button, the facials heading, introduction, consultation heading and text and the small print,
   the skin-in-detail heading, text and captions, the studio text, facts and caption, the four visit
   moments (titles, minutes, texts), the approach points and note,
   the questions & policies (my real policies), the booking heading and introduction, the
   finding-us note, the footer line and the search title and description. Keep field ids, types,
   limits and photos. Keep the sample photos (they stay labelled "Sample photo" until I upload my own).
   Keep the honesty rules: facials are cosmetic, non-medical care — no diagnoses, no treating
   conditions, no promised results; the booking form never asks about health, medication or
   pregnancy, and the site never suggests the booking system checks anyone's suitability; anything
   medical → "check with your doctor first and tell us before your appointment"; nothing is paid
   online; no treatment lengths or prices written into the copy; no invented clients, results,
   before/after photos, licences, qualifications, years of experience, awards, press, reviews or
   testimonials.
4. Only if persimmon clearly doesn't fit my brand (otherwise skip this step): change the default
   of brand.accent in src/content/site.ts (a deep colour that keeps white text at 4.5:1 — clay,
   oxblood, deep plum, ink), the colours in src/admin-theme.css and the colour in public/favicon.svg.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent treatments, prices, opening hours or credentials I haven't told you about —
treatments, prices and hours are set in the dashboard. When done, run npm run build and fix any
error, then show me the result with npm run dev.
```

## After the prompt

- **Your treatments:** dashboard → Services. One booking is one appointment with you.
  - **Groups.** The index sorts services by the words in their names: *consultation, consult, skin
    check-in, first look* → **the consultation** (set apart at the end); *massage, lymphatic, gua
    sha, sculpt* → **Massage** ("Facial Massage" counts as massage); *facial, peel, mask, cleanse,
    hydra…, glow, extractions* → **Facials**. Otherwise the description decides, then "Also by
    appointment".
  - **Featured:** the first two services (Services order, consultation aside) are shown large.
  - **The photograph** each treatment shows follows the same words: *express / mini / quick* → short
    facials; *hydra… / moisture / dry* → hydrating; *calm / soothing / sensitive / reset / gentle* →
    calming; massage; consultation; everything else → the signature facial photo. Replace any of the
    six in Website → Facials.
  - **Who it's for.** End a description with `Good for:` — `Good for: a first visit`. Describe the
    client's situation, never a skin condition or a result.
  - **The consultation** is its own short service. Renamed it? Write the new name in Website →
    Facials → *Consultation service*.
- **Your visit:** Website → Your visit — up to four moments, each with its photo; minutes are optional.
- **Headings:** wrap a word or two in *asterisks* to set them light, in the accent colour.
- **Photos:** Website → each section. Use only your own studio and work (with your client's
  permission) or photos you have the right to use. The "Sample photo" label disappears from each one
  you replace.
- **Online booking:** dashboard → Settings, once email sending works (see BOOKING_ENGINE.md).
