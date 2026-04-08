# shadcn/ui + Radix UI 深度研究報告

> **COO Research | 2026-03-31**  
> **目標：** 老闆學習 shadcn/ui 和 Radix UI 的完整技術指南  
> **風格：** MADHORSE 深藍色品牌主題

---

## 📌 核心概念：兩種使用方式

| 方案 | 定位 | 適合場景 |
|------|------|----------|
| **shadcn/ui** | 有樣式的組件代碼（你擁有代碼）| 需要完全自定義的品牌網站 |
| **Radix Primitives** | 無頭（headless）組件（裸 API）| 需要自己設計樣式的系統 |
| **Radix Themes** | 有預設樣式的組件庫 | 想快速啟動、樣式已足夠 |

**shadcn/ui 的底層就是 Radix Primitives**，它把 Radix 的無頭組件包裝成好看的預設樣式，但代碼屬於你，可以隨意改。

---

## 1️⃣ shadcn/ui 入門指南

### 官方資源
- 🌐 主站：https://ui.shadcn.com
- 📦 CLI 文件：https://ui.shadcn.com/docs/cli
- 🧩 組件列表：https://ui.shadcn.com/docs/components

---

### 1.1 安裝步驟（Next.js App Router）

```bash
# Step 1: 建立 Next.js 項目（如果還沒有）
npx create-next-app@latest my-app --typescript --tailwind --app

# Step 2: 進入項目
cd my-app

# Step 3: 初始化 shadcn/ui CLI
npx shadcn@latest init

# 過程中會問你：
# - Style: 選擇 "base" 或 "new-york"
# - Base color: 建議選 "neutral" 或 "zinc"
# - CSS variables: 選 YES（推薦，方便主題切換）
# - Custom prefix: 選 NO
# - tailwind.config.ts 或 tailwind.config.js: 選 TS
# - src/ directory: 選 YES（推薦）
# - App Router: 選 YES
# - Import alias: 預設 @/*
```

**shadcn/create 視覺化配置（推薦新手）：**
> 瀏覽 https://ui.shadcn.com/create 可以用 GUI 選擇字體、顏色、圖標，生成客製化 preset。

---

### 1.2 添加組件

```bash
# 添加單個組件
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add badge

# 一次加多個
npx shadcn@latest add button card dialog input badge
```

---

### 1.3 Tailwind CSS 配置

**tailwind.config.ts 會自動生成**（假設用 Next.js + shadcn init）：

```ts
// tailwind.config.ts（由 shadcn 自動生成）
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

**重要升級注意（Tailwind v4）：**
> Tailwind v4 把 `cursor: pointer` 改成了 `cursor: default`。如果想要按鈕 hover 時顯示指標，在 globals.css 加入：

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

---

## 2️⃣ MADHORSE 深藍色主題配置

### 2.1 globals.css（MADHORSE 主題）

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* ========== MADHORSE COLOR TOKENS ========== */
  --color-background: #0F3460;       /* 頁面背景 - 深藍 */
  --color-foreground: #FFFFFF;       /* 主文字 - 白色 */
  
  --color-card: #16213E;             /* 卡片背景 - 次深藍 */
  --color-card-foreground: #FFFFFF;  /* 卡片文字 - 白色 */
  
  --color-popover: #16213E;          /* 彈出層背景 */
  --color-popover-foreground: #FFFFFF;
  
  --color-primary: #E94560;           /* 主色 - 紅色強調 */
  --color-primary-foreground: #FFFFFF;
  
  --color-secondary: #1A1A2E;        /* 次要色 - 深紫黑 */
  --color-secondary-foreground: #FFFFFF;
  
  --color-muted: #1A1A2E;            /* 安靜色 */
  --color-muted-foreground: #A8A8B3;  /* 次要文字灰 */
  
  --color-accent: #E94560;           /* 強調色 - 紅 */
  --color-accent-foreground: #FFFFFF;
  
  --color-destructive: #FF6B6B;      /* 錯誤/危險 */
  --color-border: #1A1A2E;           /* 邊框色 */
  --color-input: #1A1A2E;           /* 輸入框 */
  --color-ring: #E94560;            /* 聚焦環 */

  /* Chart colors */
  --color-chart-1: #E94560;
  --color-chart-2: #0F3460;
  --color-chart-3: #16213E;
  --color-chart-4: #A8A8B3;
  --color-chart-5: #1A1A2E;

  /* Sidebar */
  --color-sidebar: #1A1A2E;
  --color-sidebar-foreground: #FFFFFF;
  --color-sidebar-primary: #E94560;
  --color-sidebar-primary-foreground: #FFFFFF;
  --color-sidebar-accent: #16213E;
  --color-sidebar-accent-foreground: #FFFFFF;
  --color-sidebar-border: #16213E;
  --color-sidebar-ring: #E94560;

  /* ========== RADII ========== */
  --radius-sm: calc(0.375rem * 0.6);
  --radius-md: calc(0.375rem * 0.8);
  --radius-lg: 0.375rem;
  --radius-xl: calc(0.375rem * 1.4);
  --radius-2xl: calc(0.375rem * 1.8);
  --radius-3xl: calc(0.375rem * 2.2);
  --radius-4xl: calc(0.375rem * 2.6);
}

:root {
  --radius: 0.5rem;  /* 8px - 按鈕圓角 */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', system-ui, sans-serif;
  }
}
```

