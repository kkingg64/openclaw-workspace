# P005 - AI 智能大管家 技術規格書

**⚠️ 更新 (2026-03-12):** 部署目標確認為 **Mac Mini (100.102.72.91)**

**項目:** AI 智能大管家 (Amway + WhatsApp)  
**階段:** Phase 3 - 技術評審  
**負責人:** CTO (Fabio-CTO)  
**日期:** 2026-03-10 16:25 HKT (Updated: 2026-03-10 17:10 HKT)  
**項目 ID:** P005

---

## 📋 概述

本文檔定義 P005 系統的技術架構、API 設計與部署方案。

---

## 1️⃣ 技術棧確認

### 1.1 最終技術選型

| 層級 | 技術 | 版本 | Stars | 決策理由 |
|------|------|------|-------|----------|
| **Workflow** | n8n | Latest | 178,511 ⭐ | 老闆批准，自託管免費 |
| **Database** | PostgreSQL | 16+ | 20,328 ⭐ | 企業級關係型數據庫 |
| **Vector DB** | pgvector | Latest | 20,187 ⭐ | PostgreSQL 原生向量擴展 |
| **Cache** | Redis | 7+ | 73,422 ⭐ | Session/Token 緩存 |
| **AI** | OpenClaw | - | - | 已集成 MiniMax M2.5 |
| **WhatsApp** | WhatsApp Business API | - | - | Cloud API |

### 1.2 架構圖

```
┌─────────────────────────────────────────────────────────────────┐
│                        用戶 (WhatsApp)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      n8n (Workflow Engine)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ WhatsApp    │  │ AI Router   │  │ Webhook    │             │
│  │ Webhook     │  │ (Router)    │  │ to User    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
┌─────────────────────────┐    ┌─────────────────────────┐
│   OpenClaw (AI)         │    │   PostgreSQL +          │
│   MiniMax M2.5          │    │   pgvector              │
│                         │    │                         │
│   • Intent Detection    │    │   • User Data           │
│   • RAG Pipeline        │    │   • Conversations       │
│   • Response Generation │    │   • Products            │
│                         │    │   • Documents (Vector)  │
└─────────────────────────┘    └─────────────────────────┘
              │                             │
              │                             ▼
              │              ┌─────────────────────────┐
              │              │   Redis                │
              │              │   • Session Cache      │
              │              │   • Token Store        │
              │              └─────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      n8n (Response)                            │
│  • Format Response                                              │
│  • Send to WhatsApp                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2️⃣ API 設計

### 2.1 n8n Workflow API Endpoints

| Method | Endpoint | 描述 |
|--------|----------|------|
| `POST` | `/webhook/whatsapp/incoming` | WhatsApp 訊息入口 |
| `GET` | `/webhook/whatsapp/status` | WhatsApp 狀態回調 |
| `POST` | `/api/ai/chat` | 直接 AI 對話 (非 WhatsApp) |
| `POST` | `/api/ai/rag/search` | RAG 文件搜尋 |
| `GET` | `/api/users/:id` | 獲取用戶資料 |
| `GET` | `/api/products` | 產品列表 |
| `POST` | `/api/orders` | 建立訂單 |

### 2.2 Admin API Endpoints (NEW - RAG Maintenance)

#### 2.2.1 文檔管理 API

| Method | Endpoint | 描述 | 權限 |
|--------|----------|------|------|
| `GET` | `/api/admin/documents` | 獲取文檔列表 (分頁) | Admin |
| `GET` | `/api/admin/documents/:id` | 獲取文檔詳情 | Admin |
| `POST` | `/api/admin/documents/upload` | 上傳新文檔 | Admin |
| `PUT` | `/api/admin/documents/:id` | 更新文檔資訊 | Admin |
| `DELETE` | `/api/admin/documents/:id` | 刪除文檔 | Admin |
| `POST` | `/api/admin/documents/:id/reprocess` | 重新處理向量嵌入 | Admin |
| `GET` | `/api/admin/documents/:id/versions` | 獲取版本歷史 | Admin |
| `POST` | `/api/admin/documents/:id/restore` | 還原到指定版本 | Admin |

#### 2.2.2 分類管理 API

| Method | Endpoint | 描述 | 權限 |
|--------|----------|------|------|
| `GET` | `/api/admin/categories` | 獲取分類列表 | Admin |
| `POST` | `/api/admin/categories` | 新增分類 | Admin |
| `PUT` | `/api/admin/categories/:id` | 更新分類 | Admin |
| `DELETE` | `/api/admin/categories/:id` | 刪除分類 | Admin |

#### 2.2.3 用戶管理 API

| Method | Endpoint | 描述 | 權限 |
|--------|----------|------|------|
| `GET` | `/api/admin/users` | 獲取用戶列表 (分頁) | Admin |
| `GET` | `/api/admin/users/:id` | 獲取用戶詳情 | Admin |
| `POST` | `/api/admin/users` | 建立新用戶 | Admin |
| `PUT` | `/api/admin/users/:id` | 更新用戶資料 | Admin |
| `DELETE` | `/api/admin/users/:id` | 停用用戶 | Admin |
| `POST` | `/api/admin/users/:id/send-message` | 發送訊息給用戶 | Admin |

#### 2.2.4 權限管理 API

| Method | Endpoint | 描述 | 權限 |
|--------|----------|------|------|
| `GET` | `/api/admin/roles` | 獲取角色列表 | Admin |
| `POST` | `/api/admin/roles` | 新增角色 | Admin |
| `PUT` | `/api/admin/roles/:id` | 更新角色權限 | Admin |
| `DELETE` | `/api/admin/roles/:id` | 刪除角色 | Admin |
| `GET` | `/api/admin/permissions` | 獲取權限清單 | Admin |

#### 2.2.5 分析與統計 API

| Method | Endpoint | 描述 | 權限 |
|--------|----------|------|------|
| `GET` | `/api/admin/analytics/usage` | 使用統計 | Admin |
| `GET` | `/api/admin/analytics/documents` | 文檔使用分析 | Admin |
| `GET` | `/api/admin/analytics/users` | 用戶行為分析 | Admin |

### 2.3 File Processing Pipeline (NEW)

```
┌─────────────────────────────────────────────────────────────────┐
│                    File Processing Pipeline                      │
└─────────────────────────────────────────────────────────────────┘

