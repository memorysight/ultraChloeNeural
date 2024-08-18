import React, { useEffect, useState } from "react";
import AudioVisualizer from "./AudioVisualizer";
import "./MicVisualizer.css";

const AudioAnalyzer = (props) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const source = audioContext.createMediaStreamSource(props.audio);

    source.connect(analyser);

    const tick = () => {
      analyser.getByteTimeDomainData(dataArray);
      setAudioData(dataArray);
      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(tick);
      analyser.disconnect();
      source.disconnect();
    };
  }, [props.audio]);

  return <AudioVisualizer audioData={audioData} />;
};

export default AudioAnalyzer;
