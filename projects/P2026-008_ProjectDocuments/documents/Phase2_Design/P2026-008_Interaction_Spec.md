# P2026-008 Interaction Specification

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 2 Design  
**Version:** v1.3  
**Date:** 2026-04-08  
**Author:** CDO  

---

## Overview

This document specifies all interactive behaviors for MADHORSE HQ dashboard components. Every interactive element has documented 4-state matrices using shadcn/ui + madhorse-cdo.json tokens.

> **⚠️ PHASE 3 MVP vs DEFERRED CLASSIFICATION**
> 
> | Scope | Status | Notes |
> |-------|--------|-------|
> | Core Dashboard (System/Agent/Project monitors) | **MVP** | Must ship with Phase 3 |
> | Research Hub | **MVP** | Must ship with Phase 3 |
> | Trends Module (Mock data) | **MVP** | Must ship with Phase 3 |
> | Trends Module (Live APIs) | **Deferred (Phase 3.1+)** | TikTok/IG/YouTube live APIs |
> | Agent Reasoning Log | **MVP** | Must ship with Phase 3 |
> | **Real-time Reasoning Visibility** | **MVP** | Must ship with Phase 3 — Boss sees AI thinking/planning in real-time |
> | Agent Discussions | **Deferred (Phase 3.1+)** | Threaded discussions |
> | Authentication (Login/OAuth) | **MVP** | Must ship with Phase 3 |
> | Auto-refresh (System/Agent) | **MVP** | Must ship with Phase 3 |
> | Auto-refresh (Project 60s) | **MVP** | Must ship with Phase 3 |
> | Mobile Touch Gestures | **Deferred (Phase 3.1+)** | Swipe/pull-to-refresh |
> | Featured Research Spotlight | **MVP** | Must ship with Phase 3 |
> | Hot Reels Spotlight | **Deferred (Phase 3.1+)** | Video carousel |



---

## 1. Navigation Interactions

### 1.1 Header Navigation

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Logo | `--foreground` | Scale 1.05, `--accent` glow | Scale 0.98 | N/A |
| Nav Tab | `--foreground` | `--accent` underline | `--accent` bg, `--accent-foreground` text | 50% opacity |
| Search Icon | `--muted-foreground` | `--foreground` | Ring focus | N/A |
| User Avatar | `--card` + border | Ring `--accent` | Scale 0.95 | N/A |
| Logout Button | `--destructive` bg | Lighter `--destructive` | Darker `--destructive` | 50% opacity |

### 1.2 Sidebar Navigation

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Nav Item | `--card-foreground` | `--card` bg | `--accent` left border + bg | 50% opacity |
| Collapse Toggle | `--muted-foreground` | `--foreground` | Rotate 180deg | N/A |

### 1.3 Breadcrumb

```tsx
// Component: Breadcrumb
// Interaction: Click navigates to parent level
// States: default (link style), hover (underline), current (non-clickable)
// Token: --foreground, --muted-foreground
```

---

## 2. System Monitor Interactions

### 2.1 Metric Card

| Behavior | Trigger | Action | Animation |
|----------|---------|--------|-----------|
| Refresh | 30s auto / manual click | Fetch new data, update values | Fade transition 200ms |
| Loading | Data fetch in progress | Show skeleton overlay | Pulse opacity 0.5-1 |
| Error | API failure | Show error state with retry button | Shake animation |
| Hover | Mouse enter | Elevation increase | `box-shadow` transition 150ms |

### 2.2 Metric Card State Matrix

| State | Visual | Behavior |
|-------|--------|----------|
| Default | Static values, no overlay | Normal display |
| Hover | Shadow `0 8px 16px rgba(0,0,0,0.3)` | Cursor pointer |
| Active/Loading | Skeleton overlay + spinner | Data refresh in progress |
| Disabled | 50% opacity, no pointer events | API error, manual refresh available |

### 2.3 Progress Bar Interaction

| State | Fill Color | Animation |
|-------|------------|-----------|
| Normal (0-70%) | `--accent` | None |
| Warning (71-90%) | `--warning` (amber) | None |
| Critical (91-100%) | `--destructive` | Pulse animation 1s infinite |

### 2.4 Refresh Button

```tsx
// Component: RefreshButton
// States: default, hover, active, disabled, loading
// Tokens: --secondary, --secondary-foreground, --accent
// Animation: Spin icon during loading (1s linear infinite)
```

---

## 3. Agent Interactions

### 3.1 Agent Card

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Container | `--card` bg | `--accent` border glow | `--accent` border solid | 50% opacity |
| Status Badge | See below | N/A | N/A | N/A |
| Avatar | Role-based color | Scale 1.1 | Scale 0.95 | Grayscale |
| Name | `--foreground` | Underline | Bold | Muted |

