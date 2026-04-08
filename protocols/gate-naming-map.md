# Gate Naming Convention Map (v11.2)

> **Purpose:** Unified meeting minutes naming standard across all gates
> **Effective:** v11.2 (clarification of v11.1)
> **Last Updated:** 2026-04-03

## Standard Format

**Universal MM Naming:** `{ID}_MM_Gate-{FROM}-{TO}_{YYYY-MM-DD}.md`

**Storage Location:** `projects/{ID}_ProjectDocuments/documents/meeting-minutes/`

---

## Gate-to-Filename Mapping Table

| Phase | Gate | FROM | TO | MM Filename Format | Example |
|-------|------|------|-----|-------------------|---------|
| 0 | Registration | 0 | 1 | `{ID}_MM_Gate-0-1_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-0-1_2026-04-01.md` |
| 1 | Research | 1 | 1.5 | `{ID}_MM_Gate-1-1.5_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-1-1.5_2026-04-01.md` |
| 1.5 | AI Advisory Review | 1.5 | 2 | `{ID}_MM_Gate-1.5-2_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-1.5-2_2026-04-01.md` |
| 2 | Design → Multi-Model Review | 2 | MR1 | `{ID}_MM_Gate-2-MR1_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-2-MR1_2026-04-03.md` |
| MR-1 | Multi-Model Review | MR1 | 3 | `{ID}_MM_Gate-MR1-3_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-MR1-3_2026-04-03.md` |
| 3 | Tech Spec → Build | 3 | 4 | `{ID}_MM_Gate-3-4_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-3-4_2026-04-03.md` |
| 4 | Build → Deployment | 4 | 4.5 | `{ID}_MM_Gate-4-4.5_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-4-4.5_2026-04-03.md` |
| 4.5 | Deploy → Multi-Model Review | 4.5 | MR2 | `{ID}_MM_Gate-4.5-MR2_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-4.5-MR2_2026-04-03.md` |
| MR-2 | Multi-Model Review | MR2 | 5 | `{ID}_MM_Gate-MR2-5_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-MR2-5_2026-04-03.md` |
| 5 | UAT → Closeout | 5 | 6 | `{ID}_MM_Gate-5-6_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-5-6_2026-04-03.md` |
| 6 | Closeout → BAU | 6 | BAU | `{ID}_MM_Gate-6-BAU_{YYYY-MM-DD}.md` | `P2026-008_MM_Gate-6-BAU_2026-04-03.md` |

---

## Special Cases (Non-Standard Gates)

| Scenario | MM Filename Format | Example | Responsibility |
|----------|-------------------|---------|-----------------|
| Emergency Design Sprint | `{ID}_MM_Special-EmergencySprint_{YYYY-MM-DD}.md` | `P2026-008_MM_Special-EmergencySprint_2026-04-03.md` | CEO initiates |
| Scope Rewind Recovery | `{ID}_MM_Special-ScopeRewind_{YYYY-MM-DD}.md` | `P2026-008_MM_Special-ScopeRewind_2026-04-03.md` | CEO documents |
| Borderline Review (CTO) | `{ID}_MM_Special-BorderlineReview_{YYYY-MM-DD}.md` | `P2026-008_MM_Special-BorderlineReview_2026-04-03.md` | CTO rationale |
| Boss Override Decision | `{ID}_MM_Special-BossOverride_{YYYY-MM-DD}.md` | `P2026-008_MM_Special-BossOverride_2026-04-03.md` | Boss signature |

---

## Implementation Rules

### Rule 1: Origin vs Final Location
- **起草階段 (Draft):** MM 可暫時在各 Phase 資料夾 (例: `documents/Phase2_Design/`)
- **Gate 批准後 (After Approval):** 必須立即移動到 `documents/meeting-minutes/`

### Rule 2: Naming at Move Time
- **改名時機:** CEO 批准 Gate 時
- **改名標準:** 必須使用上表的 Gate-based 格式
- **不接受的格式:**
  - ❌ `P2026-008_Phase1_MeetingMinutes.md` (Phase-based only)
  - ❌ `P2026-008_MM_COO-QC_2026-04-03.md` (職能名稱，已廢棄)
  - ❌ `P2026-008_MeetingMinutes_2026-04-03.md` (缺少 Gate 編號)

### Rule 3: Screenshots Requirement
- **每個 MM 必須附加:** 至少 1 張截圖到 `documents/meeting-minutes/screenshots/`
- **截圖命名:** `{ID}_Gate-{FROM}-{TO}_{description}_{date}.png`
- **示例:** `P2026-008_Gate-2-MR1_COO-QC-PASS_2026-04-03.png`

### Rule 4: Verification
- **自動檢查:** CEO 使用 `protocols/check-mm-compliance.sh` 驗證
- **檢查項目:**
  1. 所有 Gate 批准後的 MM 都已移動到 `meeting-minutes/`
  2. 所有 MM 使用正確的 Gate-based 命名格式
  3. 所有 MM 都有對應的截圖
  4. 沒有 Phase 資料夾中遺留的舊格式 MM

---

## Migration Guide (v11.1 → v11.2)

### 從舊格式遷移

| 舊檔案名稱 | 新檔案名稱 | 說明 |
|---------|----------|------|
| `P2026-008_Phase1_MeetingMinutes.md` | `P2026-008_MM_Gate-1-1.5_2026-04-01.md` | Phase 1 Research gate |
| `P2026-008_Phase1_5_MeetingMinutes.md` | `P2026-008_MM_Gate-1.5-2_2026-04-01.md` | Phase 1.5 AI Advisory gate |
| `P2026-008_Phase3_MeetingMinutes.md` | `P2026-008_MM_Gate-MR1-3_2026-04-01.md` | Phase 3 after MR-1 |
| `P2026-008_MM_COO-QC_2026-04-03.md` | `P2026-008_MM_Gate-2-MR1_2026-04-03.md` | Phase 2→MR1 gate (COO QC is sub-step) |

---

## Compliance Checklist for MM Authors

When creating/moving meeting minutes:

```
□ MM stored in: documents/meeting-minutes/
□ MM filename follows: {ID}_MM_Gate-{FROM}-{TO}_{YYYY-MM-DD}.md
□ MM contains Header with: Project, Gate, Date, Attendees, Decision
□ MM contains Cross-Examination: ≥3 Q&A pairs
□ MM contains Issues Found: specific, with file:line references
□ MM contains Action Items: Owner + deadline
□ MM contains Next Step: explicit gate reference
□ Screenshots stored in: documents/meeting-minutes/screenshots/
□ At least 1 screenshot per MM (numbered: _001.png, _002.png, etc.)
□ Version number updated in related deliverables (if applicable)
□ Git committed with message: "MM: Gate-{FROM}-{TO} approval on {DATE}"
```

---

## SLA & Responsibility

| Task | Owner | SLA | Verification |
|------|-------|-----|----------------|
| Author creates MM (draft) | Sub-agent (COO/CTO/etc) | During gate | MM exists in Phase folder |
| CEO approves gate & renames MM | CEO | 1 hour after approval | MM in `meeting-minutes/` with correct name |
| Add screenshots | Sub-agent | Same as MM move | Screenshots in `screenshots/` folder |
| Verify compliance | CEO | Before git commit | `check-mm-compliance.sh` returns 0 |

---

**Version History:**
- v11.2 (2026-04-03): Unified naming map + migration guide
- v11.1 (2026-04-02): Initial format with COO-QC example
- v11.0 (2026-04-01): Generic Gate-based format mentioned
