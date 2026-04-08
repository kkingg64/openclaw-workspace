# SKILLS_PENPOT.md — Penpot 工具 + Prototype

> 本文件涵蓋：Penpot MCP API 完整用法、Prototype 互動設計

## 🎨 Penpot — CDO 唯一設計工具

> **Penpot + MCP = CDO 完全自主設計，無需人手介入。**
> CDO 透過 MCP 直接控制 Penpot canvas：建立 Pages、Boards、Shapes、Text、Layout，再 Export PNG/SVG 作為交付物同 UAT 驗收基準。

### 🏗️ 架構（必須理解，唔可以猜）

```
CDO (LLM) 
  → HTTP POST http://76.13.215.13:4401/mcp   [MCP tool call]
  → MCP Server (Node.js)                     [接收 HTTP，內部 bridge]
  → WebSocket ws://76.13.215.13:4402         [轉發指令到 Plugin]
  → Penpot Plugin (browser tab)              [執行 Penpot API]
  → Penpot Canvas                            [畫面更新]
```

**關鍵事實：**
- CDO 只用 **HTTP (4401)**，唔直接用 WebSocket
- 老闆嘅 browser Plugin 只用 **WebSocket (4402)**
- 兩條連接**完全獨立**，互不干擾
- MCP Server 係兩者之間嘅 bridge，唔係鎖

### ❌ 常見錯誤分析（唔好再犯）

| 錯誤想法 | 點解係錯 | 正確理解 |
|---------|---------|---------|
| "Plugin 佔住咗連接，CDO 被拒" | HTTP 4401 同 WebSocket 4402 係獨立的 | 兩個可以同時運作 |
| "MCP 係 WebSocket-only，HTTP 唔得" | MCP Server 同時支援 HTTP + WS，內部 bridge | HTTP call → bridge → Canvas |
| "斷開 Plugin，CDO 先可以工作" | Plugin 斷開 = Canvas 控制失效 | Plugin 必須保持連接 |
| "session state 唔共享" | MCP Server 係有狀態的 bridge | Server 管理兩邊連接 |

### 🔍 正確 Debug 方法：永遠睇 Log

唔好猜，唔好假設。有問題睇 log：

```bash
# 實時監察
ssh root@76.13.215.13 "journalctl -u penpot-mcp -f --no-pager"

# 睇最新活動
ssh root@76.13.215.13 "journalctl -u penpot-mcp -n 50 --no-pager | grep -E 'INFO|ERROR|Task|complet'"
```

**Log 解讀：**
```
INFO (PluginBridge): New WebSocket connection established  → Plugin 已連接 ✅
INFO (PluginBridge): Sent task xxx to connected client     → MCP call 送出 ✅
INFO (PluginBridge): Task xxx completed: success=true      → Canvas 執行成功 ✅
ERROR: No Penpot plugin instances are currently connected  → Plugin 未連接 ❌
ERROR: Already connected to a transport                    → Server 需要重啟 ❌
```

### 🔗 連接資訊

| 項目 | URL |
|------|-----|
| Penpot UI | `http://76.13.215.13:9001` |
| MCP Server (CDO 用) | `http://76.13.215.13:4401/mcp` |
| MCP SSE (Legacy) | `http://76.13.215.13:4401/sse` |
| Plugin WebSocket (老闆用) | `ws://76.13.215.13:4402` |

### ⚠️ 啟動前提（只需做一次）

```
Step 1: 老闆喺 Penpot 開啟 / 建立一個 Design File
Step 2: Plugin Manager → 安裝 "Penpot MCP Plugin"
        Manifest URL: https://marhorse.cloud/penpot-plugin/manifest.json
Step 3: 點 OPEN → 點 "Connect to MCP server"
        → 見到 "Connected to MCP server" (綠色) 即成功
Step 4: CDO 可以開始工作 ✅
```

> 只要 Penpot tab 保持開啟，CDO 可以無限次操作。老闆唔需要再介入，唔需要斷開任何連接。

### 🛠️ MCP Tools

| Tool | 功能 | 用途 |
|------|------|------|
| `execute_code` | 執行 Penpot Plugin API 代碼 | 建立 Page/Board/Shape/Text、設定 Layout、Apply 顏色 |
| `high_level_overview` | 取得當前 File 所有 Pages/Frames 結構 | 設計前查勘、UAT 對照 |
| `penpot_api_info` | 查詢 Penpot API Type 文件 | 查 API 用法 |
| `export_shape` | 匯出指定 Shape 為 PNG/SVG | 交付截圖、UAT 比對基準 |
| `import_image` | 匯入圖片作為 Rectangle fill | 加 Logo/Icon/Photo |

