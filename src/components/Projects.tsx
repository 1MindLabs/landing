import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Github,
  Globe,
  Trophy,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { projects } from "../data/projects";
import { Project } from "../types";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleProjects = isExpanded ? projects : projects.slice(0, 4);

  const navigateToNext = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex >= projects.length - 1) return;
    setSelectedProject(projects[currentIndex + 1]);
  };

  const navigateToPrev = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex <= 0) return;
    setSelectedProject(projects[currentIndex - 1]);
  };

  return (
    <section className="w-full">
      <div className="container mx-auto max-w-5xl px-6 md:px-12">
        <div className="mb-12 border-b border-neutral-900 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl font-medium tracking-tight text-white">
              From the Lab
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Hackathon wins & experimental projects.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 z-10 flex h-[80px] flex-col items-center justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent pb-8 pointer-events-none"
              >
                <button
                  onClick={() => setIsExpanded(true)}
                  className="group flex flex-col items-center gap-2 text-sm font-medium text-neutral-300 transition-colors hover:text-white pointer-events-auto"
                >
                  <span className="drop-shadow-md">View all</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/60 backdrop-blur-md transition-all group-hover:border-neutral-400 group-hover:bg-neutral-800 group-hover:scale-110">
                    <ChevronDown
                      size={20}
                      className="transition-transform group-hover:translate-y-0.5"
                    />
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={navigateToNext}
            onPrev={navigateToPrev}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onClick: () => void;
}> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      className="group cursor-pointer relative z-10"
    >
      <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-neutral-800/50 bg-neutral-950">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-medium text-neutral-200 transition-colors group-hover:text-white">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 transition-colors group-hover:text-neutral-400">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ project, onClose, onNext, onPrev }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-neutral-800 bg-[#0A0A0A] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full p-2 text-neutral-400 transition-colors hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="relative h-56 w-full md:h-auto md:w-[45%]">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0A0A0A]" />
          </div>

          <div className="flex flex-1 flex-col p-6 md:p-8">
            <div className="mb-8">
              <h3 className="text-3xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                {project.description}
              </p>
            </div>

            <div className="mt-auto rounded-lg border border-neutral-800 bg-neutral-900/30 p-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                {project.builtBy && (
                  <div className="col-span-2">
                    <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                      <Users size={12} /> Team
                    </span>
                    <div className="text-sm text-neutral-200">
                      {project.builtBy.join(", ")}
                    </div>
                  </div>
                )}
                {project.hackathon && (
                  <div>
                    <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                      <Trophy size={12} /> Event
                    </span>
                    <div className="text-sm text-neutral-200">
                      {project.hackathon}
                    </div>
                  </div>
                )}
                {project.date && (
                  <div>
                    <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                      <Calendar size={12} /> Date
                    </span>
                    <div className="text-sm text-neutral-200">
                      {project.date}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-3 border-t border-neutral-800 pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="flex flex-1 items-center justify-center gap-2 rounded bg-neutral-800 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-700"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="flex flex-1 items-center justify-center gap-2 rounded bg-white py-2 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
                  >
                    <Globe size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
