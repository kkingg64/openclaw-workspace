# Phase Transition Protocol (v10.3)

> **觸發時機：** CEO 批准任何 Gate → 即時強制執行以下 5 步。
> **執行者：** CEO（批准後立即做，唔可以委派）。
> **⛔ 5 步未完成 = Gate 批准不生效。**

---

## Phase Transition 5 步強制儀式

> ⚠️ **v10.4 重要規則：Step 1 必須 FIRST — 未更新 PROJECT.json 前禁止 send_message 或寫簽名。**
> **簽名本身必須包含 Step 1 的 bash output 作證明，冇 output = 簽名無效。**

### Step 1 — 更新 PROJECT.json（即時，必須第一個做）

**先跑驗證命令，貼 output：**
```bash
PROJECT_DOCS="projects/{ID}_ProjectDocuments"
cat $PROJECT_DOCS/PROJECT.json | grep '"phase"\|"status"\|"codePath"'
```

**然後立即更新：**
```bash
# 用 jq 或直接編輯，更新以下欄位
```

必須更新以下欄位：

| 欄位 | 更新為 |
|------|--------|
| `phase` | 新 Phase 名稱（e.g. `"Phase 4"`） |
| `status` | `"IN_PROGRESS"` |
| `bossApproval` | `"APPROVED"` |
| `codePath` | 必須同實際 code 目錄完全一致（`ls` 驗證存在） |
| `history` | 加入新 entry `{"phase": "...", "date": "...", "action": "Approved by CEO → entered Phase X"}` |

**更新後再跑一次確認：**
```bash
cat $PROJECT_DOCS/PROJECT.json | grep '"phase"\|"status"\|"codePath"'
# 必須見到新 phase 值先算完成
```

⛔ PROJECT.json 未更新 = CEO 簽名不生效
⛔ codePath 目錄唔存在 = Hard Blocker，先搵到 code 目錄先簽

---

### Step 2 — 移動 Meeting Minutes 到集中目錄

```bash
MM_DIR="projects/{ID}_ProjectDocuments/documents/meeting-minutes"
# MM 命名格式：{ID}_MM_Gate-{FROM}-{TO}_{YYYY-MM-DD}.md
ls $MM_DIR/
```

- Phase 討論時寫 MM 可以暫存在 Phase 資料夾
- **Gate 批准後必須 mv 到 `meeting-minutes/`**
- `meeting-minutes/screenshots/` 下有截圖

---

### Step 3 — 驗證交付物在正確路徑（Deliverable Map Check）

```bash
# 跑 deliverable location check
protocols/compliance-check.sh projects/{ID}_ProjectDocuments {COMPLETED_PHASES}
```

見 `protocols/deliverable-map.md` 了解每個文件的強制路徑。

⛔ 有任何文件不在正確路徑 → Gate BLOCKED，唔可以進入下一 Phase

---

### Step 4 — 向 Boss 呈交 Phase 轉換通知

CEO 必須 `send_message` 格式如下（**必須嵌入 Step 1 的 cat output，冇就視為未執行**）：

```
[PHASE_TRANSITION_NOTICE]
項目：{PROJECT_ID} {PROJECT_NAME}
批准：Gate {FROM} → {TO}
日期：{YYYY-MM-DD HH:MM HKT}
MM 路徑：{ID}_MM_Gate-{FROM}-{TO}_{DATE}.md

[PROJECT.json 驗證 output — 必填]
"phase": "Phase X",
"status": "IN_PROGRESS",
"codePath": "projects/..."
[/PROJECT.json 驗證]

[FABIO_CEO_GATE_{FROM}_TO_{TO}_APPROVED_{DATE}_{TIME}_HKT]
[CROSS_EXAM: {N}問 answered]
[EVIDENCE: verified]
[SCREENSHOTS: {N}張]
[MINUTES: filed]
[SENT_TO_BOSS: ✅]
```

---

### Step 5 — HEARTBEAT.md 自動更新（見 `protocols/heartbeat-update-protocol.md`）

**CEO 執行自動化命令（唔可以手動編輯）：**

```bash
# Usage: ./heartbeat-update.sh {PROJECT_ID} {NEW_PHASE} {GATE_FROM_TO} {BLOCKER_OR_DASH}
# Example: ./heartbeat-update.sh P2026-008 "Phase 4.5" "4→4.5" "—"

PROJECT_ID="{ID}"
NEW_PHASE="{Phase X}"
GATE_TRANSITION="{FROM}→{TO}"
BLOCKER="—"  # or blocker text if gate REJECTED

chmod +x protocols/scripts/update-dashboard.sh
chmod +x protocols/scripts/update-activity-log.sh
chmod +x protocols/scripts/assign-status-icon.sh

./protocols/scripts/update-dashboard.sh "$PROJECT_ID" "$NEW_PHASE"
./protocols/scripts/update-activity-log.sh "$PROJECT_ID" "Gate $GATE_TRANSITION APPROVED"
./protocols/scripts/assign-status-icon.sh "$NEW_PHASE" "$BLOCKER"

# Verify HEARTBEAT.md updated
grep "$PROJECT_ID" HEARTBEAT.md | head -1

# Auto-commit
git add HEARTBEAT.md
git commit -m "HEARTBEAT: $PROJECT_ID → $NEW_PHASE approved ([Gate $GATE_TRANSITION])"
```

**若 Gate 被拒絕 / Rollback：**

