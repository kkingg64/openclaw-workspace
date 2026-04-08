# MT4 黃金自動交易 - 技術可行性提案

**Author:** Fabio-Forex (CTO of Trading)
**Date:** 2026-03-07
**Project:** MT4 XAU/USD Automated Trading

---

## 1. 技術可行性分析

### 1.1 MT4 API 對接方式

MT4 (MetaTrader 4) 本身並冇官方 REST API，但有以下幾種對接方式：

| 方式 | 描述 | 難度 |
|------|------|------|
| **MT4 Web API** | 第三方 wrapper (e.g., mt4api, MetaTrader WebAPI) | ⭐⭐ |
| **DLL Bridge** | C++/C# 編寫 DLL，MT4 调用 | ⭐⭐⭐⭐ |
| **ZeroMQ/TCP** | 透過消息隊列 bridge | ⭐⭐⭐ |
| **MQL4 EA** | 直接在 MT4 寫 EA | ⭐⭐ |

### 1.2 可用 Library/Tools

| Library | 語言 | 功能 | 最後更新 |
|---------|------|------|----------|
| **mt4api** | Python | HTTP REST API wrapper | 2023 |
| **mt4-python-bridge** | Python | ZeroMQ bridge | 2022 |
| **MetaTraderSharp** | C# | DLL wrapper | 2021 |
| **MetaApi** | Any | 雲端 API (收費) | 2024 |

### 1.3 需要既環境

```
┌─────────────────────────────────────────────────────────┐
│                    建議架構                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   [AI Agent]  ────>  [Python Bridge]  ───>  [MT4]      │
│   (OpenClaw)       (ZeroMQ/HTTP)         (VPS)         │
│                                                         │
│   需要：                                                │
│   ├── VPS (Ubuntu 20.04+ / Windows Server)             │
│   ├── MT4 Terminal (IC Markets / XM 等)               │
│   ├── Python 3.10+環境                                 │
│   └── 網絡穩定性 (低延遲)                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. 實現方案比較

### 方案 A: MetaTrader Web API

**運作方式：** 第三方 Web API server，Python 透過 HTTP request 控制 MT4

**Pros:**
- ✅ 安裝簡單
- ✅ 可以遠程控制
- ✅ 有現成既 documentation

**Cons:**
- ❌ 需要穩定既 network connection
- ❌ 第三方 solution，風險自負
- ❌ 可能需要收費

**推薦工具：** [mt4api](https://github.com/mt4api/mt4-api-python)

---

### 方案 B: Python + MT4 Bridge (ZeroMQ)

**運作方式：** 
- MT4 端：MQL4 script 做 server，收發 JSON
- Python 端：ZeroMQ client 發送指令

**Pros:**
- ✅ 速度快 (millisecond level)
- ✅ 雙向溝通 (MT4 可以 push quotes 回 AI)
- ✅ 免費開源

**Cons:**
- ❌ 需要寫 MQL4 code
- ❌ 技術門檻較高

**推薦工具：** 
- [mt4-python-bridge](https://github.com/nickvandewiele/mt4-python-bridge)
- [ZMQ + MQL4](https://www.mql5.com/en/articles/2521)

---

### 方案 C: MQL4 EA (Expert Advisor)

**運作方式：** 直接用 MQL4 寫晒所有交易邏輯，AI 只負責 signal generation

**Pros:**
- ✅ 直接運行係 MT4，零延遲
- ✅ 最穩定可靠
- ✅ 完全控制

**Cons:**
- ❌ MQL4 語法較舊，難寫複雜策略
- ❌ 修改需要重啟 MT4
- ❌ AI 同 EA 耦合太高

**適用場景：** 簡單既機械式策略 (e.g., MA Cross, RSI 範圍)

---

### 📊 方案比較總表

|  Criteria  | 方案 A (Web API) | 方案 B (Python Bridge) | 方案 C (MQL4 EA) |
|-----------|------------------|----------------------|------------------|
| 開發速度  | ⭐⭐⭐⭐          | ⭐⭐⭐               | ⭐⭐⭐⭐          |
| 穩定性    | ⭐⭐⭐           | ⭐⭐⭐⭐             | ⭐⭐⭐⭐⭐        |
| 靈活性    | ⭐⭐⭐⭐         | ⭐⭐⭐⭐⭐           | ⭐⭐             |
| 成本      | ⭐⭐             | ⭐⭐⭐⭐⭐           | ⭐⭐⭐⭐⭐        |
| 技術難度  | ⭐⭐             | ⭐⭐⭐               | ⭐⭐⭐            |

### 🎯 建議：方案 B (Python + ZeroMQ Bridge)

理由：
1. 保持 AI decision-making 同 execution 分離
2. 可以用到 Python 强大既 ML/分析 libraries
3. 雙向溝通，可以實時 monitoring

---

## 3. 風險控制機制

**「Protection first, then profit.」**

### 3.1 防止瘋狂落單 (Order Spam Protection)

```python
# 強制冷卻期
class RiskManager:
    def __init__(self):
        self.min_order_interval = 60  # 秒
        self.last_order_time = 0
        self.max_orders_per_hour = 10
        self.order_count = []
    
    def can_order(self) -> bool:
        now = time.time()
        # 冷卻期檢查
        if now - self.last_order_time < self.min_order_interval:
            return False
        
        # 每小時上限檢查
        self.order_count = [t for t in self.order_count if now - t < 3600]
        if len(self.order_count) >= self.max_orders_per_hour:
            return False
        
        return True
