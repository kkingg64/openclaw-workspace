# 世界級 Design Systems 研究報告
**COO → CDO 知識傳遞 | 2026-03-31**

---

## 🎯 任務目標
研究世界級 Design Systems，供 CDO 構建 MADHORSE Design System 參考。

---

## 1️⃣ 七大 Design Systems 總覽

| System | 擁有者 | 核心特點 | 成熟度 |
|--------|--------|----------|--------|
| **Material Design 3** | Google | 動態色彩、tokens化、Material You | ⭐⭐⭐⭐⭐ |
| **Human Interface Guidelines** | Apple | 清晰、尊重、深度整合 | ⭐⭐⭐⭐⭐ |
| **Fluent Design** | Microsoft | 毛玻璃、透視層、光影動效 | ⭐⭐⭐⭐ |
| **Polaris** | Shopify | 電子商務垂直深度、商業組件 | ⭐⭐⭐⭐ |
| **Lightning** | Salesforce | 企業級、表格/CRM專用組件 | ⭐⭐⭐ |
| **Atlassian DS** | Atlassian | 協作/工具類、導航系統強 | ⭐⭐⭐⭐ |
| **Base Web** | Uber | 極簡、高性能、數據密集型 | ⭐⭐⭐ |

---

## 2️⃣ 顏色系統深度分析

### Material Design 3 (M3) — 最值得參考
```
✅ 動態色彩：用戶牆紙提取主色，自動生成色板
✅ Tertiary 色軌：除了 primary/secondary，增加第三色軌
✅ 語義化 tokens：--color-on-primary, --color-surface-variant
✅ 調色盤：每色有 13 級亮度 (0-100, 10-999)
✅ Error color 獨立：明確的錯誤狀態色
```
**CDO 啟示：** MADHORSE 應建立 `--color-primary`, `--color-accent`, `--color-surface`, `--color-background` 四層語義化 tokens，並支援動態替換。

### Apple HIG
```
✅ 系統色彩：自動適配 Light/Dark mode
✅ 無障礙：高對比度模式、色彩盲友好
✅ 品牌色僅用於 logo/裝飾，UI 用系統色
```
**CDO 啟示：** 不要硬編碼顏色，全部用 tokens。

### Spotify / Polaris (Shopify)
```
✅ 強調色系統：只有一個 brand color，其餘全是中性色
✅ Dark mode 優先：Polaris 原生深色，再淺化
✅ 圖表色彩：預設 8 色盤，確保數據可視化一致性
```

---

## 3️⃣ Typography 規範

### M3 Type Scale
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display Large | 57px | 400 | 64px | 空大標題 |
| Display Medium | 45px | 400 | 52px | |
| Headline Large | 32px | 400 | 40px | 頁面標題 |
| Headline Medium | 28px | 400 | 36px | 章節標題 |
| Title Large | 22px | 400 | 28px | 卡片標題 |
| Title Medium | 16px | 500 | 24px | 按鈕文字 |
| Body Large | 16px | 400 | 24px | 正文 |
| Body Medium | 14px | 400 | 20px | 次要文字 |
| Label | 11px | 500 | 16px | 微細標籤 |

**CDO 啟示：** MADHORSE 應固定 6-8 級字體階層，避免任意大小。

### Apple HIG
```
✅ SF Pro：系統字體，iOS/macOS 原生渲染
✅ Dynamic Type：用戶可調字體大小（最小 11pt，最大 35pt+）
✅ 重要提示：所有文字必須在Accessibility Inspector下可讀
```

### Atlassian
```
✅ 字體：Badger Serif (標題) + Atlas Grotesk (內文)
✅ 2 種字體配搭：襯線標題增加品牌感
✅ 嚴格行高比例：標題行高 1.25，內文行高 1.5
```

---

## 4️⃣ Spacing / Grid 系統

### M3 Spacing (4px Grid)
```
4, 8, 12, 16, 24, 32, 48, 64, 96px
✅ 所有間距是 4 的倍數
✅ 組件內間距：4-8px
✅ 組件間距：16-24px
✅ 頁面邊距：16-24px (mobile), 24-32px (desktop)
```

### M3 Layout Grid
```
✅ 12 列網格 (desktop)
✅ 8 列網格 (tablet)
✅ 4 列網格 (mobile)
✅ Gutter: 16-24px
✅ Margin: 12-24px
```

### Atlassian Grid
```
✅ 5 種間距：spacing-0 (0), spacing-xs (4px), spacing-sm (8px), 
           spacing-md (16px), spacing-lg (24px), spacing-xl (32px)
✅ Layout Grid 有明確文檔：欄數、間距Gutter、邊距Margin
```

**CDO 啟示：** MADHORSE 採用 M3 4px Grid 系統，所有間距標準化。

---

## 5️⃣ Component Patterns

### M3 組件特色
```
✅ FAB (Floating Action Button)：主導航操作
✅ Bottom Navigation：5 個 icon 以內的底部導航
✅ Navigation Rail：桌面版側邊導航（精簡）
✅ Cards：3 種 elevation 等級
✅ Chips：Tag/Filter 專用，分 Input/Assist/Filter/Suggestion 四種
✅ Segmented Button：單選按鈕組
```

### Atlassian 組件強項
```
✅ Navigation System：整合 top + side + left nav 的完整方案
✅ Table：企業級表格，支持排序/篩選/分頁/行操作
✅ Comment：討論串UI，CRM/協作工具必備
✅ Avatar Group：多人頭像疊加顯示
✅ Form Layout：表單佈局系統
```

