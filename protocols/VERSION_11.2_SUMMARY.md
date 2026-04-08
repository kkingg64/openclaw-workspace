# Protocol v11.2 Update Summary

> **Protocol Version:** 11.1 → 11.2
> **Date Effective:** 2026-04-03
> **Impact:** BREAKING CHANGE (MM naming format)

---

## Executive Summary

協議 v11.2 統一了**會議記錄 (MM) 命名格式**，解決了 v11.1 中的 4 個主要矛盾：

| 問題 | v11.1 狀態 | v11.2 修正 |
|------|----------|----------|
| MM 命名不一致 | 3 種格式混用 | ✅ 統一 Gate-based 格式 |
| 責任人不清 | "必須 mv"（誰？） | ✅ CEO 負責，SLA: 1 小時 |
| Phase 1-6 規定不清 | Phase 2 有詳細規定，其他 Phase 模糊 | ✅ 所有 Phase 都有具體要求 |
| 無驗證機制 | 手工檢查 | ✅ 自動化檢查腳本 |

---

## New/Updated Files

### 📄 新建文件

| 檔案 | 用途 | 重要性 |
|------|------|--------|
| `protocols/gate-naming-map.md` | Gate → MM 名稱對應表（權威來源） | 🔴 CRITICAL |
| `protocols/mm-compliance-guide.md` | Phase 1-6 詳細 MM 要求 | 🔴 CRITICAL |
| `protocols/check-mm-compliance.sh` | 自動合規檢查工具 | 🟠 HIGH |
| `protocols/MM_MIGRATION_PLAN.md` | P2026-008 遷移指南 | 🟠 HIGH |

### 📝 修改檔案

| 檔案 | 改動 | 影響 |
|------|------|------|
| `protocols/phase-gates.md` | 版本 11.1 → 11.2 | 🔵 LOW (版本更新) |
| `protocols/phase2-design-workflow-v11.md` | MM 格式 COO-QC → Gate-2-MR1 | 🟠 HIGH |
| `protocols/deliverable-map.md` | 新增 SLA + 責任人 | 🟠 HIGH |

---

## Key Changes

### 1️⃣ Unified MM Naming Standard

**Before (v11.1):**
- `{ID}_MM_COO-QC_YYYY-MM-DD.md` (職能名稱)
- `{ID}_MM_Gate-{FROM}-{TO}_YYYY-MM-DD.md` (Gate 編號)
- `{ID}_Phase1_MeetingMinutes.md` (Phase 名稱)

**After (v11.2):**
- ✅ **ONLY:** `{ID}_MM_Gate-{FROM}-{TO}_{YYYY-MM-DD}.md`

**Mapping Examples:**
```
Phase 1→1.5 Research:        P2026-008_MM_Gate-1-1.5_2026-04-01.md
Phase 1.5→2 AI Advisory:     P2026-008_MM_Gate-1.5-2_2026-04-01.md
Phase 2→MR1 Design:          P2026-008_MM_Gate-2-MR1_2026-04-03.md
MR-1→3 Multi-Model Review:   P2026-008_MM_Gate-MR1-3_2026-04-03.md
Phase 3→4 TechSpec:          P2026-008_MM_Gate-3-4_2026-04-03.md
```

**Special Cases (preserved):**
```
Emergency Sprint:            P2026-008_MM_Special-EmergencySprint_YYYY-MM-DD.md
Scope Rewind:                P2026-008_MM_Special-ScopeRewind_YYYY-MM-DD.md
Borderline Review:           P2026-008_MM_Special-BorderlineReview_YYYY-MM-DD.md
```

### 2️⃣ Defined Responsibility & SLA

**Before (v11.1):**
> "MM 暫時可以在 Phase 資料夾，但 Gate 批准後必須 mv 到 meeting-minutes/"
- ❓ 誰負責？
- ❓ 何時？
- ❓ 怎樣驗證？

**After (v11.2):**
- ✅ **Who:** CEO
- ✅ **When:** Gate approval 後 1 小時內 (Soft cap)
- ✅ **How:** 執行 `bash protocols/check-mm-compliance.sh "PROJECT_ID"` 驗證
- ✅ **What:** 
  1. 改名為 Gate-based 格式
  2. mv 到 `documents/meeting-minutes/`
  3. 附加 ≥1 張截圖到 `documents/meeting-minutes/screenshots/`

### 3️⃣ Comprehensive Phase 1-6 Guidelines

**Before (v11.1):**
- Phase 2 (Design) 有 `phase2-design-workflow-v11.md` 詳細規定
- Phase 1, 1.5, 3-6 只有通用規定在 `deliverable-map.md`

**After (v11.2):**
- ✅ `mm-compliance-guide.md` 包含所有 Phase 的具體要求：
  - Phase 0: Registration gate (2h SLA)
  - Phase 1: Research gate (4h SLA)
  - Phase 1.5: AI Advisory gate (4h SLA)
  - **Phase 2: Design gates (2-4h SLA)**
  - MR-1: Multi-Model Review (4h per model)
  - Phase 3-6: 各 Phase 及其 SLA

### 4️⃣ Automated Compliance Checking

**New Tool:** `bash protocols/check-mm-compliance.sh "PROJECT_ID"`

**Checks:**
1. ✅ All Gate MMs exist in `meeting-minutes/` (correct location)
2. ✅ All MMs use Gate-based naming format
3. ✅ No old-format MMs remain in Phase folders
4. ✅ Each MM has ≥1 screenshot
5. ✅ MM headers contain required sections (Header, Decision, Actions)

