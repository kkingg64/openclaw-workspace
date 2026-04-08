# SKILLS_WORKFLOW.md — 工作流程 + SOP + UAT

> 本文件涵蓋：Templates 資源庫、Phase 2 SOP、UAT 驗收、UI Spec 格式、品牌清單

## 🏛️ Penpot Built-in Templates — CDO 可用資源庫

> ⚠️ **v3.3 重要更正（2026-03-31 實測）**
>
> **Pencil | Penpot Design System 唔係通用 UI 組件庫！**
> 佢係 Penpot **自己應用程式** 嘅設計系統，730 個 components 全部係：
> - `Dark / Workspace / ...` — Penpot app 介面
> - `_Utilities / ...` — 內部工具
> - `Icons / ...` — 有用，但唔係 Button/Card/Table/Chart 等
>
> **Plugin API `connectLibrary()` 亦有 Bug：** 返回 ClojureScript Promise，`await` 會令 browser plugin 斷線。**唔能用。**
>
> 如需使用 Pencil Icons，用 **REST API** 方式（見下方）。
> 如需真正嘅 Dashboard UI 組件，用 **MADHORSE 手砌方案**（見最底）。

---

### 📚 完整 Template 目錄（已更正）

| # | Template ID | 名稱 | 最適用場景 | CDO 使用建議 |
|---|-------------|------|------------|-------------|
| 1 | `penpot-design-system` | **Pencil \| Penpot Design System** ❌ 唔係通用 UI Kit | Penpot **自己**嘅 App UI（Workspace panels、internal buttons） | **不要用於 dashboard 設計** — 無 Button/Card/Chart 等組件 |
| 2 | `wireframing-kit` | **Wireframe Library** | 低保真線框圖、流程設計 | Phase 2 早期：快速建立 user flow 草圖 |
| 3 | `tokens-starter-kit` | **Design Tokens Starter Kit** | Token-first 設計系統基礎 | 建立新 Design System 嘅起點，import 後作為 variables 參考 |
| 4 | `prototype-examples` | **Prototype Template** | Prototype interaction 範例 | 學習 prototype interactions 同 overlay 效果 |
| 5 | `plants-app` | **UI Mockup Example** | 完整 app 設計範例（Plants app） | 參考完整 UI 設計規格同結構 |
| 6 | `tutorial-for-beginners` | **Tutorial for Beginners** | Penpot 入門教學 | 唔建議 CDO 直接用 |
| 7 | `lucide-icons` | **Lucide Icons** ⭐⭐⭐ | 1,000+ 開源 icon 集合 | **必連接** — 每個項目都需要 icon，唔需要自己畫 |
| 8 | `font-awesome` | **Font Awesome** | Font Awesome icon 集合 | 備選 icon 庫（Lucide 優先） |
| 9 | `black-white-mobile-templates` | **Black & White Mobile Templates** | 手機 app 設計模板 | Mobile-first 項目參考 |
| 10 | `avataaars` | **Avataaars** | 自定義卡通頭像組件 | 需要用戶 avatar 嘅項目 |
| 11 | `ux-notes` | **UX Notes** | 設計批注/便利貼組件 | Phase 2 設計評審時用，加批注係 canvas |
| 12 | `whiteboarding-kit` | **Whiteboarding Kit** | 白板/頭腦風暴工具 | Phase 1 研究/規劃階段 |
| 13 | `open-color-scheme` | **Open Color Scheme** | 完整顏色調色板 | 需要自訂顏色但無設計系統時 |
| 14 | `flex-layout-playground` | **Flex Layout Playground** | Flex layout 範例 | 學習/測試 Penpot flex layout |
| 15 | `welcome` | **Welcome** | Penpot 歡迎頁範例 | 唔需要直接用 |

**⭐⭐⭐ 每個項目必連接：**
- `penpot-design-system` (Pencil) — UI 組件庫
- `lucide-icons` — Icon 庫

---

### 🔗 已匯入 Library — 實測結果（重要）

| Library 名稱 | File ID | 組件數 | 組件類型 | 可用於 Dashboard？ |
|-------------|---------|--------|---------|------------------|
| Pencil \| Penpot Design System | `4630bc3b-48f6-8027-8007-cbe4c536bcc5` | 730 | Penpot App UI、Icons | ❌ **不適合** |

