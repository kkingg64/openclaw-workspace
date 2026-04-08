# P2026-008 Component Inventory

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 2 Design  
**Version:** v1.2  
**Date:** 2026-04-03  
**Author:** CDO  

---

## Overview

This document catalogs all UI components for MADHORSE HQ dashboard using shadcn/ui components + madhorse-cdo.json tokens (dark theme).

> **⚠️ COMPLEXITY NOTE (MR-1 Finding)**
> 
> This component inventory contains **22+ components** across 10 categories. Each component supports **4 states** (default, hover, active, disabled).
> 
> **Total state combinations:** 22+ components × 4 states = **88+ documented state interactions**
> 
> **Complexity mitigation:**
> - Use shadcn/ui base components (reduces custom code)
> - Shared token system via madhorse-cdo.json
> - 4-state matrix standardized across all components
> - Phase 3 MVP scope limits initial implementation to core components
> 
> **Deferred components (Phase 3.1+):** Agent Discussions, Hot Reels Spotlight, Featured Research Auto-rotate



---

## 1. Navigation Components

### 1.1 Header

| Element | Token | States |
|---------|-------|--------|
| Logo | `--foreground` | default |
| Nav Tab | `--foreground` / `--accent` | default, hover, active, disabled |
| Search Icon | `--muted-foreground` | default, hover |
| User Avatar | `--card` + ring | default, hover |
| Logout Button | `--destructive` | default, hover, active, disabled |

```tsx
// Component: Header
// shadcn: None (custom)
// States: default, hover, active
// Tokens: --background, --foreground, --accent, --border
```

### 1.2 Sidebar

| Element | Token | States |
|---------|-------|--------|
| Container | `--card` | default |
| Nav Item | `--card-foreground` | default, hover, active, disabled |
| Divider | `--border` | default |
| Collapse Toggle | `--muted-foreground` | default, hover, active |

---

## 2. System Monitor Components

### 2.1 Metric Card

| Element | Token | States |
|---------|-------|--------|
| Container | `--card` | default, hover |
| Title | `--muted-foreground` | default |
| Value | `--foreground` | default |
| Trend Arrow | `--accent` | up, down |
| Progress Bar BG | `--muted` | default |
| Progress Bar Fill | `--accent` / `--success` / `--destructive` | normal, warning, critical |

**4 States:**
- **Default:** Static display of metric value
- **Hover:** Subtle elevation shadow `0 4px 6px rgba(0,0,0,0.1)`
- **Active:** Loading spinner overlay during refresh
- **Disabled:** 50% opacity, `cursor: not-allowed`

### 2.2 CPU Metric Card

```tsx
// Component: CpuMetricCard
// shadcn: Card, Progress
// States: default, hover, loading, error
// Tokens: --card, --foreground, --muted, --accent
```

### 2.3 RAM Metric Card

```tsx
// Component: RamMetricCard
// shadcn: Card, Progress
// States: default, hover, loading, error
// Tokens: --card, --foreground, --muted, --accent
```

### 2.4 Storage Metric Card

```tsx
// Component: StorageMetricCard
// shadcn: Card, Progress
// States: default, hover, loading, error
// Tokens: --card, --foreground, --muted, --accent
```

### 2.5 Network Metric Card

```tsx
// Component: NetworkMetricCard
// shadcn: Card
// States: default, hover, loading, error
// Tokens: --card, --foreground, --muted, --accent
```

### 2.6 Uptime Badge

```tsx
// Component: UptimeBadge
// shadcn: Badge
// States: default
// Tokens: --secondary, --secondary-foreground
```

---

## 3. Agent Components

### 3.1 Agent Card

| Element | Token | States |
|---------|-------|--------|
| Container | `--card` | default, hover, active, disabled |
| Avatar | `--accent` | online, busy, idle, error |
| Name | `--foreground` | default |
| Role | `--muted-foreground` | default |
| Status Badge | `--success`/`--warning`/`--destructive` | ACTIVE, BUSY, IDLE, ERROR |
| Current Task | `--card-foreground` | default |
| Last Active | `--muted-foreground` | default |

**4 States:**
- **Default:** Card displayed with agent info
- **Hover:** Elevation increase, border glow `0 0 0 1px var(--accent)`
- **Active:** Selected state with accent border
- **Disabled:** 50% opacity, no interactions

### 3.2 Agent Detail Card

```tsx
// Component: AgentDetailCard
// shadcn: Card, Badge, ScrollArea
// States: default, loading, error
// Tokens: --card, --foreground, --muted-foreground, --accent
```

### 3.3 Agent Reasoning Log

