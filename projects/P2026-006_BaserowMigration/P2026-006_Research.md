# P2026-006 Baserow Migration - Project Document

**Project ID:** P2026-006
**Name:** Baserow Migration Testing
**Phase:** 1 - Discovery & Research
**Owner:** CTO
**Created:** 2026-03-19 05:14 HKT

---

## 🎯 Objective

Test deployment of Baserow on VPS and evaluate Timeline View for OMS project data migration.

---

## 📊 Source Data (Supabase)

| Table | Records | Purpose |
|-------|---------|---------|
| projects | 7 | Project list |
| modules | 10+ | Project modules/phases |
| tasks | 10+ | Individual tasks |
| task_assignments | 200+ | Resource assignments with dates |
| resources | 38 | Team members |

**Key fields for Timeline:**
- `start_date` (date)
- `duration` (days)

---

## 🔄 Migration Plan

1. **Phase 1:** Deploy Baserow on VPS (Docker)
2. **Phase 2:** Create database structure matching OMS data
3. **Phase 3:** Import data via CSV/API
4. **Phase 4:** Test Timeline View functionality

---

## 📋 Success Criteria

- [ ] Baserow deployed on VPS
- [ ] Can access via browser
- [ ] Timeline View working
- [ ] Data import successful

---

**Sign:** `[P2026-006_CREATED_2026_03_19_0514_HKT]`
