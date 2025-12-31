export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  builtBy?: string[];
  hackathon?: string;
  date?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
}
