"use client";
import { Grid, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import {
  FaHtml5,
  FaReact,
  FaSass,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaJira,
  FaDocker,
  FaAws,
  FaPython,
  FaFigma,
  FaJava,
  FaLinux,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiGraphql,
  SiRedux,
  SiVite,
  SiCplusplus,
  SiJest,
  SiTestinglibrary,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiNginx,
  // SiVisualstudiocode,
  SiPostman,
} from "react-icons/si";

const skills = [
  // Frontend
  { name: "HTML", icon: <FaHtml5 color="#e34c26" size={24} /> },
  { name: "CSS / SCSS", icon: <FaSass color="#cc6699" size={24} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#38bdf8" size={24} /> },
  { name: "React", icon: <FaReact color="#61dbfb" size={24} /> },
  { name: "Next.js", icon: <SiNextdotjs color="white" size={24} /> },
  { name: "Redux", icon: <SiRedux color="#764abc" size={24} /> },
  { name: "Vite", icon: <SiVite color="#646cff" size={24} /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178c6" size={24} /> },
  { name: "JavaScript", icon: <SiJavascript color="#f7df1e" size={24} /> },

  // Backend
  { name: "Node.js", icon: <FaNodeJs color="#3c873a" size={24} /> },
  { name: "Express.js", icon: <SiExpress color="white" size={24} /> },
  { name: "Python", icon: <FaPython color="#3776ab" size={24} /> },
  { name: "Java", icon: <FaJava color="#f89820" size={24} /> },
  { name: "C++", icon: <SiCplusplus color="#00599c" size={24} /> },

  // Databases
  { name: "MongoDB", icon: <SiMongodb color="#4db33d" size={24} /> },
  { name: "MySQL", icon: <SiMysql color="#00758f" size={24} /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#336791" size={24} /> },
  { name: "Firebase", icon: <SiFirebase color="#ffca28" size={24} /> },
  { name: "Prisma ORM", icon: <SiPrisma color="white" size={24} /> },

  // DevOps
  { name: "Git", icon: <FaGitAlt color="#f14e32" size={24} /> },
  { name: "GitHub", icon: <FaGithub color="white" size={24} /> },
  { name: "Docker", icon: <SiDocker color="#2496ed" size={24} /> },
  { name: "Kubernetes", icon: <SiKubernetes color="#326ce5" size={24} /> },
  { name: "Nginx", icon: <SiNginx color="#009639" size={24} /> },
  { name: "AWS", icon: <FaAws color="#ff9900" size={24} /> },
  { name: "Linux", icon: <FaLinux color="#fdd835" size={24} /> },

  // Testing
  { name: "Jest", icon: <SiJest color="#c21325" size={24} /> },
  {
    name: "Testing Library",
    icon: <SiTestinglibrary color="#e33332" size={24} />,
  },

  // Tools & Design
  { name: "Postman", icon: <SiPostman color="#ef5b25" size={24} /> },
  // { name: "VS Code", icon: <SiVisualstudiocode color="#007acc" size={24} /> },
  { name: "GraphQL", icon: <SiGraphql color="#e535ab" size={24} /> },
  { name: "Jira", icon: <FaJira color="#0052cc" size={24} /> },
  { name: "Figma", icon: <FaFigma color="#f24e1e" size={24} /> },
];

const Portfolio = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-subtitle",
        start: "top 80%",
      },
    });

    tl.to(".skills-title", { y: 0, opacity: 1, duration: 0.35 })
      .to(".skills-subtitle", {
        y: 0,
        opacity: 1,
        duration: 0.25,
        delay: 0.2,
      })
      .to(".skill-item", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
      });
  }, []);

  return (
    <Grid
      container
      id="Skills"
      className="flex auto"
      sx={{
        zIndex: 10,
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(17,24,65), #000 35%)",
        pb: 13,
        pt: 12,
        px: 1,
      }}
    >
      <Box className="auto col w100 flex center" sx={{ py: 4 }}>
        <Typography
          className="white text-center auto skills-title op0 y20"
          sx={{
            pb: 1,
            fontWeight: 700,
            fontSize: { xs: "3em", sm: "3em", md: "4em" },
          }}
        >
          My Technical Skills
        </Typography>

        <Typography
          className="white text-center w100 skills-subtitle op0 y20"
          sx={{
            fontWeight: 200,
            fontSize: { xs: ".9em", sm: ".85em", md: "1em" },
          }}
        >
          My expertise and technical abilities that I have acquired over the
          years
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        {skills.map((skill) => (
          <Box
            key={skill.name}
            className="skill-item op0 y20"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1.2,
              border: "1px solid #ffffff21",
              borderRadius: "50px",
              background: "#0c102178",
              minWidth: 120,
              justifyContent: "center",
              transition: "transform .3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "#6b9fff",
              },
            }}
          >
            {skill.icon}
            <Typography sx={{ color: "white", fontSize: ".9em" }}>
              {skill.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default Portfolio;
