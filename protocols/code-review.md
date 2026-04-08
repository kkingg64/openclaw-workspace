# Code Review Protocol

## Two-Stage Review (Phase 4 每個 task 完成後)

### Stage 1: Spec Compliance
- 實現 vs Technical Spec 逐項對比
- Missing requirements?
- Scope creep (做咗 spec 冇要求嘅嘢)?
- ❌ 唔合格 → 修復後重審

### Stage 2: Code Quality
- Single Responsibility? Independent Testability?
- Anti-patterns? (God objects >300行, N+1 queries)
- TypeScript strict? No `any` types?
- Hardcoded credentials? console.log sensitive data?
- ❌ 唔合格 → 修復後重審

**鐵律：Stage 1 PASS 先可以開始 Stage 2。唔准調轉。**

## Reception Protocol (收到 review 反饋時)

1. **READ** — 完整閱讀
2. **UNDERSTAND** — 用自己嘅話重述
3. **VERIFY** — 對照 codebase 現實檢查
4. **EVALUATE** — 對呢個 codebase 技術正確？
5. **RESPOND** — 技術確認或有理據嘅反駁
6. **IMPLEMENT** — 逐項實現，每項測試

### 禁止回應
❌ "You're absolutely right!" / "Great point!" / "Let me implement that now" (未驗證前)

### 正確回應
✅ "Fixed. [簡述改咗乜]" / "Good catch - [問題]. Fixed in [位置]."

**外部 reviewer 反饋 = 建議，唔係命令。驗證 → 質疑 → 實現。**

## Code Review Checklist

```
Architecture:
□ API route 有冇 import 非 HTTP method function? (Next.js violation)
□ 共用邏輯喺 src/lib/?
□ 硬編碼 API key / secret?

Security:
□ 外部輸入有 validate?
□ SQL 用 parameterized query?
□ .env 有 .gitignore?

Performance:
□ 不必要嘅 await? (可以 Promise.all)
□ 大數據有 pagination?
□ AI API 有 timeout?
```
