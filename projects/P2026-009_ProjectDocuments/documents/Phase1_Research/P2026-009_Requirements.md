# P2026-009 Requirements — MADHORSE Game Arena

**Date:** 2026-04-01 | **Author:** COO | **Phase:** 1

---

## Functional Requirements

### P0 — Must Have (MVP)
| # | Requirement | Acceptance Criteria |
|---|-------------|-------------------|
| F-001 | 3D 遊戲場景渲染 | Three.js/R3F 渲染太空競技場，60fps desktop |
| F-002 | 玩家移動控制 | WASD + mouse/touch 移動+瞄準，流暢無延遲感 |
| F-003 | 射擊系統 | Click/Tap 射擊，子彈有軌跡線，碰撞檢測準確 |
| F-004 | 生命值系統 | HP bar 可見，被擊中扣血，HP=0 爆炸+復活 |
| F-005 | 即時多人對戰 | WebSocket 2-4 人同房間，延遲 < 100ms |
| F-006 | 計分系統 | Kill count 即時顯示，遊戲結束顯示排名 |
| F-007 | 遊戲大廳 | 創建/加入房間，顯示在線玩家數 |
| F-008 | 響應式 | Desktop 1440px + Mobile 390px 可玩 |

### P1 — Should Have
| # | Requirement |
|---|-------------|
| F-009 | 排行榜系統 (Top 10 per day/all-time) |
| F-010 | Power-ups (Shield, Speed Boost, Damage Up) |
| F-011 | 音效 (射擊、爆炸、背景音樂) |
| F-012 | 小地圖 (Mini-map) |

### P2 — Nice to Have
| # | Requirement |
|---|-------------|
| F-013 | 多種武器選擇 |
| F-014 | 角色外觀自定義 |
| F-015 | 觀戰模式 |

## Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | Desktop FPS | ≥ 60fps @ 1080p |
| Performance | Mobile FPS | ≥ 30fps @ 720p |
| Performance | First Paint | < 3 seconds |
| Performance | WebSocket Latency | < 100ms p95 |
| Scalability | Concurrent rooms | ≥ 10 rooms |
| Scalability | Players per room | 2-4 |
| Security | Input validation | Server-side hit detection |
| Security | Anti-cheat | Speed/position sanity checks |
| Accessibility | Color contrast | WCAG AA |
| Accessibility | Keyboard-only play | Supported (WASD+Space) |

## Scope Boundary

### IN
- Browser-based 3D game (Three.js / React Three Fiber)
- Real-time multiplayer via WebSocket
- Desktop + Mobile responsive
- Docker deployment on existing VPS
- Session-based identity (no auth system)

### OUT
- Native apps (iOS/Android)
- VR/AR support
- Payment/microtransaction system
- User authentication / account system
- Social features (friends, chat)
- Game recording/replay

## Tech Stack Recommendation

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | Next.js 14+ + React Three Fiber | MADHORSE 標準 stack + 3D 最佳 React bindings |
| 3D Engine | Three.js via @react-three/fiber | 最成熟 WebGL library，大量 helper (@react-three/drei) |
| Physics | @react-three/rapier (Rapier WASM) | Rust-based physics engine，性能最強 |
| Multiplayer | WebSocket (ws library) | Node.js 原生，低延遲 |
| Styling | Tailwind CSS + shadcn/ui | MADHORSE 標準，UI overlay 用 |
| State | Zustand | 輕量 state management，適合 game state |
| Deploy | Docker + Nginx | 已有 VPS 基建 |

---

`[REQUIREMENTS_COMPLETE: 2026-04-01 14:15 HKT]`
