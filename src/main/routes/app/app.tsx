import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls, SoftShadows, Stats } from "@react-three/drei";
import { Group } from "three";
import { motion, useAnimationControls } from "framer-motion";

import SchoolClass from "./components/schoolClass";
import Cube from "./components/cube";
import Content from "./components/content";

import anims from './components/anims/mainAnims.json';


const App = () => {

  const cubeMoveRef = useRef<Group>(null!);

  const sliders: any = {
    x: useRef<number>(10),
    y: useRef<number>(12),
    z: useRef<number>(10)
  }
  const sliderAnim = {
    hidden:{
      y: '40%',
      opacity: 0
    },
    visible:{
      y: 0,
      opacity: 1,
      transition:{
        duration: 1.2
      }
    }
  }

  const areCube = sliders.x.current == sliders.y.current == sliders.z.current;

  const runAnims: any = [
    [useAnimationControls(), useRef(false)],
    [useAnimationControls(), useRef(false)],
    [useAnimationControls(), useRef(false)],
    [useAnimationControls(), useRef(false)],
    [useAnimationControls(), useRef(false)]
  ]

  return (
      <div className='bg w-screen h-screen'>
        <Canvas camera={{ position: [0, 5, 12] }} shadows>
          <ambientLight intensity={0.012} />
          <ScrollControls pages={8} damping={0.15}>
            <SchoolClass cubeMoveRef={cubeMoveRef} runAnims={runAnims} />
            <Cube sliders={sliders} cubeMoveRef={cubeMoveRef} />
            <Scroll html>
              <Content sliders={sliders} runAnims={runAnims}/>
            </Scroll>
          </ScrollControls>
          <SoftShadows samples={15} focus={20} />

          {/* <axesHelper /> */}
          {/* <OrbitControls enableZoom={false} /> */}
          <Stats /> {/* frame monitor */}
        </Canvas>
      </div>
  )
}




export default App;