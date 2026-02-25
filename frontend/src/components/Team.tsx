import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { orgContent } from '../data/orgContent';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function TeamParticleField() {
  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function WireframeGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    gridRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const lines = useMemo(() => {
    const result: Array<{ key: string; points: Float32Array }> = [];
    for (let i = -5; i <= 5; i++) {
      result.push({ key: `h${i}`, points: new Float32Array([-5, i * 0.8, 0, 5, i * 0.8, 0]) });
      result.push({ key: `v${i}`, points: new Float32Array([i * 1.0, -5, 0, i * 1.0, 5, 0]) });
    }
    return result;
  }, []);

  return (
    <group ref={gridRef} position={[0, 0, -3]}>
      {lines.map(({ key, points }) => (
        <line key={key}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[points, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.04} />
        </line>
      ))}
    </group>
  );
}

function FloatingShapes() {
  const shapes = useMemo(() => [
    { pos: [-7, 2, -2] as [number, number, number], speed: 0.4 },
    { pos: [7, -2, -2] as [number, number, number], speed: 0.6 },
    { pos: [-5, -3, -1] as [number, number, number], speed: 0.5 },
    { pos: [5, 3, -1] as [number, number, number], speed: 0.7 },
  ], []);

  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  useFrame((state) => {
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      ref.current.rotation.x = state.clock.elapsedTime * shapes[i].speed * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * shapes[i].speed * 0.5;
    });
  });

  return (
    <>
      {shapes.map((s, i) => (
        <mesh key={i} ref={refs[i]} position={s.pos}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
        </mesh>
      ))}
    </>
  );
}

export default function Team() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  // Monochrome avatar colors (grayscale)
  const monoColors = ['#ffffff', '#cccccc', '#aaaaaa', '#888888', '#666666', '#444444'];

  return (
    <section id="team" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 65 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.3} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={1.0} color="#ffffff" />
          <TeamParticleField />
          <WireframeGrid />
          <FloatingShapes />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-700 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-white/60 text-sm font-bold uppercase tracking-widest mb-4">
            The People
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Passionate individuals united by a shared commitment to creating meaningful change.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {orgContent.team.map((member, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white/8"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{
                    backgroundColor: monoColors[i],
                    color: i < 3 ? '#000000' : '#ffffff',
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base group-hover:text-white/80 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-white/40 text-sm">{member.role}</p>
                </div>
              </div>

              <p className="text-white/40 text-sm leading-relaxed">{member.bio}</p>

              {/* Decorative accent */}
              <div
                className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full bg-white/30"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
