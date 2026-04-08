# SKILLS_PENCIL.md — Pencil CLI 設計工具（@pencil.dev/cli）

> **Pencil.dev = headless 設計生成 CLI，CDO 的主要設計工具。**
> 唔需要 Anthropic API key，唔需要 browser，唔會有 null、async crash。
> 比 Penpot Plugin API 更可靠：直接建立 .pen 設計檔案。

---

## 🔑 認證

```
PENCIL_CLI_KEY=pencil_cli_c3a2cbf3d027509210af6d87d0cdeb6d42add016
Account: kingg64@hotmail.com / King / Personal org
```

**已自動注入容器**（來自 `/opt/ai-fabio-corp/.env`）。

---

## 🚨 容器內必用完整 node 路徑（唔好用 `pencil` 指令）

```bash
PENCIL_BIN="node /usr/lib/node_modules/@pencil.dev/cli/dist/index.cjs"
```

> **原因：** `/usr/bin/pencil` 係 symlink。Docker bind-mount symlink 後，Node.js module resolution 路徑錯誤，導致 `Cannot find module '@anthropic-ai/claude-agent-sdk'`。
> 用完整路徑直接呼叫 index.cjs，module lookup 從正確目錄開始。

---

## 🚀 唯一使用模式：`pencil interactive`

> 唔用 `pencil --prompt`（需要 Claude Code login，CDO 冇 Anthropic account）。只用 `interactive` 模式。

```bash
# 建立新檔案
$PENCIL_BIN interactive -o /tmp/output.pen

# 讀入已有檔案並修改（--in 和 --out 必須同時指定）
$PENCIL_BIN interactive --in /tmp/existing.pen --out /tmp/output.pen
```

**工作流程：** stdin 逐行輸入 tool call → shell 執行 → 輸出結果。

---

## ⚠️ 關鍵規則（違反必定失敗）

### 規則 1：所有命令必須加 sleep 間距

> **問題：** 用 `cat file | pencil interactive` 時，全部命令一次過輸入，`exit()` 先於操作完成就執行，令檔案清空（0 bytes）。
> **解決：** 每個命令前後加 `sleep` 確保有足夠時間完成。

```bash
export PENCIL_CLI_KEY=pencil_cli_c3a2cbf3d027509210af6d87d0cdeb6d42add016
PENCIL_BIN="node /usr/lib/node_modules/@pencil.dev/cli/dist/index.cjs"
{
  sleep 3          # 等 interactive shell 啟動
  echo 'batch_design({ operations: `...` })'
  sleep 6          # 等 batch_design 完成（有雲端 API call）
  echo 'save()'
  sleep 2          # 等 save 寫入磁碟
  echo 'exit()'
} | $PENCIL_BIN interactive -o /tmp/output.pen 2>&1 | grep -v "^\[INFO\]"
```

**Sleep 建議時間：**
- `sleep 3` — shell 啟動後
- `sleep 6` — batch_design 後（操作愈多愈長）
- `sleep 5` — export_nodes 後（render 需時）
- `sleep 2` — save() 後

### 規則 2：變數只在同一個 batch_design call 內有效

```bash
# ✅ 同一 batch_design call — 變數可互相引用
batch_design({ operations: `
  card=I(document,{type:"frame",...})
  title=I(card,{type:"text",...})   # card 可用
  badge=I(card,{type:"frame",...})  # card 可用
` })

# ❌ 跨 batch_design call — 變數已失效
batch_design({ operations: `card=I(document,{...})` })  # card 建立
batch_design({ operations: `title=I(card,{...})` })     # ERROR: card 不存在
```

**跨 call 引用節點：** 從第一個 call 的輸出取得 node ID（如 `sgi1j`），用 string literal：
```javascript
title=I("sgi1j", {type:"text", content:"Hello"})  // ✅ string literal node ID
```

### 規則 3：export_nodes 只接受 string literal node ID（唔接受 binding name）

```bash
# ❌ 錯誤
export_nodes({ nodeIds: ["card"], ... })     # card 係 binding，唔係 ID

# ✅ 正確 — 用 batch_design 輸出裡的真實 ID
# 輸出: Inserted node `sgi1j`: {...}
export_nodes({ nodeIds: ["sgi1j"], outputDir: "/tmp/exports", format: "png", scale: 2 })
```

### 規則 4：必須 save() 先，exit() 後

```
save()   ← 寫入磁碟（缺少 → 檔案 0 bytes！）
exit()   ← 結束 session
```

### 規則 5：--out 開啟已有檔案時，session 開始即 truncate

```bash
# ⚠️ --out 同時截斷目標檔，session 內冇 save() 就會清空
$PENCIL_BIN interactive --in input.pen --out output.pen
# 必須在 exit() 前呼叫 save()
```

---

## 📐 batch_design — Node Schema

### Operators

| 操作 | 語法 | 用途 |
|------|------|------|
| Insert | `name=I(parent, {type:"...", ...})` | 建立新節點 |
| Update | `U("nodeId", {...})` | 修改已有節點 |
| Copy | `name=C("sourceId", parent, {...})` | 複製節點 |
| Replace | `name=R("nodeId", {...})` | 替換節點 |
| Move | `M("nodeId", "newParentId")` | 移動節點 |
| Delete | `D("nodeId")` | 刪除節點 |
| Image | `G(nodeId, "ai"\|"stock", "prompt")` | 生成圖片填充 |

> **重要：** 每個 I/C/R 操作都**必須有 binding name**（即使不再使用）。

**多個操作用分號分隔，放在同一個 batch_design call：**
```javascript
batch_design({ operations: `a=I(document,...);b=I(a,...);c=I(a,...)` })
```

---

### Frame（容器/卡片/行/列）

```javascript
I(parent, {
  type: "frame",
  name: "CardName",        // 可選
  x: 0, y: 0,             // 只在 document 直接子元素需要設定
  width: 300,
  height: 180,
  fill: "#16213E",         // 可選，hex 顏色
  cornerRadius: 12,        // 可選
  layout: "vertical",      // 或 "horizontal"（啟用 flexbox）
  padding: 20,             // 單值 = 四邊
  padding: [8, 16],        // [上下, 左右]
  padding: [8, 16, 8, 16], // [上, 右, 下, 左] TRBL
  gap: 8,                  // child 間距（需要 layout）
  width: "fill_container", // 動態：填滿父容器
  width: "fit_content",    // 動態：適合內容（只限 layout frame）
  height: "fill_container",
})
```

### Text（文字）

```javascript
I(parent, {
  type: "text",
  content: "Hello World",     // ✅ 正確：content（唔係 text！）
  fontSize: 14,               // number
  fontWeight: "700",          // "normal" 或 "700" 或 "bold"
  fontFamily: "Inter",        // 默認 Inter
  fill: "#FFFFFF",            // ⚠️ 必填！唔設 = 透明 = 隱形！
  textGrowth: "auto",         // 默認：自動適應文字
  textGrowth: "fixed-width",  // 固定寬，高自動
  textGrowth: "fixed-width-height",  // 固寬固高
  // ⚠️ 必須先設 textGrowth 才可以設 width/height！
  width: 200,                 // 只在 textGrowth: "fixed-width" 時有效
})
```

