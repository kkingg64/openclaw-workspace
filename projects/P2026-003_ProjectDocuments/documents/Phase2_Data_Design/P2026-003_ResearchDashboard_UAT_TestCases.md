# 🎯 P2026-003 Research Dashboard - UAT Test Cases

**Project:** P2026-003 Research Dashboard  
**Phase:** 2 - UAT Test Cases  
**Author:** CDO (Chief Design Officer)  
**Date:** 2026-03-08  
**Status:** **READY FOR TESTING**

---

## 📋 Test Overview

### 測試目標
確保 Research Dashboard 既 6 個頁面能夠正常運作，所有功能符合 Phase 2 Design 規格。

### 測試環境
- **URL:** http://localhost:3000 (本地開發) 或 https://research.madhorse.ai (生產環境)
- **Browser:** Chrome, Firefox, Safari (最新版本)
- **User:** fabio@madhorse.ai (Test Account)

### 測試數據
- **Mock Data:** 基於真實 GitHub API 數據
- **Competitors:** TruLens (3.8K ⭐), AgentOps (2.1K ⭐), MLflow (25.0K ⭐), Braintrust (1.2K ⭐), Genie (890 ⭐)
- **Research Notes:** 47 條測試記錄
- **Business Opportunities:** 3 個優先機會

---

## 🧪 Test Cases by Page

### PAGE 1: HOME (Dashboard 總覽)

#### TC-HOME-001: Home Page Load
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-001 |
| **Feature** | Home Page Loading |
| **Pre-condition** | User 已登入，訪問 / 路徑 |
| **Test Steps** | 1. 打開瀏覽器訪問 Dashboard URL<br>2. 等待頁面載入完成 |
| **Expected Result** | - Header 顯示 "🔬 RESEARCH DASHBOARD"<br>- 顯示 4 個 KPI Cards<br>- 顯示 Trending Projects Bar Chart<br>- 顯示 Research Summary<br>- 顯示 Competitor Overview Cards<br>- Footer 顯示 "Last Updated: [時間]" |
| **Pass Criteria** | 頁面在 3 秒內完整載入，無 JavaScript 錯誤 |
| **Priority** | P0 (Critical) |

#### TC-HOME-002: KPI Cards Display
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-002 |
| **Feature** | KPI Cards 顯示 |
| **Pre-condition** | Home Page 已載入 |
| **Test Steps** | 1. 檢視頁面頂部既 4 個 KPI Cards |
| **Expected Result** | - TOTAL PROJECTS: 127 (▲12%)<br>- TOTAL STARS: 45.2K (▲8.5%)<br>- WEEKLY GROWTH: +2,340<br>- TOP CATEGORY: AI Agent |
| **Pass Criteria** | 所有 4 個 KPI 數值正確顯示，數值格式正確 (K/M 單位) |
| **Priority** | P0 (Critical) |

#### TC-HOME-003: KPI Cards Click (Drill-down)
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-003 |
| **Feature** | KPI Card Click 導航 |
| **Pre-condition** | Home Page 已載入 |
| **Test Steps** | 1. 點擊 "TOTAL PROJECTS" Card<br>2. 點擊 "TOTAL STARS" Card<br>3. 點擊 "WEEKLY GROWTH" Card<br>4. 點擊 "TOP CATEGORY" Card |
| **Expected Result** | - TOTAL PROJECTS → 跳轉至 Trending Page<br>- TOTAL STARS → 跳轉至 Trending Page (Sorted by Stars)<br>- WEEKLY GROWTH → 跳轉至 Trending Page (Sorted by Growth)<br>- TOP CATEGORY → 跳轉至 Trending Page (Filtered by Category) |
| **Pass Criteria** | 點擊後正確導航至對應頁面，URL 變更正確 |
| **Priority** | P1 (High) |

#### TC-HOME-004: Trending Projects Bar Chart
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-004 |
| **Feature** | Trending Projects Chart |
| **Pre-condition**載入 |
| **Test Steps** | 1. | Home Page 已 檢視 Trending Projects Bar Chart<br>2. 滑鼠 hover 至 bar 上 |
| **Expected Result** | - 顯示 Top 10 projects (langchain, auto-eval, trulens, braintrust, agentops, memgpt 等)<br>- Hover 時顯示 tooltips (Project Name, Stars) |
| **Pass Criteria** | Chart 正確渲染，hover tooltips 正常顯示 |
| **Priority** | P1 (High) |

