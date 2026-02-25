import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { orgContent } from '../data/orgContent';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function FloatingWireframes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  const shapes = useMemo(() => [
    { pos: [-2, 1, 0] as [number, number, number], type: 'icosa', size: 1.2, speed: 0.6 },
    { pos: [2, -1, -1] as [number, number, number], type: 'octa', size: 0.9, speed: 0.8 },
    { pos: [0, 0, 1] as [number, number, number], type: 'box', size: 0.7, speed: 0.5 },
    { pos: [-1.5, -1.5, 0.5] as [number, number, number], type: 'torus', size: 0.6, speed: 0.7 },
    { pos: [1.8, 1.5, -0.5] as [number, number, number], type: 'icosa', size: 0.5, speed: 0.9 },
  ], []);

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh position={s.pos}>
            {s.type === 'icosa' && <icosahedronGeometry args={[s.size, 0]} />}
            {s.type === 'octa' && <octahedronGeometry args={[s.size, 0]} />}
            {s.type === 'box' && <boxGeometry args={[s.size, s.size, s.size]} />}
            {s.type === 'torus' && <torusGeometry args={[s.size, s.size * 0.3, 8, 16]} />}
            <meshStandardMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ParticleCloud() {
  const count = 400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function About() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="about" className="relative py-24 md:py-32 bg-bw-surface overflow-hidden">
      {/* Background 3D decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-60 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <FloatingWireframes />
          <ParticleCloud />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div
              ref={headingRef}
              className={`transition-all duration-700 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span className="inline-block text-white/60 text-sm font-bold uppercase tracking-widest mb-4">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {orgContent.about.heading}
              </h2>
            </div>

            <div
              ref={textRef}
              className={`transition-all duration-700 delay-200 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {orgContent.about.body.split('\n\n').map((para, i) => (
                <p key={i} className="text-white/60 text-lg leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>

            <div
              className={`mt-8 transition-all duration-700 delay-300 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <a
                href="#mission"
                onClick={(e) => { e.preventDefault(); document.querySelector('#mission')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-300 border-b border-white/30 pb-1 hover:border-white"
              >
                Our Mission & Vision
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div
            ref={statsRef}
            className={`transition-all duration-700 delay-300 ${statsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="grid grid-cols-2 gap-6">
              {orgContent.about.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="text-4xl font-black text-white mb-1 group-hover:text-white/80 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {orgContent.values.map((val, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-black border border-white/10 hover:border-white/25 transition-all duration-300"
                >
                  <span className="text-2xl mb-2 block grayscale">{val.icon}</span>
                  <div className="text-white font-bold text-sm mb-1">{val.title}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{val.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
