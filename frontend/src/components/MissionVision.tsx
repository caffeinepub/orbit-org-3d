import { useRef } from 'react';
import type { ReactElement } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { orgContent } from '../data/orgContent';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function RotatingGeometry() {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const meshRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef1.current) {
      meshRef1.current.rotation.x = t * 0.3;
      meshRef1.current.rotation.y = t * 0.5;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = -t * 0.2;
      meshRef2.current.rotation.z = t * 0.4;
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.y = t * 0.6;
      meshRef3.current.rotation.x = t * 0.2;
    }
  });

  return (
    <>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1.0}>
        <mesh ref={meshRef1} position={[-1.5, 0, 0]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={meshRef2} position={[1.5, 0, 0]}>
          <octahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial color="#aaaaaa" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>
      <Float speed={0.6} rotationIntensity={0.2} floatIntensity={1.2}>
        <mesh ref={meshRef3} position={[0, 0, -1]}>
          <torusKnotGeometry args={[0.7, 0.2, 64, 8]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  );
}

function GridLines() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    gridRef.current.rotation.z = state.clock.elapsedTime * 0.03;
  });

  const lines: ReactElement[] = [];
  for (let i = -4; i <= 4; i++) {
    lines.push(
      <line key={`h${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-4, i * 0.5, 0, 4, i * 0.5, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </line>
    );
    lines.push(
      <line key={`v${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([i * 0.5, -4, 0, i * 0.5, 4, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </line>
    );
  }

  return <group ref={gridRef}>{lines}</group>;
}

export default function MissionVision() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="mission" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.4} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={1.0} color="#ffffff" />
          <pointLight position={[-5, -5, 5]} intensity={0.6} color="#aaaaaa" />
          <RotatingGeometry />
          <GridLines />
        </Canvas>
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-white/60 text-sm font-bold uppercase tracking-widest mb-4">
            Purpose & Direction
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            What Drives Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div
            className={`relative p-8 md:p-10 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden group hover:border-white/30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/50 to-transparent" />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/3 rounded-full blur-2xl group-hover:bg-white/6 transition-colors" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl mb-6 grayscale">
                🎯
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{orgContent.mission.heading}</h3>
              <p className="text-white/60 text-lg leading-relaxed">{orgContent.mission.body}</p>
            </div>
          </div>

          {/* Vision */}
          <div
            className={`relative p-8 md:p-10 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden group hover:border-white/30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/30 to-transparent" />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/3 rounded-full blur-2xl group-hover:bg-white/6 transition-colors" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl mb-6 grayscale">
                🌟
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{orgContent.vision.heading}</h3>
              <p className="text-white/60 text-lg leading-relaxed">{orgContent.vision.body}</p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <blockquote className="text-2xl md:text-3xl font-light text-white/60 italic max-w-3xl mx-auto">
            "Growth is not just a destination — it's a journey we take{' '}
            <span className="text-white font-semibold not-italic">together</span>."
          </blockquote>
          <cite className="mt-4 block text-white/30 text-sm not-italic">— G4U Foundation</cite>
        </div>
      </div>
    </section>
  );
}
