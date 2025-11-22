// types/content.ts
export interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content?: Record<string, any>;
  isActive?: boolean;
  order?: number;
  [key: string]: any;
}

export interface Project {
  id: string;
  title: string;
  category: string[];
  tags: string[];
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  link: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  startDate?: string;
  endDate?: string;
  budget?: string;
  client?: string;
  team?: string[];
  tasks?: { title: string; status: string }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  image: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular: boolean;
  features: string[];
  notIncluded: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}