```bash
# Usage: ./protocols/scripts/heartbeat-rollback.sh {PROJECT_ID} {TARGET_PHASE} {BLOCKER_REASON}
# Example: ./heartbeat-rollback.sh P2026-008 "Phase 4" "Deployment verification required"

chmod +x protocols/scripts/heartbeat-rollback.sh

./protocols/scripts/heartbeat-rollback.sh "$PROJECT_ID" "{ROLLBACK_PHASE}" "{BLOCKER_REASON}"

# Verify
grep "$PROJECT_ID" HEARTBEAT.md | head -1
```

---

## 快速參照：各 Phase 的 PROJECT.json 狀態

| 完成 Gate | phase 值 | status 值 |
|-----------|----------|-----------|
| 0→1 批准 | `"Phase 1"` | `"IN_PROGRESS"` |
| 1.5→2 批准 | `"Phase 2"` | `"IN_PROGRESS"` |
| 3→4 批准 | `"Phase 4"` | `"IN_PROGRESS"` |
| 4.5→MR2 批准 | `"Phase MR-2"` | `"IN_PROGRESS"` |
| 5→6 批准 | `"Phase 6"` | `"IN_PROGRESS"` |
| 6→BAU 批准 | `"BAU"` | `"COMPLETED"` |
| 任何 Gate BLOCKED | 維持現 phase | `"BLOCKED"` |

---

## 違規後果

| 違規 | 後果 |
|------|------|
| PROJECT.json 未更新 | 下次 CEO startup 自動 flag，下個 Gate 被阻塞 |
| MM 未移入集中目錄 | 審計時計為 Missing，Gate 判 PARTIAL |
| Boss 未收到通知 | MM 標記 `[SENT_TO_BOSS: ❌]`，Phase 閉環失敗 |
| codePath 錯誤 | CISO Hard Check 引用錯目錄 → 安全掃描失效 |

---

## Phase Rollback Protocol（v10.4 新增）

> **觸發時機：** CEO 發現已批准的 Phase 交付物有重大問題，需要某個 Phase 返工。
> **執行者：** CEO 決定，spawn 相關 agent 執行。
> **例子：** 已進入 Phase 4，但發現 Phase 2 CDO UI 有 3 個 screen 冇 export，需打回重做。

### Rollback 4 步

#### Step 1 — CEO 宣告 Rollback Decision

CEO 必須明確宣告並記錄：

```
[ROLLBACK_DECISION] {PROJECT_ID} — {DATE_HKT}
打回 Phase：{TARGET_PHASE}（e.g. Phase 2）
原因：{specific problem, e.g. "designs/exports/ 只有 1 PNG，UI_Spec 定義 4 screens"}
影響：{downstream phases affected, e.g. "Phase 3 Tech Spec 引用設計，需確認影響範圍"}
負責 Agent：{AGENT_ROLE}
預計完成：{estimate}
```

#### Step 2 — 更新 PROJECT.json

```bash
# 更新以下欄位：
"status": "ROLLBACK_IN_PROGRESS"
"phase": "{TARGET_PHASE}"   # e.g. "Phase 2"
# 加入 history entry：
{"phase": "Phase 2 ROLLBACK", "date": "...", "action": "CEO rollback from Phase X — reason: ..."}
```

#### Step 3 — 更新 HEARTBEAT + 通知 Boss

HEARTBEAT Activity Log 加入：
```
### [{DATE_HKT}] {PROJECT_ID} ROLLBACK → Phase {N}
- 原因：{reason}
- 負責：{agent}
- 影響範圍：{downstream phases}
```

BOSS ACTION REQUIRED 區域加入（如需老闆知情）：
```
| {N} | {PROJECT_ID} Phase {X} Rollback — CDO 重做中 | 需要老闆確認範圍 |
```

#### Step 4 — Spawn 相關 Agent 執行 Rollback

**Phase Kickoff Brief 格式（Rollback 版本）：**
```
[ROLLBACK_KICKOFF] {PROJECT_ID} → Phase {N} Rollback
執行者：{AGENT_ROLE}
問題：{exact deficiency found}
必須修復：{specific list with file paths}
唔需要重做：{what can be kept}
完成標準：{when is it done — e.g. "4 screens × 1 PNG each in designs/exports/"}
完成後：發 [ROLLBACK_DONE] → CEO 重新跑 compliance-check.sh 驗證
```

---

### Rollback 後重新 Gate 審批

Rollback 完成後，CEO **必須重新走完整 Gate 審批流程**（唔可以跳步）：
1. CDO/相關 agent 發 `[ROLLBACK_DONE]`
2. CEO 重跑 `compliance-check.sh`，必須全 ✅
3. CEO 重做 Cross-Examination（針對修復的部分）
4. 寫新 MM（命名加 `_Rollback` 後綴：`{ID}_MM_Gate-{FROM}-{TO}_{DATE}_Rollback.md`）
5. 重新執行 Phase Transition 5 步

⛔ Rollback 後唔補做 Gate 審批 = 下游 Phase 嘅 compliance 永遠有 gap
⛔ 若 Rollback 影響已批准嘅 downstream deliverables → CEO 必須列出受影響文件，通知相關 sub-agent 更新

---

### 常見 Rollback 場景快速指南

| 情況 | 打回 Phase | 負責 Agent | 唔需要重做 |
|------|-----------|-----------|-----------|
| Design export 不完整 | Phase 2 | CDO | UI_Spec、Component_Spec（如設計方向不變） |
| Tech Spec 架構問題 | Phase 3 | CTO+CISO | Research、Design（如問題只在技術層面） |
| 安全漏洞（嚴重） | Phase 3 | CISO | 視乎漏洞範圍 |
| AI Advisor QA 不足 | Phase 1.5 | COO | Phase 1 Research（如資料仍有效） |