#### TC-HOME-005: "View All" Navigation
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-005 |
| **Feature** | View All 導航按鈕 |
| **Pre-condition** | Home Page 已載入 |
| **Test Steps** | 1. 點擊 "View All →" 按鈕 |
| **Expected Result** | 跳轉至 Trending Page (/trending) |
| **Pass Criteria** | 成功導航至 Trending Page |
| **Priority** | P1 (High) |

#### TC-HOME-006: Research Summary Section
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-006 |
| **Feature** | Research Summary 顯示 |
| **Pre-condition** | Home Page 已載入 |
| **Test Steps** | 1. 檢視 Research Summary 區塊 |
| **Expected Result** | - 顯示 "🔬 Current Focus: AI Agent Evaluation Tools"<br>- 顯示 Market Trends 列表 (3 個 bullet points)<br>- 包含 "Hotness" 指標 |
| **Pass Criteria** | 內容正確顯示，無截斷或錯誤 |
| **Priority** | P1 (High) |

#### TC-HOME-007: Competitor Overview Cards
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-007 |
| **Feature** | Competitor Cards 顯示 |
| **Pre-condition** | Home Page 已載入 |
| **Test Steps** | 1. 檢視 Competitor Overview 區塊<br>2. 點擊其中一張 Competitor Card |
| **Expected Result** | - 顯示 5 張 Competitor Cards (AgentOps, TruLens, MLflow, Braintrust, Genie)<br>- 每張 Card 顯示名稱同 Stars 數<br>- 點擊後跳轉至 Competitors Page |
| **Pass Criteria** | Cards 正確顯示，點擊導航正確 |
| **Priority** | P1 (High) |

#### TC-HOME-008: Refresh Button
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-008 |
| **Feature** | Data Refresh 功能 |
| **Pre-condition** | Home Page 已載入 |
| **Test Steps** | 1. 點擊 "🔄 Refresh" 按鈕<br>2. 觀察數據更新 |
| **Expected Result** | - 顯示 loading 狀態<br>- "Last Updated" 時間更新至最新時間<br>- 數據重新載入 |
| **Pass Criteria** | Refresh 成功，時間戳更新，無錯誤 |
| **Priority** | P1 (High) |

#### TC-HOME-009: Settings Button Navigation
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-009 |
| **Feature** | Settings 按鈕導航 |
| **Pre-condition** | Home Page 已載入 |
| **Test Steps** | 1. 點擊 Header 右側既 "Settings ⚙️" 按鈕 |
| **Expected Result** | 跳轉至 Settings Page (/settings) |
| **Pass Criteria** | 成功導航至 Settings Page |
| **Priority** | P2 (Medium) |

#### TC-HOME-010: Theme Toggle
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-HOME-010 |
| **Feature** | Theme 切換功能 |
| **Pre-condition** | Home Page 已載入 |
| **Test Steps** | 1. 點擊 Header 右側既 Theme Toggle (🌙/☀️) |
| **Expected Result** | - Light Mode: 背景變為 #F8FAFC<br>- Dark Mode: 背景變為 #0F172A<br>- 切換 smooth transition |
| **Pass Criteria** | Theme 正確切換，樣式符合 Design Spec |
| **Priority** | P2 (Medium) |

---

### PAGE 2: TRENDING (GitHub Trending 項目)

#### TC-TRENDING-001: Trending Page Load
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-001 |
| **Feature** | Trending Page Loading |
| **Pre-condition** | 訪問 /trending 路徑 |
| **Test Steps** | 1. 打開瀏覽器訪問 Trending URL<br>2. 等待頁面載入完成 |
| **Expected Result** | - Header 顯示 "🔬 RESEARCH DASHBOARD > Trending"<br>- 顯示 Search Bar<br>- 顯示 Filter 同 Sort dropdowns<br>- 顯示 Stars Over Time Line Chart<br>- 顯示 Category Breakdown Pie Chart<br>- 顯示 Trending Projects List |
| **Pass Criteria** | 頁面在 3 秒內完整載入，無 JavaScript 錯誤 |
| **Priority** | P0 (Critical) |

