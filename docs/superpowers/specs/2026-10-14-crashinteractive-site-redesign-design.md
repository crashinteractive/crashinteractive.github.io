# crashinteractive.dev redesign

**Date:** 2026-10-14
**Status:** Awaiting approval

## Purpose

Replace the current one-screen holding page with a site that sells Basher Beatdown.

The site has one job: turn a visitor into a **Steam wishlist**. Discord and the mailing
list are secondary. Everything on the page is judged against that.

Secondary job: establish Crash Interactive as a real studio, so press, publishers and
players who arrive from elsewhere find something credible.

### Success criteria

- A visitor who has never heard of the game understands the hook within one screen of scrolling.
- The Steam wishlist action is reachable at every scroll position.
- Loads fast on a phone over mobile data. No render-blocking third party code.
- Nothing on the page reads as machine written.

## Constraints

- **GitHub Pages, no build step.** Static files committed to `main`, served at `crashinteractive.dev` via the existing `CNAME`.
- **No framework, no bundler, no npm.** One `index.html`, one `styles.css`, one `main.js`. Editable by hand in a year's time.
- Game is unreleased. Release date is "to be announced". No price, no buy button.
- Single developer maintaining it. Adding an arena later must be a copy-paste of one block.

## Decisions made during design

| Decision | Choice | Why |
|---|---|---|
| Structure | One long scrolling page | One unreleased game; a multi-page site would be mostly empty |
| Primary CTA | Wishlist on Steam | Wishlists drive Steam launch visibility |
| Visual direction | Dark, cinematic, art-led | Restrained dark frame makes loud cartoon art hit harder |
| Accent colour | Electric cyan `#2EE8F2` | Already present in both the studio rabbit logo and the Basher Beatdown logo |
| Arena presentation | 2x2 grid of 4 large shots, lightbox | Chosen over full-bleed panels and a click-to-swap roster |
| Arena count | 4 shown, framed as "revealed so far" | More stages exist but are unannounced |
| How it plays | Statement + gameplay clip split, then one spec slab | Replaced a 3x2 emoji icon grid that read as generic |
| Statement size | 62px desktop cap | Settled by direct comparison |

## Page structure

Top to bottom:

1. **Announcement ribbon** - cyan strip, "Coming soon to Steam."
2. **Sticky nav** - studio logo, section links, persistent Wishlist button.
3. **Hero** - full-bleed key art, game logo, tagline, Wishlist + Watch trailer.
4. **Trailer** - click-to-load YouTube facade.
5. **Arenas** - 2x2 grid, lightbox, "more under wraps" note.
6. **How it plays** - statement + looping clip, then the spec slab.
7. **Wishlist band** - key art background, single ask.
8. **Studio** - Crash Interactive / CrashKonijn, GOAP story.
9. **Footer** - three link columns, socials, legal.

Arenas sit **before** How it plays: the trailer hooks, the arenas show the game, then the
mechanics explain what was just seen.

## Section detail

### Ribbon and nav

Ribbon is a flat cyan bar, dark text, one sentence. Nav is sticky with a blurred dark
background, 70px tall, studio logo left, links right, Wishlist button far right. Links
hidden below 900px; the Wishlist button never hides. That button is the reason the nav
is sticky at all.

### Hero

`images/basher_beatdown/Library Hero.png` full-bleed, `object-fit: cover`, min-height 88vh
(70vh below 900px, since the source is 3840x1240 and crops hard on tall viewports).

Two stacked gradients darken it: one left-to-right so type sits on near-black while the
right side stays vivid, one bottom-up blending into the page background.

Over it: Basher Beatdown logo (max 420px), the tagline, two buttons, and a platform line.

`Library Hero.png` is used rather than `Full HD.png` because it has no logo baked in,
which would otherwise collide with the overlaid logo.

### Trailer

A facade, not a live embed: key art thumbnail plus a cyan play button. On click it swaps
in an iframe for `youtube-nocookie.com/embed/NCbrJxm6Jpk?autoplay=1&rel=0` with
`referrerpolicy="strict-origin-when-cross-origin"`, plus a persistent "Open on YouTube"
fallback link.

A standard embed pulls roughly 1MB of player code on every page load and sets tracking
cookies before anyone asks to watch. The facade loads one image we already own.

### Arenas

2x2 grid, 18px gap, 16:9 each, rounded, hairline border. Bottom-up scrim carries an
eyebrow (arena), a name, and one line. Image scales 1.045 on hover; an expand glyph
fades in top-right.

Click opens a lightbox: the full-size shot, caption, prev/next, close. Arrow keys
navigate, Escape closes, body scroll locks while open.

Below the grid: three dim dots and "More arenas still under wraps." This frames four as a
reveal rather than the complete roster and gives an obvious slot for arena five.

Using `screenshot_0` (gingerbread), `screenshot_2` (shark), `screenshot_3` (graveyard),
`screenshot_4` (yeti). `screenshot_1` (sewer) is held back as the murkiest and least
readable at a glance.

### How it plays

Two parts, deliberately one section.

**Top:** a 1.25fr / 1fr split. Left is the statement, `Archivo Black`, both lines the same
size, clamped `clamp(34px, 5vw, 62px)`, line-height 0.94:

> ~~Knock them out.~~
> **Feed them to the _beast_.**

Strikethrough is native CSS `line-through` in cyan, so it survives a wrap at any size.
"beast" is cyan. Below it, two short paragraphs.

Right is `video_sample.mp4`, autoplay, muted, loop, playsinline, 16:9, with an "Actual
gameplay" tag. It is the only moving thing on the page, and it proves the claim sitting
next to it.

**Bottom:** one framed slab, single border, single radius, dividers drawn as 1px hairline
grid gaps:

