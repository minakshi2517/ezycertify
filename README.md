# Ezycertify Website

Professional certification training website for **Ezycertify** — Making Certification Easy.

## Features

- **Homepage** — GetCertX-style structure (Hero, Partners, Courses, Features, Why Us, Testimonials)
- **10 Course Pages** — Individual detail pages with pricing, highlights, skills & upcoming batches
- **Language + Currency** — English (US/IN), Hindi, Arabic with auto currency (USD / INR / AED)
- **WhatsApp Widget** — Pre-written questions + custom message option
- **Sign In / Register** — Student portal login (demo auth with localStorage)
- **Responsive** — Mobile-friendly with hamburger menu
- **Animations** — Scroll reveal, floating elements, partner marquee
- **Razorpay Payments** — Real checkout for Cards, UPI, Netbanking & wallets (old fake payment form removed)

## Sections NOT included (as requested)

- FAQ
- Join Our Community
- Blog page

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for production

```bash
npm run build
npm run preview
```

## Payments (Razorpay)

1. Copy `.env.example` to `.env`
2. Paste keys from [Razorpay Dashboard → API Keys](https://dashboard.razorpay.com/app/keys)
3. Use test keys (`rzp_test_...`) while developing
4. Run `npm run dev` and click **Enroll & Pay**

Successful enrollments are saved in `server/data/enrollments.json`. For production: `npm run build` then `npm start`.

## Customize

- **WhatsApp number:** Edit `WHATSAPP_NUMBER` in `src/data/siteData.js`
- **Courses:** Edit `src/data/siteData.js`
- **Translations:** Edit `src/data/translations.js`
- **Logo:** Replace `public/logo.png`
- **Razorpay keys:** Edit `.env`

## Tech Stack

- React 19 + Vite 6
- React Router 7
- Razorpay Checkout + Express API
- Pure CSS (no UI framework)