[Admin Upload Request]
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: File Validation                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  • Check file type (PDF, TXT, DOCX, MD)                      │  │
│  • Check file size (max 50MB)                                │  │
│  • Check file name (no special characters)                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  Step 2: File Storage                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  • Save to /uploads/{year}/{month}/{day}/                     │  │
│  • Generate unique filename (UUID)                            │  │
│  • Store metadata in database                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  Step 3: Text Extraction                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  • PDF: Extract text using pdfplumber/pypdf                 │  │
│  • DOCX: Extract using python-docx                           │  │
│  • TXT/MD: Read directly                                     │  │
│  • Handle encoding issues                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  Step 4: Text Chunking                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  • Split into chunks (configurable: 256-1024 tokens)        │  │
│  • Apply overlap (configurable: 10-20% of chunk size)       │  │
│  • Preserve context boundaries                                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  Step 5: Embedding Generation                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  • Use MiniMax embeddings API                                │  │
│  • Generate 1536-dimension vectors                           │  │
│  • Store in pgvector                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  Step 6: Index Update                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  • Update document status to "ready"                         │  │
│  • Record chunk count                                        │  │
│  • Trigger cache invalidation                                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
                              ▼
                    [Completion Notification]
```

#### 2.3.1 Processing Status States

| Status | Description |
|--------|-------------|
| `pending` | File uploaded, waiting for processing |
| `validating` | File validation in progress |
| `extracting` | Text extraction in progress |
| `chunking` | Text chunking in progress |
| `embedding` | Generating embeddings |
| `indexing` | Updating vector index |
| `ready` | Successfully processed |
| `failed` | Processing failed |

#### 2.3.2 Error Handling

| Error Type | Handling |
|------------|----------|
| Invalid file type | Return 400 with supported types list |
| File too large | Return 400 with max size limit |
| Extraction failed | Log error, mark as failed, notify admin |
| Embedding failed | Retry 3 times, then mark as failed |
| Index update failed | Retry with exponential backoff |

### 2.4 OpenClaw AI API (Internal)

| Method | Endpoint | 描述 |
|--------|----------|------|
| `POST` | `/v1/chat/completions` | MiniMax Chat API |

### 2.3 Database Schema (PostgreSQL)

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    whatsapp_phone VARCHAR(20) UNIQUE NOT NULL,
    whatsapp_name VARCHAR(100),
    Garma_id VARCHAR(50),
    rank VARCHAR(20) CHECK (rank IN ('pioneer', 'platinum', 'founders')),
    status VARCHAR(20) DEFAULT 'active',
    referrer_id UUID REFERENCES users(id),
    team_size INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations Table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    wa_message_id VARCHAR(100),
    direction VARCHAR(10) CHECK (direction IN ('inbound', 'outbound')),
    message_type VARCHAR(20),
    content TEXT,
    media_url VARCHAR(500),
    ai_response BOOLEAN DEFAULT false,
    rag_source JSONB,
    tokens_used INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name_zh VARCHAR(200),
    name_en VARCHAR(200),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    description TEXT,
    price_hkd DECIMAL(10,2),
    pv DECIMAL(10,2),
    commission_rate DECIMAL(5,2),
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    image_url VARCHAR(500),
    document_urls JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Documents Table (for RAG)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200),
    doc_type VARCHAR(20),
    file_url VARCHAR(500),
    file_type VARCHAR(20),
    file_size_mb DECIMAL(10,2),
    embedding_status VARCHAR(20) DEFAULT 'pending',
    chunk_count INTEGER DEFAULT 0,
    version VARCHAR(20),
    min_rank_required VARCHAR(20),
    uploaded_by UUID,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Document Embeddings (pgvector)
CREATE TABLE document_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id),
    chunk_text TEXT,
    embedding vector(1536),
    page_number INTEGER,
    chunk_index INTEGER
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending',
    total_pv DECIMAL(10,2),
    total_amount_hkd DECIMAL(10,2),
    shipping_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action VARCHAR(50),
    resource_type VARCHAR(50),
    resource_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 2.4 Redis Keys Design

| Key Pattern | 類型 | TTL | 描述 |
|-------------|------|-----|------|
| `session:{user_id}` | Hash | 24h | 用戶會話數據 |
| `token:{user_id}` | String | 7d | WhatsApp Access Token |
| `rate:{phone}:{minute}` | Counter | 60s | 速率限制計數 |
| `rag:cache:{query_hash}` | String | 1h | RAG 結果緩存 |

---

## 3️⃣ n8n Workflow 設計

### 3.1 Main Workflow: WhatsApp Incoming

```
[WhatsApp Webhook]
       │
       ▼
