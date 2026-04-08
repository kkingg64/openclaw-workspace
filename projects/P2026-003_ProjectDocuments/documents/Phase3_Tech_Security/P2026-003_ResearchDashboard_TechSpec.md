# P2026-003 Research Dashboard - Technical Specification

**Project:** Research Dashboard  
**Phase:** 3 - Technical Design (REVISED)  
**Owner:** CTO (fabio-cto)  
**Date:** 2026-03-08  
**Status:** **REVISED** (Matching Phase 2 Design)

---

## 1. Executive Summary

**Objective:** 將 COO 既市場研究成果視覺化展示畀老闆同管理層睇。

**Scope:** 
- 展示市場趨勢數據
- 展示競爭對手分析圖表
- 展示業務營運 KPI
- 6 個 pages 既完整功能 (Home, Trending, Research, Business, Competitors, Settings)

**Non-Scope:**
- 用戶認證系統 (除非老闆要求)
- 數據寫入/編輯功能 (只讀展示)

---

## 2. Technology Stack

### 2.1 Frontend Framework

| Component | Choice | Version | Rationale |
|-----------|--------|---------|-----------|
| **Framework** | Next.js | 14.x (App Router) | 現有 ecosystem 成熟, SSR support |
| **Language** | TypeScript | 5.x | Type safety, 減少 runtime errors |
| **UI Library** | Tailwind CSS + shadcn/ui | Latest | 輕量, customisable, No Magic |

### 2.2 Data Visualization

| Component | Choice | Version | Rationale |
|-----------|--------|---------|-----------|
| **Charts** | Recharts | ^2.12.x | React-native, 5k+ stars, easy to customize |
| **Charts Alt** | Tremor | ^3.x | Tailwind-native, good for dashboards |

### 2.3 State Management

| Component | Choice | Rationale |
|-----------|--------|-----------|
| **State** | React Context + useState | Simple, no external deps needed |
| **Data Fetching** | SWR | Lightweight, caching, revalidation |

### 2.4 Hosting & Deployment

