# Agent Startup Protocol

## CEO Startup Enforcer (Hard Gate)

每次 CEO session 開始前必須完成，否則禁止進入任何 Phase：

1. Read `HEARTBEAT.md`
2. Read `PROJECT_REGISTER.md`
3. Declare: `我已閱讀 PROJECT_REGISTER.md`
4. **Workspace Root Cleanliness Check (MANDATORY)** — Verify no temporary automation files:
   ```bash
   # Workspace root should NOT contain:
   find /opt/ai-fabio-corp/data/openclaw_home/workspace -maxdepth 1 \
     \( -name "*.py" -o -name "*.js" -o -name "*.sh" -o -name "pencil_*" \
        -o -name "build_*" -o -name "test_*.js" -o -name "create_user.js" \) \
     -type f 2>/dev/null | wc -l
   # If output > 0: WORKSPACE HAS TEMPORARY FILES — CEO must clean up before proceeding
   ```
   **If cleanliness check FAILS:** Delete all temporary files immediately:
   ```bash
   cd /opt/ai-fabio-corp/data/openclaw_home/workspace
   rm -f *.py *.js *.sh pencil_* build_* test_*.js create_user.js run_pty.sh
   ```
   **Consequence:** Session BLOCKED if temporary files present.

5. Report `IN_PROGRESS` projects to Boss
5. **PROJECT.json 新鮮度檢查（v10.4 強化 — 警告升級為阻截）** — 對每個 IN_PROGRESS 項目跑：
   ```bash
   grep '"phase"\|"status"\|"codePath"' projects/{ID}_ProjectDocuments/PROJECT.json
   # 同時驗證 codePath 目錄存在：
   ls $(grep -o '"codePath": "[^"]*"' projects/{ID}_ProjectDocuments/PROJECT.json | cut -d'"' -f4) 2>/dev/null || echo "⛔ codePath MISSING"
   ```
   **判斷規則：**
   - `phase` 落後超過 1 個 Phase → **`[SESSION_BLOCKED: STALE_PROJECT_JSON]`** ← 由 v10.3 警告升級為硬阻截
   - `codePath` 目錄唔存在 → **`[SESSION_BLOCKED: CODEPATH_MISSING]`**
   - 阻截後必須先修正 PROJECT.json 先可以繼續任何其他工作
   - 修正責任：CEO 查明上次 approved gate，補做 Phase Transition 儀式
6. **Phase 4 Sprint Health Check（v10.4 新增）** — 若任何項目喺 Phase 4，額外跑：
   ```bash
   CODE="projects/{ID_LOWERCASE_HYPHEN}"   # e.g. projects/p2026-008-madhorse
   # 1. Version_and_Bug_List 存在？
   ls projects/{ID}_ProjectDocuments/documents/Phase4_Implementation/*Version* 2>/dev/null || echo "⛔ Version_and_Bug_List MISSING"
   # 2. 有多少 git commits？
   git -C $CODE log --oneline | wc -l
   # 3. 有冇 uncommitted changes？
   git -C $CODE status --short | wc -l
   ```
   **判斷：**
   - `Version_and_Bug_List` 唔存在 → 立即 spawn CTO 補交
   - git commits = 1 但 HEARTBEAT 寫多個 Sprint Done → **`[SPRINT_EVIDENCE_MISMATCH]`** → spawn CTO commit + closeout
   - uncommitted changes > 0 → spawn CTO commit
7. Response 開頭加: `[SOP_CHECKED: OK]`

## Sub-Agent Startup

每個 sub-agent spawn 時必須：
1. Read own `agents/{role}/agent.md`
2. Read `AGENTS.md` (team structure)
3. Declare: `[SOP_CHECKED: OK]`

## Sub-Agent Progress Check-in Rules（v10.4 新增）

**Sub-agent 喺 Phase 工作期間，以下情況必須主動 `send_message` 向 CEO 報告：**

| 觸發 | 格式 |
|------|------|
| 完成 Phase 內每個主要 sub-task（例如完成一個 page spec、一個 module build） | `[PROGRESS] {task} done — 下一步：{next}` |
| 3 個 tool call 後仍未有進展（stuck） | `[STUCK] 卡喺 {problem}，需要幫助或決定：{options}` |
| 執行不可逆操作前（drop table、rm、生產部署） | `[CONFIRM_NEEDED] 準備執行：{action}，等待 CEO 確認` |
| 預計工作量超過預期（scope creep 發現） | `[SCOPE_CHANGE] 發現額外工作：{description}，影響時間：{estimate}` |

```
[PROGRESS] {sub-task name} — {DATE_HKT}
✅ 完成: {deliverable}
🔄 下一步: {next sub-task}
⚠️ 阻礙: {blocker or 「無」}
```

⛔ Sub-agent 完成整個 Phase 但中途冇任何 Progress update = CEO Cross-Exam 必問原因

## HEARTBEAT.md Update Rules

```
Step 1: Count ### check-in entries
Step 2: If ≥ 5 → delete oldest (entire ### block)
Step 3: Add new entry at top (below ---)
Step 4: Ensure total ≤ 5
⛔ 禁止只加唔刪
⛔ 禁止超過 5 條
```

### HEARTBEAT 強制更新觸發（v10.4 新增）

CEO 必須更新 HEARTBEAT（同時 send_message to Boss）的時機：

| 觸發 | 必須更新 HEARTBEAT |
|------|-------------------|
| Sub-agent 完成 phase 交付物 | ✅ 是 |
| Gate 批准（Phase Transition） | ✅ 是（已在 phase-transition.md 規定） |
| Gate BLOCKED | ✅ 是 |
| 發現重大 Blocker | ✅ 是 |
| Session 結束有進展 | ✅ 是 |

HEARTBEAT 內容必須涵蓋：`進行中 Phase` + `完成事項` + `待處理`

---

### HEARTBEAT v3.0 更新規則

**設計原則：No news is good news — 只寫例外。**

| 區域 | 更新時機 | 唔需要更新時 |
|------|----------|------------|
| 🚨 BOSS ACTION REQUIRED | 有嘢需要老闆決定即加；老闆決定咗即刪 | 全清空 = 正常 |
| 🚦 Project Health Dashboard | Phase 轉換 / Days in Phase 每日更新 / 健康狀態改變 | 所有嘢照舊唔需改 |
| 🔴 Blockers | 發現 blocker 即加，解決即刪 | 留空 = 冇 blocker |
| 📡 Services | 有服務 down 時才更新；恢復後返去 "All nominal" | All nominal = 唔需要更詳細 |
| 📝 Activity Log | 每次有重要事件（Phase 完成/Gate PASS/Gate BLOCKED/Sprint DONE） | 最多 5 條，新增前刪最舊 |

**Activity Log Sprint Done 條目必須包含：**
```
### [{DATE_HKT}] {PROJECT_ID} Sprint {N} ✅ DONE
- {summary of what was built}
- Commit: {git hash}   ← 必填，冇 hash = 唔可以寫 Done
```

**❌ 唔需要寫：**
- "✅ All Systems Operational" — 廢話
- VPS 逐個 port 列出（全 OK 時）— 噪音
- Sprint Done 但冇 git commit hash — 未完成唔可以寫

## Spawn Protocol

```python
sessions_spawn(
  task="Read agents/{role}/agent.md, then [task description]"
)
```

> 有效 role 值：`ceo` | `cto` | `cdo` | `coo` | `ciso` | `forex`
> 例：`agents/cto/agent.md`，`agents/cdo/agent.md`

**禁止：** 進入其他 agent workspace 讀取私人檔案
