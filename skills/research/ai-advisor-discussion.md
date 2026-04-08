# Phase 1.5 — AI Advisor Discussion

> COO 主持，每個項目 Phase 1 批准後強制執行。
> 目的：多模型視角發現需求盲點，確立設計方向，再交 CDO。

## Round 1 — Requirements Advisory

**觸發：** CEO 批准 Phase 1 後，COO 立即召集

1. 準備：{ID}_Research.md + {ID}_Requirements.md
2. 召集 3 個 AI 角色逐一回應（**必須用 tool call，唔可以虛構**）：
   - **Business Advisor（GPT-4.1）**：`copilot_reviewer(review_type="strategy")` → 商業可行性、market-fit、ROI 風險
   - **Technical Advisor（GPT-4.1）**：`copilot_reviewer(review_type="strategy")` → 架構可行性、技術債、整合難度
   - **Design Advisor（Gemini 2.5 Flash）**：`gemini_advisor` → 用戶體驗、信息架構、accessibility
   - **Security Advisor（o4-mini）**：`copilot_reviewer(review_type="security_review")` → 數據安全、合規、攻擊面
3. COO 整理每個 advisor 意見 → 決定哪些建議納入 Requirements
4. 更新 {ID}_Requirements.md（加入 "AI Advisor Amendments" 章節）

**⛔ Tool Call 驗證規則（v10.1 新增）：**
- 每個 advisor 意見**必須**來自真實 tool call（`copilot_reviewer(strategy)` / `gemini_advisor` / `copilot_reviewer(security_review)`）
- `{ID}_AI_Advisor_QA.md` 每個 advisor section 必須註明：`[Source: {tool_name}({review_type}) called at {timestamp}]`
- CEO 驗收時會 grep `[Source:` 行，少於 4 個 = **Phase 1.5 Gate FAIL**
- 冇可用嘅 model → 記錄 `[Source: {tool_name} UNAVAILABLE — fallback to manual analysis]`，但至少 2/4 必須係真實 tool call

**Advisor 使用原則（v10.3 新增）：**
- **唔需要 fail 先問** — 任何 Agent 對任何決定唔係 100% 確定，立即用 advisor
- 呼叫 `gemini_advisor`（Gemini 2.5 Flash）、`copilot_reviewer`（GPT-4.1 strategy / o4-mini security）
- 何時問、採納後如何入文件 → 見 `skills/shared/advisor-integration.md`
- 唔需要等失敗先問，**主動諮詢 > 之後返工**

**輸出：** `{ID}_AI_Advisor_QA.md`（存入 Phase1_Research/）

## Round 2 — Design Direction Advisory

1. 將 {ID}_Requirements.md（更新版）貼入討論
2. 逐一討論設計決策（3 model 各表意見）：
   ① Design System 選擇：shadcn / MADHORSE / IBM Carbon / Geist？
   ② Visual Style：Dark/Light mode？Brand tone？
   ③ Screen Inventory：需要哪些頁面？
   ④ Navigation Structure：sidebar / tabs / wizard？
   ⑤ User Journey：每個 persona 嘅主要操作路徑
   ⑥ Responsive：Desktop only？Mobile required？

**輸出：** `{ID}_CDO_Design_Brief.md`（存入 Phase1_Research/）

### CDO Design Brief 格式
```markdown
## Design System Decision
推薦：[A/B/C/D/E] — [原因]
## Visual Style
Mode：Dark / Light | Brand Tone：[描述]
## Screen Inventory
| # | Screen Name | 目的 | 用戶 |
## Navigation Structure
[sidebar / tabs / etc. + 原因]
## Responsive Requirements
Desktop 1440px：✅ | Tablet 768px：[✅/❌] | Mobile 390px：[✅/❌]
```

## Meeting Minutes — 向 Boss 報告（強制）

```
Step 1: COO 整理 Meeting Minutes（附入 {ID}_AI_Advisor_QA.md 末段）
Step 2: send_message to CEO → 「Phase 1.5 完成，附 Minutes + Design Brief」
Step 3: CEO 審閱 → 向 Boss 報告 → 等待 Boss 確認
Step 4: Boss 確認後 → CEO 通知 CDO 開始 Phase 2
```
