"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        <div className="isolate px-4 sm:px-6 py-16 sm:py-24 lg:px-8 relative">
          {/* Background gradient blob */}
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F7B700] to-[#737373] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            ></div>
          </div>

          {/* Page Header */}
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6 border border-border/50 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Get in Touch
            </div>
            <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-muted-foreground font-light tracking-wide max-w-xl mx-auto">
              Feel free to tell us about your project or ask any question. We&apos;re ready to create with you.
            </p>
          </div>

          {/* Form Container with Glow & Gradient Border */}
          <div className="mx-auto max-w-2xl">
            <div className="relative rounded-3xl">
              {/* Backlight glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/20 via-primary/30 to-amber-500/20 rounded-3xl opacity-60 blur-xl pointer-events-none"></div>

              {/* Fine glowing gradient border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-amber-500/40 via-primary to-amber-500/40 rounded-3xl opacity-70 blur-[1px] pointer-events-none"></div>

              {/* Glass Card */}
              <div className="relative bg-secondary/80 dark:bg-card/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl">
                <form
                  action="https://formsubmit.co/contact.jscreativ@gmail.com"
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-semibold text-foreground mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        placeholder="John"
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-semibold text-foreground mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        placeholder="Doe"
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="organization"
                        placeholder="Your company or agency"
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        placeholder="john.doe@example.com"
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="phone-number" className="block text-sm font-semibold text-foreground mb-2">
                        Phone number
                      </label>
                      <div className="flex rounded-xl bg-background/80 border border-border overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200 shadow-sm">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
                          aria-label="Country"
                          className="appearance-none bg-transparent py-3 pl-4 pr-8 text-sm font-medium text-muted-foreground border-r border-border focus:outline-none cursor-pointer"
                        >
                          <option className="bg-background text-foreground">CMR (+237)</option>
                          <option className="bg-background text-foreground">US (+1)</option>
                          <option className="bg-background text-foreground">EU (+33)</option>
                        </select>
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          className="block min-w-0 grow py-3 px-4 text-base text-foreground bg-transparent placeholder:text-muted-foreground/60 focus:outline-none"
                          placeholder="690-000-000"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        placeholder="Tell us about your project requirements..."
                        className="block w-full rounded-xl bg-background/80 border border-border px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm resize-y"
                      ></textarea>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-primary text-primary-foreground py-4 text-center text-lg font-bold shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group"
                    >
                      <span>Let&apos;s talk</span>
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
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Quick Contact Info Badges */}
          <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground text-base mb-1">Email Us</h3>
              <p className="text-sm text-muted-foreground font-light">zignnnit@gmail.com</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground text-base mb-1">Location</h3>
              <p className="text-sm text-muted-foreground font-light">Douala, Cameroon</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground text-base mb-1">Response Time</h3>
              <p className="text-sm text-muted-foreground font-light">Within 24 hours</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
