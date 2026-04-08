# Dashboard UI Redesign - UI Specification
**Project ID:** P2026-001
**Date:** 2026-03-31
**Designer:** CDO (Chief Design Officer)
**Status:** Design Spec Complete - Awaiting PenPot Implementation

---

## 📋 Executive Summary

Redesign the MADHORSE Dashboard (`https://marhorse.cloud`) with a modern, professional UI using the MADHORSE Design System. The new design features a dark theme with clear visual hierarchy, intuitive navigation, and data-rich dashboard cards.

---

## 🎨 MADHORSE Design System Reference

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1A1A2E` | Header, Sidebar, Text elements |
| `--color-accent` | `#E94560` | CTAs, Active states, Highlights |
| `--color-surface` | `#16213E` | Cards, Elevated surfaces |
| `--color-bg` | `#0F3460` | Page background |
| `--color-text` | `#FFFFFF` | Primary text |
| `--color-text-muted` | `#A8A8B3` | Secondary text, Labels |
| `--color-success` | `#00B894` | Success states, Active indicators |
| `--color-error` | `#FF6B6B` | Error states |
| `--color-warning` | `#FDCB6E` | Warning states, Idle indicators |

### Typography (Inter Font Family)

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | 32px | 700 | 40px |
| H2 (Section Title) | 24px | 600 | 32px |
| H3 (Card Title) | 18px | 600 | 24px |
| Body | 16px | 400 | 24px |
| Label | 14px | 400 | 20px |
| Caption | 12px | 400 | 16px |

### Spacing (4px Grid System)

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |

### Border Radius

| Component | Radius |
|-----------|--------|
| Buttons | 8px |
| Cards | 12px |
| Modals | 16px |
| Pills/Chips | 999px (full) |
| Avatar (Circle) | 50% |

### Shadows

| Component | Shadow |
|-----------|--------|
| Card | `0 4px 20px rgba(0,0,0,0.3)` |
| Modal | `0 8px 40px rgba(0,0,0,0.5)` |

---

## 📐 Layout Specifications

### Desktop Layout (1920px x 1080px)

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER (Height: 64px)                                           │
│  ┌─────────┬─────────────────────────────┬────────────────────┐ │
│  │ MADHORSE│  Dashboard  Projects  Agents│ Settings    [Avatar]││
│  └─────────┴─────────────────────────────┴────────────────────┘ │
├─────────┬───────────────────────────────────────────────────────┤
│ SIDEBAR │  MAIN CONTENT AREA                                    │
│ (240px) │                                                        │
│         │  ┌─────────────────────────────────────────────────┐  │
│ Overview│  │ Welcome back, King                              │  │
│ Projects│  │ Here's your command center overview             │  │
│ Agents  │  │                                                  │  │
│ Analytics│ │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐     │  │
│ Settings│  │ │Active   │ │Awaiting│ │System  │ │Agents  │     │  │
│         │  │ │Projects │ │Boss    │ │Uptime  │ │Online  │     │  │
│         │  │ │   6     │ │   2    │ │ 99.9%  │ │  5/5   │     │  │
│         │  │ └────────┘ └────────┘ └────────┘ └────────┘     │  │
│         │  │                                                  │  │
│         │  │ ┌──────────────────┐ ┌──────────────────┐      │  │
│         │  │ │ Agent Status      │ │ Active Projects  │      │  │
│         │  │ │ ● Fabio CEO  ACT  │ │ P2026-001  80%   │      │  │
│         │  │ │ ● CTO        ACT  │ │ P2026-002  90%   │      │  │
│         │  │ │ ● COO        IDLE │ │ P2026-003  95%   │      │  │
│         │  │ │ ● CISO       ACT  │ │ P2026-004  95%   │      │  │
│         │  │ │ ● CDO        IDLE │ └──────────────────┘      │  │
│         │  │ └──────────────────┘                            │  │
│         │  │                                                  │  │
│         │  │ ┌─────────────────────────────────────────────┐ │  │
│         │  │ │ System Status                               │ │  │
│         │  │ │ OpenClaw  │ MiniMax   │ Telegram │Postgres │ │  │
│         │  │ └─────────────────────────────────────────────┘ │  │
│         │  └─────────────────────────────────────────────────┘  │
└─────────┴───────────────────────────────────────────────────────┘
```

### Mobile Layout (375px x 812px - iPhone)

```
┌─────────────────────────┐
│ HEADER (56px)          │
│ MADHORSE         [◯]   │
├─────────────────────────┤
│ MAIN CONTENT           │
│                         │
│ Welcome, King           │
│                         │
│ ┌─────────────────────┐ │
│ │ Active Projects     │ │
│ │          6          │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ System Uptime       │ │
│ │         99.9%       │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Agents Online       │ │
│ │           5/5       │ │
│ └─────────────────────┘ │
│                         │
├─────────────────────────┤
│ BOTTOM NAV (64px)       │
│  ◇   ◈   ◆   △         │
│ Projects Overview Agents│
└─────────────────────────┘
```

---

## 🧩 Component Specifications

### 1. Header Component

| Property | Desktop | Mobile |
|----------|---------|--------|
| Height | 64px | 56px |
| Background | `#1A1A2E` (primary) | `#1A1A2E` (primary) |
| Logo Font | Inter 20px 700 | Inter 16px 700 |
| Logo Color | `#E94560` (accent) | `#E94560` (accent) |
| Nav Items | 14px, spacing 100px | Hidden |
| Avatar | 36px circle, `#E94560` | 32px circle, `#E94560` |

### 2. Sidebar Component (Desktop Only)

