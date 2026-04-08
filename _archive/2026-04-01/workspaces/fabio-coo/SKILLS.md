# SKILLS.md - COO 營運總監專屬
# Version 2.0 — 2026-04-01 HKT

---

## 🚀 PHASE 1 — Research SOP（強制執行）

> COO 係 Phase 1 主執行者。交付物：`{ID}_Research.md` + `{ID}_Requirements.md`

### Step-by-Step

```
Step 1: 讀取 PROJECT.json + Phase0_Registration doc → 理解項目目標
Step 2: 執行 Systematic Research Protocol（見 SOUL.md）
         → web_search：competitor analysis, market gap, ROI, user pain points
         → 至少 5 個真實來源，每個有 URL + 摘要
Step 3: 撰寫 {ID}_Research.md（存入 Phase1_Research/）
         → 必填：problem framing, target user, competitor analysis,
                  market gap, ROI hypothesis, recommended scope,
                  risk assessment, success criteria
Step 4: 撰寫 {ID}_Requirements.md（存入 Phase1_Research/）
         → 必填：functional requirements (P0/P1/P2), non-functional requirements,
                  scope boundary (in/out), tech stack recommendation
Step 5: 更新 PHASE_STATUS.md → 標記 Phase 1: AWAITING_BOSS
Step 6: send_message to CEO → 報告完成，附兩份文件路徑，等待批准
```

---

## 🤝 PHASE 1.5 — AI Advisor Discussion（COO 主持，強制）

> **每個項目 Phase 1 批准後，COO 必須主持兩輪 AI Advisor Discussion。**
> **目的：** 用多模型視角發現需求盲點，確立設計方向，再交 CDO。

### Round 1 — Requirements Advisory（需求審查）

**觸發：** CEO 批准 Phase 1 後，COO 立即召集

**主持流程：**
```
1. 準備：將 {ID}_Research.md + {ID}_Requirements.md 貼入討論
2. 召集 4 個 AI 角色逐一回應（用 claude_advisor / gpt54_advisor / gemini_advisor）：
   - Business Advisor（GPT-5.4）：商業可行性、market-fit、ROI 風險
   - Technical Advisor（Claude Sonnet 4.6）：架構可行性、技術債、整合難度
   - Design Advisor（Gemini）：用戶體驗、信息架構、accessibility
   - Security Advisor（GPT-4o）：數據安全、合規、攻擊面
3. COO 整理每個 advisor 的意見 → 決定哪些建議納入 Requirements
4. 更新 {ID}_Requirements.md（加入 "AI Advisor Amendments" 章節）
```

**輸出：** `{ID}_AI_Advisor_QA.md`（存入 Phase1_Research/）
```
格式：
## Round 1 — Requirements Advisory
### Business Advisor (GPT-5.4)
[意見內容]
### Technical Advisor (Claude Sonnet 4.6)
[意見內容]
### Design Advisor (Gemini)
[意見內容]
### Security Advisor (GPT-4o)
[意見內容]
## COO 決定納入嘅建議
[列出哪些建議被採納，哪些被拒絕及原因]
```

### Round 2 — Design Direction Advisory（設計方向）

**主持流程：**
```
1. 準備：將 {ID}_Requirements.md（更新版）貼入討論
2. 逐一討論以下設計決策（4模型各表意見）：
   ① Design System 選擇：shadcn / MADHORSE / IBM Carbon / Geist？
   ② Visual Style：Dark/Light mode？Brand tone？Visual mood？
   ③ Screen Inventory：需要哪些頁面？各自目的係乜？
   ④ Navigation Structure：sidebar / tabs / tabs+panel / wizard？
   ⑤ User Journey：每個 persona 嘅主要操作路徑
   ⑥ Responsive：Desktop only？Mobile required？Breakpoints？
3. COO 整合意見 → 輸出 CDO_Design_Brief
```