### 3.2 Status Badge Colors

| Status | Background | Text | Indicator |
|--------|------------|------|-----------|
| ACTIVE | `--success` (green) | `--foreground` | Solid dot |
| BUSY | `--accent` (red) | `--accent-foreground` | Pulsing dot |
| IDLE | `--muted` | `--muted-foreground` | Hollow dot |
| ERROR | `--destructive` | `--destructive-foreground` | Solid dot + shake |

### 3.3 Agent Card Click Flow

```
1. Click Agent Card
2. → Navigate to /agents/[id]
3. → Load Agent Detail view
4. → Display: Status, Current Task, Reasoning Log, Discussions
```

### 3.4 Reasoning Log Interaction

```tsx
// Component: ReasoningLog
// States: collapsed (default), expanded, loading, error
// Behavior:
//   - Click header → Toggle collapsed/expanded
//   - Auto-load latest reasoning on expand
//   - Scroll within log area
//   - Timestamps clickable for session navigation
// Tokens: --card, --muted, --muted-foreground, --border
// Animation: Collapsible height transition 200ms ease-out
```

### 3.5 Discussion Thread Interaction

```tsx
// Component: DiscussionThread
// States: default, loading, empty, expanded
// Behavior:
//   - Click thread card → Expand inline or navigate to /discussions/[id]
//   - Show participant avatars
//   - Display outcome badge if resolved
// Tokens: --card, --foreground, --muted-foreground, --border
```

### 3.6 Real-time Reasoning Stream (BOSS Requirement)

**⚠️ NEW: Phase 2 - Real-time Reasoning Visibility Feature**

When Boss assigns a requirement, Boss wants to see on the web page:
1. What the AI (CEO agent) is thinking/planning
2. Which sub-agents are being called
3. What each agent is doing and thinking
4. How the task is ultimately completed
5. Key learnings after completion

#### 3.6.1 Reasoning Stream Component

```tsx
// Component: ReasoningStream
// States: idle, receiving, streaming, completed, error
// Location: /agents/[id] page - dedicated panel
// Behavior:
//   - Auto-scroll as new reasoning content arrives
//   - Show streaming cursor/blinking indicator during active streaming
//   - Timestamps on each reasoning block
//   - Agent name/role shown per reasoning block
//   - Sub-agent dispatch events highlighted differently
// Tokens: --card (container), --accent (dispatch events), --muted (background)
// Animation: New content slides in from bottom, 200ms ease-out
```

#### 3.6.2 Reasoning Stream Event Types

| Event Type | Visual | Icon | Color |
|------------|--------|------|-------|
| Task Received | Card with border | 📥 | `--accent` left border |
| Planning | Card with background | 🧠 | `--muted` background |
| Sub-agent Call | Dispatch card | 📞 | `--accent` glow |
| Execution | Progress card | ⚡ | `--secondary` |
| Completion | Success card | ✅ | `--success` |
| Learning | Insight card | 💡 | `--accent` background |

#### 3.6.3 Reasoning Stream State Matrix

| State | Visual | Behavior |
|-------|--------|----------|
| Idle | Muted panel, "Waiting for tasks..." | No active reasoning |
| Receiving | Pulse animation on border | Task assigned, initializing |
| Streaming | Blinking cursor, new blocks appearing | Active reasoning in progress |
| Completed | Green checkmark, completion timestamp | Task done, showing result |
| Learning | Highlighted insights section | Auto-generated learnings displayed |
| Error | Red border, error message | Reasoning failed, retry option |

#### 3.6.4 Key Learnings Section

```tsx
// Component: LearningSummary
// States: hidden, generating, visible
// Behavior:
//   - Appears after task completion
//   - Shows 1-5 key learnings as bullet points
//   - Each learning clickable for detailed view
//   - Persists in reasoning history
// Tokens: --card, --accent (insight marker), --muted-foreground (text)
// Animation: Fade in 300ms after completion
```

#### 3.6.5 CEO Reasoning Stream (Special)

The CEO/Boss reasoning stream shows the full pipeline:

```
[Requirement Received]
    ↓
[Planning & Decomposition]
    ↓
[Calling CTO: "Analyze market trends for Q2"]
[Calling COO: "Prepare operational report"]
    ↓
[CTO Result: 5 trends identified]
[COO Result: 3 operational insights]
    ↓
[Synthesizing Results]
    ↓
[Task Completed]
    ↓
[Key Learnings Generated]
```

