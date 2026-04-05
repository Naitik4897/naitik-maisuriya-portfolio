import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// ============================================
// Advanced Scroll Section Component
// ============================================

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'zoom' | 'rotate' | 'blur' | 'flip';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

// Animation variants
const animations = {
  'fade-up': {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 }
  },
  'fade-down': {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  },
  'zoom': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  'rotate': {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
  'blur': {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' }
  },
  'flip': {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 }
  }
};

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  once = true,
  threshold = 0.2
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Parallax Section Component
// ============================================

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up'
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * multiplier]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Stagger Children Component
// ============================================

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  containerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  containerDelay = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: containerDelay,
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Text Reveal Component
// ============================================

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.05
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const words = text.split(' ');

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger
          }
        }
      }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-2">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
              }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

// ============================================
// Counter Animation Component
// ============================================

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

// ============================================
// Magnetic Button Component
// ============================================

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.3
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Scroll Progress Component
// ============================================

export const ScrollProgress: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = '', color = 'bg-gradient-to-r from-primary-cyan to-primary-purple' }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 origin-left z-50 ${color} ${className}`}
      style={{ scaleX }}
    />
  );
};

// ============================================
// Floating Element Component
// ============================================

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  duration = 3,
  distance = 15,
  delay = 0
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Tilt Card Component
// ============================================

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 10
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * maxTilt,
      y: ((centerX - x) / centerX) * maxTilt
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Morphing Shape Component
// ============================================

export const MorphingShape: React.FC<{
  className?: string;
  colors?: string[];
}> = ({ 
  className = '', 
  colors = ['#00D4FF', '#7B2FFF', '#00FF88'] 
}) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '50% 60% 50% 50% / 40% 50% 60% 50%',
          '60% 40% 30% 70% / 60% 30% 70% 40%'
        ],
        background: [
          `radial-gradient(circle, ${colors[0]}40, transparent)`,
          `radial-gradient(circle, ${colors[1]}40, transparent)`,
          `radial-gradient(circle, ${colors[2]}40, transparent)`,
          `radial-gradient(circle, ${colors[0]}40, transparent)`
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

// ============================================
// Reveal on Scroll Image Component
// ============================================

interface RevealImageProps {
  src?: string;
  alt?: string;
  className?: string;
  revealDirection?: 'left' | 'right' | 'top' | 'bottom';
  children?: React.ReactNode;
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt = '',
  className = '',
  revealDirection = 'left',
  children
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const directions = {
    left: { hidden: { x: '-100%' }, visible: { x: '100%' } },
    right: { hidden: { x: '100%' }, visible: { x: '-100%' } },
    top: { hidden: { y: '-100%' }, visible: { y: '100%' } },
    bottom: { hidden: { y: '100%' }, visible: { y: '-100%' } }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-primary-purple z-10"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={directions[revealDirection]}
        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
      />
      {children ? (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        >
          {children}
        </motion.div>
      ) : src ? (
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ scale: 1.3 }}
          animate={isInView ? { scale: 1 } : { scale: 1.3 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        />
      ) : null}
    </div>
  );
};
