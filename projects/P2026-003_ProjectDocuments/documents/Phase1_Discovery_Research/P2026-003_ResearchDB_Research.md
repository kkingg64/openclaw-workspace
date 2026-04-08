# P2026-003 Research Dashboard - Phase 1 Research

**Project:** P2026-003 Research Dashboard  
**Phase:** 1 - Research & Discovery  
**Owner:** COO (fabio-coo)  
**Date:** 2026-03-07  
**Status:** COMPLETED

---

## 🎯 Research Objectives

### Primary Goal
Create an AI-powered research dashboard that automatically generates and visualizes market research reports for MADHORSE Ltd.

### Research Questions

1. **How can AI generate research reports?**
   - Use LLM to summarize market data from GitHub, news, and competitor websites
   - Automate data collection from public APIs (GitHub Trending, NPM trends)
   - Generate insights using prompt engineering with MiniMax M2.5

2. **What is the best way to present research data?**
   - Dashboard with KPI cards and interactive charts
   - Real-time data refresh capability
   - Exportable reports (PDF/CSV)

---

## 👥 Target Users

| User | Needs | Pain Points |
|------|-------|-------------|
| **Boss (CEO)** | Quick overview of market trends, competitive landscape | No time to read long reports |
| **CTO** | Technical trends, GitHub stars, emerging tech | Hard to track all repositories |
| **COO** | Business opportunities, ROI analysis | Need consolidated data in one place |
| **Management** | High-level KPIs and actionable insights | Want visual, easy-to-understand data |

**Primary User:** CEO (Boss) - needs "一眼關七" dashboard

---

## 📋 Expected Features

### Core Features (MVP)

1. **📊 KPI Dashboard**
   - Total projects tracked
   - Total GitHub stars
   - Weekly growth metrics
   - Top trending category

2. **📈 Data Visualization**
   - GitHub trending projects chart
   - Category distribution pie chart
   - Growth trend line chart
   - Competitor comparison radar chart

3. **🔬 Market Research Summary**
   - AI-generated research highlights
   - Market trends indicators
   - Hotness score (1-5 ⭐)

4. **💰 Business Opportunities**
   - ROI-ranked opportunity list
   - Risk indicators
   - Actionable recommendations

5. **🏢 Competitor Analysis**
   - Competitor cards with key metrics
   - Feature comparison matrix
   - Opportunity scores

### Enhanced Features (Phase 2+)

- Manual data refresh button
- Auto-refresh scheduling (hourly/daily)
- Date range selector
- PDF/CSV export
- Light/Dark theme
- Telegram/Email notifications

---

## 🔍 Data Sources

| Source | Type | Purpose |
|--------|------|---------|
| GitHub API | Public | Trending repos, stars, growth |
| MiniMax API | AI | Generate research summaries |
| Web Scraping | Public | Competitor website analysis |
| Manual Input | Internal | ROI calculations, risk scores |

---

## 📊 Market Research Findings

### Market Gap
- No single dashboard combines GitHub trends + AI-generated insights + business ROI
- Existing tools (GitHub Explore, Star History) are too technical, not business-focused

### Competitive Landscape
- **AgentOps** - Good for AI agent monitoring, but no business insights
- **TruLens** - Focuses on LLM evaluation, not market research
- **MLflow** - ML experiment tracking, not dashboard
- **Braintrust** - AI evaluation platform
- **Genie** - New entrant, limited features

---

## 📊 Detailed Competitor Analysis (For Dashboard Display)

### AgentOps
- **Focus:** AI Agent observability & monitoring
- **Stars:** ~2,100
- **Strengths:** Great tracing UI, easy integration
- **Weaknesses:** Limited free tier, noisy alerts
- **MADHOUSE Opportunity Score:** 75

### TruLens
- **Focus:** LLM application evaluation
- **Stars:** ~3,800
- **Strengths:** Strong evaluation metrics, good docs
- **Weaknesses:** Complex setup, limited visualization
- **MADHOUSE Opportunity Score:** 70

### MLflow
- **Focus:** ML lifecycle platform
- **Stars:** ~25,000
- **Strengths:** Industry standard, huge community
- **Weaknesses:** Complex for beginners, heavy
- **MADHOUSE Opportunity Score:** 40

### Braintrust
- **Focus:** AI app evaluation framework
- **Stars:** ~1,200
- **Strengths:** Simple API, good for evals
- **Weaknesses:** Small community, early stage
- **MADHOUSE Opportunity Score:** 82

### Genie
- **Focus:** LLM monitoring & evaluation
- **Stars:** ~890
- **Strengths:** Lightweight, fast setup
- **Weaknesses:** Limited features, new player
- **MADHOUSE Opportunity Score:** 78

---

## 🎯 MADHOUSE Dashboard Data Architecture

The dashboard must display the following data layers:

### Layer 1: COO Strategic Insights (Static)
- Market Gap Analysis
- Competitor Overview (AgentOps, TruLens, MLflow, Braintrust, Genie)
- MADHOUSE Positioning Strategy
- Business Opportunities with ROI Scores

### Layer 2: Real-time GitHub Data (API)
- Trending Projects (stars, growth, category)
- Repository metrics (forks, issues, last updated)
- Category breakdown

### Layer 3: AI-Generated Insights (MiniMax API)
- Market trend summaries
- Hotness scores
- Actionable recommendations

### Data Sources Mapping
| Dashboard Element | Data Source |
|-------------------|-------------|
| Competitor Cards | COO Phase 1 Research |
| ROI Priority Matrix | COO Phase 1 Research |
| Trending Projects Chart | GitHub API |
| Category Distribution | GitHub API |
| AI Insights Summary | MiniMax API |
| Weekly Growth | GitHub API |

---

## ✅ Research Conclusion

**Recommended Approach:**
- Build a Next.js dashboard with Recharts
- Use MiniMax API for AI-generated summaries
- Target Vercel for deployment (or self-host on VPS)
- MVP in 2 weeks, full feature in 1 month

**Success Metrics:**
- Dashboard loads in < 2 seconds
- Boss can get market overview in < 30 seconds
- Weekly active users (internal) > 3

---

## 📝 Research Log

| Date | Activity | Findings |
|------|----------|----------|
| 2026-03-07 | Web search on AI research tools | Found gap in market |
| 2026-03-07 | Competitor analysis | Identified 5 competitors |
| 2026-03-07 | Tech stack evaluation | Next.js + Recharts selected |
| 2026-03-07 | Data source identification | GitHub API + MiniMax |

---

## 🔗 Next Steps

1. **Phase 2 Design** → CDO creates UI/UX spec
2. **Phase 3 TechSpec** → CTO defines technical architecture
3. **Phase 4 Implementation** → Build and deploy

---

**Research by:** COO (fabio-coo)  
**Date:** 2026-03-07

---

## ✅ CEO Review & Sign-off

- **Research Quality:** ✅ Meets standards
- **Market Gap:** ✅ Validated
- **Recommended Approach:** ✅ Sound

**Sign-off:** `[CEO_SIGNED_2026_03_09_0718]`  
**Boss Approval:** `[BOSS_APPROVED_2026_03_09]` → Proceed to Phase 2

---

> 💡 **Research Philosophy:** "Data without insight is just noise. Dashboard should turn data into decisions."
