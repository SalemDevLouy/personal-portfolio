"use client"
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Btn from '../Btn/Btn'
import Link from 'next/link'
import SMicons from '../SMicons/SMicons'
import { useRouter } from 'next/navigation'
import {gsap } from 'gsap';
import Image from 'next/image'


const Navbar = () => {
  const [isOpen,setOpen] = useState(false)
  console.log('isOpen: ', isOpen);
  const navRef = useRef(null);
  const [isAnimating, setAnimating] = useState(false);

  const openMenu = () => {
    setOpen(true);
    setAnimating(true);
    document.body.classList.add('no-scroll');
    // gsap.killTweensOf('.overflowed'); // Kill any running tweens
    gsap.set('.overflowed', { display: 'flex' }); // Set display to flex immediately
    gsap.to('.overflowed', { opacity: 1, duration: 0.15, delay: 0.015, onComplete: () => setAnimating(false) });
  };

  const closeMenu = () => {
    setAnimating(true);
    setOpen(false);
    document.body.classList.remove('no-scroll'); 
    // gsap.killTweensOf('.overflowed'); // Kill any running tweens
    gsap.to('.overflowed', { opacity: 0, duration: 0.15, delay: 0.015, onComplete: () => {
      gsap.set('.overflowed', { display: 'none', delay:.35 });
      setAnimating(false);
    }});
  };

  // useEffect(() => {
  //   if (isOpen) {
    
  //   } else {
    
  //   }
  // }, [isOpen]);

  useEffect(() => {
      
    gsap.to('.navbar', {y: 0 , x: '50%', duration: .5, 
    ease: "none",
    stagger: {
      each: 0.5,
      from: "center"
    },
    delay: 0.35, onComplete: () => {
      // gsap.set('.hero', { display: 'none', delay:.35 });
      // setAnimating(false);
    }});

    gsap.to('.navbar', { opacity: 1, y: 0 , x: '50%', duration: 1, 
    ease: "none",
   
    delay: 0.4
  });
    
  document.body.classList.remove('no-scroll'); 

  // document.body.classList.add('no-scroll');

    }, []);
    const router = useRouter()

    const ScrollToFn = () =>{
      gsap.to(window, {duration:2.5, scrollTo: "#Contact"});
      closeMenu();
    }
  return (
    <>
       <Box 
       ref={navRef}
       sx={{
  backdropFilter: 'blur(6px)',
      display:'none',
      opacity:0,
       }}
       className='overflowed  '>

        <Box onClick={()=>{closeMenu(); router.push('/#hero')}} sx={{ top: '16%'}} className='white cursor pointer nav-menu'>
          <Link className='decor-none white' href='/'>
          <Typography sx={{fontSize:'1.2em'}}>
           Home
          </Typography>
          </Link>
        </Box>


        <Box onClick={()=>{closeMenu(); 
   gsap.to(window, {duration:1.5, delay:.45, scrollTo: "#portfolio"});

        }} sx={{ top: '24%'}} className='white cursor pointer nav-menu'>
          <Link className='decor-none white' href='/'>
          <Typography sx={{fontSize:'1.2em'}}>
          Portfolio
          </Typography>
          </Link>
        </Box>

        <Box onClick={()=>{closeMenu(); 
   gsap.to(window, {duration:1.5, delay:.45, scrollTo: "#Skills"});

        }} sx={{ top: '32%'}} className='white cursor pointer nav-menu'>
          <Link className='decor-none white' href='/'>
          <Typography sx={{fontSize:'1.2em'}}>
          Skills
          </Typography>
          </Link>
        </Box>

        <Box onClick={()=>{closeMenu(); 
          gsap.to(window, {duration:1.5, delay:.45, scrollTo: "#Services"});

        }} sx={{ top: '40%'}} className='white cursor pointer nav-menu'>
          <Link className='decor-none white' href='/'>
          <Typography sx={{fontSize:'1.2em'}}>
          Services
          </Typography>
          </Link>
        </Box>

        <Box onClick={()=>{closeMenu(); 
          gsap.to(window, {duration:1.5, delay:.45, scrollTo: "#"});

        }} sx={{ top: '48%'}} className='white cursor pointer nav-menu'>
          <Link className='decor-none white' href='/'>
          <Typography sx={{fontSize:'1.2em'}}>
          Blog
          </Typography>
          </Link>
        </Box>

        <Box onClick={()=>{closeMenu(); 
   gsap.to(window, {duration:1.5, delay:.45, scrollTo: "#Contact"});

        }} sx={{ top: '56%'}} className='white cursor pointer nav-menu'>
          <Link className='decor-none white' href='/'>
          <Typography sx={{fontSize:'1.2em'}}>
          Contact
          </Typography>
          </Link>
        </Box>


        
        <Box sx={{ px:1,top: '64%'}} className='absolute'>

        <SMicons/>
        </Box>

</Box>

    <Container
    
    className={`flex navbar absolute center c50 between row justify-between items-center ${false ? 'bg' : ''}`} 
    sx={{
      
      maxWidth:{xs:'98%',sm:'97%',lg:'1150px'},
      zIndex:12467,
      py:2,
      // border:'1px solid white',
      border: isOpen ? '1px solid #ffffff21 ' : '1px solid transparent',
      backgroundColor: isOpen ? '#0c1021 !Important' :'transparent',
    mt:2,
    borderRadius:"900px"}}>
     
     
     <Box
          onClick={isOpen ? closeMenu : openMenu}
          className="cursor pointer"
          sx={{ width: '30px' }}
        >
          <Image
            src={isOpen ? "/img/close.png" : "/img/menu.png"}
            alt=""
            className="img invert"
            width={30}
            height={30}
          />
        </Box>
        
      
        

        <Box 
        onClick={()=>router.push('/')}
        className='cent cursor pointer' sx={{height:'50px'}}>
          {/* <h2 className='white center auto text-center'>Louafi Salem Portfolio's</h2> */}
          <Typography sx={{maxWidth:'650px',
        py:2,
        fontSize:{xs:'.95em',sm:'1em',md:'1em',lg:'1.15em'},fontWeight:'600'}} 
        component='h2'
        className='white center auto text-center'>
          
          {
            `Louafi Salem Portfolio's`
          }
        </Typography>
          
        </Box>
        <Box>

        <Btn 
          onClick={()=>
            ScrollToFn()}

        className="" sx={{
            ':hover':{color:'#550df4 !Important'},
            gap: 1, px:2 }}>

            <Typography sx={{
                display:{xs:'none',sm:'flex'},  
                fontSize: '.7em' }}>
              Hit me up
            </Typography>
            <Box

            
            sx={{ width: '20px', height: '20px' }} className="invert">
              <Image src="/img/direct.png" alt="" className="img" width={20} height={20} />
            </Box>
          </Btn>

        </Box>
    </Container>
  
    </>

  )
}

export default Navbar