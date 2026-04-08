# 🎨 P2026-003 Research Dashboard - Phase 2 Re-Design

**Project:** P2026-003 Research Dashboard  
**Phase:** 2 - UI/UX Design (REVISED)  
**Designed by:** CDO (Chief Design Officer)  
**Date:** 2026-03-08  
**Status:** **RE-DESIGNED** (Based on CEO Feedback)

---

## 📋 設計目標

老闆認為原有 Design 不足，需要：
1. **明確既 Wireframe** - 視覺化既 Layout 圖
2. **Page Flow 圖** - 清楚既導航結構
3. **每個 Page 既功能** - 明確既功能定義
4. **UI/UX 細節** - 互動、動畫、狀態

---

## 🗺️ Page Structure & Flow

### Page Flow 圖

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

Legend:
=======
[━] Primary Navigation (Header Menu)
[→] Drill-down / Detail View
[⤴] Back to Home
```

### Navigation Structure

| Page | Route | Description | Priority |
|------|-------|-------------|----------|
| **Home** | `/` | Dashboard 總覽 | Primary |
| **Trending** | `/trending` | GitHub Trending 項目 | Primary |
| **Research** | `/research` | 市場研究摘要 | Primary |
| **Business** | `/business` | 商業機會與 ROI | Primary |
| **Competitors** | `/competitors` | 競爭對手分析 | Secondary |
| **Settings** | `/settings` | 系統設定 | Footer |

---

## 📐 Page Wireframes

### PAGE 1: Home (Dashboard 總覽)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🔬 RESEARCH DASHBOARD                    [Settings ⚙️] [Theme 🌙]      │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │  📊 TOTAL   │ │  ⭐ TOTAL   │ │  📈 WEEKLY  │ │  🔥 TOP    │        │
│  │  PROJECTS   │ │   STARS     │ │   GROWTH    │ │  CATEGORY  │        │
│  │             │ │             │ │             │ │             │        │
│  │     127     │ │   45.2K     │ │   +2,340    │ │  AI Agent   │        │
│  │   (▲12%)    │ │   (▲8.5%)   │ │   (this wk) │ │             │        │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                                          │
├────────────────────────────────┬─────────────────────────────────────────┤
│                                │                                         │
│   TRENDING PROJECTS (Bar)      │   📝 RESEARCH SUMMARY                  │
│   ┌────────────────────────┐   │                                         │
│   │ langchain  ████████████│   │   🔬 Current Focus:                     │
│   │ auto-eval  ██████████   │   │   "AI Agent Evaluation Tools"          │
│   │ trulens    ████████     │   │                                         │
│   │ braintrust ███████      │ │   ────────────────────────────────       │
│   │ agentops   ██████       │ │                                         │
│   │ memgpt     █████        │ │   📈 Market Trends:                      │
│   └────────────────────────┘   │   ┌─────────────────────────────────┐   │
│                                │   │ • AI Agent 市場增長迅速 (Hot!)   │   │
│   [View All →]                 │   │ • Evaluation 工具需求上升       │   │
│                                │   │ • AgentOps 尚有市場缺口          │   │
├────────────────────────────────┤   └─────────────────────────────────┘   │
│                                                                          │
│   📊 COMPETITOR OVERVIEW (Cards - Scrollable)                           │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│   │ AgentOps │ │ TruLens  │ │  MLflow  │ │Braintrust│ │  Genie   │    │
│   │  ⭐ 2.1K │ │  ⭐ 3.8K  │ │ ⭐ 25.0K  │ │  ⭐ 1.2K  │ │  ⭐ 890  │    │
│   │   [View] │ │   [View]  │ │   [View]  │ │   [View]  │ │   [View]  │    │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  Last Updated: 12:35 UTC  •  [🔄 Refresh]  •  Data Source: GitHub API  │
└──────────────────────────────────────────────────────────────────────────┘
```

