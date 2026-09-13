// Shared fallback/seed data for the portfolio.
// Used by both the app (via fallback.ts) and scripts/seed.mjs.

export const education = [
  {
    year: "2021",
    title: "Start of University Journey",
    institution: "University of Djelfa",
    description:
      "Began my academic path in computer science, studying programming fundamentals, mathematics, and core algorithms.",
    type: "university",
    status: "completed",
  },
  {
    year: "2021-2022",
    title: "Web Development Foundations",
    institution: "University of Djelfa",
    description:
      "Built a strong foundation in web technologies, including HTML, CSS, JavaScript, and database management, while applying concepts in academic projects.",
    type: "university",
    status: "completed",
  },
  {
    year: "2022-2024",
    title: "Bachelor’s Degree in Web Development",
    institution: "University of Djelfa",
    description:
      "Graduated with a Bachelor's degree in Web Development (Computer Science). Completed a final project focused on building modern web applications.",
    type: "degree",
    status: "completed",
  },
  {
    year: "2024",
    title: "React+Next.js & Nest.js Specialization",
    institution: "Online Courses / Self-Learning",
    description:
      "Advanced training in React and Next.js, mastering scalable web app development, UI/UX integration, and modern frontend practices.",
    type: "certificate",
    status: "completed",
  },
  {
    year: "2024-2026",
    title: "Master’s in Software Engineering and intelligent systems",
    institution: "University of Constantine 2 Abdelhamid Mehri",
    description:
      "Started my Master's degree in Software Engineering, focusing on advanced topics including distributed systems, software architecture, and artificial intelligence.",
    type: "university",
    status: "completed",
  },
  {
    year: "2025-Present",
    title: "Continuous Learning (AI, DevOps, Cloud)",
    institution: "Self-Learning & Personal Projects",
    description:
      "Expanding expertise in artificial intelligence, DevOps practices, and server/cloud administration. Actively developing SaaS platforms, POS systems, and mobile applications.",
    type: "ongoing",
    status: "in-progress",
  },
  {
    year: "JUIN 2026",
    title: "Master’s Degree Completion",
    institution: "University of Constantine 2 Abdelhamid Mehri",
    description:
      "Expected to complete my Master's degree in Software Engineering and intelligent systems, with a focus on advanced software development, AI integration, and cloud-based solutions.",
    type: "degree",
    status: "completed",
  },
];

export const certifications = [
  {
    title: "React+Next.js & Nest.js Specialization",
    issuer: "Online Courses / Self-Learning",
    date: "2024",
    imageUrl: "",
    credentialUrl: "",
  },
];

export const projects = [
  {
    title: "DWAM Landing Page",
    tagline: "Landing page for DWAM",
    description:
      "A modern, high-converting landing page built for DWAM with reusable components and smooth animations.",
    coverImage: "/img/projects/DWAM.png",
    images: [],
    techStack: ["Next.js", "React"],
    features: [],
    demoUrl: "https://dwam.vercel.app/",
    repoUrl: "",
    client: "",
    year: "",
    featured: true,
  },
  {
    title: "Daliloka BMC Maker",
    tagline: "Business Model Canvas maker",
    description:
      "Interactive Business Model Canvas (BMC) maker application built for the Daliloka founders.",
    coverImage: "/img/projects/daliloka.png",
    images: [],
    techStack: ["React", "Node.js"],
    features: [],
    demoUrl: "https://daliloka-app.vercel.app/",
    repoUrl: "",
    client: "Daliloka",
    year: "",
    featured: true,
  },
  {
    title: "Depanage , Graduation Project",
    tagline: "Graduation project",
    description:
      "Graduation project: a platform for connecting people with roadside assistance (dépannage) services.",
    coverImage: "/img/projects/depanage.png",
    images: [],
    techStack: [],
    features: [],
    demoUrl: "",
    repoUrl: "/",
    client: "",
    year: "",
    featured: false,
  },
  {
    title: "5ademni (fiverr clone)",
    tagline: "Freelance marketplace clone",
    description: "A Fiverr-style freelance services marketplace clone.",
    coverImage: "/img/projects/fiverrclone.jpg",
    images: [],
    techStack: [],
    features: [],
    demoUrl: "",
    repoUrl: "/",
    client: "",
    year: "",
    featured: false,
  },
  {
    title: "Admin Dashboard +2 lang",
    tagline: "Bilingual admin dashboard",
    description:
      "A bilingual (Arabic / English) admin dashboard built with Next.js and Tailwind CSS.",
    coverImage: "/img/projects/dashboard.png",
    images: [],
    techStack: ["Next.js", "Tailwind CSS"],
    features: [],
    demoUrl: "",
    repoUrl: "https://github.com/SalemDevLouy/nextjs-arabic-dashboard.git",
    client: "",
    year: "",
    featured: false,
  },
];

