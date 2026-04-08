# {ProjectID} Multi-Model Review #2 (Phase 4.5 -> 5)
# Version: 2.0 — superpowers standard

Timestamp: YYYY-MM-DD HH:MM HKT
Executor: CISO
Scope: Deployed code + UAT readiness + security + code quality

> **Iron Law:** A REVIEW_2_BLOCKED verdict prevents Phase 5 (UAT) from starting.
> All BLOCK items must be resolved and the full three-model review re-runs before any UAT session.

---

## Inputs

- Deploy Verification: `projects/{ProjectID}_ProjectDocuments/documents/Phase4_5_DeployVerification/{ProjectID}_DeployVerification.md`
- Bug List: `projects/{ProjectID}_ProjectDocuments/documents/Phase4_Implementation/{ProjectID}_Version_and_Bug_List.md`
- UAT Result Draft: `projects/{ProjectID}_ProjectDocuments/documents/Phase5_UAT/{ProjectID}_UAT_Test_Result.md`
- Source Code: `projects/{ProjectID}_<CodeName>/` (or equivalent)

---

## Model 1 — Claude (Security + OWASP)

**Prompt used:**
```
You are performing a security review for {ProjectID} before UAT begins.

Inputs:
- Deploy Verification: [paste {ProjectID}_DeployVerification.md]
- Bug List: [paste {ProjectID}_Version_and_Bug_List.md]

Check all OWASP Top 10:
A01 Broken Access Control    → Every API route has auth check?
A02 Cryptographic Failures   → Secrets in .env? HTTPS enforced?
A03 Injection                → SQL uses parameterized queries? XSS sanitized?
A05 Security Misconfiguration → .env not committed? CORS configured correctly?
A07 Auth Failures            → Session tokens have expiry? Rate limiting on login?
A09 Logging & Monitoring     → Error logs captured? No sensitive data in logs?

Also check:
- Are there any open bugs in the bug list that are security-related?
- Does the deployment verification show any misconfigurations?

Report:
- ✅ PASS (no security blocking issues)
- ⚠️ CONDITIONAL (fixable before UAT)
- ❌ BLOCK (security hole — UAT cannot begin)

For each issue: file:line reference + severity (Critical/Important/Minor)
```

- Result: PASS | CONDITIONAL | BLOCK
- Evidence:

---

## Model 2 — Gemini (UAT Spec Compliance — Do NOT trust the implementer's report)

**Prompt used:**
```
You are reviewing whether the implementation matches its specification for {ProjectID}.

## What Was Requested (UAT Test Cases)
[paste {ProjectID}_UAT_Test_Case.md]

## What the Team Claims They Built
[paste CTO's Phase 4 completion report / DeployVerification.md]

## CRITICAL: Do Not Trust the Report

The team finished implementation. Their report may be incomplete, inaccurate, or optimistic.
You MUST verify everything independently.

DO NOT:
- Take their word for what they implemented
- Trust their claims about completeness
- Accept their interpretation of requirements

DO:
- Read the actual code they wrote (at projects/{ProjectID}_<CodeName>/)
- Compare actual implementation to UAT test cases line by line
- Check for missing functionality they claimed to have built
- Look for extra features not in the UAT spec

Check:
- Missing requirements: Is every UAT test case implemented in the actual code?
- Extra/unneeded work: Did they build things not in the UAT spec?
- Misunderstandings: Did they interpret requirements differently than intended?

Verify by reading code, not by trusting the report.

Report:
- ✅ Spec compliant (all UAT cases implemented after code inspection)
- ❌ Issues found: [list specifically what's missing or extra, with file:line references]
```

- Result: PASS | CONDITIONAL | BLOCK
- Evidence:

---

## Model 3 — Copilot (Code Quality + Anti-Pattern)

**Prompt used:**
```
You are performing a code quality review for {ProjectID}.

## What Was Implemented
[paste CTO's Phase 4 implementation summary]

## Requirements Reference
Phase 4 tasks from [paste {ProjectID}_Technical_Spec.md task breakdown]

## Code to Review
[attach or reference projects/{ProjectID}_<CodeName>/]

Standard code quality checks:
1. Single Responsibility — Does each file/module have one clear responsibility?
2. Independent Testability — Are units decomposed so they can be understood and tested independently?
3. File structure — Does the implementation follow the file structure from the tech design?
4. File size — Did this change create bloated files? (>300 lines is a warning sign; flag new large files only, not pre-existing)
5. Error handling — Are async errors caught? Are user-facing errors human-readable?
6. TypeScript — No `any` types? Strict null checks honored?
7. Security — No hardcoded credentials, no console.log of sensitive data?
8. Performance — N+1 queries? Missing database indexes?

Report format:

## Code Quality Review

**Strengths:**
- [what was done well]

**Issues:**
- [Critical] file:line — [description]
- [Important] file:line — [description]
- [Minor] file:line — [description]

**Assessment:** PASS | CONDITIONAL | BLOCK
```

- Result: PASS | CONDITIONAL | BLOCK
- Evidence:

---

## Verdict

- Final: REVIEW_2_PASSED | REVIEW_2_CONDITIONAL | REVIEW_2_BLOCKED
- Required fixes:
- Re-run required: YES | NO

## Sign-off

- CISO:
- COO (business acceptance):
- Timestamp:
