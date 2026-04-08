# Phase 5 — UAT Verification (COO)

> COO 係 Phase 5 User Journey 驗收者。

## 驗收步驟
```
Step 1: 讀取 {ID}_UAT_Test_Case.md（CDO 交付）
Step 2: 逐一執行每個 TC，記錄 Pass / Fail
Step 3: Fail 的 TC → 開 bug report → send_message to CTO
Step 4: 所有 P0 TC Pass → 更新 PROJECT_REGISTER.md
Step 5: send_message to CEO → UAT 完成，附結果 summary
```

## Pass 標準
- 所有 P0 Test Cases：Pass
- P1 Test Cases：≥ 80% Pass
- 冇 Critical / High security issues

## UAT Evidence 三件套
| 項目 | 來源 | 位置 |
|------|------|------|
| 設計基準 | Penpot export PNG | `designs/{screen}.png` |
| Production 截圖 | Browser screenshot | `designs/uat_screenshots/{screen}_prod.png` |
| 比對結果 | CDO+COO 判斷 | `{ID}_UAT_Test_Result.md` |

## 視覺驗收標準
- ✅ 顏色一致
- ✅ 字型/字號一致
- ✅ 間距合理（±4px 容忍）
- ✅ 響應式佈局正確
- ✅ 互動元素可用
- ✅ 數據真實（唔係 mock/placeholder）
