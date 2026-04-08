# DEPLOYMENT_GUIDE.md

> Single source of truth for deployment targets, release checks, and rollback expectations.

## 1. Release Rules

1. No deploy without a rollback path.
2. No success claim without fresh production verification.
3. Every deploy must update a project deploy verification artefact.
4. The deployer cannot be the final verifier.

## 2. Deployment Target Matrix

| Project | State | Target | Primary URL / Endpoint | Runtime |
|---------|-------|--------|------------------------|---------|
| P2026-001 Dashboard | Verified | Vercel public + VPS service | `https://opanclaw-dashboard.vercel.app` | Next.js |
| P2026-002 Meal Planner | Verified | Hostinger VPS | `http://meal.marhorse.cloud/` | Next.js / Docker |
| P2026-003 Research Dashboard | Verified | Hostinger VPS | `https://research.marhorse.cloud` | Next.js / Docker |
| P2026-004 AI Arena | Verified | Hostinger VPS | `http://76.13.215.13/mahjong-demo.html` | static/app |
| P2026-005 AI Butler | Planned | Mac Mini | `http://100.102.72.91:5678` | Docker / n8n stack |
| P2026-006 Baserow Migration | Internal | Baserow / internal migration path | internal only | migration workflow |
| P2026-007 ViralShorts | Content ops | publication workflow | N/A | non-web content pipeline |

If a target changes, update this file and `PROJECT_REGISTER.md` in the same session.

## 3. Hostinger VPS Release Flow

### Pre-deploy

- Confirm current commit hash
- Confirm build/test output is fresh
- Confirm `.env` is present on target and not changed unintentionally
- Confirm rollback image/tag/commit is known

### Commands

```bash
ssh root@76.13.215.13 "cd /opt/ai-fabio-corp && docker compose ps"
ssh root@76.13.215.13 "systemctl is-active nginx"
ssh root@76.13.215.13 "curl -I http://127.0.0.1:3000 || true"
```

### Nginx updates

Use the safe helper documented in `TOOLS.md`:

```bash
ssh root@76.13.215.13 "nginx -t"
ssh root@76.13.215.13 "systemctl reload nginx"
```

## 4. Vercel Release Flow

- Confirm the target branch and linked project.
- Deploy from the approved branch only.
- Verify the preview build before promoting production aliases.
- Capture the deployment URL and alias in the deploy verification artefact.

## 5. Mac Mini Release Flow

- Confirm Docker Desktop is running.
- Confirm service containers for `n8n`, PostgreSQL, and Redis are healthy.
- Record the operator, host, and compose revision used for deployment.
- Verify endpoints from both local network and remote client paths when possible.

## 6. Content / Non-Web Release Flow

Use this for projects like ViralShorts where the product is not a web app:

- Verify publication asset set is final
- Verify captions, links, and tracking tags
- Verify scheduling time in HKT
- Verify rollout and rollback instructions for each platform
- Record published URLs and performance checkpoints

## 7. Production Verification Minimums

Every deploy verification must include:

- commit hash or release tag
- deploy timestamp in HKT
- command(s) used to verify prod state
- HTTP status evidence for public endpoints where applicable
- screenshot or browser proof for user-facing UI if relevant
- rollback path with exact previous version reference

## 8. Rollback Expectations

| Target | Minimum Rollback Capability |
|--------|------------------------------|
| VPS Docker | previous image/tag or previous commit + compose restart |
| Vercel | previous deployment re-promoted |
| Mac Mini | previous compose revision or backup config restored |
| Content pipeline | post unpublish / swap / corrected repost plan |

## 9. Deployment Artefact Rule

Write deployment evidence to:

- `projects/{PROJECT_ID}_ProjectDocuments/documents/Phase4_5_DeployVerification/{PROJECT_ID}_DeployVerification.md`
- `projects/{PROJECT_ID}_ProjectDocuments/documents/Phase4_5_DeployVerification/{PROJECT_ID}_Gate_Check.log`

Do not rely on terminal history as the only deploy record.