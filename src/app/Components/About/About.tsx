
import React from 'react'
import { Grid,Box,Typography } from '@mui/material'
import Image from 'next/image'
export default function About() {
  return (
    <Grid container className='flex  auto' sx={{
      zIndex:'10',
      // maxWidth:'lg',
      pt:{xs:15},
      // minHeight:'100vh',
      // height:'1500px',
      px:{md:10,lg:20,xl:28},
      backgroundImage:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 43.55), #000 35%)',
        background : {
          xs:
          'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 45%)',
          xl:'radial-gradient(circle at 50% 50%, rgba(17, 24, 65, 33.55), #000 35%)',
        },
        overflow:'hidden'
      
      }}>
     
     
   


     
       


      <Grid sx={{px:1}} item xs={12} md={5.5} >

        <Box sx={{maxWidth:{sm:'90%',md:'95%',lg:'600px'}}}
        
        className='white auto center  justify-center h100 flex col'>
<Typography sx={{
  textAlign:{xs:'center',md:'left'},
  pt:{xs:2,sm:2,md:0},
  fontWeight:700,fontSize:{xs:'3em',sm:'2.5em',md:'3em'},pb:.42}}>
{`A Bit About Me: I'm Louafi Salem`}

</Typography>
      
          <Typography sx={{
  textAlign:{xs:'center',md:'left'},
              pt:.5,
            fontWeight:200,fontSize:{xs:'.9em',sm:'.85em',md:'1em'}}}>
              {
                `
                I have over ${new Date().getFullYear() - 2022} years experience with building fullstack apps,
                 primarily for Algerians businesses
                
                using the best & latest technologies like Typescript + Nextjs to 
                deliver top level software solutions.

                 
                `
              }
          </Typography>

          <Typography sx={{
  textAlign:{xs:'center',md:'left'},
            
            fontWeight:200,fontSize:{xs:'.9em',sm:'.85em',md:'1em'}}}>
              {
                `
                Coding gives me sense of purpose and not just a job for me, it's the thing I'd do even if I had all the money in the world.

                `
              }
          </Typography>
        </Box>
      </Grid>


      <Grid
                    sx={{
                    my: {
                        xs: '3.5em',
                        sm: '4em',
                        lg: '1em'
                    },
                    pt: {
                        sm: '1em',
                        md: '2em',
                        lg: '0em'
                    },
                    display: 'flex',
                    alignItems: 'baseline',
                    
                    justifyContent: {xs:'center',md:'flex-end'}
                }}
                    item
                    xs={12} md={6}
                    // xs={12}
                    // sm={12}
                    // md={12}
                    // lg={5}
                    
                    >
                    <Box
                        sx={{
                        borderRadius: '6px',
                        width: {
                            xs: '100%',
                            sm: '350px',
                            md: '400px'
                        }
                    }}>
                        <Box
                            className='mainBox'
                            sx={{
                            opacity: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            height: '460px',
                            boxShadow: {
                                xs: '.5em 3em 0 #0c1021 ',
                                sm: '2em 3em 0px #0c1021'
                            }
                        }}>

                            <Image

                            
                            // layout='fill'

                                style={{
                                opacity: 1,
                                borderRadius: '6px',
                                zIndex: '2'
                            }}
                                className='img cover'
                                src='/img/me.jpg'
                                alt="Personal Image" fill/>
                            <Box
                                className='gradientBg absolute'
                                sx={{
                                width: '100px',
                                height: '100px',
                                zIndex: '0',
                                position: 'absolute',
                                right: {
                                    xs: '0%',
                                    sm: '-5%',
                                    md:'-8%'
                                },
                                opacity: 1,
                                bottom: '-5%',
                                background: 'transparent',
                                backgroundImage: 'radial-gradient(white 2px, transparent 0)',
                                backgroundSize: '15px 13px'
                            }}></Box>
                            <Box
                                className='quoteBox '
                                sx={{
                                zIndex: '2',
                                border: '1px solid #ffffff21 ',
                                backgroundColor: '#550df4 !Important',
                                position: 'absolute',
                                bottom: {
                                    xs: '0%',
                                    lg: '-5%'
                                },
                                width: {sm:'100%'},
                                height: 'fit-content',

                                right: {
                                    sm: '25%'
                                },
                                top: {xs:'81%',sm:'89%',lg:'83%'},
                                overflow: 'hidden',
                                opacity: 1,
                                background: '#0092ff'
                            }}>
                                <Typography

                                component='h1'
                                    sx={{
                                      color:'white',
                                      fontWeight: '300',
                                    fontSize: '.85em',
                                    padding: '1em'
                                }}>
{`"Many ideas grow better when transplanted into another mind than the one where they sprang up."

– Oliver Wendell Holmes`}
                                </Typography>

                            </Box>

                        </Box>

                    </Box>
                {/* </Grid> */}

            </Grid>
    </Grid>
  )
}
