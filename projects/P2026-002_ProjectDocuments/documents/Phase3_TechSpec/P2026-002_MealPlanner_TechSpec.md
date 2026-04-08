# P2026-002 Meal Planner - Technical Specification

## 1. Project Overview

**Project Name:** Meal Planner (P2026-002)  
**Type:** Web Application  
**Core Functionality:** 幫老闆suggest幾道唔重覆既家常菜 + 材料清單  
**Target User:** 老闆 (個人使用)

---

## 2. Technical Stack

### Framework & Frontend
- **Framework:** Next.js 14+ (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS (快速開發)

### Hosting
- **Primary:** Vercel (Zero-config deployment)
- **Fallback:** Hostinger VPS (Docker container)

### Database
- **方案 A (推薦):** Supabase (PostgreSQL) - 有現成既 API + Row Level Security
- **方案 B:** SQLite (本地) - 如果數據量少
- **方案 C:** 直接用 AI generate，唔需要持久化存儲

### AI Integration
- **API:** MiniMax M2.5 (OpenAI-compatible) - 已經部署喺我地既 Gateway
- **Prompt:** 設計一個 simple prompt 叫佢 suggest 3-5 道唔重覆既家常菜

---

## 3. Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  Next.js    │────▶│  MiniMax    │
│  (Browser)  │     │   Server    │     │    API      │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Supabase   │
                    │ (Database)  │
                    └─────────────┘
```

---

## 4. Features

### Phase 1 (MVP)
1. **首頁:** 一個簡單既 input (可以選擇 cuisine type / dietary restrictions)
2. **Generate Button:** 叫 AI generate **恰好 3 道**唔重覆既家常菜
3. **結果顯示:** 顯示菜名 + 材料清單 (可以 copy/下載)
4. **歷史記錄:** 如果有 database，先 save 低每次既 suggestion

### Future Enhancements
- Save 自己既 preference
- Shopping list generation
- Nutritional info

---

## 5. CISO Safety Assessment

### ⚠️ User Data Considerations

| Data Type | Storage | Risk Level | Notes |
|-----------|---------|------------|-------|
| User Preferences (cuisine, dietary) | Supabase | Low | 可以 anonymous |
| Generated Recipes | Supabase | Low | 公開資訊 |
| User Account | Supabase Auth | Medium | 需要 auth |

### ✅ CISO SAFE TO DEPLOY (if following these rules):
1. **No PII collection:** 唔收集 user 既 personal data
2. **API Keys:** MiniMax API key 必須存喺 server-side environment variable，唔可以 expose 俾 client
3. **Supabase RLS:** 啟用 Row Level Security，确保 user 只能睇到自己既 data
4. **No sensitive logs:** 唔好 log user既 input (尤其係如果涉及 personal preferences)

---

## 6. Implementation Plan

### Day 1: Setup
- [ ] `npx create-next-app@latest meal-planner`
- [ ] Setup Tailwind CSS
- [ ] 環境變數配置 (NEXT_PUBLIC_SUPABASE_URL, etc.)

### Day 2: Core Logic
- [ ] 建立 /api/generate route
- [ ] 接入 MiniMax API
- [ ] 設計 prompt (要求佢 return JSON format)

### Day 3: UI
- [ ] 首頁 + Input form
- [ ] 結果展示 (card layout)
- [ ] 材料清單 display

### Day 4: Integration
- [ ] Supabase 連接 (如果需要)
- [ ] Deploy to Vercel

---

## 7. Open Source Reference

**搜尋結果:** GitHub 上冇咩成熟既 meal planner project (>100 stars)

**結論:** 自研 MVP，減少 complexity

---

## 8. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| MiniMax API fail | Low | High | Fallback to cached recipes |
| Supabase usage limit | Low | Low | 用免費 tier |
| Prompt quality | Medium | Medium | Manual test prompt before launch |

---

## 9. Estimated Cost

- **Vercel:** $0 (free tier)
- **Supabase:** $0 (free tier - 500MB)
- **MiniMax:** Already paid (existing infrastructure)

**Total Cost: $0** ✅
