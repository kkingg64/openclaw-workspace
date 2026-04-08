# MM Migration Plan (v11.1 → v11.2)

> **Date:** 2026-04-03
> **Project:** P2026-008 MADHORSE HQ
> **Urgency:** Complete by Phase 3→4 Gate approval
> **Responsible:** CEO (with COO/CTO assistance)

---

## Current Status (Pre-Migration)

**Compliance Check Results (bash protocols/check-mm-compliance.sh "P2026-008"):**

```
Gates Compliant: 0 / 11 (0%)
Errors Found: 13
Warnings: 3
Status: ❌ COMPLIANCE FAILED
```

**Issues Identified:**

| Issue | Count | Location | Impact |
|-------|-------|----------|--------|
| Old-format MMs in Phase folders | 3 | Phase1_Research, Phase3_TechSpec | Must move & rename |
| Old-format MMs in meeting-minutes | 1 | meeting-minutes/ | Must rename |
| Missing screenshots directory | 1 | — | Must create |
| Missing screenshots | Multiple | — | Must add |
| Missing new Gate-based MMs | 8 | — | Depends on phases |

---

## Step-by-Step Migration

### PHASE A: Backup & Setup (5 minutes)

**A1. Create backup**
```bash
cd /opt/ai-fabio-corp/data/openclaw_home/workspace

# Backup current MM folder
cp -r projects/P2026-008_ProjectDocuments/documents/meeting-minutes/ \
      projects/P2026-008_ProjectDocuments/documents/meeting-minutes.backup_v11.1/

echo "✓ Backup created"
```

**A2. Create screenshots directory**
```bash
mkdir -p projects/P2026-008_ProjectDocuments/documents/meeting-minutes/screenshots

echo "✓ Screenshots directory created"
```

---

### PHASE B: Move & Rename Phase Folder MMs (10 minutes)

**B1. Migrate Phase 1 Research MM**
```bash
# Old location: Phase1_Research/P2026-008_Phase1_MeetingMinutes.md
# New location: meeting-minutes/P2026-008_MM_Gate-1-1.5_2026-04-01.md
# Reason: Phase 1→1.5 is the gate name

mv projects/P2026-008_ProjectDocuments/documents/Phase1_Research/P2026-008_Phase1_MeetingMinutes.md \
   projects/P2026-008_ProjectDocuments/documents/meeting-minutes/P2026-008_MM_Gate-1-1.5_2026-04-01.md

echo "✓ Phase 1 MM migrated"
```

**B2. Migrate Phase 1.5 AI Advisory MM**
```bash
# Old location: Phase1_Research/P2026-008_Phase1_5_MeetingMinutes.md
# New location: meeting-minutes/P2026-008_MM_Gate-1.5-2_2026-04-01.md
# Reason: Phase 1.5→2 is the gate name

mv projects/P2026-008_ProjectDocuments/documents/Phase1_Research/P2026-008_Phase1_5_MeetingMinutes.md \
   projects/P2026-008_ProjectDocuments/documents/meeting-minutes/P2026-008_MM_Gate-1.5-2_2026-04-01.md

echo "✓ Phase 1.5 MM migrated"
```

**B3. Migrate Phase 3 Tech Spec MM**
```bash
# Old location: Phase3_Technical_Spec/P2026-008_Phase3_MeetingMinutes.md
# New location: meeting-minutes/P2026-008_MM_Gate-MR1-3_2026-04-01.md
# Reason: Phase goes MR-1→3 (MR1-to-3), not "2→3"

mv projects/P2026-008_ProjectDocuments/documents/Phase3_Technical_Spec/P2026-008_Phase3_MeetingMinutes.md \
   projects/P2026-008_ProjectDocuments/documents/meeting-minutes/P2026-008_MM_Gate-MR1-3_2026-04-01.md

echo "✓ Phase 3 MM migrated"
```

---

### PHASE C: Rename MMs Already in meeting-minutes (5 minutes)

**C1. Rename COO-QC format to Gate-based**
```bash
# Old name: P2026-008_MM_COO-QC_2026-04-03.md
# New name: P2026-008_MM_Gate-2-MR1_2026-04-03.md
# Reason: COO QC is part of 2→MR1 gate (see gate-naming-map.md)

cd projects/P2026-008_ProjectDocuments/documents/meeting-minutes/

mv P2026-008_MM_COO-QC_2026-04-03.md \
   P2026-008_MM_Gate-2-MR1_2026-04-03.md

echo "✓ COO-QC MM renamed to Gate-based format"
```

**C2. Rename Phase3-4 to Gate 3-4 (if needed)**
```bash
# Note: Current name "P2026-008_MM_Phase3-4_2026-04-03.md" actually follows Gate format already
# But verify it's correctly named: should be "Gate-3-4" not "Phase3-4"

if [ -f "P2026-008_MM_Phase3-4_2026-04-03.md" ]; then
    mv P2026-008_MM_Phase3-4_2026-04-03.md \
       P2026-008_MM_Gate-3-4_2026-04-03.md
    echo "✓ Phase3-4 MM renamed to Gate-3-4"
else
    echo "✓ P2026-008_MM_Gate-3-4 already correctly named"
fi
```

**C3. Handle Phase5 MM (if exists)**
```bash
# If there's a P2026-008_MM_Phase5_2026-04-03.md, rename to Gate format
if [ -f "P2026-008_MM_Phase5_2026-04-03.md" ]; then
    mv P2026-008_MM_Phase5_2026-04-03.md \
       P2026-008_MM_Gate-5-6_2026-04-03.md
    echo "✓ Phase 5 MM renamed to Gate-5-6"
fi
```

---

### PHASE D: Add Screenshots (15 minutes per gate)

**D1. Add screenshots for each gate's MM**