| Environment | Choice | Rationale |
|-------------|--------|-----------|
| **Primary** | Hostinger VPS (Docker) | Self-host, full control |
| **Fallback** | Hostinger VPS (Docker) | Self-host if offline required |

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   Hostinger VPS (Docker)                        │
│  ┌─────────────────────────────────────────┐   │
│  │         Next.js 14 (App Router)          │   │
│  │  ┌────────────────────────────────────┐  │   │
│  │  │      Pages/Components              │  │   │
│  │  │  - Dashboard Layout                │  │   │
│  │  │  - Chart Components                │  │   │
│  │  │  - Data Cards                      │  │   │
│  │  │  - Interactive Features            │  │   │
│  │  └────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│   Data Source (Static JSON / API endpoint)      │
│   - COO Research Data                           │
│   - Market Trends (GitHub API)                  │
│   - Competitor Analysis                         │
└─────────────────────────────────────────────────┘
```

---

## 4. Component Specification

### 4.1 Core Pages (Matching Phase 2 Design)

| Page | Path | Description | Priority |
|------|------|-------------|----------|
| **Home** | `/` | Dashboard 總覽 + KPI Cards + Charts | Primary |
| **Trending** | `/trending` | GitHub Trending 項目 + Charts | Primary |
| **Research** | `/research` | 市場研究摘要 + Timeline | Primary |
| **Business** | `/business` | 商業機會與 ROI + Priority Matrix | Primary |
| **Competitors** | `/competitors` | 競爭對手分析 + Comparison Matrix | Secondary |
| **Settings** | `/settings` | 系統設定 + Export | Footer |

### 4.2 Interactive Features (From Phase 2 Design)

#### Home Page Features:
- ✅ 4 KPI Cards (Click 可以 Drill-down)
- ✅ Trending Projects Bar Chart (Top 10)
- ✅ Research Summary (Current Focus + Trends)
- ✅ Competitor Overview Cards (Click 進入詳細 Page)
- ✅ Refresh 按鈕 + Last Updated 時間

#### Trending Page Features:
- ✅ Search Bar (即時搜尋)
- ✅ Filter (Category, Stars Range, Growth)
- ✅ Sort (Stars, Growth, Recently Updated)
- ✅ Line Chart (Stars Over Time)
- ✅ Pie Chart (Category Breakdown)
- ✅ Paginated List (10 items per page)
- ✅ Click Row 進入 Project Detail (Future)

#### Research Page Features:
- ✅ Timeline Filter (Today, Yesterday, This Week, This Month, All Time)
- ✅ Research Cards (標題 + 內容 + Tags + Hotness Score)
- ✅ Research Metrics (Total Notes, This Week, Avg Hotness, Topics)
- ✅ Click Card 展開詳細內容
- ✅ Tags Filter (Click 可以 Filter)

#### Business Page Features:
- ✅ Priority Matrix (Impact vs Effort Chart)
- ✅ Priority Ranking List (ROI Score 排序)
- ✅ 每個 Opportunity 既詳細資訊 (Effort, Impact, Time)
- ✅ Action Items (This Week, Next Sprint, This Quarter)
- ✅ Checkbox 可以勾選完成既 Action

#### Competitors Page Features:
- ✅ Competitor Cards Grid
- ✅ Select to Compare (最多 3 個)
- ✅ Comparison Matrix Table
- ✅ Detailed Profile View
- ✅ Strengths/Weaknesses Analysis
- ✅ MADHOUSE Opportunity Score

#### Settings Page Features:
- ✅ Auto Refresh 設定
- ✅ Theme 切換 (Light/Dark/System)
- ✅ Export 功能 (PDF, CSV, Email)
- ✅ Notification 設定
- ✅ Account 資訊

### 4.3 Reusable Components

| Component | Description |
|-----------|-------------|
| `KPICard` | 單一指標卡片 (value, label, trend indicator) |
| `LineChartWidget` | 趨勢圖 (市場增長率) |
| `BarChartWidget` | 比較圖 (競爭對手比較) |
| `RadarChartWidget` | 能力分析圖 |
| `PieChartWidget` | 佔比圖 (市場份額) |
| `DataTable` | 詳細數據表格 |
| `SearchBar` | 搜尋組件 |
| `FilterDropdown` | 過濾下拉選單 |
| `SortDropdown` | 排序下拉選單 |
| `Pagination` | 分頁組件 |
| `TimelineFilter` | 時間線篩選 |
| `TagFilter` | 標籤過濾 |
| `ActionItemCheckbox` | 行動項目勾選 |
| `ThemeToggle` | 主題切換 |
| `ExportButton` | 匯出按鈕 |

### 4.4 Data Structure

```typescript
// Dashboard Data
interface DashboardData {
  kpis: {
    totalProjects: number;
    totalStars: number;
    weeklyGrowth: number;
    topCategory: string;
  };
  trending: TrendingProject[];
  research: ResearchNote[];
  opportunities: BusinessOpportunity[];
  competitors: Competitor[];
  lastUpdated: string;
  user: UserProfile;
}

// Trending Project
interface TrendingProject {
  id: string;
  name: string;
  fullName: string;
  stars: number;
  growth: number;
  category: string;
  hotness: 'very-hot' | 'hot' | 'stable' | 'cold';
  description: string;
  updatedAt: string;
}

// Research Note
interface ResearchNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  hotness: number; // 1-5
  createdAt: string;
  timeSpent: string;
}

// Business Opportunity
interface BusinessOpportunity {
  id: string;
  title: string;
  description: string;
  roiScore: number;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  estimatedTime: string;
  status: 'quick-win' | 'long-term' | 'medium';
}

// Competitor
interface Competitor {
  id: string;
  name: string;
  stars: number;
  status: 'active' | 'early' | 'deprecated';
  tags: string[];
  overview: string;
  growth: string;
  website: string;
  github: string;
  strengths: string[];
  weaknesses: string[];
  madhouseOpportunity: string;
}

