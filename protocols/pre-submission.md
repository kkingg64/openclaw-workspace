# Pre-Submission Self-Check Protocol (v10.3)

> **Purpose:** Mandatory agent self-check BEFORE submitting any gate for CEO approval
> **Referenced from:** `protocols/phase-gates.md` → Protocol Quick Reference → Before Gate Submit
> **Triggering Moment:** Agent finishes phase-specific protocol → Before submitting to CEO for approval
> **Executer:** Any agent preparing a gate submission
> **Blocker:** ❌ Checklist items not completed = CEO REJECTS submission,打回重做
> **Next Step After Submission PASS:** `protocols/phase-transition.md` (CEO 5-step approval ritual)

> **觸發時機：** 任何 Sub-agent 向 CEO 提交 Gate 審批前，必須先完成此清單。
> **執行者：** 提交 Gate 嘅主責 Sub-agent。
> **⛔ 清單未完成 = CEO 拒絕接受提交，打回重做。**

---

## 基本原則

```
唔好讓 CEO 發現你自己應該找到的問題。
你先找到問題 → CEO 信任你。
CEO 先找到問題 → 你浪費所有人時間。
```

---

## Pre-Submission 5 步自查

### Step 1 — 跑 Compliance Check（強制）

```bash
cd /opt/ai-fabio-corp/data/openclaw_home/workspace
bash protocols/compliance-check.sh projects/{ID}_ProjectDocuments {CURRENT_PHASE}
```

**要求：** 所有 ✅ 先可以繼續。有 ❌ 必須修復。

---

### Step 2 — 逐項確認交付物路徑

對照 `protocols/deliverable-map.md`，**自己跑 `ls` 確認每個文件存在：**

```bash
DOCS="projects/{ID}_ProjectDocuments"

# Phase 1 example:
ls $DOCS/documents/Phase1_Research/
# 必須見到: {ID}_Research.md, {ID}_Requirements.md

# Phase 1.5 example:
ls $DOCS/documents/Phase1_Research/
# 必須見到: {ID}_AI_Advisor_QA.md (不在 trash!)
```

⛔ 文件在 `.trash` 或錯誤路徑 = 重做

---

### Step 3 — 確認 [Source:] Tags（Phase 1.5 專用）

```bash
ADVISOR_QA="projects/{ID}_ProjectDocuments/documents/Phase1_Research/{ID}_AI_Advisor_QA.md"
SOURCE_COUNT=$(grep -c '\[Source:' $ADVISOR_QA 2>/dev/null)
echo "Source tags found: $SOURCE_COUNT"
# 要求: ≥ 2 real tool calls
```

---

### Step 4 — 寫 Pre-Submission Summary 貼入 MM（v11.1 MANDATORY BLOCK）

提交前必須在 Meeting Minutes 加入此 block **（缺此區塊 = CEO 自動拒絕提交）**：

```markdown
## Pre-Submission Self-Check

執行者：[AGENT_ROLE]
日期：[YYYY-MM-DD HH:MM HKT]
Submission ID: [AUTO_GENERATED]

| 檢查項 | 結果 | 命令 Output |
|--------|------|------------|
| Compliance Check | ✅/❌ | [貼 bash protocols/compliance-check.sh output] |
| Phase Transition Valid | ✅/❌ | [貼 bash protocols/validators/phase-validator.sh output] |
| 所有交付物在正確路徑 | ✅/❌ | [貼 `ls` output] |
| [Source:] tags ≥ 2 (若 Phase 1.5) | ✅/❌/N/A | [貼 count] |
| Hard Check Script PASS | ✅/❌ | [貼 output] |
| Evidence Freshness < 24h | ✅/❌ | [各檔案時間戳] |
| 已準備 Screenshots | ✅/❌ | [列出截圖路徑] |

自查結論：[SELF_CHECK_PASSED / SELF_CHECK_FAILED]
```

**自動驗証 v11.1：**
```bash
# CEO 提交 MM 前必須跑:
bash protocols/validators/validate-mm.sh {MM_FILE} {GATE}
```

⛔ **AUTOMATED ENFORCEMENT:**
- 缺少 "## Pre-Submission Self-Check" = CEO 系統自動拒絕
- 不計入 Attempt（允許無限修復，直到通過）
- 每個 Gate Phase transition 前強制執行此檢查

---

### Step 5 — 確認截圖已存入 meeting-minutes/screenshots/

```bash
MM_SS="projects/{ID}_ProjectDocuments/documents/meeting-minutes/screenshots"
ls $MM_SS/
```

見 `protocols/phase-gates.md` 嘅 Screenshot 要求表。

---

## Gate 主責 Agent 自查表

| Gate | 主責 Agent | 額外自查 |
|------|-----------|--------|
| 1→1.5 | COO | ROI score ≥ 60/100 寫明 |
| 1.5→2 | COO | AI Advisor QA 文件在正確位置，≥2 real source tags |
| 2→MR1 | CDO | **逐 screen 逐 PNG 自查（見下方詳細清單）** |
| MR1→3 | CTO | 3 Model verdicts 全貼，2/3 PASS |
| 3→4 | CTO+CISO | CISO_SAFE_TO_DEPLOY 存在，Tech Spec 有 CISO 簽名 |
| 4→4.5 | CTO | `npm test` output 截圖，coverage ≥ 80% |
| 4.5→MR2 | CTO | curl 200 截圖，browser screenshot，Anti-Dummy PASS |
| MR2→5 | CISO | 3 Model verdicts，2/3 PASS |
| 5→6 | CDO+CTO | Design vs Production 並排截圖，所有 UAT TC PASS |
| 6→BAU | All | lessons-learned 已更新 |

