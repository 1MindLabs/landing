import { motion, type Variants } from "motion/react";
import { EASE_OUT_EXPO } from "../lib/motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: EASE_OUT_EXPO,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center md:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex max-w-5xl flex-col items-center gap-8"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase"
        >
          2022–2026
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-semibold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          1Mind{" "}
          <span className="inline-block font-light tracking-wide text-neutral-300 italic">
            Labs
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg leading-relaxed font-light text-neutral-400 sm:text-xl md:whitespace-nowrap"
        >
          An umbrella for interdisciplinary hackathon projects!
        </motion.p>
      </motion.div>
    </section>
  );
}
