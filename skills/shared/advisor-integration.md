# AI Advisor Integration — When to Ask & When to Document

> 目的：確保 advisor 意見唔會消失，同時唔叫 agent 每句話都要問。

---

## 黃金法則

```
Agent 有自己判斷力 → 小決定自己做
影響後段流程嘅決定 → 必須問 advisor + 記錄
```

---

## 三個層級

### MUST ASK（必問 + 必入文件）

觸發條件：以下任何一項符合
- 🔴 **不可逆** — 一旦做咗難以撤銷（資料庫 schema、deployment architecture、API contract）
- 🔴 **安全相關** — 認證機制、權限設計、數據加密、敏感數據處理
- 🔴 **架構選型** — 選用哪個 framework / library / infra pattern
- 🔴 **超出 agent 職權** — e.g. CDO 對技術實現有懷疑 → 要問 copilot_reviewer
- 🔴 **有重大 trade-off** — 兩個方案各有利弊，唔係明顯哪個更好

**動作：**
1. 呼叫 advisor tool（`gemini_advisor` / `copilot_reviewer`）
2. 在當前工作文件加入 `[ADVISOR_REQUIRED]` 標記
3. 得到回覆後執行 → **Document Decision**（見下方格式）

---

### SHOULD ASK（建議問，採納就記錄）

觸發條件：
- 🟡 agent 有傾向但唔係 100% 確定
- 🟡 多個可行方案，需要第二意見
- 🟡 估計決定會影響後面 2+ 個 Phase

**動作：**
1. 呼叫 advisor tool
2. 如果採納意見 → 記 `[ADVISOR: source — summary]`
3. 如果唔採納 → 記 `[ADVISOR_REJECTED: reason]`（要解釋點解唔聽）

---

### MAY ASK（隨意，唔需記錄）

觸發條件：
- 🟢 語法問題、小細節、純技術實現問題
- 🟢 決定唔影響架構 / 設計 / 安全
- 🟢 答案改咗分分鐘
- 🟢 純好奇

**動作：** 問或唔問都可以。唔需要記入文件。

---

## Document Decision Format

當 MUST ASK 或 SHOULD ASK 意見被採納，必須喺相關文件加入此 block：

```markdown
### [DECISION] {決定名稱}

**決定：** {採用方案}
**原因：** {1-2 句}
**Advisor 意見：** `[Source: {tool}({type}) at {timestamp}]`
  > "{advisor 原文或摘要}"
**被拒絕嘅替代方案：** {optional — 如有其他 option}
**影響：** {影響到後面哪些 Phase / 文件}
```

**存放位置：**
- Phase 1 決定 → `{ID}_Requirements.md` 末段 "AI Advisor Amendments"
- Phase 1.5 決定 → `{ID}_AI_Advisor_QA.md`
- Phase 2 決定 → `{ID}_CDO_Design_Brief.md` 或 `{ID}_UI_Spec.md`
- Phase 3 決定 → `{ID}_Technical_Spec.md`
- Phase 4 決定 → `{ID}_Version_Bug_List.md` 或 inline comment（`// [DECISION]`）

---

## Agent 自問流程（每個決定前 30 秒）

```
我要做 [X]。

1. 影響後面幾多個 Phase？
   → 0 個 = MAY ASK
   → 1 個 = SHOULD ASK
   → 2+ 個 = MUST ASK

2. 呢個決定可以輕易撤銷嗎？
   → 可以 = MAY/SHOULD
   → 唔可以 = MUST ASK

3. 我有安全 / 架構顧慮嗎？
   → 有 = MUST ASK
```

---

## 不採納意見也要記錄

Agent 唔能夠問完 advisor 就靜靜雞唔理佢。

如果決定唔跟 advisor 建議：
```markdown
[ADVISOR_REJECTED]
Advisor 建議：{建議內容}
我唔採納，因為：{理由}
我嘅決定：{實際做法}
```

CEO Cross-Examination 必問：「Advisor 建議咗什麼？你點決定？」

---

## 快速參考表

| 情況 | 問？ | 記錄？ |
|------|------|--------|
| 選 Next.js vs Remix | ✅ MUST | ✅ Technical_Spec.md |
| Auth 用 JWT vs Session | ✅ MUST | ✅ Technical_Spec.md |
| 按鈕用藍色還是紫色 | 🟢 MAY | ❌ |
| Tailwind class 點寫 | 🟢 MAY | ❌ |
| API pagination strategy | 🟡 SHOULD | ✅ 如採納 |
| Error message 文案 | 🟢 MAY | ❌ |
| Database index 設計 | ✅ MUST | ✅ Technical_Spec.md |
| CORS policy 設定 | ✅ MUST | ✅ Technical_Spec.md |
| 用唔用 Redis cache | 🟡 SHOULD | ✅ 如採納 |
| component 命名 | 🟢 MAY | ❌ |
