# OPERATIONS_RUNBOOK.md

> Daily, weekly, and incident operating procedure for MADHORSE production systems.

## 1. Current Managed Services

| Service | Port / URL | Expected State |
|---------|-------------|----------------|
| OpenClaw Gateway | `18789` | HTTP 200 |
| Meal Planner | `3000` / `http://meal.marhorse.cloud/` | HTTP 200 |
| Research Dashboard | `3001` / `https://research.marhorse.cloud` | HTTP 200 |
| Dashboard | `3002` | HTTP 200 |
| Baserow | `3004` | redirect or login reachable |
| Penpot MCP | `4401` / `4402` | active |
| Penpot Plugin | `4400` | active |
| Penpot UI | `9001` | reachable |

## 2. Daily HKT Operations

### Startup check

1. Read `HEARTBEAT.md`
2. Read `PROJECT_REGISTER.md`
3. Read `PHASE_STATUS.md`
4. Verify current in-progress systems

### Service health check

- Confirm key HTTP endpoints return expected status
- Confirm Docker and nginx are healthy on the VPS
- Confirm no critical deploy is half-complete
- Update `HEARTBEAT.md` only after checks are fresh

## 3. Weekly Operations

- Review top production errors and recurring incidents
- Review project phase drift: docs vs actual reality
- Review backup status and restore confidence
- Review security-sensitive changes and secret rotation needs
- Move meaningful learnings into `lessons-learned.md`

## 4. Incident Severity

| Severity | Meaning | Response |
|----------|---------|----------|
| P0 | Production down, data loss, or security breach | immediate rollback + boss update within 5 minutes |
| P1 | Major user-facing regression, degraded core function | fix/rollback same session |
| P2 | Minor regression or non-core issue | queue and schedule |

## 5. Incident Response Procedure

1. Stabilize first: rollback or isolate blast radius.
2. Capture evidence: logs, screenshots, command output.
3. Update the boss with impact, current state, and next action.
4. Open a project bug entry with the 6-step bug status model.
5. Do post-mortem and add a `lessons-learned.md` entry.

## 6. Standard Checks Before Declaring Recovery

- fresh health check passed
- user-facing route verified
- relevant background job or integration confirmed
- rollback no longer needed or remains documented
- phase docs updated if deployment state changed

## 7. Backup Expectations

- Databases must have a known backup path and last successful backup date
- Critical configuration changes must have a reversible backup copy
- Restore confidence matters more than backup existence; rehearse restore paths periodically

## 8. Documentation Hygiene

After any important operational change, update all affected files in the same session:

- `HEARTBEAT.md`
- `PROJECT_REGISTER.md`
- `PHASE_STATUS.md`
- deploy verification artefact
- `lessons-learned.md` when the event teaches something reusable

## 9. What Good Looks Like

A professional operating session ends with:

- system state verified
- docs consistent with reality
- rollback path known
- no hidden operational debt left behind