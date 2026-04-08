# Verification Protocol

## The Gate Function (每次交付前 5 步)

```
1. IDENTIFY — 邊個 command 證明呢個 claim？
2. RUN      — 跑完整 fresh 命令（唔可以用舊 output）
3. READ     — 完整睇 output + exit code
4. VERIFY   — Output 真係確認咗 claim？
5. CLAIM    — Step 4 = YES 先可以聲稱完成
```

## Evidence Requirements

| Claim | Required Evidence |
|-------|------------------|
| Tests pass | Test command output: 0 failures |
| Build success | Build command: exit 0 |
| Bug fixed | Original symptom test passes in production |
| Deployed | `curl` production URL returns 200 |
| UAT passed | Each TC has screenshot path |
| Code review passed | Reviewer model actual response text |

## Red Flags (即時攔截)

| 字眼 | 判定 | 行動 |
|------|------|------|
| "should work" / "probably fixed" | ❌ 未驗證 | 停止，跑驗證 |
| "seems fine" / "looks good" | ❌ 未驗證 | 停止，跑驗證 |
| "Done!" (無 evidence) | ❌ 造假 | 打回頭 |
| 上個 session 跑過嘅結果 | ❌ 非 fresh | 重新跑 |
| CEO "咩都冇問題" (無實際驗查) | ❌ 虛假批准 | 打回 CEO，要求重新審查 |

## Cross-Verification Matrix

| 工作 | 執行者 | 驗收者 |
|------|--------|--------|
| UI/UX 設計 (Phase 2) | CDO | **COO (Requirement/Layout QC)** + **CEO (Final Visual)** + CTO + MR-1 |
| 技術設計 (Phase 3) | CTO | CISO |
| 寫 Code (Phase 4) | CTO | CISO (Anti-Dummy) + CDO (Browser UAT) |
| 部署 (Phase 4.5) | CTO deploy | CISO verify |
| UAT (Phase 5) | CDO+CTO | COO + MR-2 |

**鐵律：** 做嘢嘅人唔可以驗收自己嘅交付物。

## DRY_RUN 模式（v10.1 新增）

模擬或測試流程時，Agent 可以聲明 `[DRY_RUN]` 模式：

```
[DRY_RUN: ON] — 以下 Gate 驗證為模擬，唔連接真實服務
```

### DRY_RUN 規則
| 項目 | 正常模式 | DRY_RUN 模式 |
|------|---------|-------------|
| `curl` deploy check | 必須 200 | 標記 `[SIMULATED: curl skipped]` |
| Design deliverables | 必須存在 | 標記 `[SIMULATED: design check skipped]` |
| Tool call (`gemini_advisor` / `copilot_reviewer`) | 必須真實調用 | 標記 `[SIMULATED: advisor response mocked]` |
| File existence check | 必須 `ls` 確認 | 必須 `ls` 確認（**唔可以跳**） |
| Test suite | 必須跑 | 必須跑（**唔可以跳**） |
| Gate approval | `[BOSS_APPROVED]` | `[BOSS_APPROVED_DRY_RUN]` |

**⛔ DRY_RUN 禁止：**
- 唔可以用 DRY_RUN 跳過 file existence check 或 test suite
- 唔可以用 DRY_RUN 部署到 production
- DRY_RUN 通過 ≠ 真正通過 — 唔可以更新 PROJECT_REGISTER.md 嘅 Phase
- 所有 `[SIMULATED]` 標記嘅項目，正式執行時必須重做
