import type { Locale } from "@/i18n/routing";

export interface ProjectTool {
  src: string;
  alt: string;
}

/** Category keys — their labels live in messages/{en,fr}.json under projects.categories. */
export type ProjectCategory = "graphicDesign" | "uiUxDesign" | "webDevelopment" | "mobileDevelopment";

/** A text available in every site language (TypeScript errors if one is missing). */
export type Localized = Record<Locale, string>;

export interface Project {
  title: string;
  category: ProjectCategory;
  image: string;
  tools: ProjectTool[];
  link: string;
  description: Localized;
}

// Project content stays next to the data (not in messages/*.json) so that adding a
// project is a single edit in a single file. Step 3 extends this model (slug, type,
// gallery, video…) for the project pages.
export const allProjects: Project[] = [
  {
    title: "Kasastay",
    category: "graphicDesign",
    image: "/img/projects/kasastay_banner.jpg",
    tools: [
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" },
      { src: "/img/tools/figma.svg", alt: "Figma" }
    ],
    link: "https://drive.google.com/file/d/1WPimFfGAZPNzTWQXMrH7sGW4ElLSrBpc/view?usp=drive_link",
    description: {
      en: "A comprehensive brand identity and graphic guidelines crafted for Kasastay, a modern property rental and real estate company in Cameroon.",
      fr: "Une identité visuelle complète et une charte graphique conçues pour Kasastay, une entreprise moderne de location et d’immobilier au Cameroun.",
    },
  },
  {
    title: "Pasteefy",
    category: "webDevelopment",
    image: "/img/projects/pasteefy_banner.jpg",
    tools: [
      { src: "/img/tools/nextjs.svg", alt: "Next.js" },
      { src: "/img/tools/typescript.svg", alt: "TypeScript" },
      { src: "/img/tools/vercel.svg", alt: "Vercel" },
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/google-antigravity.svg", alt: "Google Antigravity" }
    ],
    link: "https://pasteefy.zignnnit.com",
    description: {
      en: "An intuitive social media text formatter and styling tool designed to craft engaging, beautifully formatted posts.",
      fr: "Un outil intuitif de mise en forme de texte pour les réseaux sociaux, pour rédiger des publications engageantes et soignées.",
    },
  },
  {
    title: "Evers Beauty",
    category: "graphicDesign",
    image: "/img/projects/evers_beauty_banner.jpg",
    tools: [
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/adobe-indesign.svg", alt: "InDesign" },
      { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" }
    ],
    link: "https://drive.google.com/file/d/13J9NVaTTrp9GI1ood0e-pqjA8c251wtZ/view?usp=drive_link",
    description: {
      en: "A comprehensive visual identity and brand style guide crafted for Evers Beauty, a modern aesthetics and wellness institute.",
      fr: "Une identité visuelle complète et un guide de style conçus pour Evers Beauty, un institut moderne d’esthétique et de bien-être.",
    },
  },
  {
    title: "Gaëlle & Joël",
    category: "webDevelopment",
    image: "/img/projects/gaelle-joel_weeding.jpg",
    tools: [
      { src: "/img/tools/nextjs.svg", alt: "Next.js" },
      { src: "/img/tools/shadcn-ui.svg", alt: "shadcn/ui" },
      { src: "/img/tools/gsap.svg", alt: "GSAP" },
      { src: "/img/tools/framer.svg", alt: "Framer" },
      { src: "/img/tools/google-antigravity.svg", alt: "Google Antigravity" }
    ],
    link: "https://gaelle-joel.vercel.app",
    description: {
      en: "A personalized digital wedding invitation and interactive e-ticket platform crafted for an unforgettable celebration.",
      fr: "Une invitation de mariage digitale personnalisée et une plateforme d’e-billets interactive pour une célébration inoubliable.",
    },
  },
  {
    title: "NovaSup",
    category: "graphicDesign",
    image: "/img/projects/navasup_banner.jpg",
    tools: [
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" },
      { src: "/img/tools/adobe-indesign.svg", alt: "InDesign" }
    ],
    link: "https://drive.google.com/file/d/1JgrTKbnV6pkGOSpJD0hHaSnk05omBEl7/view?usp=drive_link",
    description: {
      en: "A complete brand identity and graphic guidelines crafted for NovaSup, a higher education and academic institute.",
      fr: "Une identité de marque complète et une charte graphique conçues pour NovaSup, un institut d’enseignement supérieur.",
    },
  },
  {
    title: "Profinder",
    category: "uiUxDesign",
    image: "/img/projects/profinder.png",
    tools: [
      { src: "/img/tools/figma.svg", alt: "Figma" }
    ],
    link: "https://www.figma.com/design/n5ZAKBrEqYaqXhaqX5QZMR/ProFinder?node-id=0-1&t=aqo6HehkOGyaAy93-1",
    description: {
      en: "An intuitive platform connecting professionals with clients through a sleek, engaging interface.",
      fr: "Une plateforme intuitive qui met en relation professionnels et clients grâce à une interface élégante et engageante.",
    },
  },
  {
    title: "ZignnnIt",
    category: "webDevelopment",
    image: "/img/projects/zignnnit_img.jpeg",
    tools: [
      { src: "/img/tools/nextjs.svg", alt: "NextJs" },
      { src: "/img/tools/gsap.svg", alt: "Gsap" },
      { src: "/img/tools/typescript.svg", alt: "Typescript" },
      { src: "/img/tools/tailwindcss.svg", alt: "Tailwind CSS" },
      { src: "/img/tools/visual-studio-code.svg", alt: "VS Code" }
    ],
    link: "#",
    description: {
      en: "Our own digital presence — creativity, innovation, and cutting-edge technology in one platform.",
      fr: "Notre propre vitrine digitale — créativité, innovation et technologies de pointe réunies sur une seule plateforme.",
    },
  },
  {
    title: "Lumax",
    category: "graphicDesign",
    image: "/img/projects/lumax_identity.png",
    tools: [
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" }
    ],
    link: "https://drive.google.com/file/d/1qWO4bgiAeg4e2IQuQLAvj-CxLUGkoTez/view?usp=sharing",
    description: {
      en: "A modern visual identity for Lumax — logo, stationery, and branding crafted with precision.",
      fr: "Une identité visuelle moderne pour Lumax — logo, papeterie et branding réalisés avec précision.",
    },
  },
  {
    title: "BMI Calculator",
    category: "mobileDevelopment",
    image: "/img/projects/bmi_calculator.jpg",
    tools: [
      { src: "/img/tools/flutter.svg", alt: "Flutter" },
      { src: "/img/tools/visual-studio-code.svg", alt: "VS Code" }
    ],
    link: "https://www.linkedin.com/posts/japhetseumo_flutter-caparledev-generativeia-activity-7231597137422159872-eqgv?utm_source=share&utm_medium=member_android",
    description: {
      en: "A user-friendly Flutter app for health insights and personalized BMI recommendations.",
      fr: "Une application Flutter simple d’utilisation pour suivre sa santé, avec des recommandations IMC personnalisées.",
    },
  }
];

// Featured projects shown on homepage (first 4)
export const featuredProjects = allProjects.slice(0, 4);
