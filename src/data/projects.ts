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
  /** Year of delivery (shown in the project page hero). */
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
    year: 2025,
    summary: {
      en: "A comprehensive brand identity and graphic guidelines crafted for Kasastay, a modern property rental and real estate company in Cameroon.",
      fr: "Une identité visuelle complète et une charte graphique conçues pour Kasastay, une entreprise moderne de location et d’immobilier au Cameroun.",
    },
    body: {
      en: [
        "Kasastay is a platform that changes how people find short- and long-term accommodation in Africa. Its mission: give owners a reliable place to list their homes, and give tenants affordable, verified housing — bridging modern digital tools and local realities so that renting becomes safe and simple.",
        "The logo says what the brand does at a glance: a stylised house placed inside a location pin, for stays you can find and trust. It comes with the tagline “Your stay, your way” and a palette built on confidence and calm — a fresh cyan (#08BDB7), an elegant near-black (#12130F) and a clean white — set in Acumin, a modern, highly legible typeface.",
        "The 25-page guidelines cover the logo and its variations, colours, typography, a set of icons and patterns derived from the pin, and real-life applications: rental ads, staff T-shirts and badges, mugs, caps, business cards, letterhead, a billboard and the mobile app icon.",
      ],
      fr: [
        "Kasastay est une plateforme qui transforme la manière de trouver un logement de courte ou de longue durée en Afrique. Sa mission : offrir aux propriétaires un espace fiable pour publier leurs biens, et aux locataires des logements abordables et vérifiés — en reliant les outils numériques modernes aux réalités locales pour rendre la location sûre et simple.",
        "Le logo dit en un coup d’œil ce que fait la marque : une maison stylisée placée au cœur d’une épingle de localisation, pour des séjours faciles à trouver et dignes de confiance. Il s’accompagne du slogan « Votre séjour, à votre façon » et d’une palette fondée sur la confiance et la sérénité — un cyan frais (#08BDB7), un noir élégant (#12130F) et un blanc épuré — avec Acumin, une typographie moderne et très lisible.",
        "La charte de 25 pages couvre le logo et ses variantes, les couleurs, la typographie, un jeu d’icônes et de motifs tirés de l’épingle, et des applications concrètes : annonces de location, T-shirts et badges du personnel, mugs, casquettes, cartes de visite, papier en-tête, panneau publicitaire et icône de l’application mobile.",
      ],
    },
    cover: "/projects/kasastay/cover.webp",
    gallery: [
      "/projects/kasastay/01.webp",
      "/projects/kasastay/02.webp",
      "/projects/kasastay/03.webp",
      "/projects/kasastay/04.webp",
      "/projects/kasastay/05.webp",
      "/projects/kasastay/06.webp",
    ],
    downloadUrl: driveDownload("1WPimFfGAZPNzTWQXMrH7sGW4ElLSrBpc"),
    tools: ["illustrator", "photoshop", "figma"],
  },
  {
    slug: "pasteefy",
    type: "app",
    title: "Pasteefy",
    category: "webDevelopment",
    year: 2026,
    summary: {
      en: "An intuitive social media text formatter and styling tool designed to craft engaging, beautifully formatted posts.",
      fr: "Un outil intuitif de mise en forme de texte pour les réseaux sociaux, pour rédiger des publications engageantes et soignées.",
    },
    body: {
      en: [
        "LinkedIn, X, Instagram and Facebook don’t let you format your posts: no bold, no italics, no headings. Pasteefy solves that in the browser — free, with no sign-up and no ads.",
        "You write or paste your text, select a passage and apply a style (bold, italic, script, double-struck and more) with one click or the usual Ctrl+B / Ctrl+I shortcuts. A live preview shows how the post will look on each network, with character and word counters and each platform’s limit (3,000 on LinkedIn, 280 on X, 2,200 on Instagram). One button copies the formatted text, ready to paste.",
        "The styles rely on Unicode characters, which screen readers may read letter by letter — so the app says it plainly and recommends using them sparingly. Built with Next.js and TypeScript, deployed on Vercel, with a light and a dark theme.",
      ],
      fr: [
        "LinkedIn, X, Instagram et Facebook ne permettent pas de mettre en forme ses publications : ni gras, ni italique, ni titres. Pasteefy règle ce problème directement dans le navigateur — gratuitement, sans inscription et sans publicité.",
        "On écrit ou on colle son texte, on sélectionne un passage et on applique un style (gras, italique, manuscrit, ajouré…) en un clic ou avec les raccourcis habituels Ctrl+B / Ctrl+I. Un aperçu en temps réel montre le rendu sur chaque réseau, avec compteurs de caractères et de mots et la limite de chaque plateforme (3 000 sur LinkedIn, 280 sur X, 2 200 sur Instagram). Un bouton copie le texte formaté, prêt à coller.",
        "Les styles reposent sur des caractères Unicode, que les lecteurs d’écran peuvent lire lettre par lettre : l’application le dit clairement et conseille de les utiliser avec parcimonie. Développée avec Next.js et TypeScript, déployée sur Vercel, avec un thème clair et un thème sombre.",
      ],
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
    year: 2025,
    summary: {
      en: "A comprehensive visual identity and brand style guide crafted for Evers Beauty, a modern aesthetics and wellness institute.",
      fr: "Une identité visuelle complète et un guide de style conçus pour Evers Beauty, un institut moderne d’esthétique et de bien-être.",
    },
    body: {
      en: [
        "Evers Beauty is a premium institute dedicated to complete beauty care for women and men: aesthetics, cosmetics, nail care and unisex hairdressing, in a chic, contemporary space. The brief was to express “tailor-made elegance, for her & him” — refined without being exclusive to one audience.",
        "The emblem is inspired by a flower in full bloom, a symbol of transformation, care and timeless elegance; its fluid curves bring softness and harmony. A deep green, rooted in nature and the authenticity of the treatments, leads the palette, enhanced by a gold gradient for prestige. Typography pairs The Glorious, a luxurious serif for titles and the logotype, with the clean, readable DM Sans. A horizontal version of the logo fits narrow spaces such as website headers and e-mail signatures.",
        "The 57-page guidelines set the rules — protective space, minimum sizes, misuse, photography principles — and show the identity at work: business cards, letterhead, staff badges and stamps, Instagram stories and social profiles, goodies (T-shirts, caps, pins, mugs, bags, umbrellas, aprons) and signage, from posters and roll-ups to the storefront.",
      ],
      fr: [
        "Evers Beauty est un institut haut de gamme dédié à la beauté globale, pour femmes et hommes : esthétique, cosmétique, onglerie et coiffure mixte, dans un espace chic et contemporain. L’enjeu : exprimer « l’élégance sur mesure, pour elle & lui » — raffinée, sans s’adresser à un seul public.",
        "L’emblème s’inspire d’une fleur en pleine éclosion, symbole de transformation, de soin et d’élégance intemporelle ; ses courbes fluides apportent douceur et harmonie. Un vert profond, ancré dans la nature et l’authenticité des soins, mène la palette, rehaussé d’un dégradé doré pour le prestige. La typographie associe The Glorious, une sérif luxueuse pour les titres et le logotype, à la DM Sans, propre et lisible. Une version horizontale du logo s’adapte aux espaces étroits, comme les en-têtes de site et les signatures d’e-mail.",
        "La charte de 57 pages fixe les règles — zone de protection, tailles minimales, interdits, principes photographiques — et montre l’identité en situation : cartes de visite, papier en-tête, badges et tampons, stories Instagram et réseaux sociaux, goodies (T-shirts, casquettes, pins, mugs, sacs, parapluies, tabliers) et signalétique, des affiches et roll-ups jusqu’à l’enseigne.",
      ],
    },
    cover: "/projects/evers-beauty/cover.webp",
    gallery: [
      "/projects/evers-beauty/01.webp",
      "/projects/evers-beauty/02.webp",
      "/projects/evers-beauty/03.webp",
      "/projects/evers-beauty/04.webp",
      "/projects/evers-beauty/05.webp",
      "/projects/evers-beauty/06.webp",
    ],
    downloadUrl: driveDownload("13J9NVaTTrp9GI1ood0e-pqjA8c251wtZ"),
    tools: ["illustrator", "indesign", "photoshop"],
  },
  {
    slug: "gaelle-joel",
    type: "website",
    title: "Gaëlle & Joël",
    category: "webDevelopment",
    year: 2026,
    summary: {
      en: "A personalized digital wedding invitation and interactive e-ticket platform crafted for an unforgettable celebration.",
      fr: "Une invitation de mariage digitale personnalisée et une plateforme d’e-billets interactive pour une célébration inoubliable.",
    },
    body: {
      en: [
        "For their wedding in Douala on 25 April 2026, Gaëlle & Joël wanted an invitation as elegant as the day itself — and more practical than paper. Guests open it like an envelope, then find everything in one place.",
        "The site presents the day’s four moments (civil ceremony, nuptial blessing, wine reception and gala) with times and venues, a live countdown, the dress code with its colour palette and the couple’s special instructions. Guests confirm their attendance in one tap or via WhatsApp, and those who can’t travel can follow each moment live on Zoom.",
        "Each guest can also generate a personal e-ticket, which made the welcome on the day smooth. Built with Next.js, shadcn/ui and GSAP for the animations, designed mobile-first since nearly every guest opens it on a phone.",
      ],
      fr: [
        "Pour leur mariage à Douala le 25 avril 2026, Gaëlle & Joël voulaient une invitation aussi élégante que le jour J — et plus pratique que le papier. Les invités l’ouvrent comme une enveloppe, puis retrouvent tout au même endroit.",
        "Le site présente les quatre temps forts de la journée (mariage civil, bénédiction nuptiale, vin d’honneur et soirée de gala) avec horaires et lieux, un compte à rebours, le code vestimentaire et sa palette de couleurs, et les consignes des mariés. Les invités confirment leur présence en un geste ou via WhatsApp, et ceux qui ne peuvent pas se déplacer suivent chaque moment en direct sur Zoom.",
        "Chaque invité peut aussi générer son e-billet personnel, ce qui a rendu l’accueil du grand jour très fluide. Développé avec Next.js, shadcn/ui et GSAP pour les animations, pensé d’abord pour le mobile, puisque presque tous les invités l’ouvrent sur leur téléphone.",
      ],
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
    year: 2025,
    summary: {
      en: "A complete brand identity and graphic guidelines crafted for NovaSup, a higher education and academic institute.",
      fr: "Une identité de marque complète et une charte graphique conçues pour NovaSup, un institut d’enseignement supérieur.",
    },
    body: {
      en: [
        "NovaSup is a higher education institute in Cameroon whose motto is “Awareness, Competence, Excellence”. It needed an identity that carries academic credibility while speaking to a young generation — the promise of a place “where your future takes shape”.",
        "The emblem combines three ideas: a circle for unity and the stable framework the school provides, an academic cap for success and rigour, and a human figure moving upwards for the student’s personal and intellectual growth. Royal blue (#1A5CA8) brings trust and stability; mandarin orange (#E16A0D) adds energy, innovation and youth. Typography pairs the bold, modern Stolzl with the friendly Netflix Sans, and a pattern built from the emblem gives the brand a recognisable texture.",
        "Designed by Jordan Tchakounte, the 69-page guidelines also define co-branding rules and photography principles centred on African students, then apply the identity everywhere: stationery, social media, goodies (mugs, bracelets, caps, calendars, lanyards, T-shirts, bags) and large-format signage — banners, a bus shelter, an event stand and a giant billboard.",
      ],
      fr: [
        "NovaSup est un institut d’enseignement supérieur au Cameroun, dont la devise est « Conscience, Compétence, Excellence ». Il lui fallait une identité qui inspire la crédibilité académique tout en parlant à une génération jeune — la promesse d’un lieu « où votre avenir prend forme ».",
        "L’emblème réunit trois idées : un cercle pour l’unité et le cadre stable qu’offre l’établissement, une toque pour la réussite et la rigueur, et une silhouette humaine qui s’élève pour la croissance personnelle et intellectuelle de l’étudiant. Le bleu royal (#1A5CA8) apporte confiance et stabilité ; l’orange mandarine (#E16A0D), le dynamisme, l’innovation et la jeunesse. La typographie associe la Stolzl, moderne et affirmée, à la Netflix Sans, plus amicale, et un motif construit à partir de l’emblème donne à la marque une texture reconnaissable.",
        "Conçue par Jordan Tchakounte, la charte de 69 pages définit aussi les règles de co-branding et des principes photographiques centrés sur des étudiants africains, puis décline l’identité partout : papeterie, réseaux sociaux, goodies (mugs, bracelets, casquettes, calendriers, cordons, T-shirts, sacs) et signalétique grand format — banderoles, abribus, stand et panneau géant.",
      ],
    },
    cover: "/projects/novasup/cover.webp",
    gallery: [
      "/projects/novasup/01.webp",
      "/projects/novasup/02.webp",
      "/projects/novasup/03.webp",
      "/projects/novasup/04.webp",
      "/projects/novasup/05.webp",
      "/projects/novasup/06.webp",
    ],
    downloadUrl: driveDownload("1JgrTKbnV6pkGOSpJD0hHaSnk05omBEl7"),
    tools: ["illustrator", "photoshop", "indesign"],
  },
  {
    slug: "profinder",
    type: "app",
    title: "Profinder",
    category: "uiUxDesign",
    year: 2024,
    summary: {
      en: "An intuitive platform connecting professionals with clients through a sleek, engaging interface.",
      fr: "Une plateforme intuitive qui met en relation professionnels et clients grâce à une interface élégante et engageante.",
    },
    body: {
      en: [
        "Profinder is a platform concept that connects clients with qualified professionals. The challenge was to make finding the right person — and trusting them — quick and reassuring, for clients and professionals alike.",
        "We designed the complete experience in Figma: user journeys, a consistent component library, and high-fidelity screens with a clean, engaging interface. The result is a clickable prototype that lets you walk through the app as if it were live.",
      ],
      fr: [
        "Profinder est un concept de plateforme qui met en relation des clients et des professionnels qualifiés. L’enjeu : rendre la recherche de la bonne personne — et la confiance qu’on lui accorde — rapide et rassurante, pour les clients comme pour les professionnels.",
        "Nous avons conçu l’expérience complète dans Figma : parcours utilisateurs, bibliothèque de composants cohérente et écrans haute fidélité, avec une interface épurée et engageante. Le résultat est un prototype cliquable qui permet de parcourir l’application comme si elle était en ligne.",
      ],
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
    year: 2024,
    summary: {
      en: "Our own digital presence — creativity, innovation, and cutting-edge technology in one platform.",
      fr: "Notre propre vitrine digitale — créativité, innovation et technologies de pointe réunies sur une seule plateforme.",
    },
    body: {
      en: [
        "Our own website is our first case study: it has to show what we do, not just say it. Version 2 keeps what visitors liked — the light, airy, amber spirit — and raises the bar on everything else.",
        "It is fully bilingual (English and French, with a URL per language and search-engine signals for both), built with Next.js, TypeScript and Tailwind CSS, and animated with GSAP and smooth scrolling. The hero illustration was drawn in-house and tells our process in a 14-second loop: we design, then we code. Each project has its own page, with no database to maintain.",
        "Under the hood: self-hosted fonts, share images generated for each page and language, a contact form protected against spam, and animations that respect visitors who prefer reduced motion.",
      ],
      fr: [
        "Notre propre site est notre première étude de cas : il doit montrer ce que nous faisons, pas seulement le dire. La version 2 garde ce que les visiteurs aimaient — l’esprit clair, aéré et ambré — et relève le niveau sur tout le reste.",
        "Il est entièrement bilingue (anglais et français, avec une adresse par langue et les signaux adaptés pour les moteurs de recherche), développé avec Next.js, TypeScript et Tailwind CSS, et animé avec GSAP et un défilement fluide. L’illustration d’accueil a été dessinée en interne et raconte notre méthode en une boucle de 14 secondes : on design, puis on code. Chaque projet a sa propre page, sans base de données à maintenir.",
        "Sous le capot : polices auto-hébergées, images de partage générées pour chaque page et chaque langue, formulaire de contact protégé contre le spam, et animations qui respectent les visiteurs préférant réduire les mouvements.",
      ],
    },
    cover: "/projects/zignnnit/cover.webp",
    live: { url: "https://www.zignnnit.com", kind: "site" },
    tools: ["nextjs", "gsap", "typescript", "tailwind", "vscode"],
  },
  {
    slug: "lumax",
    type: "branding",
    title: "Lumax",
    category: "graphicDesign",
    year: 2023,
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
    year: 2024,
    summary: {
      en: "A user-friendly Flutter app for health insights and personalized BMI recommendations.",
      fr: "Une application Flutter simple d’utilisation pour suivre sa santé, avec des recommandations IMC personnalisées.",
    },
    body: {
      en: [
        "A mobile app built with Flutter to calculate your body mass index (BMI) — and, above all, to help you understand what to do with the result.",
        "You enter your details through simple form fields and sliders, and the app computes your BMI. GemiBMI, a virtual health coach powered by Google’s Gemini API, then gives nutrition and physical activity advice tailored to your result. The app also uses the genderize.io API to estimate gender from the first name.",
        "This project was a deep dive into mobile architecture: state management with the BLoC pattern, integration of two external APIs, and rendering the AI’s answers in Markdown.",
      ],
      fr: [
        "Une application mobile développée avec Flutter pour calculer son indice de masse corporelle (IMC) — et surtout comprendre quoi faire du résultat.",
        "On saisit ses informations avec des champs simples et des curseurs, et l’application calcule l’IMC. GemiBMI, un coach santé virtuel propulsé par l’API Gemini de Google, donne ensuite des conseils de nutrition et d’activité physique adaptés au résultat. L’application utilise aussi l’API genderize.io pour estimer le genre à partir du prénom.",
        "Ce projet a été l’occasion d’approfondir l’architecture mobile : gestion d’état avec le pattern BLoC, intégration de deux API externes et affichage des réponses de l’IA en Markdown.",
      ],
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
