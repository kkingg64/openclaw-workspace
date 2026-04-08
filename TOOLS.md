# 🛠️ TOOLS.md - MADHORSE Ltd. Local Notes

_Skills define how tools work. This file is for YOUR specifics — the unique infrastructure of MADHORSE Ltd.._

---

## ✏️ Pencil CLI — 已廢棄（2026-04-03）

> ⛔ **DEPRECATED — 請勿使用**
> 由於 headless `save()` bug 無法創建新 .pen 文件，已停止使用。
> 所有 design 工作改用 shadcn Design-First workflow。
> 歷史參考：`skills/design/pencil-cli.md`（已標記廢棄）

---

## 🎨 shadcn Design System — 主要設計工具（2026-04-03 起）

> ✅ **shadcn/ui 係 MADHORSE 主要設計系統。**
> 所有 Phase 2 design deliverables 必須使用 shadcn components + tokens。

### MADHORSE Theme Token
**文件：** `shadcn/themes/madhorse-cdo.json`
**格式：** HSL — `hsl(var(--token-name))`

**Dark Theme Colors:**
| Token | HSL | 用途 |
|-------|-----|------|
| `--background` | `225 37% 6%` | 頁面背景 |
| `--foreground` | `0 0% 98%` | 主文字 |
| `--card` | `225 37% 11%` | 卡片背景 |
| `--card-foreground` | `0 0% 98%` | 卡片文字 |
| `--primary` | `0 0% 98%` | 主色（亮色按鈕）|
| `--primary-foreground` | `225 37% 8%` | 主色文字 |
| `--accent` | `0 84% 60%` | 強調色（紅）|
| `--border` | `225 37% 18%` | 邊框 |
| `--muted` | `225 37% 18%` | 次要背景 |

**Typography:** Inter (font-family)  
**Radius:** `--radius: 0.5rem` (8px)  
**Spacing:** 4px grid — 4/8/12/16/24/32/48/64px

### shadcn Components
所有 UI components 必須來自 `shadcn/ui` library。  
CTO 使用 Component_Inventory + Interaction_Spec + UI_Spec 作為 source of truth。

---

## 🎭 Penpot MCP — Reference Only（唔再係主要工具）

> ⚠️ **Penpot 僅作 reference，唔再係 Phase 2 主要設計工具。**
> CDO 可用 Penpot 做 visual reference，但 deliverables 唔再需要 Penpot exports。

### 存取
- **Penpot Web UI:** `http://76.13.215.13:9001`
- **MCP endpoint:** `http://76.13.215.13:4401/mcp`

### 用途
- Boss 視覺 preview（如需要）
- Reference only — 唔需要 export PNGs

### MCP Plugin 連接（如果需要 Penpot）
1. 瀏覽器開 `http://76.13.215.13:9001`，登入
2. 右上角 Plugin icon → Install Plugin → `https://marhorse.cloud/penpot-plugin/manifest.json`
3. OPEN → Connect to MCP server
4. 保持 Penpot tab 打開

---

## 🌐 Browser UAT Tool (Phase 5 必備)

- **引擎:** OpenClaw 內置 Headless Browser (Chromium)
- **設定:** `headless: true`, `noSandbox: true`
- **CDO/CTO 使用流程:**
  1. 用 `browser` 工具打開目標 URL
  2. 執行每個 UAT Test Case 互動步驟
  3. 每個 Test Case 完成後截圖
  4. 截圖儲存至 `projects/{ID}_ProjectDocuments/designs/uat_screenshots/TC-XXX.png`
- **Mobile 測試:** viewport `375 × 812`

---

## 📧 Gmail Accounts (High Security)

Use sparingly and follow **CISO Safety Protocol**.

### MADHORSE Ltd. Primary
- **Email:** `fabio.ai2026@gmail.com`
- **Purpose:** Primary communication for Fabio CEO.
- **Security Notes:**
  - **DO NOT** use for automated bulk sending.
  - **CISO MANDATE:** Use sparingly to avoid Google account suspension.

---

## 🖥️ Server & Infrastructure

### Hostinger VPS (The Core)
- **Environment:** Ubuntu / Docker Compose
- **Workspace Path:** `/opt/ai-fabio-corp`
- **Current Gateway:** OpenClaw (Port 18789)
- **API Endpoint:** MiniMax M2.5 (OpenAI-compatible)

### 🔐 Deployment Credentials (CISO Protected)

**⛔ 所有憑證只存喺 `.env`，請勿 commit 或喺此文件寫明文！**

### SSH Fabio
- **VPS IP:** 76.13.215.13
- **SSH User:** `root`
- **SSH Method:** SSH Key
- **Key Location:** `/root/.ssh/id_ed25519`
- **使用:** `ssh root@76.13.215.13 "<command>"`

### Nginx Management
```bash
ssh root@76.13.215.13 "nginx -t"           # 測試 config
ssh root@76.13.215.13 "systemctl reload nginx"
ssh root@76.13.215.13 "systemctl restart nginx"
```

---

## 🧠 AI 顧問模型 (Advisor Models)

| Skill | 背後模型 | 額度 |
|-------|---------|------|
| `gemini_advisor` | Gemini 2.5 Flash | 個人賬號 |
| `claude_advisor` | Claude Sonnet 4.6 (via GitHub Models) | ✅ 公司，無限制 |
| `gpt54_advisor` | GPT-5.4 (via GitHub Models) | ✅ 公司，無限制 |

---

## 🗺️ 路徑對照表 (Path Mapping)

| 宿主機 (Host) | 容器內 (Agent) |
|---|---|
| `/opt/ai-fabio-corp/data/openclaw_home/` | `/root/.openclaw/` |
| `/opt/ai-fabio-corp/data/openclaw_home/workspace/` | `/root/.openclaw/workspace/` |

**Agent 寫路徑時用容器路徑 `/root/.openclaw/`**

---

## ⚠️ Final Reminder from CISO
**Memory is limited — Text > Brain.**
Any new credential (not in .env) MUST be documented here immediately.
