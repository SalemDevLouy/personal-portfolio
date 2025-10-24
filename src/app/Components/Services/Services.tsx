"use client"
import { Grid, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Btn3 from '../Btn/Btn3'
import PricingCard from './PricingCard'
import { gsap } from 'gsap'
import Image from 'next/image'

const Services = () => {
  const animateServices = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-title",
        start: "top 80%",
      }
    })

    tl.to('.services-title', { y: 0, opacity: 1, duration: .4 })
      .to('.services-subtitle', { y: 0, opacity: 1, duration: .4, delay: .1 })

    gsap.to('.service-item', {
      y: 0,
      opacity: 1,
      duration: .5,
      delay: .15,
      stagger: .15,
      scrollTrigger: {
        trigger: '.service-item',
        start: "top 60%",
      }
    })
  }

  useEffect(() => {
    animateServices()
  }, [])

  return (
    <Grid
      id="Services"
      container
      sx={{
        zIndex: 10,
        py: 12,
        px: 2,
         backgroundImage:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 43.55), #000 35%)',
        background : {
          xs:
          'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 45%)',
        xl:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 35%)',
        },
      }}
      className="flex auto"
    >
      {/* Section Title */}
      <Box className="auto col flex center" sx={{ width: '100%', py: 4 }}>
        <Typography
          className="white text-center auto services-title op0 y10"
          sx={{
            pb: 1,
            fontWeight: 700,
            fontSize: { xs: '2.5em', sm: '3em', md: '4em' },
          }}
        >
          Services
        </Typography>
        <Typography
          className="white text-center w100 op0 y10 services-subtitle"
          sx={{ fontWeight: 200, fontSize: { xs: '.9em', sm: '.95em', md: '1.1em' } }}
        >
          {`End-to-end software solutions for businesses — from web to mobile to desktop.`}
        </Typography>
      </Box>

      {/* Service Cards */}
      <Box
  sx={{
    maxWidth: { sm: '100%', md: '95%', lg: 'lg' },
    gap: { xs: 1.5, sm: 2 },
  }}
  className="white auto w100 justify-between flex row wrap"
>
  <PricingCard
    className="service-item"
    miniTitle="Enterprise Web Platforms"
    title="Full-Stack Web Development"
    perks={[
      `Scalable web platforms using Next.js, NestJS, and the MERN stack.`,
      `Enterprise-grade SaaS, admin dashboards, and real-time data tools.`,
      `Optimized for SEO, performance, and high-availability deployment.`,
    ]}
    sx={{ width: { xs: '100%', md: '48%' } }}
  />

  {/* <PricingCard
    className="service-item"
    miniTitle="Cross-Platform Desktop Apps"
    title="Business Management Systems"
    perks={[
      `POS, ERP, and inventory management apps built with Electron + SQLite/Cloud sync.`,
      `Offline-first systems with secure backup & seamless updates.`,
      `Advanced analytics dashboards for sales, stock, and operations.`,
    ]}
    sx={{ mt: { xs: 1.5, sm: 2, md: 0 }, width: { xs: '100%', md: '48%' } }}
  /> */}

  <PricingCard
    className="service-item"
    miniTitle="Mobile-First Experience"
    title="Cross-Platform Mobile Apps"
    perks={[
      `React Native + Expo apps for logistics, delivery, and booking platforms.`,
      `Native APIs, biometric auth, and push notifications integrated.`,
      `Clean, responsive UI with NativeWind and smooth animations.`,
    ]}
    sx={{ mt: { xs: 1.5, sm: 2 }, width: { xs: '100%', md: '48%' } }}
  />

  <PricingCard
    className="service-item"
    miniTitle="AI, Data & Workflow Automation"
    title="Intelligent Business Systems"
    perks={[
      `Custom GPT-powered assistants for customer support and knowledge bases.`,
      `Automations for content generation, CRM, and data synchronization.`,
      `Integration with Zapier, n8n, and cloud APIs to eliminate manual tasks.`,
    ]}
    sx={{ mt: { xs: 1.5, sm: 2 }, width: { xs: '100%', md: '48%' } }}
  />

  <PricingCard
    className="service-item"
    miniTitle="Cloud & Infrastructure"
    title="DevOps & Cloud Engineering"
    perks={[
      `End-to-end CI/CD pipelines with Docker, GitHub Actions, and Kubernetes.`,
      `Managed deployments on AWS, Vercel, or Render with zero downtime.`,
      `Infrastructure monitoring, logging, and scaling strategy design.`,
    ]}
    sx={{ mt: { xs: 1.5, sm: 2 }, width: { xs: '100%', md: '48%' } }}
  />
{/* 
  <PricingCard
    className="service-item"
    miniTitle="Data Intelligence"
    title="Analytics & Visualization"
    perks={[
      `Custom dashboards with Superset, Metabase, or Next.js visual layers.`,
      `Advanced ETL and data modeling pipelines for SaaS and eCommerce.`,
      `Integrations with Google Analytics, PostgreSQL, and REST APIs.`,
    ]}
    sx={{ mt: { xs: 1.5, sm: 2 }, width: { xs: '100%', md: '48%' } }}
  /> */}
</Box>


      {/* CTA */}
      <Box sx={{ pt: 6 }} className="flex w100 center items-center justify-center auto">
        <Btn3
          onClick={(e: any) => {
            e.preventDefault()
            gsap.to(window, { duration: 1, scrollTo: "#Contact" })
          }}
          className="flex gap gap2"
          styles={{ background: 'black', fontWeight: '300' }}
        >
          <>
            {`Get a Quote`}
            <Image
              src="/img/right-arrow.png"
              style={{ padding: 1, filter: `invert(1)`, width: '20px', borderRadius: '50%' }}
              alt=""
              className="img"
              width={20}
              height={20}
            />
          </>
        </Btn3>
      </Box>
    </Grid>
  )
}

export default Services