> **🔴 最常見錯誤：** `text` property → `Invalid properties: /text unexpected property`
> **正確是 `content`！**

> **🔴 隱形文字陷阱：** text 元素沒有默認顏色。必須設 `fill`，否則文字白底白字不可見。

### Rectangle（矩形）

```javascript
I(parent, {
  type: "rectangle",
  width: 200, height: 60,
  fill: "#2DD4BF",
  cornerRadius: 8,
})
```

### Ref（組件實例）

```javascript
I(parent, {
  type: "ref",
  ref: "componentId",        // 組件的 ID
  width: "fill_container",
})
// 修改實例內的子節點：
U(refInstance+"/childNodeId", {content: "New Text"})
```

---

## 🆕 新建項目 / 設計檔案

> **Pencil 入面，`.pen` 檔案 = project。** 唔需要 `init`、唔需要 `create`。

```bash
# ⚠️ 強制規則：設計必須輸出到 projects 共享目錄，唔可以放喺 CDO 私人空間
# 格式：PROJECT_ID 從 Phase 1 Research Doc 或 Boss 指示中取得（如 P2026-001）
PROJECT_ID="{PROJECT_ID}"   # 例：P2026-001, P2026-003, P2026-007
BASE_DIR="/root/.openclaw/workspace/projects"
DESIGNS_DIR="$BASE_DIR/${PROJECT_ID}_ProjectDocuments/designs"
mkdir -p $DESIGNS_DIR/exports

# 格式：[ProjectID]_[ScreenName]_[Date].pen
# 例（Project ID = P2026-001）：
$PENCIL_BIN interactive -o $DESIGNS_DIR/P2026-001_Dashboard_2026-03-31.pen
$PENCIL_BIN interactive -o $DESIGNS_DIR/P2026-001_RevenueCard_2026-03-31.pen
$PENCIL_BIN interactive -o $DESIGNS_DIR/P2026-001_LoginScreen_2026-03-31.pen
```

**CDO 設計檔案存放結構（強制）：**
```
/root/.openclaw/workspace/projects/
├── {PROJECT_ID}_ProjectDocuments/
│   └── designs/                           ← CDO 設計目錄（喺 ProjectDocuments 入面）
│       ├── {PROJECT_ID}_Screen01.pen      ← .pen 設計原始檔
│       ├── {PROJECT_ID}_Screen02.pen
│       └── exports/
│           ├── {PROJECT_ID}_Screen01_Desktop.png  ← PNG 交付物
│           ├── {PROJECT_ID}_Screen01_Mobile.png
│           └── {PROJECT_ID}_Screen02_Desktop.png
└── {另一個_PROJECT_ID}/
    └── ...
```
⚠️ **唔可以將唔同 Project 嘅檔案放喺同一layer — 混放係 error。**

---

## 🎨 Style Guide — 設計風格模板（強制使用）

> ⛔ **`get_style_guide_tags()` 同 `get_style_guide()` 已確認 BROKEN（2026 實測）**
>
> 呢兩個 API 全部返回 `Error: Request failed: fetch failed`（網絡錯誤），**完全唔可用**。
> **唔好再嘗試呼叫，唔好 retry，直接使用下方 shadcn Zinc Dark 預設 hex 常數。**

---

### ✅ 強制使用：shadcn Zinc Dark Hex 常數（已預先從 HSL 轉換）

> `/opt/design-systems/shadcn/themes/zinc.json` 用 HSL 格式，**唔係 hex**，直接讀取無用。
> 下方係已轉換好嘅 hex 值，直接 copy 入 `batch_design` / `execute_code`。

```javascript
// ═══════════════════════════════════════════════════
// shadcn Zinc Dark — 強制 Hex 常數（唔好自創顏色）
// 來源: zinc.json dark mode → pre-converted from HSL
// ═══════════════════════════════════════════════════
const C = {
  background:  "#09090B",   // hsl(240 10% 3.9%)   — 頁面底色
  foreground:  "#FAFAFA",   // hsl(0 0% 98%)        — 主要文字
  card:        "#09090B",   // hsl(240 10% 3.9%)   — 卡片背景
  cardFg:      "#FAFAFA",   // hsl(0 0% 98%)        — 卡片文字
  primary:     "#FAFAFA",   // hsl(0 0% 98%)        — 主要按鈕背景
  primaryFg:   "#18181B",   // hsl(240 5.9% 10%)   — 主要按鈕文字
  secondary:   "#27272A",   // hsl(240 3.7% 15.9%) — 次要區塊背景
  secondaryFg: "#FAFAFA",   // hsl(0 0% 98%)        — 次要文字
  muted:       "#27272A",   // hsl(240 3.7% 15.9%) — Muted 背景
  mutedFg:     "#A1A1AA",   // hsl(240 5% 64.9%)   — Placeholder/hint 文字
  accent:      "#27272A",   // hsl(240 3.7% 15.9%) — Hover/active 背景
  accentFg:    "#FAFAFA",   // hsl(0 0% 98%)        — Hover/active 文字
  destructive: "#7F1D1D",   // hsl(0 62.8% 30.6%)  — 危險/刪除色
  border:      "#27272A",   // hsl(240 3.7% 15.9%) — 邊框
  input:       "#27272A",   // hsl(240 3.7% 15.9%) — Input 邊框
  ring:        "#D4D4D8",   // hsl(240 4.9% 83.9%) — Focus ring
};
// 使用規則：所有 fill/stroke 值必須取自以上 C.xxx，唔可自創
```

**Typography（shadcn 預設）：**
- `fontFamily`: `"Inter"`（或 `"system-ui"`）
- 標題 H1: `fontSize: 36, fontWeight: 700`
- 標題 H2: `fontSize: 24, fontWeight: 600`
- Body: `fontSize: 14, fontWeight: 400`
- Caption/Label: `fontSize: 12, fontWeight: 500`
- Muted text: `fillColor: C.mutedFg`

---

## 📐 Design Guidelines — 佈局參考

> `get_guidelines` 提供該類型設計的佈局法則和模式，**設計前必讀**。

```bash
# 可用 topics:
# web-app | mobile-app | landing-page | slides | design-system | table | code | tailwind
{
  sleep 3
  echo 'get_guidelines({ topic: "web-app" })'
  sleep 6
  echo 'save()'
  sleep 1
  echo 'exit()'
} | $PENCIL_BIN interactive -o /tmp/guidelines.pen 2>&1 | grep -v "^\[INFO\]"
```

**何時用哪個 topic：**

| 設計類型 | topic |
|---------|-------|
| Dashboard / SaaS | `web-app` |
| 用 Design System 組件 | `design-system` |
| Mobile app screens | `mobile-app` |
| Landing / marketing page | `landing-page` |
| 有 table/data grid | `table` |
| Presentation slides | `slides` |

---

## 🛠️ 其他工具

### get_editor_state — 查看文件狀態

