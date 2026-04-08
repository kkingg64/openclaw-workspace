# Design System Resources

> 已下載喺 VPS，直接讀取。Container 路徑：`/opt/design-systems/`

## shadcn/ui（184 個文件）
| 類別 | 路徑 |
|------|------|
| CSS 變數 | `design-systems/shadcn/globals.css` (381 lines) |
| 主題集 | `design-systems/shadcn/themes.css` |
| zinc dark JSON | `design-systems/shadcn/themes/zinc.json` |
| Tailwind CSS | `design-systems/shadcn/tailwind.css` |
| 組件庫 | `design-systems/shadcn/components/` (56 個) |
| 圖表庫 | `design-systems/shadcn/charts/` (70 個) |
| Dashboard 模板 | `design-systems/shadcn/blocks/dashboard-01/page.tsx` |
| 目錄索引 | `design-systems/shadcn/directory.json` |

## Tabler v1.4.0（⭐40,890）
| 類別 | 路徑 |
|------|------|
| CSS | `design-systems/tabler/tabler.min.css` (523KB) |
| Design tokens | `design-systems/tabler/scss/_variables.scss` (1037 lines) |
| Dark mode | `design-systems/tabler/scss/_variables-dark.scss` |
| UI SCSS | `design-systems/tabler/scss/ui/` (50 個) |
| HTML 組件 | `design-systems/tabler/html-components/` (62 個) |
| HTML Layout | `design-systems/tabler/html-layout/` (19 個) |
| Dashboard 卡片 | `design-systems/tabler/html-cards/` (47 個) |
| Chart 卡片 | `design-systems/tabler/html-cards/charts/` (9 個) |

## Tabler Design Tokens
```
color.bg         = #f9fafb     color.primary    = #066fd1
color.bg-surface = #ffffff     color.success    = #2fb344
color.text       = #1f2937     color.danger     = #d63939
color.text-muted = #6b7280     color.border     = #e5e7eb
```

## Penpot Templates
| # | Template ID | 最適用 |
|---|-------------|--------|
| 7 | `lucide-icons` ⭐ | **每個項目必連接** — 1,000+ icons |
| 2 | `wireframing-kit` | 低保真線框圖 |
| 5 | `plants-app` | 完整 app 設計範例 |

## Penpot Library 限制
Plugin API `connectLibrary()` 有 Bug — 唔能用。
替代：REST API 讀取 Icons，或 `createShapeFromSvg()` 手建。
CDO 用 `createBoard/createRectangle/createText` 手砌 = 正確方案。
