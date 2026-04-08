'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Starfield } from '@/components/ui/Starfield';

export default function TitleScreen() {
  const router = useRouter();
  const [online, setOnline] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate online count (in production, fetch from server)
    setOnline(Math.floor(Math.random() * 50) + 10);
  }, []);

  const handlePlay = () => {
    setLoading(true);
    router.push('/lobby');
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center">
      <Starfield />

      {/* Title */}
      <div className="text-center mb-12 z-10">
        <h1 className="font-title text-5xl md:text-7xl font-bold tracking-wider mb-2">
          <span className="text-arena-cyan">GAME</span>{' '}
          <span className="text-arena-magenta">ARENA</span>
        </h1>
        <p className="text-zinc-400 text-sm tracking-[0.3em] uppercase">
          MADHORSE Ltd.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 z-10 w-64">
        <button
          onClick={handlePlay}
          disabled={loading}
          className="relative px-8 py-4 bg-arena-cyan/10 border border-arena-cyan/50
                     text-arena-cyan font-title text-lg tracking-wider
                     hover:bg-arena-cyan/20 hover:scale-105 hover:border-arena-cyan
                     active:scale-95 transition-all duration-150
                     animate-pulse-glow rounded-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              CONNECTING...
            </span>
          ) : (
            '▶ PLAY NOW'
          )}
        </button>

        <button
          onClick={() => router.push('/settings')}
          className="px-8 py-3 bg-zinc-800/50 border border-zinc-700
                     text-zinc-300 font-sans text-sm tracking-wider
                     hover:bg-zinc-700/50 hover:border-zinc-600
                     transition-all duration-150 rounded-lg"
        >
          ⚙ SETTINGS
        </button>
      </div>

      {/* Online count */}
      <div className="absolute bottom-8 text-zinc-500 text-sm z-10">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
        Online: {online} players
      </div>
    </div>
  );
}
