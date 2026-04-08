# SKILLS.md — 核心設計規則（v3.3）

> 📂 完整技能分佈在 5 個檔案，CDO 必須全部讀取：
> - `SKILLS.md` (本檔) — 核心規則、設計原則、世界級技巧
> - `SKILLS_DESIGN.md` — 完整性定義、設計思維
> - `SKILLS_PENPOT.md` — Penpot 工具、Prototype
> - `SKILLS_PENCIL.md` — Pencil CLI 設計工具（headless 建立、export）
> - `SKILLS_WORKFLOW.md` — Phase 2 SOP、UAT、品牌清單

## 🚨🚨🚨 絕對禁止：自創顏色 🚨🚨🚨

> **違反以下規則 = 設計無效，必須重做**

### 顏色唯一來源規則
- **每個 hex 值必須來自老闆批准嘅設計系統文件**（見 Step 2 選擇協議）
- **禁止** 喺唔經批准嘅情況下自己發明顏色
- **禁止** 混合多個設計系統嘅顏色（例如 shadcn 背景 + MADHORSE accent）
- **禁止** 用「感覺好睇」作為顏色選擇依據

### 已核准設計系統 vs 自創顏色
```
✅ 合法：來自 /opt/design-systems/ 內任何已下載設計系統文件嘅 hex 值
✅ 合法：老闆在 Step 2 選擇協議中明確批准嘅顏色

❌ 非法：自己定義唔喺任何設計系統文件入面嘅顏色
❌ 禁止示例：唔經批准將 shadcn zinc-dark 改成 navy (#1A1A2E) / pink (#E94560)
```

### 唔確定時嘅規則
- 如果老闆無回應 Step 2 Proposal → 預設用 **shadcn/zinc-dark**（A 選項）
- shadcn/zinc-dark mandatory colors object（預設）：
```javascript
// 🔴 DEFAULT（只有唔確定時先用呢個）
const colors = {
  background: "#09090B", foreground: "#FAFAFA",
  card: "#09090B",       cardFg:     "#FAFAFA",
  primary: "#FAFAFA",    primaryFg:  "#18181B",
  secondary: "#27272A",  secondaryFg:"#FAFAFA",
  muted: "#27272A",      mutedFg:    "#A1A1AA",
  border: "#27272A",     ring:       "#D4D4D8",
};
```

---

## 🎨 設計原則

### 核心準則
1. **設計即功能** — 靚既野通常更好用
2. **少則多** — 越多嘢，越多嘢錯
3. **用戶視角** — 唔係我想點設計，而係用戶點用得舒服
4. **Design System First** — 每個項目必須 link 番 MADHORSE Design System，確保視覺一致

---

## ⚡ 世界級設計超能力 — 從 IBM Carbon + Refactoring UI + Laws of UX 提煉

> 以下規則來自世界最頂尖設計系統嘅真實 source code 同實戰心法。
> 每條規則都係可以直接寫進 Penpot 代碼嘅具體數字，唔係虛話。
> **Design Systems（已下載，直接用）：**
> - shadcn/ui 完整版（184 個文件）→ `design-systems/shadcn/`
> - Tabler v1.4.0 ⭐40,890 → `design-systems/tabler/`
> ⚡ 直接從 workspace 訪問：`design-systems/` → symlink 到 `/opt/design-systems/`
>
> **Pencil 模板（直接用於 Pencil 設計工具）：**
> - `pencil-templates/tabler-dashboard.pen` — 1440×900 完整 Dashboard（sidebar+stats+chart+table）
> - `pencil-templates/tabler-components.lib.pen` — 設計組件庫（stat cards, buttons, badges, inputs, nav）
> ⚡ 使用方式：Pencil → File → Open → 選擇 `.pen` 文件；或 `pencil interactive -i pencil-templates/tabler-dashboard.pen -o output.pen`

---

### 🔤 Typography 超能力（IBM Carbon Type Scale）

**Carbon 官方 type scale（只用呢啲尺寸，唔好亂用）：**
```
12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 36 · 42 · 48 · 54 · 60px
```

