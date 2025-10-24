"use client"
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Btn2 from '../Btn/Btn2'
import { gsap } from 'gsap'
import Image from 'next/image'
import ReviewSection from '../ReviewsDEST/ReviewSection'
export const reviewData = [
  {
    title:
      'The platform completely streamlined our workflow. The performance and UI responsiveness exceeded expectations.',
  },
  {
    title:
      'Excellent experience overall — the integration process was straightforward and well-documented.',
  },
  {
    title:
      'The customer support team was incredibly efficient in resolving deployment-related issues.',
  },
  // {
  //   title:
  //     'I appreciated the intuitive dashboard and clean design; onboarding new users was effortless.',
  // },
  // {
  //   title:
  //     'Reliability has been outstanding — we have experienced zero downtime over several months of use.',
  // },
  // {
  //   title:
  //     'The code quality and modular structure made customization remarkably simple.',
  // },
  // {
  //   title:
  //     'A robust, production-ready solution with consistent performance across all supported devices.',
  // },
  // {
  //   title:
  //     'Security implementation follows best practices, offering peace of mind for enterprise usage.',
  // },
  // {
  //   title:
  //     'The mobile version performs smoothly, maintaining parity with desktop functionality.',
  // },
  // {
  //   title:
  //     'Frequent updates demonstrate an ongoing commitment to product improvement and user satisfaction.',
  // },
];

const Hero = () => {
  useEffect(() => {
    gsap.to('.hero', { y: 0, duration: .5, ease: "none", delay: 0.25 })
    gsap.to('.hero', { opacity: 1, delay: .3, duration: 1, ease: "none" })

    document.body.classList.remove('no-scroll')
  }, [])

  return (
    <Container
      className="center hero items-center flex col align-center"
      sx={{
        position: `sticky`,
        top: 0,
        py: 6,
        minHeight: '100vh',
      }}
    >
      <ReviewSection data={reviewData} />
      {/* Main Heading */}
      <Typography
        sx={{
          maxWidth: '900px',
          pt: { xs: 6, sm: 6, md: 6 },
          fontSize: { xs: '2em', sm: '2.5em', md: '3em', lg: '3.3em' },
          fontWeight: '800',
          lineHeight: 1.2,
        }}
        component="h1"
        className="white center auto text-center"
      >
        Hi, I&apos;m <span style={{ color: '#6200ffff' }}>Salem </span> 
        <br />
        <h2 className='text-secondary font-semibold' style={{ fontWeight: '300', fontSize: '0.6em', marginTop: '0.2em' }}>
          Software Engineer Student & Web Developer
        </h2>
        
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          maxWidth: '700px',
          py: 2,
          // fontSize: { xs: '.95em', sm: '1em', md: '1.1em', lg: '1.2em' },
          fontWeight: '200',
        }}
        component="p"
        className="white center auto text-center text-sm"
      >
        {`I build modern software solutions — from SaaS platforms and 
        Desktop systems to mobile apps and AI integrations. My focus is on creating 
        scalable, user-friendly, and high-performance applications that help 
        businesses succeed.`}
      </Typography>

      {/* CTA Button */}
      <Box sx={{ pt: 4, gap: 2 }} className="flex w100 center items-center justify-center auto">
        <Btn2
          onClick={(e: any) => {
            e.preventDefault()
            gsap.to(window, { duration: 1.5, scrollTo: "#portfolio" })
          }}
          className="flex gap gap2 bg3"
          styles={{ background: 'black', fontWeight: '300' }}
        >
          <>
            {`View My Work`}
            <Image
              src="/img/arrow-right.png"
              style={{
                padding: 1,
                filter: `invert(1)`,
                width: '20px',
                borderRadius: '50%',
              }}
              alt="arrow icon"
              className="img"
              width={20}
              height={20}
            />
          </>
        </Btn2>
      </Box>
    </Container>
  )
}

export default Hero
