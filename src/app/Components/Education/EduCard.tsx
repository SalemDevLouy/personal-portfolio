'use client'
import { Grid, Box, Typography } from '@mui/material'
  import React,{useState} from 'react'
type EducationStep = {
    id: number,
    year: string,
    title: string,
    institution: string,
    description: string,
    type: string,
    status: string
}

export default function EduCard({step, index}: {step: EducationStep, index: number}) {
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
    <Box key={step.id} className='edu-card op0 y20' sx={{
            position: 'relative',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            left: '10px',
            flexDirection: {xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse'}
          }}>


            {/* Card Content with PricingCard-like hover effects */}
            <Box sx={{
              border: '1px solid #ffffff21',
              position: 'relative',
              overflow: 'hidden',
              background: '#0c102178',
              borderRadius: '12px',
              flex: 1,
              maxWidth: {xs: 'calc(100% - 10px)', md: '450px' , lg: '550px'},
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                [index % 2 === 0 ? 'left' : 'right']: {xs: '-8px', md: '-8px'},
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                [index % 2 === 0 ? 'borderRight' : 'borderLeft']: '8px solid #0c1021',
                display: {xs: 'none', md: 'block'}
              }
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
              {/* Mouse follow effect - same as PricingCard */}
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
              
              <Box sx={{ position: 'relative', zIndex: 2, p: 3 }}>
                
                {/* Year Badge */}
                <Box sx={{
                  position: 'absolute',
                  top: '2px',
                  right: '16px',
                  background: step.type === 'university' 
                    ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                    : step.type === 'certificate' 
                    ? 'linear-gradient(135deg, #f093fb, #f5576c)' 
                    : step.type === 'degree'
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'linear-gradient(135deg, #4facfe, #00f2fe)',
                  color: 'white',
                  px: 2,
                  py: 0.5,
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  {step.year}
                </Box>

                {/* Step Type Mini Title */}
                <Typography sx={{
                  pointerEvents: 'none',
                  fontWeight: 500,
                  fontSize: '0.8em',
                  color: step.type === 'university' 
                    ? '#667eea' 
                    : step.type === 'certificate' 
                    ? '#f093fb' 
                    : step.type === 'degree'
                    ? '#667eea'
                    : '#4facfe',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 1,
                  mt: 1
                }} className="clr2">
                  {step.type === 'degree' ? 'graduation' : step.type}
                </Typography>

                {/* Title */}
                <Typography className="white" sx={{
                  pointerEvents: 'none',
                  fontSize: {xs: '1.1em', md: '1.3em'},
                  fontWeight: 700,
                  mb: 1
                }}>
                  {step.title}
                </Typography>

                {/* Institution */}
                <Typography className="gray2" sx={{
                  pointerEvents: 'none',
                  fontSize: {xs: '0.85em', md: '0.9em'},
                  fontWeight: 300,
                  mb: 2,
                  color: '#00ff88'
                }}>
                  {step.institution}
                </Typography>

                {/* Description */}
                <Typography className="gray2" sx={{
                  pointerEvents: 'none',
                  maxWidth: '100%',
                  fontSize: '0.8em',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  mb: 2
                }}>
                  {step.description}
                </Typography>

                {/* Status Indicator */}
                <Box sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Box sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: step.status === 'completed' 
                      ? '#00ff88' 
                      : step.status === 'in-progress' 
                      ? '#ffd700' 
                      : '#666'
                  }} />
                  <Typography sx={{
                    pointerEvents: 'none',
                    color: step.status === 'completed' 
                      ? '#00ff88' 
                      : step.status === 'in-progress' 
                      ? '#ffd700' 
                      : '#666',
                    fontSize: '0.8em',
                    fontWeight: 500,
                    textTransform: 'capitalize'
                  }}>
                    {step.status === 'in-progress' ? 'Currently Ongoing' : 'Completed Successfully'}
                  </Typography>
                </Box>
              </Box>
            </Box>
        </Box>
  )
}
