# OpenClaw Browser Tool 教學指南

> 📅 **建立日期:** 2026-03-09
> 👤 **作者:** CTO (Fabio 技術總監)
> 🎯 **用途:** MADHORSE Ltd. 內部培訓

---

## 📋 目錄

1. [概述](#1-概述)
2. [Browser 簡介](#2-browser-簡介)
3. [快速開始](#3-快速開始)
4. [核心功能](#4-核心功能)
5. [Action 詳解](#5-action-詳解)
6. [Snapshot 與 Refs](#6-snapshot-與-refs)
7. [實際操作範例](#7-實際操作範例)
8. [常見問題與限制](#8-常見問題與限制)
9. [配置選項](#9-配置選項)
10. [安全考量](#10-安全考量)

---

## 1. 概述

OpenClaw Browser Tool 係一個 Agent 專用既隔離瀏覽器，允許 AI Agent 進行網頁自動化操作。

**特點：**
- 🔒 **隔離性** - 獨立既 Chrome/Brave/Edge/Chromium profile，唔會影響你既個人瀏覽器
- 🎯 **精準定位** - 通過 ref (如 `e12`) 定位元素，唔使用脆弱既 CSS selector
- 📸 **多功能** - 支援 snapshot、screenshot、click、type、navigate 等
- 🔧 **可配置** - 支援 multiple profiles、headless mode、remote CDP

---

## 2. Browser 簡介

### 兩種模式

| Profile | 描述 |
|---------|------|
| `openclaw` | OpenClaw 管理既隔離瀏覽器（無需 Extension） |
| `chrome` | 使用你既現有 Chrome（需要 OpenClaw Extension relay） |

### 系統要求

- **瀏覽器:** Chrome / Brave / Edge / Chromium (其一即可)
- **作業系統:** macOS / Linux / Windows
- **網路:** Loopback only (預設)

---

## 3. 快速開始

### 3.1 檢查 Browser 狀態

```bash
openclaw browser status
```

### 3.2 啟動 Browser

```bash
openclaw browser start
```

### 3.3 打開網頁

```bash
openclaw browser open https://example.com
```

### 3.4 獲取頁面 Snapshot

```bash
openclaw browser snapshot
```

### 3.5 截圖

```bash
# 普通截圖
openclaw browser screenshot

# 完整頁面截圖
openclaw browser screenshot --full-page
```

---

## 4. 核心功能

### 4.1 Navigation (導航)

| Action | 描述 | 範例 |
|--------|------|------|
| `open` | 打開新分頁 | `openclaw browser open https://example.com` |
| `navigate` | 導航到 URL | `openclaw browser navigate https://example.com` |
| `focus` | 切換到指定分頁 | `openclaw browser focus <targetId>` |
| `close` | 關閉分頁 | `openclaw browser close <targetId>` |

### 4.2 Inspection (檢視)

| Action | 描述 | 範例 |
|--------|------|------|
| `snapshot` | 獲取頁面 UI tree | `openclaw browser snapshot` |
| `screenshot` | 截圖 | `openclaw browser screenshot` |
| `tabs` | 列出所有分頁 | `openclaw browser tabs` |
| `console` | 查看 Console 訊息 | `openclaw browser console --level error` |
| `errors` | 查看 JavaScript 錯誤 | `openclaw browser errors` |

### 4.3 Actions (操作)

| Action | 描述 | 範例 |
|--------|------|------|
| `click` | 點擊元素 | `openclaw browser click e12` |
| `type` | 輸入文字 | `openclaw browser type e5 "hello world"` |
| `press` | 按鍵 | `openclaw browser press Enter` |
| `hover` | 懸停 | `openclaw browser hover e44` |
| `fill` | 填寫表單 | `openclaw browser fill --fields '[{"ref":"1","type":"text","value":"Ada"}]'` |
| `select` | 選擇選項 | `openclaw browser select e9 OptionA OptionB` |
| `wait` | 等待條件 | `openclaw browser wait --text "Done"` |

### 4.4 State Management (狀態管理)

| Action | 描述 | 範例 |
|--------|------|------|
| `cookies` | 查看 Cookie | `openclaw browser cookies` |
| `cookies set` | 設置 Cookie | `openclaw browser cookies set session abc123 --url "https://example.com"` |
| `storage` | 查看 Storage | `openclaw browser storage local get` |
| `set offline` | 離線模式 | `openclaw browser set offline on` |
| `set headers` | 自定義 Headers | `openclaw browser set headers --headers-json '{"X-Debug":"1"}'` |
| `set geo` | 模擬地理位置 | `openclaw browser set geo 37.7749 -122.4194` |

---

## 5. Action 詳解

### 5.1 Click

```bash
# 點擊 ref e12
openclaw browser click e12

# 雙擊
openclaw browser click e12 --double
```

### 5.2 Type

```bash
# 輸入文字
openclaw browser type e5 "Hello World"

# 輸入後 Submit
openclaw browser type e5 "Hello World" --submit
```

### 5.3 Press

```bash
# 按 Enter
openclaw browser press Enter

# 其他常用鍵: Escape, ArrowDown, ArrowUp, Tab, etc.
openclaw browser press Escape
```

### 5.4 Wait

```bash
# 等待文字出現
openclaw browser wait --text "Done"

# 等待 URL 匹配
openclaw browser wait --url "**/dash"

# 等待 load state
openclaw browser wait --load networkidle

# 等待 JS 條件
openclaw browser wait --fn "window.ready===true"

# 組合條件
openclaw browser wait "#main" --url "**/dash" --load networkidle --timeout-ms 15000
```

---

## 6. Snapshot 與 Refs

### Snapshot 格式

**AI Format (default):**
```
- generic [ref=2]:
  - heading "Example Domain" [level=1] [ref=3]
  - paragraph [ref=4]: This domain is for use...
```

**Interactive Format (role-based):**
```bash
openclaw browser snapshot --interactive
```

輸出：
```
- link "Gmail" [ref=e1]
- button "Search" [ref=e5]
- combobox "Search" [ref=e6]
```

### Ref 類型

| 格式 | 範例 | 用途 |
|------|------|------|
| Numeric | `12` | AI snapshot 使用 |
| Role | `e12` | Interactive snapshot 使用（推薦） |

### 重要提醒

> ⚠️ **Refs 唔穩定！** 每次 navigation 後都要重新 snapshot，因為 ref 可能會變。

---

## 7. 實際操作範例

### 範例 1: 打開網頁並截圖

```bash
# 1. 啟動瀏覽器
openclaw browser start

# 2. 打開網頁
openclaw browser open https://example.com

# 3. 截圖
openclaw browser screenshot
```

### 範例 2: 搜索並點擊

```bash
# 1. 打開 Google
openclaw browser open https://www.google.com

# 2. 獲取 snapshot 搵到 search box 既 ref
openclaw browser snapshot --interactive

# 3. 輸入文字
openclaw browser type e5 "OpenClaw Browser" --submit

# 4. 點擊搜尋結果 (需要先 snapshot)
openclaw browser snapshot
# 假設結果既 link ref 係 e15
openclaw browser click e15
```

### 範例 3: 填寫表單

```bash
# 1. 打開表單頁面
openclaw browser open https://example.com/form

# 2. 獲取表單元素 refs
openclaw browser snapshot --interactive

# 3. 填寫多個欄位 (使用 fill)
openclaw browser fill --fields '[
  {"ref": "e5", "type": "text", "value": "John Doe"},
  {"ref": "e6", "type": "text", "value": "john@example.com"}
]'

# 4. 點擊提交
openclaw browser click e10
```

### 範例 4: Debug Workflow

當 Action 失敗既時候：

```bash
# 1. 重新獲取 snapshot
openclaw browser snapshot --interactive

# 2. Highlight 問題元素
openclaw browser highlight e12

# 3. 查看 Console 錯誤
openclaw browser console --level error

# 4. 查看 Network 請求
openclaw browser requests --filter api

# 5. 錄製 Trace
openclaw browser trace start
# ... 重現問題 ...
openclaw browser trace stop
```

---

## 8. 常見問題與限制

### 8.1 常見錯誤

| Error | 原因 | 解決方案 |
|-------|------|----------|
| `No supported browser found` | 無 Chromium-based 瀏覽器 | 安裝 Chrome/Brave/Edge/Chromium |
| `Running as root without --no-sandbox` | Container/VM 環境 | 設置 `browser.noSandbox: true` |
| `Missing X server` | 無 Display | 設置 `browser.headless: true` |
| `Timeout exceeded` | 元素未出現 | 使用 `wait` 命令 |
| `Strict mode violation` | 多個匹配元素 | 使用更精確既 ref 或 `snapshot --interactive` |

### 8.2 已知限制

1. **Refs 不穩定** - 每次 navigation 需要重新 snapshot
2. **No CSS Selectors** - 只支援 ref 定位（ intentional design）
3. **reCAPTCHA** - 會阻擋自動化操作
4. **登入狀態** - 每次重啟會 reset（可用 cookies 保持）
5. **Headless 限制** - 某些網站會檢測並阻擋

### 8.3 Headless Mode

如果無 GUI 环境，需要 headless mode：

```json
{
  "browser": {
    "enabled": true,
    "headless": true,
    "noSandbox": true
  }
}
```

---

## 9. 配置選項

### 9.1 基本配置

```json
{
  "browser": {
    "enabled": true,
    "headless": false,
    "noSandbox": false,
    "defaultProfile": "openclaw"
  }
}
```

### 9.2 多 Profile 配置

```json
{
  "browser": {
    "profiles": {
      "openclaw": { "cdpPort": 18800, "color": "#FF4500" },
      "work": { "cdpPort": 18801, "color": "#0066CC" },
      "remote": { "cdpUrl": "http://10.0.0.42:9222", "color": "#00AA00" }
    }
  }
}
```

### 9.3 遠程 CDP (Browserless/Browserbase)

**Browserless:**
```json
{
  "browser": {
    "profiles": {
      "browserless": {
        "cdpUrl": "https://production-sfo.browserless.io?token=<YOUR_API_KEY>",
        "color": "#00AA00"
      }
    }
  }
}
```

**Browserbase:**
```json
{
  "browser": {
    "profiles": {
      "browserbase": {
        "cdpUrl": "wss://connect.browserbase.com?apiKey=<YOUR_API_KEY>",
        "color": "#F97316"
      }
    }
  }
}
```

---

## 10. 安全考量

### 10.1 隔離保證

- 🔒 **獨立 User Data Dir** - 唔會影響你既個人瀏覽器
- 🔒 **專用 Ports** - 避免同開發工具衝突
- 🔒 **Deterministic Tab Control** - 用 targetId 而唔係 "last tab"

### 10.2 私隱建議

- 🌐 **保持 Gateway 私有** - 只用 loopback 或 VPN
- 🔑 **Remote CDP 要保護** - 用 HTTPS/WSS 同埋短暫 tokens
- 🍪 **敏感資料** - browser profile 可能包含登入 session，要當作敏感處理

### 10.3 SSRF 防護

```json
{
  "browser": {
    "ssrfPolicy": {
      "dangerouslyAllowPrivateNetwork": false,
      "hostnameAllowlist": ["*.example.com", "example.com"]
    }
  }
}
```

---

## 📚 延伸閱讀

- [OpenClaw Browser Docs](https://docs.openclaw.ai/tools/browser)
- [Chrome Extension Setup](https://docs.openclaw.ai/tools/chrome-extension)
- [Browser Login + X/Twitter](https://docs.openclaw.ai/tools/browser-login)
- [Browser Troubleshooting](https://docs.openclaw.ai/tools/browser-linux-troubleshooting)

---

## ✅ 常用指令速查表

```bash
# 基礎操作
openclaw browser status
openclaw browser start
openclaw browser stop
openclaw browser open <url>
openclaw browser snapshot
openclaw browser screenshot

# 互動操作
openclaw browser click <ref>
openclaw browser type <ref> "<text>" --submit
openclaw browser press <key>
openclaw browser hover <ref>
openclaw browser fill --fields '[...]'

# 等待
openclaw browser wait --text "<text>"
openclaw browser wait --url "<pattern>"
openclaw browser wait --load <state>

# 調試
openclaw browser highlight <ref>
openclaw browser console --level error
openclaw browser errors
openclaw browser trace start
openclaw browser trace stop
```

---

*Generated by CTO - 2026-03-09*
