import { Calendar, ChevronDown, Globe, Trophy, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { projects } from "../data/projects";
import { useImageCycle } from "../hooks/useImageCycle";
import { useSelection } from "../hooks/useSelection";
import { EASE_OUT_EXPO } from "../lib/motion";
import type { Project } from "../types";
import { Github } from "./BrandIcons";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";

const INITIAL_PROJECT_COUNT = 4;

export default function Projects() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selected, select, close, next, prev } = useSelection(projects);
  const getImageIndex = useImageCycle(projects);

  const visibleProjects = isExpanded
    ? projects
    : projects.slice(0, INITIAL_PROJECT_COUNT);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto w-full max-w-5xl px-6 md:px-12"
    >
      <SectionHeading
        id="projects-title"
        title="From the Lab"
        subtitle="Hackathon wins & experimental projects."
      />

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            imageIndex={getImageIndex(project)}
            autoFocus={isExpanded && index === INITIAL_PROJECT_COUNT}
            onSelect={() => select(index)}
          />
        ))}
      </ul>

      {!isExpanded && projects.length > INITIAL_PROJECT_COUNT && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 px-5 text-sm font-medium text-neutral-200 backdrop-blur-md transition-colors hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
          >
            View all projects
            <span className="text-neutral-400">({projects.length})</span>
            <ChevronDown
              size={16}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </button>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            imageIndex={getImageIndex(selected)}
            onClose={close}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  imageIndex: number;
  autoFocus: boolean;
  onSelect: () => void;
}

function ProjectCard({
  project,
  index,
  imageIndex,
  autoFocus,
  onSelect,
}: ProjectCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.1,
        ease: EASE_OUT_EXPO,
      }}
      className="group relative rounded-xl outline-offset-4 outline-neutral-300 has-focus-visible:outline-2"
    >
      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl border border-neutral-800/50 bg-neutral-950">
        <div className="relative size-full opacity-60 transition-opacity duration-500 group-hover:opacity-90">
          <AnimatePresence initial={false}>
            <motion.img
              key={project.images[imageIndex]}
              src={project.images[imageIndex]}
              alt={project.title}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-medium text-neutral-200 transition-colors group-hover:text-white">
          <button
            type="button"
            autoFocus={autoFocus}
            onClick={onSelect}
            className="text-left outline-hidden after:absolute after:inset-0"
          >
            {project.title}
          </button>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-400 transition-colors group-hover:text-neutral-300">
          {project.description}
        </p>
      </div>
    </motion.li>
  );
}

interface ProjectModalProps {
  project: Project;
  imageIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function ProjectModal({
  project,
  imageIndex,
  onClose,
  onNext,
  onPrev,
}: ProjectModalProps) {
  const titleId = useId();

  return (
    <Modal
      titleId={titleId}
      className="max-w-3xl"
      onClose={onClose}
      onNext={onNext}
      onPrev={onPrev}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-auto md:w-[45%]">
          <AnimatePresence initial={false}>
            <motion.img
              key={project.images[imageIndex]}
              src={project.images[imageIndex]}
              alt={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-neutral-950" />
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="mb-8">
            <h2 id={titleId} className="pr-8 text-3xl font-semibold text-white">
              {project.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {project.description}
            </p>
          </div>

          <div className="mt-auto rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">
            <dl className="grid grid-cols-2 gap-4">
              {project.builtBy && (
                <Detail
                  icon={<Users size={12} />}
                  label="Team"
                  className="col-span-2"
                >
                  {project.builtBy.join(", ")}
                </Detail>
              )}
              {project.hackathon && (
                <Detail icon={<Trophy size={12} />} label="Event">
                  {project.hackathon}
                </Detail>
              )}
              {project.date && (
                <Detail icon={<Calendar size={12} />} label="Date">
                  {project.date}
                </Detail>
              )}
            </dl>

            {(project.githubUrl || project.liveUrl) && (
              <div className="mt-4 flex gap-3 border-t border-neutral-800 pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 px-4 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full border border-white bg-white px-4 text-sm font-medium text-black transition-colors hover:border-neutral-200 hover:bg-neutral-200"
                  >
                    <Globe size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

interface DetailProps {
  icon: ReactNode;
  label: string;
  className?: string;
  children: ReactNode;
}

function Detail({ icon, label, className, children }: DetailProps) {
  return (
    <div className={className}>
      <dt className="mb-1 flex items-center gap-1.5 text-xs font-medium text-neutral-400">
        {icon} {label}
      </dt>
      <dd className="text-sm text-neutral-200">{children}</dd>
    </div>
  );
}
