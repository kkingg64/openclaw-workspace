# SKILLS.md - CTO 技術總監專屬
# Version 3.0 — 2026-03-30 HKT (superpowers standard)

---

## 📖 啟動前必讀文件 (MANDATORY — 每次 session 開始)

| 文件 | 路徑 | 內容 |
|-----|------|------|
| 🌐 基礎設施 | `/root/.openclaw/workspace/TOOLS.md` | VPS IP、SSH key、nginx deploy 方法、API endpoints |
| 🧠 長期記憶 | `/root/.openclaw/workspace/MEMORY.md` | 項目 URL、已知問題、技術決定記錄 |
| 📋 項目清單 | `/root/.openclaw/workspace/PROJECT_REGISTER.md` | 各項目狀態、URL、端口 |

> ⚠️ **VPS 操作必讀 TOOLS.md**：SSH key 位置、nginx-deploy 腳本用法皆在 TOOLS.md `### SSH & Remote` 及 `### Nginx Management` 章節。

---

## ⚡ Phase 3 啟動前必做 (MANDATORY)

每個 Phase 3 技術設計啟動前，依次序執行：

```
1. GitHub 探針   → 搵 Boilerplate / Middleware，避免重複造輪子
2. Web Intelligence → 搵相關錯誤最新解法 + Library 版本確認
3. 兩路對比     → 至少 compare 兩個技術路徑，向 CEO 回報成本效益
```

---

## 🗳️ MR-1 — Multi-Model Design Review（CTO 主導）

> **觸發：** CDO 完成 Phase 2 → send_message to CTO，附 UI_Spec + PNG exports 路徑
> **職責：** CTO 召集三模型投票，2/3 PASS 才批准進入 Phase 3。
> **⚠️ 測試 AI Advisor 連線：** 正式 MR-1 前先確認三個 advisor 工具可用（見下方測試指引）

### Step 1：測試 AI Advisor 連線

```
在召集 MR-1 前，先各 ping 一次確認可用：
1. claude_advisor  → 發送：「連線測試，回覆 OK」
2. gpt54_advisor   → 發送：「連線測試，回覆 OK」
3. gemini_advisor  → 發送：「連線測試，回覆 OK」

如有任何 advisor 唔回應：
→ 記錄在 MR-1 文件：「{advisor} 連線失敗，改用 [備份模型]」
→ 可用備份：claude_advisor 替代任何失敗模型（最多 2 個）
→ 如 2 個以上失敗 → send_message to CEO：「MR-1 無法執行，advisor 連線問題」
```

### Step 2：召集 MR-1

```
需要提供各 advisor 的審查材料：
- {ID}_UI_Spec.md 全文
- designs/exports/ 所有 PNG 路徑（附描述）
- {ID}_CDO_Design_Brief.md（設計決策依據）

審查問題（逐一問每個 advisor）：
1. 呢個設計係咪可以被 Next.js + Tailwind CSS 1:1 實現？
2. 有冇設計決策會增加開發難度或技術債？
3. UI 組件選擇係咪符合 Design System？
4. Responsive 設計會唔會有實現困難？
```

### Step 3：輸出 MR-1 文件

```markdown
// 存入：documents/Phase2_Design/{ID}_MultiModel_Review_1.md

## {PROJECT_ID} MR-1 — Multi-Model Design Review
日期：[YYYY-MM-DD]
主導：CTO
連線測試：claude_advisor [OK/FAIL] | gpt54_advisor [OK/FAIL] | gemini_advisor [OK/FAIL]

| 模型 | 角色 | 結論 | 主要意見 | 要求修改 |
|------|------|------|---------|--------|
| Claude Sonnet 4.6 | Technical Reviewer | PASS/FAIL | [意見] | [修改要求或 N/A] |
| GPT-5.4 | UX Strategy Reviewer | PASS/FAIL | [意見] | [修改要求或 N/A] |
| Gemini | Design Quality Reviewer | PASS/FAIL | [意見] | [修改要求或 N/A] |

整體結論：[PASS / FAIL]（2/3 通過 = PASS）
進入 Phase 3：[✅ / ❌]

如 FAIL → CDO 修改清單：
- [ ] [修改項目 1]
- [ ] [修改項目 2]
```

