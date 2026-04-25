"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});
export default function FlowField() {
  const points: any[] = [];
  const mult = 0.005;
  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(0);
    p5.angleMode(p5.DEGREES);
    p5.noiseDetail(1);
    const density = 30;
    const space = p5.width / density;
    for (let x = 0; x < p5.width; x += space) {
      for (let y = 0; y < p5.height; y += space) {
        const p = p5.createVector(x + p5.random(-10, 10), y + p5.random(-10, 10));
        points.push(p);
      }
    }
  };
  const draw = (p5: any) => {
    p5.noStroke();
    p5.fill(0, 5); 
    p5.rect(0, 0, p5.width, p5.height);
    for (let i = 0; i < points.length; i++) {
      const r = p5.map(points[i].x, 0, p5.width, 50, 255);
      const g = p5.map(points[i].y, 0, p5.height, 50, 255);
      const b = p5.map(p5.dist(p5.width/2, p5.height/2, points[i].x, points[i].y), 0, 500, 255, 50);
      p5.fill(0, 243, 255, 50); 
      const angle = p5.map(p5.noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720);
      points[i].add(p5.createVector(p5.cos(angle), p5.sin(angle)));
      if (p5.dist(p5.width / 2, p5.height / 2, points[i].x, points[i].y) < 600) {
        p5.ellipse(points[i].x, points[i].y, 1);
      }
      if (points[i].x < 0 || points[i].x > p5.width || points[i].y < 0 || points[i].y > p5.height) {
        points[i].x = p5.random(p5.width);
        points[i].y = p5.random(p5.height);
      }
    }
  };
  return <Sketch setup={setup} draw={draw} className="absolute inset-0 pointer-events-none opacity-30" />;
}
