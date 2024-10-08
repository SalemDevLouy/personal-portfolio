"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Btn from '../Btn/Btn';
import {gsap } from 'gsap';
import Image from 'next/image'

export default function Card({sx, id ,className, miniTitle, title, text, perks, href}:any) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box
    className={`${id} ${className}  y20 op0 y10`}
      sx={{
        border: '1px solid #ffffff21',
        // backgroundColor: 'rgb(12, 16, 33)',
        position: 'relative',
        overflow: 'hidden',
        background: '#0c102178',
        borderRadius: '4px',
        opacity:0,
        ...sx,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          position: 'absolute',
          pointerEvents: 'none',
          transition: 'transform 0.1s ease, opacity 0.5s ease',
          background: 'radial-gradient(circle, rgba(221,221,221,0.4) 0%, rgba(221,221,221,0.1) 50%, rgba(221,221,221,0) 70%)',
          transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
          opacity: isHovered ? 0.3 : 0,
          zIndex: 1,
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2, p: 2 }}>
        <Typography sx={{
          pointerEvents: 'none',
            fontWeight: 500 }} className="clr2">
          {miniTitle}
        </Typography>
        <Typography className="white" sx={{
          pointerEvents: 'none',
            
            fontSize: {xs:'2em',sm:'2.4em'}, fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography className="gray2" sx={{
          pointerEvents: 'none',
            maxWidth:'700px',
            fontSize: '.8em', fontWeight: 300 }}>
              {text}
        </Typography>
        <Box sx={{ mt: 3 }}>
          {perks && perks.map((perk : {optional: boolean, text: string } | string, index : number) => (
            <Box key={index} sx={{ gap: 2, my: 1.5 }} className="flex row items-start">
             {typeof perk !== 'string' && perk?.optional === true ? <Box sx={{ width: '20px', height: '20px' }} className="">
                <Image src="/img/check.png" alt="" className="img invert" width={20} height={20}/>
              </Box>
            :  <Box sx={{ minWidth: '20px', height: '20px' }} className="">
            <Image src="/img/check.png" alt="" 
            className="img contain" width={20} height={20} />
          </Box>
            }
              <Typography sx={{ 
          pointerEvents: 'none',
          maxWidth:'250px',
                fontSize: '.8em' }}>
              {
              typeof perk !== 'string' && perk?.optional === true ? 
              perk.text :
              `${perk}`
            }
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className="flex end" sx={{ justifyContent: 'end', mt: 4, alignItems: 'flex-end' }}>
         
         
          <Btn
                onClick={(e : any)=>{
                  e.preventDefault();
                  gsap.to(window, {duration:1, scrollTo: "#Contact"});
          
                }}
          className="pointer cursor" sx={{
            border:'1px solid #ffffff21',
            ':hover':{border:'1px solid #ffffff21 !Important'},
            gap: 1 }}>
            <Typography sx={{
                
                fontSize: '.7em' }}>
              Get Started
            </Typography>
            <Box sx={{ width: '20px', height: '20px' }} className="invert">
              <Image src="/img/right-arrow.png" alt="" className="img" width={20} height={20}/>
            </Box>
          </Btn>
       
       
        </Box>
      </Box>
    </Box>
  );
}