**組件分類（REST API 實測）：**
- `Dark / ...` (375) — Penpot workspace panels、internal components
- `_Utilities / ...` (180) — 內部工具
- `Icons / ...` (167) — ✅ SVG icons，可用
- `Path editor` (6)、`Brand` (1)

---

### ❌ Plugin API Library 限制（已實測確認）

```
penpot.library.availableLibraries() → 返回 {} (空 object，唔係 array)
penpot.library.connectLibrary(id)   → 返回 ClojureScript Promise
await penpot.library.connectLibrary(id) → 令 browser plugin 斷線 ❌
.then() callback                    → 同樣令 browser plugin 斷線 ❌
penpot.library.local.components     → []（本地 file 無 components）
```

**結論：Plugin API 嘅 Library 功能喺 execute_code 入面基本上無法使用。**

---

### ✅ REST API 讀取 Pencil Icons（可行方案）

可以用 REST API 攞到 Pencil 全部 167 個 icon 嘅 SVG，然後用 `penpot.createShapeFromSvg()` 放到 canvas：

```python
# Step 1: 攞 Pencil file data（包括所有 component shapes）
import urllib.request, json

COOKIE = 'auth-token=<token>'  # 每次 login 後獲取
PENCIL_ID = '4630bc3b-48f6-8027-8007-cbe4c536bcc5'
BASE = 'http://76.13.215.13:9001'

# 透過 REST API 攞 file 全部 components
req = urllib.request.Request(
    f'{BASE}/api/rpc/command/get-file?id={PENCIL_ID}',
    headers={'Cookie': COOKIE, 'Accept': 'application/json'}
)
with urllib.request.urlopen(req, timeout=30) as r:
    data = json.loads(r.read())

comps = data['data']['components']
# 只取 Icons 類
icons = {k: v for k, v in comps.items() if v.get('path','').startswith('Icons')}
print(f"Found {len(icons)} icons")
for name, comp in list(icons.items())[:5]:
    print(f"  {comp['name']} | path: {comp['path']}")
```

---

### 🎯 CDO Dashboard 設計正確方案（無需 Library）

> Library API 唔 work，唔緊要。CDO 用 `createBoard` + `createRectangle` + `createText` 已經可以做出高質 Dashboard。
> 呢個係 **MADHORSE 官方組件建立方式**。

#### 原則：建立可重用嘅 helper function

```javascript
// ═══════════════════════════════════════════
// MADHORSE Design Token（唔要每次手打顏色）
// ═══════════════════════════════════════════
const C = {
  bg:      '#0F3460',  // 主背景
  card:    '#16213E',  // 卡片背景
  surface: '#1A1A2E',  // Header/Sidebar
  accent:  '#E94560',  // 主色調（按鈕、active）
  success: '#00B894',
  warning: '#FDCB6E',
  error:   '#FF6B6B',
  textPrimary:   '#FFFFFF',
  textSecondary: '#A8A8B3',
  border:  '#2D3561',
};

// 建立一個 Card 組件
function makeCard(name, x, y, w, h, title, value, subtitle) {
  const card = penpot.createBoard();
  card.name = name;
  card.resize(w, h);
  card.x = x; card.y = y;
  card.fills = [{ fillColor: C.card, fillOpacity: 1 }];
  card.borderRadius = 12;

  const t = penpot.createText(title);
  t.name = name + '/Title';
  t.x = x + 20; t.y = y + 20;
  t.fills = [{ fillColor: C.textSecondary, fillOpacity: 1 }];

  const v = penpot.createText(value);
  v.name = name + '/Value';
  v.x = x + 20; v.y = y + 50;
  v.fills = [{ fillColor: C.textPrimary, fillOpacity: 1 }];

  if (subtitle) {
    const s = penpot.createText(subtitle);
    s.name = name + '/Sub';
    s.x = x + 20; s.y = y + 90;
    s.fills = [{ fillColor: C.success, fillOpacity: 1 }];
  }
}
```

#### 已驗證可用嘅 API（無需 Library）

