<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# KIPS Education System (kips.edu.pk) - Project Workspace Guide & Instructions

## 1. Project Overview
This repository contains the web application for **KIPS Education System** (`kips.edu.pk`), providing information on KIPS Colleges, Academies, Schools, Publications, and CSS preparation programs across Pakistan.

- **Workspace Path**: `d:\kips.edu.pk`
- **Application Framework**: Next.js 16.3.4 (App Router, Turbopack)
- **UI Library**: React 19.2.8
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`)
- **Language**: JavaScript (ES6+ / JSX)
- **React Compiler**: Enabled (`reactCompiler: true` in `next.config.mjs`; `babel-plugin-react-compiler` 1.0.0)

---

## 2. Directory Structure & Architecture

```
d:\kips.edu.pk\
├── AGENTS.md               # Repository guidelines and agent instructions
├── README.md               # Next.js quickstart documentation
├── jsconfig.json           # Path alias definitions (@/* -> ./src/*)
├── next.config.mjs         # Next.js config (reactCompiler: true)
├── package.json            # Project dependencies and script declarations
├── postcss.config.mjs      # PostCSS configuration for Tailwind CSS v4
├── public/                 # Static public assets
│   ├── Projects-College-new.webp # Image for Our Projects section
│   ├── career-gro.jpg      # Image for Career Growth feature card
│   ├── expert-fac.png      # Image for Expert Faculty feature card
│   ├── footer2.jfif        # Campus background image for footer reveal
│   ├── hero.jpg            # Hero background image
│   ├── hero.jpg.webp       # WebP variant of hero image
│   ├── logo.png            # KIPS logo (PNG)
│   ├── logo2.png           # Navbar brand mark (used as /logo2.png)
│   ├── md.webp             # Managing Director portrait
│   ├── modern-camp.webp    # Image for Modern Campuses feature card
│   └── quality.webp        # Image for Quality Education feature card
└── src/
    ├── app/                # Next.js App Router root directory
    │   ├── component/      # Primary UI component implementations
    │   │   ├── cursor.js   # Custom cursor + scroll-progress ring (client)
    │   │   ├── footer.js   # Global Footer (3-column grid, ribbon accent, fixed campus image with Apply Now CTA)
    │   │   └── navbar.js   # Global Navbar (mega-menu + mobile drawer, fixed, scroll-reactive bg)
    │   ├── favicon.ico     # Site favicon icon
    │   ├── globals.css     # Global styles, Tailwind v4, Google Fonts, CSS vars, custom cursor & marquee
    │   ├── layout.js       # Root Layout (Geist vars, Cursor, HTML structure)
    │   └── page.js         # Homepage (client): accent bar, hero split, About KIPS,
    │                       #           Leadership (CEO/MD smooth scroll swap), Our Projects,
    │                       #           What Makes Us KIPS marquee, By the Numbers (Crimson stats),
    │                       #           Discover Locations (About KIPS style), Become a Partner (Projects style)
    └── component/          # Re-export proxies for @/component/* imports
        ├── cursor.js       # Re-exports @/app/component/cursor
        ├── footer.js       # Re-exports @/app/component/footer
        └── navbar.js       # Re-exports @/app/component/navbar
```

---

## 3. Tech Stack Details & Dependencies

### Core Stack
- **Next.js**: `16.3.4` (App Router with Turbopack bundler)
- **React / React DOM**: `19.2.8`
- **React Compiler**: `babel-plugin-react-compiler` `1.0.0`, enabled via `reactCompiler: true` in `next.config.mjs`
- **Fonts (next/font)**: `Geist` & `Geist Mono` via `next/font/google` in `src/app/layout.js` (CSS variables `--font-geist-sans` / `--font-geist-mono`). Body copy uses **Poppins** from Google Fonts in `globals.css`.

### Styling & CSS System
- **Tailwind CSS**: `^4.0.0`
- **PostCSS**: `@tailwindcss/postcss` (`^4.0.0`)
- **Theme Definition**: Defined in `src/app/globals.css` using `@import "tailwindcss";` and `@theme inline`.
- **Native scrollbar**: Hidden on `html` (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`). The page remains scrollable; the custom cursor ring shows scroll progress.

### Typography (Google Fonts — loaded in `globals.css`)
| Font | Weights | Usage |
|---|---|---|
| `Cormorant Garamond` | 400, 500, 600, 700 (+ italic) | Primary serif — headings, nav labels, mega-menu, homepage `main`, statistics headings |
| `Playfair Display` | 400–800 (+ italic) | Secondary serif — registered on `--font-serif` |
| `DM Serif Display` | 400 | Display serif — `h1` global rule, footer headings (KIPS brand, Links, Follow Us) |
| `Poppins` | 400, 500, 600, 700 | Body text (default via `body` rule), UI elements |
| `Plus Jakarta Sans` | 300–700 | Secondary sans-serif — theme `--font-sans` fallback |