```

### 3.2 最大持倉限制 (Position Limits)

```python
class RiskManager:
    MAX_LOTS = 2.0          # 最多 2 手
    MAX_POSITIONS = 3       # 最多 3 張單
    MAX_DAILY_LOSS = 500    # 每日最多輸 USD 500
    
    def check_position_limits(self, symbol: str, lots: float) -> bool:
        current_lots = self.get_total_lots()
        if current_lots + lots > self.MAX_LOTS:
            return False
        return True
```

### 3.3 自動停損機制 (Auto Stop-Loss)

```python
class AutoStopLoss:
    def __init__(self):
        self.default_sl_pips = 50      # 預設 50 pips SL
        self.default_tp_pips = 100     # 預設 100 pips TP
        self.trailing_stop = 30        # 30 pips trailing
    
    def set_sl_tp(self, order, sl_price, tp_price):
        # 落單時必須設定 SL/TP
        # 如果冇提供，自動計算
        if not sl_price:
            sl_price = self.calculate_default_sl(order)
        # ... execute order with SL/TP
```

### 3.4 緊急熔斷機制 (Circuit Breaker)

```python
class CircuitBreaker:
    def __init__(self):
        self.max_consecutive_losses = 5
        self.max_daily_drawdown = 1000  # USD
        self.cooldown_minutes = 60
    
    def should_stop(self, stats: dict) -> bool:
        if stats['consecutive_losses'] >= self.max_consecutive_losses:
            self.trigger_cooldown()
            return True
        
        if stats['daily_drawdown'] >= self.max_daily_drawdown:
            self.trigger_cooldown()
            return True
        
        return False
```

---

## 4. MVP 範圍建議

### Phase 1: 基礎骨架 (2-3 weeks)

**目標：** 做到 AI 發 signal，MT4 自動落單

| 功能 | 描述 |
|------|------|
| ✅ MT4 Connection | Python 連接 MT4 terminal |
| ✅ Basic Order | 支援市價單 (Market Order) |
| ✅ SL/TP | 落單時自動設定停損/止盈 |
| ✅ Signal Format | 定義 AI → MT4 既 signal 格式 |
| ✅ Test Account | 係 Demo Account 測試 |

**交付物：**
- `mt4_bridge.py` - Python-MT4 連接模組
- `demo_trading.py` - 測試 script
- Document: Signal Format Specification

**驗收標準：**
- Python 可以成功落單到 MT4 Demo
- SL/TP 正常運作

---

### Phase 2: 風險控制同優化 (2-3 weeks)

**目標：** 加入完整既風險控制，支援 Real Account

| 功能 | 描述 |
|------|------|
| ✅ Position Manager | 持倉管理、同倉控制 |
| ✅ Risk Limits | 每日 loss limit、max lots |
| ✅ Circuit Breaker | 連續虧損自動停機 |
| ✅ Logging | 完整既交易紀錄 |
| ✅ Error Handling | 網絡斷線、MT4 當機處理 |

**交付物：**
- `risk_manager.py` - 風險控制模組
- `trading_logger.py` - 交易日誌
- `emergency_stop.py` - 緊急停損機制

**驗收標準：**
- 連續 5 單輸自動停機
- 每日 loss 超過 USD 500 自動停機

---

### Phase 3: 高級功能 (Optional, 3-4 weeks)

| 功能 | 描述 |
|------|------|
| 🔄 Partial Close | 部分平倉 |
| 🔄 Hedging | 對沖保護 |
| 🔄 Multi-Timeframe | 多時間框架分析 |
| 🔄 Backtest Module | 回測功能 |

---

## 📅 時間估算

| Phase | Duration | Total |
|-------|----------|-------|
| Phase 1 | 2-3 weeks | 2-3 weeks |
| Phase 2 | 2-3 weeks | 4-6 weeks |
| Phase 3 | 3-4 weeks | 7-10 weeks |

**預計 MVP (Phase 1-2) 完成時間：4-6 星期**

---

## ⚠️ 風險評估

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| MT4 platform crash | Medium | High | Auto-restart MT4 |
| Network disconnection | High | High | Reconnection logic |
| Over-trading | High | High | Risk limits enforced |
| Slippage/Floating spread | Medium | Medium | Max slippage setting |
| Broker rejection | Low | High | Retry logic + alerts |

---

## 🎯 下一步行動

1. **批准提案** → 開始 Phase 1
2. **準備環境** → 申請 MT4 Demo Account
3. **選擇 Broker** → IC Markets / XM (建議 IC Markets，較穩定)

---

**「Risk first, then profit.」**
