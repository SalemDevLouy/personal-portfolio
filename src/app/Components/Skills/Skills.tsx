"use client";
import { Grid, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { getSkillIcon } from "@/lib/data/skills-icons";
import { useSectionData } from "@/hooks/useSectionData";
import { fallbackSkills } from "@/lib/data/fallback";
import type { Skill } from "@/types";

const Portfolio = () => {
  const { data: skills, loading } = useSectionData<Skill>("skills", fallbackSkills);

  useEffect(() => {
    if (loading) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

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
            key={skill._id ?? skill.name}
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
            {getSkillIcon(skill.icon, skill.color)}
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
