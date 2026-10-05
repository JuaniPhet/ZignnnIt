"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTheme } from "next-themes";

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileProps = {
  siteKey: string;
  /** Called with a fresh token once the visitor passes the challenge. */
  onVerify: (token: string) => void;
  /** Called when the token expires or the challenge errors (token must be cleared). */
  onExpire: () => void;
  /** Increment to reset the widget (tokens are single-use). */
  resetSignal?: number;
  className?: string;
};

/**
 * Cloudflare Turnstile widget (explicit rendering, no extra dependency).
 * The widget follows the site theme (next-themes) rather than the OS theme.
 */
export default function Turnstile({ siteKey, onVerify, onExpire, resetSignal = 0, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const { resolvedTheme } = useTheme();

  // Keep latest callbacks without re-rendering the widget on every parent render.
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
  }, [onVerify, onExpire]);

  const theme: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";

  // Render (or re-render on theme change).
  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      callback: (token) => onVerifyRef.current(token),
      "expired-callback": () => onExpireRef.current(),
      "error-callback": () => onExpireRef.current(),
    });
    widgetIdRef.current = widgetId;

    return () => {
      window.turnstile?.remove(widgetId);
      widgetIdRef.current = null;
      onExpireRef.current();
    };
  }, [scriptReady, siteKey, theme]);

  // Reset on demand (after each submission).
  useEffect(() => {
    if (resetSignal === 0 || !widgetIdRef.current) return;
    window.turnstile?.reset(widgetIdRef.current);
    onExpireRef.current();
  }, [resetSignal]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className={className} />
    </>
  );
}
