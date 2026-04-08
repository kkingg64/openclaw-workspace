# Verification Toolkit (MR-1 / MR-2 / Gate Check)

呢個目錄提供可重複執行嘅驗證模板，對應 `AGENTS.md` v9.0 嘅 Multi-Model Verification。

## Files

- `MR1_template.md`
  - Phase 2 -> 3 三模型審查模板
- `MR2_template.md`
  - Phase 4.5 -> 5 三模型審查模板
- `gate_check_template.sh`
  - Gate Check 骨架（由驗收者執行）

## Usage Rules

1. 做嘢嘅人唔可以驗收自己
2. 所有 PASS/FAIL 必須有 command output 證據
3. MR-1/MR-2 任一模型 BLOCK，需要三模型全部重跑
4. Gate 有任何 FAIL，禁止請求 CEO 簽署

## Output Location

新項目一律跟 `docs/PROJECT_TEMPLATE/` 路徑。Legacy 項目可以暫時沿用平面文件，但新 artefact 優先寫入 phase 目錄。

標準輸出位置：
- `projects/{ProjectID}_ProjectDocuments/documents/Phase2_Design/{ProjectID}_MultiModel_Review_1.md`
- `projects/{ProjectID}_ProjectDocuments/documents/Phase4_5_DeployVerification/{ProjectID}_MultiModel_Review_2.md`
- `projects/{ProjectID}_ProjectDocuments/documents/Phase4_5_DeployVerification/{ProjectID}_Gate_Check.log`

完整 phase 規範見：
- `docs/PROJECT_EXECUTION_STANDARD.md`
- `docs/PHASE_GATE_CHECKLIST.md`
