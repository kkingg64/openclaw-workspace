# P2026-008 MADHORSE HQ — Implementation Plan

**項目:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 3 (Technical Implementation Plan)  
**日期:** 2026-04-01 UTC  
**執行者:** CTO (Chief Technology Officer)  
**狀態:** ✅ PHASE 3 IN PROGRESS

---

## 1. Overview

本文件定義 MADHORSE HQ 嘅實施計劃，包含 Sprint 劃分、任務拆解、技術順序依賴。

**目標:** 在 MVP 階段完成 P0 功能（System Monitor、Agent Status、Discussions、Projects、Research、Trends）

**Duration:** 4 sprints × 1 week = 4 weeks MVP

---

## 2. Sprint Breakdown

### 2.1 Sprint 0 — Foundation (Week 0)

**Duration:** 2 days  
**Goal:** Project setup, dependencies, basic structure

| Task | Description | Hours | Dependencies |
|------|-------------|-------|--------------|
| S0-01 | Initialize Next.js 14 project with App Router | 1 | None |
| S0-02 | Install and configure Tailwind CSS | 0.5 | S0-01 |
| S0-03 | Install shadcn/ui and add base components | 1 | S0-01 |
| S0-04 | Configure Prisma with SQLite | 1 | S0-01 |
| S0-05 | Create folder structure (per Technical Spec) | 0.5 | S0-01 |
| S0-06 | Set up CSS variables / design tokens | 1 | S0-02 |
| S0-07 | Configure NextAuth.js v5 (skeleton) | 1 | S0-01 |
| S0-08 | Create .env.local template | 0.5 | None |

**Deliverables:**
- Working Next.js project with shadcn/ui
- Prisma schema (empty)
- Auth flow (login page placeholder)
- Design tokens in globals.css

---

### 2.2 Sprint 1 — Core Infrastructure (Week 1)

**Duration:** 5 days  
**Goal:** Backend APIs and OpenClaw integration

| Task | Description | Hours | Dependencies |
|------|-------------|-------|--------------|
| S1-01 | Build OpenClaw session service (`lib/openclaw.ts`) | 4 | S0-01 |
| S1-02 | Create `sessions_list` API route | 2 | S1-01 |
| S1-03 | Create `sessions/:id` API route | 2 | S1-01 |
| S1-04 | Build Agent Status API (derive from sessions) | 3 | S1-02 |
| S1-05 | Create System Monitor API (SSH commands) | 4 | S0-01 |
| S1-06 | Create Projects API (SQLite CRUD) | 3 | S0-04 |
| S1-07 | Create Research API (SQLite CRUD) | 3 | S0-04 |
| S1-08 | Build Discussion Threads API (session aggregation) | 4 | S1-02 |
| S1-09 | Create SSE endpoint for real-time | 4 | S1-02 |
| S1-10 | Build React Query hooks for all APIs | 3 | S1-02, S1-04 |

**Deliverables:**
- All API routes functional
- OpenClaw session reading working
- SSE streaming working
- React Query hooks ready

---

### 2.3 Sprint 2 — UI Components (Week 2)

**Duration:** 5 days  
**Goal:** Dashboard UI and shared components

| Task | Description | Hours | Dependencies |
|------|-------------|-------|--------------|
| S2-01 | Build Header component | 2 | S0-03 |
| S2-02 | Build Sidebar component | 2 | S0-03 |
| S2-03 | Build MobileNav (hamburger) | 2 | S2-01 |
| S2-04 | Build SystemMetricCard component | 2 | S0-03, S1-05 |
| S2-05 | Build SystemMonitor widget | 3 | S2-04, S1-05 |
| S2-06 | Build AgentCard component | 3 | S0-03, S1-04 |
| S2-07 | Build AgentStatusGrid | 2 | S2-06 |
| S2-08 | Build ProjectCard component | 2 | S0-03, S1-06 |
| S2-09 | Build ProjectStatusGrid | 2 | S2-08 |
| S2-10 | Build shared components (StatusBadge, LoadingSkeleton, ErrorState, EmptyState) | 3 | S0-03 |
| S2-11 | Build Dashboard layout | 2 | S2-01, S2-02 |
| S2-12 | Compose Dashboard page | 4 | S2-05, S2-07, S2-09 |

**Deliverables:**
- Dashboard page with System Monitor, Agent Status, Project Status
- Responsive layout working
- Loading and error states

---

### 2.4 Sprint 3 — Feature Pages (Week 3)

**Duration:** 5 days  
**Goal:** All other pages (Agents, Discussions, Research, Trends)

| Task | Description | Hours | Dependencies |
|------|-------------|-------|--------------|
| S3-01 | Build Agents page with sidebar + grid | 4 | S2-06, S2-07 |
| S3-02 | Build AgentDetail modal/page | 4 | S3-01 |
| S3-03 | Build AgentReasoningLog component | 3 | S1-03 |
| S3-04 | Build AgentDiscussionList component | 3 | S1-08 |
| S3-05 | Build Discussions page | 4 | S3-04, S1-08 |
| S3-06 | Build DiscussionThread view | 3 | S3-05 |
| S3-07 | Build ResearchCard component | 2 | S0-03, S1-07 |
| S3-08 | Build ResearchFeatured component | 2 | S3-07 |
| S3-09 | Build ResearchFilters (tabs) | 2 | S0-03 |
| S3-10 | Build Research page | 3 | S3-07, S3-08, S3-09 |
| S3-11 | Build TrendCard component | 2 | S0-03 |
| S3-12 | Build PlatformTabs component | 2 | S0-03 |
| S3-13 | Build Trends page | 4 | S3-11, S3-12 |

