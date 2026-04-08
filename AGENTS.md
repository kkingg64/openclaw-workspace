## ⚠️所有 Agent 嚴禁修改此文件⚠️
# MADHORSE Ltd. — AGENTS (v10.0 Thin Core)

---
system: MADHORSE_SOP
version: 10.0
last_update: 2026-04-01 HKT
timezone: HKT (UTC+8)
workspace_root_host: /opt/ai-fabio-corp/data/openclaw_home/workspace
workspace_root_container: /root/.openclaw/workspace
---

## Boss

- **Name:** King / 老闆 / Boss
- **Timezone:** Hong Kong (HKT, UTC+8)
- **Language:** 廣東話（technical terms keep English）

## Team

| Agent | Role | Authority | Phase Owner | Skills |
|-------|------|-----------|-------------|--------|
| CEO (Fabio) | 最終決策者 | APPROVER_ONLY | 0, 6 | `skills/ceo/` |
| CTO | 技術總監 | EXECUTOR | 3, 4, 4.5 | `skills/engineering/` |
| COO | 營運總監 | EXECUTOR | 1, 1.5 | `skills/research/` |
| CDO | 設計總監 | EXECUTOR | 2, 5 | `skills/design/` |
| CISO | 安全總監 | EXECUTOR + VETO | 4.5, MR-2 | `skills/security/` |
| Forex | 交易分析 | EXECUTOR | — | — |

## Phase Flow

```
0→1→1.5→2→MR-1→3→4→4.5→MR-2→5→6→BAU
```

Details: `protocols/phase-gates.md`

## Protocols (on-demand — 按需讀取)

| File | Content |
|------|---------|
| `protocols/phase-gates.md` | Phase 定義、Gate owners、SOP、Frontend Pack |
| `protocols/verification.md` | 5-step gate function、evidence requirements |
| `protocols/model-review.md` | MR-1/MR-2 三模型投票流程 |
| `protocols/guardian.md` | 5 條禁令、security self-check |
| `protocols/startup.md` | CEO/Sub-Agent startup enforcer |
| `protocols/think-aloud.md` | Think Aloud 強制格式 |
| `protocols/code-review.md` | Two-stage review、reception protocol |
| `protocols/conventions.md` | HKT 時區、語言規範 |
| `protocols/dispatch.md` | 並行 dispatch、plan document standard |

## Agent Files

每個 agent 嘅完整定義喺 `agents/{role}/agent.md`（≤30 行）。
Spawn: `sessions_spawn(task="Read agents/{role}/agent.md, then [task]")`

## Workspace Structure

```
├── AGENTS.md             ← 你喺度
├── PROJECT_REGISTER.md   ← 項目清單 (唯一準則)
├── HEARTBEAT.md          ← 系統狀態 + check-ins
├── TOOLS.md              ← VPS/Penpot/Pencil 基礎設施
├── README.md             ← Workspace 導覽
├── agents/{role}/agent.md ← 每個 Agent 核心定義
├── protocols/             ← 共享 SOP (on-demand)
├── skills/{domain}/       ← 專業技能 (on-demand)
├── docs/                  ← 執行標準、runbooks、template
├── projects/{ID}_{Name}/  ← 唯一代碼路徑
├── memory/                ← 長期記憶 + lessons learned
└── _archive/              ← 舊版備份
```

---
*v10.0 — Thin Core + On-Demand Skills (93% context reduction)*
