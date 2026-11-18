# Brief — Évolution de zignnnit.com (v2)

> **À lire en premier.** Ce site plaît beaucoup aux personnes qui l'ont testé. Il ne s'agit **pas** de le recréer, mais de l'**améliorer** : corriger les défauts, changer la typographie, ajouter le bilingue, créer la page About, et surtout faire monter l'effet « waouh » avec des animations soignées. Garder la structure, l'esprit, les couleurs et le logo actuels.

---

## 0. Contexte

- **Marque :** ZignnnIt, agence créative digitale : design graphique, UI/UX, développement web et mobile.
- **Cible :** internationale (pas seulement le Cameroun).
- **Stack détectée :** Next.js (`_next/image`), Tailwind CSS, shadcn/ui, animations (GSAP probable, à confirmer dans le code), mode sombre déjà présent.
- **Logo :** **ne pas toucher** pour l'instant (une refonte est prévue plus tard, séparément).
- **Couleurs :** ambre + noir carbone (voir §3).

Avant de coder : lis l'arborescence, repère les composants (Hero, LogoMarquee, About, Services, Projects, Stats, Footer, Contact, Shop) et propose un plan court avant d'attaquer.

---

## 1. Corrections prioritaires (P0) — constatées lors de l'audit

| # | Problème | Où | Correction attendue |
|---|---|---|---|
| 1 | **Le titre du hero se coupe au milieu d'un mot** : « We are a creati / ve Agency » (ordinateur ET mobile). | Hero `h1` | L'animation découpe chaque lettre dans un `span inline-block`, donc le navigateur peut couper n'importe où. Envelopper chaque **mot** dans un `span` `inline-block whitespace-nowrap`, et mettre les lettres à l'intérieur. |
| 2 | **Illustration du hero masquée sur mobile** (`display:none`). | Hero | L'afficher sous les CTA sur mobile (largeur ~80 %, centrée). Indispensable pour l'animation de la vapeur (§7). |
| 3 | **Rectangle blanc derrière les liens du menu** visible au scroll sur les sections colorées (fond gris de la section About, etc.). | Header desktop | Le conteneur des liens doit être transparent, ou utiliser le même verre dépoli (`backdrop-blur`) que le header. Pas de bloc blanc opaque. |
| 4 | **Grand vide blanc** (~150–200 px) entre le défilé de logos et la section suivante. | Home | Réduire l'espacement. |
| 5 | **Menu mobile semi-transparent** : le contenu de la page se voit derrière, le logo devient flou. | Menu mobile | Overlay plein écran, fond opaque (ou blur fort + 95 % d'opacité), logo net, liens plus grands (24–28 px), sélecteur de langue inclus. |
| 6 | **Titres des services trop fins et trop pâles** (faible contraste). | Accordéon Services | Passer en graisse 500–600, couleur carbone ; ambre au survol/à l'ouverture. Ajouter une description, des livrables et un délai indicatif dans chaque panneau. |
| 7 | **Pied de page mobile** : « Crafted with passion by ZignnnIt » se coupe mal sur 2 lignes. | Footer | Empiler le copyright et la signature, centrés, sur mobile. |
| 8 | **Placeholder du téléphone tronqué** sur mobile (« 690-000-0… »). | Contact | Placeholder plus court, ou sélecteur d'indicatif plus étroit. |
| 9 | **Mélange de langues** : boutons « Voir plus » en français sur un site en anglais. | Cartes projets | Réglé par l'i18n (§4). |
| 10 | **Deux ambres différents** : `#F7B700` (logo SVG) vs `#F59E0B` (site). | Global | Garder `#F59E0B` partout (§3). |
| 11 | **Orthographe de la marque** : alterne entre « ZignnnIt » et « Zignnnit ». | Textes | Utiliser une seule graphie partout : **ZignnnIt** (comme le logo actuel). |

---

## 2. Typographie — remplacer Urbanist

**Pourquoi :** le « t » minuscule d'Urbanist ressemble à une croix latine. Le fondateur veut éviter toute connotation religieuse. 27 polices ont été testées visuellement sur le « t » minuscule.
- Écartées pour le « t » en croix : Satoshi, Outfit, Syne.
- Écartées parce que trop répandues : Clash Display, Poppins, Plus Jakarta Sans, Inter, Figtree.
- Écartée parce que payante : Lufga.

**Choix validé (« t » avec une queue, sans aucune ressemblance avec une croix) :**

| Rôle | Police | Graisses | Source / licence |
|---|---|---|---|
| Titres (h1–h3, chiffres clés, gros CTA) | **Cabinet Grotesk** | 700, 800 (ExtraBold pour le h1) | fontshare.com/fonts/cabinet-grotesk — ITF Free Font License, gratuite y compris en usage commercial |
| Texte, UI, boutons, navigation | **General Sans** | 400, 500, 600 (+ italique 400) | fontshare.com/fonts/general-sans — même licence |

- Implémentation : télécharger les fichiers `.woff2` depuis Fontshare et les **auto-héberger** avec **`next/font/local`** dans `/src/fonts/` (pas d'appel au CDN de Fontshare en production). Ajouter le fichier de licence ITF, et utiliser `display: 'swap'`.
- Variables CSS : `--font-display` (Cabinet Grotesk) et `--font-sans` (General Sans), mappées dans Tailwind (`font-display`, `font-sans`).
- Cabinet Grotesk seulement pour les titres (≥ 24 px) ; en dessous, General Sans 600.
- Titres : `letter-spacing` −0,025 em, `line-height` 1,0–1,05.
- Supprimer **toutes** les références à Urbanist.

---

## 3. Couleurs (tokens)

| Token | Valeur | Usage |
|---|---|---|
| `--amber` | `#F59E0B` | Accents, CTA, mots mis en avant |
| `--amber-deep` | `#D97706` | Survol, texte ambre sur fond clair (meilleur contraste) |
| `--carbon` | `#141414` | Texte, fonds sombres, footer |
| `--cream` | `#FAF7F2` | Fonds clairs alternatifs (remplace le gris/beige actuel de la section About si besoin) |

Règle d'accessibilité : **jamais de petit texte ambre sur fond blanc** (contraste insuffisant). Texte carbone sur ambre = OK.

---

## 4. Bilingue anglais / français (i18n)

- Lib : **`next-intl`** (App Router).
- Routes : `/en/...` et `/fr/...`, **anglais par défaut** (cible internationale), détection de `Accept-Language` à la première visite, choix mémorisé dans un cookie.
- Sélecteur de langue « EN / FR » dans le header (desktop) et dans le menu mobile.
- **Tous** les textes dans `messages/en.json` et `messages/fr.json`, y compris les métadonnées SEO, les textes des projets, le formulaire, les messages d'erreur et de succès.
- SEO : balises `hreflang` (en, fr, x-default), `<html lang>` dynamique, sitemap avec les deux langues, titre et description par page et par langue.
- Le texte de la v1 reste la base ; je fournirai la version FR (ou propose une traduction que je relirai).

### Nouveau slogan (remplace « We are a creative Agency »)

**Validé :**
- **h1 :** EN « We craft brands and products that **stand out.** » — FR « Nous créons des marques et des produits qui **se démarquent.** » (le mot en gras en ambre).
- **Signature** (footer, image OG, loader) : « Design. Code. Zignnn. » (identique en EN et en FR ; s'appuie sur le verbe de marque du CTA « Ready to zignnn your project? »).

---

## 5. Défilé des logos d'outils — alléger

**Commenter dans le code** (ne pas supprimer, pour pouvoir les remettre) :
Canva, Adobe XD, InDesign, HTML 5, CSS 3, JavaScript, Bootstrap, Google Fonts, Windows.

**Garder :** Illustrator, Photoshop, Figma, Framer, TypeScript, React, Next.js, shadcn/ui, Tailwind CSS, GSAP, Python, Django, PostgreSQL, MySQL, Flutter, Android, iOS, Docker, VS Code, GitHub, Vercel, Gemini, Claude, Google Antigravity.

Les badges d'outils affichés sur chaque carte projet restent inchangés (InDesign peut y rester s'il a été utilisé).

---

## 6. Nouvelle page About (`/[locale]/about`)

Le lien « About » du menu pointe aujourd'hui vers une ancre de la home : il doit pointer vers cette page. Garder une version courte de la section About sur la home, avec un lien « Learn more ».

**Contenu de la page :**
1. Hero court : qui on est, en une phrase forte.
2. Histoire / mission (2 paragraphes, reprendre le texte actuel enrichi).
3. Approche / process en 4 étapes : Discover → Design → Build → Launch (avec icônes ou numéros animés au scroll).
4. Valeurs (3 ou 4 cartes).
5. **Current collaborators** (section importante) :

| Nom | Rôle (EN / FR) | Photo | LinkedIn |
|---|---|---|---|
| Japhet Seumo | Software Developer & Designer / Développeur logiciel & designer | **Placeholder** (photo fournie plus tard) → `/public/team/japhet-seumo.webp` | `https://www.linkedin.com/in/japhetseumo` |
| Moïse Tchakounte | 2D / 3D Designer / Designer 2D / 3D | **Placeholder** (photo fournie plus tard) → `/public/team/moise-tchakounte.webp` | `TODO` (lien à fournir) |

Les photos seront retouchées avant d'être fournies : prévoir des placeholders propres dès maintenant (pas d'avatar générique). Il suffira ensuite de déposer les fichiers au bon chemin.

- Données dans un fichier `src/data/team.ts` (tableau d'objets : nom, rôle EN/FR, photo, linkedin), pour ajouter facilement de futurs collaborateurs.
- Carte : photo au ratio 4:5, en niveaux de gris → couleur au survol ; nom en Cabinet Grotesk ; rôle en General Sans ; icône LinkedIn. Placeholder élégant (initiales sur fond crème) si la photo manque.
6. Chiffres clés (réutiliser le composant Stats) + CTA vers le contact.

---

## 7. Effet « waouh » — animations

Objectif : un site vitrine qui marque, pas un site « comme les autres ». Toujours au service de la lisibilité, et fluide (60 fps).

### 7.1 Illustration du hero animée (prioritaire)

L'illustration actuelle est un PNG unique (`/img/vector2@4x-8.png`, 600×425) : ordinateur, tasse avec vapeur, lampe, horloge, cactus, stylet.

**État actuel :** le fichier `hero_img.svg` fourni n'est **pas vectoriel**. C'est le PNG (1705×1207) dans une enveloppe SVG exportée depuis Figma, sans tracés ni calques : il est inutilisable tel quel pour l'animation.

**Méthode recommandée :** une version **SVG vectorielle** exportée depuis Illustrator à partir du fichier source (.ai ou .eps), avec ces réglages :
- Exporter sous > SVG
- Style : attributs de présentation
- Police : vectoriser
- ID d'objet : noms de calque

Calques nommés attendus : `steam-1`, `steam-2`, `cup`, `clock-hand-hour`, `clock-hand-minute`, `clock-center`, `lamp-head`, `lamp-arm`, `lamp-light`, `screen-glare`, `art-circle`, `art-pen`, `art-rocket`, `palette-swatches`, `cactus`, `monitor`, `screen-ui`, `keyboard`, `mouse`, `marker`, `pot`.

Intégrer ce SVG inline et animer chaque calque :

- **Vapeur de la tasse :** 2 ou 3 volutes qui montent, ondulent et s'estompent en boucle (GSAP timeline ou keyframes CSS, décalées ; option `feTurbulence` + `feDisplacementMap` pour un effet organique).
- **Écran du PC :** le tracé de plume Illustrator se dessine (`stroke-dashoffset`), la fusée se déplace, les pastilles de couleur pulsent ; boucle d'environ 6 s.
- **Horloge :** aiguilles qui affichent **l'heure réelle du visiteur** (petit détail qui surprend).
- **Lampe :** léger halo ambre qui s'allume au chargement ; la tête de lampe suit légèrement la souris (desktop).
- **Cactus :** légère oscillation.
- **Parallaxe au mouvement de la souris** sur les calques (profondeurs différentes), désactivée sur mobile.

- **Reflet de l'écran (`screen-glare`) :** balayage lumineux lent sur l'écran, en boucle.

**Solution de repli** si le vectoriel n'est pas disponible : garder le PNG comme fond, avec une version **sans la vapeur et sans les aiguilles**. Redessiner en SVG inline uniquement les parties animées (vapeur, aiguilles, reflet), positionnées en `%` dans le même conteneur que l'image, pour qu'elles suivent son redimensionnement.

### 7.2 Autres animations

- **Titre du hero :** apparition lettre par lettre conservée (après le correctif P0 n°1), puis le mot ambre qui défile en boucle (EN : stand out → inspire → convert ; FR : se démarquent → inspirent → convertissent).
- **Transition entre pages :** un bloc ambre (clin d'œil au carré du logo) qui balaie l'écran à chaque navigation.
- **Défilement fluide :** Lenis + GSAP ScrollTrigger pour les apparitions au scroll (sections, titres, cartes).
- **Curseur personnalisé** (desktop uniquement) : point ambre qui grossit sur les éléments cliquables et affiche « View » sur les cartes projets ; **boutons magnétiques** sur les CTA principaux.
- **Section photo (bureau) :** parallaxe douce au scroll.
- **Projets (scroll horizontal) :** à garder, avec zoom de l'image au survol et curseur « View ».
- **Chiffres clés :** compteur animé au scroll (vérifier qu'il existe déjà).
- **Loader de première visite** (≤ 1,2 s, une seule fois par session) : signature « Design. Code. Zignnn. ».

### 7.3 Garde-fous

- Respecter `prefers-reduced-motion` : animations réduites à de simples fondus.
- Mobile : pas de parallaxe souris ni de curseur custom ; animations allégées.
- Animer uniquement `transform` et `opacity` ; aucun décalage de mise en page (CLS ≈ 0).
- Objectif Lighthouse mobile ≥ 90 en Performance et en Accessibilité.

---

## 8. Projets / études de cas (sans charger de base de données)

Problème : aujourd'hui, « Voir plus » renvoie vers Google Drive, ce qui fait sortir le visiteur du site. Contrainte : ne pas alourdir la base de données, et garder des fichiers téléchargeables par n'importe qui.

**Solution :** une page `/[locale]/projects/[slug]` par projet, **sans base de données**. Contenu dans des fichiers du dépôt (`content/projects/*.mdx` ou `src/data/projects.ts`, EN + FR). Les images sont des fichiers statiques en WebP optimisé (≤ 200 Ko chacun) dans `/public/projects/<slug>/`, servis par le CDN de Vercel. Aucune vidéo ni aucun PDF dans le dépôt.

### 8.1 Trois types de projets, un seul gabarit de page

Un seul composant de page. Les blocs s'affichent selon les champs remplis :

| Type | Contenu de la page | Actions |
|---|---|---|
| **Identité visuelle / charte graphique** (Kasastay, Evers Beauty) | Contexte, défi, démarche ; **galerie de 5 à 6 visuels** (lightbox au clic) | Bouton **« Download brand guidelines (PDF) »** (lien externe : Google Drive en téléchargement direct, ou stockage objet type Cloudflare R2) |
| **Application** (web, mobile ou logiciel) | **Explication détaillée** (problème, fonctionnalités clés, stack) ; quelques captures ; **vidéo YouTube intégrée** (motion design de présentation, hébergée sur la chaîne YouTube ZignnnIt) | Liens « Open the app », Play Store / App Store si disponibles |
| **Site web simple** (ex. Gaëlle & Joël) | Description courte ; 2 ou 3 captures (desktop + mobile) | Bouton **« Visit live site »** |

### 8.2 Modèle de données (exemple)

```ts
type Project = {
  slug: string;
  type: 'branding' | 'app' | 'website';
  title: string;
  category: { en: string; fr: string };
  summary: { en: string; fr: string };
  body: { en: string; fr: string };      // ou fichier MDX par langue
  cover: string;                          // /projects/<slug>/cover.webp
  gallery?: string[];                     // 2 à 6 images
  youtubeId?: string;                     // ex. "dQw4w9WgXcQ"
  downloadUrl?: string;                   // PDF de la charte (externe)
  liveUrl?: string;                       // site ou app en ligne
  stores?: { playStore?: string; appStore?: string };
  tools: string[];                        // réutilise les badges existants
  year: number;
};
```

### 8.3 Vidéo YouTube : intégration légère (important pour les performances)

- **Ne pas** charger l'iframe YouTube au chargement de la page : elle pèse lourd et ralentit le site, surtout sur mobile.
- Utiliser une **façade** : on affiche la miniature YouTube (`https://i.ytimg.com/vi/<id>/maxresdefault.jpg`) avec un bouton lecture ambre aux couleurs de la marque. L'iframe n'est chargée qu'au clic, en lecture automatique (`autoplay=1`).
- Domaine `youtube-nocookie.com` (respect de la vie privée), ratio 16:9, coins arrondis, rien de YouTube visible avant le clic.
- Possibilité d'utiliser `react-lite-youtube-embed` ou un composant maison équivalent.
- Si un projet n'a pas encore de vidéo : pas de bloc vide, la page s'affiche sans.

**Règle validée — YouTube ou serveur :**
- **Vidéos explicatives longues** (motion design de présentation d'une app) → **YouTube**, sur la chaîne ZignnnIt. Gratuit, qualité adaptée à la connexion du visiteur, aucune bande passante consommée sur notre hébergement.
- **Boucles courtes** (5–10 s, muettes, sans contrôles, **< 2 Mo**) pour la couverture d'un projet ou le survol d'une carte → **auto-hébergées** dans `/public/projects/<slug>/`, formats MP4 (H.264) + WebM, attributs `autoplay muted loop playsinline`, image `poster` obligatoire, chargement différé (lancement seulement quand la vidéo entre à l'écran). Désactivées si `prefers-reduced-motion`.
- Champ optionnel dans le modèle de données : `coverLoop?: { mp4: string; webm: string; poster: string }`.

### 8.4 Structure d'une page projet

Hero (titre, catégorie, année, image de couverture) → résumé → contenu détaillé → vidéo (si présente) → galerie → outils utilisés → actions (télécharger / voir le site / stores) → projet suivant (navigation entre projets avec transition animée).

---

## 9. Contact

- **WhatsApp comme canal secondaire, sans bouton flottant** (choix assumé : cible internationale). Ajouter :
  - un bloc « Other ways to reach us » : e-mail `contact@zignnnit.com`, WhatsApp (`https://wa.me/237695098342`, numéro à confirmer), LinkedIn ;
  - dans le formulaire, un champ « Preferred contact method » : Email / WhatsApp / Phone call.
- Réordonner les champs : Prénom, Nom, E-mail, Entreprise, Site web (optionnel), Téléphone, Message.
- Garder Cloudflare Turnstile.
- Message de succès animé et traduit.

---

## 10. Boutique (/shop)

La page « Coming soon » n'offre aucune action. Ajouter un champ e-mail « Notify me at launch » (stockage simple : la solution d'e-mailing actuelle du formulaire de contact, ou un service de formulaires), ou masquer temporairement le lien Shop. Préférence : **garder la page et ajouter la liste d'attente**.

---

## 11. SEO et métadonnées

- Image OG par langue (1200×630), aux couleurs ambre/carbone, avec le slogan.
- `metadata` Next.js par page et par langue, `sitemap.xml`, `robots.txt`.
- Données structurées JSON-LD `Organization` / `ProfessionalService`.

---

## 12. Ce qu'il ne faut PAS changer

- Le logo (refonte prévue plus tard, séparément).
- La structure générale de la home et l'ordre des sections.
- Le scroll horizontal des projets, le défilé des logos, le mode sombre.
- L'esprit visuel (clair, ambre, aéré).

---

## 13. Checklist de validation

- [ ] Plus aucun mot coupé dans les titres, à toutes les largeurs (320 → 1920 px).
- [ ] Illustration visible et animée sur mobile.
- [ ] Urbanist entièrement retirée ; Cabinet Grotesk et General Sans auto-hébergées.
- [ ] Pages projets : les 3 types s'affichent correctement ; la vidéo YouTube ne se charge qu'au clic.
- [ ] Bascule EN/FR fonctionnelle sur toutes les pages, `hreflang` en place.
- [ ] Page About avec les 2 collaborateurs (photos et LinkedIn modifiables dans `team.ts`).
- [ ] Logos obsolètes commentés.
- [ ] Menu mobile opaque et lisible ; footer mobile propre.
- [ ] `prefers-reduced-motion` respecté.
- [ ] Lighthouse mobile ≥ 90 (Performance et Accessibilité).
- [ ] Test sur un vrai téléphone Android d'entrée de gamme.
