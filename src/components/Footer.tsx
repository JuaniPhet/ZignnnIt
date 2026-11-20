import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative bg-carbon dark:bg-black text-white py-12 sm:py-16 overflow-hidden">
      {/* Carbon footer (dark mode: pure black, to stay distinct from the carbon page background) */}
      {/* Top gold-amber gradient border highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber/70 to-transparent"></div>

      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="container mx-auto max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">

          {/* Logo & Tagline */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3">
            <Link href="/" aria-label={tNav("homeAria")}>
              <Logo className="block w-[150px] h-auto text-cream" />
            </Link>
            <p className="text-xs text-white/70 max-w-sm">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation Links */}
          {/* <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <li>
              <Link href="/#home" className="text-sm font-medium text-white/70 hover:text-amber transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm font-medium text-white/70 hover:text-amber transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/#services" className="text-sm font-medium text-white/70 hover:text-amber transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-sm font-medium text-white/70 hover:text-amber transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm font-medium text-white/70 hover:text-amber transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/shop" className="text-sm font-medium text-white/70 hover:text-amber transition-colors">
                Shop
              </Link>
            </li>
          </ul> */}

          {/* Social CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/japhetseumo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-primary text-white hover:text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
            >
              <i className="ri-linkedin-fill text-lg"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        {/* Stacked and centered on mobile, side by side from lg */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-center text-xs text-white/60 gap-2 lg:gap-4">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          {/* Brand signature (same in every language) */}
          <p className="font-display text-sm font-bold tracking-normal text-white">{t("signature")}</p>
        </div>
        </div>
      </div>
    </footer>
  );
}