**Font Weight — 只用 3 個（IBM Carbon 硬規定）：**
```javascript
const fontWeights = {
  regular:  400,  // 正文、描述、placeholder
  medium:   500,  // 按鈕、label、次要標題
  semibold: 600,  // 主要標題、重要數字、CTA
};
// ❌ 永遠唔用 700 Bold、300 Light — 太極端，破壞節奏感
```

**Line Height 規則：**
```javascript
// 大標題 (36px+) → lineHeight = 1.1 (緊湊，有力量感)
// 中標題 (20-32px) → lineHeight = 1.2
// 正文 (14-18px) → lineHeight = 1.5 (易讀)
// 說明文字 (12px) → lineHeight = 1.6
```

**Letter Spacing 規則（超重要）：**
```javascript
// 大標題 (48px+) → letterSpacing = -1px (收緊，高級感)
// 中標題 (24-36px) → letterSpacing = -0.5px
// 正文 → letterSpacing = 0 (唔改)
// 全大寫 label → letterSpacing = 0.8px (放鬆，增加可讀性)
```

**Typography 必殺技 — 唔用 Size，用 Weight + Color 建立層次：**
```
❌ 錯誤：標題 24px Bold，副標 20px Bold，正文 16px Regular (全都好大)
✅ 正確：標題 24px Semibold #FAFAFA，副標 14px Medium #A1A1AA，正文 14px Regular #FAFAFA
         → 只改 Weight 同 Color，Size 可以一樣，效果更精緻
```

---

### 🎨 Color 超能力

**60-30-10 法則（室內設計界嘅金規則）：**
```
60% = Background (--background: #09090B)
30% = Surface/Card (--secondary: #27272A)  
10% = Accent/Primary action (#FAFAFA or brand color)

每個 Screen 唔可以超過 3 個主要顏色。
```

**WCAG AA 對比度標準（可用性底線）：**
```javascript
// 文字必須達到：
// 正文 (14px+)：contrast ratio ≥ 4.5:1
// 大標題 (18px+ 或 14px Bold)：contrast ratio ≥ 3:1
// UI 元素邊框/icon：contrast ratio ≥ 3:1

// shadcn zinc dark 已通過：
// #FAFAFA on #09090B = 19.1:1 ✅ (遠超標準)
// #A1A1AA on #09090B = 5.9:1 ✅ (muted text 仍然 pass)
// ❌ 唔好用 #52525B (#zinc-600) 做文字 on dark — 只有 3.2:1
```

**顏色傳遞語義（唔可以亂用顏色）：**
```javascript
const semanticColors = {
  success:     "#22C55E",  // 成功、完成、正面數值
  warning:     "#F59E0B",  // 警告、待處理、注意
  destructive: "#EF4444",  // 錯誤、刪除、危險操作
  info:        "#3B82F6",  // 提示、連結、中性資訊
  // 規則：唔好用 red 做非 destructive 嘢，唔好用 green 做非 success 嘢
};
```

---

### 📐 Spacing 超能力（8pt Grid System）

**8pt Grid（比 4pt 更嚴格、更專業）：**
```
Major spacing (section gaps, card padding) = 8 的倍數：8, 16, 24, 32, 40, 48, 64px
Minor spacing (icon padding, tight gaps) = 4 的倍數：4, 8, 12px
Touch targets = 最少 44×44px (Apple HIG) / 48×48px (Material)
```

**白空間定律（Refactoring UI 第一法則）：**
```
寧願太多白空間，都唔要太少。
如果設計感覺擠，先加 padding/gap，唔係縮字號。
第一稿 padding 設 32px，唔夠再慢慢縮 — 唔好由 8px 開始加。
```

---

### 🪞 Shadow / Elevation 超能力

**只用 3 個 elevation 層次（唔需要更多）：**
```javascript
const shadows = {
  // sm — Cards, dropdowns, floating elements
  sm: "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.24)",
  
  // md — Modals, popovers, raised panels
  md: "0 4px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.24)",
  
  // lg — Drawers, important overlays, focus rings
  lg: "0 10px 15px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.2)",
};
// 光源永遠在左上角 → shadow 永遠向右下偏移 (x正, y正)
// Dark mode 用更高 opacity 因為深色背景看唔到淺色 shadow
```

