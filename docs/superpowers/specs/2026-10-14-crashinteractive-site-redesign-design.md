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

- **Astro, deployed to GitHub Pages via Actions.** Chosen over hand-written static files;
  see *Why Astro* below. `CNAME` moves to `public/` so `crashinteractive.dev` survives the build.
- **Static output only.** `output: 'static'`, no SSR, no server runtime. The deployed
  artifact is still plain HTML, CSS and one small JS file.
- Game is unreleased. Release date is "to be announced". No price, no buy button.
- Single developer maintaining it. Adding an arena later must be one entry in one data file.

### Why Astro

The original plan was three hand-written files and no build step. Astro wins on three
counts specific to this site:

1. **Images.** The dominant technical problem here is asset weight: `Library Hero.png` is
   2.2MB and there are five screenshots plus capsules. Astro's `<Image>` emits AVIF and
   WebP with fallbacks, responsive `srcset`, and intrinsic `width`/`height`. Doing this by
   hand means re-running a conversion script every time an arena is added.
2. **Growth.** More arenas are coming, and a press kit and devlog are likely before launch.
   Shared nav and footer as components beats copy-pasting them across pages.
3. **Zero JS by default.** Astro ships no client JavaScript unless asked, so the lightbox
   remains the only script on the page. Adopting a framework costs nothing at runtime.

Cost accepted: Node and npm are now required to build, and deployment moves from
"commit to main" to a GitHub Action. **The repo's Pages source must be changed from
"Deploy from a branch" to "GitHub Actions" manually.**

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

1. **Sticky nav** - studio wordmark, section links, Discord and Wishlist buttons.
2. **Hero** - full-bleed key art, game logo, tagline, Wishlist + Watch trailer.
4. **How it plays** - statement + looping clip, then the spec slab.
5. **Trailer** - click-to-load YouTube facade.
6. **Arenas** - 2x2 grid, lightbox, "more under wraps" note.
7. **Wishlist band** - key art background, single ask.
8. **Studio** - Crash Interactive / CrashKonijn, GOAP story.
9. **Footer** - three link columns, socials, legal.

The order is hook, explain, prove, show breadth, ask.

How it plays sits **above** the trailer because it explains the game in about five seconds
with no click: the statement states the rule and the clip autoplays silently beside it. A
trailer asks for a minute of commitment before the visitor knows what they are committing
to. Arenas come after both, because "how much of this is there" is a question you only
have once you understand the game.

Risk accepted: How it plays and the trailer both lead with 16:9 motion. They are
differentiated by the clip being half-width inside a split while the trailer is a
full-width letterbox, with the 62px statement between the hero art and the trailer. If it
reads as repetitive once built, swapping sections 4 and 5 is a block move.

## Section detail

### Nav

Sticky, blurred dark background, 70px tall. Studio wordmark left, section links right,
then a ghost Discord button and the solid Wishlist button. Links and Discord hide below
900px; the Wishlist button never hides. That button is the reason the nav is sticky at all.

An announcement ribbon above the nav was built and then cut. It said the same thing the
Wishlist button already says, in a louder way.

The wordmark uses `logo_white_trimmed.png`, not `logo_white.png`. The original is
1000x1000 with the 830x417 lockup floating in transparent padding, so sizing it by height
produced an illegible 34px square.

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

Tiles carry no alpha badge. At thumbnail size the label would repeat four times over a
grid that already holds an eyebrow, a name, a description and an expand glyph.

Click opens a lightbox: the full-size shot, caption, prev/next, close. Arrow keys
navigate, Escape closes, body scroll locks while open. The **"Alpha gameplay"** badge
appears here, where the image is being inspected at full size. See *Alpha labelling*.

Below the grid: three dim dots and "More arenas still under wraps." This frames four as a
reveal rather than the complete roster and gives an obvious slot for arena five.

Using `screenshot_0` (gingerbread), `screenshot_2` (shark), `screenshot_3` (graveyard),
`screenshot_4` (yeti). `screenshot_1` (sewer) is held back as the murkiest and least
readable at a glance.

### How it plays

Two parts, deliberately one section.

**Top:** a 2fr / 3fr split, so the clip gets the larger share. Left is the statement,
`Archivo Black`, both lines the same size, `clamp(34px, 5vw, 50px)`, line-height 0.94:

> ~~Knock them out.~~
> **Feed them to the _beast_.**

Strikethrough is native CSS `line-through` in cyan, so it survives a wrap at any size.
"beast" is cyan. Below it, two short paragraphs.

Right is `video_sample.mp4`, muted, loop, playsinline, 16:9, carrying the **"Alpha
gameplay"** badge. It is the only moving thing on the page, and it proves the claim sitting
next to it.

