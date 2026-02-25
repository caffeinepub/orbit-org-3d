import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { orgContent } from '../data/orgContent';

function AnimatedSphere({ position, color, speed, distort }: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

function WireframeSphere({ position, radius, speed }: {
  position: [number, number, number];
  radius: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[radius, 1]} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function ParticleField() {
  const count = 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function MouseTracker() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 1.0 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  const handleMouseMove = (e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
  }

  return null;
}

function RingGeometry() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[3.5, 0.04, 16, 120]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} transparent opacity={0.5} />
    </mesh>
  );
}

function RingGeometry2() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    ringRef.current.rotation.x = Math.PI / 3 + state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[4.5, 0.03, 16, 120]} />
      <meshStandardMaterial color="#aaaaaa" emissive="#aaaaaa" emissiveIntensity={0.3} transparent opacity={0.4} />
    </mesh>
  );
}

function RingGeometry3() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.18;
    ringRef.current.rotation.y = Math.PI / 4 + state.clock.elapsedTime * 0.08;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[5.5, 0.025, 16, 120]} />
      <meshStandardMaterial color="#666666" emissive="#666666" emissiveIntensity={0.2} transparent opacity={0.3} />
    </mesh>
  );
}

function FloatingCube({ position, size, speed }: {
  position: [number, number, number];
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.0}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-bw-hero">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} color="#ffffff" />
          <pointLight position={[10, 10, 10]} intensity={2.0} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={1.0} color="#aaaaaa" />
          <pointLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" />

          <Stars radius={80} depth={50} count={4000} factor={3} saturation={0} fade speed={0.5} />
          <ParticleField />

          <AnimatedSphere position={[-3.5, 1.5, -2]} color="#ffffff" speed={0.8} distort={0.4} />
          <AnimatedSphere position={[3.5, -1.5, -3]} color="#888888" speed={0.6} distort={0.3} />
          <AnimatedSphere position={[0, 0, 0]} color="#333333" speed={0.4} distort={0.2} />

          <WireframeSphere position={[-5, -2, -4]} radius={1.5} speed={0.5} />
          <WireframeSphere position={[5, 2, -5]} radius={1.2} speed={0.7} />

          <FloatingCube position={[6, 3, -3]} size={0.8} speed={0.6} />
          <FloatingCube position={[-6, -3, -4]} size={1.0} speed={0.4} />
          <FloatingCube position={[2, 4, -6]} size={0.6} speed={0.8} />

          <RingGeometry />
          <RingGeometry2 />
          <RingGeometry3 />

          <MouseTracker />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Empowering Communities Worldwide
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none tracking-tight">
          <span className="block">{orgContent.name}</span>
          <span className="block text-gradient">{orgContent.fullName}</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/70 font-light mb-4 max-w-2xl">
          {orgContent.tagline}
        </p>
        <p className="text-base md:text-lg text-white/50 mb-10 max-w-xl">
          {orgContent.subTagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-base hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-glow-white"
          >
            {orgContent.ctaText}
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-4 rounded-full border border-white/40 text-white font-bold text-base hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/70"
          >
            {orgContent.ctaSecondary}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
