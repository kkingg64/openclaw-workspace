# P2026-008 Analytics Plan

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 2 Design  
**Version:** v1.0  
**Date:** 2026-04-03  
**Author:** CDO  

---

## Overview

This document defines the analytics and tracking strategy for MADHORSE HQ dashboard to measure user engagement, system performance, and business outcomes.

---

## 1. Analytics Objectives

### 1.1 Primary Goals

| Goal | Metric | Target |
|------|--------|--------|
| Monitor CEO dashboard usage | Daily active sessions | Baseline established |
| Track project awareness | Time to project view | < 2 clicks to any project |
| Measure system engagement | Avg session duration | > 5 minutes |
| Evaluate feature adoption | Feature usage rate | > 80% features used weekly |

### 1.2 Business KPIs

| KPI | Measurement | Owner |
|-----|-------------|-------|
| Dashboard utilization | % of days accessed | CEO |
| Agent status visibility | Time from alert to action | CTO |
| Research engagement | Research card clicks | COO |
| Trends monitoring | Platform switches/day | CEO |

---

## 2. Event Tracking Plan

### 2.1 Page Views

| Event | Properties | Trigger |
|-------|------------|---------|
| `page_view` | `path`, `referrer`, `title` | On route change |
| `page_view_dashboard` | `user_type` | Dashboard load |
| `page_view_agents` | `filter_state` | Agents page load |
| `page_view_projects` | `project_id` (if detail) | Project page load |
| `page_view_research` | `category_filter` | Research page load |
| `page_view_trends` | `platform` | Trends page load |

### 2.2 User Interactions

| Event | Properties | Trigger |
|-------|------------|---------|
| `click_agent_card` | `agent_id`, `agent_role` | Agent card click |
| `click_project_card` | `project_id`, `phase` | Project card click |
| `click_research_card` | `research_id`, `category` | Research card click |
| `click_trend_card` | `trend_rank`, `platform` | Trend card click |
| `filter_applied` | `filter_type`, `filter_value` | Filter change |
| `search_executed` | `query`, `results_count` | Search submit |
| `nav_tab_click` | `tab_name` | Nav tab click |

### 2.3 System Monitor Events

| Event | Properties | Trigger |
|-------|------------|---------|
| `metric_refresh` | `metric_type`, `value` | 30s auto-refresh |
| `metric_manual_refresh` | `metric_type` | Manual refresh click |
| `metric_alert` | `metric_type`, `threshold`, `value` | Threshold exceeded |
| `status_change` | `agent_id`, `old_status`, `new_status` | Agent status update |

### 2.4 Authentication Events

| Event | Properties | Trigger |
|-------|------------|---------|
| `login_attempt` | `method` (google/email) | Login form submit |
| `login_success` | `method`, `user_type` | Login successful |
| `login_failure` | `method`, `error_type` | Login failed |
| `logout` | - | Logout action |

---

## 3. User Segments

| Segment | Definition | Tracking |
|---------|------------|----------|
| CEO (Primary) | Logged in as fabio-boss | Full tracking |
| Viewer | Read-only role | Basic tracking only |

---

## 4. Custom Dimensions

| Dimension | Scope | Description |
|-----------|-------|-------------|
| `user_id` | User | Unique user identifier |
| `user_role` | User | CEO or Viewer |
| `session_id` | Session | Browser session identifier |
| `agent_status` | Hit | Current agent statuses snapshot |

---

## 5. Retention Metrics

| Metric | Definition | Period |
|--------|------------|--------|
| DAU (Daily Active Users) | Unique sessions per day | 30 days |
| MAU (Monthly Active Users) | Unique sessions per month | 30 days |
| Avg Session Duration | Mean time on dashboard | 30 days |
| Bounce Rate | Single-page sessions | 30 days |

---

## 6. Funnel Analysis

### 6.1 Dashboard Engagement Funnel

```
Step 1: Login → Step 2: View Dashboard → Step 3: Click Agent/Project → Step 4: View Detail
```

| Step | Conversion | Drop-off |
|------|------------|----------|
| Login → Dashboard View | 100% | 0% |
| Dashboard → Detail Click | 70% | 30% |
| Detail → Further Action | 40% | 30% |

### 6.2 Research Discovery Funnel

```
Step 1: Research Page → Step 2: Filter → Step 3: Click Card → Step 4: Read Full
```

| Step | Conversion | Drop-off |
|------|------------|----------|
| Research Page → Filter | 60% | 40% |
| Filter → Card Click | 50% | 10% |
| Card Click → Full Read | 30% | 20% |

---

## 7. Real-Time Monitoring

### 7.1 Dashboard Metrics (Real-time)

| Metric | Update Frequency | Display |
|--------|------------------|---------|
| Active users | 1 minute | Admin panel |
| Current CPU/RAM | 30 seconds | Dashboard widget |
| Agent status | 30 seconds | Dashboard widget |
| Active alerts | Real-time | Dashboard widget |

### 7.2 Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| CPU | > 70% | > 90% |
| RAM | > 75% | > 95% |
| Storage | > 80% | > 95% |
| Error Rate | > 5% | > 10% |

---

## 8. Implementation Notes

### 8.1 Privacy Compliance

- No personal data beyond user role
- Session data anonymized
- No cross-site tracking
- GDPR compliant data retention (90 days)

### 8.2 Technical Implementation

```typescript
// Analytics event structure
interface AnalyticsEvent {
  name: string;
  properties: Record<string, string | number | boolean>;
  timestamp: string; // ISO 8601
  session_id: string;
  user_id: string;
}

// Example: Track agent card click
track('click_agent_card', {
  agent_id: 'fabio-cto',
  agent_role: 'CTO',
});
```

---

**CDO_SIGNED:** `FABIO_CDO_SIGNED_2026-04-03`

**Document Status:** v1.0 — Complete
