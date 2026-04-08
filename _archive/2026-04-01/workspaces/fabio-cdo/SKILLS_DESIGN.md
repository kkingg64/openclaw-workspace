# SKILLS_DESIGN.md — 完整性定義 + 設計思維 (v2.1 — Production-Ready)

> 本文件涵蓋：什麼叫「完整設計」、點樣真正思考設計、Development Handoff 標準

---

## 🚨🚨🚨 API 警告 — 必讀（違反 = 設計無效）🚨🚨🚨

> **本文件所有程式碼範例使用 Penpot Plugin JavaScript API（`penpot.createBoard()`、`card.appendChild()` 等）。**
> **呢啲 API 只喺 Penpot MCP `execute_code` 入面有效。**
>
> **如果你係用 Pencil CLI（`.pen` 文件 + `batch_design()`），呢啲 code 完全唔適用。**
>
> | 工具 | API 風格 | 學習來源 |
> |------|---------|---------|
> | **Pencil CLI** → `.pen` 設計稿 + PNG export | `batch_design({ operations: \`I(parent, {type:"frame",...})\` })` | ✅ `SKILLS_PENCIL.md` |
> | **Penpot MCP** → Prototype + Boss review | `penpot.createBoard(); card.appendChild(text)` | ✅ 本文件 + `SKILLS_PENPOT.md` |
>
> **Phase 2 設計稿交付** → 用 Pencil CLI (**SKILLS_PENCIL.md**)  
> **Prototype / 互動流程** → 用 Penpot MCP（本文件）  
> **唔可以混用兩個 API。**

---

## ✅ 完整性定義 — 產品級 vs 骨架級（最重要章節）

> **CDO 最常見錯誤：** 建立咗結構（boards/cards），但裏面係空嘅深色方塊，Text 飄喺 board 外面，設計唔完整。
> **黃金標準：** 每個 Screen，老闆睇一眼就知道係乜嘢 product，唔需要解釋。

### 🚨 畫完每個 Screen 之前，必須自我驗收以下清單

#### Layer 清潔度（Layer Panel 零錯誤）
```
✅ 所有 Text、Shape 都在 Board 內部，唔係飄喺 canvas root
✅ 每個 element 都有有意義嘅名字（唔係 "Text", "Rectangle"）
✅ 層次最多 4 層：Board → Section → Group → Shape
✅ 無 unnamed/untitled 元素
```

**修正飄散 Text 嘅代碼：**
```javascript
// 搵出所有飄喺 root 嘅孤立元素（設計完後必须執行呢個檢查）
const rootChildren = penpot.root.children || [];
const orphans = rootChildren.filter(s => s.type !== 'board');
if (orphans.length > 0) {
  return { warning: `${orphans.length} orphan elements found`, names: orphans.map(s => s.name) };
}
return { clean: true };
```

#### Card 完整性（每張 Card 必須有的內容）

**Stats/KPI Card（數字統計卡）：**
```
✅ 標題 label（例如 "Total Revenue"）
✅ 主要數字（例如 "$12,450"）
✅ 趨勢指示（例如 "↑ 12.5% vs last month"，用 green/red）
✅ 副標題或時間範圍（例如 "This month"）
```

