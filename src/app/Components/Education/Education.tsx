"use client"
import { Grid, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {gsap } from 'gsap';
import EduCard from './EduCard';
import { useSectionData } from '@/hooks/useSectionData';
import { fallbackEducation } from '@/lib/data/fallback';
import type { Education } from '@/types';

const Portfolio = () => {

  const { data: steps, loading } = useSectionData<Education>('education', fallbackEducation);

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
    if (loading) return;
    animateEducation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, steps]);

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
        {steps.map((step, index) => (
          <EduCard key={step._id ?? `${step.year}-${step.title}-${step.institution}`} step={step} index={index}  />
        ))}
      </Box>


    </Grid>
  )
}

export default Portfolio
