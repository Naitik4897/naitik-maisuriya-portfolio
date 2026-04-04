import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks';
import { ScrollReveal } from '@/components/effects';
import { 
  Calendar, Clock, ArrowLeft, ArrowRight, Tag, 
  Twitter, Linkedin, Facebook, Copy, Check,
  BookOpen, ChevronLeft, ChevronRight
} from 'lucide-react';

// Blog posts data (same as Blog.tsx - in production this would come from API)
const blogPosts = [
  {
    id: 1,
    slug: 'building-scalable-react-apps',
    title: 'Building Scalable React Applications: Best Practices for 2024',
    excerpt: 'Learn the essential patterns and practices for building React applications that scale. From component architecture to state management.',
    content: `
## Introduction

Building scalable React applications requires a thoughtful approach to architecture, state management, and code organization. In this comprehensive guide, we'll explore the best practices that will help you create maintainable and performant React applications.

## Component Architecture

The foundation of any scalable React application is a well-thought-out component architecture. Here are the key principles:

### 1. Atomic Design Methodology

Organize your components using atomic design principles:
- **Atoms**: Basic building blocks (buttons, inputs, labels)
- **Molecules**: Groups of atoms (search bar, form field)
- **Organisms**: Complex UI sections (navigation, hero section)
- **Templates**: Page layouts
- **Pages**: Full pages with real content

### 2. Component Composition

Prefer composition over inheritance. Use the children prop and render props pattern to create flexible, reusable components.

\`\`\`tsx
// Good: Composition
const Card = ({ children, className }) => (
  <div className={\`card \${className}\`}>
    {children}
  </div>
);

// Usage
<Card className="featured">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
\`\`\`

## State Management

### Local vs Global State

Not all state needs to be global. Follow this rule of thumb:
- **Local State**: UI state, form inputs, toggles
- **Global State**: User data, app settings, shared data

### Modern State Management Options

1. **React Context + useReducer**: Great for medium-sized apps
2. **Zustand**: Lightweight and simple
3. **Redux Toolkit**: For complex, large-scale applications
4. **Jotai/Recoil**: Atomic state management

## Performance Optimization

### Code Splitting

Use React.lazy and Suspense for route-based code splitting:

\`\`\`tsx
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

### Memoization

Use React.memo, useMemo, and useCallback strategically:

\`\`\`tsx
// Memoize expensive calculations
const sortedData = useMemo(() => 
  data.sort((a, b) => a.date - b.date), 
  [data]
);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

## Folder Structure

A scalable folder structure for large applications:

\`\`\`
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   └── features/     # Feature-specific components
├── hooks/            # Custom hooks
├── context/          # React contexts
├── pages/            # Page components
├── services/         # API services
├── utils/            # Utility functions
├── types/            # TypeScript types
└── styles/           # Global styles
\`\`\`

## Testing Strategy

Implement a testing pyramid:
1. **Unit Tests**: Test individual functions and hooks
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test critical user flows

## Conclusion

Building scalable React applications is about making smart architectural decisions early and maintaining consistency throughout the project. By following these best practices, you'll create applications that are easier to maintain, test, and scale.

Remember: the best architecture is one that your team can understand and maintain. Don't over-engineer, but don't under-engineer either.
    `,
    category: 'tutorials',
    tags: ['React', 'TypeScript', 'Architecture'],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
    author: {
      name: 'Naitik Maisuriya',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      bio: 'Full Stack Developer specializing in React, TypeScript, and Node.js',
    },
    date: '2024-03-15',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    slug: 'typescript-tips-tricks',
    title: '10 TypeScript Tips That Will Make You a Better Developer',
    excerpt: 'Discover advanced TypeScript features and patterns that can significantly improve your code quality and developer experience.',
    content: `
## Introduction

TypeScript has become the go-to language for building robust JavaScript applications. Here are 10 tips that will level up your TypeScript skills.

## 1. Use Strict Mode

Always enable strict mode in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## 2. Leverage Type Inference

Let TypeScript infer types when possible:

\`\`\`typescript
// Don't do this
const name: string = "John";

// Do this instead
const name = "John"; // TypeScript knows it's a string
\`\`\`

## 3. Use Union Types

Union types are powerful for handling multiple possibilities:

\`\`\`typescript
type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status) {
  switch (status) {
    case "pending": return "Waiting...";
    case "approved": return "Success!";
    case "rejected": return "Denied.";
  }
}
\`\`\`

## 4. Utility Types

Master built-in utility types:

\`\`\`typescript
// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserName = Pick<User, "firstName" | "lastName">;

// Omit - exclude properties
type UserWithoutPassword = Omit<User, "password">;

// Record - create object types
type UserRoles = Record<string, Role>;
\`\`\`

## 5. Type Guards

Create type guards for runtime type checking:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  }
}
\`\`\`

## Conclusion

These tips will help you write more type-safe, maintainable TypeScript code. Keep practicing and exploring the language's features!
    `,
    category: 'tips',
    tags: ['TypeScript', 'JavaScript', 'Tips'],
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
    author: {
      name: 'Naitik Maisuriya',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      bio: 'Full Stack Developer specializing in React, TypeScript, and Node.js',
    },
    date: '2024-03-10',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 3,
    slug: 'nodejs-performance-optimization',
    title: 'Node.js Performance Optimization: A Complete Guide',
    excerpt: 'Master the techniques for optimizing Node.js applications. From memory management to async patterns and caching strategies.',
    content: `
## Introduction

Node.js performance optimization is crucial for building fast, scalable applications. This guide covers essential techniques.

## Event Loop Optimization

Understanding the event loop is key to Node.js performance:

\`\`\`javascript
// Bad: Blocking the event loop
function processData(data) {
  // Long synchronous operation
  for (let i = 0; i < 1000000; i++) {
    // Heavy computation
  }
}

// Good: Using setImmediate
function processDataAsync(data, callback) {
  setImmediate(() => {
    // Process in chunks
    callback(result);
  });
}
\`\`\`

## Memory Management

Avoid memory leaks and optimize memory usage:

1. Use streams for large files
2. Clear intervals and timeouts
3. Remove event listeners when done
4. Use WeakMap for caches

## Caching Strategies

Implement effective caching:

\`\`\`javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

async function getData(id) {
  const cached = cache.get(id);
  if (cached) return cached;
  
  const data = await fetchFromDB(id);
  cache.set(id, data);
  return data;
}
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Monitor, measure, and iterate!
    `,
    category: 'tutorials',
    tags: ['Node.js', 'Performance', 'Backend'],
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
    author: {
      name: 'Naitik Maisuriya',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      bio: 'Full Stack Developer specializing in React, TypeScript, and Node.js',
    },
    date: '2024-03-05',
    readTime: '12 min read',
    featured: false,
  },
];

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = React.useState(false);
  
  // Find the current post
  const post = blogPosts.find(p => p.slug === slug);
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  
  // Related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post?.category && p.slug !== slug)
    .slice(0, 3);

  useDocumentMeta(
    post?.title || 'Blog Post',
    post?.excerpt || 'Read this blog post'
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="section-container text-center py-20">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-text-secondary mb-6">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn-primary inline-flex items-center">
          <ArrowLeft className="mr-2" size={18} />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-container pt-4">
        <ScrollReveal animation="fade-up">
          {/* Back link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-cyan transition-colors mb-6"
          >
            <ChevronLeft size={18} />
            Back to Blog
          </Link>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/30">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-text-secondary text-sm">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1 text-text-secondary text-sm">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-text mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-text-secondary mb-8 max-w-3xl">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-cyan"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-text-secondary">{post.author.bio}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Image */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="rounded-2xl overflow-hidden mb-8">
            <img 
              src={post.thumbnail} 
              alt={post.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Content */}
      <section className="section-container py-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-8">
            {/* Share sidebar */}
            <ScrollReveal animation="fade-right" className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-3">
                <span className="text-xs text-text-secondary uppercase tracking-wider mb-2">Share</span>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                  className="p-3 rounded-lg bg-cardBg border border-border hover:border-primary-cyan hover:text-primary-cyan transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter size={18} />
                </button>
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="p-3 rounded-lg bg-cardBg border border-border hover:border-primary-cyan hover:text-primary-cyan transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </button>
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="p-3 rounded-lg bg-cardBg border border-border hover:border-primary-cyan hover:text-primary-cyan transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook size={18} />
                </button>
                <button 
                  onClick={handleCopyLink}
                  className="p-3 rounded-lg bg-cardBg border border-border hover:border-primary-cyan hover:text-primary-cyan transition-colors"
                  title="Copy link"
                >
                  {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
                </button>
              </div>
            </ScrollReveal>

            {/* Article content */}
            <ScrollReveal animation="fade-up" className="flex-1">
              <article className="prose prose-invert prose-lg max-w-none">
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content
                      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-heading font-bold gradient-text mt-10 mb-4">$1</h2>')
                      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-heading font-bold mt-8 mb-3 text-text-primary">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-cyan">$1</strong>')
                      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-cardBg rounded-lg p-4 overflow-x-auto border border-border my-6"><code class="text-sm text-text-secondary">$2</code></pre>')
                      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-primary-cyan/10 text-primary-cyan text-sm">$1</code>')
                      .replace(/\n\n/g, '</p><p class="text-text-secondary leading-relaxed mb-4">')
                      .replace(/^(?!<)(.+)/gm, '<p class="text-text-secondary leading-relaxed mb-4">$1</p>')
                  }}
                />
              </article>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-border">
                <Tag size={16} className="text-text-secondary" />
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-primary-cyan/10 text-primary-cyan border border-primary-cyan/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mobile share */}
              <div className="flex items-center gap-3 mt-8 lg:hidden">
                <span className="text-sm text-text-secondary">Share:</span>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                  className="p-2 rounded-lg bg-cardBg border border-border hover:border-primary-cyan hover:text-primary-cyan transition-colors"
                >
                  <Twitter size={16} />
                </button>
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="p-2 rounded-lg bg-cardBg border border-border hover:border-primary-cyan hover:text-primary-cyan transition-colors"
                >
                  <Linkedin size={16} />
                </button>
                <button 
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-cardBg border border-border hover:border-primary-cyan hover:text-primary-cyan transition-colors"
                >
                  {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Author Card */}
      <section className="section-container">
        <ScrollReveal animation="fade-up">
          <div className="max-w-4xl mx-auto">
            <div className="card card-glass p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary-cyan"
              />
              <div className="text-center sm:text-left">
                <p className="text-sm text-text-secondary mb-1">Written by</p>
                <h3 className="text-xl font-heading font-bold mb-2">{post.author.name}</h3>
                <p className="text-text-secondary mb-4">{post.author.bio}</p>
                <Link to="/contact" className="text-primary-cyan hover:underline text-sm">
                  Get in touch →
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Post Navigation */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {prevPost && (
              <ScrollReveal animation="fade-right">
                <Link to={`/blog/${prevPost.slug}`} className="group card card-animated p-4 flex items-center gap-4">
                  <ChevronLeft className="text-text-secondary group-hover:text-primary-cyan transition-colors" />
                  <div>
                    <p className="text-xs text-text-secondary mb-1">Previous</p>
                    <p className="font-medium line-clamp-1 group-hover:text-primary-cyan transition-colors">{prevPost.title}</p>
                  </div>
                </Link>
              </ScrollReveal>
            )}
            {nextPost && (
              <ScrollReveal animation="fade-left">
                <Link to={`/blog/${nextPost.slug}`} className="group card card-animated p-4 flex items-center justify-end gap-4 md:col-start-2">
                  <div className="text-right">
                    <p className="text-xs text-text-secondary mb-1">Next</p>
                    <p className="font-medium line-clamp-1 group-hover:text-primary-cyan transition-colors">{nextPost.title}</p>
                  </div>
                  <ChevronRight className="text-text-secondary group-hover:text-primary-cyan transition-colors" />
                </Link>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-container">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl font-heading font-bold gradient-text mb-6">
              Related Articles
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <ScrollReveal key={relatedPost.id} animation="fade-up" delay={index * 100}>
                <Link to={`/blog/${relatedPost.slug}`} className="group block h-full">
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-xl opacity-0 group-hover:opacity-50 blur transition-all duration-300" />
                    
                    <div className="relative h-full bg-cardBg rounded-xl overflow-hidden border border-border group-hover:border-transparent transition-all">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.thumbnail}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-bold mb-2 line-clamp-2 group-hover:text-primary-cyan transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-text-secondary line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-container">
        <ScrollReveal animation="zoom-in">
          <div className="text-center py-10 px-8 bg-cardBg rounded-xl border border-border max-w-4xl mx-auto">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary-cyan" />
            <h2 className="text-2xl font-heading font-bold gradient-text mb-3">
              Enjoyed this article?
            </h2>
            <p className="text-text-secondary mb-6">
              Check out more articles or subscribe to get notified when I publish new content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/blog" className="btn-primary inline-flex items-center">
                More Articles
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link to="/contact" className="btn-outline">
                Get in Touch
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default BlogPost;
