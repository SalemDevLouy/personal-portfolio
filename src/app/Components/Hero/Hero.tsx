"use client"
import { Box, Container, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Btn2 from '../Btn/Btn2'
import {gsap} from 'gsap';
import Image from 'next/image'


const Hero = () => {

  useEffect(() => {
      
    gsap.to('.hero', {  y: 0, duration: .5, 
        ease: "none",
      delay: 0.25});

    gsap.to('.hero', { opacity: 1, delay:.3, duration: 1, 
      ease: "none",
    });
      
  document.body.classList.remove('no-scroll'); 

    }, []);
  return (
    <Container className='center hero items-center flex col align-center ' sx={{
      position: `sticky`,
      top: 0,
      py:6,minHeight:'100vh'}}>
        

        <Typography sx={{
        maxWidth:'800px',
        pt:{xs:6,sm:6,md:6},
        fontSize:{xs:'2.6em',sm:'3em',md:'3em',lg:'3.5em'},fontWeight:'800'}} 
        component='h1'
        className='white  center auto text-center'>
        Hello everyone I`&apos;m Louafi Salem
        </Typography>
        <Typography sx={{maxWidth:'650px',
        py:2,
        fontSize:{xs:'.95em',sm:'1em',md:'1em',lg:'1.15em'},fontWeight:'100'}} 
        component='p'
        className='white center auto text-center'>
          
          {
            `Hello friend! My name is Louafi Salem, and I build incredibly powerful Web applications.`
          }
        </Typography>

        <Box sx={{
          pt:4,gap:2}} className='flex  w100 center items-center justify-center auto'>

        
        <Btn2
        onClick={(e : any)=>{
          e.preventDefault();
          gsap.to(window, {duration:1.5, scrollTo: "#portfolio"});

        }}
        className='flex gap gap2 bg3'
        
        styles={{background:'black',fontWeight:'300'}}>
        <>
        {`View Work `}
       

        <Image src="/img/arrow-right.png" style={{
          padding:1,
          filter:`invert(1)`,
          width:'20px',
          // background:'white',
          borderRadius:'50%',
        
      }} alt="" className="img"  width={20} height={20}/>
        </>

        </Btn2>
          
        </Box>
    </Container>
  )
}

export default Hero