**Exit Codes:**
- `0` = 100% compliant ✅
- `1` = Missing MM files
- `2` = Non-compliant names
- `4` = Missing screenshots
- `8` = Old format MMs found
- `16` = Bad headers

---

## Impact on Active Projects

### P2026-008 MADHORSE HQ

**Current Status:** 0 / 11 gates compliant (0%)

**Required Actions:**

| Step | Action | Timeline | Responsible |
|------|--------|----------|------------|
| 1 | Migrate 3 old-format MMs from Phase folders | Now | CEO |
| 2 | Rename 1 COO-QC format MM to Gate-2-MR1 | Now | CEO |
| 3 | Create screenshots directory | Now | CEO |
| 4 | Add ≥1 screenshot per existing MM | 4 hours | CDO/CTO |
| 5 | Run `check-mm-compliance.sh` verification | 1 hour | CEO |
| 6 | Git commit with migration results | After ✅ | CEO |

**Detailed Steps:** See `protocols/MM_MIGRATION_PLAN.md`

**SLA for Completion:** Before Phase 3→4 Gate approval (CRITICAL)

---

## Backward Compatibility

⚠️ **BREAKING CHANGE** - v11.2 is NOT backward compatible with v11.1 MM naming:

```bash
# These will NO LONGER be accepted:
❌ P2026-008_Phase1_MeetingMinutes.md
❌ P2026-008_MM_COO-QC_2026-04-03.md
❌ P2026-008_MM_Emergency-Sprint_2026-04-03.md

# All must be renamed to:
✅ P2026-008_MM_Gate-1-1.5_2026-04-01.md
✅ P2026-008_MM_Gate-2-MR1_2026-04-03.md
✅ P2026-008_MM_Special-EmergencySprint_2026-04-03.md
```

**Migration Assistance:**
- Automatic script: `bash protocols/MM_MIGRATION_PLAN.md` (PHASE A-C commands)
- Manual reference: `protocols/gate-naming-map.md` (Migration Guide table)
- Verification tool: `bash protocols/check-mm-compliance.sh "PROJECT_ID"`

---

## Quick Reference Card

### For Project Managers / CEOs

**When Gate is Approved:**
```bash
# 1. Rename MM to Gate format
mv projects/P2026-XXX/documents/Phase2_Design/P2026-XXX_Phase2_MeetingMinutes.md \
   projects/P2026-XXX/documents/meeting-minutes/P2026-XXX_MM_Gate-2-MR1_YYYY-MM-DD.md

# 2. Run compliance check
bash protocols/check-mm-compliance.sh "P2026-XXX"

# 3. If exit code = 0, proceed to git commit
git add projects/P2026-XXX/documents/meeting-minutes/
git commit -m "MM: Gate-{FROM}-{TO} approval on {DATE}"
```

### For Protocol Maintainers

**When creating new Phase implementations:**
1. Reference `protocols/mm-compliance-guide.md` for that Phase
2. Copy MM template for that Phase
3. Name using `MM_Gate-{FROM}-{TO}` format
4. Add ≥1 screenshot to `screenshots/` folder
5. Run `check-mm-compliance.sh` to verify

### For Automation / CI/CD

**Pre-commit Hook Example:**
```bash
#!/bin/bash
# .git/hooks/pre-commit

PROJECT_ID="P2026-008"
bash protocols/check-mm-compliance.sh "$PROJECT_ID"
if [ $? -ne 0 ]; then
    echo "❌ MM compliance check failed. Commit blocked."
    exit 1
fi
```

---

## Documents for Reference

| Document | Purpose | Audience |
|----------|---------|----------|
| `gate-naming-map.md` | Definitive Gate → MM name mapping | All |
| `mm-compliance-guide.md` | Phase 1-6 detailed MM requirements | Sub-agents, Project Managers |
| `check-mm-compliance.sh` | Automated verification tool | CEOs, CI/CD systems |
| `MM_MIGRATION_PLAN.md` | P2026-008 specific migration guide | P2026-008 team |
| `phase-gates.md` v11.2 | Master protocol version reference | All |

---

## FAQ

**Q: Do I need to rename all old MMs?**
A: Yes. v11.2 only accepts Gate-based format. See `MM_MIGRATION_PLAN.md` for automated commands.

**Q: What if I missed the 1-hour SLA for moving an MM?**
A: Document the reason in the MM (CEO note). This is a Soft Cap, not Hard Limit, but escalate to team lead.

**Q: Can I use Phase names in MM format?**
A: No. Use Gate names. Example: `MM_Gate-1-1.5` not `MM_Gate-Phase1`.

**Q: What about special cases like Emergency Sprint?**
A: Use `MM_Special-{CaseType}` format. See `gate-naming-map.md` Section "Special Cases".

**Q: How do I verify P2026-008 compliance?**
A: Run `bash protocols/check-mm-compliance.sh "P2026-008"` and check exit code. Exit 0 = compliant.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v11.2 | 2026-04-03 | Unified MM naming + compliance automation + Phase 1-6 guidelines |
| v11.1 | 2026-04-02 | Added automated validators for Phase sequence + Pre-Submission enforcement |
| v11.0 | 2026-04-01 | Phase 2 shadcn Design-First introduction |

---

**Next Review Date:** 2026-05-03 (1 month)  
**Maintained By:** CEO + Protocol Team  
**Questions?** Contact: fabio-boss (CEO)