**Deliverables:**
- All 4 main pages functional (Dashboard, Agents, Research, Trends)
- Discussions page with thread list and detail view

---

### 2.5 Sprint 4 — Polish & Integration (Week 4)

**Duration:** 5 days  
**Goal:** Real-time integration, auth, polish

| Task | Description | Hours | Dependencies |
|------|-------------|-------|--------------|
| S4-01 | Integrate SSE with React Query hooks | 4 | S1-09, S2-12 |
| S4-02 | Complete NextAuth.js (Google OAuth + Credentials) | 4 | S0-07 |
| S4-03 | Add RBAC middleware | 3 | S4-02 |
| S4-04 | Add real-time refresh indicators | 2 | S4-01 |
| S4-05 | Add keyboard navigation (accessibility) | 3 | S2-10 |
| S4-06 | Add responsive polish (all breakpoints) | 3 | S2-12, S3-13 |
| S4-07 | Add empty states for all pages | 2 | S2-10 |
| S4-08 | Add search functionality | 3 | All APIs |
| S4-09 | Seed database with initial data | 2 | S1-06, S1-07 |
| S4-10 | UAT testing and bug fixes | 8 | All |

**Deliverables:**
- Fully functional MVP
- Auth working
- Real-time updates working
- UAT passed

---

## 3. Critical Path

```
S0 (Foundation)
    ↓
S1 (Backend APIs) ← CRITICAL PATH
    ↓
S2 (UI Components) ← CRITICAL PATH
    ↓
S3 (Feature Pages) ← CRITICAL PATH
    ↓
S4 (Polish & Integration)
```

**No parallel work on S2-S4 until S1 is complete** — backend must be ready before frontend development.

---

## 4. Parallel Work Streams

| Stream | Can Start | Tasks |
|--------|-----------|-------|
| Design | S0 | CDO can build component specs, wireframes in parallel |
| Infrastructure | S0 | DevOps can set up deployment pipeline in parallel |
| Research Integration | S2 | Once API structure is known, research UI can start |

---

## 5. Daily Standup Tasks (Suggested)

For each day in Sprint 1-4:

| # | Task | Description |
|---|------|-------------|
| 1 | API: `GET /api/system` | VPS CPU/RAM/Storage via SSH |
| 2 | API: `GET /api/agents` | List agents from OpenClaw sessions |
| 3 | API: `GET /api/discussions` | Aggregate session logs |
| 4 | API: `GET /api/sse` | Server-Sent Events stream |
| 5 | UI: Dashboard layout | Header + Sidebar + PageContainer |
| 6 | UI: SystemMonitor widget | 5 metric cards |
| 7 | UI: AgentCard + AgentStatusGrid | 6 agent cards |
| 8 | UI: AgentDetail modal | Tabbed view (Reasoning/Discussions) |
| 9 | UI: DiscussionThread | Message list + reasoning |
| 10 | UI: Research page | Featured + grid |
| 11 | UI: Trends page | Platform tabs + cards |
| 12 | Auth: NextAuth.js | Login + middleware |
| 13 | Real-time: SSE + React Query | Auto-refresh |
| 14 | Seed: Projects + Research | Initial data |

---

## 6. Milestone Checklist

### Sprint 0 Completion
- [ ] Next.js project bootstrapped
- [ ] shadcn/ui components available
- [ ] Prisma schema created
- [ ] Design tokens in CSS

### Sprint 1 Completion
- [ ] All API routes return correct JSON
- [ ] OpenClaw session reading works
- [ ] SSE endpoint streams data
- [ ] React Query hooks functional

### Sprint 2 Completion
- [ ] Dashboard page renders all widgets
- [ ] System Monitor shows live data
- [ ] Agent cards show status
- [ ] Responsive on mobile/tablet/desktop

### Sprint 3 Completion
- [ ] Agents page: list + detail
- [ ] Discussions page: threads + messages
- [ ] Research page: featured + filters + grid
- [ ] Trends page: platform tabs + cards

### Sprint 4 Completion (MVP Ready)
- [ ] Auth: login/logout works
- [ ] RBAC: CEO full access, Viewer read-only
- [ ] Real-time: auto-refresh every 30s
- [ ] UAT: all P0 test cases pass

---

## 7. Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| OpenClaw API changes | Low | High | Abstract behind `lib/openclaw.ts` service layer |
| SSE performance issues | Medium | Medium | Throttle updates, use React Query staleTime |
| Auth complexity | Medium | Medium | Use NextAuth.js v5 (stable) |
| SQLite → PostgreSQL migration | Low | Low | Prisma makes migration trivial |
| YouTube/Reddit API rate limits | High | Low | MVP only, cache aggressively |

---

## 8. Definition of Done

For each task:
1. ✅ Code written and follows conventions
2. ✅ TypeScript types correct
3. ✅ API returns expected JSON
4. ✅ UI renders correctly (with loading/error states)
5. ✅ Responsive on all breakpoints
6. ✅ No console errors

For each sprint:
1. ✅ All tasks complete
2. ✅ No blocking issues
3. ✅ Ready for next sprint

For MVP:
1. ✅ All P0 test cases pass
2. ✅ Performance acceptable (LCP < 2.5s)
3. ✅ No critical bugs

---

**CTO_SIGNED:** `[FABIO_CTO_SIGNED_2026-04-01_1215_UTC]`  
**STATUS:** PHASE 3 IN PROGRESS