### 2.2 Inter 字體配置（Next.js）

```bash
# 安裝字體
npm install @fontsource/inter
```

```ts
// src/app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
```

```css
/* globals.css */
body {
  font-family: var(--font-inter), system-ui, sans-serif;
}
```

---

### 2.3 Spacing System（4px Grid）

MADHORSE 使用 4px 基礎單位：

| Token | 值 | 用途 |
|-------|-----|------|
| `space-1` | 4px | 微細間距 |
| `space-2` | 8px | 小間距 |
| `space-3` | 12px | 標準間距 |
| `space-4` | 16px | 中間距 |
| `space-6` | 24px | 大間距 |
| `space-8` | 32px | 特大間距 |
| `space-12` | 48px | 區塊間距 |
| `space-16` | 64px | 頁面間距 |

---

## 3️⃣ 實用範例

### 3.1 Button（按鈕）

```tsx
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 p-6">
      {/* Primary - MADHORSE 紅色 */}
      <Button>Primary</Button>
      
      {/* Outline */}
      <Button variant="outline">Outline</Button>
      
      {/* Secondary */}
      <Button variant="secondary">Secondary</Button>
      
      {/* Ghost - 透明背景 */}
      <Button variant="ghost">Ghost</Button>
      
      {/* Destructive - 危險操作 */}
      <Button variant="destructive">Destructive</Button>
      
      {/* Link */}
      <Button variant="link">Link</Button>
      
      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
      
      {/* Loading 狀態 */}
      <Button disabled>
        <svg className="animate-spin mr-2 h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading
      </Button>
    </div>
  );
}
```

**按鈕組件源碼（自己擁有！）：** `components/ui/button.tsx`

---

