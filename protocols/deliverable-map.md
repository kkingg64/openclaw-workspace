# Deliverable Location Registry (v10.4)

> **鐵律：** 每個交付物有且只有一個合法存放路徑。
> 文件在錯誤路徑 = 視為 Missing。`.trash` 內的文件 = 不存在。
>
> **📌 Lark First (v10.4)：** 所有項目文檔標配存放喺 **Lark**，本地 workspace 只留 working draft。
> 詳見 `protocols/lark-integration.md`。
>
> **Current P2026-008 Lark Folder:** `https://pjpy0fiseu4d.jp.larksuite.com/drive/folder/QDYZf065MlXIlzdnHtKjOLrHpHf`

**根目錄：** `projects/{ID}_ProjectDocuments/`  
**代碼根目錄：** `projects/{ID}_{CODE_NAME}/`

---

## Phase 0 — Registration

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| Project Registration | `documents/Phase0_Registration/` | `{ID}_Project_Registration.md` | 必交 |
| PROJECT.json | `PROJECT.json` (根目錄) | `PROJECT.json` | 必交，每 Phase 更新 |
| PROJECT_REGISTER 入口 | `PROJECT_REGISTER.md` (workspace 根目錄) | — | 必交 |

---

## Phase 1 — Research

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| Research Report | `documents/Phase1_Research/` | `{ID}_Research.md` | 必交 |
| Requirements Doc | `documents/Phase1_Research/` | `{ID}_Requirements.md` | 必交 |

---

## Phase 1.5 — AI Advisory

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| AI Advisor QA | `documents/Phase1_Research/` | `{ID}_AI_Advisor_QA.md` | 必交 |
| CDO Design Brief | `documents/Phase1_Research/` | `{ID}_CDO_Design_Brief.md` | 必交（此時唔係 Phase2）|

> ⛔ `AI_Advisor_QA.md` 絕對唔可以在 `.trash` 或任何 TEMPLATE 目錄。
> ⛔ 如果只有 `TEMPLATE_AI_Advisor_QA.md` 存在 = Phase 1.5 未完成。

---

## Phase 2 — Design (shadcn Design-First)

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| CDO Design Brief (final) | `documents/Phase2_Design/` | `{ID}_CDO_Design_Brief.md` | 必交 |
| UI Specification | `documents/Phase2_Design/` | `{ID}_UI_Spec.md` | 必交 |
| Component Inventory | `documents/Phase2_Design/` | `{ID}_Component_Inventory.md` | 必交 |
| Interaction Spec | `documents/Phase2_Design/` | `{ID}_Interaction_Spec.md` | 必交 |
| Accessibility Checklist | `documents/Phase2_Design/` | `{ID}_Accessibility_Checklist.md` | 必交 |
| UAT Test Cases | `documents/Phase2_Design/` | `{ID}_UAT_Test_Cases.md` | 必交 |
| Performance Budget | `documents/Phase2_Design/` | `{ID}_Performance_Budget.md` | 必交 |
| Analytics Plan | `documents/Phase2_Design/` | `{ID}_Analytics_Plan.md` | 必交 |
| Release Checklist | `documents/Phase2_Design/` | `{ID}_Release_Checklist.md` | 必交 |
| Asset Inventory | `documents/Phase2_Design/` | `{ID}_Asset_Inventory.md` | 必交 |
| Theme Preview | `documents/Phase2_Design/` | `{ID}_Theme_Preview.html` | 必交 |
| CDO Handoff Signal | `documents/Phase2_Design/` | `{ID}_CDO_Handoff_Signal.md` | 必交 |
| Design Submission Checklist | `documents/Phase2_Design/` | `{ID}_Design_Submission_Checklist.md` | 必交 |

> ⛔ **Penpot/Pencil PNG exports: DEPRECATED (2026-04-03)** — No longer required.
> ⛔ `designs/exports/` — Archival only, not required for gate.
> ⛔ Dashboard 額外需要：`{ID}_DataViz_Spec.md` + `{ID}_Role_Permission_Matrix.md`

---

## Phase MR-1 — Multi-Model Review (Phase 2→3)

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| MR-1 JSON Output | `documents/Phase2_Design/` | `{ID}_MR1_Output.json` | 必交 |

