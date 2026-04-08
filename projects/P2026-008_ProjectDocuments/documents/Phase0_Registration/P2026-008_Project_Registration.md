# P2026-008 MADHORSE HQ — Project Registration

**項目:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 0 (Registration)  
**日期:** 2026-04-01 HKT  
**執行者:** CEO (Fabio)  
**狀態:** ✅ BOSS_APPROVED | 2026-04-01 10:45 HKT

---

## 🎯 Executive Summary

MADHORSE HQ 係一個 **Enterprise Mission Control Dashboard**，為 CEO 提供全面嘅公司運營視圖。

**目標：** 將散落各處嘅 MADHORSE 運營數據、Agent 狀態、項目進度、研究成果、Hot Trends 整合到一個現代化、優雅嘅 Dashboard。

**風格參考：** Stripe Dashboard — Modern, Clean, Enterprise Grade, Light Mode

---

## 💡 Vision Statement

> "一個數據驅動嘅 Command Center，讓 CEO 能夠實時掌握公司每個角落嘅狀態 — 從伺服器健康到 Agent 思考，從項目進度到市場趨勢。"

---

## 🎨 Design Direction

### Style Reference
**Stripe Dashboard** — 被公認為 SaaS Dashboard 嘅黃金標準

| 元素 | 描述 |
|------|------|
| **Mode** | Light Mode (Enterprise Standard) |
| **Typography** | Inter or SF Pro (Clean, Professional) |
| **Spacing** | Generous whitespace, 8px grid |
| **Cards** | Subtle shadows, rounded corners (8-12px) |
| **Colors** | White/Gray backgrounds, Blue primary accents |
| **Motion** | Subtle, purposeful animations |

### Color Palette (参考 Stripe)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#F6F9FC` | Page background |
| `--color-surface` | `#FFFFFF` | Card backgrounds |
| `--color-primary` | `#635BFF` | Primary actions, links |
| `--color-text` | `#1A1A2E` | Primary text |
| `--color-text-muted` | `#6B7280` | Secondary text |
| `--color-border` | `#E5E7EB` | Borders, dividers |
| `--color-success` | `#10B981` | Positive states |
| `--color-warning` | `#F59E0B` | Warning states |
| `--color-error` | `#EF4444` | Error states |

---

## 📋 Feature Requirements

### 🔴 P0 - MUST HAVE (Core)

| ID | 功能 | 描述 |
|----|------|------|
| P0-01 | **VPS System Monitor** | CPU / RAM / Storage / Network 實時監控 |
| P0-02 | **Agent Status Panel** | 6 個 Agent 狀態 (CEO/CTO/COO/CISO/CDO/Forex) |
| P0-03 | **Agent Reasoning Logs** | 歷史 session 嘅 reasoning/思考過程 |
| P0-04 | **Agent Discussion Threads** | Agent 之間嘅辯論/討論記錄 |
| P0-05 | **AI Advisor Threads** | AI Advisor 討論過程記錄 |
| P0-06 | **Project Status Grid** | 所有項目嘅進度、階段、milestones |
| P0-07 | **Research Showcase** | COO 研究成果展示 |
| P0-08 | **Hot Trends Dashboard** | 跨平台趨勢 (TikTok/小紅書/IG Reels/Twitter/YouTube Shorts) |
| P0-09 | **Real-time Auto-update** | 30s polling，自動刷新數據 |
| P0-10 | **Modern Enterprise UI** | Stripe Dashboard 風格，Light Mode |

### 🟡 P1 - SHOULD HAVE

| ID | 功能 | 描述 |
|----|------|------|
| P1-01 | **Authentication** | Google OAuth + Email/Password |
| P1-02 | **Role-based Access** | CEO (full) / Viewer (read-only) |
| P1-03 | **Project Milestone Tracker** | 詳細嘅 milestone 進度視圖 |
| P1-04 | **Search & Filter** | 跨模塊搜索 |

### 🟢 P2 - COULD HAVE

| ID | 功能 | 描述 |
|----|------|------|
| P2-01 | **Export/Reports** | PDF/CSV 導出 |
| P2-02 | **Notifications** | 異常狀態報警 |
| P2-03 | **Custom Widgets** | 可自定義嘅 dashboard widgets |

---

## 🔌 Data Sources

| 數據 | 來源 | 刷新頻率 |
|------|------|----------|
| VPS System | OpenClaw Gateway API / SSH commands | 30s |
| Agent Status | OpenClaw Sessions API | 30s |
| Agent Reasoning | OpenClaw Sessions History | Manual |
| Agent Discussions | OpenClaw Sessions Messages | Manual |
| AI Advisor Threads | 文件記錄 | Manual |
| Project Status | PROJECT_REGISTER.md / API | 60s |
| Research | COO Workspace research/ folder | Manual |
| Hot Trends | Web APIs (TikTok/小紅書等) | 5-15min |

---

## 🏗️ Proposed Architecture

### Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (enterprise style) |
| Auth | NextAuth.js v5 (Google + Credentials) |
| State | React Query (TanStack Query) |
| Real-time | SSE or Polling |
| Backend | Next.js API Routes |
| Database | PostgreSQL (for sessions cache) |
| Monitoring | Direct SSH + df/free/top commands |

### Page Structure
```
/                    → Dashboard (Main Mission Control)
/agents              → Agent Status + Reasoning Logs
/agents/[id]         → Individual Agent Detail
/discussions         → Agent Discussion Threads
/projects            → Project Status Grid
/research            → Research Showcase
/trends              → Hot Trends Dashboard
/settings            → User Settings
/login               → Authentication
```

---

## 📊 Module Breakdown

