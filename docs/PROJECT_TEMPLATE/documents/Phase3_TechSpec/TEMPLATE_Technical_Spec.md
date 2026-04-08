# {PROJECT_ID} Technical Specification

**Date:** YYYY-MM-DD HH:MM HKT
**Owner:** CTO
**Verifier:** CISO

> **For agents:** Use superpowers:subagent-driven-development to execute task-by-task.

---

## 1. Goal

[One sentence describing what this phase delivers.]

## 2. Architecture

[2-3 sentences describing the overall approach.]

## 3. Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | [e.g. Next.js 14+ App Router] | |
| Styling | [e.g. Tailwind + shadcn/ui] | |
| Backend | [e.g. Next.js API routes] | |
| Database | [e.g. PostgreSQL] | |
| Auth | [e.g. NextAuth] | |

## 4. Module Boundaries

| Module | Responsibility | Interface |
|--------|---------------|-----------|
| [module name] | [what it does] | [how consumers use it] |

## 5. Data Model

[Schema, API shape, or data flow as relevant.]

## 6. Security Considerations

- [ ] Auth on all protected routes
- [ ] Secrets in `.env` only
- [ ] Input validation at system boundaries
- [ ] CORS configured
- [ ] No sensitive data in logs

## 7. Implementation Plan

### Task 1: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Test: `exact/path/to/test.ts`

- [ ] Step 1: Write failing test for [specific behavior]
- [ ] Step 2: Run → verify FAIL
- [ ] Step 3: Write minimal implementation
- [ ] Step 4: Run → verify PASS
- [ ] Step 5: Commit `feat: [description]`

### Task 2: [Component Name]

[Same structure...]

## 8. Sign-off

- CTO: `[CTO_SIGNED_YYYY-MM-DD_HHMM_HKT]`
- CISO: `[CISO_VERIFIED_YYYY-MM-DD_HHMM_HKT]`
