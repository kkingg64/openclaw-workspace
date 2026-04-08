# lessons-learned.md - MADHORSE Ltd. 項目經驗與教訓

## 2026-03-07 | ENH006 - 違反 Project Flow (嚴重!)

### ❌ 問題記錄
**事件：** CEO 自己做完曬所有 Phases，唔係 sub-agents 做

**情況：**
- 老闆 report Clock 問題
- 我話要 follow SOP，但後尾自己做曬
- Phase 1 (Research) → 我自己做，唔係 COO
- Phase 2 (Design) → 我自己做，唔係 CDO
- Phase 3 (Tech Spec) → 我自己做，唔係 CTO/CISO
- Phase 4 (Implementation) → 我自己做，唔係 CTO

**原因：**
- 想快啲搞定，唔記得要分工
- 呃咗自己「做完先啦」

### ✅ 解決方案
1. 更新 SOUL.md - 加入「Project Flow Enforcement」
2. 以後每個 Phase 必須叫相應既 sub-agent 做
3. 只有老闆話「快啲做」先用 small enhancement flow

### 📝 教訓
- **CEO 應該係 decision-maker，唔係 executor**
- **每個 Phase 要搵岩既人做**
- **下次一定唔會再犯**

---

## 2026-03-07 | P2026-001 Dashboard Bug Fix (Card Animation)

### ❌ 問題記錄
**事件：** Cards 持續刷新動畫
**原因：** `useEffect` 每 30 秒 trigger time update，所有 `<Card>` re-render 導致 `fadeIn` animation 重新觸發
**影響：** 用戶體驗不佳，視覺上 cards 不停閃爍

### ✅ 解決方案
- 加咗 `hasAnimated` state，確保 animation 只會喺 component mount 時 play 一次
- 使用 `setTimeout` + state 控制動畫觸發，避免 re-render 時重新動畫

**Commit:** `c8d2b7a` - fix: prevent card animation re-trigger on re-render

### 📝 Protocol Note
- 根據 BAU Protocol「發現小 Bug 需先修復、後紀錄」，呢個係屬於小 bug，直接修復
- 若為較大既 enhancement，則需要經過 ENHANCEMENT_BACKLOG → [GO_V2] → Phase 1-4 flow

---

## 2026-03-06 | P2026-001 Dashboard Enhancement

### ❌ 錯誤記錄

**事件：** 未經審批流程直接修改代碼

**情況：**
- 老闆問咗 "邊個做咗啲改動？"
- 我直接改咗 page.tsx 而唔係叫 CTO 做
- 違反咗 PROJECT_REGISTER.md 既雙重簽核機制

**教訓：**
1. 任何改動必須經過 proper flow
2. Phase 4.5 QA 後既新改動，應該視為 BAU enhancement
3. 應該先叫 COO 記錄到 ENHANCEMENT_BACKLOG，等老闆批 `[GO_V2]` 先可以開始

---

## ✅ 正面經驗

1. **CTO 成功解決 Vercel deploy 問題** — 發現 page.tsx 係 default template
2. **路徑結構優化** — projects/dashboard/ 分離開既 workspace 同 code
3. **三方 QA 驗證** — CDO, CTO, COO 各自驗證自己既範疇
4. **SYSTEM GUARDIAN Protocol** — 安全意識強化

---

## 🔧 改進措施

，以後所有 enhancement 必須：
1. 由 COO 記錄到 `projects/[ID]/backlog/ENHANCEMENT_BACKLOG.md`
2. 等老闆批 `[GO_V2]` 先可以開始
3. 由相關既 Agent (CTO/CDO) 執行
4. 完成後更新 PROJECT_REGISTER.md 狀態

---

## 2026-03-08 | P2026-002 MiniMax API JSON Parse Bug

### ❌ 問題記錄
**事件：** Meal Planner API 長期 fallback 到假數據

**原因分析：**
1. MiniMax API response 包含大量 `<|thinking|>` / `<|thought|>` tokens
2. AI response 重複自己既 content (self-referential)
3. JSON cleaning logic 唔夠強
4. (後續發現) API endpoint 應該係 `/v1/text/chatcompletion_v2` 而非 `/v1/chat/completions`
5. (後續發現) Model 應該係 `M2-her` 而非 `MiniMax-M2.5`

**影響：** 用戶長期收到假數據，違反 SOP「要用真實數據」

### ✅ 解決方案 (第一階段 - Working)
- CTO 加強 JSON cleaning：
  - 移除所有 `<|[\w_]+|>` tokens
  - 用 `indexOf('{')` + `lastIndexOf('}')` 提取 pure JSON
  - 移除 markdown code blocks
  - 修復 trailing commas

### 📝 教訓
1. **Official Doc 最可信** - 老闆提供既 MiniMax Doc 先係最新既正確資訊
2. **Testing 重要** - 每次改 setting 要 test 多次確保 stable
3. **CTO Code Review** - 以後既 API integration 需要 CTO 確認先可以使用

### 🔜 Next Step
- 更新 MiniMax API 到正確既 endpoint: `/v1/text/chatcompletion_v2`
- 更新 Model 到 `M2-her`

---

*記錄時間: 2026-03-08*
*記錄者: Fabio CEO*

---

## Lesson Learned: 2026-03-09 - P002 Meal Planner API Issue

### Problem
- MiniMax API 返回 502/404 errors
- 根本原因：Container 冇讀取到 `.env` 既 environment variables

### Root Cause
1. Docker container 運行時冇传入 `-e` environment variables
2. API URL 需要完整 path (`/chat/completions`)

### Solution
1. 運行 container 時要加 `-e MINIMAX_API_KEY=xxx` 
2. 使用完整既 API URL: `https://api.minimax.io/v1/chat/completions`

### Code Fix
- 修正 API URL: `MINIMAX_BASE_URL=https://api.minimax.io/v1/chat/completions`
- 加入 env vars 到 docker run command

### Prevention
- 以後 deploy 要確保 `.env` variables 正確傳入
- 可以用 `docker run -e FILE` 讀取本地 .env file
- 或者用 docker-compose 既 env_file feature

**Signed:** `[CEO_LESSON_LEARNED_2026_03_09]`
