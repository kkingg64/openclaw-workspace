# PROJECT_EXECUTION_STANDARD.md

> Unified delivery standard for MADHORSE projects. This document maps the MADHORSE phase model to the Superpowers workflow so a new project can be executed end-to-end without guesswork.

## 1. Core Principles

1. Spec before build.
2. Evidence before claims.
3. Test before implementation for code changes.
4. Builder and verifier must be different people.
5. Every project must be auditable from `PROJECT.json` to closeout.

## 2. Standard Project Shape

Every new project must include:

- Code path: `projects/{PROJECT_ID}_{CodeName}/`
- Documents path: `projects/{PROJECT_ID}_ProjectDocuments/`
- Metadata: `projects/{PROJECT_ID}_ProjectDocuments/PROJECT.json`
- Phase folders from `Phase0_Registration` through `Phase6_Closeout`
- `backlog/ENHANCEMENT_BACKLOG.md`
- `designs/` for Penpot design exports, UI screenshots, and UAT comparison evidence

Use `docs/PROJECT_TEMPLATE/` as the starting point.

## 3. End-to-End Delivery Chain

| Phase | MADHORSE Goal | Superpowers Skill / Standard | Required Outcome |
|------|----------------|------------------------------|------------------|
| 0 | Register the project | Brainstorming not started yet | Project ID, code path, docs path, `PROJECT.json`, boss approval |
| 1 | Validate demand and scope | `brainstorming` + research discipline | Approved research doc, competitor view, ROI logic |
| 1.5 | AI Advisor Discussion | 4-role advisory session (Requirements + Design Style + UI Flow) | AI Advisor Q&A doc, CDO Design Brief (Design System + UI Flow + Breakpoints) |
| 2 | Lock UX and UAT | design-first workflow | UI spec, UAT cases, complete Frontend Pack, Pencil CLI design exports (PNG), COO Design QC sign-off |
| MR-1 | Review design before build | multi-model review | COO Design QC PASSED (pre-gate), CTO buildability review, 2/3+ PASS with evidence |
| 3 | Lock technical approach | `writing-plans` + security review | Technical spec, architecture, plan, security posture |
| 4 | Build in controlled isolation | `using-git-worktrees`, `test-driven-development`, `subagent-driven-development`, `requesting-code-review` | Working implementation, tests, bug/state log |
| 4.5 | Verify deployment and production state | `verification-before-completion` | Deploy verification doc, rollback path, prod checks |
| MR-2 | Review deployed readiness | multi-model review | 2/3+ PASS with evidence |
| 5 | Run UAT | browser/manual validation + Penpot baseline comparison | UAT result doc, design-vs-production screenshots, business acceptance |
| 6 | Close and hand to BAU | closeout discipline | Lessons learned, BAU owner, final status update |

## 4. Required Phase Artefacts

| Phase | Required Files |
|------|----------------|
| 0 | `Phase0_Registration/{PROJECT_ID}_Project_Registration.md`, `PROJECT.json` |
| 1 | `Phase1_Research/{PROJECT_ID}_Research.md`, `Phase1_Research/{PROJECT_ID}_Requirements.md` |
| 1.5 | `Phase1_Research/{PROJECT_ID}_AI_Advisor_QA.md`, `Phase1_Research/{PROJECT_ID}_CDO_Design_Brief.md` |
| 2 | `Phase2_Design/{PROJECT_ID}_UI_Spec.md`, `Phase2_Design/{PROJECT_ID}_UAT_Test_Case.md`, `Phase2_Design/{PROJECT_ID}_Component_Spec.md`, `Phase2_Design/{PROJECT_ID}_Accessibility_Checklist.md`, `Phase2_Design/{PROJECT_ID}_Performance_Budget.md`, `Phase2_Design/{PROJECT_ID}_Analytics_Plan.md`, `Phase2_Design/{PROJECT_ID}_Release_Checklist.md`, `Phase2_Design/{PROJECT_ID}_Asset_Inventory.md` |
| MR-1 | `Phase2_Design/{PROJECT_ID}_MultiModel_Review_1.md` |
| 3 | `Phase3_TechSpec/{PROJECT_ID}_Technical_Spec.md`, implementation plan |
| 4 | `Phase4_Implementation/{PROJECT_ID}_Version_and_Bug_List.md` |
| 4.5 | `Phase4_5_DeployVerification/{PROJECT_ID}_DeployVerification.md`, gate log |
| MR-2 | `Phase4_5_DeployVerification/{PROJECT_ID}_MultiModel_Review_2.md` |
| 5 | `Phase5_UAT/{PROJECT_ID}_UAT_Test_Result.md`, screenshots |
| 6 | `Phase6_Closeout/{PROJECT_ID}_Closeout.md`, lessons learned entry |

