# ZignnnIt v2 — Notes techniques

Ce document explique **ce qui a changé**, **comment le code est organisé** et surtout **pourquoi** chaque choix a été fait. Le but : pouvoir maintenir et faire évoluer le site en comprenant les concepts, pas seulement en recopiant du code.

---

## 1. Vue d'ensemble

| Domaine | Outil | Rôle |
|---|---|---|
| Framework | Next.js 16 (App Router) | Pages, rendu serveur, génération statique, métadonnées |
| UI | React 19, Tailwind CSS v4, shadcn/ui (Base UI) | Composants et styles |
| Langues | next-intl 4 | Routes `/en` et `/fr`, traductions typées |
| Animations | GSAP + ScrollTrigger, Lenis | Animations, déclenchement au scroll, défilement fluide |
| Formulaire | Resend + Cloudflare Turnstile | Envoi d'e-mail, anti-robots |

**Arborescence utile**

```
messages/                 Textes de l'interface (en.json, fr.json)
src/
  proxy.ts                Redirige vers /en ou /fr (ex-« middleware »)
  i18n/                   Configuration des langues (routing, request, navigation, metadata)
  app/
    [locale]/             Toutes les pages, une fois par langue
      layout.tsx          <html lang>, polices, providers, Navbar/Footer, JSON-LD
      page.tsx            Accueil
      about/ contact/ shop/ projects/ projects/[slug]/
      opengraph-image.tsx Image de partage générée
    api/send/route.ts     Envoi du formulaire (hors langues)
    sitemap.ts robots.ts
  data/                   Contenu structuré : projects, team, tools, contact
  components/             Sections, cartes, composants d'animation (motion/)
  lib/motion.ts           Aides partagées par les animations
  fonts/                  Polices auto-hébergées (+ og/ pour les images de partage)
public/projects/<slug>/   Images des projets (WebP)
public/team/              Photos de l'équipe
```

---

## 2. Ce qui a changé, étape par étape

1. **Corrections et identité.** Mots coupés dans le titre, menu mobile opaque, contrastes, espacements. Urbanist remplacée par Cabinet Grotesk et General Sans (auto-hébergées). Tokens de couleur `amber`, `amber-deep`, `carbon` et `cream`. Défilé de logos allégé.
2. **Hero animé.** Illustration SVG inline animée, en clair et en sombre.
3. **Bilingue EN / FR.** Routes préfixées, sélecteur de langue, nouveau slogan, métadonnées traduites.
4. **Contenu.** Page About, pages projets sans base de données, formulaire enrichi (site web, moyen de contact préféré, WhatsApp), SEO (sitemap, robots, images de partage, JSON-LD).
5. **Effet « waouh ».** Défilement fluide, transitions de page, apparitions au scroll, curseur personnalisé, boutons magnétiques, loader, titre au mot rotatif, compteurs, parallaxe. Tout respecte « réduire les animations ».

---

## 3. Le bilingue (i18n) : comment et pourquoi

### 3.1 Les choix possibles

| Option | Principe | Pourquoi on ne l'a pas retenue |
|---|---|---|
| Langue en cookie seulement, même URL | `/contact` affiché en FR ou EN selon le visiteur | Google ne voit qu'une langue. On ne peut pas partager « la version française ». |
| Sous-domaines (`fr.zignnnit.com`) | Une langue par domaine | Plus de configuration DNS et Vercel, et un intérêt nul pour un site de cette taille. |
| Paramètre `?lang=fr` | Langue dans l'URL | Mal traité par les moteurs, URL peu propres. |
| **Préfixe de chemin (`/en`, `/fr`)** ✅ | Chaque langue a ses propres URL | Indexable, partageable, compatible avec la génération statique. C'est la recommandation de Google. |

