# Heartbeat Automation Protocol (v1.0)

> **Purpose:** Automatic HEARTBEAT.md state management tied to phase gate transitions
> **Version:** v1.0 (2026-04-03)
> **Owner:** CEO (final approver)
> **Automation:** Shell scripts + git hooks enforce updates at each gate
> **SLA:** HEARTBEAT.md MUST update within 15 minutes of gate approval

---

## Trigger Events → HEARTBEAT.md Updates

| Gate Event | Trigger | HEARTBEAT.md Change | Owner | Automation |
|-----------|---------|-------------------|-------|-----------|
| Gate 0→1 APPROVED | CEO approves registration | Add project to dashboard (Phase 1) | CEO | `update-heartbeat.sh` |
| Gate 1→1.5 APPROVED | COO approves research | Update phase (Phase 1.5) | COO | Script hook |
| Gate 1.5→2 APPROVED | CEO approves advisory | Update phase (Phase 2) | CEO | Script hook |
| Gate 2→MR1 APPROVED | CDO submits design | Update phase (Phase MR-1) | CDO | Script hook |
| Gate MR1→3 APPROVED | 3-Model passes | Update phase (Phase 3) | CTO | Script hook |
| Gate 3→4 APPROVED | CEO approves tech spec | Update phase (Phase 4) | CTO | Script hook |
| Gate 4→4.5 APPROVED | CISO blocks/approves build | Update phase (Phase 4.5) | CISO | Script hook |
| Gate 4.5→MR2 APPROVED | CISO approves deployment | Update phase (Phase MR-2) | CISO | Script hook |
| Gate MR2→5 APPROVED | 3-Model passes | Update phase (Phase 5 UAT) | CISO | Script hook |
| Gate 5→6 APPROVED | CEO approves closeout | Update phase (Phase 6 BAU) | CDO+CTO | Script hook |
| **Phase Rollback** | CEO orders rollback | Revert phase, add blocker note, timestamp | CEO | Manual + script |

---

## HEARTBEAT.md Automated Update Rules

### Rule 1: Project Health Dashboard Row Update
**When:** Any gate transition  
**Action:** Update single row for affected project

```bash
# Before:
| P2026-008 | MADHORSE HQ | Phase 6 BAU | 🟢 | — | 登入問題（見下）|

# After gate 5→6 APPROVED → becomes:
| P2026-008 | MADHORSE HQ | Phase 6 BAU | 🟢 | — | — |

# On ROLLBACK to Phase 4 → becomes:
| P2026-008 | MADHORSE HQ | Phase 4 (Rollback) | 🔴 | 4→4.5 | Deployment verification required |
```

**Script:** `protocols/scripts/update-dashboard.sh`
```bash
#!/bin/bash
PROJECT_ID=$1
NEW_PHASE=$2
GATE_STATUS=$3  # 🔴 🟡 🟢 ⚪
BLOCKER=$4      # or "—" if none

# Read current HEARTBEAT.md
# Find line with PROJECT_ID
# Replace phase + status + blocker
# Preserve formatting

sed -i "s/| $PROJECT_ID |.*| $PROJECT_ID | ${NEW_PHASE} | ${GATE_STATUS} | ${NEXT_GATE} | ${BLOCKER} |/" HEARTBEAT.md
```

---

### Rule 2: Blockers Section Update
**When:** Project → blocker state  
**Action:** Add/remove from Blockers table

```bash
# On gate failure:
| P2026-008 Rolled back to Phase 4 — environment verification in progress | CTO |

# On gate approval:
# (remove from blockers, move to green status in dashboard)
```

**Script:** `protocols/scripts/update-blockers.sh`
```bash
#!/bin/bash
PROJECT_ID=$1
BLOCKER_TEXT=$2
ACTION=$3  # "add" or "remove"

if [ "$ACTION" = "add" ]; then
  echo "| $PROJECT_ID $BLOCKER_TEXT | $OWNER |" >> HEARTBEAT.md (in Blockers table)
elif [ "$ACTION" = "remove" ]; then
  grep -v "$PROJECT_ID" HEARTBEAT.md > temp && mv temp HEARTBEAT.md
fi
```

---

### Rule 3: Activity Log Prepend
**When:** Any gate transition  
**Action:** Add timestamp + event to log (newest first)

```bash
# NEW entry (added to top of Activity Log):
### [2026-04-03 23:50 HKT] P2026-008 Gate 5→6 REJECTED
- CEO rejected Phase 5 UAT (login tests failing)
- Rollback approved to Phase 4
- CTO to re-verify deployment environment
```

**Script:** `protocols/scripts/update-activity-log.sh`
```bash
#!/bin/bash
PROJECT_ID=$1
EVENT_TEXT=$2

TIMESTAMP=$(date '+%Y-%m-%d %H:%M %Z')
LOG_ENTRY="### [${TIMESTAMP}] ${PROJECT_ID} ${EVENT_TEXT}"

# Insert after "## 📝 Activity Log..." header
# All new entries go to top
sed -i '/## 📝 Activity Log/a\
\n'"${LOG_ENTRY}" HEARTBEAT.md
```

---

### Rule 4: Status Indicator (🔴 🟡 🟢 ⚪) Auto-Assignment
**When:** Phase and blocker status changes  
**Action:** Auto-set status icon

| Condition | Icon | Meaning |
|-----------|------|---------|
| Phase ≤ 1.5 (early) | ⚪ | Not started / pending approval |
| Phase 2-4 + no blocker | 🟡 | In progress (normal) |
| Phase ≥ 5 + no blocker | 🟢 | Healthy / proceeding |
| ANY phase + blocker exists | 🔴 | Blocked / attention needed |
| Phase rolled back | 🔴 | Critical (rollback in progress) |

