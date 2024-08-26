"use client"
import { Grid, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Btn2 from '../Btn/Btn2'
import Btn3 from '../Btn/Btn3'
import PricingCard from './PricingCard'
import {gsap} from 'gsap';
import Image from 'next/image'



const Portfolio = () => {


  const animatePricing = () => {
    const testimonialsTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".pricing-title",
        start: "top 80%",
      }
    });
  
    testimonialsTL.to('.pricing-title', {
        y: 0,
      opacity: 1,
      duration: .35,
    
    });
    testimonialsTL.to('.pricing-subtitle', {
      y: 0,
    opacity: 1,
    delay:.1,
    duration: .35,
  
  });
  
    gsap.to('.myitem', {
        y: 0,
      opacity: 1,
      duration: .5,
      delay:.15,
      stagger:.15,
      scrollTrigger:{
        trigger:'.myitem',
        start: "top 50%",

      }
    });

  
    // testimonialsTL.to('.testimonial-item', {
    //     y: 0,
    //   opacity: 1,
    //   duration: .5,
    //   stagger: 0.2,
    
    // });
  };
  
  useEffect(() => {
  animatePricing();
   
  }, [])


  return (
    <Grid id='Services' container className='flex  auto' sx={{
        zIndex:'10',
        // minHeight:'100vh',
        py:12,
        px:1,
        background:'black'
        
        }}>
            <Box 
            className='auto col flex center'
            sx={{
              width:'100%',
                // minWidth:{xs:'80vw'}, 
                py:4}}>
            <Typography className='white text-center auto pricing-title op0 y10' sx={{pb:1,fontWeight:700,
              fontSize:{xs:'3em',sm:'3em',md:'4em'}}}>
{/* My Creative Software Solution Suite */}
              Services
</Typography>
<Typography
className='white text-center w100 op0 y10 pricing-subtitle'
sx={{fontWeight:200,fontSize:{xs:'.9em',sm:'.85em',md:'1em'}}}>


{`Discover the best services I offer, designed to ensure the success of your project.`}

          </Typography>
            </Box>

        <Box sx={{
            
            maxWidth:{sm:'100%',md:'95%',lg:'lg'},gap:{xs:1.5,sm:1}}}
             className='white auto   w100  justify-between h100 flex row wrap'>
            
            <PricingCard 

            className={'myitem'}
            miniTitle={'Custom React Application Development'}
            title={'Custom React apps'}
            perks={[
              `Develop sophisticated, scalable React.js applications tailored to your 
              specific requirements. We focus on creating seamless user experiences
               with modern React features, ensuring your application is both functional 
               and visually appealing.
`
            ]}
            sx={{width:{xs:'100%',md:'48%'}}}/>


            <PricingCard
            id={2}

            className={'myitem'}

             miniTitle={'Responsive UI/UX Design Integration'}
             title={'UI/UX Design'}
             perks={[
              `Integrate responsive UI/UX designs into your 
              React and Next.js applications, ensuring a seamless
               experience across all devices and screen sizes. 
               Transform design mockups into interactive,
                user-friendly interfaces with attention to detail and usability.`
            ]}
            
            sx={{mt:{xs:1.5,sm:2,md:0},width:{xs:'100%',md:'48%'}}}/>
        
          </Box>

          <Box sx={{
          pt:4,gap:2}} className='flex  w100 center items-center justify-center auto'>

        
        <Btn3 
         onClick={(e : any)=>{
          e.preventDefault();
          gsap.to(window, {duration:1, scrollTo: "#Contact"});
  
        }}
        className='flex gap gap2 '
        
        styles={{background:'black',
        
        fontWeight:'300'}}>
        <>
        {`Get quote`}
       

        <Image src="https://cdn-icons-png.flaticon.com/128/2722/2722998.png" style={{
          padding:1,
          filter:`invert(1)`,
          width:'20px',
          // background:'white',
          borderRadius:'50%',
        
      }} alt="" className="img"  width={20} height={20}/>
        </>

        </Btn3>
       
        </Box>
        </Grid>
  )
}

export default Portfolio