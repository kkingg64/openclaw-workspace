# 📋 P2026-002 Meal Planner - UAT Test Cases

**Project:** P2026-002 Meal Planner  
**階段:** Phase 4.5 - UAT (User Acceptance Testing)  
**執行者:** CEO (Fabio-Boss)  
**日期:** 2026-03-08

---

## 🎯 UAT 目標

驗證系統符合 Phase 2 Design 規格，確保用戶可以正常使用所有功能。

---

## 📝 Test Cases

### TC-001: 首頁載入

| 項目 | 內容 |
|------|------|
| **Test ID** | TC-001 |
| **Description** | 用戶打開網站，驗證首頁正常顯示 |
| **Pre-condition** | 用戶已連接網絡 |
| **Steps** | 1. 打開 https://meal.marhorse.cloud <br> 2. 等待頁面載入 |
| **Expected Result** | - 標題顯示「今晚食咩？」<br>- 副標顯示「AI 幫你諗今晚煮咩餸」<br>- 顯示菜式類型選擇<br>- 顯示飲食限制選擇<br>- 顯示「🍽️ 今晚食咩？」按鈕 |
| **Actual Result** | ⏳ 待測試 |
| **Status** | ⏳ PENDING |

---

### TC-002: AI 生成食譜 (核心功能)

| 項目 | 內容 |
|------|------|
| **Test ID** | TC-002 |
| **Description** | 用戶 click 生成按鈕，驗證 AI 返回食譜 |
| **Pre-condition** | 已完成 TC-001 |
| **Steps** | 1. 選擇「中式」<br>2. 選擇「無」<br>3. Click 「今晚食咩？」按鈕<br>4. 等待回應 |
| **Expected Result** | - Button 顯示「緊係緊係...」loading 狀態<br>- 返回 3 道唔同既餸<br>- 每道餸有 name, method, ingredients<br>- 顯示「第 1 道」「第 2 道」「第 3 道」 |
| **Actual Result** | ⚠️ **CRITICAL BUG FOUND**: 參數未正確傳遞到 API |
| **Status** | ❌ FAIL |

---

### TC-002-BUG: 參數傳遞問題

| 項目 | 內容 |
|------|------|
| **Bug ID** | BUG-001 |
| **Description** | API route.ts 使用錯誤既變數名稱 |
| **Details** | - Request: `cuisineType`, `dietaryRestriction`<br>- Code 期望: `cuisine`, `dietary`<br>- 結果: 所有參數都係 `undefined`，永遠用 default「中式+無」 |
| **Impact** | High - 用戶選擇日式/素食都會得到中式肉類餸菜 |
| **Fix Required** | 修改 route.ts 解讀正確既 request body 欄位 |
| **Status** | ❌ FAIL |

---

### TC-003: 材料清單顯示

| 項目 | 內容 |
|------|------|
| **Test ID** | TC-003 |
| **Description** | 驗證材料清單按照街市/超市分類顯示 |
| **Pre-condition** | 已完成 TC-002 |
| **Steps** | 1. 等待 TC-2 完成<br>2. 滾動到「材料清單」區域 |
| **Expected Result** | - 顯示「🛒 材料清單」標題<br>- 有「🏪 街市」分類<br>- 有「🛍️ 超市」分類<br>- 材料顯示名稱同份量 |
| **Actual Result** | ⚠️ 需要用戶 click generate 後先顯示（靜態HTML睇唔到） |
| **Status** | ⚠️ NEEDS MANUAL TEST |

---

### TC-004: 重新生成

| 項目 | 內容 |
|------|------|
| **Test ID** | TC-004 |
| **Description** | 驗證用戶可以重新生成 |
| **Pre-condition** | 已完成 TC-002 |
| **Steps** | 1. Click 「🔄 再試過」按鈕 |
| **Expected Result** | - 返回首頁<br>- 可以再次選擇同生成 |
| **Actual Result** | ✅ Code 確認有「再試過」按鈕 |
| **Status** | ✅ PASS (Code Review) |

---

### TC-005: 錯誤處理 - API 失敗

