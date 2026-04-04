import React, { useRef, useState } from 'react';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How much the card moves (default: 20)
  scale?: number; // Scale on hover (default: 1.02)
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className = '',
  strength = 20,
  scale = 1.02,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Apply magnetic pull effect
    const moveX = deltaX * strength;
    const moveY = deltaY * strength;
    const rotateX = -deltaY * 8; // Subtle 3D tilt
    const rotateY = deltaX * 8;

    setTransform(
      `perspective(1000px) translateX(${moveX}px) translateY(${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    );
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform('perspective(1000px) translateX(0) translateY(0) rotateX(0) rotateY(0) scale(1)');
  };

  return (
    <div
      ref={cardRef}
      className={`magnetic-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform || 'perspective(1000px) translateX(0) translateY(0) rotateX(0) rotateY(0) scale(1)',
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default MagneticCard;
