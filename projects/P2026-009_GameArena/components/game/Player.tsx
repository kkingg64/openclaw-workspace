'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '@/hooks/useGameState';

export function Player() {
  const meshRef = useRef<THREE.Mesh>(null);
  const position = useGameStore((s) => s.playerPosition);
  const rotation = useGameStore((s) => s.playerRotation);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.set(position[0], position[1], position[2]);
    meshRef.current.rotation.y = rotation;
  });

  return (
    <group>
      {/* Player ship */}
      <mesh ref={meshRef} position={[0, 1, 0]}>
        {/* Simple spaceship shape */}
        <coneGeometry args={[0.5, 2, 6]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Engine glow */}
      <pointLight
        position={[position[0], position[1] - 0.5, position[2]]}
        color="#00F5FF"
        intensity={1}
        distance={5}
      />
    </group>
  );
}

export function RemotePlayer({ id, pos, rot, hp }: {
  id: string;
  pos: [number, number, number];
  rot: number;
  hp: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hpPercent = hp / 100;

  useFrame(() => {
    if (!meshRef.current) return;
    // Smooth interpolation
    meshRef.current.position.lerp(new THREE.Vector3(...pos), 0.15);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rot, 0.15);
  });

  return (
    <mesh ref={meshRef} position={pos}>
      <coneGeometry args={[0.5, 2, 6]} />
      <meshStandardMaterial
        color="#FF00FF"
        emissive="#FF00FF"
        emissiveIntensity={0.3 * hpPercent}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
