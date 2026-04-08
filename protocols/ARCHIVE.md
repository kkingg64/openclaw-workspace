# ARCHIVE.md — Deprecated/Archived Protocols

> This file lists all deprecated or archived protocols. DO NOT use these unless explicitly directed.
> Last updated: 2026-04-08 by CEO

## Deprecated Protocols

| Protocol | Deprecated | Reason |替代方案 |
|----------|------------|--------|----------|
| `SKILLS.md` | 2026-04-06 | Merged into AGENTS.md | `AGENTS.md` |
| `pencil-cli.md` | 2026-04-03 | Headless `save()` bug, unfixable | `shadcn-design-protocol.md` |
| `penpot.md` | 2026-04-03 | Downgraded to reference only | `shadcn-design-protocol.md` |
| `PHASE_4.5_QA_TEMPLATE.md` | 2026-04-08 | Superseded by `phase4.5-deployment-verification.md` | `phase4.5-deployment-verification.md` |
| `lessons-learned.md` | 2026-04-08 | Integrated into project folders | Project's `Phase6_Closeout/` |
| `workspaces/*/SKILLS.md` | 2026-04-08 | Consolidated into `skills/` folder | `skills/{domain}/` |

## Archived (Historical Reference Only)

| Protocol | Phase(s) | Description |
|----------|-----------|-------------|
| `MM_MIGRATION_PLAN.md` | Historical | Migration plan v11→v12 (completed 2026-04-04) |
| `VERSION_11.2_SUMMARY.md` | Historical | v11.2 release notes |
| `COMPLIANCE_AUDITOR_OVERVIEW.md` | Historical | Old compliance auditor docs |
| `mm-compliance-guide.md` | Historical | Old compliance guide |
| `check-mm-compliance.sh` | Historical | Old compliance script |

## Why These Are Archived

- **SKILLS.md merged** — Skills are now organized by domain in `skills/{ceo,coo,cto,cdo,ciso,engineering,research,design,security}/`
- **Pencil CLI deprecated** — Headless mode has unfixable bug; all design work uses shadcn
- **Penpot downgraded** — Was primary design tool, now reference only for visual inspiration
- **Phase templates consolidated** — All phase-specific templates consolidated into `protocols/phaseN-*` files

---

## Maintenance Rules

1. **Never delete** archived protocols — keep for audit trail
2. **Always add `# DEPRECATED** tag to the actual file header
3. **Update ARCHIVE.md** when deprecating anything
4. **Review ARCHIVE.md** quarterly to clean up truly obsolete items

## How to Deprecate a Protocol

```bash
# 1. Add DEPRECATED tag to the file
echo -e "\n# DEPRECATED (2026-04-08) — Reason: [your reason]" >> protocols/your-file.md

# 2. Move reference to ARCHIVE.md
# (edit this file, add entry to Deprecated table)

# 3. Remove from ACTIVE.md
# (edit ACTIVE.md, remove the entry)

# 4. Commit
git add protocols/ && git commit -m "deprecate(protocols): archive your-file.md - reason"
```
