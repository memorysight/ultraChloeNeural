import { Canvas } from '@react-three/fiber';
import { SceneContainer } from './SceneContainer';
import './Enigma2.css';

function Enigma2() {
  return (
      <div className="engine">   {/* <-- THIS is the missing parent container */}
        <Canvas>
          <SceneContainer />
        </Canvas>
      </div>
  );
}

export default Enigma2;