```tsx
// Component: ReasoningLog
// shadcn: Card, ScrollArea, Collapsible
// States: collapsed, expanded, loading
// Tokens: --card, --foreground, --muted, --border
```

### 3.4 Agent Discussion Thread

```tsx
// Component: DiscussionThread
// shadcn: Card, Avatar, Badge
// States: default, loading, empty, error
// Tokens: --card, --foreground, --muted-foreground, --border
```

---

## 4. Project Components

### 4.1 Project Card

| Element | Token | States |
|---------|-------|--------|
| Container | `--card` | default, hover, active |
| Project Name | `--foreground` | default |
| Phase Badge | `--secondary` | Phase 0-6, BAU |
| Progress Bar | `--accent` | 0-100% |
| Owner Avatar | `--muted` | default |
| Status | `--success`/`--warning`/`--muted` | Active, At Risk, Complete |

**4 States:**
- **Default:** Static project card
- **Hover:** Shadow elevation, slight scale `1.02`
- **Active:** Clicked state, brief press effect
- **Disabled:** Greyed out for archived projects

### 4.2 Project Milestone Tracker

```tsx
// Component: MilestoneTracker
// shadcn: Card, Progress, Collapsible
// States: collapsed, expanded, loading
// Tokens: --card, --foreground, --accent, --muted
```

### 4.3 Project Grid

```tsx
// Component: ProjectGrid
// shadcn: Card, Grid (responsive)
// States: default, loading, empty
// Tokens: --background, --card
```

---

## 5. Research Components

### 5.1 Research Card

| Element | Token | States |
|---------|-------|--------|
| Container | `--card` | default, hover |
| Featured Flag | `--accent` | featured, normal |
| Title | `--foreground` | default |
| Summary | `--muted-foreground` | default |
| Category Badge | `--secondary` | market, ai, strategy, tech |
| Date | `--muted-foreground` | default |
| Tags | `--muted` | default |
| ROI Badge | `--success`/`--warning`/`--destructive` | High, Medium, Low |

**4 States:**
- **Default:** Static research card
- **Hover:** Elevation + accent border highlight
- **Active:** Selected for detail view
- **Disabled:** N/A

### 5.2 Featured Research Spotlight

```tsx
// Component: FeaturedResearch
// shadcn: Card, Badge
// States: default, loading
// Tokens: --card, --accent, --foreground
```

### 5.3 Research Filter

```tsx
// Component: ResearchFilter
// shadcn: Button, Badge
// States: all selected, category selected
// Tokens: --primary, --secondary, --accent
```

---

## 6. Trends Components

### 6.1 Platform Selector

| Element | Token | States |
|---------|-------|--------|
| Tab Button | `--secondary` | default, hover, active, disabled |
| Active Indicator | `--accent` | active tab underline |

**4 States:**
- **Default:** Secondary background
- **Hover:** Lighter secondary + cursor pointer
- **Active:** Accent background + foreground inverted
- **Disabled:** 50% opacity

### 6.2 Trend Card

| Element | Token | States |
|---------|-------|--------|
| Container | `--card` | default, hover |
| Rank Number | `--accent` | 1-5 |
| Topic | `--foreground` | default |
| Views | `--muted-foreground` | default |
| Engagement Badge | `--success`/`--warning` | High, Medium, Low |

**4 States:**
- **Default:** Static trend card
- **Hover:** Scale 1.02 + accent border
- **Active:** Ring focus for keyboard nav
- **Disabled:** N/A

### 6.3 Hot Reels Spotlight

```tsx
// Component: HotReelsSpotlight
// shadcn: Card, Carousel
// States: default, loading, empty
// Tokens: --card, --foreground, --accent
```

---

## 7. Authentication Components

### 7.1 Login Form

| Element | Token | States |
|---------|-------|--------|
| Container | `--card` | default |
| Input Field | `--input` | default, focus, error, disabled |
| Input Label | `--foreground` | default |
| Google Button | `--primary` | default, hover, active, loading, disabled |
| Email Button | `--secondary` | default, hover, active, loading, disabled |
| Error Message | `--destructive` | default |
| Link | `--accent` | default, hover |

**4 States:**
- **Default:** Empty form ready for input
- **Hover:** Button hover states
- **Active:** Form submission loading
- **Disabled:** During auth check

### 7.2 Auth Provider Icons

```tsx
// Component: AuthProviderIcon
// shadcn: Button
// States: default, hover, loading, error
// Tokens: --primary, --secondary
```

---

## 8. Layout Components

### 8.1 Page Container