- Row 1, three cells: `01 Grab`, `02 Carry`, `03 Feed`.
- Row 2, five cells: Players, Modes, Solo, Mutators, Platforms.

Both rows share one frame so they read as a single object. An earlier version gave each
block its own border, background and spacing, which read as three widgets stitched together.

### Wishlist band

Key art at 30% opacity under a dark gradient. Eyebrow, large heading, one sentence, then
Wishlist and Discord buttons. The second and final wishlist ask.

### Studio

300px logo panel beside the text. Heading: "Who's making this". Covers Crash Interactive
as Peter Klooster's one person studio in the Netherlands, notes that *konijn* is Dutch for
rabbit, and tells the GOAP story: bots built for Basher Beatdown grew into an open source
Unity package with 1.8k GitHub stars, free on the Asset Store.

That story is the strongest credibility the studio has, and it doubles as evidence for the
"bots that fight back" claim made further up.

Chips link to GOAP, Rabbit AI Blackboard, GitHub, itch.io.

### Footer

Studio logo and one line, then three columns (Game, Community, Studio), then copyright.

## Visual system

```
--ink      #06070B   page
--ink2     #0A0C13   raised panels, footer
--cy       #2EE8F2   the only accent
--tx       #EDF3FF   primary text
--mut      rgba(237,243,255,.58)
--line     rgba(237,243,255,.1)
--wrap     1180px
```

One accent colour, no second. All other colour comes from the artwork.

**Type:** `Archivo Black` for headings and numerals, `Archivo` 500/600/700 for body, via
Google Fonts with `display=swap` and a system-sans fallback.

- Statement: `clamp(34px, 5vw, 62px)`
- Section headings: `clamp(32px, 4.4vw, 52px)`
- Eyebrows: 11px, 700, `.24em` tracking, uppercase, cyan
- Body: 15 to 17px, line-height 1.6 to 1.72

**Motion:** restrained. Hover transforms on buttons and arena images, the looping clip, and
`scroll-behavior: smooth`. All transitions disabled under `prefers-reduced-motion`,
including pausing the clip.

**Breakpoint:** single, at 900px. Multi-column grids collapse to one column, nav links
hide, hero shortens from 88vh to 70vh, and the How it plays split stacks with the clip
above the slab.

## Copy

Written to avoid machine-written tells. Specifically: no em dashes anywhere, no rule-of-three
cadence, no "it's not just X, it's Y", short declaratives mixed with fragments, concrete
nouns over abstract ones.

Facts come from the Steam page; studio facts from GitHub and crashkonijn.com. The hero
tagline is adapted from Peter's own Steam copy.

### Open content items

- **Arena names are placeholders.** Sugar Rush, Chum Bucket, Grave Mistake, Cold Open are
  invented. Real names to be supplied; swapping them is a four-line edit in `main.js` and
  four in `index.html`.
- Socials to confirm: X/@CrashKonijn, GitHub, itch.io are assumed in. Bluesky, YouTube,
  TikTok unknown.
- No press kit URL or press contact email yet. Footer links are placeholders.
- Discord `xakvxZvZ6Q` and the Sendinblue mailing list URL carry over from the current site.

## Assets

Current weight is a problem. `Library Hero.png` alone is 2.2MB, and the capsule PNGs are
300 to 750KB.

Plan:
- Convert `Library Hero.png` and `Full HD.png` to JPEG at quality 82, into `images/web/`.
  Expected around 400KB for the hero, down from 2.2MB.
- Keep `Logo.png` and `logo_white.png` as PNG; they need transparency.
- Screenshots stay JPEG, already 335 to 508KB.
- Originals stay untouched in `images/basher_beatdown/` for press use.
- `loading="lazy"` on everything below the fold. Hero art and logo eager.
- `width`/`height` on every `<img>` to prevent layout shift.
- `preload="metadata"` on the clip so it does not fetch 1MB before it scrolls into view.

## Accessibility

- Semantic landmarks, one `<h1>` (the game name in the hero, logo as `<img>` with alt).
- Visible focus rings on all interactive elements.
- Lightbox: focus moves in on open, returns to the triggering tile on close, Escape closes.
- Arena tiles are `<button>`, not clickable `<div>`s.
- Clip is `muted` and decorative, marked `aria-hidden`, with the gameplay described in text.
- Target AA contrast. Cyan on near-black passes comfortably; cyan is never used for body text.

## SEO and sharing

`<title>`, meta description, canonical, Open Graph and Twitter card tags using
`Main Capsule.png` as the share image. `VideoGame` JSON-LD with developer, publisher and
platforms. `favicon` from the rabbit mark.

## Files

```
index.html          structure and copy
styles.css          tokens, layout, responsive
main.js             lightbox, trailer facade, mobile nav
images/web/         converted web-weight derivatives
docs/superpowers/   this spec
```

Three files rather than one inline blob, because the current `index.html` already has 180
lines of CSS in a `<style>` block and is awkward to edit.

## Testing

No test framework; this is a static page. Verification is manual and explicit:

1. Renders at 1440px, 1024px, 768px, 390px with no horizontal scroll.
2. Lightbox opens from all four tiles; arrows wrap; Escape closes; focus returns.
3. Trailer loads nothing from YouTube until clicked. Verified in the network panel.
4. All external links resolve and open in a new tab with `rel="noreferrer"`.
5. Keyboard-only pass through the whole page.
6. `prefers-reduced-motion` pauses the clip and disables transitions.
7. Page weight before trailer click stays under 1.5MB.

## Out of scope

News or devlog section, press kit page, multi-language, analytics, cookie banner,
newsletter form embedded in-page (links out to the existing Sendinblue form), CMS,
second game.
