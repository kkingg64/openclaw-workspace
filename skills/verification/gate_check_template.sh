#!/usr/bin/env bash

set -euo pipefail

# Usage:
#   PROJECT_ID=P2026-008 \
#   PROJECT_DOC_ROOT=projects/P2026-008_ProjectDocuments \
#   ./skills/verification/gate_check_template.sh | tee \
#   projects/P2026-008_ProjectDocuments/documents/Phase4_5_DeployVerification/P2026-008_Gate_Check.log

PROJECT_ID="${PROJECT_ID:-}"
PROJECT_DOC_ROOT="${PROJECT_DOC_ROOT:-}"

if [[ -z "$PROJECT_ID" || -z "$PROJECT_DOC_ROOT" ]]; then
  echo "PROJECT_ID and PROJECT_DOC_ROOT are required"
  exit 1
fi

require_file() {
  local file_path="$1"
  if [[ ! -s "$file_path" ]]; then
    echo "FAIL: missing or empty -> $file_path"
    exit 1
  fi
  echo "PASS: exists -> $file_path"
}

reject_placeholder_text() {
  local file_path="$1"
  if grep -Ein "TBD|TODO|lorem ipsum|placeholder" "$file_path" >/dev/null 2>&1; then
    echo "FAIL: placeholder text found -> $file_path"
    grep -Ein "TBD|TODO|lorem ipsum|placeholder" "$file_path"
    exit 1
  fi
  echo "PASS: no placeholder text -> $file_path"
}

echo "=== Gate Check Start: $PROJECT_ID ==="

PHASE2_DIR="$PROJECT_DOC_ROOT/documents/Phase2_Design"
PHASE3_DIR="$PROJECT_DOC_ROOT/documents/Phase3_TechSpec"
PHASE4_DIR="$PROJECT_DOC_ROOT/documents/Phase4_Implementation"
PHASE45_DIR="$PROJECT_DOC_ROOT/documents/Phase4_5_DeployVerification"
PHASE5_DIR="$PROJECT_DOC_ROOT/documents/Phase5_UAT"

require_file "$PHASE2_DIR/${PROJECT_ID}_UI_Spec.md"
require_file "$PHASE2_DIR/${PROJECT_ID}_UAT_Test_Case.md"
require_file "$PHASE3_DIR/${PROJECT_ID}_Technical_Spec.md"
require_file "$PHASE4_DIR/${PROJECT_ID}_Version_and_Bug_List.md"
require_file "$PHASE45_DIR/${PROJECT_ID}_DeployVerification.md"
require_file "$PHASE5_DIR/${PROJECT_ID}_UAT_Test_Result.md"

reject_placeholder_text "$PHASE2_DIR/${PROJECT_ID}_UI_Spec.md"
reject_placeholder_text "$PHASE2_DIR/${PROJECT_ID}_UAT_Test_Case.md"
reject_placeholder_text "$PHASE3_DIR/${PROJECT_ID}_Technical_Spec.md"
reject_placeholder_text "$PHASE45_DIR/${PROJECT_ID}_DeployVerification.md"
reject_placeholder_text "$PHASE5_DIR/${PROJECT_ID}_UAT_Test_Result.md"

echo "PASS: manual checks still required ->"
echo "- Multi-model review evidence"
echo "- Fresh build output"
echo "- Production curl 200 evidence"
echo "- Anti-dummy scan"
echo "- Independent verifier sign-off"

echo "=== Gate Check Complete: $PROJECT_ID ==="
