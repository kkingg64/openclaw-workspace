import { create } from 'zustand';
import { useEffect } from 'react';

export interface Projectile {
  id: string;
  position: [number, number, number];
  velocity: [number, number, number];
  ownerId: string;
  createdAt: number;
}

export interface RemotePlayer {
  id: string;
  name: string;
  position: [number, number, number];
  rotation: number;
  hp: number;
}

export interface KillEvent {
  id: string;
  killer: string;
  victim: string;
  timestamp: number;
}

interface RoomInfo {
  id: string;
  name: string;
  maxPlayers: number;
  timeLimit: number;
}

interface GameState {
  // Player
  hp: number;
  kills: number;
  deaths: number;
  playerPosition: [number, number, number];
  playerRotation: number;
  hitConfirm: boolean;

  // Game
  timeLeft: number;
  gameOver: boolean;
  room: RoomInfo | null;

  // Other players
  remotePlayers: RemotePlayer[];
  projectiles: Projectile[];
  killFeed: KillEvent[];

  // Scores (for scoreboard)
  scores: Array<{ id: string; name: string; kills: number; deaths: number }>;

  // Input state
  keys: Record<string, boolean>;

  // Actions
  setRoom: (room: RoomInfo) => void;
  setHP: (hp: number) => void;
  addKill: () => void;
  addDeath: () => void;
  setPlayerPosition: (pos: [number, number, number]) => void;
  setPlayerRotation: (rot: number) => void;
  setHitConfirm: (v: boolean) => void;
  shoot: () => void;
  setTimeLeft: (t: number) => void;
  setGameOver: (v: boolean) => void;
  setKey: (key: string, pressed: boolean) => void;
  resetGame: () => void;
  tick: (delta: number) => void;
}

const MOVE_SPEED = 12;
const PROJECTILE_SPEED = 40;
const ARENA_RADIUS = 38;

