/**
 * The arena roster.
 *
 * PLACEHOLDER NAMES. `name` on all four entries is invented and waiting on the real
 * in-game names. Swapping them is an edit to this file alone, nothing else references them.
 *
 * To reveal another arena: add an entry here. The grid, the lightbox and the
 * "more under wraps" note all read from this array.
 *
 * screenshot_1 (the sewer) is deliberately held back as the murkiest of the five.
 */

import gingerbread from '../../images/basher_beatdown/screenshot_0.jpg';
import deep from '../../images/basher_beatdown/screenshot_2.jpg';
import graveyard from '../../images/basher_beatdown/screenshot_3.jpg';
import ice from '../../images/basher_beatdown/screenshot_4.jpg';

export interface Arena {
  /** Small cyan label above the name. The place. */
  eyebrow: string;
  /** PLACEHOLDER. The arena's name. */
  name: string;
  /** One line. Keep it short and dry. */
  blurb: string;
  image: ImageMetadata;
  /** Describes the screenshot for screen readers. */
  alt: string;
}

export const arenas: Arena[] = [
  {
    eyebrow: 'The Gingerbread',
    name: 'Sugar Rush',
    blurb: 'Everything here is edible. You included.',
    image: gingerbread,
    alt: 'A gingerbread arena with candy cane pillars and a giant red bear with its mouth open at the bottom.',
  },
  {
    eyebrow: 'The Deep',
    name: 'Chum Bucket',
    blurb: 'Waterfalls, spike mines, and a very wide shark.',
    image: deep,
    alt: 'An underwater arena with falling bubble columns and an enormous grey shark waiting below.',
  },
  {
    eyebrow: 'The Graveyard',
    name: 'Grave Mistake',
    blurb: "He's been dead for years. Still hungry.",
    image: graveyard,
    alt: 'A green-lit graveyard arena with crumbling stonework and a giant zombie head at the bottom.',
  },
  {
    eyebrow: 'The Ice Caves',
    name: 'Cold Open',
    blurb: 'Crack the ice, serve the yeti.',
    image: ice,
    alt: 'An ice cavern arena with glowing blue crystals and a white yeti roaring at the bottom.',
  },
];
