import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero: React.FC = () => {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center md:px-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed top-8 right-8 z-50 flex gap-6"
      >
        <a
          href="https://github.com/1MindLabs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 transition-colors hover:text-white"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href="mailto:contact@1mindlabs.org"
          className="text-neutral-500 transition-colors hover:text-white"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex max-w-5xl flex-col items-center space-y-8"
      >
        <motion.span
          variants={itemVariants}
          className="text-xs font-mono font-medium tracking-[0.2em] text-neutral-500 uppercase"
        >
          2022-2026
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-semibold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          1Mind{" "}
          <span className="inline-block italic font-light tracking-wide text-neutral-300">
            Labs
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-none text-lg font-light leading-relaxed text-neutral-400 sm:text-xl md:whitespace-nowrap"
        >
          An umbrella for interdisciplinary hackathon projects!
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
