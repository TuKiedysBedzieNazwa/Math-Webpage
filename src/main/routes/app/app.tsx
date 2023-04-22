import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls, SoftShadows } from "@react-three/drei";
import { Group, Object3D, SpotLight as test } from "three";
import { Stats } from "@react-three/drei";

import SchoolClass from "./banner/assests/Threejs/schoolClass";
import Cube from "./banner/assests/Threejs/cube";
import Banner from "./banner/banner";

const App = () => {

  const sliders: any = {
    x: useRef<number>(10),
    y: useRef<number>(12),
    z: useRef<number>(10)
  }

  const testRef = useRef<test>(null!);
  useEffect(() => {
    // if(testRef.current !== null)
      // testRef.current.target.position.x = 2;
    // console.log(testRef);
  }, [])

  return (
    <div className='bg w-screen h-screen'>
      <Canvas camera={{ position: [0, 5, 12] }} shadows>
        <ambientLight intensity={0.01} />

        {/* <Cube sliders={sliders}/> */}

        <ScrollControls pages={80} damping={0.15}>
          <SchoolClass />

          {/* <Cube sliders={sliders} /> */}
          <Scroll html>
            <Banner />
          </Scroll>
        </ScrollControls>
        <SoftShadows samples={15} focus={20} />
        {/* <BakeShadows /> */}

        <axesHelper />
        <OrbitControls enableZoom={false} />
        <Stats />
      </Canvas>
    </div>
  );
}



export default App;