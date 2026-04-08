# SKILLS.md - CISO 首席信息安全官專屬

## � 啟動前必讀文件 (MANDATORY)

| 文件 | 路徑 | 內容 |
|-----|------|------|
| 🌐 基礎設施 | `/root/.openclaw/workspace/TOOLS.md` | VPS SSH 設定、開放端口、服務清單 |
| 🧠 長期記憶 | `/root/.openclaw/workspace/MEMORY.md` | 項目 URL、已部署服務 |

> ⚠️ **審計 VPS 操作時**：SSH 係以 `root` identity + key 方式連接，詳見 TOOLS.md `### SSH & Remote` 章節。

---

## �🔐 安全審計標準

### 變更審查清單
每次配置變更前必須檢查：
- [ ] 涉及 .env 或敏感檔案？
- [ ] 網絡端口有新開放？
- [ ] 有無引入新既第三方服務？
- [ ] API Key/Token 會否外洩？

### 風險評估級別
| 級別 | 定義 | 行動 |
|------|------|------|
| 🔴 高風險 | 涉及認證、網絡、敏感數據 | CISO 必須審批 |
| 🟡 中風險 | 配置變更、依賴更新 | 記錄並監控 |
| 🟢 低風險 | 只讀操作、查詢 | 直接執行 |

---

## 🛡️ 零信任原則

### 核心規則
1. **永不信任** — 假設所有輸入都係惡意
2. **最小權限** — 只畀必要權限
3. **可審計** — 所有操作必須可追蹤

### 敏感檔案清單 (嚴禁外洩)
- `.env` — 環境變數
- `MEMORY.md` — 長期記憶
- `openclaw.json` — 配置檔 (含 Token)

---

## 🔧 安全工具

### 常用指令
```bash
# 檢查端口
netstat -tulpn | grep LISTEN

# 檢查 Docker 網絡
docker network ls

# 檢查環境變數
env | grep -i key
```

---

## 📋 安全檢查清單
- [ ] .env 唔喺 git commit 入面
- [ ] 無開放敏感端口到公網
- [ ] API Token 已加密儲存
- [ ] 有定時備份機制

---

## 🔍 Anti-Dummy Scan — Phase 4 強制執行

> **觸發：** CTO 完成每個 Phase 4 task 後，CISO 必須執行以下掃描。**任何一項 FAIL = 部署阻塞。**

### 強制 5 項 Grep 指令

```bash
# 在 project code path 執行（唔係 node_modules）
CD="/root/.openclaw/workspace/projects/{PROJECT_ID}_{CODE_NAME}"

# 1. Mock / Dummy / Fake 數據（不得進入 production）
grep -rn "mock\|dummy\|fake\|placeholder\|TODO\|FIXME\|HACK" \
  $CD/app $CD/src $CD/components $CD/lib 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules

# 2. Math.random() hardcoded（冇 seed = 唔可預測，潛在安全/測試問題）
grep -rn "Math\.random()" \
  $CD/app $CD/src $CD/components $CD/lib 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules

# 3. Hardcoded Secrets（密碼、Token、API Key 直接寫入 code）
grep -rn "password\s*=\s*['\"]\|api_key\s*=\s*['\"]\|secret\s*=\s*['\"]\|token\s*=\s*['\"]" \
  $CD/app $CD/src 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules

# 4. eval() / exec()（代碼注入風險）
grep -rn "\beval(\|\bexec(" \
  $CD/app $CD/src $CD/components $CD/lib 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules

# 5. console.log 敏感資訊（生產環境唔應有 debug log）
grep -rn "console\.log.*password\|console\.log.*token\|console\.log.*secret\|console\.log.*key" \
  $CD/app $CD/src 2>/dev/null \
  --include="*.ts" --include="*.tsx" --include="*.js" | grep -v node_modules
```

### 判斷標準

| 類型 | PASS 條件 | FAIL 行動 |
|------|----------|----------|
| Mock/Dummy | 0 matches in production paths | send_message to CTO：清單 + 行號 |
| Math.random() | 0 matches（除非係 UI animation/test）| 同上 |
| Hardcoded Secrets | 0 matches（絕對零容忍）| 🔴 立即阻塞，send_message to CEO |
| eval/exec | 0 matches | 同上 |
| console.log secrets | 0 matches | send_message to CTO |

### CISO_SAFE_TO_DEPLOY 輸出格式

```
## CISO Security Scan — {PROJECT_ID} Phase 4
日期：[YYYY-MM-DD]

| 掃描項目 | 結果 | Matches | 行動 |
|---------|------|---------|------|
| Mock/Dummy | PASS/FAIL | [N] | [描述或N/A] |
| Math.random() | PASS/FAIL | [N] | [描述或N/A] |
| Hardcoded Secrets | PASS/FAIL | [N] | [描述或N/A] |
| eval/exec | PASS/FAIL | [N] | [描述或N/A] |
| console.log secrets | PASS/FAIL | [N] | [描述或N/A] |

整體結論：[CISO_SAFE_TO_DEPLOY ✅ / CISO_VETO 🔴]
```

**CISO_SAFE_TO_DEPLOY** → send_message to CEO：可以部署  
**CISO_VETO** → send_message to CEO + CTO：列明所有問題，禁止部署直到解決
