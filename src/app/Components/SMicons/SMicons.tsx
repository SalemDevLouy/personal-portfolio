"use client"
import { Box } from '@mui/material'
import React from 'react'
import Image from 'next/image'

const SMicons = () => {
  return (
    <Box sx={{my:2,gap:2}} className='flex row center'>
    {

        [
            
            {
                img:`/img/tech/github.png`
                ,href:`https://github.com/SalemDevLouy`
            },
            {
                img:`/img/linkedin.png`
                ,href:`https://www.linkedin.com/in/salem-louafi-532869235/`
            },
            {
                img:`/img/email.png`
                ,href:`mailto:louafisalem79@gmail.com`
            },
            
            {
                img:`/img/cv.png`
                ,href:`https://drive.google.com/file/d/1Cw_3fxu-OWDIpnoR-GhAetzDd3CSsXCS/view?usp=drive_link`
            },
            

        ].map(link=>{
            return <a
            target='_blank'
            
            key={link.img} href={`${link.href}`}>

            <Box sx={{width:'30px'}}>
                <Image src={link?.img} alt="" className="img invert" width={20} height={20}/>
            </Box>
            </a> 
        })
    }
    </Box> 
  )
}

export default SMicons