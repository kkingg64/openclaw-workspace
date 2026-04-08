#!/usr/bin/env bash
# =============================================================
# MADHORSE Compliance Check v10.3
# Usage: bash protocols/compliance-check.sh <DOCS_DIR> <PHASE>
# Example: bash protocols/compliance-check.sh projects/P2026-008_ProjectDocuments Phase3
#
# Exit code: 0 = ALL PASS, 1 = FAILURES FOUND
# =============================================================

set -euo pipefail

DOCS="${1:-}"
PHASE="${2:-Phase0}"
ID=""
PASS=0
FAIL=0
WARN=0

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ok()   { echo -e "  ${GREEN}✅ PASS${NC} — $1"; PASS=$((PASS+1)); }
fail() { echo -e "  ${RED}❌ FAIL${NC} — $1"; FAIL=$((FAIL+1)); }
warn() { echo -e "  ${YELLOW}⚠️  WARN${NC} — $1"; WARN=$((WARN+1)); }

if [[ -z "$DOCS" ]]; then
  echo "Usage: bash protocols/compliance-check.sh <DOCS_DIR> <PHASE>"
  echo "Example: bash protocols/compliance-check.sh projects/P2026-008_ProjectDocuments Phase3"
  exit 1
fi

if [[ ! -d "$DOCS" ]]; then
  echo "❌ Directory not found: $DOCS"
  exit 1
fi

# Extract project ID from folder name
ID=$(basename "$DOCS" | grep -oE 'P[0-9]{4}-[0-9]{3}' || echo "UNKNOWN")

echo "=================================================="
echo "  MADHORSE Compliance Check v10.3"
echo "  Project : $ID"
echo "  Docs    : $DOCS"
echo "  Phase   : $PHASE"
echo "  Date    : $(date '+%Y-%m-%d %H:%M HKT')"
echo "=================================================="
echo ""

# Resolve PHASE_NUM early (needed by stale check in Section 1)
PHASE_NUM=0
case "$PHASE" in
  Phase1*|"Phase 1"*)   PHASE_NUM=1 ;;
  Phase1.5*|"Phase 1.5"*) PHASE_NUM=2 ;;
  Phase2*|"Phase 2"*)   PHASE_NUM=3 ;;
  MR*|"MR"*)            PHASE_NUM=4 ;;
  Phase3*|"Phase 3"*)   PHASE_NUM=5 ;;
  Phase4*|"Phase 4"*)   PHASE_NUM=6 ;;
  Phase4.5*|"Phase 4.5"*) PHASE_NUM=7 ;;
  Phase5*|"Phase 5"*)   PHASE_NUM=8 ;;
  Phase6*|"Phase 6"*)   PHASE_NUM=9 ;;
  BAU*)                 PHASE_NUM=10 ;;
esac

# ----------------------------------------------------------
# SECTION 1: PROJECT.json Health
# ----------------------------------------------------------
echo "─── [1] PROJECT.json Health ───"

JSON="$DOCS/PROJECT.json"
if [[ -f "$JSON" ]]; then
  ok "PROJECT.json exists"
  
  PROJ_PHASE=$(grep '"phase"' "$JSON" 2>/dev/null | grep -oE '"Phase [^"]*"|"BAU"' | tr -d '"' | head -1 || true)
  PROJ_PHASE="${PROJ_PHASE:-unknown}"
  if [[ "$PROJ_PHASE" == "Phase 0" && "$PHASE_NUM" -gt 1 ]]; then
    fail "PROJECT.json phase='Phase 0' but current phase is $PHASE — stale, needs update"
  else
    ok "PROJECT.json phase='$PROJ_PHASE'"
  fi

  CODE_PATH=$(grep '"codePath"' "$JSON" 2>/dev/null | grep -oE '"projects/[^"]*"' | tr -d '"' || true)
  if [[ -n "$CODE_PATH" ]] && [[ ! -d "$CODE_PATH" ]]; then
    fail "codePath='$CODE_PATH' does not exist on disk"
  elif [[ -n "$CODE_PATH" ]]; then
    ok "codePath='$CODE_PATH' exists"
  else
    warn "codePath not set in PROJECT.json"
  fi
