"use client"
import { Box } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { useSectionData } from '@/hooks/useSectionData'
import { fallbackSettings } from '@/lib/data/fallback'
import type { Settings } from '@/types'

const SMicons = () => {
  const { data: settings } = useSectionData<Settings>('settings', [fallbackSettings])
  const socials = settings?.[0]?.socials ?? fallbackSettings.socials

  const links = [
    { key: 'github', img: `/img/GitHub.png`, href: socials.github },
    { key: 'linkedin', img: `/img/linkedin.png`, href: socials.linkedin },
    { key: 'whatsapp', img: `/img/socielmedia/whatsapp.png`, href: socials.whatsapp },
    { key: 'telegram', img: `/img/socielmedia/telegram.png`, href: socials.telegram },
    { key: 'instagram', img: `/img/socielmedia/instagram.png`, href: socials.instagram },
    { key: 'facebook', img: `/img/socielmedia/facebook.png`, href: socials.facebook },
    { key: 'email', img: `/img/email.png`, href: socials.email },
    { key: 'cv', img: `/img/cv.png`, href: socials.cv },
  ].filter((l) => l.href)

  return (
    <Box sx={{my:2,gap:2}} className='flex row center'>
      {links.map(link => {
        return (
          <a target='_blank' key={link.key} href={link.href}>
            <Box sx={{width:'30px'}}>
              <Image src={link.img} alt={link.key} className="img invert" width={20} height={20}/>
            </Box>
          </a>
        )
      })}
    </Box>
  )
}

export default SMicons
