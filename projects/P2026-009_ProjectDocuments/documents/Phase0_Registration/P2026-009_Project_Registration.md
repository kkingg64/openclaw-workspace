# P2026-009 Project Registration

**Date:** 2026-04-01 14:00 HKT
**Owner:** CEO
**Status:** REGISTERED

---

## 1. Business Problem

遊戲行業 Web-based gaming 增長迅速（Krunker.io, Agar.io 等證明 browser game 市場龐大）。
MADHORSE 需要一個能展示技術實力嘅旗艦遊戲產品，同時作為公司 portfolio 同技術 showcase。

## 2. Scope

**In scope:**
- 2D/3D browser-based 遊戲（Web 技術，唔需要下載）
- 單人模式 + 多人即時對戰 (2-4 players)
- 排行榜系統
- 移動端響應式支持
- 音效 + 視覺特效

**Out of scope:**
- Native app (iOS/Android)
- VR/AR 支持
- 微交易/付費系統（Phase 1 唔考慮）
- 用戶帳號系統（MVP 用 session-based）

## 3. OKRs

| Objective | Key Result | Target |
|-----------|------------|--------|
| 打造流暢嘅 browser game | 60fps @ 1080p on mid-range device | 穩定 60fps |
| 即時多人對戰 | WebSocket 延遲 < 100ms | < 100ms p95 |
| 展示技術實力 | 具備 3D 場景渲染 | Three.js / R3F |
| 用戶體驗 | 新手 30 秒內可以開始玩 | < 30s onboarding |

## 4. Roles

| Role | Owner | Verifier |
|------|-------|----------|
| Research (Phase 1) | COO | CDO |
| Design (Phase 2) | CDO | CTO |
| Tech Spec (Phase 3) | CTO | CISO |
| Implementation (Phase 4) | CTO | CISO |
| UAT (Phase 5) | CDO+CTO | COO |

## 5. Paths

- Code: `projects/P2026-009_GameArena/`
- Docs: `projects/P2026-009_ProjectDocuments/`

## 6. Approval

- [x] `PROJECT_REGISTER.md` updated
- [x] `PROJECT.json` filled
- [x] Boss approval: `[BOSS_APPROVED_2026-04-01_1400_HKT]`
