import React, { useEffect, useRef, useState, ReactNode } from 'react';

type AnimationType = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'zoom-out' 
  | 'flip-up'
  | 'flip-down'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'rotate-in'
  | 'bounce-in';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  distance?: number;
  easing?: string;
}

const getInitialStyles = (animation: AnimationType, distance: number): React.CSSProperties => {
  const styles: Record<AnimationType, React.CSSProperties> = {
    'fade-up': { opacity: 0, transform: `translateY(${distance}px)` },
    'fade-down': { opacity: 0, transform: `translateY(-${distance}px)` },
    'fade-left': { opacity: 0, transform: `translateX(-${distance}px)` },
    'fade-right': { opacity: 0, transform: `translateX(${distance}px)` },
    'zoom-in': { opacity: 0, transform: 'scale(0.8)' },
    'zoom-out': { opacity: 0, transform: 'scale(1.2)' },
    'flip-up': { opacity: 0, transform: 'perspective(1000px) rotateX(45deg)' },
    'flip-down': { opacity: 0, transform: 'perspective(1000px) rotateX(-45deg)' },
    'slide-up': { opacity: 0, transform: `translateY(${distance}px)`, clipPath: 'inset(100% 0 0 0)' },
    'slide-down': { opacity: 0, transform: `translateY(-${distance}px)`, clipPath: 'inset(0 0 100% 0)' },
    'slide-left': { opacity: 0, transform: `translateX(-${distance}px)`, clipPath: 'inset(0 0 0 100%)' },
    'slide-right': { opacity: 0, transform: `translateX(${distance}px)`, clipPath: 'inset(0 100% 0 0)' },
    'rotate-in': { opacity: 0, transform: 'rotate(-15deg) scale(0.9)' },
    'bounce-in': { opacity: 0, transform: `translateY(${distance}px) scale(0.95)` },
  };

  return styles[animation];
};

const getFinalStyles = (): React.CSSProperties => ({
  opacity: 1,
  transform: 'translateY(0) translateX(0) scale(1) rotate(0deg) rotateX(0deg)',
  clipPath: 'inset(0 0 0 0)',
});

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
  className = '',
  distance = 50,
  easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated || !once) {
            setIsVisible(true);
            if (once) {
              setHasAnimated(true);
              observer.unobserve(element);
            }
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once, hasAnimated]);

  const style: React.CSSProperties = {
    ...(isVisible ? getFinalStyles() : getInitialStyles(animation, distance)),
    transition: `all ${duration}ms ${easing} ${delay}ms`,
    willChange: 'transform, opacity',
  };

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;

// Stagger container for multiple items
interface StaggerContainerProps {
  children: ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  baseDuration?: number;
  threshold?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  animation = 'fade-up',
  staggerDelay = 100,
  baseDuration = 500,
  threshold = 0.1,
  className = '',
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal
          animation={animation}
          delay={index * staggerDelay}
          duration={baseDuration}
          threshold={threshold}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};
