import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, Download, Code2, Database, Globe, Server, Smartphone, Terminal, Braces, 
  Layers, GitBranch, Cloud, ExternalLink, Github, Mail, Phone, MapPin, Send, 
  Linkedin, Twitter, Clock, MessageSquare, CheckCircle2, Loader2, Calendar, Coffee,
  MessageCircle, Award, TrendingUp, Users, Briefcase, Target, Heart, Rocket, Star,
  ChevronRight, ChevronDown, Wrench, ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocumentMeta } from '@/hooks';
import { getFeaturedProjects } from '@/utils/api';
import type { Project } from '@/types';
import { ScrollReveal } from '@/components/effects';
import { submitContactFormViaEmail } from '@/utils/email';

// React Icons imports
import { 
  DiJavascript1, DiHtml5, DiCss3, DiReact, DiNodejsSmall, DiMongodb, DiPostgresql, DiMysql, DiRedis,
  DiDocker, DiGit, DiGithubBadge
} from 'react-icons/di';
import { FaDatabase, FaAws, FaFigma, FaMobileAlt, FaServer, FaCogs, FaPaintBrush, FaLock, FaWind, FaRocket, FaPlug, FaCode } from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiRedux, SiFramer,
  SiExpress, SiGraphql, SiSocketdotio, SiJsonwebtokens, SiAuth0, SiTwilio,
  SiVercel, SiRailway, SiCloudinary, SiPostman, SiDrizzle, SiResend, SiWebsocket, SiPwa, SiCursor
} from 'react-icons/si';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { BsBullseye, BsUiChecksGrid, BsGithub } from 'react-icons/bs';
import { VscCode, VscAzureDevops } from 'react-icons/vsc';
import { TbBrandOauth } from 'react-icons/tb';

// ============ DATA ============