// User Profile
interface UserProfile {
  name: string;
  email: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  autoRefresh: 'off' | 'hourly' | 'daily';
  notifications: {
    starsChange: boolean;
    weeklySummary: boolean;
    dailyUpdates: boolean;
  };
}
```

---

## 5. UI/UX Design (Matching Phase 2 Design)

### 5.1 Design System

#### Color Palette (From Design Spec)

| 用途 | 顏色 | Hex Code | Usage |
|------|------|----------|-------|
| **Primary** | Deep Navy | `#0F172A` | Header, Primary Buttons |
| **Secondary** | Sky Blue | `#0EA5E9` | Links, Secondary Actions |
| **Accent** | Amber | `#F59E0B` | Highlights, Warnings |
| **Success** | Emerald | `#10B981` | Positive indicators |
| **Danger** | Rose | `#F43F5E` | Alerts, Negative trends |
| **Background** | Slate 50 | `#F8FAFC` | Page background |
| **Card BG** | White | `#FFFFFF` | Cards, Containers |
| **Text Primary** | Slate 900 | `#0F172A` | Headings |
| **Text Secondary** | Slate 500 | `#64748B` | Body text |

#### Typography (From Design Spec)

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Page Title | Inter | 28px | 700 | 1.2 |
| Section Header | Inter | 20px | 600 | 1.3 |
| Card Title | Inter | 16px | 600 | 1.4 |
| Body Text | Inter | 14px | 400 | 1.5 |
| Caption | Inter | 12px | 500 | 1.4 |
| KPI Number | Inter | 36px | 700 | 1.1 |

#### Spacing System (8px Grid)

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing |
| `sm` | 8px | Component internal |
| `md` | 16px | Card padding |
| `lg` | 24px | Section spacing |
| `xl` | 32px | Page margins |
| `2xl` | 48px | Large gaps |

### 5.2 Component States

| State | Style |
|-------|-------|
| **Default** | White bg, subtle shadow (`0 1px 3px rgba(0,0,0,0.1)`) |
| **Hover** | Slight lift (`transform: translateY(-2px)`), darker shadow |
| **Active/Selected** | Primary color border, filled bg |
| **Disabled** | 50% opacity, no pointer events |
| **Loading** | Skeleton animation (shimmer effect) |
| **Error** | Red border, error message below |

### 5.3 Animation Specs

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Page Load | 300ms | ease-out | On mount |
| Card Hover | 200ms | ease-in-out | On hover |
| Modal Open | 250ms | ease-out | On click |
| Data Update | 300ms | ease-in-out | On refresh |
| Toast Notification | 200ms | ease-out | Auto |

### 5.4 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, stacked cards |
| Tablet | 640-1024px | 2 columns, collapsible sidebar |
| Desktop | > 1024px | Full grid, sidebar visible |

### 5.5 Layout (From Phase 2 Design)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PAGE FLOW DIAGRAM                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐          │
│    │              │     │              │     │              │          │
│    │   📊 HOME    │────▶│   📈 TRENDING │────▶│   🔬 RESEARCH │          │
│    │  Dashboard   │     │   Projects    │     │   Insights    │          │
│    │              │     │              │     │              │          │
│    └──────────────┘     └──────────────┘     └──────────────┘          │
│          │                    │                    │                     │
│          │                    │                    │                     │
│          ▼                    ▼                    ▼                     │
│    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐          │
│    │              │     │              │     │              │          │
│    │   💰 BUSINESS│     │   🏢 COMPETITOR│    │   ⚙️ SETTINGS │          │
│    │  Opportunities│    │   Analysis    │     │              │          │
│    │              │     │              │     │              │          │
│    └──────────────┘     └──────────────┘     └──────────────┘          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Security Assessment (CISO Review)

### 6.1 Data Classification

| Data Type | Sensitivity | Risk Level |
|-----------|-------------|------------|
| Market Research Data | Low | ✅ SAFE |
| Competitor Analysis | Low | ✅ SAFE |
| Business KPI | Medium | ✅ SAFE |
| User Personal Data | N/A | N/A (Not in scope) |

### 6.2 Security Controls

- ✅ No user authentication required (public dashboard)
- ✅ No PII stored
- ✅ Static data only (no database)
- ✅ Read-only (no write operations)
- ✅ External API calls via server-side only

### 6.3 API Security

| Endpoint | Method | Auth Required | Rate Limit |
|----------|--------|---------------|-------------|
| GitHub API | GET | Token (server-side) | 5000/hr |
| Internal Data | GET | No | N/A |

