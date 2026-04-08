# Phase 1 - Research

Create these files here:

- `{PROJECT_ID}_Research.md` — COO 主寫
- `{PROJECT_ID}_Requirements.md` — COO 主寫
- `{PROJECT_ID}_AI_Advisor_QA.md` — Phase 1.5 AI Advisor Discussion 記錄
- `{PROJECT_ID}_CDO_Design_Brief.md` — CDO 設計指引

Minimum contents for `{PROJECT_ID}_Research.md`:

- problem framing
- target user and pain points
- competitor analysis (min 3 competitors, real sources with URLs)
- market gap
- ROI hypothesis
- recommended scope
- risk assessment
- success criteria (measurable)

Minimum contents for `{PROJECT_ID}_Requirements.md`:

- functional requirements table (P0/P1/P2 priority)
- non-functional requirements
- scope boundary (in/out)
- tech stack recommendation
- AI Advisor Amendments section (after Phase 1.5)

---

## Phase 1.5 — AI Advisor Discussion

> **必須完成 Phase 1.5 先可以進入 Phase 2。**
> COO 主持，CEO 從旁協助。

**Round 1 — Requirements Advisory**

呼召 4 個 AI 角色審查 Requirements：
- Business Advisor (GPT-5.4) — 商業可行性
- Technical Advisor (Claude Sonnet 4.6) — 架構風險
- Design Advisor (Gemini) — 用戶體驗
- Security Advisor (GPT-4o) — 安全合規

**Round 2 — Design Direction Advisory**

一同討論以下決策：
- Design System 選擇 (shadcn / MADHORSE / Carbon / Geist)
- Visual Style (Dark/Light, brand tone, colour direction)
- Screen Inventory (需要哪些頁面)
- Navigation Structure (sidebar / tabs / wizard)
- User Journey (每個 persona 的主要路徑)
- Responsive Requirements (Desktop/Tablet/Mobile)

**會議 Minutes 要求：**
- COO 整理 Minutes 入 `{PROJECT_ID}_AI_Advisor_QA.md`
- send_message to CEO → CEO 小 Boss 匯報 Minutes
- Boss 確認設計方向 → CDO 收到 Design Brief 才開始 Phase 2

---

Exit gate:

- [ ] CEO approved Phase 1 Research + Requirements
- [ ] Phase 1.5 Round 1 + Round 2 完成
- [ ] `{PROJECT_ID}_AI_Advisor_QA.md` 含 Meeting Minutes
- [ ] `{PROJECT_ID}_CDO_Design_Brief.md` 已投遅給 CDO
- [ ] Boss 確認設計方向