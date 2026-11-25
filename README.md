# FNA Design Lab (`@fna_designlab`)

Official portfolio web application, client inquiry pipeline, and studio CMS for **FNA Design Lab** — an architecture, interior architecture, and bespoke furniture practice based in **Nandanvan, Nagpur, India**.

---

## Key Features

- **Editorial Preloader & Regional Identity**: Animated Gujarati (`એફ.એન.એ.`), Marathi (`एफ.एन.ए.`), and English brand loader with live IST clock and Nagpur studio datum (`21.1354° N, 79.0692° E`).
- **Full-Viewport Spatial Slider**: Smooth horizontal slide navigation across **Home**, **About**, **Work**, and **Connect** sections (plus responsive vertical stacking on mobile, keyboard navigation, and `⌘K` / `Ctrl+K` quick archive search).
- **Dynamic Works Index**: Live-filtered project table (**Architecture**, **Interiors**, **Objects**) with dynamic entry counts, hover image previews, and project detail modals.
- **Architectural Drafting Cursor**: Zero-displacement precision Terracotta lead point paired with a fluid `requestAnimationFrame` Slate framing reticle that adapts on interactive hover and hides automatically over form fields and touch devices.
- **Owner CRM & Portfolio CMS (`admin.html`)**:
  - Client inquiry registry with search, channel/budget filters, status updates, printable client dossiers, and CSV export (with formula-injection sanitization).
  - Portfolio CMS to publish, edit, and delete works (supports up to 15 MB image uploads or image URLs).
  - Hybrid persistence: uses `server.js` JSON storage and `HttpOnly; SameSite=Strict` sessions when the Node server is running, with automatic SHA-256 + `localStorage` fallback when opened statically.

---

## Project Structure

```text
├── index.html          # Main studio portfolio & client inquiry page
├── admin.html          # Owner CRM & Portfolio CMS portal
├── 404.html            # Custom architectural 404 page
├── server.js           # Zero-dependency Node.js server & REST API
├── favicon.svg / .png  # Studio favicons
├── css/
│   └── styles.css      # Design tokens (Onest, JetBrains Mono, regional fonts) & layouts
├── js/
│   ├── data.js         # Shared data store, resilient API router & SHA-256 offline auth
│   ├── app.js          # Slider engine, dynamic project index, search & drafting cursor
│   └── admin.js        # CRM dashboard, portfolio CMS, modals & CSV export
├── data/
│   ├── portfolio.json  # Published portfolio items
│   ├── inquiries.json  # Client inquiries store
│   └── owner_auth.json # Salted scrypt owner credentials (protected by server.js)
└── images/             # Studio photography (fna office.jpeg, logo.png, project assets)
```

---

## Running Locally

Requires **Node.js** (uses built-in `http`, `fs`, `path`, and `crypto` modules — no `npm install` needed).

```bash
node server.js
```

Once running:
- **Studio Website**: `http://localhost:3000/`
- **Admin Portal**: `http://localhost:3000/admin.html`

### Optional Environment Variables
- `PORT` — HTTP port (defaults to `3000`)
- `HOST` — Bind address (defaults to all local interfaces)
- `FNA_OWNER_EMAIL` / `FNA_OWNER_PASSWORD` — Initial owner credentials used when `data/owner_auth.json` is created on first run. Passwords can be updated anytime from the **Security** modal inside `admin.html`.

---

## Studio Contact

- **Address**: First Floor, FNA Design Lab, Dr. Trivedi Complex, Nandanvan Rd, near Shravan Hospital, Bapu Nagar, Nandanvan, Nagpur, Maharashtra 440024 ([Google Maps](https://maps.app.goo.gl/P2sLFmENzyWVefEh7))
- **Coordinates**: `21.1354° N, 79.0692° E`
- **Email**: `fnadesignlab@gmail.com`
- **Phone / WhatsApp**: `80551 68548` / `93264 27435`
- **Instagram**: [@fna_designlab](https://www.instagram.com/fna_designlab)