[Extract Phone Number]
       │
       ▼
[Get/Create User in DB] ──► [Check User Rank]
       │                         │
       │                         ▼
       │                  [Apply Rate Limit]
       │                         │
       ▼                         ▼
[Extract Message] ──────► [Route to AI]
       │                         │
       │                         ▼
       │                  [OpenClaw AI]
       │                  (MiniMax M2.5)
       │                         │
       │                         ▼
       │                  [Format Response]
       │                         │
       ▼                         ▼
[Log to Database] ◄──── [Send to WhatsApp]
```

### 3.2 RAG Workflow

```
[User Query]
       │
       ▼
[Embed Query (MiniMax)]
       │
       ▼
[Vector Search (pgvector)]
       │
       ▼
[Get Top-K Chunks]
       │
       ▼
[Build Context Prompt]
       │
       ▼
[AI Generate Response]
       │
       ▼
[Return with Sources]
```

### 3.3 n8n Nodes Required

| Node | 用途 |
|------|------|
| **WhatsApp Business API** | 收發訊息 |
| **PostgreSQL** | 數據庫操作 |
| **HTTP Request** | 調用 OpenClaw |
| **Code** | 數據處理 |
| **IF** | 條件分支 |
| **Switch** | 訊息路由 |
| **Wait** | 延遲處理 |

---

## 4️⃣ AI Prompt 設計 (OpenClaw/MiniMax)

### 4.1 System Prompt

```
你係 AI 智能大管家，專門為 Amway 直銷商提供服務。

用戶資料：
- 職級: {{rank}}
- 名字: {{name}}