### Uber Base Web
```
✅ 高性能：按需加載、tree-shaking 友好
✅ 數據密集：專為 Dashboard/後台系統設計
✅ 表格組件：支援虛擬化（virtualization）千行數據
✅ Modal：確認對話框有 blocking / 非阻塞 兩種
```

### Apple HIG
```
✅ 群組化：iOS Settings 將相關設定分組
✅ Swipe Actions：列表項左右滑出操作
✅ Context Menus：右鍵/長按上下文選單
✅ Sheet/Modal：底部彈出式面板（iOS 風格）
```

---

## 6️⃣ Dark Mode 處理

### M3 Dark Mode
```
✅ 表面提升：dark mode 用 elevation 區分層次（深淺表面）
✅ 降低對比度：dark mode 純白文字改為 #E6E6E6，避免眼睛疲勞
✅ 主色調暗化：--color-primary → --color-primary-dark
✅ 有趣細節：某些動畫在深色主題下更明顯
```

### Polaris Dark Mode
```
✅ 品牌色反轉：深色模式下 brand color 變浅
✅ 避免純黑背景：使用 #1a1a1a 而非 #000000
✅ 圖表同步：深色主題下地圖表有對應色
✅ Toggle 優先：默認支持 theme toggle
```

**CDO 啟示：** MADHORSE 必須建立 `:root[data-theme="dark"]` 和 `:root[data-theme="light"]` 兩套 tokens。

---

## 7️⃣ Design Tokens 實現方式

### M3 Tokens (CSS Variables)
```css
:root {
  --md-primary: #6750A4;
  --md-on-primary: #FFFFFF;
  --md-surface: #FFFBFE;
  --md-surface-variant: #E7E0EC;
  --md-outline: #79747E;
  --md-outline-variant: #CAC4D0;
}
```

### M3 Dark Mode Tokens
```css
:root[data-theme="dark"] {
  --md-primary: #D0BCFF;
  --md-on-primary: #381E72;
  --md-surface: #1C1B1F;
  --md-surface-variant: #49454F;
}
```

---

## 8️⃣ CDO 可以學乜 & 如何應用到 MADHORSE

### ✅ 立即採用

| 做法 | 來源 | MADHORSE 應用 |
|------|------|---------------|
| **4px Grid System** | M3 / Atlassian | 所有間距標準化 |
| **語義化 Color Tokens** | M3 / Polaris | `--color-bg`, `--color-surface`, `--color-text` |
| **6-8 級 Typography Scale** | M3 | 固定字體大小层级 |
| **CSS Variables 実装** | 所有 DS | 支援 Light/Dark theme |
| **組件狀態文檔化** | Atlassian | Default/Hover/Active/Disabled/Focus/Error |

### ✅ 值得研究

| 做法 | 來源 | CDO 下一步 |
|------|------|-----------|
| **動態色彩** | M3 Material You | 考慮用户牆紙提取主色 |
| **Navigation System** | Atlassian | 學習完整導航架構 |
| **Skeleton Loading** | Atlassian | 內容加載時的 placeholder |
| **企業級 Table** | Uber Base Web | Dashboard 數據展示 |

### ❌ 不適合 MADHORSE

| 做法 | 原因 |
|------|------|
| Apple HIG 的 native-only 約束 | MADHORSE 是 Web 應用 |
| Salesforce Lightning 的 CRM 專用組件 | 垂直場景不匹配 |
| Uber Base Web 的極簡風格 | MADHORSE 需要更鮮明品牌特色 |

---

## 9️⃣ 建議 MADHORSE Design System 核心框架

```
MADHORSE Design System v1.0
├── Color System
│   ├── Primary: #1A1A2E (深藍黑)
│   ├── Accent: #E94560 (紅強調)
│   ├── Surface: #16213E
│   ├── Background: #0F3460
│   ├── Text: #FFFFFF
│   ├── Text Muted: #A8A8B3
│   ├── Success: #00B894
│   ├── Error: #FF6B6B
│   └── Warning: #FDCB6E
│
├── Typography
│   ├── Display: Inter 32px/700
│   ├── H1: Inter 28px/700
│   ├── H2: Inter 24px/600
│   ├── H3: Inter 18px/600
│   ├── Body: Inter 16px/400
│   ├── Caption: Inter 14px/400
│   └── Micro: Inter 12px/400
│
├── Spacing (4px Grid)
│   4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px
│
├── Components
│   ├── Button (Primary/Secondary/Ghost)
│   ├── Card
│   ├── Input / Textarea
│   ├── Modal / Dialog
│   ├── Navigation (Top + Side)
│   ├── Table (basic)
│   ├── Avatar
│   ├── Badge / Chip
│   └── Toast / Notification
│
└── Dark Mode
    └── CSS Variables with [data-theme="dark"]
```

---

## 📋 結論

**最值得 CDO 深度研究：**
1. **Material Design 3** — 最佳整體參考，tokens 系統完整
2. **Atlassian DS** — 導航和表單組件特別強
3. **Polaris** — Dark mode 優先 + 品牌色系統

**立即行動：** CDO 應以 M3 4px Grid + 語義化 Color Tokens 作為 MADHORSE Design System v1.0 基礎。

---

*COO 研究員 完成 | 2026-03-31 10:50 UTC*
