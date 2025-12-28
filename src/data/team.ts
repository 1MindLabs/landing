import { TeamMember } from "../types";

const teamData = [
  { name: "Areeb", role: "DevOps" },
  { name: "Shivansh", role: "Agentic AI" },
  { name: "Rishi", role: "App Dev" },
  { name: "Avantika", role: "Backend" },
  { name: "Yuktha", role: "AI/ML" },
  { name: "Anish", role: "CyberSec" },
  { name: "Ravikant", role: "AI/ML" },
  { name: "Hema", role: "Product" },
  { name: "Thendral", role: "Backend" },
  { name: "Alfiya", role: "Fullstack" },
  { name: "Hamad", role: "Web3" },
  { name: "Bhavana", role: "Backend" },
  { name: "Amar", role: "Analytics" },
  { name: "Arush", role: "Analytics" },
  { name: "Devansh", role: "Frontend" },
  { name: "Somnath", role: "Backend" },
  { name: "Shashwat", role: "Frontend" },
  { name: "Shirish", role: "Fullstack" },
  { name: "Vishesh", role: "AI/ML" },
  { name: "Mohit", role: "Fullstack" },
  { name: "Akash", role: "DevOps" },
  { name: "Abhyuday", role: "MLOps" },
];

export const team: TeamMember[] = teamData.map((member, index) => ({
  id: index + 1,
  name: member.name,
  role: member.role,
  imageUrl: `https://picsum.photos/seed/${member.name}/400`,
  linkedinUrl: "#",
  twitterUrl: "#",
  email: "mailto:hello@1mindlabs.org",
}));