### Module 1: System Monitor
- VPS CPU usage with history graph
- RAM utilization
- Storage breakdown
- Network I/O
- Service health (Gateway, API, DB)

### Module 2: Agent Intelligence
- Real-time status (ACTIVE/BUSY/IDLE)
- Current task
- Reasoning log viewer
- Discussion thread viewer
- AI Advisor consultation history

### Module 3: Project Command
- Project cards with phase badges
- Milestone progress bars
- Owner assignment
- Timeline view
- Linked Agent discussions

### Module 4: Research Hub
- Featured research cards
- Category filters (Market/AI/Strategy/Tech)
- ROI potential indicators
- Trending topics

### Module 5: Trends Command
- Platform selector (TikTok/小紅書/IG Reels/Twitter/YouTube)
- Topic cards with engagement metrics
- Hot reels showcase
- Trend timeline

---

## 🔐 Authentication & Authorization

| Role | Access |
|------|--------|
| CEO (fabio) | Full access to all modules |
| Viewer | Read-only access, no admin |
| Public | Login required for any access |

**Login Methods:**
- Google OAuth (recommended for CEO)
- Email + Password (credentials)

---

## 📈 Success Metrics

| Metric | Target |
|--------|--------|
| Page Load Time | < 2s |
| Real-time Update Latency | < 5s |
| Data Freshness | < 30s for critical metrics |
| Mobile Responsive | Yes (iPad + Desktop) |
| Browser Support | Chrome, Safari, Firefox, Edge |

---

## ⏱️ Estimated Timeline

| Phase | Duration | Focus |
|-------|----------|-------|
| Phase 1-2 | 2-3 weeks | Design + Tech Spec |
| Phase 3-4 | 3-4 weeks | Development |
| Phase 4.5-5 | 1 week | Testing + UAT |
| **Total** | **6-8 weeks** | MVP |

---

## 📁 Files Generated

- `documents/Phase0_Registration/P2026-008_Project_Registration.md` (this)
- `documents/Phase0_Registration/PROJECT.json`

---

## ✅ Registration Checklist

- [x] Project ID assigned (P2026-008)
- [x] Project name confirmed (MADHORSE HQ)
- [x] Vision documented
- [x] Feature requirements documented (P0/P1/P2)
- [x] Design direction documented (Stripe Dashboard, Light Mode)
- [x] Tech stack proposed
- [x] Data sources identified
- [ ] **Boss Approval Required** ← NEXT STEP

---

## 🔄 Next Steps

1. ✅ CEO reviews and approves this registration
2. 🔄 **Phase 1: Requirements Research (COO)**
3. Phase 1.5: AI Advisor Review (4 AI models)
4. Phase 2: Design (CDO)

---

## 📋 Meeting Minutes Tracking

每個 Phase 完成後，會生成 Meeting Minutes 記錄：

| Phase | Meeting Minutes File | Status |
|-------|---------------------|--------|
| Phase 0 | ✅ `P2026-008_Phase0_MeetingMinutes.md` | ✅ Generated |
| Phase 1 | `P2026-008_Phase1_MeetingMinutes.md` | 🔄 Pending |
| Phase 1.5 | `P2026-008_Phase1_5_MeetingMinutes.md` | 🔄 Pending |
| Phase 2 | `P2026-008_Phase2_MeetingMinutes.md` | 🔄 Pending |
| Phase 3 | `P2026-008_Phase3_MeetingMinutes.md` | 🔄 Pending |
| Phase 4 | `P2026-008_Phase4_MeetingMinutes.md` | 🔄 Pending |
| Phase 4.5 | `P2026-008_Phase4_5_MeetingMinutes.md` | 🔄 Pending |
| Phase 5 | `P2026-008_Phase5_MeetingMinutes.md` | 🔄 Pending |
| Phase 6 | `P2026-008_Phase6_MeetingMinutes.md` | 🔄 Pending |

---

## 📝 Phase 0 Meeting Minutes (2026-04-01 10:45 HKT)

### Attendees
- CEO (Fabio) — Project Owner

### Agenda
1. Project vision and scope confirmation
2. Feature requirements review
3. Design direction decision
4. Tech stack approval

### Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Project Approved** | Enterprise Mission Control Dashboard confirmed |
| 2 | **Design Direction: Stripe Dashboard** | Modern, Clean, Enterprise Grade |
| 3 | **Mode: Light Mode** | Enterprise standard, Stripe style reference |
| 4 | **Auth: Google OAuth + Email/Password** | Flexible login options |
| 5 | **Real-time: 30s polling** | Balance between freshness and server load |

### Feature Confirmation

| Priority | Feature | Confirmed |
|----------|---------|-----------|
| P0-01 | VPS System Monitor | ✅ |
| P0-02 | Agent Status Panel | ✅ |
| P0-03 | Agent Reasoning Logs | ✅ |
| P0-04 | Agent Discussion Threads | ✅ |
| P0-05 | AI Advisor Threads | ✅ |
| P0-06 | Project Status Grid | ✅ |
| P0-07 | Research Showcase | ✅ |
| P0-08 | Hot Trends Dashboard | ✅ |
| P0-09 | Real-time Auto-update | ✅ |
| P0-10 | Modern Enterprise UI | ✅ |

### Open Questions
- None — all key decisions confirmed

### Action Items

| Action | Owner | Due |
|--------|-------|-----|
| Phase 1: Requirements Research | COO | TBD |
| Phase 1.5: AI Advisor Review | COO + CDO | TBD |
| Phase 2: Design | CDO | TBD |

---

**CEO_SIGNED:** `[FABIO_CEO_SIGNED_2026-04-01_1045_HKT]`
**REGISTRATION_STATUS:** APPROVED
