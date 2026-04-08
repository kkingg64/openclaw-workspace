# Visual Verification Without Chromium (v1.0)

> **Purpose:** Verify UI renders correctly when Chromium is unavailable
> **Use When:** Development environment lacks browser, need to validate layout before production
> **Owner:** CDO (design verification) + CTO (rendering verification)
> **SLA:** Must complete before UAT marked PASS
> **Part of:** Phase 5 UAT (see `protocols/phase5-uat-protocol.md` — enables TC-701-703 visual regression testing)
> **Referenced from:** `protocols/phase-gates.md` Protocol Quick Reference

---

## Real Problem: What's "UI Broken"?

**Common issues found in broken UIs:**

| Issue | Symptom | Detection Method |
|-------|---------|------------------|
| Wrong spacing | Padding/margin off, elements too close/far | CSS measurements |
| Misaligned elements | Header not flush, content shifted | Layout inspection |
| Color wrong | Dark theme tokens not applied, wrong hex | Computed styles |
| Font wrong | Text too large/small, wrong family | Font inspection |
| Text overflow | Content truncated, wrapping wrong | Content width check |
| Mobile broken | Layout doesn't stack, overflow on mobile width | Responsive testing |
| Missing elements | Component not rendered at all | DOM inspection |

---

## Pre-UAT Checklist (Before Claiming PASS)

**CRITICAL: Answer ALL of these before marking UAT as PASS**

```bash
# Question 1: Has the website been visually tested by a human in a real browser?
# (Yes/No) _____

# Question 2: Have screenshots been compared to Phase 2 Design Spec?
# (Yes/No) _____

# Question 3: What browser was used? (Chrome/Safari/Firefox/Edge/None)
# _____

# Question 4: What viewport sizes were tested? (Desktop/Tablet/Mobile/None)
# _____

# Question 5: Are all 3 breakpoints rendering correctly?
# Desktop 1920×1080: (Yes/No) _____
# Tablet 768×1024: (Yes/No) _____
# Mobile 375×812: (Yes/No) _____

# Question 6: Do colors match design hex codes exactly?
# (Yes/No/Unknown) _____

# Question 7: Does layout match design mockup spacing (±2px)?
# (Yes/No/Unknown) _____

# IF ANY ANSWER IS NO OR UNKNOWN:
# ⛔ UAT is NOT PASS — UAT is PARTIAL
# Must complete visual verification before proceeding to Phase 5→6 gate
```

---

## Lightweight Visual Verification (No Browser Required)

### Method 1: Static HTML Analysis

**When you CAN'T open a browser, inspect the deployed HTML:**

```bash
# Step 1: Fetch the live website HTML
curl -s https://dashboard.madhorse.cloud/ > index.html

# Step 2: Check for CSS/styling
grep -o 'data-dark-theme\|css.*theme\|\.dark' index.html

# Step 3: Check for layout structure
grep -E '<header|<nav|<main|<footer|class="container|style="' index.html | head -20

# Step 4: Verify viewport meta tag exists (required for mobile responsiveness)
grep 'viewport' index.html
# Expected: <meta name="viewport" content="width=device-width, initial-scale=1">

# Step 5: Check for common UI problems
# Missing viewport meta tag = Mobile layout broken ⛔
# No CSS loaded = Unstyled page ⛔
# No dark theme CSS = Dark theme broken ⛔
```

### Method 2: Rendering Verification (Headless Browser Alternative)

**If you have curl + ImageMagick but no Chrome:**

```bash
# Use lynx (text browser) to verify content renders
lynx -dump https://dashboard.madhorse.cloud/ | head -50

# Expected output should show:
# ✓ Login form elements present
# ✓ Text readable (not overlapping)
# ✓ No error messages visible
# ✓ Navigation structure intact

# If you see garbage text or elements overlapping: UI is broken
```

### Method 3: Remote Visual Testing (Recommended)

**Use free remote browser services:**

```bash
# Option A: Use headless-chrome on another machine
ssh remote-dev-server "google-chrome --headless --screenshot=screenshot.png https://dashboard.madhorse.cloud/"

# Option B: Use online screenshot services
curl -s "https://screenshot-api.com/api/screenshots?url=https://dashboard.madhorse.cloud/&viewport=1920x1080" > screenshot.png

# Option C: Ask team member with browser to test + send screenshots
# Email checklist to tester with specific questions:
# 1. Does the login page look like Phase 2 design?
# 2. Are there any layout issues (overflow, spacing wrong)?
# 3. Do colors match the design (dark theme tokens)?
# 4. Is any text cut off or unreadable?
```

