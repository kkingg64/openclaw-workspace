# P005 - Garma AI UAT Test Cases

**項目:** Garma AI (原名：Amway AI Butler / AI 智能大管家)
**階段:** Phase 2 - UAT Test Cases
**執行者:** COO (Fabio-COO)
**日期:** 2026-03-11 07:00 HKT
**項目 ID:** P005
**部署環境:** Mac Mini (100.102.72.91)
**WhatsApp 方案:** Green API
**OpenClaw Port:** 18789

---

## 🎯 測試目標

確保 Garma AI 系統能夠通過 WhatsApp 為 Amway 直銷商提供智能助手服務，包括：
- 產品查詢
- 訂單管理
- 獎金計算
- RAG 文件搜尋
- 團隊數據查詢 ( Founders 權限)

---

## 📋 Test Cases

### TC-001: WhatsApp 連接 - Green API 初始化

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-001 |
| **功能** | 驗證 Green API 正確連接 WhatsApp |
| **Pre-condition** | Green API 帳戶已註冊，手機 App 已掃描 QR Code |
| **測試步驟** | 1. 登入 green-api.com 控制台<br>2. 確認 Instance 狀態為 "online"<br>3. 發送測試訊息到已連接手機 |
| **預期結果** | - Instance 狀態顯示 "online"<br>- 測試訊息成功發送並送達 |
| **UAT Pass 準則** | ✅ Instance 狀態為 online<br>✅ 訊息成功送達 |
| **優先權** | P0 - Critical |

---

### TC-002: WhatsApp 訊息接收 - n8n Webhook

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-002 |
| **功能** | 驗證 WhatsApp 訊息能夠傳送到 n8n |
| **Pre-condition** | n8n 已部署於 Mac Mini (Port 5678)，Green API Webhook 已配置 |
| **測試步驟** | 1. 從 WhatsApp 發送訊息 "Hello" 到連接既手機<br>2. 检查 n8n Webhook 是否收到請求<br>3. 檢查數據庫是否有新既 conversation 記錄 |
| **預期結果** | - n8n 收到 Webhook 請求<br>>- Database 成功記錄訊息 |
| **UAT Pass 準則** | ✅ n8n Webhook 日誌顯示收到請求<br>✅ PostgreSQL conversations 表有新記錄 |
| **優先權** | P0 - Critical |

---

### TC-003: AI 回覆生成 - OpenClaw Gateway

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-003 |
| **功能** | 驗證 AI 能夠通過 OpenClaw (Port 18789) 生成回覆 |
| **Pre-condition** | OpenClaw Gateway 已運行於 Mac Mini Port 18789，MiniMax API Key 已配置 |
| **測試步驟** | 1. 發送訊息 "你好" 到 WhatsApp<br>2. 等待 n8n 處理<br>3. 檢查回覆是否由 AI 生成 |
| **預期結果** | - 用戶收到 AI 回覆<br>- 回覆包含 MiniMax 模型特徵 |
| **UAT Pass 準則** | ✅ 收到回覆<br>✅ 回覆時間 < 10 秒 |
| **優先權** | P0 - Critical |

---

### TC-004: 產品查詢功能

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-004 |
| **功能** | 用戶查詢產品資訊 |
| **Pre-condition** | 產品數據已載入 PostgreSQL |
| **測試步驟** | 1. 發送訊息 "請問紐崔萊蛋白粉既價錢？"<br>2. 等待 AI 回覆<br>3. 檢查回覆是否包含正確既價格同 PV |
| **預期結果** | - AI 回覆產品名稱<br>- 顯示正確既 HKD 價格<br>- 顯示正確既 PV 值 |
| **UAT Pass 準則** | ✅ 回覆包含正確產品名稱<br>✅ 價格與數據庫一致<br>✅ PV 與數據庫一致 |
| **優先權** | P0 - Critical |

---

### TC-005: 權限控制 - Pioneer 權限

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-005 |
| **功能** | 驗證 Pioneer 職級用戶既權限限制 |
| **Pre-condition** | 數據庫已有 Pioneer 職級測試用戶 |
| **測試步驟** | 1. 以 Pioneer 身份發送 "我想睇下團隊數據"<br>2. 檢查回覆是否被拒絕 |
| **預期結果** | AI 礼貌拒絕並說明權限不足 |
| **UAT Pass 準則** | ✅ 回覆包含拒絕訊息<br>✅ 提及權限不足 |
| **優先權** | P1 - High |

