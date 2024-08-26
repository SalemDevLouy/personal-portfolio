"use client"
import { Box,Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {gsap} from 'gsap';

const FullscreenCover = () => {
    useEffect(() => {
      
      gsap.to('.fullscreen-cover', { opacity: 0, duration: 0.15, delay: 0.015, onComplete: () => {
        gsap.set('.fullscreen-cover', { display: 'none', delay:.35 });
        // setAnimating(false);
      }});
        gsap.to('.main-logo', {
          scale: 1.2,
          repeat: -1,
          
          yoyo: true,
          duration: 1,
          ease: "ease"
        });
    document.body.classList.remove('no-scroll'); 

    // document.body.classList.add('no-scroll');

      }, []);


      
  return (
    
    <Box
    sx={{top:0,right:0,width:'100vw',
    zIndex:124124124124, 
    backgroundImage:'radial-gradient(circle at 50% 0%, rgba(17, 24, 65, 43.55), #000 100%)',
    height:'100vh'}}
    className="fullscreen-cover  absolute flex items-center"
    >

        <Box sx={{width:'150px',height:'150px'}} className="auto main-logo  flex center items-center">
        <Typography sx={{minWidth:'600px',
        py:2,
        fontSize:{xs:'1.5em',sm:'1.5em',md:'2em',lg:'3em'},fontWeight:'800'}} 
        component='h2'
        className='white center auto text-center'>
          
          {
            `Louafi Salem Portfolio's`
          }
        </Typography>
        </Box>
    </Box>
  )
}

export default FullscreenCover