### 🔴 Null Check 強制規則（最高優先 — 違反即停止）

> **已驗證根因（必讀）：**
> - `penpot.createText()` **必須傳字串參數**，唔傳就返回 `null`！
>   - ✅ `penpot.createText("MADHORSE")` → ShapeProxy
>   - ❌ `penpot.createText()` → null（最常見错誤）
> - `penpot.createShapeFromSvg(svgString)` — SVG 格式錯誤或缺少 xmlns 會返回 null
> - `penpot.createPath()` — parent board 准先 append 再設 x/y

**每個 penpot.createXxx() 之後必須 check null：**
```javascript
const text = penpot.createText("Dashboard");
if (!text) {
  console.error("FATAL: createText returned null — HALTING");
  return { error: "createText returned null", shape: "text", halt: true };
}
text.fontSize = 24;
```

**批量建立嘅 helper function：**
```javascript
function safeCreateText(content, opts = {}) {
  const t = penpot.createText(content);
  if (!t) {
    console.error(`FATAL: createText('${content}') returned null`);
    return null;  // caller 必須 check
  }
  if (opts.fontSize) t.fontSize = opts.fontSize;
  if (opts.fontFamily) t.fontFamily = opts.fontFamily;
  if (opts.fills) t.fills = opts.fills;
  return t;
}

// 用法：
const title = safeCreateText("Dashboard", { fontSize: 24 });
if (!title) return { error: "createText null", halt: true };
```

**規則：**
- 任何 `createXxx()` 返回 null → **立即停止整個設計流程**
- 回報錯誤畀 CEO，唔好繼續建立後續元素
- 唔好假設「可能下次會成功」— null 就係 null

### 🔴 最常見致命錯誤：跨 Call 變數失效

> **錯誤：** `Cannot set properties of null (setting 'name')`
> **原因：** 每個 `execute_code` call 都係獨立 scope，上一個 call 建立嘅變數 (`board`, `navbar` 等) 在下一個 call 裡係 `undefined`。

**❌ 錯誤做法（拆開多個 call，變數跨 call 引用）：**
```javascript
// Call 1
const board = penpot.createBoard();
board.name = "Dashboard";
return board.id;

// Call 2 — board 係 null！！
board.resize(1440, 900);  // 💥 Cannot set properties of null
```

**✅ 解決方案 1 — 用 `storage` 儲存引用（推薦）：**
```javascript
// Call 1：建立並存入 storage
const board = penpot.createBoard();
board.name = "Dashboard";
board.resize(1440, 900);
storage.board = board;        // 存入 storage
storage.boardId = board.id;   // 存 ID 作備用
return { boardId: board.id };

// Call 2：從 storage 取回
const board = storage.board;  // ✅ 取回同一個 board 引用
if (!board) return { error: "board not in storage" };
board.fills = [{ fillColor: "#09090B", fillOpacity: 1 }];
```

**✅ 解決方案 2 — 用 `penpotUtils.findShape` 按名稱搜尋（最穩健）：**
```javascript
// Call 2 (唔用 storage)：按名稱找回 board
const board = penpotUtils.findShape(s => s.name === "Dashboard");
if (!board) return { error: "Board not found, check name" };
board.fills = [{ fillColor: "#09090B", fillOpacity: 1 }];
```

**✅ 解決方案 3 — 一個 Call 做晒所有嘢（最簡單）：**
```javascript
// 建立整個 screen 喺同一個 execute_code call 入面
const board = penpot.createBoard();
board.name = "Dashboard";
board.resize(1440, 900);
board.fills = [{ fillColor: "#09090B", fillOpacity: 1 }];

const navbar = penpot.createBoard();
navbar.name = "Navbar";
navbar.resize(1440, 64);
navbar.x = 0; navbar.y = 0;
board.appendChild(navbar);
// ... 繼續喺同一個 call 裡畫所有嘢
return { done: true };
```

**黃金規則：**
- 同一個 Board 嘅所有內容 → **一個 call 搞定**
- 需要分 call → 用 `storage.xxx = shape` 保存引用
- 唔確定有冇 → 用 `penpotUtils.findShape(s => s.name === "...")` 搜尋

### 🔴 自我驗收 — 完成設計後必須執行（唔做 = 未完成）

> **嚴禁向 CEO 報告成功，除非以下全部通過。**
> LLM 容易「自我感覺良好」——execute_code 返回咗但 shape 冇建立，算唔到成功。

#### 完成後必跑嘅驗收代碼：

