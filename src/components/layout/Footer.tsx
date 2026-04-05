import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-cardBg border-t border-border relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
              Naitik Maisuriya
            </h3>
            <p className="text-text-secondary mb-4">
              Full Stack Developer specializing in React, TypeScript, Node.js, and MySQL.
              Building scalable web applications with modern technologies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/naiitikmaisuriya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-cyan transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/naiitikmaisuriya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-cyan transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/naiitikmaisuriya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-cyan transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="mailto:naitikmaisuriya27@gmail.com"
                className="text-text-secondary hover:text-primary-cyan transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-primary-cyan">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-text-secondary hover:text-primary-cyan transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="text-text-secondary hover:text-primary-cyan transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-text-secondary hover:text-primary-cyan transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-text-secondary hover:text-primary-cyan transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-primary-cyan">
              Services
            </h4>
            <ul className="space-y-2">
              <li className="text-text-secondary">Web Development</li>
              <li className="text-text-secondary">API Integration</li>
              <li className="text-text-secondary">Database Design</li>
              <li className="text-text-secondary">Performance Optimization</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-text-secondary flex items-center justify-center">
            Made with <Heart size={16} className="mx-2 text-error" fill="currentColor" /> by{' '}
            <span className="ml-1 text-primary-cyan">Naitik Maisuriya</span>
          </p>
          <p className="text-text-secondary text-sm mt-2">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
