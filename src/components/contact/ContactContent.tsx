"use client"

import { useCallback, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import Turnstile from "@/components/Turnstile";
import { contact, whatsappUrl } from "@/data/contact";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type FormStatus = "idle" | "loading" | "success" | "error";

const PREFERRED = ["email", "whatsapp", "phone"] as const;

// [value sent in the email, compact label]
const COUNTRY_CODES = [
  ["CMR (+237)", "CM +237"], ["USA (+1)", "US +1"], ["FRA (+33)", "FR +33"], ["ESP (+34)", "ES +34"],
  ["DEU (+49)", "DE +49"], ["CHE (+41)", "CH +41"], ["ITA (+39)", "IT +39"], ["GBR (+44)", "GB +44"],
  ["CAN (+1)", "CA +1"], ["AUS (+61)", "AU +61"], ["IND (+91)", "IN +91"],
] as const;

const labelClass = "block text-sm font-semibold text-foreground mb-2";
const inputClass =
  "block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm";

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
          website: value("company-website"),
          preferredContact: value("preferred-contact"),
          fax: value("fax"), // honeypot
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
                  {/* Honeypot (anti-spam): hidden from humans and screen readers, bots fill it in.
                      Named "fax" because "website" is now a real field. */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="fax">Fax</label>
                    <input type="text" name="fax" id="fax" tabIndex={-1} autoComplete="off" />
                  </div>
                  {/* Two columns from md (540px): this project's `sm` breakpoint is only 340px */}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className={labelClass}>{t("form.firstName")}</label>
                      <input type="text" name="first-name" id="first-name" autoComplete="given-name" maxLength={100} required placeholder={t("form.firstNamePlaceholder")} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="last-name" className={labelClass}>{t("form.lastName")}</label>
                      <input type="text" name="last-name" id="last-name" autoComplete="family-name" maxLength={100} placeholder={t("form.lastNamePlaceholder")} className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email" className={labelClass}>{t("form.email")}</label>
                      <input type="email" name="email" id="email" autoComplete="email" maxLength={254} required placeholder={t("form.emailPlaceholder")} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClass}>{t("form.company")}</label>
                      <input type="text" name="company" id="company" autoComplete="organization" maxLength={150} placeholder={t("form.companyPlaceholder")} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="company-website" className={labelClass}>
                        {t("form.website")} <span className="font-normal text-muted-foreground">({t("form.optional")})</span>
                      </label>
                      <input type="text" name="company-website" id="company-website" autoComplete="url" inputMode="url" maxLength={200} placeholder={t("form.websitePlaceholder")} className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="phone-number" className={labelClass}>{t("form.phone")}</label>
                      <div className="flex rounded-xl bg-background/80 border border-border overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200 shadow-sm">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
                          aria-label={t("form.country")}
                          className="appearance-none bg-transparent py-3 pl-3 pr-2 text-sm font-medium text-muted-foreground border-r border-border focus:outline-none cursor-pointer"
                        >
                          {/* Value keeps the country code for the email; the label stays compact on mobile */}
                          {COUNTRY_CODES.map(([value, label]) => (
                            <option key={value} value={value} className="bg-background text-foreground">{label}</option>
                          ))}
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
                    <fieldset className="md:col-span-2">
                      <legend className={labelClass}>{t("form.preferred")}</legend>
                      <div className="flex flex-wrap gap-3">
                        {PREFERRED.map((method) => (
                          <label key={method} className="cursor-pointer">
                            <input type="radio" name="preferred-contact" value={method} defaultChecked={method === "email"} className="peer sr-only" />
                            <span className="inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                              {t(`form.preferredOptions.${method}`)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <div className="md:col-span-2">
                      <label htmlFor="message" className={labelClass}>{t("form.message")}</label>
                      <textarea name="message" id="message" rows={4} minLength={10} maxLength={5000} required placeholder={t("form.messagePlaceholder")} className={`${inputClass} resize-y`}></textarea>
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
                  <div className="pt-4" data-magnetic>
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
                        className="zg-success flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                      >
                        {/* Check mark drawn with stroke-dashoffset (CSS, globals.css) */}
                        <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.35" />
                          <path className="zg-check" d="M7 12.5l3.2 3.2L17 9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{t("form.success")}</span>
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

          {/* Other ways to reach us (WhatsApp as a secondary channel, no floating button) */}
          <section className="mt-16 sm:mt-20 max-w-4xl mx-auto" aria-labelledby="other-ways">
            <h2 id="other-ways" className="text-2xl sm:text-3xl text-center text-foreground">{t("other.title")}</h2>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                { href: `mailto:${contact.email}`, icon: "ri-mail-line", title: t("other.email"), text: contact.email, external: false },
                { href: whatsappUrl, icon: "ri-whatsapp-line", title: t("other.whatsapp"), text: t("other.whatsappText"), external: true },
                { href: contact.linkedin, icon: "ri-linkedin-box-line", title: t("other.linkedin"), text: t("other.linkedinText"), external: true },
              ].map((item) => (
                <li key={item.icon}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full flex-col items-center rounded-2xl border border-border/50 bg-secondary/40 p-5 sm:p-6 text-center transition-colors hover:border-primary"
                  >
                    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl text-amber-text transition-colors group-hover:bg-primary group-hover:text-primary-foreground" aria-hidden="true">
                      <i className={item.icon}></i>
                    </span>
                    <span className="font-semibold text-foreground">{item.title}</span>
                    <span className="mt-1 text-sm text-muted-foreground break-all">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm text-muted-foreground">{t("other.details", { location: t("info.location") })}</p>
          </section>
        </div>
      </main>
  );
}
