export function Text({text, position}){
    // const font = useLoader(FontLoader, '/helvetiker_regular.typeface.json');

    return(
        <mesh position={position}>
            <textGeometry attach="geometry" args={[text, {size: 50.5, height: 20.1}]}/>

            {/* <Text text="Hello" position={[11, 3, 11]}/> */}
            <meshStandardMaterial attach="material" color="white"/>
        </mesh>
    )
}