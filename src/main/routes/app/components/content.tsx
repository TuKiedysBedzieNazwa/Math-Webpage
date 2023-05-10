import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useTransform, useMotionValue } from "framer-motion";
import { Slider } from "antd";

import anims from './anims/mainAnims.json';


const Content = ({ sliders, runAnims }: any) => {

    const [x, setX] = useState<number>(10);
    const [y, setY] = useState<number>(10);
    const [z, setZ] = useState<number>(10);

    const Counter = ({ val }: { val: number}) => {

        const count = useMotionValue(Math.floor(Math.random() * 9000));
        const rounded = useTransform(count, latest => Math.round(latest));
        
        useEffect(() => {
          const controls = animate(count, val);
        
          return controls.stop;
        }, [])
        
        return <motion.div>{ rounded }</motion.div>
    }

    return (
        <motion.div className="h-8vh text-white">

            <motion.div className="flex flex-col md:flex-row justify-evenly items-center rounded-2xl h-screen w-screen"
                variants={anims.inOutAnim}
                initial='middle'
                animate={runAnims[0][0]}
            >
                <motion.div className="text-8xl font-bold"
                    variants={anims.nav}
                    initial='hidden'
                    animate='visible'
                >
                    Matematyka
                </motion.div>
                <motion.div className="text-5xl font-light tracking-widest"
                    variants={anims.bottomNav}
                    initial='hidden'
                    animate='visible'
                >
                    wokół nas
                </motion.div>
            </motion.div>
            <motion.div className="h-screen w-screen text-4xl text-center flex items-center justify-center font-light"
                variants={anims.inOutAnim}
                initial='in'
                animate={runAnims[1][0]}
            >
                <span className="-mt-128">
                    Prezentuje
                </span>
            </motion.div>
            <motion.div className="h-screen w-screen mt-4vh">
                <motion.div className="bg-white/10 rounded-xl w-1/3 px-10 py-7 ml-20 text-xl"
                    variants={anims.inOutAnim}
                    initial='in'
                    animate={runAnims[2][0]}
                >
                    {x == z && x == y ?
                        <motion.div className="font-bold text-3xl text-center mb-3"
                            key='cube'
                            variants={anims.cube}
                            initial='in'
                            animate='middle'
                        >
                            Wymiary sześcianu
                        </motion.div> :
                        <motion.div className="font-bold text-3xl text-center mb-3"
                            key='notCube'
                            variants={anims.cube}
                            initial='out'
                            animate='middle'
                        >
                            Wymiary prostopadłościanu
                        </motion.div>
                    }
                    <div className="flex justify-between items-center">
                        <span>
                            Szerokość
                        </span>
                        <span>
                            {x}
                        </span>
                    </div>
                    <Slider defaultValue={10}
                        min={1}
                        max={40}
                        onChange={val => {
                            sliders.x.current = val;
                            setX(val);
                        }}
                    />
                    <div className="flex justify-between items-center">
                        <span>
                            Wysokość
                        </span>
                        <span>
                            {y}
                        </span>
                    </div>
                    <Slider defaultValue={10}
                        min={1}
                        max={40}
                        onChange={val => {
                            sliders.y.current = val + 2;
                            setY(val);
                        }}
                    />
                    <div className="flex justify-between items-center">
                        <span>
                            Długość
                        </span>
                        <span>
                            {z}
                        </span>
                    </div>
                    <Slider defaultValue={10}
                        min={1}
                        max={40}
                        onChange={val => {
                            sliders.z.current = val;
                            setZ(val);
                        }}
                    />
                </motion.div>

                <motion.div className="bg-white/10 rounded-xl text-xl w-1/3 px-10 py-7 ml-20 mt-10"
                    variants={anims.inOutAnim}
                    initial='in'
                    animate={runAnims[3][0]}
                >
                    <div className="font-bold text-3xl text-center mb-3">
                        Pole powierzchni całkowitej:
                    </div>
                    <div className="flex justify-between items-center">
                        {
                            x == z && x == y ?
                            <motion.span
                                key='0'
                                variants={anims.cube}
                                initial='in'
                                animate='middle'
                            >
                                6x^2
                            </motion.span> :
                            <motion.span
                                key='1'
                                variants={anims.cube}
                                initial='out'
                                animate='middle'
                            >
                                2(xy + yz + zy)
                            </motion.span>
                        }
                        <span className="flex">
                            =<Counter val={2 * (x*y + x*z + y*z)} />^2
                        </span>
                    </div>
                    <div className="font-bold text-3xl text-center mb-3">
                        Objętość:
                    </div>
                    <div className="flex justify-between items-center">
                        {
                            x == z && x == y ?
                            <motion.span
                                key='2'
                                variants={anims.cube}
                                initial='in'
                                animate='middle'
                            >
                                x^3
                            </motion.span> :
                            <motion.span
                                key='3'
                                variants={anims.cube}
                                initial='out'
                                animate='middle'
                            >
                                xyz
                            </motion.span>
                        }
                        <span className="flex">
                            =<Counter val={x * y * z} />^3
                        </span>
                    </div>
                    <div className="font-bold text-3xl text-center mb-3">
                        Długość przekątnej:
                    </div>
                    <div className="flex justify-between items-center">
                        {
                            x == z && x == y ?
                            <motion.span
                                key='2'
                                variants={anims.cube}
                                initial='in'
                                animate='middle'
                            >
                                x√3
                            </motion.span> :
                            <motion.span
                                key='3'
                                variants={anims.cube}
                                initial='out'
                                animate='middle'
                            >
                                √(x^2 + y^2 + z^2)
                            </motion.span>
                        }
                        <span className="flex">
                            =√<Counter val={Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)} />
                        </span>
                    </div>


                </motion.div>
            </motion.div>
            <motion.div className="text-center h-screen w-screen flex flex-col items-center justify-center"
                variants={anims.inOutAnim}
                initial='in'
                animate={runAnims[4][0]}
            >
                <motion.div className="text-8xl font-semibold">
                    Dziękuję za uwagę
                </motion.div>
                <motion.div className="text-2xl font-light mt-5 italic">
                    autor i wykonanie: Dominik Kalicun
                </motion.div>
            </motion.div>

        </motion.div>
    )
}



export default Content;