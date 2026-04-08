# P2026-009 UAT Test Cases — MADHORSE Game Arena

**Date:** 2026-04-01 | **Author:** CDO | **Phase:** 2 (for Phase 5 execution)

---

## Test Case Matrix

### TC-001: Title Screen Load
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open game URL | Title screen loads < 3s |
| 2 | Verify 3D background | Animated asteroid field / starfield visible |
| 3 | Verify PLAY button | Button visible with cyan pulsing glow |
| 4 | Verify online counter | "Online: N players" displayed |
| **Screenshot:** | `tc001_title_desktop.png` / `tc001_title_mobile.png` |

### TC-002: Play Button → Lobby
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Click PLAY NOW | Navigate to Lobby < 500ms |
| 2 | Verify Lobby UI | CREATE ROOM form + OPEN ROOMS list visible |
| 3 | Verify Back button | ← Back returns to Title |

### TC-003: Create Room
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Enter room name "TestRoom" | Input accepts text |
| 2 | Select 4 max players | "4" button highlighted |
| 3 | Select 3min time limit | "3m" button highlighted |
| 4 | Click CREATE & PLAY | Room created, navigate to Arena |
| 5 | Verify waiting state | "Waiting for players... 1/4" visible |

### TC-004: Join Room
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | See open room in list | Room card with name + player count |
| 2 | Click JOIN on open room | Navigate to Arena |
| 3 | Verify FULL rooms | JOIN button disabled for 4/4 rooms |

### TC-005: Game Arena — Desktop Controls
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | W key | Player moves forward |
| 2 | A/S/D keys | Left/back/right movement |
| 3 | Mouse move | Camera/aim rotates |
| 4 | Left click | Shoots projectile with trail |
| 5 | Verify HUD | HP, Timer, Kills, Crosshair, Mini-map all visible |
| **Screenshot:** | `tc005_arena_desktop.png` |

### TC-006: Game Arena — Mobile Controls
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Touch left joystick | Player moves in joystick direction |
| 2 | Touch right aim pad | Camera/aim rotates |
| 3 | Verify auto-aim | Crosshair snaps near enemy when close |
| 4 | Verify HUD simplified | No overlap with touch controls |
| **Screenshot:** | `tc006_arena_mobile.png` |

### TC-007: Combat — Hit Detection
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Shoot at enemy | Enemy HP decreases |
| 2 | Verify hit confirmation | Crosshair flash red on hit |
| 3 | Kill enemy | "+1 KILL" notification + kill count updates |
| 4 | Get killed | Screen desaturate → "ELIMINATED" → 3s respawn |

### TC-008: HP System
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | HP > 50% | HP bar cyan-green gradient |
| 2 | HP 25-50% | HP bar yellow, slow pulse |
| 3 | HP < 25% | HP bar red, fast pulse, screen vignette |
| 4 | HP = 0 | Death sequence triggered |

### TC-009: Game Over / Scoreboard
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Timer reaches 0:00 | Game freezes → fade to Scoreboard |
| 2 | Verify rankings | Players sorted by kills, medals 🥇🥈🥉 |
| 3 | Verify own stats | Kill count, death count, K/D ratio |
| 4 | Click PLAY AGAIN | Return to same room |
| 5 | Click LOBBY | Return to Lobby |
| **Screenshot:** | `tc009_scoreboard.png` |

### TC-010: Settings
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open Settings | Settings panel visible |
| 2 | Change quality to Low | Visual quality reduces (less particles etc.) |
| 3 | Change SFX volume | Volume slider works + preview sound |
| 4 | Save & Close | Settings persisted (localStorage) |

### TC-011: Performance
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Desktop gameplay | ≥ 60fps (DevTools Performance) |
| 2 | Mobile gameplay | ≥ 30fps |
| 3 | 4 players in room | No visible lag, smooth movement |
| **Evidence:** | FPS counter screenshot |

### TC-012: Responsive
| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Desktop 1440px | Full UI, mouse+keyboard controls |
| 2 | Tablet 768px | Touch controls, simplified HUD |
| 3 | Mobile 390px | Joystick + aim pad, auto-aim enabled |
| **Screenshot:** | `tc012_responsive_{breakpoint}.png` |

---

**Total Test Cases:** 12
**Total Steps:** 42
**Required Screenshots:** 8+

`[UAT_TEST_CASES_COMPLETE: 2026-04-01 14:35 HKT]`