It uses `preload="none"` plus an IntersectionObserver that sets `preload="auto"` and calls
`play()` at 25% visibility, pausing when it scrolls away. A plain `autoplay` attribute with
`preload="metadata"` does not work: Chrome will not autoplay a video it has not buffered,
so the clip sat paused on a black box. Loading on view also keeps 1MB off the initial page
load.

**Bottom:** one framed slab, single border, single radius, dividers drawn as 1px hairline
grid gaps:

- Row 1, three cells: `01 Grab`, `02 Carry`, `03 Feed`.
- Row 2, five cells: Players, Modes, Solo, Mutators, Platforms.

Both rows share one frame so they read as a single object. An earlier version gave each
block its own border, background and spacing, which read as three widgets stitched together.

### Wishlist band

Key art at 30% opacity under a dark gradient. Eyebrow, large heading, one sentence, then
Wishlist, Discord and mailing list buttons. The second and final wishlist ask, and the one
place all three calls to action sit together.

### Studio

A 340px portrait of Peter at his desk, 3:4, with a caption block over the bottom reading
his name and "Owner and developer". Chosen over the studio logo: a face is better than a
mark for a "who's making this" section, and the Basher Beatdown banner visible behind him
ties the person to the game.

Cropped to `profile_crop.jpg` from the original `profile.jpg`, dropping the ceiling and the
desk edge so he fills more of the frame while the banner stays readable. Original retained
for press.

Heading: "Who's making this". Covers Crash Interactive
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

### Alpha labelling

The game is unreleased and what ships will not look exactly like this, so captured footage
is labelled **"Alpha gameplay"**. The label appears in exactly two places:

1. **The looping clip** in How it plays.
2. **The lightbox**, when an arena screenshot is opened full size.

One shared component in both:

- Top-left of the media, 14px inset.
- `rgba(4,6,10,.78)` fill, hairline border, 6px radius, blurred backdrop so it stays
  readable over the near-white corners of the gingerbread and ice arenas.
- 10.5px, 700 weight, `.16em` tracking, uppercase, muted text.
- Not a link, not interactive, `pointer-events: none`.

Deliberately **not** labelled:

- **Arena grid tiles.** At thumbnail size the badge would repeat four times across a grid
  that is already carrying four pieces of text per tile. The label is shown when the shot
  is opened, which is when it is being looked at properly.
- **Hero art and the wishlist band.** Those are illustrated key art, not captured footage.
  Labelling artwork as gameplay would be inaccurate in the other direction.

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

Astro's `<Image>` handles this at build time:
- AVIF and WebP emitted with original-format fallback, responsive `srcset`.
- Intrinsic `width`/`height` on every image, so no layout shift.
- `loading="lazy"` and `decoding="async"` below the fold; hero art and logo `eager` with
  `fetchpriority="high"`.
- Originals stay untouched in `images/basher_beatdown/` and are imported from there, so
  there is one copy of each asset and the Steam capsule names are preserved.
- The clip is `preload="none"` and loads on view, so it does not pull 1MB up front.

**Astro emits `width`/`height` attributes** on every image to prevent layout shift. Those
are presentational hints, so any image also relying on `aspect-ratio` must set
`height: auto` or it renders at full intrinsic height. This bit the arena tiles, which
rendered 547x1080 instead of 547x308 until `height: auto` was added.

`image.responsiveStyles` is off. It only styles images using the `layout` prop, which this
site does not use, so it would ship ~1KB of CSS matching nothing.

Two derived assets are committed alongside the originals:
- `logo_white_trimmed.png` and `logo_trimmed.png`, transparent padding removed.
- `profile_crop.jpg`, the studio portrait cropped.

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
astro.config.mjs
package.json
public/CNAME                      custom domain, survives the build
public/video_sample.mp4           clip, served as-is
src/data/site.ts                  all URLs in one place
src/data/arenas.ts                arena names, blurbs, images. One entry per arena.
src/styles/global.css             tokens and base styles
src/layouts/Base.astro            html head, meta, OG, JSON-LD
src/components/                   Nav, Hero, HowItPlays, Trailer, Arenas,
                                  WishlistBand, Studio, Footer, AlphaBadge, Btn
src/pages/index.astro             composes the sections
.github/workflows/deploy.yml      build and deploy to Pages
images/basher_beatdown/           originals, imported and optimised at build time
docs/superpowers/specs/           this spec
```

Arena names live in exactly one file, `src/data/arenas.ts`. Adding arena five, or replacing
the placeholder names with real ones, is an edit to that file alone.

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
