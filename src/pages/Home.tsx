import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Code2, Database, Globe, Server, Smartphone, Terminal, Braces, Layers, GitBranch, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks';
import { getFeaturedProjects } from '@/utils/api';
import type { Project } from '@/types';
import { ScrollReveal, MagneticCard } from '@/components/effects';

// Tech stack data with icons
const techStack = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6' },
  { name: 'Node.js', icon: '🟢', color: '#339933' },
  { name: 'MySQL', icon: '🗄️', color: '#4479A1' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
  { name: 'Git', icon: '📂', color: '#F05032' },
];

// Services data
const services = [
  {
    icon: Globe,
    title: 'Frontend Development',
    description: 'Building responsive, interactive UIs with React, TypeScript, and modern CSS frameworks.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Shadcn/ui', 'Zustand', 'Framer Motion'],
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Creating robust APIs and server-side applications with Node.js and Express.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'JWT', 'OAuth 2.0', 'Bull Queue', 'Twilio', 'Drizzle ORM'],
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Designing efficient database schemas and optimizing queries for performance.',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Deploying and managing applications on cloud platforms with CI/CD pipelines.',
    skills: ['AWS', 'Docker', 'GitHub Actions', 'Vercel', 'Railway', 'Azure DevOps', 'Cloudinary'],
  },
];

// Placeholder images for projects without thumbnails
const projectPlaceholders = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop', // Code on screen
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop', // Laptop coding
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop', // Monitor with code
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop', // Macbook coding
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop', // Code closeup
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop', // Dark code screen
];

// Custom thumbnails for specific projects (by slug or title keyword)
const getProjectThumbnail = (project: Project, fallbackIdx: number): string => {
  if (project.thumbnail) return project.thumbnail;
  
  // Check for e-commerce project
  const titleLower = project.title?.toLowerCase() || '';
  const slugLower = project.slug?.toLowerCase() || '';
  
  if (titleLower.includes('e-commerce') || titleLower.includes('ecommerce') || 
      slugLower.includes('e-commerce') || slugLower.includes('ecommerce')) {
    return '/Screenshot%202026-04-02%20160139.png';
  }
  
  return projectPlaceholders[fallbackIdx % projectPlaceholders.length];
};

