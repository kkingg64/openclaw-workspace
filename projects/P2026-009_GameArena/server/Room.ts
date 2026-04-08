import { WebSocket } from 'ws';

interface PlayerState {
  id: string;
  ws: WebSocket;
  x: number;
  y: number;
  z: number;
  rotation: number;
  hp: number;
  kills: number;
  deaths: number;
  lastInput: { moveX: number; moveZ: number; shoot: boolean };
  lastShootTime: number;
}

type RoomStatus = 'waiting' | 'countdown' | 'playing' | 'ended';

const TICK_RATE = 20; // Hz
const MOVE_SPEED = 12;
const ARENA_RADIUS = 38;
const SHOOT_COOLDOWN = 200; // ms
const PROJECTILE_RANGE = 40;

export class Room {
  id: string;
  maxPlayers: number;
  timeLimit: number;
  status: RoomStatus = 'waiting';
  private players = new Map<string, PlayerState>();
  private tickInterval: ReturnType<typeof setInterval> | null = null;
  private gameTimer: ReturnType<typeof setInterval> | null = null;
  private timeRemaining: number;

  constructor(id: string, maxPlayers: number, timeLimit: number) {
    this.id = id;
    this.maxPlayers = maxPlayers;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeLimit;
  }

  get playerCount() {
    return this.players.size;
  }

  hasPlayer(id: string): boolean {
    return this.players.has(id);
  }

  isFull(): boolean {
    return this.players.size >= this.maxPlayers;
  }

  isEmpty(): boolean {
    return this.players.size === 0;
  }

  addPlayer(id: string, ws: WebSocket) {
    // Random spawn position within arena
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 20 + 5;

    this.players.set(id, {
      id,
      ws,
      x: Math.cos(angle) * dist,
      y: 1,
      z: Math.sin(angle) * dist,
      rotation: 0,
      hp: 100,
      kills: 0,
      deaths: 0,
      lastInput: { moveX: 0, moveZ: 0, shoot: false },
      lastShootTime: 0,
    });

    // Start game when 2+ players
    if (this.players.size >= 2 && this.status === 'waiting') {
      this.startGame();
    }
  }

  removePlayer(id: string) {
    this.players.delete(id);
    if (this.isEmpty()) {
      this.stopGame();
    }
  }

  handleInput(playerId: string, input: { moveX: number; moveZ: number; shoot: boolean }) {
    const player = this.players.get(playerId);
    if (!player || this.status !== 'playing') return;
    player.lastInput = input;
  }

  private startGame() {
    this.status = 'playing';
    this.timeRemaining = this.timeLimit;

    // Game tick loop (20Hz)
    this.tickInterval = setInterval(() => this.tick(), 1000 / TICK_RATE);

    // Game timer (1Hz)
    this.gameTimer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.endGame();
      }
    }, 1000);

    console.log(`[Room ${this.id}] Game started`);
  }

  private stopGame() {
    if (this.tickInterval) clearInterval(this.tickInterval);
    if (this.gameTimer) clearInterval(this.gameTimer);
    this.tickInterval = null;
    this.gameTimer = null;
  }

  private endGame() {
    this.status = 'ended';
    this.stopGame();

    // Send game over with scores
    const scores = Array.from(this.players.values()).map((p) => ({
      id: p.id,
      kills: p.kills,
      deaths: p.deaths,
    }));

    const scoreJson = JSON.stringify(scores);
    const buf = Buffer.alloc(1 + scoreJson.length);
    buf[0] = 0x06; // GAME_EVENT (game over)
    buf.write(scoreJson, 1, 'utf8');

    this.broadcast(buf);
    console.log(`[Room ${this.id}] Game ended`);
  }

  private tick() {
    const dt = 1 / TICK_RATE;

    // Update each player position
    for (const [, player] of this.players) {
      const input = player.lastInput;

      // Apply movement (server-authoritative)
      player.x += input.moveX * MOVE_SPEED * dt;
      player.z += input.moveZ * MOVE_SPEED * dt;

      // Clamp to arena bounds
      const dist = Math.sqrt(player.x * player.x + player.z * player.z);
      if (dist > ARENA_RADIUS) {
        player.x = (player.x / dist) * ARENA_RADIUS;
        player.z = (player.z / dist) * ARENA_RADIUS;
      }

      // Handle shooting (server-side hit detection)
      if (input.shoot && Date.now() - player.lastShootTime > SHOOT_COOLDOWN) {
        player.lastShootTime = Date.now();
        this.processShot(player);
      }
    }

    // Broadcast state to all players
    this.broadcastState();
  }

  private processShot(shooter: PlayerState) {
    // Simple distance-based hit detection
    for (const [, target] of this.players) {
      if (target.id === shooter.id) continue;

      const dx = target.x - shooter.x;
      const dz = target.z - shooter.z;
      const distance = Math.sqrt(dx * dx + dz * dz);

      // Check if target is within range and roughly in front
      if (distance < PROJECTILE_RANGE && distance < 30) {
        // Simplified: probability-based hit (distance-dependent)
        const hitChance = Math.max(0.1, 1 - distance / 30);
        if (Math.random() < hitChance) {
          target.hp -= 20;

          // Send hit confirmation to shooter
          const hitBuf = Buffer.alloc(2);
          hitBuf[0] = 0x05; // HIT_CONFIRM
          hitBuf[1] = target.hp <= 0 ? 1 : 0; // 1 = kill
          shooter.ws.send(hitBuf);

          if (target.hp <= 0) {
            shooter.kills++;
            target.deaths++;
            // Respawn
            const angle = Math.random() * Math.PI * 2;
            const respawnDist = Math.random() * 15 + 10;
            target.x = Math.cos(angle) * respawnDist;
            target.z = Math.sin(angle) * respawnDist;
            target.hp = 100;
          }
        }
      }
    }
  }

  private broadcastState() {
    const playerCount = this.players.size;
    // [type:1][tick:4][time:2][playerCount:1][...players × 17 bytes]
    const buf = Buffer.alloc(1 + 4 + 2 + 1 + playerCount * 17);
    let offset = 0;

    buf[offset++] = 0x02; // GAME_STATE
    buf.writeUInt32LE(Date.now() & 0xFFFFFFFF, offset); offset += 4;
    buf.writeUInt16LE(this.timeRemaining, offset); offset += 2;
    buf[offset++] = playerCount;

    for (const [, player] of this.players) {
      // Per player: [id_hash:1][x:4][y:4][z:4][rotY:2][hp:1][state:1]
      buf[offset++] = player.id.charCodeAt(0); // simplified ID
      buf.writeFloatLE(player.x, offset); offset += 4;
      buf.writeFloatLE(player.y, offset); offset += 4;
      buf.writeFloatLE(player.z, offset); offset += 4;
      buf.writeInt16LE(Math.round(player.rotation * 100), offset); offset += 2;
      buf[offset++] = player.hp;
      buf[offset++] = 0; // state flags
    }

    this.broadcast(buf);
  }

  private broadcast(data: Buffer) {
    for (const [, player] of this.players) {
      if (player.ws.readyState === WebSocket.OPEN) {
        player.ws.send(data);
      }
    }
  }
}
