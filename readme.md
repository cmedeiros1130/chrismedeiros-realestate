# Christopher Medeiros — Realtor® Website

A polished, responsive, **single continuous-scroll** website for **Christopher Medeiros**, Realtor® licensed in Rhode Island and Massachusetts (Slocum Home Team | eXp Realty).

Built with plain **HTML, CSS, and JavaScript** — no frameworks, no build step, no dependencies to install. It works both by opening `index.html` directly and when deployed to Netlify.

The design uses the **official Slocum brand palette** — Harbor Blue (`#083D85`) dark sections and footer, White/pale-Sky light sections, Sky (`#A3CCE5`) accents and borders, and Scarlet (`#ED3024`) used sparingly for eyebrows, hovers, and small details — with Playfair Display headlines and Montserrat body text. The visitor starts at the top and scrolls — every process, the FAQ, and the offer strategy are fully visible without clicking.

---

## Project structure

```
Webpage/
├── index.html          # All page markup (semantic, one long scrolling page)
├── styles.css          # All styling (warm design system + responsive + reveal)
├── script.js           # Header shadow, scroll-spy, reveal, mortgage calculator
├── README.md           # This file
└── assets/
    ├── favicon.svg                # CM monogram favicon
    ├── headshot-placeholder.svg   # Hero portrait → replace
    ├── map-placeholder.svg        # Stylized RI/MA service-area map (hand-drawn SVG)
    ├── property-placeholder.svg   # Generic property placeholder
    └── logo-placeholder.svg       # Brokerage / REALTOR® / Equal Housing logos
```

---

## Preview locally

### Option A — just open it
Double-click `index.html`, or drag it into a browser. Everything works from `file://`, including the mortgage calculator, sliders, and all links.

### Option B — run a tiny local server (recommended)
```bash
python -m http.server 8000
```
Then visit **http://localhost:8000**. (No Python? `npx serve .` or `php -S localhost:8000` also work.)

---

## Deploy to Netlify

There is no build step, so deployment is drag-and-drop.

1. Go to <https://app.netlify.com/drop>.
2. Drag the **entire `Webpage` folder** onto the page.
3. Netlify gives you a live URL immediately.

Or connect a Git repo: **Add new site → Import an existing project**, build command *blank*, publish directory `.`.

> **Note:** This redesign is a lead-*generation* brochure, not a form-collection page. The contact section uses direct `tel:` / `mailto:` links and a "Book a Free Consultation" button that opens a pre-filled email. There is no backend form to configure. If you later want a Netlify contact form, ask and I can add one back.

---

## What's implemented

- **Editorial one-page scroll experience** — minimal sticky header, restrained CTAs; the content is the navigation.
- Alternating light / muted / espresso-dark sections with a distinctive gradient **Buy + Sell** feature section.
- **Hero** — single headline, supporting copy, one primary CTA + a Zillow text link.
- **About / credibility** — your four real stats and four value pillars.
- Three fully visible **8-step journeys** (Buying, Selling, Buy + Sell).
- **Working mortgage estimator** — sliders for price / down payment / rate, a 30/15-year toggle, and a large live payment readout with loan amount and down payment.
- **Offer strategy** grid (10 items, all visible) and a **visible-answer FAQ** (no accordion).
- Trusted-professionals grid; final CTA with clickable phone, email, and Zillow.
- Responsive at desktop / tablet / mobile, no horizontal overflow, visible focus states, reduced-motion support, SEO + Open Graph + `RealEstateAgent` structured data.

**Accuracy:** only real information is used — licensed RI + MA. No video, no "Top 1%", no reviews, testimonials, awards, rankings, or invented addresses.

---

## Things to replace / add (placeholders)

| Item | Where | Notes |
|------|-------|-------|
| **Headshot** | `assets/headshot.jpg` | Your real photo (hero + About). Until added, a branded placeholder shows automatically via an `onerror` fallback. |
| **Brokerage / Equal Housing logos** | `assets/logo-placeholder.svg` | Replace with required logos in the footer. |
| **Brokerage disclosures** | Footer (`index.html`, marked `TODO`) | Add Slocum Home Team / eXp Realty branding, license numbers, and Equal Housing Opportunity wording. **Not invented.** |
| **Trusted professionals** | "A Trusted Team" section | Add real partner names/contacts later. |

Search `index.html` for `TODO` and `placeholder` to find every spot.

---

## Customizing the look

Colors and type are CSS variables at the top of `styles.css` (`:root`). Adjust `--accent`, `--dark`, `--bg`, `--bg-muted`, etc. in one place to re-tone the whole site.
