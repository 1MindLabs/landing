import { motion } from "framer-motion";
import React from "react";

const TOTAL_PATHS = 36;
const BASE_DURATION = 30;
const DURATION_INCREMENT = 0.5;

const FloatingPaths: React.FC<{ position: number }> = ({ position }) => {
  const paths = Array.from({ length: TOTAL_PATHS }, (_, i) => {
    const spacing = 5;
    const offset = i * spacing * position;
    const verticalOffset = i * spacing;

    const progress = i / (TOTAL_PATHS - 1);

    return {
      id: i,
      d: `M${-380 + offset} ${-189 - verticalOffset}C${-380 + offset} ${-189 - verticalOffset} ${-312 + offset} ${216 - verticalOffset} ${152 + offset} ${343 - verticalOffset}C${616 + offset} ${470 - verticalOffset} ${684 + offset} ${875 - verticalOffset} ${684 + offset} ${875 - verticalOffset}`,
      width: 0.3 + progress * 0.9,
      opacity: 0.04 + progress * 0.21,
      duration: BASE_DURATION + i * DURATION_INCREMENT,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-neutral-400"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, pathOffset: 0.1 }}
            animate={{
              pathLength: [0.3, 1, 1, 0, 0.3],
              pathOffset: [0.1, 0, 1, 1, 0.1],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-neutral-950">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
};

export default Background;
