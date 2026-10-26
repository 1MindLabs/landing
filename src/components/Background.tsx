import { motion, useReducedMotion } from "motion/react";

const TOTAL_PATHS = 36;
const SPACING = 5;
const BASE_DURATION = 30;
const DURATION_INCREMENT = 0.5;

function createPaths(position: number) {
  return Array.from({ length: TOTAL_PATHS }, (_, i) => {
    const offset = i * SPACING * position;
    const verticalOffset = i * SPACING;
    const progress = i / (TOTAL_PATHS - 1);

    return {
      id: i,
      d: `M${-380 + offset} ${-189 - verticalOffset}C${-380 + offset} ${-189 - verticalOffset} ${-312 + offset} ${216 - verticalOffset} ${152 + offset} ${343 - verticalOffset}C${616 + offset} ${470 - verticalOffset} ${684 + offset} ${875 - verticalOffset} ${684 + offset} ${875 - verticalOffset}`,
      width: 0.3 + progress * 0.9,
      opacity: 0.04 + progress * 0.21,
      duration: BASE_DURATION + i * DURATION_INCREMENT,
    };
  });
}

const PATH_GROUPS = [createPaths(1), createPaths(-1)];

export default function Background() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-neutral-950"
    >
      {PATH_GROUPS.map((paths, groupIndex) => (
        <svg
          key={groupIndex}
          className="absolute inset-0 size-full text-neutral-400"
          viewBox="0 0 696 316"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={path.opacity}
              initial={{ pathLength: 0.3, pathOffset: 0.1 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      pathLength: [0.3, 1, 1, 0, 0.3],
                      pathOffset: [0.1, 0, 1, 1, 0.1],
                    }
              }
              transition={{
                duration: path.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