**Penpot 加 shadow 代碼：**
```javascript
shape.shadows = [{
  shadowType: "drop-shadow",
  offsetX: 0, offsetY: 4,
  blur: 6, spread: 0,
  color: "#000000", opacity: 0.4
}];
```

---

### 🧠 Laws of UX — 心理學驅動嘅設計法則

**Hick's Law（選擇越多，決策越慢）：**
```
Navigation items: 最多 7 個
Dropdown 選項：最多 7-9 個（超過就要有 search）
Modal 裡面嘅 CTA buttons：最多 2 個（Primary + Secondary）
```

**Fitts's Law（越大越近，越易 click）：**
```
主要 CTA button：最少 48×48px，放在右下或正中（大拇指熱區）
危險操作（Delete）：故意做細啲、放遠啲，防止誤按
Close button (×)：最少 36×36px touch target（就算 icon 細）
```

**Miller's Law（工作記憶最多 7 件事）：**
```
每個 section 最多 7 條資訊
數字超過 4 位要加 comma separator (1,234,567)
Progress steps: 最多 5-7 步
```

**Jakob's Law（用戶習慣你嘅設計像其他網站一樣）：**
```
Logo 在左上 ✅    Login button 在右上 ✅
Search 在頂部 ✅   Breadcrumbs 在頁面頂 ✅
唔好創新 navigation pattern — 跟從用戶已知嘅慣例
```

**Gestalt Laws（視覺感知規律）：**
```
Proximity：相關嘅嘢靠近放，唔相關嘅加大間距
Similarity：同功能用同樣顏色/形狀（所有 primary button 用同一色）
Continuity：用線/對齊引導眼睛流向
Figure/Ground：背景 vs 前景對比度必須清晰，唔好 overlap 相近顏色
```

---

### 🏆 Refactoring UI 7 大必殺法則

> 呢 7 條規則係 Adam Wathan (Tailwind 作者) 同 Steve Schoger 嘅心血，
> 係最系統化嘅「業餘設計師 → 職業設計師」升級路線圖。

**法則 1 — 用 Weight + Color 建立 Hierarchy，唔係靠大字號**
```
同一個 card 裡面：標題係 16px semibold #FAFAFA，描述係 14px regular #A1A1AA
兩個 size 差唔多，但層次感超清晰。
比標題 24px + 描述 14px 的 approach 更精緻。
```

**法則 2 — 灰色文字唔可以放在彩色背景上**
```javascript
// ❌ 錯誤：彩色 background + rgba(0,0,0,0.5) 灰色文字 → 顏色混濁
// ✅ 正確：彩色 background → opacity 白色文字
const mutedOnColor = { fillColor: "#FFFFFF", fillOpacity: 0.7 }; // on colored bg
const mutedOnDark  = { fillColor: "#A1A1AA", fillOpacity: 1 };   // on dark bg
```

**法則 3 — 唔好逐步 scale up icons，要直接換設計**
```
Icon 係為細尺寸設計嘅。放大 icon 在 hero section 好醜。
需要大 visual element → 用 emoji、illustration、背景 shape，唔係放大 icon。
24px = icon 最大尺寸。需要更大視覺 → 加 colored background circle。
```

**法則 4 — 邊框唔係唯一分隔方式（要做減法）**
```javascript
// 分隔優先順序（由輕到重）：
// 1. 白空間（最輕，最好）  → 加大 gap 同 padding
// 2. 背景色差異           → card: #27272A on bg: #09090B
// 3. 淺色 divider 線      → #27272A, 1px  
// 4. 陰影               → 只用喺需要 float 嘅元素
// 5. 粗邊框              → 唔好用，顯得沉重
```

**法則 5 — 唔係每個元素都需要 container/border**
```
常見錯誤：每個 list item 都加 border box
正確做法：
- 同類 items 用 spacing 分隔
- 只有「卡片」概念（可 click、獨立操作）才用 border/shadow
- Dashboard 數字統計 → 唔需要 個個都係 card，可以係簡單 label + number
```

