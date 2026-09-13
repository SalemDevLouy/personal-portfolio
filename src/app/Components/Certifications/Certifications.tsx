"use client"
import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useSectionData } from '@/hooks/useSectionData'
import { fallbackCertifications } from '@/lib/data/fallback'
import type { Certification } from '@/types'

const Certifications = () => {
  const { data: items, loading } = useSectionData<Certification>(
    'certifications',
    fallbackCertifications
  )

  useEffect(() => {
    if (loading) return
    gsap.to('.cert-title', {
      y: 0,
      opacity: 1,
      duration: 0.35,
      scrollTrigger: {
        trigger: '.cert-title',
        start: 'top 80%',
      },
    })
    gsap.to('.cert-subtitle', {
      y: 0,
      opacity: 1,
      duration: 0.25,
      delay: 0.15,
      scrollTrigger: {
        trigger: '.cert-title',
        start: 'top 80%',
      },
    })
    gsap.to('.cert-card', {
      y: 0,
      opacity: 1,
      duration: 0.45,
      stagger: 0.15,
      delay: 0.3,
      scrollTrigger: {
        trigger: '.cert-subtitle',
        start: 'top 80%',
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <Grid
      id="Certifications"
      container
      className="flex auto"
      sx={{
        zIndex: 10,
        pb: 4,
        pt: 6,
        px: 1,
        backgroundImage:
          'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 43.55), #000 35%)',
        background: {
          xs: 'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 45%)',
          xl: 'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 35%)',
        },
      }}
    >
      <Box className="auto col flex center" sx={{ width: '100%', py: 4 }}>
        <Typography
          className="white text-center auto cert-title op0 y20"
          sx={{
            pb: 1,
            fontWeight: 700,
            fontSize: { xs: '3em', sm: '3em', md: '4em' },
          }}
        >
          Certifications
        </Typography>
        <Typography
          className="white text-center w100 cert-subtitle op0 y20"
          sx={{ fontWeight: 200, fontSize: { xs: '.9em', sm: '.85em', md: '1em' } }}
        >
          Courses and certificates I earned along the way
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 'lg',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          px: { xs: 2, md: 4 },
        }}
      >
        {items.map((cert) => (
          <Box
            key={cert._id ?? `${cert.title}-${cert.issuer}`}
            className="cert-card op0 y20"
            sx={{
              width: { xs: '100%', sm: '45%', md: '300px' },
              border: '1px solid #ffffff21',
              background: '#0c102178',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'transform .3s ease, border-color .3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: '#6b9fff',
              },
            }}
          >
            {cert.imageUrl ? (
              <Box sx={{ position: 'relative', height: 160 }}>
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  fill
                  unoptimized
                  sizes="300px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  height: 160,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #667eea, #00f2fe)',
                }}
              >
                <Typography sx={{ px: 2, textAlign: 'center', fontWeight: 600 }}>
                  {cert.title}
                </Typography>
              </Box>
            )}
            <Box sx={{ p: 2 }}>
              <Typography className="white" sx={{ fontWeight: 600, fontSize: '1.05em' }}>
                {cert.title}
              </Typography>
              <Typography
                className="gray2"
                sx={{ fontSize: '.8em', mt: 0.5, color: '#00ff88' }}
              >
                {cert.issuer} · {cert.date}
              </Typography>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="white decor-none"
                  style={{ display: 'inline-block', fontSize: '.75em', marginTop: 8, color: '#9e9eff' }}
                >
                  View credential →
                </a>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Grid>
  )
}

export default Certifications