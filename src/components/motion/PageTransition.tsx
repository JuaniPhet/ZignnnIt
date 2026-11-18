"use client"

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Page transition: an amber block (a nod to the logo's square) sweeps across the
 * screen on every internal navigation.
 *
 * How: a capture-phase click listener on the document sees link clicks before
 * React/Next does. For an internal link to another page it calls preventDefault()
 * (next/link then skips its own navigation), plays the "cover" animation, then
 * navigates with router.push. When the pathname changes, the block slides away.
 * Same-page anchors, new tabs, modified clicks and downloads are left untouched.
 */
export default function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const revealRef = useRef<() => void>(() => {});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (prefersReducedMotion()) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith("/api") || /\.[a-z0-9]+$/i.test(url.pathname)) return;
      if (url.pathname === window.location.pathname) return; // same page (anchor/search): no transition

      e.preventDefault();
      covering.current = true;
      gsap.killTweensOf(panel);
      gsap.fromTo(
        panel,
        { scaleX: 0, transformOrigin: "0% 50%", visibility: "visible" },
        {
          scaleX: 1,
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        }
      );
      // Safety net: never leave the screen covered (slow network, failed navigation).
      window.setTimeout(() => covering.current && reveal(), 4000);
    };

    const reveal = () => {
      covering.current = false;
      gsap.killTweensOf(panel);
      gsap.to(panel, {
        scaleX: 0,
        transformOrigin: "100% 50%",
        duration: 0.5,
        delay: 0.05,
        ease: "power3.inOut",
        onComplete: () => gsap.set(panel, { visibility: "hidden" }),
      });
    };
    revealRef.current = reveal;

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new page has rendered: uncover it.
  useEffect(() => {
    if (covering.current) revealRef.current();
  }, [pathname]);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] bg-amber invisible"
      style={{ transform: "scaleX(0)" }}
    >
      {/* Small carbon square, like the logo's mark */}
      <span className="absolute left-1/2 top-1/2 h-8 w-14 -translate-x-1/2 -translate-y-1/2 bg-carbon" />
    </div>
  );
}