```bash
get_editor_state({ "include_schema": true })   # 含完整 schema（第一次必讀）
get_editor_state({ "include_schema": false })  # 快速查看節點
```

### batch_get — 搜尋節點

```bash
batch_get()                                              # 列出頂層節點
batch_get({ patterns: [{ reusable: true }] })           # 列出所有組件
batch_get({ nodeIds: ["abc123", "def456"] })            # 讀指定節點
batch_get({ parentId: "frameId", searchDepth: 2 })     # 在特定 frame 內搜尋
```

### export_nodes — 匯出 PNG/JPEG

```bash
export_nodes({
  nodeIds: ["nodeId1"],          # 從 batch_design 輸出取得真實 ID
  outputDir: "/tmp/exports",
  format: "png",                 # png | jpeg | webp | pdf
  scale: 2                       # 2 = 2x 解析度（建議）
})
# 返回：/tmp/exports/nodeId1.png
```

### save() / exit()

```bash
save()   # 寫入 .pen 檔到磁碟
exit()   # 結束 interactive session
```

---

## 📋 完整 Revenue Card 例子（已驗證 ✅）

```bash
export PENCIL_CLI_KEY=pencil_cli_c3a2cbf3d027509210af6d87d0cdeb6d42add016
PENCIL_BIN="node /usr/lib/node_modules/@pencil.dev/cli/dist/index.cjs"
mkdir -p /tmp/exports

# Step 1: 建立設計，記錄返回的 node ID
{
  sleep 3
  echo 'batch_design({ operations: `card=I(document,{type:"frame",name:"RevenueCard",x:0,y:0,width:300,height:180,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:20,gap:8});label=I(card,{type:"text",content:"Total Revenue",fontSize:12,fill:"#A8A8B3"});value=I(card,{type:"text",content:"$124,580",fontSize:32,fontWeight:"700",fill:"#FFFFFF"});badge=I(card,{type:"frame",layout:"horizontal",width:"fit_content",height:"fit_content",padding:[3,6],fill:"#1A472A",cornerRadius:4});badgeText=I(badge,{type:"text",content:"↑ 12.5%",fontSize:11,fill:"#4ADE80"})` })'
  sleep 6
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive -o /tmp/card.pen 2>&1 | grep -v "^\[INFO\]"
# 輸出例：Inserted node `sgi1j`: {...} ← 記住這個 ID

# Step 2: 用真實 node ID export PNG
{
  sleep 3
  echo 'export_nodes({ nodeIds: ["sgi1j"], outputDir: "/tmp/exports", format: "png", scale: 2 })'
  sleep 5
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in /tmp/card.pen --out /tmp/card.pen 2>&1 | grep -v "^\[INFO\]"

ls -la /tmp/exports/  # → sgi1j.png (17KB)
```

---

## 🔴 常見錯誤速查

| 錯誤訊息 | 原因 | 修正 |
|---------|------|------|
| `Invalid properties: /text unexpected property` | text node 用了 `text` property | 改用 `content` |
| `Invalid properties: /paddingLeft unexpected property` | 分開設 paddingLeft/Right/Top/Bottom | 改用 `padding: [T, R, B, L]` |
| `Unexpected character '#' (1:8)` | 用了 `#nodeId` 語法 | 用 string literal `"nodeId"` |
| `Failed to find a node with id xxx` | 跨 session node ID 無效 / 檔未正確載入 | 用 `--in file.pen --out file.pen` |
| `Cannot find module '@anthropic-ai/...'` | 用了 `pencil` symlink | 用完整路徑 `node /usr/lib/node_modules/...` |
| 檔案 0 bytes | 冇 save() 就 exit() | 永遠 `save()` 後再 `exit()` |
| 文字隱形 | text 冇設 `fill` | 加 `fill: "#FFFFFF"` 或其他顏色 |
| width/height 被忽略 | text 未設 `textGrowth` | 先設 `textGrowth: "fixed-width"` |

---

## � 截圖規則（強制 — 設計後必須執行）

> **設計完成後，必須 export PNG 截圖才算完成。唔做截圖 = 未完成。**

### `export_nodes` vs `get_screenshot` — 分清楚

| 工具 | 輸出 | 用途 |
|------|------|------|
| `export_nodes` | 真實 PNG 存於磁碟 | **交付物、UAT 基準** — 必做 ✅ |
| `get_screenshot` | base64 JSON inline | 只供 LLM 內部視覺確認，唔係交付物 |

**CDO 必須用 `export_nodes`，唔係 `get_screenshot`。**

### 截圖流程（兩個 session）

```bash
# Session 1: 建立設計，記下 top-level frame 的 node ID
{
  sleep 3
  echo 'batch_design({ operations: `screen=I(document,{type:"frame",name:"Dashboard",...});...` })'
  sleep 8
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive -o $DESIGNS_DIR/{PROJECT_ID}_Dashboard.pen 2>&1 | grep -v "^\[INFO\]"
# 從輸出找：Inserted node `ABC123`: {"name":"Dashboard",...}  ← 記下 ABC123

# Session 2: 開啟檔案，export PNG，save
{
  sleep 3
  echo 'export_nodes({ nodeIds: ["ABC123"], outputDir: "'$DESIGNS_DIR'/exports", format: "png", scale: 2 })'
  sleep 8
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in $DESIGNS_DIR/{PROJECT_ID}_Dashboard.pen --out $DESIGNS_DIR/{PROJECT_ID}_Dashboard.pen 2>&1 | grep -v "^\[INFO\]"

# 確認 PNG 存在
ls -la $DESIGNS_DIR/exports/    # → ABC123.png
```

### 多個 screens 一次 export

```bash
echo 'export_nodes({ nodeIds: ["ABC123", "DEF456", "GHI789"], outputDir: "'$DESIGNS_DIR'/exports", format: "png", scale: 2 })'
# → 生成 ABC123.png, DEF456.png, GHI789.png
```

### 完成設計後的回報格式

```
✅ 設計完成 — {PROJECT_ID} Dashboard
- 設計檔：$DESIGNS_DIR/{PROJECT_ID}_Dashboard_2026-03-31.pen
- Screens：3 個（Dashboard, Mobile, Tablet）
- 截圖：
  - $DESIGNS_DIR/exports/ABC123.png (Desktop 1440×900)
  - $DESIGNS_DIR/exports/DEF456.png (Mobile 375×812)
  - $DESIGNS_DIR/exports/GHI789.png (Tablet 768×1024)
- 顏色來源：shadcn Zinc Dark hex constants ✅
```

**如果 export_nodes 失敗 → 必須報「⚠️ 截圖失敗」+ 原因，唔可以報「完成」。**

---


## 🗃️ 預製 Tabler 模板（⛔ Schema 無效 — 唔可以用 CLI `--in` 載入）

