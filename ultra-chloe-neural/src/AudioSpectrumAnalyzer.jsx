import React, { useEffect, useRef } from 'react';
import { createRef } from 'react';
import * as d3 from 'd3';

const WIDTH = 45;
const HEIGHT = 50;
const MARGIN = { top: 5, right: 5, bottom: 5, left: 5 };

const AudioSpectrumAnalyzer = () => {
  const svgRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const svg = d3
      .select(svgRef.current)
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    const canvas = d3
      .select(canvasRef.current)
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      const xScale = d3
        .scaleLinear()
        .domain([0, bufferLength])
        .range([0, WIDTH]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 255])
        .range([HEIGHT, 0]);

      const line = d3
        .line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d));

      svg
        .selectAll('path')
        .data([dataArray])
        .join('path')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5);
    };

    draw();
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default AudioSpectrumAnalyzer;