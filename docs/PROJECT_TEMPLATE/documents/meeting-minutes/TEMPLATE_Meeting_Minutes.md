# {PROJECT_ID} Meeting Minutes — Gate {GATE}

**Date:** YYYY-MM-DD HH:MM HKT
**Gate:** {FROM}→{TO}
**Chair:** CEO
**Participants:** {list agents present}
**Outcome:** `APPROVED` / `BLOCKED` / `ESCALATED`

---

## 1. Deliverables Presented

| # | Deliverable | Presented By | File Path |
|---|-------------|-------------|-----------|
| 1 | [item] | [agent] | [path] |

## 2. Deliverable Screenshots（必須）

每個主要交付物必須有截圖證據。截圖存入 `meeting-minutes/screenshots/`。

| # | Screenshot | Description | Path |
|---|-----------|-------------|------|
| 1 | [Gate 對應嘅截圖] | [what it shows] | `meeting-minutes/screenshots/{ID}_Gate-{X}-{Y}_{n}.png` |

**各 Gate 必截圖：**
- **1→1.5:** Research 文件存在證據（`ls` output screenshot）
- **1.5→2:** AI Advisor QA + Design Brief 開頭截圖
- **2→MR1:** Penpot 設計稿截圖（每個 screen Desktop + Mobile）+ UI Spec 截圖
- **3→4:** Tech Spec architecture diagram + CISO_SAFE 簽章截圖
- **4→4.5:** `npm test` output 截圖 + test coverage 截圖
- **4.5→MR2:** `curl` 200 截圖 + Anti-Dummy scan 截圖 + 瀏覽器開 production URL 截圖
- **5→6:** UAT 每個 TC 截圖 + Design vs Production 對比截圖
- **6→BAU:** lessons-learned 文件截圖

⛔ 冇截圖 = Gate FAIL，即使其他全部 PASS

## 3. Evidence Check

```
[EVIDENCE] {command}: {output}
```

Result: PASS / FAIL

## 3. Cross-Examination

### Q1: [CEO question]
**Asked to:** [agent]
**Answer:** [agent's full response]
**CEO verdict:** ✅ Satisfactory / ❌ Insufficient → [follow-up or action]

### Q2: [CEO question]
**Asked to:** [agent]
**Answer:** [agent's full response]
**CEO verdict:** ✅ Satisfactory / ❌ Insufficient → [follow-up or action]

### Q3: [CEO question]
**Asked to:** [agent]
**Answer:** [agent's full response]
**CEO verdict:** ✅ Satisfactory / ❌ Insufficient → [follow-up or action]

## 4. AI Advisor Decisions

記錄本 Gate 期間所有 MUST ASK / SHOULD ASK 的 advisor 諮詢及結果。
（MAY ASK 唔需記錄。完整規則見 `skills/shared/advisor-integration.md`）

| # | 決定 | 層級 | Advisor Tool | 採納？ | [Source] tag |
|---|------|------|-------------|--------|-------------|
| 1 | [決定名稱] | MUST/SHOULD | gemini_advisor / copilot_reviewer | ✅ / ❌ | `[Source: {tool}({type}) at {timestamp}]` |

**採納的意見（填 [DECISION] block）：**
```markdown
### [DECISION] {決定名稱}
**決定：** {採用方案}
**原因：** {1-2 句}
**Advisor 意見：** `[Source: {tool}({type}) at {timestamp}]`
  > "{advisor 摘要}"
**影響：** {影響到後面哪些 Phase / 文件}
```

**拒絕的意見（填 [ADVISOR_REJECTED] block）：**
```markdown
[ADVISOR_REJECTED]
Advisor 建議：{建議內容}
唔採納原因：{理由}
實際決定：{做法}
```

⛔ 問過 advisor 但冇記錄 = CEO Cross-Exam 必問「Advisor 建議咩？你點決定？」

## 5. Issues & Rejections

| # | Issue | Raised By | Severity | Resolution |
|---|-------|-----------|----------|------------|
| — | None / [describe] | [agent] | Low/Med/High/Critical | [action or blocker] |

## 6. Decision

```
[CROSS_EXAM: {n}/{n} answered satisfactorily]
[EVIDENCE] {check}: {output}
[BOSS_APPROVED_{DATE}_{TIME}_HKT]
```

_or if blocked:_

```
[GATE_BLOCKED: {reason}]
[ACTION_REQUIRED] {agent}: {what to fix}
[NEXT_REVIEW] {expected date}
```

## 7. Action Items

| # | Action | Owner | Deadline | Status |
|---|--------|-------|----------|--------|
| 1 | [task] | [agent] | [date] | Open |

## 8. Boss 呈交

CEO 必須將此 MM 透過 `send_message` 向 Boss 報告：
```
send_message("Boss, P2026-XXX Gate {FROM}→{TO} 完成審核。
結果: APPROVED/BLOCKED
附 Meeting Minutes: {file_path}
截圖: {n} 張
主要發現: {1-2 sentence summary}
待處理: {any action items}")
```
⛔ MM 寫完但未 `send_message` 到 Boss = 未完成

---

*Filed by: CEO | Gate: {GATE} | Attempt: {1/2/3}*
