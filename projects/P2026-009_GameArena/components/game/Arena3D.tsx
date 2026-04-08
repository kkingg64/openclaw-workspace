'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Ring } from '@react-three/drei';
import * as THREE from 'three';

export function ArenaEnvironment() {
  return (
    <group>
      {/* Arena floor — glowing grid */}
      <ArenaFloor />

      {/* Arena boundary walls (transparent) */}
      <ArenaBoundary />

      {/* Floating asteroids (obstacles) */}
      <Asteroids />
    </group>
  );
}

function ArenaFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshStandardMaterial
        color="#09090b"
        wireframe
        transparent
        opacity={0.15}
        emissive="#00F5FF"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

function ArenaBoundary() {
  const radius = 40;

  return (
    <group>
      {/* Boundary ring on floor */}
      <Ring args={[radius - 0.5, radius, 64]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <meshStandardMaterial
          color="#FF00FF"
          emissive="#FF00FF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Vertical boundary posts */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, 5, z]}>
            <cylinderGeometry args={[0.1, 0.1, 10, 8]} />
            <meshStandardMaterial
              color="#FF00FF"
              emissive="#FF00FF"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Asteroids() {
  const asteroidData = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 60,
        Math.random() * 8 + 1,
        (Math.random() - 0.5) * 60,
      ] as [number, number, number],
      scale: Math.random() * 1.5 + 0.5,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
    }));
  }, []);

  return (
    <group>
      {asteroidData.map((asteroid, i) => (
        <FloatingAsteroid key={i} {...asteroid} />
      ))}
    </group>
  );
}

function FloatingAsteroid({
  position,
  scale,
  rotationSpeed,
}: {
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += rotationSpeed * delta;
    ref.current.rotation.z += rotationSpeed * 0.7 * delta;
    // Gentle float
    ref.current.position.y += Math.sin(Date.now() * 0.001 + position[0]) * 0.002;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#3f3f46"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}