> ⛔ MR JSON 必須包含 3 個模型的 scores + recommendations。
> ⛔ 評分公式：`((Dim1+Dim2+Dim3)/30)×100` — 全部 ≥90 或 Borderline Review。

---

## Phase 3 — Technical Specification

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| Technical Specification | `documents/Phase3_Technical_Spec/` | `{ID}_Technical_Spec.md` | 必交 |
| Implementation Plan | `documents/Phase3_Technical_Spec/` | `{ID}_Implementation_Plan.md` | 必交 |
| **CISO Security Sign-off** | `documents/Phase3_Technical_Spec/` | `{ID}_CISO_Security_Review.md` | **必交**（含 CISO_SAFE tag）|

---

## Phase 4 — Implementation

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| Version Bug List | `documents/Phase4_Implementation/` | `{ID}_Version_Bug_List.md` | 必交 |
| Test files | `projects/{ID}_{CODE_NAME}/` | `*.test.ts` / `*.spec.ts` | **必交，coverage ≥ 80%** |

---

## Phase 4.5 — Deploy Verification

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| Deploy Verification | `documents/Phase4_5_DeployVerification/` | `{ID}_DeployVerification.md` | 必交 |

**Phase 4.5 Mandatory Checklist (see `protocols/phase4.5-deployment-verification.md`):**
- ☐ Deployment method documented (Docker/K8s/Cloud/SSH)
- ☐ .env.example exists with all required keys
- ☐ .env.staging complete and separate from production
- ☐ .env.production complete (different passwords, different servers)
- ☐ Database migrations verified
- ☐ Cache/Redis connectivity tested
- ☐ **Health endpoint returns HTTP 200**
- ☐ **Login endpoint returns HTTP 200 or 401 (NOT 502/503)**
- ☐ No hardcoded secrets in source code
- ☐ Load balancer/API gateway healthy
- ☐ DNS resolution verified
- ☐ Firewall rules allow required ports

**Gate 4.5→MR2 BLOCKS if:**
- ❌ HTTP endpoint not responding with 200/401
- ❌ Environment variables missing or incomplete
- ❌ Database connectivity fails
- ❌ Health endpoint fails
- ❌ Deployment method not documented

> ⛔ DeployVerification 必須含 `CISO_SAFE_TO_DEPLOY` tag（Anti-Dummy scan 結果）。

---

## Phase MR-2 — Multi-Model Review (Deploy→UAT)

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| MR-2 Review Report | `documents/Phase4_5_DeployVerification/` | `{ID}_MR2_MultiModel_Review.md` | 必交 |

---

## Phase 5 — UAT

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| UAT Test Results | `documents/Phase5_UAT/` | `{ID}_UAT_Test_Results.md` | **必交** |
| UAT Screenshots | `designs/uat_screenshots/` | `TC-*.png` (6 categories: auth + workflow + technical + errors + cross-browser + performance) | **必交** |
| **Visual Regression Screenshots** | `designs/uat_screenshots/` | `TC-701_Desktop_*.png`, `TC-702_Tablet_*.png`, `TC-703_Mobile_*.png` | **必交 (CRITICAL BLOCKER)** |
| Visual Regression Report | `documents/Phase5_UAT/` | `{ID}_Visual_Regression_Report.md` | **必交 (CRITICAL BLOCKER)** |
| **Deep Functional Test Results (NEW v1.1)** | `documents/Phase5_UAT/` | `{ID}_Deep_Functional_Tests.md` (TC-801-816) | **必交 (CRITICAL BLOCKER)** |
| **Deep Functional Screenshots (NEW v1.1)** | `designs/uat_screenshots/` | `TC-801_*.png`, `TC-806_*.png`, `TC-813_*.png`, etc. | **必交 (每個 TC 需有 screenshot)** |
| **UI Navigation Test Results (NEW v1.2)** | `documents/Phase5_UAT/` | `{ID}_UI_Navigation_Tests.md` (TC-901-920) | **必交 (CRITICAL BLOCKER)** |
| **UI Navigation Screenshots (NEW v1.2)** | `designs/uat_screenshots/` | `TC-901_*.png` (button clicks), `TC-905_*.png` (links), `TC-918_*.png` (URLs), etc. | **必交 (每個 TC 需有 screenshot)** |
| **Project-Specific Test Results (NEW v1.3)** | `documents/Phase5_UAT/` | `{ID}_Project_Specific_Tests.md` (TC-1001-1007 from Phase 3 Tech Spec) | **必交 (CRITICAL BLOCKER)** |
| **Project-Specific Screenshots (NEW v1.3)** | `designs/uat_screenshots/` | `TC-1001_*.png` (before/after business process), `TC-1006_stripe_*.png` (third-party), etc. | **必交 (每個 TC 需有 screenshot)** |
| **PROOF OF EXECUTION (NEW v1.3)** | `documents/Phase5_UAT/` | `{ID}_UAT_Test_Results.md` **MUST include:** Browser console screenshots (NO errors), Network logs (HTTP 200 not 404/500), Database query results, Timestamps of each test execution | **必交 (NO THEORY — PROOF ONLY)** |

