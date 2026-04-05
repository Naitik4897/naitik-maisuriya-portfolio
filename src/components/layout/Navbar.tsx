import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks';

const navLinks = [
  { name: 'Home', sectionId: 'home' },
  { name: 'About', sectionId: 'about' },
  { name: 'Skills', sectionId: 'skills' },
  { name: 'Experience', sectionId: 'experience' },
  { name: 'Projects', sectionId: 'projects' },
  { name: 'Services', sectionId: 'services' },
  { name: 'Contact', sectionId: 'contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 20;

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.sectionId).reverse();
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
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
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-glass border-b border-primary-cyan/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-2xl font-heading font-bold gradient-text cursor-pointer"
            >
              Naitik Maisuriya
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    activeSection === link.sectionId
                      ? 'text-primary-cyan'
                      : 'text-text-primary hover:text-primary-cyan'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-cyan transform origin-left transition-transform duration-200 ${
                      activeSection === link.sectionId ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-text-primary hover:text-primary-cyan transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-glass pt-20">
          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className={`text-2xl font-heading font-medium transition-colors duration-200 ${
                  activeSection === link.sectionId
                    ? 'text-primary-cyan'
                    : 'text-text-primary hover:text-primary-cyan'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
