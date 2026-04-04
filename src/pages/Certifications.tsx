import React, { useState } from 'react';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal, MagneticCard } from '@/components/effects';
import { 
  Award, ExternalLink, Calendar, CheckCircle2, 
  Shield, Code2, Database, Cloud, Layers, BookOpen, Eye
} from 'lucide-react';

// Certification categories
const categories = [
  { id: 'all', name: 'All', icon: Layers },
  { id: 'cloud', name: 'Cloud', icon: Cloud },
  { id: 'development', name: 'Development', icon: Code2 },
  { id: 'database', name: 'Database', icon: Database },
  { id: 'security', name: 'Security', icon: Shield },
];

// Certifications data
const certifications = [
  {
    id: 1,
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issuerLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop',
    category: 'cloud',
    dateIssued: '2024-01',
    expiryDate: '2027-01',
    credentialId: 'AWS-SAA-12345',
    credentialUrl: 'https://aws.amazon.com/verification',
    skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'Lambda'],
    description: 'Validates expertise in designing distributed systems on AWS.',
    featured: true,
  },
  {
    id: 2,
    name: 'Meta Front-End Developer Professional',
    issuer: 'Meta (Facebook)',
    issuerLogo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    category: 'development',
    dateIssued: '2023-11',
    expiryDate: null,
    credentialId: 'META-FED-67890',
    credentialUrl: 'https://coursera.org/verify',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'UI/UX'],
    description: 'Professional certification in front-end development with React.',
    featured: true,
  },
  {
    id: 3,
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    issuerLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    category: 'cloud',
    dateIssued: '2023-09',
    expiryDate: '2025-09',
    credentialId: 'GCP-PD-11111',
    credentialUrl: 'https://cloud.google.com/certification',
    skills: ['GCP', 'Cloud Functions', 'Kubernetes', 'BigQuery'],
    description: 'Demonstrates ability to build scalable applications on Google Cloud.',
    featured: false,
  },
  {
    id: 4,
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    issuerLogo: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=100&h=100&fit=crop',
    category: 'database',
    dateIssued: '2023-07',
    expiryDate: null,
    credentialId: 'MDB-DEV-22222',
    credentialUrl: 'https://university.mongodb.com',
    skills: ['MongoDB', 'NoSQL', 'Aggregation', 'Indexing'],
    description: 'Certified expertise in MongoDB database development and optimization.',
    featured: false,
  },
  {
    id: 5,
    name: 'Node.js Certified Developer',
    issuer: 'OpenJS Foundation',
    issuerLogo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop',
    category: 'development',
    dateIssued: '2023-05',
    expiryDate: null,
    credentialId: 'NODEJS-33333',
    credentialUrl: 'https://openjsf.org/certification',
    skills: ['Node.js', 'Express', 'REST APIs', 'npm'],
    description: 'Official certification for Node.js application development.',
    featured: false,
  },
  {
    id: 6,
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    issuerLogo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop',
    category: 'security',
    dateIssued: '2023-03',
    expiryDate: '2026-03',
    credentialId: 'SECPLUS-44444',
    credentialUrl: 'https://comptia.org/verify',
    skills: ['Security', 'Network Security', 'Cryptography', 'Risk Management'],
    description: 'Validates baseline cybersecurity skills and knowledge.',
    featured: false,
  },
  {
    id: 7,
    name: 'MySQL Database Administrator',
    issuer: 'Oracle',
    issuerLogo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop',
    category: 'database',
    dateIssued: '2023-01',
    expiryDate: null,
    credentialId: 'MYSQL-DBA-55555',
    credentialUrl: 'https://education.oracle.com',
    skills: ['MySQL', 'SQL', 'Database Admin', 'Performance Tuning'],
    description: 'Certified MySQL database administration and optimization.',
    featured: false,
  },
  {
    id: 8,
    name: 'Docker Certified Associate',
    issuer: 'Docker',
    issuerLogo: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=100&h=100&fit=crop',
    category: 'cloud',
    dateIssued: '2022-11',
    expiryDate: '2024-11',
    credentialId: 'DCA-66666',
    credentialUrl: 'https://docker.com/certification',
    skills: ['Docker', 'Containers', 'Docker Compose', 'Orchestration'],
    description: 'Validates expertise in containerization with Docker.',
    featured: false,
  },
];

