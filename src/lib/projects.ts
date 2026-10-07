export interface ProjectTool {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  category: string;
  image: string;
  tools: ProjectTool[];
  link: string;
  description: string;
}

export const allProjects: Project[] = [
  {
    title: "Kasastay",
    category: "Graphic Design",
    image: "/img/projects/kasastay_banner.jpg",
    tools: [
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" },
      { src: "/img/tools/figma.svg", alt: "Figma" }
    ],
    link: "https://drive.google.com/file/d/1WPimFfGAZPNzTWQXMrH7sGW4ElLSrBpc/view?usp=drive_link",
    description: "A comprehensive brand identity and graphic guidelines crafted for Kasastay, a modern property rental and real estate company in Cameroon."
  },
  {
    title: "Evers Beauty",
    category: "Graphic Design",
    image: "/img/projects/evers_beauty_banner.jpg",
    tools: [
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/adobe-indesign.svg", alt: "InDesign" },
      { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" }
    ],
    link: "https://drive.google.com/file/d/13J9NVaTTrp9GI1ood0e-pqjA8c251wtZ/view?usp=drive_link",
    description: "A comprehensive visual identity and brand style guide crafted for Evers Beauty, a modern aesthetics and wellness institute."
  },
  {
    title: "NovaSup",
    category: "Graphic Design",
    image: "/img/projects/navasup_banner.jpg",
    tools: [
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" },
      { src: "/img/tools/adobe-indesign.svg", alt: "InDesign" }
    ],
    link: "https://drive.google.com/file/d/1JgrTKbnV6pkGOSpJD0hHaSnk05omBEl7/view?usp=drive_link",
    description: "A complete brand identity and graphic guidelines crafted for NovaSup, a higher education and academic institute."
  },
  {
    title: "Profinder",
    category: "UI/UX Design",
    image: "/img/projects/profinder.png",
    tools: [
      { src: "/img/tools/figma.svg", alt: "Figma" }
    ],
    link: "https://www.figma.com/design/n5ZAKBrEqYaqXhaqX5QZMR/ProFinder?node-id=0-1&t=aqo6HehkOGyaAy93-1",
    description: "An intuitive platform connecting professionals with clients through a sleek, engaging interface."
  },
  {
    title: "ZignnnIt",
    category: "Web Development",
    image: "/img/projects/zignnnit_img.jpeg",
    tools: [
      { src: "/img/tools/nextjs.svg", alt: "NextJs" },
      { src: "/img/tools/gsap.svg", alt: "Gsap" },
      { src: "/img/tools/typescript.svg", alt: "Typescript" },
      { src: "/img/tools/tailwindcss.svg", alt: "Tailwind CSS" },
      { src: "/img/tools/visual-studio-code.svg", alt: "VS Code" }
    ],
    link: "#",
    description: "Our own digital presence — creativity, innovation, and cutting-edge technology in one platform."
  },
  {
    title: "Lumax",
    category: "Graphic Design",
    image: "/img/projects/lumax_identity.png",
    tools: [
      { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
      { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" }
    ],
    link: "https://drive.google.com/file/d/1qWO4bgiAeg4e2IQuQLAvj-CxLUGkoTez/view?usp=sharing",
    description: "A modern visual identity for Lumax — logo, stationery, and branding crafted with precision."
  },
  {
    title: "BMI Calculator",
    category: "Mobile Development",
    image: "/img/projects/bmi_calculator.jpg",
    tools: [
      { src: "/img/tools/flutter.svg", alt: "Flutter" },
      { src: "/img/tools/visual-studio-code.svg", alt: "VS Code" }
    ],
    link: "https://www.linkedin.com/posts/japhetseumo_flutter-caparledev-generativeia-activity-7231597137422159872-eqgv?utm_source=share&utm_medium=member_android",
    description: "A user-friendly Flutter app for health insights and personalized BMI recommendations."
  }
];

// Featured projects shown on homepage (first 4)
export const featuredProjects = allProjects.slice(0, 4);
