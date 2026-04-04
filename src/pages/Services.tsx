import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal, MagneticCard } from '@/components/effects';
import { 
  Globe, Server, Database, Cloud, Code2, Smartphone, 
  Palette, Shield, Zap, Users, MessageSquare, CheckCircle2,
  ArrowRight, ChevronDown, Layers, Rocket, Settings, HeadphonesIcon
} from 'lucide-react';

// Main services
const mainServices = [
  {
    icon: Globe,
    title: 'Frontend Development',
    description: 'Building responsive, interactive user interfaces that deliver exceptional user experiences across all devices.',
    features: [
      'Custom React/Next.js Applications',
      'Responsive Web Design',
      'Performance Optimization',
      'Cross-browser Compatibility',
      'Accessibility (WCAG) Compliance',
      'Progressive Web Apps (PWA)',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Creating robust, scalable server-side applications and APIs that power your business logic.',
    features: [
      'RESTful API Development',
      'GraphQL API Design',
      'Authentication & Authorization',
      'Third-party Integrations',
      'Real-time Applications',
      'Microservices Architecture',
    ],
    technologies: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'Socket.io'],
  },
  {
    icon: Database,
    title: 'Database Solutions',
    description: 'Designing efficient database architectures and optimizing data management for peak performance.',
    features: [
      'Database Schema Design',
      'Query Optimization',
      'Data Migration',
      'Backup & Recovery',
      'Database Security',
      'Caching Strategies',
    ],
    technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Deploying and managing applications on cloud platforms with automated CI/CD pipelines.',
    features: [
      'Cloud Architecture Design',
      'CI/CD Pipeline Setup',
      'Container Orchestration',
      'Infrastructure as Code',
      'Monitoring & Logging',
      'Auto-scaling Solutions',
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Building cross-platform mobile applications that work seamlessly on iOS and Android.',
    features: [
      'React Native Development',
      'Cross-platform Apps',
      'Native Performance',
      'Offline Support',
      'Push Notifications',
      'App Store Deployment',
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Firebase'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive, visually appealing designs that enhance user engagement and satisfaction.',
    features: [
      'User Interface Design',
      'User Experience Research',
      'Wireframing & Prototyping',
      'Design Systems',
      'Responsive Design',
      'Animation & Interactions',
    ],
    technologies: ['Figma', 'Adobe XD', 'Tailwind CSS', 'Framer Motion', 'CSS3'],
  },
];

// Work process
const workProcess = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Discovery',
    description: 'Understanding your vision, goals, and requirements through detailed discussions.',
  },
  {
    step: '02',
    icon: Layers,
    title: 'Planning',
    description: 'Creating a comprehensive roadmap with timelines, milestones, and deliverables.',
  },
  {
    step: '03',
    icon: Code2,
    title: 'Development',
    description: 'Building your solution with clean code, regular updates, and iterative feedback.',
  },
  {
    step: '04',
    icon: Settings,
    title: 'Testing',
    description: 'Rigorous testing to ensure quality, performance, and security standards.',
  },
  {
    step: '05',
    icon: Rocket,
    title: 'Deployment',
    description: 'Launching your project with seamless deployment and documentation.',
  },
  {
    step: '06',
    icon: HeadphonesIcon,
    title: 'Support',
    description: 'Ongoing maintenance, updates, and support to keep your project running smoothly.',
  },
];

// Pricing packages
const packages = [
  {
    name: 'Starter',
    price: '$999',
    description: 'Perfect for small projects and MVPs',
    features: [
      'Single Page Application',
      'Responsive Design',
      'Basic SEO Setup',
      '3 Revisions',
      '1 Month Support',
      'Source Code Delivery',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$2,499',
    description: 'Ideal for growing businesses',
    features: [
      'Multi-page Application',
      'Custom Backend API',
      'Database Integration',
      'User Authentication',
      'Unlimited Revisions',
      '3 Months Support',
      'Performance Optimization',
      'Analytics Integration',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For complex, large-scale projects',
    features: [
      'Full-stack Development',
      'Microservices Architecture',
      'Cloud Infrastructure',
      'CI/CD Pipeline',
      'Advanced Security',
      '6 Months Support',
      'Dedicated Support',
      'SLA Agreement',
    ],
    highlighted: false,
  },
];

// FAQ
const faqs = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications may take 2-6 months. I provide detailed timelines during the planning phase.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes! I offer flexible maintenance packages that include bug fixes, security updates, performance monitoring, and feature enhancements to keep your project running smoothly.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in React, TypeScript, Node.js, and MySQL for full-stack development. I also work with Next.js, PostgreSQL, MongoDB, AWS, and various modern frameworks.',
  },
  {
    question: 'How do you handle project communication?',
    answer: 'I maintain clear communication through regular updates, progress reports, and scheduled calls. You\'ll have direct access to me throughout the project lifecycle.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Absolutely. I respect the confidentiality of all projects and am happy to sign NDAs before discussing project details.',
  },
  {
    question: 'What is your payment structure?',
    answer: 'I typically work with a 50% upfront payment and 50% upon completion. For larger projects, we can arrange milestone-based payments.',
  },
];