const Certifications: React.FC = () => {
  useDocumentMeta('Certifications', 'My professional certifications and credentials');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  const filteredCerts = activeCategory === 'all' 
    ? certifications 
    : certifications.filter(c => c.category === activeCategory);

  const featuredCerts = certifications.filter(c => c.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-4 md:pt-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6">
              Certifications
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Professional certifications validating my expertise in various technologies
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Certifications', value: certifications.length.toString(), icon: Award },
            { label: 'Cloud Certs', value: certifications.filter(c => c.category === 'cloud').length.toString(), icon: Cloud },
            { label: 'Active', value: certifications.filter(c => !c.expiryDate || new Date(c.expiryDate) > new Date()).length.toString(), icon: CheckCircle2 },
            { label: 'Skills Covered', value: '25+', icon: BookOpen },
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

      {/* Featured Certifications */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-heading font-bold gradient-text mb-6">
            Featured Certifications
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredCerts.map((cert, index) => (
            <ScrollReveal key={cert.id} animation="fade-up" delay={index * 100}>
              <div className="group h-full">
                <div className="relative h-full">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                  
                  <div className="relative h-full bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-2xl border border-border/50 group-hover:border-transparent transition-all p-6 overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-cyan/5 rounded-full blur-3xl group-hover:bg-primary-cyan/10 transition-all duration-500" />
                    
                    <div className="flex items-start gap-5 relative">
                      {/* Icon with glow */}
                      <div className="relative flex-shrink-0">
                        <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center border border-primary-cyan/20 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary-cyan/50 transition-all duration-500 p-4">
                          <Award className="w-10 h-10 text-primary-cyan" />
                        </div>
                        {/* Glow */}
                        <div className="absolute inset-0 rounded-2xl bg-primary-cyan/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple text-white shadow-lg">
                            ⭐ Featured
                          </span>
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-success/20 text-success border border-success/30">
                            Active
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-bold group-hover:text-primary-cyan transition-colors mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-primary-cyan/80 text-sm mb-3">{cert.issuer}</p>
                        <p className="text-text-secondary text-sm mb-4 leading-relaxed">{cert.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-5">
                          {cert.skills.slice(0, 4).map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-cyan to-primary-cyan/80 text-background font-semibold text-sm hover:shadow-lg hover:shadow-primary-cyan/30 transition-all"
                          >
                            <ExternalLink size={14} />
                            Verify
                          </a>
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-cyan transition-colors"
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* All Certifications */}
      <section className="section-container">
        {/* Filters */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-wrap gap-2 mb-8">
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
        </ScrollReveal>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert, index) => (
            <ScrollReveal key={cert.id} animation="fade-up" delay={(index % 3) * 100}>
              <div 
                onClick={() => setSelectedCert(cert)}
                className="group h-full cursor-pointer"
              >
                <div className="relative h-full">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                  
                  <div className="relative h-full bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-2xl border border-border/50 group-hover:border-transparent transition-all p-6 flex flex-col overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-cyan/5 rounded-full blur-3xl group-hover:bg-primary-cyan/10 transition-all duration-500" />
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5 relative">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center border border-primary-cyan/20 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary-cyan/50 transition-all duration-500">
                          <Award className="w-7 h-7 text-primary-cyan" />
                        </div>
                        {/* Icon glow */}
                        <div className="absolute inset-0 rounded-2xl bg-primary-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                        !cert.expiryDate || new Date(cert.expiryDate) > new Date()
                          ? 'bg-success/20 text-success border border-success/30'
                          : 'bg-warning/20 text-warning border border-warning/30'
                      }`}>
                        {!cert.expiryDate || new Date(cert.expiryDate) > new Date() ? '✓ Active' : '⚠ Expired'}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary-cyan transition-colors line-clamp-2">
                      {cert.name}
                    </h3>
                    <p className="text-primary-cyan/70 text-sm mb-3">{cert.issuer}</p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-4">
                      <Calendar size={14} className="text-primary-cyan" />
                      <span>Issued: {new Date(cert.dateIssued).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4 flex-1">
                      {cert.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-lg bg-background/50 text-text-secondary border border-border/50">
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-lg bg-primary-cyan/10 text-primary-cyan border border-primary-cyan/20">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-border/30">
                      <span className="text-sm text-primary-cyan font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Details
                        <ExternalLink size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-cardBg rounded-2xl border border-border shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-background transition-colors"
            >
              ×
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold gradient-text">{selectedCert.name}</h2>
                <p className="text-text-secondary">{selectedCert.issuer}</p>
              </div>
            </div>

            <p className="text-text-secondary mb-6">{selectedCert.description}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Credential ID</p>
                <p className="font-mono text-sm">{selectedCert.credentialId}</p>
              </div>
              <div className="p-4 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Issue Date</p>
                <p className="text-sm">{new Date(selectedCert.dateIssued).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="p-4 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Expiry Date</p>
                <p className="text-sm">{selectedCert.expiryDate ? new Date(selectedCert.expiryDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'No Expiry'}</p>
              </div>
              <div className="p-4 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Status</p>
                <span className={`inline-flex items-center gap-1 text-sm ${
                  !selectedCert.expiryDate || new Date(selectedCert.expiryDate) > new Date()
                    ? 'text-success' : 'text-warning'
                }`}>
                  <CheckCircle2 size={14} />
                  {!selectedCert.expiryDate || new Date(selectedCert.expiryDate) > new Date() ? 'Active' : 'Expired'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Skills Validated</p>
              <div className="flex flex-wrap gap-2">
                {selectedCert.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 text-sm rounded-full bg-primary-cyan/10 text-primary-cyan border border-primary-cyan/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                <ExternalLink size={16} className="mr-2" />
                Verify Credential
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary-cyan" />
            <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
              Continuous Learning
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              I'm always expanding my knowledge. More certifications coming soon!
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Certifications;
