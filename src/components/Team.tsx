import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, X } from "lucide-react";
import React, { useState } from "react";
import { team } from "../data/team";
import { TeamMember } from "../types";

const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const navigateToNext = () => {
    if (!selectedMember) return;
    const currentIndex = team.findIndex((m) => m.id === selectedMember.id);
    if (currentIndex >= team.length - 1) return;
    setSelectedMember(team[currentIndex + 1]);
  };

  const navigateToPrev = () => {
    if (!selectedMember) return;
    const currentIndex = team.findIndex((m) => m.id === selectedMember.id);
    if (currentIndex <= 0) return;
    setSelectedMember(team[currentIndex - 1]);
  };

  return (
    <section className="container mx-auto max-w-5xl px-6 md:px-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 border-b border-neutral-900 pb-6"
      >
        <h2 className="text-3xl font-medium tracking-tight text-white">
          The Team
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Builders, researchers, and creators.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:gap-y-12">
        {team.map((member, index) => (
          <TeamCard
            key={member.id}
            member={member}
            index={index}
            onClick={() => setSelectedMember(member)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            onNext={navigateToNext}
            onPrev={navigateToPrev}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const TeamCard: React.FC<{
  member: TeamMember;
  index: number;
  onClick: () => void;
}> = ({ member, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.03, 0.8),
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      className="group flex flex-col items-center text-center cursor-pointer"
    >
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900 transition-transform duration-300 group-hover:scale-105 group-hover:border-neutral-600">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-base font-medium text-white transition-colors group-hover:text-neutral-200">
        {member.name}
      </h3>
      <p className="text-xs uppercase tracking-wider text-neutral-500 group-hover:text-neutral-400">
        {member.role}
      </p>
    </motion.div>
  );
};

const TeamModal: React.FC<{
  member: TeamMember;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ member, onClose, onNext, onPrev }) => {
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
        className="relative w-full max-w-sm overflow-hidden rounded-xl border border-neutral-800 bg-[#0A0A0A] p-8 shadow-2xl text-center"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full p-2 text-neutral-400 transition-colors hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="h-full w-full object-cover grayscale-0"
          />
        </div>

        <h3 className="text-2xl font-semibold text-white">{member.name}</h3>
        <p className="mt-2 text-sm font-medium uppercase tracking-widest text-blue-500">
          {member.role}
        </p>

        <div className="mt-8 flex justify-center gap-6">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 transition-colors hover:text-white hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
          )}
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 transition-colors hover:text-white hover:scale-110"
            >
              <Github size={20} />
            </a>
          )}
          {member.email && (
            <a
              href={member.email}
              className="text-neutral-500 transition-colors hover:text-white hover:scale-110"
            >
              <Mail size={20} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Team;
