// ========================================
// Project Types
// ========================================
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  techTags: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface CreateProjectData {
  title: string;
  slug: string;
  description: string;
  category: string;
  techTags: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

// ========================================
// Skill Types
// ========================================
export interface Skill {
  id: number;
  name: string;
  logo: string;
  category: string;
  percentage: number;
  displayOrder: number;
}

export interface CreateSkillData {
  name: string;
  logo: string;
  category: string;
  percentage: number;
  displayOrder: number;
}

// ========================================
// Experience Types
// ========================================
export interface Experience {
  id: number;
  company: string;
  logo: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
  techTags: string[];
  displayOrder: number;
}

export interface CreateExperienceData {
  company: string;
  logo: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
  techTags: string[];
  displayOrder: number;
}

// ========================================
// Education Types
// ========================================
export interface Education {
  id: number;
  institution: string;
  logo: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
  location: string;
  subjects: string[];
  displayOrder: number;
}

export interface CreateEducationData {
  institution: string;
  logo: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
  location: string;
  subjects: string[];
  displayOrder: number;
}

// ========================================
// Certification Types
// ========================================
export interface Certification {
  id: number;
  name: string;
  organization: string;
  logo: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verifyUrl: string;
  tier: 'gold' | 'silver';
  displayOrder: number;
}

export interface CreateCertificationData {
  name: string;
  organization: string;
  logo: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verifyUrl: string;
  tier: 'gold' | 'silver';
  displayOrder: number;
}

// ========================================
// Testimonial Types
// ========================================
export interface Testimonial {
  id: number;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatar: string;
  rating: number;
  quote: string;
  displayOrder: number;
}

export interface CreateTestimonialData {
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatar: string;
  rating: number;
  quote: string;
  displayOrder: number;
}

// ========================================
// About Types
// ========================================
export interface About {
  id: number;
  bio: string;
  photo: string;
  city: string;
  hobbies: string;
  tagline: string;
}

export interface UpdateAboutData {
  bio: string;
  photo: string;
  city: string;
  hobbies: string;
  tagline: string;
}

// ========================================
// Contact/Lead Types
// ========================================
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  source?: string;
}

export interface Lead extends ContactFormData {
  id: number;
  status: 'new' | 'contacted' | 'in-progress' | 'converted' | 'closed';
  createdAt: string;
}

export interface UpdateLeadData {
  status: 'new' | 'contacted' | 'in-progress' | 'converted' | 'closed';
}

// ========================================
// Auth Types
// ========================================
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  admin: {
    id: number;
    email: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
}

// ========================================
// API Response Types
// ========================================
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  error: string;
  message?: string;
}