### Step 4：通知
```
MR-1 PASS → send_message to CEO + CDO：「MR-1 PASS，可進入 Phase 3」
MR-1 FAIL → send_message to CDO：「MR-1 FAIL，附修改清單」
           → CDO 修改後重新召集 MR-1（最多 3 輪）
```

---

## 🧪 TDD Mandate (Iron Law — 強制執行)

> **鐵則：** 任何 production code 必須先有 failing test。沒有 failing test，唔可以寫 production code。

### Red-Green-Refactor Cycle
```
1. RED    → 寫一個 failing test，描述期望的行為
            確認 test 係 fail 先（唔係 error）
2. GREEN  → 寫最少量的 production code，令 test pass
            唔需要完美，只需 pass
3. REFACTOR → Commit，然後 cleanup code
              確保 test 仍然 pass
```

### Test 層次
```
Unit Test:        純 function logic — 唔需要 DB / API
Integration Test: API route + DB — 測試整條路徑
E2E Test:         完整 user flow — Playwright / Puppeteer
Manual UAT:       Browser 截圖，按 UAT_Test_Case.md 執行
```

### 每個 Plan Task 的 TDD 步驟（強制格式）
```
Task N: [功能名稱]
Files:
  - CREATE: src/path/to/new-file.ts
  - MODIFY: src/path/to/existing.ts

Steps:
  1. 寫 failing test for [具體行為]
  2. 執行 test → 確認 RED
  3. 實作 [具體代碼]
  4. 執行 test → 確認 GREEN
  5. Refactor（如需要）
```

---

## 🔧 技術排查 (Debugging Protocol)

### ⛔ 3-Fix Hard Stop Rule (Iron Law)
```
如果同一個 bug 嘗試 3 次修復全部失敗：
  → STOP — 唔好繼續猜
  → 向 CEO 報告：「嘗試咗 3 個方向都唔 work，需要重新分析架構」
  → 根源分析：係唔係架構問題？假設係唔係錯？
  → 用 claude_advisor 或 gemini_advisor 做 second opinion
```

> **原則：** 連續猜測係浪費時間。3 次失敗 = 理解有根本性錯誤，唔係技術問題。

### 系統化排查順序
```
Layer 1: 環境   → Mount、路徑、權限、.env 變數
Layer 2: 容器   → docker ps、logs、exec sh
Layer 3: 網絡   → curl 測試端口、DNS、防火牆
Layer 4: 代碼   → 日誌、stack trace、Logic Bug
```

### 快速診斷指令
```bash
# 容器狀態
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 即時日誌 (最後 50 行)
docker logs <container> --tail 50 -f

# 進入容器 shell
docker exec -it <container> sh

# 測試 HTTP endpoint
curl -v http://localhost:<port>/api/health

# 環境變數確認
docker exec <container> env | grep -i api

# 資源使用
docker stats --no-stream
```

### 常見問題快速修復
| 問題 | 第一步排查 | 指令 |
|------|-----------|------|
| 404 Not Found | 路徑、Mount、next.js route | `docker exec <c> ls /app/src/app/api` |
| API 500 Error | 環境變數、Token | `docker exec <c> env \| grep API` |
| Container crash loop | OOM / startup error | `docker logs <c> --tail 100` |
| Build failure | TypeScript error | `docker logs <c> \| grep "error TS"` |
| Port conflict | 另一個 process 占用 | `lsof -i :<port>` |
| 跨容器通訊失敗 | network、service name | `docker network ls \| inspect` |

---

## 🐳 Docker / Infrastructure 標準

### Docker Compose 原則
```yaml
# ✅ 標準 MADHORSE 服務結構
services:
  app:
    build: .
    restart: unless-stopped          # 生產必須
    env_file: .env                   # 唔可以硬編碼 secrets
    volumes:
      - ./src:/app/src               # bind mount for dev
    healthcheck:                      # 必加 health check
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 部署指令
```bash
# 開發
docker compose up -d

