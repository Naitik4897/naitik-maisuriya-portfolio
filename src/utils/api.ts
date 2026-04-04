/**
 * API Utility - Native Fetch API Wrapper
 * 
 * This utility provides typed wrapper functions for all API endpoints
 * using the native browser Fetch API instead of Axios.
 * All functions are fully typed with TypeScript for request and response bodies.
 */

import type {
  Project,
  CreateProjectData,
  Skill,
  CreateSkillData,
  Experience,
  CreateExperienceData,
  Education,
  CreateEducationData,
  Certification,
  CreateCertificationData,
  Testimonial,
  CreateTestimonialData,
  About,
  UpdateAboutData,
  ContactFormData,
  Lead,
  UpdateLeadData,
  LoginCredentials,
  AuthResponse,
  RegisterData,
  ApiError,
} from '@/types';

// Get base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// ========================================
// Helper Functions
// ========================================

/**
 * Get JWT token from localStorage
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Set JWT token to localStorage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

/**
 * Remove JWT token from localStorage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    // Parse JSON response
    const data = await response.json();

    // Handle HTTP errors
    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.error || error.message || 'API request failed');
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

// ========================================
// Project API
// ========================================

export const getProjects = async (): Promise<Project[]> => {
  return fetchApi<Project[]>('/api/projects');
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  return fetchApi<Project[]>('/api/projects/featured');
};

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  return fetchApi<Project>(`/api/projects/${slug}`);
};

export const createProject = async (data: CreateProjectData): Promise<{ message: string; id: number }> => {
  return fetchApi('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateProject = async (id: number, data: CreateProjectData): Promise<{ message: string }> => {
  return fetchApi(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteProject = async (id: number): Promise<{ message: string }> => {
  return fetchApi(`/api/projects/${id}`, {
    method: 'DELETE',
  });
};

// ========================================
// Skills API
// ========================================

export const getSkills = async (): Promise<Skill[]> => {
  return fetchApi<Skill[]>('/api/skills');
};

export const createSkill = async (data: CreateSkillData): Promise<{ message: string; id: number }> => {
  return fetchApi('/api/skills', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateSkill = async (id: number, data: CreateSkillData): Promise<{ message: string }> => {
  return fetchApi(`/api/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteSkill = async (id: number): Promise<{ message: string }> => {
  return fetchApi(`/api/skills/${id}`, {
    method: 'DELETE',
  });
};

// ========================================
// Experience API
// ========================================

export const getExperience = async (): Promise<Experience[]> => {
  return fetchApi<Experience[]>('/api/experience');
};

export const createExperience = async (data: CreateExperienceData): Promise<{ message: string; id: number }> => {
  return fetchApi('/api/experience', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateExperience = async (id: number, data: CreateExperienceData): Promise<{ message: string }> => {
  return fetchApi(`/api/experience/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteExperience = async (id: number): Promise<{ message: string }> => {
  return fetchApi(`/api/experience/${id}`, {
    method: 'DELETE',
  });
};

// ========================================
// Education API
// ========================================

export const getEducation = async (): Promise<Education[]> => {
  return fetchApi<Education[]>('/api/education');
};

export const createEducation = async (data: CreateEducationData): Promise<{ message: string; id: number }> => {
  return fetchApi('/api/education', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateEducation = async (id: number, data: CreateEducationData): Promise<{ message: string }> => {
  return fetchApi(`/api/education/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteEducation = async (id: number): Promise<{ message: string }> => {
  return fetchApi(`/api/education/${id}`, {
    method: 'DELETE',
  });
};

// ========================================
// Certifications API
// ========================================

export const getCertifications = async (): Promise<Certification[]> => {
  return fetchApi<Certification[]>('/api/certifications');
};

export const createCertification = async (data: CreateCertificationData): Promise<{ message: string; id: number }> => {
  return fetchApi('/api/certifications', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateCertification = async (id: number, data: CreateCertificationData): Promise<{ message: string }> => {
  return fetchApi(`/api/certifications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteCertification = async (id: number): Promise<{ message: string }> => {
  return fetchApi(`/api/certifications/${id}`, {
    method: 'DELETE',
  });
};

// ========================================
// Testimonials API
// ========================================

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return fetchApi<Testimonial[]>('/api/testimonials');
};

export const createTestimonial = async (data: CreateTestimonialData): Promise<{ message: string; id: number }> => {
  return fetchApi('/api/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateTestimonial = async (id: number, data: CreateTestimonialData): Promise<{ message: string }> => {
  return fetchApi(`/api/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteTestimonial = async (id: number): Promise<{ message: string }> => {
  return fetchApi(`/api/testimonials/${id}`, {
    method: 'DELETE',
  });
};

// ========================================
// About API
// ========================================

export const getAbout = async (): Promise<About> => {
  return fetchApi<About>('/api/about');
};

export const updateAbout = async (data: UpdateAboutData): Promise<{ message: string }> => {
  return fetchApi('/api/about', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// ========================================
// Contact API
// ========================================

export const submitContact = async (data: ContactFormData): Promise<{ message: string; leadId: number }> => {
  return fetchApi('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// ========================================
// Leads API (Admin Only)
// ========================================

export const getLeads = async (): Promise<Lead[]> => {
  return fetchApi<Lead[]>('/api/leads');
};

export const updateLeadStatus = async (id: number, data: UpdateLeadData): Promise<{ message: string }> => {
  return fetchApi(`/api/leads/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// ========================================
// Auth API
// ========================================

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetchApi<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  // Store token in localStorage
  if (response.token) {
    setAuthToken(response.token);
  }
  
  return response;
};

export const register = async (data: RegisterData): Promise<{ message: string }> => {
  return fetchApi('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const logout = (): void => {
  removeAuthToken();
};
