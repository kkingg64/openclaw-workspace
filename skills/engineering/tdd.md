# TDD Mandate (Iron Law)

> 任何 production code 必須先有 failing test。沒有 failing test，唔可以寫 production code。

## Red-Green-Refactor Cycle
```
1. RED    → 寫 failing test，描述期望行為。確認 fail（唔係 error）
2. GREEN  → 寫最少量 production code，令 test pass
3. REFACTOR → Commit，cleanup code，確保 test 仍 pass
```

## Test 層次
| Layer | 用途 | 需要 DB/API? |
|-------|------|-------------|
| Unit Test | 純 function logic | 唔需要 |
| Integration Test | API route + DB | 需要 |
| E2E Test | 完整 user flow | Playwright/Puppeteer |
| Manual UAT | Browser 截圖 | 按 UAT_Test_Case.md |

## 每個 Plan Task 格式（強制）
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

## 快速 API Smoke Test
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health
```