### 3.2 Card（卡片）

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CardDemo() {
  return (
    <div className="grid gap-6 p-6">
      {/* 標準卡片 */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>項目概覽</CardTitle>
          <CardDescription>
            追蹤進度和近期活動
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            你的設計系統已準備就緒，開始構建下一個組件吧！
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">取消</Button>
          <Button>確認</Button>
        </CardFooter>
      </Card>

      {/* 帶 Badge 的卡片 */}
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>收入報告</CardTitle>
            <Badge variant="default" className="bg-primary text-white">
              LIVE
            </Badge>
          </div>
          <CardDescription>2026年第一季度</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$42,500</div>
          <p className="text-xs text-green-400 mt-1">
            ↑ 23% 較上季度
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">查看詳情</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

### 3.3 Dialog（彈窗/Modal）

```tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">打開對話框</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>確認刪除</DialogTitle>
          <DialogDescription>
            此操作無法撤銷。這將永久刪除您的帳戶並從我們的伺服器移除數據。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input 
            placeholder="輸入 CONFIRM 確認刪除" 
            className="bg-input border-border"
          />
        </div>
        <DialogFooter>
          <Button variant="outline">取消</Button>
          <Button variant="destructive">刪除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 4️⃣ Radix Primitives vs Radix Themes

### Radix Primitives（無頭組件）

適合：要自己完全控制樣式，只需要行為和無障礙功能。

```bash
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-slider
```

```tsx
import * as Dialog from "@radix-ui/react-dialog";

// 你自己定義所有樣式
const DialogContent = styled(Dialog.Content, {
  backgroundColor: "#16213E",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
});

export function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <DialogContent>
          <Dialog.Title>標題</Dialog.Title>
          <Dialog.Description>描述內容</Dialog.Description>
          <Dialog.Close>關閉</Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Radix Themes（即用樣式）

適合：想要快速啟動，預設樣式已經足夠。

```bash
npm install @radix-ui/themes
```

```tsx
import "@radix-ui/themes/styles.css";
import { Theme, Flex, Text, Button } from "@radix-ui/themes";

export default function App() {
  return (
    <Theme accentColor="crimson" radius="large">
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes!</Text>
        <Button>Let's go!</Button>
      </Flex>
    </Theme>
  );
}
```

---

## 5️⃣ Dark Mode 配置（Next.js）

### Step 1: 安裝 next-themes

```bash
npm install next-themes
```

### Step 2: 建立 ThemeProvider

```tsx
// components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Step 3: 在 Layout 中使用

```tsx
// src/app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Step 4: 深色主題的 CSS

在 `globals.css` 中同時定義 `:root` 和 `.dark`：

```css
:root {
  /* Light mode - MADHORSE 淺色版本 */
  --background: #FFFFFF;
  --foreground: #1A1A2E;
  --primary: #E94560;
  --primary-foreground: #FFFFFF;
  /* ... 其他 tokens */
}

.dark {
  /* Dark mode - MADHORSE 深色版本 */
  --background: #0F3460;
  --foreground: #FFFFFF;
  --primary: #E94560;
  --primary-foreground: #FFFFFF;
  /* ... 其他 tokens */
}
```

---

## 6️⃣ 學習資源

### 官方文檔
| 資源 | 連結 |
|------|------|
| shadcn/ui 主站 | https://ui.shadcn.com |
| shadcn/ui 文檔 | https://ui.shadcn.com/docs |
| shadcn/create 視覺化配置 | https://ui.shadcn.com/create |
| Radix Primitives | https://www.radix-ui.com/primitives |
| Radix Themes | https://www.radix-ui.com/themes |
| Next.js | https://nextjs.org/docs |

### 推薦教程
1. **Traversy Media - shadcn/ui Crash Course**（YouTube）
2. **ByteGrad - shadcn/ui + Next.js Tutorial**（YouTube）
3. **The Primeagen - Building with shadcn/ui**（YouTube）

### Next.js 整合要點
- App Router 支援：shadcn/ui 完整支持 Next.js App Router
- `"use client"` 標記：帶有交互的組件需要 `use client`
- Server Components：純展示組件可以直接是 Server Component
- Tailwind v4：目前 shadcn 正在遷移到 Tailwind v4，確保版本匹配

---

## 7️⃣ MADHORSE 主題完整代碼

### globals.css（MADHORSE 深藍色主題）

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Color Tokens */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Radius Scale */
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
}

:root {
  /* ========== MADHORSE DARK THEME (DEFAULT) ========== */
  --radius: 0.5rem;
  
  /* 深藍色系 */
  --background: #0F3460;      /* 頁面背景 - 深藍 */
  --foreground: #FFFFFF;       /* 主文字 - 白色 */
  
  --card: #16213E;            /* 卡片背景 */
  --card-foreground: #FFFFFF;
  
  --popover: #16213E;
  --popover-foreground: #FFFFFF;
  
  /* 紅色強調 */
  --primary: #E94560;
  --primary-foreground: #FFFFFF;
  
  /* 深紫黑 */
  --secondary: #1A1A2E;
  --secondary-foreground: #FFFFFF;
  
  --muted: #1A1A2E;
  --muted-foreground: #A8A8B3;
  
  --accent: #E94560;
  --accent-foreground: #FFFFFF;
  
  --destructive: #FF6B6B;
  --border: #1A1A2E;
  --input: #1A1A2E;
  --ring: #E94560;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', system-ui, sans-serif;
  }
}

/* 按鈕鼠標指標（Tailwind v4 兼容性） */
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

---

## 📊 總結：shadcn/ui vs Radix Themes

| 比較點 | shadcn/ui | Radix Themes |
|--------|-----------|--------------|
| **代碼所有權** | ✅ 完全擁有 | ❌ 包內部封裝 |
| **自定義程度** | 極高（代碼在你手） | 中等（props 配置） |
| **學習曲線** | 較陡（需要懂 Tailwind） | 較緩（直接用） |
| **維護** | 自己負責更新 | 官方維護 |
| **適合項目** | 品牌網站、定制設計 | 內部工具、快速原型 |
| **Bundle Size** | 你用的才打包 | 完整引入 |

**COO 建議：** 如果 MADHORSE 要做品牌網站，用 **shadcn/ui**（完全控制）。如果是內部系統想要快速完成，用 **Radix Themes**。

---

*Research completed by COO | 2026-03-31*
