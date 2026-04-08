# {ProjectID} Multi-Model Review #1 (Phase 2 -> 3)
# Version: 2.0 — superpowers standard

Timestamp: YYYY-MM-DD HH:MM HKT
Executor: CTO
Scope: Tech Design + UAT Test Case + UI Spec

> **Iron Law:** A REVIEW_1_BLOCKED verdict freezes the project. No Phase 3 work begins
> until all BLOCK items are resolved and the full three-model review re-runs.

---

## Inputs

- Technical Spec Draft: `projects/{ProjectID}_ProjectDocuments/documents/Phase3_TechSpec/{ProjectID}_Technical_Spec.md`
- UAT: `projects/{ProjectID}_ProjectDocuments/documents/Phase2_Design/{ProjectID}_UAT_Test_Case.md`
- UI Spec: `projects/{ProjectID}_ProjectDocuments/documents/Phase2_Design/{ProjectID}_UI_Spec.md`
- Figma Exports: `projects/{ProjectID}_ProjectDocuments/figma/`

---

## Model 1 — Claude (Architecture + Security)

**Prompt used:**
```
You are reviewing the tech design and security posture for {ProjectID}.

Inputs:
- Technical Spec: [paste or attach {ProjectID}_Technical_Spec.md]
- Requirements: [paste or attach {ProjectID}_UAT_Test_Case.md]

Check:
1. Does the architecture match the stated requirements (nothing over/under-engineered)?
2. Are all OWASP Top 10 risks addressed? (auth, injection, secrets, access control)
3. Are there integration risks or unresolved dependencies (DB schema gaps, API contract gaps)?
4. Is the data model sufficient to support all UAT test cases?

Report:
- ✅ PASS (architecture sound, no security blocking issues)
- ⚠️ CONDITIONAL (fixable before Phase 3 start)
- ❌ BLOCK (fundamental problem — Phase 3 cannot start)

For each issue: file:line reference + severity (Critical/Important/Minor)
```

- Result: PASS | CONDITIONAL | BLOCK
- Evidence:

---

## Model 2 — Gemini (Spec Compliance — Do NOT trust implementer's report)

**Prompt used:**
```
You are reviewing spec compliance for the Phase 2 deliverables of {ProjectID}.

## What Was Requested (Requirements)
[paste {ProjectID}_UAT_Test_Case.md]

## What the Team Claims They've Designed
[paste {ProjectID}_Technical_Spec.md summary / CTO's Phase 2 completion report]

## CRITICAL: Do Not Trust the Report

Verify everything independently by reading the actual design documents.

DO NOT:
- Take their word for what they designed
- Trust claims about completeness
- Accept their interpretation of requirements

DO:
- Read the actual design documents
- Compare actual design to UAT requirements line by line
- Check for missing coverage of UAT scenarios
- Look for scope creep (extra features not in UAT)

Check:
- Missing requirements: Are all UAT test cases covered by the technical spec?
- Extra/unneeded scope: Did the team add things not in UAT?
- Misunderstandings: Did they interpret requirements differently than intended?

Report:
- ✅ Spec compliant (all UAT cases traceable to the technical spec)
- ❌ Issues found: [list specifically what's missing or extra, with document:section references]
```

- Result: PASS | CONDITIONAL | BLOCK
- Evidence:

---

## Model 3 — Copilot (Feasibility + Code Quality Risk)

**Prompt used:**
```
You are reviewing implementation feasibility and code quality risk for {ProjectID} Phase 2 design.

Inputs:
- Technical Spec: [paste {ProjectID}_Technical_Spec.md]
- MADHORSE Stack: Next.js 14+ App Router, TypeScript strict, Tailwind+shadcn/ui, PostgreSQL, Redis

Check:
1. Is this design buildable by a competent engineer in the estimated timeframe?
2. Are there anti-patterns in the proposed architecture (N+1 queries, God objects, missing error boundaries)?
3. Does each proposed module/file have one clear responsibility?
4. Are there testability risks (tightly coupled units, no dependency injection)?
5. Does the design allow for unit and integration tests without mocking everything?

Does each file have one clear responsibility with a well-defined interface?
Are units decomposed so they can be understood and tested independently?

Report:
- ✅ PASS (feasible, no critical quality risks)
- ⚠️ CONDITIONAL (fixable before Phase 3 start)
- ❌ BLOCK (design will cause quality/maintainability problems)

For each issue: section reference + severity (Critical/Important/Minor)
```

- Result: PASS | CONDITIONAL | BLOCK
- Evidence:

---

## Verdict

- Final: REVIEW_1_PASSED | REVIEW_1_CONDITIONAL | REVIEW_1_BLOCKED
- Required fixes:
- Re-run required: YES | NO

## Sign-off

- CTO:
- CISO (observer):
- Timestamp:
