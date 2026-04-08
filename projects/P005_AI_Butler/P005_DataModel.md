# P005 - AI 智能大管家 數據模型

**項目:** AI 智能大管家  
**階段:** Phase 2 - 數據建模  
**負責人:** CDO (Fabio-CDO)  
**日期:** 2026-03-10 16:10 HKT  
**項目 ID:** P005

---

## 📋 概述

本文檔定義 P005 系統的數據結構，涵蓋用戶管理、對話記錄、產品數據與權限控制。

---

## 1️⃣ 用戶資料結構 (Users)

### 表名: `users`

| 欄位 | 類型 | 說明 | 範例 |
|------|------|------|------|
| `id` | UUID | 主鍵 | `usr_abc123...` |
| `whatsapp_phone` | VARCHAR(20) | WhatsApp 電話號碼 (+852...) | `+85298765432` |
| `whatsapp_name` | VARCHAR(100) | WhatsApp 顯示名稱 | `John Lee` |
| `amway_id` | VARCHAR(50) | Amway 經銷商編號 (可選) | `AMW123456` |
| `rank` | ENUM | 職級 | `pioneer`, `platinum`, `founders` |
| `status` | ENUM | 帳戶狀態 | `active`, `suspended`, `inactive` |
| `referrer_id` | UUID | 上線 (推薦人) | `usr_xxx...` |
| `team_size` | INTEGER | 團隊人數 (Founders專有) | `25` |
| `created_at` | TIMESTAMP | 創建時間 | `2026-01-15 10:00:00` |
| `updated_at` | TIMESTAMP | 最後更新 | `2026-03-10 14:30:00` |
| `metadata` | JSON | 擴展欄位 | `{"line_id": "xxx"}` |

### 職級權限對照表

| 功能 | Pioneer | Platinum | Founders |
|------|---------|----------|----------|
| 產品查詢 | ✅ | ✅ | ✅ |
| FAQ 自動回覆 | ✅ | ✅ | ✅ |
| 文件 RAG 搜尋 | ✅ | ✅ | ✅ |
| 訂貨功能 | ❌ | ✅ | ✅ |
| 獎金計算 | ❌ | ✅ | ✅ |
| 團隊業績查看 | ❌ | ❌ | ✅ |
| Admin 管理介面 | ❌ | ❌ | ✅ |
| API 存取權限 | Limited | Standard | Full |

---

## 2️⃣ 對話記錄結構 (Conversations)

### 表名: `conversations`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `user_id` | UUID | 關聯用戶 (FK → users.id) |
| `wa_message_id` | VARCHAR(100) | WhatsApp 訊息 ID |
| `direction` | ENUM | `inbound` / `outbound` |
| `message_type` | ENUM | `text`, `image`, `document`, `audio` |
| `content` | TEXT | 訊息內容 |
| `media_url` | VARCHAR(500) | 媒體檔案 URL |
| `ai_response` | BOOLEAN | 是否為 AI 生成回覆 |
| `rag_source` | JSON | RAG 引用來源 (如適用) |
| `tokens_used` | INTEGER | 消耗的 tokens |
| `created_at` | TIMESTAMP | 訊息時間 |

### 表名: `conversation_sessions`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `user_id` | UUID | 關聯用戶 |
| `started_at` | TIMESTAMP | 對話開始時間 |
| `ended_at` | TIMESTAMP | 對話結束時間 |
| `message_count` | INTEGER | 訊息總數 |
| `avg_response_time_ms` | INTEGER | 平均回覆時間 |

---

## 3️⃣ 產品數據庫 (Products)

### 表名: `products`

| 欄位 | 類型 | 說明 | 範例 |
|------|------|------|------|
| `id` | UUID | 主鍵 | `prod_xxx...` |
| `sku` | VARCHAR(50) | 產品編號 | `AMW-NUTR-001` |
| `name_zh` | VARCHAR(200) | 中文名稱 | `紐崔萊蛋白粉` |
| `name_en` | VARCHAR(200) | 英文名稱 | `Nutrilite Protein` |
| `category` | VARCHAR(50) | 產品類別 | `營養食品`, `護理`, `家居` |
| `subcategory` | VARCHAR(50) | 子類別 | `維生素`, `護手霜` |
| `description` | TEXT | 產品描述 | ... |
| `price_hkd` | DECIMAL(10,2) | 零售價 (港幣) | `458.00` |
| `pv` | DECIMAL(10,2) | PV 值 (Amway 積分) | `35.00` |
| `commission_rate` | DECIMAL(5,2) | 佣金比率 (%) | `21.00` |
| `stock_quantity` | INTEGER | 庫存數量 | `100` |
| `is_active` | BOOLEAN | 是否上架 | `true` |
| `image_url` | VARCHAR(500) | 產品圖片 URL | ... |
| `document_urls` | JSON | 產品文檔 PDF | `[{"name": "目錄", "url": "..."}]` |
| `created_at` | TIMESTAMP | 創建時間 |

### 表名: `product_categories`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `name` | VARCHAR(100) | 類別名稱 |
| `parent_id` | UUID | 上層類別 (支援多層) |
| `sort_order` | INTEGER | 排序 |

---

## 4️⃣ 訂單與購買記錄 (Orders)

