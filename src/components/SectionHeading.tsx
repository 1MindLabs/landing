import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "../lib/motion";

interface SectionHeadingProps {
  id: string;
  title: string;
  subtitle: string;
}

export default function SectionHeading({
  id,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      className="mb-12 border-b-2 border-neutral-700 pb-6"
    >
      <h2 id={id} className="text-3xl font-medium tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>
    </motion.div>
  );
}
