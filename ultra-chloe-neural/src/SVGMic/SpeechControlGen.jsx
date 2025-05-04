import React, { useState } from 'react';
import '../Neural.css';

const SpeechControlGen = ({ onStart, onStop, onReset }) => {
    const [currentState, setCurrentState] = useState('start');

    const handleClick = () => {
        switch (currentState) {
            case 'start':
                onStart();
                setCurrentState('recording');
                break;
            case 'recording':
                onStop();
                setCurrentState('stop');
                break;
            case 'stop':
                onReset();
                setCurrentState('start');
                break;
            default:
                break;
        }
    };

    return (
        <div className="speech-control" onClick={handleClick}>
            <svg viewBox="0 0 1920 1080" width="100" height="100">
                {/* Start State */}
                <g id='start' display={currentState === 'start' ? 'block' : 'none'}>
                    <polygon className="st1" points="853.5,196.39 1108.03,351.5 853.5,503.62" />
                    <path d="M854,197.28l126.48,77.07l126.59,77.14l-126.58,75.65L854,502.74V197.28 M853,195.5c0,103,0,206,0,309 c85.33-51,170.67-102,256-153C1023.67,299.5,938.33,247.5,853,195.5L853,195.5z"/>
                </g>

                {/* Recording State */}
                <g id='recording' display={currentState === 'recording' ? 'block' : 'none'}>
                    <polygon style="fill:url(#SVGID_00000129165500743024031500000006439410937498447527_);" points="594.97,348.5 849.5,196.38 849.5,503.61" />
                    <path d="M849,197.26l0,305.46l-96.14-58.58l-156.93-95.63l150.32-89.84L849,197.26 M850,195.5c-85.33,51-170.67,102-256,153 c85.33,52,170.67,104,256,156C850,401.5,850,298.5,850,195.5L850,195.5z"/>
                </g>

                {/* Stop State */}
                <g id='stop' display={currentState === 'stop' ? 'block' : 'none'}>
                    <path className="st3" d="M857,409.5c-47.7,0-86.5-26.69-86.5-59.5s38.8-59.5,86.5-59.5s86.5,26.69,86.5,59.5S904.7,409.5,857,409.5z"/>
                    <path d="M857,291c47.42,0,86,26.47,86,59s-38.58,59-86,59s-86-26.47-86-59S809.58,291,857,291 M857,290c-48.05,0-87,26.86-87,60 s38.95,60,87,60s87-26.86,87-60S905.05,290,857,290L857,290z"/>
                </g>
            </svg>
        </div>
    );
};

export default SpeechControlGen;