```javascript
penpot.createBoard()           // ✅ Frame/Section
penpot.createRectangle()       // ✅ 矩形（cards、bars、dividers）
penpot.createEllipse()         // ✅ 圓形（avatars、dots）
penpot.createText(content)     // ✅ 文字
penpot.createShapeFromSvg(svg) // ✅ SVG（icons）
penpot.uploadMediaUrl(url)     // ✅ 圖片（logos）
penpot.group([shapes])         // ✅ 群組
```

#### 🔑 CDO 用「手砌」方案被確認係正確決策

CDO 喺上次 run 用 createRectangle/createText 建立嘅設計已有：
- 125 shapes、78 text elements、0 orphans
- 完整 Header / Sidebar / Stats / Chart / Table / Buttons
- 正確嘅 MADHORSE 顏色

**呢個唔係 failure — 係唯一可行嘅方案。**

---

### 📥 REST API — 匯入新 Template（Boss 手動）

> Plugin API 唔 work，但 Boss 可以手動匯入 template 做**參考**。CDO 睇番佢嘅設計結構抄。

```
1. 開啟 http://76.13.215.13:9001
2. 登入 → 去任何 Project
3. 右下角「Libraries & Templates」區域
4. 找到要用嘅 template → 點「Add to my drafts」
5. CDO 睇 template 嘅 layout 同顏色，用手砌方式在自己 file 重現
```

---

### 🎨 Templates / Library 使用場景決策樹（v3.3 修正）

```
新項目開始設計？
├── 需要 Dashboard UI？
│   └── ✅ 用 createBoard/createRectangle/createText + MADHORSE tokens
│       Plugin API Library 唔 work，唔好浪費時間
├── 需要 Icons？
│   ├── 簡單 icon → createShapeFromSvg() + 手寫 SVG path（簡單形狀）
│   └── 複雜 icon → uploadMediaUrl() 從外部 URL 載入 SVG
├── Mobile 項目？→ 同 Dashboard，手砌方案
└── 自訂 Design System？
    → 喺 Penpot 建立 MADHORSE 自己嘅 local components（未來計劃）

如果 Boss 要求用特定 community template？
└── Boss 手動下載 .penpot 檔案匯入 → CDO 從 DOM 複製 shapes
    （唔涉及 Library API，直接 copy 已有 shapes）
```

---

## 🚀 PHASE 2 執行 SOP — CDO 設計流程 (強制)

> Phase 2 係 CDO 嘅主戰場。交付物：`{ID}_UI_Spec.md` + `{ID}_UAT_Test_Case.md` + `designs/` 截圖
> CDO 必須用 **Pencil CLI** 建立設計並輸出 PNG，唔係寫 markdown 描述。

### Step-by-Step 執行路線

