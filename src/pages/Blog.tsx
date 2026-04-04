import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal, MagneticCard } from '@/components/effects';
import { 
  Search, Calendar, Clock, ArrowRight, Tag, 
  TrendingUp, BookOpen, Code2, Layers, Sparkles
} from 'lucide-react';

// Blog categories
const categories = [
  { id: 'all', name: 'All Posts', icon: Layers },
  { id: 'tutorials', name: 'Tutorials', icon: BookOpen },
  { id: 'tips', name: 'Tips & Tricks', icon: Sparkles },
  { id: 'career', name: 'Career', icon: TrendingUp },
  { id: 'tech', name: 'Technology', icon: Code2 },
];

// Static blog posts
const blogPosts = [
  {
    id: 1,
    slug: 'building-scalable-react-apps',
    title: 'Building Scalable React Applications: Best Practices for 2024',
    excerpt: 'Learn the essential patterns and practices for building React applications that scale. From component architecture to state management.',
    category: 'tutorials',
    tags: ['React', 'TypeScript', 'Architecture'],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    author: 'Naitik Maisuriya',
    date: '2024-03-15',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    slug: 'typescript-tips-tricks',
    title: '10 TypeScript Tips That Will Make You a Better Developer',
    excerpt: 'Discover advanced TypeScript features and patterns that can significantly improve your code quality and developer experience.',
    category: 'tips',
    tags: ['TypeScript', 'JavaScript', 'Tips'],
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
    author: 'Naitik Maisuriya',
    date: '2024-03-10',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 3,
    slug: 'nodejs-performance-optimization',
    title: 'Node.js Performance Optimization: A Complete Guide',
    excerpt: 'Master the techniques for optimizing Node.js applications. From memory management to async patterns and caching strategies.',
    category: 'tutorials',
    tags: ['Node.js', 'Performance', 'Backend'],
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    author: 'Naitik Maisuriya',
    date: '2024-03-05',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 4,
    slug: 'becoming-fullstack-developer',
    title: 'The Roadmap to Becoming a Full Stack Developer in 2024',
    excerpt: 'A comprehensive guide covering the skills, tools, and mindset needed to become a successful full-stack developer.',
    category: 'career',
    tags: ['Career', 'Full Stack', 'Learning'],
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    author: 'Naitik Maisuriya',
    date: '2024-02-28',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 5,
    slug: 'mysql-query-optimization',
    title: 'MySQL Query Optimization: From Slow to Lightning Fast',
    excerpt: 'Learn how to identify and fix slow MySQL queries. Covering indexing strategies, query analysis, and performance tuning.',
    category: 'tutorials',
    tags: ['MySQL', 'Database', 'Performance'],
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop',
    author: 'Naitik Maisuriya',
    date: '2024-02-20',
    readTime: '9 min read',
    featured: false,
  },
  {
    id: 6,
    slug: 'ai-future-web-development',
    title: 'AI and the Future of Web Development: What to Expect',
    excerpt: 'Exploring how AI is transforming web development and what developers need to know to stay ahead of the curve.',
    category: 'tech',
    tags: ['AI', 'Future', 'Trends'],
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    author: 'Naitik Maisuriya',
    date: '2024-02-15',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 7,
    slug: 'tailwind-css-tips',
    title: 'Mastering Tailwind CSS: Advanced Techniques & Custom Plugins',
    excerpt: 'Take your Tailwind CSS skills to the next level with advanced customization, plugins, and optimization techniques.',
    category: 'tips',
    tags: ['Tailwind CSS', 'CSS', 'Frontend'],
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop',
    author: 'Naitik Maisuriya',
    date: '2024-02-10',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 8,
    slug: 'docker-for-developers',
    title: 'Docker for Web Developers: A Practical Introduction',
    excerpt: 'Get started with Docker and containerization. Learn how to set up development environments and deploy applications.',
    category: 'tutorials',
    tags: ['Docker', 'DevOps', 'Containers'],
    thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=400&fit=crop',
    author: 'Naitik Maisuriya',
    date: '2024-02-05',
    readTime: '11 min read',
    featured: false,
  },
];

const Blog: React.FC = () => {
  useDocumentMeta('Blog', 'Read my latest articles on web development, tutorials, and tech insights');
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-4 md:pt-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6">
              Blog & Articles
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on web development, programming, and technology
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Articles', value: blogPosts.length.toString(), icon: BookOpen },
            { label: 'Categories', value: '4', icon: Layers },
            { label: 'Total Reads', value: '10K+', icon: TrendingUp },
            { label: 'Subscribers', value: '500+', icon: Sparkles },
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

      {/* Featured Posts */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-heading font-bold gradient-text mb-6">
            Featured Articles
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={index * 100}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative h-full">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                  
                  <div className="relative h-full bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-2xl overflow-hidden border border-border/50 group-hover:border-transparent transition-all flex flex-col md:flex-row">
                    {/* Image with overlay effects */}
                    <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden relative">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cardBg/80 md:block hidden" />
                      <div className="absolute inset-0 bg-gradient-to-t from-cardBg to-transparent md:hidden" />
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    {/* Content */}
                    <div className="md:w-3/5 p-6 flex flex-col relative">
                      {/* Top accent */}
                      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-primary-cyan/30 to-transparent md:hidden" />
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple text-white shadow-lg">
                          ⭐ Featured
                        </span>
                        <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-cardBg text-text-secondary border border-border capitalize">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-cyan transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-text-secondary pt-4 border-t border-border/30">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-primary-cyan" />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-primary-purple" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="text-primary-cyan font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="section-container">
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-cardBg border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto mb-4 text-text-secondary" size={48} />
            <p className="text-text-secondary">No articles found matching your criteria</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-primary-cyan hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} animation="fade-up" delay={(index % 3) * 100}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <div className="relative h-full">
                    {/* Animated gradient border */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                    
                    <div className="relative h-full bg-gradient-to-b from-cardBg to-[#0f0f1a] rounded-2xl overflow-hidden border border-border/50 group-hover:border-transparent transition-all flex flex-col">
                      {/* Image with effects */}
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-cardBg/50 to-transparent" />
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-cardBg/90 text-primary-cyan backdrop-blur-md border border-primary-cyan/30 capitalize shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col relative">
                        {/* Top accent */}
                        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-primary-cyan/30 to-transparent" />
                        
                        <h3 className="text-lg font-heading font-bold mb-3 group-hover:text-primary-cyan transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 text-primary-cyan border border-primary-cyan/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-text-secondary pt-4 border-t border-border/30">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-primary-cyan" />
                              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} className="text-primary-purple" />
                              {post.readTime}
                            </span>
                          </div>
                          <span className="text-primary-cyan font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-12 px-8 bg-cardBg rounded-xl border border-border">
            <Tag className="w-16 h-16 mx-auto mb-6 text-primary-cyan" />
            <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
              Stay Updated
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to my newsletter for the latest articles, tutorials, and tech insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-cardBg border border-border text-text-primary placeholder:text-text-secondary focus:border-primary-cyan focus:outline-none transition-colors"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-text-secondary text-xs mt-4">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Blog;
