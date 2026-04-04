import React, { useState } from 'react';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal } from '@/components/effects';
import { 
  Mail, Phone, MapPin, Send, Github, Linkedin, Twitter,
  Clock, MessageSquare, CheckCircle2, Loader2,
  Calendar, Coffee, Globe, MessageCircle
} from 'lucide-react';
import { submitContactFormViaEmail } from '@/utils/email';

// Contact info
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'naitikmaisuriya9@gmail.com',
    link: 'mailto:naitikmaisuriya9@gmail.com',
    description: 'Best for detailed inquiries',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 8485939130',
    link: 'https://wa.me/918485939130',
    description: 'Quick response guaranteed',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    link: null,
    description: 'Available for remote work',
  },
];

// Social links
const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/naitikmaisuriya', color: 'hover:text-white' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/naitikmaisuriya', color: 'hover:text-[#0077B5]' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/naitikmaisuriya', color: 'hover:text-[#1DA1F2]' },
];

// FAQ
const faqs = [
  {
    question: 'What is your typical response time?',
    answer: 'I typically respond to all inquiries within 24 hours on business days.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes! I work with clients worldwide and am comfortable with different time zones.',
  },
  {
    question: 'What information should I include in my message?',
    answer: 'Please include project details, timeline, budget range, and any specific requirements.',
  },
];

const Contact: React.FC = () => {
  useDocumentMeta('Contact', 'Get in touch with me for your next project');
  
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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Submit via Email (primary) with WhatsApp fallback
      const result = await submitContactFormViaEmail(formData);
      
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', budget: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null); // Clear error when user types
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-4 md:pt-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>
        </ScrollReveal>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: 'Response Time', value: '< 24h' },
            { icon: Globe, label: 'Availability', value: 'Remote' },
            { icon: Coffee, label: 'Projects Done', value: '80+' },
            { icon: Calendar, label: 'Experience', value: '5+ Years' },
          ].map((stat, index) => (
            <ScrollReveal key={index} animation="bounce-in" delay={index * 100}>
              <div className="stat-card text-center group cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary-cyan/60 transition-all duration-300">
                  <stat.icon className="text-primary-cyan" size={24} />
                </div>
                <div className="text-xl font-bold gradient-text">{stat.value}</div>
                <div className="text-text-secondary text-xs group-hover:text-text-primary transition-colors">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-container">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <ScrollReveal animation="fade-right" className="lg:col-span-3">
            <div className="card card-glass p-6 md:p-8">
              <h2 className="text-2xl font-heading font-bold mb-6">Send a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-text-secondary mb-4">
                    Your message has been sent successfully to my email inbox.<br />
                    I'll get back to you within 24 hours!
                  </p>
                  <p className="text-sm text-text-secondary">
                    ✅ Thank you for reaching out. I'll respond soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text-primary focus:border-primary-cyan focus:outline-none transition-colors"
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
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail size={18} />
                          Send via Email
                        </>
                      )}
                    </button>
                    <p className="text-xs text-text-secondary text-center">
                      📧 Your message will be sent directly to my email inbox.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Contact Info Sidebar */}
          <ScrollReveal animation="fade-left" className="lg:col-span-2 space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <div key={index} className="card card-animated p-5 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon className="w-6 h-6 text-primary-cyan" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">{info.label}</p>
                    {info.link ? (
                      <a href={info.link} className="font-medium hover:text-primary-cyan transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                    <p className="text-xs text-text-secondary mt-1">{info.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="card card-animated p-5">
              <p className="text-sm font-medium mb-4">Connect with me</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg bg-background border border-border ${social.color} transition-colors`}
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="card card-neon p-5 bg-gradient-to-br from-primary-cyan/10 to-primary-purple/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-sm text-text-secondary">
                I'm open for freelance projects and full-time opportunities.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-heading font-bold gradient-text mb-6 text-center">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
              <div className="card p-6 h-full group">
                {/* Frosted icon */}
                <div className="relative w-14 h-14 mb-4">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-cyan/30 to-primary-purple/20 blur-lg group-hover:blur-xl transition-all duration-500" />
                  <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-primary-cyan/30 group-hover:scale-105 transition-all duration-500">
                    <MessageSquare className="w-6 h-6 text-primary-cyan" />
                  </div>
                </div>
                <h3 className="font-heading font-bold mb-2 group-hover:text-primary-cyan transition-colors">{faq.question}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <Mail className="w-16 h-16 mx-auto mb-6 text-primary-cyan" />
            <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
              Let's Build Something Great
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Whether you have a project in mind or just want to chat, I'd love to hear from you.
            </p>
            <a href="mailto:naitik@example.com" className="btn-primary inline-flex items-center">
              <Mail className="mr-2" size={18} />
              Email Me Directly
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Contact;
