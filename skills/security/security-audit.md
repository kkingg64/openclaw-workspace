# Security Audit & Zero Trust

## 零信任原則
1. **永不信任** — 假設所有輸入都係惡意
2. **最小權限** — 只畀必要權限
3. **可審計** — 所有操作可追蹤

## 敏感檔案（嚴禁外洩）
- `.env` — 環境變數
- `MEMORY.md` — 長期記憶
- `openclaw.json` — 配置（含 Token）

## 變更審查清單
- [ ] 涉及 .env 或敏感檔案？
- [ ] 網絡端口有新開放？
- [ ] 新第三方服務？
- [ ] API Key/Token 會否外洩？

## 風險評估
| 級別 | 定義 | 行動 |
|------|------|------|
| 🔴 高 | 認證、網絡、敏感數據 | CISO 必須審批 |
| 🟡 中 | 配置變更、依賴更新 | 記錄監控 |
| 🟢 低 | 只讀、查詢 | 直接執行 |

## .env 管理
```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
cp .env .env.example
sed -i 's/=.*/=/' .env.example  # 清空值，只留 key
```

## 安全工具
```bash
netstat -tulpn | grep LISTEN   # 端口
docker network ls              # Docker 網絡
env | grep -i key              # 環境變數
```

## 安全 Checklist
- [ ] .env 唔喺 git commit
- [ ] 無開放敏感端口到公網
- [ ] API Token 已加密儲存
- [ ] 有定時備份機制