**功能：**
- ✅ 4 個 KPI Cards (Click 可以 Drill-down)
- ✅ Trending Projects Bar Chart (Top 10)
- ✅ Research Summary (Current Focus + Trends)
- ✅ Competitor Overview Cards (Click 進入詳細 Page)
- ✅ Refresh 按鈕 + Last Updated 時間

---

### PAGE 2: Trending Projects (趨勢項目)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🔬 RESEARCH DASHBOARD > Trending                    [← Back] [⚙️]    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  🔍 Search Projects...                      [Filter ▼] [Sort ▼]   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌─────────────────────────────────────────┐ ┌─────────────────────────┐ │
│  │  📈 Stars Over Time                      │ │  📊 Category Breakdown │ │
│  │                                         │ │                         │ │
│  │         📈                               │ │    AI Agent ████ 45%   │ │
│  │        /   \                             │ │    Eval     ███ 25%    │ │
│  │       /     \   📈                        │ │    Memory   ██  15%    │ │
│  │      /       \                           │ │    Ops      █   10%    │ │
│  │     /         \                          │ │    Other    █    5%     │ │
│  │  ────────────────────                   │ │                         │ │
│  │   Wk1  Wk2  Wk3  Wk4                    │ │   [Pie Chart]           │ │
│  └─────────────────────────────────────────┘ └─────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  TRENDING PROJECTS LIST                                           │  │
│  │  ─────────────────────────────────────────────────────────────────  │  │
│  │  #1  │ langchain/langchain          │ ⭐ 52.3K │ +892 │ 🔥 Very Hot │ │
│  │  #2  │ TruEra/trulens               │ ⭐ 38.1K │ +456 │ 🔥 Hot      │ │
│  │  #3  │ mlflow/mlflow                │ ⭐ 25.0K │ +234 │ 🟡 Stable   │ │
│  │  #4  │ Braintrust/braintrust        │ ⭐ 12.8K │ +189 │ 🟡 Stable   │ │
│  │  #5  │ AgentOps/agentops            │ ⭐  2.1K │ +567 │ 🔥 Growing  │ │
│  │  ... │ ...                           │ ...      │ ...  │ ...         │ │
│  │                                                                   │  │
│  │  [← Prev]  [Page 1 of 10]  [Next →]                              │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**功能：**
- ✅ Search Bar (即時搜尋)
- ✅ Filter (Category, Stars Range, Growth)
- ✅ Sort (Stars, Growth, Recently Updated)
- ✅ Line Chart (Stars Over Time)
- ✅ Pie Chart (Category Breakdown)
- ✅ Paginated List (10 items per page)
- ✅ Click Row 進入 Project Detail (Future)

---

