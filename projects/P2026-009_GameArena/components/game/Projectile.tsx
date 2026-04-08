'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore, type Projectile } from '@/hooks/useGameState';

function ProjectileMesh({ projectile }: { projectile: Projectile }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Move projectile forward
    meshRef.current.position.x += projectile.velocity[0] * delta;
    meshRef.current.position.y += projectile.velocity[1] * delta;
    meshRef.current.position.z += projectile.velocity[2] * delta;
  });

  return (
    <mesh ref={meshRef} position={projectile.position}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color="#00F5FF"
        emissive="#00F5FF"
        emissiveIntensity={2}
      />
      {/* Glow */}
      <pointLight color="#00F5FF" intensity={0.5} distance={3} />
    </mesh>
  );
}

export function Projectiles() {
  const projectiles = useGameStore((s) => s.projectiles);

  return (
    <group>
      {projectiles.map((p) => (
        <ProjectileMesh key={p.id} projectile={p} />
      ))}
    </group>
  );
}
