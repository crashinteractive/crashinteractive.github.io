/**
 * The arena roster.
 *
 * The grid, the lightbox and the "more under wraps" note all read from this array,
 * so revealing another arena means adding one entry here and nothing else.
 *
 * `eyebrow` names the beast, `name` names the arena. Keeping the beast in the eyebrow
 * reinforces the hook on every tile and avoids colliding with arena names like
 * "The Deep" and "The Sewers".
 */

import gingerbread from '../../images/basher_beatdown/screenshot_0.jpg';
import deep from '../../images/basher_beatdown/screenshot_2.jpg';
import graveyard from '../../images/basher_beatdown/screenshot_3.jpg';
import ice from '../../images/basher_beatdown/screenshot_4.jpg';

export interface Arena {
  /** Small cyan label above the name. The thing that eats you. */
  eyebrow: string;
  /** The arena's name. */
  name: string;
  /** One line. Keep it short and dry. */
  blurb: string;
  image: ImageMetadata;
  /** Describes the screenshot for screen readers. */
  alt: string;
}

export const arenas: Arena[] = [
  {
    eyebrow: 'The candy bear',
    name: 'Sugar Rush',
    blurb: 'Everything here is edible. You included.',
    image: gingerbread,
    alt: 'A gingerbread arena with candy cane pillars and a giant red bear with its mouth open at the bottom.',
  },
  {
    eyebrow: 'The shark',
    name: 'The Deep',
    blurb: 'Waterfalls, spike mines, and a very wide shark.',
    image: deep,
    alt: 'An underwater arena with falling bubble columns and an enormous grey shark waiting below.',
  },
  {
    eyebrow: 'The zombie',
    name: 'Grave Mistake',
    blurb: "He's been dead for years. Still hungry.",
    image: graveyard,
    alt: 'A green-lit graveyard arena with crumbling stonework and a giant zombie head at the bottom.',
  },
  {
    eyebrow: 'The yeti',
    name: 'Frostbite',
    blurb: 'Crack the ice, serve the yeti.',
    image: ice,
    alt: 'An ice cavern arena with glowing blue crystals and a white yeti roaring at the bottom.',
  },
];

/*
 * Named but not yet revealed. Uncomment an entry to add it to the grid.
 *
 * The Sewers    - the ogre. Art exists: images/basher_beatdown/screenshot_1.jpg
 * Swamped       - the frog. Seen in the key art and the clip, no screenshot yet.
 *
 * Note: the grid is two columns, so a fifth arena leaves one tile alone on the last
 * row. Either reveal two at once, or make the odd one span the full width.
 */
