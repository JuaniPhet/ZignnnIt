import { LOGO_BLOCK, LOGO_VIEWBOX, LOGO_WORDMARK_PATHS, LOGO_Z, SYMBOL_VIEWBOX } from "@/components/brand/logo-paths";

type Props = { className?: string };

/**
 * ZignnnIt logo, inline SVG. The wordmark uses currentColor, so the same component is
 * the positive version (text-carbon / text-foreground) and the negative one
 * (text-cream): in the header, `text-foreground` switches automatically with the theme.
 * The amber block is always the brand amber (--amber).
 * Decorative here (aria-hidden): the surrounding link carries the accessible name.
 * Size it by width; the height follows the ratio (≈ 3.35:1). Minimum 120 px wide.
 */
export function Logo({ className }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={LOGO_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <path d={LOGO_BLOCK} fill="var(--amber)" />
      {LOGO_WORDMARK_PATHS.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

/** Symbol only (Z + amber block): loader, small spaces. */
export function LogoSymbol({ className }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={SYMBOL_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <path d={LOGO_BLOCK} fill="var(--amber)" />
      <path d={LOGO_Z} fill="currentColor" />
    </svg>
  );
}
