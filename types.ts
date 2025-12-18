export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  type: "IoT" | "Web" | "Automation";
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  logo?: string; // URL placeholder
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    summary: string;
    location: string;
    email: string;
    socials: {
      linkedin?: string;
      github?: string;
    };
  };
  stats: {
    yearsExperience: number;
    bugsTracked: number;
    projectsCompleted: number;
  };
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
}