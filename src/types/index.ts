export interface Project {
  title: string;
  description: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  builtBy?: string[];
  hackathon?: string;
  date?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
}
