import { useLoader, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';

export function RoboticHead({ isSpeaking = false }) {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + 'models/ZoeJenCompleteFBX.glb'
    );

    const mixerRef = useRef(null);
    const jawBoneRef = useRef(null);
    const idleBoneRef = useRef(null); // spine/chest/head for breathing
    const idleBaseRef = useRef({ posY: null, rotZ: null }); // remember baseline

    const upperArmsRef = useRef([]); // left/right upper arms

    const talkStateRef = useRef({
        time: 0,
        nextEvent: 0,
        targetOpen: 0,
        currentOpen: 0,
    });

    // setup: animations (if any), find bones
    useEffect(() => {
        const model = gltf.scene;
        const animations = gltf.animations;

        // if you ever add real animations later, they'll still play
        if (model && animations && animations.length && !mixerRef.current) {
            const mixer = new AnimationMixer(model);
            const action = mixer.clipAction(animations[0]);
            action.play();
            mixerRef.current = mixer;
        }

        let foundJaw = null;
        let fallbackHead = null;
        let idleBone = null;
        const upperArms = [];

        model.traverse((obj) => {
            if (!obj.isBone) return;

            const lower = obj.name.toLowerCase();
            // console.log('BONE:', obj.name);

            // head fallback for jaw & idle
            if (!fallbackHead && lower.includes('head')) {
                fallbackHead = obj;
            }

            // jaw detection
            if (
                lower.includes('jaw') ||
                lower.includes('lowerjaw') ||
                lower.includes('belowjaw')
            ) {
                if (!foundJaw) foundJaw = obj;
            }

            // spine/chest for breathing/sway
            if (!idleBone && (lower.includes('chest') || lower.includes('spine'))) {
                idleBone = obj;
            }

            // detect upper arms (ZoeJen specific)
            if (lower.includes('shldrbend')) {
                // remember original rotation so we pose *around* the bind pose
                obj.userData.baseZ = obj.rotation.z;
                upperArms.push(obj);
            }
        });

        if (!foundJaw && fallbackHead) {
            foundJaw = fallbackHead;
            console.warn(
                'Jaw bone not found explicitly, using head as jaw fallback:',
                fallbackHead.name
            );
        }

        if (!idleBone && fallbackHead) {
            idleBone = fallbackHead;
            console.warn(
                'Idle bone not found (spine/chest), using head as idle fallback:',
                fallbackHead.name
            );
        }

        jawBoneRef.current = foundJaw;
        idleBoneRef.current = idleBone;
        upperArmsRef.current = upperArms;

        if (foundJaw) {
            console.log('Using bone for mouth motion:', foundJaw.name);
        } else {
            console.warn('No jaw/head bone found for mouth motion.');
        }

        if (idleBone) {
            console.log('Using bone for idle breathing/sway:', idleBone.name);
            idleBaseRef.current.posY = idleBone.position.y;
            idleBaseRef.current.rotZ = idleBone.rotation.z ?? 0;
        }

        if (upperArms.length) {
            console.log(
                'Upper arms detected for idle pose:',
                upperArms.map((b) => b.name)
            );
        } else {
            console.warn('No upper arm bones detected (names may differ).');
        }

    }, [gltf]);

    // simple debug – fine to keep or remove
    useEffect(() => {
        console.log('RoboticHead isSpeaking =', isSpeaking);
    }, [isSpeaking]);

    useFrame((state, delta) => {
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }

        const jaw = jawBoneRef.current;
        const idleBone = idleBoneRef.current;
        const upperArms = upperArmsRef.current;

        const talk = talkStateRef.current;
        const tGlobal = state.clock.getElapsedTime();

        // 🌬️ IDLE BREATHING + SWAY (always on, speaking or not)
        if (idleBone && idleBaseRef.current.posY !== null) {
            const baseY = idleBaseRef.current.posY;
            const baseRotZ = idleBaseRef.current.rotZ ?? 0;

            const breathSpeed = 0.8; // breaths per second-ish
            const breathAmp = 0.015; // how much chest moves up/down
            const swaySpeed = 0.4; // slower side sway
            const swayAmp = 0.03; // how much she tilts side to side

            const breath = Math.sin(tGlobal * breathSpeed * Math.PI * 2); // -1 → 1
            const sway = Math.sin(tGlobal * swaySpeed * Math.PI * 2); // -1 → 1

            idleBone.position.y = baseY + breathAmp * breath;
            idleBone.rotation.z = baseRotZ + swayAmp * sway;
        }

        // 🌿 IDLE POSTURE: gently lower each upper arm out of T-pose
        if (upperArms && upperArms.length) {
            const poseSpeed = 6; // how fast she settles into pose

            upperArms.forEach((arm) => {
                const name = arm.name.toLowerCase();
                const baseZ = arm.userData.baseZ ?? 0;

                // 👉 per-bone offsets (tweak to taste)
                let desiredZ = baseZ;

                if (name === 'lshldrbend') {
                    // left arm: was almost perfect but too close to pelvis → slightly less rotation
                    desiredZ = baseZ - 1.32;   // try -0.4 first
                } else if (name === 'rshldrbend') {
                    // right arm: still at T → give it a clear downward offset
                    desiredZ = baseZ + 1.33;   // mirror direction; swap sign if wrong
                }

                const currentZ = arm.rotation.z;
                const k = 1 - Math.exp(-poseSpeed * delta);
                arm.rotation.z = currentZ + (desiredZ - currentZ) * k;
            });
        }


        // 🗣️ JAW / “SPEECH” LOGIC
        if (jaw) {
            if (isSpeaking) {
                talk.time += delta;

                if (talk.time >= talk.nextEvent) {
                    const syllableDuration = 0.08 + Math.random() * 0.18; // 80–260ms

                    if (Math.random() < 0.25) {
                        talk.targetOpen = 0; // little pause
                    } else {
                        const r = Math.random();
                        talk.targetOpen = 0.25 + 0.5 * r; // 0.25–0.75
                    }

                    talk.nextEvent = talk.time + syllableDuration;
                }

                const lerpSpeed = 18;
                const k = 1 - Math.exp(-lerpSpeed * delta);
                talk.currentOpen =
                    talk.currentOpen + (talk.targetOpen - talk.currentOpen) * k;
            } else {
                talk.targetOpen = 0;
                const relaxSpeed = 10;
                const k = 1 - Math.exp(-relaxSpeed * delta);
                talk.currentOpen = talk.currentOpen + (0 - talk.currentOpen) * k;

                talk.time = 0;
                talk.nextEvent = 0;
            }

            const maxOpen = 0.2;
            const baseIdle = 0.02;
            const openAmount = baseIdle + talk.currentOpen * (1 - baseIdle);

            // use whichever axis looked best for your rig
            jaw.rotation.x = -maxOpen * openAmount;
            // or: jaw.rotation.z = -maxOpen * openAmount;
        }
    });

    return <primitive object={gltf.scene} scale={[7, 7, 7]} />;
}