**Script:** `protocols/scripts/assign-status-icon.sh`
```bash
#!/bin/bash
PHASE=$1
BLOCKER=$2

if [ "$PHASE" = "0" ] || [ "$PHASE" = "1" ] || [ "$PHASE" = "1.5" ]; then
  ICON="⚪"
elif [ -n "$BLOCKER" ] || [[ "$PHASE" == *"Rollback"* ]]; then
  ICON="🔴"
elif [ "$PHASE" = "2" ] || [ "$PHASE" = "3" ] || [ "$PHASE" = "4" ] || [ "$PHASE" = "4.5" ] || [ "$PHASE" = "MR-1" ] || [ "$PHASE" = "MR-2" ]; then
  ICON="🟡"
else  # Phase 5, 6
  ICON="🟢"
fi

echo "$ICON"
```

---

## Automation Trigger Points

### On Gate Approval (via phase-transition.md ritual)

**After CEO approves gate → Automation runs:**

1. ✅ `update-dashboard.sh` — Update project row
2. ✅ `assign-status-icon.sh` — Set status color
3. ✅ `update-blockers.sh remove` — Clear blocker if previously blocked
4. ✅ `update-activity-log.sh` — Add gate approval event
5. ✅ `git add HEARTBEAT.md && git commit -m "HEARTBEAT: P{ID} → Phase X approved"`

### On Gate Rejection/Rollback

**When CEO rejects or rollbacks:**

1. ✅ `update-dashboard.sh` — Revert phase
2. ✅ `assign-status-icon.sh` — Set to 🔴
3. ✅ `update-blockers.sh add` — Add blocker reason
4. ✅ `update-activity-log.sh` — Add rollback event
5. ✅ `git add HEARTBEAT.md && git commit -m "HEARTBEAT: P{ID} rolled back to Phase X"`

---

## Git Hook Integration

**File:** `.git/hooks/post-receive` or `.git/hooks/post-merge`

```bash
#!/bin/bash

# When ANY phase gate file is updated (e.g., MR-1 vote approved, Phase 5 UAT complete):
# 1. Detect which project changed
# 2. Determine new phase from file path
# 3. Call heartbeat update scripts
# 4. Auto-commit HEARTBEAT.md

PHASE_FILES=$(git diff HEAD~1 --name-only | grep "documents/Phase[0-9]")

for FILE in $PHASE_FILES; do
  PROJECT_ID=$(echo $FILE | grep -o "P[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9]")
  PHASE=$(echo $FILE | grep -o "Phase[0-9]\\.[0-9]\\|Phase[0-9]\\|MR-[0-9]")
  
  if [ -n "$PROJECT_ID" ] && [ -n "$PHASE" ]; then
    ./protocols/scripts/update-dashboard.sh $PROJECT_ID "$PHASE"
    ./protocols/scripts/update-activity-log.sh $PROJECT_ID "Gate transition to $PHASE"
    
    git add HEARTBEAT.md
    git commit -m "HEARTBEAT: $PROJECT_ID → $PHASE (auto-update)"
  fi
done
```

---

## Manual Rollback Command

**When CEO orders rollback:**

```bash
# Usage: ./heartbeat-rollback.sh {PROJECT_ID} {NEW_PHASE} {BLOCKER_REASON}
# Example: ./heartbeat-rollback.sh P2026-008 "Phase 4" "Deployment verification required"

#!/bin/bash
PROJECT_ID=$1
NEW_PHASE=$2
BLOCKER_REASON=$3

./protocols/scripts/update-dashboard.sh "$PROJECT_ID" "$NEW_PHASE" "🔴" "$BLOCKER_REASON"
./protocols/scripts/update-blockers.sh "$PROJECT_ID" "$BLOCKER_REASON" "add"
./protocols/scripts/update-activity-log.sh "$PROJECT_ID" "Rolled back to $NEW_PHASE — $BLOCKER_REASON"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M %Z')
sed -i "s/*版本.*/*版本: v4.0 | 最後更新: $TIMESTAMP HKT/" HEARTBEAT.md

git add HEARTBEAT.md
git commit -m "HEARTBEAT: $PROJECT_ID rolled back to $NEW_PHASE"
```

---

## HEARTBEAT.md Update SLA

| Event | SLA | Escalation |
|-------|-----|-----------|
| Gate approved → HEARTBEAT updated | 15 minutes | Auto-alert if delayed |
| Blocker added | 5 minutes | Real-time notification |
| Rollback executed | Immediate | CEO confirms via script |
| Activity log stale | Max 4 hours | Daily audit report |

---

## Validation Rules (Pre-Update)

Before HEARTBEAT.md is modified, validate:

| Check | Requirement | Failure |
|-------|-------------|---------|
| Project exists | PROJECT_ID in Projects/ folder | ❌ Abort, notify CEO |
| Phase is valid | Phase ∈ (0,1,1.5,2,MR1,3,4,4.5,MR2,5,6,BAU) | ❌ Abort, notify CEO |
| Phase sequence correct | New phase ≥ current phase (or rollback approved) | ❌ Abort, reject gate |
| Blocker has owner | If blocker added, owner must be specified | ❌ Abort, request owner |
| Timestamp valid | Use system time, not manual | ❌ Use current time |

---

## Integration with phase-gates.md

**Connection:** When CEO approves gate in `phase-gates.md`, `heartbeat-update-protocol.md` **automatically triggers**

```bash
# In phase-gates.md Gate Approval Ritual (step 3):
CEO approval → Execute heartbeat update script
  → HEARTBEAT.md auto-updates
  → Activity log auto-populates
  → Git auto-commits
```

**Never manual edit HEARTBEAT.md for phase changes.**

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-04-03 | Initial automation protocol with 4 update rules, git hooks, rollback command, SLA + validation |