### Method 4: CSS/Style Sheet Verification

**Verify styling is actually applied (not just in code):**

```bash
# Fetch all CSS files
curl -s https://dashboard.madhorse.cloud/ | grep -o 'href="[^"]*\.css"' | sed 's/href=//;s/"//g'

# Download each CSS file
for css in $(curl -s https://dashboard.madhorse.cloud/ | grep -o 'href="[^"]*\.css"' | sed 's/href=//;s/"//g'); do
  echo "Checking $css:"
  curl -s "$css" | wc -l
  # Should have >100 lines (real CSS, not empty)
  
  # Check for dark theme variables
  curl -s "$css" | grep -E '--dark-|--color-|theme' | head -5
done

# If CSS files empty or don't load: Styling broken ⛔
```

### Method 5: Specific UI Component Verification

**Test individual components without full browser:**

```bash
# Test 1: Login Form Exists and Accessible
curl -s https://dashboard.madhorse.cloud/login | grep -E '<input|type="password"|type="email"|<button' | head -10
# Expected: Email input, password input, submit button present

# Test 2: Dark Theme Applied
curl -s https://dashboard.madhorse.cloud/ | grep -E 'dark-mode|data-theme="dark"|class="dark"'
# Expected: Dark theme class/attribute present

# Test 3: Navigation Menu Renders
curl -s https://dashboard.madhorse.cloud/ | grep -E '<nav|<a.*href' | head -10
# Expected: Navigation links present

# Test 4: Layout Container Correct Width
curl -s https://dashboard.madhorse.cloud/ | grep -E 'max-width|container|grid' | head -5
# Expected: Container-like elements present

# Test 5: Media Queries Present (responsive design)
curl -s https://dashboard.madhorse.cloud/styles.css | grep '@media'
# Expected: @media queries for tablet/mobile breakpoints
```

---

## Identify Broken UI — Questions to Ask

**When you find "UI broken", diagnosis it:**

### Scenario 1: Layout Overflow (Elements Positioned Wrong)

**Signs:**
- Horizontal scrollbar appears
- Content extends beyond viewport
- Elements overlap

**Quick Test:**
```bash
# Check CSS max-width on containers
curl -s https://dashboard.madhorse.cloud/styles.css | grep 'max-width\|width.*%\|overflow'

# Compare to design spec:
# Design says: max-width: 1200px, padding: 16px
# Code has: max-width: 100vw → WRONG (causes overflow)
```

**Fix:** Update container max-width in CSS

---

### Scenario 2: Dark Theme Not Applied

