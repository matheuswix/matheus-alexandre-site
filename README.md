# Handoff: Matheus Alexandre — Personal Site

## Overview
A single-screen personal/portfolio site that positions Matheus Alexandre as a **software engineering partner for product-led founders** (not a generic "B2B engineer"). The page is intentionally minimal — one centered white panel on a light-gray field, à la [theoutline.design](https://www.theoutline.design/) — with a hero value proposition and a row of four interactive "preview-stack" cards. Each card opens a spring-animated modal with deeper content: **Work**, **How I help (Services)**, **Now (About)**, and **Contact**.

Primary goals: land freelance/consulting partnerships, recruiter visibility, and serve as a memorable business card.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype demonstrating the intended look, motion, and behavior. They are **not production code to copy directly.**

- `Matheus Alexandre.dc.html` is authored in a proprietary "Design Component" (DC) format: a `<x-dc>` template plus a `class Component extends DCLogic` logic class, hydrated at runtime by `support.js`. **Do not port `support.js` or the DC runtime.** Read the file as a spec for markup structure, inline styles, copy, and the logic class for behavior/state.
- `image-slot.js` is a drag-and-drop image placeholder web component used only so the prototype's screenshot slots persist dropped images in the browser. In production, replace these with real `<img>` tags / your asset pipeline.

**The task:** recreate this design in the target codebase's existing environment (React, Vue, Svelte, SwiftUI, etc.) using its established patterns. If no environment exists yet, React + plain CSS (or CSS Modules / Tailwind) is a natural fit — this is a static marketing page with light client-side interactivity (modal open/close, mouse-tracking spotlight).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all specified below and present in the HTML. Recreate the UI pixel-perfectly. The one exception is content that is still placeholder (flagged in **Open Items** at the bottom).

---

## Layout — Single Screen ("Home")

Outer structure, from the page in:

1. **Page background**: `#EAEAE7` (light warm gray), `padding: 12px`, min-height `100vh`, flex so the panel fills.
2. **Panel** (the white card everything lives in): `flex: 1`, `background: #FFFFFF`, `border: 1px solid #E6E6E6`, `border-radius: 30px`, `overflow: hidden`, `padding: 26px 24px 22px`. A vertical flex column with three regions:
   - **Header** (`flex: none`): centered monogram.
   - **Main** (`flex: 1`): centered column, vertically and horizontally centered, `gap: 38px`, `padding: 28px 0`. Holds the eyebrow, hero headline, and the card row.
   - **Footer** (`flex: none`): centered CTAs + a monospace footnote.
3. **Detail overlay**: an absolutely-positioned layer (`inset: 0`, `z-index: 50`) covering the panel, holding the modal. Toggled by `display: flex` / `display: none` (see Interactions — do **not** gate visibility purely on an opacity transition).

### Header — Monogram
- 46×46px rounded square (`border-radius: 14px`), `background: #0E0E0E`, white text "MA", `font-weight: 600`, `font-size: 16px`, `letter-spacing: .5px`.
- A small accent dot, top-right, `10px` circle, `background: var(--accent)` (default `#EAB308`), `border: 2px solid #fff`, offset `top:-3px; right:-3px`.
- Hover: `transform: rotate(-7deg) scale(1.06)` over `.5s cubic-bezier(.2,.9,.25,1)`.
- Click: closes any open modal (acts as "home").

### Main — Eyebrow + Hero
- **Eyebrow**: monospace, text `MATHEUS  ALEXANDRE` (note the double space, rendered via `&nbsp;&nbsp;`), `font-size: 11.5px`, `letter-spacing: 3px`, `color: #B0B0B0`, `font-weight: 500`.
- **Hero headline** (`<h1>`): two lines, `font-weight: 600`, `font-size: clamp(27px, 4.6vw, 44px)`, `line-height: 1.12`, `letter-spacing: -1.2px`, `text-wrap: balance`, centered.
  - Line 1, color `#0E0E0E`: **"The engineering partner"**
  - Line 2, color `#B6B6B6`: **"product-led founders build with."**

### Main — Card Row
A `flex-wrap` row, `justify-content: center`, `gap: 16px`, `max-width: 760px`. Four cards: **Work**, **How I help**, **Now**, **Contact**.

Each **card**:
- `position: relative; overflow: hidden`, `width: 160px`, `min-height: 176px`, `border-radius: 18px`, `background: #F6F6F4`, `border: 1px solid #EEEEEC`, flex column, `align-items: center`, `justify-content: space-between`, `padding: 16px 14px 18px`, `cursor: pointer`.
- Transition: `transform .4s cubic-bezier(.2,.9,.25,1), box-shadow .4s, background .3s, border-color .3s`.
- **Hover**: `transform: translateY(-6px)`, `background: #fff`, `box-shadow: 0 18px 42px rgba(0,0,0,.10)`, `border-color: #E2E2E2`.
- Contains, in stacking order:
  1. **Two spotlight layers** (see Interactions → Cursor spotlight).
  2. A **96px-tall tile cluster** (`width: 124px; height: 96px; position: relative; z-index: 1`) that **idle-bobs**: `animation: bob 5.5s ease-in-out infinite` with a per-card `animation-delay`. Inside are 2–3 small "card" tiles (52×66px, `border-radius: 10px`) absolutely centered, each with a diagonal striped background and a slight rotation. On card hover the tiles **fan out** (spread apart, lift, rotate more, scale up) — these transforms are computed in the logic class, not in CSS (see State).
  3. A **label row** (`z-index: 1`): the card name (`font-weight: 600; font-size: 14.5px; color: #0E0E0E`) followed by a `↗` glyph (`color: #C4C4C4; font-size: 13px`).

### Footer — CTAs + Footnote
- Two pill buttons, `gap: 10px`:
  - **"Start a project"** — `background: #0E0E0E`, white, `padding: 11px 22px`, `border-radius: 999px`, `font-weight: 600; font-size: 14px`. Hover: `translateY(-2px)`, `background: #000`. (Currently `mailto:` — see Open Items.)
  - **"GitHub"** — `background: #F0F0EE`, `color: #0E0E0E`, `border: 1px solid #E8E8E6`, same sizing. Links to `https://github.com/matheuswix` (target `_blank`). Hover: `translateY(-2px)`, `background: #E9E9E6`.
- **Footnote**: monospace, `font-size: 11px`, `color: #BDBDBD`, centered — **"*Currently taking on 1–2 founder partnerships."**

---

## Modals (Detail Overlay)

The overlay backdrop: `background: rgba(248,248,247,0.78)`, `backdrop-filter: blur(8px)`, centers its modal, `padding: 24px`. Clicking the backdrop (but not the modal) closes. `Esc` also closes.

**Modal container**: `width: min(760px, 100%)`, `max-height: calc(100% - 24px)`, `overflow: auto` (scrolls), `background: #fff`, `border: 1px solid #ECECEC`, `border-radius: 22px`, `box-shadow: 0 30px 80px rgba(0,0,0,.16)`, `padding: 30px 34px`, `position: relative`. Entrance: `animation: popIn .42s cubic-bezier(.2,.9,.25,1)` (transform-only — `translateY(12px) scale(.975)` → none; opacity stays 1).

**Close button**: top-right, 34px circle, `border: 1px solid #ECECEC`, `background: #fff`, `color: #555`, `×` glyph. Hover: `background: #F4F4F2`, `transform: rotate(90deg)`.

Every modal shares a header pattern: a monospace **section index** eyebrow (`font-size: 11px; letter-spacing: 2px; color: #B5B5B5`, e.g. `01 / WORK`), an `<h2>` (`font-size: 27px; font-weight: 600; letter-spacing: -.6px`), and a gray subtitle (`color: #9A9A9A; font-size: 15px`).

### 1 — Work (`01 / WORK`)
- Title: **"Things I've shipped with founders"**. Subtitle: "Products taken from idea to live — design, build, and launch."
- **Quick list**: rows separated by `border-top: 1px solid #EFEFEF`, each `padding: 16px 12px`, `border-radius: 12px`, hover `background: #F7F7F5`. Each row: monospace index (`#C2C2C2`, width 22px) · name (`font-weight: 600; font-size: 16px`) + one-line description (`font-size: 13.5px; color: #9A9A9A`) · monospace host (`#BDBDBD`) · `↗`. Links open in new tab.
  - `01` **educa.social** — "A social platform for schools & educators" — `educa.social` — https://educa.social/
  - `02` **Sherpa42** — "Digital agency — sites & product work" — `sherpa42.com.br` — https://www.sherpa42.com.br/
  - `03` **Goose Island — Find Beer** — "Product locator app" — `gooseisland.com` — https://www.gooseisland.com/find-beer
- **FEATURED section** (below the list, `margin-top: 34px`): a monospace `FEATURED` label with a hairline rule beside it, then rich deep-dive entries. Each entry (`padding: 26px 0`, `border-top: 1px solid #EFEFEF`):
  - Title (`font-weight: 600; font-size: 19px; letter-spacing: -.3px`) + a pill tag (monospace, `font-size: 10px; padding: 3px 8px; border-radius: 999px; background: #F0F0EE; color: #8A8A8A`) + a right-aligned host link (`↗`, hover darkens to `#0E0E0E`).
  - Description paragraph (`color: #6E6E6E; font-size: 14.5px; line-height: 1.65; max-width: 52ch; text-wrap: pretty`).
  - Optional **screenshot row**: `flex; gap: 12px; flex-wrap: wrap`, each shot 240×150px, `border-radius: 14px`. In production these are real images.
  - Seeded entries: **educa.social** (tag `FOUNDING ENGINEER`, 2 screenshot slots) and **Sherpa42** (tag `PRODUCT & ENGINEERING`, 1 slot). Copy is in the logic class `featuredRaw` array.

### 2 — How I help / Services (`02 / SERVICES`)
- Title: **"How I help founders"**. Subtitle: "The technical half of your founding team — from first commit to launch."
- **2×2 grid** (`grid-template-columns: 1fr 1fr; gap: 14px`). Each cell: `padding: 20px`, `border-radius: 16px`, `background: #F6F6F4`, `border: 1px solid #EEEEEC`. Monospace index, then bold title (`font-size: 16.5px`), then description (`color: #7A7A7A; font-size: 13.5px; line-height: 1.55`):
  - `01` **MVP, built fast** — "From scoping to a launched v1 — the fastest path to something real users can touch."
  - `02` **Web & mobile apps** — "Full-stack product engineering: frontend, backend, and the infrastructure underneath."
  - `03` **Design that ships** — "Interface and UX handled too — no waiting on a separate designer to move."
  - `04` **Technical partner** — "A founding-level engineer in the room: architecture calls, trade-offs, and momentum."
- **Credentials row** (below grid, `border-top: 1px solid #EFEFEF`): monospace `CREDENTIALS` label, right-aligned line "Software Engineer at **Wix**, shipping product to teams worldwide."

### 3 — Now / About (`03 / NOW · UPDATED JUN 2026`)
- The eyebrow is preceded by a **pulsing accent dot** (9px circle, `background: var(--accent)`, `animation: pulseDot 1.8s ease-in-out infinite`).
- Title: **"What I'm up to"**.
- **Bio paragraph** (`color: #6E6E6E; font-size: 15.5px; line-height: 1.6; max-width: 56ch; text-wrap: pretty`): "I'm a software engineer who likes building products with the people who dream them up. By day I ship at Wix; on the side I partner with founders to turn early ideas into real, used software."
- **Focus list**: rows (`border-top: 1px solid #EFEFEF; padding: 15px 0`), monospace index + statement (`font-size: 15.5px; color: #2A2A2A`):
  - `01` "Open to 1–2 new founder partnerships this quarter."
  - `02` "Shipping product end to end at Wix — staying sharp on scale."
  - `03` "Growing educa.social and helping early teams move faster."

### 4 — Contact (`04 / CONTACT`)
- Title: **"Let's build something"**. Subtitle: "Got an idea or an early product? Tell me where you're stuck — the first call is free."
- **Book-a-call card** (prominent, `padding: 20px 22px; border-radius: 16px; background: #0E0E0E; color: #fff; margin-bottom: 20px`): bold "Book a call" (`font-size: 17px`) over gray subtext "A free 30-min chat about your idea." (`color: #B5B5B5; font-size: 13.5px`), with a large `↗` on the right. Hover: `translateY(-2px)`. (Currently `mailto:` — wire to a scheduling link, see Open Items.)
- **Contact rows** (`border-top: 1px solid #EFEFEF; padding: 16px 12px; border-radius: 12px`, hover `background: #F7F7F5`): monospace kind label (width 86px, `color: #B0B0B0`) · bold handle (`font-size: 16px`) · `↗`:
  - `EMAIL` — hello@matheusalexandre.com — `mailto:` (placeholder)
  - `GITHUB` — @matheuswix — https://github.com/matheuswix (new tab)
  - `INSTAGRAM` — @soumatheusalexandre — https://instagram.com/soumatheusalexandre (new tab)

---

## Interactions & Behavior

- **Open a modal**: clicking any card sets `openCard` to that card's id; the overlay switches to `display: flex` and the modal plays `popIn`. The card grid behind dims to `opacity: 0.5` (`transition: opacity .4s`).
- **Close a modal**: the `×` button, a backdrop click (target must equal the overlay, not bubble from the modal), the monogram, or the `Escape` key — all set `openCard` to `null`.
- **⚠ Visibility must not depend on a completing opacity transition.** The prototype originally faded the overlay `opacity 0→1`; in throttled/background rendering the transition never advanced and the modal stayed invisible. The fix — keep it: toggle the overlay with `display`, keep modal opacity at `1`, and use a **transform-only** entrance animation. Apply the same principle to any entrance animation (don't leave an element stuck at `opacity: 0` if its keyframe is interrupted).
- **Idle bob**: each card's tile cluster floats up/down continuously (`bob`, 5.5s, staggered delay).
- **Hover fan-out**: on card hover, the tile cluster's tiles spread apart, rise, rotate more, and scale to 1.06; shadows deepen. Computed per-tile in JS (`mkTile`) from a `hovered` state flag, applied as inline `transform` with `transition: transform .5s cubic-bezier(.2,.9,.25,1)`.
- **Cursor spotlight (two layers, both track the mouse via CSS vars `--mx`/`--my` set on `mousemove`):**
  1. **Fill glow**: a radial gradient `radial-gradient(160px circle at var(--mx) var(--my), rgba(234,179,8,0.18), rgba(234,179,8,0.06) 38%, transparent 68%)` filling the card.
  2. **Border glow**: a radial gradient `radial-gradient(150px circle at var(--mx) var(--my), rgba(234,179,8,0.9), rgba(234,179,8,0.25) 40%, transparent 72%)` masked to a 1.5px ring using the standard "padding-box XOR border-box" mask-composite trick, so only the **edge** lights up at the cursor.
  - Both layers are `opacity: 0` by default, set to `1` on `mousemove`/`mouseenter` and back to `0` on `mouseleave` (`transition: opacity .3s`). The accent color of these glows is currently hardcoded `rgba(234,179,8,…)`; if you make the accent dynamic, derive these from it.
- **Button/link hovers**: pill CTAs and the book-a-call card lift `translateY(-2px)`; list rows tint to `#F7F7F5`; the close button rotates 90°.

## State Management
From the logic class (`class Component`):
- `state.hovered` — id of the currently hovered card (`'work' | 'experience' | 'now' | 'contact' | null`). Drives the fan-out transforms.
- `state.openCard` — id of the open modal, or `null`. Drives overlay display + grid dimming.
- A `keydown` listener (added on mount, removed on unmount) closes on `Escape`.
- Derived data computed per render: `cards` (label, stagger delay, per-tile styles, handlers), `projects`, `featured` (with `hasShots`/normalized `shots`), `services`, `nowItems`, `contacts`, and the `overlayStyle`/`modalStyle`/`gridStyle` objects.
- The cursor-spotlight position is **not** React state — it's written directly to the DOM element's CSS custom properties in the `onMove` handler (and toggled on the `[data-spotlight]` children) to avoid re-rendering on every mouse move. Preserve this approach in any reimplementation (use a ref + direct style writes, not state).

In a React port, `state.hovered` and `state.openCard` become `useState`; the derived arrays become plain consts or `useMemo`; the `mousemove` handler writes to a ref.

## Design Tokens

**Colors**
| Token | Value | Use |
|---|---|---|
| Page bg | `#EAEAE7` | Outer field |
| Panel bg | `#FFFFFF` | Main card |
| Panel border | `#E6E6E6` | Panel edge |
| Ink | `#0E0E0E` | Primary text, dark buttons, monogram |
| Ink (pure) | `#000000` | Dark-button hover |
| Muted headline | `#B6B6B6` | Hero line 2 |
| Subtitle gray | `#9A9A9A` | Modal subtitles, list descriptions |
| Body gray | `#6E6E6E` / `#7A7A7A` | Paragraph copy |
| Card body text | `#2A2A2A` | Now/Focus statements |
| Eyebrow gray | `#B0B0B0` / `#B5B5B5` | Monospace labels |
| Hint gray | `#BDBDBD` / `#C2C2C2` / `#C4C4C4` | Footnote, indices, glyphs |
| Card fill | `#F6F6F4` | Cards, service cells |
| Card border | `#EEEEEC` | Card edges |
| Subtle fill | `#F0F0EE` / `#F4F4F2` / `#F7F7F5` | GitHub pill, hover tints |
| Hairlines | `#EFEFEF` / `#ECECEC` / `#E8E8E6` / `#E2E2E2` | Dividers, borders |
| **Accent** | `#EAB308` (amber/yellow) | Monogram dot, CURRENT-style pills, Now pulse dot, cursor spotlights |

The accent is exposed as a component prop (`accent`, default `#EAB308`). In production, expose it as a single theme variable; note the spotlight RGBA values (`234,179,8`) are the same yellow and should be kept in sync.

**Typography**
- **Sans**: `Geist` (Google Fonts), weights 400/500/600/700. Fallback `system-ui, sans-serif`.
- **Mono**: `Geist Mono`, weights 400/500. Used for all eyebrows, indices, hosts, footnote.
- Scale in use (px): hero `clamp(27,4.6vw,44)`/600 · h2 `27`/600 · featured title `19`/600 · service title `16.5`/600 · list name `16`/600 · CTA/handle `14–17` · body `13.5–15.5` · eyebrow/mono `10–12`. Notable letter-spacing: hero `-1.2px`, h2 `-.6px`, eyebrows `2–3px`.

**Radii**: panel `30px` · modal `22px` · cards/service cells/book-call `16–18px` · list rows `12–14px` · tiles `10px` · monogram `14px` · pills/CTAs `999px` · close button/dots `50%`.

**Shadows**: card hover `0 18px 42px rgba(0,0,0,.10)` · modal `0 30px 80px rgba(0,0,0,.16)` · tile rest `0 4px 10px rgba(0,0,0,.05)` · tile hover `0 14px 26px rgba(0,0,0,.12)`.

**Motion / easing**: standard ease `cubic-bezier(.2,.9,.25,1)`. Durations: hover lifts `.3–.5s`, fan-out `.5s`, modal `popIn .42s`, spotlight fade `.3s`, monogram `.5s`. Keyframes: `bob` (translateY ±5px, 5.5s), `pulseDot` (scale+opacity, 1.8s), `popIn` (transform-only, .42s).

## Assets
- **Fonts**: Geist + Geist Mono via Google Fonts (`<link>` in the `<helmet>`). No self-hosted fonts.
- **Icons/glyphs**: none external — arrows are the Unicode `↗` (`&#8599;`) and close is `×` (`&times;`). Replace with your icon set if preferred.
- **Project screenshots**: not yet supplied. The prototype uses drag-and-drop placeholder slots (`image-slot.js`). Matheus to provide real screenshots for educa.social and Sherpa42 (and any other featured projects); drop them in as `<img>` in production.
- **No logo image** — the brand mark is the typographic "MA" monogram.

## Files
- `Matheus Alexandre.dc.html` — the full design: markup (template) + behavior/state/data (the `class Component` logic block near the bottom). **Primary reference.**
- `image-slot.js` — prototype-only drag/drop image placeholder; do not ship.
- `support.js` — proprietary DC runtime; **do not port**. Included only so the prototype renders if opened in a browser.

## Open Items / Placeholders (confirm before shipping)
1. **Email** `hello@matheusalexandre.com` is a placeholder — used by the "Start a project" CTA and the Contact EMAIL row. Replace with the real address.
2. **"Book a call"** currently points to `mailto:`. Wire to a real scheduler (Calendly / Cal.com).
3. **Featured project screenshots** are empty drop-slots — supply real images.
4. **Goose Island — "Find Beer"** description ("Product locator app") is a guess — confirm/refine.
5. **"UPDATED JUN 2026"** in the Now modal is hardcoded — make it reflect the real last-updated date.
