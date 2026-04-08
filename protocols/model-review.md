# Multi-Model Review Protocol (v11.6)

> **Purpose:** 3-model review at MR-1 (Phase 2→3) and MR-2 (Phase 4.5→5) gates
> **Version:** v11.6  
> **Date:** 2026-04-03  
> **Gate 1:** 2→MR-1 (Design review) — CDO submits, 3 models score
> **Gate 2:** 4.5→MR-2 (Deployment + UAT prep review) — CTO/CISO submits, 3 models score
> **Referenced from:** `protocols/phase-gates.md` → Protocol Quick Reference → MR-1 / MR-2
> **Before this:** `protocols/phase2-design-workflow-v11.md` (Phase 2) OR `protocols/phase4.5-deployment-verification.md` (Phase 4.5)
> **After this:** Gate approval → `protocols/phase-transition.md` (5-step ritual)
> **Scoring Method:** Numeric (0-100), NOT binary PASS/FAIL. Equal weight across 3 dimensions.
> **Supersedes:** All previous MR protocol sections in phase-gates.md  
> **Scope:** MR-1 (Phase 2→3) and MR-2 (Phase 4.5→5)

---

## Overview

MR uses **numeric scoring** (0-100), NOT binary PASS/FAIL. Equal weight across 3 dimensions. Matches `phase2-design-workflow-v11.md`.

**Scoring:** Each model scores 3 dimensions (1-10 each). Formula: ((Dim1+Dim2+Dim3)/30)×100 → max 100.

| Score Band | Result |
|------------|--------|
| 90-100 | **PASS** |
| 85-89 | **Borderline Review** — CTO can approve with written rationale (max 2 consecutive, 3rd = FAIL) |
| <85 | **FAIL** — CDO/CTO fixes → that model re-scores |

**Gate Pass Rule:** All 3 models must be PASS or Borderline (with CTO rationale). Any FAIL blocks the gate.

---

## Models

| Model | Tool | Role | Min Score |
|-------|------|------|-----------|
| GPT-4.1 | `copilot_reviewer` | Strategy, design quality | ≥90 |
| Gemini 2.5 Flash | `gemini_advisor` | Spec compliance, token application | ≥90 |
| o4-mini | `copilot_reviewer(security_review)` | Technical feasibility, security | ≥90 |

---

## MR-1 (Phase 2→3) — CTO-led

### Scoring Dimensions

| Dimension | Description |
|-----------|-------------|
| Design Quality | UI/UX completeness, 4 states, WCAG 2.1 AA, consistency |
| Technical Feasibility | Can CTO build this? shadcn components available? Complexity realistic? |
| Token Application | All tokens from madhorse-cdo.json? HSL values correct? |

**Final Score = ((Design + Technical + Token) / 30) × 100** — Equal weight, (sum of 3 dims / 30) × 100 → max 100

### Invocation

CTO calls each model with the standard prompt from `phase2-design-workflow-v11.md` Section ⑤.

### Required Output (JSON)

Each model returns:

```json
{
  "model": "GPT-4.1|Gemini 2.5|o4-mini",
  "timestamp": "YYYY-MM-DD HH:MM UTC",
  "reviewer": "CTO",
  "submission_version": "vX.Y",
  "score": 90,
  "dimension_scores": {
    "design_quality": { "raw": 9 },
    "technical_feasibility": { "raw": 8 },
    "token_application": { "raw": 10 }
  },
  "findings": [
    {
      "dimension": "design_quality",
      "issue": "Button hover state missing",
      "severity": "major",
      "recommendation": "Add :hover pseudo-class to all button components"
    }
  ],
  "recommendation": "PASS|BORDERLINE|FAIL",
  "next_steps": []
}
```

### MR-1 Gate Check

CTO verifies:
1. All 3 models returned JSON with score and recommendation
2. All 3 models ≥90 OR Borderline with CTO rationale
3. No model <85 (any <85 = FAIL, must fix)
4. Document filed at: `projects/{ID}_ProjectDocuments/documents/Phase2_Design/{ID}_MR1_Output.json`

### Retry Path

```
Any model <90 → CDO fixes specific issue → that model re-scores
→ Attempt count +1 per model
→ Same model 2 consecutive Borderline (85-89) → automatic FAIL
→ Any model fails 5 times → CEO escalation
```

### Borderline Review (85-89)

If model scores 85-89:
1. CTO reviews findings
2. CTO documents written rationale for approval
3. **Max 2 consecutive Borderline for same model. 3rd attempt = automatic FAIL.**
4. If approved: proceed. If rejected: treat as FAIL.

---

## MR-2 (Phase 4.5→5) — CISO-led

