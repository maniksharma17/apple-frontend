import React from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {

  const videoRef = React.useRef([])
  const videoSpanRef = React.useRef([])
  const videoDivRef = React.useRef([])

  const [ video, setVideo ] = React.useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false
  })

  useGSAP(()=>{
    gsap.to('#slider', {
      transform: `translateX(${-100 * video.videoId}%)`,
      duration: 2,
      ease: 'power2.inOut'
    })
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none'
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true
        }))
      },
    })
  }, [video.videoId, video.isEnd])

  const [ loadedData, setLoadedData ] = React.useState([])

  React.useEffect(()=>{
    if (loadedData.length > 3){
      if(!video.isPlaying){
        videoRef.current[video.videoId].pause()
      } else {
        video.startPlay && videoRef.current[video.videoId].play()
      }
    }
  }, [video.videoId, video.startPlay, video.isPlaying, loadedData])

  const handleLoadedMetadata = (i, e) => {
    setLoadedData((pre) => ([...pre, e]))
  }

  React.useEffect(()=>{
    let currentProgress = 0;
    let span = videoSpanRef.current
    if(span[video.videoId]){
      let animate = gsap.to(span[video.videoId], {
        onUpdate: ()=>{
          const progress = Math.ceil(animate.progress()*100)
          if(progress!=currentProgress) currentProgress=progress

          gsap.to(videoDivRef.current[video.videoId], {
            width: window.innerHeight < 760
            ? '10vw'
            : window.innerWidth < 1260 
              ? '10vw'
              : '4vw'
          })

          gsap.to(span[video.videoId], {
            width: `${currentProgress}%`,
            backgroundColor: 'white'
          })
        },
        onComplete: ()=>{
          if(video.isPlaying){
            gsap.to(videoDivRef.current[video.videoId], {width: '12px'})
            gsap.to(span[video.videoId], {backgroundColor: '#afafaf'})
          }
        },
      })

      if(video.videoId==0) animate.restart()

      const animateUpdate = () => {
        animate.progress(videoRef.current[video.videoId].currentTime / hightlightsSlides[video.videoId].videoDuration)
      }

      if(video.isPlaying){
        gsap.ticker.add(animateUpdate)
      } else {
        gsap.ticker.remove(animateUpdate)
      }
    } 
  }, [video.videoId, video.startPlay, video.isPlaying])

  const handleProcess = (type, i) => {
    switch (type){
      case 'video-end':
        setVideo(prevVideo => ({...prevVideo, isEnd: true, videoId: i+1}));
        break;
      case 'video-last':
        setVideo(prevVideo => ({...prevVideo, isLastVideo: true}));
        break;
      case 'video-reset':
        setVideo(prevVideo => ({...prevVideo, isLastVideo: false, videoId: 0}));
        break;
      case 'play':
        setVideo(prevVideo => ({...prevVideo, isPlaying: !prevVideo.isPlaying}));
        break;
      case 'pause':
        setVideo(prevVideo => ({...prevVideo, isPlaying: !prevVideo.isPlaying}));
        break;
      default:
        return video;
    }

  }

  return (
    <>
      <div className='flex items-center'>
        {
          hightlightsSlides.map((list, index) => (
            <div key={index} id='slider' className='max-sm:pr-20 pr-10'>
              <div className='video-carousel_container'>
                <div className='w-full h-full flex-center rounded-3xl bg-black overflow-hidden'>
                  <video id="video" muted autoPlay playsInline={true} preload='auto'
                  ref={(el)=>{videoRef.current[index]=el}}
                  onEnded={()=>
                    index !== 3 
                    ? handleProcess('video-end', index)
                    : handleProcess('video-last', index)
                  }
                  onPlay={()=>{
                    setVideo((prev) => ({
                      ...prev,
                      isPlaying: true
                    }))
                  }}
                  onLoadedMetadata={(e)=>{handleLoadedMetadata(index, e)}}
                  >
                    <source src={list.video} type='video/mp4' />
                  </video>
                </div>

                <div className='absolute top-12 left-[5%] z-10'>
                  {
                    list.textLists.map(text => (
                      <p key={text} className='text-xl font-medium md:text-2xl'>
                        {text}
                      </p>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>

      <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-8 bg-gray-300 backdrop-blur rounded-full'>

          {videoRef.current.map((_, index) => (
            <span key={index} 
            ref={(el)=>{videoDivRef.current[index] = el}}
            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
              <span className='absolute h-full w-full rounded-full'
              ref={(el)=>{videoSpanRef.current[index] = el}}
              />
            </span>
          ))}
        </div>
        <button className='control-btn'>
          <img 
          src={video.isLastVideo? replayImg : !video.isPlaying? playImg : pauseImg}
          alt={video.isLastVideo? 'Replay' : !video.isPlaying? 'Play' : 'Pause'}
          onClick={video.isLastVideo 
            ? () => {handleProcess('video-reset')}
            : !video.isPlaying
              ? () => {handleProcess('play')}
              : () => {handleProcess('pause')}
          } 
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel