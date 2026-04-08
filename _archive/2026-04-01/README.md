# MADHORSE Ltd. Workspace

> Project operating system for MADHORSE Ltd. planning, delivery, deployment, and ongoing operations.

---

## Start Here

Read these in order before starting new work:

1. `QUICK_START.md`
2. `AGENTS.md`
3. `PROJECT_REGISTER.md`
4. `PHASE_STATUS.md`
5. `docs/PROJECT_EXECUTION_STANDARD.md`
6. `docs/PHASE_GATE_CHECKLIST.md`
7. `docs/DEPLOYMENT_GUIDE.md`
8. `docs/ENV_SETUP_GUIDE.md`
9. `docs/OPERATIONS_RUNBOOK.md`
10. `docs/PROJECT_TEMPLATE/`

---

## Workspace Model

This workspace is split into four layers:

- `projects/` — Product code and project document sets.
- `workspaces/fabio-*` — Role-specific agent workspaces.
- `skills/` — Shared skills, prompts, and verification templates.
- `docs/` — Operating standards, runbooks, and project templates.

---

## Standard Project Shape

Every new project should follow the template in `docs/PROJECT_TEMPLATE/`.

```text
projects/
├── P2026-001_Dashboard/                  # Product code
└── P2026-001_ProjectDocuments/           # Project artefacts
    ├── PROJECT.json
    ├── README.md
    ├── backlog/
    ├── documents/
    │   ├── Phase0_Registration/
    │   ├── Phase1_Research/
    │   ├── Phase2_Design/
    │   ├── Phase3_TechSpec/
    │   ├── Phase4_Implementation/
    │   ├── Phase4_5_DeployVerification/
    │   ├── Phase5_UAT/
    │   └── Phase6_Closeout/
    └── figma/
```

---

## Active Control Files

- `PROJECT_REGISTER.md` — Single source of truth for active projects.
- `PHASE_STATUS.md` — Current phase decisions and pending CEO approvals.
- `HEARTBEAT.md` — Current system health and active service checks.
- `lessons-learned.md` — Closed-loop operational learning.

---

## Current Public Targets

| Project | Primary URL | State |
|---------|-------------|-------|
| P2026-001 Dashboard | https://opanclaw-dashboard.vercel.app | BAU |
| P2026-002 Meal Planner | http://meal.marhorse.cloud/ | UAT |
| P2026-003 Research Dashboard | https://research.marhorse.cloud | Active |

See `docs/DEPLOYMENT_GUIDE.md` for the full deployment target matrix, verification rules, and rollback steps.

---

## System Status

- OpenClaw Gateway: port `18789`
- MiniMax API: M2.5 model family
- Telegram bot: active
- Penpot stack: live on VPS and managed through `TOOLS.md`

---

## Contact

- CEO: Fabio
- Primary channel: Telegram

---

*MADHORSE Ltd. - ROI is King*
