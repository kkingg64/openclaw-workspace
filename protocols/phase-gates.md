# Phase Gate Protocol (v12.0)

> **SOP Version:** v12.0 (UAT Must Use Production HTTPS URL — not localhost/proxy-direct)
> **新增 (v11.2):** Unified Gate-based MM naming + compliance automation + Phase 1-6 guidelines
> **新增 (v11.1):** Automated validators for Phase sequence + Pre-Submission enforcement
> **新增 (v11.0):** Phase 2 → shadcn Design-First (Pencil/Penpot deprecated)
> **相關協議：** `protocols/phase2-design-workflow-v11.md` | `protocols/model-review.md` | `protocols/validators/` | `protocols/gate-naming-map.md` (NEW) | `protocols/mm-compliance-guide.md` (NEW) | **`protocols/phase5-uat-protocol.md` (NEW — 6 mandatory test categories + visual regression TC-701-703)** | **`protocols/phase4.5-deployment-verification.md` (NEW — environment config + deployment method validation)** | **`protocols/heartbeat-update-protocol.md` (NEW — HEARTBEAT.md auto-updates on gate transitions)** | **`protocols/visual-verification-no-browser.md` (NEW — verify UI without Chromium)**

## Phase Flow

```
0 (Register) → 1 (Research) → 1.5 (AI Review) → 2 (Design)
→ MR-1 → 3 (Tech Spec) → 4 (Build) → 4.5 (Deploy)
→ MR-2 → 5 (UAT) → 6 (Closeout) → BAU
```

## Gate Owners & Blockers

| Gate | Owner | Verifier | Blocker (唔過唔准進) |
|------|-------|----------|---------------------|
| 0→1 | CEO | — | 無 PROJECT.json / 未 copy PROJECT_TEMPLATE |
| 1→1.5 | COO | CDO | ROI < 60/100 / **Pre-Submission Self-Check FAIL** |
| 1.5→2 | CEO | — | CEO 未 APPROVE / AI Advisor < 2 real [Source:] tags |
| 2→MR1 | CDO | **Compliance Auditor** (audit) + **COO (QC Check)** + **CEO (Final Review)** + CTO | 無 Design deliverables / 無 UI Spec / **Hard Check FAIL** / **COO QC Check FAIL** / **CEO Review FAIL** / **Compliance FAIL** |
| MR1→3 | CTO | 3-Model | 任何 Model FAIL (2/3 must PASS) / **Hard Check FAIL** |
| 3→4 | CTO+CISO | CEO + **Compliance Auditor** | CEO 未 APPROVE / 無 CISO Security Review / 無 CISO_SAFE tag / **Pre-Submission Self-Check FAIL** ⛔ AUTO-REJECT / **Compliance FAIL** |
| 4→4.5 | CTO | **Compliance Auditor** (audit) + CISO | Test coverage < 80% / tests fail / **Pre-Submission Self-Check FAIL** / **Compliance FAIL** |
| 4.5→MR2 | CTO | CISO + **Compliance Auditor** | HTTP ≠ 200 **on Production HTTPS URL** / Anti-Dummy FAIL / **Hard Check FAIL** / **Compliance FAIL** |
| MR2→5 | CISO | 3-Model | 任何 Model FAIL / **Hard Check FAIL** |
| 5→6 | CDO+CTO | **Compliance Auditor** (audit) + CEO | **See `phase5-gate-requirements.md`** — All 66+ UAT tests must PASS with screenshot evidence / All 3 sign-offs present / TC-1001-1007 filled / **Compliance FAIL** = GATE BLOCKED |
| 6→BAU | CEO | — | 無 lessons-learned 更新 |

## Hard Gate Rules (v11.1 新增 — 自動驗証)

| 涵蓋 Gate | 檢查 | 工具 | 失敗後果 |
|----------|------|------|----------|
| All | Pre-Submission Self-Check | `validate-mm.sh` | ⛔ CEO 拒絕提交 |
| All | Phase Sequence Valid | `phase-validator.sh` | ⛔ CEO 拒絕進入新 Phase |
| 2→MR1, 3→4, 4.5→MR2, 5→6 | Screenshot Evidence | `check-screenshots.sh` | ⛔ CEO 拒絕批准 |
| All | Evidence Freshness | `check-freshness.sh` | ⛔ CEO 要求重新驗証 |

