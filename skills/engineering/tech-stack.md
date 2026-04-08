# Tech Stack, API & Database Standards

## REST API 原則
```
GET    /api/resource         → list
GET    /api/resource/:id     → read
POST   /api/resource         → create
PUT    /api/resource/:id     → full update
PATCH  /api/resource/:id     → partial update
DELETE /api/resource/:id     → delete
```

## API Response 格式（統一）
```typescript
// 成功
{ success: true, data: {...}, meta: { total: 100, page: 1 } }
// 失敗
{ success: false, error: "human-readable message", code: "ERROR_CODE" }
```

## Next.js App Router API Template
```typescript
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('[API Error]', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
// ⚠️ route.ts 唔可以 export 非 HTTP method function
// 共用邏輯放 src/lib/
```

## Database (PostgreSQL)
```sql
-- 必加欄位
created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
id          UUID DEFAULT gen_random_uuid() PRIMARY KEY
deleted_at  TIMESTAMPTZ DEFAULT NULL  -- 軟刪除
```

```typescript
// ✅ Parameterized (安全)
await db.query('SELECT * FROM users WHERE id = $1', [userId])
// ❌ String concat (危險！)
await db.query(`SELECT * FROM users WHERE id = ${userId}`)
```

## Performance
```
前端：next/image, SSG/ISR, Cache-Control, react-virtual, next/dynamic
API：Redis cache, DB index, JOIN 代替 N+1, AI API timeout+retry
AI API：strip <think> tags, AbortController timeout 60s
```

## Git Workflow
```
Commit: feat: / fix: / refactor: / perf: / docs: / chore:
Branch: main (prod) / dev (daily) / feature/* / hotfix/*
```

## OWASP Top 10 Self-Check (Phase 3)
```
A01: 每個 API route 有 auth check?
A02: secrets 用 .env? HTTPS?
A03: SQL parameterized? XSS sanitize?
A05: .env 有 commit 上 git?
A07: session token 有 expiry?
A09: 有 error log?
```

## Advisor Review Protocol
### Review #1 — 技術文件審查 (Phase 2→3)
```bash
sessions_spawn(task="審查 UAT Test Case + UI Spec 完整性")
```
### Review #2 — UAT 結果驗證 (Phase 4/5→6)
```bash
sessions_spawn(task="對比 UAT Test Case vs 截圖結果")
```
Max 3 rounds。仍失敗 → 上報 CEO。
