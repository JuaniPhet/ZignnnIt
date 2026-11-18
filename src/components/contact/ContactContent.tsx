"use client"

import { useCallback, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import Turnstile from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type FormStatus = "idle" | "loading" | "success" | "error";

/**
 * Contact page body (client: form state, fetch, Turnstile).
 * The page itself (app/[locale]/contact/page.tsx) is a server component that
 * only adds the translated metadata.
 */
export default function ContactContent() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<FormStatus>("idle");
  // We store an error CODE, not a sentence: it is translated at render time,
  // so the message follows the current language.
  const [errorCode, setErrorCode] = useState("generic");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  const handleTurnstileVerify = useCallback((token: string) => setTurnstileToken(token), []);
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(""), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setErrorCode("turnstile_pending");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (key: string) => String(formData.get(key) ?? "").trim();

    setStatus("loading");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: value("first-name"),
          lastName: value("last-name"),
          company: value("company"),
          email: value("email"),
          country: value("country"),
          phone: value("phone-number"),
          message: value("message"),
          website: value("website"),
          turnstileToken,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        // The API answers with a stable code (e.g. "email_invalid") — see api/send/route.ts.
        throw new Error(typeof result?.code === "string" ? result.code : "generic");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorCode(err instanceof Error && err.message ? err.message : "generic");
    } finally {
      // A Turnstile token is single-use: get a fresh one for the next submission.
      setTurnstileReset((n) => n + 1);
    }
  }

  const isLoading = status === "loading";
  const errorKey = `errors.${errorCode}`;
  const errorText = t.has(errorKey as "errors.generic") ? t(errorKey as "errors.generic") : t("errors.generic");

  return (
      <main className="pt-24 min-h-screen bg-background">
        <div className="isolate px-4 sm:px-6 py-16 sm:py-24 lg:px-8 relative">
          {/* Background gradient blob */}
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber to-neutral-500 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            ></div>
          </div>

          {/* Page Header */}
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6 border border-border/50 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {t("badge")}
            </div>
            <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              {t.rich("title", { hl: (chunks) => <span className="text-primary">{chunks}</span> })}
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {/* Form Container with Glow & Gradient Border */}
          <div className="mx-auto max-w-2xl">
            <div className="relative rounded-3xl">
              {/* Backlight glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber/20 via-primary/30 to-amber/20 rounded-3xl opacity-60 blur-xl pointer-events-none"></div>

              {/* Fine glowing gradient border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-amber/40 via-primary to-amber/40 rounded-3xl opacity-70 blur-[1px] pointer-events-none"></div>

              {/* Glass Card */}
              <div className="relative bg-secondary/80 dark:bg-card/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl">
                <form
                  onSubmit={handleSubmit}
                  aria-busy={isLoading}
                  className="space-y-6"
                >
                  {/* Honeypot anti-spam : caché aux humains, ignoré par les lecteurs d'écran */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" id="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-semibold text-foreground mb-2">
                        {t("form.firstName")}
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        maxLength={100}
                        required
                        placeholder={t("form.firstNamePlaceholder")}
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-semibold text-foreground mb-2">
                        {t("form.lastName")}
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        maxLength={100}
                        placeholder={t("form.lastNamePlaceholder")}
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                        {t("form.company")}
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="organization"
                        maxLength={150}
                        placeholder={t("form.companyPlaceholder")}
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        {t("form.email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        maxLength={254}
                        required
                        placeholder={t("form.emailPlaceholder")}
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="phone-number" className="block text-sm font-semibold text-foreground mb-2">
                        {t("form.phone")}
                      </label>
                      <div className="flex rounded-xl bg-background/80 border border-border overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200 shadow-sm">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
                          aria-label={t("form.country")}
                          className="appearance-none bg-transparent py-3 pl-3 pr-2 text-sm font-medium text-muted-foreground border-r border-border focus:outline-none cursor-pointer"
                        >
                          {/* Value keeps the country code for the email; the label stays compact on mobile */}
                          <option value="CMR (+237)" className="bg-background text-foreground">CM +237</option>
                          <option value="USA (+1)" className="bg-background text-foreground">US +1</option>
                          <option value="FRA (+33)" className="bg-background text-foreground">FR +33</option>
                          <option value="ESP (+34)" className="bg-background text-foreground">ES +34</option>
                          <option value="DEU (+49)" className="bg-background text-foreground">DE +49</option>
                          <option value="CHE (+41)" className="bg-background text-foreground">CH +41</option>
                          <option value="ITA (+39)" className="bg-background text-foreground">IT +39</option>
                          <option value="GBR (+44)" className="bg-background text-foreground">GB +44</option>
                          <option value="CAN (+1)" className="bg-background text-foreground">CA +1</option>
                          <option value="AUS (+61)" className="bg-background text-foreground">AU +61</option>
                          <option value="IND (+91)" className="bg-background text-foreground">IN +91</option>
                        </select>
                        <input
                          type="tel"
                          name="phone-number"
                          id="phone-number"
                          autoComplete="tel-national"
                          maxLength={30}
                          className="block min-w-0 grow py-3 px-4 text-base text-foreground bg-transparent placeholder:text-muted-foreground/60 focus:outline-none"
                          placeholder={t("form.phonePlaceholder")}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        {t("form.message")}
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        minLength={10}
                        maxLength={5000}
                        required
                        placeholder={t("form.messagePlaceholder")}
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm resize-y"
                      ></textarea>
                    </div>
                  </div>
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    language={locale}
                    onVerify={handleTurnstileVerify}
                    onExpire={handleTurnstileExpire}
                    resetSignal={turnstileReset}
                    className="flex justify-center min-h-[65px]"
                  />
                  <div className="pt-4">
                    <button
                      type="submit"
                      id="contact-submit"
                      disabled={isLoading}
                      className="w-full rounded-xl bg-primary text-primary-foreground py-4 text-center text-lg font-semibold shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:brightness-100"
                    >
                      <span>{isLoading ? t("form.sending") : t("form.submit")}</span>
                      {isLoading ? (
                        <svg
                          className="w-5 h-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                      ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      )}
                    </button>
                  </div>

                  <div aria-live="polite">
                    {status === "success" && (
                      <p
                        id="contact-success"
                        className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                      >
                        {t("form.success")}
                      </p>
                    )}
                    {status === "error" && (
                      <p
                        id="contact-error"
                        role="alert"
                        className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400"
                      >
                        {errorText}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Quick Contact Info Badges */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-5 sm:p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center w-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-amber-deep dark:text-amber mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="font-sans font-semibold tracking-normal text-foreground text-base mb-1">{t("info.emailTitle")}</h3>
              <p className="text-sm text-muted-foreground break-all px-2">contact@zignnnit.com</p>
            </div>

            <div className="flex flex-col items-center p-5 sm:p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center w-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-amber-deep dark:text-amber mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="font-sans font-semibold tracking-normal text-foreground text-base mb-1">{t("info.locationTitle")}</h3>
              <p className="text-sm text-muted-foreground px-2">{t("info.location")}</p>
            </div>

            <div className="flex flex-col items-center p-5 sm:p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center w-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-amber-deep dark:text-amber mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-sans font-semibold tracking-normal text-foreground text-base mb-1">{t("info.responseTitle")}</h3>
              <p className="text-sm text-muted-foreground px-2">{t("info.response")}</p>
            </div>
          </div>
        </div>
      </main>
  );
}
