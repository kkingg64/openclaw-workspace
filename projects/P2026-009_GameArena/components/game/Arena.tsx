'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import { Player } from './Player';
import { Projectiles } from './Projectile';
import { ArenaEnvironment } from './Arena3D';
import { GameEffects } from './Effects';
import { useInput } from '@/hooks/useInput';
import { useGameLoop } from '@/hooks/useGameState';

export default function Arena() {
  useInput();
  useGameLoop();

  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 10] }}
      gl={{ antialias: true, alpha: false }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#00F5FF" />

      {/* Space environment */}
      <Stars radius={200} depth={100} count={3000} factor={4} saturation={0} fade />
      <fog attach="fog" args={['#09090b', 50, 200]} />

      {/* Game objects */}
      <ArenaEnvironment />
      <Player />
      <Projectiles />
      <GameEffects />
    </Canvas>
  );
}