```
Step 0: ⚠️ 強制 — 讀取 {ID}_CDO_Design_Brief.md（存於 Phase1_Research/）
         → 確認 Design System 選擇、Visual Style、Screen Inventory、Navigation、Responsive
         → 唔可以跳過或靠猜測。冇 Brief = 停止，send_message ask COO 補交
Step 0.5: ⚠️ 強制 — Design System 確認
         → 按 Brief 指定系統讀取 tokens
         → shadcn: 用 SKILLS_PENCIL.md 嘅 Zinc Dark hex constants
         → MADHORSE: 用 MADHORSE token（bg:#1A1A2E, accent:#E94560）
         → 其他系統：按 Brief 指定路徑讀取
         → send_message to CEO：「確認使用 [X] Design System，開始設計」
Step 1: 讀取 Phase 1 Research Doc + Requirements → 理解需求細節
Step 2: 🆕 設計系統選擇協議 → 已由 Brief 確認，仍需正式呈現選項 → 等待老闆批准 (見下方)
Step 2.5: 🆕 Design-to-Code Bridge 協議 → 讀取對應 React 代碼參考 (見下方)
Step 3: 用 Pencil CLI batch_design 建立設計結構（Multi-Session 策略）
         → 每個 Screen = 一個 Frame，必須畫完才算完成——唔好以為畫咗一部分就係 done
         → ⚠️ 一個完整 1440×900 Dashboard Screen 需要 5-6 個 session，唔係一個
         → 分 Zone 建造（每個 session 負責一個 Zone）：
              Session 1: Page Frame + Header + Sidebar 框架
              Session 2: Sidebar 填充（所有 Agent rows + System rows）
              Session 3: Content 區 + KPI Row（4 cards）
              Session 4: Project Status Grid（4-8 cards with badges）
              Session 5: Research / Content Bottom Row（3-4 cards）
              Session 6: export_nodes（截圖）
         → 每個 session 結束必須 save()，下個 session 用 --in + --out 繼續
         → ❌ 禁止在一個 session 內塞入整個 Screen 的所有內容（必定超時 / 截斷）
         → ✅ 完整模板見：SKILLS_PENCIL.md § FULL SCREEN BUILDING PROTOCOL
Step 4: Export 每個 Screen 為 PNG → 存入 projects/{PROJECT_ID}_ProjectDocuments/designs/exports/
         ⚠️ 完成後必須報告完整路徑：
         /root/.openclaw/workspace/projects/{PROJECT_ID}_ProjectDocuments/designs/exports/{PROJECT_ID}_[ScreenName]_[Breakpoint].png
         → 例：/root/.openclaw/workspace/projects/P2026-001_ProjectDocuments/designs/exports/P2026-001_Dashboard_Desktop.png
Step 5: 生成 CSS tokens → 記入 UI Spec
Step 6: 寫 UI Spec 文件
Step 7: 寫 UAT Test Case 文件（每個 Screen 至少 1 個 TC）
Step 8: ⚠️ 強制 — send_message to COO，請求 Design QC Review
         附：所有 PNG 路徑 + {ID}_UI_Spec.md 路徑 + {ID}_CDO_Design_Brief.md 路徑
         COO 會對照 Design Brief 逐一 check：
           - 每個 Screen PNG 視覺完整（無空白區域）
           - 所有 Brief 要求嘅 sections 都出現喺 PNG
           - 所有 scoped Screens 都有完整 component HTML spec
         等待 COO 回覆 [COO_DESIGN_QC_PASSED] 或 [COO_DESIGN_QC_REJECTED + 意見]
         如果 REJECTED → 根據意見修改設計，重回 Step 3，重新 QC
Step 9: COO QC PASSED → send_message to CTO 做 Buildability Review
         附：{ID}_UI_Spec.md + designs/exports/ 清單
Step 10: CTO PASS → 執行 MR-1（見下方）
Step 11: ⚠️ 強制 — MR-1 PASS 後 send_message to CEO，附上所有 PNG 路徑
          CEO 驗收 UI output + screencap → 向 Boss 匯報
```

---

### 📋 MR-1 執行 SOP（Step 9 完成後）

> **Phase 2 → Phase 3 Gate：三模型投票，2/3 PASS 先可以進入 Phase 3。**
> **CTO 係 MR-1 主導者，CDO 係召集人（send_message to CTO）。**

#### CDO 責任（召集）：
```
前置條件：COO Design QC [COO_DESIGN_QC_PASSED] 必須先取得

1. send_message to CTO：「COO QC 已通過，Phase 2 設計完成，請主導 MR-1」
   附：{ID}_UI_Spec.md 路徑 + designs/exports/ 清單 + COO sign-off 記錄
2. 等待 CTO 完成 MR-1 + 輸出 {ID}_MultiModel_Review_1.md
3. MR-1 PASS → send_message to CEO 報告
4. MR-1 FAIL → 根據 review 意見修改設計 → 重回 COO QC → 重做 MR-1（最多 3 輪）
```

#### MR-1 文件格式（CTO 輸出，CDO 存檔）：
```
// 存入：Phase2_Design/{ID}_MultiModel_Review_1.md
## {ID} MR-1 — Multi-Model Design Review
日期：[YYYY-MM-DD]
主導：CTO
審查對象：{ID}_UI_Spec.md + PNG exports

| 模型 | 角色 | 結論 | 主要意見 |
|------|------|------|---------|
| Claude Sonnet 4.6 | Technical Reviewer | PASS/FAIL | [意見] |
| GPT-5.4 | UX Strategy Reviewer | PASS/FAIL | [意見] |
| Gemini | Design Quality Reviewer | PASS/FAIL | [意見] |

整體結論：[PASS / FAIL]（2/3 通過 = PASS）
進入 Phase 3：[✅ / ❌]
```

