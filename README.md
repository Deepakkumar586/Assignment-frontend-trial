# Cardamom House — Restaurant Menu

A polished, mobile-first public menu page for the fictional Cardamom House brunch café in Lisbon.

## Stack

- Next.js 15 — App Router
- React 19
- TypeScript — strict mode
- Tailwind CSS v4
- No backend, CMS, UI framework, or unnecessary dependencies

## Requirements covered

- Hero with restaurant name, tagline, and open/closed status
- Lisbon timezone-aware live opening status
- Today's special using the required amber brand colour
- Sticky category navigation with scroll-spy active state
- Brunch, Sandwiches & Toasties, Drinks, and Sides & Extras
- EUR price formatting
- Vegetarian, gluten-free, and spicy tags
- Weekly opening-hours block with today's row highlighted
- Address, phone, and Instagram footer
- Mobile-first responsive layout
- Semantic HTML, keyboard focus states, labels, and status messaging
- Three required demo states:
  - `?state=open`
  - `?state=closed`
  - `?state=special-sold-out`
- Print-friendly CSS as a small stretch goal
- Reduced-motion support

## Local setup

### 1. Requirements

Install Node.js 20.9+.

Check:

```bash
node -v
npm -v
```

### 2. Install

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 4. Test the required states

```text
http://localhost:3000/?state=open
http://localhost:3000/?state=closed
http://localhost:3000/?state=special-sold-out
```

## Production check

```bash
npm run build
npm run start
```

## Project structure

```text
cardamom-house-menu/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CategoryNav.tsx
│   ├── ClosedBanner.tsx
│   ├── Footer.tsx
│   ├── Hours.tsx
│   ├── MenuItem.tsx
│   ├── MenuPage.tsx
│   ├── MenuSection.tsx
│   ├── SpecialCallout.tsx
│   └── StatusBadge.tsx
├── data/
│   └── menu.ts
├── types/
│   └── menu.ts
├── public/
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Design decisions

### Typography-led rather than food photography

The brief explicitly allows a typography-led menu. The page uses warm paper tones, serif display typography, generous spacing, and the required `#B45309` amber instead of generic food-stock imagery.

### Mobile first

The category navigation is horizontally scrollable with 44px+ tap targets. Menu cards use readable spacing and the most important information appears early in each card.

### State handling

The page uses the current Lisbon time by default. The URL query parameter can override it with a demo state without introducing unnecessary global state.

### Accessibility

The page uses semantic `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`, `dl`, and list elements. Interactive elements have visible focus styles, status changes use appropriate semantics, and reduced-motion preferences are respected.

## Deployment to Vercel

1. Push this folder to GitHub.
2. Open Vercel and import the GitHub repository.
3. Keep the default Next.js build settings.
4. Deploy.
5. Test all three URLs on the live deployment.

## What I would build next

With another half-day, I would add a small dietary filter, refine typography after testing on a real phone, and run a final accessibility pass with keyboard-only navigation and a screen reader.
