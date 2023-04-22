import React from "react";
import { motion } from "framer-motion";
import anims from '../bannerAnims.json';

const MathNav = () => {

    return(
        <>
            <motion.div className="text-8xl font-bold mt-10"
            variants={anims.nav}
            // onAnimationComplete={() => {setShowLottie(true)}}
        >
            Matematyka
        </motion.div>
        <motion.div className="text-5xl -mt-2 font-light tracking-widest"
            variants={anims.bottomNav}
            // onAnimationComplete={() => setAminComplete(true)}
        >
            wokół nas
        </motion.div>
        {/* <motion.div className="text-5xl mt-10 text-center"
            variants={anims.content}
            onAnimationComplete={() => setAminComplete(true)}
        >
            πiekno matematyki, <br /> 
            czyli gdzie w swiecie <br /> 
            mozemy natknac <br />
            sie na liczby
        </motion.div> */}
        </>
    )
}



export default MathNav;