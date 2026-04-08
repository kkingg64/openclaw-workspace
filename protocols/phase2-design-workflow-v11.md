# Phase 2 → Phase 3 Design Workflow Protocol (v11.9)

> **Purpose:** CDO workflow for design outputs before MR-1 model review
> **Version:** v11.9  
> **Date:** 2026-04-03  
> **Gate:** Phase 2→MR1 approval (CDO submits, Design outputs must pass quality gate)
> **Referenced from:** `protocols/phase-gates.md` → Protocol Quick Reference → Phase 2 (Design)
> **Next Step:** `protocols/model-review.md` (v11.6) → MR-1 gate review by 3 models
> **Supersedes:** phase-gates.md Phase 2 section  
> **Status:** ✅ APPROVED — 2026-04-03 by Boss (猫 @kasturn)  
> **Changelog:** v11.8 → v11.9 — Added mobile responsive checks for top bar, avatar, menu button

---

## Overview

This protocol defines the complete Phase 2 → Phase 3 workflow for MADHORSE Ltd. design deliverables. It is **shadcn Design-First** — Pencil CLI and Penpot PNG exports are deprecated. The source of truth is shadcn components + tokens.

**Pencil CLI status:** DEPRECATED (2026-04-03)  
**Primary design tool:** shadcn/ui components + madhorse-cdo.json tokens  
**Design preview:** Theme_Preview.html (browser-renderable HTML)

---

## Glossary

| Term | Definition |
|------|-----------|
| **COO QC** | Chief Operating Officer Quality Check |
| **MR-1** | Multi-Model Review (Phase Gate 2→3) |
| **Design Complete Minimum Bar** | CDO self-certification checklist before handoff |
| **Handoff Signal** | Formal document CDO sends to COO to trigger QC |
| **Soft Cap** | Escalation trigger at N attempts. Not a hard stop. |
| **Borderline Review** | CTO can approve 85-89 score with documented rationale |
| **Version Bump** | Patch (v1.0→v1.1), Minor (v1.x→v1.y), Major (v2.0) |
| **Scope Rewind** | Boss REJECT forces return to Step ② (COO QC) |
| **4 States** | Interactive elements: default, hover, active, disabled |
| **Token** | CSS variable from madhorse-cdo.json (HSL format) |
| **Cross-Examination** | Q&A dialogue. 3 Q&A pairs = 3 questions AND 3 answers, per gate. "Looks good" is insufficient. |
| **SLA** | Expected time-to-completion per gate (business hours) |
| **CEO Duty** | CDO 完成後，CEO 必須主動 spawn 下一步 agent，確保流程唔會停滯 |
| **Theme Preview** | Browser-renderable HTML showing tokens applied. Not production code — for visual approval only. |
| **CTO Blueprint** | Component_Inventory + Interaction_Spec + UI_Spec. Source of truth for Phase 3 development. |

---

## Complete Workflow

```
CDO Design Complete
    │
    ▼
【CEO DUTY】CDO 完成後，CEO 必須主動 spawn 下一步 agent（COO）繼續流程
    │
    ▼
① CDO 內部自檢 (CDO)
   CDO self-certifies Design Complete Minimum Bar
   │
    ▼
② CDO→COO Handoff
   CDO creates Handoff_Signal.md
   COO acknowledges → starts COO SLA clock
    │
    ▼
③ COO QC Check (COO)           ← SLA: 4h, soft cap 5 → CEO notification
   [PASS/FAIL + Meeting Minutes]
   FAIL → CDO fix → back to COO
   PASS →
    │
    ▼
④ Design Submission Checklist   ← SLA: 2h, soft cap 5
   [PASS/FAIL + Meeting Minutes]
   FAIL → CDO fix → recheck
   PASS →
    │
    ▼
⑤ MR-1 Multi-Model Review      ← CTO-led, SLA: 4h/model, soft cap 5/model
   [GPT-4.1 + Gemini 2.5 + o4-mini]
   Each model: ≥90 PASS | 85-89 Borderline Review | <85 FAIL
   Any FAIL → CDO fix → that model only
   All ≥90 or Borderline Review →
    │
    ▼
⑥ CEO Final Review             ← SLA: 2h, max 3 attempts → 4th = Boss
   [APPROVE/REJECT + Meeting Minutes]
   REJECT → CDO fix → back to COO
   4th REJECT → Boss resolves
   APPROVE →
    │
    ▼
⑦ Boss Preview                  ← SLA: 4h, no attempt limit
   CDO provides Theme_Preview.html for Boss visual review
   [APPROVE/REJECT + Meeting Minutes]
   Scope: visual/aesthetic only (see Section 8)
   REJECT → Scope Rewind → back to Step ②
   APPROVE → CDO archives Theme_Preview.html
    │
    ▼
→ Phase 3 Technical Spec
   Design deliverables (Component_Inventory, Interaction_Spec, UI_Spec) → CTO Blueprint
   Theme_Preview.html → Retained for reference (not production code)
   Phase 2 scaffold/demo code → CTO decides reuse or discard
```

