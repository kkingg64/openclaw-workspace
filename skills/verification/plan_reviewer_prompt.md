# Plan Document Reviewer Prompt Template
# Version: 1.0 — sourced from superpowers_repo/writing-plans

**Purpose:** Verify the plan is complete, matches the spec, and has proper task decomposition before Phase 3 implementation begins.

**When to use:** After CTO completes Phase 2 (Tech Design + Plan document). Run before MR-1 or as part of MR-1 Model 2 review.

---

## Dispatch Template

```
Task tool (general-purpose):
  description: "Review plan document for {ProjectID}"
  prompt: |
    You are a plan document reviewer for {ProjectID}. Verify this plan is complete and
    ready for implementation.

    **Plan to review:** projects/{ProjectID}_ProjectDocuments/documents/Phase3_TechSpec/{ProjectID}_Technical_Spec.md
    **Spec for reference:** projects/{ProjectID}_ProjectDocuments/documents/Phase2_Design/{ProjectID}_UAT_Test_Case.md

    ## What to Check

    | Category | What to Look For |
    |----------|------------------|
    | Completeness | TODOs, placeholders, incomplete tasks, missing steps |
    | Spec Alignment | Plan covers all UAT test cases, no major scope creep |
    | Task Decomposition | Tasks have clear boundaries, steps are actionable |
    | File Paths | Each task specifies exact file paths to create/modify |
    | TDD Steps | Each implementation task has a test-first step before code step |
    | Buildability | Could an engineer follow this plan without getting stuck? |

    ## Calibration

    **Only flag issues that would cause real problems during implementation.**
    An implementer building the wrong thing or getting stuck is an issue.
    Minor wording, stylistic preferences, and "nice to have" suggestions are NOT issues.

    Approve unless there are serious gaps:
    - Missing requirements from the UAT spec
    - Contradictory steps
    - Placeholder content (TBD, TODO, ???)
    - Tasks so vague they can't be acted on
    - Missing file paths (engineer can't know where to write code)
    - No test step before code step (violates TDD mandate)

    ## Output Format

    ## Plan Review

    **Status:** Approved | Issues Found

    **Issues (if any):**
    - [Task X, Step Y]: [specific issue] — [why it matters for implementation]

    **Recommendations (advisory, do not block approval):**
    - [suggestions that would improve but aren't blockers]
```

---

## Integration with MR-1

When running MR-1 (Multi-Model Review #1), the plan reviewer prompt should be embedded
into **Model 2 — Gemini (Spec Compliance)** as an additional check alongside spec compliance.

If the plan document review returns "Issues Found" with any blocking issues:
- MR-1 verdict = REVIEW_1_BLOCKED (even if spec compliance otherwise passes)
- CTO must fix the plan and re-run the review

---

## Quality Bar: Plan Must Include

For every implementation task in the plan:
```
Task N: [Short title]
Files:
  - CREATE: src/path/to/new-file.ts
  - MODIFY: src/path/to/existing.ts

Steps:
  1. Write failing test for [specific behaviour]
  2. Run test — confirm RED
  3. Implement [specific code change]
  4. Run test — confirm GREEN
  5. Refactor if needed
```

A plan missing file paths or TDD steps is incomplete and must be rejected.
