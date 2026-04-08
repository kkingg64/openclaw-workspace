'use client';

import { useGameStore } from '@/hooks/useGameState';

export function MiniMap() {
  const playerPos = useGameStore((s) => s.playerPosition);
  const remotePlayers = useGameStore((s) => s.remotePlayers);
  const mapSize = 40; // Arena radius
  const displaySize = 120; // px

  const worldToMap = (x: number, z: number) => {
    const nx = ((x + mapSize) / (mapSize * 2)) * displaySize;
    const ny = ((z + mapSize) / (mapSize * 2)) * displaySize;
    return { x: Math.max(0, Math.min(displaySize, nx)), y: Math.max(0, Math.min(displaySize, ny)) };
  };

  const self = worldToMap(playerPos[0], playerPos[2]);

  return (
    <div
      className="relative rounded-full overflow-hidden border border-zinc-600/50 bg-black/60 backdrop-blur"
      style={{ width: displaySize, height: displaySize }}
    >
      {/* Grid lines */}
      <svg width={displaySize} height={displaySize} className="absolute inset-0 opacity-20">
        <line x1={displaySize/2} y1="0" x2={displaySize/2} y2={displaySize} stroke="#00F5FF" strokeWidth="0.5" />
        <line x1="0" y1={displaySize/2} x2={displaySize} y2={displaySize/2} stroke="#00F5FF" strokeWidth="0.5" />
        <circle cx={displaySize/2} cy={displaySize/2} r={displaySize/3} fill="none" stroke="#00F5FF" strokeWidth="0.5" />
      </svg>

      {/* Remote players (magenta dots) */}
      {remotePlayers.map((p) => {
        const pos = worldToMap(p.position[0], p.position[2]);
        return (
          <div
            key={p.id}
            className="absolute w-2 h-2 bg-arena-magenta rounded-full"
            style={{ left: pos.x - 4, top: pos.y - 4 }}
          />
        );
      })}

      {/* Self (cyan dot) */}
      <div
        className="absolute w-3 h-3 bg-arena-cyan rounded-full border border-white"
        style={{ left: self.x - 6, top: self.y - 6 }}
      />
    </div>
  );
}