```tsx
// Component: PageContainer
// shadcn: None (custom div)
// Tokens: --background, --foreground
```

### 8.2 Grid Layouts

| Breakpoint | Columns | Token |
|------------|---------|-------|
| Desktop XL (≥1440px) | 4-col | CSS Grid |
| Desktop (1024-1439px) | 3-col | CSS Grid |
| Tablet (768-1023px) | 2-col | CSS Grid |
| Mobile (<768px) | 1-col | CSS Grid |

### 8.3 Card Container

```tsx
// Component: CardContainer
// shadcn: Card
// Tokens: --card, --card-foreground, --border, --radius
```

---

## 9. Shared / Utility Components

### 9.1 Button

```tsx
// Component: Button
// shadcn: ui/button
// Variants: default, secondary, outline, ghost, destructive, link
// States: default, hover, active, disabled, loading
// Tokens: --primary, --primary-foreground, --secondary, --secondary-foreground, --destructive, --destructive-foreground, --accent, --accent-foreground, --muted, --muted-foreground, --border, --ring
```

### 9.2 Input

```tsx
// Component: Input
// shadcn: ui/input
// States: default, focus, error, disabled
// Tokens: --input, --foreground, --border, --ring
```

### 9.3 Badge

```tsx
// Component: Badge
// shadcn: ui/badge
// Variants: default, secondary, outline, destructive
// States: default, hover
// Tokens: --secondary, --secondary-foreground, --destructive, --destructive-foreground, --accent, --accent-foreground
```

### 9.4 Avatar

```tsx
// Component: Avatar
// shadcn: ui/avatar
// States: default, loading, error
// Tokens: --muted, --foreground
```

### 9.5 Progress

```tsx
// Component: Progress
// shadcn: ui/progress
// States: default, loading, complete
// Tokens: --accent, --muted
```

### 9.6 ScrollArea

```tsx
// Component: ScrollArea
// shadcn: ui/scroll-area
// Tokens: --muted, --border
```

### 9.7 Skeleton

```tsx
// Component: Skeleton
// shadcn: ui/skeleton
// Tokens: --muted
```

### 9.8 Tooltip

```tsx
// Component: Tooltip
// shadcn: ui/tooltip
// Tokens: --card, --foreground
```

---

## 10. Token Mapping Summary

| Token Name | HSL Value | Usage |
|------------|-----------|-------|
| `--background` | `225 37% 6%` | Page background |
| `--foreground` | `0 0% 98%` | Primary text |
| `--card` | `225 37% 11%` | Card backgrounds |
| `--card-foreground` | `0 0% 98%` | Card text |
| `--popover` | `225 37% 6%` | Popover backgrounds |
| `--popover-foreground` | `0 0% 98%` | Popover text |
| `--muted` | `225 37% 18%` | Muted backgrounds |
| `--muted-foreground` | `215 20% 65%` | Muted text |
| `--accent` | `0 84% 60%` | Accent (red) |
| `--accent-foreground` | `225 37% 8%` | Accent text |
| `--destructive` | `0 84% 60%` | Destructive actions |
| `--destructive-foreground` | `225 37% 8%` | Destructive text |
| `--border` | `225 37% 18%` | Borders |
| `--input` | `225 37% 18%` | Input backgrounds |
| `--primary` | `0 0% 98%` | Primary buttons |
| `--primary-foreground` | `225 37% 8%` | Primary button text |
| `--secondary` | `225 37% 18%` | Secondary elements |
| `--secondary-foreground` | `0 0% 98%` | Secondary text |
| `--ring` | `0 84% 60%` | Focus rings |
| `--radius` | `0.5rem` | Border radius |
| `--success` | `142 76% 36%` | Success states (green) |
| `--warning` | `38 92% 50%` | Warning states (amber) |

---

## 11. Component State Matrix

| Component | Default | Hover | Active | Disabled |
|-----------|---------|-------|--------|----------|
| MetricCard | Static | Shadow | Spinner | 50% opacity |
| AgentCard | Static | Glow | Accent border | Greyed |
| ProjectCard | Static | Scale 1.02 | Press | N/A |
| ResearchCard | Static | Border | Selected | N/A |
| TrendCard | Static | Scale 1.02 | Ring | N/A |
| Button | Primary bg | Lighter | Darker | 50% opacity |
| Input | Border | Ring | Ring accent | Muted |
| Badge | Static | Slight lift | N/A | N/A |

---

**CDO_SIGNED:** `FABIO_CDO_SIGNED_2026-04-03`

**Document Status:** v1.2 — Complete (MR-1 fixes applied: complexity note added for 20+ components)
