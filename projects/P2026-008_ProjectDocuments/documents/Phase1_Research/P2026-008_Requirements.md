# P2026-008 MADHORSE HQ — Functional Requirements

**項目:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 1 (Requirements Research)  
**日期:** 2026-04-01 HKT  
**執行者:** COO (Fabio)  
**狀態:** 🔄 IN_PROGRESS

---

## 📋 Executive Summary

本文件定義 MADHORSE HQ 嘅完整功能需求，包括所有 P0/P1/P2 功能、數據來源、API 規格、UI/UX 需求。

**目標用戶：** CEO (Fabio) — 需要全面掌握公司運營狀況

---

## 🎯 目標用戶

| 用戶 | 角色 | 需求 |
|------|------|------|
| **CEO (Fabio)** | 最終決策者 | 全面嘅公司視圖，包括 System/Agents/Projects/Research/Trends |
| **Viewer** | 僅查看 | Read-only access (if multi-user) |

---

## 📊 功能需求矩陣

### 🔴 P0 - MUST HAVE (Core MVP)

| ID | 功能 | 描述 | 驗收標準 |
|----|------|------|----------|
| P0-01 | **VPS System Monitor** | CPU / RAM / Storage / Network 實時監控 | 每 30 秒刷新，顯示即時數值 |
| P0-02 | **Agent Status Panel** | 6 個 Agent 狀態 (CEO/CTO/COO/CISO/CDO/Forex) | 狀態 (ACTIVE/BUSY/IDLE/ERROR)、當前任務 |
| P0-03 | **Agent Reasoning Logs** | 歷史 session 嘅 reasoning 過程 | 可查看任意 session嘅 reasoning |
| P0-04 | **Agent Discussion Threads** | Agent 之間嘅辯論/討論記錄 | OpenClaw Session Logs (`/sessions/{id}/messages`), role-based visibility (CEO: all, Investor: public only) |
| P0-05 | **AI Advisor Threads** | AI Advisor 諮詢過程記錄 | 4 模型討論完整記錄 |
| P0-06 | **Project Status Grid** | 所有項目進度概覽 | PROJECT_REGISTER.md 數據，階段/milestones |
| P0-07 | **Research Showcase** | COO 研究成果展示 | Featured + 分類展示 |
| P0-08 | **Hot Trends Dashboard** | 跨平台趨勢追蹤 | TikTok/小紅書/IG Reels/Twitter/YouTube |
| P0-09 | **Real-time Auto-update** | 30 秒自動刷新 | SSE or Polling |
| P0-10 | **Modern Enterprise UI** | Stripe Dashboard 風格 | Light Mode, Enterprise Grade |

### 🟡 P1 - SHOULD HAVE

| ID | 功能 | 描述 | 驗收標準 |
|----|------|------|----------|
| P1-01 | **Authentication** | Google OAuth + Email/Password | NextAuth.js v5 |
| P1-02 | **Role-based Access** | CEO (full) / Viewer (read-only) | RBAC middleware |
| P1-03 | **Project Milestone Tracker** | 詳細 milestone 進度 | Progress bars, completion % |
| P1-04 | **Search & Filter** | 跨模塊搜索 | Global search bar |
| P1-05 | **WCAG 2.1 AA Accessibility** | 鍵盤導航、屏幕閱讀器 | 對比度 4.5:1+ |

### 🟢 P2 - COULD HAVE

| ID | 功能 | 描述 | 備註 |
|----|------|------|------|
| P2-01 | **Export/Reports** | PDF/CSV 導出 | Phase 2+ |
| P2-02 | **Notifications** | 異常狀態報警 | Telegram webhook |
| P2-03 | **Custom Widgets** | 可自定義 widgets | User preference |

---

## 🏗️ 頁面結構