### Scoring Dimensions

| Dimension | Description |
|-----------|-------------|
| Security | No vulnerabilities, CISO_SAFE, anti-patterns |
| Spec Compliance | Matches Technical Spec, no drift |
| Code Quality | Clean code, test coverage, no tech debt |

**Final Score = ((Security + Compliance + Quality) / 30) × 100** — Equal weight, (sum of 3 dims / 30) × 100 → max 100

### Invocation

CISO calls each model with context:
- Deployed code path: `projects/{ID}_ProjectDocuments/{codePath}/`
- Security scan results
- CISO_SAFE tag documentation
- Technical Spec reference

### Required Output (JSON)

Same structure as MR-1 with relevant dimensions.

### MR-2 Gate Check

CISO verifies:
1. All 3 models returned JSON with score and recommendation
2. All 3 models ≥90 OR Borderline with CISO rationale
3. No model <85
4. CISO_SAFE_TO_DEPLOY tag present in output

---

## MR Enforcer (Auto-verify)

CTO/CISO must run this before claiming MR PASS:

```bash
#!/bin/bash
# MR Enforcer — run after each MR session

PROJECT_ID="P2026-XXX"
MR_NUM="1"  # or 2
PHASE_DIR="Phase2_Design"  # or Phase4_5_DeployVerification

MR_FILE="projects/${PROJECT_ID}_ProjectDocuments/documents/${PHASE_DIR}/${PROJECT_ID}_MR${MR_NUM}_Output.json"

# Check 1: JSON file exists
test -f "$MR_FILE" && echo "FILE=OK" || { echo "FILE=MISSING ❌"; exit 1; }

# Check 2: jq available
jq --version > /dev/null 2>&1 || { echo "jq not installed ❌"; exit 1; }

# Check 3: All 3 models present
MODELS=$(jq '[.model] | length' "$MR_FILE")
echo "MODELS=$MODELS (must be 3)"

# Check 4: All scores >= 85
jq '[.score] | min' "$MR_FILE" | grep -qE '^[8-9][0-9]|[1][0-9]{2}$' && echo "SCORES=OK" || echo "SCORES=FAIL ❌"

# Check 5: No FAIL recommendations (only PASS|BORDERLINE)
FAIL_COUNT=$(jq '[.recommendation | select(. == "FAIL")] | length' "$MR_FILE")
echo "FAIL_COUNT=$FAIL_COUNT (must be 0)"

# Check 6: If BORDERLINE, CTO rationale present
BORDERLINE_COUNT=$(jq '[.recommendation | select(. == "BORDERLINE")] | length' "$MR_FILE")
if [ "$BORDERLINE_COUNT" -gt 0 ]; then
  RATIONALE=$(jq '[.findings[] | select(.severity == "borderline_rationale")] | length' "$MR_FILE")
  echo "BORDERLINE=$BORDERLINE_COUNT RATIONALE=$RATIONALE"
fi

# PASS if: MODELS=3 AND SCORES=OK AND FAIL_COUNT=0
```

**⛔ Iron Law:** No tool call = no score = cannot claim PASS. CTO/CISO is personally accountable.

---

## Output Template (JSON)

```json
{
  "model": "GPT-4.1",
  "timestamp": "YYYY-MM-DD HH:MM UTC",
  "reviewer": "CTO",
  "submission_version": "v1.0",
  "score": 90,
  "dimension_scores": {
    "design_quality": { "raw": 9 },
    "technical_feasibility": { "raw": 8 },
    "token_application": { "raw": 10 }
  },
  "findings": [
    {
      "dimension": "design_quality",
      "issue": "Button hover state missing",
      "severity": "major",
      "recommendation": "Add :hover pseudo-class to all button components"
    }
  ],
  "recommendation": "PASS",
  "next_steps": []
}
```

---

## Iron Laws

1. **No tool call = no score = cannot claim PASS**
2. **No JSON output = no verification = gate cannot advance**
3. **Any model <85 = FAIL** — must fix before gate can pass
4. **Max 2 consecutive Borderline per model, 3rd = automatic FAIL**
5. **3 models must all be PASS/Borderline before gate passes**
6. **CTO/CISO personal signature required on MR output**

---

## Sign-off

**Updated:** 2026-04-03 (v11.6)  
**Status:** ✅ APPROVED — 2026-04-03 by Boss (猫 @kasturn)  
**Changes:** v11.0: Replaced binary PASS/FAIL with numeric scoring. v11.6: Fixed scoring formula to ((Dim1+Dim2+Dim3)/30)×100.

**Supersedes:** phase-gates.md MR-1/MR-2 sections (v10.x)
