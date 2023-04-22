import React from "react";
import { motion } from "framer-motion";
import { Slider } from "antd";


const CubeSliders = ({ sliders }: { sliders: any } ) => {

    return(
        <motion.div className="bg-white/10 rounded-xl w-full mt-10 px-10">
            z
            <Slider defaultValue={10}
                min={1}
                max={40}
                onChange={val => sliders.x.current = val}
            />
            y
            <Slider defaultValue={10}
                min={1}
                max={40}
                onChange={val => sliders.y.current = val + 2}
            />
            x
            <Slider defaultValue={10}
                min={1}
                max={40}
                onChange={val => sliders.z.current = val}
            />               
        </motion.div>

    )
}



export default CubeSliders;