```javascript
function createKPICard(parent, title, value, trend, trendPositive, x, y) {
  const card = penpot.createBoard();
  card.name = `KPICard/${title}`;
  card.resize(280, 120);
  card.x = x; card.y = y;
  card.fills = [{ fillColor: "#18181B", fillOpacity: 1 }];
  card.borderRadius = 8;
  card.strokes = [{ strokeColor: "#27272A", strokeOpacity: 1, strokeWidth: 1, strokePosition: "inner" }];

  const flex = card.addFlexLayout();
  flex.dir = "column";
  flex.rowGap = 4;
  flex.horizontalPadding = 24;
  flex.verticalPadding = 20;

  const labelTxt = penpot.createText(title);
  labelTxt.name = "Label";
  labelTxt.fontSize = "12";
  labelTxt.fontWeight = "500";
  labelTxt.fills = [{ fillColor: "#A1A1AA", fillOpacity: 1 }];
  card.appendChild(labelTxt);

  const valueTxt = penpot.createText(value);
  valueTxt.name = "Value";
  valueTxt.fontSize = "28";
  valueTxt.fontWeight = "600";
  valueTxt.fills = [{ fillColor: "#FAFAFA", fillOpacity: 1 }];
  card.appendChild(valueTxt);

  const trendTxt = penpot.createText(trend);
  trendTxt.name = "Trend";
  trendTxt.fontSize = "12";
  trendTxt.fills = [{ fillColor: trendPositive ? "#22C55E" : "#EF4444", fillOpacity: 1 }];
  card.appendChild(trendTxt);

  if (parent) parent.appendChild(card);
  return card;
}

// 使用方式:
// createKPICard(contentBoard, "Total Revenue", "$12,450", "↑ 12.5% vs last month", true, 24, 24);
// createKPICard(contentBoard, "Active Users", "3,241", "↓ 2.1% vs last month", false, 320, 24);
```

**Chart Card（圖表卡）：**
```
✅ Card 標題（例如 "Revenue Overview"）
✅ 時間範圍 selector（例如 "Last 7 days ▼"）—— 即使係靜態 label 都要有
✅ 圖表區域（用矩形模擬 bar chart，唔好留白）
✅ X-axis labels（Jan, Feb, Mar...）
✅ Y-axis 數字（可略，但要有 grid lines）
```

```javascript
function createBarChartPlaceholder(parent, title, x, y, w, h) {
  const card = penpot.createBoard();
  card.name = `ChartCard/${title}`;
  card.resize(w, h);
  card.x = x; card.y = y;
  card.fills = [{ fillColor: "#18181B", fillOpacity: 1 }];
  card.borderRadius = 8;
  card.strokes = [{ strokeColor: "#27272A", strokeOpacity: 1, strokeWidth: 1, strokePosition: "inner" }];

  // 標題行
  const titleTxt = penpot.createText(title);
  titleTxt.name = "Title";
  titleTxt.x = 24; titleTxt.y = 20;
  titleTxt.fontSize = "16"; titleTxt.fontWeight = "600";
  titleTxt.fills = [{ fillColor: "#FAFAFA", fillOpacity: 1 }];
  card.appendChild(titleTxt);

  // 時間範圍 label
  const rangeTxt = penpot.createText("Last 30 days ▾");
  rangeTxt.name = "DateRange";
  rangeTxt.x = w - 120; rangeTxt.y = 22;
  rangeTxt.fontSize = "12";
  rangeTxt.fills = [{ fillColor: "#A1A1AA", fillOpacity: 1 }];
  card.appendChild(rangeTxt);

  // Bar chart placeholder — 用不同高度嘅矩形模擬
  const barData = [60, 85, 45, 90, 70, 55, 80];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const chartBottom = h - 40;
  const chartLeft = 24;
  const barWidth = 28;
  const gap = (w - 48 - barData.length * barWidth) / (barData.length - 1);

  barData.forEach((pct, i) => {
    const barH = Math.round((pct / 100) * (h - 90));
    const bar = penpot.createRectangle();
    bar.name = `Bar/${labels[i]}`;
    bar.resize(barWidth, barH);
    bar.x = chartLeft + i * (barWidth + gap);
    bar.y = chartBottom - barH;
    bar.fills = [{ fillColor: "#3B82F6", fillOpacity: i === 3 ? 1 : 0.5 }]; // 最高的 bar 全色
    bar.borderRadius = 4;
    card.appendChild(bar);

    const labelT = penpot.createText(labels[i]);
    labelT.name = `Label/${labels[i]}`;
    labelT.x = chartLeft + i * (barWidth + gap);
    labelT.y = chartBottom + 8;
    labelT.fontSize = "10";
    labelT.fills = [{ fillColor: "#71717A", fillOpacity: 1 }];
    card.appendChild(labelT);
  });

  if (parent) parent.appendChild(card);
  return card;
}
```

