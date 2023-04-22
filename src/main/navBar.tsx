import React from "react";
import { motion } from "framer-motion";


import anims from './navBarAnims.json';


const NavBar = () => {

    return(
      <motion.div className='container bg-white/20 w-2/3 text-white h-20 rounded-b-3xl'
        variants={anims.navbar}
        initial='hidden'
        animate='visible'
      >
        <motion.a className='font-black text-3xl float-left h-3/4 w-1/4 mt-5 text-center'
          href="/"
          whileHover={{
            letterSpacing: "20px",
            x: "16%"
          }}
          transition={{
            duration: 0.5,
            type: 'spring'
          }}
        >
          MATH
        </motion.a>
        <div className='h-3/4 w-3/4 mt-6 float-left flex justify-evenly text-xl'>
          <motion.a href="/"
            whileHover={anims.navbuttonhover}
          >
            START
          </motion.a>
          <motion.a href="/Calculator"
            whileHover={anims.navbuttonhover}
          >
            KALKULATOR
          </motion.a>
          <motion.a href="/About"
            whileHover={anims.navbuttonhover}
          >
            O MNIE
          </motion.a>
          <motion.a href="/Technologies"
            whileHover={anims.navbuttonhover}
          >
            TECHNOLOGIE
          </motion.a>
        </div>
      </motion.div>
    )
}


export default NavBar;