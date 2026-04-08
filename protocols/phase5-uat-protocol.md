# Phase 5 — UAT Protocol (v1.7 — **UAT MUST USE PRODUCTION HTTPS URL**)

> **⚠️ MANDATORY: UAT Must Run Against Production URL (NOT localhost)**
> 
> **UAT 環境規則（v1.7 新增）：**
> - ✅ 正確：`https://dashboard.marhorse.cloud`（或實際 production URL）
> - ❌ 錯誤：`http://localhost:3002`、`http://127.0.0.1:PORT`、直接 IP:Port
> - **原因：** Nginx/Proxy 配置差異會導致內網 UAT 100% PASS 但用戶訪問 502（見 P2026-008 2026-04-06 事故）
> - **所有 66+ tests 必須透過 HTTPS production URL 執行**
> - Phase 6 closeout 前必須 smoke test：`curl https://dashboard.marhorse.cloud/` → 必需 HTTP 200
> 
> **Purpose:** User Acceptance Testing (UAT) before Phase 6 Closeout
> 
> **Phase Breakdown:**
> - **Phase 5.1:** CEO Agent pre-checks infrastructure & readiness
> - **Phase 5.2:** CDO+COO Agents execute 66+ UAT tests (with CTO technical verification)
> - **Phase 5.3:** Boss (King) final sign-off & approval for Phase 6
> 
> **Version:** v1.7 (2026-04-06) — **NEW: MANDATORY — UAT Must Run Against Production HTTPS URL (not localhost/proxy-direct)**
> **Previous:** v1.5 (2026-04-04) — Clarified: CDO+COO are PRIMARY TESTERS, AI Agents assist + report, CTO verifies tech only, CEO final approve
> **Previous:** v1.3 (2026-04-04) — Added Category 10: Project-Specific Functional Tests + Agent Execution Workflow
> **Previous:** v1.2 (2026-04-04) — Added Category 9: UI Navigation & Interactive Elements (every button + link + URL tested)
> **Previous:** v1.1 (2026-04-04) — Added Category 8: Deep Functional Testing (data validation, business logic, state management, permissions)
> **Previous:** v1.0 (2026-04-03) — Initial UAT protocol with 6 categories
> 
> **WHO DOES WHAT:**
> - **CDO Agent (PRIMARY TESTER - Visual & Design):** 
>   - Execute visual regression tests (TC-701-703: desktop/tablet/mobile layout matching design)
>   - Execute UI/UX tests (TC-901-920: buttons, links, forms, keyboard navigation)
>   - Execute design verification (colors, fonts, spacing, alignment)
>   - Execute category: TC-701-703, TC-913-915 (hover states, click audit, dead zones)
>
> - **COO Agent (PRIMARY TESTER - Workflows & Business Logic):**
>   - Execute core user workflows (TC-201-203: primary, secondary, multi-step flows)
>   - Execute project-specific business logic tests (TC-1001-1007: domain-specific processes per Phase 3 Tech Spec)
>   - Execute operational/process verification
>   - Execute category: TC-201-203, TC-1001-1007
>
> - **CTO (TECHNICAL VERIFIER ONLY):**
>   - Execute/verify authentication tests (TC-101-106: login, session, rate limiting)
>   - Execute/verify API technical tests (TC-301-305: endpoints, response format, error handling)
>   - Execute/verify error handling (TC-401-404: network errors, server errors, graceful handling)
>   - Execute/verify CRUD operations & data persistence (TC-801-809: create, read, update, delete, data integrity)
>   - Execute/verify advanced functional tests (TC-810-816: multi-step, concurrent ops, permissions, boundaries)
>   - Execute/verify cross-browser compatibility (if needed)
>   - CAN delegate execution to AI agents, but must verify results
>
> - **AI Agents (SUPPORT & REPORTING):**
>   - Assist CDO agent: capture screenshots, compare layouts with designs, document visual evidence
>   - Assist COO agent: test workflows step-by-step, document business logic verification
>   - Assist CTO agent: execute API calls, database queries, verify responses (under CTO supervision)
>   - Collect ALL evidence (screenshots, console logs, API responses, database query results)
>   - Write COMPLETE `{ID}_UAT_Test_Result.md` report with all 60+ test results
>   - DO NOT decide if test PASS/FAIL — report findings to respective agent (CDO/COO/CTO) for approval
>   - Package everything in `documents/Phase5_UAT/` folder
>
> - **CISO (OPTIONAL FOR CRITICAL APPS):** Review security-relevant tests (permissions, data access, role-based features)
> 
> - **CEO Agent (PHASE 5.1 — PRE-CHECK ONLY):** 
>   - Verify infrastructure ready (servers up, database accessible, DNS resolving)
>   - Verify test environment configured (test data loaded, credentials working)
>   - Verify CDO/COO/CTO agents are ready & briefed
>   - Generate "Phase 5.1 Readiness Report"
>   - **Does NOT execute tests** — that's Phase 5.2 CDO/COO/CTO job
>
> - **Boss/King (PHASE 5.3 — FINAL APPROVAL ONLY):**
>   - Review complete `{ID}_UAT_Test_Result.md` report (signed by CDO+COO+CTO)
>   - Verify all 66+ tests marked ✅ PASS with evidence
>   - Approve Phase 5→6 transition (or reject with specific blockers)
>   - Execute via `protocols/phase-transition.md` 5-step ritual
>   - **Does NOT execute tests** — that's Phase 5.2 CDO/COO/CTO job
>   - **Does NOT troubleshoot tools** — that's Phase 5.2 CDO/COO/CTO responsibility
>
> **UAT Report Deliverable:** `documents/Phase5_UAT/{ID}_UAT_Test_Result.md`
> - **Submitted by:** Agent (automated)
> - **Verified by:** CDO + CTO
> - **Approved by:** CEO (via phase-transition.md 5-step ritual)
>
> **Testing Type:** End-to-end functional + negative case + cross-browser/device + **VISUAL VERIFICATION** + **DEEP FUNCTIONAL VERIFICATION** + **UI NAVIGATION VERIFICATION** + **PROJECT-SPECIFIC BUSINESS LOGIC VERIFICATION**
> **SLA:** 4 business days per test case (see Section 3)
> **Gate Requirement:** Phase 5→6 blocks if UAT FAIL or visual verification INCOMPLETE or deep functional tests FAIL or UI navigation INCOMPLETE or **PROJECT-SPECIFIC TESTS INCOMPLETE or SKIPPED** or **NO EXECUTION EVIDENCE (screenshots/logs)**
> **CRITICAL:** Any test marked PASS without screenshot evidence = TEST INVALID = GATE BLOCKS
> **Referenced from:** `protocols/phase-gates.md` → Protocol Quick Reference → Phase 5
> **Related Protocols:** 
>   - `protocols/phase4.5-deployment-verification.md` (comes before this)
>   - `protocols/visual-verification-no-browser.md` (for TC-701-703 if no Chromium)
>   - `protocols/phase-transition.md` (CEO gate approval ritual)

---

## ⚠️ CRITICAL: Screenshot Requirement

**ANY test marked "PASS" without evidence screenshot = INVALID**

| Test Category | Marked PASS Without Screenshot? | Status | Action |
|---------------|-----------------------------------|--------|--------|
| Authentication (TC-101-106) | ✅ Screenshot provided → PASS | VALID | Proceed |
| Authentication (TC-101-106) | ❌ No screenshot | INVALID | ⛔ FAIL — Mark as PARTIAL, not PASS |
| Cross-browser (TC-501-502) | ✅ 4+ browser screenshots | VALID | Proceed |
| Cross-browser (TC-501-502) | ❌ "No Chromium" / "No browser access" | INVALID | ⛔ FAIL — Mark as PARTIAL, not PASS |
| Visual Regression (TC-701-703) | ✅ Desktop/Tablet/Mobile screenshots + design comparison | VALID | Proceed to Phase 6 |
| Visual Regression (TC-701-703) | ❌ Skipped / "No screenshots" | INVALID | **⛔ GATE 5→6 BLOCKED** — Cannot proceed to production |

**Rule: If ANY test lacks screenshot evidence → UAT Status = PARTIAL (not PASS)**

**AGENT RESPONSIBILITY:** Before submitting UAT report, verify all 66+ tests have evidence. If missing → fix issue → retest → add evidence → then mark PASS.

See: `protocols/visual-verification-no-browser.md` for how to get screenshots without Chromium

---

## 📋 Test Assignment Matrix (WHO DOES WHAT)

**Use this matrix to know exactly who should execute each test case:**

| Test Case | Category | Owner | Why This Owner | Key Verification |
|-----------|----------|-------|-----------------|------------------|
| **TC-101** | Authentication | CTO | Backend login logic validation | User can login with correct credentials |
| **TC-102** | Authentication | CTO | Backend authentication errors | Specific error message shown, not generic |
| **TC-103** | Authentication | CTO | Backend email validation | Email not found scenario handled |
| **TC-104** | Authentication | CTO | Backend session management | Session timeout enforced after idle |
| **TC-105** | Authentication | CTO | Backend security (rate limiting) | Brute force protection working |
| **TC-106** | Authentication | CTO | Backend session destruction | Logout properly clears session, no auto-login via back button |
| **TC-201** | Workflows | COO | Business process: Primary user journey | End-to-end workflow executes correctly |
| **TC-202** | Workflows | COO | Business process: Alternative flow | Secondary workflow works as expected |
| **TC-203** | Workflows | COO | Business process: Multi-step workflow | Complex workflows maintain state correctly |
| **TC-301** | API/Technical | CTO | Backend endpoint availability | API responds with HTTP 200 within 2 seconds |
| **TC-302** | API/Technical | CTO | Backend API response format | Response contains correct fields + data types |
| **TC-303** | API/Technical | CTO | Backend error response format | Error responses are specific + human-readable |
| **TC-304** | API/Technical | CTO | Backend timeout handling | UI shows loading indicator, handles slow responses gracefully |
| **TC-305** | API/Technical | CTO | Backend rate limiting | API rate limits enforced correctly |
| **TC-401** | Error Handling | CTO | Backend network error handling | App handles network disconnections gracefully |
| **TC-402** | Error Handling | CTO | Backend server error handling | 5xx errors show user-friendly message (not stack trace) |
| **TC-403** | Error Handling | CTO | Backend validation error handling | Form validation errors are specific + actionable |
| **TC-404** | Error Handling | CTO | Backend data error handling | Data-related errors handled without data corruption |
| **TC-501** | Cross-browser | CDO | Visual rendering: Chrome | Layout/spacing/colors correct in Chrome |
| **TC-502** | Cross-browser | CDO | Visual rendering: Firefox/Safari/Edge | Layout consistent across browsers, no browser-specific bugs |
| **TC-601** | Performance | CTO | Backend performance: Load time | Page loads in <3 seconds |
| **TC-602** | Performance | CTO | Backend performance: Concurrent users | Multiple users don't cause slowdowns/corruption |
| **TC-701** | Visual Regression | CDO | Design fidelity: Desktop layout | Desktop screen matches Phase 2 design spec (colors, fonts, spacing, alignment) |
| **TC-702** | Visual Regression | CDO | Design fidelity: Tablet layout | Tablet responsive design matches spec |
| **TC-703** | Visual Regression | CDO | Design fidelity: Mobile layout | Mobile responsive design matches spec |
| **TC-801** | Deep Functional | CTO | Backend: Email validation | Email format validated, invalid emails rejected |
| **TC-802** | Deep Functional | CTO | Backend: Password strength | Password requirements enforced |
| **TC-803** | Deep Functional | CTO | Backend: Text field limits | Field length enforced at UI + backend |
| **TC-804** | Deep Functional | CTO | Backend: Required fields | All required fields validated |
| **TC-805** | Deep Functional | CTO | Backend: Special characters | Special chars handled safely (no XSS/injection) |
| **TC-806** | Deep Functional | CTO | Backend: Create operation (CRUD) | New records persist in database + reappear after logout/login |
| **TC-807** | Deep Functional | CTO | Backend: Update operation (CRUD) | Modified data saves correctly + survives refresh |
| **TC-808** | Deep Functional | CTO | Backend: Delete operation (CRUD) | Records delete cleanly (no orphaned data) |
| **TC-809** | Deep Functional | CTO | Backend: Read/List operations (CRUD) | All records display, pagination/sorting work |
| **TC-810** | Deep Functional | CTO | Backend: Multi-step workflows | State transitions enforced, can't skip steps |
| **TC-811** | Deep Functional | CTO | Backend: Concurrent operations | Multiple users editing same record: no corruption, conflicts handled |
| **TC-812** | Deep Functional | CTO | Backend: Data consistency | After operations, database state matches UI state |
| **TC-813** | Deep Functional | CTO | Backend: Role-based access (permissions) | Viewer/Editor/Admin have correct permissions |
| **TC-814** | Deep Functional | CTO | Backend: Data isolation | User A cannot view/edit User B's private data |
| **TC-815** | Deep Functional | CTO | Backend: Boundary values | Min/max/negative/very-long values handled gracefully |
| **TC-816** | Deep Functional | CTO | Backend: Empty results | Empty searches show "No results", not error |
| **TC-901** | UI Navigation | CDO | UX: Primary buttons functional | Submit/Save/Create/Delete buttons work |
| **TC-902** | UI Navigation | CDO | UX: Secondary buttons functional | Cancel/Back/Skip/Next buttons work |
| **TC-903** | UI Navigation | CDO | UX: Disabled buttons state | Disabled buttons unclickable, visual feedback shown |
| **TC-904** | UI Navigation | CDO | UX: Icon buttons functional | Edit/Delete/Settings icon buttons work |
| **TC-905** | UI Navigation | CDO | UX: Internal navigation links | Sidebar/header/breadcrumb navigation correct |
| **TC-906** | UI Navigation | CDO | UX: External links | External links open in new tab correctly |
| **TC-907** | UI Navigation | CDO | UX: No broken links | DevTools Network: NO 404 responses |
| **TC-908** | UI Navigation | CDO | UX: Anchor links | In-page #section links scroll correctly |
| **TC-909** | UI Navigation | CDO | UX: Input fields editable | All text/email/password/date fields functional |
| **TC-910** | UI Navigation | CDO | UX: Dropdowns functional | Select menus open, select, maintain state |
| **TC-911** | UI Navigation | CDO | UX: Checkboxes/radio functional | Checkboxes toggle, radio buttons exclusive |
| **TC-912** | UI Navigation | CDO | UX: Modals open/close | Dialogs can open, close with X/Cancel |
| **TC-913** | UI Navigation | CDO | UX: Hover states visible | Buttons/links show hover feedback |
| **TC-914** | UI Navigation | CDO | UX: Comprehensive click audit | Every visible clickable element tested |
| **TC-915** | UI Navigation | CDO | UX: No dead zones | Only intended areas clickable |
| **TC-916** | UI Navigation | CDO | UX: Keyboard Tab navigation | Tab reaches all controls in logical order |
| **TC-917** | UI Navigation | CDO | UX: Keyboard Enter/Space | Keyboard activates buttons same as mouse |
| **TC-918** | UI Navigation | CDO | UX: URL changes | Every page change updates URL correctly |
| **TC-919** | UI Navigation | CDO | UX: Deep links work | Direct URL access loads page (no redirect) |
| **TC-920** | UI Navigation | CDO | UX: Invalid URLs | Type `/invalid` → Shows 404, not 500 |
| **TC-1001** | Project-Specific | COO | Business Logic #1 (from Phase 3 Tech Spec) | Domain-specific process works end-to-end |
| **TC-1002** | Project-Specific | COO | Business Logic #2 (from Phase 3 Tech Spec) | Domain-specific process works end-to-end |
| **TC-1003** | Project-Specific | COO | Business Logic #3 (from Phase 3 Tech Spec) | Domain-specific process works end-to-end |
| **TC-1004** | Project-Specific | COO | Edge Case #1 (domain-specific) | Edge case handled correctly |
| **TC-1005** | Project-Specific | COO | Edge Case #2 (domain-specific) | Edge case handled correctly |
| **TC-1006** | Project-Specific | CTO | Third-party Integration (Stripe/SendGrid/etc) | External service integration working |
| **TC-1007** | Project-Specific | CTO | Database Integrity (if applicable) | After operations, database is consistent |

