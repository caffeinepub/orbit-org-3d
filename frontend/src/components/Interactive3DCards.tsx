import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ServiceCardProps {
  position: [number, number, number];
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

function ServiceCard3D({ position, index, isSelected, onSelect }: ServiceCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetScale = isSelected ? 1.3 : hovered ? 1.15 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
    meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3 + index) * 0.05;
  });

  const baseColor = isSelected ? '#ffffff' : hovered ? '#cccccc' : '#888888';
  const cardColor = new THREE.Color(baseColor);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={() => onSelect(index)}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[1.4, 1.8, 0.12]} />
        <meshStandardMaterial
          color={cardColor}
          metalness={0.7}
          roughness={0.15}
          emissive={cardColor}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0.08}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

interface Interactive3DCardsProps {
  services: Array<{ id: number; title: string; description: string; icon: string; color: string }>;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function Interactive3DCards({ services, selectedIndex, onSelect }: Interactive3DCardsProps) {
  const positions: [number, number, number][] = [
    [-4.5, 0, 0],
    [-2.7, 0, 0],
    [-0.9, 0, 0],
    [0.9, 0, 0],
    [2.7, 0, 0],
    [4.5, 0, 0],
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ height: '280px' }}
    >
      <ambientLight intensity={0.6} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={1.0} color="#aaaaaa" />

      {services.map((service, i) => (
        <ServiceCard3D
          key={service.id}
          position={positions[i] || [i * 1.8 - 4.5, 0, 0]}
          index={i}
          isSelected={selectedIndex === i}
          onSelect={onSelect}
        />
      ))}
    </Canvas>
  );
}
