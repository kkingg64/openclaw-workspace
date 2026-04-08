# shadcn Design Protocol (v11.0)

> **Version:** v11.0  
> **Date:** 2026-04-03  
> **Supersedes:** Pencil CLI workflow  
> **Status:** ACTIVE

---

## Overview

MADHORSE Phase 2 design uses **shadcn/ui** as the primary design system. The source of truth is shadcn components + tokens, not PNG exports.

**Pencil CLI:** DEPRECATED (2026-04-03)  
**Penpot MCP:** Reference only  
**Design Preview:** Theme_Preview.html

---

## Token Source

All tokens MUST come from: `shadcn/themes/madhorse-cdo.json`

Token format in code: `hsl(var(--token-name))`

---

## CDO Design Complete Minimum Bar

Before sending to COO, CDO must self-certify:

```
□ Component_Inventory.md: 每個 component 有完整 4 states
□ Interaction_Spec.md: 每個 interactive element 有 4 states matrix
□ UI_Spec.md: layout 完整 + tokens 已映射至 madhorse-cdo.json
□ Theme_Preview.html: 瀏覽器可正常開啟
□ Accessibility_Checklist.md: WCAG 2.1 AA
□ Performance_Budget.md: LCP <2.5s, TTI <3.8s, CLS <0.1
□ UAT_Test_Cases.md: 覆盖所有 Phase 1 user flows
□ spell-check: typos --format=compact passed
□ 冇 blocking issues
```

---

## Document Deliverables

```
Phase2_Design/
  ├── {ID}_Component_Inventory.md      (≥100 words)
  ├── {ID}_Interaction_Spec.md
  ├── {ID}_UI_Spec.md
  ├── {ID}_Accessibility_Checklist.md
  ├── {ID}_Performance_Budget.md
  ├── {ID}_Analytics_Plan.md
  ├── {ID}_Release_Checklist.md
  ├── {ID}_Asset_Inventory.md
  ├── {ID}_Theme_Preview.html           (browser-renderable)
  ├── {ID}_UAT_Test_Cases.md
  ├── {ID}_CDO_Handoff_Signal.md
  └── {ID}_Design_Submission_Checklist.md
```

---

## UAT Visual Comparison

Phase 5 UAT uses browser screenshots vs Theme_Preview.html:

```
uat_screenshots/TC-XXX.png  → compared against Theme_Preview.html
```

---

## Skills Files

- `skills/design/ui-design-system.md` — Component spec standard
- `protocols/phase2-design-workflow-v11.md` — Full Phase 2 SOP