- Apply serif font via `.font-cormorant` or `.font-heritage-serif` (both map to Cormorant Garamond).
- Body defaults to `Poppins` via `body` rule in `globals.css`.
- Global `h1` rule sets `font-family: 'DM Serif Display', serif`.
- Homepage `<main>` uses `font-cormorant`.

### Brand Color Tokens (CSS Variables)
| Token | Value | Description |
|---|---|---|
| `--kips-crimson` / `--color-kips-crimson` | `#9e0b24` | Primary brand crimson (used in By the Numbers statistics section & CTAs) |
| `--kips-crimson-bright` / `--color-kips-crimson-bright` | `#c8102e` | Bright crimson for hover states |
| `--kips-navy` / `--color-kips-navy` | `#0b132a` | Deep navy for headings |
| `--kips-gold` / `--color-kips-gold` | `#c59b27` | Gold accent |
| `--kips-slate` | `#52525b` | Muted slate for secondary text |
| `#0082CF` | (hardcoded) | KIPS Blue — Navbar, accent bar, cursor, CTAs, leadership text, project accent |

---

## 4. Development & Build Commands

- **Development Server**:
  ```bash
  npm run dev
  ```
  Runs `next dev` with Turbopack. Access at `http://localhost:3000`.

- **Production Build**:
  ```bash
  npm run build
  ```
  Compiles and optimizes the app for deployment via `next build`.

- **Production Server**:
  ```bash
  npm run start
  ```
  Starts the compiled production build via `next start`.

- **Linting**:
  ```bash
  npm run lint
  ```
  Runs ESLint validation via `eslint`.

---

## 5. Coding Standards & Guidelines for Agents

1. **Path Alias Import Style**:
   - Always use `@/*` alias (e.g. `import Navbar from "@/component/navbar"`, `import Footer from "@/component/footer"`, `import Cursor from "@/component/cursor"`).
   - Implement components in `src/app/component/` and re-export from `src/component/` so `@/component/*` resolves.
2. **Next.js 16 App Router Conventions**:
   - Keep route components inside `src/app/`.
   - Maintain client component boundaries using `"use client"` when state/effects are required (`navbar.js`, `cursor.js`, `page.js`).
   - Global chrome that must exist on every page (custom cursor) belongs in `src/app/layout.js`.
3. **Tailwind CSS v4 Usage**:
   - Use standard Tailwind utility classes for layout, flexbox, grid, spacing, typography, and background colors/images.
   - Global dark/light theme properties are declared in `src/app/globals.css`.
   - Use Tailwind arbitrary value syntax for KIPS Blue: `bg-[#0082CF]`, `text-[#0082CF]`, `border-[#0082CF]`.
   - Reference brand tokens via CSS variables: `text-[var(--kips-crimson)]`, or via Tailwind theme tokens like `text-kips-crimson`.
4. **Typography Usage**:
   - Apply `font-cormorant` (or `font-heritage-serif`) for editorial/serif content (headings, nav labels, mega-menu text, CEO/MD quotes, By the Numbers stats, etc.).
   - Apply `DM Serif Display` via inline style for display headings (footer brand, section column titles).
   - Default body font is `Poppins`.
5. **Color Conventions**:
   - KIPS Blue (`#0082CF`): Navbar (scrolled state), top accent bar, active underlines, mega-menu accent bar, mobile "Apply Now" button, custom cursor, hero panel accent, leadership text & borders, project accents.
   - KIPS Crimson (`#9e0b24` / `#c8102e`): "By the Numbers" background (`bg-[#9e0b24]`), CTA links, "Explore Overview" in mega-menu, cursor hover-on-link state.
   - KIPS Navy (`#0b132a`): Deep heading color in mega-menu and editorial headings.
6. **Custom CSS Classes** (defined in `globals.css`):
   - `.font-cormorant` / `.font-heritage-serif` — Cormorant Garamond serif.
   - `.mega-menu-enter` — Hidden mega-menu state (fade + slide).
   - `.mega-menu-enter.open` (also `.group:hover` / `:focus-within`) — Reveals mega-menu.
   - `.kips-cursor-dot` / `.kips-cursor-ring` / `.kips-cursor-track` / `.kips-cursor-progress` — Custom cursor.
   - `.kips-marquee` / `.kips-marquee-track` / `.kips-card` / `@keyframes kipsMoveRight` — Infinite horizontal marquee slider with pause-on-hover and card hover elevation.