### 6.4 CISO Status

> **⏳ PENDING CISO REVIEW**
> 
> 需要 CISO (fabio-ciso) 進行安全審核並簽發 CISO_SAFE_TO_DEPLOY。

---

## 7. Development Roadmap

### Phase 4: Implementation

| Task | Estimate | Priority |
|------|----------|----------|
| Initialize Next.js project | 1 hour | P0 |
| Setup Tailwind + shadcn/ui | 1 hour | P0 |
| Create Dashboard Layout (6 pages) | 3 hours | P0 |
| Implement KPI Cards (Home) | 2 hours | P1 |
| Implement Trending Charts + List | 3 hours | P1 |
| Implement Search/Filter/Sort/Pagination | 2 hours | P1 |
| Implement Research Timeline + Tags | 2 hours | P1 |
| Implement Business Priority Matrix | 2 hours | P1 |
| Implement Competitor Comparison | 2 hours | P1 |
| Implement Settings + Export | 2 hours | P1 |
| Theme Toggle (Light/Dark/System) | 1 hour | P2 |
| Auto Refresh Feature | 1 hour | P2 |
| Connect Data (static JSON) | 2 hours | P1 |
| Deploy to Hostinger VPS (Docker) | 1 hour | P2 |
| **Total** | **~23 hours** | |

---

## 8. Alternative Options Considered

### Option A: React + Chart.js
- **Pros:** Mature, lots of examples
- **Cons:** Not React-native (wrapper), larger bundle size
- **Decision:** ❌ Rejected - prefer React-native solution

### Option B: Vue.js + ECharts
- **Pros:** Powerful visualization
- **Cons:** Different ecosystem, extra learning curve
- **Decision:** ❌ Rejected - stay with React ecosystem

### Option C: Pure HTML/Bootstrap
- **Pros:** Simple, fast
- **Cons:** No SSR, harder to maintain
- **Decision:** ❌ Rejected - Next.js provides better DX

---

## 9. References

- **Next.js Docs:** https://nextjs.org/docs
- **Recharts:** https://recharts.org/
- **shadcn/ui:** https://ui.shadcn.com/
- **TailAdmin Template:** https://github.com/TailAdmin/free-react-tailwind-admin-dashboard

---

## 10. Design Alignment Checklist

| Phase 2 Design Feature | Tech Spec Section | Status |
|------------------------|-------------------|--------|
| Home Page (6 KPI Cards + Charts) | Section 4.1, 4.2 | ✅ |
| Trending Page (Search/Filter/Sort/Pagination) | Section 4.2 | ✅ |
| Research Page (Timeline + Tags) | Section 4.2 | ✅ |
| Business Page (Priority Matrix + Action Items) | Section 4.2 | ✅ |
| Competitors Page (Comparison Matrix) | Section 4.2 | ✅ |
| Settings Page (Theme/Export/Auto Refresh) | Section 4.2 | ✅ |
| Color Palette | Section 5.1 | ✅ |
| Typography | Section 5.1 | ✅ |
| Spacing System | Section 5.1 | ✅ |
| Component States | Section 5.2 | ✅ |
| Animation Specs | Section 5.3 | ✅ |
| Responsive Breakpoints | Section 5.4 | ✅ |
| Data Models | Section 4.3 | ✅ |

---

## 11. Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| CTO | fabio-cto | 2026-03-08 | 🛠️ (Revised) |
| CISO | fabio-ciso | - | ⏳ Pending |
| CEO | fabio-boss | 2026-03-09 | ✅ `[CEO_SIGNED_2026_03_09_0718]` |

---

## ✅ CEO Review & Sign-off

- **Tech Stack:** ✅ Next.js + Recharts + Tailwind
- **Deployment:** ✅ Hostinger VPS (Docker) - Updated
- **Security:** ✅ CISO review pending

**Sign-off:** `[CEO_SIGNED_2026_03_09_0718]`  
**Boss Approval:** `[BOSS_APPROVED_2026_03_09]` → Proceed to Phase 4

---

*Document generated by CTO (fabio-cto) - Phase 3 Technical Design (Revised)*
*Revisions: Added all 6 pages, all features, design system, and alignment checklist*
