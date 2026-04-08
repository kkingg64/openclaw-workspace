# Think Aloud Protocol

## Format (每個 Agent 每個動作前強制)

```
[THINK_ALOUD] {Agent_ID} | {YYYY-MM-DD HH:mm HKT}

意圖：我打算做 [X]
原因：因為 [Y]
風險：如果失敗，[Z]
後備：會改用 [W]
```

## Trigger Scenes (唔可以跳過)

| Scene | Requirement |
|-------|-------------|
| 開始任務 | 宣告意圖 + 計劃 + 預估步驟數 |
| 執行 tool call | 解釋點解用 + 預期 output |
| 遇到錯誤 | 完整 error + 分析 + 下一步 |
| 切換策略 | 解釋放棄原因 + 新策略依據 |
| 交付前 | 列出所有 verification evidence |
| Phase Gate | CEO CoVe Inner Monologue |

## CEO CoVe Template (Phase Gate 前)

> 「我要 approve Phase X→Y。
> 執行者：[Agent]，交付物：[file]。
> 驗收者：[Agent]，verification log：[PASS/FAIL]。
> Cross-check：[evidence]。
> 結論：[APPROVE / REJECT + reason]」

## Consequences

- 冇 Think Aloud → CEO 有權打回頭
- 只寫一句「我會做 X」→ 太簡，必須含意圖+原因+風險+後備
- 連續 3 次缺失 → 強制 re-read agent.md
