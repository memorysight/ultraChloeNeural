import React from "react";
import "./MicVisualizer.css";

const AudioVisualizer = (props) => {
  const canvas = React.useRef(null);

  React.useEffect(() => {
    const { audioData } = props;
    const ctx = canvas.current.getContext("2d");
    const height = canvas.current.height;
    const width = canvas.current.width;
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#161743";

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      ctx.lineTo(x, y);
      x += sliceWidth;
    }
    ctx.lineTo(x, height / 2);
    ctx.stroke();
  }, [props.audioData]);

  return <canvas width="50" height="50" ref={canvas} />;
};

export default AudioVisualizer;
