# Dashboard UI v2 - MADHORSE Design Specification

**Status:** ⚠️ PARTIAL - MCP Bug Blocks Text Creation
**Created:** 2026-03-31 02:38 UTC
**PenPot File:** `Dashboard Redesign 2026-03-31`
**Board Name:** `Dashboard UI v2 - MADHORSE`

---

## ⚠️ CRITICAL BUG - MCP Server Issue

**PenPot MCP Server Bug:**
- `penpot.createText()` returns `null` - **BLOCKING**
- `penpot.createPath()` returns frozen object - unusable
- `penpot.createShapeFromSvg()` returns `null`
- Only `createRectangle()`, `createEllipse()`, `createBoard()` work

**Impact:** Cannot create any text labels, navigation items, or text-based UI elements through MCP.

**Workaround:** Need to add text manually through PenPot web interface, OR fix MCP plugin.

---

## Layout Structure (1920x1080 Desktop)

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER (64px) - #0A2540                                          │
│ ┌─────┬───────────────────────────────────────────────┬────────┐ │
│ │LOGO │ Nav: Dashboard | Analytics | Projects | ...   │ Avatar│ │
│ └─────┴───────────────────────────────────────────────┴────────┘ │
├────────────┬─────────────────────────────────────────────────────┤
│ SIDEBAR   │ MAIN CONTENT - #0F3460                              │
│ (240px)   │                                                     │
│ #0D1B2A   │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  (4 Stat Cards)│
│           │ │Card 1│ │Card 2│ │Card 3│ │Card 4│                  │
│ Overview  │ │#E9456│ │#00B89│ │#FDCB6│ │#0984E│                  │
│ Analytics │ └──────┘ └──────┘ └──────┘ └──────┘                  │
│ Reports   │                                                     │
│ Projects  │ ┌────────────────────────┐ ┌────────────┐           │
│ Messages  │ │     Chart Area        │ │  Activity  │           │
│ Calendar  │ │     (840x280)         │ │   Card     │           │
│ Settings  │ └────────────────────────┘ │  (392x400) │           │
│           │ ┌────────────────────────┐ │            │           │
│           │ │     Table Area         │ │ Progress   │           │
│           │ │     (840x320)          │ │ Bars       │           │
│           │ └────────────────────────┘ │            │           │
│           │                             │  Badges   │           │
│           │ ┌──────┐                   └────────────┘           │
│           │ │ CTA  │                                            │
│           │ │Button│                                            │
│           │ └──────┘                                            │
└───────────┴─────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Header (1920 x 64px)
- **Background:** `#0A2540`
- **Logo:** 36x36 rounded rectangle (#E94560), positioned at x:24, y:14
- **Nav Items:** 5 items at x:400, spacing 120px each
- **User Avatar:** 36x36 circle at x:1844, y:14

### 2. Sidebar (240 x 1016px)
- **Background:** `#0D1B2A`
- **Active Indicator:** 4px wide #E94560 bar on left edge
- **Nav Items:** 48px height each, icon (24px) + label
- **Active State:** Subtle #E94560 background at 15% opacity

### 3. Stat Cards (392 x 120px each, 24px gap)
- **Background:** `#16213E`
- **Border Radius:** 12px
- **Shadow:** `0 4px 20px rgba(0,0,0,0.3)`
- **Padding:** 16px internal
- **Accent Bar:** 4px wide, 40px tall, left-aligned (color per card)
- **Card Colors:**
  - Revenue: `#E94560` (accent)
  - Users: `#00B894` (success)
  - Sessions: `#FDCB6E` (warning)
  - Growth: `#0984E3` (info blue)

### 4. Chart Area (840 x 280px)
- **Background:** `#16213E`
- **Border Radius:** 12px
- **Shadow:** `0 4px 20px rgba(0,0,0,0.3)`

### 5. Table Area (840 x 320px)
- **Background:** `#16213E`
- **Border Radius:** 12px
- **Shadow:** `0 4px 20px rgba(0,0,0,0.3)`

### 6. Activity Card (392 x 400px)
- **Background:** `#16213E`
- **Border Radius:** 12px
- **Shadow:** `0 4px 20px rgba(0,0,0,0.3)`

### 7. Progress Bars
- **Track:** 360 x 8px, `#1E3A5F`, border-radius 4px
- **Fill:** 8px height, border-radius 4px
- **Bar 1:** 80% filled (#E94560)
- **Bar 2:** 90% filled (#00B894)

### 8. CTA Button (160 x 44px)
- **Background:** `#E94560`
- **Border Radius:** 8px
- **Position:** x:264, y:880

### 9. Badges (80 x 28px)
- **Border Radius:** 14px (pill shape)
- **Success Badge:** `#00B894` at 20% opacity
- **Warning Badge:** `#FDCB6E` at 20% opacity

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#0F3460` | Page background |
| `surface` | `#16213E` | Card backgrounds |
| `header` | `#0A2540` | Header/sidebar |
| `sidebar` | `#0D1B2A` | Sidebar background |
| `text` | `#FFFFFF` | Primary text |
| `textMuted` | `#A8A8B3` | Secondary text |
| `accent` | `#E94560` | CTA, highlights |
| `success` | `#00B894` | Positive states |
| `error` | `#FF6B6B` | Error states |
| `warning` | `#FDCB6E` | Warning states |
| `info` | `#0984E3` | Info states |

---

## Typography (Inter Font Family)

| Element | Size | Weight |
|---------|------|--------|
| Logo Text | 20px | 700 |
| Page Title | 28px | 700 |
| Card Title | 18px | 600 |
| Nav Items | 14px | 400/600 |
| Body Text | 14px | 400 |
| Small Text | 12px | 400 |
| Badge Text | 12px | 600 |

---

## Spacing System (4px Grid)

- **Component Gap:** 16px (4 units)
- **Card Padding:** 16px internal
- **Section Gap:** 24px (6 units)
- **Card Gap:** 24px between cards

---

## Implemented Elements (via MCP)

✅ Board: "Dashboard UI v2 - MADHORSE" (1920x1080)
✅ Header (1920x64)
✅ Sidebar (240x1016)
✅ Main Content Area (1656x1016)
✅ 4 Stat Cards with accent bars
✅ Chart Area (840x280)
✅ Table Area (840x320)
✅ Activity Card (392x400)
✅ Progress Bars (2)
✅ CTA Button
✅ Badges (2)

❌ Text labels (BLOCKED by MCP bug)
❌ Navigation text
❌ Card content text
❌ Any Typography

---

## To Complete in PenPot Web Interface

1. Add Header Logo text: "MADHORSE" (Inter, 20px, 700, #E94560)
2. Add Nav items: Dashboard, Analytics, Projects, Team, Settings
3. Add Sidebar nav labels with icons
4. Add Stat Card titles and values
5. Add Chart labels
6. Add Table headers and content
7. Add Activity card content
8. Add Progress bar labels
9. Add Button text: "Add New"
10. Add Badge text: "Active", "Pending"

---

## Recommendation

**Fix MCP Plugin:** The `createText()` function returns null because the PenPot plugin API's `Text` factory is not properly initialized. This should be reported to the PenPot MCP server maintainers.

**Alternative:** Use PenPot web interface directly to add text elements manually, then CTO can implement based on the geometric layout already created.