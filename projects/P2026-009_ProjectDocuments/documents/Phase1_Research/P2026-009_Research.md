# P2026-009 Research Report — MADHORSE Game Arena

**Date:** 2026-04-01 | **Author:** COO | **Phase:** 1

---

## 1. Problem Framing

Web-based gaming 市場快速增長，browser game 消除咗下載門檻，即開即玩。MADHORSE 需要一個技術旗艦產品展示 3D rendering + real-time multiplayer 能力。

## 2. Target Users

| Persona | 特徵 | 動機 |
|---------|------|------|
| Casual Gamer | 15-35歲，用公司電腦/手機 | 碎片時間娛樂，唔想裝 app |
| Competitive Player | 18-30歲，追求排名 | 即時對戰，leaderboard |
| Tech Demo Viewer | 客戶/投資者 | 評估 MADHORSE 技術能力 |

## 3. Competitor Analysis (≥5 真實來源)

| # | Product | URL | Tech Stack | MAU | Revenue Model | 強/弱 |
|---|---------|-----|------------|-----|---------------|-------|
| 1 | **Krunker.io** | https://krunker.io | Three.js, WebSocket | 15M+ | Ads + Skins | ✅ 極低延遲 FPS ❌ 畫質普通 |
| 2 | **Agar.io** | https://agar.io | Canvas 2D, WebSocket | 50M+ (peak) | Ads | ✅ 極簡上手 ❌ 深度不足 |
| 3 | **Diep.io** | https://diep.io | Canvas 2D, WebSocket | 10M+ | Ads | ✅ 升級系統佳 ❌ 重複感 |
| 4 | **Shell Shockers** | https://shellshockers.com | Three.js, Node.js | 8M+ | Ads + Premium | ✅ 3D FPS ❌ 手機體驗差 |
| 5 | **Slither.io** | https://slither.io | Canvas 2D, Node.js | 100M+ (peak) | Ads | ✅ 病毒式傳播 ❌ 技術簡單 |
| 6 | **PlayCanvas** | https://playcanvas.com | WebGL Engine | N/A (Engine) | SaaS B2B | ✅ 專業引擎 ❌ 唔係遊戲產品 |

### 市場趨勢
- HTML5 遊戲市場 2025 估值 $12.8B，年增長率 ~22% (Mordor Intelligence)
- WebGPU 標準成熟中，Three.js r175+ 已支援，效能大幅提升
- io-game (.io domain games) 品類仍然係最大 browser game 類型
- 3D browser game 技術門檻下降（React Three Fiber 生態成熟）

## 4. Market Gap

| Gap | 機會 |
|-----|------|
| 大部分 io-game 只有 2D | 3D + physics 係差異化机会 |
| 手機支持差 | Responsive 3D game = 競爭優勢 |
| 無品牌設計感 | MADHORSE 設計能力可以做出有質感嘅 game UI |
| 單人模式少 | 單人+多人混合 = 留存率更高 |

## 5. ROI Hypothesis

### 成本估算
| Item | Cost | Notes |
|------|------|-------|
| 開發 (CTO) | 內部資源 | ~40 工時 |
| 設計 (CDO) | 內部資源 | ~16 工時 |
| VPS 部署 | $0 增量 | 已有 Hostinger VPS |
| Domain | ~$12/年 | game.madhorse.cloud |
| **Total** | **~$12** | 純內部資源 |

### 收益估算
| 指標 | 預測 |
|------|------|
| Portfolio 展示價值 | 高 — 直接展示 real-time 3D 能力 |
| 技術 IP | 可重用 Three.js/WebSocket infra |
| 潛在廣告收入 (如開放) | $500-2000/月 @ 10K DAU |

### ROI Score: **82/100** ✅ (超過 60 門檻)
- 市場規模: 18/20 (HTML5 game $12.8B)
- 增長率: 18/20 (22%/年)
- 競爭程度: 15/20 (io-game 多但 3D 少)
- 技術可行性: 16/20 (React Three Fiber 成熟)
- 戰略價值: 15/20 (Portfolio + 技術展示)

## 6. Recommended Scope (MVP)

### 遊戲類型推薦：**3D Arena Shooter / Space Battle**
理由：
1. Three.js 最擅長嘅場景 (3D objects + physics)
2. io-game 驗證過嘅 gameplay loop
3. 視覺衝擊力強（粒子特效、爆炸、軌跡線）
4. 適合 2-4 人即時對戰

### MVP Features (P0)
- 3D 場景（太空/競技場主題）
- 玩家控制（WASD + mouse aim）
- 射擊 + 碰撞檢測
- 生命值 + 復活
- 2-4 人 real-time multiplayer (WebSocket)
- 計分板 + 遊戲結束畫面
- 手機觸控支持

### P1 (Post-MVP)
- 排行榜 (Leaderboard)
- 多種武器 / power-ups
- 自定義角色外觀
- 音效 + BGM

## 7. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebSocket 延遲 | 遊戲體驗差 | 用 Binary Protocol + 預測補償 |
| 3D 效能 | 低端設備跑唔到 | LOD (Level of Detail) + 動態降質 |
| 手機觸控精度 | 射擊體驗差 | 自動瞄準輔助 |
| 開發周期超時 | 影響其他項目 | 嚴格 MVP scope |

## 8. Success Criteria

| Metric | Target |
|--------|--------|
| FPS | ≥ 60fps @ 1080p (desktop), ≥ 30fps (mobile) |
| Latency | < 100ms p95 |
| Load Time | < 3s first paint |
| Onboarding | < 30s 新手開始玩 |
| Concurrent Players | Support 4 per room |

---

**COO 結論：** ROI 82/100，推薦執行。3D Arena 類型最適合展示技術實力。
**Gate 1→1.5：** ✅ PASS (ROI > 60)

`[PHASE_1_COMPLETE: 2026-04-01 14:10 HKT]`
