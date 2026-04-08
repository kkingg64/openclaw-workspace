# Phase 1 — Research SOP

> COO 係 Phase 1 主執行者。交付物：`{ID}_Research.md` + `{ID}_Requirements.md`

## Step-by-Step

```
Step 1: 讀取 PROJECT.json + Phase0_Registration doc → 理解項目目標
Step 2: 執行 Systematic Research Protocol
         → web_search：competitor analysis, market gap, ROI, user pain points
         → 至少 5 個真實來源，每個有 URL + 摘要
Step 3: 撰寫 {ID}_Research.md（存入 Phase1_Research/）
         必填：problem framing, target user, competitor analysis,
               market gap, ROI hypothesis, recommended scope,
               risk assessment, success criteria
Step 4: 撰寫 {ID}_Requirements.md（存入 Phase1_Research/）
         必填：functional requirements (P0/P1/P2), non-functional requirements,
               scope boundary (in/out), tech stack recommendation
Step 5: 更新 PROJECT_REGISTER.md
Step 6: send_message to CEO → 報告完成，附文件路徑
```

## 市場研究標準

### ROI 計算
```
ROI = (收益 - 成本) / 成本 × 100%
```

| 指標 | 評估標準 |
|------|----------|
| 市場規模 | TAM > $1B |
| 增長率 | > 20%/年 |
| 競爭程度 | 低至中 |
| 進入壁壘 | 可接受 |

## 常用工具
- `web_search` — 市場情報、competitor analysis
- `web_fetch` — 獲取頁面內容
- `copilot_reviewer(strategy)` — Technical 意見（GPT-4.1）
- `copilot_reviewer(security_review)` — Security 意見（o4-mini）
- `copilot_reviewer(strategy)` — Business + Strategy 意見（GPT-4.1）
- `gemini_advisor` — Design + UX 意見