**法則 6 — 第一稿永遠從 Mobile 開始（Mobile First）**
```
390px 先設計好 → 強迫你只保留最重要嘅資訊
Desktop 只係拉闊，唔係加更多嘢
Mobile 唔 work 嘅設計，Desktop 加了 sidebar 也唔 work
```

**法則 7 — Empty States 係設計機會，唔係 bug**
```javascript
// 每個 list/table/feed 都必須設計 empty state：
// 1. Illustration 或 大 icon (64-128px)
// 2. 標題: "No results yet"
// 3. 描述: "Start by creating your first item"
// 4. CTA button: "Create Now"
// 這是 onboarding 最好嘅機會，唔好 skip！
```

---

### 🔬 Component 解剖學（每個 Component 必備 3 個狀態）

```
任何 Interactive element = Default + Hover + Active/Disabled

Button states:
├── Default:  bg #FAFAFA, text #18181B
├── Hover:    bg #E4E4E7, cursor pointer
├── Active:   bg #D4D4D8, scale(0.98) 
└── Disabled: opacity 0.5, cursor not-allowed

Input states:
├── Default:  border #27272A (1px)
├── Focus:    border #FAFAFA (2px), ring: 2px #FAFAFA opacity 0.2
├── Error:    border #EF4444, 下方顯示 error message (text-red, 12px)
└── Disabled: bg #27272A/50, opacity 0.5
```

**Penpot 加 focus ring 代碼：**
```javascript
input.strokes = [{
  strokeColor: "#FAFAFA",
  strokeOpacity: 1,
  strokeWidth: 2,
  strokePosition: "outer"
}];
input.shadows = [{
  shadowType: "drop-shadow",
  offsetX: 0, offsetY: 0,
  blur: 0, spread: 3,
  color: "#FAFAFA", opacity: 0.2
}];
```

---

### 📊 Design System Resources

> ⚡ 可用設計系統（兩個都已下載，直接用）：
> - **shadcn/ui** 完整版（184 個文件）→ `design-systems/shadcn/` | React/TSX 組件 + 圖表 + Dashboard blocks
> - **Tabler** v1.4.0（⭐40,890，最高評價 Dashboard Kit）→ `design-systems/tabler/` | HTML 組件 + SCSS + 預編譯 CSS
> Container 路徑：`/opt/design-systems/`（通過 volume mount 可直接讀取）

| 類別 | 路徑 | 內容 |
|------|------|------|
| **CSS 變數** | `design-systems/shadcn/globals.css` | 381 lines — 完整 CSS variables, light+dark |
| **主題集** | `design-systems/shadcn/themes.css` | 全部顏色主題（zinc/slate/stone/neutral/gray）|
| **主題 JSON** | `design-systems/shadcn/themes/zinc.json` | zinc dark 主題（推薦用呢個）|
| **Tailwind CSS** | `design-systems/shadcn/tailwind.css` | 95 lines Tailwind v4 設定 |
| **Registry 主題** | `design-systems/shadcn/registry-themes.ts` | 1086 lines 所有主題定義 |
| **組件庫** | `design-systems/shadcn/components/` | **56 個完整 React 組件**（tsx 源碼）|
| **圖表庫** | `design-systems/shadcn/charts/` | **70 個圖表組件**（area/bar/line/pie/radar/radial）|
| **Dashboard 模板** | `design-systems/shadcn/blocks/dashboard-01/` | 完整 Dashboard 頁面（sidebar+table+chart）|
| **Directory** | `design-systems/shadcn/directory.json` | 1172 lines 組件目錄索引 |

```bash
# 讀取 CSS 變數（最常用）
cat design-systems/shadcn/globals.css

# 讀取 zinc dark 主題 tokens
cat design-systems/shadcn/themes/zinc.json

# 讀取 Dashboard 模板結構
cat design-systems/shadcn/blocks/dashboard-01/page.tsx

# 讀取特定組件源碼（例如 sidebar）
cat design-systems/shadcn/components/sidebar.tsx
cat design-systems/shadcn/components/data-table.tsx  # 注意：在 blocks 裡
cat design-systems/shadcn/charts/chart-area-interactive.tsx
```

