# P2026-008 MADHORSE HQ — Phase 5 UAT Report (CDO Update)

**Date:** 2026-04-03 13:42 UTC  
**Tester:** CDO (subagent)  
**Environment:** http://76.13.215.13:3008  
**Reference:** Theme_Preview.html, madhorse-cdo.json  
**Status:** 🔴 **FAIL** — Critical dark theme mismatch

---

## Executive Summary

CTO auth fix is confirmed working — all routes properly redirect to login (200). However, **critical finding**: the deployed app does NOT use the `madhorse-cdo.json` dark theme tokens. It uses shadcn's default `slate` dark theme instead.

| Route | HTTP | Auth | Status |
|-------|------|------|--------|
| `/dashboard` | 200 | Redirects to login | ✅ Routing OK |
| `/agents` | 200 | Redirects to login | ✅ Routing OK |
| `/research` | 200 | Redirects to login | ✅ Routing OK |
| `/trends` | 200 | Redirects to login | ✅ Routing OK |
| `/login` | 200 | Login page visible | ✅ Auth page OK |

---

## Critical Finding: Dark Theme Token Mismatch

### Expected (madhorse-cdo.json)
| Token | HSL Value | Visual |
|-------|-----------|--------|
| `--background` | `225 37% 6%` | Deep navy `#0b0f1a` |
| `--card` | `225 37% 11%` | Dark navy `#111827` |
| `--muted` | `225 37% 18%` | Muted navy `#1e2438` |
| `--accent` | `0 84% 60%` | Red `#ef4444` |
| `--border` | `225 37% 18%` | Navy border `#1e2438` |
| `--foreground` | `0 0% 98%` | Near-white `#fafafa` |
| `--primary` | `0 0% 98%` | Near-white (bright button) |

### Deployed (actual CSS — :root/.dark)
| Token | Value | Visual |
|-------|-------|--------|
| `--background` | `#0f172a` | Slate-900 (NOT navy) |
| `--card` | `#1e293b` | Slate-800 |
| `--muted` | `#1e293b` | Slate-800 |
| `--accent` | `#1e293b` | Slate-800 (NOT red!) |
| `--border` | `#334155` | Slate-700 |
| `--foreground` | `#f1f5f9` | Slate-100 |
| `--primary` | `#6366f1` | Indigo-500 (blue, NOT white) |
| `--ring` | `#6366f1` | Indigo |

### Key Deviations
1. **Background**: Expected `225 37% 6%` (navy) vs Deployed `#0f172a` (slate-900) — **COMPLETELY DIFFERENT**
2. **Accent**: Expected `0 84% 60%` (red) vs Deployed `#1e293b` (slate) — **ACCENT LOST**
3. **Primary button**: Expected white text on dark vs Deployed indigo-500 — **DESIGN INTENT BROKEN**
4. **No red accent anywhere** in deployed dark theme

### Root Cause
The app uses `shadcn/ui` default dark theme (slate-based) instead of `madhorse-cdo.json` custom theme.

---

## Auth Flow Test

### Test 1: Login Page
- **URL:** http://76.13.215.13:3008/login
- **HTTP:** 200 ✅
- **Elements:** "MH" logo, "Welcome back", email/password inputs, Sign in button ✅
- **Theme:** Uses shadcn default dark tokens ❌

### Test 2: Protected Routes (unauthenticated)
| Route | Final URL | HTTP |
|-------|-----------|------|
| `/dashboard` | `/login?callbackUrl=...` | 200 ✅ |
| `/agents` | `/login?callbackUrl=...` | 200 ✅ |
| `/research` | `/login?callbackUrl=...` | 200 ✅ |
| `/trends` | `/login?callbackUrl=...` | 200 ✅ |

Auth redirect chain works correctly.

---

## UI/UX Observations

### Login Page (visible content)
- Logo: "MH" in rounded square — ✅ matches design intent
- Card-based layout centered on page — ✅ shadcn Card component
- Email/password fields with labels — ✅ accessible
- "No account? Register" link — ✅
- **Theme: shadcn default slate dark, NOT madhorse-cdo navy/red**

### Missing from Login
- No "MADHORSE HQ" branding text visible
- No red accent on any interactive element

---

## Why This is a FAIL

The CDO-designed dark theme (navy + red accent) was specified in:
1. `madhorse-cdo.json` — the approved design system
2. `Theme_Preview.html` — the visual reference
3. Phase 2 deliverables signed off by CDO

The deployed app ignores this entirely and uses shadcn's default slate theme. This is a **Phase 2 → Phase 4 handoff failure** where CTO did not apply the custom theme.

---

## What CTO Must Fix

1. **Apply madhorse-cdo.json dark theme to the app**
   - Check if `globals.css` or `tailwind.css` imports the correct theme
   - Verify `darkMode: 'class'` or `'media'` matches how `.dark` is applied
   - Ensure `--background: 225 37% 6%` (not `#0f172a`) is used

2. **Verify accent color is `0 84% 60%` (red) not slate**
   - Currently `--accent` maps to slate-800 in dark mode — should be red

3. **Set dark mode class on `<html>` or `<body>`**
   - The `.dark` CSS selector requires a parent class
   - App may be missing `class="dark"` on root element

---

## Screenshots (Not captured — no browser available)

Screenshots were NOT captured because:
- No headless browser available in this environment
- Cannot complete auth flow without test credentials

**Recommended action:** CTO should provide test account OR run browser UAT himself.

Existing screenshots from previous UAT (partial, auth-blocked):
- `TC-01.png` — Dashboard (8.9 KB)
- `TC-02.png` — Agents (11.2 KB)  
- `TC-06.png` — Research (160.6 KB)
- `TC-07.png` — Trends (161.5 KB)

Path: `projects/P2026-008_ProjectDocuments/designs/uat_screenshots/`

---

## Decision

| Criteria | Status |
|----------|--------|
| All 4 routes return 200 | ✅ PASS |
| Auth redirect chain works | ✅ PASS |
| Dark theme = madhorse-cdo.json | ❌ **FAIL** |
| Screenshots captured | ⚠️ SKIPPED (no browser) |

### 🟥 **FAIL — UAT Phase 5 Not Complete**

**Blocking Issue:** Dark theme tokens not applied. Must be resolved before Phase 5 sign-off.

---

## CDO Sign-off

**CDO_SIGNED:** `FABIO_CDO_SIGNED_2026-04-03_T14`

**Recommendation:** Escalate to CTO immediately. Dark theme handoff failure must be fixed. This is a Phase 2 → Phase 4 quality issue.
