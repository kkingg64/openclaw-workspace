'use client';

import { HPBar } from './HPBar';
import { Crosshair } from './Crosshair';
import { KillFeed } from './KillFeed';
import { MiniMap } from './MiniMap';
import { Timer } from './Timer';
import { useGameStore } from '@/hooks/useGameState';

export function HUD() {
  const hp = useGameStore((s) => s.hp);
  const kills = useGameStore((s) => s.kills);
  const timeLeft = useGameStore((s) => s.timeLeft);

  const hpCritical = hp < 25;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* HP critical vignette */}
      {hpCritical && (
        <div className="absolute inset-0 animate-pulse"
             style={{
               background: 'radial-gradient(ellipse at center, transparent 50%, rgba(239, 68, 68, 0.3) 100%)',
             }}
        />
      )}

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        {/* HP - Top Left */}
        <HPBar value={hp} maxValue={100} />

        {/* Timer - Top Center */}
        <Timer seconds={timeLeft} />

        {/* Kills - Top Right */}
        <div className="font-mono text-lg">
          <span className="text-zinc-400 text-sm">KILLS </span>
          <span className="text-arena-cyan font-bold text-2xl">{kills}</span>
        </div>
      </div>

      {/* Crosshair - Center */}
      <Crosshair />

      {/* Kill Feed - Right side */}
      <KillFeed />

      {/* Bottom bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        {/* Ammo - Bottom Left */}
        <div className="font-mono text-arena-cyan">
          <span className="text-2xl">∞</span>
          <span className="text-xs text-zinc-500 ml-1">AMMO</span>
        </div>

        {/* Mini-map - Bottom Right */}
        <MiniMap />
      </div>
    </div>
  );
}