**Table Card（表格卡）：**
```
✅ 表頭行（深色背景 + 欄位名）
✅ 至少 4-5 行假數據（唔好一行都冇）
✅ 每行有 Status badge（colored pill）
✅ Table 最後一行有「View all →」連結
```

```javascript
function createTableCard(parent, title, x, y, w, h) {
  const card = penpot.createBoard();
  card.name = `TableCard/${title}`;
  card.resize(w, h);
  card.x = x; card.y = y;
  card.fills = [{ fillColor: "#18181B", fillOpacity: 1 }];
  card.borderRadius = 8;
  card.strokes = [{ strokeColor: "#27272A", strokeOpacity: 1, strokeWidth: 1, strokePosition: "inner" }];

  // Header
  const titleTxt = penpot.createText(title);
  titleTxt.name = "Title";
  titleTxt.x = 24; titleTxt.y = 20;
  titleTxt.fontSize = "16"; titleTxt.fontWeight = "600";
  titleTxt.fills = [{ fillColor: "#FAFAFA", fillOpacity: 1 }];
  card.appendChild(titleTxt);

  // Table header row
  const colNames = ["Name", "Status", "Date", "Amount"];
  const colX = [24, 200, 320, 430];
  colNames.forEach((col, i) => {
    const colTxt = penpot.createText(col.toUpperCase());
    colTxt.name = `Col/${col}`;
    colTxt.x = colX[i]; colTxt.y = 56;
    colTxt.fontSize = "10"; colTxt.fontWeight = "500";
    colTxt.fills = [{ fillColor: "#52525B", fillOpacity: 1 }];
    card.appendChild(colTxt);
  });

  // Divider
  const divider = penpot.createRectangle();
  divider.name = "Divider/Header";
  divider.resize(w - 48, 1);
  divider.x = 24; divider.y = 72;
  divider.fills = [{ fillColor: "#27272A", fillOpacity: 1 }];
  card.appendChild(divider);

  // Data rows
  const rows = [
    ["Acme Corp", "Active", "Mar 28", "$1,200"],
    ["TechStart Ltd", "Pending", "Mar 27", "$850"],
    ["Global Inc", "Active", "Mar 26", "$2,100"],
    ["Nova Systems", "Inactive", "Mar 25", "$450"],
  ];
  const statusColors = { Active: "#22C55E", Pending: "#F59E0B", Inactive: "#71717A" };

  rows.forEach((row, ri) => {
    const rowY = 88 + ri * 40;
    // Row name
    const nameTxt = penpot.createText(row[0]);
    nameTxt.name = `Row${ri}/Name`;
    nameTxt.x = 24; nameTxt.y = rowY;
    nameTxt.fontSize = "13";
    nameTxt.fills = [{ fillColor: "#FAFAFA", fillOpacity: 1 }];
    card.appendChild(nameTxt);

    // Status badge
    const badge = penpot.createBoard();
    badge.name = `Row${ri}/Status`;
    badge.resize(60, 22);
    badge.x = 196; badge.y = rowY - 2;
    badge.fills = [{ fillColor: statusColors[row[1]] || "#71717A", fillOpacity: 0.15 }];
    badge.borderRadius = 11;
    badge.strokes = [{ strokeColor: statusColors[row[1]] || "#71717A", strokeOpacity: 0.4, strokeWidth: 1, strokePosition: "inner" }];
    const badgeTxt = penpot.createText(row[1]);
    badgeTxt.fontSize = "11"; badgeTxt.fontWeight = "500";
    badgeTxt.fills = [{ fillColor: statusColors[row[1]] || "#71717A", fillOpacity: 1 }];
    badge.appendChild(badgeTxt);
    card.appendChild(badge);

    // Date + Amount
    [row[2], row[3]].forEach((val, ci) => {
      const txt = penpot.createText(val);
      txt.name = `Row${ri}/Col${ci+2}`;
      txt.x = colX[ci + 2]; txt.y = rowY;
      txt.fontSize = "13";
      txt.fills = [{ fillColor: ci === 1 ? "#FAFAFA" : "#A1A1AA", fillOpacity: 1 }];
      card.appendChild(txt);
    });
  });

  // View all link
  const viewAll = penpot.createText("View all →");
  viewAll.name = "ViewAll";
  viewAll.x = 24; viewAll.y = h - 32;
  viewAll.fontSize = "13";
  viewAll.fills = [{ fillColor: "#3B82F6", fillOpacity: 1 }];
  card.appendChild(viewAll);

  if (parent) parent.appendChild(card);
  return card;
}
```