---

## Step ①: CDO 內部自檢

### Design Complete Minimum Bar

CDO must self-certify ALL items before creating Handoff Signal:

```
□ 所有 10 份 Phase 2 文件已起草（見 Step ④ 清單）
□ Component_Inventory.md: 每個 component 有完整 4 states
□ Interaction_Spec.md: 每個 interactive element 有 4 states matrix
□ UI_Spec.md: layout 完整 + 所有 tokens 已映射至 madhorse-cdo.json
□ Theme_Preview.html: 在瀏覽器可正常開啟顯示 + mobile responsive（viewport ≤768px）
□ Top bar: hamburger menu + 導航 items responsive
□ Avatar + menu button: 在 mobile viewport 內唔超出 frame
□ UAT_Test_Cases.md: 覆盖所有 Phase 1 user flows
□ Accessibility_Checklist.md: 所有 WCAG 2.1 AA 項目已檢查
□ Performance_Budget.md: 數字符合 measurable 标准（見 Step ③）
□ spell-check 已通過（typos tool，見 Step ③）
□ 冇已知 blocking issues（定義：任何prevent CTO進入 Phase 3的問題）
```

**Version:** Each doc starts at v1.0

**Blocking Issue Definition:** Any issue that would prevent CTO from starting Phase 3 implementation. Examples: missing Component_Inventory, incomplete Interaction_Spec, tokens not mapped.

---

## Step ②: CDO→COO Handoff Protocol

### Handoff Signal File Location

**All Phase 2 documents reside in:**
```
projects/{ID}_ProjectDocuments/documents/Phase2_Design/
```

CDO creates:
```
projects/{ID}_ProjectDocuments/documents/Phase2_Design/{ID}_CDO_Handoff_Signal.md
```

### Handoff Signal Content Template

```markdown
# {ID} CDO Handoff Signal

**Project:** {ID}
**Date:** YYYY-MM-DD HH:MM HKT
**CDO:** [name]
**Version:** v1.0

## Submission Summary

| Document | Version | Word Count | Status |
|----------|---------|------------|--------|
| Component_Inventory.md | v1.0 | 250 | ✅ |
| Interaction_Spec.md | v1.0 | 180 | ✅ |
| UI_Spec.md | v1.0 | 400 | ✅ |
| Accessibility_Checklist.md | v1.0 | 120 | ✅ |
| Performance_Budget.md | v1.0 | 80 | ✅ |
| Analytics_Plan.md | v1.0 | 150 | ✅ |
| Release_Checklist.md | v1.0 | 130 | ✅ |
| Asset_Inventory.md | v1.0 | 100 | ✅ |
| Theme_Preview.html | v1.0 | N/A | ✅ |
| UAT_Test_Cases.md | v1.0 | 300 | ✅ |

## Known Issues

[None / List known limitations with severity: BLOCKING|MINOR|TRIVIAL]

## Self-Cert Sign-off

CDO confirms Design Complete Minimum Bar passed: YES

**CDO Signature:** [FABIO_CDO_SIGNED_YYYY-MM-DD]
```

### COO Acknowledgment

Within **1 hour** of receiving Handoff Signal, COO replies:

```
□ Handoff Signal received
□ Clock starts: YYYY-MM-DD HH:MM HKT
□ SLA: QC complete within 4 business hours
□ Project: {ID}
```

**If COO does not acknowledge within 1 hour, CDO escalates to CEO.**

---

## Step ③: COO QC Check

