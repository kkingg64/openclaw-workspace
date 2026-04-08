# ACTIVE.md — Active Protocols (as of 2026-04-08)

> This file lists all currently active protocols. If a protocol is not listed here, it may be archived or deprecated.
> Last updated: 2026-04-08 by CEO

## Core Protocols (Always Required)

| Protocol | Phase(s) | Owner | Description |
|----------|-----------|-------|-------------|
| `phase-gates.md` | All | CEO | Phase definitions + Gate owners + Transition rules |
| `guardian.md` | All | CISO | 5 條禁令 + Security self-check |
| `startup.md` | All | CEO | CEO/Sub-Agent startup enforcer |
| `conventions.md` | All | CEO | HKT timezone + Language specs |
| `verification.md` | All | CTO | 5-step gate function + Evidence requirements |
| `dispatch.md` | All | COO | Parallel dispatch + Plan document standard |

## Phase-Specific Protocols

| Protocol | Phase(s) | Owner | Description |
|----------|-----------|-------|-------------|
| `phase2-design-workflow-v11.md` | Phase 2 | CDO | shadcn Design-First workflow |
| `model-review.md` | MR-1, MR-2 | CTO | 3-Model vote process |
| `phase4.5-deployment-verification.md` | Phase 4.5 | CTO | Deployment validation |
| `phase5-uat-protocol.md` | Phase 5 | CDO+COO+CTO | UAT execution (66+ tests) |
| `phase5-gate-requirements.md` | Phase 5 | CEO | Phase 5→6 gate checklist |
| `pre-submission.md` | All | All | Pre-Boss review self-check |

## Supporting Protocols

| Protocol | Owner | Description |
|----------|-------|-------------|
| `code-review.md` | CTO | Two-stage review + Reception |
| `think-aloud.md` | All | Think aloud format |
| `heartbeat-update-protocol.md` | CEO | HEARTBEAT.md auto-update |
| `phase-transition.md` | CEO | 5-step gate approval ritual |
| `gate-naming-map.md` | All | Unified gate naming reference |
| `deliverable-map.md` | All | Phase deliverables mapping |
| `lark-integration.md` | COO | Lark API integration |

## Experimental / Limited Use

| Protocol | Owner | Status | Description |
|----------|-------|--------|-------------|
| `mobile-css-debugging.md` | CTO | Experimental | Mobile CSS debugging without browser |
| `visual-verification-no-browser.md` | CDO | Active | Visual verification without Chromium |
| `compliance-automation.md` | CISO | Active | Automated compliance checking |
| `sprint-closeout.md` | COO | Active | Sprint retrospective |

---

## Quick Reference

**To check if a protocol is active:** `grep -l "ACTIVE" protocols/*.md | xargs grep -l "your-protocol-name"`

**To add a new protocol:**
1. Add entry to this file
2. Commit with message: `feat(protocols): add [protocol-name] to ACTIVE`

**To deprecate a protocol:**
1. Move entry to ARCHIVE.md
2. Add `# DEPRECATED` tag to the protocol file
3. Update this file to remove the entry
