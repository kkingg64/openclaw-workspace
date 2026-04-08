# AI + MT4 黃金交易機器人市場調查報告

**Date:** 2026-03-07  
**Researcher:** Fabio-Forex (CTO Trading)  
**Objective:** 搜尋坊間類似 AI + MT4 黃金交易機器人既產品

---

## 📊 市場概況

呢個領域處於早期階段，尚未有大型商業平台壟斷。開源項目多但Star數低，顯示市場未成熟。

---

## 1️⃣ GitHub 開源項目

### 值得留意既項目：

| 項目名 | Stars | 技術棧 | 重點 |
|--------|-------|--------|------|
| **EA_SCALPER_XAUUSD** | ⭐ 51 | MQL5 + NautilusTrader (Python) | 專為 Prop Firms (Apex/FTMO) 設計，支持 ML Regime Detection + ONNX |
| **ai-trader-for-mt4** | ⭐ 8 | Python | Python framework 連接 LLM 同 MT4，創建自主演算法交易機械人 |
| **AI-ML-Trading-Bot** | ⭐ 2 | Python | 支援 MT4/MT5 + 12+ broker platforms，結合 Smart Money Concept |
| **OpenTradingMT4bot** | ⭐ 1 | Python + React Native | Hybrid MT4 + Python + DeepSeek AI，呢個最近更新(2025-06) |
| **ai-bot-for-forex-gold-trading** | ⭐ 1 | Jupyter Notebook | 專為 XAUUSD 設計，用 ML 分析趨勢、波動率同新聞 |

**分析：**
- 最多星既係 `EA_SCALPER_XAUUSD` (51 stars)，明顯係專業級既黃金 scalping 機械人
- 大部分項目都係 2024-2025 年先出現，屬於新興領域
- 主要技術趨勢：Python + LLM + MT4/5 Bridge

---

## 2️⃣ Commercial 平台

### 主要玩家：

| 平台 | 類型 | 備註 |
|------|------|------|
| **3Commas** | SaaS Bot Platform | 主要加密貨幣，Forex支持較少 |
| **MetaTrader Experts** | Marketplace | MQL4/5 EA 交易機械人 marketplace |
| ** Zulutrade** | Social Trading | AI 交易者社區，可複制交易信號 |

**分析：**
- 尚未有大型 AI + MT4 + Gold 專門既 SaaS 平台
- 大部分現有平台都係加密貨幣或傳統 technical analysis
- MT5 Marketplace 有大量 EA，但AI驅動既唔多

---

## 3️⃣ 成功/失敗案例參考

### 值得注意既趨勢：

**成功關鍵：**
- ✅ ML Regime Detection - 識別市場狀態（震蕩/趨勢）
- ✅ ONNX 部署 - 輕量級 ML 模型
- ✅ Smart Money Concept - 機構資金流向分析

**失敗風險：**
- ❌ 过度依赖单一指标
- ❌ 無做好風險管理（prop firms 要求好嚴格）
- ❌ 無考慮滑點同流動性

---

## 🎯 市場缺口分析

**機會：**
1. **LLM + MT4 Bridge** - 市場上仲未有成熟既 Python-LLM-MT4 框架
2. **黃金專門** - 大部分 EA 都係 generic forex，少有 XAUUSD 優化
3. **中文市場** - 未見到中文界既 AI 黃金交易機械人

**建議方向：**
- 基於 `ai-trader-for-mT4` 框架改進
- 加入 `EA_SCALPER_XAUUSD` 既 ML Regime Detection
- 針對黃金特性優化（高波動性、避險属性）

---

## 📎 結論

市場處於早期，機會大於競爭對手。建議：
1. **技術驗證** - 參考 `ai-trader-for-mt4` + `EA_SCALPER_XAUUSD`
2. **差異化** - LLM 分析能力 + 黃金專門優化
3. **風險優先** - 從 backtesting 開始，prop firms 合規做起

---

*呢個係 Phase 1 既市場調研，等老闆批準後進行 Phase 2 (Technical Spec)。*