---

### TC-006: 權限控制 - Founders 權限

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-006 |
| **功能** | 驗證 Founders 職級用戶既完整權限 |
| **Pre-condition** | 數據庫已有 Founders 職級測試用戶 |
| **測試步驟** | 1. 以 Founders 身份發送 "請問我既團隊有幾多人？"<br>2. 檢查回覆是否包含團隊數據 |
| **預期結果** | AI 回覆團隊成員數量及相關資訊 |
| **UAT Pass 準則** | ✅ 回覆包含團隊數據<br>✅ 數據與數據庫一致 |
| **優先權** | P1 - High |

---

### TC-007: RAG 文件搜尋

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-007 |
| **功能** | 用戶通過自然語言搜尋文件庫 |
| **Pre-condition** | 文件已上傳並生成向量嵌入 (pgvector) |
| **測試步驟** | 1. 發送 "請問最新既獎金政策係點？"<br>2. 等待 AI RAG 搜尋<br>3. 檢查回覆是否引用相關文件 |
| **預期結果** | - AI 回覆包含相關政策內容<br>- 引用來源文件 |
| **UAT Pass 準則** | ✅ 回覆包含政策內容<br>✅ 標註來源文件 |
| **優先權** | P1 - High |

---

### TC-008: 訂單建立

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-008 |
| **功能** | 用戶通過 WhatsApp 建立訂單 |
| **Pre-condition** | 數據庫已有產品數據，用戶為 Platinum 或 Founders |
| **測試步驟** | 1. 發送 "我想訂 2 盒紐崔萊蛋白粉"<br>2. 確認訂單詳情<br>3. 確認建立訂單 |
| **預期結果** | - 系統回覆訂單詳情<br>- 數據庫建立新既訂單記錄 |
| **UAT Pass 準驗** | ✅ 回覆包含訂單編號<br>✅ 數據庫 orders 表有新記錄 |
| **優先權** | P1 - High |

---

### TC-009: 訂單狀態查詢

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-009 |
| **功能** | 用戶查詢現有訂單既狀態 |
| **Pre-condition** | 數據庫已有測試訂單 |
| **測試步驟** | 1. 發送 "我想睇下我既訂單狀態"<br>2. 檢查回覆是否顯示訂單列表或狀態 |
| **預期結果** | AI 回覆訂單狀態 (Pending/Processing/Shipped/Delivered) |
| **UAT Pass 準則** | ✅ 回覆包含訂單狀態<br>✅ 狀態與數據庫一致 |
| **優先權** | P2 - Medium |

---

### TC-010: 獎金計算

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-010 |
| **功能** | 用戶查詢獎金計算 |
| **Pre-condition** | 用戶為 Platinum 或 Founders，數據庫已有訂單數據 |
| **測試步驟** | 1. 發送 "請問我既獎金有幾多？"<br>2. 等待 AI 計算<br>3. 檢查回覆是否包含獎金明細 |
| **預期結果** | AI 回覆獎金計算明細，包括 PV 、百分比、金額 |
| **UAT Pass 準則** | ✅ 回覆包含獎金金額<br>✅ 計算邏輯正確 |
| **優先權** | P1 - High |

---

### TC-011: Rate Limiting - 防濫用

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-011 |
| **功能** | 驗證系統能防止訊息濫用 |
| **Pre-condition** | Redis 已配置 rate limiting |
| **測試步驟** | 1. 在 1 分鐘內發送超過 10 個訊息<br>2. 檢查第 11 個訊息既回覆 |
| **UAT Pass 準則** | - 系統返回 rate limit 提示<br>- "請稍後再試" 或類似訊息 |
| **優先權** | P1 - High |

---

### TC-012: Docker 容器健康檢查

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-012 |
| **功能** | 驗證 Mac Mini 上所有 Docker 容器正常運行 |
| **Pre-condition** | Mac Mini 已部署 Docker Compose |
| **測試步驟** | 1. SSH 到 Mac Mini (100.102.72.91)<br>2. 執行 `docker ps` 檢查容器狀態<br>3. 檢查每個服務既健康狀態 |
| **預期結果** | - n8n 容器運行中 (Port 5678)<br>- PostgreSQL 容器運行中 (Port 5432)<br>- Redis 容器運行中 (Port 6379)<br>- OpenClaw 容器運行中 (Port 18789) |
| **UAT Pass 準則** | ✅ 所有 4 個容器狀態為 "Up"<br>✅ 每個容器健康檢查通過 |
| **優先權** | P0 - Critical |