### COO QC Checklist

```
□ Phase 1 Requirements reference: documents/Phase1_Research/{ID}_Requirements.md exists
□ 功能完整: 所有 Phase 1 requirements 有對應 component
□ 介面佈局: Layout 符合 4 breakpoints + spacing tokens
□ Component states: 每個 interactive element 有 4 states (default/hover/active/disabled)
□ Token 應用: 所有 colors/fonts/radius 來自 madhorse-cdo.json
□ spell-check: typos --format=compact passed (zero CRITICAL errors)
□ Theme_Preview.html: tokens 應用正確，瀏覽器顯示符合預期
□ Performance Budget: 數字符合 measurable 标准（LCP <2.5s, TTI <3.8s, CLS <0.1, Bundle <250KB gzipped — 見 Step ③）
```

### Spell-Check Requirement (MANDATORY)

CDO must run AND CDO must verify before COO QC:

```bash
typos --format=compact projects/{ID}_ProjectDocuments/documents/Phase2_Design/**/*.md
```

**Result standard:**
- Zero CRITICAL errors = PASS
- ≤3 minor typos acceptable with list in Handoff Signal
- >3 minor OR any CRITICAL = FAIL

### Performance Budget (Measurable)

All numbers must meet:

| Metric | Target | Tool |
|--------|--------|------|
| LCP | <2.5s | Lighthouse on 4G |
| TTI | <3.8s | Lighthouse on 4G |
| CLS | <0.1 | Lighthouse on 4G |
| Bundle Size (initial) | <250KB gzipped | webpack build |
| Time to Interactive | <4s | Lighthouse on 4G |

### SLA & Escalation Rules

| Metric | Value |
|--------|-------|
| **SLA** | 4 business hours from COO acknowledgment |
| **Soft Cap** | 5 attempts |
| **Escalation at 5** | CEO gets automatic notification |
| **At 7 attempts** | CEO mandatory review (not optional) |

**Note:** COO QC has no hard attempt limit. "Unlimited attempts" with soft cap escalation. This is intentional — quality gates should not be artificially capped. CEO escalation notifies human oversight at reasonable threshold.

### Meeting Minutes Template (COO QC)

**Format (v11.2 standardized):** `projects/{ID}_ProjectDocuments/documents/meeting-minutes/{ID}_MM_Gate-2-MR1_{YYYY-MM-DD}.md`

> Note: COO QC is a sub-step of the 2→MR1 Gate. Use unified Gate-based naming (see `protocols/gate-naming-map.md` for full mapping).

Must contain:
1. **Header:** Project, Gate, Date, Attendees
2. **Decision:** PASS / FAIL
3. **Cross-Examination (Q&A):** Minimum 3 Q&A pairs
   - Example: Q: "Why does Button component only have 2 states?" A: "Toggle buttons use 2 states by spec. Regular buttons use 4."
4. **Issues Found:** Specific, with file:line references
5. **CDO Response:** How each issue was addressed
6. **Action Items:** Owner + deadline
7. **Next Step:** Explicit

---

## Step ④: Design Submission Checklist (Quality Gate)

### Checklist Items

```
□ 10 份文件全部存在於 projects/{ID}_ProjectDocuments/documents/Phase2_Design/
□ 每份文件有:
    □ 標題
    □ 版本號 (vX.X)
    □ 內容 ≥100 words（每份文件）
□ 所有 tokens 映射至 madhorse-cdo.json (有表格記錄)
□ Theme_Preview.html: 瀏覽器正常顯示，tokens 正確渲染
□ Version consistency: 所有文件同版本 vX.X
□ CDO Handoff Signal v1.X + COO acknowledgment 存在
□ Performance Budget meets measurable standards
```

### Quality Gate Standard

COO/CEO may spot-check any component against token mapping at any time. 

### SLA & Escalation

| Metric | Value |
|--------|-------|
| **SLA** | 2 business hours |
| **Soft Cap** | 5 attempts |
| **Escalation** | CEO notification at 5, mandatory at 7 |

### Retry Path

```
Checklist FAIL → CDO fix → same COO re-runs Checklist (counts as 1 attempt)
→ Attempt count +1
→ If attempt >5: CEO escalation
```

---

## Step ⑤: MR-1 Multi-Model Review