## 5. New Project Launch Standard

1. Create the project ID in `PROJECT_REGISTER.md`.
2. Create the code repo/folder under `projects/{PROJECT_ID}_{CodeName}/`.
3. Copy `docs/PROJECT_TEMPLATE/` into `projects/{PROJECT_ID}_ProjectDocuments/`.
4. Fill `PROJECT.json` before writing any phase document.
5. Update `PHASE_STATUS.md` if the project needs boss approval.
6. Do not begin Phase 1 work until the project has a registered owner.

## 5.1 Phase 2 Frontend Industry Standard

Phase 2 deliverables are grouped as a `Frontend Pack`. This pack is mandatory for all website, dashboard, and interactive 2D/3D projects.

### Common Frontend Pack

- `UI_Spec.md` - information architecture, screen inventory, responsive rules, API/UI dependencies, state inventory
- `UAT_Test_Case.md` - per-screen cases with baseline screenshot reference
- `Component_Spec.md` - variants, interaction states, usage rules
- `Accessibility_Checklist.md` - WCAG 2.1 AA, keyboard flow, focus order, ARIA coverage
- `Performance_Budget.md` - target budgets + verification method
- `Analytics_Plan.md` - core events, conversion points, error telemetry
- `Release_Checklist.md` - pre-launch, launch, rollback
- `Asset_Inventory.md` - asset source, format, and license tracking

### Website Add-on

- `SEO_Spec.md` - title/meta/canonical/OG/schema/robots/sitemap
- `Content_Model.md` - page sections, CTA hierarchy, legal/support pages
- `Conversion_Tracking_Plan.md` - funnel events and attribution

### Dashboard Add-on

- `DataViz_Spec.md` - chart logic, aggregation, drill-down, refresh policy
- `Role_Permission_Matrix.md` - visibility by role
- `Filter_Search_Export_Spec.md` - filter, search, sort, export behavior

### 2D / 3D Add-on

- `Gameplay_Spec.md` - controls, UI flow, win/lose loop
- `Runtime_Budget.md` - FPS, memory, loading, supported devices
- `Asset_Manifest.md` - models, sprites, animation, audio, texture budgets
- `Fallback_Strategy.md` - degraded mode / unsupported device path

### Baseline Requirements

- Every core screen must have desktop and mobile coverage unless approved otherwise in the brief.
- Every interactive component must define default, hover, focus, active, disabled, and error states where applicable.
- All forms, charts, and tables must define loading, empty, error, and permission-denied states.
- Website projects must define Core Web Vitals targets.
- Dashboard and game projects must define runtime/performance budgets.
- Placeholder content, lorem ipsum, and dummy copy are forbidden in Phase 2 artefacts.

## 6. Execution Rules By Work Type

### Software products

- Must use worktree isolation before Phase 4 implementation.
- Must produce failing tests first for behavior changes and bug fixes.
- Must run build/test verification before any completion claim.

### Content or workflow projects

- Keep the same phase structure.
- Replace code-specific tests with publishing, scheduling, QA, and metrics verification.
- Phase 4.5 becomes publication verification if no software deployment exists.

### BAU enhancements

- Log every request in `backlog/ENHANCEMENT_BACKLOG.md`.
- Re-enter the phase system if the change is larger than a trivial hotfix.
- Do not treat BAU as permission to skip review or verification.

## 7. Definition of Done

A project is only considered complete when all of the following are true:

- The current phase gate has passed.
- Required artefacts exist and are non-empty.
- Verification evidence is fresh and attached.
- A different role verified the work.
- `PROJECT_REGISTER.md` and `PHASE_STATUS.md` reflect reality.
- Lessons learned have been captured before closeout.

## 8. Legacy Project Rule

Existing projects may have legacy naming and folder drift. Do not rewrite history just to match the new standard. From this point onward:

- New artefacts must use the standard phase paths.
- Migration can be done incrementally when a project is actively worked on.
- `PROJECT.json` becomes mandatory before the next major phase transition.