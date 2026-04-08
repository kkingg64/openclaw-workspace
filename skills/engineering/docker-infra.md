# Docker & Infrastructure Standards

## Docker Compose 原則
```yaml
services:
  app:
    build: .
    restart: unless-stopped
    env_file: .env                   # 唔可以硬編碼 secrets
    volumes:
      - ./src:/app/src
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 部署指令
```bash
docker compose up -d              # 開發
docker compose up -d --build      # 生產（強制 rebuild）
cp docker-compose.yml docker-compose.yml.bak.$(date +%Y%m%d)  # 改之前備份
docker compose restart <service>  # 安全重啟
```

## MADHORSE 標準 Tech Stack (2026)
```
前端:     Next.js 14+ (App Router)
樣式:     Tailwind CSS + shadcn/ui
語言:     TypeScript (strict mode)
3D:       Three.js + React Three Fiber + Drei
資料庫:   PostgreSQL (primary)
快取:     Redis
容器:     Docker + Docker Compose
AI:       MiniMax M2.7 (主力), OpenAI (backup)
Auth:     NextAuth.js
```

## Tech Stack 選擇標準
| 維度 | 問題 |
|------|------|
| 成熟度 | Stars > 10k? 最後 commit < 6 個月? |
| Bundle Size | 影響 Lighthouse? |
| TypeScript | 官方 types 支援? |
| Lock-in | 換走有幾難? |

## Phase 3 啟動前（強制）
```
1. GitHub 探針 → Boilerplate / Middleware
2. Web Intelligence → 最新解法 + 版本確認
3. 兩路對比 → 至少 2 個技術路徑向 CEO 回報
```