#### 3.6.6 Sub-Agent Reasoning Visibility

| Agent | Reasoning Stream Location | Special Features |
|-------|--------------------------|------------------|
| CEO/Boss | /agents/boss or /agents/ceo | Full pipeline, sub-agent dispatch visibility |
| CTO | /agents/cto | Technical planning and analysis reasoning |
| COO | /agents/coo | Operations and workflow reasoning |
| CDO | /agents/cdo | Design and user experience reasoning |
| CISO | /agents/ciso | Security and compliance reasoning |

---

## 4. Project Interactions

### 4.1 Project Card

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Container | `--card` | Scale 1.02, shadow | Scale 0.98 | N/A |
| Progress Bar | `--accent` fill | N/A | N/A | N/A |
| Phase Badge | `--secondary` | Slight lift | N/A | Muted |
| Click | N/A | N/A | Navigate to project detail | N/A |

### 4.2 Project Card Click Flow

```
1. Click Project Card
2. → Navigate to /projects/[id]
3. → Load Milestone Tracker
4. → Display: Progress, Timeline, Deliverables
```

### 4.3 Milestone Tracker

```tsx
// Component: MilestoneTracker
// States: collapsed, expanded, loading
// Behavior:
//   - Click milestone → Toggle completion status (if editable)
//   - Progress auto-updates on completion
//   - Visual checkmark animation on complete
// Tokens: --accent, --success, --muted
// Animation: Checkmark draw 300ms ease-out
```

### 4.4 Filter Controls

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Filter Button | `--secondary` | `--primary` | `--accent` bg | 50% opacity |
| Clear All | `--ghost` | Underline | N/A | N/A |

---

## 5. Research Interactions

### 5.1 Research Card

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Container | `--card` | Border `--accent`, shadow | Ring focus | N/A |
| Featured Flag | `--accent` | Scale 1.1 | N/A | N/A |
| Category Badge | `--secondary` | Slight lift | N/A | N/A |
| Tags | `--muted` | `--accent` border | N/A | N/A |
| Click | N/A | N/A | Navigate to detail | N/A |

### 5.2 Research Filter

```tsx
// Component: ResearchFilter
// States: all selected, category-specific
// Behavior:
//   - Click category → Filter research by category
//   - Click "All" → Show all research
//   - Smooth grid reflow on filter change
// Tokens: --primary, --secondary, --accent
// Animation: Fade in/out filtered items 200ms
```

### 5.3 Featured Research Spotlight

```tsx
// Component: FeaturedResearch
// States: default, loading, empty
// Behavior:
//   - Auto-rotate featured items every 10s
//   - Click → Navigate to research detail
//   - Dot indicators show position, clickable to jump
// Tokens: --card, --accent
// Animation: Slide transition 400ms ease-in-out
```

---

## 6. Trends Interactions

### 6.1 Platform Selector

| Tab | Default | Hover | Active | Disabled |
|-----|---------|-------|--------|----------|
| TikTok | `--secondary` | Lighter `--secondary` | `--accent` bg + text | N/A |
| 小紅書 | `--secondary` | Lighter `--secondary` | `--accent` bg + text | N/A |
| Instagram | `--secondary` | Lighter `--secondary` | `--accent` bg + text | N/A |
| Twitter | `--secondary` | Lighter `--secondary` | `--accent` bg + text | N/A |
| YouTube | `--secondary` | Lighter `--secondary` | `--accent` bg + text | N/A |

### 6.2 Platform Selector Click Flow

```
1. Click Platform Tab
2. → Update URL query param ?platform=tiktok
3. → Fetch new trends data
4. → Animate out old content, animate in new 300ms
```

### 6.3 Trend Card

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Container | `--card` | Scale 1.02, `--accent` border | Ring focus | N/A |
| Rank | `--accent` | Scale 1.1 | N/A | N/A |
| Views | `--muted-foreground` | `--foreground` | N/A | N/A |
| Click | N/A | N/A | Open trend detail | N/A |

### 6.4 Trend Card Interaction Flow

```tsx
// Component: TrendCard
// States: default, hover, active, loading
// Behavior:
//   - Hover → Scale + border highlight
//   - Click → Open related reels/more info modal
//   - Keyboard: Tab focus, Enter activate
// Tokens: --card, --foreground, --accent, --muted-foreground
// Animation: Scale 150ms ease-out
```

---

## 7. Authentication Interactions

