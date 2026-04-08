# P2026-009 CDO Design Brief — MADHORSE Game Arena

**Date:** 2026-04-01 | **Author:** COO → CDO | **Phase:** 1.5 output

---

## Design System Decision
**推薦：shadcn/ui (zinc dark) + Neon Accent**
- 理由：MADHORSE 標準，dark mode 天然配太空主題
- HUD overlay 用 shadcn components，遊戲 canvas 用 R3F 獨立渲染

## Visual Style
- **Mode:** Dark Only
- **Brand Tone:** 未來科技感、太空戰場、霓虹光效
- **Primary Accent:** Cyan #00F5FF
- **Secondary Accent:** Magenta #FF00FF
- **Background:** zinc-950 (#09090b)
- **Surface:** zinc-900 (#18181b)
- **Text:** zinc-50 (#fafafa)

## Screen Inventory

| # | Screen Name | 目的 | 用戶 |
|---|-------------|------|------|
| 1 | Title Screen | 遊戲入口，大 LOGO + PLAY 按鈕 | 所有 |
| 2 | Game Lobby | 創建/加入房間，在線人數 | 所有 |
| 3 | Game Arena + HUD | 主遊戲 3D 畫面 | 玩家 |
| 4 | Scoreboard | Game Over 排名 | 所有 |
| 5 | Settings | 畫質/音量/控制 | 所有 |

## Navigation Structure
**Single-flow wizard:** Title → Lobby → Arena → Score → Lobby
- 無 sidebar/tabs
- Minimal chrome — 遊戲畫面最大化

## HUD 設計要素 (Game Arena Overlay)
| Element | Position | Style |
|---------|----------|-------|
| HP Bar | Top-left | Gradient bar, 紅色閃爍 < 25% |
| Crosshair | Center | Thin cyan circle |
| Kill Count | Top-right | "KILLS: 7" neon text |
| Timer | Top-center | Countdown "2:45" |
| Mini-map | Bottom-right | 半透明圓形 radar |
| Ammo | Bottom-center | "∞" or ammo count |

## Responsive Requirements
| Breakpoint | 必須 | Notes |
|------------|------|-------|
| Desktop 1440px | ✅ | Mouse + Keyboard 控制 |
| Tablet 768px | ✅ | Touch + 簡化 HUD |
| Mobile 390px | ✅ | Virtual Joystick + Auto-aim |

## Mobile 觸控 Layout
```
┌─────────────────────────┐
│     Timer    Kills      │
│ HP                      │
│                         │
│        [3D Arena]       │
│                         │
│  [JoyStick]   [AimPad]  │
│              [Mini-map] │
└─────────────────────────┘
```

## CDO 行動項
1. 設計 5 個 Screen 嘅 Desktop + Mobile 版本
2. 定義 HUD component states (default/low-hp/critical)
3. 定義 Color palette + Typography
4. 交付 Frontend Pack (UI_Spec, Component_Spec, UAT_Test_Cases)

---

`[DESIGN_BRIEF_DELIVERED: 2026-04-01 14:22 HKT]`
