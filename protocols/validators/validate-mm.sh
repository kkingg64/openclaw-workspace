#!/bin/bash
# MM Format Validator v11.1
# Purpose: Block MM submission without Pre-Submission Self-Check block
# Ensures all gate submissions include mandatory verification evidence

MM_FILE="$1"
GATE="$2"

if [[ ! -f "$MM_FILE" ]]; then
  echo "❌ ERROR: MM file not found: $MM_FILE"
  exit 1
fi

# Check 1: Pre-Submission Self-Check block exists
if ! grep -q "## Pre-Submission Self-Check" "$MM_FILE"; then
  echo "❌ REJECTED: Missing '## Pre-Submission Self-Check' section"
  echo ""
  echo "❌ This MM cannot be approved without Pre-Submission Self-Check block."
  echo ""
  echo "Add this section before resubmission:"
  echo ""
  cat << 'EOF'
## Pre-Submission Self-Check

執行者：[YOUR_ROLE]
日期：[YYYY-MM-DD HH:MM HKT]

| 檢查項 | 結果 | 命令 Output |
|--------|------|------------|
| Compliance Check | ✅/❌ | [貼 bash protocols/compliance-check.sh output] |
| Phase Transition Valid | ✅/❌ | [貼 bash protocols/validators/phase-validator.sh output] |
| All Deliverables in Path | ✅/❌ | [貼 ls output] |
| Screenshots Filed | ✅/❌ | [列出 meeting-minutes/screenshots/ 檔案] |
| Evidence Freshness | ✅/❌ | [各檔案時間戳 < 24h] |
| Hard Check Results | ✅/❌ | [貼命令輸出，非聲稱] |

自查結論：[SELF_CHECK_PASSED / SELF_CHECK_FAILED]

EOF
  exit 1
fi

# Check 2: For Phase 3→4, require CISO_SAFE documentation section
if [[ "$GATE" == "3→4" ]]; then
  if ! grep -q "CISO_SAFE\|Security Verification" "$MM_FILE"; then
    echo "⚠️  WARNING: Phase 3→4 should reference CISO_SAFE documentation"
  fi
fi

# Check 3: For critical gates, verify some signature format exists
case "$GATE" in
  "2→MR1"|"3→4"|"4.5→MR2"|"5→6")
    if ! grep -q "\[.*_SIGNED\|APPROVED\|Signature" "$MM_FILE"; then
      echo "⚠️  WARNING: Gate-$GATE should include signature section"
    fi
    ;;
esac

echo "✅ PASSED: MM format valid, Pre-Submission Self-Check block present"
exit 0