#### TC-TRENDING-002: Search Bar Functionality
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-002 |
| **Feature** | Search Projects |
| **Pre-condition** | Trending Page 已載入 |
| **Test Steps** | 1. 點擊 Search Bar<br>2. 輸入 "langchain"<br>3. 觀察搜尋結果 |
| **Expected Result** | - 即時過濾顯示包含 "langchain" 既項目<br>- 列表只顯示符合既結果 |
| **Pass Criteria** | 搜尋結果正確，response time < 500ms |
| **Priority** | P0 (Critical) |

#### TC-TRENDING-003: Category Filter
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-003 |
| **Feature** | Filter by Category |
| **Pre-condition** | Trending Page 已載入 |
| **Test Steps** | 1. 點擊 "Filter" dropdown<br>2. 選擇 "AI Agent"<br>3. 觀察列表變更 |
| **Expected Result** | - 列表只顯示 Category 為 "AI Agent" 既項目<br>- 其他 categories 既項目被隱藏 |
| **Pass Criteria** | Filter 功能正確運作 |
| **Priority** | P1 (High) |

#### TC-TRENDING-004: Sort Functionality
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-004 |
| **Feature** | Sort Projects |
| **Pre-condition** | Trending Page 已載入 |
| **Test Steps** | 1. 點擊 "Sort" dropdown<br>2. 選擇 "Stars (High to Low)"<br>3. 觀察列表排序 |
| **Expected Result** | - 列表按 Stars 數降序排列<br>- #1 應該係 langchain (52.3K) |
| **Pass Criteria** | Sort 功能正確運作，順序正確 |
| **Priority** | P1 (High) |

#### TC-TRENDING-005: Stars Over Time Chart
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-005 |
| **Feature** | Line Chart Display |
| **Pre-condition** | Trending Page 已載入 |
| **Test Steps** | 1. 檢視 Stars Over Time Chart<br>2. 滑鼠 hover 至 chart 上 |
| **Expected Result** | - 顯示 Line Chart (4 週數據)<br>- Hover 時顯示 tooltips (Week, Stars Count) |
| **Pass Criteria** | Chart 正確渲染，tooltips 正常 |
| **Priority** | P1 (High) |

#### TC-TRENDING-006: Category Breakdown Pie Chart
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-006 |
| **Feature** | Pie Chart Display |
| **Pre-condition** | Trending Page 已載入 |
| **Test Steps** | 1. 檢視 Category Breakdown Pie Chart<br>2. 滑鼠 hover 至 slices 上 |
| **Expected Result** | - 顯示 Pie Chart<br>- AI Agent: 45%<br>- Eval: 25%<br>- Memory: 15%<br>- Ops: 10%<br>- Other: 5%<br>- Hover 時 highlight slice |
| **Pass Criteria** | Pie Chart 正確渲染，percentages 正確 |
| **Priority** | P1 (High) |

#### TC-TRENDING-007: Pagination
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-007 |
| **Feature** | Projects List Pagination |
| **Pre-condition** | Trending Page 已載入 |
| **Test Steps** | 1. 檢視列表底部既 pagination<br>2. 點擊 "Next →" 按鈕<br>3. 點擊 "← Prev" 按鈕 |
| **Expected Result** | - 顯示 "Page 1 of 10"<br>- Next 跳轉至 Page 2<br>- Prev 返回 Page 1 |
| **Pass Criteria** | Pagination 運作正確，URL 更新正確 |
| **Priority** | P1 (High) |

#### TC-TRENDING-008: Project Row Click
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-008 |
| **Feature** | Project Detail Navigation |
| **Pre-condition** | Trending Page 已載入 |
| **Test Steps** | 1. 點擊列表中既某一行 project |
| **Expected Result** | - 展開 project detail view (future feature)<br>- 或跳轉至 project detail page |
| **Pass Criteria** | 點擊響應正確 (可為 expand 或 navigate) |
| **Priority** | P2 (Medium) |

#### TC-TRENDING-009: Back Navigation
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-TRENDING-009 |
| **Feature** | Back Button |
| **Pre-condition** | 訪問 Trending Page |
| **Test Steps** | 1. 點擊 "← Back" 按鈕 |
| **Expected Result** | 返回 Home Page (/) |
| **Pass Criteria** | 成功返回 Home Page |
| **Priority** | P2 (Medium) |

---

### PAGE 3: RESEARCH (市場研究)

