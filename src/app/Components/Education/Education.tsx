"use client"
import { Grid, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Btn3 from '../Btn/Btn3'
import {gsap } from 'gsap';
import Image from 'next/image'
import EduCard from './EduCard';

// Education data
const educationSteps = [
  {
    id: 1,
    year: "2021",
    title: "Start of University Journey",
    institution: "University of Djelfa",
    description:
      "Began my academic path in computer science, studying programming fundamentals, mathematics, and core algorithms.",
    type: "university",
    status: "completed",
  },
  {
    id: 2,
    year: "2021-2022",
    title: "Web Development Foundations",
    institution: "University of Djelfa",
    description:
      "Built a strong foundation in web technologies, including HTML, CSS, JavaScript, and database management, while applying concepts in academic projects.",
    type: "university",
    status: "completed",
  },
  {
    id: 3,
    year: "2022-2024",
    title: "Bachelor’s Degree in Web Development",
    institution: "University of Djelfa",
    description:
      "Graduated with a Bachelor's degree in Web Development (Computer Science). Completed a final project focused on building modern web applications.",
    type: "degree",
    status: "completed",
  },
  {
    id: 4,
    year: "2024",
    title: "React & Next.js Specialization",
    institution: "Online Courses / Self-Learning",
    description:
      "Advanced training in React and Next.js, mastering scalable web app development, UI/UX integration, and modern frontend practices.",
    type: "certificate",
    status: "completed",
  },
  {
    id: 5,
    year: "2024-2025",
    title: "Master’s in Software Engineering",
    institution: "University of Constantine 2",
    description:
      "Started my Master's degree in Software Engineering, focusing on advanced topics including distributed systems, software architecture, and artificial intelligence.",
    type: "university",
    status: "in-progress",
  },
  {
    id: 6,
    year: "2025-Present",
    title: "Continuous Learning (AI, DevOps, Cloud)",
    institution: "Self-Learning & Personal Projects",
    description:
      "Expanding expertise in artificial intelligence, DevOps practices, and server/cloud administration. Actively developing SaaS platforms, POS systems, and mobile applications.",
    type: "ongoing",
    status: "in-progress",
  },
]



const Portfolio = () => {

  const animateEducation = () => {
    gsap.to('.title-edu1', {
      y: 0,
      opacity: 1,
      duration: .35,
      scrollTrigger: {
        trigger: ".title-edu1",
        start: "top 80%",
      }
    });
  
    gsap.to('.title-edu2', {
      y: 0,
      opacity: 1,
      duration: .25,
      delay:.15,
      scrollTrigger: {
        trigger: ".title-edu1",
        start: "top 80%",
      }
    });

    gsap.to('.education-path', {
      opacity: 1,
      duration: 1,
      delay: .3,
      scrollTrigger: {
        trigger: ".education-path",
        start: "top 80%",
      }
    });
  
    gsap.to('.edu-card', {
      y: 0,
      opacity: 1,
      duration: .5,
      stagger: 0.2,
      delay: .5,
      scrollTrigger: {
        trigger: ".education-path",
        start: "top 80%",
      }
    });

    gsap.to('.path-line', {
      scaleY: 1,
      duration: 2,
      delay: .5,
      scrollTrigger: {
        trigger: ".education-path",
        start: "top 80%",
      }
    });

    gsap.to('.get-urs', {
      y: 0,
      opacity: 1,
      duration: .5,
      delay: 1,
      scrollTrigger: {
        trigger: ".get-urs",
        start: "top 100%",
      }
    });
  };
  

  useEffect(() => {
    animateEducation();
  }, [])





  return (
    <Grid id='portfolio' container className='flex auto' sx={{
        zIndex:'10',
        pb:4,
        pt:6,
        px:1,
        backgroundImage:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 43.55), #000 35%)',
        background : {
          xs:
          'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 45%)',
        xl:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 35%)',
        },
        }}>
      <Box 
        className='auto col flex center'
        sx={{
          width:'100%',
          py:4
        }}>
        <Typography className='white text-center auto title-edu1 op0 y20' sx={{
          pb:1,
          fontWeight:700,
          fontSize:{xs:'3em',sm:'3em',md:'4em'}
        }}>
          Education
        </Typography>
        <Typography
          className='white text-center w100 title-edu2 op0 y20'
          sx={{fontWeight:200,fontSize:{xs:'.9em',sm:'.85em',md:'1em'}}}>
          My educational journey from university to continuous learning
        </Typography>
      </Box>

      {/* Education Path Container */}
      <Box className='education-path' sx={{
        width: '100%',
        maxWidth: 'lg',
        margin: '0 auto',
        position: 'relative',
        opacity: 0,
        px: {xs: 2, md: 4}
      }}>
        
        {/* Vertical Path Line */}
        <Box className='path-line' sx={{
          position: 'absolute',
          left: {xs: '20px', md: '50%'},
          top: 0,
          width: '1px',
          height: '100%',
          background: 'linear-gradient(to bottom, #5b02ffff, #003cffff)',
          borderRadius: '50px',
          transformOrigin: 'top',
          transform: 'scaleY(0)',
          zIndex: -1
        }} />

        {/* Education Steps */}
        {educationSteps.map((step, index) => (

          <EduCard key={step.id} step={step} index={index}  />
        ))}
      </Box>

      <Box sx={{
        pt:4,gap:2}} className='flex w100 center items-center justify-center auto'>
        <Btn3 
          onClick={(e : any)=>{
            e.preventDefault();
            gsap.to(window, {duration:1, scrollTo: "#Contact"});
          }}
          className='flex gap gap2 get-urs op0 y20'
          styles={{background:'black', fontWeight:'300'}}>
          <>
            {`Get yours`}
          </>
        </Btn3>
      </Box>
    </Grid>
  )
}

export default Portfolio