import type { Locale } from "@/i18n/routing";
import type { ToolId } from "@/data/tools";

/** A text in every site language — TypeScript errors if a language is missing. */
export type Localized = Record<Locale, string>;

/** Category keys — labels live in messages/{en,fr}.json under projects.categories. */
export type ProjectCategory = "graphicDesign" | "uiUxDesign" | "webDevelopment" | "mobileDevelopment";

/**
 * Three kinds of projects share ONE page template; each block only renders when
 * its field is filled:
 * - branding: context + gallery (lightbox) + "Download brand guidelines"
 * - app:      detailed text + screenshots + YouTube video + "Open the app" / stores
 * - website:  short text + 2–3 screenshots + "Visit live site"
 */
export type ProjectType = "branding" | "app" | "website";

export type Project = {
  /** URL segment: /en/projects/<slug>. Lowercase, dashes, never change once published. */
  slug: string;
  type: ProjectType;
  title: string;
  category: ProjectCategory;
  /** TODO: fill in the year for each project (shown in the page hero when set). */
  year?: number;
  /** One or two sentences: cards, page intro, meta description. */
  summary: Localized;
  /** Detailed content, one string per paragraph (context, challenge, approach…). */
  body?: Record<Locale, string[]>;
  /** /projects/<slug>/cover.webp — WebP, ≤ 200 KB. */
  cover: string;
  /** 2–6 images, /projects/<slug>/01.webp… (WebP, ≤ 200 KB each). */
  gallery?: string[];
  /** YouTube video id (ZignnnIt channel), loaded only on click. */
  youtubeId?: string;
  /** Short muted loop (< 2 MB) replacing the cover image. */
  coverLoop?: { mp4: string; webm: string; poster: string };
  /** Brand guidelines PDF (external direct-download link: Drive, R2…). */
  downloadUrl?: string;
  /** Main external link; `kind` picks the button label. */
  live?: { url: string; kind: "site" | "app" | "prototype" | "post" };
  stores?: { playStore?: string; appStore?: string };
  tools: ToolId[];
};

/** Google Drive "view" links open a preview; this form downloads the file directly. */
const driveDownload = (fileId: string) => `https://drive.google.com/uc?export=download&id=${fileId}`;