#### TC-RESEARCH-001: Research Page Load
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-RESEARCH-001 |
| **Feature** | Research Page Loading |
| **Pre-condition** | 訪問 /research 路徑 |
| **Test Steps** | 1. 打開瀏覽器訪問 Research URL<br>2. 等待頁面載入完成 |
| **Expected Result** | - Header 顯示 "🔬 RESEARCH DASHBOARD > Research"<br>- 顯示 Timeline Filter<br>- 顯示 Research Cards<br>- 顯示 Research Metrics |
| **Pass Criteria** | 頁面在 3 秒內完整載入 |
| **Priority** | P0 (Critical) |

#### TC-RESEARCH-002: Timeline Filter
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-RESEARCH-002 |
| **Feature** | Timeline Filtering |
| **Pre-condition** | Research Page 已載入 |
| **Test Steps** | 1. 點擊 Timeline Filter tabs<br>2. 依次選擇 "Today", "Yesterday", "This Week", "This Month", "All Time" |
| **Expected Result** | - Today: 只顯示今日既 notes<br>- Yesterday: 只顯示昨日既 notes<br>- This Week: 只顯示本週既 notes<br>- This Month: 只顯示本月既 notes<br>- All Time: 顯示所有 notes |
| **Pass Criteria** | 每個 filter 正確過濾內容 |
| **Priority** | P0 (Critical) |

#### TC-RESEARCH-003: Research Cards Display
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-RESEARCH-003 |
| **Feature** | Research Cards Rendering |
| **Pre-condition** | Research Page 已載入 |
| **Test Steps** | 1. 檢視 Research Cards 列表 |
| **Expected Result** | - 顯示多張 Research Cards<br>- 每張 Card 包含: Title, Content, Tags, Hotness Score, Timestamp |
| **Pass Criteria** | Cards 正確渲染，內容完整 |
| **Priority** | P0 (Critical) |

#### TC-RESEARCH-004: Research Card Expand
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-RESEARCH-004 |
| **Feature** | Card Detail Expansion |
| **Pre-condition** | Research Page 已載入 |
| **Test Steps** | 1. 點擊其中一張 Research Card |
| **Expected Result** | - Card 展開顯示完整內容<br>- 顯示詳細分析、機會建議等 |
| **Pass Criteria** | 展開動畫 smooth，內容正確顯示 |
| **Priority** | P1 (High) |

#### TC-RESEARCH-005: Tags Filter
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-RESEARCH-005 |
| **Feature** | Tags Filtering |
| **Pre-condition** | Research Page 已載入 |
| **Test Steps** | 1. 點擊 Card 上既某個 Tag<br>2. 觀察列表變更 |
| **Expected Result** | - 列表過濾為只顯示包含該 Tag 既 notes |
| **Pass Criteria** | Tags filter 正確運作 |
| **Priority** | P1 (High) |

#### TC-RESEARCH-006: Research Metrics Display
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-RESEARCH-006 |
| **Feature** | Metrics Display |
| **Pre-condition** | Research Page 已載入 |
| **Test Steps** | 1. 檢視頁面底部既 Metrics |
| **Expected Result** | - Total Notes: 47<br>- This Week: 12<br>- Avg Hotness: 3.8/5<br>- Topics: 8 |
| **Pass Criteria** | Metrics 正確顯示 |
| **Priority** | P1 (High) |

---

### PAGE 4: BUSINESS (商業機會)

#### TC-BUSINESS-001: Business Page Load
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-BUSINESS-001 |
| **Feature** | Business Page Loading |
| **Pre-condition** | 訪問 /business 路徑 |
| **Test Steps** | 1. 打開瀏覽器訪問 Business URL<br>2. 等待頁面載入完成 |
| **Expected Result** | - Header 顯示 "🔬 RESEARCH DASHBOARD > Business"<br>- 顯示 Priority Matrix Chart<br>- 顯示 Priority Ranking List<br>- 顯示 Action Items |
| **Pass Criteria** | 頁面在 3 秒內完整載入 |
| **Priority** | P0 (Critical) |

#### TC-BUSINESS-002: Priority Matrix Display
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-BUSINESS-002 |
| **Feature** | Priority Matrix Chart |
| **Pre-condition** | Business Page 已載入 |
| **Test Steps** | 1. 檢視 Priority Matrix |
| **Expected Result** | - 顯示 2x2 matrix (Impact vs Effort)<br>- 標記每個 opportunity 既位置<br>- X-axis: Low Effort → High Effort<br>- Y-axis: Low Impact → High Impact |
| **Pass Criteria** | Matrix 正確渲染，opportunities 位置正確 |
| **Priority** | P0 (Critical) |