> ⛔ **已確認 Schema 無效（2026 實測）**
>
> `/opt/design-systems/pencil-templates/` 入面嘅 `.pen` 模板**全部 schema 有問題，無法用 Pencil CLI 載入**：
> - `icon` 屬性：Pencil CLI 唔支援，會拋出 schema parse 錯誤
> - `fill: "transparent"`：CLI 唔接受 string，要用 `fillOpacity: 0`
> - `width: "82%"` 等百分比：CLI 要求絕對數值 px，唔接受 percentage
>
> **唔好嘗試 `--in tabler-dashboard.pen`，唔好 retry，直接用下方 HTML 參考方案。**

### ✅ 替代方案：直接用 Tabler HTML Components 作參考

> Tabler HTML templates 係**真實可用嘅參考**，直接讀取 HTML 理解 layout 同組件結構，
> 然後用 `batch_design` 手砌相對應嘅 shapes。

```bash
# 可用嘅 Tabler HTML 參考資源（喺 VPS）：
/opt/design-systems/tabler/html-cards/        # 47 個 card variants
/opt/design-systems/tabler/html-components/   # 62 個 UI components
/opt/design-systems/tabler/html-layout/       # Layout structure
/opt/design-systems/tabler/pages/             # Complete page examples

# Tabler Design Tokens（正確 hex 值）：
# color.bg          = #f9fafb          color.primary     = #066fd1
# color.bg-surface  = #ffffff          color.success     = #2fb344
# color.text        = #1f2937          color.danger      = #d63939
# color.text-muted  = #6b7280          color.border      = #e5e7eb
```

**使用方式：**
1. 用 `read_file` 讀取對應 HTML file，理解 layout 結構
2. 將 HTML 結構翻譯為 `batch_design` operations
3. 顏色用上方 Tabler tokens（唔好用 zinc.json tokens 混用）

---

### 🗄️ 原始文件資訊（保留作參考）

> 以下係原來預製文件嘅結構說明，**僅供了解 layout 邏輯，唔可直接用 CLI 載入。**

### 位置
```
workspace/pencil-templates/tabler-dashboard.pen          # 79 KB
workspace/pencil-templates/tabler-components.lib.pen     # 26 KB
```

### `tabler-dashboard.pen` — 完整 1440×900 Dashboard 頁面
包含：
- **左 Sidebar** (240px)：Logo + 6 個 Nav items（Dashboard 高亮 active）
- **頂 Header** (56px)：頁面標題 + Search bar + Bell icon + User avatar
- **4 KPI Stat Cards**：Total Revenue / New Orders / Active Users / Conversion — 每個有 icon、數值、漲跌 badge
- **Revenue Overview** 圖表卡（area chart placeholder，藍色漸層）
- **Top Products** 列表卡（5行 + progress bar）
- **Recent Orders** 表格卡（5行 + Orders ID/Customer/Date/Amount/Status badge）

**Design Tokens（已注入 variables 區塊）：**
```
color.bg = #f9fafb          color.primary = #066fd1
color.bg-surface = #ffffff  color.success = #2fb344
color.text = #1f2937        color.danger  = #d63939
color.text-secondary = #6b7280  color.border = #e5e7eb
```

### `tabler-components.lib.pen` — 可複用組件庫
包含 15 個 `reusable: true` 組件：

| 組件 ID | 說明 |
|---------|------|
| `stat-card-primary/success/danger/warning` | 4 款 KPI stat card |
| `btn-primary`, `btn-ghost`, `btn-danger`, `btn-success` | 4 款按鈕 |
| `badge-success/warning/danger/info/neutral` | 5 款 Status badge |
| `input-field` | Label + input field |
| `nav-sidebar-demo` | Sidebar nav 範例 |

### 使用方式

**方式 A：直接在 Pencil app 打開**
```
File → Open → workspace/pencil-templates/tabler-dashboard.pen
```
或 import library：
```
File → Open → workspace/pencil-templates/tabler-components.lib.pen
→ Libraries panel → Turn this file into a library
```

**方式 B：CLI 以模板為起點修改（推薦）**
```bash
export PENCIL_CLI_KEY=pencil_cli_c3a2cbf3d027509210af6d87d0cdeb6d42add016
PENCIL_BIN="node /usr/lib/node_modules/@pencil.dev/cli/dist/index.cjs"
TEMPLATE="/root/.openclaw/workspace/pencil-templates/tabler-dashboard.pen"
OUTPUT="/root/.openclaw/workspace/workspaces/fabio-cdo/designs/my-dashboard.pen"

{
  sleep 3
  echo 'get_editor_state({ include_schema: false })'   # 了解現有結構
  sleep 5
  echo 'batch_get({ patterns: [{ reusable: true }] })' # 列出所有可用組件
  sleep 4
  # 例：修改 header 標題文字
  echo 'batch_design({ operations: `=U("header-title-1",{content:"My Custom Dashboard"})` })'
  sleep 4
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in $TEMPLATE --out $OUTPUT 2>&1 | grep -v "^\[INFO\]"
```

**方式 C：用 lib 組件建立新頁面**
```bash
# 先了解 lib 組件的 ID
{
  sleep 3
  echo 'batch_get({ patterns: [{ reusable: true }] })'
  sleep 4
  echo 'exit()'
} | $PENCIL_BIN interactive \
  --in /root/.openclaw/workspace/pencil-templates/tabler-components.lib.pen \
  --out /tmp/probe.pen 2>&1 | grep -v "^\[INFO\]"

# 然後在新設計中 ref 這些組件（需先 imports 指向 lib 文件）
```

### ⚠️ 注意事項
- **唔好刪除 variables 區塊** — 顏色全部用 `$color.primary` 等變數，刪咗會全部變 black
- **模板只係起點** — 直接修改 node ID / 加入自定義數據最有效
- **Library 文件不可修改後再當 library** — `lib.pen` 只允許一次 "Turn into library"

---

## �🔄 CDO 標準設計 SOP（完整版）

