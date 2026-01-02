import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import React from "react";
import Background from "./components/Background";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Team from "./components/Team";

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-950">
      <Background />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-8 right-8 z-50 flex gap-6"
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
        <main className="flex flex-col gap-24 pb-24 pt-24 md:gap-32 md:pb-32 md:pt-32">
          <Hero />
          <Projects />
          <Team />
        </main>
      </div>
    </div>
  );
};

export default App;