**Summary by Owner:**

| Owner | Test Count | Test Cases | Focus Area |
|-------|-----------|-----------|-----------|
| **CDO** | 24 tests | TC-501-502, TC-701-703, TC-901-920 | Visual design, UI/UX, responsiveness, navigation |
| **COO** | 10 tests | TC-201-203, TC-1001-1005 | Business workflows, operational processes, domain logic |
| **CTO** | 32 tests | TC-101-106, TC-301-305, TC-401-404, TC-601-602, TC-801-816, TC-906, TC-1006-1007 | Authentication, APIs, errors, CRUD, data, performance, integrations |
| **TOTAL** | **66+** | All test cases above | Complete system validation |

---

## Test Case Categories (MANDATORY)

Every Phase 5 UAT must include ALL 6 categories:

### Category 1: Authentication & Authorization (CRITICAL)

**Coverage (Minimum 5 test cases):**

```
✓ TC-101: Valid login with correct credentials
  - Step 1: Navigate to login page
  - Step 2: Enter valid email + password
  - Step 3: Click "Login"
  - Expected: Redirects to dashboard, user name displayed, session valid
  - Evidence: Screenshot path `uat_screenshots/TC-101_valid_login_success.png`
  - Error handling: If login fails... [describe expected error message + recovery]

✓ TC-102: Invalid login (wrong password)
  - Expected: Error message "Incorrect password" appears
  - Verify: Error is specific (not generic "Login failed")
  - Verify: User remains on login page (no redirect)
  - Verify: Clear error message disappears after 5 seconds or on input change
  - Evidence: `uat_screenshots/TC-102_wrong_password_error.png`

✓ TC-103: Invalid login (non-existent email)
  - Expected: Error message "Email not found" appears
  - Verify: Rate limiting NOT triggered (should allow retry immediately)
  - Evidence: `uat_screenshots/TC-103_nonexistent_email.png`

✓ TC-104: Session timeout
  - Step 1: Login successfully
  - Step 2: Wait 30 minutes idle (or force timeout in test)
  - Step 3: Attempt action (click button, submit form)
  - Expected: Redirected to login with message "Session expired"
  - Evidence: `uat_screenshots/TC-104_session_timeout.png`

✓ TC-105: Login rate limiting (brute force protection)
  - Step 1: Attempt login with wrong password 5 times in 1 minute
  - Step 2: On 6th attempt
  - Expected: Account locked OR cooldown message "Try again in 5 minutes"
  - Evidence: `uat_screenshots/TC-105_rate_limit.png`

✓ TC-106: Logout + re-login
  - Step 1: Login
  - Step 2: Logout (click "Logout" button)
  - Step 3: Verify session destroyed (back button doesn't auto-login)
  - Step 4: re-login
  - Expected: New session created, previous session invalid
  - Evidence: `uat_screenshots/TC-106_logout_relogin.png`
```

**Blockers (GATE FAIL if any missing):**
- No TC-101 passing = GATE FAIL
- No error message verification = GATE FAIL
- No session timeout test = GATE FAIL

---

### Category 2: Core User Workflows (CRITICAL)

**Coverage (Minimum 3 test cases):**

```
✓ TC-201: Primary user journey (from Phase 1 requirements)
  - Test the #1 user workflow end-to-end
  - Include: login → navigate → perform action → verify result → logout
  - Evidence: Series of 5+ screenshots showing each step
  - Expected: All steps complete without errors

✓ TC-202: Secondary user journey (alternative flow)
  - Test secondary workflow
  - Evidence: Screenshots

✓ TC-203: Multi-step workflow (if applicable)
  - Test workflows involving multiple pages/screens
  - Evidence: Screenshots
```

**Blockers (GATE FAIL if any missing):**
- No primary workflow test = GATE FAIL

---

### Category 3: Technical Requirements (API/Backend)

**Coverage (Minimum 5 test cases):**

```
✓ TC-301: Endpoint availability (HTTP 200)
  - Test: curl -I https://dashboard.marijuana.cloud/api/health
  - Expected: HTTP 200 OK + response time < 2 seconds
  - Evidence: curl command output + timestamp
  - Command: curl -w "HTTP_CODE:%{http_code}\nTIME:%{time_total}s\n" -o /dev/null -s https://dashboard.marijuana.cloud/api/health

✓ TC-302: API response format validation
  - Test: GET /api/user/profile (after login)
  - Expected: Response contains: {user: {id, email, name, role}}
  - Verify: No missing fields
  - Verify: All fields have correct data types (string, number, array)
  - Evidence: Sample API response (redact sensitive data)

✓ TC-303: Error response format
  - Test: GET /api/user/nonexistent
  - Expected: HTTP 404 + JSON error: {status: 404, message: "User not found", code: "USER_NOT_FOUND"}
  - Verify: Error code is specific (not generic)
  - Verify: Error message is human-readable
  - Evidence: curl output

✓ TC-304: Network latency + timeout
  - Test: Simulate slow network (2-5 second latency)
  - Expected: UI shows loading indicator within 500ms
  - Expected: Timeout after 30 seconds with retry button
  - Evidence: Screenshot of loading state + timeout state

✓ TC-305: Endpoint security (CORS, authentication)
  - Test: Attempt unauthorized request without token
  - Expected: HTTP 401 Unauthorized
  - Test: Cross-origin request (from third-party domain)
  - Expected: CORS headers correct (not exposing sensitive headers)
  - Evidence: curl output
```

**Blockers (GATE FAIL if any missing):**
- No HTTP 200 check = GATE FAIL
- No error response format check = GATE FAIL
- No timeout / error handling = GATE FAIL

---

### Category 4: Error Handling & Recovery (CRITICAL)

**Coverage (Minimum 4 test cases):**

```
✓ TC-401: Network connection lost
  - Test: Disconnect network mid-action (simulated)
  - Expected: Clear error message "Network connection lost"
  - Expected: Retry button visible
  - Expected: Auto-retry after 3 seconds
  - Evidence: Screenshot TC-401_network_lost.png

✓ TC-402: Server error (500)
  - Test: Trigger server error condition
  - Expected: Error message "Server error. Please try again later"
  - Expected: User can retry without re-entering data
  - Evidence: Screenshot TC-402_server_error.png

✓ TC-403: Timeout recovery
  - Already tested in TC-304
  - Verify: User can resume after timeout

✓ TC-404: Incomplete form submission
  - Test: Submit form with missing required fields
  - Expected: Validation error for each missing field
  - Expected: Form data NOT lost (user sees what they entered)
  - Evidence: Screenshot TC-404_form_validation.png
```

**Blockers (GATE FAIL if any missing):**
- No error message test = GATE FAIL
- Vague errors like "Error" or "Failed" = GATE FAIL

---

### Category 5: Cross-Browser & Device Testing (MANDATORY)

**Coverage (Minimum 2 test cases per browser):**

```
Browsers to test: Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
Devices to test: Desktop (1920×1080), Tablet (768×1024), Mobile (375×812)

For each browser/device:
✓ TC-501: Layout renders correctly (no overflow, text readable)
✓ TC-502: Core workflow functional (login + primary action)

Evidence:
- TC-501_Chrome_Desktop_Layout.png
- TC-501_Chrome_Mobile_Layout.png
- TC-501_Firefox_Desktop_Layout.png
- TC-501_Safari_Desktop_Layout.png
- TC-502_Chrome_Desktop_Workflow.png
- TC-502_Chrome_Mobile_Workflow.png
[etc. for all browsers]
```

**Minimum Requirement:**
- ✓ Desktop Chrome
- ✓ Desktop Safari
- ✓ Mobile Chrome
- ✓ Mobile Safari
- ✗ Test FAILS if any of above untested

**Blockers (GATE FAIL if any missing):**
- No mobile testing = GATE FAIL
- No cross-browser testing = GATE FAIL

---

### Category 6: Performance & Load Testing (RECOMMENDED)

**Coverage (Minimum 2 test cases):**

```
✓ TC-601: Page load time (< 3 seconds)
  - Test: Measure time from navigation to fully loaded
  - Tool: Browser DevTools / WebPageTest
  - Expected: Core content visible in < 1 second, fully interactive in < 3 seconds
  - Evidence: Screenshot of DevTools performance tab + timestamp

✓ TC-602: Concurrent users (if applicable)
  - Test: Simulate 10 concurrent users
  - Expected: Dashboard remains responsive
  - Expected: No data corruption
  - Evidence: Load test report
```

---

### Category 7: Visual Regression Testing (CRITICAL BLOCKER FOR 5→6 GATE)

> **Purpose:** Verify deployed website matches Phase 2 Design Spec exactly (layout, spacing, colors, fonts, sizes)
> **Blocker:** Any visual deviation from design = Phase 5→6 GATE BLOCKS
> **Owner:** CDO (design fidelity) + CTO (technical rendering)

**Mandatory Comparison Screenshots:**

For EVERY screen in Phase 2 UI Spec, test at these breakpoints:

| Breakpoint | Resolution | Devices | Expected |
|-----------|-----------|---------|----------|
| Desktop | 1920×1080 | Chrome, Safari, Firefox, Edge | Matches Phase 2 mockup 100% |
| Tablet | 768×1024 | iPad, Android tablet | Matches Phase 2 tablet spec |
| Mobile | 375×812 | iPhone, Android phone | Matches Phase 2 mobile spec |

**For Each Screen:**