```bash
# ─── 準備 ────────────────────────────────────────────────
export PENCIL_CLI_KEY=pencil_cli_c3a2cbf3d027509210af6d87d0cdeb6d42add016
PENCIL_BIN="node /usr/lib/node_modules/@pencil.dev/cli/dist/index.cjs"

# ⚠️ 強制：PROJECT_ID 從 Boss 指示 / Phase 1 Doc 取得（如 P2026-001），唔可以自創或省略
PROJECT_ID="{PROJECT_ID}"   # 例：P2026-001、P2026-003、P2026-007
BASE_DIR="/root/.openclaw/workspace/projects"
DESIGNS_DIR="$BASE_DIR/${PROJECT_ID}_ProjectDocuments/designs"
mkdir -p $DESIGNS_DIR/exports
PEN_FILE="$DESIGNS_DIR/${PROJECT_ID}_MyScreen_$(date +%Y-%m-%d).pen"

# ─── Step 1: 取得 Guidelines（get_style_guide 已 BROKEN，跳過）────
{
  sleep 3
  echo 'get_guidelines({ topic: "web-app" })'
  sleep 6
  echo 'save()'
  sleep 1
  echo 'exit()'
} | $PENCIL_BIN interactive -o /tmp/prep.pen 2>&1 | grep -v "^\[INFO\]"
# → 顏色使用 SKILLS_PENCIL.md 中的 shadcn Zinc Dark hex constants，唔需要 Style Guide

# ─── Step 2: 建立設計（用 Style Guide 的顏色）──────────────
{
  sleep 3
  echo 'batch_design({ operations: `screen=I(document,{type:"frame",name:"Dashboard",x:0,y:0,width:1440,height:900,fill:"#0F0F0F"});header=I(screen,{type:"frame",layout:"horizontal",width:"fill_container",height:64,fill:"#0A0A0A",padding:[0,24],gap:16});logo=I(header,{type:"text",content:"MADHORSE",fontSize:20,fontWeight:"700",fill:"#FAF8F5"});content=I(screen,{type:"frame",layout:"vertical",width:"fill_container",height:"fill_container",padding:32,gap:24});title=I(content,{type:"text",content:"Dashboard",fontSize:32,fontWeight:"700",fill:"#FAF8F5"})` })'
  sleep 8
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive -o $PEN_FILE 2>&1 | grep -v "^\[INFO\]"
# → 記下 top-level frame node ID，例 ABC123

# ─── Step 3: 截圖（必做 — 唔做等於未完成）─────────────────
{
  sleep 3
  echo 'export_nodes({ nodeIds: ["ABC123"], outputDir: "'$DESIGNS_DIR'/exports", format: "png", scale: 2 })'
  sleep 8
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in $PEN_FILE --out $PEN_FILE 2>&1 | grep -v "^\[INFO\]"

# ─── Step 4: 驗收 + 回報 ──────────────────────────────────
ls -la $DESIGNS_DIR/exports/   # 確認 PNG 存在且 > 0 bytes
# ✅ 交付路徑格式：/root/.openclaw/workspace/projects/{PROJECT_ID}_ProjectDocuments/designs/exports/{PROJECT_ID}_ScreenName.png
```


---

## 🗺️ FULL SCREEN BUILDING PROTOCOL (v2.0 — 強制執行)

> **CDO 最嚴重錯誤的根源：** 在一個 session 內嘗試畫完整個 screen，80 行後停手以為完成——實際上只畫了 40%。
> **正確做法：** 將一個 Screen 分拆為 5-6 個獨立 session，每個 session 負責一個 Zone。
> **座標地圖必須在開始前印在腦裡——唔好靠感覺猜位置，所有 x/y 都要計算。**

---

### 📐 標準 1440×900 Dashboard 座標地圖（MADHORSE HQ 強制格式）

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ HEADER  x=0, y=0, w=1440, h=64        fill:#1A1A2E                              │
│ [Logo]  [Tab:Dashboard] [Tab:Research] [Tab:Investor]   [⟳ Refresh] [KG Avatar] │
├────────────────┬─────────────────────────────────────────────────────────────────┤
│ SIDEBAR        │ CONTENT  x=240, y=64, w=1200, h=836    fill:#0F3460             │
│ x=0, y=64      │                                                                  │
│ w=240, h=836   │  ┌─ KPI ROW  x=24, y=24, w=1152, h=120 ──────────────────────┐ │
│ fill:#1A1A2E   │  │  [Card w=270,h=120] × 4  gap=14                           │ │
│                │  └──────────────────────────────────────────────────────────────┘ │
│ y=20  AGENTS   │                                                                  │
│ y=50  ● CEO    │  ┌─ PROJECT GRID  x=24, y=168, w=1152, h=296 ────────────────┐ │
│ y=90  ● CTO    │  │  Section title y=0,h=32  |  Cards row y=40               │ │
│ y=130 ● COO    │  │  [Card w=264,h=130] × 4  gap=16  (then row 2)            │ │
│ y=170 ● CISO   │  └──────────────────────────────────────────────────────────────┘ │
│ y=210 ● CDO    │                                                                  │
│ y=250 ○ Forex  │  ┌─ RESEARCH ROW  x=24, y=488, w=1152, h=220 ────────────────┐ │
│                │  │  Section title y=0,h=32  |  Cards row y=40               │ │
│ y=320 SYSTEM   │  │  [Card w=274,h=160] × 4  gap=14                          │ │
│ y=350 ● GW:OK  │  └──────────────────────────────────────────────────────────────┘ │
│ y=390 ● API:OK │                                                                  │
│ y=430 ● TG:OK  │                                                                  │
└────────────────┴─────────────────────────────────────────────────────────────────┘

MADHORSE Color Constants（喺每個 session 開頭複製呢段）：
  bg:      "#0F3460"   kpi card, content background
  card:    "#16213E"   project/research cards
  surface: "#1A1A2E"   header, sidebar
  accent:  "#E94560"   active tab, CTA button
  success: "#00B894"   active status dot, positive trend
  warning: "#FDCB6E"   busy/warning
  error:   "#FF6B6B"   offline/error
  text:    "#FFFFFF"   primary text
  muted:   "#A8A8B3"   secondary text, labels
  border:  "#2D3561"   dividers
```

---

### 🔄 Multi-Session Build Strategy（每個 Screen 必跟此流程）

> **一個 Screen = 5 個 session，每個 session 負責一個 Zone。**
> **每個 session 結尾必須 `save()`，下個 session 用 `--in PEN_FILE --out PEN_FILE` 讀入繼續。**

```
Session 1 → 建立 Page Frame + Header + Sidebar 框架（無內容）
Session 2 → 填充 Sidebar Agent List（6 agents + status dots + System section）
Session 3 → 建立 Content 區 + KPI Row 4 cards（含 label + value + trend）
Session 4 → 建立 Project Status Grid（4-8 project cards with phase badge）
Session 5 → 建立 Research Row（4 research cards with tags）
Session 6 → export_nodes（截圖），確認 PNG ≥ 50KB，完成
```

**⚠️ 每個 session 使用 `--in + --out` 讀入上一個 session 的 .pen 文件：**
```bash
# Session 1 （建立新檔）
} | $PENCIL_BIN interactive -o $PEN_FILE

# Session 2+ （繼續上一個 session 的設計）
} | $PENCIL_BIN interactive --in $PEN_FILE --out $PEN_FILE
```

---

### ✅ Screen 完整性自檢清單（每個 Screen export 前必過）

> **⚠️ 未過呢個 checklist 唔可以聲稱完成。**

```
ZONE 1 — Header (1440×64)
 ✅ Logo 文字可見（白色，fontSize≥16）
 ✅ 至少 2 個 Tab（active tab 用 accent 顏色下劃線/背景）
 ✅ User avatar / refresh button 在右側

ZONE 2 — Sidebar (240×836)
 ✅ "AGENTS" section label 可見
 ✅ 全部 6 個 agent 行（CEO / CTO / COO / CISO / CDO / Forex）
 ✅ 每個 agent 有 status dot（active=success / idle=muted）
 ✅ "SYSTEM" section label 可見
 ✅ 至少 3 個 system service 行（Gateway / API / Telegram）
 ✅ Sidebar 同 Header 之間有 border-right 分隔線