#### Navbar 完整性
```
✅ Logo 或 Brand name（左側）
✅ 主要 Nav links（中間 或 左側），有 active state highlight
✅ 右側：User Avatar + Name（或 initials circle）
✅ 可選：Search bar、Notification bell
```

```javascript
function createNavbar(parent, activeItem) {
  const navbar = penpot.createBoard();
  navbar.name = "Navbar";
  navbar.resize(1440, 64);
  navbar.x = 0; navbar.y = 0;
  navbar.fills = [{ fillColor: "#09090B", fillOpacity: 1 }];
  navbar.strokes = [{ strokeColor: "#27272A", strokeOpacity: 1, strokeWidth: 1, strokePosition: "inner" }];

  // Logo
  const logo = penpot.createText("MADHORSE");
  logo.name = "Logo";
  logo.x = 24; logo.y = 20;
  logo.fontSize = "18"; logo.fontWeight = "600";
  logo.fills = [{ fillColor: "#FAFAFA", fillOpacity: 1 }];
  navbar.appendChild(logo);

  // Nav items
  const navItems = ["Dashboard", "Analytics", "Reports", "Settings"];
  navItems.forEach((item, i) => {
    const isActive = item === activeItem;
    const itemTxt = penpot.createText(item);
    itemTxt.name = `NavItem/${item}`;
    itemTxt.x = 160 + i * 96; itemTxt.y = 22;
    itemTxt.fontSize = "14"; itemTxt.fontWeight = isActive ? "500" : "400";
    itemTxt.fills = [{ fillColor: isActive ? "#FAFAFA" : "#71717A", fillOpacity: 1 }];
    navbar.appendChild(itemTxt);

    if (isActive) {
      // Active underline indicator
      const indicator = penpot.createRectangle();
      indicator.name = `NavIndicator/${item}`;
      indicator.resize(item.length * 7.5, 2);
      indicator.x = 160 + i * 96; indicator.y = 62;
      indicator.fills = [{ fillColor: "#FAFAFA", fillOpacity: 1 }];
      navbar.appendChild(indicator);
    }
  });

  // User avatar (right side)
  const avatar = penpot.createEllipse();
  avatar.name = "UserAvatar";
  avatar.resize(32, 32);
  avatar.x = 1384; avatar.y = 16;
  avatar.fills = [{ fillColor: "#3B82F6", fillOpacity: 1 }];
  navbar.appendChild(avatar);

  const initials = penpot.createText("KG");
  initials.name = "UserInitials";
  initials.x = 1390; initials.y = 23;
  initials.fontSize = "12"; initials.fontWeight = "600";
  initials.fills = [{ fillColor: "#FFFFFF", fillOpacity: 1 }];
  navbar.appendChild(initials);

  if (parent) parent.appendChild(navbar);
  return navbar;
}
```

#### Sidebar 完整性
```
✅ 每個 Nav item 有 icon placeholder + label
✅ Active item 有 highlight background
✅ 分 section（主功能 / 設定 / 底部 user info）
✅ 底部：User info（avatar + name + role）
```

#### 整體 Screen 完整性驗收
```
✅ 冇任何空白深色方塊（每個方塊都有內容）
✅ 冇 placeholder 文字「Text」、「Label」、「Title」（代換成真實假數據）
✅ 真實假數據（唔係 Lorem ipsum，而係合理嘅業務數字）
✅ 所有 Card 有標題
✅ Navbar + Sidebar 有內容
✅ 有至少一個「primary action」按鈕（CTA）
✅ Layer panel 裡冇 orphan elements（執行 orphan 檢查代碼）
```

### 🔢 假數據規範（唔係 Lorem ipsum，要有業務感）

