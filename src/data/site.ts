/**
 * Every outbound URL and shared string lives here.
 * Change a link once, it changes everywhere on the site.
 */

export const site = {
  studio: 'Crash Interactive',
  game: 'Basher Beatdown',
  domain: 'crashinteractive.dev',
  tagline:
    "Knocking your friends out isn't enough. You have to feed them to the beast.",
  description:
    'A fast, funny physics brawler for 1 to 4 players. Knockouts are worth nothing. The only way to score is to feed your rivals to the beast guarding the arena.',
  platforms: 'Windows and macOS',

  youtubeId: 'NCbrJxm6Jpk',
  email: 'contact@crashinteractive.dev',

  links: {
    steam: 'https://store.steampowered.com/app/617920/Basher_Beatdown/',
    discord: 'https://discord.gg/xakvxZvZ6Q',
    mailingList:
      'https://9c87a49e.sibforms.com/serve/MUIFADyXr_CKyFTARr8YhhCtcMNioL9blKm9hDZJd0l0OPMuHAYvbXiNs8kbwV_ThFent-aAC1O0iOSy2XiorKP-htNDIod7y5b_4Tp65YkShXB9EbFZ28LQ_xEJev3gO99dCEFXlR8NZrmC2FSX28knxrt4S-cDEdV-hlLcgci6ajs7XgQ5VP0EeWYmbRRoLnvNx9TJ-TbfXf-zLA==',
    youtube: 'https://www.youtube.com/watch?v=NCbrJxm6Jpk',
    x: 'https://x.com/CrashKonijn',
    github: 'https://github.com/crashkonijn',
    itch: 'https://crashkonijn.itch.io/',
    goap: 'https://github.com/crashkonijn/GOAP',
    blackboard: 'https://assetstore.unity.com/packages/slug/285782',
  },
} as const;

/**
 * Steam store link tagged for Steamworks UTM tracking.
 *
 * Steamworks reports traffic AND wishlist conversions broken down by these parameters
 * (Marketing & Visibility > UTM Analytics), so this answers "how many wishlists did the
 * site actually produce", and which button produced them. Use a distinct `content` per
 * placement; everything else stays constant so the rows group cleanly.
 *
 * Do not tag the link used in JSON-LD or anywhere a machine reads it as the canonical
 * store URL. Those should stay clean.
 */
export function steamLink(content: 'hero' | 'nav' | 'band' | 'footer' | '404'): string {
  const url = new URL(site.links.steam);
  url.searchParams.set('utm_source', site.domain);
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_campaign', 'site');
  url.searchParams.set('utm_content', content);
  return url.href;
}

export const nav = [
  { label: 'How it plays', href: '#how-it-plays' },
  { label: 'Trailer', href: '#trailer' },
  { label: 'Arenas', href: '#arenas' },
  { label: 'Studio', href: '#studio' },
];
