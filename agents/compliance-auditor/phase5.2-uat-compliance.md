# Phase 5.2 UAT Compliance Checklist

> **Gate:** Phase 5.2 (UAT Execution) → Phase 5.3 (Boss Final Approval)
> **Compliance Auditor Function:** Verify all 66+ tests executed with proper evidence & sign-offs
> **Gate Status:** BLOCK if ANY critical requirement missing

---

## 📋 Executive Checklist

**Total Requirements:** 66+ test cases + 3 sign-offs + Evidence collection

**Compliance Status:**
- [ ] All 66+ test cases present in report
- [ ] CDO sign-off present with timestamp
- [ ] COO sign-off present with timestamp
- [ ] CTO sign-off present with timestamp
- [ ] Every test has evidence (screenshot/log)
- [ ] No tests marked PASS without evidence
- [ ] TC-1001-1007 (project-specific) fully defined & executed

---

## 🔴 CRITICAL BLOCKERS (Must PASS)

### **Blocker 1: Missing COO Sign-Off**
```
Requirement: COO_SIGNED with timestamp must appear in report

Check:
  [ ] Report contains: "COO_SIGNED: [timestamp]" or "COO signature: [name] [date]"
  
If Missing:
  ❌ BLOCK GATE — COO did not verify workflow tests
  Action: Send back to COO with instructions to:
    1. Review TC-201-203 (workflow tests)
    2. Review TC-1001-1007 (project-specific tests)
    3. Add signature: "COO_SIGNED_[timestamp]"
```

### **Blocker 2: Missing CTO Sign-Off**
```
Requirement: CTO_SIGNED with timestamp must appear in report

Check:
  [ ] Report contains: "CTO_SIGNED: [timestamp]" or "CTO signature: [name] [date]"
  
If Missing:
  ❌ BLOCK GATE — CTO did not verify technical tests
  Action: Send back to CTO with instructions to:
    1. Review TC-101-106 (auth), TC-301-305 (API), TC-801-816 (CRUD)
    2. Review all technical test results
    3. Add signature: "CTO_SIGNED_[timestamp]"
```

### **Blocker 3: Missing CDO Sign-Off**
```
Requirement: CDO_SIGNED with timestamp must appear in report

Check:
  [ ] Report contains: "CDO_SIGNED: [timestamp]" or "CDO signature: [name] [date]"
  
If Missing:
  ❌ BLOCK GATE — CDO did not verify visual/UI tests
  Action: Send back to CDO with instructions to add signature
```

### **Blocker 4: TC-1001-1007 Not Filled**
```
Requirement: Project-specific tests (TC-1001-1007) must be defined & executed

Check:
  [ ] Report contains filled entries for:
      - TC-1001: [Business process description]
      - TC-1002: [Business process description]
      - TC-1003+: [Continues through TC-1007]
  [ ] Each test has: Steps, Expected Result, Evidence, Owner
  
If Missing:
  ❌ BLOCK GATE — Phase 5.2 STEP 1 never completed
  Action: Send back to CDO+COO with instructions to:
    1. Complete Phase 5.2 STEP 1 (Preparation)
    2. Compare Phase 2 requirements with Phase 4 implementation
    3. Fill TC-1001-1007 with actual business processes
    4. Get Phase 4 implementation evidence
    5. Fill template for each test
```

### **Blocker 5: Tests Missing Evidence**
```
Requirement: Any test marked PASS must have screenshot/log evidence

Check:
  For each test in report marked "✅ PASS":
    [ ] Screenshot or log file referenced
    [ ] File path correct: designs/uat_screenshots/ or documents/...
    [ ] File actually exists (not just mentioned)
    [ ] Evidence matches test (e.g., TC-101 login screenshot shows login page)
  
If Missing:
  ❌ BLOCK GATE — Cannot verify test actually ran
  Action: Send back with specific tests needing evidence:
    "TC-101 marked PASS but no screenshot evidence. 
     Either: (1) add screenshot, OR (2) mark as PARTIAL"
```

---

## 🟡 WARNINGS (Manual Review Needed)

### **Warning 1: Only Partial Test Coverage**
```
Condition: Less than 66 tests completed (e.g., only 50 tests)

Check:
  [ ] Count total test cases in report
  If < 66:
    🟡 FLAG FOR MANUAL REVIEW
    Message: "Only 45/66 tests completed (68% coverage)"
    Decision needed from: Boss or CEO
    Options:
      A) Approve anyway (risky)
      B) Send back to agents to complete remaining tests (recommended)
```

### **Warning 2: Cross-Browser Testing Incomplete**
```
Condition: TC-501-502 shows only 1-2 browsers tested (should be 4+)

Check:
  [ ] TC-501 mentions: Chrome, Firefox, Safari, Edge or Mobile
  If only < 3 browsers:
    🟡 FLAG FOR MANUAL REVIEW
    Message: "Only tested on Chrome + Firefox, missing Safari/Mobile"
    Decision needed from: Boss
```