**實施:** CEO 在批准任何門檻轉變前，必須先運行這些檢查工具。失敗 = 打回。

---

**⛔ 每個 Gate 批准後：CEO 必須執行 `protocols/phase-transition.md` 的 5 步儀式**
(包括自動更新 HEARTBEAT.md via heartbeat-update-protocol.md)

---

## Phase SOP Summary

| Phase | Owner | Deliverables | Protocol | Folder Path |
|-------|-------|-------------|----------|-------------|
| 0 | CEO | PROJECT_REGISTER + `{ID}_ProjectDocuments/` | — | `projects/{ID}_ProjectDocuments/` |
| 1 | COO | `{ID}_Research.md` + `{ID}_Requirements.md` | — | `documents/Phase1_Research/` |
| 1.5 | COO+CDO | `{ID}_AI_Advisor_QA.md` + `{ID}_CDO_Design_Brief.md` | — | `documents/Phase1_Research/` |
| 2 | CDO | All 12 Phase 2 deliverables | `phase2-design-workflow-v11.md` | `documents/Phase2_Design/` |
| MR-1 | CTO | 3-Model vote JSON | `model-review.md` | `documents/Phase2_Design/` |
| 3 | CTO+CISO | `{ID}_Technical_Spec.md` + CISO_SAFE | — | `documents/Phase3_TechSpec/` |
| 4 | CTO | Deployed code + `{ID}_Version_Bug_List.md` | — | `documents/Phase4_Implementation/` |
| 4.5 | CTO→CISO | `{ID}_DeployVerification.md` | **`phase4.5-deployment-verification.md`** | `documents/Phase4_5_DeployVerification/` |
| MR-2 | CISO | 3-Model vote JSON | `model-review.md` | `documents/Phase4_5_DeployVerification/` |
| 5 | **CDO + COO** (Primary Testers) **AI Agents** (Support) **CTO** (Tech Verify) **Compliance Auditor** (audit) | `{ID}_UAT_Test_Result.md` + screenshots + **Compliance Audit Report** | **`phase5-uat-protocol.md` (v1.5 — CDO executes visual/UI tests, COO executes workflow tests, CTO does technical tests, AI Agents assist + write report)** + **`phase5.2-uat-compliance.md` (Compliance Auditor validates 66+ tests, all sign-offs, all evidence)** + `visual-verification-no-browser.md` | `documents/Phase5_UAT/` + `designs/uat_screenshots/` + `documents/compliance_audits/` |
| 6 | All | lessons-learned update | — | `documents/Phase6_Closeout/` |

## Protocol Quick Reference (Find Your Protocol)

**Find the protocol for your phase:**