#### TC-BUSINESS-003: Priority Ranking List
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-BUSINESS-003 |
| **Feature** | Priority Ranking |
| **Pre-condition** | Business Page 已載入 |
| **Test Steps** | 1. 檢視 Priority Ranking List |
| **Expected Result** | - #1: AgentOps Lite (ROI: 95/100, 🟢 High)<br>- #2: Multi-Agent Eval Framework (ROI: 88/100, 🟢 High)<br>- #3: Agent Marketplace (ROI: 72/100, 🟡 Medium) |
| **Pass Criteria** | 排名正確，ROI scores 正確顯示 |
| **Priority** | P0 (Critical) |

#### TC-BUSINESS-004: Opportunity Details Expansion
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-BUSINESS-004 |
| **Feature** | Details Expansion |
| **Pre-condition** | Business Page 已載入 |
| **Test Steps** | 1. 點擊某個 opportunity 既 "View Details ▼" |
| **Expected Result** | - 展開顯示完整資訊: Description, Effort, Impact, Time<br>- 可再次點擊收合 |
| **Pass Criteria** | 展開/收合動畫 smooth |
| **Priority** | P1 (High) |

#### TC-BUSINESS-005: Action Items Checkboxes
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-BUSINESS-005 |
| **Feature** | Action Items Interaction |
| **Pre-condition** | Business Page 已載入 |
| **Test Steps** | 1. 勾選某個 Action Item 既 checkbox |
| **Expected Result** | - Checkbox 變為已勾選狀態<br>- Item 顯示為完成 (strikethrough 或 dimmed) |
| **Pass Criteria** | Checkbox 狀態正確保存 |
| **Priority** | P1 (High) |

#### TC-BUSINESS-006: Action Items Sections
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-BUSINESS-006 |
| **Feature** | Action Items Sections |
| **Pre-condition** | Business Page 已載入 |
| **Test Steps** | 1. 檢視 Action Items 區塊 |
| **Expected Result** | - THIS WEEK: 2 items<br>- NEXT SPRINT: 2 items<br>- THIS QUARTER: 1 item |
| **Pass Criteria** | 所有 sections 正確顯示 |
| **Priority** | P1 (High) |

---

### PAGE 5: COMPETITORS (競爭對手分析)

#### TC-COMPETITORS-001: Competitors Page Load
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-COMPETITORS-001 |
| **Feature** | Competitors Page Loading |
| **Pre-condition** | 訪問 /competitors 路徑 |
| **Test Steps** | 1. 打開瀏覽器訪問 Competitors URL<br>2. 等待頁面載入完成 |
| **Expected Result** | - Header 顯示 "🔬 RESEARCH DASHBOARD > Competitors"<br>- 顯示 Competitor Grid<br>- 顯示 Comparison Matrix<br>- 顯示 Detailed Profile |
| **Pass Criteria** | 頁面在 3 秒內完整載入 |
| **Priority** | P0 (Critical) |

#### TC-COMPETITORS-002: Competitor Grid Display
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-COMPETITORS-002 |
| **Feature** | Competitor Cards Grid |
| **Pre-condition** | Competitors Page 已載入 |
| **Test Steps** | 1. 檢視 Competitor Grid |
| **Expected Result** | - 顯示 5 張 Competitor Cards<br>- AgentOps: ⭐ 2.1K, 🟢 Active<br>- TruLens: ⭐ 3.8K, 🟢 Active<br>- MLflow: ⭐ 25.0K, 🟢 Active<br>- Braintrust: ⭐ 1.2K, 🟡 Early<br>- Genie: ⭐ 890, 🟡 Early |
| **Pass Criteria** | 所有 cards 正確顯示，數據正確 |
| **Priority** | P0 (Critical) |

#### TC-COMPETITORS-003: Select Competitors to Compare
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-COMPETITORS-003 |
| **Feature** | Compare Selection |
| **Pre-condition** | Competitors Page 已載入 |
| **Test Steps** | 1. 點擊 TruLens 既 "Select" button<br>2. 點擊 AgentOps 既 "Select" button<br>3. 點擊 Braintrust 既 "Select" button |
| **Expected Result** | - 最多選擇 3 個 competitors<br>- 選擇後 Comparison Matrix 更新 |
| **Pass Criteria** | Selection 運作正確，matrix 更新 |
| **Priority** | P0 (Critical) |