```javascript
// === 驗收 1：搵出所有孤立 elements（orphans）===
const rootChildren = Array.from(penpot.root.children || []);
const orphans = rootChildren.filter(s => s.type !== 'board');
const orphanReport = orphans.map(s => ({ name: s.name, type: s.type }));

// === 驗收 2：統計每個 Board 的 children 數量 ===
const boards = rootChildren.filter(s => s.type === 'board');
const boardReport = boards.map(b => ({
  name: b.name,
  childrenCount: (b.children || []).length,
  isEmpty: (b.children || []).length === 0
}));

return {
  orphanCount: orphans.length,        // 必須係 0
  orphans: orphanReport,
  boardCount: boards.length,
  emptyBoards: boardReport.filter(b => b.isEmpty).map(b => b.name),  // 必須係空 []
  allBoards: boardReport
};
```

**通過標準：**
```
orphanCount = 0      ← 唔可以有飄散元素
emptyBoards = []     ← 唔可以有空 Board
boardCount >= 1      ← 至少有一個 Board
```

如有不通過 → **唔可以報告成功，必須修正先再報告**。

### 💻 核心 API 速查

```javascript
// === 頁面 ===
const page = penpot.createPage();       // 建立新頁面
penpot.openPage(page);                  // 切換到該頁面

// === Board (= Frame/Screen) ===
const board = penpot.createBoard();
board.name = "Home Screen";
board.resize(1440, 900);

// === 文字 === ⚠️ 必須傳字串，唔傳會返回 null！
const text = penpot.createText("Welcome to MADHORSE");  // ✅ 有傳字串
// const text = penpot.createText();  // ❌ 絕對唔好！返回 null！
text.fontSize = 48;
text.fontFamily = "Inter";
text.fills = [{ fillColor: "#FFFFFF", fillOpacity: 1 }];

// === 形狀 ===
const rect = penpot.createRectangle();
rect.resize(200, 60);
rect.fills = [{ fillColor: "#2DD4BF", fillOpacity: 1 }];
rect.borderRadius = 8;

const ellipse = penpot.createEllipse();
const path = penpot.createPath();

// === Layout ===
const flex = board.addFlexLayout();
flex.dir = "column";
flex.rowGap = 16;
flex.padding = 24;

// === 匯出 ===
const png = await shape.export({ type: "png", scale: 2 });
const svg = await shape.export({ type: "svg" });

// === CSS/HTML 生成（交付 CTO）===
const css = penpot.generateStyle([shape], { type: "css" });
const html = penpot.generateMarkup([shape], { type: "html" });

// === 搜尋/操作已有元素 ===
const allTexts = penpotUtils.findShapes(s => s.type === 'text');
const structure = penpotUtils.shapeStructure(penpot.root, 3);
```

### 🔴 設計完成驗證 SOP（強制 — 唔做唔准報「完成」）

> **問題：** CDO 報「完成 55 shapes」但實際只有空殼 rectangles 冇文字。Shape count ≠ 設計完成。

**完成設計後必須依次執行：**

**Step 1 — 用 `high_level_overview` 確認元素完整性：**
```javascript
const structure = penpotUtils.shapeStructure(penpot.root, 3);
return structure;
```
→ 檢查返回結果有冇 `type: "text"` 嘅元素。如果全部都係 `rectangle`/`board` 冇任何 `text` → **設計未完成**。

**Step 2 — 用 `export_shape` 匯出截圖做視覺驗證：**
```javascript
const board = penpotUtils.findShape(s => s.name === "Dashboard - Desktop");
if (!board) return { error: "Board not found" };
const png = await board.export({ type: "png", scale: 1 });
return { exported: true, boardName: board.name };
```
→ 檢查截圖：有冇文字？有冇顏色？有冇 layout？如果只係一堆灰色方塊 → **設計未完成**。

**Step 3 — 完成性 checklist（必須全部 ✅ 先至報完成）：**

| 檢查項 | 驗證方式 | 必須 |
|--------|---------|------|
| Board 有正確尺寸 | `board.width === 1440` | ✅ |
| 有 text 類型元素 | `findShapes(s => s.type === 'text').length > 0` | ✅ |
| text 元素有實際文字 | text.characters !== "" | ✅ |
| 冇重疊嘅 boards | boards 嘅 x 值唔相同 | ✅ |
| 截圖有視覺內容 | export_shape 返回非空 | ✅ |

**回報格式：**
```
✅ 設計完成 — Dashboard Desktop
- Board: "Dashboard - Desktop" (1440x900)
- Elements: 55 shapes (12 text, 30 rectangles, 8 boards, 5 ellipses)
- Text 驗證: ✅ 12/12 有內容
- 截圖: ✅ 已匯出
- 重疊: ✅ 冇重疊
```

