# {PROJECT_ID} — CDO Design Brief

> **來源：** Phase 1.5 AI Advisor Discussion  
> **準備：** COO  
> **交付：** CDO（Phase 2 開始前必讀）  
> **日期：** {YYYY-MM-DD}  
> **狀態：** [ ] 草稿 / [ ] Boss 已批准

---

> ⚠️ **CDO Iron Law：** 冇此 Brief = 唔可以開始 Phase 2。
> 如 Brief 不存在，send_message to COO 要求補交。

---

## 1. Design System Decision

**選定系統：** [A/B/C/D/E] — [系統名稱]

| 本地路徑 | 用途 |
|---------|------|
| [路徑] | [用途] |

**理由：** [2-3 句解釋]

**Colour Token 起點：**
```javascript
const C = {
  background: "#XXXXXX",
  foreground: "#XXXXXX",
  // ...（從對應設計系統填入）
};
```

---

## 2. Visual Style

| 項目 | 決定 |
|------|------|
| **Mode** | Dark / Light |
| **Brand Tone** | [描述，如：Professional / Playful / Minimal] |
| **Colour Direction** | [主色 + 配色描述] |
| **Typography** | [字型族，如：Inter / System-UI] |
| **Border Radius** | [如：8px rounded / 12px rounded / sharp] |
| **Density** | [Compact / Normal / Spacious] |

---

## 3. Screen Inventory

| # | Screen Name | 目的 | 主要用戶 | Priority | Breakpoints |
|---|-------------|------|---------|---------|-------------|
| 1 | [名稱] | [目的] | [用戶] | P0 | Desktop/Mobile |

---

## 4. Navigation Structure

**類型：** [Sidebar / Top Tabs / Bottom Nav / Wizard / etc.]

**結構圖：**
```
[Root]
├── [Section 1]
│   ├── [Page A]
│   └── [Page B]
└── [Section 2]
```

---

## 5. User Journey

**Persona A — [角色名稱]：**
1. 進入 → [起始頁]
2. 執行 → [主要動作]
3. 完成 → [結果頁/確認]

---

## 6. Responsive Requirements

| Breakpoint | 尺寸 | 必須支援 | 特殊說明 |
|-----------|------|---------|---------|
| Desktop | 1440×900 | ✅ | 主要 layout |
| Tablet | 768×1024 | [✅/❌] | [說明] |
| Mobile | 390×844 | [✅/❌] | [說明] |

---

## 7. Component State Requirements

CDO 必須為以下組件設計所有狀態：

| Component | Default | Hover | Active | Disabled | Error/Empty |
|-----------|---------|-------|--------|----------|-------------|
| Button (primary) | ✅ | ✅ | ✅ | ✅ | — |
| Input field | ✅ | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | [✅/—] | — | — | ✅ |
| Badge | ✅ | — | — | — | — |
| Table row | ✅ | ✅ | ✅ | — | ✅ |

---

## 8. Reference Material

| 類型 | 路徑/URL | 說明 |
|------|---------|------|
| React 參考 | `/opt/design-systems/shadcn/blocks/` | shadcn blocks |
| 組件參考 | `/opt/design-systems/shadcn/components/` | 56 個 UI 組件 |
| Tabler HTML | `/opt/design-systems/tabler/html-components/` | 62 個 HTML 組件 |

---

**Boss 批准記錄：**  
日期：[YYYY-MM-DD]  
方式：[口頭 / 書面]  
備注：[特別要求]