用有業務感嘅假數據：`$48,295` / `↑12.3%` / `12,841 users` / `ByteWave Inc.` / `Mar 31, 2026`，唔好用 `Sample Text` 或 `Lorem ipsum`。時間用 `Mar 25–31`，名字用真實感公司名：`NexaCloud` / `ByteWave` / `PulseAI`。

### 🎯 完整性評分（自我評核）

| 項目 | 分數 |
|------|------|
| Navbar 有 logo + nav items + user avatar | 10分 |
| 無 orphan Text 在 board 外面 | 20分 |
| 每個 Card 有標題 + 真實假數據 | 20分 |
| KPI Cards 有數字 + 趨勢箭頭 | 15分 |
| Chart Card 有 bar/line placeholder | 15分 |
| Table 有表頭 + 4-5 行數據 + status badge | 15分 |
| Layer panel element 有有意義嘅名字 | 5分 |

**80分以上 = 可以提交 CTO review**
**60-79分 = 需要補充內容先提交**
**60分以下 = 重畫，唔可以提交**

---

## 🧠 設計思維 — 點樣真正「設計」而唔係「亂放嘢」

> ❌ **錯誤做法：** 建立 shape → 隨便設 x/y → 畫下一個 → 結果一團糟
> ✅ **正確做法：** 先規劃 Layout 結構，再由外到內逐層建立，**用 Flex Layout 自動排版**

### 📐 第一步：先規劃 Layout Zone（唔好一開始就畫 shape）

每個 Screen 在畫第一個 shape 之前，必須心中有數：

```
Desktop 1440×900 標準分區：
┌─────────────────────────────────────────┐
│  Navbar  (全寬 × 64px, y=0)             │
├────────┬────────────────────────────────┤
│Sidebar │  Main Content Area             │
│(240px) │  (1200px × 836px, x=240, y=64) │
│        │                                │
│        │                                │
└────────┴────────────────────────────────┘

Mobile 390×844 標準分區：
┌─────────────────┐
│ Header (390×56) │
├─────────────────┤
│ Content         │
│ (390×732)       │
│                 │
├─────────────────┤
│ Bottom Nav      │
│ (390×56)        │
└─────────────────┘
```

### 📏 shadcn 間距系統（4px Base Grid — 必須遵守）

shadcn/ui 用 **4px 為最小單位**。所有 x/y/width/height/gap/padding 必須係 4 的倍數：

| Token | 值 | 用途 |
|-------|-----|------|
| `space-1` | 4px | 最小間距（icon padding）|
| `space-2` | 8px | 細間距（badge padding）|
| `space-3` | 12px | 小間距 |
| `space-4` | 16px | 標準間距（按鈕 padding）|
| `space-6` | 24px | 中間距（card padding）|
| `space-8` | 32px | 大間距（section gap）|
| `space-12` | 48px | 特大（hero section）|
| `space-16` | 64px | Navbar 高度 |

**規則：** `rect.x = 240`✅ `rect.x = 237`❌ — 永遠係 4 的倍數

### 🎨 shadcn/zinc 色板（Dark Mode — Penpot 用呢啲）

> **⚠️ 唔准自創顏色！以下 colors object 必須完整複製到每個設計 script 開頭。任何新增或修改 hex 值都係違規。**

```javascript
// 讀取本地 tokens 文件
// /opt/design-systems/shadcn/tokens.css 有完整 CSS variables
// /opt/design-systems/shadcn/zinc-dark-theme.css 有完整 zinc 色階

// 🔴 MANDATORY colors — 複製呢段，唔准改值！
const colors = {
  background:     "#09090B",  // --background
  foreground:     "#FAFAFA",  // --foreground
  card:           "#09090B",  // --card
  cardForeground: "#FAFAFA",  // --card-foreground
  primary:        "#FAFAFA",  // --primary (white on dark)
  primaryFg:      "#18181B",  // --primary-foreground
  secondary:      "#27272A",  // --secondary
  secondaryFg:    "#FAFAFA",  // --secondary-foreground
  muted:          "#27272A",  // --muted
  mutedFg:        "#A1A1AA",  // --muted-foreground
  accent:         "#27272A",  // --accent
  border:         "#27272A",  // --border
  destructive:    "#EF4444",  // --destructive
  ring:           "#D4D4D8",  // --ring
};
```

