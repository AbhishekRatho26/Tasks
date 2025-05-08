// Project Types
export interface FrontendProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveDemoUrl: string;
  githubUrl: string;
  features: string[];
  challenges: string[];
  screenshots: string[];
  createdAt: string;
  updatedAt: string;
}

// Skill Types
export interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

// Profile Types
export interface ProfileInfo {
  name: string;
  title: string;
  avatar: string;
  about: string;
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description?: string;
}

export interface Profile {
  info: ProfileInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}