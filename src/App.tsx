import { Mail } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import Background from "./components/Background";
import { Github } from "./components/BrandIcons";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Team from "./components/Team";
import { EASE_OUT_EXPO } from "./lib/motion";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <Background />

        <div className="relative z-10">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: EASE_OUT_EXPO }}
            className="absolute top-6 right-6 z-50 flex gap-2"
          >
            <a
              href="https://github.com/1MindLabs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="1Mind Labs on GitHub"
              className="rounded-full p-2 text-neutral-500 transition-colors hover:text-white"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:contact@1mindlabs.org"
              aria-label="Email 1Mind Labs"
              className="rounded-full p-2 text-neutral-500 transition-colors hover:text-white"
            >
              <Mail size={20} />
            </a>
          </motion.header>

          <main className="flex flex-col gap-24 pt-24 pb-24 md:gap-32 md:pt-32 md:pb-32">
            <Hero />
            <Projects />
            <Team />
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
