# Phase 2 - Design

**INPUT required (before starting):**
- `{PROJECT_ID}_CDO_Design_Brief.md` — 必須存在於 Phase1_Research/
- Boss 已確認設計方向

Create these files here:

- `{PROJECT_ID}_UI_Spec.md` — CDO 屏幕規格 + CSS tokens
- `{PROJECT_ID}_UAT_Test_Case.md` — CDO 準備的 UAT test cases
- `{PROJECT_ID}_Component_Spec.md` — component variants / states / usage rules
- `{PROJECT_ID}_Accessibility_Checklist.md` — WCAG AA / keyboard / focus / ARIA
- `{PROJECT_ID}_Performance_Budget.md` — Core Web Vitals 或 runtime budget
- `{PROJECT_ID}_Analytics_Plan.md` — page view / CTA / telemetry plan
- `{PROJECT_ID}_Release_Checklist.md` — pre-launch / launch / rollback
- `{PROJECT_ID}_Asset_Inventory.md` — fonts / images / icons / audio / 3D assets / license
- `{PROJECT_ID}_MultiModel_Review_1.md` — MR-1 完成後由 CTO 輸出

Depending on project type, also create:

- Website: `{PROJECT_ID}_SEO_Spec.md`, `{PROJECT_ID}_Content_Model.md`, `{PROJECT_ID}_Conversion_Tracking_Plan.md`
- Dashboard: `{PROJECT_ID}_DataViz_Spec.md`, `{PROJECT_ID}_Role_Permission_Matrix.md`, `{PROJECT_ID}_Filter_Search_Export_Spec.md`
- 2D/3D: `{PROJECT_ID}_Gameplay_Spec.md`, `{PROJECT_ID}_Runtime_Budget.md`, `{PROJECT_ID}_Asset_Manifest.md`, `{PROJECT_ID}_Fallback_Strategy.md`

Visual exports:

- 存入 `../../designs/exports/` (不是 figma/)
- 命名格式：`{PROJECT_ID}_{ScreenName}_{Breakpoint}.png`
- 例：`P2026-001_Dashboard_Desktop.png`, `P2026-001_Dashboard_Mobile.png`

Minimum contents for `{PROJECT_ID}_UI_Spec.md`:

- design system used (with token reference)
- user flows (screen-level)
- screen-level behaviour (each screen section)
- component state matrix (button/input/card: default/hover/disabled/error)
- CSS tokens table
- responsive breakpoints
- loading / empty / error / permission states for each major view
- API/UI dependency notes and null/fallback behaviour

Minimum contents for `{PROJECT_ID}_UAT_Test_Case.md`:

- test cases per screen (min 1 per screen)
- expected vs actual columns
- P0/P1/P2 priority
- visual baseline PNG reference per TC

Minimum contents for supporting Frontend Pack files:

- `Component_Spec.md` - variants, states, usage rules, responsive notes
- `Accessibility_Checklist.md` - WCAG AA checklist, focus order, keyboard flow, ARIA notes
- `Performance_Budget.md` - budget table + measurement method + device/browser assumptions
- `Analytics_Plan.md` - event name, trigger, payload, owner
- `Release_Checklist.md` - pre-launch, launch-day, rollback tasks
- `Asset_Inventory.md` - filename/asset type/source/license/owner

Minimum contents for `{PROJECT_ID}_MultiModel_Review_1.md`:

```
## {ID} MR-1 — Multi-Model Design Review
| 模型 | 角色 | 結論 | 主要意見 |
|------|------|------|------|
| Claude Sonnet 4.6 | Technical Reviewer | PASS/FAIL | ... |
| GPT-5.4 | UX Strategy Reviewer | PASS/FAIL | ... |
| Gemini | Design Quality Reviewer | PASS/FAIL | ... |
整體結論：[PASS/FAIL] (2/3 通過 = PASS)
```

Exit gate:

- [ ] CDO Design Brief 已讀取確認
- [ ] 所有 Screen PNG exports 存入 designs/exports/
- [ ] CEO 驗收 UI output 並屏幕截圖發給 Boss
- [ ] MR-1 通過 (2/3 PASS)
- [ ] CTO Buildability Review PASS
- Phase 3 technical spec may begin