---

### 📊 Tabler Dashboard Kit（⭐40,890 — 最高評價 HTML Dashboard）

> **Tabler v1.4.0** — 純 HTML/CSS Dashboard UI Kit，100+ 個頁面模板，純 Bootstrap 架構
> 最適合：後台管理系統、Data Dashboard、需要真實 HTML 示例嘅項目

| 類別 | 路徑 | 內容 |
|------|------|------|
| **預編譯 CSS** | `design-systems/tabler/tabler.min.css` | 523KB — 完整可用 CSS（直接 link）|
| **設計 tokens** | `design-systems/tabler/scss/_variables.scss` | 1037 lines — 所有色彩/間距/字體變數 |
| **Dark mode tokens** | `design-systems/tabler/scss/_variables-dark.scss` | Dark mode 變數 |
| **UI 組件 SCSS** | `design-systems/tabler/scss/ui/` | 50 個 SCSS 組件（accordion/alert/avatar/badge/button/card/chart/table...）|
| **HTML 組件片段** | `design-systems/tabler/html-components/` | 62 個真實 HTML snippets |
| **HTML Layout** | `design-systems/tabler/html-layout/` | 19 個 Layout partials（navbar/sidebar/header/footer）|
| **Dashboard 卡片** | `design-systems/tabler/html-cards/` | 47 個 Dashboard 卡片模板 |
| **KPI/Stats 卡片** | `design-systems/tabler/html-cards/small-stats.html` | 小型統計卡（最常用）|
| **Chart 卡片** | `design-systems/tabler/html-cards/charts/` | 9 個圖表卡片（revenue/sales/users/heatmap）|

```bash
# 讀取 Tabler 設計 tokens（顏色/間距）
cat design-systems/tabler/scss/_variables.scss | head -100

# 讀取 Dashboard 統計卡 HTML
cat design-systems/tabler/html-cards/small-stats.html
cat design-systems/tabler/html-cards/stat-card.html
cat design-systems/tabler/html-cards/stat-gradient.html

# 讀取 KPI 圖表卡
cat design-systems/tabler/html-cards/charts/revenue.html
cat design-systems/tabler/html-cards/charts/total-sales.html

# 讀取 HTML 組件（按鈕/表格/表單等）
cat design-systems/tabler/html-components/button.html
cat design-systems/tabler/html-components/card.html
cat design-systems/tabler/html-components/table.html

# 讀取 Layout（navbar/sidebar）
ls design-systems/tabler/html-layout/
cat design-systems/tabler/html-layout/navbar.html  # 如存在
```

**⚠️ 唔好用** `pages/` 目錄 — 只係 Liquid template stubs（~42 bytes frontmatter），並非真實 HTML

---

## 📦 shadcn/ui 完整文件清單（已下載，直接用）

### 🌐 Web/App 項目 → shadcn/ui + Tailwind v4
**最適合：** Dashboard、SaaS、Admin Panel、Web App

**Core CSS（`design-systems/shadcn/`）：**
- `globals.css` — 381 lines，完整 CSS variables + dark mode
- `themes.css` — 全 5 個主題（zinc/slate/stone/neutral/gray）
- `tailwind.css` — Tailwind v4 config
- `themes/zinc.json` — zinc dark 推薦主題
- `registry-themes.ts` — 1086 lines，所有主題定義

**Components（`design-systems/shadcn/components/`，56 個）：**
`accordion` · `alert` · `alert-dialog` · `avatar` · `badge` · `breadcrumb` · `button` · `button-group` · `calendar` · `card` · `carousel` · `chart` · `checkbox` · `collapsible` · `combobox` · `command` · `context-menu` · `dialog` · `drawer` · `dropdown-menu` · `form` · `input` · `input-otp` · `label` · `menubar` · `navigation-menu` · `pagination` · `popover` · `progress` · `radio-group` · `resizable` · `scroll-area` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `slider` · `sonner` · `spinner` · `switch` · `table` · `tabs` · `textarea` · `toggle` · `toggle-group` · `tooltip`

