# PHASE_GATE_CHECKLIST.md

> Operational checklist for advancing a project from one phase to the next. The verifier owns the gate, not the builder.

## Phase 0 -> Phase 1

- [ ] Project ID created in `PROJECT_REGISTER.md`
- [ ] Code path created under `projects/{PROJECT_ID}_{CodeName}/`
- [ ] Docs path created from `docs/PROJECT_TEMPLATE/`
- [ ] `PROJECT.json` completed
- [ ] `PHASE_STATUS.md` updated if boss approval is required
- [ ] Boss approval captured as `[BOSS_APPROVED]`

## Phase 1 -> Phase 1.5 (AI Advisor Q&A)

- [ ] Research doc exists and is non-empty
- [ ] Market demand, competitor analysis, and ROI logic are documented
- [ ] Scope is explicit: what is in / out
- [ ] Success criteria are measurable
- [ ] CEO approved the research direction

## Phase 1.5 -> Phase 2 (AI Advisor Discussion Gate)

> COO 主持，4 個 AI Advisor 角色進行兩輪討論，輸出結構化記錄。
> **Round 1：需求審查** — 發現需求盲點、邏輯漏洞、scope 問題。
> **Round 2：設計方向審議** — 確定 Design Style、UI Flow、Design System 選擇，令 CDO 開工前有明確方向。
> 目的：CDO 開始設計前已有完整 brief，唔需要猜測，唔需要來回改 spec。

### Round 1 — Requirements Advisory

- [ ] `Phase1_Research/{ID}_AI_Advisor_QA.md` exists and is non-empty
- [ ] All 4 Advisor roles completed (Business / Technical / Design / Security)
- [ ] Every Advisor Q&A has COO response recorded
- [ ] Unresolved items section exists (may be empty if all resolved)
- [ ] No unresolved items marked `CRITICAL` remain

### Round 2 — Design Direction Advisory

> **Design Advisor** 同 **Business Advisor** 主導，COO + CDO 共同參與。
> 輸出：CDO Design Brief，令 CDO 開始 Phase 2 前已有明確的設計方向。

**Design Style 討論必須涵蓋：**
- [ ] Design System 選擇已決定（shadcn/zinc / MADHORSE Brand / IBM Carbon / Primer / Geist / other）
- [ ] Light mode / Dark mode / Both 已決定
- [ ] Brand alignment 已確認（係咪 MADHORSE 品牌產品？還是 neutral SaaS？）
- [ ] Visual mood / tone 已定義（minimal / bold / enterprise / modern 等）
- [ ] Primary colour + accent 已指定或從 Design System 繼承

**UI Flow 討論必須涵蓋：**
- [ ] Screen inventory listed（每個 Screen 有名稱同目的）
- [ ] Navigation structure defined（sidebar / tabs / wizard / modal flow）
- [ ] User journey per persona documented（每個用戶群的主要路徑）
- [ ] Key interactions identified（唔需要細節，但知道有乜 CTA / action）
- [ ] Responsive breakpoints decided（Desktop only / Mobile required / Tablet required）

**Gate output：**
- [ ] `Phase1_Research/{ID}_CDO_Design_Brief.md` created — 包含 Design Style + UI Flow 摘要
- [ ] CDO acknowledged the brief（Design Brief 已送達 CDO）
- [ ] CEO reviewed and approved AI Advisor output + Design Brief

## Phase 2 -> MR-1

> **Builder ≠ Verifier 鐵律：CDO 係 builder，COO 係 design verifier，CTO 係 buildability reviewer。**
> **順序：CDO 交付 → COO QC → CTO ready check → 進入 MR-1。**

### CDO 交付物 (Builder)

- [ ] UI spec exists and covers ALL scoped Screens (`Phase2_Design/{ID}_UI_Spec.md`)
- [ ] UAT test cases exist (`Phase2_Design/{ID}_UAT_Test_Case.md`)
- [ ] Component spec exists (`Phase2_Design/{ID}_Component_Spec.md`)
- [ ] Accessibility checklist exists (`Phase2_Design/{ID}_Accessibility_Checklist.md`)
- [ ] Performance budget exists (`Phase2_Design/{ID}_Performance_Budget.md`)
- [ ] Analytics plan exists (`Phase2_Design/{ID}_Analytics_Plan.md`)
- [ ] Release checklist exists (`Phase2_Design/{ID}_Release_Checklist.md`)
- [ ] Asset inventory exists (`Phase2_Design/{ID}_Asset_Inventory.md`)
- [ ] Pencil CLI `.pen` file saved with all Screens built (non-empty, ≥ 40KB each)
- [ ] Design screenshots exported to `designs/exports/` (PNG, one per Screen per required breakpoint)
- [ ] CSS/Tailwind tokens documented in UI Spec (no placeholder tokens)
- [ ] UI Spec defines loading / empty / error / permission-denied states for all major views
- [ ] UI Spec defines component interaction states (default / hover / focus / active / disabled / error where applicable)
- [ ] Design artefacts do not contain placeholder text or TBD

