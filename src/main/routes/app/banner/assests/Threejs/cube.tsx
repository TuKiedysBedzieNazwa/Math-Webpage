import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Text, OrbitControls } from "@react-three/drei";
import { Mesh, Group } from "three";


const Cube = ({ sliders }: {sliders: any}) => {

    const groupRef = useRef<Group>(null!);
    const enterAnim = useRef<number>(4);


    const cubeRefs: any = {
        x:{
            lb: useRef<Mesh>(null!),
            rb: useRef<Mesh>(null!),
            rf: useRef<Mesh>(null!),
            lf: useRef<Mesh>(null!)
        },
        y:{
            lb: useRef<Mesh>(null!),
            rb: useRef<Mesh>(null!),
            rf: useRef<Mesh>(null!),
            lf: useRef<Mesh>(null!)
        },
        z:{
            lb: useRef<Mesh>(null!),
            rb: useRef<Mesh>(null!),
            rf: useRef<Mesh>(null!),
            lf: useRef<Mesh>(null!)
        }
    }

    const textRefs: any = {
        x: {
            f: useRef<Mesh>(null!),
            b: useRef<Mesh>(null!)
        },
        y: {
            f: useRef<Mesh>(null!),
            b: useRef<Mesh>(null!)
        },
        z: {
            f: useRef<Mesh>(null!),
            b: useRef<Mesh>(null!)
        }
    }

    const sizes: { [keys: string]: number[] }  = {
        x:[0.1, 0.1, 0.8],
        y:[0.1,   1, 0.1],
        z:[0.8, 0.1, 0.1]
    }

    const poses: { [keys: string]: { [keys: string]: number[] } } = {
        x:{
            lb: [-0.45, -0.45, 0],
            rb: [-0.45,  0.45, 0],
            rf: [ 0.45,  0.45, 0],
            lf: [ 0.45, -0.45, 0]
        },
        y:{
            lb: [-0.45, 0, -0.45],
            rb: [ 0.45, 0, -0.45],
            rf: [ 0.45, 0,  0.45],
            lf: [-0.45, 0,  0.45]
        },
        z:{
            lb: [0, -0.45, -0.45],
            rb: [0, -0.45,  0.45],
            rf: [0,  0.45,  0.45],
            lf: [0,  0.45, -0.45]
        }
    }

    useEffect(() => {
        // console.log(ref);

        let keys = Object.keys(cubeRefs);
        for(let i=0; i<keys.length; i++){

            let cordsKeys = Object.keys(cubeRefs[keys[i]]);
            for(let j=0; j<cordsKeys.length; j++){

                for(let k=0; k<keys.length; k++){
                    cubeRefs[keys[i]][cordsKeys[j]].current.scale[keys[k]] = sizes[keys[i]][k];
                    cubeRefs[keys[i]][cordsKeys[j]].current.position[keys[k]] = poses[keys[i]][cordsKeys[j]][k];
                }
            }
        }
    }, [])

    useFrame((state, delta) => {
        // Rotate Effect
        groupRef.current.rotation.y += delta / 2 * enterAnim.current;
        groupRef.current.rotation.x = Math.sin(groupRef.current.rotation.y) / (2 / enterAnim.current) ;
        groupRef.current.position.y = Math.sin(groupRef.current.rotation.y * 3) / 2;

        if(enterAnim.current > 1){
            enterAnim.current -= 0.02;
            // console.log(enterAnim.current)
        }

        textRefs.x.f.current.position.x = 0.4;


        // let val = Math.sin(groupRef.current.rotation.y * 3) / 10;

        let keys = Object.keys(cubeRefs);
        for(let i=0; i<keys.length; i++){

            textRefs[keys[i]].f.current.position[keys[i]] = sliders[keys[2 - i]].current / 20;
            textRefs.x.f.current.rotation.y = Math.PI / 2
            textRefs.y.f.current.rotation.x = -Math.PI / 2


            textRefs[keys[i]].b.current.position[keys[i]] = -sliders[keys[2 - i]].current / 20;
            textRefs.x.b.current.rotation.y = -Math.PI / 2
            textRefs.y.b.current.rotation.x = Math.PI / 2
            textRefs.z.b.current.rotation.y = Math.PI

            let secondKeys = Object.keys(cubeRefs[keys[i]]);
            for(let j=0; j<secondKeys.length; j++){

                let currentRef = cubeRefs[keys[i]][secondKeys[j]].current;
                currentRef.scale[keys[2 - i]] = sliders[keys[i]].current / 10;


                keys[i] == 'y' ? null :
                    currentRef.position.y > 0 ? currentRef.position.y = sliders.y.current / 20 - 0.05 : currentRef.position.y = -sliders.y.current / 20 + 0.05;

                keys[i] == 'z' ? null :
                    currentRef.position.x > 0 ? currentRef.position.x = sliders.z.current / 20 + 0.05 : currentRef.position.x = -sliders.z.current / 20 - 0.05;

                keys[i] == 'x' ? null :
                    currentRef.position.z > 0 ? currentRef.position.z = sliders.x.current / 20 + 0.05 : currentRef.position.z = -sliders.x.current / 20 - 0.05;

                // for(let k=0; k<keys.length; k++){

                //     // pulse Effect (depend on Rotate Effect)
                //     // currentRef.position[keys[k]] == 0 ? null :
                //     //     currentRef.position[keys[k]] > 0 ? currentRef.position[keys[k]] += val : currentRef.position[keys[k]] -= val;
                // }
            }
        }
    });

    return(
        <group ref={groupRef}>
            {
                Object.keys(cubeRefs).map(content => 
                    Object.keys(cubeRefs[content]).map(refBox => <Box ref={cubeRefs[content][refBox]}
                    >
                        <meshStandardMaterial />
                    </Box>
                ))
            }
            {
                Object.keys(textRefs).map(dimension => 
                    Object.keys(textRefs[dimension]).map(poseInDim => 
                        <Text ref={textRefs[dimension][poseInDim]}
                            color="white"
                            fontSize={0.5}
                        >
                            <meshStandardMaterial />
                            {`${poseInDim == 'f'? '' : '-'}` + dimension.toUpperCase()}
                        </Text>
                ))
            }
        </group>
    )
}



export default Cube;