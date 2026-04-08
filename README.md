# MADHORSE Ltd. Workspace

## Quick Start (每個 session 必讀)

| # | File | Content |
|---|------|---------|
| 1 | `AGENTS.md` | Team structure + protocols index |
| 2 | `PROJECT_REGISTER.md` | All projects (唯一準則) |
| 3 | `HEARTBEAT.md` | System health + check-ins |
| 4 | `TOOLS.md` | VPS, Penpot, Pencil CLI infrastructure |

## Workspace Root

| Environment | Path |
|-------------|------|
| Host / VS Code | `/opt/ai-fabio-corp/data/openclaw_home/workspace` |
| Container | `/root/.openclaw/workspace` |

## Architecture (v10.0 — Thin Core)

```
├── AGENTS.md              ← Team + protocols index (~70 lines)
├── PROJECT_REGISTER.md    ← Projects (唯一準則)
├── HEARTBEAT.md           ← VPS status + check-ins
├── TOOLS.md               ← Infrastructure specifics
├── README.md              ← 你喺度
│
├── agents/{role}/agent.md ← Agent core identity (≤30 lines each)
├── protocols/             ← Shared SOP (on-demand load)
│   ├── phase-gates.md     ← Phase definitions + gate owners
│   ├── verification.md    ← 5-step gate function
│   ├── model-review.md    ← MR-1/MR-2 protocol
│   ├── guardian.md        ← 5 禁令 + security
│   ├── startup.md         ← CEO/agent startup enforcer
│   ├── think-aloud.md     ← Think aloud format
│   ├── code-review.md     ← Two-stage review
│   ├── conventions.md     ← HKT timezone + language
│   └── dispatch.md        ← Parallel dispatch + plan standard
├── skills/                ← Domain skills (on-demand load)
│   ├── ceo/               ← Decision, validation
│   ├── research/          ← Phase 1, 1.5, UAT
│   ├── design/            ← Phase 2, Penpot, Pencil
│   ├── engineering/       ← TDD, debugging, Docker, tech stack
│   ├── security/          ← Anti-dummy, audit
│   └── shared/            ← Design systems reference
│
├── docs/                  ← Standards, runbooks, templates
├── projects/{ID}_{Name}/  ← Code + project documents
├── memory/                ← Long-term memory + lessons
└── _archive/              ← Old version backups
```

## Standard Project Shape

Every project follows `docs/PROJECT_TEMPLATE/`:

```
projects/
├── {ID}_{Name}/                    ← Code repo
└── {ID}_ProjectDocuments/          ← Artefacts
    ├── PROJECT.json
    ├── designs/exports/
    └── documents/Phase{0-6}/
```

## Key References

- **Phase flow:** `protocols/phase-gates.md`
- **Execution standard:** `docs/PROJECT_EXECUTION_STANDARD.md`
- **Gate checklist:** `docs/PHASE_GATE_CHECKLIST.md`
- **Deploy guide:** `docs/DEPLOYMENT_GUIDE.md`
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