```
✓ TC-701: Desktop Layout Verification (1920×1080)
  - Step 1: Open https://dashboard.madhorse.cloud/[SCREEN_NAME] on Chrome
  - Step 2: Take full-screen screenshot (DevTools → screenshot tool)
  - Step 3: Open Phase 2 Design Spec (V1_Design_Spec.md or Figma export)
  - Step 4: Compare side-by-side:
    • Header alignment (should be flush left/top)
    • Spacing between elements (use DevTools inspector, should match design dimensions)
    • Font sizes (DevTools → computed styles, should match spec: e.g. "22px Roboto")
    • Colors (DevTools → color picker, should match design hex codes)
    • Component sizes/borders (inspect each element)
  - Expected: 100% visual match (pixel-perfect)
    - Tolerance: ±2px spacing, ±1° rotation
    - NO tolerance for color mismatches
  - Evidence: 
    - Live screenshot: `uat_screenshots/TC-701_Desktop_Screen_[NAME].png`
    - Design export: `designs/phase2_exports/Screen_[NAME]_desktop.png`
    - Side-by-side comparison document
  - FAIL Condition: Any of:
    • Element misaligned by >2px
    • Color hex code differs
    • Text truncated or wrapping wrong
    • Missing UI element
    • Wrong font family or size
    • Button/Form field styling mismatch

✓ TC-702: Tablet Layout Verification (768×1024)
  - Step 1: Test on iPad / Android tablet OR use Chrome DevTools responsive mode
  - Step 2: Verify layout adapts correctly to tablet breakpoint
  - Step 3: Compare against Phase 2 Tablet Design Spec
  - Expected: Tablet mockup matches live rendering
  - Evidence: Screenshots + comparison document
  - FAIL Condition: Same as TC-701

✓ TC-703: Mobile Layout Verification (375×812)
  - Step 1: Test on iPhone / Android phone OR Chrome DevTools 375×812 mode
  - Step 2: Verify mobile layout is responsive
  - Step 3: Compare against Phase 2 Mobile Design Spec
  - Expected: Mobile mockup matches live rendering
  - Evidence: Screenshots + comparison document
  - FAIL Condition: Same as TC-701
```

**Visual Regression Checklist (per screen):**

```
Screen: [NAME]

Desktop (1920×1080):
☐ Layout matches design mockup (no misalignment)
☐ All elements present (header, nav, content, footer)
☐ Spacing matches design dimensions (use DevTools)
☐ Text readable (font size, line height correct)
☐ Colors match design hex codes (use color picker)
☐ Buttons/links have correct styling
☐ Forms have correct padding/borders
☐ Images display without distortion
☐ No elements overflow container
☐ Responsive breakpoints trigger at correct widths

Tablet (768×1024):
☐ Layout adapts correctly to tablet width
☐ Touch targets are ≥44×44px (accessibility)
☐ Text doesn't wrap unexpectedly
☐ Navigation accessible (hamburger menu if needed)
☐ Images scale appropriately
☐ Matches tablet design spec

Mobile (375×812):
☐ Layout adapts to narrow width
☐ Touch targets are ≥44×44px (accessibility)
☐ Single-column layout (if applicable)
☐ Navigation functional on mobile
☐ Images scale without distortion
☐ Matches mobile design spec
```

**How to Compare (Step-by-Step Tool):**

```bash
# 1. Export design mockup from Phase 2 Design Spec
# File should be: designs/phase2_exports/{SCREEN_NAME}_{BREAKPOINT}.png

# 2. Take live website screenshot
# Using Chrome DevTools:
#   a. F12 → DevTools
#   b. Ctrl+Shift+P → "Screenshot" → Capture full page
#   c. Save to: designs/uat_screenshots/{SCREEN_NAME}_{BREAKPOINT}_live.png

# 3. Visual comparison (manual or automated)
# Option A: Open in Figma overlay or Adobe Compare
# Option B: Use ImageMagick to difference images:
#   convert designs/phase2_exports/{SCREEN_NAME}_desktop.png \
#           designs/uat_screenshots/{SCREEN_NAME}_desktop_live.png \
#           -compose difference \
#           -composite \
#           designs/uat_screenshots/DIFF_{SCREEN_NAME}_desktop.png
#   # If DIFF image is mostly black = no differences (PASS)
#   # If DIFF image has color = differences found (FAIL)

# Option C: Manual pixel-perfect check with DevTools inspector
#   - Inspect element in live website
#   - Compare to design spec dimensions
#   - Record any mismatches in spreadsheet
```

---

### Category 8: Deep Functional Testing (CRITICAL — Added v1.1)

> **Purpose:** Verify core business logic, data validation, state management, and edge cases
> **Owner:** CTO + CDO (functional requirements + UI behavior)
> **NEW in v1.1:** Addresses gap where previous UAT was UI/API only, missing critical business logic verification

**Coverage (Minimum 12 test cases):**

```
SECTION A: DATA VALIDATION & INPUT CONSTRAINTS

✓ TC-801: Email validation
  - Test: Submit form with invalid emails
    - No @ symbol: "test.com" → FAIL with "Invalid email format"
    - Multiple @ symbols: "test@@domain.com" → FAIL 
    - Valid format but fake domain: "test@totally-fake-domain-12345.com" → Allow entry but may fail on backend
  - Test: Valid emails work
    - "user@company.com" → PASS
    - "user+tag@company.com" → PASS (if supported)
  - Expected: Validation is consistent, error messages specific
  - Evidence: Screenshots of each failure case + error message

✓ TC-802: Password strength requirements
  - Test: Submit passwords that DON'T meet requirements
    - Too short: "Pass1" (if min is 8) → FAIL with "Password must be at least 8 characters"
    - No uppercase: "password123" → FAIL with "Password must include uppercase letter"
    - No numbers: "Password" → FAIL with "Password must include number"
    - No special char: "Password1" (if required) → FAIL
  - Test: Valid password works
    - "ValidPass123!" → PASS
  - Expected: Requirements clearly shown before form submission
  - Evidence: Screenshots showing: validation message + password requirements text visible

✓ TC-803: Text field length limits
  - Test: Fields with max length (name, title, bio, etc.)
    - Enter 1000 characters in field with max 100 → stops at 100 (not 101)
    - OR shows error "Max 100 characters" if validation on submit
  - Expected: Graceful handling (either hard limit or clear error)
  - Evidence: Screenshot showing character count or error

✓ TC-804: Required field validation
  - Test: Submit form with empty required fields
    - Each required field should show: "This field is required"
    - User data in OTHER fields should NOT be lost
  - Test: After error, user can correct and resubmit
  - Expected: All required fields marked (usually with * or label)
  - Evidence: Screenshot of form with all required field errors

✓ TC-805: Special characters & encoding
  - Test: Enter special characters in text fields
    - Unicode: "Café", "München", "日本語" → Should display correctly
    - Symbols: "test&name", "user@email", "price$5" → Should handle safely (no SQL injection)
    - HTML/JS: "<script>alert('XSS')</script>" → Should NOT execute (sanitized)
  - Expected: Special chars displayed correctly, no XSS/injection
  - Evidence: Screenshot showing special characters rendered correctly

---

SECTION B: BUSINESS LOGIC & CRUD OPERATIONS

✓ TC-806: Create operation with data persistence
  - Test: Create new entity (user, item, record, etc.)
    - Step 1: Fill in form with: Name="Test User", Email="test@example.com", Role="Admin"
    - Step 2: Submit
    - Expected: Success message "User created successfully"
    - Step 3: Verify in list/dashboard: New user appears
    - Step 4: Click on created user, verify all data matches what was entered
  - Test: Persistence across session
    - Step 5: Logout and login again
    - Step 6: Navigate to list, verify created user still there
  - Expected: Data persists in database, survives logout/login
  - Evidence: Screenshots of create form → success message → list view showing new item → after logout/login still present

✓ TC-807: Update operation with data consistency
  - Test: Edit existing entity
    - Step 1: Open existing record (e.g., User "John Doe")
    - Step 2: Change Name from "John Doe" to "Jane Doe"
    - Step 3: Save
    - Expected: "User updated successfully"
    - Step 4: Verify in list shows "Jane Doe"
    - Step 5: Reopen record, verify Name field shows "Jane Doe"
  - Test: Partial update (some fields only)
    - Update only email, other fields unchanged
  - Expected: Only changed fields updated, others preserved
  - Evidence: Before/after screenshots

✓ TC-808: Delete operation with cascade/orphan handling
  - Test: Delete entity
    - Step 1: Open entity with potential children (e.g., Team with Members)
    - Step 2: Delete the entity
    - Expected: Either prompt warning "Team has 3 members, delete anyway?" OR auto-cascade delete
    - Step 3: Verify deleted from list
    - Step 4: Verify members are handled correctly (deleted or reassigned)
  - Test: Cannot delete non-existent item
    - Directly access delete endpoint for invalid ID → HTTP 404, not 500
  - Expected: Graceful error handling, no orphaned data
  - Evidence: Screenshots showing delete confirmation + verification it's gone

✓ TC-809: Read/List operations with correct data retrieval
  - Test: List shows all expected data
    - Create 5 users, list page should show exactly 5
    - NOT showing duplicates, NOT missing any
  - Test: Pagination works (if applicable)
    - 50 items with page size 10 → 5 pages
    - Click page 2 → shows items 11-20
    - Items don't repeat across pages
  - Test: Sorting works
    - Sort by Name (A→Z) → verify order correct
    - Sort by Date (newest first) → verify correct reversal
  - Expected: Data consistent with what's in database
  - Evidence: Screenshots of list + database query showing same data

---

SECTION C: COMPLEX WORKFLOWS & STATE MANAGEMENT

✓ TC-810: Multi-step workflow with state transitions
  - Example: Order placement workflow (if applicable)
    - Step 1: Add items to cart → Cart shows count
    - Step 2: Proceed to checkout → Shipping form appears
    - Step 3: Fill shipping → Proceed to payment
    - Step 4: Enter payment → Order confirmation
    - Step 5: Verify email sent, database shows order in "Pending" state
  - Test: Cannot skip steps (e.g., try to go directly to payment screen)
    - Accessing payment URL without cart items → should redirect or show error
  - Expected: Workflow state enforced, can't bypass steps
  - Evidence: Screenshots of each step + final confirmation

✓ TC-811: Concurrent operations (2+ users same data)
  - Test: User A opens edit form for Person X
  - Test: User B also opens edit form for Person X
  - Test: User A updates "Name" to "Alice" and saves
  - Test: User B updates "Email" to "bob@mail.com" and saves
  - Expected: Either (a) optimistic locking "Item changed, refresh?", or (b) last-write-wins, or (c) merge changes
  - Expected: NO data corruption, conflicts handled clearly
  - Evidence: Screenshots showing final state + who "won"

✓ TC-812: Undo/History if applicable
  - Test: Make change, is there an undo button/link?
  - Test: Does history show who changed what when?
  - Expected: Changes traceable, user knows what was modified
  - Evidence: Screenshot of history/undo interface

---

SECTION D: PERMISSION & AUTHORIZATION EDGE CASES

✓ TC-813: Role-based access control
  - Test: Logged in as "Viewer" role
    - Can view items: YES
    - Can edit items: NO (button disabled or error "403 Forbidden")
    - Can delete items: NO
    - Can access admin panel: NO (redirect to 403 page)
  - Test: Logged in as "Editor" role
    - Can edit items: YES
    - Can delete items: NO (only Viewer + delete link not shown)
    - Can access admin panel: NO
  - Test: Logged in as "Admin" role
    - Can perform all actions
  - Expected: Permissions enforced consistently (UI buttons + API level)
  - Evidence: Screenshots of Viewer/Editor/Admin dashboards showing different buttons

✓ TC-814: Cannot access other users' private data
  - Test: Logged in as User A
    - Can access User A's profile: YES
    - Try to access User B's profile via URL change: /profile/user-b-id
    - Expected: Either 403 Forbidden or redirected away
    - Should NOT see User B's private data (email, phone, etc.)
  - Test: Cannot manipulate IDs to access other data
    - Update user-b-id instead of own ID in form → Error "Cannot update another user"
  - Expected: Authorization checked at API level, not just UI
  - Evidence: Screenshots + network request showing 403

---

SECTION E: EDGE CASES & BOUNDARY CONDITIONS

✓ TC-815: Boundary value testing
  - Test: Numeric fields
    - Minimum value: 0 → Works
    - Maximum value: 999,999 → Works
    - Beyond max: 1,000,000 → Error or truncated
    - Negative: -5 → Error "Value cannot be negative"
  - Test: Text fields
    - Empty string: "" → Error "Required" or allow if not required
    - Very long string: 10,000 characters → Handles gracefully
    - Max length 50: Attempt 100 chars → Stops at 50 or error
  - Expected: Graceful handling of boundary values
  - Evidence: Screenshots of error messages

✓ TC-816: Search/Filter with no results
  - Test: Search for non-existent item
    - Expected: "No results found" message, not error
    - User can easily clear search and try again
  - Test: Apply filter that matches nothing
    - Expected: Empty list with clear message, not 500 error
  - Expected: "No data" handled gracefully
  - Evidence: Screenshot of empty state

---

### Category 9: UI Navigation & Interactive Elements (NEW — Comprehensive Button/Link Testing)

> **Purpose:** Verify every clickable element (buttons, links, URLs) works correctly
> **Owner:** CDO (UI testing) + CTO (endpoint verification)
> **NEW in v1.1:** Addresses gap where UAT was missing "does every button actually work?" testing

**Coverage (Minimum 20+ test cases):**

```
SECTION A: BUTTON FUNCTIONALITY

