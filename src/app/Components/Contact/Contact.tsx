"use client"
import { Grid, Box, Typography, Rating, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import {gsap } from 'gsap';
import Image from 'next/image'




const Contact = () => {
  ;
  const contacts = [
    { name: 'Facebook', image: '/img/socielmedia/facebook.png' , link:'https://www.facebook.com/abdeldjouad.louafi/'},
    { name: 'Instagram', image: '/img/socielmedia/instagram.png' , link:'https://www.instagram.com/salem_louafi/'},
    { name: 'Whatsapp', image: '/img/socielmedia/whatsapp.png' , link:'https://wa.me/213673389128'},
    { name: 'Telegram', image: '/img/socielmedia/telegram.png' , link:'https://t.me/+213673389128'},
    { name: 'Linkedin', image: '/img/socielmedia/linkedin.png' , link:'https://www.linkedin.com/in/salem-louafi-off/'},
    

  ];

  const animateSkills = () => {
    const testimonialsTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-subtitle",
        start: "top 80%",
      }
    });
  
    testimonialsTL.to('.skills-title', {
        y: 0,
      opacity: 1,
      duration: .35,
    
    });
  
    testimonialsTL.to('.skills-subtitle', {
        y: 0,
      opacity: 1,
      duration: .25,
      delay:.15
    });
  
    testimonialsTL.to('.skill-item', {
        y: 0,
      opacity: 1,
      duration: .15,
      stagger: 0.2,
    
    });
  };
  
  useEffect(() => {
  animateSkills();
  }, [])
  
  return (
    <Grid 
    id='Contact'
    container className='flex   auto' sx={{
        // zIndex:'10',
        backgroundImage:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 43.55), #000 35%)',
         background : {xs:
          'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 45%)',
xl:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 35%)',


        },
        // background:'#090d22 !Important',
        pb:13,  
        pt:12,
        px:1,
      // backgroundImage:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 43.55), #000 90%)',
        
        }}>
            <Box 
            className='auto col flex center'
            sx={{
              width:'100%',
                // minWidth:{xs:'80vw'}, 
                py:4}}>
            <Typography className='white text-center auto' sx={{pb:1,fontWeight:700,
              fontSize:{xs:'3em',sm:'3em',md:'4em'}}}>
                {/* Got something to tell me? */}
                  Get in touch
</Typography>
<Typography
className='white text-center w100'
sx={{fontWeight:200,fontSize:{xs:'.9em',sm:'.85em',md:'1em'}}}>

              Send me a message, I&apos;ll be sure to reply!
          </Typography>
            </Box>
        <Box sx={{
            
            maxWidth:{xs:'95%',sm:'sm',lg:'sm'}}}
             className='white auto center w100 justify-center h100 flex col'>
          
  

<Box sx={{pt:4,gap:2}} className='flex  w100 center items-center justify-center auto'>
 {/*  */}
 <Box sx={{maxWidth:'md'}} className='flex row gap2 auto wrap center'>
                {contacts.map(i=>{
                    return <a href={i.link} key={i?.name} target='_blank'>
                      <Box
                    key={i?.name}
                    className='flex row tech-item skill-item op0 y20  ' sx={{
                      border: '1px solid #ffffff21 ',
                      background: '#0c102178',
                      // backgroundColor: '#0c1021 !Important',
                      gap:1}}>
                        <Box sx={{width:{xs:'20px'}}}>
                            <Image src={i.image} alt="" className="image contain" width={20} height={20}/>
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{color:'white'}}>
                        {i?.name}
                            </Typography>
                        </Box>
                    </Box></a>
                })}
            </Box>
 {/*  */}
        
      
       
        </Box>
       

          </Box>
           
        </Grid>
  )
}

export default Contact