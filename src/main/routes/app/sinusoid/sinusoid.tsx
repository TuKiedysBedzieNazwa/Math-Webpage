import React, { useState, useEffect, useRef } from "react";
import { 
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
    ReferenceLine,
    YAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Slider, ConfigProvider } from "antd";


import anims from './sinusoidAnims.json';


const Sinusoid = () => {

    const [data, setData] = useState<Array<{
        h: number,
        name: string
    }>>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const loop = useRef<number>(0);
    const generatePoint = (): {
        h: number,
        name: string
    } => {

        const howManyPoints: number = 12 * amplitude;

        if(loop.current === howManyPoints * 2) loop.current = 0;
        loop.current++;

        const roots: {[key: string]: string} = {
            "0.97": "(√6 + √2)/4",
            "0.87": "√3/2",
            "0.71": "√2/2",
            "0.5": "1/2",
            "0.26": "(√6 - √2)/4"
        }

        const number: number = Math.round(Math.sin(slider2 * (Math.PI / howManyPoints * loop.current)) * 100) / 100 * amplitude;
        const numString: string = number.toString();
        return {
            h: number,
            name: (number >= 0 ? roots[numString] : '-' + roots[numString.slice(1)]) || numString
        };
    }

    const timeoutFunc = (isRunning: boolean): void => {

        if(!isRunning) return;

        setData([
            ...data.slice(1),
            generatePoint(),
        ]);
    }

    const startButton = (): void => {
        setIsRunning(val => !val);
        !isRunning && timeoutFunc(!isRunning);
    }

    useEffect((): void => {

        anims.sliders.visible.transition.delay = 0;
        anims.slider[0].visible.transition.delay = 0.5;
        anims.slider[1].visible.transition.delay = 0.7;
        anims.slider[2].visible.transition.delay = 0.9;

        let arr:{
            h: number,
            name: string
        }[] = [];

        while(arr.length < 24){
            arr.push(generatePoint());
        }
        // console.log(arr);
        setData(arr);
    }, []);

    const [amplitude, setAmplitude] = useState<number>(1);
    const [slider2, setSlider2] = useState<number>(1);
    const [slider3, setSlider3] = useState<number>(350);

    return(
        <motion.div className="container h-176 bg-white/10 rounded-xl mx-auto mt-20 text-7xl"
            variants={anims.banner}
            initial='hidden'
            animate='visible'
        >
            <div className="w-full h-full flex items-center static py-1">
                <ResponsiveContainer width='100%' height='90%' className='text-xl relative'>
                    <LineChart data={data}
                        height={3}
                        width={24}
                    >
                        <ReferenceLine y={0} stroke="white" strokeOpacity={0.5}/>
                        <YAxis orientation="right"
                            height={3}
                            includeHidden={true}
                        />
                        <Line
                            type="monotone"
                            animationEasing="linear"
                            animationBegin={600}
                            animationDuration={slider3}
                            onAnimationEnd={(): void => timeoutFunc(isRunning)}
                            dataKey="h"
                            stroke="#fff"
                            strokeWidth={4}
                        />
                        <Tooltip content={({ payload }) => (
                                <p className="bg-white/50 px-5 py-2 rounded-md">
                                    {payload && payload[0] && payload[0].payload.name }
                                </p>
                            )} 
                            wrapperStyle={{ outline: "none" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="relative bottom-160 text-white h-20 ml-16 mr-28 flex justify-between items-center">
                <motion.div variants={anims.nav}>
                    MATeMAtyka wokół nas
                </motion.div>
                <motion.div variants={anims.recipe}>
                    {`f(x) = ${amplitude !== 1 ? amplitude : ''}sin(${slider2}x)`}
                </motion.div>
            </div>
            <motion.button className={`${isRunning ? 'btn-pressed' : 'btn-primary'} relative bottom-56 ml-20`}
                onClick={startButton}
                variants={anims.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
            >
                {isRunning ? "Zatrzymaj" : "Uruchom"}
            </motion.button>
            <AnimatePresence>
                {isRunning &&
                    <motion.div className="bg-white/20 w-5/12 h-1/2 relative bottom-172 rounded-xl ml-16 flex flex-col items-center justify-evenly text-xl text-white"
                        variants={anims.sliders}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div className="w-3/4" variants={anims.slider[0]}>
                            <Slider onChange={(value: number): void => setAmplitude(value)} 
                                max={3}
                                min={-3}
                                defaultValue={amplitude}
                            />
                            Amplituda funkcji
                        </motion.div>
                        <motion.div className="w-3/4" variants={anims.slider[1]}>
                            <Slider onChange={(value: number): void => setSlider2(value)} 
                                defaultValue={slider2}
                                min={1}
                                max={10}
                            />
                            To przed x'em
                        </motion.div>
                        <motion.div className="w-3/4" variants={anims.slider[2]}>
                            <Slider onChange={(value: number): void => setSlider3(value)} 
                                max={1000}
                                defaultValue={slider3}
                            />
                            temporary speed
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>

        </motion.div>
    )
}


export default Sinusoid;