else
  fail "PROJECT.json missing"
fi
echo ""

# ----------------------------------------------------------
# SECTION 2: Phase Deliverables
# ----------------------------------------------------------
echo "─── [2] Required Deliverables ───"

phase_check() {
  local phase_dir="$1"
  local file_pattern="$2"
  local label="$3"
  local found
  found=$(find "$DOCS/documents/$phase_dir" -name "$file_pattern" 2>/dev/null | grep -v ".trash" | wc -l || true)
  if [[ "$found" -gt 0 ]]; then
    ok "$label (found: $found)"
  else
    fail "$label missing in $DOCS/documents/$phase_dir/"
  fi
}

# Check based on how far the project has progressed

[[ $PHASE_NUM -ge 1 ]] && phase_check "Phase0_Registration"  "*Registration*"       "Phase 0: Registration doc"
[[ $PHASE_NUM -ge 1 ]] && phase_check "Phase1_Research"      "*Research*"           "Phase 1: Research.md"
[[ $PHASE_NUM -ge 1 ]] && phase_check "Phase1_Research"      "*Requirements*"       "Phase 1: Requirements.md"
[[ $PHASE_NUM -ge 2 ]] && phase_check "Phase1_Research"      "*AI_Advisor_QA*"      "Phase 1.5: AI_Advisor_QA.md"
[[ $PHASE_NUM -ge 2 ]] && {
  # Also check it's NOT only in trash
  IN_TRASH=$(find "$DOCS" -path "*trash*" -name "*AI_Advisor_QA*" 2>/dev/null | wc -l)
  IN_LIVE=$(find "$DOCS/documents/Phase1_Research" -name "*AI_Advisor_QA*" 2>/dev/null | grep -v ".trash" | wc -l)
  if [[ "$IN_TRASH" -gt 0 && "$IN_LIVE" -eq 0 ]]; then
    fail "AI_Advisor_QA.md is in .trash but NOT in Phase1_Research/ — must restore"
  fi
}
[[ $PHASE_NUM -ge 3 ]] && phase_check "Phase2_Design"        "*UI_Spec*"            "Phase 2: UI_Spec.md"
[[ $PHASE_NUM -ge 3 ]] && phase_check "Phase2_Design"        "*CDO_Design_Brief*"   "Phase 2: CDO_Design_Brief.md"
[[ $PHASE_NUM -ge 3 ]] && phase_check "Phase2_Design"        "*UAT_Test*"           "Phase 2: UAT_Test_Cases or Results"
[[ $PHASE_NUM -ge 3 ]] && {
  EXPORTS=$(find "$DOCS/designs/exports" -name "*.png" 2>/dev/null | wc -l)
  # Count screens defined in UI_Spec (## N. headings that are page-level)
  UI_SPEC=$(find "$DOCS/documents/Phase2_Design" -name "*UI_Spec*" 2>/dev/null | head -1)
  if [[ -f "$UI_SPEC" ]]; then
    # Count top-level page sections (## N. Xxx Page pattern)
    SCREEN_COUNT=$(grep -cE "^## [0-9]+\. .*(Page|page|Screen|screen|\`/)" "$UI_SPEC" 2>/dev/null || echo "0")
    # If pattern doesn't match, fall back to counting ## sections (minus overview/global sections)
    if [[ "$SCREEN_COUNT" -lt 1 ]]; then
      SCREEN_COUNT=$(grep -cE "^## [0-9]" "$UI_SPEC" 2>/dev/null || echo "1")
      SCREEN_COUNT=$(( SCREEN_COUNT > 3 ? SCREEN_COUNT - 3 : 1 ))  # subtract overhead sections
    fi
  else
    SCREEN_COUNT=3  # conservative minimum for any multi-page project
  fi

  if [[ "$EXPORTS" -lt 1 ]]; then
    fail "designs/exports/ has NO PNG exports (UI_Spec defines ~$SCREEN_COUNT screens)"
  elif [[ "$EXPORTS" -lt "$SCREEN_COUNT" ]]; then
    fail "designs/exports/ has $EXPORTS PNG(s) but UI_Spec defines ~$SCREEN_COUNT screens — INCOMPLETE exports, Gate BLOCKED"
  else
    ok "designs/exports/ has $EXPORTS PNG(s) covering ~$SCREEN_COUNT screen(s) ✓"
  fi
}
[[ $PHASE_NUM -ge 5 ]] && phase_check "Phase3_Technical_Spec" "*Technical_Spec*"    "Phase 3: Technical_Spec.md"
[[ $PHASE_NUM -ge 5 ]] && phase_check "Phase3_Technical_Spec" "*Implementation*"    "Phase 3: Implementation_Plan.md"
echo ""