### PAGE 3: Research Insights (市場研究)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🔬 RESEARCH DASHBOARD > Research                      [← Back] [⚙️]  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📊 RESEARCH TIMELINE (Scrollable)                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │ Today  │ Yesterday │ This Week │ This Month │ All Time ▼          │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  🔬 AI AGENT EVALUATION MARKET                          🕐 2hrs  │  │
│  │  ──────────────────────────────────────────────────────────────   │  │
│  │  發現：AI Agent Evaluation 市場正在快速增長                        │  │
│  │  • TruEra (TruLens) 領先，Stars 增長 45%                          │  │
│  │  • 現有工具多數針對 LLM Eval，較少針對 Agent Eval                 │  │
│  │  • 市場缺口：Multi-Agent 協調評估工具                              │  │
│  │                                                                     │  │
│  │  💡 INSIGHT: "AgentOps 方向有機會，現有方案太重企業級"            │  │
│  │                                                                     │  │
│  │  🏷️ Tags: [AI Agent] [Evaluation] [Market Gap]                   │  │
│  │  📈 Hotness: ★★★★★ (Very Hot)                                     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  🔬 COMPETITOR ANALYSIS: TRULENS                       🕐 5hrs  │  │
│  │  ──────────────────────────────────────────────────────────────   │  │
│  │  發現：TruLens 定位為 "Evaluation for LLM Apps"                   │  │
│  │  • 強項：Trace-based Eval, OpenSource                            │  │
│  │  • 弱項：Agent-specific features 較少                            │  │
│  │                                                                     │  │
│  │  🎯 OPPORTUNITY: "簡易版 TruLens，面向 Agent 開發者"             │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  🔬 ROI ANALYSIS: BUILD VS BUY                          🕐 1day  │  │
│  │  ──────────────────────────────────────────────────────────────   │  │
│  │  發現：自建 Evaluation Framework 成本 vs 買現成                  │  │
│  │  • 自建：需要 2-3 engineer-months, 長期維護成本高                │  │
│  │  • 買現成：TruLens OpenSource 免費，企業版昂貴                    │  │
│  │                                                                     │  │
│  │  💰 RECOMMENDATION: "先用 TruLens OSS，快速驗證 MVP"             │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  📈 RESEARCH METRICS                                                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │ Total Notes │ │ This Week   │ │ Avg Hotness │ │ Topics      │        │
│  │     47      │ │     12      │ │   3.8/5     │ │     8       │        │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**功能：**
- ✅ Timeline Filter (Today, Yesterday, This Week, This Month, All Time)
- ✅ Research Cards (標題 + 內容 + Tags + Hotness Score)
- ✅ Research Metrics (Total Notes, This Week, Avg Hotness, Topics)
- ✅ Click Card 展開詳細內容
- ✅ Tags Filter (Click 可以 Filter)

---

### PAGE 4: Business Opportunities (商業機會)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🔬 RESEARCH DASHBOARD > Business                      [← Back] [⚙️]  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  💰 OPPORTUNITY PRIORITY MATRIX                                         │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │            High Impact                                             │  │
│  │              ▲                                                     │  │
│  │              │    ★ AgentOps Lite (Quick Win)                     │  │
│  │              │    ★ Multi-Agent Eval Framework                     │  │
│  │              │                                                      │  │
│  │   <──────────┼───────────>                                          │  │
│  │              │    ★ Agent Marketplace (Long-term)                  │  │
│  │              │    ★ Enterprise Dashboard                            │  │
│  │              ▼                                                      │  │
│  │            Low Impact                                              │  │
│  │                                                                     │  │
│  │   Low Effort ────────────── High Effort                            │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  PRIORITY RANKING (Sorted by ROI Score)                          │  │
│  │  ─────────────────────────────────────────────────────────────────  │  │
│  │                                                                     │  │
│  │  🥇 #1  AgentOps Lite                         ROI: 95/100  🟢 High│  │
│  │       "輕量級 Agent 監控工具，面向中小團隊"                        │  │
│  │       Effort: Low  │ Impact: High │ Time: 2-3 weeks              │  │
│  │       [View Details ▼]                                            │  │
│  │                                                                     │  │
│  │  ─────────────────────────────────────────────────────────────────  │  │
│  │                                                                     │  │
│  │  🥈 #2  Multi-Agent Eval Framework          ROI: 88/100  🟢 High│  │
│  │       "開源 Agent 評估框架，填補市場缺口"                          │  │
│  │       Effort: Medium │ Impact: High │ Time: 1-2 months           │  │
│  │       [View Details ▼]                                            │  │
│  │                                                                     │  │
│  │  ─────────────────────────────────────────────────────────────────  │  │
│  │                                                                     │  │
│  │  🥉 #3  Agent Marketplace                   ROI: 72/100  🟡 Medium│  │
│  │       "Agent 交易平台，長期被動收入"                               │  │
│  │       Effort: High │ Impact: High │ Time: 3-6 months             │  │
│  │       [View Details ▼]                                            │  │
│  │                                                                     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  📋 ACTION ITEMS                                                        │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  THIS WEEK:                                                        │  │
│  │  ☐ POC: AgentOps Lite 原型 (CTO)                                  │  │
│  │  ☐ 研究: TruLens 技術架構 (Research)                              │  │
│  │                                                                     │  │
│  │  NEXT SPRINT:                                                     │  │
│  │  ☐ MVP: 基本監控 Dashboard                                        │  │
│  │  ☐ Beta User Recruitment                                          │  │
│  │                                                                     │  │
│  │  THIS QUARTER:                                                    │  │
│  │  ☐ Launch: AgentOps Lite v1.0                                     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**功能：**
- ✅ Priority Matrix (Impact vs Effort Chart)
- ✅ Priority Ranking List (ROI Score 排序)
- ✅ 每個 Opportunity 既詳細資訊 (Effort, Impact, Time)
- ✅ Action Items (This Week, Next Sprint, This Quarter)
- ✅ Checkbox 可以勾選完成既 Action