### 7.1 Login Form

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Email Input | `--input` border | Ring `--accent` | Ring `--accent` solid | Muted bg |
| Password Input | `--input` border | Ring `--accent` | Ring `--accent` solid | Muted bg |
| Submit Button | `--primary` | Lighter `--primary` | Darker `--primary` | 50% opacity |
| Google OAuth | `--primary` | Scale 1.02 | Scale 0.98 | N/A |
| Forgot Link | `--accent` | Underline | N/A | N/A |

### 7.2 Form Validation

| Field | Validation | Error State | Token |
|-------|-----------|-------------|-------|
| Email | Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | `--destructive` border + message | `--destructive` |
| Password | Min 8 chars | `--destructive` border + message | `--destructive` |

### 7.3 Auth Error States

```tsx
// Component: AuthError
// States: invalid credentials, network error, rate limited, server error
// Behavior:
//   - Show error message with icon
//   - Shake animation on form
//   - Rate limit shows countdown timer
// Tokens: --destructive, --destructive-foreground
// Animation: Shake 300ms ease-in-out
```

### 7.4 Loading States

```tsx
// Component: AuthButton
// States: default, hover, loading, success, error
// Loading Behavior:
//   - Show spinner icon
//   - Disable button
//   - Change text to "Signing in..."
// Tokens: --primary, --secondary, --accent
// Animation: Spinner rotate 1s linear infinite
```

---

## 8. Global Interactions

### 8.1 Auto-Refresh (30s)

| Module | Default | Active Refresh | Paused |
|--------|---------|-----------------|--------|
| System Monitor | 30s polling | Loading indicator | User hover pauses |
| Agent Status | 30s polling | Loading indicator | User hover pauses |
| Project Status | 60s polling | Loading indicator | User hover pauses |

### 8.2 Toast Notifications

```tsx
// Component: Toast
// Types: success, warning, error, info
// Behavior:
//   - Appear bottom-right
//   - Auto-dismiss after 5s
//   - Click to dismiss
//   - Stack up to 3 visible
// Tokens: --success, --warning, --destructive, --accent
// Animation: Slide in from right 200ms, fade out 150ms
```

### 8.3 Modal/Dialog

```tsx
// Component: Dialog
// States: closed, opening, open, closing
// Behavior:
//   - Click overlay or Escape to close
//   - Focus trap inside modal
//   - Animate open/close
// Tokens: --card, --foreground, --border, --muted
// Animation: Scale + fade 200ms ease-out
```

### 8.4 Keyboard Navigation

| Key | Action | Context |
|-----|--------|---------|
| Tab | Move focus forward | All interactive elements |
| Shift+Tab | Move focus backward | All interactive elements |
| Enter | Activate focused element | Buttons, links, cards |
| Escape | Close modal/dropdown | Modals, dropdowns |
| Space | Toggle collapsed sections | Accordions, collapsibles |
| Arrow Up/Down | Navigate lists | Dropdowns, menus |

### 8.5 Focus Management

```tsx
// Focus Ring Styles
// Default: outline: 2px solid transparent
// Focus: outline: 2px solid hsl(var(--accent))
// Focus-visible: outline-offset: 2px
// Animation: outline transition 150ms ease
```

---

## 9. Responsive Interactions

### 9.1 Breakpoint Behavior

| Breakpoint | Width | Sidebar | Grid | Interaction |
|------------|-------|---------|------|-------------|
| Desktop XL | ≥1440px | Expanded | 4-col | Normal |
| Desktop | 1024-1439px | Expanded | 3-col | Normal |
| Tablet | 768-1023px | Collapsed (icon-only) | 2-col | Hamburger menu |
| Mobile | <768px | Hidden (drawer) | 1-col | Full hamburger |

### 9.2 Mobile Touch Gestures

| Gesture | Element | Action |
|---------|---------|--------|
| Tap | Cards | Navigate/select |
| Long press | Cards | Show context menu |
| Swipe left | Lists | Quick actions |
| Pull down | Lists | Refresh |

---

## 10. Error & Empty States

### 10.1 Error State

```tsx
// Component: ErrorState
// Tokens: --destructive, --muted-foreground, --card
// Content: Error icon, message, retry button
// Animation: Fade in 200ms
```

### 10.2 Empty State

```tsx
// Component: EmptyState
// Tokens: --muted-foreground, --card
// Content: Illustration, message, action button
// Animation: Fade in 200ms
```

### 10.3 Loading Skeleton

```tsx
// Component: SkeletonLoader
// Tokens: --muted
// Animation: Shimmer left-to-right 1.5s ease-in-out infinite
```

---

**CDO_SIGNED:** `FABIO_CDO_SIGNED_2026-04-08`

**Document Status:** v1.3 — Added Real-time Reasoning Visibility interactions (Section 3.6) for Phase 2 Boss requirement