ZONE 3 — KPI Row (4 cards)
 ✅ 恰好 4 張 KPI card
 ✅ 每張有：標題 label + 主要數字 + 趨勢文字（↑/↓ + %）
 ✅ Cards 水平排列，間距一致
 ✅ Cards 填滿晒 1152px 寬度（不留大空白）

ZONE 4 — Project Grid
 ✅ Section 標題（"Projects" 或同類）
 ✅ 至少 4 個 project cards
 ✅ 每個 card 有：Project ID + name + Phase badge + status bar
 ✅ Phase badge 有顏色區別（In Progress=accent / Complete=success）

ZONE 5 — Research Row
 ✅ Section 標題（"Recent Research" 或同類）
 ✅ 至少 3 個 research cards
 ✅ 每個 card 有：標題 + 描述 (2 行) + tag badge + 日期

CONTENT AREA
 ✅ Content 背景填滿整個 1200×836（無大片空白）
 ✅ 所有 Zones 之間有合理 gap（唔係擠在一堆或四分五裂）

PNG EXPORT
 ✅ PNG 文件大小 ≥ 50KB（太小 = 內容唔夠）
 ✅ 截圖 node ID 係 Screen 頂層 frame，唔係 document root
```

---

### 🏗️ Session 1 & 2 完整樣板（Header + Sidebar with Agent List）

> 以下係已驗證可工作嘅 batch_design 代碼。直接複製，替換 `PROJECT_ID`。

```bash
export PENCIL_CLI_KEY=pencil_cli_c3a2cbf3d027509210af6d87d0cdeb6d42add016
PENCIL_BIN="node /usr/lib/node_modules/@pencil.dev/cli/dist/index.cjs"
PEN_FILE="/root/.openclaw/workspace/projects/${PROJECT_ID}_ProjectDocuments/designs/${PROJECT_ID}_Dashboard.pen"
mkdir -p "$(dirname $PEN_FILE)/exports"

