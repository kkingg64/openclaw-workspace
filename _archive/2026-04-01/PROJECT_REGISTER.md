# 📋 PROJECT REGISTER - MADHORSE Ltd.

| Project ID | Name | Phase | Status | Owner |
|------------|------|-------|--------|-------|
| P2026-001 | Dashboard | BAU | 🟢 Active | CEO |
| P2026-002 | Meal Planner | Phase 5 | 🟡 UAT | CEO |
| P2026-003 | Research Dashboard | Phase 4 | 🟢 Deployed | CEO |
| P2026-004 | AI Mahjong Arena | Phase 4 | 🟢 Complete | CEO |
| P2026-005 | AI Smart Butler (Amway) | Phase 4 | 🟢 Complete | CEO |
| P2026-006 | ~~Baserow Migration~~ | ~~Cancelled~~ | 🔴 Cancelled | CEO |
| P2026-007 | ViralShorts | Phase 0 | 🟣 Registered | CEO |

---

## P2026-001 - Dashboard
- **Description:** Internal dashboard
- **Phase:** BAU (Business as Usual)
- **Status:** Active
- **URL:** http://76.13.215.13/

---

## P2026-002 - Meal Planner
- **Description:** AI-powered meal planning app
- **Phase:** Phase 5 (UAT)
- **Status:** Testing
- **URL:** http://meal.marhorse.cloud/

---

## P2026-003 - Research Dashboard
- **Description:** Market research dashboard
- **Phase:** Phase 4 Enhanced (Data Layer Rebuild)
- **Status:** 🔄 In Progress
- **URL:** https://research.marhorse.cloud
- **Last Audit:** 2026-03-30 (CTO Assessment)
- **Note:** 原架構 80% 可重用，聚焦數據層串接（GitHub API + MiniMax AI Summary）

---

## P2026-004 - AI Mahjong Arena
- **Description:** Multi-agent AI Mahjong battle platform
- **Phase:** Phase 4 (Complete)
- **Status:** Demo Running
- **URL:** http://76.13.215.13/mahjong-demo.html

---

## P2026-005 - AI Smart Butler (Amway + WhatsApp)

### Project Overview
**Name:** AI 智能大管家  
**Purpose:** Integrate AI into Amway business with WhatsApp, providing tiered access for different roles (Pioneer, Platinum, Founders)
**Code Path:** `projects/P2026-005_AI_Butler/` (alias -> `projects/P005_AI_Butler/`)
**Docs Path:** `projects/P2026-005_ProjectDocuments/` (to be created)

### Completed Phases
- ✅ Phase 1: Research (WhatsApp API, RAG, Amway digitalization)
- ✅ Phase 2: Data Model + UI Spec
- ✅ Phase 3: Tech Spec + Security
- ✅ Phase 4: Deployment (n8n, PostgreSQL, AI Prompt, Admin Panel Spec)

### 部署伺服器 (2026-03-12 更新)
- **目標伺服器:** Mac Mini
- **IP:** 100.102.72.91
- **用戶:** openclaw
- **密碼:** `[見 .env → MAC_MINI_PASSWORD]` ⛔ 明文已移除
- **n8n:** http://100.102.72.91:5678 (待安裝)
- **Database:** PostgreSQL + pgvector (待安裝)
- **Cache:** Redis (待安裝)

### Next Steps
- Mac Mini 安裝 Docker Desktop
- 部署 n8n + PostgreSQL + Redis
- 註冊 Green API
- WhatsApp Integration Testing
- Phase 5 UAT

---

## P2026-006 - Baserow Migration
- **Description:** ~~將現有資料結構遷移到 Baserow，減低手動維護成本~~
- **Phase:** ~~Phase 1 (Research)~~ 🔴 **CANCELLED**
- **Status:** 🔴 Cancelled (2026-04-01 by CEO)
- **URL:** N/A

---

## P2026-007 - ViralShorts
- **Description:** AI 驅動短影片選題、腳本、發佈流水線
- **Phase:** Phase 0 (Registered)
- **Status:** Waiting for Phase 1 kickoff
- **URL:** N/A (規劃中)
- **Code Path:** `projects/P2026-007_ViralShorts/`
- **Docs Path:** `projects/P2026-007_ProjectDocuments/`

---

- **Description:** 內部 Agent 監控 + COO 研究成果展示
- **Phase:** Phase 0 (Registered)
- **Status:** Planning
- **URL:** N/A (內部使用)
- **目標：** 實時顯示所有 Agents 工作狀態 + COO Research Dashboard

---

*Last Updated: 2026-03-31*
*Version: 1.3*

---

## P2026-008 - MADHORSE HQ
- **Description:** 內部網站，展示所有 Agents 工作狀態 + COO 研究成果
- **Phase:** Phase 0 (Registered)
- **Status:** 🟣 Registered
- **URL:** N/A (規劃中)
- **Code Path:** `projects/P2026-008_MADHORSE_HQ/`
- **Docs Path:** `projects/P2026-008_ProjectDocuments/`
