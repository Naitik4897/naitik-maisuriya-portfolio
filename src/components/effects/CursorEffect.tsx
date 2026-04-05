import React, { useEffect, useRef, useState } from 'react';

interface CursorEffectProps {
  enabled?: boolean;
}

const CursorEffect: React.FC<CursorEffectProps> = ({ enabled = true }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const isPointerRef = useRef(false);
  const isTextFieldRef = useRef(false);
  const isClickingRef = useRef(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Smooth animation loop using direct DOM manipulation
    const animate = () => {
      // Smooth interpolation (lerp) - higher value = faster follow
      const ease = 0.2;
      
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;

      // Use transform for GPU acceleration - no layout thrashing
      const x = positionRef.current.x;
      const y = positionRef.current.y;
      
      const pointerScale = isTextFieldRef.current ? 0.5 : isPointerRef.current ? 1.35 : 1;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${isClickingRef.current ? 0.75 : pointerScale})`;
      dot.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`;

      // Update pointer state styling
      if (isTextFieldRef.current) {
        cursor.style.borderColor = 'rgba(0, 212, 255, 0.35)';
        cursor.style.background = 'rgba(0, 212, 255, 0.02)';
        dot.style.background = '#00D4FF';
        dot.style.boxShadow = '0 0 8px rgba(0, 212, 255, 0.5)';
      } else if (isPointerRef.current) {
        cursor.style.borderColor = '#7B2FFF';
        cursor.style.background = 'rgba(123, 47, 255, 0.1)';
        dot.style.background = '#7B2FFF';
        dot.style.boxShadow = '0 0 10px rgba(123, 47, 255, 0.8)';
      } else {
        cursor.style.borderColor = '#00D4FF';
        cursor.style.background = 'rgba(0, 212, 255, 0.05)';
        dot.style.background = '#00D4FF';
        dot.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.8)';
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
      }

      const target = e.target as HTMLElement;
      const textField = target.closest(
        'textarea, select, [contenteditable="true"], input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"])'
      );
      isTextFieldRef.current = !!textField;

      isPointerRef.current = !!(
        !isTextFieldRef.current &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.closest('[data-cursor="pointer"]') ||
          target.closest('summary') ||
          target.closest('label[for]') ||
          window.getComputedStyle(target).cursor === 'pointer')
      );

      if (isTextFieldRef.current) {
        document.body.style.cursor = 'text';
      } else {
        document.body.style.cursor = 'none';
      }
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      if (dot) dot.style.width = dot.style.height = '6px';
    };
    
    const handleMouseUp = () => {
      isClickingRef.current = false;
      if (dot) dot.style.width = dot.style.height = '4px';
    };
    
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      cursor.style.opacity = '0';
      dot.style.opacity = '0';
    };
    
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      document.body.style.cursor = '';
    };
  }, [enabled, prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="absolute rounded-full border-2"
        style={{
          width: 24,
          height: 24,
          opacity: 0,
          borderColor: '#00D4FF',
          background: 'rgba(0, 212, 255, 0.05)',
          mixBlendMode: 'screen',
          willChange: 'transform',
          transition: 'width 0.15s, height 0.15s, border-color 0.15s, background 0.15s',
        }}
      />

      {/* Inner dot - follows mouse directly */}
      <div
        ref={dotRef}
        className="absolute rounded-full"
        style={{
          width: 4,
          height: 4,
          opacity: 0,
          background: '#00D4FF',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
          willChange: 'transform',
          transition: 'width 0.1s, height 0.1s, background 0.15s, box-shadow 0.15s',
        }}
      />
    </div>
  );
};

export default CursorEffect;