const Home: React.FC = () => {
  useDocumentMeta('Home', 'Full Stack Developer - React, TypeScript, Node.js, MySQL Expert');
  
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const projects = await getFeaturedProjects();
        setFeaturedProjects(projects.slice(0, 3));
      } catch (error) {
        console.error('Failed to load featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] pt-0 flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="gradient-orb-bg absolute inset-0" />
          
          {/* Floating Code Elements */}
          <div className="code-float code-float-1">{'<div>'}</div>
          <div className="code-float code-float-2">{'{ }'}</div>
          <div className="code-float code-float-3">{'</>'}</div>
          <div className="code-float code-float-4">{'( )'}</div>
          <div className="code-float code-float-5">{'[ ]'}</div>
          <div className="code-float code-float-6">{'=> '}</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-primary-cyan text-sm">Available for freelance work</span>
              </div>
              
              <p className="text-primary-cyan text-lg md:text-xl mb-0 animate-fade-in">
                Hello, I'm
              </p>
              
              <h1 className="text-hero-name font-heading font-bold gradient-text mb-0 animate-fade-in" style={{ wordSpacing: '-20px' }}>
                Naitik Maisuriya
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <Terminal className="text-primary-cyan" size={28} />
                <span className="text-2xl md:text-3xl text-text-secondary font-heading typewriter">
                  Full Stack Developer
                </span>
              </div>
              
              <p className="text-lg md:text-xl text-text-secondary max-w-xl mb-8 animate-fade-in">
                I craft scalable web applications with modern technologies.
                Specialized in <span className="text-primary-cyan">MERN Stack Development</span>, <span className="text-primary-purple">Next.js</span>, 
                <span className="text-success"> PostgreSQL</span>, and <span className="text-[#4479A1]">MySQL</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in">
                <Link to="/contact" className="btn-primary inline-flex items-center group">
                  Let's Talk
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                
                <a
                  href="/resume.pdf"
                  download
                  className="btn-outline inline-flex items-center"
                >
                  Download Resume
                  <Download className="ml-2" size={20} />
                </a>
              </div>
            </div>
            
            {/* Right side - Code illustration */}
            <div className="hidden lg:block relative animate-fade-in">
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
              
              {/* Floating tech badges around terminal */}
              <div className="absolute -top-4 -right-4 tech-badge animate-float">
                <Code2 size={20} className="text-primary-cyan" />
              </div>
              <div className="absolute top-1/2 -right-8 tech-badge animate-float" style={{animationDelay: '1s'}}>
                <Database size={20} className="text-primary-purple" />
              </div>
              <div className="absolute -bottom-4 right-1/4 tech-badge animate-float" style={{animationDelay: '2s'}}>
                <Server size={20} className="text-success" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-cyan/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary-cyan rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-16 mt-12 border-y border-border overflow-hidden">
        <div className="tech-marquee">
          <div className="tech-marquee-content">
            {[...techStack, ...techStack].map((tech, index) => (
              <div key={index} className="tech-item">
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-text-secondary font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal animation="fade-right" duration={800}>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Abstract developer illustration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 rounded-3xl" />
                <div className="absolute inset-4 border-2 border-dashed border-primary-cyan/30 rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[Code2, Database, Server, Globe, Layers, GitBranch, Terminal, Braces, Smartphone].map((Icon, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-xl bg-cardBg border border-border flex items-center justify-center hover:border-primary-cyan hover:scale-110 transition-all duration-300 float-slow"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        <Icon className="text-primary-cyan" size={24} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-left" duration={800} delay={200}>
            <div>
              <h2 className="section-heading text-left">About Me</h2>
              <p className="text-text-secondary text-lg mb-6">
                I'm a passionate Full Stack Developer with <span className="text-primary-cyan font-semibold">1+ years</span> of 
                experience building web applications that make a difference. I specialize in creating 
                end-to-end solutions that are both beautiful and performant.
              </p>
              <p className="text-text-secondary text-lg mb-8">
                My journey in tech started with a curiosity for how things work on the internet. 
                Today, I transform complex problems into elegant, scalable solutions using 
                cutting-edge technologies.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Frontend', value: 'React, Next.js, TailwindCSS' },
                  { label: 'Backend', value: 'Node.js, Express.js, REST APIs' },
                  { label: 'Database', value: 'SQL, MongoDB, Redis' },
                  { label: 'Cloud & DevOps', value: 'Docker, GitHub Actions, AWS, Vercel' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-cardBg rounded-lg border border-border card-animated group">
                    <div className="text-primary-cyan text-sm mb-1 group-hover:text-primary-purple transition-colors">{item.label}</div>
                    <div className="text-text-primary font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
              
              <Link to="/about" className="btn-outline inline-flex items-center">
                Learn More About Me
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services/What I Do Section */}
      <section className="section-container gradient-orb-bg">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center mb-12">
            <h2 className="section-heading">What I Do</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              From concept to deployment, I provide comprehensive full-stack development services
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ScrollReveal 
              key={index} 
              animation="zoom-in" 
              delay={index * 100} 
              duration={500}
            >
              <div className="p-6 bg-cardBg rounded-xl border border-border group h-full hover:border-primary-cyan/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary-cyan/60 transition-all duration-300">
                  <service.icon className="text-primary-cyan" size={24} />
                </div>
                
                <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary-cyan transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-text-secondary mb-4">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-cardBg text-text-secondary border border-border group-hover:border-primary-cyan/50 group-hover:bg-primary-cyan/10 transition-all duration-300"
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

      {/* Stats Section */}
      <section className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Projects Completed', value: '10+', icon: Layers },
            { label: 'Years Experience', value: '1+', icon: Code2 },
            { label: 'Happy Clients', value: '2+', icon: Globe },
            { label: 'Certifications', value: '5+', icon: GitBranch },
          ].map((stat, index) => (
            <ScrollReveal 
              key={index} 
              animation="bounce-in" 
              delay={index * 100} 
              duration={600}
            >
              <div className="stat-card text-center group cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary-cyan/60 transition-all duration-300">
                  <stat.icon className="text-primary-cyan" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text-animated mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary group-hover:text-text-primary transition-colors">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-container gradient-orb-bg">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center mb-12">
            <h2 className="section-heading">Featured Projects</h2>
            <p className="text-text-secondary text-lg">
              Check out some of my recent work
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center">
            <div className="spinner" />
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Code2 className="mx-auto mb-4 text-text-secondary" size={48} />
            <p className="text-text-secondary">Projects coming soon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal 
                key={project.id} 
                animation="fade-up" 
                delay={idx * 150} 
                duration={600}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="project-card group relative block h-full"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-2xl opacity-0 group-hover:opacity-75 blur transition-all duration-500" />
                  
                  <div className="relative bg-cardBg rounded-2xl overflow-hidden border border-border group-hover:border-transparent transition-all duration-300 h-full">
                    {/* Image container */}
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={getProjectThumbnail(project, idx)}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-cardBg/20 to-transparent" />
                      
                      {/* Category badge */}
                      {project.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-cyan/20 text-primary-cyan backdrop-blur-sm border border-primary-cyan/30">
                            {project.category}
                          </span>
                        </div>
                      )}
                      
                      {/* View project button on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="px-6 py-3 bg-primary-cyan/90 rounded-full text-background font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Project
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-cyan transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-text-secondary mb-5 line-clamp-2 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(project.techTags) ? project.techTags : []).slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-text-secondary border border-border group-hover:border-primary-cyan/30 group-hover:text-primary-cyan transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal animation="fade-up" delay={400}>
          <div className="text-center mt-12">
            <Link to="/projects" className="btn-outline inline-flex items-center group btn-magnetic">
              View All Projects
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in" duration={800}>
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <h2 className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can 
              work together to bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center group">
                Start a Conversation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/projects" className="btn-outline inline-flex items-center">
                View My Work
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;