**如果任何一項 ❌ → 報「⚠️ 設計未完成」+ 列出失敗項目。唔好報「完成」。**

### 🖥️ Headless Browser Service — 自動維持 Plugin 連接

> **新架構（2026-03-31）：** 老闆唔需要保持 browser 開著。後台 headless browser 會自動：
> 1. 登入 Penpot
> 2. 打開 MADHORSE 工作區
> 3. 開啟 MCP Plugin
> 4. 點擊「Connect to MCP server」
> 5. 每 20 秒自動檢查並重連

```bash
# 查看連接狀態
ssh root@76.13.215.13 "systemctl status penpot-browser"

# 確認 Plugin 已連接
ssh root@76.13.215.13 "journalctl -u penpot-browser -n 20 --no-pager | grep -E 'Plugin status|Connected|ok='"

# 重啟（連接斷開時）
ssh root@76.13.215.13 "systemctl restart penpot-browser"
```

**正常 log 應該見到：**
```
Plugin status: Connected to MCP server ok=true
```

---

### ⚙️ MCP Server 管理

```bash
# 查看狀態
ssh root@76.13.215.13 "systemctl status penpot-mcp"

# 查看 log
ssh root@76.13.215.13 "tail -f /opt/penpot-mcp/mcp-server/logs/*.log"

# 重啟
ssh root@76.13.215.13 "systemctl restart penpot-mcp"
```

---

## 🎬 Prototype 能力 — 完整互動設計 (Penpot 原生支援)

> CDO 可以建立**真實可互動嘅 Prototype**，唔只係靜態設計稿。
> 喺 Penpot View Mode，老闆可以直接 click 睇 prototype flow，就好似真實 app 咁。
> **核心 API：** `shape.addInteraction(trigger, action)` + `page.createFlow(name, board)`

### 🔗 Trigger 類型（用戶做咩動作觸發）

```typescript
type Trigger = 
  | 'click'        // 用戶點擊 shape
  | 'mouse-enter'  // 滑鼠移入（Hover 效果）
  | 'mouse-leave'  // 滑鼠移出
  | 'after-delay'  // 自動延遲觸發（需設 delay ms）
```

### ⚡ Action 類型（觸發後發生咩事）

```typescript
type Action = 
  | NavigateTo      // 跳去另一個 Board（最常用）
  | OpenOverlay     // 彈出 overlay Board
  | ToggleOverlay   // 切換 overlay 開／關
  | CloseOverlay    // 關閉 overlay
  | PreviousScreen  // 返回上一個 screen
  | OpenUrl         // 打開 URL（新 tab）
```

### 🎞️ Animation 類型（跳轉時嘅動畫）

```typescript
type Animation = 
  | Dissolve  // 淡入淡出 { type: 'dissolve', duration: 300, easing: 'ease-in-out' }
  | Push      // 推入 { type: 'push', direction: 'right'|'left'|'up'|'down', duration: 300 }
  | Slide     // 滑動 { type: 'slide', way: 'in'|'out', direction: 'right'|'left'|'up'|'down', duration: 300 }
// easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
```

### 💻 完整 Prototype 代碼範例

#### 基本頁面跳轉（Button click → 下一頁）
```javascript
// 假設已建立兩個 boards: homeBoard, dashboardBoard
// 在 "開始" 按鈕上加互動
const startBtn = penpotUtils.findShape(s => s.name === 'Button/Start');
startBtn.addInteraction('click', {
  type: 'navigate-to',
  destination: dashboardBoard,
  animation: { type: 'push', direction: 'left', duration: 300, easing: 'ease-in-out' }
});
```

#### 返回按鈕
```javascript
const backBtn = penpotUtils.findShape(s => s.name === 'Button/Back');
backBtn.addInteraction('click', { type: 'previous-screen' });
```

#### Hover 狀態（滑鼠移入改背景）
```javascript
// 移入：顯示 hover 狀態 overlay
const navItem = penpotUtils.findShape(s => s.name === 'NavItem/Dashboard');
navItem.addInteraction('mouse-enter', {
  type: 'open-overlay',
  destination: navItemHoverBoard,  // 預先製作的 hover 狀態 board
  position: 'manual',
  manualPositionLocation: { x: navItem.x, y: navItem.y },
  closeWhenClickOutside: false
});
navItem.addInteraction('mouse-leave', {
  type: 'close-overlay',
  destination: navItemHoverBoard
});
```