**Signs:**
- Colors are light (don't match design)
- Text unreadable on dark background (or vice versa)

**Quick Test:**
```bash
# Check if dark theme CSS is loaded
curl -s https://dashboard.madhorse.cloud/ | grep -i 'dark\|theme' | head -10

# Check if CSS variables defined
curl -s https://dashboard.madhorse.cloud/styles.css | grep -E '--color-|--bg-'

# Load and check computed styles
curl -s https://dashboard.madhorse.cloud/ | grep -o 'style="[^"]*background[^"]*"' | head -5
# Should have dark colors (e.g., #1a1a1a), not light (e.g., #ffffff)
```

**Fix:** Ensure CSS variables are applied to body/root element

---

### Scenario 3: Mobile Layout Broken (Desktop-Only)

**Signs:**
- Layout doesn't adapt to narrow widths
- Text overflow on mobile (375px width)
- Mobile menu not working

**Quick Test:**
```bash
# Check for mobile viewport meta tag
curl -s https://dashboard.madhorse.cloud/ | grep 'viewport'

# Check for media queries in CSS
curl -s https://dashboard.madhorse.cloud/styles.css | grep '@media (max-width'

# Verify breakpoints: should have 768px (tablet) and 375px (mobile)
curl -s https://dashboard.madhorse.cloud/styles.css | grep -E '@media.*[37][67][05]'

# Check mobile-specific layout
curl -s https://dashboard.madhorse.cloud/styles.css | grep -A5 '@media (max-width: 768px)' | head -20
```

**Fix:** Add/update media queries for mobile breakpoints

---

## Updated Phase 5 UAT Requirement

**Adding to phase5-uat-protocol.md:**

```markdown
## Pre-UAT Visual Verification Checklist

Before marking ANY test category as PASS, verify:

### Authentication Tests (TC-101-106)
- [ ] Login form visually appears (not just HTTP 200)
- [ ] Error messages are visible and readable
- [ ] Form fields have correct styling (input boxes, buttons)

### Cross-Browser Tests (TC-501-502)
CANNOT mark as PASS without:
- [ ] Desktop screenshot (1920×1080) taken in Chrome/Safari/Firefox
- [ ] Tablet screenshot (768×1024) taken in real tablet or DevTools
- [ ] Mobile screenshot (375×812) taken on phone or DevTools
- [ ] Screenshots compared to Phase 2 Design Spec
- [ ] Evidence: 3+ screenshots per browser

### Visual Regression Tests (TC-701-703)
CANNOT mark as PASS without:
- [ ] Live website screenshot at desktop breakpoint
- [ ] Live website screenshot at tablet breakpoint
- [ ] Live website screenshot at mobile breakpoint
- [ ] Each screenshot compared to Phase 2 design mockup side-by-side
- [ ] No layout misalignment >2px
- [ ] Colors match design hex codes
- [ ] Fonts match design specs
```

---

## Current Situation: Your UAT Results

Your submission shows:

```
✅ Phase 5 UAT — PASS

| Test             | Status             |
| Login Page       | ✅ HTTP 200         |
| Dark Theme       | ✅ All tokens match |
| Protected Routes | ✅ 307 → login      |
| Auth API         | ✅ Working          |
⚠️ Limitation: No browser screenshots (no Chromium)
```

**Analysis:**
- ✅ API Tests: PASS (HTTP 200, routing, auth logic work)
- ⚠️ Visual Tests: **SKIPPED** (no screenshots = no visual verification = TC-701-703 NOT TESTED)
- ❌ Status: **NOT UAT PASS** — This is **UAT PARTIAL (API-only)**

---

## Required Actions to Complete UAT

**To move from PARTIAL to PASS:**

### Option A: Get Browser Access (Recommended)

```bash
# Step 1: Install Chromium if not available
apt-get install chromium-browser

# Step 2: Run visual regression tests (TC-701-703)
google-chrome --headless --screenshot=TC-701_Desktop.png https://dashboard.madhorse.cloud/

# Step 3: Take tablet/mobile screenshots
google-chrome --headless --window-size=768,1024 --screenshot=TC-702_Tablet.png https://dashboard.madhorse.cloud/
google-chrome --headless --window-size=375,812 --screenshot=TC-703_Mobile.png https://dashboard.madhorse.cloud/

# Step 4: Compare to design
# Open: designs/phase2_exports/Screen_Login_desktop.png
# Compare to: TC-701_Desktop.png
# Document any mismatches in Visual_Regression_Report.md
```

### Option B: Remote Testing (If No Local Browser)

```bash
# Step 1: Ask another team member to test in their browser
# Provide checklist (desktop/tablet/mobile screenshots)

# Step 2: or use online screenshot service
curl -s "https://screenshot-api.com/api/screenshots?url=https://dashboard.madhorse.cloud/&viewport=1920x1080" \
  -o TC-701_Desktop.png

# Step 3: Download Phase 2 design mockup
# Compare: Design mockup vs. live screenshot

# Step 4: Document findings in Visual_Regression_Report.md
```

### Option C: Lightweight Verification (Right Now)

```bash
# Step 1: Inspect HTML structure
curl -s https://dashboard.madhorse.cloud/ | grep -E '<header|<nav|<main|class=' | head -20

# Step 2: Check CSS is loading
curl -s https://dashboard.madhorse.cloud/ | grep -o 'href="[^"]*\.css"'

# Step 3: Verify dark theme CSS variables
curl -s https://dashboard.madhorse.cloud/styles.css | grep --color='--dark-\|--color-' | head -5

# Step 4: Test specific UI elements
curl -s https://dashboard.madhorse.cloud/login | grep -E 'input|button|label' | wc -l
# Should have ≥3 (email input, password input, button)
```

---

## Gate 5→6 Approval BLOCKED Until:

❌ **Cannot proceed to Phase 6** if UAT shows:
- "No browser screenshots"
- "No visual verification"
- "TC-701-703 skipped"

✅ **Can proceed to Phase 6** only when:
- Desktop screenshot (1920×1080) taken + compared to design ✓
- Tablet screenshot (768×1024) taken + compared to design ✓
- Mobile screenshot (375×812) taken + compared to design ✓
- All three match design mockup (colors, layout, spacing, fonts) ✓
- Visual Regression Report documents findings ✓

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-04-03 | Visual verification guide for environments without Chromium, diagnosis framework for broken UI, updated Phase 5 UAT requirements |