### Main Dashboard (`/`)
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Nav Tabs | Search | User Avatar | Logout  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ SYSTEM MONITOR (Top Row)                             │   │
│  │ [CPU] [RAM] [Storage] [Network] [Uptime]            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────┐   │
│  │ AGENT STATUS           │  │ PROJECT STATUS         │   │
│  │ [6 Agent Cards Grid]   │  │ [Project Cards Grid]   │   │
│  └────────────────────────┘  └────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ RECENT ACTIVITY / QUICK ACTIONS                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Agent Intelligence (`/agents`)
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
├───────────┬─────────────────────────────────────────────────┤
│  SIDEBAR  │  MAIN CONTENT                                   │
│           │                                                 │
│  [Agent   │  ┌─────────────────────────────────────────┐   │
│   List]   │  │ Agent Detail Card                       │   │
│           │  │ - Name, Role, Status                    │   │
│           │  │ - Current Task                          │   │
│           │  │ - Reasoning Log (expandable)            │   │
│           │  │ - Discussion Threads                    │   │
│           │  └─────────────────────────────────────────┘   │
│           │                                                 │
│           │  ┌─────────────────────────────────────────┐   │
│           │  │ Agent Discussions                        │   │
│           │  │ [Thread 1] [Thread 2] [Thread 3]       │   │
│           │  └─────────────────────────────────────────┘   │
└───────────┴─────────────────────────────────────────────────┘
```

### Research Hub (`/research`)
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ FEATURED RESEARCH (Spotlight Card)                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Filter: All | Market | AI | Strategy | Tech]            │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│  │Research │  │Research │  │Research │  │Research │      │
│  │ Card 1  │  │ Card 2  │  │ Card 3  │  │ Card 4  │      │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ TRENDING TOPICS                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Hot Trends (`/trends`)
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Platform Selector: TikTok | 小紅書 | IG | Twitter | YT]  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ TRENDING NOW (Top 5 Topics)                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│  │ Hot     │  │ Hot     │  │ Hot     │  │ Hot     │      │
│  │ Topic 1 │  │ Topic 2 │  │ Topic 3 │  │ Topic 4 │      │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ HOT REELS SPOTLIGHT                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔌 API 需求

### 1. System Info API

**Endpoint:** `GET /api/system`  
**數據源:** SSH → `df -h | free -m | top -bn1`  
**刷新頻率:** 30s Polling  
**訪問限制:** CEO only

**Response:**
```json
{
  "cpu": {
    "usage": 42.5,
    "cores": 4,
    "temperature": 58
  },
  "ram": {
    "used": 8192,
    "total": 16384,
    "percentage": 50
  },
  "storage": {
    "used": 256,
    "total": 512,
    "percentage": 50,
    "mount": "/"
  },
  "network": {
    "inbound": 125.4,
    "outbound": 89.2,
    "unit": "MB/s"
  },
  "uptime": 86400,
  "timestamp": "2026-04-01T10:30:00Z"
}
```

### 2. Agent Status API

**Endpoint:** `GET /api/agents`  
**數據源:** OpenClaw Sessions API  
**刷新頻率:** 30s Polling

**Response:**
```json
{
  "agents": [
    {
      "id": "fabio-boss",
      "name": "CEO Fabio",
      "role": "CEO",
      "status": "ACTIVE",
      "currentTask": "Project Oversight",
      "lastActive": "2026-04-01T10:30:00Z"
    }
  ],
  "timestamp": "2026-04-01T10:30:00Z"
}
```

### 3. Agent Reasoning Logs API

**Endpoint:** `GET /api/agents/{id}/reasoning`  
**數據源:** OpenClaw Sessions History  
**Response:**
```json
{
  "agentId": "fabio-cto",
  "sessions": [
    {
      "sessionId": "uuid",
      "startedAt": "2026-04-01T10:00:00Z",
      "reasoningLogs": [
        {
          "timestamp": "2026-04-01T10:01:00Z",
          "thought": "I need to analyze the architecture..."
        }
      ]
    }
  ]
}
```

### 4. Agent Discussions API

**Endpoint:** `GET /api/discussions`  
**Query:** `?project=P2026-008&type=debate|discussion|advisor`  
**Response:**
```json
{
  "discussions": [
    {
      "id": "uuid",
      "title": "CTO vs CDO: Tech Stack Decision",
      "type": "debate",
      "participants": ["CTO", "CDO"],
      "projectId": "P2026-008",
      "messages": [...],
      "outcome": "Decided: Next.js + shadcn/ui"
    }
  ]
}
```

### 5. Project Status API

**Endpoint:** `GET /api/projects`  
**數據源:** PROJECT_REGISTER.md  
**刷新頻率:** 60s Polling

**Response:**
```json
{
  "projects": [
    {
      "id": "P2026-001",
      "name": "Dashboard",
      "phase": "BAU",
      "status": "Active",
      "owner": "CEO",
      "milestones": { "completed": 3, "total": 3 },
      "progress": 100
    }
  ]
}
```

### 6. Research API

**Endpoint:** `GET /api/research`  
**Query:** `?category=market|ai|strategy|tech&limit=20`  
**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "title": "SaaS Pricing Trends 2026",
      "summary": "...",
      "category": "market",
      "date": "2026-03-30",
      "tags": ["saas", "pricing"],
      "roiPotential": "High",
      "featured": true
    }
  ]
}
```

### 7. Hot Trends API

**Endpoint:** `GET /api/trends`  
**Query:** `?platform=tiktok|xhs|instagram|twitter|youtube`  
**Response:**
```json
{
  "platform": "tiktok",
  "trends": [
    {
      "rank": 1,
      "topic": "#AIStartup",
      "views": 12500000,
      "engagement": "High",
      "relatedReels": [...]
    }
  ],
  "lastUpdated": "2026-04-01T10:30:00Z"
}
```

---

## 🎨 UI/UX 需求

### Design System (MADHORSE Enterprise)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#F6F9FC` | Page background |
| `--color-surface` | `#FFFFFF` | Card backgrounds |
| `--color-primary` | `#635BFF` | Primary actions, links |
| `--color-accent` | `#0EA5E9` | Highlights, active states |
| `--color-text` | `#1A1A2E` | Primary text |
| `--color-text-muted` | `#6B7280` | Secondary text |
| `--color-border` | `#E5E7EB` | Borders, dividers |
| `--color-success` | `#10B981` | Positive states |
| `--color-warning` | `#F59E0B` | Warning states |
| `--color-error` | `#EF4444` | Error states |