| Property | Value |
|----------|-------|
| Width | 240px |
| Background | `#1A1A2E` (primary) |
| Menu Item Height | 32px |
| Menu Item Spacing | 24px vertical margin |
| Active Indicator | 4px wide accent bar on left |
| Icon Size | 16px |
| Text Size | 14px |

### 3. Metric Card Component

| Property | Value |
|----------|-------|
| Width | 384px (desktop), 343px (mobile) |
| Height | 140px (desktop), 88px (mobile) |
| Background | `#16213E` (surface) |
| Border Radius | 12px |
| Shadow | `0 4px 20px rgba(0,0,0,0.3)` |
| Accent Bar | 4px wide, left side |
| Label Font | 14px, `#A8A8B3` (muted) |
| Value Font | 32px 700, `#FFFFFF` (text) |
| Sub-text Font | 12px, colored by status |

### 4. Agent Status Card

| Property | Value |
|----------|-------|
| Width | 792px |
| Height | 56px |
| Background | `#16213E` (surface) |
| Border Radius | 8px |
| Status Dot | 8px circle |
| Active Color | `#00B894` (success) |
| Idle Color | `#FDCB6E` (warning) |

### 5. Project Card

| Property | Value |
|----------|-------|
| Width | 792px |
| Height | 72px |
| Background | `#16213E` (surface) |
| Border Radius | 8px |
| Progress Bar | 200px wide, 4px height |
| Progress Fill | `#E94560` (accent) |
| Progress Background | `#1A1A2E` (primary) |

### 6. System Status Card

| Property | Value |
|----------|-------|
| Width | 384px |
| Height | 80px |
| Background | `#16213E` (surface) |
| Border Radius | 8px |
| Status Badge | "Active" with `#00B894` (success) |

### 7. Mobile Bottom Navigation

| Property | Value |
|----------|-------|
| Height | 64px |
| Background | `#1A1A2E` (primary) |
| Items | 4 items, 94px spacing |
| Icon Size | 20px |
| Active Color | `#E94560` (accent) |
| Inactive Color | `#A8A8B3` (muted) |

---

## 📊 Dashboard Data to Display

### Metrics Cards
1. **Active Projects**: 6 (+6)
2. **Awaiting Boss**: 2 (P002, P004)
3. **System Uptime**: 99.9% (Stable)
4. **Agents Online**: 5/5 (All up)

### Agent Status
| Agent | Role | Status |
|-------|------|--------|
| Fabio CEO | Project Oversight | ACTIVE |
| CTO | Dashboard Enhancement | ACTIVE |
| COO | Market Research | IDLE |
| CISO | Security Audit | ACTIVE |
| CDO | UI Review | IDLE |

### Active Projects
| ID | Name | Owner | Progress |
|----|------|-------|----------|
| P2026-001 | Dashboard | CTO | 80% |
| P2026-002 | Meal Planner | CEO | 90% |
| P2026-003 | Research Dashboard | CDO | 95% |
| P2026-004 | AI Mahjong Arena | CEO | 95% |

### System Status
| System | Value | Status |
|--------|-------|--------|
| OpenClaw Gateway | Port 18789 | Active |
| MiniMax API | M2.7 Model | Active |
| Telegram Bot | Active | Active |
| PostgreSQL | pgvector | Active |

---

## 🎯 Implementation Notes

### PenPot Setup Instructions

1. **Open PenPot**: `http://76.13.215.13:9001`
2. **Create New File**: "Dashboard UI Redesign - 2026-03-31"
3. **Install MCP Plugin**: 
   - Go to any design file
   - Click Plugin icon → Install Plugin
   - URL: `https://marhorse.cloud/penpot-plugin/manifest.json`
   - Click OPEN → Connect to MCP server
4. **Design Boards**:
   - Desktop: 1920px x 1080px
   - Mobile: 375px x 812px

### CSS Variables for Implementation

```css
:root {
  /* Colors */
  --color-primary: #1A1A2E;
  --color-accent: #E94560;
  --color-surface: #16213E;
  --color-bg: #0F3460;
  --color-text: #FFFFFF;
  --color-text-muted: #A8A8B3;
  --color-success: #00B894;
  --color-error: #FF6B6B;
  --color-warning: #FDCB6E;

  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-h3: 18px;
  --font-size-body: 16px;
  --font-size-label: 14px;
  --font-size-caption: 12px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Border Radius */
  --radius-button: 8px;
  --radius-card: 12px;
  --radius-modal: 16px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-card: 0 4px 20px rgba(0,0,0,0.3);
  --shadow-modal: 0 8px 40px rgba(0,0,0,0.5);
}
```

---

## 🔍 Current UI Analysis

### Issues Identified in Current Dashboard
1. **No consistent visual hierarchy** - Content runs together
2. **Missing sidebar navigation** - Only header navigation present
3. **Cards lack visual depth** - No shadows, flat appearance
4. **Color usage inconsistent** - Not following design system
5. **Typography not standardized** - Various sizes without system
6. **No mobile responsive design** - Not optimized for mobile
7. **Spacing inconsistent** - No 4px grid alignment
8. **Status indicators unclear** - Need better visual status dots

### Improvements in New Design
1. ✅ Clear header + sidebar layout
2. ✅ Shadow-enhanced cards for depth
3. ✅ Consistent MADHORSE Design System colors
4. ✅ 4px grid spacing throughout
5. ✅ Clear status indicators with colored dots
6. ✅ Mobile-first responsive design
7. ✅ Progress bars for projects
8. ✅ Professional dark theme

---

**Document Version:** 1.0
**Last Updated:** 2026-03-31 HKT
**Next Step:** PenPot implementation with MCP plugin connection
