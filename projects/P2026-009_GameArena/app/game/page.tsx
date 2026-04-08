'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HUD } from '@/components/hud/HUD';
import { useGameStore } from '@/hooks/useGameState';

// Dynamic import for R3F (no SSR)
const Arena = dynamic(() => import('@/components/game/Arena'), { ssr: false });

export default function GamePage() {
  const gameOver = useGameStore((s) => s.gameOver);
  const scores = useGameStore((s) => s.scores);
  const resetGame = useGameStore((s) => s.resetGame);

  if (gameOver) {
    return <Scoreboard scores={scores} onPlayAgain={resetGame} />;
  }

  return (
    <div className="relative h-screen w-screen bg-black">
      <Suspense fallback={<LoadingScreen />}>
        <Arena />
      </Suspense>
      <HUD />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-arena-bg">
      <div className="text-center">
        <div className="font-title text-2xl text-arena-cyan animate-pulse mb-4">
          LOADING ARENA...
        </div>
        <div className="w-48 h-1 bg-zinc-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-arena-cyan rounded-full animate-[loading_1.5s_ease-in-out_infinite]" 
               style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}

interface Score {
  id: string;
  name: string;
  kills: number;
  deaths: number;
}

function Scoreboard({ scores, onPlayAgain }: { scores: Score[]; onPlayAgain: () => void }) {
  const sorted = [...scores].sort((a, b) => b.kills - a.kills);
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-arena-bg">
      <h1 className="font-title text-4xl md:text-5xl text-arena-gold mb-8">
        ★ GAME OVER ★
      </h1>

      <div className="w-full max-w-md bg-arena-surface border border-zinc-800 rounded-xl p-6 mb-8">
        <h2 className="font-title text-sm text-arena-cyan tracking-wider mb-4">RESULTS</h2>
        <div className="space-y-2">
          {sorted.map((player, i) => (
            <div
              key={player.id}
              className={`flex items-center justify-between px-4 py-3 rounded-lg
                ${i === 0 ? 'bg-arena-gold/10 border border-arena-gold/30' : 'bg-zinc-800/50'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{medals[i] || '  '}</span>
                <span className="text-zinc-200">{player.name}</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-arena-cyan">{player.kills} kills</span>
                <span className="text-zinc-500">{player.deaths} deaths</span>
                <span className="text-zinc-400">
                  {player.deaths > 0 ? (player.kills / player.deaths).toFixed(1) : player.kills.toFixed(1)} K/D
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPlayAgain}
          className="px-8 py-3 bg-arena-cyan/10 border border-arena-cyan/50
                     text-arena-cyan font-title tracking-wider rounded-lg
                     hover:bg-arena-cyan/20 animate-pulse-glow transition-all"
        >
          PLAY AGAIN
        </button>
        <button
          onClick={() => window.location.href = '/lobby'}
          className="px-8 py-3 bg-zinc-800 border border-zinc-700
                     text-zinc-300 font-sans rounded-lg
                     hover:bg-zinc-700 transition-all"
        >
          LOBBY
        </button>
      </div>
    </div>
  );
}