// Order = display order. The first FEATURED_COUNT appear on the home page.
// Add a project: add an object here + its images in public/projects/<slug>/.
export const projects: Project[] = [
  {
    slug: "kasastay",
    type: "branding",
    title: "Kasastay",
    category: "graphicDesign",
    summary: {
      en: "A comprehensive brand identity and graphic guidelines crafted for Kasastay, a modern property rental and real estate company in Cameroon.",
      fr: "Une identité visuelle complète et une charte graphique conçues pour Kasastay, une entreprise moderne de location et d’immobilier au Cameroun.",
    },
    cover: "/projects/kasastay/cover.webp",
    downloadUrl: driveDownload("1WPimFfGAZPNzTWQXMrH7sGW4ElLSrBpc"),
    tools: ["illustrator", "photoshop", "figma"],
  },
  {
    slug: "pasteefy",
    type: "app",
    title: "Pasteefy",
    category: "webDevelopment",
    summary: {
      en: "An intuitive social media text formatter and styling tool designed to craft engaging, beautifully formatted posts.",
      fr: "Un outil intuitif de mise en forme de texte pour les réseaux sociaux, pour rédiger des publications engageantes et soignées.",
    },
    cover: "/projects/pasteefy/cover.webp",
    live: { url: "https://pasteefy.zignnnit.com", kind: "app" },
    tools: ["nextjs", "typescript", "vercel", "illustrator", "antigravity"],
  },
  {
    slug: "evers-beauty",
    type: "branding",
    title: "Evers Beauty",
    category: "graphicDesign",
    summary: {
      en: "A comprehensive visual identity and brand style guide crafted for Evers Beauty, a modern aesthetics and wellness institute.",
      fr: "Une identité visuelle complète et un guide de style conçus pour Evers Beauty, un institut moderne d’esthétique et de bien-être.",
    },
    cover: "/projects/evers-beauty/cover.webp",
    downloadUrl: driveDownload("13J9NVaTTrp9GI1ood0e-pqjA8c251wtZ"),
    tools: ["illustrator", "indesign", "photoshop"],
  },
  {
    slug: "gaelle-joel",
    type: "website",
    title: "Gaëlle & Joël",
    category: "webDevelopment",
    summary: {
      en: "A personalized digital wedding invitation and interactive e-ticket platform crafted for an unforgettable celebration.",
      fr: "Une invitation de mariage digitale personnalisée et une plateforme d’e-billets interactive pour une célébration inoubliable.",
    },
    cover: "/projects/gaelle-joel/cover.webp",
    live: { url: "https://gaelle-joel.vercel.app", kind: "site" },
    tools: ["nextjs", "shadcn", "gsap", "framer", "antigravity"],
  },
  {
    slug: "novasup",
    type: "branding",
    title: "NovaSup",
    category: "graphicDesign",
    summary: {
      en: "A complete brand identity and graphic guidelines crafted for NovaSup, a higher education and academic institute.",
      fr: "Une identité de marque complète et une charte graphique conçues pour NovaSup, un institut d’enseignement supérieur.",
    },
    cover: "/projects/novasup/cover.webp",
    downloadUrl: driveDownload("1JgrTKbnV6pkGOSpJD0hHaSnk05omBEl7"),
    tools: ["illustrator", "photoshop", "indesign"],
  },
  {
    slug: "profinder",
    type: "app",
    title: "Profinder",
    category: "uiUxDesign",
    summary: {
      en: "An intuitive platform connecting professionals with clients through a sleek, engaging interface.",
      fr: "Une plateforme intuitive qui met en relation professionnels et clients grâce à une interface élégante et engageante.",
    },
    cover: "/projects/profinder/cover.webp",
    live: {
      url: "https://www.figma.com/design/n5ZAKBrEqYaqXhaqX5QZMR/ProFinder?node-id=0-1&t=aqo6HehkOGyaAy93-1",
      kind: "prototype",
    },
    tools: ["figma"],
  },
  {
    slug: "zignnnit",
    type: "website",
    title: "ZignnnIt",
    category: "webDevelopment",
    summary: {
      en: "Our own digital presence — creativity, innovation, and cutting-edge technology in one platform.",
      fr: "Notre propre vitrine digitale — créativité, innovation et technologies de pointe réunies sur une seule plateforme.",
    },
    cover: "/projects/zignnnit/cover.webp",
    live: { url: "https://zignnnit.com", kind: "site" },
    tools: ["nextjs", "gsap", "typescript", "tailwind", "vscode"],
  },
  {
    slug: "lumax",
    type: "branding",
    title: "Lumax",
    category: "graphicDesign",
    summary: {
      en: "A modern visual identity for Lumax — logo, stationery, and branding crafted with precision.",
      fr: "Une identité visuelle moderne pour Lumax — logo, papeterie et branding réalisés avec précision.",
    },
    cover: "/projects/lumax/cover.webp",
    downloadUrl: driveDownload("1qWO4bgiAeg4e2IQuQLAvj-CxLUGkoTez"),
    tools: ["illustrator", "photoshop"],
  },
  {
    slug: "bmi-calculator",
    type: "app",
    title: "BMI Calculator",
    category: "mobileDevelopment",
    summary: {
      en: "A user-friendly Flutter app for health insights and personalized BMI recommendations.",
      fr: "Une application Flutter simple d’utilisation pour suivre sa santé, avec des recommandations IMC personnalisées.",
    },
    cover: "/projects/bmi-calculator/cover.webp",
    live: {
      url: "https://www.linkedin.com/posts/japhetseumo_flutter-caparledev-generativeia-activity-7231597137422159872-eqgv",
      kind: "post",
    },
    tools: ["flutter", "vscode"],
  },
];

export const FEATURED_COUNT = 4;
export const featuredProjects = projects.slice(0, FEATURED_COUNT);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Next project in the list (wraps around) — for the "Next project" link. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
