/** Public contact details — single source for the contact page, footer and SEO data. */
export const contact = {
  email: "contact@zignnnit.com",
  /** International format without "+" or spaces, as wa.me expects. */
  whatsapp: "237695098342",
  linkedin: "https://www.linkedin.com/in/japhetseumo",
  city: "Douala",
  countryCode: "CM",
} as const;

export const whatsappUrl = `https://wa.me/${contact.whatsapp}`;
