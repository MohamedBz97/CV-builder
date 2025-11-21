import { v4 as uuidv4 } from 'uuid';

// Aligned with JSON Resume Schema: https://jsonresume.org/schema/

export interface Profile {
  id: string;
  network: string; // e.g., 'LinkedIn', 'GitHub'
  username: string;
  url: string;
}

export interface Location {
    city: string;
    region: string; // State or province
    countryCode?: string;
}

export interface Basics {
  name: string;
  label: string; // Job title
  email: string;
  phone:string;
  url: string; // Website
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Work {
  id: string;
  name: string; // Company
  position: string; // Job title
  url?: string; // Company website
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Volunteer {
    id: string;
    organization: string;
    position: string;
    url?: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  url?: string;
  area: string; // Field of study
  studyType: string; // Degree
  startDate: string;
  endDate: string;
  score?: string; // GPA
  courses: string[];
}

export interface Award {
    id: string;
    title: string;
    date: string;
    awarder: string;
    summary: string;
}

export interface Certificate {
    id: string;
    name: string;
    date: string;
    issuer: string;
    url?: string;
}

export interface Publication {
    id: string;
    name: string;
    publisher: string;
    releaseDate: string;
    url?: string;
    summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // Custom: 1-5 for UI
  keywords: string[];
}

export interface Language {
    id: string;
    language: string;
    fluency: string;
}

export interface Interest {
    id: string;
    name: string;
    keywords: string[];
}

export interface Reference {
    id: string;
    name: string;
    reference: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    highlights: string[];
    keywords: string[];
    url: string;
    startDate: string;
    endDate: string;
}

export interface ResumeSchema {
  basics: Basics;
  work: Work[];
  volunteer: Volunteer[];
  education: Education[];
  awards: Award[];
  certificates: Certificate[];
  publications: Publication[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
}

export type SectionKey = Exclude<keyof ResumeSchema, 'basics'>;

export interface Section {
    id: SectionKey;
    name: string;
    enabled: boolean;
}

export interface ResumeLayout {
    sections: { [key in SectionKey]: Section };
    sectionOrder: SectionKey[];
}


export enum JobApplicationStatus {
  WISHLIST = 'Wishlist',
  APPLIED = 'Applied',
  INTERVIEW = 'Interview',
  OFFER = 'Offer',
  REJECTED = 'Rejected',
}

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobApplicationStatus;
  dateApplied: string;
  notes: string;
  link: string;
}

export enum Template {
  CLASSIC = 'Classic',
  MODERN = 'Modern',
  ONYX = 'Onyx',
  PIKACHU = 'Pikachu',
}

export interface CoverLetterSchema {
  date: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  salutation: string;
  body: string[];
  signoff: string;
}

export interface AtsAnalysisResult {
  missingKeywords: {
    technical: string[];
    softSkills: string[];
    other: string[];
  };
  presentKeywords: string[];
  analysis: string;
}