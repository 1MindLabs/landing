import { Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { team } from "../data/team";
import { useSelection } from "../hooks/useSelection";
import { EASE_OUT_EXPO } from "../lib/motion";
import type { TeamMember } from "../types";
import { Github, Linkedin } from "./BrandIcons";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";

export default function Team() {
  const { selected, select, close, next, prev } = useSelection(team);

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="mx-auto w-full max-w-5xl px-6 md:px-12"
    >
      <SectionHeading
        id="team-title"
        title="The Team"
        subtitle="Builders, researchers, and creators."
      />

      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:gap-y-12">
        {team.map((member, index) => (
          <TeamCard
            key={member.name}
            member={member}
            index={index}
            onSelect={() => select(index)}
          />
        ))}
      </ul>

      <AnimatePresence>
        {selected && (
          <TeamModal
            member={selected}
            onClose={close}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
  onSelect: () => void;
}

function TeamCard({ member, index, onSelect }: TeamCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.05,
        ease: EASE_OUT_EXPO,
      }}
      className="group relative flex flex-col items-center rounded-xl text-center outline-offset-4 outline-neutral-300 has-focus-visible:outline-2"
    >
      <div className="relative mb-4 size-24 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900 transition-transform duration-300 group-hover:scale-105">
        <img
          src={member.imageUrl}
          alt=""
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
      <h3 className="text-base font-medium text-neutral-200 transition-colors group-hover:text-white">
        <button
          type="button"
          onClick={onSelect}
          className="outline-hidden after:absolute after:inset-0"
        >
          {member.name}
        </button>
      </h3>
      <p className="text-xs tracking-wider text-neutral-400 uppercase transition-colors group-hover:text-neutral-300">
        {member.role}
      </p>
    </motion.li>
  );
}

interface TeamModalProps {
  member: TeamMember;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function TeamModal({ member, onClose, onNext, onPrev }: TeamModalProps) {
  const titleId = useId();

  const links = [
    {
      href: member.linkedinUrl,
      label: `${member.name} on LinkedIn`,
      Icon: Linkedin,
      isExternal: true,
    },
    {
      href: member.githubUrl,
      label: `${member.name} on GitHub`,
      Icon: Github,
      isExternal: true,
    },
    {
      href: member.email && `mailto:${member.email}`,
      label: `Email ${member.name}`,
      Icon: Mail,
      isExternal: false,
    },
  ].filter((link) => link.href);

  return (
    <Modal
      titleId={titleId}
      className="max-w-sm p-8 text-center"
      onClose={onClose}
      onNext={onNext}
      onPrev={onPrev}
    >
      <div className="mx-auto mb-6 size-32 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900">
        <img
          src={member.imageUrl}
          alt=""
          width={128}
          height={128}
          className="size-full object-cover"
        />
      </div>

      <h2 id={titleId} className="text-2xl font-semibold text-white">
        {member.name}
      </h2>
      <p className="mt-2 text-sm font-medium tracking-widest text-blue-500 uppercase">
        {member.role}
      </p>

      <ul className="mt-6 flex justify-center gap-2">
        {links.map(({ href, label, Icon, isExternal }) => (
          <li key={label}>
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="block rounded-full p-3 text-neutral-500 transition hover:scale-110 hover:text-white"
            >
              <Icon size={20} />
            </a>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