7. **Custom cursor**:
   - Do not add competing `cursor:` styles on hover-capable devices; `globals.css` sets `cursor: none` under `@media (min-width: 1024px) and (hover: hover) and (pointer: fine)`.
   - The custom cursor is hidden completely on mobile/tablet devices (`< 1024px` width or touch/coarse pointers) via `@media (max-width: 1023px), (pointer: coarse), (hover: none) { .kips-cursor-dot, .kips-cursor-ring { display: none !important; } }`.
   - Drive hover/click visuals via `data-state` and `data-clicking` on cursor nodes.
8. **Preserving Agent Rules**:
   - Do NOT remove or modify the `<!-- BEGIN:nextjs-agent-rules -->` section at the top of `AGENTS.md`.

---

## 6. Component Reference

### Root Layout (`src/app/layout.js`)
- Loads Geist / Geist Mono CSS variables and `globals.css`.
- Mounts `<Cursor />` once for the whole app, then `{children}`.
- Body: `min-h-full flex flex-col`.

### Navbar (`src/app/component/navbar.js`)
- **Type**: Client Component (`"use client"`)
- **State**: `activeTab`, `openDropdown`, `mobileMenuOpen`, `mobileExpandedItem`, `isScrolled`, `hidden`
- **Logo**: `/logo2.png` (`h-15`), plus wordmark “KIPS Education System” (`#0082CF`) / “Pre-school to Post Graduate”
- **Position**: `fixed top-0 left-0 right-0 z-50` (not sticky). Overlays page and hero.
- **Scroll Behavior**:
  - Navbar stays visible (`hidden = false`) at the top of the window during the hero section.
  - As soon as the next section (`[data-about-section]`) starts appearing in the window, `isScrolled` switches to `true`, smoothly transitioning the navbar background from transparent to solid white (`bg-white border-b border-slate-200/70 shadow-lg`) with dark typography and KIPS Blue branding.
- **Nav items**: About Us (`#about`), Education (`#education`), Become Partner (`#partner`), Career (`#career`), Contact (`#contact`)
  - `About Us` and `Education` have **mega-menu dropdowns** with two columns + promotional image panel and `hover:text-cyan-500` overview link accent.
- **Mobile Menu**: Drawer navigation with `Poppins` bold typography (`font-size: 20px`, `color: #274689`), expandable dropdown accordions, and full-width Apply Now CTA button.
- **Desktop actions**: **Apply Now** CTA button with fill-from-bottom hover effect (`Poppins` 14px bold font).

### Footer (`src/app/component/footer.js`)
- **Type**: Client Component (`"use client"`)
- **State**: `showFixedImage` — active when user scrolls near the bottom of the page (`scrollPosition < 1000px` from document bottom)
- **Layout & Structure**:
  - Content Grid: 3-column layout on desktop (`md:grid-cols-3`); responsive 2-column layout on mobile (`grid-cols-2`) where KIPS Brand section spans full width on top (`col-span-2`) and Links & Follow Us columns sit side-by-side underneath (`col-span-1` each).
  - Background: `#0082CF` brand blue background with right-side multi-color vertical ribbon stripes accent.
  - Fixed bottom reveal image pane (`/footer2.jfif`) at `z-0` featuring headline overlay ("Your Future Starts Here.") and an interactive **Apply Now** CTA button with fill-from-bottom hover effect.
  - A bottom transparent spacer (`h-[45vh]`) allows the campus image and Apply Now button to be revealed as the user scrolls past the footer content.
- **Typography & Visibility**:
  - KIPS brand heading: `text-4xl md:text-5xl font-semibold text-white` with `DM Serif Display` serif font.
  - Section headings (Links, Follow Us): `text-2xl font-bold text-white` with `DM Serif Display` serif font.
  - Body/link text: Links use `text-cyan-300 text-base` with `font-family: Poppins` and `hover:translate-x-1.5` slide interaction; platform-specific hover colors applied on Follow Us links (`hover:text-blue-700` Facebook, `hover:text-red-500` Instagram, `hover:text-blue-600` LinkedIn, `hover:text-red-600` YouTube).
  - Brand description text: `text-white/90 text-base md:text-lg` with `Helvetica Neue`.
  - Copyright: `text-sm md:text-base text-white/80` with `border-white/30` separator.
  - All links have `data-cursor="link"` attribute for custom cursor ring expansion.

