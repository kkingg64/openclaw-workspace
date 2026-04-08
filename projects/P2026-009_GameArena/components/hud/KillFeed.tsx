'use client';

import { useGameStore, type KillEvent } from '@/hooks/useGameState';

export function KillFeed() {
  const killFeed = useGameStore((s) => s.killFeed);

  return (
    <div className="absolute top-16 right-4 space-y-1 max-w-xs">
      {killFeed.slice(-5).map((event) => (
        <div
          key={event.id}
          className="flex items-center gap-2 text-sm bg-black/40 backdrop-blur-sm
                     rounded px-3 py-1 animate-float-up"
        >
          <span className="text-arena-cyan font-semibold">{event.killer}</span>
          <span className="text-zinc-500">eliminated</span>
          <span className="text-arena-magenta font-semibold">{event.victim}</span>
        </div>
      ))}
    </div>
  );
}