# ----------------------------------------------------------
# SECTION 3: Meeting Minutes Compliance
# ----------------------------------------------------------
echo "─── [3] Meeting Minutes ───"

MM_DIR="$DOCS/documents/meeting-minutes"
if [[ -d "$MM_DIR" ]]; then
  MM_COUNT=$(find "$MM_DIR" -name "*.md" ! -name "TEMPLATE*" 2>/dev/null | wc -l)
  if [[ "$MM_COUNT" -gt 0 ]]; then
    ok "meeting-minutes/ has $MM_COUNT MM file(s)"
  else
    fail "meeting-minutes/ exists but contains only templates — no actual MM filed"
  fi
  
  # Check screenshots dir
  SS_DIR="$MM_DIR/screenshots"
  if [[ -d "$SS_DIR" ]]; then
    SS_COUNT=$(find "$SS_DIR" -type f 2>/dev/null | wc -l)
    if [[ "$SS_COUNT" -gt 0 ]]; then
      ok "screenshots/ has $SS_COUNT file(s)"
    else
      warn "screenshots/ directory empty — deliverable screenshots not taken"
    fi
  else
    warn "meeting-minutes/screenshots/ directory missing"
  fi
else
  fail "meeting-minutes/ directory missing"
fi
echo ""

# ----------------------------------------------------------
# SECTION 4: CEO Approval Tags
# ----------------------------------------------------------
echo "─── [4] CEO Approval Tags ───"

# Check for v10.2 5-tag signatures across all MM files
CROSS_EXAM=$(grep -r '\[CROSS_EXAM' "$DOCS/documents" 2>/dev/null | grep -v "TEMPLATE" | wc -l || true)
EVIDENCE_TAG=$(grep -r '\[EVIDENCE\]' "$DOCS/documents" 2>/dev/null | grep -v "TEMPLATE" | wc -l || true)
SCREENSHOTS_TAG=$(grep -r '\[SCREENSHOTS' "$DOCS/documents" 2>/dev/null | grep -v "TEMPLATE" | wc -l || true)
SENT_TO_BOSS=$(grep -r '\[SENT_TO_BOSS' "$DOCS/documents" 2>/dev/null | grep -v "TEMPLATE" | wc -l || true)

[[ "$CROSS_EXAM" -gt 0 ]]     && ok "[CROSS_EXAM] tags found ($CROSS_EXAM)" \
                               || fail "No [CROSS_EXAM] tags — CEO Cross-Examination never done"
[[ "$EVIDENCE_TAG" -gt 0 ]]   && ok "[EVIDENCE] tags found ($EVIDENCE_TAG)" \
                               || fail "No [EVIDENCE] tags — Hard Check outputs never recorded"
[[ "$SCREENSHOTS_TAG" -gt 0 ]] && ok "[SCREENSHOTS] tags found ($SCREENSHOTS_TAG)" \
                               || warn "No [SCREENSHOTS] tags — screenshot evidence unclear"
[[ "$SENT_TO_BOSS" -gt 0 ]]   && ok "[SENT_TO_BOSS] tags found ($SENT_TO_BOSS)" \
                               || fail "No [SENT_TO_BOSS] — Boss was never notified of approvals"
echo ""

