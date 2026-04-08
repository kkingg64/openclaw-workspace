# CDO Workflow — Phase 2 Design (v11.0)

> **Version:** v11.0  
> **Date:** 2026-04-03  
> **Supersedes:** Pencil CLI workflow  
> **Status:** ACTIVE — Part of `protocols/phase2-design-workflow-v11.md`

---

## Overview

Phase 2 design uses **shadcn/ui + madhorse-cdo.json tokens** as source of truth.

**Tool Status:**
- ⛔ Pencil CLI: DEPRECATED (2026-04-03)
- ⚠️ Penpot MCP: Reference only
- ✅ shadcn/ui: Primary design system

---

## Phase 2 Complete Workflow

See `protocols/phase2-design-workflow-v11.md` for full 7-step workflow:

```
① CDO 內部自檢 → Design Complete Minimum Bar
② CDO→COO Handoff Signal
③ COO QC Check
④ Design Submission Checklist
⑤ MR-1 Multi-Model Review (CTO-led)
⑥ CEO Final Review
⑦ Boss Preview
→ Phase 3 Technical Spec
```

---

## CDO Steps Detail

### Step 0: Pre-design
1. Read `protocols/phase2-design-workflow-v11.md`
2. Read `protocols/model-review.md`
3. Confirm Phase 1 Requirements: `documents/Phase1_Research/{ID}_Requirements.md`

### Step 1: Design in shadcn
- Use `shadcn/ui` components
- Apply `madhorse-cdo.json` tokens
- Document in Component_Inventory + Interaction_Spec + UI_Spec

### Step 2: Create Theme_Preview.html
- Browser-renderable HTML page
- Demonstrates tokens applied correctly
- Uses actual madhorse-cdo.json HSL values

### Step 3: Self-Cert
Run Design Complete Minimum Bar checklist:
```
□ Component_Inventory: 每個 component 4 states
□ Interaction_Spec: 每個 element 4 states matrix
□ UI_Spec: layout + tokens mapped
□ Theme_Preview.html: 瀏覽器正常顯示
□ Accessibility_Checklist: WCAG 2.1 AA
□ Performance_Budget: LCP<2.5s, TTI<3.8s, CLS<0.1
□ UAT_Test_Cases: 覆盖所有 Phase 1 flows
□ spell-check: typos --format=compact passed
□ 冇 blocking issues
```

### Step 4: Create Handoff Signal
Create `projects/{ID}_ProjectDocuments/documents/Phase2_Design/{ID}_CDO_Handoff_Signal.md`
- Document list with versions
- Known issues
- CDO self-cert sign-off

### Step 5: Send to COO
Wait for COO acknowledgment within 1 hour.

---

## Deprecated (History)

### Pencil CLI Workflow — DEPRECATED
Historical reference only. Do not use.

**Reason:** headless `save()` bug, cannot create new .pen files.

**Fallback was:** Penpot MCP

---

## Document Handoff to CTO

CTO receives:
1. `Component_Inventory.md`
2. `Interaction_Spec.md`
3. `UI_Spec.md`
4. `Theme_Preview.html` (for visual reference)

These are the **source of truth** for Phase 3 implementation.
