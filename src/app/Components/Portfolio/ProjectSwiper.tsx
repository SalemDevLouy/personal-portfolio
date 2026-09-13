"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image'
import { gsap } from 'gsap';
import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSectionData } from '@/hooks/useSectionData';
import { fallbackProjects } from '@/lib/data/fallback';
import type { Project } from '@/types';

export default function App() {
  const { data: projects, loading } = useSectionData<Project>('projects', fallbackProjects);

  useEffect(() => {
    if (loading) return;
    gsap.to('.project-item', {
      y: 0,
      opacity: 1,
      duration: .5,
      stagger: 0.2,
      delay: .25,
      scrollTrigger: {
        trigger: '.project-item',
        start: 'top 80%',
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, projects]);

  return (
    <>
      <Swiper
        breakpoints={{
            340: { slidesPerView: 1, spaceBetween: 10 },
            540: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            868: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          freeMode={true}
        pagination={{ type: 'progressbar' }}
        navigation={true}
        modules={[Pagination, Navigation, FreeMode]}
        className="mySwiper"
      >
        {projects.map((i) => {
          return (
            <SwiperSlide key={i._id ?? i.title}>
              <Box
                className='relative project-item op0 y20 project-card'
                sx={{height:{xs:'440px',sm:'440px'},
                 border: '1px solid #ffffff21 ',
                 backgroundColor: '#0c1021 !Important',
                  borderRadius:'9px',
                width:{xs:'97%',md:'98%',lg:'95%'}}}>

                  <Box className="decoy">
                    <Box className='center col auto w100 justify-center flex h100 items-center'>
                      <Typography className='text-center ' sx={{px:1,fontWeight:600,fontSize:'1.5em'}}>
                    {i?.title}
                      </Typography>

                      <a href={i?.repoUrl ? i?.repoUrl : i?.demoUrl}
                      target='_blank'
                      className="white flex row center items-center  decor-none">

                      <Typography className='cursor pointer' sx={{pt:.5,fontSize:'.8em'}}>
                    {i?.repoUrl ?" View Repo" : "View Live Demo"  }
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
                  src={i.coverImage} alt="" className="img" width={360} height={480}/>
                </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
