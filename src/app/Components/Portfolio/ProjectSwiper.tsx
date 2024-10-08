"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image'


// import required modules
import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import { Box, Typography } from '@mui/material';

export default function App() {
  return (
    <>
      <Swiper
        breakpoints={{
            // when window width is >= 640px
            340: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            540: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            868: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          freeMode={true}
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation,FreeMode]}
        className="mySwiper"
      >
        {
            [
                {
                  img:`/img/projects/dwam.jpg`,
                  title: `DWAM Landing Page`,
                  href : `https://dwam.vercel.app/`
                },
                {
                  img:`/img/projects/fiverrclone.jpg`,
                  title: `5ademni (fiverr clone)`,
                  href : ``,
                  gitlink:'/'
                },
                {
                  img:`/img/projects/dashboard.png`,
                  title: `Admin Dashboard +2 lang`,
                  href : ``,
                  gitlink:'https://github.com/SalemDevLouy/nextjs-arabic-dashboard.git'
                }
            ].map(i=>{
                return <SwiperSlide  key={i.img}>
                    <Box 
                    
                    
                    className='relative  project-item op0 y20 project-card' sx={{height:{xs:'440px',sm:'440px'},
                     border: '1px solid #ffffff21 ',
                     backgroundColor: '#0c1021 !Important',
                      borderRadius:'9px',
                    width:{xs:'97%',md:'98%',lg:'95%'}}}>



                      <Box className="decoy">
                        <Box className='center col auto w100 justify-center flex h100 items-center'>
                          <Typography className='text-center ' sx={{px:1,fontWeight:600,fontSize:'1.5em'}}>
                        {i?.title}
                          </Typography>

                          <a href={i?.gitlink ? i?.gitlink : i.href} 
                          target='_blank'
                          className="white flex row center items-center  decor-none">

                          <Typography className='cursor pointer' sx={{pt:.5,fontSize:'.8em'}}>
                        {i?.gitlink ?" View Repo" : "View Live Demo"  } 
                          </Typography>
                          <Box sx={{width:'15px',height:'15px',ml:.35}}>
                            <Image src="/img/link.png"
                             alt="" className="img invert contain"  width={15} height={15}/>
                          </Box>
                          </a>

                        </Box>
                      </Box>

                        <Image
                        style={{
                      borderRadius:'9px',
                        }}
                        src={i.img} alt="" className="img" width={360} height={480}/>
                    </Box>
                </SwiperSlide>
         
            })
        }
      </Swiper>
    </>
  );
}
