import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React from 'react'
import Loader from './Loader'
import Lights from './Lights'
import { Model as IPhone } from './Iphone'
import * as THREE from 'three'

const ModelView = ({index, groupRef, controlRef, gsapType, setRotationState, size, item}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.8}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={()=>
          setRotationState(controlRef.current.getAzimuthalAngle())
        }
      />

      <group ref={groupRef} name={`${index == 1 ? "small" : "large"}`} position={[0, 0 ,0]}>
        <React.Suspense fallback={<Loader />}>
          <IPhone
          scale={index==1? [15,15,15] : [17, 17, 17]}
          item={item}
          size={size}
          ></IPhone>
        </React.Suspense>
      </group>
    </View>
  );
}

export default ModelView