✓ TC-901: Primary buttons work
  - Test: Every PRIMARY button (submit, save, create, delete, confirm)
    - Click "Submit" → Form submits, success message shows
    - Click "Save" → Data saves, no error
    - Click "Create" → New item created, list updated
    - Click "Delete" → Confirmation dialog or success message
    - NO 404, NO 500 errors
  - Expected: All primary buttons functional
  - Evidence: Screenshot of each button click + result

✓ TC-902: Secondary buttons work
  - Test: Every SECONDARY button (cancel, back, skip, next)
    - Click "Cancel" → Form closes without saving
    - Click "Back" → Previous page loads (browser history works)
    - Click "Skip" → Workflow skips step correctly
    - Click "Next" → Next step loads
  - Expected: All secondary buttons functional
  - Evidence: Screenshots

✓ TC-903: Disabled buttons don't work
  - Test: Buttons that should be disabled ARE disabled
    - Can't click "Submit" when form invalid (button grayed out)
    - Can't click "Delete" without confirmation (button disabled)
  - Expected: Disabled buttons can't be clicked (or show disable visual)
  - Evidence: Screenshot showing disabled state

✓ TC-904: Icon buttons work
  - Test: Icon-only buttons (edit pencil, delete X, settings gear, etc.)
    - Click edit icon → Edit mode opens
    - Click delete icon → Delete confirmation
    - Click settings icon → Settings panel opens
  - Expected: All icon buttons functional
  - Evidence: Screenshots

---

SECTION B: LINK/URL NAVIGATION

✓ TC-905: Internal navigation links work
  - Test: All navigation links (sidebar, header, breadcrumbs)
    - Click "Dashboard" → Dashboard loads
    - Click "Users" → Users list loads
    - Click "Settings" → Settings page loads
    - Click breadcrumb "Home > Users > User Details" → Each click works
  - Expected: All links navigate correctly, no 404
  - Evidence: Screenshots showing each link working

✓ TC-906: External links work
  - Test: Any external links (Help, Documentation, Support, social media)
    - Click link → Opens in new tab (target="_blank")
    - URL is correct (not redirecting to wrong place)
    - External site loads (not 404)
  - **⚠️ CRITICAL: URL Validation Rule (Added 2026-04-06)**
    - All external links MUST have **real, working URLs** (not placeholder)
    - Placeholder patterns that FAIL: `*example*`, `*#*`, `*/example`, `https://example.com/*`
    - Check: Hover over link → Verify URL in browser status bar ends with real path
    - Check: Click link → Must open real external site (not 404, not placeholder page)
    - **FAIL if ANY link uses placeholder URL** — link must go to a real page
  - Expected: External links open correctly with real URLs
  - Evidence: Screenshots showing real URLs + working external pages

✓ TC-907: No broken links (404 errors)
  - Test: Scan entire application for broken links
    - Navigate to every page
    - Check browser console: NO red errors "404 Not Found"
    - Click on every href in page → All should work
  - Tool: Browser DevTools → Network tab → Filter 404s
  - Expected: NO 404 responses
  - Evidence: Screenshot of Network tab showing all 200/201/204 responses (no 404s)