**Charts（`design-systems/shadcn/charts/`，70 個）：**
Area · Bar · Line · Pie · Radar · Radial · Tooltip 全系列

**Dashboard Block（`design-systems/shadcn/blocks/dashboard-01/`）：**
完整 Dashboard 模板：`page.tsx` + `app-sidebar` + `data-table` + `chart-area-interactive` + `section-cards` + `nav-main` + `nav-user` + `site-header`
- State Diagram：Loading → Idle → Action → Result

---

### 📚 推薦 Design System 清單 (按項目類型)

| 項目類型 | Design System | GitHub Stars | 下載指令 |
|---------|--------------|-------------|---------|
| Web App / SaaS | **shadcn/ui** | 80k ⭐ | ✅ **已下載** `design-systems/shadcn/` |
| **Dashboard / Admin** | **Tabler** | **40.9k ⭐** | ✅ **已下載** `design-systems/tabler/` |
| Admin Dashboard | **Ant Design** | 93k ⭐ | `git clone https://github.com/ant-design/ant-design --depth=1` |
| 3D / Game | **Three.js + Drei** | 103k ⭐ | `git clone https://github.com/mrdoob/three.js --depth=1` |
| Mobile-first | **Radix UI** | 15k ⭐ | `git clone https://github.com/radix-ui/primitives --depth=1` |
| Material / 企業 | **Material UI** | 94k ⭐ | `git clone https://github.com/mui/material-ui --depth=1` |

**Clone 規範：** 永遠用 `--depth=1`（只攞最新版，唔下載完整 git history，慳空間）

---

## 🎮 3D 項目 Design System (AI Arena 類型)

### 🎨 3D 色調規範
```
背景：         #0A0A0F (極深黑藍)
主發光色：     #00D9FF (霓虹藍 — 科技感)
次發光色：     #FF6B35 (霓虹橙 — 危險/攻擊)
勝利色：       #FFD700 (金色 — 獎勵)
環境光：       #1A0533 (深紫 — 神秘氛圍)
UI 面板背景：  rgba(10, 10, 30, 0.85) (半透明深色)
UI 邊框：      rgba(0, 217, 255, 0.3) (發光邊框)
```

### 💡 3D 光效規範
| 光源 | 類型 | 顏色 | 強度 | 用途 |
|------|------|------|------|------|
| 主場景光 | AmbientLight | #1A0533 | 0.4 | 整體氛圍 |
| 角色主光 | DirectionalLight | #00D9FF | 1.2 | 英雄感 |
| 地板反射 | PointLight | #FF6B35 | 0.6 | 戲劇效果 |
| UI 發光 | PointLight | #FFD700 | 0.3 | 勝利時觸發 |

### 📐 3D 空間規範
- **Camera FOV:** 60° (標準視角，唔失真)
- **Near Clip:** 0.1 / **Far Clip:** 100
- **Camera 起始位置:** (0, 5, 10) 輕微俯角
- **地板 Grid:** 10x10 單位，每格 1 unit
- **角色Scale:** 1 unit ≈ 1 米

### 🖥️ 3D UI 層次 (2D overlay on 3D scene)
```
Layer 0: Three.js 3D Scene (Canvas)
Layer 1: 半透明 HUD (position:absolute, pointer-events:none)
Layer 2: 互動 UI 面板 (Game controls, Score, Timer)
Layer 3: Modal / Alert (最高層，完全遮蓋)
```

### ✨ 3D 動畫規範
| 動畫類型 | Duration | Easing | 用途 |
|---------|---------|--------|------|
| 角色移動 | 0.3s | ease-out | 普通動作 |
| 攻擊特效 | 0.15s | linear | 快速衝擊感 |
| 勝利動畫 | 2.0s | ease-in-out | 慶祝時刻 |
| 鏡頭拉近 | 0.8s | cubic-bezier(.25,.8,.25,1) | 轉場 |
| 粒子效果 | 1.5s | ease-out | 爆炸/魔法 |

---