> ⛔ **UAT Protocol Reference:** See `protocols/phase5-uat-protocol.md` (v1.3) — **INCLUDES MANDATORY AGENT EXECUTION WORKFLOW**
> ⛔ **Minimum Test Cases:** 66+ (6 auth + 3 workflow + 5 technical + 4 error + 2+ cross-browser + 3 visual regression + **16 deep functional TC-801-816** + **20 UI navigation TC-901-920** + **7 project-specific TC-1001-1007**)
> ⛔ **Each Test Case Requires:** Document (MD) + Screenshot (PNG) in uat_screenshots/
> ⛔ **CRITICAL:** Test marked PASS without screenshot evidence = INVALID
> ⛔ **CRITICAL (NEW):** Deep functional tests MUST verify:
> - Data validation (email, password strength, field limits, required fields, special chars)
> - CRUD operations (Create/Read/Update/Delete persist and work correctly)
> - Business logic (workflows work, state persists, calculations correct)
> - Permissions (role-based access enforced, cannot access other users' data)
> - Edge cases (boundary values, concurrent operations, no-result handling)
> ⛔ **CRITICAL (NEW v1.2):** UI Navigation tests MUST verify:
> - Every button works (Primary, Secondary, Icon buttons functional)
> - Every link works (Internal/external navigation, no 404s)
> - Every form control works (inputs, dropdowns, checkboxes, radio buttons, modals)
> - Keyboard navigation (Tab through all controls, Enter/Space activate buttons)
> - URL routing (direct URL access works, invalid URLs show 404 not 500)
> ⛔ **CRITICAL (NEW v1.3):** Project-Specific Tests MUST:
> - Be identified from Phase 3 Technical Specification (≥5 critical business processes)
> - NOT generic CRUD tests (must be domain logic: payments, workflows, integrations, etc.)
> - Include edge cases and third-party integrations (Stripe, SendGrid, etc.)
> - Verify database state after business process completes
> - Have screenshots showing BEFORE/AFTER states + success confirmations
> ⛔ **CRITICAL (NEW v1.3):** Agent MUST EXECUTE Tests (Not Simulation):
> - ✅ ACTUALLY click every button in browser (not "assume it works")
> - ✅ ACTUALLY enter data and watch for errors (DevTools Console screenshot required)
> - ✅ ACTUALLY wait for responses (not immediate screenshots)
> - ✅ ACTUALLY check database after data operations (query results screenshot)
> - ✅ ACTUALLY refresh page to verify persistence (data survives F5)
> - ❌ FORBIDDEN: "Assuming it works" + "Visual inspection only" + "No screenshots" + "Partial execution"
> - ❌ **ANY test marked PASS without screenshot = TEST INVALID = GATE BLOCKS**
> ⛔ **CRITICAL:** If deep functional tests SKIPPED or FAIL:
> - ❌ UAT Status = PARTIAL (not PASS)
> - ❌ CEO BLOCKS Phase 5→6 gate
> - ❌ Cannot promote to Phase 6 BAU
> ⛔ **CRITICAL:** If UI Navigation tests SKIPPED or FAIL:
> - ❌ UAT Status = PARTIAL (not PASS)
> - ❌ CEO BLOCKS Phase 5→6 gate
> - ❌ Cannot promote to Phase 6 BAU
> ⛔ **CRITICAL:** If Project-Specific tests SKIPPED or <5 defined:
> - ❌ UAT Status = PARTIAL (not PASS)
> - ❌ CEO BLOCKS Phase 5→6 gate
> - ❌ Cannot promote to Phase 6 BAU
> ⛔ **CRITICAL:** If NO EXECUTION EVIDENCE (screenshots/logs/database verification):
> - ❌ UAT Status = PARTIAL (not PASS)
> - ❌ CEO BLOCKS Phase 5→6 gate
> - ❌ Assume tests were simulated/not run, not actual execution
> ⛔ **Each Test Case Requires:** Document (MD) + Screenshot (PNG) in uat_screenshots/
> ⛔ **CRITICAL:** Test marked PASS without screenshot evidence = INVALID
> ⛔ **CRITICAL:** If visual regression screenshots (TC-701-703) missing or skipped:
> - ❌ UAT Status = PARTIAL (not PASS)
> - ❌ CEO BLOCKS Phase 5→6 gate  
> - ❌ Cannot promote to Phase 6 BAU
> - ✅ **REQUIRED:** Use `protocols/visual-verification-no-browser.md` to get screenshots (even without Chromium)
>
> ⛔ **Gate 5→6 CRITICAL BLOCKERS — ALL MUST PASS:**
> - ✅ **TC-701 (Desktop visual regression) - Layout matches Phase 2 Design Spec (1920×1080)**
>   - Screenshot comparison: live website vs. design mockup
>   - Verify: spacing, colors (hex exact match), fonts, element alignment (±2px tolerance)
>   - Evidence: TC-701_Desktop_*.png + ImageMagick diff
> - ✅ **TC-702 (Tablet visual regression) - Layout matches Phase 2 Tablet Spec (768×1024)**
>   - Screenshot comparison: iPad/tablet responsive layout
>   - Evidence: TC-702_Tablet_*.png + diff
> - ✅ **TC-703 (Mobile visual regression) - Layout matches Phase 2 Mobile Spec (375×812)**
>   - Screenshot comparison: iPhone/mobile responsive layout
>   - Evidence: TC-703_Mobile_*.png + diff
> - ✅ **All layouts pixel-perfect** (colors match design hex, fonts exact, spacing within ±2px)
> - ✅ TC-101 (valid login) passes
> - ✅ TC-102 (wrong password error) passes  
> - ✅ TC-103 (invalid email error) passes
> - ✅ TC-104 (session timeout) passes
> - ✅ TC-105 (rate limiting / brute force protection) passes
> - ✅ TC-106 (logout/re-login) passes
> - ✅ TC-301 (endpoint HTTP 200) passes
> - ✅ TC-302 (API response format) passes
> - ✅ TC-303 (error response format) passes → Errors must be specific, not generic
> - ✅ Cross-browser (≥4 browsers: Chrome, Safari, Firefox, Edge)
> - ✅ Mobile responsive (≥2 viewports: 1920×1080, 375×812)
> - ✅ All error messages must be human-readable (not codes like "E500" or "Error")
>
> **If ANY of above FAIL (especially visual regression TC-701-703) → CEO BLOCKS Phase 5→6 gate**
>
> **How to Fix if Live Website Has Wrong Layout:**
> - Issue: Website already in production (Phase 6 BAU) but layout/UI broken
> - Solution: Rollback project to Phase 4, re-verify deployment + environment, re-run Phase 5 UAT with visual regression checks
> - Prevention: NEVER skip visual regression tests (TC-701-703) before Phase 5→6 approval

---

## Phase 6 — Closeout

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| Lessons Learned | `docs/lessons-learned/` (workspace root) | `{ID}_Lessons_Learned.md` | 必交 |

---

## Meeting Minutes（所有 Gate 共用）

| 文件 | 強制路徑 | 命名格式 | 類型 |
|------|----------|----------|------|
| Meeting Minutes (每個 Gate) | `documents/meeting-minutes/` | `{ID}_MM_Gate-{FROM}-{TO}_{YYYY-MM-DD}.md` | 必交 |
| Gate Screenshots | `documents/meeting-minutes/screenshots/` | `{ID}_Gate-{FROM}-{TO}_{desc}.png` 或 `.txt` | 必交 |

### MM 存放位置規則 (v11.2 澄清)

1. **起始位置 (Draft Stage):** 
   - MM 可暫時在各 Phase 資料夾 (例: `documents/Phase2_Design/`)
   - 命名可先用臨時格式 (例: `P2026-008_Phase1_MeetingMinutes.md`)

2. **Gate 批准後 (After Approval):**
   - CEO 立即將 MM **改名** 為 Gate-based 格式: `{ID}_MM_Gate-{FROM}-{TO}_{YYYY-MM-DD}.md`
   - CEO 立即將 MM **mv** 到 `documents/meeting-minutes/` (CEO 責任)
   - 參考完整 Gate 對應表: `protocols/gate-naming-map.md`

3. **SLA (Service Level Agreement):**
   - **期限:** CEO 批准 Gate 後 **1 小時內** 必須完成命名 + 移動
   - **Soft Cap:** 若超過 1 小時，CEO 必須記錄原因
   - **驗證:** CEO 執行 `bash protocols/check-mm-compliance.sh` 確認合規

4. **截圖要求 (Screenshot Requirement):**
   - `meeting-minutes/screenshots/` 不能為空
   - 每個已完成 Gate **至少 1 張** 截圖
   - 命名格式: `{ID}_Gate-{FROM}-{TO}_{description}_{YYYY-MM-DD}.png`
   - 需同時上傳至 `meeting-minutes/screenshots/`

5. **合規檢查 (Compliance Verification):**
   - CEO 在 git commit 前必須執行檢查腳本:
     ```bash
     bash protocols/check-mm-compliance.sh "P2026-008"
     ```
   - 腳本檢查項目:
     ✓ 所有 Gate 批准後的 MM 都在 `meeting-minutes/` 目錄
     ✓ 所有 MM 使用 `MM_Gate-{FROM}-{TO}` 格式
     ✓ 所有 MM 都有對應截圖 (至少 1 張)
     ✓ Phase 資料夾中沒有遺留的舊格式 MM
   - 檢查返回 exit code 0 = 100% 合規 ✓

> ⛔ **遷移規則:** 若發現舊格式 MM 仍在 Phase 資料夾或 meeting-minutes/ 目錄中，需執行遷移:
> ```bash
> # 示例遷移
> mv "documents/Phase1_Research/P2026-008_Phase1_MeetingMinutes.md" \
>    "documents/meeting-minutes/P2026-008_MM_Gate-1-1.5_2026-04-01.md"
> ```
> 參考: `protocols/gate-naming-map.md` 的 Migration Guide 表格

---

## PROJECT.json 必填欄位

```json
{
  "id": "P2026-XXX",
  "name": "Project Code Name",
  "phase": "Phase N",          ← 每個 Gate 批准後必須更新
  "status": "IN_PROGRESS",     ← REGISTERED / IN_PROGRESS / BLOCKED / COMPLETED
  "bossApproval": "APPROVED",  ← PENDING / APPROVED
  "sopVersion": "v10.3",       ← SOP 版本（必填）
  "codePath": "projects/P2026-XXX_CodeName/"  ← 必須同實際目錄完全一致
}
```

> ⛔ `codePath` 錯誤 = CISO Anti-Dummy scan 引用錯目錄 = 安全審計失效。
> ⛔ `sopVersion` 缺失 = 無法確認遵循哪個版本，視為不合規。

---

## 快速校驗命令

```bash
# 一鍵檢查所有交付物位置
bash protocols/compliance-check.sh projects/{ID}_ProjectDocuments {PHASE}

# 手動確認 Phase 1.5 QA 不在 trash
find projects/{ID}_ProjectDocuments -name "*AI_Advisor_QA*" | grep -v ".trash"

# 確認 codePath 正確
grep '"codePath"' projects/{ID}_ProjectDocuments/PROJECT.json
ls -d projects/$(grep '"codePath"' projects/{ID}_ProjectDocuments/PROJECT.json | grep -oE 'P[0-9-]+[^"]*')/ 2>/dev/null && echo "PATH OK" || echo "PATH BROKEN"
```