---

### PAGE 5: Competitor Analysis (競爭對手)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🔬 RESEARCH DASHBOARD > Competitors                 [← Back] [⚙️]    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  🏢 COMPETITOR GRID (Click to Compare)                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ AgentOps │ │ TruLens  │ │  MLflow  │ │Braintrust│ │  Genie   │    │
│  │  ⭐ 2.1K │ │  ⭐ 3.8K  │ │ ⭐ 25.0K  │ │  ⭐ 1.2K  │ │  ⭐ 890  │    │
│  │ 🟢 Active│ │ 🟢 Active│ │🟢 Active │ │ 🟡 Early │ │🟡 Early  │    │
│  │  [Select]│ │  [Select]│ │  [Select]│ │  [Select]│ │  [Select]│    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│                                                                          │
│  📊 COMPARISON MATRIX (Selected: TruLens, AgentOps, Braintrust)        │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                      │ TruLens  │ AgentOps │ Braintrust │ MADH  │  │
│  │  ────────────────────┼──────────┼──────────┼────────────┼────── │  │
│  │  Open Source         │    ✅     │    ✅     │     ✅      │   -   │  │
│  │  SaaS Version        │    ✅     │    ❌     │     ❌      │   -   │  │
│  │  Agent Eval          │    ⚠️     │    ✅     │     ⚠️      │   -   │  │
│  │  LLM Eval            │    ✅     │    ❌     │     ✅      │   -   │  │
│  │  Trace Visualization │    ✅     │    ⚠️     │     ❌      │   -   │  │
│  │  Multi-Agent         │    ❌     │    ⚠️     │     ❌      │   -   │  │
│  │  Custom Metrics      │    ✅     │    ✅     │     ✅      │   -   │  │
│  │  ────────────────────┼──────────┼──────────┼────────────┼────── │  │
│  │  MADHOUSE Opportunity│    ⚠️     │    ✅     │     ⚠️      │   -   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  DETAILED PROFILE: TRULENS                                        │  │
│  │  ──────────────────────────────────────────────────────────────   │  │
│  │                                                                     │  │
│  │  📌 Overview:                                                      │  │
│  │     "The evaluation framework for LLM applications"               │  │
│  │                                                                     │  │
│  │  📈 Growth: +456 stars this month (+45% MoM)                     │  │
│  │  🏷️ Tags: [LLM Eval] [Tracing] [OpenSource]                      │  │
│  │  🌐 Website: https://truera.ai                                     │  │
│  │  📂 GitHub: https://github.com/TruEra/trulens                     │  │
│  │                                                                     │  │
│  │  💪 Strengths:                                                    │  │
│  │     • Mature tracing system                                       │  │
│  │     • Strong community (3.8K ⭐)                                  │  │
│  │     • Comprehensive docs                                           │  │
│  │                                                                     │  │
│  │  ⚠️ Weaknesses:                                                   │  │
│  │     • Not optimized for Agent workflows                           │  │
│  │     • Enterprise pricing is expensive                              │  │
│  │     • No multi-agent support                                       │  │
│  │                                                                     │  │
│  │  🎯 MADHOUSE Opportunity:                                        │  │
│  │     "Build agent-specific eval layer on top of TruLens"           │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**功能：**
- ✅ Competitor Cards Grid
- ✅ Select to Compare (最多 3 個)
- ✅ Comparison Matrix Table
- ✅ Detailed Profile View
- ✅ Strengths/Weaknesses Analysis
- ✅ MADHOUSE Opportunity Score

