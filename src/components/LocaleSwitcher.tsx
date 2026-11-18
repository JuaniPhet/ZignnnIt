"use client"

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
  /** Called after a language is picked (e.g. to close the mobile menu). */
  onSwitch?: () => void;
};

/**
 * "EN / FR" switch. It keeps the current page (/en/contact → /fr/contact) and keeps
 * the #hash, so a visitor reading the Services section stays there.
 * next-intl stores the choice in the NEXT_LOCALE cookie, which the proxy reads on
 * the next visit.
 */
export default function LocaleSwitcher({ className, onSwitch }: LocaleSwitcherProps) {
  const t = useTranslations("language");
  const current = useLocale();
  const pathname = usePathname(); // without the locale prefix, e.g. "/contact"
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (locale: Locale) => {
    if (locale === current) return;
    onSwitch?.();
    startTransition(() => {
      router.replace(`${pathname}${window.location.hash}`, { locale, scroll: false });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("inline-flex items-center rounded-full border border-border p-1 text-sm font-semibold", isPending && "opacity-60", className)}
    >
      {routing.locales.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            onClick={() => switchTo(locale)}
            aria-current={active ? "true" : undefined}
            aria-label={active ? undefined : t("switchTo", { language: t(locale) })}
            className={cn(
              "rounded-full px-3 py-1 uppercase transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
