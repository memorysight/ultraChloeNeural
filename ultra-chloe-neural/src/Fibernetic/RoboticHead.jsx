import {useLoader} from '@react-three/fiber';
import {useEffect} from 'react';
import {BufferAttribute, Color} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './Enigma2.css';

export function RoboticHead(){

    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/mind.glb");

    useEffect(()=>{
        if(gltf) return;

        let mesh = gltf.scene.children[0];
        var uvs = mesh.geometry.attributes.uv.array;
        mesh.geometry.setAttribute('uv2', new BufferAttribute(uvs, 2));

        mesh.material.lightMap = mesh.material.map;
        mesh.material.lightMapIntensity = 400;
        mesh.material.color = new Color(0.04, 0.06, 0.1);
    }, [gltf]);

    return(
        <>
            <mesh className='engine'>
            <primitive object={gltf.scene}/>
            </mesh>


            <mesh position={[0, 100, 0]}>
                <planeGeometry args={[1000,1000]}/>
                <meshStandardMaterial color="white" transparent opacity={0.3}/>
            </mesh>
        </>
    )
}

function Text({text, position}){

    // const font = useLoader(FontLoader, '/helvetiker_regular.typeface.json');

    return(
        <mesh position={position}>
            <textGeometry attach="geometry" args={[text, {size: 50.5, height: 20.1}]}/>
            <meshStandardMaterial attach="material" color="white"/>
        </mesh>
    )
}