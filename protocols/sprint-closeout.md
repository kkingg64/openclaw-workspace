# Sprint Closeout Protocol (v10.4)

> **適用：** Phase 4 (Build) 內每個 Sprint 完成時
> **執行者：** CTO（每個 Sprint 結束時強制執行）
> **⛔ Sprint 未 Closeout = 下個 Sprint 唔可以開始**

---

## 觸發時機

CTO 完成一個 Sprint（Sprint 0 / Sprint 1 / Sprint 2 / Sprint 3）所有 tasks 後，立即執行以下 4 步。

---

## Sprint Closeout 4 步

### Step 1 — 更新 Version_and_Bug_List.md

```bash
DOCS="projects/{ID}_ProjectDocuments/documents/Phase4_Implementation"
# 如檔案未存在（Sprint 0 完成時建立）：
touch $DOCS/P{ID}_Version_and_Bug_List.md
```

必須記錄：

| 欄位 | 內容 |
|------|------|
| Sprint | Sprint N |
| 完成 Tasks | 逐條列出 task ID + 描述 |
| Commit Hash | 最新 git commit hash（`git log --oneline -1`） |
| Open Bugs | OPEN 狀態 bugs（冇 = 寫「無」） |
| 下個 Sprint | Sprint N+1 目標 |

**Step 1 必須先 commit 先填 hash：**
```bash
CODE="projects/{ID_LOWERCASE_HYPHEN}"   # e.g. projects/p2026-008-madhorse
cd $CODE
git add -A
git commit -m "Sprint {N}: {one-line summary of what was built}"
git log --oneline -1   # 貼呢行 output 到 Version_and_Bug_List
```

⛔ 冇 commit = 冇 hash = Sprint 唔算完成
⛔ HEARTBEAT 入面寫 Sprint Done 但 git commit 唔存在 = `[SPRINT_EVIDENCE_MISMATCH]`，CEO 下次 startup 必 flag

---

### Step 2 — 發 `[SPRINT_DONE]` 向 CEO

格式（send_message to CEO / 或直接回覆 CEO）：

```
[SPRINT_DONE] {PROJECT_ID} Sprint {N} — {DATE_HKT}
✅ 完成 tasks: {task list}
📦 Commit: {hash}
🐛 Open bugs: {list or 「無」}
🔄 下個 Sprint {N+1} 目標: {description}
📄 Version_and_Bug_List.md 已更新
```

---

### Step 3 — CEO 收到後即時更新 HEARTBEAT + send_message to Boss

CEO 收到 `[SPRINT_DONE]` 後必須（唔可以延遲）：

```
[STATUS_UPDATE] {PROJECT_ID} — {DATE_HKT}
📍 Phase: Phase 4 — Sprint {N} DONE
✅ 完成: {summary}
🔄 進行中: Sprint {N+1} 開始
⚠️ 需要老闆: {decision or 「無」}
```

更新 HEARTBEAT.md：
- Activity Log 加一條 `Sprint {N} DONE`
- Project Health Dashboard 更新 Days in Phase（如有變化）

---

### Step 4 — 開始下個 Sprint（或提交 Gate 4→4.5）

| 情況 | 行動 |
|------|------|
| Sprint 0/1/2 完成 | 開始下個 Sprint，唔需要 CEO 批准 |
| Sprint 3（最後 Sprint）完成 | 走 `protocols/pre-submission.md` 流程，準備 Gate 4→4.5 |

---

## Version_and_Bug_List.md 格式

```markdown
# {PROJECT_ID} Version and Bug List

## Sprint 0 — Foundation
**完成日期：** {DATE}
**Commit：** {hash}

| Task | 描述 | 狀態 |
|------|------|------|
| S0-01 | Initialize Next.js | ✅ DONE |
| ... | ... | ... |

**Bugs：** 無

---

## Sprint 1 — Core Infrastructure
（待填）
```

---

## 違規後果

| 違規 | 後果 |
|------|------|
| Sprint 完成但冇 closeout | CEO 發現後 `[SPRINT_BLOCKED]`，CTO 返去補做先可以繼續 |
| 冇 commit hash | Sprint 唔計算為完成 |
| CEO 收到 `[SPRINT_DONE]` 但超過 1 reply 冇 send_message to Boss | CEO Proactive Reporting R1 違規 |
| Phase 4 完成但 Version_and_Bug_List.md 唔存在 | Gate 4→4.5 直接 BLOCKED（compliance-check.sh 會捉） |
