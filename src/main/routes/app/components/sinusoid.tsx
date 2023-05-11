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
import { Slider } from "antd";

import anims from './anims/sinusoidAnims.json';



interface rechartData {
    h: number,
    name: string
}

const Sinusoid = () => {

    const [data, setData] = useState<Array<rechartData>>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const [amplitude, setAmplitude] = useState<number>(1);
    const [period, setPeriod] = useState<number>(1);
    const loop = useRef<number>(0);

    const [intervalId, setIntervalId] = useState<number>();

    const periodArr = [0, '2π', 'π', '2π/3', 'π/2', '2π/5', 'π/3'];

    const generatePoint = () => {

        const roots: {[key: string]: string} = {
            "0.97": "(√6 + √2)/4",
            "0.87": "√3/2",
            "0.71": "√2/2",
            "0.5": "1/2",
            "0.26": "(√6 - √2)/4",
            "-0.97": "-(√6 + √2)/4",
            "-0.87": "-√3/2",
            "-0.71": "-√2/2",
            "-0.5": "-1/2",
            "-0.26": "-(√6 - √2)/4",

            "0.52": "(√6 - √2)/2",
            "1.42": "√2",
            "1.74": "√3",
            "1.94": "(√6 + √2)/2",
            "-0.52": "-(√6 - √2)/2",
            "-1.42": "-√2",
            "-1.74": "-√3",
            "-1.94": "-(√6 + √2)/2",

            "0.78": "3(√6 - √2)/4",
            "1.5": "3/2",
            "2.13": "3√2/2",
            "2.61": "3√3/2",
            "2.91": "3(√6 + √2)/4",
            "-0.78": "-3(√6 - √2)/4",
            "-1.5": "-3/2",
            "-2.13": "-3√2/2",
            "-2.61": "-3√3/2",
            "-2.91": "-3(√6 + √2)/4",

        }

        let arr: rechartData[] = [];
        
        const howManyPoints: number = 12 * amplitude;
        if(loop.current === howManyPoints * 2) loop.current = 0;
        loop.current++;

        for(let i=0; i<24; i++){
            
            const number: number = Math.round(Math.sin(period * (Math.PI * ((i + loop.current) / 12))) * 100) / 100 * amplitude;
            const numString: string = number.toString();
            arr.push({
                h: number,
                name: roots[numString] ? roots[numString] : numString
            });
        }
        setData(arr);
    }

    const startButton = (): void => {

        setIsRunning(val => !val);

        !isRunning ? setIntervalId(setInterval(generatePoint, 1000)) : clearInterval(intervalId);
    }

    useEffect((): void => {

        anims.sliders.visible.transition.delay = 0;
        anims.slider[0].visible.transition.delay = 0.5;
        anims.slider[1].visible.transition.delay = 0.7;
        anims.slider[2].visible.transition.delay = 0.9;

        generatePoint();
    }, []);


    return(
        <motion.div className="w-192 h-96 bg-white/10 rounded-xl mx-auto text-2xl"
            variants={anims.banner}
            initial='hidden'
            animate='visible'
        >
            <div className="w-full h-full flex items-center static py-1">
                <ResponsiveContainer width='100%' height='90%' className='text-xs'>
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
                            animationBegin={200}
                            animationDuration={350}
                            dataKey="h"
                            stroke="#fff"
                            strokeWidth={1}
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
            <div className="relative bottom-96 text-white h-20 ml-16 mr-28 flex justify-end items-center">
                <motion.div variants={anims.recipe}>
                    {`f(x) = ${amplitude !== 1 ? amplitude : ''}sin(${period}x)`}
                </motion.div>
            </div>
            <motion.button className={`${isRunning ? 'btn-pressed' : 'btn-primary'} relative bottom-40 ml-10`}
                onClick={startButton}
                variants={anims.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
            >
                {isRunning ? "Zatrzymaj" : "Uruchom"}
            </motion.button>
            <AnimatePresence>
                {!isRunning &&
                    <motion.div className="bg-white/20 w-5/12 h-1/2 relative bottom-112 rounded-xl ml-10 flex flex-col items-center justify-evenly text-xl text-white"
                        variants={anims.sliders}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div className="w-3/4 mt-4" variants={anims.slider[0]}>
                                <div className="flex justify-between">
                                    <span>
                                        Amplituda funkcji
                                    </span>
                                    <span>
                                        {`( ${amplitude} )`}
                                    </span>

                                </div>
                            <Slider className="mt-0 ml-0"
                                onChange={(value: number): void => {
                                    setAmplitude(value)
                                }} 
                                max={3}
                                min={-3}
                                defaultValue={amplitude}
                            />
                        </motion.div>
                        <motion.div className="w-3/4" variants={anims.slider[1]}>
                            <div className="flex justify-between">
                                <span>
                                    Okres funkcji
                                </span>
                                <span>
                                    {`( ${period} )`}
                                </span>
                            </div>
                            <Slider className="mt-0 ml-0"
                                onChange={(value: number): void => {
                                    setPeriod(value);
                                }} 
                                defaultValue={period}
                                min={1}
                                max={6}
                            />
                        </motion.div>
                        <motion.div className="w-3/4 mt-1 mb-3 flex justify-between" variants={anims.slider[2]}>
                            <span>
                                {'radian(π) = 180°'}
                            </span>
                            <span>
                                {periodArr[period]}
                            </span>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}


export default Sinusoid;