export const skills = [
  { name: "HTML", icon: "FaHtml5", color: "#e34c26", category: "Frontend" },
  { name: "CSS / SCSS", icon: "FaSass", color: "#cc6699", category: "Frontend" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38bdf8", category: "Frontend" },
  { name: "React", icon: "FaReact", color: "#61dbfb", category: "Frontend" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff", category: "Frontend" },
  { name: "Redux", icon: "SiRedux", color: "#764abc", category: "Frontend" },
  { name: "Vite", icon: "SiVite", color: "#646cff", category: "Frontend" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178c6", category: "Frontend" },
  { name: "JavaScript", icon: "SiJavascript", color: "#f7df1e", category: "Frontend" },
  { name: "Node.js", icon: "FaNodeJs", color: "#3c873a", category: "Backend" },
  { name: "Express.js", icon: "SiExpress", color: "#ffffff", category: "Backend" },
  { name: "Python", icon: "FaPython", color: "#3776ab", category: "Backend" },
  { name: "Java", icon: "FaJava", color: "#f89820", category: "Backend" },
  { name: "C++", icon: "SiCplusplus", color: "#00599c", category: "Backend" },
  { name: "MongoDB", icon: "SiMongodb", color: "#4db33d", category: "Database" },
  { name: "MySQL", icon: "SiMysql", color: "#00758f", category: "Database" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791", category: "Database" },
  { name: "Firebase", icon: "SiFirebase", color: "#ffca28", category: "Database" },
  { name: "Prisma ORM", icon: "SiPrisma", color: "#ffffff", category: "Database" },
  { name: "Git", icon: "FaGitAlt", color: "#f14e32", category: "DevOps" },
  { name: "GitHub", icon: "FaGithub", color: "#ffffff", category: "DevOps" },
  { name: "Docker", icon: "FaDocker", color: "#2496ed", category: "DevOps" },
  { name: "Kubernetes", icon: "SiKubernetes", color: "#326ce5", category: "DevOps" },
  { name: "Nginx", icon: "SiNginx", color: "#009639", category: "DevOps" },
  { name: "AWS", icon: "FaAws", color: "#ff9900", category: "DevOps" },
  { name: "Linux", icon: "FaLinux", color: "#fdd835", category: "DevOps" },
  { name: "Jest", icon: "SiJest", color: "#c21325", category: "Testing" },
  { name: "Testing Library", icon: "SiTestinglibrary", color: "#e33332", category: "Testing" },
  { name: "Postman", icon: "SiPostman", color: "#ef5b25", category: "Tools" },
  { name: "GraphQL", icon: "SiGraphql", color: "#e535ab", category: "Tools" },
  { name: "Jira", icon: "FaJira", color: "#0052cc", category: "Tools" },
  { name: "Figma", icon: "FaFigma", color: "#f24e1e", category: "Tools" },
];

export const services = [
  {
    title: "Full-Stack Web Development",
    miniTitle: "Enterprise Web Platforms",
    description: "",
    perks: [
      "Scalable web platforms using Next.js, NestJS, and the MERN stack.",
      "Enterprise-grade SaaS, admin dashboards, and real-time data tools.",
      "Optimized for SEO, performance, and high-availability deployment.",
    ],
  },
  {
    title: "Cross-Platform Mobile Apps",
    miniTitle: "Mobile-First Experience",
    description: "",
    perks: [
      "React Native + Expo apps for logistics, delivery, and booking platforms.",
      "Native APIs, biometric auth, and push notifications integrated.",
      "Clean, responsive UI with NativeWind and smooth animations.",
    ],
  },
  {
    title: "Intelligent Business Systems",
    miniTitle: "AI, Data & Workflow Automation",
    description: "",
    perks: [
      "Custom GPT-powered assistants for customer support and knowledge bases.",
      "Automations for content generation, CRM, and data synchronization.",
      "Integration with Zapier, n8n, and cloud APIs to eliminate manual tasks.",
    ],
  },
  {
    title: "DevOps & Cloud Engineering",
    miniTitle: "Cloud & Infrastructure",
    description: "",
    perks: [
      "End-to-end CI/CD pipelines with Docker, GitHub Actions, and Kubernetes.",
      "Managed deployments on AWS, Vercel, or Render with zero downtime.",
      "Infrastructure monitoring, logging, and scaling strategy design.",
    ],
  },
];

export const settings = {
  email: "louafisalem79@gmail.com",
  socials: {
    github: "https://github.com/SalemDevLouy",
    linkedin: "https://www.linkedin.com/in/salem-louafi-off",
    whatsapp: "",
    telegram: "",
    instagram: "",
    facebook: "",
    email: "mailto:louafisalem79@gmail.com",
    cv: "https://drive.google.com/file/d/1Cw_3fxu-OWDIpnoR-GhAetzDd3CSsXCS/view?usp=drive_link",
  },
};