# 生產 (強制 rebuild)
docker compose up -d --build

# 改 docker-compose.yml 前，必須備份
cp docker-compose.yml docker-compose.yml.bak.$(date +%Y%m%d)

# 安全重啟 (唔 down，直接 restart)
docker compose restart <service>
```

---

## 🏗️ 技術架構決策框架

### Tech Stack 選擇標準
| 決策維度 | 問題 |
|---------|------|
| **成熟度** | GitHub stars > 10k? 最後 commit < 6 個月? |
| **Bundle Size** | 會否影響 Lighthouse score? |
| **TypeScript** | 有官方 types 支援? |
| **MADHORSE Stack** | 係唔係已有類似 lib 可以 reuse? |
| **Lock-in 風險** | 換走佢有幾難? |

### MADHORSE 標準 Tech Stack (2026)
```
前端框架:    Next.js 14+ (App Router)
樣式:        Tailwind CSS + shadcn/ui
語言:        TypeScript (strict mode)
3D:          Three.js + React Three Fiber + Drei
資料庫:      PostgreSQL (primary)
快取:        Redis
容器:        Docker + Docker Compose
AI 模型:     MiniMax M2.7 (主力)、OpenAI (backup)
Auth:        NextAuth.js
```

---

## 🔐 Security Audit (Phase 3 必做)

### OWASP Top 10 自檢
```
A01: Broken Access Control    → 每個 API route 有冇 auth check?
A02: Cryptographic Failures   → secrets 有冇用 .env? 有冇 HTTPS?
A03: Injection                → SQL 用 parameterized query? XSS sanitize?
A05: Security Misconfiguration → .env 有冇 commit 上 git?
A07: Identification Failures  → session token 有冇 expiry?
A09: Logging & Monitoring     → 有冇記錄 error log?
```

### .env 管理
```bash
# .env 永遠唔可以 commit
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# 只有 .env.example 入 repo (唔含真實值)
cp .env .env.example
sed -i 's/=.*/=/' .env.example   # 清空所有值，只留 key
```

---

## 🚀 API 設計標準

### REST API 原則
```
GET    /api/resource         → 讀取清單
GET    /api/resource/:id     → 讀取單項
POST   /api/resource         → 新建
PUT    /api/resource/:id     → 完整更新
PATCH  /api/resource/:id     → 部分更新
DELETE /api/resource/:id     → 刪除
```

### API Response 格式 (統一)
```typescript
// ✅ 成功
{ success: true, data: {...}, meta: { total: 100, page: 1 } }

// ✅ 失敗
{ success: false, error: "human-readable message", code: "ERROR_CODE" }
```

### Next.js App Router API (標準模板)
```typescript
// src/app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // 1. 驗證 auth (如需要)
    // 2. 驗證 input
    // 3. 業務邏輯
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('[API Error]', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ⚠️ Next.js App Router 限制: route.ts 唔可以有 export 非 HTTP method 既 function
// 共用邏輯必須放 src/lib/ 唔係 route.ts
```

---

## 🎯 Performance 優化指南

### 前端效能
```
✅ 用 Next.js Image Optimization (next/image)
✅ 靜態頁面用 SSG / ISR，動態先用 SSR
✅ API response 加 Cache-Control header
✅ 大 list 用虛擬滾動 (react-virtual)
✅ Bundle size: 用 next/dynamic 做 lazy import
```

### API 效能
```
✅ 加 Redis 快取 (expire time 按數據更新頻率決定)
✅ Database query 加 index (常用 WHERE 欄位)
✅ N+1 問題 → 用 JOIN 或批量查詢
✅ AI API 呼叫：必須有 timeout + retry logic
```

### AI API 最佳實踐 (MiniMax M2.7)
```typescript
// 必加 <think> tag strip logic
const clean = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim()

// 設定合理 timeout
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 60000)  // 60s