✓ TC-908: Anchor links within page work
  - Test: If page has internal anchors (#section1, #top, #footer)
    - Click anchor link → Page scrolls to section
    - URL shows hash (#section1)
    - Clicking again → Scrolls to same section
  - Expected: Anchors work for in-page navigation
  - Evidence: Screenshot showing scroll position

---

SECTION C: FORM CONTROLS & INTERACTIVE ELEMENTS

✓ TC-909: Input fields are clickable & editable
  - Test: Every input field (text, email, password, number, date, textarea)
    - Can click into field (cursor appears)
    - Can type text (characters appear)
    - Can clear field (backspace works)
    - Tab to next field (tab order correct)
  - Expected: All inputs responsive
  - Evidence: Screenshots showing text entry

✓ TC-910: Dropdown/Select menus work
  - Test: Every dropdown/select control
    - Click dropdown → Options appear
    - Select option → Option highlighted and selected
    - Reopen dropdown → Previously selected still highlighted
    - Multiple dropdowns don't interfere (independent)
  - Expected: All dropdowns functional
  - Evidence: Screenshots

✓ TC-911: Checkboxes & radio buttons work
  - Test: Every checkbox and radio button
    - Click checkbox → Checked state toggles
    - Click radio button → Selection updates (only 1 selected)
    - Can uncheck checkbox (if applicable)
  - Expected: All states work correctly
  - Evidence: Screenshots

✓ TC-912: Modals & dialogs can be opened & closed
  - Test: Every modal/dialog (confirmation, alert, form in modal)
    - Click button → Modal opens
    - Can close with X button
    - Can close with Cancel button
    - Can interact with form inside modal
    - Clicking outside modal doesn't close it (if trapped)
  - Expected: All modals usable
  - Evidence: Screenshots

✓ TC-913: Hover states visible (if applicable)
  - Test: Hoverable elements show hover state
    - Hover over button → Color/style changes
    - Hover over link → Underline or color change
    - Hover over menu item → Highlight appears
  - Expected: Hover feedback visible
  - Evidence: Screenshots with mouse over element

---

SECTION D: COMPREHENSIVE CLICK AUDIT

✓ TC-914: Every visible clickable element tested
  - Test: Systematic audit of ENTIRE page
    - List all buttons by ID/class/text
    - List all links by href
    - List all form controls
    - Click each one → Verify works or expected behavior
  - Expected: NO "element not clickable" errors, NO missing handlers
  - Tool: Browser DevTools → Click each element → Check console for errors
  - Evidence: Spreadsheet/checklist showing all elements tested

✓ TC-915: No dead zones (unintended clickable areas)
  - Test: Ensure only INTENDED areas are clickable
    - Click on plain text → Nothing happens (text not accidentally clickable)
    - Click on image → Opens image or nothing (as intended)
    - Click on whitespace → Nothing happens
  - Expected: Only UI elements are clickable, not accident areas
  - Evidence: Screenshots or notes

✓ TC-916: Keyboard navigation works (Tab through all controls)
  - Test: Tab key navigates through all interactive elements
    - Start at top of page, press Tab repeatedly
    - Tab order logical (left to right, top to bottom)
    - Can reach every button/link without mouse
    - Shift+Tab goes backwards
  - Expected: Complete keyboard accessibility
  - Evidence: Screenshots or video showing Tab navigation

✓ TC-917: Enter/Space trigger buttons correctly
  - Test: When button focused, pressing Enter or Space works
    - Tab to button, press Enter → Button activates
    - Tab to button, press Space → Button activates (if Space-compatible)
    - Works same as mouse click
  - Expected: Keyboard triggers same as clicks
  - Evidence: Screenshots

---

SECTION E: URL STRUCTURE & ROUTING

✓ TC-918: URL changes match page navigation
  - Test: Every page change updates URL
    - Click "Users" → URL changes to `/users`
    - Click user → URL changes to `/users/123`
    - Click "Dashboard" → URL changes to `/dashboard`
  - Expected: URL reflects current page
  - Evidence: Screenshots of address bar

✓ TC-919: Deep links (direct URL access) work
  - Test: Type URL directly into address bar
    - Type `/users/123` → User detail page loads
    - Type `/settings` → Settings page loads
    - Type `/dashboard` → Dashboard loads
  - Expected: Can access page via direct URL (no redirect needed)
  - Evidence: Screenshots

✓ TC-920: Invalid URLs show appropriate error
  - Test: Type non-existent URL
    - Type `/invalid-page` → Shows 404 page (not blank page or error)
    - Type `/users/invalid-id` → Shows 404 or error message
  - Expected: Graceful 404 handling, not 500 error
  - Evidence: Screenshots

---

**URL/Button Status Checklist (MANDATORY):**
- [ ] All buttons clickable (0 "element not clickable" errors)
- [ ] No broken links (0 HTTP 404s in functionality)
- [ ] All modal/dialog controls work (open, close, interact)
- [ ] All form inputs responsive (can type, select, change)
- [ ] All dropdown/select menus functional
- [ ] All checkboxes/radio buttons toggle correctly
- [ ] Keyboard Tab navigation works (all elements reachable)
- [ ] Enter/Space triggers buttons correctly
- [ ] Hover states visible (buttons/links change appearance)
- [ ] URL routing matches navigation (page changes URL)
- [ ] Deep links work (direct URL access loads page)
- [ ] Invalid URLs show graceful error (404 page, not 500)

---

**Blockers (GATE FAIL if any missing):**
- ❌ Create operation doesn't persist (data lost on logout)
- ❌ Update operation doesn't save changes
- ❌ Delete fails or leaves orphaned data
- ❌ Required field validation missing
- ❌ Email/password validation too weak or not shown
- ❌ Permissions not enforced (User A can edit User B's data)
- ❌ Multi-step workflow allows skipping steps
- ❌ Concurrent user conflicts cause data corruption
- ❌ **Any button doesn't work (404, 500, or no response)**
- ❌ **Any link broken (404 response)**
- ❌ **Cannot access page via direct URL (deep link fails)**
- ❌ **Invalid URL shows 500 error instead of 404 page**
- ❌ **Keyboard Tab navigation broken (can't reach all elements)**
- ❌ **Modal/dialog cannot be closed or interacted with**

---

### Category 10: Project-Specific Functional Tests (CRITICAL — Custom Domain Logic)

> **IMPORTANT IN PHASE 5:**
> Phase 2 defined these tests based on requirements. By Phase 5, implementation may have changed.
> **YOU MUST UPDATE TC-1001-1007 TO MATCH ACTUAL PHASE 4 IMPLEMENTATION**
> See STEP 1 above (Preparation phase) for how to fill these in.
>
> **Purpose:** Verify business logic unique to THIS project (not generic CRUD/UI tests)
> **Owner:** COO + CTO (CDO joins for validation)
> **NEW in v1.2:** Prevents "UAT PASS but feature broken" because domain-specific tests were missed

**How to Identify/Update Project-Specific Tests (Phase 5):**

1. Compare Phase 2 test cases with Phase 4 actual implementation
2. Read Phase 3 Technical Specification (`{ID}_Phase3_Technical_Specification.md`)
3. Identify 5+ CRITICAL business processes **that actually exist in Phase 4**:
   - Payment processing? Shipping? Approval workflows? File upload? Notifications? API integrations? Calculations? Permissions?
4. For EACH process, update/create 1-2 test cases
5. Name them TC-1001, TC-1002, TC-1003, etc.

**Examples (by project type):**
- E-commerce: "Process order with credit card" + "Calculate shipping fee by zip code" + "Apply coupon discount"
- CRM: "Assign lead to sales rep" + "Send follow-up email" + "Update pipeline stage"
- Healthcare: "Patient consent form submission" + "Schedule appointment + conflict check" + "Export medical records as PDF"
- SaaS: "Upgrade subscription tier" + "Generate invoice" + "Disable account after trial expires"

**Coverage (Minimum 5 test cases):**

**TEMPLATE FOR TC-1001 through TC-1007 (Fill in YOUR project details):**

```
SECTION A: CRITICAL BUSINESS PROCESSES

✓ TC-1001: [YOUR PROCESS #1 — From Phase 3 Tech Spec, updated for Phase 4 actual implementation]

  **What is this testing?** (Why critical?)
  - [Describe the main business process]
  - [Why if this breaks → customer impact]
  
  **Steps to Execute:**
  1. [Setup/precondition]
  2. [Action 1]
  3. [Action 2]
  4. [Verification 1]
  5. [Verification 2]
  
  **Expected Result:** [What should happen if PASS]
  
  **Evidence:** 
  - Screenshot 1: [Before state]
  - Screenshot 2: [After state]
  - Database/Email/API: [Proof of data change]
  
  **Owner (from Assignment Matrix):** CDO / COO / CTO
  **Status:** ☐ PASS ☐ FAIL   Signed: _______ Date: _____

✓ TC-1002: [YOUR PROCESS #2]
  [Same structure as TC-1001]

✓ TC-1003: [YOUR PROCESS #3]
  [Same structure as TC-1001]

✓ TC-1004: [EDGE CASE for business process]
  - Example: "What if user tries to do X when Y condition already true?"

✓ TC-1005: [EDGE CASE #2]
  - Example: "What if data is missing or malformed?"

SECTION B: INTEGRATION TESTS (if applicable)

✓ TC-1006: [THIRD-PARTY API INTEGRATION]
  - Example: Stripe payment, Twilio SMS, SendGrid email, Google Maps
  - Test: API call succeeds with valid credentials
  - Test: API call fails gracefully with invalid key
  - Evidence: Network tab showing API response, error message shown to user

✓ TC-1007: [DATABASE CONSISTENCY after business process]
  - Example: After payment, verify: order created ✅, payment recorded ✅, inventory decremented ✅, email sent ✅
  - Evidence: SQL query screenshot showing all related tables updated correctly
```

**Real Examples:**

**E-Commerce: TC-1001 Template Filled In**
```
✓ TC-1001: Complete Purchase Checkout with Payment + Delivery

  **What is this testing?**
  - Customer places order, enters shipping address, pays by credit card, receives confirmation
  - Why critical: NO REVENUE if this breaks

  **Steps:**
  1. Login as customer
  2. Add product to cart (quantity: 3)
  3. Proceed to checkout
  4. Enter shipping address: 123 Main St, CA 90210
  5. Select shipping method: Standard (5 days)
  6. Enter card: 4242 4242 4242 4242, Expiry: 12/25, CVC: 123
  7. Click "Place Order"

  **Expected Result:**
  - Order created in system with ID (e.g., ORD-2026-001234)
  - Payment charged to card
  - Confirmation email sent to customer
  - Order visible in customer's order history
  - Database: orders table shows status="paid", order_items shows 3 products

  **Evidence:**
  - Screenshot: Order confirmation page showing ORD-2026-001234
  - Screenshot: Email receipt received
  - Screenshot: Order in order history
  - Database Query: SELECT * FROM orders WHERE id='ORD-2026-001234' → Shows status="paid"

  **Owner:** COO (process) + CTO (verify payment + database)
  **Assigned in Matrix:** TC-1001 → COO primary, CTO technical verify
```

**SaaS: TC-1002 Template Filled In**
```
✓ TC-1002: Team Member Permissions - Viewer Role Restrictions

  **What is this testing?**
  - User with "Viewer" role cannot delete dashboards
  - User with "Editor" role CAN delete dashboards
  - Why critical: DATA SECURITY / COMPLIANCE if roles not enforced

  **Steps:**
  1. Login as Admin, create Team "Test Corp", add dashboard "Sales"
  2. Invite user1@test.com as Viewer
  3. Login as user1 (Viewer)
  4. Try to delete "Sales" dashboard
  5. Verify error appears: "Permission denied: Viewers cannot delete"
  6. Logout, login as Admin again
  7. Invite user2@test.com as Editor
  8. Login as user2 (Editor)
  9. Delete "Sales" dashboard
  10. Verify dashboard deleted successfully

  **Expected Result:**
  - Viewer: Cannot delete, specific error message shown
  - Editor: Can delete successfully
  - Database: Permissions table enforced correctly

  **Evidence:**
  - Screenshot: "Permission denied" error for Viewer
  - Screenshot: "Dashboard deleted" confirmation for Editor
  - Database Query: SELECT * FROM permissions WHERE role='viewer' AND action='delete' → Should show "0"
  - Audit log: Shows deletion by Editor, denial for Viewer

  **Owner:** COO (business logic) + CTO (permissions verification)
  **Assigned in Matrix:** TC-1001 → COO primary, CTO technical verify
```

---

**YOU MUST DO THIS IN PHASE 5 STEP 1:**

Replace placeholders above with YOUR actual project requirements:
- [ ] TC-1001: [Your critical process #1 from Phase 3 Tech Spec + Phase 4 actual implementation]
- [ ] TC-1002: [Your critical process #2]
- [ ] TC-1003: [Your critical process #3]
- [ ] TC-1004: [Your edge case #1]
- [ ] TC-1005: [Your edge case #2]
- [ ] TC-1006: [Third-party integration test if applicable]
- [ ] TC-1007: [Database consistency verification]

**Store these in ONE of:**
- Option A: Update this file `protocols/phase5-uat-protocol.md` Category 10 section
- Option B: Create `documents/Phase5_UAT/{ID}_Project_Specific_Test_Cases.md` (reference it here)

**Sign-off:**
- [ ] CDO: "These processes match Phase 2 design" ✅ Sign: _______ Date: _____
- [ ] COO: "These processes match actual Phase 4 implementation" ✅ Sign: _______ Date: _____
- [ ] CTO: "Technical implementation verified" ✅ Sign: _______ Date: _____

---

**Blockers (GATE FAIL if any missing):**
- ❌ No Phase 3 Tech Spec review (cannot identify domain logic)
- ❌ Less than 5 project-specific tests
- ❌ Project-specific tests are too generic (e.g., "Test login" instead of actual business feature)
- ❌ Project-specific tests FAIL
- ❌ No evidence of executing project-specific tests
- ❌ Tests don't match Phase 4 actual implementation (still using Phase 2 assumptions)
- ❌ Third-party integrations untested

---

---

---

## 🚨 MANDATORY: CDO + COO Execute Main UAT, AI Agents Assist & Report

> **READ THIS BEFORE STARTING UAT:**
>
> **Role Distribution:**
> - **CDO Agent** = Chief Designer/Creative Officer → Does visual regression + UI/UX testing (TC-701-703, TC-901-920)
> - **COO Agent** = Chief Operations Officer → Does workflow + business logic testing (TC-201-203, TC-1001-1007)
> - **CTO** = Chief Technical Officer → Does technical testing (TC-101-106 auth, TC-301-305 API, TC-801-816 CRUD) — can delegate execution to AI agents
> - **AI Agents** = Support team → Does NOT make final test decisions, assists CDO/COO/CTO with execution + evidence collection + reporting
>
> **CDO + COO:**
> - You are PRIMARY TESTERS
> - You MUST execute your assigned test categories (design for CDO, workflows for COO)
> - You MUST NOT skip your tests or delegate to AI agents
> - You MUST review AI agent reports and APPROVE/REJECT each test result
> - You MUST sign-off on complete UAT report before CEO can approve Phase 5→6
>
> **AI Agents:**
> - You are SUPPORT STAFF
> - You can execute tests UNDER supervision of CDO/COO/CTO
> - You DO NOT make final test PASS/FAIL decisions — that's CDO/COO/CTO role
> - You collect evidence and write reports for CDO/COO/CTO to review
> - Do NOT skip test categories and claim "waiting for CDO" — work WITH CDO, not instead of CDO

---

## FOR AGENTS: You MUST EXECUTE Tests, NOT Just Document Them

> **This section is for agents/testers — if you don't do these steps, UAT is INVALID**

---

## 💼 PHASE 5.1: CEO PRE-CHECK (Infrastructure & Readiness Verification)

> **Executed By:** CEO Agent
> **Duration:** ~1-2 hours
> **Deliverable:** `Phase5_1_Readiness_Report.md`

**CEO Agent Responsibilities (PHASE 5.1 ONLY):**

- [ ] **⚠️ MANDATORY: Smoke Test Production URL — TWO mandatory checks (NOT localhost)**
  ```bash
  # STEP 1: HTTP Status check (following redirects to final destination)
  HTTP_CODE=$(curl -sL -o /dev/null -w '%{http_code}' https://dashboard.marhorse.cloud/)
  # Expected: HTTP:200 (after following all redirects)
  # ❌ HTTP:502/504 = nginx/proxy misconfigured — BLOCKS UAT
  # ❌ HTTP:307/301/302 WITHOUT following redirects = nginx/proxy misconfigured — BLOCKS UAT
  # Note: 307/301/302 redirects ARE expected for unauthenticated users (NextAuth) — only FAIL if final HTTP ≠ 200
  
  # STEP 2: Content validation (MUST NOT be raw/error HTML)
  HTML_CONTENT=$(curl -sL https://dashboard.marhorse.cloud/)
  # Check 1: Must contain <!DOCTYPE html or <html
  if ! echo "$HTML_CONTENT" | grep -qi '<!DOCTYPE\|<html'; then
    echo "❌ FAIL: Response is not valid HTML"
    exit 1
  fi
  # Check 2: Must NOT contain error indicators
  if echo "$HTML_CONTENT" | grep -qi 'nginx.*error\|502.*bad\|gateway.*timeout\|500.*internal'; then
    echo "❌ FAIL: HTML contains error indicators"
    exit 1
  fi
  # Check 3: Must contain expected page content (e.g. login form or dashboard)
  if ! echo "$HTML_CONTENT" | grep -qi 'sign in\|dashboard\|madhorse\|login'; then
    echo "❌ FAIL: HTML missing expected content"
    exit 1
  fi
  
  echo "✅ PASS: HTTP:$HTTP_CODE + Valid HTML + Expected content"
  
  # If smoke test FAILS:
  # 1. Check nginx proxy_pass points to correct container port
  # 2. Check container is running and healthy
  # 3. Fix before ANY UAT testing begins
  # 4. Re-verify both checks before proceeding
  ```

- [ ] **Verify Infrastructure Ready**
  ```bash
  # Check staging server (via production URL)
  curl -I https://dashboard.marhorse.cloud/api/health
  # Expected: HTTP 200
  
  # Check database accessible
  psql -h database.example.com -U test_user -d test_db -c "SELECT 1;"
  # Expected: Connection success
  
  # Check third-party APIs (Stripe, SendGrid, etc.)
  # Expected: API keys configured, test mode enabled
  ```

- [ ] **Verify Test Environment Configuration**
  - Test data loaded? (sample users, projects, tasks)
  - Test credentials working? (test@example.com / password)
  - Test mode enabled on third-party services? (Stripe test mode, SendGrid test account)
  - Browser DevTools/Network debugging available?

- [ ] **Verify CDO+COO+CTO Ready**
  - [ ] CDO briefed: Visual regression tests (TC-701-703, TC-901-920)
  - [ ] COO briefed: Workflow tests (TC-201-203, TC-1001-1007)
  - [ ] CTO briefed: Technical tests (TC-101-106, TC-301-305, TC-801-816)
  - [ ] All agents have access to **production HTTPS URL** (not localhost/PORT)?

- [ ] **Create Phase 5.1 Readiness Report**
  ```markdown
  # Phase 5.1 Readiness Report — P[ID]
  
  Date: [Date]
  CEO Agent: [Name]
  
  ## Infrastructure Checks
  - [ ] Staging server: ✅ 200 OK
  - [ ] Database: ✅ Connected
  - [ ] APIs configured: ✅ Stripe test mode, SendGrid sandbox
  - [ ] CDO/COO/CTO briefed: ✅ All confirmed
  
  ## Status
  ✅ **READY FOR PHASE 5.2 UAT EXECUTION**
  
  CDO Agent can begin Phase 5.2 UAT of TC-701-703, TC-901-920
  COO Agent can begin Phase 5.2 UAT of TC-201-203, TC-1001-1007
  CTO Agent can begin Phase 5.2 UAT of TC-101-106, TC-301-305, TC-801-816
  ```

**IMPORTANT: CEO Agent Does NOT Execute Tests**
- ❌ Do NOT start browser testing (that's Phase 5.2)
- ❌ Do NOT fill TC-1001-1007 (that's Phase 5.2 COO job)
- ❌ Do NOT execute API tests (that's Phase 5.2 CTO job)
- ✅ Only verify infrastructure is ready for others to test

---

## 🧪 PHASE 5.2: UAT EXECUTION (Tests Executed by CDO+COO+CTO)

### STEP 1: BEFORE UAT EXECUTION (Preparation Phase)

**ALL TEAM MEMBERS: CDO, COO, CTO, AI Agents — COMPLETE YOUR PREPARATION**

#### CRITICAL FIRST: CDO + COO Update Project-Specific Test Cases (TC-1001-1007)

> **Why This Step?**
> Phase 2 defined test cases based on design/requirements. By Phase 5, implementation may have changed. You must update TC-1001-1007 to match ACTUAL product.

**BEFORE ANY OTHER TESTING — DO THIS FIRST:**

- [ ] **CDO + COO: Get Phase 2 Test Cases**
  - Open: `documents/Phase2_Design/{ID}_UAT_Test_Case.md` (or equivalent)
  - Review: What business processes were in Phase 2 spec?
  - Example: "User can create project, invite team members, set permissions"

- [ ] **Compare with Phase 4 Implementation**
  - What actually got built? (from Phase 3 Tech Spec + Phase 4 implementation)
  - Example: "Implemented: create project ✅, invite members ✅, but permission UI changed"
  
- [ ] **Update TC-1001-1007 to ACTUAL Project Scope**
  
  **For each placeholder (TC-1001 through TC-1005), fill in ACTUAL business processes:**
  
  ```markdown
  ✓ TC-1001: [FILL THIS IN] E-Commerce: User can checkout with credit card
    - Step 1: Add product to cart
    - Step 2: Proceed to checkout
    - Step 3: Enter payment details
    - Step 4: Confirm order
    - Expected: Order created, payment processed, confirmation email sent
    - Evidence: Order ID in system, email receipt received
    - Owner: COO (business logic) + CTO (payment verification)
  
  ✓ TC-1002: [FILL THIS IN] E-Commerce: User can apply discount code
    - Step 1: At checkout, enter discount code
    - Step 2: Click "Apply"
    - Step 3: Verify price recalculates
    - Expected: Discount applied, total price reduced
    - Evidence: Original price $100 → Discounted $80 shown
    - Owner: COO
  
  ✓ TC-1003: [FILL THIS IN] [Your Project Context]
    - [Your project-specific business process]
    - [Steps...]
    - [Expected...]
    - Owner: CDO/COO/CTO as applicable
  
  ✓ TC-1004: [FILL THIS IN] [Edge Case from Phase 3]
    - [Example: What if discount code expired?]
    - Owner: COO/CTO
  
  ✓ TC-1005: [FILL THIS IN] [Another Edge Case]
    - Owner: COO/CTO
  
  ✓ TC-1006: [FILL THIS IN] [Third-party Integration if applicable]
    - [Example: Stripe payment, SendGrid email, etc.]
    - Owner: CTO
  
  ✓ TC-1007: [FILL THIS IN] [Data Consistency Check if applicable]
    - [After TC-1001-1006 complete, verify database state]
    - Owner: CTO
  ```
  
- [ ] **Where to Update TC-1001-1007:**
  - Update THIS file: `protocols/phase5-uat-protocol.md` Section "Category 10: Project-Specific Functional Tests"
  - Provide detailed steps for each test case (like TC-101-920 format)
  - Or create separate file: `documents/Phase5_UAT/{ID}_Project_Specific_Test_Cases.md`

- [ ] **Sign-Off: These are the ACTUAL tests we will run**
  - CDO confirms: "These are the workflows/business processes we need to test"
  - COO confirms: "These match the operational requirements"
  - CTO confirms: "These match the technical implementation"

---

#### CDO Agent Preparation (Visual & Design Tester)
- [ ] **Review Phase 2 Design Spec**
  - Know exact design specifications for all screens (colors, fonts, spacing, alignment)
  - Have Figma/design tool open for side-by-side comparison during testing
  - Identify which UI elements are CRITICAL to match design spec
  
- [ ] **Prepare Visual Testing Tools**
  - Screenshot tool ready (browser built-in or Playwright)
  - Design comparison tool ready (ImageMagick, Figma diff, or visual comparison tool)
  - Color picker tool ready (browser DevTools color picker, or color checker app)
  
- [ ] **Assign Work to AI Agents**
  - Tell AI agents: "Here are the 20 screens to test for visual regression"
  - Tell them: "I will verify each result, you provide screenshots and comparisons"
  - You are supervisor, they are helpers

#### COO Agent Preparation (Workflow & Business Logic Tester)
- [ ] **Read Phase 3 Tech Spec** (`{ID}_Phase3_Technical_Specification.md`)
  - Identify ALL critical business processes and workflows
  - Document which business logic is core to the system
  - Identify project-specific edge cases and handling
  
- [ ] **Prepare Workflow Testing Setup**
  - Test user accounts created (with different roles/permissions if applicable)
  - Test data seeded in database (test companies, products, transactions, etc.)
  - Know expected business process flow end-to-end
  
- [ ] **Assign Work to AI Agents**
  - Tell AI agents: "Execute these 27 workflow tests step-by-step"
  - Tell them: "I will review each result to confirm it matches business logic"
  - You are supervisor, they are helpers

#### CTO Technical Testing Preparation
- [ ] **Prepare Technical Test Environment**
  - Staging server running? Check: `curl https://staging.project.com/health` → should return HTTP 200
  - Database accessible? Check: can connect via MySQL/PostgreSQL client
  - API keys configured (Stripe test, SendGrid test, etc.)? Check `.env`
  - Browser DevTools ready (Network tab, Console tab)
  
- [ ] **Get Technical Tools Ready**
  - API testing tool (Postman, curl, or similar)
  - **Database query tool** (MySQL Workbench, pgAdmin, DBeaver, etc.)
  - **SQL query examples** for CRUD verification (INSERT, SELECT, UPDATE, DELETE)
  - **Test accounts** with different permission levels (admin, user, viewer, etc.)
  - **Network analyzer** (DevTools Network tab for HTTP status codes)
  
- [ ] **Decide: Self-Execute or Delegate to AI Agents**
  - Option A: You execute all 40 technical tests yourself
  - Option B: You supervise AI agents executing technical tests, you verify results
  - Either way, YOU must verify final test results (AI agents cannot decide PASS/FAIL)

#### AI Agents Support Preparation
- [ ] **Get Reporting Tools Ready**
  - Markdown editor for writing `{ID}_UAT_Test_Result.md`
  - Screenshot organizer (create folder structure for uat_screenshots/)
  - Evidence collection tool (database query results exporter, console log capture)
  
- [ ] **Join the Team**
  - Wait for CDO/COO/CTO assignments
  - Do NOT start testing on your own
  - Work UNDER their supervision as helpers
  - Report findings, don't make final test decisions

---

### STEP 2: EXECUTE TESTS (Live Testing — Don't Simulate)

**FOR EACH TEST CASE (TC-101 through TC-1007):**

**MANDATORY:**
- [ ] **Actually click the button/link in browser** (not just "assume it works")
- [ ] **Actually enter data** (not just "test data would be X")
- [ ] **Watch for errors in DevTools Console** (red errors = TEST FAIL)
- [ ] **Check Network tab for 404/500 responses** (TEST FAIL if any)
- [ ] **Screenshot BEFORE and AFTER each action** (proof of execution)
- [ ] **Wait for response** (not just immediate screenshot)

**FORBIDDEN:**
- ❌ "Assuming login works based on code review"
- ❌ "Visual inspection only, no screenshot"
- ❌ "Tested locally, so prod will work" (NO — must test actual staging/prod)
- ❌ "Got error but didn't screenshot" (no evidence = TEST FAIL)
- ❌ "Ran 2 tests out of 10 and skipped rest" (PARTIAL = GATE BLOCKS)

---

### STEP 3: LIVE DATA VERIFICATION (Proof Tests Actually Ran)

**After each test case, verify data actually changed:**

**TC-101 (Login):**
- [ ] Execute: Navigate /login, enter email/password, click "Login", wait 2 seconds
- [ ] Verify: URL changed to /dashboard (screenshot)
- [ ] Verify: User name displays in top-right (screenshot)
- [ ] Verify: Console has NO red errors (screenshot)
- [ ] PASS/FAIL: Check checkbox only if ALL 4 verified above

**TC-806 (Create operation):**
- [ ] Execute: Fill form "Name='Test Item'", click Create, wait for response
- [ ] Verify: Success message appears (screenshot)
- [ ] Verify: New item in list (screenshot)
- [ ] Verify: Database query `SELECT * FROM items WHERE name='Test Item'` returns 1 row (screenshot of query result)
- [ ] Verify: Page refresh — item STILL there (screenshot)
- [ ] PASS/FAIL: Check checkbox only if ALL 5 verified

**TC-1001 (Project-specific):**
- [ ] Execute: [Specific business process]
- [ ] Verify: [Expected outcome in UI]
- [ ] Verify: [Database state changed correctly]
- [ ] Verify: [External system notified (email sent/API called/file created)]
- [ ] PASS/FAIL: Check ONLY if ALL verified

---

### STEP 4: EVIDENCE SUBMISSION (Screenshots + Logs)

**Place in `documents/Phase5_UAT/{ID}_UAT_Test_Results.md`:**

```markdown
## Test Execution Evidence (UAT v1.2)

### TC-101: Valid Login
- **Executed:** 2026-04-04 14:23 UTC
- **Environment:** staging.project.com
- **Status:** ✅ PASS
- **Steps Performed:**
  1. Navigate to /login
  2. Enter email: test@example.com
  3. Enter password: [redacted]
  4. Click "Login" button
  5. Wait 2 seconds for page load
- **Evidence Screenshots:**
  - Before: `TC-101_before_login.png` (login form visible)
  - After: `TC-101_after_login.png` (dashboard visible, user name "Test User" in top-right)
  - Console: `TC-101_console_clean.png` (Network tab: HTTP 200, NO 404/500)
- **Verification:** ✅ Redirected to /dashboard ✅ Session cookie set ✅ No errors
- **Blocker Check:** ✅ PASS (all requirements met)

### TC-806: Create Operation
- **Executed:** 2026-04-04 15:10 UTC
- **Status:** ✅ PASS
- **Steps Performed:**
  1. Navigate to /items/create
  2. Fill form: Name="Integration Test Item", Category="Test"
  3. Click "Create" button
  4. Wait for response
- **Evidence Screenshots:**
  - Form filled: `TC-806_form_filled.png`
  - Success message: `TC-806_success_message.png`
  - List view: `TC-806_item_in_list.png` (new item visible)
  - Database query: `TC-806_db_verify.png` (SQL: SELECT * FROM items WHERE name='Integration Test Item' → 1 row returned)
  - After refresh: `TC-806_after_refresh.png` (item still there after F5)
- **Blocker Check:** ✅ PASS

### TC-1001: Process Payment (Project-Specific)
- **Executed:** 2026-04-04 16:45 UTC
- **Status:** ✅ PASS
- **Context:** E-commerce app — verify Stripe payment processing
- **Steps Performed:**
  1. Add test product to cart
  2. Proceed to checkout
  3. Enter test credit card: 4242 4242 4242 4242
  4. Click "Pay Now"
  5. Wait for Stripe response
- **Evidence Screenshots:**
  - Cart summary: `TC-1001_cart.png`
  - Stripe form: `TC-1001_stripe_form.png`
  - Success page: `TC-1001_order_confirmed.png` (order ID visible)
  - Email receipt: `TC-1001_email_receipt.png` (screenshot of email received)
  - Database: `TC-1001_db_order.png` (Database shows order created, status='Paid')
  - API log: `TC-1001_stripe_webhook.png` (Stripe webhook received successfully)
- **Blocker Check:** ✅ All critical verifications passed
```

---

### STEP 5: FAILURE HANDLING (If Test Fails)

**When ANY test FAILS:**

**MANDATORY — DO NOT SKIP:**
- [ ] **Screenshot the error** (including console errors)
- [ ] **Document the exact failure** (what was expected vs. what happened)
- [ ] **Check logs:** `tail -100 /var/log/app.log` (backend error?)
- [ ] **Check database:** Are related records created? (TC-806 — is item in DB even if UI error?)
- [ ] **Isolate the cause:** Is it UI bug, backend bug, config issue, data issue?
- [ ] **DO NOT mark as PASS** — If any step fails, entire test is FAIL

**Example Failure Documentation:**
```
### TC-1001: Process Payment — 🔴 FAIL
- **Status:** FAIL
- **Error:** Stripe payment returned 422 Unprocessable Entity
- **Screenshot:** `TC-1001_error_422.png` (user sees: "Payment declined")
- **Evidence:** 
  - `TC-1001_console_error.png` (console shows: "card_declined")
  - `TC-1001_stripe_log.png` (Stripe response: insufficient funds)
- **Root Cause:** Test card 4242 was already used in prior test, hitting rate limit
- **Fix Applied:** Rotated to new test card 4000 0000 0000 0002
- **Retested:** YES — Re-executed TC-1001 with new card
- **Final Status:** ✅ PASS (after fix)
- **Action:** Documented test card rotation requirement in test setup
```

---

## ⚠️ CRITICAL: TOOL FAILURE HANDLING (NOT CEO WORK)

> **IMPORTANT FOR CDO+COO+CTO:**
> If browser tool or testing infrastructure FAILS, this is YOUR responsibility to handle — **DO NOT escalate to CEO**.
> CEO's role is FINAL APPROVAL after tests complete, NOT troubleshooting tools.

**Scenario: Browser Tool Broken (e.g., Chromium not responding)**

❌ **WRONG:** "Boss, can you manually screenshot the browser since our tool is broken?"
✅ **RIGHT:** Find alternative method to continue testing

**Your Options (in order of preference):**

1. **Fix the tool** (fastest)
   ```bash
   # Restart browser container/service
   docker restart chrome-browser
   # Or restart Chromium if local
   pkill -f chromium
   # Wait 30 seconds, retry
   ```

2. **Use API Testing as alternative** (if UI screenshots aren't critical)
   ```bash
   # Test via API instead of browser
   curl -X GET https://dashboard.marhorse.cloud/api/dashboard \
     -H "Authorization: Bearer $TOKEN" \
     -s | jq . > api_response.json
   # Screenshot the terminal output or save JSON as evidence
   ```

3. **Use headless browser mode** (if GUI browser fails)
   ```bash
   # Execute using headless (no GUI needed)
   playwright launch --headless=true
   # Or Selenium headless mode
   seleniumResult=$(firefox --headless --screenshot tc-1001.png https://dashboard.marhorse.cloud)
   ```

4. **Manual workaround with evidence**
   ```bash
   # If NO tool works, document the workaround:
   # 1. Open terminal
   # 2. curl the endpoint (shows it responds)
   # 3. Screenshot terminal + curl output
   # 4. Document: "UI browser broken, verified via API instead"
   ```

**MANDATORY RULES:**

- ✅ **You (CDO/COO/CTO/AI) MUST find a workaround within 30 minutes**
- ✅ **Document WHAT tool failed and WHICH alternative used**
- ✅ **Continue testing using different method**
- ❌ **NEVER ask CEO/Boss to manually execute tests** (that's not their job)
- ❌ **NEVER skip tests because tool is broken** (find alternative evidence)
- ❌ **NEVER escalate tool failures to CEO** (escalate to DevOps/Infra instead)

**Example of Acceptable Workaround Documentation:**
```
### TC-901: Navigation Button "Dashboard" Works

**Primary Method:** Browser screenshot
**Status:** Browser tool unresponsive at 14:30

**Workaround Method:** API verification
- Executed: curl https://api.dashboard.marhorse.cloud/endpoints
- Evidence: `TC-901_api_verification.txt` (shows endpoint exists)
- Status: ✅ PASS (API responds 200, button endpoint functional)
- Note: UI screenshot pending tool repair

**Planned:** Retry with browser after Infra fixes Chromium (ticket #ENV-2847)
```

---

### STEP 6: FINAL CHECKLIST (Gate 5→6 Approval)

**BEFORE CEO can approve Phase 5→6:**

- [ ] **All 59+ test cases executed** (not skipped, not assumed)
- [ ] **59+ screenshots collected** (one per test case minimum, usually more)
- [ ] **All MANDATORY tests PASS** (TC-101-106 login, TC-701-703 visual, TC-801-816 deep functional, TC-901-920 navigation, TC-1001-1007 project-specific)
- [ ] **Any FAILED tests retested & Fixed** (document "retry with fix")
- [ ] **Evidence compiled** in `{ID}_UAT_Test_Results.md` (with screenshots, console logs, database verification)
- [ ] **Zero red flags in console** (Network tab shows 200/201 responses, NO 404/500)
- [ ] **Project-specific tests aligned** with Phase 3 Tech Spec (5+ domain tests, not generic)
- [ ] **HEARTBEAT.md updated** with Phase 5 status (automated by phase-transition.md)

**Gate Decision:**
- ✅ ALL tests PASS + ALL evidence present = CEO APPROVES Phase 5→6
- ❌ ANY test missing or FAIL + NO evidence = CEO REJECTS, Phase 5→6 BLOCKED

---

**Blocker Rules (Phase 5→6 GATE):**

| Finding | Blocker Level | Action |
|---------|---------------|--------|
| Layout matches design 100% | ✅ PASS | Proceed to Phase 6 |
| Spacing off by 1-2px | ⚠️ WARN | Document as "acceptable variance" if component remains functional |
| Color mismatch (hex differs) | 🔴 FAIL | GATE BLOCKED — CTO must fix styling |
| Element misaligned >2px | 🔴 FAIL | GATE BLOCKED — CTO must fix layout |
| Missing element | 🔴 FAIL | GATE BLOCKED — CTO must implement |
| Font size/family wrong | 🔴 FAIL | GATE BLOCKED — CTO must fix typography |
| Text truncated/wrapping wrong | 🔴 FAIL | GATE BLOCKED — CTO must fix text rendering |
| Form field styling wrong | 🔴 FAIL | GATE BLOCKED — CTO must fix form styles |
| Mobile responsive broken | 🔴 FAIL | GATE BLOCKED — CTO must fix responsive design |
| Tablet layout broken | 🔴 FAIL | GATE BLOCKED — CTO must fix tablet layout |

---

## Requirement Matrix (Gate 5→6 Checklist)

**Before CEO can APPROVE Phase 5→6 transition:**

| Requirement | Evidence | Owner | Status |
|-------------|----------|-------|--------|
| TC-101 (valid login) passes | Screenshot TC-101 | CDO/CTO | ☐ PASS / ☐ FAIL |
| TC-102 (wrong password error) passes | Screenshot TC-102 | CDO/CTO | ☐ PASS / ☐ FAIL |
| TC-103 (invalid email error) passes | Screenshot TC-103 | CDO/CTO | ☐ PASS / ☐ FAIL |
| TC-104 (session timeout) passes | Screenshot TC-104 | CDO/CTO | ☐ PASS / ☐ FAIL |
| TC-105 (rate limiting) passes | Screenshot TC-105 | CDO/CTO | ☐ PASS / ☐ FAIL |
| TC-106 (logout/re-login) passes | Screenshot TC-106 | CDO/CTO | ☐ PASS / ☐ FAIL |
| TC-201 (primary workflow) passes | 5+ screenshots | CDO/CTO | ☐ PASS / ☐ FAIL |
| TC-301 (endpoint HTTP 200) passes | curl output | CTO | ☐ PASS / ☐ FAIL |
| TC-302 (API response format) passes | Sample API response | CTO | ☐ PASS / ☐ FAIL |
| TC-303 (error response format) passes | curl output | CTO | ☐ PASS / ☐ FAIL |
| TC-401 (network error handling) passes | Screenshot TC-401 | CDO | ☐ PASS / ☐ FAIL |
| TC-402 (server error handling) passes | Screenshot TC-402 | CDO | ☐ PASS / ☐ FAIL |
| Cross-browser (4 browsers) all pass | Screenshots (4 browsers) | CDO | ☐ PASS / ☐ FAIL |
| Mobile responsive all pass | Screenshots (mobile) | CDO | ☐ PASS / ☐ FAIL |
| All error messages human-readable | Screenshots | CDO | ☐ PASS / ☐ FAIL |
| **TC-701 (Desktop visual regression) matches design** | Side-by-side screenshots + ImageMagick diff | CDO | ☐ PASS / ☐ FAIL |
| **TC-702 (Tablet visual regression) matches design** | Side-by-side screenshots + diff | CDO | ☐ PASS / ☐ FAIL |
| **TC-703 (Mobile visual regression) matches design** | Side-by-side screenshots + diff | CDO | ☐ PASS / ☐ FAIL |
| **All layouts match Phase 2 Design Spec (colors, fonts, spacing, alignment)** | RGB comparison + DevTools inspector verification | CDO | ☐ PASS / ☐ FAIL |
| **TC-801 (Email validation)** passes | Form validation screenshots + error messages | CTO | ☐ PASS / ☐ FAIL |
| **TC-802 (Password strength)** enforced | Password requirements visible + validation works | CTO | ☐ PASS / ☐ FAIL |
| **TC-803 (Text field length limits)** enforced | Text input stops/errors at max length | CTO | ☐ PASS / ☐ FAIL |
| **TC-804 (Required fields)** validated | All required fields marked, error shown if missing | CTO | ☐ PASS / ☐ FAIL |
| **TC-805 (Special characters)** handled safely | Special chars display correctly, no XSS/injection | CTO | ☐ PASS / ☐ FAIL |
| **TC-806 (Create operation)** persists data | Created items appear in list + survive logout/login | CTO | ☐ PASS / ☐ FAIL |
| **TC-807 (Update operation)** saves changes | Modified data matches in list + after refresh | CTO | ☐ PASS / ☐ FAIL |
| **TC-808 (Delete operation)** works correctly | Item removed from list, no orphaned data | CTO | ☐ PASS / ☐ FAIL |
| **TC-809 (Read/List operations)** show all data | List shows all items, pagination/sorting work | CTO | ☐ PASS / ☐ FAIL |
| **TC-810 (Multi-step workflow)** enforced | Cannot skip steps, state transitions correct | CTO | ☐ PASS / ☐ FAIL |
| **TC-811 (Concurrent operations)** safe | 2+ users editing same record: no corruption, conflicts handled | CTO | ☐ PASS / ☐ FAIL |
| **TC-813 (Role-based access)** enforced | Viewer/Editor/Admin have correct permissions | CTO/CISO | ☐ PASS / ☐ FAIL |
| **TC-814 (Cannot access other users' data)** | User A cannot view/edit User B's private data | CTO/CISO | ☐ PASS / ☐ FAIL |
| **TC-815 (Boundary values)** handled | Min/max/negative/very-long values handled gracefully | CTO | ☐ PASS / ☐ FAIL |
| **TC-816 (No results handling)** graceful | Empty search shows "No results", not error | CTO | ☐ PASS / ☐ FAIL |
| **TC-901 (Primary buttons)** all work | Submit/Save/Create/Delete buttons functional | CDO | ☐ PASS / ☐ FAIL |
| **TC-902 (Secondary buttons)** all work | Cancel/Back/Skip/Next buttons functional | CDO | ☐ PASS / ☐ FAIL |
| **TC-903 (Disabled buttons)** enforced | Disabled buttons unclickable, visual feedback shown | CDO | ☐ PASS / ☐ FAIL |
| **TC-904 (Icon buttons)** work | Edit/Delete/Settings icon buttons functional | CDO | ☐ PASS / ☐ FAIL |
| **TC-905 (Internal navigation links)** work | Sidebar/header/breadcrumb navigation correct | CDO | ☐ PASS / ☐ FAIL |
| **TC-906 (External links)** work | External links open correctly in new tab | CDO | ☐ PASS / ☐ FAIL |
| **TC-907 (No broken links)** audit | DevTools Network: NO 404 responses | CDO | ☐ PASS / ☐ FAIL |
| **TC-908 (Anchor links)** work | In-page #section links scroll correctly | CDO | ☐ PASS / ☐ FAIL |
| **TC-909 (Input fields)** clickable/editable | All text/email/password/date/textarea fields work | CDO | ☐ PASS / ☐ FAIL |
| **TC-910 (Dropdowns)** functional | All select menus open, select, maintain state | CDO | ☐ PASS / ☐ FAIL |
| **TC-911 (Checkboxes/radio)** functional | Checkboxes toggle, radio buttons exclusive | CDO | ☐ PASS / ☐ FAIL |
| **TC-912 (Modals)** open/close | All dialogs can open, close with X/Cancel, interact | CDO | ☐ PASS / ☐ FAIL |
| **TC-913 (Hover states)** visible | Buttons/links show hover feedback (color/underline) | CDO | ☐ PASS / ☐ FAIL |
| **TC-914 (Comprehensive click audit)** complete | Every visible clickable element tested + works | CDO | ☐ PASS / ☐ FAIL |
| **TC-915 (No dead zones)** | Only intended areas clickable, no accidents | CDO | ☐ PASS / ☐ FAIL |
| **TC-916 (Keyboard Tab navigation)** works | Tab reaches all controls, logical order | CDO | ☐ PASS / ☐ FAIL |
| **TC-917 (Enter/Space)** trigger buttons | Keyboard activates buttons same as mouse | CDO | ☐ PASS / ☐ FAIL |
| **TC-918 (URL changes)** match navigation | Every page change updates URL correctly | CTO | ☐ PASS / ☐ FAIL |
| **TC-919 (Deep links)** work | Direct URL access loads page (no redirect needed) | CTO | ☐ PASS / ☐ FAIL |
| **TC-920 (Invalid URLs)** graceful error | Type `/invalid` → Shows 404 page (not 500) | CTO | ☐ PASS / ☐ FAIL |
| **TC-1001 (Project-specific Business Process #1)** works | [From Phase 3 Tech Spec] — full workflow executed + data verified | CTO/PO | ☐ PASS / ☐ FAIL |
| **TC-1002 (Project-specific Business Process #2)** works | [From Phase 3 Tech Spec] — full workflow executed + data verified | CTO/PO | ☐ PASS / ☐ FAIL |
| **TC-1003 (Project-specific Business Process #3)** works | [From Phase 3 Tech Spec] — full workflow executed + data verified | CTO/PO | ☐ PASS / ☐ FAIL |
| **TC-1004 (Project-specific Edge Case #1)** handled | [Domain-specific edge case] — expected behavior verified | CTO/PO | ☐ PASS / ☐ FAIL |
| **TC-1005 (Project-specific Edge Case #2)** handled | [Domain-specific edge case] — expected behavior verified | CTO/PO | ☐ PASS / ☐ FAIL |
| **TC-1006 (Third-party Integration, if applicable)** works | [Stripe/SendGrid/API] — successful + failure scenarios tested | CTO | ☐ PASS / ☐ FAIL |
| **TC-1007 (Database Consistency, if applicable)** verified | [After business process] — database state matches expected | CTO/DBA | ☐ PASS / ☐ FAIL |
| **≥5 Project-Specific Tests Required** | Minimum 5 tests defined from Phase 3 Tech Spec (not generic) | CTO/PO | ☐ PASS / ☐ FAIL |
| **ALL TESTS** documented in `{ID}_UAT_Test_Results.md` with LIVE evidence (screenshots + logs) | Full report with proof of execution | CDO | ☐ PASS / ☐ FAIL |

**Gate Decision Rule:**
- ANY "☐ FAIL" = Phase 5→6 BLOCKED
- ANY required test marked "☐ PASS" without screenshot evidence = Status PARTIAL (not PASS) = BLOCKED
- ANY project-specific test skipped = Status PARTIAL (not PASS) = BLOCKED
- ALL "☐ PASS" + ALL screenshots + ALL evidence present = CEO can approve Phase 5→6

---

## 👑 PHASE 5.3: BOSS FINAL APPROVAL (King's Signature on Phase 6)

### STEP 6A: BOSS FINAL REVIEW & APPROVAL (Last Gate Before Phase 6)

> **Boss/King Role (FINAL APPROVER ONLY):**
> - Review complete `{ID}_UAT_Test_Results.md` report signed by CDO+COO+CTO
> - Verify all 66+ tests marked ✅ PASS with evidence
> - Approve Phase 5→6 transition OR reject with specific blockers
> - Execute via `protocols/phase-transition.md` 5-step ritual

**IMPORTANT: What Boss/King Does NOT Do:**

| ❌ Boss Should NOT | ✅ CDO/COO/CTO/AI Should Do Instead |
|------------------|-------------------------------------|
| Manually run tests | CDO/COO/CTO execute + provide screenshots |
| Fix broken tools | DevOps/CDO/CTO find workaround or fix infra |
| Take screenshots if browser fails | Use API testing or headless mode alternative |
| Execute test cases themselves | Review reports signed by primary testers |
| Troubleshoot test failures | CDO/COO/CTO debug, document as failed test + workaround |

**Boss Final Review Workflow:**

1. **Receive Report** (from AI Agents / CDO+COO+CTO)
   ```
   File: {ID}_UAT_Test_Results.md
   Status: CDO + COO + CTO signed off ✅
   Evidence: All 66+ tests have screenshots + logs
   ```

2. **Quick Scan (5-10 min)**
   - [ ] Open report, scan for "☐ FAIL" or missing evidence
   - [ ] If ANY FAIL exists → **GATE BLOCKED**, send back to CDO/COO/CTO for fix + retry
   - [ ] If ANY test missing evidence → **GATE BLOCKED**, request evidence
   - [ ] If ALL PASS → Proceed to approval

3. **Verification Questions (for CDO+COO+CTO)**
   - "Are all visual regression tests matching design?" (CDO confirms ✅)
   - "Are all workflows functional?" (COO confirms ✅)  
   - "Are all technical tests passing?" (CTO confirms ✅)
   - "Are all screenshots genuine (not faked)?" (All sign-offs confirm ✅)

4. **Approval Decision**
   ```
   IF all questions answered YES + all signed:
   → Execute: phase-transition.md step 1-5
   → Phase 5→6 gate opens
   → Move to Phase 6 Closeout
   
   IF any question answered NO:
   → Phase 5→6 BLOCKED
   → Send back to CDO/COO/CTO with specific reason
   → They must fix, retry, re-sign report
   → Boss reviews again
   ```

5. **Document Approval** (via heartbeat-update-protocol.md)
   ```bash
   # Boss executes phase-transition.md after approval
   - Updates HEARTBEAT.md with Phase 5→6 approval timestamp
   - Notifies team of Phase 6 start
   - Archives UAT report to compliance folder
   ```

**CEO Sign-Off Template:**

```markdown
## CEO FINAL APPROVAL

**Report:** {ID}_UAT_Test_Results.md
**Date Reviewed:** 2026-04-XX
**Reviewed By:** [CEO Name]

**Verification Checklist:**
- [ ] All 66+ tests: ✅ PASS
- [ ] All required screenshots present
- [ ] CDO signed off on visual/UI tests
- [ ] COO signed off on workflow tests  
- [ ] CTO signed off on technical tests
- [ ] Zero "☐ FAIL" or "☐ PARTIAL" status
- [ ] Zero red flags in console logs
- [ ] Project-specific tests align with Phase 3 spec

**DECISION:**
- ✅ APPROVED: Phase 5→6 gate opens
- ❌ BLOCKED: See specific blockers below

**If BLOCKED — Specific Reason:**
(CDO/COO/CTO: address this and resubmit)

**CEO Signature:** ________________  **Date:** __________
```

---

## Test Case Documentation Format

**All test cases must follow this structure in `{ID}_UAT_Test_Results.md`:**

```markdown
## Test Case TC-XXX: [Title]

**Category:** [Authentication / Workflow / Technical / ErrorHandling / CrossBrowser / Performance]

**Precondition:**
- [Setup steps if needed]

**Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result:**
- [What should happen]

**Actual Result:**
- [What actually happened]

**Evidence:**
- Screenshot: ![](../designs/uat_screenshots/TC-XXX_name.png)
- OR curl output:
```
curl -w "HTTP_CODE:%{http_code}" https://...
HTTP_CODE:200
```

**Status:** ☐ PASS / ☐ FAIL

**Notes:** [Any observations]

---

```

---

## Deliverables for Phase 5

| File | Location | Required? |
|------|----------|-----------|
| `{ID}_UAT_Test_Results.md` | `documents/Phase5_UAT/` | ✅ MUST HAVE |
| All test case screenshots | `designs/uat_screenshots/TC-*.png` | ✅ MUST HAVE |
| API response samples (redacted) | Attach to `{ID}_UAT_Test_Results.md` | ⚠️ Recommended |
| Performance report (if TC-601/602 run) | `documents/Phase5_UAT/` | ⚠️ Recommended |

---

## SLA & Escalation

| Milestone | SLA | Soft Cap | Escalation |
|-----------|-----|----------|------------|
| Per test case | 4 hours | 8 hours | CEO notification |
| All test cases | 4 business days | — | Boss escalation |
| Any FAIL | 24 hours to fix | 2 attempts | Scope Rewind to Phase 4 |

---

## Common Failures & Fixes

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| Login endpoint returns 502 | Backend service down | Check backend server status, restart if needed |
| Login endpoint returns 200 but no redirect | Auth logic broken | Check JWT token generation in backend |
| Error message is "Error" (not specific) | Poor error handling | Update backend to return specific error codes + messages |
| Form data lost after error | No client-side caching | Add localStorage backup of form data |
| Works on desktop, breaks on mobile | Responsive design incomplete | Test mobile viewport in DevTools before deployment |
| Works locally, not on production | Environment config wrong | Check .env variables on production server |

---

## 📊 UAT REPORT DELIVERABLE (What Agents Must Submit)

**Agent Responsibility:** Create and submit UAT report after executing all tests

**Report Filename & Location:**
```
documents/Phase5_UAT/{ID}_UAT_Test_Result.md
```

**Report Template (MUST FOLLOW THIS STRUCTURE):**

```markdown
# UAT Test Results — {ProjectID}

## Executive Summary
- **Project:** {ProjectName}
- **UAT Executed By:** {AgentName/AutomationSystem}
- **UAT Verified By:** {CDO_Name} + {CTO_Name}
- **Execution Date:** {Start_Date} to {End_Date}
- **Total Tests:** 66+
- **Passed:** {Count}
- **Failed:** {Count}
- **Partial/Blocked:** {Count}
- **Overall Status:** ✅ READY FOR PHASE 6 / ❌ ISSUES FOUND
- **Evidence Location:** `designs/uat_screenshots/`

## Test Execution Summary

| Category | Tests | Passed | Failed | Evidence |
|----------|-------|--------|--------|----------|
| Authentication (CAT-1) | 6 | 6 | 0 | TC-101_*.png through TC-106_*.png |
| Workflows (CAT-2) | 3 | 3 | 0 | TC-201_*.png through TC-203_*.png |
| API/Technical (CAT-3) | 5 | 5 | 0 | curl outputs, API response samples |
| Error Handling (CAT-4) | 4 | 4 | 0 | TC-401_*.png through TC-404_*.png |
| Cross-browser (CAT-5) | 8 (2 per browser × 4 browsers) | 8 | 0 | Screenshots: Chrome, Firefox, Safari, Edge |
| Performance (CAT-6) | 2 | 2 | 0 | DevTools screenshots, load time metrics |
| Visual Regression (CAT-7) | 9 (3 per breakpoint × 3 breakpoints) | 9 | 0 | Desktop/Tablet/Mobile layout comparisons |
| Deep Functional (CAT-8) | 16 | 16 | 0 | Data validation, CRUD, state, permissions, edge cases |
| UI Navigation (CAT-9) | 20 | 20 | 0 | Buttons, links, forms, keyboard, URLs |
| Project-Specific (CAT-10) | 7 | 7 | 0 | Business logic per Phase 3 Tech Spec |
| **TOTALS** | **80+** | **80+** | **0** | **ALL 80+ tests executed** |

## Detailed Test Results

### Category 1: Authentication & Authorization

#### TC-101: Valid Login
- **Status:** ✅ PASS
- **Executed By:** {AgentName}
- **Execution Time:** 2026-04-04 09:15 UTC
- **Evidence:**
  - Before: `designs/uat_screenshots/TC-101_before_login.png`
  - After: `designs/uat_screenshots/TC-101_after_login.png`
  - Console: `designs/uat_screenshots/TC-101_console_clean.png` (HTTP 200)
- **Verification:** ✅ Redirected to dashboard ✅ User name displayed ✅ Session valid

[... repeat for TC-102 through TC-1007 ...]

## Agent Execution Notes

- All tests executed on STAGING environment (not local)
- Network DevTools used to verify all HTTP responses (200/201, no 404/500)
- Browser console checked for JavaScript errors (clean)
- Database queries verified using SQL query tool attached in `db_verification/` folder
- Screenshots evidence folder: 80+ images in `designs/uat_screenshots/`
- Test execution log: Timestamped entries showing when each test started/completed
- Any failures retested after fix applied (documented under STEP 5)

## Gate 5→6 Readiness Checklist

- ✅ All 66+ mandatory test cases executed (not skipped)
- ✅ All 66+ screenshots captured (PASS without screenshot = INVALID)
- ✅ Authentication tests (TC-101-106) = 6/6 PASS
- ✅ Visual regression (TC-701-703) = 3/3 PASS + desktop/tablet/mobile screenshots
- ✅ Deep functional (TC-801-816) = 16/16 PASS
- ✅ UI navigation (TC-901-920) = 20/20 PASS
- ✅ Project-specific (TC-1001-1007) = 7/7 PASS
- ✅ Cross-browser (TC-501-502 × 4 browsers) = 8/8 PASS
- ✅ API endpoints (TC-301-305) = 5/5 PASS (HTTP 200)
- ✅ Error handling (TC-401-404) = 4/4 PASS
- ✅ No console errors (DevTools Network tab: 200/201 responses, NO 404/500)
- ✅ Pre-submission checklist completed
- ✅ Phase 3 Tech Spec business processes tested (7+ project-specific tests)

## Sign-Off

**Agent Execution Completed:** {Date} {Time} UTC
**Submitted By:** {AgentName/System}

### Verification Sign-Off (Human Review Required)

**CDO Review:**
- [ ] Spot-checked visual regression screenshots
- [ ] Verified project-specific business logic tests
- [ ] Signed: _____________ Date: _______

**CTO Review:**
- [ ] Verified technical tests (API, database, errors)
- [ ] Verified cross-browser test evidence
- [ ] Signed: _____________ Date: _______

**CEO Final Approval (via phase-transition.md):**
- After CDO + CTO sign-off above
- CEO approves Phase 5→6 gate transition
- HEARTBEAT.md updated automatically

---

## If Any Tests FAIL (Return to Phase 5)

**Remediation Process:**
1. Identify failed test(s) from report above
2. Root cause analysis (bug in code, test data issue, environment config?)
3. Fix applied in Phase 5 (by developers)
4. Re-execute failed test(s) with agent
5. Update this report with retry results
6. Return to verification sign-off above

Example retry documentation:
```
## TC-1001: Process Payment — FAILED (RETRIED & FIXED)

### First Execution (FAILED)
- Status: ❌ FAIL
- Error: Stripe webhook not received
- Screenshot: `TC-1001_retry_1_fail.png`

### Root Cause
- Webhook endpoint not registered on production
- CTO fixed: Added webhook URL in Stripe dashboard

### Retry (PASSED)
- Status: ✅ PASS
- Screenshot: `TC-1001_retry_2_pass.png`
- Verified: Webhook received, order marked paid in DB
```

---
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.4 | 2026-04-04 | Clarified: AGENTS execute UAT + write report, CDO+CTO verify+sign. Added UAT Report template. |
| v1.3 | 2026-04-04 | Added Category 10: Project-Specific Functional Tests + Agent Execution Workflow (STEP 1-6) |
| v1.0 | 2026-04-03 | Initial UAT protocol with 6 mandatory test categories + requirement matrix |
