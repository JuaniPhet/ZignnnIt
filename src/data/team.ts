import type { Localized } from "@/data/projects";

export type TeamMember = {
  name: string;
  role: Localized;
  /**
   * Path under /public. If the file doesn't exist yet, the card shows an elegant
   * initials placeholder — just drop the photo at this path (4:5 ratio, WebP).
   */
  photo: string;
  /** Full LinkedIn URL, or null to hide the icon. */
  linkedin: string | null;
};

// Add a collaborator = add one object here. Order = display order.
export const team: TeamMember[] = [
  {
    name: "Japhet Seumo",
    role: { en: "Software Developer & Designer", fr: "Développeur logiciel & designer" },
    photo: "/team/japhet-seumo.webp",
    linkedin: "https://www.linkedin.com/in/japhetseumo",
  },
  {
    name: "Jordan Tchakounte",
    role: { en: "2D / 3D Designer", fr: "Designer 2D / 3D" },
    photo: "/team/jordan-tchakounte.webp",
    linkedin: "https://www.linkedin.com/in/jordan-tchakounte-642404349",
  },
];