### Custom Cursor (`src/app/component/cursor.js`)
- **Type**: Client Component (`"use client"`), default export `PremiumCursor`
- **Mounted in**: `src/app/layout.js` (site-wide)
- **Styling**: `gray-700` (`#374151`) center dot and outer SVG scroll-progress ring in `globals.css`. Hidden on mobile (`< 1024px` width, touch, or coarse pointers).
- **Behavior**: Center dot and outer SVG ring lerp-follow pointer (RAF loop) on desktop. Ring arc fills clockwise based on scroll position 0% → 100%.

---

## 7. Homepage Sections (`src/app/page.js`)

The homepage is a **client component** (`"use client"`). Scroll position drives hero split, About overlap, leadership transition, Our Projects progress, Discover Locations overlap, and Become a Partner progress.

**State & Refs:**
- `scrolled` — hero image/panel split (`window.scrollY > innerHeight * 0.35`)
- `isMobile` — responsive breakpoint indicator (`window.innerWidth < 1024`)
- `aboutSplit` — 0…1 overlap progress for About section
- `leadProgress` — 0…1 scroll progress for Leadership section
- `projectsProgress` — 0…1 scroll progress for Our Projects section
- `locationsSplit` — 0…1 scroll progress for Discover Our Locations section
- `partnerProgress` — 0…1 scroll progress for Become a Partner section
- `heroRef` — hero pin wrapper
- `aboutImgRef` — About photo node ref
- `leadRef` — Leadership section wrapper ref
- `projectsRef` / `projectsImgRef` — Our Projects refs
- `locationsRef` / `locationsImgRef` — Discover Our Locations refs
- `partnerRef` / `partnerImgRef` — Become a Partner refs

**Constants:**
- `CEO_LINES` — 4-line message array for Chief Executive Abid Wazir Khan
- `MD_LINES` — 4-line message array for Managing Director
- `ABOUT_IMG_W` / `ABOUT_IMG_H` — 570 × 600 (px) image dimensions for About, Projects, Locations, and Partner sections

Order of assembly:

| # | Section | Key Content & Design Concept |
|---|---|---|
| 1 | **Top Accent Bar** | `h-4` KIPS Blue bar with right-side black/white/blue block pattern |
| 2 | **Navbar** | Fixed overlay with persistent top visibility & background shift on scroll |
| 3 | **Hero** | Pinned split; desktop image shrinks in width (`68%`) & height (`84%`, rounded); mobile image shrinks with overlapping rounded top card |
| 4 | **About overlay + rest of page** | White stacking context `z-10` with `-mt-[100vh]` sliding up over pinned hero |
| 5 | **About KIPS** | Content left, photo right (`About-Us-new.webp`); scroll-linked overlap (mobile: stacked with down motion) |
| 6 | **Leadership (CEO & MD Swap)** | Scroll-pinned runway container (`160vh`); smooth continuous transition (`mdEnter = leadProgress`) between CEO & MD blocks |
| 7 | **Our Projects** | Photo left (`/Projects-College-new.webp`), content right; scroll-animated overlap with 11 progressive project items |
| 8 | **What Makes Us KIPS?** | Infinite horizontal marquee slider (`.kips-marquee`) with 4 cards: Quality Education, Expert Faculty, Modern Campuses, Career Growth. Both card sets use consistent `bg-white/15 backdrop-blur-sm` frosted glass overlay. |
| 9 | **By the Numbers (Discover KIPS)** | Full-width section (`bg-blue-400` / `bg-[#9e0b24]`) with 6 stats (`72%`, `70%`, `1M+`, `200+`, `30+`, `100%`), thin-line outline SVGs, white Garamond serif numbers & right-side vertical block stripe accent |
| 10 | **Discover Our Locations** | Designed like **About KIPS** — Content left, campus map photo right (`Map-1.webp`) with scroll-driven overlap |
| 11 | **Become a Partner** | Designed like **Our Projects** — Partner photo left (`partner.webp`), content right with 2-column feature checklist & blue arrows (`→`) |

### Section Details & Motion Math

**Hero pin + split:**
- Outer wrapper: `height: 350vh`, `z-0`; inner pane: `sticky top-0`, `height: 100vh`
- Image pane: On desktop, shrinks from `100%` → `68%` width and `100%` → `84%` height (`top: 8%`, `rounded-r-3xl`) when `scrolled` (1s transition). On mobile, shrinks to top `45%`/`55%` height with rounded bottom corners.
- Content panel: `width: 40%` on desktop. On mobile, slides up to `top: 42%` with rounded top corners (`rounded-t-3xl`) overlapping the image pane.

