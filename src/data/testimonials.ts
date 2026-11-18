import type { Localized } from "@/data/projects";

export type Testimonial = {
  /** Person's name as they agreed to be credited. */
  name: string;
  role: Localized;
  quote: Localized;
  /** Optional link to the related case study (project slug). */
  project?: string;
  /**
   * Draft content (invented text to preview the design). Placeholders are shown in
   * local dev and Vercel previews, but NEVER in production — publishing invented
   * reviews as real ones would mislead visitors. Replace them with real quotes
   * (with the client's consent) and remove this flag.
   */
  placeholder?: boolean;
};

// Order = display order in the scrolling band.
export const testimonials: Testimonial[] = [
  {
    name: "Gaëlle & Joël",
    role: { en: "Newlyweds", fr: "Jeunes mariés" },
    quote: {
      en: "Our guests are still talking about the invitation. The site was beautiful, easy to use on any phone, and the e-tickets made the welcome on the big day effortless.",
      fr: "Nos invités parlent encore de l’invitation. Le site était magnifique, simple à utiliser sur n’importe quel téléphone, et les e-billets ont rendu l’accueil du grand jour très fluide.",
    },
    project: "gaelle-joel",
    placeholder: true,
  },
  {
    name: "Clara Mensah",
    role: { en: "Content creator, Pasteefy user", fr: "Créatrice de contenu, utilisatrice de Pasteefy" },
    quote: {
      en: "Pasteefy saves me time on every post. I format my text in seconds and it looks exactly right on LinkedIn — I can’t go back.",
      fr: "Pasteefy me fait gagner du temps à chaque publication. Je mets mon texte en forme en quelques secondes et le rendu est parfait sur LinkedIn — je ne peux plus m’en passer.",
    },
    project: "pasteefy",
    placeholder: true,
  },
  {
    name: "Paul Ekambi",
    role: { en: "CEO, NovaSup", fr: "Directeur général, NovaSup" },
    quote: {
      en: "ZignnnIt gave NovaSup an identity that matches our ambitions. The brand guidelines are clear and our whole team now communicates with one consistent voice.",
      fr: "ZignnnIt a donné à NovaSup une identité à la hauteur de nos ambitions. La charte est claire et toute notre équipe communique désormais d’une seule voix.",
    },
    project: "novasup",
    placeholder: true,
  },
];

/** Placeholders are hidden on the production deployment (VERCEL_ENV is set by Vercel). */
export function visibleTestimonials(): Testimonial[] {
  const isProduction = process.env.VERCEL_ENV === "production";
  return testimonials.filter((t) => !(isProduction && t.placeholder));
}
