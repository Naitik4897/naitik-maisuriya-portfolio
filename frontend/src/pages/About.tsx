import React from 'react';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal } from '@/components/effects';
import { 
  Code2, Database, Server, Globe, Layers, 
  Terminal, Award, BookOpen, Coffee,
  Rocket, Heart, Users, Target, CheckCircle2, MapPin, Mail, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Values/Philosophy
const values = [
  { icon: Rocket, title: 'Innovation', description: 'Always exploring new technologies and approaches' },
  { icon: Heart, title: 'Passion', description: 'Deeply passionate about creating great software' },
  { icon: Users, title: 'Collaboration', description: 'Strong believer in teamwork and communication' },
  { icon: Target, title: 'Quality', description: 'Committed to delivering high-quality code' },
];

// Quick facts
const quickFacts = [
  { icon: MapPin, label: 'Location', value: 'India' },
  { icon: Calendar, label: 'Experience', value: '5+ Years' },
  { icon: Code2, label: 'Projects', value: '50+' },
  { icon: Mail, label: 'Available', value: 'Freelance' },
];

const About: React.FC = () => {
  useDocumentMeta('About', 'Learn more about me, my skills, and my journey as a Full Stack Developer');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-4 md:pt-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6">
              About Me
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              A passionate Full Stack Developer crafting digital experiences that matter
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image / Illustration */}
          <ScrollReveal animation="fade-right" delay={200}>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-cyan/20 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-primary-purple/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                
                {/* Center content */}
                <div className="absolute inset-12 flex items-center justify-center">
                  <div className="text-center relative">
                    {/* Clean terminal-style container */}
                    <div className="relative w-40 h-40 mx-auto mb-4">
                      {/* Glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-2xl opacity-30 blur-lg" />
                      
                      {/* Terminal window */}
                      <div className="relative h-full bg-cardBg rounded-2xl border border-primary-cyan/30 overflow-hidden">
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-black/30 border-b border-primary-cyan/20">
                          <div className="w-2.5 h-2.5 rounded-full bg-error" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          <div className="w-2.5 h-2.5 rounded-full bg-success" />
                        </div>
                        
                        {/* Terminal content */}
                        <div className="p-4 font-mono text-sm">
                          <div className="text-primary-cyan">$ whoami</div>
                          <div className="text-text-primary mt-1">naitik</div>
                          <div className="text-primary-cyan mt-2">$ role</div>
                          <div className="text-success mt-1">Full Stack Dev</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats badge */}
                    <div className="inline-flex items-center gap-2 bg-cardBg/80 backdrop-blur-sm rounded-full px-5 py-2 border border-primary-cyan/20">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-text-primary font-heading font-bold">5+ Years Experience</span>
                    </div>
                  </div>
                </div>

                {/* Floating icons */}
                {[
                  { Icon: Code2, top: '5%', left: '45%' },
                  { Icon: Database, top: '20%', left: '80%' },
                  { Icon: Server, top: '55%', left: '85%' },
                  { Icon: Globe, top: '80%', left: '55%' },
                  { Icon: Terminal, top: '70%', left: '10%' },
                  { Icon: Layers, top: '25%', left: '5%' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="absolute w-12 h-12 rounded-xl bg-cardBg border border-border flex items-center justify-center float-slow"
                    style={{
                      top: item.top,
                      left: item.left,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    <item.Icon className="text-primary-cyan" size={20} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Bio Content */}
          <ScrollReveal animation="fade-left" delay={300}>
            <div>
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">
                Hi, I'm <span className="gradient-text">Naitik Maisuriya</span>
              </h2>
              
              <div className="space-y-4 text-text-secondary text-lg">
                <p>
                  I'm a <span className="text-primary-cyan font-semibold">Full Stack Developer</span> with 
                  over 5 years of experience in building web applications. I specialize in creating 
                  scalable, performant, and user-friendly solutions using modern technologies.
                </p>
                <p>
                  My journey in tech began with a fascination for how things work on the internet. 
                  Today, I transform complex ideas into elegant, functional applications that make 
                  a real impact on businesses and users alike.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing my knowledge through technical writing and mentoring.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact" className="btn-primary inline-flex items-center">
                  <Coffee className="mr-2" size={18} />
                  Let's Talk
                </Link>
                <a href="/resume.pdf" download className="btn-outline inline-flex items-center">
                  <BookOpen className="mr-2" size={18} />
                  Download Resume
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickFacts.map((fact, index) => (
            <ScrollReveal key={index} animation="bounce-in" delay={index * 100}>
              <div className="stat-card text-center group cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary-cyan/60 transition-all duration-300">
                  <fact.icon className="text-primary-cyan" size={24} />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{fact.value}</div>
                <div className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">{fact.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="section-container gradient-orb-bg">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="section-heading">My Values</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Principles that guide my work and collaboration
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ScrollReveal key={index} animation="zoom-in" delay={index * 100}>
              <div className="card text-center group h-full hover:scale-105 transition-all duration-300">
                {/* Frosted icon container */}
                <div className="relative w-20 h-20 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-cyan/30 to-primary-purple/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-primary-cyan/30 group-hover:scale-110 transition-all duration-300">
                    <value.icon className="text-primary-cyan w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary-cyan transition-colors">{value.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Quick Links to Skills & Experience */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal animation="fade-right" delay={100}>
            <Link to="/skills" className="card card-glass group block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-cyan/20 transition-all duration-300">
                  <Code2 className="text-primary-cyan" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold group-hover:text-primary-cyan transition-colors">
                    Technical Skills
                  </h3>
                  <p className="text-text-secondary">View my full skillset and expertise</p>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <Link to="/experience" className="card card-glass group block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-purple/10 border border-primary-purple/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-purple/20 transition-all duration-300">
                  <Award className="text-primary-purple" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold group-hover:text-primary-purple transition-colors">
                    Experience
                  </h3>
                  <p className="text-text-secondary">My professional journey & achievements</p>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <Award className="w-16 h-16 mx-auto mb-6 text-primary-cyan" />
            <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
              Let's Work Together
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it and discuss how I can help 
              bring your vision to life.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center">
              Get In Touch
              <CheckCircle2 className="ml-2" size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default About;