---

### 🌉 Step 2.5：Design-to-Code Bridge 協議（強制）

> **CDO 設計必須與 CTO 可以 1:1 build 嘅 React 代碼掛鉤。**
> 設計前必須讀取對應 shadcn block 代碼，確保每個 UI 元素有真實組件對應。
> **唔係照抄 code，係確保設計決策可以被 CTO 直接實現，零翻譯成本。**

#### 本地 shadcn 參考資源（直接讀取，唔需要下載）：

| 資源 | 路徑 | 說明 |
|------|------|------|
| Dashboard 頁面 | `/opt/design-systems/shadcn/blocks/dashboard-01/page.tsx` | 完整 Next.js Dashboard，含 sidebar + cards + chart + table |
| 所有 Blocks | `/opt/design-systems/shadcn/blocks/` | 多個完整頁面 block |
| 組件目錄 | `/opt/design-systems/shadcn/components/` | 56 個 UI 組件 |

#### 執行方式：

```
1. 老闆批准設計系統後（shadcn / MADHORSE / etc.）
2. 用 read_file 讀取對應 page.tsx 或最相近嘅 block
3. 識別每個 UI section 嘅對應 shadcn component（Card, Button, Table, Badge...）
4. 喺設計中確保每個 section 嘅尺寸/間距對齊 React 組件嘅預設 padding
5. UI Spec 中記錄每個元素嘅對應組件名（如：`<Card>`, `<Button variant="outline">`）
```

#### Design-to-Code Checklist（設計完成前必查）：

```
□ 每個按鈕都有對應 shadcn <Button variant>（primary/outline/ghost/destructive）
□ 每個卡片都係 <Card> pattern（CardHeader + CardContent + CardFooter）
□ 每個 Badge 的顏色對應 variant（default/secondary/destructive/outline）
□ Table 結構符合 shadcn <Table> 組件（thead + tbody 分隔）
□ Input fields 用 shadcn <Input> + <Label> pattern
□ Sidebar 如果有，對應 shadcn <Sheet> 或 nav pattern
```

---

### 🎯 Step 2 詳細：Design System 選擇協議（強制）

> **⚠️ 每個設計項目開始前，CDO 必須執行呢個協議。唔得直接跳去設計。**
> **必須等老闆/Boss 確認選擇之後，先可以開始 Step 3。**

#### 評估流程：
1. 讀取項目 brief（類型、用戶、功能）
2. 逐一對照下方選擇矩陣
3. 輸出一個結構化 **Design System Proposal**（見格式）
4. 用 `send_message` 發送比老闆，等待回覆
5. 老闆批准後，從本地路徑讀取對應 tokens，**唔准自創顏色**

#### 本地可用設計系統（直接讀取，唔需要下載）：

