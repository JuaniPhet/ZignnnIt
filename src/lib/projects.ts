export interface ProjectTool {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  image: string;
  tools: ProjectTool[];
  link: string;
  description: string;
}

export const allProjects: Project[] = [
  {
    title: "Lumax",
    image: "/img/lumax_identity.png",
    tools: [
      { src: "/img/tools/ai.png", alt: "Illustrator" },
      { src: "/img/tools/ps.png", alt: "Photoshop" }
    ],
    link: "https://drive.google.com/file/d/1qWO4bgiAeg4e2IQuQLAvj-CxLUGkoTez/view?usp=sharing",
    description: "A modern visual identity for Lumax — logo, stationery, and branding crafted with precision."
  },
  {
    title: "Profinder",
    image: "/img/profinder.png",
    tools: [
      { src: "/img/tools/figma.png", alt: "Figma" }
    ],
    link: "https://www.figma.com/design/n5ZAKBrEqYaqXhaqX5QZMR/ProFinder?node-id=0-1&t=aqo6HehkOGyaAy93-1",
    description: "An intuitive platform connecting professionals with clients through a sleek, engaging interface."
  },
  {
    title: "ZignnnIt",
    image: "/img/zignnnit_img.png",
    tools: [
      { src: "/img/tools/html5.png", alt: "Html 5" },
      { src: "/img/tools/css3.png", alt: "Css 3" },
      { src: "/img/tools/JavaScript-logo.png", alt: "Javascript" },
      { src: "/img/tools/Tailwind_CSS_Logo.png", alt: "Tailwindcss" },
      { src: "/img/tools/vs_code.png", alt: "Vs Code" }
    ],
    link: "#",
    description: "Our own digital presence — creativity, innovation, and cutting-edge technology in one platform."
  },
  {
    title: "BMI Calculator",
    image: "/img/bmi_calculator.jpg",
    tools: [
      { src: "/img/tools/flutter.png", alt: "Flutter" },
      { src: "/img/tools/vs_code.png", alt: "VS Code" }
    ],
    link: "https://www.linkedin.com/posts/japhetseumo_flutter-caparledev-generativeia-activity-7231597137422159872-eqgv?utm_source=share&utm_medium=member_android",
    description: "A user-friendly Flutter app for health insights and personalized BMI recommendations."
  }
];

// Featured projects shown on homepage (first 4)
export const featuredProjects = allProjects.slice(0, 4);
