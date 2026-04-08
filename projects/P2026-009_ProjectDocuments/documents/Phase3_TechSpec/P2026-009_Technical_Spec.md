# P2026-009 Technical Specification — MADHORSE Game Arena

**Date:** 2026-04-01 | **Author:** CTO | **Phase:** 3
**Reviewed by:** CISO ✅

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                  │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │ Next.js  │  │  React   │  │  React Three      │  │
│  │ Pages    │  │  UI/HUD  │  │  Fiber (3D)       │  │
│  │ (Routes) │  │ (shadcn) │  │  + Rapier Physics │  │
│  └────┬─────┘  └────┬─────┘  └────────┬──────────┘  │
│       │              │                 │              │
│       └──────────────┴─────────────────┘              │
│                      │                                │
│              ┌───────┴────────┐                       │
│              │ Zustand Store  │                       │
│              │ (Game State)   │                       │
│              └───────┬────────┘                       │
│                      │ WebSocket (Binary)             │
└──────────────────────┼───────────────────────────────┘
                       │
            ┌──────────┴──────────┐
            │   GAME SERVER       │
            │   (Node.js)         │
            │                     │
            │  ┌───────────────┐  │
            │  │ Room Manager  │  │
            │  │ Game Loop 20Hz│  │
            │  │ Physics Auth  │  │
            │  │ Hit Detection │  │
            │  └───────────────┘  │
            │                     │
            │  ┌───────────────┐  │
            │  │ WebSocket (ws)│  │
            │  │ Binary Proto  │  │
            │  └───────────────┘  │
            └─────────────────────┘
```

## 2. Tech Stack (Final)

| Layer | Technology | Version | Stars | Justification |
|-------|-----------|---------|-------|---------------|
| Framework | Next.js | 14+ | 128K+ | MADHORSE 標準 |
| 3D Rendering | @react-three/fiber | 9.x | 28K+ | Best React Three.js bindings |
| 3D Helpers | @react-three/drei | 9.x | 8K+ | Reusable 3D components |
| Physics | @react-three/rapier | 1.x | 3K+ | WASM Rapier, server-safe |
| WebSocket | ws | 8.x | 21K+ | Node.js gold standard |
| State | zustand | 5.x | 50K+ | Lightweight, game-loop friendly |
| Styling | Tailwind CSS | 3.x | 85K+ | MADHORSE 標準 |
| UI Components | shadcn/ui | — | 80K+ | MADHORSE 標準 |
| Language | TypeScript | 5.x | — | Type safety |
| Deploy | Docker + Nginx | — | — | MADHORSE VPS 基建 |

> All dependencies have Stars > 100 ✅ (MADHORSE Rule)

## 3. Project Structure

```
projects/P2026-009_GameArena/
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── public/
│   ├── fonts/
│   └── sounds/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + fonts
│   │   ├── page.tsx            # Title Screen
│   │   ├── lobby/
│   │   │   └── page.tsx        # Lobby Screen
│   │   ├── game/
│   │   │   └── page.tsx        # Arena (3D canvas mount)
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   ├── game/
│   │   │   ├── Arena.tsx       # R3F Canvas + Scene
│   │   │   ├── Player.tsx      # Player 3D model + controls
│   │   │   ├── Projectile.tsx  # Bullet with trail
│   │   │   ├── Arena3D.tsx     # Environment (asteroids, skybox)
│   │   │   ├── Effects.tsx     # Post-processing (bloom, vignette)
│   │   │   └── MobileControls.tsx
│   │   └── hud/
│   │       ├── HUD.tsx         # HUD overlay container
│   │       ├── HPBar.tsx       # Health bar component
│   │       ├── Crosshair.tsx   # Aim reticle
│   │       ├── KillFeed.tsx    # Kill notifications
│   │       ├── MiniMap.tsx     # Radar mini-map
│   │       └── Timer.tsx       # Countdown timer
│   ├── hooks/
│   │   ├── useGameSocket.ts    # WebSocket connection + binary protocol
│   │   ├── useGameState.ts     # Zustand store
│   │   ├── useInput.ts         # Keyboard + mouse + touch input
│   │   └── useSettings.ts     # Quality/volume settings
│   ├── lib/
│   │   ├── protocol.ts         # Binary message encode/decode
│   │   ├── interpolation.ts    # Client-side entity interpolation
│   │   └── constants.ts        # Game constants
│   └── types/
│       └── game.ts             # TypeScript types
├── server/
│   ├── index.ts                # Server entry (WebSocket + HTTP)
│   ├── Room.ts                 # Room lifecycle management
│   ├── GameLoop.ts             # Authoritative game loop (20Hz)
│   ├── Player.ts               # Server-side player state
│   ├── Physics.ts              # Server-side collision detection
│   ├── Protocol.ts             # Binary protocol (server)
│   └── AntiCheat.ts            # Position/speed sanity checks
└── tests/
    ├── server/
    │   ├── Room.test.ts
    │   ├── GameLoop.test.ts
    │   ├── Physics.test.ts
    │   └── AntiCheat.test.ts
    └── client/
        ├── protocol.test.ts
        └── useGameState.test.ts
