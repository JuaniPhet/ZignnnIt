import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"

// Self-hosted fonts (Fontshare, ITF Free Font License — see src/fonts/LICENSE-ITF-FFL.txt).
// next/font/local serves them from our own domain, preloads them and generates
// a size-adjusted fallback to avoid layout shift while they load.
const cabinetGrotesk = localFont({
  src: [
    { path: "../fonts/CabinetGrotesk-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/CabinetGrotesk-Extrabold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GeneralSans-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZignnnIt - Creative Digital Agency",
  description: "We craft bespoke digital and visual experiences to elevate your business, blending creativity with impact.",
  icons: {
    icon: "/img/ZignnnIt-favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(cabinetGrotesk.variable, generalSans.variable)}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