| # | 名稱 | 本地路徑 | 最適合 | 視覺風格 |
|---|------|----------|--------|---------|
| A | **shadcn/zinc-dark** | `/opt/design-systems/shadcn/zinc-dark-theme.css` | SaaS Dashboard / B2B App | 極簡深黑，zinc 灰階，專業質感 |
| B | **MADHORSE Brand** | `/opt/design-systems/madhorse/MADHORSE_DESIGN_SYSTEM.md` | MADHORSE 自家產品 / landing page | 深藍黑 (#1A1A2E) + 紅色 (#E94560)，品牌感強 |
| C | **IBM Carbon** | `/opt/design-systems/carbon/packages/` | 企業 SaaS / 數據系統 / Admin | 企業感，高可讀性，豐富 token |
| D | **GitHub Primer** | `/opt/design-systems/primer-primitives/src/` | Developer Tool / Code Platform | 務實清晰，GitHub 風格，token-first |
| E | **Vercel Geist** | `/opt/design-systems/geist/` | Minimalist Tool / Dev Dashboard | 極簡，純黑白，現代感 |
| F | **Three.js (3D)** | `/opt/design-systems/threejs/constants.js` | 3D App / Game / Interactive | 霓虹發光，動態感，非傳統 UI |

#### 選擇矩陣（根據項目特徵評分）：

```
                    shadcn  MADHORSE  Carbon  Primer  Geist  Three.js
─────────────────────────────────────────────────────────────────────
SaaS Dashboard        ⭐⭐⭐    ⭐⭐       ⭐⭐⭐    ⭐⭐     ⭐⭐    ✗
自家品牌產品           ⭐⭐      ⭐⭐⭐      ⭐       ⭐       ⭐     ✗
企業後台/Admin         ⭐⭐      ⭐         ⭐⭐⭐    ⭐⭐⭐    ⭐⭐    ✗
Developer Tool         ⭐⭐      ✗         ⭐⭐     ⭐⭐⭐    ⭐⭐⭐   ✗
Landing Page           ⭐⭐      ⭐⭐⭐      ⭐       ✗       ⭐⭐    ✗
3D / Game              ✗        ✗         ✗       ✗       ✗      ⭐⭐⭐
Mobile App             ⭐⭐⭐    ⭐⭐       ⭐⭐     ⭐⭐     ⭐⭐    ✗
```

#### Design System Proposal 格式（必須用呢個格式輸出）：

```
📋 DESIGN SYSTEM PROPOSAL — [項目名稱]

項目類型: [e.g. SaaS Dashboard / Landing Page / 3D App]
用戶群: [e.g. B2B 企業用戶 / Developers / 公眾]

🏆 CDO 推薦: [A/B/C/D/E/F] — [系統名稱]
理由: [2-3 句話解釋點解最適合]

📊 評估對比:
┌─────────────────┬──────────┬──────────────────────────────┐
│ 選項            │ 評分     │ 適合原因                     │
├─────────────────┼──────────┼──────────────────────────────┤
│ A. shadcn/zinc  │ ⭐⭐⭐    │ [原因]                       │
│ B. MADHORSE     │ ⭐⭐      │ [原因]                       │
│ C. IBM Carbon   │ ⭐⭐      │ [原因]                       │
│ D. Primer       │ ⭐        │ [原因]                       │
│ E. Geist        │ ⭐        │ [原因]                       │
│ F. Three.js     │ ✗         │ 唔係3D項目                   │
└─────────────────┴──────────┴──────────────────────────────┘

🎨 推薦配色預覽:
  Background: #XXXXXX
  Primary:    #XXXXXX
  Accent:     #XXXXXX
  Text:       #XXXXXX
  Border:     #XXXXXX

❓ 老闆，請揀選：A / B / C / D / E / F
   或者話我知你想要咩風格，我再調整推薦。
```

#### 收到老闆指示後：
- 老闆批准 A → 讀取 `/opt/design-systems/shadcn/zinc-dark-theme.css` tokens，**全部照用，唔准改**
- 老闆批准 B → 讀取 `/opt/design-systems/madhorse/MADHORSE_DESIGN_SYSTEM.md` 色值，**全部照用，唔准改**
- 老闆批准 C → 讀取 `/opt/design-systems/carbon/packages/` 相關 tokens
- 老闆批准 D → 讀取 `/opt/design-systems/primer-primitives/src/tokens/`
- 老闆批准 E → 讀取 `/opt/design-systems/geist/` fonts/tokens
- 老闆批准 F → 讀取 `/opt/design-systems/threejs/constants.js`

**核心原則：選定之後，colors object 嘅每個 hex 值必須來自對應文件，唔准手改。**

---

### Step 3 詳細：Penpot 設計結構標準

```
Penpot File: "[ProjectID] Design"
├── Page 1: "Screens"
│   ├── Board: "01_Home" (1440x900)
│   ├── Board: "02_Dashboard" (1440x900)
│   ├── Board: "03_Settings" (1440x900)
│   └── Board: "04_Mobile_Home" (390x844)
├── Page 2: "Components"
│   ├── Board: "Buttons" (Primary/Secondary/Danger)
│   ├── Board: "Cards"
│   ├── Board: "Forms"
│   └── Board: "Navigation"
└── Page 3: "Colour & Typography"
    ├── Board: "Colour Tokens"
    └── Board: "Typography Scale"
```

### Step 4 詳細：Export → designs/ 目錄

```bash
# 目標路徑
projects/{ProjectID}_ProjectDocuments/designs/
├── 01_Home.png
├── 02_Dashboard.png
├── 03_Settings.png
├── 04_Mobile_Home.png
└── components/
    ├── buttons.png
    └── cards.png
```

使用 `export_shape` tool 匯出每個 Board：
```javascript
// CDO 用 execute_code 匯出
const boards = penpotUtils.findShapes(s => s.type === 'board', penpot.root);
for (const board of boards) {
  const png = await board.export({ type: "png", scale: 2 });
  // export_shape tool 會自動儲存
}
```

### Step 5 詳細：CSS Token 生成

```javascript
// 攞所有 Board 嘅 CSS
const boards = penpotUtils.findShapes(s => s.type === 'board', penpot.root);
for (const board of boards) {
  const css = penpot.generateStyle([board], { type: "css", includeChildren: true });
  console.log(`/* ${board.name} */\n${css}`);
}
```

將生成嘅 CSS 記入 `{ID}_UI_Spec.md` 嘅 Colour Tokens + Typography 章節。

---

## 🧪 PHASE 5 UAT 驗收流程 — Penpot 設計 vs Production 對比

> Phase 5 UAT 核心：將 Penpot 設計截圖同 Production 截圖逐個比對。
> CDO 負責喺 production 環境做 Browser UAT，用 Penpot 設計作為基準。

### UAT Evidence 三件套

每個 Test Case 必須有：

| 項目 | 來源 | 位置 |
|------|------|------|
| **設計基準** | Penpot export PNG | `designs/{screen}.png` |
| **Production 截圖** | Browser screenshot | `designs/uat_screenshots/{screen}_prod.png` |
| **比對結果** | CDO 人眼判斷 | `{ID}_UAT_Test_Result.md` |

### UAT 執行步驟

```
Step 1: 打開 Production URL
Step 2: 對照 designs/ 目錄嘅 Penpot 設計截圖
Step 3: 逐個 Screen 截圖 → 存入 designs/uat_screenshots/
Step 4: 比對設計 vs 實際：
         ✅ 顏色一致
         ✅ 字型/字號一致
         ✅ 間距合理（±4px 容忍）
         ✅ 響應式佈局正確
         ✅ 互動元素可用
Step 5: 填寫 UAT_Test_Result.md
Step 6: FAIL 嘅 TC → 截圖 Console Errors → 記入 Bug List
```

### UAT Test Case 必須覆蓋

| 類別 | 驗證項目 |
|------|----------|
| 視覺一致性 | 顏色、字型、間距同 Penpot 設計一致 |
| 互動功能 | 按鈕可 click、表單可 submit、導航正確 |
| 響應式 | Desktop (1440) + Mobile (390) 都正常 |
| 錯誤狀態 | Empty state、Error state、Loading state |
| 數據真實性 | 頁面顯示真實數據（唔係 mock/placeholder） |

---

## 🔍 UI Spec 文件格式 (Phase 2 交付物標準)

```markdown
# [ProjectID] UI Spec
**Penpot File:** [ProjectID] Design (http://76.13.215.13:9001)
**Design System:** shadcn/ui v2 / Three.js (按項目類型)
**Last Updated:** YYYY-MM-DD HKT

## Screens
| Screen | Penpot Board | Export PNG | Description |
|--------|-------------|------------|-------------|
| Home   | 01_Home     | designs/01_Home.png | Landing page |
| ...    | ...         | ...        | ...          |

## Colour Tokens
(從 Penpot generateStyle 生成)

## Typography Scale
(從 Penpot generateStyle 生成)

## Component List
- Button (Primary / Secondary / Danger)
- Card, Modal, Toast, Badge
- (3D 項目額外: GameCanvas, HUD, ScoreBoard)

## CSS Handoff
(CDO 用 penpot.generateStyle() 生成，CTO 直接用)
```

---

## 📋 品牌檢查清單
- [ ] Logo 使用正確？
- [ ] 顏色符合 MADHORSE Design System？
- [ ] 字型用 Inter (Web) 或 Orbitron (3D/Game)？
- [ ] 有無用非授權素材？
- [ ] 3D 項目：有無定義 Light/Camera/Scale 規範？
- [ ] 所有 Screen 已 Export PNG 到 `designs/`？
- [ ] CSS tokens 已用 `generateStyle()` 生成？