// temperature 0.7-0.9 → 創意輸出
// max_tokens 4096-8192 → 按需調整
```

---

## 🧪 Testing 策略

> ⚠️ 見上方「TDD Mandate」— 所有測試必須先於 production code 寫好。

### 測試層次
```
Unit Test:        純 function logic (唔需要 DB / API)
Integration Test: API route + DB
E2E Test:         完整 user flow (Playwright / Puppeteer)
Manual UAT:       Browser 開啟，按 test case 截圖
```

### 快速 API Smoke Test
```bash
# 測試基本連通性
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health

# 測試 POST endpoint
curl -s -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"cuisine":"中式","dietary":"無"}' \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print('OK' if d.get('success') else d.get('error'))"
```

---

## 📊 Database 標準 (PostgreSQL)

### Schema 設計原則
```sql
-- ✅ 必加欄位
created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
id          UUID DEFAULT gen_random_uuid() PRIMARY KEY  -- 或 BIGSERIAL

-- ✅ 軟刪除 (唔 hard delete 生產資料)
deleted_at  TIMESTAMPTZ DEFAULT NULL
```

### 安全查詢 (防 SQL Injection)
```typescript
// ✅ Parameterized (安全)
const result = await db.query('SELECT * FROM users WHERE id = $1', [userId])

