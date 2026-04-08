# Penpot MCP API Reference — DEPRECATED (2026-04-03)

> ⚠️ **DEPRECATED — Reference only**
> Penpot MCP 不再是主要設計工具。僅作歷史參考。

## Architecture
```
CDO (LLM) → HTTP POST http://76.13.215.13:4401/mcp → MCP Server
→ WebSocket ws://76.13.215.13:4402 → Penpot Plugin → Canvas
```

CDO 只用 HTTP (4401)，Plugin 用 WebSocket (4402)。兩條獨立。

## MCP Tools
| Tool | 功能 |
|------|------|
| `execute_code` | 執行 Penpot Plugin API |
| `high_level_overview` | 取得 File 結構 |
| `penpot_api_info` | 查詢 API Type |
| `export_shape` | 匯出 PNG/SVG |
| `import_image` | 匯入圖片 |

## 🔴 Null Check（最高優先）

`penpot.createText()` **必須傳字串參數**，否則返回 null！
```javascript
const text = penpot.createText("Dashboard");  // ✅
// penpot.createText()  // ❌ → null
if (!text) return { error: "createText returned null", halt: true };
```

## 🔴 跨 Call 變數失效

每個 `execute_code` 係獨立 scope。解決方案：
```javascript
// 方案 1: storage
storage.board = board;  // Call 1
const board = storage.board;  // Call 2

// 方案 2: findShape
const board = penpotUtils.findShape(s => s.name === "Dashboard");

// 方案 3: 一個 Call 做晒
```

## Core API
```javascript
// Page
penpot.createPage(); penpot.openPage(page);

// Board
const board = penpot.createBoard();
board.name = "Home"; board.resize(1440, 900);

// Text — 必須傳字串！
const text = penpot.createText("Welcome");
text.fontSize = 48; text.fontFamily = "Inter";
text.fills = [{ fillColor: "#FFFFFF", fillOpacity: 1 }];

// Rectangle
const rect = penpot.createRectangle();
rect.resize(200, 60); rect.borderRadius = 8;
rect.fills = [{ fillColor: "#2DD4BF", fillOpacity: 1 }];

// Layout
const flex = board.addFlexLayout();
flex.dir = "column"; flex.rowGap = 16; flex.padding = 24;

// Export
const png = await shape.export({ type: "png", scale: 2 });

// CSS/HTML
const css = penpot.generateStyle([shape], { type: "css" });

// Search
const allTexts = penpotUtils.findShapes(s => s.type === 'text');
```

## Board 位置規則（防重疊）
```javascript
desktop.x = 0; desktop.y = 0;
mobile.x = 1520; mobile.y = 0;  // desktop.x + 1440 + 80
```

## Prototype API
```javascript
// Navigate
shape.addInteraction('click', {
  type: 'navigate-to', destination: targetBoard,
  animation: { type: 'push', direction: 'left', duration: 300 }
});
// Overlay
shape.addInteraction('click', {
  type: 'open-overlay', destination: modalBoard,
  position: 'center', addBackgroundOverlay: true, closeWhenClickOutside: true
});
// Previous
shape.addInteraction('click', { type: 'previous-screen' });
// Flow
penpot.currentPage.createFlow('Main Flow', homeBoard);
```

## 自我驗收代碼（設計完必跑）
```javascript
const rootChildren = Array.from(penpot.root.children || []);
const orphans = rootChildren.filter(s => s.type !== 'board');
const boards = rootChildren.filter(s => s.type === 'board');
return {
  orphanCount: orphans.length,     // 必須 0
  emptyBoards: boards.filter(b => !(b.children || []).length).map(b => b.name),  // 必須 []
  boardCount: boards.length        // ≥ 1
};
```

## Debug — 永遠睇 Log
```bash
ssh root@76.13.215.13 "journalctl -u penpot-mcp -n 50 --no-pager | grep -E 'INFO|ERROR|Task|complet'"
```

## Headless Browser Service
```bash
ssh root@76.13.215.13 "systemctl status penpot-browser"
ssh root@76.13.215.13 "systemctl restart penpot-browser"  # 斷線時
```
