import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal } from '@/components/effects';
import { 
  ExternalLink, Github, Filter, Search,
  Code2, Layers, Eye, ArrowRight, Zap, Users
} from 'lucide-react';
import { getProjects } from '@/utils/api';
import type { Project } from '@/types';

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Projects', icon: Layers },
  { id: 'fullstack', name: 'Full Stack', icon: Code2 },
  { id: 'frontend', name: 'Frontend', icon: Eye },
  { id: 'backend', name: 'Backend', icon: Code2 },
  { id: 'mobile', name: 'Mobile', icon: Code2 },
];

// Placeholder images for projects
const projectPlaceholders = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop',
];

// Static projects data as fallback
const staticProjects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured e-commerce platform with product management, shopping cart, payment integration, and admin dashboard.',
    category: 'fullstack',
    thumbnail: '/Screenshot%202026-04-02%20160139.png',
    techTags: ['React', 'Node.js', 'MySQL', 'Stripe', 'Redux'],
    liveUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/naitikmaisuriya/ecommerce-platform',
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Task Management App',
    slug: 'task-management-app',
    description: 'A collaborative task management application with real-time updates, team features, and productivity analytics.',
    category: 'fullstack',
    thumbnail: '',
    techTags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://taskmanager-demo.vercel.app',
    githubUrl: 'https://github.com/naitikmaisuriya/task-manager',
    featured: true,
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    description: 'A modern, responsive portfolio website with smooth animations, dark theme, and CMS integration.',
    category: 'frontend',
    thumbnail: '',
    techTags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://naitikmaisuriya.dev',
    githubUrl: 'https://github.com/naitikmaisuriya/portfolio',
    featured: true,
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    title: 'Real-Time Chat Application',
    slug: 'real-time-chat-app',
    description: 'A real-time messaging app with private/group chats, file sharing, and end-to-end encryption.',
    category: 'fullstack',
    thumbnail: '',
    techTags: ['React', 'Node.js', 'Socket.io', 'Redis', 'PostgreSQL'],
    liveUrl: 'https://chatapp-demo.vercel.app',
    githubUrl: 'https://github.com/naitikmaisuriya/realtime-chat',
    featured: false,
    createdAt: '2023-11-05',
  },
  {
    id: 5,
    title: 'REST API Service',
    slug: 'rest-api-service',
    description: 'A scalable REST API with authentication, rate limiting, caching, and comprehensive documentation.',
    category: 'backend',
    thumbnail: '',
    techTags: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Swagger'],
    liveUrl: 'https://api-docs.naitikmaisuriya.dev',
    githubUrl: 'https://github.com/naitikmaisuriya/rest-api-service',
    featured: false,
    createdAt: '2023-09-15',
  },
  {
    id: 6,
    title: 'Weather Dashboard',
    slug: 'weather-dashboard',
    description: 'A beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
    category: 'frontend',
    thumbnail: '',
    techTags: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
    liveUrl: 'https://weather-dash.vercel.app',
    githubUrl: 'https://github.com/naitikmaisuriya/weather-dashboard',
    featured: false,
    createdAt: '2023-08-20',
  },
  {
    id: 7,
    title: 'Inventory Management System',
    slug: 'inventory-management',
    description: 'An enterprise inventory management system with barcode scanning, reporting, and multi-warehouse support.',
    category: 'fullstack',
    thumbnail: '',
    techTags: ['React', 'Node.js', 'MySQL', 'Docker', 'AWS'],
    liveUrl: 'https://inventory-system.vercel.app',
    githubUrl: 'https://github.com/naitikmaisuriya/inventory-management',
    featured: false,
    createdAt: '2023-06-10',
  },
  {
    id: 8,
    title: 'Social Media Dashboard',
    slug: 'social-media-dashboard',
    description: 'A unified dashboard to manage multiple social media accounts with analytics and scheduling features.',
    category: 'fullstack',
    thumbnail: '',
    techTags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'OAuth'],
    liveUrl: 'https://social-dashboard.vercel.app',
    githubUrl: 'https://github.com/naitikmaisuriya/social-media-dashboard',
    featured: false,
    createdAt: '2023-04-25',
  },
];

