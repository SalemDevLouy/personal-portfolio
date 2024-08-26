"use client"
import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import SMicons from '../SMicons/SMicons'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const router = useRouter()

  return (
    <footer className='w100'>
        <Container sx={{pb:4,pt:2}} className='center col auto w100 flex'>
                 
                   <SMicons/>
                          
        </Container>
        <Box className='w100'>
        <Divider sx={{background:"gray",width:'100%',opacity:0.5}}></Divider>
                        <Box sx={{py:2}} className='w100 flex justify-between items-center'>
                        <Box
        onClick={()=>router.push('/')}
                        
                        className='cursor pointer ' sx={{width:'200px'}}>
                            <Typography sx={{maxWidth:'650px',
        py:2,
        fontSize:{xs:'.95em',sm:'1em',md:'1em',lg:'1.15em'},fontWeight:'600'}} 
        component='h2'
        className='white center auto text-center'>
          
          {
            `Louafi Salem | 2024`
          }
        </Typography>                      
                    </Box> 
                    <a 
                    target="_blank"
                    href="mailto:louafisalem79@gmail.com"
                    
                    className="decor-none white">
                                <Typography className='white'>
                                louafisalem79@gmail.com
                                </Typography>
                    </a>
                        </Box>
        </Box>
    </footer>
  )
}

export default Footer