### MR-1 Model Invocation Protocol

CTO calls each model with this standard prompt:

```
## MR-1 Design Review — {ProjectID} Phase 2

You are reviewing Phase 2 design deliverables for {ProjectID}.

### Context
- Project: {ID}
- Design System: shadcn/ui + madhorse-cdo.json (dark theme)
- Submission Version: v{X.Y}
- CDO Design Brief: documents/Phase1_Research/{ID}_CDO_Design_Brief.md
- Requirements: documents/Phase1_Research/{ID}_Requirements.md

### Deliverables for Review
Please review these files:
1. projects/{ID}_ProjectDocuments/documents/Phase2_Design/{ID}_Component_Inventory.md
2. projects/{ID}_ProjectDocuments/documents/Phase2_Design/{ID}_Interaction_Spec.md
3. projects/{ID}_ProjectDocuments/documents/Phase2_Design/{ID}_UI_Spec.md
4. projects/{ID}_ProjectDocuments/documents/Phase2_Design/{ID}_Theme_Preview.html

### Token Source
All CSS tokens must come from: shadcn/themes/madhorse-cdo.json
Token format: hsl(var(--{token-name}))

### Scoring Rubric
Score 3 dimensions:
1. Design Quality : UI/UX completeness, 4 states, WCAG 2.1 AA, consistency
2. Technical Feasibility : Can CTO build this? shadcn components available? Complexity realistic?
3. Token Application : All tokens from madhorse-cdo.json? HSL values correct?

Scale: 1-10 per dimension
Final Score = ((Design + Technical + Token) / 30) × 100

Score bands:
- 90-100: PASS
- 85-89: Borderline (CTO can approve with written rationale)
- <85: FAIL

### Required Output
Return your review as JSON:
{
  "model": "[model-name]",
  "timestamp": "YYYY-MM-DD HH:MM UTC",
  "submission_version": "vX.Y",
  "score": [0-100],
  "dimension_scores": {
    "design_quality": { "raw": [1-10] },
    "technical_feasibility": { "raw": [1-10] },
    "token_application": { "raw": [1-10] }
  },
  "findings": [
    {
      "dimension": "[design_quality|technical_feasibility|token_application]",
      "issue": "[specific issue]",
      "severity": "[critical|major|minor]",
      "recommendation": "[fix]"
    }
  ],
  "recommendation": "PASS|FAIL|BORDERLINE",
  "next_steps": ["action item 1", "action item 2"]
}
```

### MR-1 Scoring Rubric

| Dimension | 10 (Perfect) | 6 (Average) | 2 (Fail) |
|-----------|--------------|-------------|----------|
| 設計質量 | Pixel-perfect, WCAG AA, 4 states complete | Moderate gaps, rework needed | Major problems, not shippable |
| 技術可行性 | Trivial build, shadcn native | Moderate complexity, feasible | Unbuildable as specified |
| Token應用 | All tokens mapped, HSL correct | Partial mapping | Tokens missing/wrong |

**Final Score = ((Design + Technical + Token) / 30) × 100** — Equal weight, (sum of 3 dims / 30) × 100 → max 100

| Score Band | Result |
|------------|--------|
| 90-100 | **PASS** — that model is done |
| 85-89 | **Borderline Review** — CTO can approve with written rationale |
| <85 | **FAIL** — that model only re-scores |

**Gate Pass Rule:** All 3 models must score ≥90 OR have Borderline Review documented. If any model scores <90, ONLY that model re-scores. Models that already passed do NOT re-score. Gate cannot advance until all 3 models are PASS or Borderline.

### MR-1 Output Template (JSON)

Each model must return this exact structure:

```json
{
  "model": "GPT-4.1|Gemini 2.5|o4-mini",
  "timestamp": "YYYY-MM-DD HH:MM UTC",
  "reviewer": "CTO",
  "submission_version": "v1.X",
  "score": 92,
  "dimension_scores": {
    "design_quality": { "raw": 9 },
    "technical_feasibility": { "raw": 8 },
    "token_application": { "raw": 10 }
  },
  "findings": [
    {
      "dimension": "design_quality",
      "issue": "Button hover state missing",
      "severity": "major",
      "recommendation": "Add :hover pseudo-class to all button components"
    }
  ],
  "recommendation": "PASS",
  "next_steps": [
    "Add button hover states before Phase 3"
  ]
}
```