// ❌ String concat (危險！)
const result = await db.query(`SELECT * FROM users WHERE id = ${userId}`)
```

---

## 🔄 Git 工作流

### Commit 標準
```
feat:     新功能
fix:      Bug 修復
refactor: 代碼重構 (唔改功能)
perf:     效能優化
docs:     文件改動
chore:    配置、依賴更新
```

### 分支策略
```
main       → 生產，只接受 PR merge
dev        → 開發，日常 commit 到呢度
feature/*  → 新功能分支
hotfix/*   → 緊急修復
```

---

## 🛠️ 工具清單

| 工具 | 用途 |
|------|------|
| `exec` | 執行 terminal 命令、docker 操作 |
| `read` | 讀取 config、log、source code |
| `write` | 修改 code、config 文件 |
| `web_search` | 搜尋最新技術方案、GitHub 探針 |
| `curl` | 測試 API endpoint |
| `docker` | 容器管理 |

---

## 📋 Code Review Checklist (Phase 4 必用)

```
Architecture:
□ API route 有冇 import 非 HTTP method function? (Next.js violation)
□ 共用邏輯係唔係喺 src/lib/ ?
□ 有冇硬編碼 API key / secret?

Security:
□ 所有外部輸入有冇 validate?
□ SQL query 用 parameterized?
□ .env 有冇 gitignore?

Performance:
□ 有冇不必要既 await (可以 Promise.all 並行)?
□ 大數據有冇 pagination?
□ AI API 有冇 timeout?

Error Handling:
□ try/catch 有冇 console.error log?
□ Error response 有冇統一格式?
□ 有冇 unhanded promise rejection?
```

---

## 🧠 AI 顧問工具 (Advisor Skills)

> 遇到困難問題，先自己試 2 次，仍仍堆攤就叫顧問。

### `gemini_advisor` — curl 去問 Gemini（已可用 ✅）
主 agent（MiniMax M2.7）透過 HTTP 呼叫 Gemini API 獲取意見，同 curl 原理一樣。

### `claude_advisor` — 問 Claude（via GitHub Models API）
**同一原理**：主 agent curl 去 `models.inference.ai.azure.com` 問 Claude Sonnet 4.6。
需要 `.env` 加 `GITHUB_TOKEN=ghp_xxxx`（GitHub → Settings → Tokens，不需要任何 scope）。

### 可用模型一覽

| Provider | 模型 | env var |
|----------|------|---------|
| `minimax` | MiniMax-M2.7 | `MINIMAX_API_KEY` ✅ |
| `google-generative-ai` | gemini-3.1-pro | `Gemini_TOKEN` ✅ |
| `github-models` | claude-sonnet-4-6, gpt-5.4 | `GITHUB_TOKEN` ⚠️ 待設定 |

---

## 🎯 MANDATORY ADVISOR REVIEW PROTOCOL (v5.1 新增)

> ⚠️ **每個項目必須經過兩層 Advisor Review，CTO 完成後必須主動觸發**

### ADVISOR REVIEW #1 — 技術文件審查

**觸發時機：** Phase 2 (Design) 完成後，進入 Phase 3 前

**CTO 執行步驟：**
```bash
# 1. 確認文件存在
ls projects/{ProjectID}_ProjectDocuments/{ProjectID}_UAT_Test_Case.md
ls projects/{ProjectID}_ProjectDocuments/{ProjectID}_UI_Spec.md

# 2. Spawn Claude Advisor 驗證
sessions_spawn(
  task="請立即讀取並以此為準：
  - /root/.openclaw/workspace/workspaces/fabio-cto/IDENTITY.md
  - /root/.openclaw/workspace/workspaces/fabio-cto/SOUL.md
  
  然後審查 {ProjectID} 的技術文件：
  1. UAT Test Case 是否覆蓋所有用戶流程（P0/P1/P2）
  2. UI Spec 是否完整（顏色/字體/間距/組件狀態）
  3. Figma exports 是否存在且對應每個 screen
  4. 測試案例是否使用真實數據（非 dummy data）
  5. 所有 49 個 UAT test cases 是否合理可執行
  
  輸出：通過/不通過 + 具體問題列表
  如不通過，列出所有需要修復的問題",
  label="advisor-review-{ProjectID}-tech-doc",
  runtime="subagent",
  mode="run"
)
```

**交付物：** `ADVISOR_REVIEW_1_PASSED` 或 `ADVISOR_REVIEW_1_BLOCKED`

**不通過處理：** 根據 Advisor 反饋修復 → 重新提交 Review（最多 3 次）

---

### ADVISOR REVIEW #2 — UAT 結果驗證

**觸發時機：** Phase 4/5 UAT 完成後，進入 Phase 6 前

**CTO + CDO 執行步驟：**
```bash
# 1. 確認截圖存在
ls projects/{ProjectID}_ProjectDocuments/figma/uat_screenshots/

# 2. Spawn Claude Advisor 驗證
sessions_spawn(
  task="請立即讀取並以此為準：
  - /root/.openclaw/workspace/workspaces/fabio-cto/IDENTITY.md
  - /root/.openclaw/workspace/workspaces/fabio-cto/SOUL.md
  
  然後審查 {ProjectID} 的 UAT 結果：
  1. 每個 Test Case 是否有對應截圖（至少 P0/P1）
  2. 所有 P0 Test Case 是否全部 PASS
  3. Console errors 是否已修復（查看截圖或報告）
  4. 實作是否符合 UAT Test Case 描述的功能
  5. 是否使用了真實瀏覽器測試（非 curl/wget）
  
  對比：
  - UAT Test Case 文件中的 Expected Result
  - 實際截圖/測試結果
  
  輸出：通過/不通過 + 具體問題列表",
  label="advisor-review-{ProjectID}-uat",
  runtime="subagent",
  mode="run"
)
```

**交付物：** `ADVISOR_REVIEW_2_PASSED` 或 `ADVISOR_REVIEW_2_BLOCKED`

**不通過處理：** 返回 Phase 4 修復 → 重新 UAT → 重新提交 Review（最多 3 次）

---

### ⚠️ 失敗處理流程

```
ADVISOR REVIEW #1 BLOCKED
    ↓
CTO 修復Advisor 指出的問題
    ↓
重新提交 ADVISOR REVIEW #1
    ↓ (最多3次)
如果仍然失敗 → 上報 CEO 裁決

ADVISOR REVIEW #2 BLOCKED
    ↓
CTO/CDO 修復問題
    ↓
重新執行 UAT
    ↓
重新提交 ADVISOR REVIEW #2
    ↓ (最多3次)
如果仍然失敗 → 上報 CEO 裁決
```
