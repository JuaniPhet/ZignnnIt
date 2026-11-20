// Final ZignnnIt logo (source files: docs/logo/*.svg — positive, negative, symbol).
// The positive and negative files share the same shapes; only the wordmark colour
// changes (carbon on light, cream on dark). So we keep the shapes once, here, and
// colour them where they are used (currentColor on the site, fixed hex in images).
// Never retype "ZignnnIt" as text instead of the logo: spacing was tuned by hand.

/** Full logo: amber block + wordmark. Aspect ratio ≈ 3.35:1. */
export const LOGO_VIEWBOX = "16 -885 3625 1081";
/** Symbol only: the Z + amber block. */
export const SYMBOL_VIEWBOX = "16 -885 555 885";
/** The amber block above the Z (brand signature, always #F59E0B). */
export const LOGO_BLOCK = "M36 -885h515v143H36Z";
/** Wordmark letters, in order: Z, i, g, n, n, n, I, t. The first one is the symbol's Z. */
export const LOGO_WORDMARK_PATHS = [
  "M571 0V-127H275L186 -122L276 -218L551 -558V-670H36V-543H283L378 -548L281 -442L16 -112V0Z",
  "M774 -548V-670H631V-548ZM774 0V-490H631V0Z",
  "M1036 -14C1141 -14 1176 -84 1190 -163V-48C1190 36 1151 66 1081 66C1009 66 947 38 909 3L876 140C914 168 992 196 1087 196C1279 196 1333 86 1333 -52V-490H1190V-351C1176 -430 1136 -501 1036 -501C922 -501 846 -411 846 -257C846 -103 919 -14 1036 -14ZM990 -257C990 -343 1031 -389 1095 -389C1157 -389 1190 -352 1190 -272V-242C1190 -162 1157 -125 1095 -125C1031 -125 990 -171 990 -257Z",
  "M1556 0V-271C1556 -351 1578 -389 1646 -389C1711 -389 1727 -352 1727 -292V0H1870V-342C1870 -443 1813 -500 1720 -500C1619 -500 1572 -428 1556 -348V-490H1413V0Z",
  "M2105 0V-271C2105 -351 2127 -389 2195 -389C2260 -389 2276 -352 2276 -292V0H2419V-342C2419 -443 2362 -500 2269 -500C2168 -500 2121 -428 2105 -348V-490H1962V0Z",
  "M2654 0V-271C2654 -351 2676 -389 2744 -389C2809 -389 2825 -352 2825 -292V0H2968V-342C2968 -443 2911 -500 2818 -500C2717 -500 2670 -428 2654 -348V-490H2511V0Z",
  "M3203 0V-670H3060V0Z",
  "M3495 10C3570 10 3620 -25 3641 -52L3600 -169C3585 -142 3558 -117 3527 -117C3499 -117 3479 -131 3479 -171V-381H3615V-490H3479V-623L3336 -548V-490H3263V-381H3336V-145C3336 -54 3387 10 3495 10Z",
];
export const LOGO_Z = LOGO_WORDMARK_PATHS[0];

/** Standalone SVG markup, for images (share image, favicons) where CSS can't reach. */
export function logoSvg(wordmark: string, amber = "#F59E0B") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}"><path d="${LOGO_BLOCK}" fill="${amber}"/>${LOGO_WORDMARK_PATHS.map((d) => `<path d="${d}" fill="${wordmark}"/>`).join("")}</svg>`;
}
