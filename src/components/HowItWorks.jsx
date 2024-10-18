import React from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animateWithGsap } from '../utils/animations'

const HowItWorks = () => {

  const videoRef = React.useRef()

  useGSAP(()=>{
    gsap.from('#chip-img', {
      scrollTrigger: {
        trigger: '#chip-img',
        toggleActions: 'restart none none none', 
        start: '20% bottom'
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })

    animateWithGsap('.g_fadeIn', {
      y: 0,
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1
    })

    animateWithGsap('#game-video', {
      onComplete: () => {
        videoRef.current.play()
      }
    })

  }, [])

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <div id='chip' className='flex-center w-full my-20'>
          <img src={chipImg} alt='Chip' id='chip-img' width={180} height={180}/>
        </div>

        <div className='flex flex-col items-center'>
          <h2 className='hiw-title'>
            A17 Pro Chip.
            <br/>
            A monster win for gaming.
          </h2>

          <p className='hiw-subtitle'>It's here. The biggest redesign in the history of Apple GPUs</p>
        </div>

        <div className='mt-10 md:mt-20 mb-14'>
          <div className='relative h-full flex-center'>
            <div className='overflow-hidden'>
              <img 
                src={frameImg}
                alt='Frame Image'
                className='bg-transparent relative z-10'
              />
              
            </div>
            <div className='hiw-video'>
                <video autoPlay muted playsInline preload='none'
                className='pointer-events-none'
                ref={videoRef}
                id='game-video'
                >
                  <source src={frameVideo} type='video/mp4'/>
                </video>
              </div>
          </div>

          <p className='text-gray font-semibold text-center mt-3'>Honkai: Star Rail</p>
        </div>

          <div className='hiw-text-container'>
            <div className='flex-1 flex justify-center flex-col gap-8'>
              <p className='hiw-text g_fadeIn'>
                A17 Pro is an extremely new class of iPhone chip that delivers our {' '}
                <span className='text-white'>
                  best graphic performance by far.
                </span>
              </p>
              <div className='flex-1 flex justify-center flex-col'>
              <p className='hiw-text g_fadeIn'>
                Mobile {' '}
                <span className='text-white'>
                  games will look and feel so immersive {' '}
                </span>
                with incredibly detailed environments and more realistic characters. And with industry leading speed and efficiency, A17 Pro takes fast and runs with it.
              </p>
            </div>

            </div>
            
            <div className='flex flex-1 flex-col justify-center g_fadeIn'>
              <p className='hiw-text'>New</p>
              <p className='hiw-bigtext'>Pro-class GPU</p>
              <p className='hiw-text'>with 6 cores</p>
            </div>

          </div>

          
        </div>
    </section>
  )
}

export default HowItWorks