### Phase 2 項目類型附加要求（按適用範圍）

**Website 項目：**
- [ ] SEO spec exists (`Phase2_Design/{ID}_SEO_Spec.md`)
- [ ] Content model exists (`Phase2_Design/{ID}_Content_Model.md`)
- [ ] Conversion tracking plan exists (`Phase2_Design/{ID}_Conversion_Tracking_Plan.md`)
- [ ] Core Web Vitals targets documented

**Dashboard 項目：**
- [ ] Data visualization spec exists (`Phase2_Design/{ID}_DataViz_Spec.md`)
- [ ] Role/permission matrix exists (`Phase2_Design/{ID}_Role_Permission_Matrix.md`)
- [ ] Filter/search/export spec exists (`Phase2_Design/{ID}_Filter_Search_Export_Spec.md`)

**2D / 3D 項目：**
- [ ] Gameplay spec exists (`Phase2_Design/{ID}_Gameplay_Spec.md`)
- [ ] Runtime budget exists (`Phase2_Design/{ID}_Runtime_Budget.md`)
- [ ] Asset manifest exists (`Phase2_Design/{ID}_Asset_Manifest.md`)
- [ ] Fallback strategy exists (`Phase2_Design/{ID}_Fallback_Strategy.md`)

### COO 設計 QC (Verifier — 必須唔係 CDO 本人)

- [ ] COO reviewed all PNG exports against `{ID}_CDO_Design_Brief.md`
- [ ] Every Screen is visually filled end-to-end (no large empty/blank areas)
- [ ] All UI sections specified in Design Brief are present and visible in PNG exports
- [ ] All scoped Screens have complete component HTML specs in UI Spec (唔只 Dashboard)
- [ ] Frontend Pack is complete for the project type (website / dashboard / 2D/3D)
- [ ] No placeholder copy / dummy data / lorem ipsum remains in any Phase 2 design artefact
- [ ] TypeScript `interface Props` defined for each component (或 CDO 獲 COO 豁免)
- [ ] COO issued sign-off: `[COO_DESIGN_QC_PASSED_{PROJECT_ID}_{DATE}_HKT]`

### CTO Readiness Check

- [ ] CTO confirmed Phase 2 artefacts are sufficient to assess buildability (COO QC 必須先 PASS)

## MR-1 -> Phase 3

- [ ] `skills/verification/MR1_template.md` executed
- [ ] Three independent model reviews captured
- [ ] Final verdict is `REVIEW_1_PASSED` or approved conditional with resolved evidence
- [ ] All BLOCK items are closed before Phase 3 begins

## Phase 3 -> Phase 4

- [ ] Technical spec exists under `Phase3_TechSpec/`
- [ ] File/module boundaries are defined
- [ ] Security assumptions and dependencies are documented
- [ ] Implementation plan exists and has task-by-task structure
- [ ] Plan reviewer output exists if a plan was generated
- [ ] CEO approved Phase 3 start

## Phase 4 -> Phase 4.5

- [ ] Git worktree used for implementation (or documented reason why not)
- [ ] Worktree directory verified as gitignored before creation
- [ ] Baseline tests passed in worktree before implementation started
- [ ] Failing tests were written first for behavior changes
- [ ] Each task passed two-stage review: spec compliance THEN code quality
- [ ] Fresh test output exists
- [ ] Bug/state log updated using the 6-step state model
- [ ] Independent code review completed
- [ ] No unresolved Critical or Important issues remain

## Phase 4.5 -> MR-2

- [ ] Deploy verification doc exists
- [ ] Commit hash / build ID is recorded
- [ ] Production endpoint checks show fresh success evidence
- [ ] Rollback procedure is recorded and tested or rehearsed
- [ ] Anti-dummy scan is clean
- [ ] CISO verified production state

## MR-2 -> Phase 5

- [ ] `skills/verification/MR2_template.md` executed
- [ ] Three independent model reviews captured
- [ ] Final verdict is `REVIEW_2_PASSED` or approved conditional with resolved evidence
- [ ] Security blockers are closed

## Phase 5 -> Phase 6

- [ ] UAT test result doc exists
- [ ] Every UAT case has a pass/fail result
- [ ] Penpot design screenshots (baseline) exist in `designs/`
- [ ] Production screenshots exist in `designs/uat_screenshots/`
- [ ] Each key screen has design-vs-production comparison evidence
- [ ] COO or business verifier accepted readiness
- [ ] CEO approved closeout

## Phase 6 -> BAU

- [ ] Closeout doc exists
- [ ] `lessons-learned.md` updated
- [ ] BAU owner is assigned
- [ ] Deployment target and monitoring path are documented
- [ ] `PROJECT_REGISTER.md` updated to final status

## Gate Rejection Rules

Do not advance if any of the following are true:

- Required artefacts are missing or empty
- Placeholder text such as `TBD`, `TODO`, or lorem ipsum remains
- Verification evidence is stale or indirect
- The builder is also acting as verifier
- Status in docs does not match actual system state