---

### PAGE 6: Settings (設定)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🔬 RESEARCH DASHBOARD > Settings                    [← Back]         │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ⚙️ DASHBOARD SETTINGS                                                  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  🔄 DATA REFRESH                                                   │  │
│  │  ─────────────────                                                 │  │
│  │  Auto Refresh: [ ○ Off  ● Every Hour  ○ Every Day ]              │  │
│  │  Last Refresh: 12:35 UTC                                          │  │
│  │  [🔄 Refresh Now]                                                  │  │
│  │                                                                     │  │
│  │  ──────────────────────────────────────────────────────────────   │  │
│  │                                                                     │  │
│  │  🎨 APPEARANCE                                                     │  │
│  │  ─────────────────                                                 │  │
│  │  Theme: [ ● Light  ○ Dark  ○ System ]                             │  │
│  │  Accent Color: [● Blue] [ ] [ ] [ ]                               │  │
│  │                                                                     │  │
│  │  ──────────────────────────────────────────────────────────────   │  │
│  │                                                                     │  │
│  │  📤 EXPORT                                                         │  │
│  │  ─────────────────                                                 │  │
│  │  [📄 Export as PDF]    [📊 Export as CSV]    [📧 Email Report]    │  │
│  │                                                                     │  │
│  │  ──────────────────────────────────────────────────────────────   │  │
│  │                                                                     │  │
│  │  🔔 NOTIFICATIONS                                                  │  │
│  │  ─────────────────                                                 │  │
│  │  [●] Notify on significant stars change (>10%)                    │  │
│  │  [●] Weekly summary report                                         │  │
│  │  [ ] Daily updates                                                 │  │
│  │                                                                     │  │
│  │  ──────────────────────────────────────────────────────────────   │  │
│  │                                                                     │  │
│  │  👤 ACCOUNT                                                        │  │
│  │  ─────────────────                                                 │  │
│  │  Logged in as: fabio@madhorse.ai                                   │  │
│  │  [Sign Out]                                                        │  │
│  │                                                                     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**功能：**
- ✅ Auto Refresh 設定
- ✅ Theme 切換 (Light/Dark/System)
- ✅ Export 功能 (PDF, CSV, Email)
- ✅ Notification 設定
- ✅ Account 資訊

---

## 🎨 UI/UX 詳細規格

### Color Palette (Revised)

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

### Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Page Title | Inter | 28px | 700 | 1.2 |
| Section Header | Inter | 20px | 600 | 1.3 |
| Card Title | Inter | 16px | 600 | 1.4 |
| Body Text | Inter | 14px | 400 | 1.5 |
| Caption | Inter | 12px | 500 | 1.4 |
| KPI Number | Inter | 36px | 700 | 1.1 |

### Spacing System (8px Grid)

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing |
| `sm` | 8px | Component internal |
| `md` | 16px | Card padding |
| `lg` | 24px | Section spacing |
| `xl` | 32px | Page margins |
| `2xl` | 48px | Large gaps |

### Component States

| State | Style |
|-------|-------|
| **Default** | White bg, subtle shadow (`0 1px 3px rgba(0,0,0,0.1)`) |
| **Hover** | Slight lift (`transform: translateY(-2px)`), darker shadow |
| **Active/Selected** | Primary color border, filled bg |
| **Disabled** | 50% opacity, no pointer events |
| **Loading** | Skeleton animation (shimmer effect) |
| **Error** | Red border, error message below |

