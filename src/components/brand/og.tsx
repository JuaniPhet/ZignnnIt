import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { logoSvg } from "@/components/brand/logo-paths";

export const OG_SIZE = { width: 1200, height: 630 };

const CARBON = "#141414";
const AMBER = "#F59E0B";

type OgProps = {
  /** Small label above the headline (e.g. a project category). */
  eyebrow?: string;
  /** Headline; `highlight` must be its ending, rendered in amber. */
  headline: string;
  highlight?: string;
  footer: string;
};

/**
 * Shared renderer for the branded share images (Open Graph).
 * Satori (next/og) reads TTF/OTF/WOFF only, hence the static OTF copies in src/fonts/og.
 * Satori also ignores font-feature-settings, so the Cabinet Grotesk copy has its cmap
 * remapped to the single-storey g (the ss05 glyph, as in the logo) by default.
 */
export async function renderOgImage({ eyebrow, headline, highlight, footer }: OgProps) {
  const cut = highlight ? headline.lastIndexOf(highlight) : -1;
  const before = cut >= 0 ? headline.slice(0, cut) : headline;
  const after = cut >= 0 && highlight ? highlight : "";

  const [display, sans] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og/CabinetGrotesk-Extrabold.otf")),
    readFile(join(process.cwd(), "src/fonts/og/GeneralSans-Medium.otf")),
  ]);

  // Negative logo (cream wordmark) on the carbon background.
  const logo = logoSvg("#FAF7F2");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(circle at 85% 15%, rgba(245,158,11,0.28), transparent 45%), ${CARBON}`,
          color: "#FFFFFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders <img> only */}
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(logo)}`} width={240} height={72} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div style={{ display: "flex", fontFamily: "General Sans", fontSize: 30, color: AMBER, marginBottom: 16 }}>{eyebrow}</div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Cabinet Grotesk", fontSize: 76, lineHeight: 1.04, letterSpacing: "-0.025em", maxWidth: 1000 }}>
            <span>{before}</span>
            {after && <span style={{ color: AMBER, marginLeft: before.endsWith(" ") ? 0 : 18 }}>{after}</span>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "General Sans", fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
          <div style={{ width: 28, height: 16, background: AMBER }} />
          {footer}
          <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.5)" }}>zignnnit.com</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cabinet Grotesk", data: display, weight: 800, style: "normal" },
        { name: "General Sans", data: sans, weight: 500, style: "normal" },
      ],
    }
  );
}
