"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getLenis } from "@/lib/motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mobile menu: lock page scroll while open, close with Escape.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop(); // smooth scroll ignores body overflow: pause it explicitly
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Close the mobile menu when the viewport reaches the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1180px)");
    const onChange = () => mq.matches && setIsOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  // Locale-aware Link adds the /en or /fr prefix; "/#services" works from any page
  // (on the home page Next.js just scrolls to the section).
  const links = [
    { href: "/#home", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/#services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
    <header id="navbar" className="bg-background/95 backdrop-blur-md fixed shadow-lg shadow-amber/10 dark:shadow-amber/5 w-full z-50 top-0 left-0 header-nav border-b border-amber/20">
      {/* Gold-amber gradient line at the bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber/60 to-transparent"></div>
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <nav className="container mx-auto max-w-7xl flex items-center justify-between text-lg h-20 sm:h-24">
          <Link href="/" onClick={closeMenu} aria-label={t("homeAria")}>
          {/* Brief: 120 px wide minimum (mobile), a little larger on desktop */}
            <Logo className="block w-[120px] lg:w-[136px] h-auto text-foreground" />
        </Link>

        {/* Desktop links — transparent: the header's frosted glass shows through */}
        <ul className="hidden xl:flex flex-row items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="nav-link hover:bg-secondary hover:text-secondary-foreground p-3 rounded-lg">
                {link.label}
              </Link>
            </li>
          ))}
          {/* <li><Link href="/#pricing" className="nav-link …">Pricing</Link></li> */}
        </ul>

        <div className="flex gap-2 sm:gap-4 items-center">
          {/* Language switcher (desktop) — in the mobile menu below xl */}
          <LocaleSwitcher className="hidden xl:inline-flex" />

          {/* Dark Mode Icon */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xl sm:text-3xl cursor-pointer p-2 rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t("toggleTheme")}
          >
            {mounted && (theme === "dark" ? <i className="ri-sun-fill text-amber"></i> : <i className="ri-moon-fill"></i>)}
          </button>

          {/* Shop button */}
          <div className="hidden xl:flex" data-magnetic>
            <Link href="/shop" className="bg-primary text-primary-foreground px-5 py-3 font-semibold rounded-lg hover:brightness-110 active:scale-[0.97] transition-all duration-200">
              {t("shop")}
            </Link>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            type="button"
            onClick={toggleMenu}
            className="text-xl sm:text-3xl cursor-pointer xl:hidden p-2 rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <i className={isOpen ? "ri-close-large-line" : "ri-menu-line"}></i>
          </button>
        </div>
      </nav>
      </div>
    </header>

    {/*
      Mobile menu: full-screen opaque overlay, rendered OUTSIDE the header.
      The header uses backdrop-filter, which turns it into the containing block of
      any position:fixed descendant — an overlay inside it could not cover the viewport.
      Overlay z-40 sits under the header (z-50), so the logo and close button stay sharp.
    */}
    <div
      id="mobile-menu"
      inert={!isOpen}
      className={`xl:hidden fixed inset-0 z-40 bg-background flex flex-col items-center justify-center pt-20 sm:pt-24 transition-[opacity,visibility] duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <ul className="flex flex-col items-center gap-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={closeMenu}
              className="block font-sans font-semibold text-[26px] leading-tight px-4 py-2 rounded-lg hover:text-amber-deep dark:hover:text-amber transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="pt-4">
          <Link
            href="/shop"
            onClick={closeMenu}
            className="block bg-primary text-primary-foreground text-xl px-8 py-3 font-semibold rounded-lg hover:brightness-110 active:scale-[0.97] transition-all duration-200"
          >
            {t("shop")}
          </Link>
        </li>
      </ul>
      <LocaleSwitcher className="mt-10 text-base" onSwitch={closeMenu} />
    </div>
    </>
  );
}