#### Modal / Dialog Popup
```javascript
const openModalBtn = penpotUtils.findShape(s => s.name === 'Button/OpenModal');
const modalBoard = penpotUtils.findShape(s => s.name === 'Modal/DeleteConfirm');

// 開 modal
openModalBtn.addInteraction('click', {
  type: 'open-overlay',
  destination: modalBoard,
  position: 'center',
  addBackgroundOverlay: true,    // 加半透明背景遮罩
  closeWhenClickOutside: true,   // 點背景關閉
  animation: { type: 'dissolve', duration: 200, easing: 'ease-out' }
});

// Modal 內的確認按鈕導到結果頁
const confirmBtn = penpotUtils.findShape(s => s.name === 'Button/Confirm', modalBoard);
confirmBtn.addInteraction('click', {
  type: 'navigate-to',
  destination: successBoard,
  animation: { type: 'dissolve', duration: 300, easing: 'ease-in-out' }
});
```

#### After-delay 自動跳轉（Loading screen）
```javascript
// Loading screen 2秒後自動跳去 Home
const loadingBoard = penpotUtils.findShape(s => s.name === '00_Loading');
loadingBoard.addInteraction('after-delay', {
  type: 'navigate-to',
  destination: homeBoard,
  animation: { type: 'dissolve', duration: 500, easing: 'ease-in-out' }
}, 2000); // 2000ms delay
```

### 📋 Prototype Flow（老闆喺 View Mode 睇到的起點）

```javascript
// 建立 Flow — 定義 prototype 的起始 screen
const flow = penpot.currentPage.createFlow('Main User Journey', homeBoard);
// flow.name = 'Main User Journey'
// flow.startingBoard = homeBoard

// 睇現有 flows
const flows = penpot.currentPage.flows;
flows.forEach(f => console.log(f.name, f.startingBoard.name));
```

### 📐 Prototype 設計規範

**每個 Screen 必須有的互動：**

| Screen 類型 | 必備互動 |
|------------|--------|
| Onboarding / Loading | after-delay 自動跳轉 |
| 有 Button 的頁面 | click → navigate 或 open-overlay |
| 有 Form 的頁面 | Submit button → success/error screen |
| 有 Modal 的頁面 | open-overlay + closeWhenClickOutside |
| 有 Navigation 的頁面 | 每個 nav item → 對應 screen |

**Overlay Board 製作規範：**
```
Modal board 尺寸 = 內容大小（唔係全屏）
Modal 背景色 = #09090B, border-radius = 12px
帶 close button (×) 喺右上角
addBackgroundOverlay: true = Penpot 自動加遮罩
```

**Flow 命名規範：**
```
主流程: 'Main Flow'
登入流程: 'Auth Flow'  
設定流程: 'Settings Flow'
每個項目最多 3 個 flow（唔要 overcomplicate）
```

### ⚠️ Prototype 禁忌

| ❌ 錯誤 | ✅ 正確 |
|--------|--------|
| 每個 hover 都用 overlay | 只有複雜 hover state 才用 overlay，簡單 color 變化唔需要 |
| Prototype 唔建立 Flow | 必須建立 Flow，老闆先可以在 View Mode 按 Play 睇 |
| Navigate 唔加 animation | 加 animation 先有 app feel，唔加好突兀 |
| Modal 冇 closeWhenClickOutside | 用戶唔識關 modal，體驗差 |
| Back button 用 navigate-to | 用 previous-screen，保持返回 history |

---



### 🔴 Board 位置規則（強制 — 防止重疊）

> **問題：** 唔設 board.x/y 會導致所有 boards 堆喺 (0,0) 重疊。

**必須喺 createBoard() 之後立即設定位置：**
```javascript
// Desktop board — 固定喺 (0, 0)
const desktop = penpot.createBoard();
desktop.name = "Dashboard - Desktop";
desktop.resize(1440, 900);
desktop.x = 0;
desktop.y = 0;

// Mobile board — Desktop 右邊 + 80px 間距
const mobile = penpot.createBoard();
mobile.name = "Dashboard - Mobile";
mobile.resize(375, 812);
mobile.x = desktop.x + 1440 + 80;  // 1520
mobile.y = 0;

// Tablet board — Mobile 右邊 + 80px
const tablet = penpot.createBoard();
tablet.name = "Dashboard - Tablet";
tablet.resize(768, 1024);
tablet.x = mobile.x + 375 + 80;  // 1975
tablet.y = 0;
```

**永遠唔好省略 board.x 同 board.y。冇設 = 重疊 = 設計失敗。**

---