### Borderline Review Protocol (85-89)

**Threshold:** 85-89 = Borderline Review. Scores below 85 = FAIL.

**Max Borderline Count:** If same model scores 85-89 **2 consecutive times**, treat as FAIL. CTO cannot override on third attempt. CDO must fix and model must re-score.

If a model scores 85-89:
1. CTO reviews the findings
2. CTO documents written rationale for approval/rejection
3. If approved (first time): proceed to next gate
4. If rejected OR 2nd consecutive 85-89: treat as FAIL, CDO fixes, that model re-scores

**Borderline Review template in Meeting Minutes:**
```markdown
## Borderline Review — {Model}

**Score:** {85-89}  
**CTO Rationale:** {why this is acceptable}
**Risk Assessment:** {any remaining concerns}
**Decision:** APPROVED / REJECTED
**CTO Signature:** [FABIO_CTO_SIGNED_YYYY-MM-DD]
```

### MR-1 Retry Path

```
Any model <90 → CDO fixes that specific issue → that model re-scores
→ Attempt count +1 per model
→ If same model fails 2 consecutive times with 85-89: Borderline Review
→ If any model fails 5 times: CEO escalation
```

### SLA & Escalation

| Metric | Value |
|--------|-------|
| **SLA per model** | 4 business hours from Checklist PASS |
| **Soft Cap per model** | 5 attempts |
| **Escalation at 5/failure** | CEO notification |

---

## Step ⑥: CEO Final Review

### CEO Review Checklist

```
□ MR-1 output: all 3 models returned ≥90 OR Borderline Review documented
□ Design decisions: 設計方向合理，符合 MADHORSE brand
□ Token應用: madhorse-cdo.json tokens correct
□ Document versions: all vX.X consistent
□ Meeting Minutes: all gates documented with ≥3 Q&A cross-examination
□ Phase 1 Requirements: design satisfies all requirements
```

### SLA & Escalation

| Metric | Value |
|--------|-------|
| **SLA** | 2 business hours |
| **Attempt Limit** | 3 attempts |
| **4th attempt** | Boss becomes final reviewer |

### Retry Path

```
CEO REJECT → CDO fixes → back to COO → new COO QC → Checklist recheck → MR-1 (if affected) → CEO re-review
→ Attempt count +1
→ 4th REJECT → Boss escalation
```

### Boss Escalation Protocol

```
4th CEO REJECT → Boss becomes final reviewer
Boss reviews with same CEO checklist
Boss decision is BINDING
If Boss APPROVE → proceed to Step ⑦
If Boss REJECT → Scope Rewind (see Step ⑦)
```

---

## Step ⑦: Boss Preview

### Scope Boundary (CRITICAL — Enforced)

**Boss CAN reject on:**
- ✅ Color, spacing, typography, layout
- ✅ UX flow, brand consistency
- ✅ Component visual behavior
- ✅ 視覺美感

**Boss CANNOT reopen:**
- ❌ 技術架構 decisions
- ❌ API contracts
- ❌ Data models
- ❌ MR-1 passed technical decisions
- ❌ Scoring decisions already reviewed

### Boss Preview Checklist

```
□ Theme_Preview.html: visual tokens correct (colors, typography, spacing)
□ Layout: matches UI_Spec at all breakpoints
□ Brand: consistent with MADHORSE identity
□ UX: user flows make sense
□ Within scope (see above)
```

### **⚠️ CLEANUP BEFORE GATE TRANSITION (MANDATORY)**

**After Boss APPROVE only — CTO & CDO must clean up temporary files before moving to Phase 3:**

```
□ All automation scripts removed: *.py, create_*.js, generate_*.sh
□ Temporary task files removed: *_tasks.json (if used for Pencil/Penpot)
□ All deprecated Pencil .pen files removed
□ Temporary exports removed (if folder exports/ contains old PNG exports)
□ designs/ folder contains ONLY:
  - madhorse-cdo.json (required)
  - Theme_Preview.html (required)
  - Component_Inventory.md (required)
  - Interaction_Spec.md (required)
  - UI_Spec.md (required)
  - Accessibility_Checklist.md (required)
  - Performance_Budget.md (required)
  - Analytics_Plan.md (required)
  - Asset_Inventory.md (required)
  - UAT_Test_Cases.md (required)
  - uat_screenshots/ (subdirectory)
  - wireframes/ (subdirectory)
```

