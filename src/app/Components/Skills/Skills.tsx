"use client"
import { Grid, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {gsap } from 'gsap';
import Image from 'next/image'


const skills = [
    { name: 'HTML', img: '/img/tech/HTML5.png' },
    { name: 'React', img: '/img/tech/React.png' },
    { name: 'Scss', img: '/img/tech/Sass.png' },
    { name: 'Tailwind', img: '/img/tech/Tailwind.png' },
    { name: 'Next.js', img: '/img/tech/Next.js.png' },
    { name: 'MongoDB', img: '/img/tech/MongoDB.png' },
    { name: 'JavaScript', img: '/img/tech/Js.png' },
    { name: 'Typescript', img: '/img/tech/Ts.png' },
    { name: 'Express.js', img: '/img/tech/Express.png' },
    { name: 'MySQL', img: '/img/tech/MySQL.png' },
    { name: 'Node.js', img: '/img/tech/Node.js.png' },
    { name: 'Jira', img: '/img/tech/Jira.png' },
    { name: 'Git', img: '/img/tech/Git.png' },
    { name: 'Github', img: '/img/tech/GitHub.png' },

  ];
const Portfolio = () => {



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
    <Grid container id='Skills' className='flex  auto' sx={{
        zIndex:'10',
        // minHeight:'100vh',
        backgroundImage:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 43.55), #000 35%)',
         background : {xs:
          'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 45%)',
xl:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 35%)',


        },

        pb:13,
        pt:12,
        px:1,
        
        }}>
            <Box 
            className='auto col w100 flex center'
            sx={{
              // width:'100%',
                // minWidth:{xs:'80vw'}, 
                py:4}}>
            <Typography className='white text-center auto skills-title op0 y20' sx={{pb:1,fontWeight:700,
              fontSize:{xs:'3em',sm:'3em',md:'4em'}}}>
                My Technical Skills

</Typography>
<Typography
className='white text-center w100 skills-subtitle op0 y20'
sx={{fontWeight:200,fontSize:{xs:'.9em',sm:'.85em',md:'1em'}}}>

My Expertise and technical abilities that I have acquired over the years 
          </Typography>
            </Box>


        <Box sx={{
            flex:1,
            maxWidth:{sm:'95%',md:'95%',lg:'lg'}}}
             className='white w100 auto center w100 justify-center h100 flex col'>
          </Box>


            <Box sx={{maxWidth:'md'}} className='flex row gap2 auto wrap center'>
                {skills.map(i=>{
                    return <Box
                    key={i?.name}
                    className='flex row tech-item skill-item op0 y20  ' sx={{
                      border: '1px solid #ffffff21 ',
                      background: '#0c102178',
                      // backgroundColor: '#0c1021 !Important',
                      gap:1}}>
                        <Box sx={{width:{xs:'20px'}}}>
                            <Image src={i.img} alt="" className="img contain"  width={20} height={20}/>
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{color:'white'}}>
                        {i?.name}
                            </Typography>
                        </Box>
                    </Box>
                })}
            </Box>
        </Grid>
  )
}

export default Portfolio