### **Warning 3: Visual Regression No Design Comparison**
```
Condition: TC-701-703 has screenshots but no design comparison

Check:
  [ ] Screenshots exist (01-desktop.png, 02-tablet.png, 03-mobile.png)
  [ ] Report mentions "matches design spec" or shows side-by-side comparison
  If missing comparison:
    🟡 FLAG FOR MANUAL REVIEW
    Message: "Screenshots provided but no comparison to design. 
              Manual verification needed by designer."
```

### **Warning 4: Project-Specific Tests Marked PARTIAL**
```
Condition: TC-1001-1007 filled but some marked "PARTIAL" or "PENDING"

Check:
  [ ] Any test marked "☐ PARTIAL" or "⏳ PENDING"
  If found:
    🟡 FLAG FOR MANUAL REVIEW
    Message: "TC-1002 marked PARTIAL. Needs re-execution or clarification."
```

---

## ✅ PASSING REQUIREMENTS (Must ALL be met)

### **Requirement 1: 66+ Test Cases Documented**
```
Expected: Report shows 59+ comprehensive tests across 10 categories

Categories to verify:
  [ ] TC-101-106: Authentication (6 tests)
  [ ] TC-201-203: Workflows (3 tests)
  [ ] TC-301-305: API (5 tests)
  [ ] TC-401-404: Error Handling (4 tests)
  [ ] TC-501-502: Cross-Browser/Device (2+ tests)
  [ ] TC-601-602: Performance (2 tests)
  [ ] TC-701-703: Visual Regression (3 tests)
  [ ] TC-801-816: Deep Functional CRUD (16 tests)
  [ ] TC-901-920: UI Navigation (20 tests)
  [ ] TC-1001-1007: Project-Specific (7+ tests)

Verification:
  [ ] Count total tests in report
  [ ] Should be ≥ 66 tests
  [ ] All tests have status: ✅ PASS or ❌ FAIL
```

### **Requirement 2: All Tests Have Evidence**
```
Expected: Every test marked ✅ PASS has screenshot or log proof

Verification:
  For each required category:
    [ ] TC-101: Screenshot of login page? ✅
    [ ] TC-201: Screenshot of workflow execution? ✅
    [ ] TC-301: API response (curl or JSON output)? ✅
    [ ] TC-701: Desktop screenshot vs design comparison? ✅
    [ ] TC-901: Navigator button click evidence? ✅
    [ ] TC-1001: Business process workflow screenshots? ✅
    
Rule: If test marked PASS but no evidence shown:
  → Status = INVALID (not PASS)
  → Count as blocker
```

### **Requirement 3: CDO Coverage Complete**
```
Expected: CDO has executed all visual/design tests

Minimum tests CDO must do:
  [ ] TC-701: Desktop Visual Regression (1920×1080)
      Screenshot vs Design Spec: ✅
  [ ] TC-702: Tablet Visual Regression (768×1024)
      Responsive layout verified: ✅
  [ ] TC-703: Mobile Visual Regression (375×812)
      Mobile layout verified: ✅
  [ ] TC-901-920: UI Navigation (20 tests minimum)
      Every button/link/form tested: ✅
  [ ] TC-913-915: Hover states, click audit, dead zones
      All UI elements functional: ✅

Verification:
  [ ] Report shows CDO completed minimum 24 tests (design/UI)
  [ ] CDO_SIGNED present in report
```

### **Requirement 4: COO Coverage Complete**
```
Expected: COO has executed workflow & business logic tests

Minimum tests COO must do:
  [ ] TC-201: Primary User Workflow
      Full user journey tested: ✅
  [ ] TC-202: Secondary Workflow  
      Alternative path tested: ✅
  [ ] TC-203: Multi-Step Workflow
      Complex workflow tested: ✅
  [ ] TC-1001-1007: Project-Specific (7 tests)
      ALL filled with actual business processes: ✅
      Each has steps + expected result + evidence: ✅

Verification:
  [ ] Report shows COO completed minimum 10 tests (workflows + business logic)
  [ ] COO_SIGNED present in report
  [ ] TC-1001-1007 are NOT empty templates
```

### **Requirement 5: CTO Coverage Complete**
```
Expected: CTO has executed technical tests

Minimum tests CTO must do:
  [ ] TC-101-106: Authentication (6 tests)
      Login, invalid password, session, rate limit, logout, re-login: ✅
  [ ] TC-301-305: API Testing (5 tests)
      Endpoints return 200, response format correct, error handling: ✅
  [ ] TC-401-404: Error Handling (4 tests)  
      Network errors, server errors, user-friendly messages: ✅
  [ ] TC-501-502: Cross-Browser (2+ tests)
      At least 3 browsers tested: ✅
  [ ] TC-601-602: Performance (2 tests)
      Page load time, response time: ✅
  [ ] TC-801-816: CRUD Operations (16 tests)
      Create, Read, Update, Delete, data integrity: ✅

Verification:
  [ ] Report shows CTO completed minimum 32 tests (technical)
  [ ] CTO_SIGNED present in report
  [ ] All auth, API, CRUD tests have technical evidence (curl output, JSON, database query results)
```