### Animation Specs

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Page Load | 300ms | ease-out | On mount |
| Card Hover | 200ms | ease-in-out | On hover |
| Modal Open | 250ms | ease-out | On click |
| Data Update | 300ms | ease-in-out | On refresh |
| Toast Notification | 200ms | ease-out | Auto |

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, stacked cards |
| Tablet | 640-1024px | 2 columns, collapsible sidebar |
| Desktop | > 1024px | Full grid, sidebar visible |

---

## 🔌 Data Models (For Developer Reference)

### Page Route Mapping

```typescript
interface RouteConfig {
  path: string;
  page: 'Home' | 'Trending' | 'Research' | 'Business' | 'Competitors' | 'Settings';
  title: string;
  icon: string;
  requiresAuth: boolean;
}

const routes: RouteConfig[] = [
  { path: '/', page: 'Home', title: 'Dashboard', icon: 'home', requiresAuth: true },
  { path: '/trending', page: 'Trending', title: 'Trending', icon: 'trending', requiresAuth: true },
  { path: '/research', page: 'Research', title: 'Research', icon: 'research', requiresAuth: true },
  { path: '/business', page: 'Business', title: 'Business', icon: 'business', requiresAuth: true },
  { path: '/competitors', page: 'Competitors', title: 'Competitors', icon: 'competitors', requiresAuth: true },
  { path: '/settings', page: 'Settings', title: 'Settings', icon: 'settings', requiresAuth: true },
];
```

### Dashboard Data Structure

```typescript
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
  user: {
    name: string;
    email: string;
    preferences: UserPreferences;
  };
}
```

---

## ✅ 交付檢查清單

### Wireframes ✅
- [x] Home Page Wireframe
- [x] Trending Page Wireframe
- [x] Research Page Wireframe
- [x] Business Page Wireframe
- [x] Competitors Page Wireframe
- [x] Settings Page Wireframe

### Page Flow ✅
- [x] Navigation Diagram
- [x] Route Configuration

### UI/UX ✅
- [x] Color Palette
- [x] Typography Scale
- [x] Spacing System
- [x] Component States
- [x] Animation Specs
- [x] Responsive Breakpoints

### Functions ✅
- [x] KPI Dashboard
- [x] Trending Charts & List
- [x] Research Timeline
- [x] Business Priority Matrix
- [x] Competitor Comparison
- [x] Settings & Export

---

## 📝 Design Decisions Log

| 決策 | 原因 | 替代方案 |
|------|------|---------|
| 6 Page Structure | 老闆需要「總覽 + 詳細」既分層，唔係一頁過既 Dashboard | Single Page Dashboard |
| ASCII Wireframe | 清晰、易讀、易於修改 | Figma/FigJam (Too heavy for now) |
| Priority Matrix | 視覺化展示 ROI vs Effort，等老闆一眼睇到邊個機會最值得 | Simple List |
| Action Items Checkbox | 讓老闆可以追蹤進度 | Just a list |
| Competitor Grid + Detail | Grid 方便 Compare，Detail 方便深入分析 | Just a table |

---

## 🔗 Next Steps

1. **CEO 審批** → `[BOSS_APPROVED_2026_03_08]`
2. **Phase 3** → CTO 技術評估 + CISO 安全審核
3. **Phase 4** → 開發與部署

---

## 📊 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-07 | CDO | Initial Design |
| **2.0 (REVISED)** | **2026-03-08** | **CDO** | **Added Wireframes, Page Flow, Detailed Functions** |

---

**Design by:** CDO (Chief Design Officer)  
**Reviewed by:** 🤖 (Automated Design Review)  
**Date:** 2026-03-08

---

## ✅ CEO Review & Sign-off

- **Design Quality:** ✅ Meets standards
- **Features:** ✅ Complete (6 pages)
- **UAT Test Cases:** ✅ Prepared

**Sign-off:** `[CEO_SIGNED_2026_03_09_0718]`  
**Boss Approval:** Already approved `[BOSS_APPROVED_2026_03_08]` → Proceed to Phase 3

---

> 💡 **Design Philosophy:** "Dashboard should answer questions before they're asked. Clear structure enables better decisions."