const Services: React.FC = () => {
  useDocumentMeta('Services', 'Professional web development services - Frontend, Backend, Full Stack');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-4 md:pt-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6">
              My Services
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive web development solutions tailored to bring your ideas to life
            </p>
          </div>
        </ScrollReveal>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Zap, label: 'Fast Delivery', value: '2-4 Weeks' },
            { icon: Shield, label: 'Secure Code', value: '100%' },
            { icon: Users, label: 'Happy Clients', value: '50+' },
            { icon: CheckCircle2, label: 'Projects Done', value: '80+' },
          ].map((stat, index) => (
            <ScrollReveal key={index} animation="bounce-in" delay={index * 100}>
              <div className="stat-card text-center group cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary-cyan/60 transition-all duration-300">
                  <stat.icon className="text-primary-cyan" size={24} />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-text-secondary text-sm group-hover:text-primary-cyan transition-colors">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Main Services */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center gradient-text mb-4">
            What I Offer
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            End-to-end development services covering every aspect of modern web applications
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={(index % 3) * 100}>
              <div className="p-6 bg-cardBg rounded-xl border border-border group h-full flex flex-col hover:border-primary-cyan/30 transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary-cyan/60 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary-cyan" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Features with checkmarks */}
                <ul className="space-y-2.5 mb-5 flex-1">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={12} className="text-success" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-5 border-t border-border/50">
                  {service.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-cardBg text-text-secondary border border-border group-hover:border-primary-cyan/50 group-hover:bg-primary-cyan/10 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Work Process */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center gradient-text mb-4">
            How I Work
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            A structured approach to ensure project success from start to finish
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workProcess.map((step, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={(index % 3) * 100}>
              <div className="card-animated group relative h-full">
                {/* Step number background */}
                <div className="absolute -top-2 -right-2 text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-cyan/10 to-primary-purple/10 group-hover:from-primary-cyan/20 group-hover:to-primary-purple/20 transition-all duration-500 select-none">
                  {step.step}
                </div>
                
                <div className="relative">
                  {/* Header with icon and step badge */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center border border-primary-cyan/20 group-hover:scale-110 group-hover:border-primary-cyan/50 transition-all duration-300 relative">
                      <step.icon className="w-7 h-7 text-primary-cyan" />
                      {/* Icon glow */}
                      <div className="absolute inset-0 rounded-2xl bg-primary-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="px-3 py-1.5 text-xs font-bold text-primary-cyan bg-primary-cyan/10 rounded-full border border-primary-cyan/30">
                      Step {step.step}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-cyan transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center gradient-text mb-4">
            Pricing Packages
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            Flexible pricing options to suit projects of all sizes
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
              <div className={`relative h-full ${pkg.highlighted ? 'scale-105 z-10' : ''}`}>
                {pkg.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-primary-cyan to-primary-purple text-background text-xs font-bold rounded-full shadow-lg shadow-primary-cyan/30 z-20">
                    ⭐ Most Popular
                  </div>
                )}
                
                <div className="group h-full">
                  <div className="relative h-full">
                    {/* Animated gradient border for highlighted */}
                    {pkg.highlighted && (
                      <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-100 blur-sm" />
                    )}
                    
                    <div className={`relative h-full rounded-2xl p-7 flex flex-col overflow-hidden ${
                      pkg.highlighted 
                        ? 'bg-gradient-to-b from-cardBg to-[#0f0f1a] border-2 border-transparent' 
                        : 'bg-gradient-to-b from-cardBg to-[#0f0f1a] border border-border/50 group-hover:border-primary-cyan/30'
                    } transition-all duration-500`}>
                      {/* Background glow for highlighted */}
                      {pkg.highlighted && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary-cyan/10 rounded-full blur-3xl" />
                      )}
                      
                      <h3 className="text-2xl font-heading font-bold mb-2 relative">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1 mb-3 relative">
                        <span className="text-5xl font-bold gradient-text">{pkg.price}</span>
                        {pkg.price !== 'Custom' && <span className="text-text-secondary text-sm">/project</span>}
                      </div>
                      <p className="text-text-secondary text-sm mb-6 relative">{pkg.description}</p>
                      
                      <ul className="space-y-3 mb-6 flex-1 relative">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm">
                            <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle2 size={12} className="text-success" />
                            </div>
                            <span className="text-text-secondary group-hover:text-text-primary transition-colors">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link 
                        to="/contact" 
                        className={`relative w-full text-center py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                          pkg.highlighted
                            ? 'bg-gradient-to-r from-primary-cyan to-primary-purple text-background hover:shadow-lg hover:shadow-primary-cyan/30 hover:-translate-y-1'
                            : 'bg-cardBg border border-border hover:border-primary-cyan hover:text-primary-cyan hover:shadow-lg hover:shadow-primary-cyan/10 hover:-translate-y-1'
                        }`}
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center gradient-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            Common questions about my services and process
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 50}>
              <div className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:text-primary-cyan transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180 text-primary-cyan' : ''}`} 
                    size={20} 
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="px-4 pb-4 text-text-secondary">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <Code2 className="w-16 h-16 mx-auto mb-6 text-primary-cyan" />
            <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center">
                Get in Touch
                <ArrowRight className="ml-2" size={18} />
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

export default Services;
