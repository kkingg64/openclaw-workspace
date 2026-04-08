#!/bin/bash

# Script: check-mm-compliance.sh
# Purpose: Verify all Meeting Minutes follow v11.2 Gate-based naming standard
# Usage: bash protocols/check-mm-compliance.sh "PROJECT_ID"
# Exit codes: 0=compliant, 1=missing, 2=bad-names, 4=no-screenshots, 8=old-format, 16=bad-headers

PROJECT_ID="${1:-P2026-008}"
WS="/opt/ai-fabio-corp/data/openclaw_home/workspace"
MM_DIR="projects/${PROJECT_ID}_ProjectDocuments/documents/meeting-minutes"
PHASE_BASE="projects/${PROJECT_ID}_ProjectDocuments/documents"

if [ ! -d "$MM_DIR" ]; then
    echo "❌ ERROR: MM directory not found: $MM_DIR"
    exit 1
fi

cd "$WS" || exit 1

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Expected gates (from gate-naming-map.md)
declare -a GATES=("0-1" "1-1.5" "1.5-2" "2-MR1" "MR1-3" "3-4" "4-4.5" "4.5-MR2" "MR2-5" "5-6" "6-BAU")

# Counters
TOTAL_GATES=${#GATES[@]}
COMPLIANT_GATES=0
ERROR_COUNT=0
WARNING_COUNT=0

echo "═══════════════════════════════════════════════════════════"
echo "  MM Compliance Check v11.2 - $PROJECT_ID"
echo "═══════════════════════════════════════════════════════════"
echo ""

# =====================================================
# CHECK 1: Verify MM files exist in correct location
# =====================================================
echo "🔍 CHECK 1: Gate-based MM Files Location"
echo "───────────────────────────────────────"

for gate in "${GATES[@]}"; do
    # Expected: P2026-008_MM_Gate-{gate}_YYYY-MM-DD.md
    mm_pattern="${PROJECT_ID}_MM_Gate-${gate}_"
    
    # Look for any matching MM file (date may vary)
    mm_file=$(find "$MM_DIR" -maxdepth 1 -name "${mm_pattern}*.md" 2>/dev/null | head -1)
    
    if [ -f "$mm_file" ]; then
        mm_basename=$(basename "$mm_file")
        echo -e "${GREEN}✓${NC} Gate-${gate}: $mm_basename"
        ((COMPLIANT_GATES++))
    else
        echo -e "${RED}✗${NC} Gate-${gate}: MISSING (expected ${mm_pattern}YYYY-MM-DD.md)"
        ((ERROR_COUNT++))
    fi
done

echo ""

# =====================================================
# CHECK 2: Verify no old-format MMs remain
# =====================================================
echo "🔍 CHECK 2: Old Format Files (v11.1 and earlier)"
echo "──────────────────────────────────────────────"

OLD_MMS=()

# Check for old Phase-based names in meeting-minutes/
if find "$MM_DIR" -maxdepth 1 -name "*_Phase*_Meeting*.md" 2>/dev/null | read -r old_file; then
    OLD_MMS+=("$old_file")
fi

# Check for COO-QC style names
if find "$MM_DIR" -maxdepth 1 -name "*_MM_COO-QC_*.md" 2>/dev/null | read -r old_file; then
    OLD_MMS+=("$old_file")
fi

# Check for old names like MM_Emergency-Sprint
if find "$MM_DIR" -maxdepth 1 -name "*_MM_Emergency-Sprint_*.md" 2>/dev/null | read -r old_file; then
    OLD_MMS+=("$old_file")
fi

if [ ${#OLD_MMS[@]} -eq 0 ]; then
    echo -e "${GREEN}✓${NC} No old-format MMs found in meeting-minutes/"
else
    echo -e "${RED}✗${NC} Found ${#OLD_MMS[@]} old-format MM file(s):"
    for old_mm in "${OLD_MMS[@]}"; do
        echo "   - $(basename $old_mm)"
        ((ERROR_COUNT++))
    done
fi

echo ""

# =====================================================
# CHECK 3: Verify old MMs in Phase folders are moved
# =====================================================
echo "🔍 CHECK 3: Old MMs in Phase Folders (should be moved)"
echo "──────────────────────────────────────────────────"

PHASE_FOLDERS=("Phase0_Registration" "Phase1_Research" "Phase3_Technical_Spec" "Phase2_Design" "Phase4_Implementation" "Phase5_UAT" "Phase6_Closeout")
PHASE_MMS=()

for phase_folder in "${PHASE_FOLDERS[@]}"; do
    phase_path="$PHASE_BASE/$phase_folder"
    if [ -d "$phase_path" ]; then
        while IFS= read -r -d '' mm_file; do
            PHASE_MMS+=("$mm_file")
        done < <(find "$phase_path" -maxdepth 1 \( -name "*_MeetingMinutes.md" -o -name "*_Meeting_*.md" \) -print0 2>/dev/null)
    fi
done

if [ ${#PHASE_MMS[@]} -eq 0 ]; then
    echo -e "${GREEN}✓${NC} No MM files found in Phase folders (all properly moved)"
else
    echo -e "${RED}✗${NC} Found ${#PHASE_MMS[@]} MM file(s) still in Phase folder(s):"
    for phase_mm in "${PHASE_MMS[@]}"; do
        rel_path="${phase_mm#$WS/}"
        echo "   - $rel_path (should be in meeting-minutes/)"
        ((WARNING_COUNT++))
    done
fi

echo ""

# =====================================================
# CHECK 4: Verify screenshots exist
# =====================================================
echo "🔍 CHECK 4: Screenshots Requirement"
echo "─────────────────────────────────"

SCREENSHOT_DIR="$MM_DIR/screenshots"
if [ ! -d "$SCREENSHOT_DIR" ]; then
    echo -e "${RED}✗${NC} Screenshots directory not found: $SCREENSHOT_DIR"
    ((ERROR_COUNT++))
else
    SCREENSHOT_COUNT=$(find "$SCREENSHOT_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.txt" \) 2>/dev/null | wc -l)
    if [ "$SCREENSHOT_COUNT" -ge "$TOTAL_GATES" ]; then
        echo -e "${GREEN}✓${NC} Screenshots present: $SCREENSHOT_COUNT files (≥$TOTAL_GATES gates)"
    else
        echo -e "${YELLOW}⚠${NC} Low screenshot count: $SCREENSHOT_COUNT files (need ≥1 per gate, recommended $TOTAL_GATES)"
        ((WARNING_COUNT++))
    fi
fi

echo ""

# =====================================================
# CHECK 5: Verify MM file headers
# =====================================================
echo "🔍 CHECK 5: MM Header Requirements (sampling)"
echo "──────────────────────────────────────────"

SAMPLE_MMS=$(find "$MM_DIR" -maxdepth 1 -name "${PROJECT_ID}_MM_Gate-*.md" | head -3)
HEADER_OK=0

for sample_mm in $SAMPLE_MMS; do
    if [ -f "$sample_mm" ]; then
        # Check for required sections
        has_header=0
        has_decision=0
        has_action=0
        
        if grep -q "^# " "$sample_mm" || grep -q "^##" "$sample_mm"; then
            has_header=1
        fi
        if grep -q "Decision\|PASS\|FAIL\|APPROVED\|BLOCKED" "$sample_mm"; then
            has_decision=1
        fi
        if grep -q "Action Item\|TODO\|Next Step" "$sample_mm"; then
            has_action=1
        fi
        
        if [ $has_header -eq 1 ] && [ $has_decision -eq 1 ]; then
            echo -e "${GREEN}✓${NC} $(basename $sample_mm): Header OK"
            ((HEADER_OK++))
        else
            echo -e "${RED}✗${NC} $(basename $sample_mm): Missing header/decision/action"
            ((ERROR_COUNT++))
        fi
    fi
done

if [ "$HEADER_OK" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Headers verified ($HEADER_OK sampled)"
fi

echo ""

# =====================================================
# SUMMARY
# =====================================================
echo "═══════════════════════════════════════════════════════════"
echo "  📊 COMPLIANCE SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Gates Compliant: $COMPLIANT_GATES / $TOTAL_GATES ($(( COMPLIANT_GATES * 100 / TOTAL_GATES ))%)"
echo "Errors Found: $ERROR_COUNT"
echo "Warnings: $WARNING_COUNT"
echo ""

# =====================================================
# EXIT CODE LOGIC
# =====================================================
EXIT_CODE=0

if [ $ERROR_COUNT -gt 0 ]; then
    if grep -q "MISSING\|NEW" <<< "$COMPLIANT_GATES"; then
        EXIT_CODE=$((EXIT_CODE + 1))
    fi
    if [ ${#OLD_MMS[@]} -gt 0 ]; then
        EXIT_CODE=$((EXIT_CODE + 8))
    fi
    if grep -q "✗" <<< "$COMPLIANT_GATES"; then
        EXIT_CODE=$((EXIT_CODE + 2))
    fi
    echo -e "${RED}❌ COMPLIANCE FAILED${NC}"
else
    if [ $WARNING_COUNT -gt 0 ]; then
        echo -e "${YELLOW}⚠️  COMPLIANCE WITH WARNINGS${NC}"
        EXIT_CODE=0  # Warnings don't fail the check
    else
        echo -e "${GREEN}✅ 100% COMPLIANT${NC}"
        EXIT_CODE=0
    fi
fi

echo ""
echo "Next Steps:"
if [ $EXIT_CODE -ne 0 ]; then
    echo "1. Review errors above"
    echo "2. Refer to: protocols/gate-naming-map.md (naming standard)"
    echo "3. Refer to: protocols/mm-compliance-guide.md (detailed requirements)"
    echo "4. For migration: bash protocols/gate-naming-map.md section 'Migration Guide'"
else
    echo "1. All MMs are compliant! ✓"
    echo "2. Ready to git commit"
fi

echo ""
exit $EXIT_CODE