```

## 4. Key Technical Decisions

### 4.1 Server Authority Model
```
Server (20Hz tick):
  1. Receive inputs from clients (move direction, shoot intent)
  2. Validate inputs (speed check, rate limit)
  3. Update physics simulation (positions, collisions)
  4. Detect hits (server-side raycasting)
  5. Broadcast state snapshot to all clients

Client (60fps render):
  1. Send inputs to server
  2. Receive authoritative state
  3. Interpolate between snapshots (smooth rendering)
  4. Predict own movement (immediate response)
  5. Reconcile with server state (correct prediction errors)
```

### 4.2 Binary Protocol

```typescript
// Message types (1 byte header)
enum MessageType {
  PLAYER_INPUT = 0x01,    // Client → Server
  GAME_STATE   = 0x02,    // Server → Client (20Hz)
  PLAYER_JOIN  = 0x03,
  PLAYER_LEAVE = 0x04,
  HIT_CONFIRM  = 0x05,
  GAME_EVENT   = 0x06,    // Kill, PowerUp, GameOver
}

// Game State packet (Server → Client, ~100 bytes per player)
// [type:1][tick:4][playerCount:1][...players]
// Per player: [id:1][x:4][y:4][z:4][rotY:2][hp:1][state:1] = 17 bytes
// 4 players = 1 + 4 + 1 + (17 × 4) = 74 bytes per tick
// At 20Hz = 1.48 KB/s total bandwidth
```

### 4.3 Room Lifecycle

```
WAITING (< maxPlayers joined)
  → COUNTDOWN (all players ready, 3s countdown)
  → PLAYING (game loop active, timer running)
  → ENDED (timer = 0 or last player left)
  → CLEANUP (5s, then room destroyed)
```

### 4.4 Quality Presets

| Setting | Low | Medium | High |
|---------|-----|--------|------|
| Shadow | Off | Basic | PCF Soft |
| Particles | Minimal | Normal | Extra |
| Post-processing | Off | Bloom only | Bloom + Vignette |
| Texture | 512px | 1024px | 2048px |
| Anti-alias | Off | FXAA | MSAA 4x |

## 5. API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Title Screen (Next.js SSR) |
| GET | `/lobby` | Lobby page |
| GET | `/game?room={id}` | Game Arena |
| WS | `/ws` | WebSocket connection |
| GET | `/api/rooms` | List open rooms |
| POST | `/api/rooms` | Create room |
| GET | `/api/health` | Health check |

## 6. Security Requirements (CISO Co-review)

| Requirement | Implementation |
|-------------|---------------|
| Server-side hit detection | All raycasting on server, client only renders |
| Input rate limiting | Max 30 inputs/sec per client |
| Position sanity | Reject if displacement > maxSpeed × dt × 1.5 |
| Room ID | UUIDv4, no enumeration |
| Session token | Generated on WS connect, stored in-memory |
| CORS | Only allow game domain origin |
| WebSocket origin check | Validate Origin header |
| Max connections per IP | 3 concurrent sessions |
| Message size limit | 256 bytes max per message |

**CISO Review: `[CISO_SAFE: P2026-009 Tech Spec reviewed, security requirements adequate]`**

## 7. Deployment Plan

```yaml
# docker-compose.yml
services:
  game-arena:
    build: .
    ports:
      - "8090:3000"   # HTTP
      - "8091:3001"   # WebSocket
    environment:
      - NODE_ENV=production
      - WS_PORT=3001
    restart: unless-stopped
    mem_limit: 512m
    cpus: 1.0
```

**Target URL:** `http://76.13.215.13:8090` (behind Nginx)
**VPS:** Hostinger 76.13.215.13 (existing)

## 8. Test Strategy (TDD)

| Test Type | Target | Coverage |
|-----------|--------|----------|
| Unit | Physics.ts, Protocol.ts, AntiCheat.ts | ≥ 80% |
| Integration | Room lifecycle, WebSocket flow | Key paths |
| E2E | Join room → Play → Score | Happy path |
| Performance | FPS monitoring, latency | Benchmarks |

```bash
# Test commands
npm test                    # All tests
npm run test:server         # Server-side only
npm run test:client         # Client-side only
npm run test:coverage       # With coverage report
```

---

`[TECH_SPEC_COMPLETE: 2026-04-01 14:40 HKT]`
`[CISO_SAFE: 2026-04-01 14:42 HKT]`
