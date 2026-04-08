# P005 - AI 智能大管家 (Amway + WhatsApp) Phase 1 研究報告

**項目:** AI 智能大管家  
**階段:** Phase 1 - 市場研究  
**負責人:** COO (Fabio-COO)  
**日期:** 2026-03-10 15:50 HKT  
**項目 ID:** P005

---

## 📋 項目背景

建立一個 AI 系統，整合 Amway 業務 + WhatsApp，根據唔同職級 (Pioneer, Platinum, Founders) 提供唔同權限。

---

## 🔬 研究假設 (Research Hypothesis)

1. WhatsApp Business API 係香港中小企常用渠道，定價有競爭力
2. RAG 方面，LlamaIndex 同 LangChain 都多人用，要比較邊個更啱做 Amway 呢種 document-heavy 既應用
3. Amway 既數位化落後其他直銷品牌，存在市場缺口

---

## 1️⃣ WhatsApp Business API 分析

### 定價 (2026 最新)

| 項目 | 收費 |
|------|------|
| **收費模式** | 按訊息收費 (Per-message basis) |
| **香港區域** | Rest of Asia Pacific (+852) |
| **Service 訊息** | ✅ 免費 |
| **Utility 訊息** (24小時內回覆) | ✅ 免費 |
| **72小時規則** | 用戶主動聯繫後72小時內，所有訊息免費 |
| **Volume Tiers** | 大量使用可解鎖更優惠價格 |

### 核心功能

| 功能 | 支援情況 |
|------|----------|
| **Chatbots** | ✅ 完整支援 |
| **Broadcast** | ✅ 透過 Template Messages |
| **Multi-agent** | ✅ 支援 |
| **API 整合** | ✅ Cloud API |
| **Template Messages** | ✅ Marketing/Utility/Authentication/Service |

### 💡 發現

- **香港定價**: 香港屬「Rest of Asia Pacific」，並無獨立定價，需參考 Volume Tier 機制
- **成本控制關鍵**: 利用 72小時免費窗口 + 24小時 Customer Service Window，可大幅降低成本
- **AI Provider 優惠**: Meta 2026年2月推出 AI Providers 新定價，可能有優惠

---

## 2️⃣ RAG 方案比較

### LlamaIndex vs LangChain

| 維度 | LlamaIndex | LangChain |
|------|------------|-----------|
| **定位** | 文件處理專家 | Agent 構建平台 |
| **PDF 處理** | ⭐ 強項 (LlamaParse) | 一般 |
| **開源** | ✅ 免費 | ✅ 免費 |
| **企業級** | LlamaParse 強 | LangSmith 強 |
| **學習曲線** | 中等 | 較高 |
| **免費額度** | 10,000 credits/月 (LlamaParse) | 無限 (開源) |

### 🔬 推薦方案

**對於 Amway 業務 (Document-heavy):**

1. **首選: LlamaIndex + LlamaParse**
   - PDF 處理能力強 (90+ 檔案格式)
   - 支援複雜表格、層次結構
   - 免費額度足夠初期使用

2. **備選: LangChain + LangGraph**
   - 如果需要複雜 agent workflows
   - Enterprise observability (LangSmith)

### PDF 處理需求

Amway 業務需要處理：
- ✅ 產品目錄 (PDF)
- ✅ 獎金計劃文件 (PDF)
- ✅ 培訓教材 (PDF)
- ✅ 政策文件 (PDF)

**LlamaParse** 專為呢啲場景設計，支援：
- 複雜 Layout 識別
- 表格結構提取
- 圖片內文字識別

---

## 3️⃣ Amway 業務數位化分析

### 行業現況

| 維度 | Amway 現況 | 評估 |
|------|------------|------|
| **CRM** | 落後 | ❌ 缺乏統一數位平台 |
| **培訓** | 傳統線下為主 | ❌ 未數位化 |
| **訂貨** | 傳統經銷商模式 | ❌ 可改進 |
| **溝通** | WhatsApp 分散使用 | ⚠️ 無統一管理 |

### 職級系統

| 職級 | 預期權限 | 商業價值 |
|------|----------|----------|
| **Pioneer** | 基礎功能 | 低 |
| **Platinum** | 中級權限 | 中 |
| **Founders** | 完整權限 + 團隊管理 | 高 |

### AI 工具機會

1. **自動回覆**: FAQ、產品查詢
2. **培訓助手**: PDF 文件 RAG 問答
3. **訂貨助手**: 庫存查詢、下單
4. **獎金計算**: 自動化獎金模擬
5. **團隊管理**: 下線業績追蹤

---

## 4️⃣ 市場缺口分析

### 🟢 機會 (Opportunities)

1. **香港直銷市場**
   - 數十萬直銷從業員
   - 大部分仍用 WhatsApp 個人帳號
   - 缺乏專業 CRM 工具

2. **痛點**
   - 文件散落各處，難以搜尋
   - 重複問題浪費時間
   - 獎金計算不透明

3. **技術成熟度**
   - RAG 技術已成熟
   - WhatsApp API 穩定
   - LLM 成本持續下降

### 🔴 挑戰 (Threats)

1. **Meta 政策**: WhatsApp 訊息有嚴格規範
2. **數據私隱**: 直銷涉及個人資料
3. **競爭**: 可能已有類似解決方案

---

## 5️⃣ ROI 估算

### 假設場景

- **目標用戶**: 500 個 Amway 直銷商 (Pilot)
- **功能**: AI 助手 + WhatsApp 整合

### 成本估算

| 項目 | 月費 (HKD) |
|------|------------|
| WhatsApp API (假設 10,000 訊息/月) | ~$500 - $1,000 |
| LlamaParse (10k credits) | 免費 |
| LLM API (MiniMax) | ~$500 |
| 伺服器 (VPS) | ~$200 |
| **總計** | **~$1,200 - $1,700/月** |

### 收益估算

| 來源 | 潛在收益 |
|------|----------|
| 節省時間價值 | $5,000+/月 (假設節省 50小時 x $100) |
| 訂單成交率提升 | 待測試 |
| 培訓課程收費 | 可選 |

### 💡 結論

**ROI 正面**，關鍵係：
1. 驗證用戶痛點真實存在
2. 先做 MVP 驗證
3. 根據數據調整功能優先級

---

## 📊 總結與建議

### ✅ 研究結論

1. **WhatsApp Business API**: 成本可控，72小時免費窗口係關鍵
2. **RAG 方案**: LlamaIndex + LlamaParse 最適合 Amway 文件場景
3. **市場缺口**: 存在明確機會，但需驗證
4. **ROI**: 初步睇正面，值得嘗試

### 🎯 下一步建議

| 優先級 | 動作 |
|--------|------|
| **P0** | 與潛在用戶訪談，驗證痛點 |
| **P1** | 設計 MVP 功能範圍 |
| **P2** | 技術架構評估 (Phase 2) |
| **P3** | 計算更精確 ROI |

### ⚠️ 風險提示

1. WhatsApp 政策可能變化
2. 直銷行業監管風險
3. 數據私隱合規需注意

---

**簽署:**

[COO_SIGNED_2026_03_10_1550_HKT]

---

## 📎 附錄：資料來源

- WhatsApp Business Pricing: https://developers.facebook.com/docs/whatsapp/pricing
- WhatsApp Business Platform: https://business.whatsapp.com/products/business-platform
- LlamaIndex: https://www.llamaindex.ai/
- LangChain: https://www.langchain.com/
