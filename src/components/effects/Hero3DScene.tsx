import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  Box, 
  Torus, 
  Icosahedron,
  OrbitControls,
  Stars,
  Trail,
  MeshWobbleMaterial,
  GradientTexture
} from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes that orbit
const FloatingShape: React.FC<{
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  size?: number;
  shape?: 'sphere' | 'box' | 'torus' | 'icosahedron';
}> = ({ position, color, speed = 1, distort = 0.3, size = 1, shape = 'sphere' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  const renderShape = () => {
    switch (shape) {
      case 'box':
        return <Box args={[size, size, size]} />;
      case 'torus':
        return <Torus args={[size * 0.6, size * 0.2, 16, 32]} />;
      case 'icosahedron':
        return <Icosahedron args={[size * 0.7, 1]} />;
      default:
        return <Sphere args={[size * 0.5, 64, 64]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {renderShape()}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

// Animated code brackets
const CodeBracket: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}> = ({ position, rotation = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Left bracket { */}
      <mesh position={[-0.3, 0, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.02]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.25, 0.18, 0]}>
        <boxGeometry args={[0.15, 0.05, 0.02]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.25, -0.18, 0]}>
        <boxGeometry args={[0.15, 0.05, 0.02]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Right bracket } */}
      <mesh position={[0.3, 0, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.02]} />
        <meshStandardMaterial color="#7B2FFF" emissive="#7B2FFF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.25, 0.18, 0]}>
        <boxGeometry args={[0.15, 0.05, 0.02]} />
        <meshStandardMaterial color="#7B2FFF" emissive="#7B2FFF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.25, -0.18, 0]}>
        <boxGeometry args={[0.15, 0.05, 0.02]} />
        <meshStandardMaterial color="#7B2FFF" emissive="#7B2FFF" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Orbiting particles
const OrbitingParticle: React.FC<{
  radius: number;
  speed: number;
  color: string;
  size?: number;
}> = ({ radius, speed, color, size = 0.05 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.5;
    }
  });

  return (
    <Trail width={0.5} length={8} color={color} attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Trail>
  );
};

// Main rotating geometry - represents tech/code
const CentralGeometry: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -state.clock.elapsedTime * 0.1;
      wireframeRef.current.rotation.y = -state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group>
      {/* Inner glowing sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <MeshWobbleMaterial 
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.3}
          factor={0.3}
          speed={2}
          transparent
          opacity={0.7}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Outer wireframe */}
      <mesh ref={wireframeRef} scale={1.3}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color="#7B2FFF" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// DNA-like helix animation
const DNAHelix: React.FC<{
  position: [number, number, number];
}> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesCount = 20;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: particlesCount }, (_, i) => {
      const angle = (i / particlesCount) * Math.PI * 4;
      const y = (i / particlesCount - 0.5) * 3;
      return {
        position1: [Math.cos(angle) * 0.4, y, Math.sin(angle) * 0.4] as [number, number, number],
        position2: [Math.cos(angle + Math.PI) * 0.4, y, Math.sin(angle + Math.PI) * 0.4] as [number, number, number],
      };
    });
  }, []);

  return (
    <group ref={groupRef} position={position}>
      {particles.map((p, i) => (
        <React.Fragment key={i}>
          <mesh position={p.position1}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1} />
          </mesh>
          <mesh position={p.position2}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#7B2FFF" emissive="#7B2FFF" emissiveIntensity={1} />
          </mesh>
          {i % 3 === 0 && (
            <mesh position={[(p.position1[0] + p.position2[0]) / 2, p.position1[1], (p.position1[2] + p.position2[2]) / 2]}>
              <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
          )}
        </React.Fragment>
      ))}
    </group>
  );
};

// Mouse-following effect
const MouseFollower: React.FC = () => {
  const { viewport, mouse } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        (mouse.x * viewport.width) / 2,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        (mouse.y * viewport.height) / 2,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#00D4FF"
        emissiveIntensity={1}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

// Main Scene Component
const Scene: React.FC = () => {
  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00D4FF" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#7B2FFF" />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Central geometry */}
      <CentralGeometry />

      {/* Floating shapes */}
      <FloatingShape position={[-3, 1, -2]} color="#00D4FF" shape="sphere" size={0.6} speed={0.8} />
      <FloatingShape position={[3, -1, -2]} color="#7B2FFF" shape="icosahedron" size={0.5} speed={1.2} />
      <FloatingShape position={[-2, -1.5, -1]} color="#00FF88" shape="box" size={0.4} speed={0.6} distort={0.1} />
      <FloatingShape position={[2.5, 1.5, -1.5]} color="#FF0080" shape="torus" size={0.5} speed={1} />

      {/* Code brackets */}
      <CodeBracket position={[-2.5, 0.5, 0]} scale={1.5} />
      <CodeBracket position={[2.5, -0.5, 0]} scale={1.2} rotation={[0, 0.5, 0]} />

      {/* Orbiting particles */}
      <OrbitingParticle radius={2} speed={0.8} color="#00D4FF" size={0.06} />
      <OrbitingParticle radius={2.5} speed={-0.6} color="#7B2FFF" size={0.05} />
      <OrbitingParticle radius={1.5} speed={1.2} color="#00FF88" size={0.04} />

      {/* DNA Helix */}
      <DNAHelix position={[4, 0, -3]} />

      {/* Mouse follower */}
      <MouseFollower />
    </>
  );
};

// Main exported component
const Hero3DScene: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