### 🏗️ 第二步：建立結構的正確順序

**永遠由外到內，由大到小：**

```javascript
// ✅ 正確順序
// 1. 建立 Board（整個 Screen）
const screen = penpot.createBoard();
screen.name = "01_Dashboard";
screen.resize(1440, 900);
screen.fills = [{ fillColor: "#09090B", fillOpacity: 1 }]; // 背景色

// 2. 建立 Navbar Board（裝 navbar 內容）
const navbar = penpot.createBoard();
navbar.name = "Navbar";
navbar.resize(1440, 64);
navbar.x = 0; navbar.y = 0;
navbar.fills = [{ fillColor: "#09090B", fillOpacity: 1 }];
navbar.strokes = [{ strokeColor: "#27272A", strokeOpacity: 1, strokeWidth: 1, strokePosition: "inner" }];
screen.appendChild(navbar);

// 3. 喺 Navbar 加 Flex Layout（自動排版 logo + nav items）
const navFlex = navbar.addFlexLayout();
navFlex.dir = "row";
navFlex.alignItems = "center";
navFlex.justifyContent = "spaceBetween";
navFlex.horizontalPadding = 24;

// 4. 加 Sidebar Board
const sidebar = penpot.createBoard();
sidebar.name = "Sidebar";
sidebar.resize(240, 836);
sidebar.x = 0; sidebar.y = 64;
sidebar.fills = [{ fillColor: "#09090B", fillOpacity: 1 }];
sidebar.strokes = [{ strokeColor: "#27272A", strokeOpacity: 1, strokeWidth: 1, strokePosition: "inner" }];
screen.appendChild(sidebar);

// 5. 加 Sidebar flex (垂直排列 nav items)
const sidebarFlex = sidebar.addFlexLayout();
sidebarFlex.dir = "column";
sidebarFlex.rowGap = 4;
sidebarFlex.verticalPadding = 16;
sidebarFlex.horizontalPadding = 12;

// 6. 加 Content Board
const content = penpot.createBoard();
content.name = "Content";
content.resize(1200, 836);
content.x = 240; content.y = 64;
content.fills = [{ fillColor: "#09090B", fillOpacity: 1 }];
screen.appendChild(content);
```

### 🧩 shadcn 常用 Components 畫法

#### Button — Primary
```javascript
function createButton(parent, label, x, y) {
  const btn = penpot.createBoard();
  btn.name = `Button/${label}`;
  btn.resize(120, 40);
  btn.x = x; btn.y = y;
  btn.fills = [{ fillColor: "#FAFAFA", fillOpacity: 1 }];
  btn.borderRadius = 6;
  
  const flex = btn.addFlexLayout();
  flex.dir = "row";
  flex.alignItems = "center";
  flex.justifyContent = "center";
  flex.horizontalPadding = 16;
  flex.verticalPadding = 8;
  
  const txt = penpot.createText(label);
  txt.fontSize = 14;
  txt.fontWeight = "500";
  txt.fills = [{ fillColor: "#18181B", fillOpacity: 1 }];
  btn.appendChild(txt);
  if (parent) parent.appendChild(btn);
  return btn;
}
```

#### Card
```javascript
function createCard(parent, title, description, x, y, w = 320, h = 160) {
  const card = penpot.createBoard();
  card.name = `Card/${title}`;
  card.resize(w, h);
  card.x = x; card.y = y;
  card.fills = [{ fillColor: "#09090B", fillOpacity: 1 }];
  card.borderRadius = 8;
  card.strokes = [{ strokeColor: "#27272A", strokeOpacity: 1, strokeWidth: 1, strokePosition: "inner" }];
  
  const flex = card.addFlexLayout();
  flex.dir = "column";
  flex.rowGap = 8;
  flex.horizontalPadding = 24;
  flex.verticalPadding = 24;

  const titleTxt = penpot.createText(title);
  titleTxt.fontSize = 16;
  titleTxt.fontWeight = "600";
  titleTxt.fills = [{ fillColor: "#FAFAFA", fillOpacity: 1 }];
  card.appendChild(titleTxt);

  const descTxt = penpot.createText(description);
  descTxt.fontSize = 14;
  descTxt.fills = [{ fillColor: "#A1A1AA", fillOpacity: 1 }];
  card.appendChild(descTxt);

  if (parent) parent.appendChild(card);
  return card;
}
```