### Typography

| Style | Font | Size | Weight |
|-------|------|------|--------|
| H1 | Inter | 32px | 700 |
| H2 | Inter | 24px | 600 |
| H3 | Inter | 18px | 600 |
| Body | Inter | 14px | 400 |
| Label | Inter | 12px | 500 |
| Caption | Inter | 11px | 400 |

### Spacing (8px Grid)

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |

### Border Radius

| Element | Radius |
|---------|--------|
| Cards | 12px |
| Buttons | 8px |
| Inputs | 6px |
| Badges | 999px (pill) / 6px |

### Shadows

```css
/* Card Shadow */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);

/* Elevated Card */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);

/* Modal */
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
```

---

## ♿ Accessibility (WCAG 2.1 AA)

| 要求 | 標準 | 實現 |
|------|------|------|
| 顏色對比度 | 4.5:1+ | 所有 text/bg 組合 |
| 鍵盤導航 | 所有功能可鍵盤操作 | Tab focus, Enter activation |
| 焦點指示 | 可見 focus ring | `outline: 2px solid var(--color-primary)` |
| ARIA Labels | 所有 interactive elements | `aria-label`, `aria-describedby` |
| Skip Link | 跳過導航到內容 | 頁面頂部 skip link |
| Error 識別 | 非僅顏色區分 | icon + text 雙重 |

---

## 🔐 Authentication & Authorization

### Login Methods
| Provider | Status |
|----------|--------|
| Google OAuth | Required |
| Email + Password | Required |

### Role-Based Access Control
| Role | Access |
|------|--------|
| CEO | Full access (all modules) |
| Viewer | Read-only access |

### Auth Security Requirements
- JWT 有效期: 1 小時
- Refresh Token: 7 天
- Session Revocation on logout
- Rate Limiting: 5 attempts, 15 min lockout

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Desktop XL | ≥1440px | Full layout, 4-column grids |
| Desktop | 1024-1439px | Full layout, 3-column grids |
| Tablet | 768-1023px | Sidebar → hamburger, 2-column grids |
| Mobile | <768px | Single column, stacked cards |

---

## 📈 Performance Requirements

| Metric | Target |
|--------|--------|
| Page Load (LCP) | < 2.5s |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.5s |
| Real-time Update Latency | < 5s |
| Lighthouse Score | > 90 |

---

## ✅ 驗收標準 (UAT Criteria)

### P0 Critical (Must Pass)

| Test Case | 描述 | 預期結果 |
|-----------|------|----------|
| TC-01 | System Monitor loads | CPU/RAM/Storage/Network displayed |
| TC-02 | Agent Status displays | All 6 agents shown with correct status |
| TC-03 | Agent Reasoning visible | Can expand and view reasoning log |
| TC-04 | Agent Discussions loads | Discussion threads displayed |
| TC-05 | Project Status Grid | All projects with progress bars |
| TC-06 | Research Showcase | Featured + filtered research cards |
| TC-07 | Hot Trends Dashboard | Platform selector + trending topics |
| TC-08 | Real-time auto-update | Data refreshes every 30s |
| TC-09 | Light Mode renders | Enterprise light theme applied |
| TC-10 | Login works | Google OAuth + Email login functional |

### P1 Should Pass

| Test Case | 描述 |
|-----------|------|
| TC-11 | Search returns results across modules |
| TC-12 | Milestone details expandable |
| TC-13 | Mobile layout responsive |
| TC-14 | Keyboard navigation works |

---

## 📁 文件結構

```
P2026-008_MADHORSE_HQ/
├── app/
│   ├── page.tsx                    # Main Dashboard
│   ├── agents/
│   │   ├── page.tsx               # Agent Status
│   │   └── [id]/page.tsx         # Agent Detail
│   ├── discussions/page.tsx       # Discussion Threads
│   ├── projects/page.tsx          # Project Status
│   ├── research/page.tsx          # Research Hub
│   ├── trends/page.tsx            # Hot Trends
│   ├── login/page.tsx             # Authentication
│   ├── api/
│   │   ├── system/route.ts        # System Info
│   │   ├── agents/route.ts        # Agent Status
│   │   ├── agents/[id]/reasoning/route.ts
│   │   ├── discussions/route.ts
│   │   ├── projects/route.ts
│   │   ├── research/route.ts
│   │   ├── trends/route.ts
│   │   └── auth/[...nextauth]/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── SystemMonitor/
│   ├── AgentCard/
│   ├── AgentDetail/
│   ├── ReasoningLog/
│   ├── DiscussionThread/
│   ├── ProjectCard/
│   ├── ResearchCard/
│   ├── TrendsCard/
│   └── layout/
├── lib/
│   ├── api.ts                     # API client
│   ├── auth.ts                    # NextAuth config
│   └── utils.ts
└── styles/
    └── globals.css                # Design tokens
```

---

**COO_SIGNED:** `[FABIO_COO_SIGNED_2026-04-01_1045_HKT]`