| Phase | Person | Find Protocol Here |
|-------|--------|------------------|
| 2 (Design) | CDO | → `protocols/phase2-design-workflow-v11.md` |
| MR-1 (Review) | 3-Model | → `protocols/model-review.md` (v11.6) — Multi-model review after Phase 2 Design |
| 4.5 (Deployment) | CTO/CISO | → `protocols/phase4.5-deployment-verification.md` |
| MR-2 (Review) | 3-Model | → `protocols/model-review.md` (v11.6) — Multi-model review after Phase 4 Implementation |
| **5.1 (Pre-Check)** | **CEO Agent** | → `protocols/phase5-uat-protocol.md` **Section "PHASE 5.1: CEO PRE-CHECK"** — CEO Agent verifies infrastructure ready (servers up, database accessible), test environment configured (test data loaded, test credentials working), CDO/COO/CTO briefed + ready. Generates "Phase 5.1 Readiness Report". Does NOT execute tests (that's Phase 5.2). |
| **5.2 (UAT Execution)** | **CDO+COO** (Primary) **CTO** (Tech Verify) **Compliance Auditor** (audit) | → `phase5-uat-protocol.md` (v1.6 — **PHASE 5.2 STEP 1-5: CDO executes visual regression + UI/UX tests (TC-701-703, TC-901-920). COO executes workflow + business logic tests (TC-201-203, TC-1001-1007). CTO executes technical tests (TC-101-106 auth, TC-301-305 API, TC-801-816 CRUD). AI Agents assist + write complete report with all evidence.**) + **`agents/compliance-auditor/phase5.2-uat-compliance.md` (Compliance Auditor validates all deliverables)** |
| **5.2 (Compliance Audit)** | **Compliance Auditor** (independent) | → `agents/compliance-auditor/phase5.2-uat-compliance.md` — Verifies: 66+ tests documented, all 3 sign-offs present (CDO/COO/CTO), every test has screenshot evidence, TC-1001-1007 filled with real processes. Generates: `AUDIT_REPORT_[phase]_[timestamp].md`. Gate blocked if Compliance FAIL. |
| 5.2 (Tech Tests) | **CTO** (Technical Verify) | → `protocols/phase5-uat-protocol.md` **"PHASE 5.2: UAT EXECUTION"** — CTO executes/verifies: TC-101-106 authentication, TC-301-305 API endpoints, TC-401-404 error handling, TC-801-816 CRUD operations, permissions (TC-813-814), boundary values (TC-815). Can delegate execution to AI agents but must verify all results. |
| 5.2 (Project-Specific TC-1001-1007) | **COO** (Primary) **CTO** (Support) | → `protocols/phase5-uat-protocol.md` **Section "Category 10: Project-Specific Functional Tests"** (Line 948+) — **IMPORTANT: TC-1001-1007 templates MUST be filled in by CDO+COO during Phase 5.2 STEP 1. Compare Phase 2 test cases with Phase 4 actual implementation, then update TC-1001-1007 with real business processes from Phase 3 Tech Spec.** |
| 5.2 (Tool Failure Handling) | **CDO+COO+CTO** (FIX) | → `protocols/phase5-uat-protocol.md` Section **"CRITICAL: TOOL FAILURE HANDLING (NOT CEO WORK)"** — If browser/testing tool breaks, CDO+COO+CTO MUST find alternative (API testing, headless browser, terminal workaround) within 30 min. **NEVER escalate to Boss.** Document workaround + continue testing. |
| **5.3 (Boss Final Approval)** | **Boss/King** (FINAL APPROVER ONLY) | → `protocols/phase5-uat-protocol.md` **Section "PHASE 5.3: BOSS FINAL APPROVAL"** — Boss reviews signed `{ID}_UAT_Test_Results.md`, verifies ✅ PASS status on all 66+ tests + evidence (CDO/COO/CTO signed off). Approves Phase 5→6 transition OR rejects with specific blockers. Executes via phase-transition.md 5-step ritual. **Does NOT execute tests, debug, fix tools, or take screenshots.** |
| 5→6 (Gate Requirements) | Boss | → `protocols/phase5-gate-requirements.md` (v1.0) — **CLEAR CHECKLIST of what MUST PASS** (66+ tests, all categories, screenshot evidence required) |
| 5 (No Browser?) | CDO | → `protocols/visual-verification-no-browser.md` (for CDO visual verification without Chromium) |
| Before Gate Submit | All Agents | → `protocols/pre-submission.md` (v10.3) — **MANDATORY: Self-check before Boss review** |
| Any Phase (Compliance Audit) | **Compliance Auditor** | → `agents/compliance-auditor/compliance-auditor.md` — Automated compliance checking at each gate. Triggered automatically when deliverables submitted. Generates audit report. Gate blocked if FAIL. |
| Any Phase (Gate Approval) | Boss | → `protocols/phase-transition.md` (5 step ritual after gate approval) |
| Any Phase (Status Updates) | Boss | → `protocols/heartbeat-update-protocol.md` (auto-update HEARTBEAT.md) |

---

## Phase 2 Frontend Pack (必交清單)

所有前端項目必交：
- `UI_Spec.md` / `UAT_Test_Case.md` / `Component_Spec.md`
- `Accessibility_Checklist.md` / `Performance_Budget.md`
- `Analytics_Plan.md` / `Release_Checklist.md` / `Asset_Inventory.md`
- `designs/exports/` — 每個 screen 每個 breakpoint 嘅 PNG

Website 額外：`SEO_Spec.md` / `Content_Model.md` / `Conversion_Tracking_Plan.md`
Dashboard 額外：`DataViz_Spec.md` / `Role_Permission_Matrix.md`

## Bug Fix State Machine (唔准跳級)

```
OPEN → CODE_CHANGED → BUILD_VERIFIED → DEPLOY_VERIFIED → CROSS_VERIFIED → CLOSED
```
- 冇 commit hash → 唔可以 CODE_CHANGED
- 冇 curl 200 → 唔可以 DEPLOY_VERIFIED
- 冇另一 Agent 簽名 → 唔可以 CLOSED
- ⛔ 禁止「FIXED」狀態

## Phase 0 Kickoff Checklist

```bash
PROJECT_ID="P2026-XXX"
CODE_NAME="MyProject"
WS="/opt/ai-fabio-corp/data/openclaw_home/workspace"

cp -r $WS/docs/PROJECT_TEMPLATE/ $WS/projects/${PROJECT_ID}_ProjectDocuments/
mv $WS/projects/${PROJECT_ID}_ProjectDocuments/figma/ $WS/projects/${PROJECT_ID}_ProjectDocuments/designs/ 2>/dev/null || true
mkdir -p $WS/projects/${PROJECT_ID}_ProjectDocuments/designs/exports/
mkdir -p $WS/projects/${PROJECT_ID}_ProjectDocuments/documents/meeting-minutes/screenshots/
mkdir -p $WS/projects/${PROJECT_ID}_${CODE_NAME}/
# Update PROJECT.json — 必須填: id, name, phase, status, bossApproval, sopVersion, codePath
# Update PROJECT_REGISTER.md — 加入新項目
```

**PROJECT.json 最低要求欄位（v10.3）：**
```json
{
  "id": "P2026-XXX",
  "name": "Code Name",
  "phase": "Phase 0",
  "status": "REGISTERED",
  "bossApproval": "PENDING",
  "sopVersion": "v10.3",
  "codePath": "projects/P2026-XXX_CodeName/"
}
```

完整交付鏈見：`docs/PROJECT_EXECUTION_STANDARD.md` + `docs/PHASE_GATE_CHECKLIST.md`
交付物強制路徑見：`protocols/deliverable-map.md`
Gate 批准後儀式見：`protocols/phase-transition.md`

## Hard Check Scripts（自動驗證，唔過 = Gate FAIL）

每個 Gate 至少一個 hard check。Agent 聲稱 "Done" 不足夠 — 必須跑以下命令並貼 output。

### Gate 2→MR1: Design Output Check
```bash
# CDO 必須跑，CTO 驗收時重跑一次
DOCS="projects/${PROJECT_ID}_ProjectDocuments"
EXPORTS=$(find $DOCS/designs/exports/ -name '*.png' 2>/dev/null | wc -l)
SCREENS=$(grep -c '|' $DOCS/documents/Phase2_Design/*UI_Spec* 2>/dev/null | tail -1)
UI_SPEC=$(test -f $DOCS/documents/Phase2_Design/*UI_Spec* && echo 1 || echo 0)
UAT_TC=$(test -f $DOCS/documents/Phase2_Design/*UAT_Test* && echo 1 || echo 0)

echo "EXPORTS=$EXPORTS | UI_SPEC=$UI_SPEC | UAT_TC=$UAT_TC"
# PASS 條件: EXPORTS ≥ 1 AND UI_SPEC=1 AND UAT_TC=1
# 任何 = 0 → GATE FAIL，CDO 必須補交
```

### Gate MR1→3 / MR2→5: Model Review Check
```bash
# 驗證 3 個 model 真正被調用
MR_FILE="$DOCS/documents/Phase2_Design/*MultiModel_Review*"
MODELS_CALLED=$(grep -cE '(gemini_advisor|copilot_reviewer)' $MR_FILE 2>/dev/null)
VERDICTS=$(grep -c 'PASS\|FAIL' $MR_FILE 2>/dev/null)

echo "MODELS_CALLED=$MODELS_CALLED | VERDICTS=$VERDICTS"
# PASS 條件: MODELS_CALLED ≥ 3 AND VERDICTS ≥ 3
```

### Gate 4.5→MR2: Deploy Check
```bash
# CTO 跑，CISO 驗收時重跑
URL="${DEPLOY_URL:-http://76.13.215.13:PORT}"
HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' "$URL" 2>/dev/null)
ANTI_DUMMY=$(grep -c 'CISO_SAFE_TO_DEPLOY' $DOCS/documents/Phase4_5_DeployVerification/* 2>/dev/null)

echo "HTTP=$HTTP_CODE | ANTI_DUMMY=$ANTI_DUMMY"
# PASS 條件: HTTP=200 AND ANTI_DUMMY ≥ 1
```

**鐵律：** Hard Check output 必須完整貼入交付文件。冇 output = 冇跑 = Gate FAIL。

## Meeting Minutes（v10.2 新增）

**每次 Gate 討論必須有會議紀錄。** 無論 APPROVED 或 BLOCKED 都要記。

### 規則
- **誰寫：** CEO（全部 Gate 嘅主持人）
- **存喺邊：** `projects/{ID}_ProjectDocuments/documents/meeting-minutes/`
- **命名：** `{ID}_MM_Gate-{FROM}-{TO}_{YYYY-MM-DD}.md`
- **Template：** `docs/PROJECT_TEMPLATE/documents/meeting-minutes/TEMPLATE_Meeting_Minutes.md`
- **內容必含：**
  1. 交付物清單 + 誰提交
  2. Evidence Check 結果
  3. Cross-Examination 完整對話（CEO 問 + sub-agent 答）
  4. 被拒絕嘅項目 + 原因
  5. 最終決定（APPROVED / BLOCKED / ESCALATED）
  6. Action items + 負責人

### Gate BLOCKED 必須記錄
```
[GATE_BLOCKED: {reason}]
[ACTION_REQUIRED] {agent}: {what to fix}
[NEXT_REVIEW] {expected date}
```
Sub-agent 修復後再來審 = 新 MM 檔案（Attempt 2/3）。
同一個 Gate 最多 3 次 attempt，超過三次 → CEO escalate 到 Boss。

### 強制性
⛔ 冇 Meeting Minutes = Gate transition 無效，即使有 `[BOSS_APPROVED]`
⛔ MM 內容必須有 Cross-Examination 對話，唔可以差 CEO 自問自答
⛔ MM 必須有 Deliverable Screenshots（見下方表）
⛔ CEO 必須 `send_message` 向 Boss 呈交 MM，未呈交 = 未完成

### Deliverable Screenshot 要求（每個 Gate 必須）

存入：`meeting-minutes/screenshots/` 目錄

| Gate | 必截圖 | 截圖方法 |
|------|--------|----------|
| 1→1.5 | Research + Requirements 文件 | `ls` output 或 `cat` 開頭 |
| 1.5→2 | AI Advisor QA + Design Brief | 文件開頭 20 行 |
| 2→MR1 | Design deliverables (Component_Inventory + Interaction_Spec + UI_Spec) + Theme_Preview.html | Theme_Preview.html 截圖 |
| MR1→3 | 3-Model review verdicts | MR 文件截圖 |
| 3→4 | Tech Spec + CISO_SAFE | 文件截圖 |
| 4→4.5 | `npm test` output + coverage | Terminal 截圖 |
| 4.5→MR2 | `curl https://dashboard.marhorse.cloud/` → **200** + **瀏覽器開 production** + Anti-Dummy | Terminal + **Browser 截圖**（必需 production URL，唔係 localhost）|
| MR2→5 | 3-Model review verdicts | MR 文件截圖 |
| 5→6 | **Design vs Production 對比** + UAT TC 截圖（**必需 https://dashboard.marhorse.cloud**，唔係 localhost）| **並排截圖** |
| 6→BAU | lessons-learned | 文件截圖 |

**截圖方法：**
- Design deliverables：文件截圖
- Theme_Preview.html：`browser` 工具開啟 → 截圖
- Production 部署：`browser` 工具開啟 → 截圖
- 對比圖：Theme_Preview + Production 並排截圖