#### Nav Item (Sidebar)
```javascript
function createNavItem(parent, icon, label, active = false) {
  const item = penpot.createBoard();
  item.name = `NavItem/${label}`;
  item.resize(216, 40);
  item.fills = active
    ? [{ fillColor: "#27272A", fillOpacity: 1 }]
    : [{ fillOpacity: 0 }];
  item.borderRadius = 6;

  const flex = item.addFlexLayout();
  flex.dir = "row";
  flex.alignItems = "center";
  flex.columnGap = 8;
  flex.horizontalPadding = 12;
  flex.verticalPadding = 8;

  const iconRect = penpot.createRectangle();
  iconRect.name = "Icon";
  iconRect.resize(16, 16);
  iconRect.fills = [{ fillColor: active ? "#FAFAFA" : "#A1A1AA", fillOpacity: 1 }];
  iconRect.borderRadius = 2;
  item.appendChild(iconRect);

  const txt = penpot.createText(label);
  txt.fontSize = 14;
  txt.fills = [{ fillColor: active ? "#FAFAFA" : "#A1A1AA", fillOpacity: 1 }];
  item.appendChild(txt);

  if (parent) parent.appendChild(item);
  return item;
}
```

### ⚠️ 排版禁忌（永遠不要做）

| ❌ 錯誤 | ✅ 正確 |
|--------|--------|
| 直接設 `shape.x = 237` | 用 4px 倍數：`shape.x = 240` |
| 把所有 shapes 放在 canvas root | 所有嘢放入 Board，Board 才係 Screen |
| 亂堆 shapes，再手動設 x/y | 先建 Board，用 `addFlexLayout()` 自動排版 |
| 用 `resize()` 後唔 reset growType | 文字 resize 後必須設 `txt.growType = "auto-height"` |
| Card 裏面又 Card，無限巢狀 | 最多 Board → Group → Shape，3層 |
| 不同 screen 嘅 shapes 重疊在 canvas | 每個 screen board 之間空 80px：`board.x = prevBoard.x + prevBoard.width + 80` |

### 🔴 設計前清理 SOP（強制 — 每次設計任務開始前必須執行）

> **問題：** CDO 每次 rework 都會建立新 boards，但舊 boards 唔會自動消失，導致 canvas 上有大量過期設計堆疊。

**【首選方案】每次設計必須建立新 Page（最簡單最安全）：**

```javascript
// 第一步：必須建立新 Page，唔好喺舊 page 疊內容
const ts = new Date().toISOString().slice(0, 10);  // e.g. "2026-03-31"
const page = penpot.createPage();
page.name = `Design - ${ts}`;
penpot.openPage(page);
return { newPage: page.name, ready: true };
// 確認返回 ready: true 先至開始後續設計
```

**【備選方案】如果必須喺現有 page 修改，先删除所有舊 boards：**

```javascript
// 删除現有 page 上所有 boards
const allBoards = penpotUtils.findShapes(s => s.type === 'frame' || s.type === 'board');
console.log(`Removing ${allBoards.length} old boards...`);
for (const b of allBoards) {
  try { b.remove(); } catch(e) { console.error('remove failed:', b.name, e); }
}
// 確認清空
const remaining = penpotUtils.findShapes(s => s.type === 'frame' || s.type === 'board');
return { removed: allBoards.length, remaining: remaining.length };
// remaining 必須 === 0 先至開始設計
```

**黃金規則：永遠唔好喺有舊設計嘅 canvas 上面直接疊新設計。**

