# QUICK_START.md

> 5-minute startup guide for any new CEO / CTO / COO / CISO / CDO session.

## 1. Read These First

You are reading this file first. Continue in this order:

1. **This file** (`QUICK_START.md`) — you are here
2. `AGENTS.md` — full SOP, phase flow, iron laws
3. `PROJECT_REGISTER.md` — current projects
4. `PHASE_STATUS.md` — phase decisions
5. `HEARTBEAT.md` — system health
6. `docs/PROJECT_EXECUTION_STANDARD.md` — delivery chain
7. `docs/PHASE_GATE_CHECKLIST.md` — gate-by-gate checklist
8. `docs/DEPLOYMENT_GUIDE.md` — deploy targets
9. `docs/ENV_SETUP_GUIDE.md` — secrets management
10. `docs/OPERATIONS_RUNBOOK.md` — daily ops

## 2. Know The Root Path

Use the correct workspace root for your environment:

| Environment | Workspace Root |
|-------------|----------------|
| Host / VS Code | `/opt/ai-fabio-corp/data/openclaw_home/workspace` |
| Container alias | `/root/.openclaw/workspace` |

When docs say `{WORKSPACE_ROOT}`, use the correct one above.

## 3. Non-Negotiables

- All timestamps use `HKT (UTC+8)`.
- No completion claims without fresh verification evidence.
- No production code without a failing test first unless the work is documentation/config-only.
- No implementation without an approved design first (Brainstorming Hard Gate).
- The builder cannot accept their own work.
- New projects must use `docs/PROJECT_TEMPLATE/`.
- Git worktree isolation is required for Phase 4 implementation (verify gitignore + baseline tests before starting).
- Spec compliance review must pass before code quality review (never reverse the order).

## 3.1 How To Run Multi-Model Reviews

### MR-1 (Phase 2 → 3)

1. CTO copies `skills/verification/MR1_template.md` into `Phase2_Design/{ID}_MultiModel_Review_1.md`
2. Feed each model's prompt section to the corresponding tool (`claude_advisor`, `gemini_advisor`, `copilot_reviewer`)
3. Paste each model's actual response back into the template
4. Record verdict: `REVIEW_1_PASSED` / `REVIEW_1_CONDITIONAL` / `REVIEW_1_BLOCKED`
5. If any BLOCK → fix → re-run all three models
6. Max 3 re-runs, then escalate to CEO

### MR-2 (Phase 4.5 → 5)

Same process using `skills/verification/MR2_template.md`, executed by CISO, output in `Phase4_5_DeployVerification/{ID}_MultiModel_Review_2.md`.

## 4. Choose The Right Workflow

### If starting a brand new project

1. Register project ID in `PROJECT_REGISTER.md`
2. Create code path in `projects/{ID}_{Name}/`
3. Copy `docs/PROJECT_TEMPLATE/` into `projects/{ID}_ProjectDocuments/`
4. Fill `PROJECT.json`
5. **Brainstorming Hard Gate**: design must be approved before any code (see AGENTS.md)
6. Run Phase 0 -> 6 using `docs/PHASE_GATE_CHECKLIST.md`
7. Use `skills/verification/` templates for MR-1 and MR-2 gates

### If continuing an existing project

1. Confirm current phase in `PROJECT_REGISTER.md`
2. Read the latest phase artefacts under `projects/{ID}_ProjectDocuments/`
3. Read latest deployment state in `docs/DEPLOYMENT_GUIDE.md`
4. Read `lessons-learned.md` before changing delivery flow

### If touching production

1. Read `docs/DEPLOYMENT_GUIDE.md`
2. Read `docs/OPERATIONS_RUNBOOK.md`
3. Prepare rollback first
4. Capture fresh verification output before and after deployment

## 5. Required Artefacts By Default

Every project should have:

- `PROJECT.json`
- Phase folders from `Phase0_Registration` through `Phase6_Closeout`
- `backlog/ENHANCEMENT_BACKLOG.md`
- `figma/` for design exports or screenshots
- verification artefacts using `skills/verification/`

## 6. Current Workspace Problem To Avoid

Do not create another one-off project structure. The existing workspace contains legacy naming drift. New work must follow the standardized template and docs.