// Tech stack data organized by category
const techStack = {
  languages: [
    { name: 'JavaScript (ES6+)', Icon: DiJavascript1, color: '#F7DF1E' },
    { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
    { name: 'HTML5', Icon: DiHtml5, color: '#E34F26' },
    { name: 'CSS3', Icon: DiCss3, color: '#1572B6' },
    { name: 'SQL', Icon: FaDatabase, color: '#4479A1' },
  ],
  frontend: [
    { name: 'React.js', Icon: DiReact, color: '#61DAFB' },
    { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'shadcn/ui', Icon: BsUiChecksGrid, color: '#FFFFFF' },
    { name: 'Zustand', Icon: FaCogs, color: '#433D37' },
    { name: 'Redux', Icon: SiRedux, color: '#764ABC' },
    { name: 'Framer Motion', Icon: SiFramer, color: '#FF0055' },
    { name: 'PWA', Icon: FaMobileAlt, color: '#5A0FC8' },
  ],
  backend: [
    { name: 'Node.js', Icon: DiNodejsSmall, color: '#339933' },
    { name: 'Express.js', Icon: SiExpress, color: '#FFFFFF' },
    { name: 'REST APIs', Icon: FaServer, color: '#FF6C37' },
    { name: 'GraphQL', Icon: SiGraphql, color: '#E10098' },
    { name: 'WebSocket', Icon: FaPlug, color: '#010101' },
    { name: 'Socket.io', Icon: SiSocketdotio, color: '#FFFFFF' },
    { name: 'JWT', Icon: SiJsonwebtokens, color: '#FFFFFF' },
    { name: 'OAuth 2.0', Icon: FaLock, color: '#EB5424' },
    { name: 'Bull Queue', Icon: FaRocket, color: '#E53935' },
    { name: 'Twilio', Icon: SiTwilio, color: '#F22F46' },
    { name: 'Resend', Icon: Mail, color: '#000000' },
    { name: 'Drizzle ORM', Icon: FaDatabase, color: '#C5F74F' },
  ],
  databases: [
    { name: 'MongoDB', Icon: DiMongodb, color: '#47A248' },
    { name: 'PostgreSQL', Icon: DiPostgresql, color: '#4169E1' },
    { name: 'MySQL', Icon: DiMysql, color: '#4479A1' },
    { name: 'Redis', Icon: DiRedis, color: '#DC382D' },
  ],
  cloudDevOps: [
    { name: 'Docker', Icon: DiDocker, color: '#2496ED' },
    { name: 'GitHub Actions (CI/CD)', Icon: BsGithub, color: '#2088FF' },
    { name: 'Vercel', Icon: SiVercel, color: '#FFFFFF' },
    { name: 'Railway', Icon: SiRailway, color: '#0B0D0E' },
    { name: 'AWS', Icon: FaAws, color: '#FF9900' },
    { name: 'Azure DevOps', Icon: VscAzureDevops, color: '#0078D7' },
    { name: 'Cloudinary', Icon: SiCloudinary, color: '#3448C5' },
  ],
  tools: [
    { name: 'Git', Icon: DiGit, color: '#F05032' },
    { name: 'GitHub', Icon: DiGithubBadge, color: '#FFFFFF' },
    { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
    { name: 'Figma', Icon: FaFigma, color: '#F24E1E' },
    { name: 'VS Code', Icon: VscCode, color: '#007ACC' },
    { name: 'Antigravity', Icon: FaRocket, color: '#6366F1' },
    { name: 'Cursor', Icon: Code2, color: '#00D4FF' },
    { name: 'Windsurf', Icon: FaWind, color: '#38BDF8' },
  ],
  other: [
    { name: 'System Design', Icon: FaCogs, color: '#9333EA' },
    { name: 'UI/UX Principles', Icon: FaPaintBrush, color: '#EC4899' },
    { name: 'Security', Icon: FaLock, color: '#22C55E' },
  ],
};

// Skills categories for grid display
const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: Code2,
    skills: [
      { name: 'JavaScript (ES6+)', Icon: DiJavascript1, color: '#F7DF1E', level: 95 },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', level: 90 },
      { name: 'HTML5', Icon: DiHtml5, color: '#E34F26', level: 95 },
      { name: 'CSS3', Icon: DiCss3, color: '#1572B6', level: 92 },
      { name: 'SQL', Icon: FaDatabase, color: '#4479A1', level: 85 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Globe,
    skills: [
      { name: 'React.js', Icon: DiReact, color: '#61DAFB', level: 95 },
      { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff', level: 88 },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4', level: 95 },
      { name: 'shadcn/ui', Icon: BsUiChecksGrid, color: '#ffffff', level: 90 },
      { name: 'Zustand', Icon: FaCogs, color: '#433D37', level: 85 },
      { name: 'Redux', Icon: SiRedux, color: '#764ABC', level: 85 },
      { name: 'Framer Motion', Icon: SiFramer, color: '#FF0055', level: 88 },
      { name: 'PWA', Icon: FaMobileAlt, color: '#5A0FC8', level: 80 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', Icon: DiNodejsSmall, color: '#339933', level: 92 },
      { name: 'Express.js', Icon: SiExpress, color: '#ffffff', level: 90 },
      { name: 'REST APIs', Icon: FaServer, color: '#FF6C37', level: 95 },
      { name: 'GraphQL', Icon: SiGraphql, color: '#E10098', level: 82 },
      { name: 'WebSocket', Icon: FaPlug, color: '#ffffff', level: 85 },
      { name: 'Socket.io', Icon: SiSocketdotio, color: '#ffffff', level: 85 },
      { name: 'JWT', Icon: SiJsonwebtokens, color: '#ffffff', level: 90 },
      { name: 'OAuth 2.0', Icon: FaLock, color: '#EB5424', level: 85 },
      { name: 'Bull Queue', Icon: FaRocket, color: '#E53935', level: 78 },
      { name: 'Twilio', Icon: SiTwilio, color: '#F22F46', level: 80 },
      { name: 'Drizzle ORM', Icon: FaDatabase, color: '#C5F74F', level: 82 },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'MongoDB', Icon: DiMongodb, color: '#47A248', level: 88 },
      { name: 'PostgreSQL', Icon: DiPostgresql, color: '#336791', level: 85 },
      { name: 'MySQL', Icon: DiMysql, color: '#4479A1', level: 90 },
      { name: 'Redis', Icon: DiRedis, color: '#DC382D', level: 78 },
    ],
  },
  {
    id: 'devops',
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      { name: 'Docker', Icon: DiDocker, color: '#2496ED', level: 82 },
      { name: 'GitHub Actions (CI/CD)', Icon: BsGithub, color: '#2088FF', level: 85 },
      { name: 'Vercel', Icon: SiVercel, color: '#ffffff', level: 92 },
      { name: 'Railway', Icon: SiRailway, color: '#ffffff', level: 85 },
      { name: 'AWS', Icon: FaAws, color: '#FF9900', level: 75 },
      { name: 'Azure DevOps', Icon: VscAzureDevops, color: '#0078D7', level: 78 },
      { name: 'Cloudinary', Icon: SiCloudinary, color: '#3448C5', level: 88 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', Icon: DiGit, color: '#F05032', level: 95 },
      { name: 'GitHub', Icon: DiGithubBadge, color: '#ffffff', level: 95 },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37', level: 90 },
      { name: 'Figma', Icon: FaFigma, color: '#F24E1E', level: 82 },
      { name: 'VS Code', Icon: VscCode, color: '#007ACC', level: 95 },
      { name: 'Antigravity', Icon: FaRocket, color: '#6366F1', level: 85 },
      { name: 'Cursor', Icon: Code2, color: '#00D4FF', level: 88 },
      { name: 'Windsurf', Icon: FaWind, color: '#38BDF8', level: 85 },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    icon: Layers,
    skills: [
      { name: 'System Design', Icon: FaCogs, color: '#9333EA', level: 80 },
      { name: 'UI/UX Principles', Icon: FaPaintBrush, color: '#EC4899', level: 85 },
      { name: 'Security', Icon: FaLock, color: '#22C55E', level: 82 },
    ],
  },
];

// Flattened tech stack for marquee
const techStackFlat = [
  ...techStack.languages,
  ...techStack.frontend,
  ...techStack.backend,
  ...techStack.databases,
  ...techStack.cloudDevOps,
  ...techStack.tools,
  ...techStack.other,
];

// Services data
const services = [
  {
    icon: Globe,
    title: 'Full-Stack Web Development',
    description: 'End-to-end development of scalable web applications using MERN stack, Next.js, and TypeScript. Building responsive, high-performance UIs with modern frameworks and libraries.',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Redux', 'Zustand'],
  },
  {
    icon: Server,
    title: 'Backend & API Development',
    description: 'Architecting robust RESTful APIs and real-time applications with Node.js, Express.js, and Socket.io. Implementing secure authentication with JWT, OAuth 2.0, and RBAC.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.io', 'JWT', 'OAuth 2.0'],
  },
  {
    icon: FaPaintBrush,
    title: 'Frontend Development',
    description: 'Creating beautiful, responsive user interfaces with modern CSS frameworks and component libraries. Building interactive UIs with animations, state management, and optimized performance.',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Redux', 'PWA'],
  },
  {
    icon: Database,
    title: 'Database Design & Optimization',
    description: 'Designing optimized database schemas for SQL and NoSQL databases. Implementing caching strategies with Redis and query optimization for high-performance data retrieval.',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Drizzle ORM'],
  },
  {
    icon: Cloud,
    title: 'Cloud Deployment & DevOps',
    description: 'Deploying scalable applications on cloud platforms with automated CI/CD pipelines. Containerizing applications with Docker and managing infrastructure on AWS and Azure.',
    skills: ['Docker', 'GitHub Actions', 'Vercel', 'Railway', 'AWS', 'Azure DevOps'],
  },
  {
    icon: FaMobileAlt,
    title: 'SaaS & Multi-Tenant Applications',
    description: 'Building enterprise-grade SaaS platforms with subdomain isolation, row-level security, and scalable multi-tenant architecture for CRM, LMS, and business automation.',
    skills: ['Multi-Tenancy', 'RBAC', 'Subdomain Routing', 'Payment Integration', 'Razorpay'],
  },
];

// Experience data
const experiences = [
  {
    id: 1,
    role: 'Junior Full Stack Developer',
    company: 'TRANSFORM Solutions (P) Limited',
    location: 'Surat, India',
    type: 'Full-time',
    startDate: 'Dec 2025',
    endDate: 'Present',
    current: true,
    description: 'Building and maintaining full-stack applications using React.js, Next.js, Node.js, Express.js, MongoDB, and MySQL across multiple production modules. Developing secure RESTful APIs with JWT authentication, RBAC, and Socket.io real-time features.',
    technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Socket.io', 'JWT'],
    achievements: [
      { metric: '10+', label: 'Production Modules' },
      { metric: '100%', label: 'API Security' },
      { metric: '99.9%', label: 'Uptime' },
    ],
  },
  {
    id: 2,
    role: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    type: 'Freelance',
    startDate: 'Jul 2025',
    endDate: 'Nov 2025',
    current: false,
    description: 'Delivered end-to-end full-stack applications for multiple clients using React.js, Next.js, Node.js, Express.js, MySQL, and MongoDB. Built secure REST APIs with JWT authentication, RBAC, and optimized queries while managing complete project lifecycles independently.',
    technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'JWT', 'RBAC'],
    achievements: [
      { metric: '2', label: 'Client Projects' },
      { metric: '100%', label: 'On-time Delivery' },
      { metric: '5★', label: 'Client Rating' },
    ],
  },
  {
    id: 3,
    role: 'Software Developer Intern',
    company: 'CasePoint Pvt. Ltd.',
    location: 'Remote',
    type: 'Internship',
    startDate: 'Jan 2025',
    endDate: 'Jun 2025',
    current: false,
    description: 'Built enterprise web applications using .NET Core, PostgreSQL, Redis, and Kendo UI. Integrated RESTful APIs reducing backend response time and improving data flow efficiency. Applied Redis caching and PostgreSQL optimization under production load while working in Agile sprints.',
    technologies: ['.NET Core', 'PostgreSQL', 'Redis', 'Kendo UI', 'REST APIs', 'Agile'],
    achievements: [
      { metric: '30%', label: 'Faster Response' },
      { metric: '100%', label: 'Sprint Completion' },
      { metric: '10+', label: 'Features Built' },
    ],
  },
];

// Featured projects data
const featuredProjectsData: Project[] = [
  {
    id: 1,
    slug: 'eduflow-lms',
    title: 'EduFlow – Multi-Tenant LMS',
    description: 'Multi-tenant SaaS LMS with subdomain isolation, row-level PostgreSQL security, RBAC for 4 roles, drag-and-drop curriculum builder with video lessons, quizzes, assignments, and Zoom/Google Meet scheduling. Real-time notifications via Socket.io, gamification engine with XP, badges, leaderboards.',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
    techTags: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'Docker', 'GitHub Actions', 'Razorpay'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    category: 'SaaS',
    createdAt: '2024-12-01',
  },
  {
    id: 2,
    slug: 'propflow-crm',
    title: 'PropFlow – Real Estate CRM SaaS',
    description: 'Multi-tenant CRM with real-time Kanban pipeline, rule-based lead automation, WhatsApp follow-ups via Twilio, Google Maps heatmaps, and revenue forecasting analytics. Complete property management with intelligent automation.',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    techTags: ['React.js', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'Google Maps API', 'Twilio', 'Docker', 'Razorpay'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    category: 'SaaS',
    createdAt: '2024-11-01',
  },
  {
    id: 3,
    slug: 'rupeestory-finance',
    title: 'RupeeStory – Finance & Investment Tracker',
    description: 'Unified investment tracker for Mutual Funds, Stocks, FDs, and Crypto with AI financial coach powered by Claude API. Features XIRR/CAGR/Sharpe ratio analytics, tax calculator, and PWA with biometric login for secure access.',
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop',
    techTags: ['React.js', 'Node.js', 'PostgreSQL', 'Redis', 'Claude AI API', 'NSE/BSE API', 'Razorpay'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    category: 'FinTech',
    createdAt: '2024-10-01',
  },
  {
    id: 4,
    slug: 'eventpulse-platform',
    title: 'EventPulse – Event Ecosystem Platform',
    description: '3-portal event ecosystem with WebSocket seat locking, surge pricing engine, venue marketplace, Claude AI + Spotify recommendations for mood-based playlists, and group planning with smart split payments.',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop',
    techTags: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'Claude AI', 'Razorpay', 'Docker'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    category: 'SaaS',
    createdAt: '2024-09-01',
  },
];

// Contact info
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'naitikmaisuriya9@gmail.com',
    link: 'mailto:naitikmaisuriya9@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 8485939130',
    link: 'https://wa.me/918485939130',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    link: null,
  },
];

// Social links
const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/naitikmaisuriya', color: 'hover:text-white' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/naitikmaisuriya', color: 'hover:text-[#0077B5]' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/naitikmaisuriya', color: 'hover:text-[#1DA1F2]' },
];

// Values
const values = [
  { icon: Rocket, title: 'Innovation', description: 'Always exploring new technologies' },
  { icon: Heart, title: 'Passion', description: 'Deeply passionate about creating great software' },
  { icon: Users, title: 'Collaboration', description: 'Strong believer in teamwork' },
  { icon: Target, title: 'Quality', description: 'Committed to delivering high-quality code' },
];

// ============ COMPONENT ============

const SinglePagePortfolio: React.FC = () => {
  useDocumentMeta('Home', 'Full Stack Developer - React, TypeScript, Node.js, MySQL Expert');
  
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Load projects
  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const projects = await getFeaturedProjects();
        if (projects && projects.length > 0) {
          setFeaturedProjects(projects.slice(0, 3));
        } else {
          setFeaturedProjects(featuredProjectsData);
        }
      } catch (error) {
        console.error('Failed to load featured projects:', error);
        setFeaturedProjects(featuredProjectsData);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  // Scroll tracking for back to top and active section
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      // Detect active section
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'services', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Contact form handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      const result = await submitContactFormViaEmail(formData);
      
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', budget: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setFormError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setFormError('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError(null);
  };

  const cycleProject = (direction: 'prev' | 'next') => {
    if (featuredProjects.length === 0) return;

    setCurrentProjectIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % featuredProjects.length;
      }

      return (prev - 1 + featuredProjects.length) % featuredProjects.length;
    });
  };

  useEffect(() => {
    if (featuredProjects.length === 0) return;
    if (currentProjectIndex <= featuredProjects.length - 1) return;

    setCurrentProjectIndex(0);
  }, [featuredProjects.length, currentProjectIndex]);

  useEffect(() => {
    if (featuredProjects.length <= 1) return;

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    let intervalId: number | null = null;

    const setupAutoplay = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }

      if (desktopQuery.matches) {
        intervalId = window.setInterval(() => {
          setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
        }, 5500);
      }
    };

    setupAutoplay();
    desktopQuery.addEventListener('change', setupAutoplay);

    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
      desktopQuery.removeEventListener('change', setupAutoplay);
    };
  }, [featuredProjects.length]);

  const activeProject = featuredProjects[currentProjectIndex];

  // Rotating Title Component
  const titles = [
    'Full Stack Developer',
    'MERN Stack Developer',
    'Node.js Developer',
    'React.js Developer',
    'Software Developer'
  ];
  
  const RotatingTitle = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
      }, 2500);
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-xl md:text-2xl text-text-primary font-heading font-bold block"
          >
            {titles[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="relative min-h-0 lg:min-h-[calc(100vh-80px)] pt-0 flex items-start justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 z-0">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          
          {/* Floating Code Elements - enhanced */}
          <span className="code-float code-float-1 text-primary-cyan/20">{'<div>'}</span>
          <span className="code-float code-float-2 text-primary-purple/20">{'{ }'}</span>
          <span className="code-float code-float-3 text-primary-cyan/20">{'</>'}</span>
          <span className="code-float code-float-4 text-primary-purple/20">{'( )'}</span>
          <span className="code-float code-float-5 text-success/20">{'[ ]'}</span>
          <span className="code-float code-float-6 text-primary-cyan/20">{'=> '}</span>
          <span className="code-float code-float-7 text-primary-purple/20">{'</'}</span>
          <span className="code-float code-float-8 text-primary-cyan/20">{'&&'}</span>
          <span className="code-float code-float-9 text-success/20">{'||'}</span>
          <span className="code-float code-float-10 text-primary-purple/20">{'==='}</span>
          <span className="code-float code-float-11 text-primary-cyan/20">{'...'}</span>
          <span className="code-float code-float-12 text-success/20">{'<p>'}</span>
          <span className="code-float code-float-13 text-primary-purple/20">{'::'}</span>
          <span className="code-float code-float-14 text-primary-cyan/20">{'#'}</span>
          <span className="code-float code-float-15 text-success/20">{'@'}</span>
          <span className="code-float code-float-16 text-primary-purple/20">{'/**/'}</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-4 pt-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left order-1 lg:order-1">
              <ScrollReveal animation="fade-up" delay={50}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 border border-primary-cyan/20 mb-4 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  <span className="text-primary-cyan text-xs font-medium">Available for freelance work</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={100}>
                <p className="text-primary-cyan text-lg md:text-xl mb-1 font-medium tracking-wide">
                  Hello, I'm
                </p>
              </ScrollReveal>
              
              <ScrollReveal animation="zoom-in" delay={150}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-3 leading-none">
                  <span className="gradient-text-animated">Naitik</span>
                  <br />
                  <span className="gradient-text-animated" style={{ animationDelay: '0.5s' }}>Maisuriya</span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center">
                    <Terminal className="text-primary-cyan" size={20} />
                  </div>
                  <div className="h-6 w-px bg-gradient-to-b from-transparent via-primary-cyan/50 to-transparent" />
                  <RotatingTitle />
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={250}>
                <div className="max-w-xl mb-6 space-y-3">
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed break-words">
                    I craft <span className="text-primary-cyan font-semibold">scalable</span> and <span className="text-primary-purple font-semibold">beautiful</span> web applications.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    <span className="text-text-secondary text-sm md:text-base">Specialized in</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#61DAFB]/10 text-[#61DAFB] text-xs sm:text-sm font-medium whitespace-nowrap">React</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#68A063]/10 text-[#68A063] text-xs sm:text-sm font-medium whitespace-nowrap">Node.js</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/10 text-white text-xs sm:text-sm font-medium whitespace-nowrap">Next.js</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#336791]/10 text-[#336791] text-xs sm:text-sm font-medium whitespace-nowrap">PostgreSQL</span>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="group relative px-6 py-3 rounded-xl text-background font-semibold text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan bg-[length:200%_100%] animate-gradient-x" />
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary-cyan to-primary-purple blur-xl" />
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    <span className="relative z-10 flex items-center gap-2">
                      Let's Talk
                      <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={16} />
                    </span>
                  </button>
                  
                  <a 
                    href="/resume.pdf" 
                    download 
                    className="group relative px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 border-2 border-transparent bg-clip-padding"
                    style={{ background: 'linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(135deg, #00d9ff, #a855f7) border-box' }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-xl" />
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                    <span className="relative z-10 flex items-center gap-2 text-text-primary group-hover:text-primary-cyan transition-colors duration-300">
                      <Download className="group-hover:-translate-y-0.5 transition-transform duration-300" size={16} />
                      Download CV
                    </span>
                  </a>
                </div>
              </ScrollReveal>
              
              {/* Quick stats - after buttons */}
              <ScrollReveal animation="fade-up" delay={350}>
                <div className="flex items-center justify-center lg:justify-start gap-6 mt-6">
                  {[
                    { value: '1+', label: 'Years Exp.' },
                    { value: '10+', label: 'Projects' },
                    { value: '15+', label: 'Technologies' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-text-secondary text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            
            {/* Right side - Code illustration (Original) */}
            <ScrollReveal animation="fade-left" delay={300} className="order-2 lg:order-2 w-full max-w-md sm:max-w-xl mx-auto lg:max-w-none">
              <div className="relative">
                <div className="code-terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <span className="text-text-secondary text-sm">app.ts</span>
                  </div>
                  <div className="terminal-body">
                    <pre className="text-sm">
                      <code>
                        <span className="code-comment">// 🚀 Building the future, one line at a time</span>
                        {'\n'}<span className="code-keyword">import</span> {'{ '}<span className="code-variable">MERN</span>, <span className="code-variable">Next.js</span>, <span className="code-variable">TypeScript</span>{' }'} <span className="code-keyword">from</span> <span className="code-string">'skills'</span>;
                        {'\n'}
                        {'\n'}<span className="code-keyword">class</span> <span className="code-class">FullStackDeveloper</span> {'{'}
                        {'\n'}  <span className="code-property">name</span> = <span className="code-string">"Naitik Maisuriya"</span>;
                        {'\n'}  <span className="code-property">experience</span> = <span className="code-string">"1+ years"</span>;
                        {'\n'}
                        {'\n'}  <span className="code-method">buildApp</span>(<span className="code-variable">idea</span>) {'{'}
                        {'\n'}    <span className="code-keyword">return</span> <span className="code-variable">idea</span>
                        {'\n'}      .<span className="code-method">design</span>()
                        {'\n'}      .<span className="code-method">develop</span>()
                        {'\n'}      .<span className="code-method">deploy</span>();
                        {'\n'}  {'}'}
                        {'\n'}{'}'}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-8 md:py-16 mt-0 border-y border-border overflow-hidden">
        <div className="tech-marquee">
          <div className="tech-marquee-content">
            {[...techStackFlat, ...techStackFlat].map((tech, index) => (
              <div key={index} className="tech-item group">
                <tech.Icon className="text-2xl transition-transform group-hover:scale-110" style={{ color: tech.color }} />
                <span className="text-text-secondary font-medium group-hover:text-text-primary transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="section-container relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 -left-20 w-80 h-80 bg-primary-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary-purple/5 rounded-full blur-3xl" />
        
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4 md:mb-6">
              About Me
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-2">
              A passionate Full Stack Developer crafting digital experiences that matter
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-10 md:mb-16 max-w-3xl mx-auto auto-rows-fr">
          {[
            { value: '1+', label: 'Years Experience' },
            { value: '10+', label: 'Projects Completed' },
            { value: '15+', label: 'Technologies' },
          ].map((stat, index) => (
            <ScrollReveal key={index} animation="zoom-in" delay={index * 100} className="h-full">
              <div className="stat-card text-center p-3 sm:p-4 md:p-6 group h-full flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-text mb-1 md:mb-2">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-text-secondary group-hover:text-text-primary transition-colors min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Profile visualization */}
          <ScrollReveal animation="fade-right" delay={200}>
            <div className="relative block">
              <div className="aspect-square max-w-[15rem] sm:max-w-xs md:max-w-md mx-auto relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-cyan/20 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-6 sm:inset-8 rounded-full border-2 border-dashed border-primary-purple/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                
                {/* Center terminal */}
                <div className="absolute inset-8 sm:inset-10 md:inset-12 flex items-center justify-center">
                  <div className="text-center relative">
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto mb-3 md:mb-4">
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-2xl opacity-30 blur-lg" />
                      <div className="relative h-full bg-cardBg rounded-2xl border border-primary-cyan/30 overflow-hidden">
                        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-black/30 border-b border-primary-cyan/20">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-error" />
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500" />
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-success" />
                        </div>
                        <div className="p-2.5 sm:p-4 font-mono text-[10px] sm:text-sm">
                          <div className="text-primary-cyan">$ whoami</div>
                          <div className="text-text-primary mt-1">naitik</div>
                          <div className="text-primary-cyan mt-2">$ role</div>
                          <div className="text-success mt-1">Full Stack Dev</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 bg-cardBg/80 backdrop-blur-sm rounded-full px-3 sm:px-5 py-1.5 sm:py-2 border border-primary-cyan/20">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-text-primary font-heading font-bold text-xs sm:text-sm">1+ Years Experience</span>
                    </div>
                  </div>
                </div>

                {/* Floating icons */}
                {[
                  { Icon: Code2, top: '5%', left: '45%' },
                  { Icon: Database, top: '20%', left: '80%' },
                  { Icon: Server, top: '55%', left: '85%' },
                  { Icon: Globe, top: '90%', left: '55%' },
                  { Icon: Terminal, top: '70%', left: '10%' },
                  { Icon: Layers, top: '25%', left: '5%' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="hidden sm:flex absolute w-10 h-10 md:w-12 md:h-12 rounded-xl bg-cardBg border border-border items-center justify-center hover:border-primary-cyan/50 hover:scale-110 transition-all duration-300 float-slow"
                    style={{ top: item.top, left: item.left, animationDelay: `${i * 0.3}s` }}
                  >
                    <item.Icon className="text-primary-cyan" size={18} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Bio Content */}
          <ScrollReveal animation="fade-left" delay={300}>
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4 md:mb-6">
                Hi, I'm <span className="gradient-text">Naitik Maisuriya</span>
              </h3>
              
              <div className="space-y-3 md:space-y-4 text-text-secondary text-sm sm:text-base md:text-lg">
                <p>
                  I'm a <span className="text-primary-cyan font-semibold">Full Stack Developer</span> with 
                  over 1+ years of experience in building web applications. I specialize in creating 
                  scalable, performant, and user-friendly solutions using modern technologies.
                </p>
                <p>
                  My journey in tech began with a fascination for how things work on the internet. 
                  Today, I transform complex ideas into elegant, functional applications that make 
                  a real impact on businesses and users alike.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8 justify-center md:justify-start">
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="group relative px-6 py-3 rounded-xl text-background font-semibold text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan bg-[length:200%_100%] animate-gradient-x" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary-cyan to-primary-purple blur-xl" />
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  <span className="relative z-10 flex items-center gap-2">
                    <Coffee size={16} />
                    Let's Talk
                  </span>
                </button>
                <a 
                  href="/resume.pdf" 
                  download 
                  className="group relative px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 border-2 border-transparent bg-clip-padding"
                  style={{ background: 'linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(135deg, #00d9ff, #a855f7) border-box' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-xl" />
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  <span className="relative z-10 flex items-center gap-2 text-text-primary group-hover:text-primary-cyan transition-colors duration-300">
                    <Download className="group-hover:-translate-y-0.5 transition-transform duration-300" size={16} />
                    Download Resume
                  </span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Values */}
        <div className="mt-12 md:mt-20">
          <ScrollReveal animation="fade-up">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-center mb-6 md:mb-10 gradient-text">My Values</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} animation="zoom-in" delay={index * 100}>
                <div className="card text-center group h-full hover:scale-105 transition-all duration-300 p-4 md:p-6">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4">
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary-cyan/30 to-primary-purple/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-primary-cyan/30 transition-all duration-300">
                      <value.icon className="text-primary-cyan w-5 h-5 md:w-7 md:h-7" />
                    </div>
                  </div>
                  <h4 className="text-sm md:text-lg font-heading font-bold mb-1 md:mb-2 group-hover:text-primary-cyan transition-colors">{value.title}</h4>
                  <p className="text-text-secondary text-xs md:text-sm line-clamp-3">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="section-container gradient-orb-bg">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4 md:mb-6">
              My Skills
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto px-2">
              Technologies and tools I work with to build modern web applications
            </p>
          </div>
        </ScrollReveal>

        {/* Skills by Category - Clean Badge Layout */}
        <div className="space-y-6 md:space-y-8">
          {[
            { title: 'Languages', icon: Code2, color: '#F7DF1E', skills: techStack.languages },
            { title: 'Frontend', icon: Globe, color: '#61DAFB', skills: techStack.frontend },
            { title: 'Backend', icon: Server, color: '#339933', skills: techStack.backend },
            { title: 'Databases', icon: Database, color: '#47A248', skills: techStack.databases },
            { title: 'Cloud & DevOps', icon: Cloud, color: '#2496ED', skills: techStack.cloudDevOps },
            { title: 'Tools', icon: Wrench, color: '#F05032', skills: techStack.tools },
            { title: 'Other', icon: Layers, color: '#9333EA', skills: techStack.other },
          ].map((category, catIndex) => (
            <ScrollReveal key={category.title} animation="fade-up" delay={catIndex * 50}>
              <div className="group">
                {/* Category Header */}
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${category.color}15, transparent)`,
                      borderColor: `${category.color}30`
                    }}
                  >
                    <category.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: category.color }} />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-text-primary whitespace-nowrap">
                    {category.title}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent hidden sm:block" />
                </div>
                
                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2 md:gap-3 pl-0 sm:pl-10 md:pl-13">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="group/skill flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl bg-cardBg border border-border hover:border-primary-cyan/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-cyan/10 cursor-default"
                      style={{ animationDelay: `${skillIndex * 50}ms` }}
                    >
                      <skill.Icon 
                        className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/skill:scale-110 flex-shrink-0" 
                        style={{ color: skill.color }} 
                      />
                      <span className="text-xs md:text-sm font-medium text-text-secondary group-hover/skill:text-text-primary transition-colors whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </section>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <section id="experience" className="section-container">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4 md:mb-6">
              Experience
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-2">
              My professional journey as a developer
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-10 md:mb-16 auto-rows-fr">
          {[
            { icon: Briefcase, value: '1+', label: 'Years Experience' },
            { icon: Code2, value: '10+', label: 'Projects Completed' },
            { icon: Award, value: '5+', label: 'Certifications' },
          ].map((stat, index) => (
            <ScrollReveal key={index} animation="bounce-in" delay={index * 100} className="h-full">
              <div className="stat-card text-center group cursor-pointer p-3 sm:p-4 md:p-5 h-full flex flex-col justify-start">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-lg md:rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="text-primary-cyan" size={20} />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-0.5 md:mb-1 counter-animate">{stat.value}</div>
                <div className="text-text-secondary text-xs md:text-sm group-hover:text-primary-cyan transition-colors min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center text-center">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-cyan via-primary-purple to-success hidden md:block" />
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-cyan via-primary-purple to-success md:hidden" />

          {experiences.map((exp, index) => (
            <ScrollReveal 
              key={exp.id} 
              animation={index % 2 === 0 ? 'fade-right' : 'fade-left'} 
              delay={index * 100}
            >
              <div className={`relative flex items-start mb-8 md:mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-2 md:left-1/2 w-3 h-3 md:w-4 md:h-4 -translate-x-1/2 mt-6 md:mt-8 z-10">
                  <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 md:border-4 ${exp.current ? 'border-success bg-success/20 animate-pulse' : 'border-primary-cyan bg-primary-cyan/20'}`} />
                </div>

                <div className={`ml-6 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="group relative">
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                    
                    <div className="relative bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-xl md:rounded-2xl border border-border/50 group-hover:border-transparent transition-all p-4 md:p-6 overflow-hidden">
                      <div className="flex flex-wrap items-start justify-between gap-2 md:gap-4 mb-3 md:mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1 md:mb-2">
                              {exp.current && (
                                <span className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-bold rounded-full bg-gradient-to-r from-success/20 to-success/10 text-success border border-success/30 animate-pulse">
                                  🟢 Current
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-text-primary group-hover:text-primary-cyan transition-colors mb-0.5 md:mb-1">
                            {exp.role}
                          </h3>
                          <p className="text-primary-cyan font-medium text-sm md:text-base">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm text-text-secondary">
                        <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-background/50 border border-border/50">
                          <Calendar size={12} className="text-primary-cyan md:w-3.5 md:h-3.5" />
                          <span className="text-[11px] md:text-sm">{exp.startDate} — {exp.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-background/50 border border-border/50">
                          <MapPin size={12} className="text-primary-purple md:w-3.5 md:h-3.5" />
                          <span className="text-[11px] md:text-sm">{exp.location}</span>
                        </div>
                      </div>

                      <p className="text-text-secondary mb-3 md:mb-4 text-xs md:text-base leading-relaxed">{exp.description}</p>

                      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                        {exp.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-medium rounded-md md:rounded-lg bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20 hover:scale-105 transition-transform"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-2 md:gap-3 pt-3 md:pt-4 border-t border-border/30">
                        {exp.achievements.map((achievement, i) => (
                          <div 
                            key={i} 
                            className="text-center p-1.5 md:p-2 rounded-lg md:rounded-xl bg-background/30 border border-border/30 hover:scale-105 transition-transform"
                          >
                            <div className="text-sm md:text-lg font-bold gradient-text">{achievement.metric}</div>
                            <div className="text-[9px] md:text-xs text-text-secondary">{achievement.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="projects" className="section-container gradient-orb-bg">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4 md:mb-6">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary px-2">
              Check out some of my recent work
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : (
          <div className="relative z-10 px-2 md:px-4">
            {/* Responsive: 1 card on mobile/tablet, 2 cards on desktop */}
            <div className="w-full max-w-6xl mx-auto">
              {/* Mobile/Tablet: show 1 card */}
              <div className="block lg:hidden">
                <AnimatePresence mode="wait">
                  {activeProject && (
                    <motion.article
                      key={activeProject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.18}
                      onDragEnd={(_, info) => {
                        if (info.offset.x <= -60) {
                          cycleProject('next');
                        }
                        if (info.offset.x >= 60) {
                          cycleProject('prev');
                        }
                      }}
                      className="group h-[31rem] sm:h-[32rem] md:h-[34rem]"
                    >
                      {/* ...existing code for single card... */}
                      <div className="relative h-full">
                        <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-xl sm:rounded-2xl opacity-30 blur-sm pointer-events-none" />
                        <div className="relative h-full bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 flex flex-col">
                          {/* ...existing code for card content... */}
                          {/* ...copy from previous single card... */}
                          <div className="aspect-video overflow-hidden relative">
                            <img
                              src={activeProject.thumbnail || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop`}
                              alt={activeProject.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-cardBg/50 to-transparent pointer-events-none" />
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-cardBg/90 text-primary-cyan backdrop-blur-md border border-primary-cyan/30">
                                {activeProject.category}
                              </span>
                            </div>
                            {activeProject.featured && (
                              <div className="absolute top-2 right-2">
                                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple text-white">
                                  ⭐ Featured
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-4 sm:p-5 flex-1 flex flex-col">
                            <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3 min-h-[3.25rem] sm:min-h-[3.75rem]">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center flex-shrink-0 border border-primary-cyan/20">
                                <Code2 size={16} className="text-primary-cyan sm:w-5 sm:h-5" />
                              </div>
                              <h3 className="text-sm sm:text-base font-heading font-bold group-hover:text-primary-cyan transition-colors leading-tight line-clamp-2">
                                {activeProject.title}
                              </h3>
                            </div>
                            <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-4 sm:line-clamp-5 h-[4.8rem] sm:h-[5.6rem] overflow-hidden">
                              {activeProject.description}
                            </p>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4 h-[3.5rem] sm:h-[4rem] overflow-hidden content-start">
                              {(activeProject.techTags || []).slice(0, 5).map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-md bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20"
                                >
                                  {tech}
                                </span>
                              ))}
                              {(activeProject.techTags || []).length > 5 && (
                                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-md bg-border text-text-secondary">
                                  +{(activeProject.techTags || []).length - 5}
                                </span>
                              )}
                            </div>
                            <div className="flex-1" />
                            <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border/50">
                              <a
                                href={activeProject.liveUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 group/btn relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-background font-semibold text-[10px] sm:text-xs overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan bg-[length:200%_100%] animate-gradient-x" />
                                <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5">
                                  <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                                  Live Demo
                                </span>
                              </a>
                              <a
                                href={activeProject.githubUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 group/btn relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold text-[10px] sm:text-xs overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-border hover:border-primary-cyan"
                              >
                                <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5 text-text-primary group-hover/btn:text-primary-cyan transition-colors">
                                  <Github size={12} className="sm:w-3.5 sm:h-3.5" />
                                  GitHub
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )}
                </AnimatePresence>
                {featuredProjects.length > 1 && (
                  <div className="relative z-30 mt-4 sm:mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => cycleProject('prev')}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border bg-cardBg text-text-primary hover:text-primary-cyan hover:border-primary-cyan transition-colors flex items-center justify-center touch-manipulation"
                      aria-label="Previous project"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                    </button>
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-cardBg text-xs sm:text-sm text-text-secondary">
                      Project <span className="text-primary-cyan font-semibold">{currentProjectIndex + 1}</span> of <span className="text-text-primary font-semibold">{featuredProjects.length}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => cycleProject('next')}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border bg-cardBg text-text-primary hover:text-primary-cyan hover:border-primary-cyan transition-colors flex items-center justify-center touch-manipulation"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}
                {featuredProjects.length > 1 && (
                  <p className="mt-2 text-center text-[11px] sm:text-xs text-text-secondary">
                    Swipe or use arrows to browse projects
                  </p>
                )}
              </div>
              {/* Desktop: show 2 cards side by side */}
              <div className="hidden lg:flex gap-8 justify-center">
                {featuredProjects.length > 0 && [0, 1].map((offset) => {
                  const idx = (currentProjectIndex + offset) % featuredProjects.length;
                  const project = featuredProjects[idx];
                  return (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="group h-[36rem] w-full max-w-xl"
                    >
                      <div className="relative h-full">
                        <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-3xl opacity-30 blur-sm pointer-events-none" />
                        <div className="relative h-full bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-3xl overflow-hidden border border-border/50 flex flex-col">
                          <div className="aspect-video overflow-hidden relative">
                            <img
                              src={project.thumbnail || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop`}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-cardBg/50 to-transparent pointer-events-none" />
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cardBg/90 text-primary-cyan backdrop-blur-md border border-primary-cyan/30">
                                {project.category}
                              </span>
                            </div>
                            {project.featured && (
                              <div className="absolute top-3 right-3">
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple text-white">
                                  ⭐ Featured
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-7 flex-1 flex flex-col">
                            <div className="flex items-start gap-4 mb-4 min-h-[4.5rem]">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center border border-primary-cyan/20 flex-shrink-0">
                                <Code2 size={20} className="text-primary-cyan" />
                              </div>
                              <h3 className="text-2xl font-heading font-bold group-hover:text-primary-cyan transition-colors leading-tight line-clamp-2">
                                {project.title}
                              </h3>
                            </div>
                            <p className="text-text-secondary text-base mb-5 leading-relaxed line-clamp-5 h-[8rem] overflow-hidden">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-5 h-[5rem] overflow-hidden content-start">
                              {(project.techTags || []).slice(0, 8).map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20"
                                >
                                  {tech}
                                </span>
                              ))}
                              {(project.techTags || []).length > 8 && (
                                <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-border text-text-secondary">
                                  +{(project.techTags || []).length - 8}
                                </span>
                              )}
                            </div>
                            <div className="flex-1" />
                            <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                              <a
                                href={project.liveUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 group/btn relative px-4 py-2.5 rounded-lg text-background font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan bg-[length:200%_100%] animate-gradient-x" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                  <ExternalLink size={14} />
                                  Live Demo
                                </span>
                              </a>
                              <a
                                href={project.githubUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 group/btn relative px-4 py-2.5 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-border hover:border-primary-cyan"
                              >
                                <span className="relative z-10 flex items-center justify-center gap-2 text-text-primary group-hover/btn:text-primary-cyan transition-colors">
                                  <Github size={14} />
                                  GitHub
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
                {/* Navigation arrows for desktop */}
                {featuredProjects.length > 1 && (
                  <div className="absolute left-0 right-0 -bottom-12 flex items-center justify-center gap-6">
                    <button
                      type="button"
                      onClick={() => cycleProject('prev')}
                      className="w-12 h-12 rounded-full border border-border bg-cardBg text-text-primary hover:text-primary-cyan hover:border-primary-cyan transition-colors flex items-center justify-center touch-manipulation"
                      aria-label="Previous project"
                    >
                      <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => cycleProject('next')}
                      className="w-12 h-12 rounded-full border border-border bg-cardBg text-text-primary hover:text-primary-cyan hover:border-primary-cyan transition-colors flex items-center justify-center touch-manipulation"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: old highlighted carousel kept hidden */}
            <div className="hidden">
              <div className="relative">
                <AnimatePresence mode="wait">
                  {activeProject && (
                    <motion.article
                      key={activeProject.id}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -28 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="group"
                    >
                      <div className="relative h-full">
                        <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-30 blur-sm pointer-events-none" />

                        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-cardBg to-[#0f0f1a]">
                          <div className="grid xl:grid-cols-[1.1fr_1fr]">
                            <div className="relative aspect-[16/10] xl:aspect-auto xl:min-h-[32rem] overflow-hidden">
                              <img
                                src={activeProject.thumbnail || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=700&fit=crop`}
                                alt={activeProject.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-cardBg/20 to-transparent pointer-events-none" />

                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cardBg/90 text-primary-cyan backdrop-blur-md border border-primary-cyan/30">
                                  {activeProject.category}
                                </span>
                              </div>
                              {activeProject.featured && (
                                <div className="absolute top-4 right-4">
                                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple text-white">
                                    ⭐ Featured
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="p-7 xl:p-8 flex flex-col">
                              <div className="flex items-start gap-3 mb-4">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center border border-primary-cyan/20 flex-shrink-0">
                                  <Code2 size={20} className="text-primary-cyan" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold leading-tight group-hover:text-primary-cyan transition-colors">
                                  {activeProject.title}
                                </h3>
                              </div>

                              <p className="text-text-secondary text-base leading-relaxed mb-6 line-clamp-5">
                                {activeProject.description}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-7">
                                {(activeProject.techTags || []).slice(0, 8).map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {(activeProject.techTags || []).length > 8 && (
                                  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-border text-text-secondary">
                                    +{(activeProject.techTags || []).length - 8}
                                  </span>
                                )}
                              </div>

                              <div className="mt-auto flex items-center gap-3 pt-5 border-t border-border/50">
                                <a
                                  href={activeProject.liveUrl || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 group/btn relative px-4 py-2.5 rounded-lg text-background font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan bg-[length:200%_100%] animate-gradient-x" />
                                  <span className="relative z-10 flex items-center justify-center gap-2">
                                    <ExternalLink size={14} />
                                    Live Demo
                                  </span>
                                </a>
                                <a
                                  href={activeProject.githubUrl || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 group/btn relative px-4 py-2.5 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-border hover:border-primary-cyan"
                                >
                                  <span className="relative z-10 flex items-center justify-center gap-2 text-text-primary group-hover/btn:text-primary-cyan transition-colors">
                                    <Github size={14} />
                                    GitHub
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )}
                </AnimatePresence>

                {featuredProjects.length > 1 && (
                  <div className="relative z-30 mt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => cycleProject('prev')}
                        className="w-11 h-11 rounded-full border border-border bg-cardBg text-text-primary hover:text-primary-cyan hover:border-primary-cyan transition-colors flex items-center justify-center touch-manipulation"
                        aria-label="Previous project"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => cycleProject('next')}
                        className="w-11 h-11 rounded-full border border-border bg-cardBg text-text-primary hover:text-primary-cyan hover:border-primary-cyan transition-colors flex items-center justify-center touch-manipulation"
                        aria-label="Next project"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {featuredProjects.map((project, index) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => setCurrentProjectIndex(index)}
                          className={`h-2.5 rounded-full transition-all ${
                            currentProjectIndex === index
                              ? 'w-10 bg-gradient-to-r from-primary-cyan to-primary-purple'
                              : 'w-2.5 bg-border hover:bg-primary-cyan/60'
                          }`}
                          aria-label={`Go to project ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section id="services" className="section-container">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4 md:mb-6">
              What I Do
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto px-2">
              From concept to deployment, I provide comprehensive full-stack development services
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
              <div className="stat-card text-center group cursor-pointer h-full p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-lg md:rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <service.icon className="text-primary-cyan w-5 h-5 md:w-6 md:h-6" />
                </div>
              
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold mb-2 md:mb-3 gradient-text">
                  {service.title}
                </h3>
                
                <p className="text-text-secondary text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
                  {service.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-2 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="section-container gradient-orb-bg">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4 md:mb-6">
              Get in Touch
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-2">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>
        </ScrollReveal>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {[
            { icon: Clock, label: 'Response Time', value: '< 24h' },
            { icon: Globe, label: 'Availability', value: 'Worldwide' },
            { icon: Coffee, label: 'Projects Done', value: '10+' },
            { icon: Calendar, label: 'Experience', value: '1+ Years' },
          ].map((stat, index) => (
            <ScrollReveal key={index} animation="bounce-in" delay={index * 80}>
              <div className="stat-card text-center group cursor-pointer hover:scale-105 transition-transform p-3 md:p-4">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-lg md:rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="text-primary-cyan w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-base md:text-xl font-bold gradient-text">{stat.value}</div>
                <div className="text-text-secondary text-[10px] md:text-xs">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* Contact Form */}
          <ScrollReveal animation="fade-right" className="lg:col-span-3">
            <div className="card card-glass p-4 sm:p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 md:mb-6">Send a Message</h3>
              
              {submitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3 md:mb-4 animate-bounce">
                    <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-success" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-text-secondary text-sm md:text-base">I'll get back to you within 24 hours!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  {formError && (
                    <div className="p-3 md:p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs md:text-sm">
                      {formError}
                    </div>
                  )}
                  
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">Your Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-background border border-border text-text-primary focus:border-primary-cyan focus:outline-none transition-colors text-sm md:text-base"
                      >
                        <option value="">Select budget</option>
                        <option value="<1000">Less than $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="10000+">$10,000+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors resize-none text-sm md:text-base"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-background font-semibold text-xs md:text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan bg-[length:200%_100%] animate-gradient-x" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary-cyan to-primary-purple blur-xl" />
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-2 space-y-4 md:space-y-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="card card-animated p-4 md:p-5 group hover:-translate-x-1 transition-transform"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <info.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-cyan" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-text-secondary mb-0.5 md:mb-1">{info.label}</p>
                    {info.link ? (
                      <a href={info.link} className="font-medium hover:text-primary-cyan transition-colors text-sm md:text-base break-all">
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-sm md:text-base">{info.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="card card-animated p-4 md:p-5">
              <p className="text-xs md:text-sm font-medium mb-3 md:mb-4">Connect with me</p>
              <div className="flex gap-2 md:gap-3 flex-wrap">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 md:p-3 rounded-lg bg-background border border-border ${social.color} hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all`}
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="card card-neon p-4 md:p-5 bg-gradient-to-br from-primary-cyan/10 to-primary-purple/10">
              <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-success animate-pulse" />
                <span className="font-medium text-sm md:text-base">Currently Available</span>
              </div>
              <p className="text-xs md:text-sm text-text-secondary">
                I'm open for freelance projects and full-time opportunities.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-cardBg rounded-xl border border-border relative overflow-hidden hover:scale-[1.01] transition-transform">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-20 md:w-40 h-20 md:h-40 bg-primary-cyan/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-20 md:w-40 h-20 md:h-40 bg-primary-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold gradient-text mb-3 md:mb-4">
                Let's Build Something Amazing
              </h2>
              <p className="text-text-secondary text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2">
                Have a project in mind? I'd love to hear about it. Let's discuss how we can 
                work together to bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="group relative px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-background font-semibold text-xs md:text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan bg-[length:200%_100%] animate-gradient-x" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary-cyan to-primary-purple blur-xl" />
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start a Conversation
                    <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="group relative px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 border-2 border-transparent bg-clip-padding w-full sm:w-auto"
                  style={{ background: 'linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(135deg, #00d9ff, #a855f7) border-box' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-xl" />
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-text-primary group-hover:text-primary-cyan transition-colors duration-300">
                    View My Work
                  </span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden lg:flex fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary-cyan text-background shadow-lg shadow-primary-cyan/30 items-center justify-center"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SinglePagePortfolio;