For each MM file now in `meeting-minutes/`, capture and add at least 1 screenshot:

```bash
# Template for screenshot naming:
# {ID}_Gate-{FROM}-{TO}_{description}_{date}.png
# Example: P2026-008_Gate-1-1.5_Requirements-Analysis_2026-04-01.png

# For Gate-1-1.5 (Research):
# 1. Open P2026-008_MM_Gate-1-1.5_2026-04-01.md
# 2. Screenshot the requirements table / competitors list / ROI score
# 3. Save as: screenshots/P2026-008_Gate-1-1.5_Research-Summary_2026-04-01.png

# For Gate-2-MR1 (Design COO QC):
# 1. Screenshot the deliverables list / token mapping table
# 2. Save as: screenshots/P2026-008_Gate-2-MR1_Components-and-Tokens_2026-04-03.png

# For Gate-3-4 (Phase 3→4):
# 1. Screenshot the Tech Spec summary / CISO_SAFE tag
# 2. Save as: screenshots/P2026-008_Gate-3-4_TechSpec-Approved_2026-04-03.png

# For Gate-5-6 (UAT→Closeout):
# 1. Screenshot UAT results / design vs production comparison
# 2. Save as: screenshots/P2026-008_Gate-5-6_UAT-Results_2026-04-03.png

echo "✓ Screenshots added manually (use screenshot tool or CLI: scrot/gnome-screenshot)"
```

---

### PHASE E: Verify Compliance (2 minutes)

**E1. Run compliance check**
```bash
cd /opt/ai-fabio-corp/data/openclaw_home/workspace

bash protocols/check-mm-compliance.sh "P2026-008"
```

**E2. Expected output**
```
Gates Compliant: 3 / 11 (27%)  [or better, depending on phases completed]
Errors Found: 0
Warnings: 0

✅ 100% COMPLIANT [if all expected gates have MMs]
```

---

### PHASE F: Git Commit (2 minutes)

**F1. Stage all changes**
```bash
cd /opt/ai-fabio-corp/data/openclaw_home/workspace

# Stage MM moves/renames
git add -A projects/P2026-008_ProjectDocuments/documents/meeting-minutes/

# Stage protocol updates
git add protocols/phase-gates.md
git add protocols/phase2-design-workflow-v11.md
git add protocols/deliverable-map.md
git add protocols/gate-naming-map.md
git add protocols/mm-compliance-guide.md
git add protocols/check-mm-compliance.sh
```

**F2. Commit**
```bash
git commit -m "protocols: v11.2 MM naming standardization

- Unified all MM naming to Gate-based format: MM_Gate-{FROM}-{TO}
- Added gate-naming-map.md (definitive Gate→MM name mapping)
- Added mm-compliance-guide.md (Phase 1-6 detailed requirements)
- Added check-mm-compliance.sh (automated compliance verification)
- Updated phase-gates.md to v11.2
- Migrated P2026-008 MMs:
  • Phase1_Research/P2026-008_Phase1_MeetingMinutes.md → MM_Gate-1-1.5
  • Phase1_Research/P2026-008_Phase1_5_MeetingMinutes.md → MM_Gate-1.5-2
  • Phase3_Technical_Spec/P2026-008_Phase3_MeetingMinutes.md → MM_Gate-MR1-3
  • Meeting-minutes/P2026-008_MM_COO-QC → MM_Gate-2-MR1

Compliance: 0/11 → 3/11 (waiting for Phase 0, 4, 4.5, MR2 gates)"
```

---

## Future Gates to Migrate

As phases complete, future MMs must follow v11.2 naming:

| Gate | Expected MM | Create When |
|------|-------------|-------------|
| 0→1 | `P2026-008_MM_Gate-0-1_YYYY-MM-DD.md` | Phase 0 Registration approval |
| 4→4.5 | `P2026-008_MM_Gate-4-4.5_YYYY-MM-DD.md` | Phase 4 Build completion |
| 4.5→MR2 | `P2026-008_MM_Gate-4.5-MR2_YYYY-MM-DD.md` | Phase 4.5 Deployment approval |
| MR2→5 | `P2026-008_MM_Gate-MR2-5_YYYY-MM-DD.md` | MR-2 Multi-Model Review completion |
| 6→BAU | `P2026-008_MM_Gate-6-BAU_YYYY-MM-DD.md` | Phase 6 Closeout approval |

**Important:** CEO must immediately move/rename MM after each Gate approval (SLA: 1 hour)

---

## Rollback Plan (if needed)

If migration goes wrong:

```bash
# 1. Restore from backup
rm -rf projects/P2026-008_ProjectDocuments/documents/meeting-minutes/
cp -r projects/P2026-008_ProjectDocuments/documents/meeting-minutes.backup_v11.1/ \
      projects/P2026-008_ProjectDocuments/documents/meeting-minutes/

# 2. Revert git commits
git revert HEAD~1  # Or git reset --hard HEAD~1 if not yet pushed

# 3. Notify team
echo "Rollback complete. Migration failed - revert to v11.1"
```

---

## Reference Documents

- **Gate Naming Map:** `protocols/gate-naming-map.md` (definitive source)
- **MM Guidelines:** `protocols/mm-compliance-guide.md` (Phase-by-Phase details)
- **Compliance Tool:** `bash protocols/check-mm-compliance.sh` (automated verification)
- **Protocol Summary:** `protocols/phase-gates.md` v11.2

---

**Estimated Total Time:** 40 minutes (including screenshots)

**Recommended Timeline:**
- PHASE A-B-C: Immediately (25 min)
- PHASE D: During next business day (as screenshots collected)
- PHASE E-F: Upon completion of PHASE D (4 min)

**Go/No-Go Decision:** If compliance check returns exit code 0, proceed to commit. If exit code >0, review errors before committing.
