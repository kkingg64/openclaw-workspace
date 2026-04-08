# 🔄 P2026-002 Meal Planner - Phase 1 Research Update

**Project:** P2026-002 Meal Planner  
**階段:** Phase 1 - Research Update (回溯修正)  
**執行者:** COO (Fabio-COO)  
**日期:** 2026-03-08

---

## 📋 背景

UAT 測試發現 **TC-002 FAIL**：
- **預期:** API 返回 **3 道**餸
- **實際:** API 返回 **12 道**餸
- **根因:** Prompt + API 後處理問題

---

## 🔍 根因分析 (Root Cause Analysis)

### 問題 1: Prompt 設計模糊

**現有 Prompt:**
```
請根據以下要求suggest 3道唔重覆既家常菜：
```

**問題:**
- 「3道」可以解讀為「至少3道」
- 冇強制性語言（如「必須恰好3道」）
- MiniMax 可能會「好意」多給一些選擇

### 問題 2: API 後處理冇 Limit

**現有 Code (`route.ts`):**
```javascript
const recipes = JSON.parse(jsonStr).recipes || JSON.parse(jsonStr);
```

**問題:**
- 直接pass曬所有recipes，冇截取前3個
- 應該 `recipes.slice(0, 3)` 先岩

### 問題 3: Design vs TechSpec 不一致

| 文件 | 數量 |
|------|------|
| Phase 2 Design | 3道 |
| Phase 3 TechSpec | 3-5道 |

**呢個係協調問題 — 應該統一為「恰好3道」**

---

## 💡 解決方案建議

### 方案 A: Prompt 優化 (推薦)

**修改 `/src/app/api/generate/route.ts` 既 prompt:**

```diff
- 請根據以下要求suggest 3道唔重覆既家常菜：
+ 請根據以下要求，嚴格返回恰好3道唔重覆既家常菜：
+ - 必須恰好返回 3 道餸，唔可以多過3道
+ - 每一道都要有 name, method, ingredients
```

### 方案 B: API 後處理加 Limit (必須)

**修改 `/src/app/api/generate/route.ts`:**

```diff
- let recipes = JSON.parse(jsonStr).recipes || JSON.parse(jsonStr);
+ let recipes = JSON.parse(jsonStr).recipes || JSON.parse(jsonStr);
+ // 強制 limit 為 3 個（防呆機制）
+ if (Array.isArray(recipes)) {
+   recipes = recipes.slice(0, 3);
+ }
```

### 方案 C: Design + TechSpec 統一

- **統一標準:** Phase 2 Design + Phase 3 TechSpec 都改為「恰好3道」
- **避免日後再有類似不一致**

---

## 📊 風險評估

| 方案 | 風險 | 影響 |
|------|------|------|
| Prompt 修改 | 低 | 可能需要微調 prompt 語言 |
| API 後處理加 Limit | 低 | 100% 解決問題（防呆） |
| Design/TechSpec 統一 | 低 | 避免將來混亂 |

**結論:** **三個方案一齊實施**，最低風險 + 最高保障

---

## 🚀 建議行動

1. **CTO** 修改 `/src/app/api/generate/route.ts`:
   - 優化 prompt 加入「必須恰好返回 3 道」
   - 加入 `recipes.slice(0, 3)` 防呆

2. **更新文件:**
   - Phase 2 Design: 確認為「3道」
   - Phase 3 TechSpec: 改為「3道」（移除5）

3. **重新 UAT:**
   - 驗證 TC-002 是否通過

---

## ✅ 總結

**問題:** Prompt 模糊 + 後處理冇 limit  
**影響:** 返回 12 個 recipes 而非 3 個  
**解決:** Prompt 強制化 + 後處理加 limit + 文件統一  

**預期效果:** 修復後，API 只會返回恰好 3 道餸，符合用戶預期同 Design 規格。

---

*Research Update 完成 ✅*
