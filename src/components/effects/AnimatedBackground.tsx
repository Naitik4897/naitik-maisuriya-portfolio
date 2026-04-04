import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface AnimatedBackgroundProps {
  particleCount?: number;
  enableGrid?: boolean;
  enableParticles?: boolean;
  enableGradientOrbs?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  particleCount = 50,
  enableGrid = true,
  enableParticles = true,
  enableGradientOrbs = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const colors = ['#00D4FF', '#7B2FFF', '#00FF88'];

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [particleCount]);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 50;
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.03)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    particlesRef.current.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Mouse interaction - subtle attraction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 200) {
        particle.vx += dx * 0.00005;
        particle.vy += dy * 0.00005;
      }

      // Boundary wrapping
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Speed limit
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > 1) {
        particle.vx *= 0.95;
        particle.vy *= 0.95;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba').replace('#', '');
      
      // Convert hex to rgba
      const hex = particle.color;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
      ctx.fill();

      // Draw connections to nearby particles
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const other = particlesRef.current[j];
        const connDx = particle.x - other.x;
        const connDy = particle.y - other.y;
        const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

        if (connDist < 120) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - connDist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    if (enableGrid) {
      drawGrid(ctx, width, height);
    }

    // Draw particles
    if (enableParticles) {
      drawParticles(ctx, width, height);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [enableGrid, enableParticles, drawGrid, drawParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Canvas for particles and grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.8 }}
      />

      {/* Gradient orbs */}
      {enableGradientOrbs && (
        <>
          <div className="gradient-orb gradient-orb-1" />
          <div className="gradient-orb gradient-orb-2" />
          <div className="gradient-orb gradient-orb-3" />
        </>
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-vignette" />
    </div>
  );
};

export default AnimatedBackground;