# ----------------------------------------------------------
# SECTION 5: AI Advisor Source Tags (Phase 1.5+)
# ----------------------------------------------------------
if [[ $PHASE_NUM -ge 2 ]]; then
  echo "─── [5] AI Advisor Source Tags ───"
  QA_FILE=$(find "$DOCS/documents/Phase1_Research" -name "*AI_Advisor_QA*" ! -path "*trash*" -o \
             -path "*Phase1_Research*AI_Advisor_QA*" 2>/dev/null | head -1)
  if [[ -f "$QA_FILE" ]]; then
    SOURCE_COUNT=$(grep -c '\[Source:' "$QA_FILE" 2>/dev/null || true)
    UNAVAIL=$(grep -c 'UNAVAILABLE' "$QA_FILE" 2>/dev/null || true)
    REAL=$((SOURCE_COUNT - UNAVAIL))
    if [[ "$REAL" -ge 2 ]]; then
      ok "AI Advisor: $REAL real tool call(s) with [Source:] tags"
    else
      fail "AI Advisor: only $REAL real [Source:] tags (need ≥ 2, found $SOURCE_COUNT total, $UNAVAIL UNAVAILABLE)"
    fi
  else
    fail "AI_Advisor_QA.md not found in Phase1_Research (may be in trash)"
  fi
  echo ""
fi

# ----------------------------------------------------------
# SECTION 6: Security (Phase 3+)
# ----------------------------------------------------------
if [[ $PHASE_NUM -ge 5 ]]; then
  echo "─── [6] Security Sign-off ───"
  
  CISO_SAFE=$(grep -r 'CISO_SAFE_TO_DEPLOY\|CISO_SAFE' "$DOCS/documents" 2>/dev/null \
    | grep -v "TEMPLATE\|anti-dummy\|compliance-check" | wc -l || true)
  if [[ "$CISO_SAFE" -gt 0 ]]; then
    ok "CISO_SAFE sign-off found"
  else
    fail "CISO_SAFE_TO_DEPLOY missing — CISO security sign-off not recorded"
  fi
  echo ""
fi

# ----------------------------------------------------------
# SECTION 7: Test Coverage (Phase 4+)
# ----------------------------------------------------------
if [[ $PHASE_NUM -ge 6 ]]; then
  echo "─── [7] Test Coverage ───"
  
  # Try to find the code directory from PROJECT.json
  CODE_PATH=$(grep '"codePath"' "$DOCS/PROJECT.json" 2>/dev/null \
    | grep -oE '"projects/[^"]*"' | tr -d '"' || echo "")
  
  if [[ -n "$CODE_PATH" && -d "$CODE_PATH" ]]; then
    TEST_COUNT=$(find "$CODE_PATH" -name "*.test.*" -o -name "*.spec.*" \
      2>/dev/null | grep -v node_modules | wc -l)
    if [[ "$TEST_COUNT" -gt 0 ]]; then
      ok "Test files found: $TEST_COUNT"
    else
      fail "Zero test files in $CODE_PATH — TDD not followed"
    fi
  else
    warn "Cannot locate code directory from PROJECT.json — manual test check required"
  fi
  echo ""
fi

# ----------------------------------------------------------
# SUMMARY
# ----------------------------------------------------------
echo "=================================================="
echo "  COMPLIANCE SUMMARY"
echo "=================================================="
echo -e "  ${GREEN}PASS${NC}  : $PASS"
echo -e "  ${YELLOW}WARN${NC}  : $WARN"
echo -e "  ${RED}FAIL${NC}  : $FAIL"
echo ""

TOTAL=$((PASS + FAIL))
if [[ "$TOTAL" -gt 0 ]]; then
  SCORE=$(( (PASS * 100) / TOTAL ))
else
  SCORE=0
fi

echo -e "  Compliance Score: ${SCORE}%"
echo ""

if [[ "$FAIL" -gt 0 ]]; then
  echo -e "  ${RED}⛔ GATE BLOCKED — $FAIL issue(s) must be fixed before CEO approval${NC}"
  echo ""
  echo "  Action: Fix all ❌ items, re-run this script, then submit to CEO."
  exit 1
elif [[ "$WARN" -gt 0 ]]; then
  echo -e "  ${YELLOW}⚠️  CONDITIONAL PASS — $WARN warning(s) should be addressed${NC}"
  echo ""
  exit 0
else
  echo -e "  ${GREEN}✅ FULL COMPLIANCE — Safe to submit to CEO for approval${NC}"
  echo ""
  exit 0
fi
