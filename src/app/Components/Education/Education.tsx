"use client"
import { Grid, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import EduSwiper from './EduSwiper'
import Btn3 from '../Btn/Btn3'
import {gsap } from 'gsap';
import Image from 'next/image'


const Portfolio = () => {

  const animateTestimonials = () => {
   
  
    gsap.to('.title-proj1', {
        y: 0,
      opacity: 1,
      duration: .35,
      scrollTrigger: {
        trigger: ".title-proj1",
        start: "top 80%",
      }
    
    });
  
    gsap.to('.title-proj2', {
        y: 0,
      opacity: 1,
      duration: .25,
      delay:.15,
      scrollTrigger: {
        trigger: ".title-proj1",
        start: "top 80%",
      }
    });
  
    gsap.to('.project-item', {
        y: 0,
      opacity: 1,
      duration: .5,
      stagger: 0.2,
      delay:.25,

      scrollTrigger: {
        trigger: ".project-item",
        start: "top 80%",
      }
    });
    gsap.to('.swiper-button-next', {
      y: 0,
    opacity: 1,
    duration: .5,
    stagger: 0.2,
    delay:.45,

    scrollTrigger: {
      trigger: ".title-proj1",
      start: "top 80%",
    }
  });
  gsap.to('.swiper-button-prev', {
    y: 0,
  opacity: 1,
  duration: .5,
  stagger: 0.2,
  delay:.45,

  scrollTrigger: {
    trigger: ".title-proj1",
    start: "top 80%",
  }
});

gsap.to('.get-urs', {
  y: 0,
opacity: 1,
duration: .5,
stagger: 0.2,
delay:.45,

scrollTrigger: {
  trigger: ".get-urs",
  start: "top 100%",
}
});

  
  };
  

  useEffect(() => {
  animateTestimonials();
   
  }, [])





  return (
    <Grid id='portfolio' container className='flex  auto' sx={{
        zIndex:'10',
        // minHeight:'100vh',
        pb:4,
        pt:6,
        px:1,
        background:'black'
        
        }}>
            <Box 
            className='auto col flex center'
            sx={{
              width:'100%',
                py:4}}>
            <Typography className='white text-center auto title-proj1 op0 y20' sx={{pb:1,fontWeight:700,
              fontSize:{xs:'3em',sm:'3em',md:'4em'}}}>

           Education
</Typography>
<Typography
className='white text-center w100 title-proj2 op0 y20'
sx={{fontWeight:200,fontSize:{xs:'.9em',sm:'.85em',md:'1em'}}}>

I obtained a professional bachelor&apos;s degree in web development and mobile applications from the University of Djelfa. I also have many certificates from online training courses.
          </Typography>
            </Box>
        <Box sx={{
            
            maxWidth:{sm:'95%',md:'95%',lg:'lg'}}}
             className='white auto center w100 justify-center h100 flex col'>
            <EduSwiper/>
          </Box>

          <Box sx={{
          pt:4,gap:2}} className='flex  w100 center items-center justify-center auto'>

        
        <Btn3 
      onClick={(e : any)=>{
        e.preventDefault();
        gsap.to(window, {duration:1, scrollTo: "#Contact"});

      }}
        className='flex gap gap2 get-urs op0 y20'
        
        styles={{background:'black',
        
        fontWeight:'300'}}>
        <>
        {`Get yours`}
       

        <Image src="https://cdn-icons-png.flaticon.com/128/2722/2722998.png" style={{
          padding:1,
          filter:`invert(1)`,
          width:'20px',
          borderRadius:'50%',
        
      }} alt="" className="img" width={20} height={20} />
        </>

        </Btn3>
       
        </Box>
        </Grid>
  )
}

export default Portfolio