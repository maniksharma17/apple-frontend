import React from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { View } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/all"
import ModelView from './ModelView'
import { yellowImg } from '../utils'
import { Canvas } from '@react-three/fiber'
import { models, sizes } from '../constants'
import { animateWithGsap, animateWithGsapTimeline } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const Model = () => {

  const [ size, setSize ] = React.useState('small')
  const [ model, setModel ] = React.useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8f8a81', '#ffe7b9', '#6f6c64'],
    img: yellowImg
  })

  const tl = gsap.timeline();

  React.useEffect(()=>{
    if(size==='large'){
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        delay: 0.5
      })
    } 

    if(size==='small'){
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        delay: 0.5
      })
    }
  }, [size])

  // camera control
  const cameraControlSmall = React.useRef()
  const cameraControlLarge = React.useRef()

  // model
  const small = React.useRef(new THREE.Group())
  const large = React.useRef(new THREE.Group())

  // rotation
  const [ smallRotation, setSmallRotation ] = React.useState(0)
  const [ largeRotation, setLargeRotation ] = React.useState(0)


  useGSAP(()=>{
    animateWithGsap('#heading', {
      y: 0,
      opacity: 1
    })
  }, []) 

  return (
    <section className='common-padding'>
       <div className='screen-max-width'>
        <h1 id='heading' className='section-heading'>
          Take a closer look.
        </h1>

        <div className='flex flex-col items-center mt-5'>
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            <ModelView 
            index={1}
            groupRef={small}
            gsapType="view1"
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
            item={model}
            size={size}
            />

            <ModelView 
            index={2}
            groupRef={large}
            gsapType="view2"
            controlRef={cameraControlLarge}
            setRotationState={setLargeRotation}
            item={model}
            size={size}
            />

            <Canvas className='h-full w-full'
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflow: 'hidden'
            }}
            eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className='mx-auto w-full'>
            <p className='text-sm font-light text-center mb-5'>{model.title}</p>
            <div className='flex-center'>
              <ul className='color-container'>
                {models.map((item) => (
                  <li key={item.id}
                  className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                  style={{
                    backgroundColor: item.color[0]
                  }}
                  onClick={() => {setModel(item)}}
                  />
              
                ))}
              </ul>

              <button className='size-btn-container'>
                {sizes.map(({label, value}) => (
                  <span key={label} className='size-btn'
                  style={{
                    backgroundColor: size==value? 'white' : 'transparent',
                    color: size==value? 'black' : 'white',
                  }}
                  onClick={() => {setSize(value)}}
                  >
                    {label}
                  </span>
                ))}
              </button>

            </div>
          </div>
        </div>
       </div>
    </section>
  )
}

export default Model