**About KIPS layout + overlap & blur animation:**
- Content panel **left** (`#fefefe`), photo **right** (`About-Us-new.webp`)
- Overlap formula: `ABOUT_IMG_W * (0.4 - 0.3 * aboutSplit)` (40% → 10% overlap on scroll)
- Photo entrance: `translateX(${(1 - aboutSplit) * 120}px) scale(${0.94 + aboutSplit * 0.06})`, `opacity: aboutSplit`, `filter: blur(${(1 - aboutSplit) * 10}px)`
- Content entrance: `translateX(${(1 - aboutSplit) * -140}px)`, `opacity: aboutSplit`, `filter: blur(${(1 - aboutSplit) * 10}px)`, `scaleX` blue accent line

**Leadership Section (CEO & MD Scroll Swap):**
- Height: `160vh` runway; inner sticky container `top-[10vh]` height `70vh`
- Continuous smooth scroll transition: `mdEnter = leadProgress` (0 → 1) with `transition: transform 0.1s ease-out, opacity 0.1s ease-out`
- CEO Block slides right via `translateX(${mdEnter * 100}%)`; MD Block enters from left via `translateX(${(1 - mdEnter) * -110}%)`

**Our Projects Section:**
- Photo **left** (`/Projects-College-new.webp`), Content **right** (`#fefefe`)
- Photo entrance: `translateX(${(1 - projectsProgress) * 120}px) scale(${0.94 + projectsProgress * 0.06})`, `filter: blur(${(1 - projectsProgress) * 10}px)`
- Content panel overlap: `marginLeft: -aboutOverlap px`, `translateX(${(1 - projectsProgress) * -140}px)`, `filter: blur(${(1 - projectsProgress) * 10}px)`
- Project items: 10 interactive link buttons structured as objects `{ name, href }` in a 2-column grid with progressive scroll-staggered reveals, hover translation, and color shift (`#0082CF` / arrow shift). Project links include KIPS School, KIPS College, KIPS Preparations, KIPS Publications, KIPS Virtual, KIPS Competitive Exams, PAMIR Private School, 7Cs School, KIPS Online School, and KIPS School Cambridge.

**By the Numbers (Discover KIPS) Section:**
- Full-width container (`bg-blue-400 text-white py-24 px-6`)
- Heading: Centered `font-cormorant text-4xl sm:text-6xl font-bold` **"By the Numbers"**
- **Right Edge Ribbon Accent**: 9 vertical block stripe bars (alternating blue-400, black, white) running full-height along the right boundary of the section container.
- 6 Stat cards arranged in a 3-column x 2-row grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12`) with thin outline line-art SVGs, Garamond serif values (`72%`, `70%`, `1M+`, `200+`, `30+`, `100%`), and white subtext descriptions.

**Discover Our Locations Section:**
- Designed matching **About KIPS** structural pattern & entrance animations.
- Content panel **left** (`locationsOverlap`), campus map photo **right** (`Map-1.webp`).
- Photo entrance: `translateX(${(1 - locationsSplit) * 120}px) scale(${0.94 + locationsSplit * 0.06})`, `filter: blur(${(1 - locationsSplit) * 10}px)`
- Content entrance: `translateX(${(1 - locationsSplit) * -140}px)`, `opacity: locationsSplit`, `filter: blur(${(1 - locationsSplit) * 10}px)`, `scaleX` blue accent line

**Become a Partner Section:**
- Designed matching **Our Projects** structural pattern & entrance animations.
- Partner photo **left** (`partner.webp`), content panel **right** (`partnerOverlap`).
- Photo entrance: `translateX(${(1 - partnerProgress) * 120}px) scale(${0.94 + partnerProgress * 0.06})`, `filter: blur(${(1 - partnerProgress) * 10}px)`
- Content panel: `translateX(${(1 - partnerProgress) * -140}px)`, `filter: blur(${(1 - partnerProgress) * 10}px)`, `scaleX` blue accent line, description & CTAs.

---

## 8. Known Environment Notes & Troubleshooting

- **Windows Watchpack Error**:
  When running `npm run dev` on Windows root drives, Next.js / Watchpack may issue:
  `Error: EINVAL: invalid argument, lstat 'D:\System Volume Information'`.
  This is a Windows system folder access warning in Turbopack watchpack initial scanning and does not block development.
- **Unused / leftover assets**: `public/hero.jpg.webp` exists but the hero uses `/hero.jpg`. Default Next SVGs (`file.svg`, `vercel.svg`, `window.svg`) may still be in `public/`.
- **Navbar vs accent bar stacking**: The accent bar is in normal document flow (`z-40`); the navbar is `fixed` `z-50`, so it overlays content below the accent bar, not the accent bar itself.
- **Do not pin About** to “play” the overlap animation; it must track scroll from before the photo appears. Hero **is** pinned (`350vh` sticky) so About can slide over it.