export const useGameStore = create<GameState>((set, get) => ({
  hp: 100,
  kills: 0,
  deaths: 0,
  playerPosition: [0, 1, 0],
  playerRotation: 0,
  hitConfirm: false,
  timeLeft: 180,
  gameOver: false,
  room: null,
  remotePlayers: [],
  projectiles: [],
  killFeed: [],
  scores: [
    { id: 'self', name: 'You', kills: 0, deaths: 0 },
    { id: 'bot1', name: 'StellarBot', kills: 0, deaths: 0 },
    { id: 'bot2', name: 'NovaCrush', kills: 0, deaths: 0 },
    { id: 'bot3', name: 'VoidWalker', kills: 0, deaths: 0 },
  ],
  keys: {},

  setRoom: (room) => set({ room, timeLeft: room.timeLimit || 180 }),
  setHP: (hp) => set({ hp: Math.max(0, Math.min(100, hp)) }),
  addKill: () => set((s) => ({
    kills: s.kills + 1,
    killFeed: [...s.killFeed, {
      id: crypto.randomUUID(),
      killer: 'You',
      victim: ['StellarBot', 'NovaCrush', 'VoidWalker'][Math.floor(Math.random() * 3)],
      timestamp: Date.now(),
    }],
  })),
  addDeath: () => set((s) => ({ deaths: s.deaths + 1, hp: 100 })),
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setPlayerRotation: (rot) => set({ playerRotation: rot }),
  setHitConfirm: (v) => set({ hitConfirm: v }),

  shoot: () => {
    const state = get();
    const rot = state.playerRotation;
    const pos = state.playerPosition;
    const velocity: [number, number, number] = [
      -Math.sin(rot) * PROJECTILE_SPEED,
      0,
      -Math.cos(rot) * PROJECTILE_SPEED,
    ];

    set({
      projectiles: [...state.projectiles, {
        id: crypto.randomUUID(),
        position: [pos[0], pos[1], pos[2]],
        velocity,
        ownerId: 'self',
        createdAt: Date.now(),
      }],
    });
  },

  setTimeLeft: (t) => set({ timeLeft: t }),
  setGameOver: (v) => set((s) => ({
    gameOver: v,
    scores: s.scores.map((sc) =>
      sc.id === 'self' ? { ...sc, kills: s.kills, deaths: s.deaths } : {
        ...sc,
        kills: Math.floor(Math.random() * s.kills + 2),
        deaths: Math.floor(Math.random() * 5 + 1),
      }
    ),
  })),

  setKey: (key, pressed) => set((s) => ({ keys: { ...s.keys, [key]: pressed } })),

  resetGame: () => set({
    hp: 100,
    kills: 0,
    deaths: 0,
    playerPosition: [0, 1, 0],
    playerRotation: 0,
    hitConfirm: false,
    timeLeft: 180,
    gameOver: false,
    projectiles: [],
    killFeed: [],
  }),

  tick: (delta) => {
    const state = get();
    if (state.gameOver) return;

    // Movement
    const keys = state.keys;
    let [x, y, z] = state.playerPosition;
    const rot = state.playerRotation;
    const speed = MOVE_SPEED * delta;

    if (keys['w'] || keys['arrowup']) {
      x -= Math.sin(rot) * speed;
      z -= Math.cos(rot) * speed;
    }
    if (keys['s'] || keys['arrowdown']) {
      x += Math.sin(rot) * speed;
      z += Math.cos(rot) * speed;
    }
    if (keys['a'] || keys['arrowleft']) {
      x -= Math.cos(rot) * speed;
      z += Math.sin(rot) * speed;
    }
    if (keys['d'] || keys['arrowright']) {
      x += Math.cos(rot) * speed;
      z -= Math.sin(rot) * speed;
    }

    // Clamp to arena boundary
    const dist = Math.sqrt(x * x + z * z);
    if (dist > ARENA_RADIUS) {
      x = (x / dist) * ARENA_RADIUS;
      z = (z / dist) * ARENA_RADIUS;
    }

    // Remove old projectiles (> 3s)
    const now = Date.now();
    const projectiles = state.projectiles.filter((p) => now - p.createdAt < 3000);

    // Simulate bot positions for demo
    const remotePlayers: RemotePlayer[] = [
      {
        id: 'bot1', name: 'StellarBot',
        position: [Math.sin(now * 0.001) * 15, 1, Math.cos(now * 0.001) * 15],
        rotation: now * 0.001, hp: 80,
      },
      {
        id: 'bot2', name: 'NovaCrush',
        position: [Math.sin(now * 0.0008 + 2) * 20, 1, Math.cos(now * 0.0008 + 2) * 20],
        rotation: now * 0.0008, hp: 60,
      },
      {
        id: 'bot3', name: 'VoidWalker',
        position: [Math.sin(now * 0.0012 + 4) * 10, 1, Math.cos(now * 0.0012 + 4) * 10],
        rotation: now * 0.0012, hp: 45,
      },
    ];

    set({
      playerPosition: [x, y, z],
      projectiles,
      remotePlayers,
    });
  },
}));

// Game loop hook
export function useGameLoop() {
  const tick = useGameStore((s) => s.tick);
  const setTimeLeft = useGameStore((s) => s.setTimeLeft);
  const setGameOver = useGameStore((s) => s.setGameOver);
  const timeLeft = useGameStore((s) => s.timeLeft);
  const gameOver = useGameStore((s) => s.gameOver);

  useEffect(() => {
    if (gameOver) return;

    // Timer countdown
    const timer = setInterval(() => {
      const t = useGameStore.getState().timeLeft;
      if (t <= 0) {
        setGameOver(true);
      } else {
        setTimeLeft(t - 1);
      }
    }, 1000);

    // Game tick (60Hz)
    let lastTime = performance.now();
    let animId: number;
    const loop = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      tick(delta);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animId);
    };
  }, [gameOver, tick, setTimeLeft, setGameOver]);
}