### 表名: `orders`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `order_number` | VARCHAR(20) | 訂單編號 |
| `user_id` | UUID | 訂購用戶 |
| `status` | ENUM | `pending`, `confirmed`, `shipped`, `delivered`, `cancelled` |
| `total_pv` | DECIMAL(10,2) | 總 PV |
| `total_amount_hkd` | DECIMAL(10,2) | 總金額 |
| `shipping_address` | TEXT | 送貨地址 |
| `notes` | TEXT | 備註 |
| `created_at` | TIMESTAMP | 訂單時間 |
| `updated_at` | TIMESTAMP | 更新時間 |

### 表名: `order_items`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `order_id` | UUID | 訂單 ID |
| `product_id` | UUID | 產品 ID |
| `quantity` | INTEGER | 數量 |
| `unit_price_hkd` | DECIMAL(10,2) | 單價 |
| `pv` | DECIMAL(10,2) | PV |

---

## 5️⃣ RAG 文件庫 (Documents)

### 表名: `documents`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `title` | VARCHAR(200) | 文件標題 |
| `doc_type` | ENUM | `policy`, `training`, `product`, `bonus`, `other` |
| `file_url` | VARCHAR(500) | 原始文件 URL |
| `file_type` | VARCHAR(20) | `pdf`, `docx`, `txt` |
| `file_size_mb` | DECIMAL(10,2) | 檔案大小 |
| `embedding_status` | ENUM | `pending`, `processing`, `completed`, `failed` |
| `chunk_count` | INTEGER | 分塊數量 |
| `version` | VARCHAR(20) | 版本號 |
| `min_rank_required` | ENUM | 最低讀取權限 |
| `uploaded_by` | UUID | 上傳者 |
| `created_at` | TIMESTAMP | 上傳時間 |

### 表名: `document_embeddings`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `document_id` | UUID | 文件 ID |
| `chunk_text` | TEXT | 分塊內容 |
| `embedding` | VECTOR(1536) | 向量嵌入 |
| `page_number` | INTEGER | 頁碼 |
| `chunk_index` | INTEGER | 塊索引 |

---

## 6️⃣ 權限管理 (Permissions)

### 表名: `permissions`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `name` | VARCHAR(50) | 權限名稱 |
| `code` | VARCHAR(50) | 權限代碼 |
| `description` | TEXT | 描述 |
| `module` | VARCHAR(50) | 所屬模組 |

### 表名: `role_permissions`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `role` | ENUM | 角色 |
| `permission_code` | VARCHAR(50) | 權限代碼 |

### 權限代碼列表

| Code | 描述 | Pioneer | Platinum | Founders |
|------|------|:-------:|:--------:|:--------:|
| `product.read` | 產品查詢 | ✅ | ✅ | ✅ |
| `order.create` | 建立訂單 | ❌ | ✅ | ✅ |
| `order.read.own` | 查看自己訂單 | ❌ | ✅ | ✅ |
| `bonus.calculate` | 獎金計算 | ❌ | ✅ | ✅ |
| `team.read` | 團隊數據 | ❌ | ❌ | ✅ |
| `admin.users` | 用戶管理 | ❌ | ❌ | ✅ |
| `admin.documents` | 文檔管理 | ❌ | ❌ | ✅ |
| `admin.analytics` | 數據分析 | ❌ | ❌ | ✅ |

---

## 7️⃣ 日誌與審計 (Audit Logs)

### 表名: `audit_logs`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | UUID | 主鍵 |
| `user_id` | UUID | 操作用戶 |
| `action` | VARCHAR(50) | 動作 |
| `resource_type` | VARCHAR(50) | 資源類型 |
| `resource_id` | UUID | 資源 ID |
| `details` | JSON | 詳情 |
| `ip_address` | VARCHAR(45) | IP 地址 |
| `created_at` | TIMESTAMP | 時間 |

---

## 8️⃣ 系統配置 (System Config)

### 表名: `system_config`

| 欄位 | 類型 | 說明 |
|------|------|------|
| `key` | VARCHAR(100) | 配置鍵 |
| `value` | TEXT | 配置值 |
| `type` | VARCHAR(20) | 類型 |
| `description` | TEXT | 描述 |
| `updated_at` | TIMESTAMP | 更新時間 |

---

## 📊 ER 關係圖 (文字版)

```
users (1) ──────< (N) conversations
users (1) ──────< (N) orders
users (1) ──────< (N) audit_logs
orders (1) ─────< (N) order_items
products (1) ───< (N) order_items
documents (1) ─-< (N) document_embeddings
```

---

## 🛠️ 技術實現建議

### 數據庫選擇
- **主數據庫**: PostgreSQL (支援 JSON + Vector)
- **向量數據庫**: pgvector (或 Pinecone/Weaviate)
- **緩存**: Redis (對話 Session)

### API 設計遵循 RESTful 規範
- `/api/v1/users` - 用戶管理
- `/api/v1/conversations` - 對話記錄
- `/api/v1/products` - 產品查詢
- `/api/v1/orders` - 訂單管理
- `/api/v1/documents` - 文檔管理
- `/api/v1/rag/search` - RAG 搜尋

---

**簽署:**

[CDO_SIGNED_2026_03_10_1610_HKT]

---

*End of Data Model*