# ══════════ SESSION 1: Page Frame + Header + Sidebar Shell ══════════
{
  sleep 3
  echo 'batch_design({ operations: `page=I(document,{type:"frame",name:"Dashboard",x:0,y:0,width:1440,height:900,fill:"#0F3460"});hdr=I(page,{type:"frame",name:"Header",x:0,y:0,width:1440,height:64,fill:"#1A1A2E",layout:"horizontal",padding:[0,24],gap:0});hdr_logo=I(hdr,{type:"text",content:"MADHORSE HQ",fontSize:18,fontWeight:"700",fill:"#FFFFFF"});hdr_spacer=I(hdr,{type:"frame",width:"fill_container",height:1,fill:"#00000000"});hdr_tabs=I(hdr,{type:"frame",layout:"horizontal",gap:4,padding:[0,4],height:"fill_container",width:"fit_content",fill:"#00000000"});tab1_bg=I(hdr_tabs,{type:"frame",name:"Tab/Dashboard",layout:"horizontal",gap:0,padding:[0,16],height:"fill_container",width:"fit_content",fill:"#00000000",borderBottom:[{strokeColor:"#E94560",strokeWidth:2,strokePosition:"inner"}]});tab1=I(tab1_bg,{type:"text",content:"Dashboard",fontSize:14,fontWeight:"500",fill:"#FFFFFF"});tab2_bg=I(hdr_tabs,{type:"frame",name:"Tab/Research",layout:"horizontal",padding:[0,16],height:"fill_container",width:"fit_content",fill:"#00000000"});tab2=I(tab2_bg,{type:"text",content:"Research",fontSize:14,fontWeight:"400",fill:"#A8A8B3"});tab3_bg=I(hdr_tabs,{type:"frame",name:"Tab/Investor",layout:"horizontal",padding:[0,16],height:"fill_container",width:"fit_content",fill:"#00000000"});tab3=I(tab3_bg,{type:"text",content:"Investor",fontSize:14,fontWeight:"400",fill:"#A8A8B3"});avatar=I(hdr,{type:"frame",name:"Avatar",width:32,height:32,fill:"#E94560",cornerRadius:16});av_t=I(avatar,{type:"text",content:"KG",fontSize:12,fontWeight:"600",fill:"#FFFFFF"});sb=I(page,{type:"frame",name:"Sidebar",x:0,y:64,width:240,height:836,fill:"#1A1A2E"});sb_border=I(sb,{type:"rectangle",name:"Sidebar/Border",x:239,y:0,width:1,height:836,fill:"#2D3561"})` })'
  sleep 10
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive -o $PEN_FILE 2>&1 | grep -v "^\[INFO\]"
echo "Session 1 done. File: $(ls -lh $PEN_FILE | awk '{print $5, $9}')"

# ══════════ SESSION 2: Sidebar Agent List ══════════
{
  sleep 3
  echo 'batch_design({ operations: `sb_agents_lbl=I("Sidebar",{type:"text",content:"AGENTS",fontSize:10,fontWeight:"500",fill:"#A8A8B3",x:20,y:20});ceo_dot=I("Sidebar",{type:"frame",name:"dot/CEO",x:20,y:50,width:8,height:8,fill:"#00B894",cornerRadius:4});ceo_t=I("Sidebar",{type:"text",content:"CEO — Fabio",fontSize:13,fill:"#FFFFFF",x:36,y:49});cto_dot=I("Sidebar",{type:"frame",name:"dot/CTO",x:20,y:90,width:8,height:8,fill:"#00B894",cornerRadius:4});cto_t=I("Sidebar",{type:"text",content:"CTO",fontSize:13,fill:"#FFFFFF",x:36,y:89});coo_dot=I("Sidebar",{type:"frame",name:"dot/COO",x:20,y:130,width:8,height:8,fill:"#00B894",cornerRadius:4});coo_t=I("Sidebar",{type:"text",content:"COO",fontSize:13,fill:"#FFFFFF",x:36,y:129});ciso_dot=I("Sidebar",{type:"frame",name:"dot/CISO",x:20,y:170,width:8,height:8,fill:"#00B894",cornerRadius:4});ciso_t=I("Sidebar",{type:"text",content:"CISO",fontSize:13,fill:"#FFFFFF",x:36,y:169});cdo_dot=I("Sidebar",{type:"frame",name:"dot/CDO",x:20,y:210,width:8,height:8,fill:"#00B894",cornerRadius:4});cdo_t=I("Sidebar",{type:"text",content:"CDO",fontSize:13,fill:"#FFFFFF",x:36,y:209});forex_dot=I("Sidebar",{type:"frame",name:"dot/Forex",x:20,y:250,width:8,height:8,fill:"#A8A8B3",cornerRadius:4});forex_t=I("Sidebar",{type:"text",content:"Forex",fontSize:13,fill:"#A8A8B3",x:36,y:249});sb_div=I("Sidebar",{type:"rectangle",name:"Sidebar/Divider",x:16,y:296,width:208,height:1,fill:"#2D3561"});sb_sys_lbl=I("Sidebar",{type:"text",content:"SYSTEM",fontSize:10,fontWeight:"500",fill:"#A8A8B3",x:20,y:314});gw_dot=I("Sidebar",{type:"frame",name:"dot/GW",x:20,y:342,width:8,height:8,fill:"#00B894",cornerRadius:4});gw_t=I("Sidebar",{type:"text",content:"Gateway :18789",fontSize:12,fill:"#FFFFFF",x:36,y:341});api_dot=I("Sidebar",{type:"frame",name:"dot/API",x:20,y:374,width:8,height:8,fill:"#00B894",cornerRadius:4});api_t=I("Sidebar",{type:"text",content:"MiniMax AI",fontSize:12,fill:"#FFFFFF",x:36,y:373});tg_dot=I("Sidebar",{type:"frame",name:"dot/TG",x:20,y:406,width:8,height:8,fill:"#00B894",cornerRadius:4});tg_t=I("Sidebar",{type:"text",content:"Telegram",fontSize:12,fill:"#FFFFFF",x:36,y:405})` })'
  sleep 10
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in $PEN_FILE --out $PEN_FILE 2>&1 | grep -v "^\[INFO\]"
echo "Session 2 done. File: $(ls -lh $PEN_FILE | awk '{print $5, $9}')"
```

---

### 🏗️ Session 3 樣板（Content Area + KPI Row）

```bash
# ══════════ SESSION 3: Content Frame + KPI Row ══════════
{
  sleep 3
  echo 'batch_design({ operations: `ct=I("Dashboard",{type:"frame",name:"Content",x:240,y:64,width:1200,height:836,fill:"#0F3460"});kpi_row=I("Content",{type:"frame",name:"KPI_Row",x:24,y:24,width:1152,height:120,fill:"#00000000",layout:"horizontal",gap:14});k1=I("KPI_Row",{type:"frame",name:"KPI/Tasks",width:270,height:120,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:[20,20,16,20],gap:4});k1_lbl=I(k1,{type:"text",content:"Active Tasks",fontSize:12,fontWeight:"500",fill:"#A8A8B3"});k1_val=I(k1,{type:"text",content:"12",fontSize:32,fontWeight:"600",fill:"#FFFFFF"});k1_tr=I(k1,{type:"text",content:"↑ 3 this week",fontSize:12,fill:"#00B894"});k2=I("KPI_Row",{type:"frame",name:"KPI/Agents",width:270,height:120,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:[20,20,16,20],gap:4});k2_lbl=I(k2,{type:"text",content:"Active Agents",fontSize:12,fontWeight:"500",fill:"#A8A8B3"});k2_val=I(k2,{type:"text",content:"5 / 6",fontSize:32,fontWeight:"600",fill:"#FFFFFF"});k2_tr=I(k2,{type:"text",content:"Forex idle",fontSize:12,fill:"#FDCB6E"});k3=I("KPI_Row",{type:"frame",name:"KPI/Projects",width:270,height:120,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:[20,20,16,20],gap:4});k3_lbl=I(k3,{type:"text",content:"Projects",fontSize:12,fontWeight:"500",fill:"#A8A8B3"});k3_val=I(k3,{type:"text",content:"8",fontSize:32,fontWeight:"600",fill:"#FFFFFF"});k3_tr=I(k3,{type:"text",content:"2 In Progress",fontSize:12,fill:"#FFFFFF"});k4=I("KPI_Row",{type:"frame",name:"KPI/Research",width:270,height:120,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:[20,20,16,20],gap:4});k4_lbl=I(k4,{type:"text",content:"Research",fontSize:12,fontWeight:"500",fill:"#A8A8B3"});k4_val=I(k4,{type:"text",content:"24",fontSize:32,fontWeight:"600",fill:"#FFFFFF"});k4_tr=I(k4,{type:"text",content:"5 this month",fontSize:12,fill:"#FFFFFF"})` })'
  sleep 12
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in $PEN_FILE --out $PEN_FILE 2>&1 | grep -v "^\[INFO\]"
echo "Session 3 done."
```

---

### 🏗️ Session 4-6 樣板（Project Grid + Research Row + Export）

```bash
# ══════════ SESSION 4: Project Grid section title + 4 cards ══════════
{
  sleep 3
  echo 'batch_design({ operations: `pj_sec=I("Content",{type:"frame",name:"Projects_Section",x:24,y:168,width:1152,height:296,fill:"#00000000",layout:"vertical",gap:12});pj_hdr=I("Projects_Section",{type:"text",content:"Projects",fontSize:16,fontWeight:"600",fill:"#FFFFFF"});pj_row=I("Projects_Section",{type:"frame",name:"Projects_Row",width:"fill_container",height:240,fill:"#00000000",layout:"horizontal",gap:14});p1=I("Projects_Row",{type:"frame",name:"P001",width:264,height:130,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:16,gap:6});p1_id=I(p1,{type:"text",content:"P2026-001",fontSize:10,fill:"#A8A8B3"});p1_nm=I(p1,{type:"text",content:"Dashboard",fontSize:14,fontWeight:"600",fill:"#FFFFFF"});p1_ph=I(p1,{type:"frame",name:"badge",layout:"horizontal",padding:[3,8],width:"fit_content",fill:"#1A472A",cornerRadius:4});p1_ph_t=I(p1_ph,{type:"text",content:"BAU",fontSize:11,fontWeight:"500",fill:"#4ADE80"});p2=I("Projects_Row",{type:"frame",name:"P002",width:264,height:130,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:16,gap:6});p2_id=I(p2,{type:"text",content:"P2026-002",fontSize:10,fill:"#A8A8B3"});p2_nm=I(p2,{type:"text",content:"Meal Planner",fontSize:14,fontWeight:"600",fill:"#FFFFFF"});p2_ph=I(p2,{type:"frame",name:"badge",layout:"horizontal",padding:[3,8],width:"fit_content",fill:"#312E1E",cornerRadius:4});p2_ph_t=I(p2_ph,{type:"text",content:"Phase 5 UAT",fontSize:11,fontWeight:"500",fill:"#FDCB6E"});p3=I("Projects_Row",{type:"frame",name:"P003",width:264,height:130,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:16,gap:6});p3_id=I(p3,{type:"text",content:"P2026-003",fontSize:10,fill:"#A8A8B3"});p3_nm=I(p3,{type:"text",content:"Research Dashboard",fontSize:14,fontWeight:"600",fill:"#FFFFFF"});p3_ph=I(p3,{type:"frame",name:"badge",layout:"horizontal",padding:[3,8],width:"fit_content",fill:"#1A472A",cornerRadius:4});p3_ph_t=I(p3_ph,{type:"text",content:"BAU",fontSize:11,fontWeight:"500",fill:"#4ADE80"});p4=I("Projects_Row",{type:"frame",name:"P008",width:264,height:130,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:16,gap:6});p4_id=I(p4,{type:"text",content:"P2026-008",fontSize:10,fill:"#A8A8B3"});p4_nm=I(p4,{type:"text",content:"MADHORSE HQ",fontSize:14,fontWeight:"600",fill:"#FFFFFF"});p4_ph=I(p4,{type:"frame",name:"badge",layout:"horizontal",padding:[3,8],width:"fit_content",fill:"#1C2A4A",cornerRadius:4});p4_ph_t=I(p4_ph,{type:"text",content:"Phase 2",fontSize:11,fontWeight:"500",fill:"#60A5FA"})` })'
  sleep 14
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in $PEN_FILE --out $PEN_FILE 2>&1 | grep -v "^\[INFO\]"
echo "Session 4 done."

# ══════════ SESSION 5: Research Row ══════════
{
  sleep 3
  echo 'batch_design({ operations: `rs_sec=I("Content",{type:"frame",name:"Research_Section",x:24,y:488,width:1152,height:220,fill:"#00000000",layout:"vertical",gap:12});rs_hdr=I("Research_Section",{type:"text",content:"Recent Research",fontSize:16,fontWeight:"600",fill:"#FFFFFF"});rs_row=I("Research_Section",{type:"frame",name:"Research_Row",width:"fill_container",height:170,fill:"#00000000",layout:"horizontal",gap:14});r1=I("Research_Row",{type:"frame",name:"R1",width:270,height:160,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:16,gap:8});r1_tag=I(r1,{type:"frame",layout:"horizontal",padding:[2,8],width:"fit_content",fill:"#1C2A4A",cornerRadius:4});r1_tag_t=I(r1_tag,{type:"text",content:"SaaS",fontSize:10,fill:"#60A5FA"});r1_title=I(r1,{type:"text",content:"SaaS Pricing Trends 2026",fontSize:13,fontWeight:"600",fill:"#FFFFFF",textGrowth:"fixed-width",width:238});r1_desc=I(r1,{type:"text",content:"Analysis of subscription models and freemium conversions",fontSize:11,fill:"#A8A8B3",textGrowth:"fixed-width",width:238});r1_date=I(r1,{type:"text",content:"Apr 1, 2026  · By COO",fontSize:11,fill:"#A8A8B3"});r2=I("Research_Row",{type:"frame",name:"R2",width:270,height:160,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:16,gap:8});r2_tag=I(r2,{type:"frame",layout:"horizontal",padding:[2,8],width:"fit_content",fill:"#2A1C1C",cornerRadius:4});r2_tag_t=I(r2_tag,{type:"text",content:"Competitive",fontSize:10,fill:"#F87171"});r2_title=I(r2,{type:"text",content:"AI Agent Market Share",fontSize:13,fontWeight:"600",fill:"#FFFFFF",textGrowth:"fixed-width",width:238});r2_desc=I(r2,{type:"text",content:"OpenAI vs Anthropic vs local vs agent platforms",fontSize:11,fill:"#A8A8B3",textGrowth:"fixed-width",width:238});r2_date=I(r2,{type:"text",content:"Mar 31, 2026  · By COO",fontSize:11,fill:"#A8A8B3"});r3=I("Research_Row",{type:"frame",name:"R3",width:270,height:160,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:16,gap:8});r3_tag=I(r3,{type:"frame",layout:"horizontal",padding:[2,8],width:"fit_content",fill:"#1C2A4A",cornerRadius:4});r3_tag_t=I(r3_tag,{type:"text",content:"Technical",fontSize:10,fill:"#60A5FA"});r3_title=I(r3,{type:"text",content:"MiniMax M2.5 API Deep Dive",fontSize:13,fontWeight:"600",fill:"#FFFFFF",textGrowth:"fixed-width",width:238});r3_desc=I(r3,{type:"text",content:"Capabilities, pricing and integration patterns",fontSize:11,fill:"#A8A8B3",textGrowth:"fixed-width",width:238});r3_date=I(r3,{type:"text",content:"Mar 30, 2026  · By COO",fontSize:11,fill:"#A8A8B3"});r4=I("Research_Row",{type:"frame",name:"R4",width:270,height:160,fill:"#16213E",cornerRadius:12,layout:"vertical",padding:16,gap:8});r4_tag=I(r4,{type:"frame",layout:"horizontal",padding:[2,8],width:"fit_content",fill:"#1C2A1C",cornerRadius:4});r4_tag_t=I(r4_tag,{type:"text",content:"User Interview",fontSize:10,fill:"#4ADE80"});r4_title=I(r4,{type:"text",content:"Founder Sentiment Q1",fontSize:13,fontWeight:"600",fill:"#FFFFFF",textGrowth:"fixed-width",width:238});r4_desc=I(r4,{type:"text",content:"Synthesis of 12 user interviews on AI adoption",fontSize:11,fill:"#A8A8B3",textGrowth:"fixed-width",width:238});r4_date=I(r4,{type:"text",content:"Mar 28, 2026  · By COO",fontSize:11,fill:"#A8A8B3"})` })'
  sleep 14
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in $PEN_FILE --out $PEN_FILE 2>&1 | grep -v "^\[INFO\]"
echo "Session 5 done."

# ══════════ SESSION 6: Export PNG ══════════
# 先 get_editor_state 搵到頂層 frame ID（名叫 "Dashboard"）
{
  sleep 3
  echo 'batch_get()'
  sleep 5
  echo 'save()'
  sleep 1
  echo 'exit()'
} | $PENCIL_BIN interactive --in $PEN_FILE --out $PEN_FILE 2>&1 | grep -v "^\[INFO\]"
# → 從輸出找到 name:"Dashboard" 對應嘅 node ID，如 "abc123"
# → 替換下面嘅 SCREEN_NODE_ID

SCREEN_NODE_ID="REPLACE_WITH_ACTUAL_ID"
EXPORT_DIR="/root/.openclaw/workspace/projects/${PROJECT_ID}_ProjectDocuments/designs/exports"
{
  sleep 3
  echo "export_nodes({ nodeIds: [\"$SCREEN_NODE_ID\"], outputDir: \"$EXPORT_DIR\", format: \"png\", scale: 2 })"
  sleep 10
  echo 'save()'
  sleep 2
  echo 'exit()'
} | $PENCIL_BIN interactive --in $PEN_FILE --out $PEN_FILE 2>&1 | grep -v "^\[INFO\]"
ls -lh "$EXPORT_DIR/"  # 驗收：PNG ≥ 50KB = 內容充足
```

---

## 🆚 Penpot vs Pencil 選擇指引

| 情境 | 用哪個 |
|------|--------|
| 老闆要在 Penpot UI 睇設計 | Penpot (execute_code) |
| 需要 Prototype 互動流 | Penpot (addInteraction) |
| 生成靜態設計稿 / PNG 交付物 | Pencil CLI ✅ |
| createText() 返回 null | 立即切換 Pencil CLI ✅ |
| 快速批量建立 cards/components | Pencil CLI ✅ |

---

## ⚙️ 安裝資訊（Host Server）

```
Package: @pencil.dev/cli v0.2.3
Location: /usr/lib/node_modules/@pencil.dev/cli/
Binary: /usr/bin/pencil → ../lib/node_modules/@pencil.dev/cli/dist/index.cjs
MCP server: /usr/lib/node_modules/@pencil.dev/cli/dist/out/mcp-server-linux-x64
```