#### TC-COMPETITORS-004: Comparison Matrix
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-COMPETITORS-004 |
| **Feature** | Comparison Matrix Display |
| **Pre-condition** | 已選擇 3 個 competitors |
| **Test Steps** | 1. 檢視 Comparison Matrix |
| **Expected Result** | - 顯示 column headers: TruLens, AgentOps, Braintrust<br>- 顯示 rows: Open Source, SaaS Version, Agent Eval, LLM Eval, Trace Visualization, Multi-Agent, Custom Metrics<br>- 每個 cell 顯示 ✅/⚠️/❌ |
| **Pass Criteria** | Matrix 正確渲染，符號正確 |
| **Priority** | P0 (Critical) |

#### TC-COMPETITORS-005: Detailed Profile View
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-COMPETITORS-005 |
| **Feature** | Competitor Detail |
| **Pre-condition** | Competitors Page 已載入 |
| **Test Steps** | 1. 點擊某張 Competitor Card 既詳細區域 |
| **Expected Result** | - 展開顯示 Detailed Profile<br>- 包含: Overview, Growth, Tags, Website, GitHub, Strengths, Weaknesses, MADHOUSE Opportunity |
| **Pass Criteria** | Detail view 正確顯示 |
| **Priority** | P1 (High) |

#### TC-COMPETITORS-006: External Links
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-COMPETITORS-006 |
| **Feature** | External Navigation |
| **Pre-condition** | 已展開 Detailed Profile |
| **Test Steps** | 1. 點擊 "Website" link<br>2. 點擊 "GitHub" link |
| **Expected Result** | - Website: 新 tab 打開 truera.ai<br>- GitHub: 新 tab 打開 github.com/TruEra/trulens |
| **Pass Criteria** | Links 正確打開新 tab |
| **Priority** | P2 (Medium) |

---

### PAGE 6: SETTINGS (系統設定)

#### TC-SETTINGS-001: Settings Page Load
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-001 |
| **Feature** | Settings Page Loading |
| **Pre-condition** | 訪問 /settings 路徑 |
| **Test Steps** | 1. 打開瀏覽器訪問 Settings URL<br>2. 等待頁面載入完成 |
| **Expected Result** | - Header 顯示 "🔬 RESEARCH DASHBOARD > Settings"<br>- 顯示所有設定 sections |
| **Pass Criteria** | 頁面在 3 秒內完整載入 |
| **Priority** | P0 (Critical) |

#### TC-SETTINGS-002: Auto Refresh Setting
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-002 |
| **Feature** | Auto Refresh Configuration |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 檢視 Data Refresh 區塊<br>2. 點擊不同既 Radio buttons |
| **Expected Result** | - Off: 不會自動刷新<br>- Every Hour: 每小時自動刷新<br>- Every Day: 每天自動刷新<br>- Last Refresh 時間顯示正確 |
| **Pass Criteria** | Radio selection 正確保存 |
| **Priority** | P0 (Critical) |

#### TC-SETTINGS-003: Manual Refresh Button
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-003 |
| **Feature** | Manual Refresh |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 點擊 "🔄 Refresh Now" button |
| **Expected Result** | - 觸發數據刷新<br>- "Last Refresh" 時間更新至當前時間 |
| **Pass Criteria** | 刷新成功，時間更新 |
| **Priority** | P1 (High) |

#### TC-SETTINGS-004: Theme Selection
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-004 |
| **Feature** | Theme Configuration |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 檢視 Appearance 區塊<br>2. 點擊 "Light" radio<br>3. 點擊 "Dark" radio<br>4. 點擊 "System" radio |
| **Expected Result** | - Light: 切換至 Light mode<br>- Dark: 切換至 Dark mode<br>- System: 跟隨系統設定 |
| **Pass Criteria** | Theme 正確切換，設定保存 |
| **Priority** | P1 (High) |

