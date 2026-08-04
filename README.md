# SB Aerials — React + Vite Site

Rebuilt from the original single-file HTML into a proper component-based
project: **React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui +
Framer Motion**.

## Stack

- **Vite** — build tool / dev server
- **React 18 + TypeScript**
- **Tailwind CSS** — utility styling, extended with the brand palette and a
  signature ascent gradient background (`tailwind.config.ts` → `backgroundImage`)
- **shadcn/ui** — `Button` primitive is included in `src/components/ui`;
  add more anytime with `npx shadcn@latest add <component>`
- **Framer Motion** — every scroll-reveal, the hero entrance, mobile menu,
  and lightbox transitions
- **EmailJS** — booking form → your inbox, no backend

## Folder structure

```
sb-aerials/
├── index.html                # Vite entry
├── public/
│   ├── images/logo.png
│   └── videos/flight-01.mp4 … flight-06.mp4
├── src/
│   ├── main.tsx
│   ├── App.tsx                # assembles all sections
│   ├── index.css              # Tailwind layers + brand gradient + tokens
│   ├── data/content.ts        # ⭐ edit copy, services, contact info here
│   ├── hooks/useVideoReel.ts  # shared crossfade video-reel logic
│   ├── lib/utils.ts           # shadcn cn() helper
│   └── components/
│       ├── ui/button.tsx      # shadcn Button
│       ├── Navbar.tsx
│       ├── MobileMenu.tsx
│       ├── Altimeter.tsx
│       ├── Hero.tsx
│       ├── HorizonDivider.tsx
│       ├── VideoShowcase.tsx
│       ├── Stats.tsx
│       ├── Services.tsx
│       ├── Work.tsx
│       ├── Lightbox.tsx
│       ├── About.tsx
│       ├── Bookings.tsx
│       ├── Footer.tsx
│       └── WhatsAppFloat.tsx
```

## Getting started (local machine)

Requires **Node.js 20 LTS or newer**.

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. Hot reload is on — edit any `.tsx` file
and the browser updates instantly.

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Adding more videos

1. Drop new `.mp4` files into `public/videos/`
2. Add their paths to the arrays in `src/data/content.ts`
   (`flightClips`, `heroClipOrder`) — everything else (hero reel, showcase
   reel, gallery grid) updates automatically

## Wiring up the booking form (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com/) and
   connect your Gmail as an **Email Service**
2. Create an **Email Template** using these merge fields: `{{from_name}}`
   `{{mobile}}` `{{from_email}}` `{{service}}` `{{location}}`
   `{{pref_date}}` `{{message}}`
3. Open `src/components/Bookings.tsx` and replace the three constants near
   the top:
   ```ts
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   ```
4. Also update your real email in `src/data/content.ts` (`site.email`) —
   it's shown in the footer

## Editing content

Almost everything text-based — services, stats, nav links, phone number,
Instagram handle, WhatsApp message — lives in **`src/data/content.ts`**.
Change it there and it propagates through every component automatically.

## Deploying

`npm run build` produces a static `dist/` folder — drag it onto
**Netlify**, **Vercel**, or any static host.
