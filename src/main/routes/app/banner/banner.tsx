import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { Slider, Button } from "antd";
import { Group } from "three";

import CubeSliders from "./assests/Sliders";
import MathNav from "./assests/mathNav";
import anims from './bannerAnims.json'


const Banner = () => {

    const sliders: any = {
        x: useRef<number>(10),
        y: useRef<number>(12),
        z: useRef<number>(10)
    }



    return(
        <motion.div className="flex justify-evenly items-center rounded-2xl mt-10 h-screen w-screen text-white"
            initial='hidden'
            animate='visible'
        >
            <MathNav />
        </motion.div>
    )
}



export default Banner;