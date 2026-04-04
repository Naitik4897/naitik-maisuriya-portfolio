import React, { useEffect, useRef, useState } from 'react';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal } from '@/components/effects';
import { 
  Globe, Server, Database, GitBranch, Cloud, Wrench,
  Code2, Layers, Palette, Terminal, Cpu, Shield,
  Zap, CheckCircle2, Star
} from 'lucide-react';

// Skills data organized by category
const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Globe,
    color: 'primary-cyan',
    description: 'Building responsive, interactive, and performant user interfaces',
    skills: [
      { name: 'React.js', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 90, icon: '📘' },
      { name: 'Next.js', level: 85, icon: '▲' },
      { name: 'Vue.js', level: 80, icon: '💚' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
      { name: 'HTML5/CSS3', level: 98, icon: '🌐' },
      { name: 'JavaScript (ES6+)', level: 95, icon: '⚡' },
      { name: 'Redux/Zustand', level: 85, icon: '🔄' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    color: 'primary-purple',
    description: 'Creating robust APIs and server-side applications',
    skills: [
      { name: 'Node.js', level: 92, icon: '🟢' },
      { name: 'Express.js', level: 90, icon: '🚀' },
      { name: 'REST APIs', level: 95, icon: '🔗' },
      { name: 'GraphQL', level: 75, icon: '◈' },
      { name: 'Python', level: 70, icon: '🐍' },
      { name: 'PHP/Laravel', level: 65, icon: '🐘' },
      { name: 'Authentication/JWT', level: 90, icon: '🔐' },
      { name: 'WebSockets', level: 80, icon: '📡' },
    ],
  },
  {
    id: 'database',
    title: 'Database & Storage',
    icon: Database,
    color: 'success',
    description: 'Designing efficient database schemas and data management',
    skills: [
      { name: 'MySQL', level: 90, icon: '🗄️' },
      { name: 'PostgreSQL', level: 85, icon: '🐘' },
      { name: 'MongoDB', level: 88, icon: '🍃' },
      { name: 'Redis', level: 75, icon: '⚡' },
      { name: 'Firebase', level: 80, icon: '🔥' },
      { name: 'Prisma ORM', level: 85, icon: '◆' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    icon: Cloud,
    color: 'orange-500',
    description: 'Deploying and managing applications at scale',
    skills: [
      { name: 'AWS (EC2, S3, Lambda)', level: 75, icon: '☁️' },
      { name: 'Docker', level: 80, icon: '🐳' },
      { name: 'Git/GitHub', level: 95, icon: '📂' },
      { name: 'CI/CD (GitHub Actions)', level: 85, icon: '🔄' },
      { name: 'Linux/Ubuntu', level: 85, icon: '🐧' },
      { name: 'Nginx', level: 75, icon: '⚙️' },
      { name: 'Vercel/Netlify', level: 90, icon: '▲' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    icon: Wrench,
    color: 'primary-cyan',
    description: 'Productivity tools and development workflow',
    skills: [
      { name: 'VS Code', level: 98, icon: '💻' },
      { name: 'Figma', level: 75, icon: '🎨' },
      { name: 'Postman', level: 90, icon: '📮' },
      { name: 'Jira/Trello', level: 85, icon: '📋' },
      { name: 'npm/yarn/pnpm', level: 95, icon: '📦' },
      { name: 'Webpack/Vite', level: 85, icon: '⚡' },
    ],
  },
];

// Core competencies
const coreCompetencies = [
  { icon: Code2, title: 'Clean Code', description: 'Writing maintainable, readable, and scalable code' },
  { icon: Layers, title: 'System Design', description: 'Architecting solutions for complex problems' },
  { icon: Palette, title: 'UI/UX Principles', description: 'Creating intuitive user experiences' },
  { icon: Terminal, title: 'Problem Solving', description: 'Debugging and optimizing applications' },
  { icon: Cpu, title: 'Performance', description: 'Optimizing for speed and efficiency' },
  { icon: Shield, title: 'Security', description: 'Implementing secure coding practices' },
];

// Animated skill bar component
const SkillBar: React.FC<{ name: string; level: number; icon: string; delay: number; color: string }> = ({ 
  name, level, icon, delay, color 
}) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const getColorClass = () => {
    switch (color) {
      case 'primary-cyan': return 'from-primary-cyan to-blue-400';
      case 'primary-purple': return 'from-primary-purple to-pink-500';
      case 'success': return 'from-success to-emerald-400';
      case 'orange-500': return 'from-orange-500 to-yellow-500';
      default: return 'from-primary-cyan to-primary-purple';
    }
  };

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-text-primary font-medium group-hover:text-primary-cyan transition-colors">
            {name}
          </span>
        </div>
        <span className={`text-sm font-semibold ${animated ? 'text-primary-cyan' : 'text-text-secondary'}`}>
          {animated ? `${level}%` : '0%'}
        </span>
      </div>
      <div className="h-2 bg-cardBg rounded-full overflow-hidden border border-border">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${getColorClass()} transition-all duration-1000 ease-out`}
          style={{ 
            width: animated ? `${level}%` : '0%',
            boxShadow: animated ? `0 0 10px ${color === 'primary-cyan' ? 'rgba(0, 212, 255, 0.5)' : color === 'primary-purple' ? 'rgba(123, 47, 255, 0.5)' : color === 'success' ? 'rgba(0, 255, 136, 0.5)' : 'rgba(249, 115, 22, 0.5)'}` : 'none'
          }}
        />
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  useDocumentMeta('Skills', 'My technical skills and expertise as a Full Stack Developer');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-4 md:pt-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6">
              Technical Skills
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              A comprehensive toolkit built over 5+ years of hands-on development experience
            </p>
          </div>
        </ScrollReveal>

        {/* Skills Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Languages', value: '8+', icon: Code2 },
            { label: 'Frameworks', value: '10+', icon: Layers },
            { label: 'Tools', value: '20+', icon: Wrench },
            { label: 'Years Coding', value: '5+', icon: Zap },
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

      {/* Skills Categories */}
      <section className="section-container pt-0">
        <div className="space-y-12">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={category.id} animation="fade-up" delay={catIndex * 50}>
              <div className="card card-glass">
                {/* Category Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-${category.color}/10 border border-${category.color}/20 flex items-center justify-center flex-shrink-0`}
                    style={{
                      backgroundColor: category.color === 'primary-cyan' ? 'rgba(0, 212, 255, 0.1)' : 
                                      category.color === 'primary-purple' ? 'rgba(123, 47, 255, 0.1)' : 
                                      category.color === 'success' ? 'rgba(0, 255, 136, 0.1)' : 
                                      'rgba(249, 115, 22, 0.1)',
                      borderColor: category.color === 'primary-cyan' ? 'rgba(0, 212, 255, 0.2)' : 
                                   category.color === 'primary-purple' ? 'rgba(123, 47, 255, 0.2)' : 
                                   category.color === 'success' ? 'rgba(0, 255, 136, 0.2)' : 
                                   'rgba(249, 115, 22, 0.2)'
                    }}
                  >
                    <category.icon 
                      size={28} 
                      style={{
                        color: category.color === 'primary-cyan' ? '#00D4FF' : 
                               category.color === 'primary-purple' ? '#7B2FFF' : 
                               category.color === 'success' ? '#00FF88' : 
                               '#f97316'
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-text-primary">
                      {category.title}
                    </h2>
                    <p className="text-text-secondary">{category.description}</p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar 
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      delay={skillIndex * 100}
                      color={category.color}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Core Competencies */}
      <section className="section-container gradient-orb-bg">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="section-heading">Core Competencies</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Beyond technical skills — the principles that guide my work
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreCompetencies.map((comp, index) => (
            <ScrollReveal key={index} animation="zoom-in" delay={index * 100}>
              <div className="card text-center group h-full hover:scale-105 transition-all duration-300">
                {/* Frosted icon container */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-cyan/30 to-primary-purple/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-primary-cyan/30 group-hover:scale-110 transition-all duration-300">
                    <comp.icon className="text-primary-cyan w-9 h-9" />
                  </div>
                </div>
                
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-cyan transition-colors">{comp.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{comp.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Currently Learning */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="section-heading">Currently Learning</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Always expanding my skillset with emerging technologies
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: 'Rust', icon: '🦀' },
            { name: 'Web3/Blockchain', icon: '⛓️' },
            { name: 'AI/ML Integration', icon: '🤖' },
            { name: 'Kubernetes', icon: '☸️' },
            { name: 'Go', icon: '🔵' },
            { name: 'React Native', icon: '📱' },
          ].map((tech, index) => (
            <ScrollReveal key={index} animation="bounce-in" delay={index * 100}>
              <div className="card card-animated inline-flex items-center gap-3 px-6 py-3 group">
                <span className="text-2xl">{tech.icon}</span>
                <span className="font-medium group-hover:text-primary-cyan transition-colors">{tech.name}</span>
                <Zap size={16} className="text-primary-cyan animate-pulse" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Certifications Preview */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <Star className="w-16 h-16 mx-auto mb-6 text-primary-cyan" />
            <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
              Certified & Verified
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              My skills are backed by industry-recognized certifications from leading platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/certifications" className="btn-primary inline-flex items-center">
                View Certifications
                <CheckCircle2 className="ml-2" size={18} />
              </a>
              <a href="/projects" className="btn-outline inline-flex items-center">
                See Skills in Action
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Skills;
