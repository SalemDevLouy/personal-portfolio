"use client"

import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Hero from './Components/Hero/Hero'
import Portfolio from './Components/Portfolio/Portfolio'
import Education from './Components/Education/Education'
import Skills from './Components/Skills/Skills'
import Services from './Components/Services/Services'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image'
import ReviewSection from './Components/ReviewsDEST/ReviewSection'
import Testimonials from './Components/Testimonials/Testimonials'
import About from './Components/About/About'



const Index = () => {
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
  let [gradientStop,setGradientStop] = useState(63)
  let handleMouseMove = (event : any) => {
    let gradientStop = 70 + (event.clientX + event.clientY) / (window.innerWidth + window.innerHeight) * 30;
    setGradientStop(Number(gradientStop.toFixed(2)))
  }


  return (
    <>
    
    <Box
    onMouseMove={handleMouseMove}
    className='trans1 col flex ' sx={{

      backgroundImage:{xs:'radial-gradient(circle at 50% 21%, rgba(17, 24, 65, 43.55), #000 30%)',
      sm:'radial-gradient(circle at 50% -15%, rgba(17, 24, 65, 43.55), #000 65%)',
      md:'radial-gradient(circle at 50% -23%, rgba(17, 24, 65, 43.55), #000 65%)'},
      
    }}>
          <Hero/>

        {/* <Divider sx={{border:'1px solid #ffffff0a'}} className='w100 white'></Divider> */}


    <About />
    <Box sx={{
          backgroundColor: 'black',
           zIndex:'10',
          pt:8,
          pb:4,
          }}>
        <div className="custom-br">
      <div className="left-edge"></div>
      <div className="right-edge"></div>
    </div>
        </Box>



    <Education/>
        <Box sx={{
          backgroundColor: 'black',
           zIndex:'10',
          pt:6}}>
        <div className="custom-br">
      <div className="left-edge"></div>
      <div className="right-edge"></div>
    </div>
        </Box>
        
    <Portfolio/>
        <Box sx={{
          backgroundColor: 'black',
           zIndex:'10',
          pt:6}}>
        <div className="custom-br">
      <div className="left-edge"></div>
      <div className="right-edge"></div>
    </div>
        </Box>


          <Box sx={{
            background: `rgb(85,13,244), radial-gradient(circle, rgba(85,13,244,1) 0%, rgba(15,2,45,1) 0%, rgba(24,8,57,1) 15%, rgba(25,13,52,1) 33%, rgba(0,0,0,1) 100%)`,
          
            zIndex:12,
          }}>

        <Skills/>

      
          </Box>



          
        </Box>
       
 <Box 
        className='auto flex center justify-center'
        sx={{
          backgroundColor: 'black',
           zIndex:'10',
          pt:0,
          margin:0
          }}>
        <div className="custom-br">
      <div className="left-edge"></div>
      <div className="right-edge"></div>
    </div>
        </Box>
          <Services/>
          <Box 
        className='auto flex center justify-center'
        sx={{
          backgroundColor: 'black',
           zIndex:'10',
          pt:0,
          margin:0
          }}>
        <div className="custom-br">
      <div className="left-edge"></div>
      <div className="right-edge"></div>
    </div>
        </Box>
        <Testimonials/>
          <Box 
        className='auto flex center justify-center'
        sx={{
          backgroundColor: 'black',
           zIndex:'10',
          pt:0,
          margin:0
          }}>
        <div className="custom-br">
      <div className="left-edge"></div>
      <div className="right-edge"></div>
    </div>
        </Box>
         
        
        

        <Contact/>


        <Box sx={{
          backgroundColor: 'black',
           zIndex:'10',
          pt:4,
          pb:2,
          }}>
        <div className="custom-br">
      <div className="left-edge"></div>
      <div className="right-edge"></div>
    </div>
        </Box>

        <Grid container className='flex  center auto' sx={{
        // zIndex:'10',
        px:2,
        backgroundImage:'radial-gradient(circle at 50% 00%, rgba(17, 24, 65, 43.55), #000 0%)',
        background:'radial-gradient(circle at 50% 0%, rgba(17, 24, 65, 33.55), #000 0%)',
        // background:'#090d22 !Important',
      // backgroundImage:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 43.55), #000 90%)',
        
        }}>


        <Footer/>
        </Grid>

          </>


  )
}

export default Index