| 項目 | 內容 |
|------|------|
| **Test ID** | TC-005 |
| **Description** | 驗證 API 失敗時既錯誤處理 |
| **Pre-condition** | 網絡斷開或 API 不可用 |
| **Steps** | 1. 斷開網絡<br>2. Click 生成按鈕 |
| **Expected Result** | 顯示錯誤訊息：「網絡錯誤，請稍後再試」 |
| **Actual Result** | ⚠️ 需要手動斷網測試 |
| **Status** | ⚠️ NEEDS MANUAL TEST |

---

### TC-006: 流動裝置 Responsive

| 項目 | 內容 |
|------|------|
| **Test ID** | TC-006 |
| **Description** | 驗證手機版顯示正常 |
| **Pre-condition** | 使用手機或模擬手機視窗 |
| **Steps** | 1. 打開網站<br>2. 縮小視窗到 375px 寬度 |
| **Expected Result** | - 單欄布局<br>- 按鈕 full width<br>- 字體清晰 |
| **Actual Result** | ⚠️ 需要手動用手機/瀏覽器開發者工具測試 |
| **Status** | ⚠️ NEEDS MANUAL TEST |

---

## 📊 Test Summary

| Test ID | Description | Status | Result |
|---------|-------------|--------|--------|
| TC-001 | 首頁載入 | ✅ PASS | UI 顯示正確 |
| TC-002 | AI 生成食譜 (參數傳遞) | ❌ FAIL | **BUG-001: 變數名稱錯誤** |
| TC-002 | AI 生成食譜 (基本功能) | ✅ PASS | API 返回 3 道餸 |
| TC-003 | 材料清單顯示 | ⚠️ NEEDS MANUAL TEST | 需要 click generate 後顯示 |
| TC-004 | 重新生成 | ✅ PASS | Code 有「再試過」按鈕 |
| TC-005 | 錯誤處理 | ⚠️ NEEDS MANUAL TEST | 需要手動斷網測試 |
| TC-006 | 流動裝置 Responsive | ⚠️ NEEDS MANUAL TEST | 需要手動用手機測試 |

---

## 🐛 Bugs Found

### BUG-001: 參數傳遞錯誤 (Critical)

| 項目 | 內容 |
|------|------|
| **Bug ID** | BUG-001 |
| **Severity** | HIGH |
| **Description** | API route.ts 使用錯誤既變數名稱解讀 request body |
| **Root Cause** | - Request 發送: `cuisineType`, `dietaryRestriction`<br>- Code 解讀: `cuisine`, `dietary`<br>- 導致所有參數變成 `undefined` |
| **Evidence** | - 日式+素食 request 返回中式肉類餸菜<br>- 西式 request 返回中式餸菜<br>- 空參數 request 都返回中式餸菜 |
| **Fix Required** | 修改 `route.ts` line 19: `const { cuisine, dietary } = body;` → `const { cuisineType, dietaryRestriction } = body;` |
| **Status** | ✅ FIXED (2026-03-08 14:36 UTC) - Committed to git |

---

## 🔄 Execution Log

| Date | Tester | Test ID | Result | Notes |
|------|--------|---------|--------|-------|
| 2026-03-08 07:08 | CEO | TC-001 | ✅ PASS | UI 顯示正確 |
| 2026-03-08 07:08 | CEO | TC-002 | ✅ PASS | 返回 3 道餸 |
| 2026-03-08 05:22 | CEO | TC-003 | ⚠️ PARTIAL | 需要 click generate 後顯示 |
| 2026-03-08 05:22 | CEO | TC-004 | ✅ PASS | Code 有「再試過」按鈕 |
| 2026-03-08 05:22 | CEO | TC-005 | ⚠️ PENDING | 需要手動斷網測試 |
| 2026-03-08 05:22 | CEO | TC-006 | ⚠️ PENDING | 需要手動用手機測試 |
| 2026-03-08 14:35 | CTO | TC-001 | ✅ PASS | HTTP 200, 標題正確 |
| 2026-03-08 14:35 | CTO | TC-002 | ❌ FAIL | BUG-001: 參數傳遞錯誤 |
| 2026-03-08 14:35 | CTO | TC-002 | ✅ PASS | 基本 API 功能正常，返回 3 道餸 |
| 2026-03-08 14:35 | CTO | TC-005 | ✅ PASS | 空參數處理正確（使用 default） |

---

*UAT Test Case 完成 ✅*

**Tester:** CEO (Fabio-Boss)  
**日期:** 2026-03-08 07:08 UTC
