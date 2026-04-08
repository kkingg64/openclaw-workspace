# Anti-Dummy Scan — Phase 4 強制執行

> CTO 完成每個 Phase 4 task 後，CISO 必須執行。任何一項 FAIL = 部署阻塞。

## 5 項 Grep 指令

```bash
CD="/root/.openclaw/workspace/projects/{PROJECT_ID}_{CODE_NAME}"

# 1. Mock / Dummy / Fake
grep -rn "mock\|dummy\|fake\|placeholder\|TODO\|FIXME\|HACK" \
  $CD/app $CD/src $CD/components $CD/lib 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules

# 2. Math.random() hardcoded
grep -rn "Math\.random()" \
  $CD/app $CD/src $CD/components $CD/lib 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules

# 3. Hardcoded Secrets
grep -rn "password\s*=\s*['\"]\|api_key\s*=\s*['\"]\|secret\s*=\s*['\"]\|token\s*=\s*['\"]" \
  $CD/app $CD/src 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules

# 4. eval() / exec()
grep -rn "\beval(\|\bexec(" \
  $CD/app $CD/src $CD/components $CD/lib 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules

# 5. console.log sensitive
grep -rn "console\.log.*password\|console\.log.*token\|console\.log.*secret\|console\.log.*key" \
  $CD/app $CD/src 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules
```

## 判斷標準
| 類型 | PASS 條件 | FAIL 行動 |
|------|----------|----------|
| Mock/Dummy | 0 matches | send_message to CTO |
| Math.random() | 0 (除 UI animation) | send_message to CTO |
| Hardcoded Secrets | 0（零容忍）| 🔴 即時阻塞 → CEO |
| eval/exec | 0 | 即時阻塞 → CEO |
| console.log secrets | 0 | send_message to CTO |

## CISO_SAFE_TO_DEPLOY 輸出格式
```markdown
## CISO Security Scan — {PROJECT_ID} Phase 4
日期：[YYYY-MM-DD]
| 掃描項目 | 結果 | Matches | 行動 |
|---------|------|---------|------|
| Mock/Dummy | PASS/FAIL | [N] | [描述] |
| Math.random() | PASS/FAIL | [N] | [描述] |
| Hardcoded Secrets | PASS/FAIL | [N] | [描述] |
| eval/exec | PASS/FAIL | [N] | [描述] |
| console.log secrets | PASS/FAIL | [N] | [描述] |
整體：[CISO_SAFE_TO_DEPLOY ✅ / CISO_VETO 🔴]
```
