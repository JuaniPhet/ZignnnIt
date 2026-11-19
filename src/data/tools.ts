/**
 * Tool badges registry: each logo is declared once and referenced by id in projects
 * (tools: ["figma", "nextjs"]). TypeScript autocompletes the ids and rejects unknown ones.
 * invertDark: dark logo that must be inverted on the dark theme.
 */
export const tools = {
  illustrator: { name: "Illustrator", src: "/img/tools/adobe-illustrator.svg" },
  photoshop: { name: "Photoshop", src: "/img/tools/adobe-photoshop.svg" },
  indesign: { name: "InDesign", src: "/img/tools/adobe-indesign.svg" },
  figma: { name: "Figma", src: "/img/tools/figma.svg" },
  framer: { name: "Framer", src: "/img/tools/framer.svg", invertDark: true },
  nextjs: { name: "Next.js", src: "/img/tools/nextjs.svg", invertDark: true },
  typescript: { name: "TypeScript", src: "/img/tools/typescript.svg" },
  tailwind: { name: "Tailwind CSS", src: "/img/tools/tailwindcss.svg" },
  shadcn: { name: "shadcn/ui", src: "/img/tools/shadcn-ui.svg", invertDark: true },
  gsap: { name: "GSAP", src: "/img/tools/gsap.svg" },
  vercel: { name: "Vercel", src: "/img/tools/vercel.svg", invertDark: true },
  flutter: { name: "Flutter", src: "/img/tools/flutter.svg" },
  vscode: { name: "VS Code", src: "/img/tools/visual-studio-code.svg" },
  antigravity: { name: "Google Antigravity", src: "/img/tools/google-antigravity.svg" },
} as const;

export type ToolId = keyof typeof tools;
