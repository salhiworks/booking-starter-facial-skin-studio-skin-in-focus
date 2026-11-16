# Skin in Focus — the visual system

A contemporary skincare campaign for an independent studio. Warm bone pages, sand panels and the deep
espresso of a darkened treatment room; one persimmon accent — warm skin in late light — for the
actions and a few chosen words. **Photography is the protagonist**: large, warm, close, cropped with
intent. One modern grotesk, used at campaign scale. No serif headlines, no ornaments, no gradients.

## Tokens (src/styles/tokens.css — the only file with raw values)

| | |
|---|---|
| Bone `--paper` #f4efe9 | the page |
| Sand `--oat` #e9e1d7 | Your visit, the consultation panel, the booking summary |
| Espresso `--ink` #1c1714 · `--forest` #1f1915 | type · Skin in detail, the booking sheet's header, the footer |
| Persimmon `--accent` #b04a2e | buttons, highlighted words, numerals, the booking band (owner-editable; white text 5.4:1, as text 4.75:1 on bone) |
| Apricot `--accent-glow` #e9a07f | the accent on espresso (8:1) |
| Muted `--muted` #6b5f56 | secondary text (5.4:1 on bone, 4.8:1 on sand) |

Type: **Host Grotesk** (variable 300–800) for everything. Display at weight 560 with tight tracking
(−0.045em) and campaign scale (the first screen up to 9.5 rem); a heading's *emphasised* words drop to
weight 300 in persimmon — the one typographic gesture. Labels: 12 px spaced capitals after a persimmon
dot. Actions are soft pills.

## Composition, section by section

- **Header:** wordmark (Morrow, weight 640, tight) + small "Skin Studio"; four links with a drawn
  underline on hover; a persimmon *Book a facial* pill. Sticky, translucent bone.
- **First screen:** inside the same centred shell as every section (page max 88 rem + gutters; the
  header bar uses it too), so wide monitors get wider outer margins, never a wider composition. A
  44 / 56 grid with a fluid gap (2–4.5 rem): the text group (where · headline · introduction · Book +
  live "Facials from $85") centred against a near-square photograph whose height is capped by the
  screen. The headline scales with width *and* height (`min(6.6vw, 15vh)`, max 8 rem). Phones use an
  upright crop (≤ 46 svh; ≤ 32 svh on short phones) with the headline on a bone panel overlapping it.
- **Facials:** two featured facials side by side (4:3 photographs, the second set a little lower),
  then the rest as three 4:3 tiles under one rule, then the consultation on a sand panel whose
  photograph fills its side without setting the panel's height. Phones: tiles become rows with a
  square thumbnail.
- **Skin in detail (espresso):** one block — a deliberate macro close-up over four columns on the
  left, filling the full height of the right column (the words, then the wide window-light frame and
  the small cleanse), so both sides end on one line.
- **The studio:** headline and a short paragraph; the room (4:3) on the left; a square photograph of
  a facial in progress by the window beside it, and three facts on rules beneath — a different moment
  from the room, not a second portrait.
- **Your visit (sand):** four square photographs with number, minutes, title and one line, every
  other one set 3 rem lower; a sideways snap row below 1024 px.
- **Approach, questions, visit:** compact padding; typographic.
- **Booking band (persimmon):** the colour runs edge to edge; inside the shell the photograph starts
  on the shared content line and fills the left 5/12 at the band's own height; "Book your *facial.*", three short steps, a bone *Choose a treatment* pill.
- **Footer:** the name sized from its own length to span the page (capped at 28 rem).

## Spacing

Three section paddings and one heading gap (tokens.css): `--section-pad-feature` for the image-led
moments (skin in detail, booking band), `--section-pad` for facials, studio and your visit,
`--section-pad-compact` for approach, questions and visit; `--head-gap` between a section's heading
block and its content. Section titles use `--text-3xl` (2.5 → 5 rem).

## Motion

Photographs settle as they enter the screen (a 3 % clip opening and a 1.025 → 1 scale, 0.9–1.2 s,
`src/lib/reveal.ts` + `data-reveal`); the hero photograph fades in once on load (no scaling); treatment photos zoom
2 % on hover or keyboard focus; arrows nudge on hover. No library. Under `prefers-reduced-motion`
nothing is hidden or animated (the reveal class is never set), and without JavaScript every image is
simply visible.

## Rules

44 px tap targets, visible focus (2 px espresso ring; white on espresso and persimmon), every
text/background pair ≥ 4.5:1 (checked with `concepts/facial-skin-studio-skin-in-focus/contrast.mjs`).
Photographs square-cornered; actions as pills.