### CDO Gate 2→MR1 逐 Screen 自查（強制）

CDO 必須在 Pre-Submission Summary 加入以下表格，**每行對應 UI_Spec 中一個 Screen**：

```markdown
## CDO Screen Export 自查

| Screen | PNG 路徑 | Desktop | Mobile | Tablet |
|--------|----------|---------|--------|--------|
| Dashboard | designs/exports/P{ID}_Dashboard_Desktop.png | ✅ | ✅/❌ | ✅/❌ |
| Agents    | designs/exports/P{ID}_Agents_Desktop.png    | ✅ | ✅/❌ | ✅/❌ |
| ... | ... | ... | ... | ... |

跑驗證指令：
ls -la designs/exports/*.png
# 每個 Screen 至少 1 個 PNG
```

⛔ **表格未填 = 退回，唔計 attempt**
⛔ **任何 Screen 行有 ❌ = Gate BLOCKED**
⛔ **exports 數量 < UI_Spec screen 數量 = compliance-check.sh 自動 FAIL**

---

## COO Design QC Protocol (v10.4 新增)

### 何時觸發

**時機：** CDO 完成 Pre-Submission，向 COO 提出 QC Review 請求 → Gate 2→MR1 前置檢查

### QC 檢查清單（COO 必須完成，否則 Gate 不通過）

#### Part A — 需求符合性檢查

**讀取資源：**
```bash
UI_SPEC="projects/{ID}_ProjectDocuments/documents/Phase2_Design/{ID}_UI_Spec.md"
REQUIREMENTS="projects/{ID}_ProjectDocuments/documents/Phase1_Research/{ID}_Requirements.md"

# 列出所有 Screen
grep "^## [0-9]" $UI_SPEC
```

**檢查項目：**

| 檢查 | 標準 | 方法 | 結果 |
|------|------|------|------|
| Screen 完整性 | UI_Spec 要求的每個 Screen 都有設計 | 逐一檢查 | ✅/❌ |
| PNG 導出對應 | 每個 Screen 都有對應的 PNG 文件 | `ls designs/exports/` | ✅/❌ |
| 顏色系統 | 所有顏色來自 Design System tokens | 讀 Color Tokens 章節 | ✅/❌ |
| 字體規格 | Typography 大小符合 UI_Spec | 對照 Typography Scale | ✅/❌ |
| Responsive | Mobile/Tablet/Desktop 都設計 | 檢查 breakpoints 章節 | ✅/❌ |
| 功能對應 | UI 元素對應 Requirements 功能 | 逐一 cross-check | ✅/❌ |

#### Part B — 布局對齐檢查

**工具：** Penpot 自帶對齐工具 + 視覺檢查

**檢查項目：**

| 檢查 | 標準 | 方法 | 結果 |
|------|------|------|------|
| Grid 對齐 | 所有元素對齁 8px 網格 | Penpot ruler / pixel inspector | ✅/❌ |
| Padding/Margin | 卡片 padding 16-24px，gaps 24-48px | 尺寸對照 UI_Spec | ✅/❌ |
| Component 尺寸 | Button 40-48px，Input 36px | 對照 Component_Spec | ✅/❌ |
| 排版一致 | Header/Sidebar/Content 整齐 | 視覺檢查行對齁 | ✅/❌ |
| Whitespace | 間距均勻，無擁擠區 | 目視評估 | ✅/❌ |
| Icon 對齁 | Icon 與文字 baseline 對齁 | Penpot alignment panel | ✅/❌ |

#### Part C — 整體印象檢查

**打開 Penpot 看 Canvas：**
```
□ 設計看起來專業一致
□ 無破碎/閃亮/不完整元素
□ 顏色搭配和諧
□ 排版清晰易讀
□ 交互元素 (按鍵/Input) 可識別
```

### COO QC 結果簽署

#### 通過（QC CHECK PASS）

```
[COO_QC_PASSED_{DATE}_{TIME}]

需求符合性：✅ All checked
布局對齁：✅ All checked  
整體質量：✅ Professional & Consistent

意見：{如有建議}

→ 批准 CDO 向 CEO 提交最終審查
```

#### 失敗（QC CHECK FAIL）

```
[DESIGN_QC_FAIL_{DATE}_{TIME}]

失敗項：
1. {具體問題}
2. {具體問題}
3. {具體問題}

需要修復：
- {具體建議}
- {具體建議}

修復後重新提交 QC Review

→ 打回 CDO，Phase 2→MR1 門禁 BLOCKED
```

### CDO 重新提交循環

```
CDO [REVISION_v2_{TS}] 修復 → 
COO [QC_PASSED_v2_{TS}] 二次檢查 → 
CEO [REVIEWED_OK_{TS}] 最終批准 → 
Gate 可進行
```

---

## 違規處理

| 違規 | CEO 行動 |
|------|---------|
| 無 Pre-Submission Summary | 原件退回，唔計 attempt |
| Compliance Check 有 ❌ | Gate BLOCKED，Attempt +1 |
| 文件路徑錯誤 | Gate BLOCKED，Attempt +1 |
| 截圖未準備 | CEO 唔簽，唔計 attempt（你搞掂截圖再來） |