// Get project thumbnail with fallback
const getProjectThumbnail = (project: Project, index: number): string => {
  if (project.thumbnail) return project.thumbnail;
  return projectPlaceholders[index % projectPlaceholders.length];
};

const Projects: React.FC = () => {
  useDocumentMeta('Projects', 'Browse my portfolio of web development projects');
  
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(staticProjects);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Load projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const apiProjects = await getProjects();
        if (apiProjects && apiProjects.length > 0) {
          setProjects(apiProjects);
          setFilteredProjects(apiProjects);
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
        // Keep static projects as fallback
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects
  useEffect(() => {
    let result = projects;

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        (Array.isArray(p.techTags) && p.techTags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    setFilteredProjects(result);
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-4 md:pt-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6">
              My Projects
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              A showcase of my work — from full-stack applications to creative frontend experiments
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Projects', value: projects.length.toString(), icon: Layers },
            { label: 'Categories', value: '4+', icon: Code2 },
            { label: 'Technologies', value: '15+', icon: Zap },
            { label: 'Happy Clients', value: '30+', icon: Users },
          ].map((stat, index) => (
            <ScrollReveal key={index} animation="bounce-in" delay={index * 100}>
              <div className="stat-card text-center group cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary-cyan/60 transition-all duration-300">
                  <stat.icon className="text-primary-cyan" size={24} />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-text-secondary text-sm group-hover:text-primary-cyan transition-colors">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* All Projects */}
      <section className="section-container pt-4">
        {/* Filters */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary-cyan text-background'
                      : 'bg-cardBg border border-border text-text-secondary hover:border-primary-cyan hover:text-primary-cyan'
                  }`}
                >
                  <cat.icon size={16} />
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-cardBg border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="mx-auto mb-4 text-text-secondary" size={48} />
            <p className="text-text-secondary">No projects found matching your criteria</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-primary-cyan hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} animation="fade-up" delay={(index % 3) * 100}>
                <div className="group h-full">
                  <div className="relative h-full">
                    {/* Animated gradient border */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 animate-pulse" 
                         style={{ backgroundSize: '200% 100%' }} />
                    
                    <div className="relative h-full bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-2xl overflow-hidden border border-border/50 group-hover:border-transparent transition-all flex flex-col">
                      {/* Image with overlay */}
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={getProjectThumbnail(project, index)}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-cardBg/50 to-transparent" />
                        
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        
                        {/* Category badge with glow */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-cardBg/90 text-primary-cyan backdrop-blur-md border border-primary-cyan/30 shadow-lg shadow-primary-cyan/20">
                            {project.category}
                          </span>
                        </div>

                        {/* Featured badge */}
                        {project.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple text-white shadow-lg">
                              ⭐ Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col relative">
                        {/* Top accent line */}
                        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-primary-cyan/50 to-transparent" />
                        
                        {/* Title with icon */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center flex-shrink-0 border border-primary-cyan/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <Code2 size={20} className="text-primary-cyan" />
                          </div>
                          <h3 className="text-xl font-heading font-bold group-hover:text-primary-cyan transition-colors leading-tight">
                            {project.title}
                          </h3>
                        </div>
                        
                        {/* Description */}
                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech tags with improved styling */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(Array.isArray(project.techTags) ? project.techTags : []).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20 hover:border-primary-cyan/50 hover:shadow-sm hover:shadow-primary-cyan/20 transition-all cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Action Links with modern design */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-cyan to-primary-cyan/80 text-background font-semibold text-sm hover:shadow-lg hover:shadow-primary-cyan/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                              <ExternalLink size={16} />
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && project.githubUrl !== '#' && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cardBg border border-border text-text-primary font-semibold text-sm hover:border-primary-purple hover:text-primary-purple hover:shadow-lg hover:shadow-primary-purple/20 hover:-translate-y-0.5 transition-all duration-300"
                            >
                              <Github size={16} />
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <Code2 className="w-16 h-16 mx-auto mb-6 text-primary-cyan" />
            <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new challenges. Let's discuss how I can help bring your ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center">
                Start a Project
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center"
              >
                <Github className="mr-2" size={18} />
                View GitHub
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Projects;
