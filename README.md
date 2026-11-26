# Facial & Skin Studio Booking Website — "Skin in Focus" Starter

A finished, premium booking website for an independent esthetician, ready to make your own with
Claude Code and publish on Hostinger. It ships as **Morrow Skin Studio**, a fictional one-room,
one-esthetician skin studio in Rockridge, Oakland:

- a one-page studio website in the manner of a skincare campaign — a first screen that pairs a
  very large headline with a warm, full-height photograph and **Book a facial** (with the lowest
  facial price live from the booking system); **facials** with the first two featured large and
  the rest as photographed tiles, each with what happens, who it is usually good for, its real
  length and price and its own Book button; the **skincare consultation** set apart for anyone not
  sure where to start; **skin in detail** on espresso; **the studio**; **your visit** in four
  photographed moments; **approach** (including where cosmetic care stops); questions and sample
  policies (labelled); a persimmon booking band; directions — from 320 px phones up, with booking
  in a sheet over the page;
- online booking — **one treatment per booking**, a day and time, contact details and an optional
  note, and an emailed 6-digit code; the esthetician confirms each request;
- the owner dashboard at `/admin/` — requests to confirm, treatments and prices, hours and
  closures, email health, and the website's own text, photos and button colour.

The look — *Skin in Focus*: a contemporary skincare campaign. Warm bone pages, sand and espresso,
one persimmon accent; Host Grotesk at campaign scale; large, warm, closely cropped photography from
one curated set; photographs that settle gently into place as you scroll.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your studio. Claude edits a short list of files
(name, city, words, colours) — the booking system, the dashboard and the layout stay as they are.

Treatments, prices, hours and contact details are **not** code: you set them in the dashboard once
the booking backend is connected. **Your own photographs** go in the dashboard → Website. Each sample
photo stays labelled "Sample photo" until you replace it; use only photos of your own studio and work
(with your client's permission) or photos you have the right to use. Your name, licence, training and
experience are yours to add: the starter invents none.

**A booking is one appointment.** The booking engine books single appointments on one calendar — one
esthetician's time. It does not collect health or intake information, link a consultation to a
facial, sell packages or memberships, take deposits or payments, or run several staff calendars (see
*What the engine does not do* in `CLAUDE.md`). Prices are paid at the studio. Facials here are
cosmetic, non-medical care: the site makes no diagnosis or result claims.

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key (Windows Command Prompt: copy .env.example .env.local)
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and tells you
exactly what is left for you to do (your dashboard login and the two email secrets). Full steps:
the Profit Studio guide *Build a Premium Booking Website with Claude Code*, Step 3, or
`node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt or in
Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web App** from it
(Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero`, `TreatmentIndex` (facials), `SkinDetail`, `Studio`, `Expect` (your visit), `Approach`, `GoodToKnow`, `Visit`…) and its booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample treatments and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How treatments find their group and photograph (by the words in their names), the consultation, "Good for:", lengths and prices |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5203
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef Es-salhi).
Photographs and other third-party assets keep their own terms, listed in [`ASSETS.md`](ASSETS.md)
(the photographs file by file in [`PHOTOS.md`](PHOTOS.md)).