**If CTO or CDO creates temporary scripts during development, they MUST be removed before final CEO approval. Leaving temporary files = Phase gate BLOCKED.**

**Responsible:** CTO verifies before CEO sign-off  
**Consequence:** CEO rejects gate transition if temporary files found

### SLA & Escalation

| Metric | Value |
|--------|-------|
| **SLA** | 4 business hours |
| **Attempt Limit** | None (no hard cap) |

### Retry Path

```
Boss REJECT → Scope Rewind to Step ② (COO QC)
→ New attempt count starts fresh
→ CDO records scope change in Handoff Signal
→ COO new QC required
```

### Emergency Design Sprint Protocol

If Boss REJECT + root cause is fundamental misalignment:

**Trigger:** CEO determines misalignment cannot be fixed in normal retry cycle

**Agenda (1-hour mandatory workshop):**
```
1. CEO opens sprint (5 min)
2. CDO presents design decisions (15 min)
3. Boss identifies specific issues (15 min)
4. CDO + CTO propose solutions (15 min)
5. Consensus or scoped rollback decision (10 min)
```

**Output:**
- Emergency Sprint Report: `projects/{ID}_ProjectDocuments/documents/meeting-minutes/{ID}_MM_Special-EmergencySprint_{YYYY-MM-DD}.md`
- If scope change: new Handoff Signal required
- New round starts at Step ① with documented lessons

> Note: Special cases use `MM_Special-{CaseType}` format (see `protocols/gate-naming-map.md` Section "Special Cases")

---

## Version Bump Rules

| Change Type | Example | Bump | All Docs Update? |
|-------------|---------|------|------------------|
| Patch | Typo fix, minor spacing | v1.0 → v1.1 | Yes (synchronized) |
| Minor | Component replaced, state added | v1.X → v1.Y | Yes (synchronized) |
| Major | Full redesign, new screens | v2.0 | Yes (all reset to v2.0) |

**Tiebreaker (objective):** Count modified LINE SECTIONS per document. Document with most sections changed determines bump level. If still tied, use alphabetical order by filename.

**Section counting rule:** Each heading (`#` = level-1, `##` = level-2, `###` = level-3) defines a section. A section is "changed" if any non-empty, non-comment line below it was added, deleted, or modified. Blank lines and comment-only changes do NOT count as modified sections.

---

## Meeting Minutes Quality Standard

All MMs must contain ALL of:

1. **Header:** Project, Gate, Date, Attendees, Decision
2. **Cross-Examination:** Minimum 3 Q&A pairs (Q: question, A: answer)
   - Purpose: ensures reviewer actually interrogated the submission
   - Generic "looks good" = insufficient
3. **Issues Found:** Specific, actionable, with file:line references
4. **Dissenting Views:** Any disagreement on decisions
5. **Action Items:** Owner + deadline
6. **Next Step:** Explicit gate reference

**Cross-Examination Example (sufficient):**
```
## Cross-Examination

Q: Why does the Agent Card use 3x2 grid instead of 4x2?
A: 4x2 would require horizontal scroll on tablet breakpoint 768px. 3x2 is optimal.
Q: Is the System Monitor metric row responsive on mobile?
A: Yes, collapses to 2x2 grid at <640px per UI_Spec Section 3.1.
Q: Are all tokens from madhorse-cdo.json or custom values?
A: All from madhorse-cdo.json. No custom values. See Component_Inventory.md Section 4.
```

**Insufficient example (will be rejected):**
```
## Cross-Examination
Design looks good. No issues found. Proceed.
```

**Storage:** `projects/{ID}_ProjectDocuments/documents/meeting-minutes/`  
**Format:** `{ID}_MM_Gate-{FROM}-{TO}_YYYY-MM-DD.md`

---

## Document Deliverables (10 + 1 + Checklist)

**Location:** `projects/{ID}_ProjectDocuments/documents/Phase2_Design/`