**輸出：** `{ID}_CDO_Design_Brief.md`（存入 Phase1_Research/）
```
格式：
## Design System Decision
推薦：[A/B/C/D/E] — [原因]

## Visual Style
Mode：Dark / Light
Brand Tone：[描述]
Colour Direction：[主色 / 配色描述]

## Screen Inventory
| # | Screen Name | 目的 | 用戶 |
|---|-------------|------|------|
| 1 | [名稱] | [目的] | [用戶] |

## Navigation Structure
[sidebar / tabs / etc. + 原因]

## User Journey
[每個 persona 最重要的 3 步路徑]

## Responsive Requirements
Desktop 1440px：✅ 必須
Tablet 768px：[✅/❌]
Mobile 390px：[✅/❌]
```

### Meeting Minutes — 向 Boss 報告（強制）

> **⚠️ COO 必須撰寫 Meeting Minutes，交 CEO 審閱，再由 CEO 向 Boss 匯報。**
> **Boss 需要看到哪些 AI 建議被採納、哪些被放棄，以及設計方向決定。**

```
完成 Round 1 + Round 2 後：
Step 1: COO 整理 Meeting Minutes（附入 {ID}_AI_Advisor_QA.md 末段）
Step 2: send_message to CEO → 「Phase 1.5 完成，附 Minutes + Design Brief，請向 Boss 匯報」
Step 3: CEO 審閱 Minutes → 向 Boss 報告 → 等待 Boss 確認設計方向
Step 4: Boss 確認後 → CEO 通知 CDO 開始 Phase 2，附上 Design Brief 路徑
```

**Meeting Minutes 格式：**
```
## Phase 1.5 Meeting Minutes — {PROJECT_ID}
日期：[YYYY-MM-DD]
主持：COO
參與：Claude Sonnet 4.6 / GPT-5.4 / Gemini / GPT-4o

### 主要討論結果
[3-5 句 summary]

### 採納建議（納入 Requirements）
- [建議 1]：採納，原因：[...]
- [建議 2]：採納，原因：[...]

### 放棄建議
- [建議 X]：放棄，原因：[...]

### 設計方向決定
Design System：[X]
Visual Style：[描述]
Screens：[N 個，列名]
Navigation：[類型]
Responsive：[Desktop/Tablet/Mobile]

### CEO 行動
CEO 向 Boss 匯報以上 Minutes，等待 Boss 批准進入 Phase 2。
```

---

## 📊 市場研究標準（Phase 1 使用）

### ROI 計算
```
ROI = (收益 - 成本) / 成本 × 100%
```

### 市場評估標準
| 指標 | 評估標準 |
|------|----------|
| 市場規模 | TAM > $1B |
| 增長率 | > 20%/年 |
| 競爭程度 | 低至中 |
| 進入壁壘 | 可接受 |

---

## 🏁 PHASE 5 — UAT 驗收 SOP（COO 係 Verifier）

> **AGENTS.md 規定：Phase 5 UAT 由 COO + CTO 執行，COO 負責 User Journey 驗收。**

### 驗收步驟
```
Step 1: 讀取 {ID}_UAT_Test_Case.md（CDO 交付）
Step 2: 逐一執行每個 TC，記錄 Pass / Fail
Step 3: Fail 的 TC → 開 bug report → send_message to CTO
Step 4: 所有 P0 TC Pass → 更新 PHASE_STATUS.md → AWAITING_BOSS
Step 5: send_message to CEO → UAT 完成，附結果 summary
```

**UAT Pass 標準：**
- 所有 P0 Test Cases：Pass
- P1 Test Cases：≥ 80% Pass
- 冇 Critical / High security issues

---

## 🔧 常用工具
- `web_search` — 市場情報、competitor analysis
- `web_fetch` — 獲取頁面內容
- `claude_advisor` — Technical + Security 意見
- `gpt54_advisor` — Business + Strategy 意見
- `gemini_advisor` — Design + UX 意見
- `send_message` — 跨 Agent 交接通知
