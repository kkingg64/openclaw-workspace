# P2026-009 AI Advisor Q&A — MADHORSE Game Arena

**Date:** 2026-04-01 | **Moderator:** COO | **Phase:** 1.5

---

## Round 1 — Requirements Advisory

### 🏢 Business Advisor (GPT-5.4)
**Verdict:** ✅ PROCEED

- ROI 分析合理，$12 成本 + 內部資源 = 極低風險
- 建議：加入 analytics tracking（PlayFab 或自建），收集玩家行為數據
- 風險提醒：io-game 市場已飽和，差異化必須來自**視覺品質**而非 gameplay，因為 gameplay loop 已經被驗證
- 追加建議：考慮加入 replay sharing（URL-based）提升病毒傳播

### 🛠️ Technical Advisor (Claude Sonnet 4.6)
**Verdict:** ✅ PROCEED with notes

- React Three Fiber + Rapier 係正確選擇，但要注意：
  - **Server authority** 必須先實現，唔好做 client-side hit detection（反作弊第一天就要有）
  - Rapier WASM physics 跑喺 server 端需要 Node.js worker thread 隔離
  - WebSocket binary protocol（ArrayBuffer）比 JSON 減少 60-80% bandwidth
  - 建議 **Tick rate 20Hz server → client interpolation 60Hz** (業界標準)
- 風險：手機 3D 效能差異大，建議做 **quality presets** (Low/Med/High)
- 架構建議：遊戲邏輯同渲染分離（ECS pattern 或 simple game loop）

### 🎨 Design Advisor (Gemini)
**Verdict:** ✅ PROCEED

- 太空主題好選擇 — 暗色背景天然適合 dark mode UI，粒子效果突出
- HUD 設計要素：HP bar, Crosshair, Kill count, Mini-map, Timer — 全部要**半透明 overlay**唔好擋視野
- Onboarding：建議用 **contextual tooltips** 而非 tutorial screen（玩家唔睇說明書）
- 手機觸控：左側 virtual joystick + 右側 aim area + 自動射擊（idle 3 秒先顯示控制教學）
- 色彩：敵人用紅色系，隊友用藍色系，power-ups 用金色 — 色盲友好

### 🔐 Security Advisor (GPT-4o)
**Verdict:** ✅ PROCEED with mandatory requirements

- **Critical:** 所有 hit detection MUST 在 server 端
- **Critical:** WebSocket message rate limiting（prevent spam/flood）
- Position sanity checks：如果玩家瞬移超過 max speed × time → reject
- 房間 ID 用 UUID，唔好用遞增數字（防止 enumeration）
- 考慮 CORS + Origin header validation
- 唔需要 auth 但需要 session token（防止同一人開 10 個 tab 刷分）

---

## Round 2 — Design Direction Advisory

### ① Design System 選擇
**推薦：Option A — shadcn/ui (Dark Theme)**
- 理由：MADHORSE 標準 stack，HUD overlay 用 shadcn components，game canvas 用 R3F
- 4/4 models 同意

### ② Visual Style
**推薦：Dark Mode Only + Neon Accent**
- 太空主題天然 dark，neon accent (cyan #00F5FF + magenta #FF00FF) 配 zinc dark
- Game UI 同 MADHORSE dashboard 風格一致

### ③ Screen Inventory
| # | Screen | 用途 |
|---|--------|------|
| 1 | Landing / Title Screen | 遊戲入口，大 LOGO，Play 按鈕 |
| 2 | Game Lobby | 創建/加入房間，在線人數 |
| 3 | Game Arena (3D) | 主遊戲畫面 + HUD overlay |
| 4 | Scoreboard / Game Over | 排名，Kill/Death，Replay 按鈕 |
| 5 | Settings | 畫質、音量、控制設定 |

### ④ Navigation Structure
**Single-flow wizard:**
`Title → Lobby → Arena → Score → (Lobby)`
- 無 sidebar/tabs — 遊戲唔需要複雜 navigation
- Back button 只喺 Lobby/Settings 出現

### ⑤ User Journey (Primary)
```
新玩家 → Title Screen → Click "PLAY" → Auto-join/Create Room
→ 3D Arena loads (< 3s) → 30s gameplay tutorial overlay
→ Game starts → Kill/Die/Respawn loop
→ Timer ends → Scoreboard → "PLAY AGAIN" or "LOBBY"
```

### ⑥ Responsive Requirements
| Breakpoint | Support |
|------------|---------|
| Desktop 1440px | ✅ 全功能 |
| Tablet 768px | ✅ 觸控 + 簡化 HUD |
| Mobile 390px | ✅ Virtual joystick + auto-aim |

---

## Meeting Minutes

**COO 總結：**
- 4 位 AI Advisor 一致通過 (4/4 PROCEED)
- 關鍵修訂納入 Requirements：
  1. Server-side hit detection (Security + Technical)
  2. Binary WebSocket protocol (Technical)
  3. Quality presets Low/Med/High (Technical)
  4. Session token anti-multi-tab (Security)
  5. Neon accent dark theme (Design)
  6. Virtual joystick for mobile (Design)
- Design Brief 已交 CDO

**Phase 1.5 → CEO Review → Boss approval → Phase 2**

`[PHASE_1_5_COMPLETE: 2026-04-01 14:20 HKT]`
