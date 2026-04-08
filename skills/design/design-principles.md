# Design Principles & Rules

## 🚨 絕對禁止：自創顏色

每個 hex 值必須來自老闆批准嘅設計系統文件。禁止混合多個設計系統嘅顏色。

### shadcn Zinc Dark Hex Constants（預設）
```javascript
const C = {
  background:  "#09090B",   foreground:  "#FAFAFA",
  card:        "#09090B",   cardFg:      "#FAFAFA",
  primary:     "#FAFAFA",   primaryFg:   "#18181B",
  secondary:   "#27272A",   secondaryFg: "#FAFAFA",
  muted:       "#27272A",   mutedFg:     "#A1A1AA",
  accent:      "#27272A",   accentFg:    "#FAFAFA",
  destructive: "#7F1D1D",
  border:      "#27272A",   input:       "#27272A",
  ring:        "#D4D4D8",
};
```

### Semantic Colors
```javascript
const semanticColors = {
  success:     "#22C55E",  // 成功、正面
  warning:     "#F59E0B",  // 警告、待處理
  destructive: "#EF4444",  // 錯誤、刪除
  info:        "#3B82F6",  // 提示、連結
};
```

## Typography（IBM Carbon Type Scale）

**Font sizes（只用呢啲）：** 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 36 · 42 · 48 · 54 · 60px

**Font Weight — 只用 3 個：**
- 400 Regular — 正文、描述
- 500 Medium — 按鈕、label、次要標題
- 600 Semibold — 主要標題、重要數字

**Line Height:** 大標題 1.1 / 中標題 1.2 / 正文 1.5 / 說明 1.6
**Letter Spacing:** 48px+ → -1px / 24-36px → -0.5px / 全大寫 label → 0.8px

**必殺技：** 用 Weight + Color 建立層次，唔係靠大字號。

## Color — 60-30-10 法則
- 60% Background / 30% Surface/Card / 10% Accent
- WCAG AA：正文 ≥ 4.5:1 / 大標題 ≥ 3:1

## Spacing — 8pt Grid
```
Major: 8, 16, 24, 32, 40, 48, 64px
Minor: 4, 8, 12px
Touch targets: 最少 44×44px
```

## Shadow — 3 Elevation 層次
```javascript
const shadows = {
  sm: "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.24)",   // Cards
  md: "0 4px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.24)",   // Modals
  lg: "0 10px 15px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.2)",  // Drawers
};
```

## Laws of UX
- **Hick's Law:** Nav ≤ 7 items / Dropdown ≤ 9 / Modal CTA ≤ 2
- **Fitts's Law:** 主 CTA ≥ 48×48px / 危險操作做細放遠
- **Miller's Law:** 每 section ≤ 7 條資訊 / 數字加 comma
- **Jakob's Law:** Logo 左上 / Login 右上 / 跟從慣例
- **Gestalt:** Proximity / Similarity / Continuity / Figure-Ground

## Refactoring UI 7 法則
1. 用 Weight+Color 建立 Hierarchy
2. 灰色文字唔放彩色背景
3. 唔放大 icons，改用 illustration
4. 邊框唔係唯一分隔 → 白空間 > 背景色 > divider > shadow > 邊框
5. 唔係每個元素都需要 container
6. 第一稿從 Mobile 開始
7. Empty States 係設計機會

## Component 3 狀態
```
Button: Default / Hover / Active / Disabled
Input:  Default / Focus / Error / Disabled
```

## 完整性自檢
- ✅ 所有 shapes 在 Board 內（無 orphans）
- ✅ 每個 element 有意義嘅名字
- ✅ 層次最多 4 層
- ✅ KPI Card = label + 數字 + 趨勢
- ✅ Chart Card = 標題 + 時間範圍 + 圖表 + X-axis
- ✅ Table Card = 表頭 + 4-5行假數據 + status badge
