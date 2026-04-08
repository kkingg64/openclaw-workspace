# Mobile CSS Debugging Protocol (v1.0 — 2026-04-06)

> **Trigger:** When UI renders correctly on desktop browser but fails on mobile (iOS Safari, Android Chrome)

##快速評估矩陣

| 症狀 | 可能原因 | 優先檢查 |
|------|---------|---------|
| 白底 + 線條 | CSS variables 未定義或格式錯誤 | `getComputedStyle()` 查看變量值 |
| 完全無樣式 | CSS 檔案未加載 / 路徑錯誤 | Network tab 查看 CSS link |
| 顏色錯曘 | CSS variables 值為 hex 但期望 HSL | 查看 variables 格式 |
| 重疊/破碎 | CSS 未加載或加載順序錯誤 | 查看 stylesheet link 順序 |
| 500 錯誤 | Next.js build corruption | Server logs + clean rebuild |

## Step 1 — 創建 Debug Page (CRITICAL)

**Rule:** 永遠唔好靠估，要事實。

1. 在 app/debug/page.tsx 創建 client component debug page
2. Debug page 必須顯示：
   - HTML element 的 actual className
   - CSS custom properties 的 actual 值
   - Computed styles (background-color, color)
   - Browser User-Agent
3. Deploy 並提供 URL 給用戶訪問

**Debug Page Template:**
```tsx
"use client";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const [info, setInfo] = useState<Record<string, string>>({});
  useEffect(() => {
    const html = document.documentElement;
    const getCssVar = (name: string) =>
      getComputedStyle(html).getPropertyValue(name).trim();
    setInfo({
      "html.className": html.className || "(none)",
      "--background": getCssVar("--background"),
      "--foreground": getCssVar("--foreground"),
      "--primary": getCssVar("--primary"),
      "body bg (computed)": getComputedStyle(document.body).backgroundColor,
      "body color (computed)": getComputedStyle(document.body).color,
      "Navigator UA": navigator.userAgent,
    });
  }, []);
  // ... render as grid showing each value
}
```

## Step 2 — 分析 Debug Output

### CSS Variable 格式問題

| 格式 | 正確？ | 範例 |
|------|--------|------|
| HSL (3 values) | ✅ 正確 | `--background: 225 37% 6%` |
| HSLA (4 values) | ✅ 正確 | `--background: 225 37% 6% / 1` |
| Hex | ❌ 多數瀏覽器不接受 | `--background: #0a0c15` |
| RGB | ❌ Tailwind 多數不支援 | `--background: rgb(10, 12, 21)` |

**Rule:** Tailwind CSS 的 `hsl(var(--x))` 語法需要 CSS variables 為 HSL format（無括號、無 % 符號）。

### Computed Style 為 transparent/black

如果 CSS variable 定義正確但 `getComputedStyle()` 返回 `rgba(0,0,0,0)` 或 `rgb(0,0,0)`：
- 表示瀏覽器無法解析 `hsl(var(--x))`
- 通常原因：CSS variable 值格式不正確（見上表）

## Step 3 — 常見修復

### 修復 A: CSS Variable 格式

**globals.css 中的 :root 必須使用 HSL format：**
```css
:root {
  --background: 225 37% 6%;      /* ✅ HSL format */
  --foreground: 0 0% 98%;
  /* ❌ WRONG: --background: #0a0c15 (hex) */
}
```

**注意：** 如果 theme 檔案使用 hex，手動轉換為 HSL：
- `#0a0c15` → `225 37% 6%` (HSL)

### 修復 B: Next.js Build Corruption

**觸發條件：** 
- 頻繁修改後 rebuild
- Build 過程中斷
- `clientReferenceManifest` error

**解決方案：**
```bash
rm -rf .next
rm -rf node_modules/.cache
npm run build
```

### 修復 C: Container/Proxy 問題

**觸發條件：**
- 內網測試正常，但 public URL 502
- Container restart 後問題

**解決方案：**
1. 確認 container 正在運行：`docker ps | grep dash`
2. 確認 port 正確：`docker port <container>`
3. 確認 nginx proxy_pass 指向正確 port

## Step 4 — 驗證清單

完成修復後，必須驗證：

- [ ] `curl https://production.url/` → HTTP 200
- [ ] `curl https://production.url/_next/static/css/*.css` → HTTP 200 + content > 10KB
- [ ] Debug page 顯示所有 CSS variables 為 HSL format
- [ ] Debug page color swatches 顯示正確顏色
- [ ] Desktop browser 視覺正常
- [ ] Mobile browser 視覺正常（需要真實用戶測試）

## Step 5 — 記錄與學習

每次修復完成後，記錄：

1. **根本原因**（不是癁象）
2. **觸發條件**（什麼情況下出現）
3. **修復方案**（精確的代碼/配置改動）
4. **預防措施**（如何避免下次發生）

## 已知瀏覽器兼容問題

### Safari iOS
- **CSS `hsl(var(--x))` 解析嚴格** — 需要 HSL format
- **CSS Custom Properties 在某些上下文有限制**
- **解決：** 確保 CSS variables 使用標準 HSL format

### Chrome Android
- 大部分現代 CSS 都支持
- 較少兼容性問題

### 舊版 iOS
- 部分 CSS features 不可用
- 建議 progressive enhancement

---

**Protocol Owner:** CTO  
**Last Updated:** 2026-04-06  
**Based on Incident:** P2026-008 iPhone Safari CSS 問題 (2026-04-06)