---

### TC-013: OpenClaw Gateway API

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-013 |
| **功能** | 驗證 OpenClaw Gateway (Port 18789) 可正確調用 AI |
| **Pre-condition** | OpenClaw Gateway 已運行，MiniMax API Key 已配置 |
| **測試步驟** | 1. 發送 POST 請求到 `http://100.102.72.91:18789/v1/chat/completions`<br>2. 檢查回覆是否包含 AI 生成既內容 |
| **預期結果** | - API 返回 200 狀態<br>- 回覆包含 AI 生成既文字 |
| **UAT Pass 準則** | ✅ HTTP 200<br>✅ 回覆包含有效 AI 內容 |
| **優先權** | P0 - Critical |

---

### TC-014: PostgreSQL 數據庫連接

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-014 |
| **功能** | 驗證 n8n 能夠連接 PostgreSQL + pgvector |
| **Pre-condition** | PostgreSQL 容器已運行 |
| **測試步驟** | 1. 在 n8n 中測試數據庫連接<br>2. 執行簡單既 SELECT 查詢 |
| **預期結果** | - 連接成功<br>- 能夠執行查詢 |
| **UAT Pass 準則** | ✅ 連接狀態為 "Connected"<br>✅ 查詢返回結果 |
| **優先權** | P0 - Critical |

---

### TC-015: Redis Session Cache

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-015 |
| **功能** | 驗證 Redis 能夠緩存 Session 數據 |
| **Pre-condition** | Redis 容器已運行 |
| **測試步驟** | 1. 發送一個會觸發 Session 既訊息<br>2. 檢查 Redis 中既 session key |
| **預期結果** | Redis 成功設置 session key |
| **UAT Pass 準則** | ✅ Redis 中存在 session key<br>✅ Key 有正確既 TTL |
| **優先權** | P2 - Medium |

---

### TC-016: n8n Workflow 錯誤處理

| 項目 | 內容 |
|------|------|
| **Test Case ID** | TC-016 |
| **功能** | 驗證 n8n 能夠處理錯誤並記錄日誌 |
| **Pre-condition** | n8n Workflow 已配置 |
| **測試步驟** | 1. 故意發送錯誤格式既訊息<br>2. 檢查 n8n error log |
| **UAT Pass 準則** | - 系統返回一般錯誤訊息<br>✅ Error 有記錄到日誌 |
| **優先權** | P2 - Medium |

---

## 📊 Test Environment 總結

### 部署環境
| 項目 | 詳情 |
|------|------|
| **主機** | Mac Mini |
| **IP** | 100.102.72.91 |
| **用戶** | openclaw |
| **密碼** | horseplus |

### 開放 Port
| Port | 服務 | 用途 |
|------|------|------|
| 18789 | OpenClaw Gateway | AI 對話 |
| 5678 | n8n | Workflow 引擎 |
| 5432 | PostgreSQL + pgvector | 數據庫 + 向量 |
| 6379 | Redis | Session Cache |

### Green API 配置
| 項目 | 詳情 |
|------|------|
| **官網** | green-api.com |
| **Instance ID** | (待配置) |
| **Token** | (待配置) |
| **WhatsApp** | 已掃描 QR Code 連接手機 |

---

## ✅ UAT Pass 標準

**所有 P0 Critical 測試必須通過：**
- TC-001: Green API 連接
- TC-002: WhatsApp 訊息接收
- TC-003: AI 回覆生成
- TC-012: Docker 容器健康檢查
- TC-013: OpenClaw Gateway API
- TC-014: PostgreSQL 數據庫連接

**P1 High 優先權測試至少 80% 通過**
**P2 Medium 優先權測試至少 60% 通過**

---

## 📝 測試記錄

| 日期 | 測試者 | 通過 | 失敗 | 備註 |
|------|--------|------|------|------|
| 2026-03-11 | COO | - | - | Initial Test Case Creation |

---

**簽署:**

[COO_SIGNED_2026_03_11_0700_HKT]

---

*End of UAT Test Cases*
