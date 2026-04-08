#!/bin/bash
# Phase Sequence Validator v11.1
# Purpose: Block invalid phase transitions in PROJECT.json
# Enforces strict forward progression: 0→1→1.5→2→MR-1→3→4→4.5→MR-2→5→6

set -e

PROJECT_DOC="$1"
NEW_PHASE="$2"

if [[ ! -f "$PROJECT_DOC/PROJECT.json" ]]; then
  echo "❌ ERROR: PROJECT.json not found at $PROJECT_DOC"
  exit 1
fi

# Define valid sequence (in order)
VALID_SEQUENCE=("0" "1" "1.5" "2" "MR-1" "3" "4" "4.5" "MR-2" "5" "6")

# Get current phase from PROJECT.json
CURRENT_PHASE=$(jq -r '.phase // empty' "$PROJECT_DOC/PROJECT.json" 2>/dev/null | sed 's/Phase //')
if [[ -z "$CURRENT_PHASE" ]]; then
  echo "⚠️  WARNING: Current phase not found in PROJECT.json, allowing initialization"
  exit 0
fi

# Normalize phase inputs (remove "Phase " prefix if present)
NEW_PHASE=$(echo "$NEW_PHASE" | sed 's/^Phase //')

# Find indices in valid sequence
CURRENT_IDX=-1
NEW_IDX=-1

for i in "${!VALID_SEQUENCE[@]}"; do
  [[ "${VALID_SEQUENCE[$i]}" == "$CURRENT_PHASE" ]] && CURRENT_IDX=$i
  [[ "${VALID_SEQUENCE[$i]}" == "$NEW_PHASE" ]] && NEW_IDX=$i
done

# Validate transition
if [[ $CURRENT_IDX -eq -1 ]]; then
  echo "❌ REJECT: Current phase '$CURRENT_PHASE' not in valid sequence"
  echo "Valid phases: ${VALID_SEQUENCE[*]}"
  exit 1
fi

if [[ $NEW_IDX -eq -1 ]]; then
  echo "❌ REJECT: Target phase '$NEW_PHASE' not in valid sequence"
  echo "Valid phases: ${VALID_SEQUENCE[*]}"
  exit 1
fi

if [[ $NEW_IDX -le $CURRENT_IDX ]]; then
  echo "❌ REJECT: Cannot transition Phase $CURRENT_PHASE → Phase $NEW_PHASE"
  echo "Reason: Invalid backward or sideways movement"
  echo "Only forward progression allowed: ${VALID_SEQUENCE[*]}"
  exit 1
fi

echo "✅ ALLOW: Phase $CURRENT_PHASE → Phase $NEW_PHASE (valid forward progression)"
exit 0
