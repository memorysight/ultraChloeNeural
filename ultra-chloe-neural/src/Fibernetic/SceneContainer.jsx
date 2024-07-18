import { OrbitControls, PerspectiveCamera, Environment} from "@react-three/drei";
import { Suspense } from "react";

// import { FloatingIsland } from "./FloatingIsland";

// import {Virus2} from './Virus2';
// import {Virus1} from './Virus1';
// import {Doctor1} from './Doctor1';
// import {Ship1} from './Ship1';
import { RoboticHead } from './RoboticHead'
import {Text} from './Text';




export function SceneContainer() {

  
  return (
    <Suspense fallback={null}>
      <Environment background={"only"} files={process.env.PUBLIC_URL + "/textures/bg.hdr"} />
      <Environment background={false} files={process.env.PUBLIC_URL + "/textures/envmap.hdr"} />

      <PerspectiveCamera makeDefault fov={50} position={[-1.75, 10.85, 20.35]} />
      <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5}/>


        {/* <FloatingIsland /> */}
        {/* <Virus2 /> */}
       
       {/* <Virus1 /> */}
       <RoboticHead />
       {/* <Text /> */}
       

       {/* <Doctor1 />
        <Ship1 /> */}


     

    </Suspense>
  );
}
