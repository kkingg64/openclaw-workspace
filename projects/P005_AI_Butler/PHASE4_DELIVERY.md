# P005 AI Butler - Phase 4 交付報告

## 📋 任務狀態

### ✅ 已完成

1. **Docker 基礎設施部署**
   - ✅ n8n container 運行中 (port 5678)
   - ✅ PostgreSQL + pgvector (fabio-db) - 可重用
   - ✅ Redis (fabio-redis) - 可重用
   - ✅ OpenClaw Gateway (fabio-orchestrator) - 已存在

2. **數據庫 Schema**
   - ✅ p005_users (用戶資料)
   - ✅ p005_conversations (對話記錄)
   - ✅ p005_products (產品資料)
   - ✅ p005_documents (文檔/RAG)
   - ✅ p005_orders (訂單)
   - ✅ p005_audit_logs (審計日誌)
   - ✅ 樣本數據已插入 (5個產品, 6份文檔)

3. **AI Prompt**
   - ✅ AI_Prompt.md - 完整的 System Prompt
   - ✅ Intent Detection 定義
   - ✅ Permission Matrix
   - ✅ Response Templates

4. **n8n Workflow**
   - ✅ Workflow 已創建並激活
   - ⚠️ 需要手動調整 (見下方)

---

## 🔧 登錄信息

| 服務 | URL | 用戶 | 密碼 |
|------|-----|------|------|
| n8n | http://76.13.215.13:5678 | admin | N8nAdmin2026! |
| PostgreSQL | fabio-db:5432 | fabio_admin | (見 fabio-orchestrator env) |
| Redis | fabio-redis:6379 | - | FabioRedis2026! |
| OpenClaw | http://76.13.215.13:18789 | - | - |

---

## ⚠️ 待完成事項 (需要手動配置)

### 1. n8n Workflow 完整配置

由於 n8n API 認證問題，需要通過 Web UI 手動配置：

1. 訪問 http://76.13.215.13:5678
2. 登入 (admin / N8nAdmin2026!)
3. 編輯 "P005 WhatsApp" workflow
4. 添加以下 nodes:
   - **WhatsApp Webhook** ✅ (已有)
   - **Extract Data** - Code node: 提取 phone, message
   - **PostgreSQL** - Get User: 查詢 p005_users
   - **Code** - Build Prompt: 構建 AI prompt
   - **HTTP Request** - Call OpenClaw: POST to http://fabio-orchestrator:18789/v1/chat/completions
   - **Code** - Extract Response: 提取 AI 回覆
   - **HTTP Request** - Send WhatsApp: POST to WhatsApp API
   - **PostgreSQL** - Log Conversation: 記錄到 p005_conversations
   - **Respond to Webhook** ✅ (已有)

### 2. WhatsApp API 配置

需要設置 WhatsApp Business API credentials:
- PHONE_NUMBER_ID
- ACCESS_TOKEN
- WEBHOOK_VERIFY_TOKEN

### 3. Credentials 設置

在 n8n 中創建:
- **PostgreSQL**: fabio-db connection
- **HTTP Header Auth**: MiniMax API Key
- **HTTP Header Auth**: WhatsApp Access Token

---

## 📁 文件清單

```
/root/.openclaw/workspace/projects/P005_AI_Butler/
├── P005_TechSpec.md        # 技術規格 (Phase 3)
├── P005_UI_Spec.md         # UI 規格
├── P005_DataModel.md       # 數據模型
├── P005_Research.md        # 市場調研
├── P005_Architecture.md   # 架構圖
├── AI_Prompt.md           # AI Prompt (✅ 新增)
├── n8n_workflow.json      # Workflow JSON
└── setup_n8n.sh           # 自動部署腳本
```

---

## 🧪 測試計劃

### Manual Test Cases:
1. **WhatsApp → n8n Webhook**
   - 發送訊息到 WhatsApp
   - 檢查 n8n webhook 接收

2. **User Lookup**
   - 新用戶 vs 現有用戶
   - 權限檢查

3. **AI Response**
   - 產品查詢
   - 訂單狀態
   - 權限範圍外查詢

4. **WhatsApp Response**
   - 確認訊息發送成功

---

## 📊 Database Schema (PostgreSQL)

```sql
-- 用戶表
CREATE TABLE p005_users (
  id UUID PRIMARY KEY,
  whatsapp_phone VARCHAR(20) UNIQUE,
  whatsapp_name VARCHAR(100),
  amway_id VARCHAR(50),
  rank VARCHAR(20), -- pioneer/platinum/founders
  status VARCHAR(20),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 對話記錄
CREATE TABLE p005_conversations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES p005_users(id),
  direction VARCHAR(10), -- inbound/outbound
  content TEXT,
  ai_response BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 產品
CREATE TABLE p005_products (
  id UUID PRIMARY KEY,
  sku VARCHAR(50) UNIQUE,
  name_zh VARCHAR(200),
  price_hkd DECIMAL(10,2),
  pv DECIMAL(10,2)
);
```

---

## 🚀 下一步

1. **手動配置 n8n Workflow** (約 30 分鐘)
2. **配置 WhatsApp Webhook** (需要 WhatsApp Business API)
3. **進行 UAT 測試** (Phase 5)

---

**CTO 簽署**: [CTO_SIGNED_2026_03_10_1700_HKT]