權限範圍：
{{permissions}}

回覆原則：
1. 只能查詢用戶權限範圍內既資訊
2. 產品價格同 PV 要精確
3. 獎金計算要清楚解釋
4. 引用既文件要標明來源
5. 廣東話回覆為主

如果用戶詢問超過權限既資訊，要禮貌咁拒絕。
```

### 4.2 Intent Detection

```
用戶可能既意圖：
- product_query: 產品查詢
- order_create: 建立訂單
- order_status: 訂單狀態
- bonus_calculate: 獎金計算
- document_search: 文件搜尋
- team_stats: 團隊數據 (只限 Founders)
- general_chat: 一般對話
```

---

## 5️⃣ 權限控制矩陣

| 功能 | Pioneer | Platinum | Founders |
|------|---------|----------|----------|
| `/api/products` | ✅ 讀 | ✅ 讀 | ✅ 讀寫 |
| `/api/orders` | ❌ | ✅ 讀寫 | ✅ 讀寫 |
| `/api/bonus/calculate` | ❌ | ✅ | ✅ |
| `/api/team/*` | ❌ | ❌ | ✅ |
| `/api/admin/*` | ❌ | ❌ | ✅ |
| RAG: 政策文件 | ✅ | ✅ | ✅ |
| RAG: 培訓教材 | ✅ | ✅ | ✅ |
| RAG: 獎金文件 | ❌ | ✅ | ✅ |
| RAG: 團隊數據 | ❌ | ❌ | ✅ |

---

## 6️⃣ 部署策略

### 6.1 部署方案: Mac Mini (Docker)

**Rationale:** 
- 已有 Mac Mini (100.102.72.91)
- Docker Compose 統一管理
- 成本可控 (客戶提供 Mac Mini)
- 完全控制權

### 6.2 Docker Compose 配置

```yaml
version: '3.8'

services:
  # n8n - Workflow Engine
  n8n:
    image: n8nio/n8n:latest
    container_name: p005_n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_HOST=${N8N_HOST}
      - WEBHOOK_URL=${WEBHOOK_URL}
      - EXECUTIONS_DATA_SAVE_ON_ERROR=all
      - EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
    volumes:
      - n8n_data:/home/node/.n8n
    networks:
      - p005_network
    depends_on:
      - postgres
      - redis

  # PostgreSQL + pgvector
  postgres:
    image: pgvector/pgvector:pg16
    container_name: p005_postgres
    restart: unless-stopped
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - p005_network

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: p005_redis
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - p005_network

  # OpenClaw Gateway (已有)
  openclaw:
    image: openclaw/gateway:latest
    container_name: openclaw_gateway
    restart: unless-stopped
    ports:
      - "18789:18789"
    volumes:
      - ./openclaw_data:/data
    networks:
      - p005_network
    environment:
      - MINIMAX_API_KEY=${MINIMAX_API_KEY}

networks:
  p005_network:
    driver: bridge

volumes:
  n8n_data:
  postgres_data:
  redis_data:
```

### 6.3 部署 Steps

1. **SSH 到 Docker**
   ```bash
   ssh openclaw@100.102.72.91
   ```

2. **建立目錄**
   ```bash
   mkdir -p /opt/p005-ai-butler
   cd /opt/p005-ai-butler
   ```

3. **建立 .env 檔案**
   ```bash
   # Database
   DB_NAME=p005_ai_butler
   DB_USER=postgres
   DB_PASSWORD=strong_password_here
   
   # Redis
   REDIS_PASSWORD=redis_password_here
   
   # n8n
   N8N_USER=admin
   N8N_PASSWORD=n8n_password_here
   N8N_HOST=ai.madhorse.cloud
   WEBHOOK_URL=https://ai.madhorse.cloud/webhook/
   
   # WhatsApp
   WHATSAPP_PHONE_ID=your_phone_id
   WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
   WHATSAPP_ACCESS_TOKEN=your_access_token
   
   # AI
   MINIMAX_API_KEY=your_minimax_key
   ```

4. **啟動服務**
   ```bash
   docker-compose up -d
   ```

5. **初始化數據庫**
   ```bash
   docker exec -it p005_postgres psql -U postgres -d p005_ai_butler -f /docker-entrypoint-initdb.d/init.sql
   ```

6. **配置 n8n Workflow**
   - 訪問 https://ai.madhorse.cloud:5678
   - 登入並導入 Workflow JSON

### 6.4 Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name ai.madhorse.cloud;
    
    # n8n
    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Webhook endpoint
    location /webhook/ {
        proxy_pass http://localhost:5678/webhook/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 7️⃣ 安全設計 (CISO Check)

### 7.1 環境變數管理

✅ **API Keys 不會 hardcode**，全部使用 `.env` 檔案

```bash
# .env (永不上傳)
MINIMAX_API_KEY=xxx
WHATSAPP_ACCESS_TOKEN=xxx
DB_PASSWORD=xxx
```

### 7.2 Rate Limiting

- **n8n 層面**: 使用 Redis 實現 rate limit
- **配置**: 每分鐘 10 個訊息上限
- **超限處理**: 返回「請稍後再試」訊息

### 7.3 Input Sanitization

- ✅ WhatsApp 訊息需經過 sanitization
- ✅ 防止 XSS (JavaScript injection)
- ✅ 防止 SQL Injection (使用參數化查詢)
- ✅ PostgreSQL 使用 prepared statements

### 7.4 Authentication & Authorization

| 層面 | 機制 |
|------|------|
| **WhatsApp** | Webhook Verify Token |
| **n8n** | Basic Auth + API Key |
| **Database** | PostgreSQL ユーザー/密碼 |
| **AI API** | API Key (MiniMax) |

### 7.5 Audit Logging

- ✅ 所有敏感操作記錄到 `audit_logs` 表
- ✅ 包括：用戶資料變更、訂單操作、權限變更
- ✅ 記錄 IP 地址同時間戳

---

## 8️⃣ 監控與維運

### 8.1 Health Checks

| 服務 | Endpoint | 檢查內容 |
|------|----------|----------|
| n8n | `http://localhost:5678/healthz` | 服務狀態 |
| PostgreSQL | Docker healthcheck | 數據庫連接 |
| Redis | `redis-cli ping` | Cache 可用性 |

### 8.2 日誌配置

```yaml
# docker-compose.yml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

### 8.3 備份策略

| 項目 | 頻率 | 保留期 |
|------|------|--------|
| PostgreSQL | 每日 | 7 天 |
| Redis (Session) | - | 自動過期 |
| n8n Workflows | 每週 | 4 週 |

---

## 9️⃣ 開發 Phase 4 交付清單

| 項目 | 負責人 | 預計時間 |
|------|--------|----------|
| Docker Compose 部署 | CTO | 2 小時 |
| PostgreSQL Schema | CTO | 1 小時 |
| n8n Workflow 建立 | CTO | 4 小時 |
| OpenClaw Prompt 調優 | CTO | 2 小時 |
| WhatsApp Webhook 配置 | CTO | 1 小時 |
| Unit Test | CTO | 2 小時 |

---

## 📊 總結

### 技術可行性: ✅ HIGH
- 所有技術都有大量社區支持 (Stars > 20K)
- Docker Compose 簡化部署
- n8n 視覺化 workflow 降低維運成本

### 安全性: ✅ PASS
- API Keys 全部使用 .env
- Rate limiting 防止 abuse
- Audit logging 追蹤操作

### 部署複雜度: ✅ LOW-MEDIUM
- 單 Docker 部署
- Docker 統一管理
- Nginx 反向代理

---

**簽署:**

[CTO_SIGNED_2026_03_10_1625_HKT]

---

*End of Technical Specification*

---



---

## 🚀 部署架構 (2026-03-11 最新)

### 系統架構圖

```
┌─────────────────────────────────────────────────────────────────┐
│                     Mac Mini (100.102.72.91)                   │
│                        macOS + Docker Desktop                   │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐     │
│  │   n8n       │   │ PostgreSQL   │   │    Redis    │     │
│  │  (5678)     │   │   (5432)     │   │   (6379)    │     │
│  │  + Green   │   │  + pgvector  │   │              │     │
│  └──────────────┘   └──────────────┘   └──────────────┘     │
│                            │                                   │
│                            ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              OpenClaw Gateway (18789)                   │   │
│  │                   + MiniMax AI                           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      用戶 (WhatsApp)                            │
└─────────────────────────────────────────────────────────────────┘
```

### 伺服器資訊

| 項目 | 詳情 |
|------|------|
| **主機** | Mac Mini (Apple Silicon) |
| **IP** | 100.102.72.91 |
| **Hostname** | AMAClawMachine.ai.ama21ng.hk |
| **用戶** | openclaw |
| **密碼** | horseplus |

### 當前可用 Port

| Port | 服務 | 狀態 |
|------|------|------|
| 18789 | OpenClaw Gateway | ✅ 已運行 |
| 5173 | Vite Dev Server | ✅ 已運行 |
| 5678 | n8n | ⬜ 待安裝 |
| 5432 | PostgreSQL + pgvector | ⬜ 待安裝 |
| 6379 | Redis | ⬜ 待安裝 |

---

## ✅ 部署 Checklist

### 第一階段：基礎設施 (Priority 1)

| # | 任務 | 預計時間 |
|---|------|----------|
| 1.1 | 安裝 Docker Desktop (Mac) | 20 分鐘 |
| 1.2 | 驗證 Docker 運行 | 5 分鐘 |
| 1.3 | 配置 Docker Compose | 15 分鐘 |
| 1.4 | 測試基礎容器 | 10 分鐘 |

### 第二階段：P005 部署 (Priority 2)

| # | 任務 | 預計時間 |
|---|------|----------|
| 2.1 | 配置 n8n | 15 分鐘 |
| 2.2 | 配置 PostgreSQL + pgvector | 15 分鐘 |
| 2.3 | 配置 Redis | 5 分鐘 |
| 2.4 | 部署/配置 OpenClaw | 15 分鐘 |
| 2.5 | 註冊 Green API | 20 分鐘 |
| 2.6 | 配置 WhatsApp Webhook | 15 分鐘 |
| 2.7 | 測試完整流程 | 30 分鐘 |

### 第三階段：測試上線 (Priority 3)

| # | 任務 | 預計時間 |
|---|------|----------|
| 3.1 | UAT 測試 | 30 分鐘 |
| 3.2 | 生產環境切換 | 10 分鐘 |

---

## 🐳 Docker Compose

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - WEBHOOK_URL=http://localhost:5678/
    volumes:
      - n8n_data:/home/node/.n8n
    restart: unless-stopped

  postgres:
    image: pgvector/pgvector:16
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=Garma
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=Garma_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  n8n_data:
  postgres_data:
  redis_data:
```

---

## 📱 WhatsApp 整合

### 首選：Green API (無 Business API 時)

| 項目 | 詳情 |
|------|------|
| **官網** | green-api.com |
| **價格** | 免費版每日 1,000 條 |
| **優點** | 免 Business 認證 |

**設置流程：**
1. 註冊 green-api.com
2. 手機 App 掃描 QR Code
3. 拎 Instance ID + Token
4. n8n 配置 Green API 節點

---

## 🤖 OpenClaw + AI Prompt

### 重用本地 OpenClaw
- **Port**: 18789 (已運行)
- **用途**: RAG AI 對話

### AI Prompt 位置
- `/root/.openclaw/workspace/projects/P005_AI_Butler/AI_Prompt.md`
- 已包含完整既角色、權限、Intent Detection

---

## ⚠️ 待確認事項

- [ ] 客戶 MiniMax API Key
- [ ] 客戶 WhatsApp 號碼
- [ ] madhorse.cloud 域名 (客戶決定)

---

*最後更新: 2026-03-11 06:20 UTC*
*CEO Cleanup Review Complete*

---

## 📁 部署路徑結構

### 伺服器路徑 (Mac Mini)

```
/Users/openclaw/
├── .openclaw/           (OpenClaw 本體)
├── docker/              (Docker containers)
│   ├── Garma_n8n/
│   ├── Garma_postgres/
│   └── Garma_redis/
└── Garma/              (Garma AI 項目)
    ├── docker-compose.yml
    ├── workflows/
    ├── db_scripts/
    └── config/
```

### 詳細路徑

| 服務 | 路徑 |
|------|------|
| **項目根目錄** | `/Users/openclaw/Garma/` |
| **Docker Compose** | `/Users/openclaw/Garma/docker-compose.yml` |
| **n8n Workflows** | `/Users/openclaw/Garma/workflows/` |
| **數據庫腳本** | `/Users/openclaw/Garma/db_scripts/` |
| **配置檔案** | `/Users/openclaw/Garma/config/` |
| **Docker Data** | `/Users/openclaw/docker/` |

---

*部署路徑: 2026-03-12 14:50 HKT*

---

## 🤖 OpenClaw 多 Agent 架構 (2026-03-12 更新)

### 設計理念

使用 **Multiple Sub-Agents** under `garma` main agent，實現專業分工：

```
用戶問題 → garma (Main)
            ↓ (spawn sub-agent)
    ┌─────────┼─────────┐
    ▼         ▼         ▼
產品Agent  健康Agent  業務Agent  ...更多
```

### Mac Mini 現有資源

| Resource | 狀態 | 可 reuse? |
|----------|------|-----------|
| `garma` (main) | ✅ Active | ✅ WhatsApp channel |
| `kelvin` (CTO) | ✅ Active | ✅ 可用於技術咨詢 |
| `ringo` (CISO) | ✅ Active | ✅ 可用於安全審計 |
| `moon` | ✅ Active | ✅ 可用於其他用途 |
| Workspace | ✅ Google Drive | ✅ Already linked |

### Agent 清單 (已整合)

| Agent ID | 名稱 | 職責 | Sub-agent? |
|----------|------|------|------------|
| garma | 主顧問 | 總協調、路由 | Main |
| garma-product | 產品顧問 | 產品查詢、推薦、美容護膚諮詢 | ✅ Sub-agent |
| garma-doctor | 健康顧問 | 健康諮詢、排毒建議 | ✅ Sub-agent |
| garma-business | 業務顧問 | 獎金計算、旅遊積分、常見問題，反對處理 | ✅ Sub-agent |
| garma-admin | 管理員 | 預約提醒、排毒提醒、最新資訊 | ✅ Sub-agent |
| garma-scraping | 爬蟲專員 | 抓取 Amway 官網產品 | ✅ Sub-agent |

### Intent → Sub-Agent Mapping

| Intent | Sub-Agent | 範例問題 |
|--------|------------|----------|
| product_query | garma-product | "有咩護膚品？" |
| beauty_consultation | garma-product | "護膚品推薦" |
| health_consultation | garma-doctor | "我想減肥" |
| bonus_calculate | garma-business | "我可以拎幾多獎金？" |
| travel_points | garma-business | "旅遊積分點計？" |
| faq | garma-business | "常見問題" |
| objection_handling | garma-business | "點樣答客人？" |
| order_create | garma-product | "我想訂貨" |
| order_status | garma-product | "我既訂單點？" |
| team_stats | garma-admin | "我團隊幾多人？" |
| reminder | garma-admin | "幾時有培訓？" |
| general_chat | garma-product | "你好" |

### 配置方式

每個 Sub-Agent 需要：
1. 獨立既 IDENTITY.md + SOUL.md
2. 專屬既 Prompt (based on AGENTS_CONFIG.md)
3. 特定既 Tool Set

### Sub-Agent Spawn 方式

```javascript
// garma main agent 收到 user message
// 先做 Intent Detection
const intent = detectIntent(userMessage);

// 根據 intent spawn 相應既 sub-agent
switch(intent) {
  case 'product_query':
  case 'beauty_consultation':
  case 'order_create':
  case 'order_status':
    // spawn garma-product
    return spawnSubAgent('garma-product', userMessage);
  
  case 'health_consultation':
    // spawn garma-doctor
    return spawnSubAgent('garma-doctor', userMessage);
  
  case 'bonus_calculate':
  case 'travel_points':
  case 'faq':
  case 'objection_handling':
    // spawn garma-business
    return spawnSubAgent('garma-business', userMessage);
  
  case 'team_stats':
  case 'reminder':
    // spawn garma-admin
    return spawnSubAgent('garma-admin', userMessage);
  
  default:
    // default to garma-product
    return spawnSubAgent('garma-product', userMessage);
}
```

---

*更新時間: 2026-03-12 14:50 HKT*