#### TC-SETTINGS-005: Accent Color Selection
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-005 |
| **Feature** | Accent Color |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 檢視 Accent Color 選項<br>2. 點擊不同既 color circles |
| **Expected Result** | - 預設 Blue (#0EA5E9)<br>- 可選擇其他 accent colors |
| **Pass Criteria** | Accent color 正確應用 |
| **Priority** | P2 (Medium) |

#### TC-SETTINGS-006: Export as PDF
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-006 |
| **Feature** | PDF Export |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 點擊 "📄 Export as PDF" button |
| **Expected Result** | - 觸發 PDF download<br>- PDF 包含 dashboard 既 snapshot |
| **Pass Criteria** | PDF 成功下載，內容正確 |
| **Priority** | P1 (High) |

#### TC-SETTINGS-007: Export as CSV
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-007 |
| **Feature** | CSV Export |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 點擊 "📊 Export as CSV" button |
| **Expected Result** | - 觸發 CSV download<br>- CSV 包含 raw data |
| **Pass Criteria** | CSV 成功下載，數據正確 |
| **Priority** | P1 (High) |

#### TC-SETTINGS-008: Email Report
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-008 |
| **Feature** | Email Report |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 點擊 "📧 Email Report" button |
| **Expected Result** | - 彈出 email 確認 dialog<br>- 發送 report 至用戶 email |
| **Pass Criteria** | Email 發送成功 (或顯示 success message) |
| **Priority** | P2 (Medium) |

#### TC-SETTINGS-009: Notification Settings
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-009 |
| **Feature** | Notification Configuration |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 檢視 Notifications 區塊<br>2. 勾選/取消勾選各選項 |
| **Expected Result** | - Notify on significant stars change (>10%): 預設勾選<br>- Weekly summary report: 預設勾選<br>- Daily updates: 預設未勾選 |
| **Pass Criteria** | Checkbox 狀態正確保存 |
| **Priority** | P1 (High) |

#### TC-SETTINGS-010: Account Info Display
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-010 |
| **Feature** | Account Information |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 檢視 Account 區塊 |
| **Expected Result** | - 顯示: "Logged in as: fabio@madhorse.ai"<br>- 顯示 "Sign Out" button |
| **Pass Criteria** | 資訊正確顯示 |
| **Priority** | P1 (High) |

#### TC-SETTINGS-011: Sign Out
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-011 |
| **Feature** | Sign Out Functionality |
| **Pre-condition** | Settings Page 已載入 |
| **Test Steps** | 1. 點擊 "Sign Out" button |
| **Expected Result** | - 用戶登出<br>- 重新導向至登入頁面 |
| **Pass Criteria** | 成功登出，頁面跳轉正確 |
| **Priority** | P1 (High) |

#### TC-SETTINGS-012: Back Navigation
| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-SETTINGS-012 |
| **Feature** | Back Button |
| **Pre-condition** | 訪問 Settings Page |
| **Test Steps** | 1. 點擊 "← Back" button |
| **Expected Result** | 返回上一頁 (Home 或其他) |
| **Pass Criteria** | 成功返回 |
| **Priority** | P2 (Medium) |

---

## 📊 Test Summary

| Page | Test Cases | P0 (Critical) | P1 (High) | P2 (Medium) |
|------|------------|---------------|-----------|-------------|
| Home | 10 | 2 | 6 | 2 |
| Trending | 9 | 2 | 5 | 2 |
| Research | 6 | 2 | 4 | 0 |
| Business | 6 | 3 | 3 | 0 |
| Competitors | 6 | 4 | 1 | 1 |
| Settings | 12 | 2 | 6 | 4 |
| **Total** | **49** | **15** | **25** | **9** |

---

## ✅ 完成清單

- [x] 讀取 Phase 2 Design 文件
- [x] 分析 6 個 Page 既功能需求
- [x] 撰寫 49 個 UAT Test Cases
- [x] 每個 Test Case 包含: Test Case ID, Feature, Pre-condition, Test Steps, Expected Result, Pass Criteria, Priority
- [x] 使用真實數據 (TruLens, AgentOps, MLflow, etc.)
- [x] 覆蓋曬所有按鈕同 UI 元素

---

**Done!** UAT Test Cases 已完成，可以進入 Phase 3 技術評審。

---

## ✅ CEO Review & Sign-off

- **Test Coverage:** ✅ 49 test cases across 6 pages
- **Quality:** ✅ Meets UAT standards
- **Ready for Phase 3:** ✅ Yes

**Sign-off:** `[CEO_SIGNED_2026_03_09_0718]`  
**Boss Approval:** `[BOSS_APPROVED_2026_03_09]` → Proceed to Phase 3