| Bibliothèque | Pourquoi |
|---|---|
| i18n intégré à Next.js | N'existe que pour l'ancien « Pages Router », pas pour l'App Router. |
| i18next / react-i18next | Très complet, mais pensé côté client. Avec les Server Components, il faut beaucoup de colle. |
| Dictionnaire maison (`fr.ts`) | Possible, mais il faudrait réécrire la détection, les pluriels, le formatage et le typage. |
| **next-intl** ✅ | Conçu pour l'App Router : fonctionne côté serveur **et** client, gère le routage, le proxy, le format ICU (pluriels, variables, balises) et le typage des clés. |

### 3.2 Le trajet d'une requête

```
Visiteur → zignnnit.com/contact
  └─ src/proxy.ts (next-intl)
       1. Cookie NEXT_LOCALE ?            → fr
       2. Sinon en-tête Accept-Language ?  → fr-FR → fr
       3. Sinon langue par défaut          → en
     → redirection 307 vers /fr/contact
  └─ app/[locale]/layout.tsx  (locale = "fr")
       hasLocale() vérifie la langue, setRequestLocale() active le rendu statique
  └─ src/i18n/request.ts : charge UNIQUEMENT messages/fr.json
  └─ Les composants appellent useTranslations("contact") → t("title")
```

### 3.3 Les règles à retenir

- **Les textes ne vivent jamais dans le JSX.** Tout passe par `messages/*.json`. Un texte en dur ne sera jamais traduit.
- **Les clés sont typées** (`src/global.d.ts`). Avec `t("hero.titel")`, la faute de frappe fait échouer le build : on le voit avant la mise en ligne, pas en production.
- **Mise en forme dans une traduction : des balises, pas des morceaux de phrase.**
  ```json
  "title": "Our <hl>Services</hl>"
  ```
  ```tsx
  t.rich("title", { hl: (chunks) => <span className="text-amber">{chunks}</span> })
  ```
  Pourquoi : l'ordre des mots change d'une langue à l'autre. Couper la phrase (`"Our"` + `"Services"`) empêche le traducteur de la réorganiser.
