'use client';

import { useGameStore } from '@/hooks/useGameState';

export function Crosshair() {
  const hitConfirm = useGameStore((s) => s.hitConfirm);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
        {/* Outer circle */}
        <circle
          cx="20" cy="20" r="16"
          fill="none"
          stroke={hitConfirm ? '#EF4444' : '#00F5FF'}
          strokeWidth="1.5"
          opacity={0.7}
        />
        {/* Center dot */}
        <circle
          cx="20" cy="20" r="2"
          fill={hitConfirm ? '#EF4444' : '#00F5FF'}
        />
        {/* Cross lines */}
        <line x1="20" y1="8" x2="20" y2="14" stroke={hitConfirm ? '#EF4444' : '#00F5FF'} strokeWidth="1.5" />
        <line x1="20" y1="26" x2="20" y2="32" stroke={hitConfirm ? '#EF4444' : '#00F5FF'} strokeWidth="1.5" />
        <line x1="8" y1="20" x2="14" y2="20" stroke={hitConfirm ? '#EF4444' : '#00F5FF'} strokeWidth="1.5" />
        <line x1="26" y1="20" x2="32" y2="20" stroke={hitConfirm ? '#EF4444' : '#00F5FF'} strokeWidth="1.5" />
      </svg>
    </div>
  );
}
