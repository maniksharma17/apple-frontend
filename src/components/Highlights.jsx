import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
import { rightImg, watchImg } from '../utils'
import VideoCarousel from "./VideoCarousel"

gsap.registerPlugin(ScrollTrigger)

const Highlights = () => {

  useGSAP(()=>{
    gsap.to('#title', {
      opacity: 1,
      duration: 1,
      y: 0,
      scrollTrigger: "#highlights"
    })
    gsap.to('.link', {
      opacity: 1,
      delay: 0.25,
      duration: 1,
      y: 0,
      stagger: 0.25,
      scrollTrigger: "#highlights"
    })
  }, [])

  return (
    <section id='highlights' className='w-screen overflow-hidden h-full common-padding bg-zinc'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full md:flex justify-between items-end'>
          <h1 id='title' className='section-heading'>Get the Highlights</h1>
          <div className='flex flex-wrap items-end gap-5'>
            <p className='link'>
              Watch the film
              <img src={watchImg} alt='watch' className='ml-2'/>
            </p>
            <p className='link'>
              Watch the event
              <img src={rightImg} alt='watch' className='ml-2'/>
            </p>
          </div>
        </div>
      </div>

      <VideoCarousel />
    </section>
  )
}

export default Highlights