- **Le serveur renvoie des codes, le client traduit.** L'API du contact répond `{ code: "email_invalid" }`, et le formulaire affiche `t("errors.email_invalid")`. L'API n'a pas besoin de connaître la langue de l'interface, et le message suit la langue même si on la change après coup.
- **Contenu ou interface ?**
  - L'interface (boutons, titres) va dans `messages/`.
  - Le contenu attaché à une donnée (la description d'un projet) reste **à côté de la donnée**, sous la forme `{ en, fr }`, dans `src/data/projects.ts`. Ajouter un projet se fait alors en un seul endroit, et le type `Localized` refuse une langue manquante.
- **Liens** : utiliser `Link` de `@/i18n/navigation`, pas `next/link`. Il ajoute `/en` ou `/fr` automatiquement.
- **SEO multilingue** : chaque page déclare son `canonical` et ses `hreflang` (`en`, `fr`, `x-default`) via `pageAlternates()`. Google comprend ainsi que `/en/contact` et `/fr/contact` sont **deux traductions**, et non du contenu dupliqué.
- **Piège ICU** : l'apostrophe droite `'` est un caractère d'échappement dans le format ICU. Utiliser l'apostrophe typographique `’`, de toute façon plus correcte en typographie.

### 3.4 Ajouter une langue (ex. espagnol)

1. `src/i18n/routing.ts` : `locales: ["en", "fr", "es"]`.
2. Créer `messages/es.json` en copiant `en.json`, puis traduire.
3. Ajouter `es` aux champs `{ en, fr }` de `src/data/*.ts`. TypeScript signalera chaque oubli.
4. Ajouter le libellé de langue dans `language` des messages.

---

## 4. Server Components et Client Components

- **Composant serveur** (par défaut) : rendu une fois sur le serveur, il n'envoie **aucun JavaScript** au navigateur. Il peut lire des fichiers, exporter `generateMetadata` et charger des traductions. Les pages et le Footer le sont.
- **Composant client** (`"use client"`) : nécessaire seulement pour l'état (`useState`), les effets (`useEffect`), les événements et les API du navigateur. C'est le cas du formulaire, du menu et des animations.
- **Bonne pratique** : la page (serveur) porte les métadonnées et enveloppe une petite partie interactive (client). Par exemple, `contact/page.tsx` (serveur) rend `ContactContent` (client).
- En v1, toutes les pages étaient en `"use client"`, ce qui rendait impossibles les métadonnées par page.

**Génération statique** : `generateStaticParams()` liste les langues et les projets, et Next produit au build une page HTML par combinaison. Le site sert donc des fichiers statiques depuis le CDN de Vercel : rapide, sans serveur ni base de données.

---

## 5. Contenu sans base de données

| Je veux… | Je modifie |
|---|---|
| Ajouter un projet | Un objet dans `src/data/projects.ts` et `public/projects/<slug>/cover.webp`. La page, le sitemap et l'image de partage se créent seuls. |
| Enrichir un projet | Les champs `body`, `gallery`, `youtubeId`, `coverLoop`, `stores`… Chaque bloc ne s'affiche que s'il est rempli. |
| Ajouter un collaborateur | Un objet dans `src/data/team.ts`, puis la photo dans `public/team/` (ratio 4:5). Sans photo, la carte affiche les initiales. |
| Changer un texte d'interface | `messages/en.json` et `messages/fr.json` |
| Changer e-mail, WhatsApp, LinkedIn | `src/data/contact.ts` (utilisé par le contact, le footer et le JSON-LD) |

**Pourquoi pas de base de données ?** Le contenu change rarement et c'est toi qui l'écris. Un fichier versionné dans Git donne l'historique, la relecture, zéro coût et zéro panne possible, et TypeScript vérifie la structure. Les gros fichiers (PDF, vidéos longues) restent à l'extérieur : Drive, YouTube.

**Images** : WebP de 200 Ko au plus. `next/image` sert ensuite la bonne taille selon l'écran grâce à l'attribut `sizes`. Les anciennes bannières pesaient jusqu'à 2,3 Mo.

---

## 6. Styles : polices, couleurs, Tailwind v4

- **Polices auto-hébergées** (`next/font/local`) : pas d'appel à un serveur tiers (vie privée, rapidité). Next précharge les fichiers et calcule une police de repli aux mêmes dimensions, ce qui évite que le texte « saute » au chargement (CLS). `display: "swap"` affiche le texte tout de suite. `font-synthesis: none` interdit au navigateur de fabriquer un faux gras quand une graisse n'existe pas.
- **Tokens de couleur** (`globals.css`) : la couleur est définie **une seule fois** (`--amber: #f59e0b`), et les composants utilisent `bg-amber`, `text-amber-deep`… Changer la teinte se fait donc en un seul endroit. Attention : le `amber-500` de Tailwind v4 n'est **pas** `#F59E0B`.
- **Contraste** : l'ambre sur blanc est illisible en petit. On utilise du texte carbone sur fond ambre, ou `amber-deep` pour le grand texte.
- **`@theme inline`** : permet à Tailwind de pointer vers une variable posée par `next/font` sur `<html>`.
- **Pièges rencontrés dans ce projet**
  - Les points d'arrêt sont personnalisés : `sm` = **340 px**, `md` = 540 px, `lg` = 768 px, `xl` = 1180 px. Pour passer en 2 colonnes, utiliser `md:`, pas `sm:`.
  - En Tailwind v4, `dark:` suit par défaut le mode sombre **du système**. On l'a lié à la classe `.dark` du bouton (`@custom-variant dark`).

---

## 7. SEO

- **Métadonnées par page** (`generateMetadata`) : titre, description, `canonical`, `hreflang`, Open Graph.
- **Piège** : l'`openGraph` d'une page **remplace** celui du layout au lieu de s'y ajouter. D'où l'utilitaire `pageOpenGraph()`, qui reconstruit l'objet complet.
- **`sitemap.xml` et `robots.txt`** sont générés à partir des données : un nouveau projet y apparaît tout seul.
- **Images de partage** (`opengraph-image.tsx`) : générées au build avec `next/og`. Il y en a une par langue avec le slogan, et une par projet. Ce sont des PNG, car LinkedIn lit mal le WebP. Ce moteur ne lit pas le woff2, d'où les polices OTF dans `src/fonts/og`.
- **JSON-LD** (`ProfessionalService`) : décrit l'agence pour les moteurs (nom, contact, zone servie, langues). Le caractère `<` est échappé pour qu'il ne puisse jamais fermer la balise `<script>`.

---

## 8. Animations

### 8.1 Les règles du brief, et comment elles sont tenues

| Règle | Mise en œuvre |
|---|---|
| 60 images par seconde | On n'anime que `transform` et `opacity`, que la carte graphique gère sans recalculer la mise en page. |
| Zéro décalage de mise en page (CLS ≈ 0) | Le mot rotatif réserve la place du mot le plus long (tous les mots sont dans la même cellule de grille). |
| `prefers-reduced-motion` | `prefersReducedMotion()` (`lib/motion.ts`). On ne garde que des fondus : ni loader, ni curseur, ni Lenis, ni boucles. Une règle CSS globale rend aussi les transitions quasi instantanées. |
| Mobile allégé | `hasFinePointer()` réserve le curseur, les boutons magnétiques et la parallaxe souris aux appareils avec souris. |
| Économie de batterie | Les boucles (titre, illustration) se mettent en pause hors écran (`IntersectionObserver`). |

### 8.2 Les techniques utilisées

- **Lenis et GSAP sur la même horloge.** Lenis lisse le défilement, et ScrollTrigger déclenche des animations selon ce défilement. Si chacun avait sa propre boucle, ils se décaleraient. On fait donc avancer Lenis avec le ticker de GSAP (`gsap.ticker.add`), et Lenis prévient ScrollTrigger à chaque mouvement.
- **Des attributs plutôt que du code répété.** `data-reveal` (apparition au scroll), `data-magnetic` (bouton magnétique) et `data-cursor="view"` (étiquette du curseur). Un seul composant global gère chaque comportement, et il suffit d'ajouter l'attribut dans le HTML.
- **`gsap.context()` et `useGSAP`** : ils regroupent les animations d'un composant pour pouvoir **tout annuler** quand il disparaît. Sans ça, les animations s'accumulent à chaque navigation.
- **Transition de page** : un écouteur de clic en phase de *capture* voit le clic avant Next. Il bloque la navigation, joue le balayage ambre, navigue par `router.push`, puis retire le bloc quand l'adresse a changé.
- **Pas de flash au chargement** : un petit script, placé tout en haut du `<body>`, s'exécute **avant le premier affichage**. Il décide s'il faut le loader et masque les lettres du titre jusqu'à leur animation. Fait dans React, ce serait trop tard : l'écran aurait déjà été peint. Une animation CSS de secours affiche tout si le JavaScript ne charge jamais.
- **Progressive enhancement** : sans JavaScript, tout reste visible et lisible. Les compteurs gardent leur valeur finale dans le HTML, et les apparitions ne masquent rien côté serveur.

---

## 9. Hydratation : le bug qu'on a corrigé

**Définition** : le serveur envoie du HTML prêt à afficher. Le JavaScript de React « s'hydrate » ensuite dessus, c'est-à-dire qu'il recalcule le même rendu et y attache les événements. Si le HTML reçu et le rendu calculé diffèrent, React lève l'erreur **#418**, jette le HTML et recalcule tout côté client : c'est lent, et des éléments clignotent.

**Ce qu'on a vu** : une erreur #418 environ une fois sur six, seulement en production.

**Comment on l'a trouvé** :
1. Mesurer la fréquence sur plusieurs chargements.
2. Revenir temporairement à l'état de l'étape 3 (`git stash`) : plus d'erreur, donc la cause est dans l'étape 4.
3. Former une hypothèse et la tester.

**La cause** : un `<head>` écrit à la main dans le layout. Next et React gèrent eux-mêmes ce `<head>` et y ajoutent des éléments au fil du chargement, ce qui entrait en conflit avec le nôtre. En plaçant le script au début du `<body>`, on est passé à 0 erreur sur 20.

**À retenir** :
- **Ne jamais calculer pendant le rendu** une valeur qui diffère entre serveur et navigateur (`window`, `Date.now()`, `Math.random()`, préférences système). On la calcule dans un `useEffect`.
- `suppressHydrationWarning` sur `<html>` est normal : les scripts du thème et du loader y ajoutent des classes avant React. Cette protection ne s'applique qu'aux attributs de **cet** élément.

---

## 10. Accessibilité : les réflexes appliqués

- **Titre découpé en lettres** : `aria-label` sur le `<h1>` et `aria-hidden` sur les lettres. Sinon, un lecteur d'écran épelle « W-e c-r-a-f-t ».
- **Pas d'élément interactif dans un autre** : les `<button>` imbriqués dans des `<a>` de la v1 ont été corrigés.
- **Images** : `alt` descriptif si l'image apporte une information, `alt=""` si elle est décorative.
- **Visionneuse de la galerie** : élément natif `<dialog>` avec `showModal()`. Le navigateur gère seul la touche Échap, le piégeage du focus et l'arrière-plan inerte.
- **Navigation au clavier** : contour visible au focus clavier (`focus-visible`), `aria-expanded` sur le bouton du menu, `aria-current` sur la langue active.
- **Un seul `<h1>` par page.**

---

## 11. Formulaire et sécurité

- **Ne jamais faire confiance au client** : tout est revalidé dans `api/send/route.ts` (champs obligatoires, longueurs, format de l'e-mail, site web, téléphone exigé pour WhatsApp ou un appel).
- **Anti-spam à deux niveaux** :
  - **Turnstile**, vérifié côté serveur avec la clé secrète ;
  - un **piège invisible**, le champ `fax`, que seuls les robots remplissent. Le serveur répond alors « succès » sans rien envoyer, pour ne pas renseigner le robot.
- **`escapeHtml`** sur toutes les valeurs insérées dans l'e-mail HTML, pour empêcher l'injection de code.
- **Les secrets** (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) sont dans `.env.local` et ne sont jamais commités. Les variables `NEXT_PUBLIC_*` sont visibles dans le navigateur, donc jamais de secret dedans.

---

## 12. Méthode de travail Git

- Le travail est fait sur une branche dédiée (`v2`), et `main` n'est fusionnée qu'après validation.
- **Un commit par sous-étape cohérente**, avec des messages au format *Conventional Commits* : `feat(hero): …`, `fix(navbar): …`, `chore(…)`. L'historique se lit comme un journal, et on peut revenir sur un changement précis.
- Avant chaque push : `npm run build`. Le build vérifie TypeScript, les clés de traduction et la génération de toutes les pages.

---

## 13. Points ouverts

- Compléter les projets existants : `body` (contexte, défi, démarche), `gallery`, `youtubeId`.
- Déposer les photos `public/team/japhet-seumo.webp` et `public/team/jordan-tchakounte.webp`, et ajouter le LinkedIn de Jordan dans `src/data/team.ts`.
- Mesurer Lighthouse mobile sur l'aperçu Vercel (objectif : 90 ou plus en Performance et en Accessibilité).
- Logo : la refonte est prévue. Ses tracés actuels sont dans `Navbar.tsx`, `Footer.tsx` et `components/brand/logo-paths.ts` (images de partage).
