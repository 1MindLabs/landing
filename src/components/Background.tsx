import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      const lines = 8;
      const verticalSpread = height * 0.6;
      const startY = (height - verticalSpread) / 2;
      const stepY = verticalSpread / lines;

      ctx.lineWidth = 1;

      for (let i = 0; i < lines; i++) {
        const yBase = startY + i * stepY;

        ctx.beginPath();

        const opacity = ((Math.sin(time * 0.5 + i) + 1) / 2) * 0.15 + 0.05;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;

        for (let x = 0; x <= width; x += 5) {
          const y1 = Math.sin(x * 0.002 + time * 0.5 + i * 0.5) * 40;
          const y2 = Math.sin(x * 0.005 - time * 0.3 + i * 2) * 15;
          const y3 = Math.sin(x * 0.01 + time * 1) * 5;

          const yOffset = y1 + y2 + y3;

          if (x === 0) {
            ctx.moveTo(x, yBase + yOffset);
          } else {
            ctx.lineTo(x, yBase + yOffset);
          }
        }
        ctx.stroke();
      }

      for (let i = 0; i < 5; i++) {
        const particleTime = (time * 0.8 + i * 200) % width;
        const lineIndex = i % lines;
        const yBase = startY + lineIndex * stepY;
        const x = particleTime;

        const y1 = Math.sin(x * 0.002 + time * 0.5 + lineIndex * 0.5) * 40;
        const y2 = Math.sin(x * 0.005 - time * 0.3 + lineIndex * 2) * 15;
        const y3 = Math.sin(x * 0.01 + time * 1) * 5;

        const y = yBase + y1 + y2 + y3;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 - (Math.abs(x - width / 2) / (width / 2)) * 0.3})`;
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.005;
      animationFrameId = requestAnimationFrame(drawWaves);
    };

    window.addEventListener("resize", resize);
    resize();
    drawWaves();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#000000]" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-blue-900/10 blur-[100px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[120px]"
      />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
    </div>
  );
};

export default Background;