```
├── {ID}_Component_Inventory.md      vX.X  (≥100 words)
├── {ID}_Interaction_Spec.md        vX.X  (≥100 words)
├── {ID}_UI_Spec.md                vX.X  (≥100 words)
├── {ID}_Accessibility_Checklist.md vX.X
├── {ID}_Performance_Budget.md      vX.X  (with LCP/TTI/CLS numbers)
├── {ID}_Analytics_Plan.md          vX.X  (≥100 words)
├── {ID}_Release_Checklist.md       vX.X  (≥100 words)
├── {ID}_Asset_Inventory.md          vX.X  (≥100 words)
├── {ID}_Theme_Preview.html         vX.X  (browser-renderable HTML)
├── {ID}_UAT_Test_Cases.md          vX.X  (≥100 words)
├── {ID}_CDO_Handoff_Signal.md      vX.X  (triggers Step ②)
└── {ID}_Design_Submission_Checklist.md  vX.X  (Step ④)
```

---

## Retry Path Summary Table

| Failure Point | Next Step | Soft Cap | Escalation |
|---------------|-----------|---------|------------|
| COO QC FAIL | CDO fix → back to COO | 5 → CEO notify, 7 → CEO mandatory | CEO |
| Checklist FAIL | CDO fix → recheck | 5 → CEO notify, 7 → CEO mandatory | CEO |
| MR-1 model FAIL | CDO fix → that model re-score | 5 per model | CEO |
| MR-1 Borderline (85-89×2) | CTO Borderline Review | — | CTO decision |
| CEO REJECT | CDO fix → back to COO | 3 attempts | 4th → Boss |
| Boss REJECT | Scope Rewind → Step ② | ∞ | Emergency Sprint |

---

## Soft Cap & Escalation Matrix

| Gate | SLA | Soft Cap | Hard Limit | Escalation |
|------|-----|----------|-----------|------------|
| COO QC | 4h | 5 attempts | None | CEO notify → mandatory at 7 |
| Design Checklist | 2h | 5 attempts | None | CEO notify → mandatory at 7 |
| MR-1 (per model) | 4h/model | 5 attempts | None | CEO |
| CEO Review | 2h | 3 attempts | 4th → Boss | Boss |
| Boss Preview | 4h | ∞ | None | Emergency Sprint |

---

## MR-1 Model Requirements

| Model | Min Score | Output Format | Retry Cap | SLA |
|-------|-----------|---------------|-----------|-----|
| GPT-4.1 | ≥90 | JSON (template) | 5 | 4h |
| Gemini 2.5 | ≥90 | JSON (template) | 5 | 4h |
| o4-mini | ≥90 | JSON (template) | 5 | 4h |

---

## Implementation Notes

1. **Token Source:** All tokens MUST come from `shadcn/themes/madhorse-cdo.json`
2. **shadcn Components:** All UI components must use shadcn/ui library
3. **No PNG Exports:** `designs/exports/` is DEPRECATED for Phase 2 gate
4. **CTO Build:** CTO uses Component_Inventory + Interaction_Spec + UI_Spec as source of truth
5. **UAT:** Browser automation screenshots compared against Theme_Preview.html reference
   - UAT screenshot path: `projects/{ID}_ProjectDocuments/designs/uat_screenshots/TC-XXX.png`
   - Reference comparison: visual diff tool or manual side-by-side

---

## Sign-off

**Drafted:** 2026-04-03  
**Version:** v11.6  
**Status:** ✅ APPROVED — 2026-04-03 by Boss (猫 @kasturn)  
**Scoring Formula:** `((Dim1 + Dim2 + Dim3) / 30) × 100` — Equal weight, max 100

**Changelog (v11.0 → v11.6):**
- v11.0: Initial draft (78/100)
- v11.1: Added MR-1 prompt template, SLAs, Cross-Examination standard (85/100)
- v11.2: Fixed execution gaps — Gate Pass Rule, Version Tiebreaker, Checklist retry (87/100)
- v11.3: Borderline max-2 rule, Section counting definition (88/100)
- v11.4: Formula inconsistency — /3 gave wrong max (81/100)
- v11.5: Removed decorative weights, equal dimensions (70/100)
- v11.6: Correct formula /30, synced model-review.md, fixed all consistency errors

**APPROVED by:** Boss (猫 @kasturn)