### **Requirement 6: Project-Specific Tests Defined**
```
Expected: TC-1001-1007 are NOT empty placeholders

For each test TC-1001 through TC-1007:
  [ ] Test description filled (not "[YOUR PROCESS #1]" template)
  [ ] Steps to execute provided (minimum 3 steps)
  [ ] Expected result described
  [ ] Evidence provided (screenshot, log, or database result)
  [ ] Owner assigned (CDO/COO/CTO)
  [ ] Status: ✅ PASS or ❌ FAIL (not left empty)

Example of VALID TC-1001:
  ```
  ✓ TC-1001: E-Commerce Checkout with Credit Card
    Steps:
    1. Add product to cart
    2. Click Checkout
    3. Enter payment: 4242 4242 4242 4242
    4. Click "Place Order"
    
    Expected: Order created, email sent, payment processed
    Evidence: Order #12345 in database, email receipt
    Owner: COO (business) + CTO (payment verification)
    Status: ✅ PASS
  ```

Example of INVALID TC-1001:
  ```
  ✓ TC-1001: [YOUR PROCESS #1]
  
  Steps: [Not filled]
  Expected: [Not filled]
  Status: [Left empty]
  ```

Check:
  [ ] None of TC-1001-1007 left blank or as template
  [ ] Each has at minimum: Description + Steps + Expected + Evidence + Owner
```

### **Requirement 7: Failed Tests Properly Handled**
```
Expected: Any test marked ❌ FAIL has documentation of:
  1. What failed
  2. Why it failed (root cause)
  3. How it was fixed (if retested)
  4. Final status (re-tested result)

For each failed test:
  [ ] Error documented with screenshot
  [ ] Root cause identified
  [ ] Fix applied (if applicable)
  [ ] Retest status (Pass/Fail)
  
If test remains FAIL:
  ❌ GATE BLOCKED — Cannot proceed with failed tests
  Action: Send back to responsible team (CDO/COO/CTO) to:
    1. Fix the bug
    2. Re-execute test
    3. Mark result as passed or document permanent failure
```

---

## 📊 Compliance Calculation

```
Total Requirements: 66+ tests + 3 sign-offs + Evidence

Scoring:
  ✅ PASS = 100% compliance (all 66+ tests + all 3 sigs + all evidence)
  🟡 WARN = 90-99% compliance (minor gaps, manual review needed)
  ❌ BLOCK = < 90% compliance (critical gaps, cannot proceed)

Example Calculation:
  66 tests done: 66 points
  CDO signed: 1 point
  COO signed: 1 point
  CTO signed: 1 point
  All evidence present: 5 points
  
  Total: 74/74 = 100% → ✅ PASS
  
  If COO not signed: 73/74 = 98% → 🟡 WARN (upgrade to ❌ BLOCK because COO sig is critical)
  If 40 tests done: 40/74 = 54% → ❌ BLOCK
```

---

## 🔄 Audit Process

### **Step 1: Load Requirements**
Read this checklist (phase5.2-uat-compliance.md)

### **Step 2: Load Actual Report**
Read the submitted UAT report: `{ID}_UAT_Test_Report.md`

### **Step 3: Check Critical Blockers**
For each blocker, verify:
- [ ] Blocker 1: COO signed? If NO → ❌ BLOCK
- [ ] Blocker 2: CTO signed? If NO → ❌ BLOCK
- [ ] Blocker 3: CDO signed? If NO → ❌ BLOCK
- [ ] Blocker 4: TC-1001-1007 filled? If NO → ❌ BLOCK
- [ ] Blocker 5: All evidence present? If NO → ❌ BLOCK

### **Step 4: Count Test Coverage**
- [ ] Count total tests in report
- [ ] Categorize by owner (CDO/COO/CTO)
- [ ] Verify minimum coverage per owner

### **Step 5: Check Warnings**
- [ ] Canvas coverage < 66 tests?
- [ ] Only 1-2 browsers tested?
- [ ] No design comparison?

### **Step 6: Generate Report**
```
IF any blocker found:
  → Status: ❌ BLOCK
  → Generate: AUDIT_REPORT_BLOCK_[timestamp].md
  → Send back to teams with remediation checklist

IF only warnings found:
  → Status: 🟡 WARN
  → Generate: AUDIT_REPORT_WARN_[timestamp].md
  → Escalate to Boss/CEO for manual decision

IF all requirements met:
  → Status: ✅ PASS
  → Generate: AUDIT_REPORT_PASS_[timestamp].md
  → Approve gate → Move to Phase 5.3
```

---

## ✅ Gate Approval

**PASS Criteria:**
- ✅ All 3 sign-offs present (CDO, COO, CTO)
- ✅ 66+ tests documented
- ✅ Every test marked PASS has evidence
- ✅ TC-1001-1007 filled with real processes
- ✅ No critical blockers

**Result:** ✅ APPROVED → Phase 5.3 (Boss Final Review)

---

*Last Updated: 2026-04-04*  
*Compliance Standard: Phase 5.2 UAT Execution*  
*Reference: phase5-uat-protocol.md v1.6*
