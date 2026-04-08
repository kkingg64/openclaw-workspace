'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGameStore } from '@/hooks/useGameState';
import { Starfield } from '@/components/ui/Starfield';

interface Room {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: 'open' | 'full' | 'in-progress';
}

const MOCK_ROOMS: Room[] = [
  { id: '1', name: 'Alpha Room', players: 2, maxPlayers: 4, status: 'open' },
  { id: '2', name: 'Beta Room', players: 1, maxPlayers: 3, status: 'open' },
  { id: '3', name: 'Gamma Room', players: 4, maxPlayers: 4, status: 'full' },
];

export default function LobbyPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [timeLimit, setTimeLimit] = useState(180); // seconds
  const setRoom = useGameStore((s) => s.setRoom);

  const handleCreate = () => {
    const roomId = crypto.randomUUID();
    setRoom({ id: roomId, name: roomName || 'My Room', maxPlayers, timeLimit });
    router.push(`/game?room=${roomId}`);
  };

  const handleJoin = (room: Room) => {
    if (room.status === 'full') return;
    setRoom({ id: room.id, name: room.name, maxPlayers: room.maxPlayers, timeLimit: 180 });
    router.push(`/game?room=${room.id}`);
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center p-8">
      <Starfield />

      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8 z-10">
        <button
          onClick={() => router.push('/')}
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          ← Back
        </button>
        <h1 className="font-title text-2xl text-arena-cyan tracking-wider">GAME LOBBY</h1>
        <div className="w-16" />
      </div>

      <div className="w-full max-w-2xl space-y-6 z-10">
        {/* Create Room */}
        <div className="bg-arena-surface/80 backdrop-blur border border-zinc-800 rounded-xl p-6">
          <h2 className="font-title text-sm text-arena-cyan tracking-wider mb-4">CREATE ROOM</h2>
          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 text-sm block mb-1">Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="My Arena"
                maxLength={20}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2
                           text-zinc-100 placeholder-zinc-500 focus:border-arena-cyan
                           focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="text-zinc-400 text-sm block mb-1">Max Players</label>
                <div className="flex gap-2">
                  {[2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => setMaxPlayers(n)}
                      className={`w-10 h-10 rounded-lg border font-mono text-sm transition-all
                        ${maxPlayers === n
                          ? 'bg-arena-cyan/20 border-arena-cyan text-arena-cyan'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                        }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-zinc-400 text-sm block mb-1">Time Limit</label>
                <div className="flex gap-2">
                  {[{ label: '3m', value: 180 }, { label: '5m', value: 300 }, { label: '∞', value: 0 }].map((t) => (
                    <button
                      key={t.label}
                      onClick={() => setTimeLimit(t.value)}
                      className={`px-3 h-10 rounded-lg border font-mono text-sm transition-all
                        ${timeLimit === t.value
                          ? 'bg-arena-cyan/20 border-arena-cyan text-arena-cyan'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="w-full py-3 bg-arena-cyan/10 border border-arena-cyan/50
                         text-arena-cyan font-title text-sm tracking-wider rounded-lg
                         hover:bg-arena-cyan/20 hover:border-arena-cyan
                         active:scale-[0.98] transition-all"
            >
              CREATE & PLAY ▶
            </button>
          </div>
        </div>

        {/* Open Rooms */}
        <div className="bg-arena-surface/80 backdrop-blur border border-zinc-800 rounded-xl p-6">
          <h2 className="font-title text-sm text-arena-cyan tracking-wider mb-4">OPEN ROOMS</h2>
          <div className="space-y-2">
            {MOCK_ROOMS.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between bg-zinc-800/50 rounded-lg px-4 py-3
                           border border-zinc-700/50"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${
                    room.status === 'full' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className="text-zinc-200">{room.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400 font-mono text-sm">
                    {room.players}/{room.maxPlayers}
                  </span>
                  <button
                    onClick={() => handleJoin(room)}
                    disabled={room.status === 'full'}
                    className={`px-4 py-1.5 rounded text-sm font-semibold transition-all
                      ${room.status === 'full'
                        ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                        : 'bg-arena-cyan/10 border border-arena-cyan/50 text-arena-cyan hover:bg-arena-cyan/20'
                      }`}
                  >
                    {room.status === 'full' ? 'FULL' : 'JOIN'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-zinc-500 text-sm z-10">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
        Online: 42 | In Game: 28
      </div>
    </div>
  );
}
