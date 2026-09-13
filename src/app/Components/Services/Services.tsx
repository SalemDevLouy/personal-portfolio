"use client"
import { Grid, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Btn3 from '../Btn/Btn3'
import PricingCard from './PricingCard'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useSectionData } from '@/hooks/useSectionData'
import { fallbackServices } from '@/lib/data/fallback'
import type { Service } from '@/types'

const Services = () => {
  const { data: services, loading } = useSectionData<Service>('services', fallbackServices)

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
    if (loading) return
    animateServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

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

      <Box
        sx={{
          maxWidth: { sm: '100%', md: '95%', lg: 'lg' },
          gap: { xs: 1.5, sm: 2 },
        }}
        className="white auto w100 justify-between flex row wrap"
      >
        {services.map((service, idx) => (
          <PricingCard
            key={service._id ?? service.title}
            className="service-item"
            miniTitle={service.miniTitle}
            title={service.title}
            text={service.description}
            perks={service.perks || []}
            sx={{
              mt: idx % 2 === 1 ? { xs: 1.5, sm: 2 } : 0,
              width: { xs: '100%', md: '48%' },
            }}
          />
        ))}
      </Box>

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
