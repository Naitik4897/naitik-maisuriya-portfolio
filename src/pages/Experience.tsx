import React from 'react';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal } from '@/components/effects';
import { 
  Briefcase, Calendar, MapPin, ExternalLink, 
  CheckCircle2, Award, TrendingUp, Users, Code2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Experience data
const experiences = [
  {
    id: 1,
    role: 'Senior Full Stack Developer',
    company: 'TransForm Solutions',
    companyUrl: 'https://transformsolutions.com',
    location: 'India',
    type: 'Full-time',
    startDate: 'Jan 2024',
    endDate: 'Present',
    current: true,
    description: 'Leading development of enterprise web applications, architecting scalable solutions, and mentoring junior developers.',
    responsibilities: [
      'Architecting and developing full-stack applications using React, Node.js, and MySQL',
      'Leading a team of 5 developers on multiple concurrent projects',
      'Implementing CI/CD pipelines and DevOps best practices',
      'Conducting code reviews and establishing coding standards',
      'Collaborating with clients to gather requirements and deliver solutions',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'MySQL', 'AWS', 'Docker'],
    achievements: [
      { metric: '40%', label: 'Faster Delivery' },
      { metric: '5+', label: 'Projects Led' },
      { metric: '99.9%', label: 'Uptime Achieved' },
    ],
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Tech Innovations Inc.',
    companyUrl: '#',
    location: 'Remote',
    type: 'Full-time',
    startDate: 'Jun 2022',
    endDate: 'Dec 2023',
    current: false,
    description: 'Built scalable web applications and APIs for various clients across different industries.',
    responsibilities: [
      'Developed responsive web applications using React and Vue.js',
      'Built RESTful APIs and microservices with Node.js and Express',
      'Optimized database queries and improved application performance',
      'Integrated third-party services and payment gateways',
      'Participated in agile sprints and daily standups',
    ],
    technologies: ['React', 'Vue.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    achievements: [
      { metric: '15+', label: 'Projects Completed' },
      { metric: '30%', label: 'Performance Boost' },
      { metric: '100K+', label: 'Users Served' },
    ],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Digital Creatives Agency',
    companyUrl: '#',
    location: 'India',
    type: 'Full-time',
    startDate: 'Aug 2021',
    endDate: 'May 2022',
    current: false,
    description: 'Created beautiful and responsive user interfaces for clients ranging from startups to enterprises.',
    responsibilities: [
      'Developed pixel-perfect responsive websites from design mockups',
      'Built interactive UI components using React and CSS animations',
      'Collaborated with designers to improve UX/UI',
      'Ensured cross-browser compatibility and accessibility',
      'Maintained and updated existing client websites',
    ],
    technologies: ['React', 'JavaScript', 'SCSS', 'Tailwind CSS', 'Figma'],
    achievements: [
      { metric: '20+', label: 'Websites Built' },
      { metric: '95%', label: 'Client Satisfaction' },
      { metric: '50%', label: 'Faster Load Times' },
    ],
  },
  {
    id: 4,
    role: 'Junior Web Developer',
    company: 'StartUp Hub',
    companyUrl: '#',
    location: 'India',
    type: 'Full-time',
    startDate: 'Jan 2021',
    endDate: 'Jul 2021',
    current: false,
    description: 'Started my professional journey building web applications and learning industry best practices.',
    responsibilities: [
      'Developed features for web applications using JavaScript and React',
      'Fixed bugs and improved existing codebase',
      'Learned version control with Git and collaborative development',
      'Assisted senior developers in project implementations',
      'Participated in code reviews and knowledge sharing sessions',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    achievements: [
      { metric: '10+', label: 'Features Built' },
      { metric: '100%', label: 'Tasks Completed' },
      { metric: 'Fast', label: 'Learning Curve' },
    ],
  },
];

// Stats
const stats = [
  { icon: Briefcase, value: '5+', label: 'Years Experience' },
  { icon: Code2, value: '50+', label: 'Projects Completed' },
  { icon: Users, value: '30+', label: 'Happy Clients' },
  { icon: Award, value: '10+', label: 'Certifications' },
];

const Experience: React.FC = () => {
  useDocumentMeta('Experience', 'My professional work experience as a Full Stack Developer');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-4 md:pt-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6">
              Professional Experience
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              My journey as a developer — from writing my first lines of code to leading development teams
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
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

      {/* Timeline Section */}
      <section className="section-container pt-0">
        <div className="relative">
          {/* Center timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-cyan via-primary-purple to-success hidden md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-cyan via-primary-purple to-success md:hidden" />

          {experiences.map((exp, index) => (
            <ScrollReveal 
              key={exp.id} 
              animation={index % 2 === 0 ? 'fade-right' : 'fade-left'} 
              delay={index * 100}
            >
              <div className={`relative flex items-start mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-8 z-10">
                  <div className={`w-4 h-4 rounded-full border-4 ${exp.current ? 'border-success bg-success/20 animate-pulse' : 'border-primary-cyan bg-primary-cyan/20'}`} />
                </div>

                {/* Content card */}
                <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="group relative">
                    {/* Animated gradient border */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                    
                    <div className="relative bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-2xl border border-border/50 group-hover:border-transparent transition-all p-6 overflow-hidden">
                      {/* Background glow */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-primary-cyan/5 rounded-full blur-3xl group-hover:bg-primary-cyan/10 transition-all duration-500" />
                      
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5 relative">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            {exp.current && (
                              <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-success/20 to-success/10 text-success border border-success/30 animate-pulse">
                                🟢 Current
                              </span>
                            )}
                            <span className="px-3 py-1 text-xs font-medium text-primary-cyan bg-primary-cyan/10 rounded-full border border-primary-cyan/20">{exp.type}</span>
                          </div>
                          <h3 className="text-xl font-heading font-bold text-text-primary group-hover:text-primary-cyan transition-colors mb-1">
                            {exp.role}
                          </h3>
                          <a 
                            href={exp.companyUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-primary-cyan hover:text-primary-purple transition-colors font-medium"
                          >
                            {exp.company}
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 mb-5 text-sm text-text-secondary">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50">
                          <Calendar size={14} className="text-primary-cyan" />
                          {exp.startDate} — {exp.endDate}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50">
                          <MapPin size={14} className="text-primary-purple" />
                          {exp.location}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary mb-5 leading-relaxed">{exp.description}</p>

                      {/* Responsibilities */}
                      <div className="mb-5">
                        <h4 className="text-sm font-bold text-text-primary mb-3">Key Responsibilities:</h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                              <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 size={12} className="text-success" />
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {exp.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20 hover:border-primary-cyan/50 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border/30">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="text-center p-3 rounded-xl bg-background/30 border border-border/30 group-hover:border-primary-cyan/20 transition-all">
                            <div className="text-xl font-bold gradient-text">{achievement.metric}</div>
                            <div className="text-xs text-text-secondary">{achievement.label}</div>
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

      {/* Career Growth */}
      <section className="section-container gradient-orb-bg">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="section-heading">Career Growth</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Continuously learning and evolving with the tech industry
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          <ScrollReveal animation="zoom-in" delay={100}>
            <div className="card text-center group h-full hover:scale-105 transition-all duration-300">
              {/* Frosted icon container */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-cyan/30 to-primary-cyan/10 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-transparent backdrop-blur-sm border border-primary-cyan/20 flex items-center justify-center group-hover:border-primary-cyan/40 group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="text-primary-cyan w-9 h-9" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-cyan transition-colors">Continuous Learning</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Staying updated with latest technologies and best practices through courses, certifications, and hands-on projects.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" delay={200}>
            <div className="card text-center group h-full hover:scale-105 transition-all duration-300">
              {/* Frosted icon container */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-purple/30 to-primary-purple/10 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary-purple/20 to-transparent backdrop-blur-sm border border-primary-purple/20 flex items-center justify-center group-hover:border-primary-purple/40 group-hover:scale-110 transition-all duration-300">
                  <Users className="text-primary-purple w-9 h-9" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-purple transition-colors">Team Leadership</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Mentoring junior developers, conducting code reviews, and fostering a collaborative team environment.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" delay={300}>
            <div className="card text-center group h-full hover:scale-105 transition-all duration-300">
              {/* Frosted icon container */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-success/30 to-success/10 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-success/20 to-transparent backdrop-blur-sm border border-success/20 flex items-center justify-center group-hover:border-success/40 group-hover:scale-110 transition-all duration-300">
                  <Award className="text-success w-9 h-9" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-success transition-colors">Achievements</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Recognized for delivering high-quality solutions and consistently exceeding project expectations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <Briefcase className="w-16 h-16 mx-auto mb-6 text-primary-cyan" />
            <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
              Let's Work Together
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Looking for a dedicated developer for your next project? I'd love to discuss how my experience can help bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center">
                Get In Touch
              </Link>
              <Link to="/projects" className="btn-outline inline-flex items-center">
                View My Projects
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Experience;
