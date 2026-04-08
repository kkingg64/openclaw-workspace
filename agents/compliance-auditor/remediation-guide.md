# Phase 5.2 UAT Remediation Guide

> **Purpose:** When Compliance Auditor finds issues, use this guide to fix them
> **Audience:** CDO, COO, CTO agents (whoever needs to fix the findings)
> **Timeline:** Must complete within 24 hours to avoid deadline delay

---

## 🔴 CRITICAL BLOCKER FIXES

### **Fix #1: Missing COO Sign-Off**

**The Problem:**
```
Compliance Auditor found:
  ❌ COO_SIGNED not present in report
  ❌ COO did not verify TC-201-203 (workflow tests)
  ❌ COO did not verify TC-1001-1007 (project-specific tests)
```

**The Fix:**

**For: COO Agent**

```
Step 1: Review Workflow Tests
  [ ] Open report and read: TC-201, TC-202, TC-203
  [ ] Verify that EACH test:
      - Has clear steps that were executed
      - Has expected result that matches actual
      - Has evidence (screenshot of workflow progress)
      
Step 2: Review Project-Specific Tests  
  [ ] Open report and read: TC-1001 through TC-1007
  [ ] Verify that EACH test:
      - Describes an actual business process (not template)
      - Has step-by-step execution documented
      - Has evidence showing success
      - Aligns with Phase 4 implementation (not Phase 2 assumptions)

Step 3: Review Test Failures (if any)
  [ ] For any test marked ❌ FAIL:
      - Verify root cause is documented
      - Verify fix was applied (if applicable)
      - If bug found, verify issue was filed for CTO to fix
      
Step 4: Add Signature
  [ ] Add to report:
      
      ## COO Sign-Off
      
      I, [COO Name/ID], verify that:
      - All workflow tests (TC-201-203) have been executed
      - All project-specific tests (TC-1001-1007) match Phase 4 implementation
      - All evidence is authentic and verifiable
      - I take responsibility for these test results
      
      **COO_SIGNED:** [Your agent ID]_[timestamp]
      **Date:** [Date]
      **Verified By:** [Signature or name]

Step 5: Resubmit Report
  [ ] Save updated report
  [ ] Notify Compliance Auditor: "Phase 5.2 UAT updated with COO sign-off"
  [ ] Auditor will re-run compliance check
```

---

### **Fix #2: Missing CTO Sign-Off**

**The Problem:**
```
Compliance Auditor found:
  ❌ CTO_SIGNED not present in report
  ❌ CTO did not verify TC-101-106, TC-301-305, TC-801-816
  ❌ No technical test evidence (API responses, database queries, curl output)
```

**The Fix:**

**For: CTO Agent**

```
Step 1: Verify Authentication Tests (TC-101-106)
  [ ] Test 1: Login with valid credentials
      Evidence: Screenshot showing login success + session cookie in Network tab
  [ ] Test 2: Login with invalid password
      Evidence: Screenshot showing error message (e.g., "Invalid credentials")
  [ ] Test 3: Session timeout
      Evidence: Screenshot showing redirect to login after 30 min idle
  [ ] Test 4: Rate limiting
      Evidence: Screenshot/log showing "Too many attempts, try again later"
  [ ] Test 5: Logout
      Evidence: Screenshot showing session cleared + redirect to login  
  [ ] Test 6: Re-login after logout
      Evidence: Successful login with fresh session

Step 2: Verify API Tests (TC-301-305)
  [ ] Test 1: GET endpoint returns 200
      Evidence: curl output showing "HTTP/1.1 200 OK"
  [ ] Test 2: Response format correct (JSON)
      Evidence: curl output or Postman screenshot of JSON response
  [ ] Test 3: Error response (400/401/403)
      Evidence: curl output showing error status + error message
  [ ] Test 4: Rate limiting on API
      Evidence: 429 Too Many Requests after repeated calls
  [ ] Test 5: CORS/auth headers correct
      Evidence: curl -v output showing Authorization: Bearer token

Step 3: Verify CRUD Operations (TC-801-816)
  [ ] CREATE: Insert new record
      Evidence: 
        - curl POST ... output showing 201 Created
        - SQL SELECT showing record exists in database
  [ ] READ: Retrieve record
      Evidence: curl GET /id output showing record data
  [ ] UPDATE: Modify record
      Evidence: SQL query before/after showing field changed
  [ ] DELETE: Remove record  
      Evidence: curl DELETE /id output + SQL SELECT showing gone
  [ ] Data Integrity: No orphaned records
      Evidence: SQL query showing referential integrity maintained

Step 4: Verify Error Handling (TC-401-404)
  [ ] Network error handled gracefully
      Evidence: Screenshot showing user-friendly error message
  [ ] Server error (500) handled gracefully
      Evidence: No stack trace exposed to user
  [ ] Invalid input rejected
      Evidence: Validation error message shown

Step 5: Add Signature
  [ ] Add to report:
  
      ## CTO Sign-Off
      
      I, [CTO Name/ID], verify that:
      - All authentication tests (TC-101-106) have been executed & verified
      - All API endpoint tests (TC-301-305) return correct responses
      - All CRUD operations (TC-801-816) maintain data integrity
      - All error handling (TC-401-404) is user-friendly
      - All evidence (curl outputs, screenshots, SQL queries) is authentic
      - I take responsibility for these technical test results
      
      **CTO_SIGNED:** [Your agent ID]_[timestamp]
      **Date:** [Date]
      **Verified By:** [Signature or name]

Step 6: Resubmit Report
  [ ] Save updated report with all technical evidence
  [ ] Notify Compliance Auditor: "Phase 5.2 UAT updated with CTO sign-off"
```

---

### **Fix #3: Missing CDO Sign-Off**

**The Problem:**
```
Compliance Auditor found:
  ❌ CDO_SIGNED not present in report
  ❌ CDO did not verify visual regression tests
  ❌ No design comparison evidence
```

**The Fix:**

**For: CDO Agent**

```
Step 1: Verify Visual Regression (TC-701-703)
  [ ] Desktop (1920×1080):
      Evidence: Side-by-side screenshot: 
        - Left: Deployed page screenshot
        - Right: Design spec screenshot
      Verification: Layout, typography, colors, spacing match spec
      
  [ ] Tablet (768×1024):
      Evidence: Screenshot showing responsive design on tablet
      Verification: No layout breaks, all content visible
      
  [ ] Mobile (375×812):
      Evidence: Screenshot showing responsive design on mobile
      Verification: No horizontal scroll, readable text, touch targets 45px+

Step 2: Verify UI Navigation (TC-901-920)
  [ ] Every button tested:
      Evidence: Screenshots or interaction log showing:
        - Button click triggers expected action
        - Visual feedback (hover state, loading state)
        - No broken links
        
  [ ] Every link tested:
      Evidence: href attributes verified, URLs correct, no 404s
      
  [ ] Every form tested:
      Evidence: Form submission works, validation messages shown, data persisted
      
  [ ] Keyboard navigation:
      Evidence: Tab key navigates through all controls in logical order
      Enter/Space trigger buttons correctly

Step 3: Verify Hover States & Interactions
  [ ] All interactive elements have hover states
      Evidence: Screenshot showing color change, underline, shadow on hover
      
  [ ] Click audit: Every clickable area intentional
      Evidence: No dead zones, no accidental click targets
      
  [ ] Loading states: Feedback visible during operations
      Evidence: Screenshot showing spinner/loading message

Step 4: Add Signature  
  [ ] Add to report:
  
      ## CDO Sign-Off
      
      I, [CDO Name/ID], verify that:
      - All visual regression tests (TC-701-703) match design spec
      - All UI navigation tests (TC-901-920) are functional
      - All interactive elements have proper states (hover, active, disabled)
      - All screenshots are authentic and unaltered
      - Responsive design works on desktop, tablet, and mobile
      - I take responsibility for these design verification results
      
      **CDO_SIGNED:** [Your agent ID]_[timestamp]
      **Date:** [Date]
      **Verified By:** [Signature or name]

Step 5: Resubmit Report
  [ ] Save updated report with design comparison screenshots
  [ ] Notify Compliance Auditor: "Phase 5.2 UAT updated with CDO sign-off"
```

---

### **Fix #4: TC-1001-1007 Not Filled**

**The Problem:**
```
Compliance Auditor found:
  ❌ TC-1001-1007 left as empty templates
  ❌ Phase 5.2 STEP 1 (Preparation) never completed
  ❌ Project-specific business processes not defined
```

**The Fix:**

**For: CDO + COO**

```
TIMELINE: Must complete within 4 hours

Step 1: Get Phase 2 Requirements (1 hour)
  [ ] Open: documents/Phase2_Design/{ID}_UAT_Test_Case.md
  [ ] List all business processes that were in original spec
      Example:
        - User can create new project
        - User can invite team members
        - Admin can set permissions
        - System sends email notifications
        
  [ ] Document: Each process + expected behavior

Step 2: Compare with Phase 4 Implementation (1 hour)
  [ ] Open: Phase 3 Technical Spec ({ID}_Technical_Spec.md)
  [ ] Check: WHICH Phase 2 processes were actually implemented?
      - ✅ Created in Phase 4? (check code + database schema)
      - ❌ Skipped? (feature was cut)
      - 🔄 Changed? (implementation differs from spec)
      
  [ ] Document findings in each row

Step 3: Fill TC-1001-1007 Template (1.5 hours)

For EACH business process (TC-1001 through TC-1007):

  For TC-1001:
    Title: [Project-specific business process #1]
    
    ✓ TC-1001: [Business Process Name from Phase 3]
    
    **What is this testing?**
    [One sentence describing why this process is critical]
    Example: "User checkout flow — if broken, no revenue"
    
    **Steps to Execute:**
    1. [Setup: What user role? What preconditions?]
    2. [Action 1: What user does]
    3. [Action 2: System responds]
    4. [Verification 1: Expected outcome]
    5. [Verification 2: Data checked]
    
    Example for E-Commerce:
    1. Login as customer
    2. Add product to cart
    3. Click "Checkout"
    4. Verify: Shipping form appears
    5. Verify: Total price calculated
    
    **Expected Result:**
    [What should happen if test PASS]
    Example: "Order created, payment processed, confirmation email sent"
    
    **Evidence:**
    [Proof that this actually happened - screenshots, database query, email receipt]
    Example:
      - Screenshot: Order confirmation page showing order #12345
      - Email: Received subject "Your order has been confirmed"
      - Database: SELECT * FROM orders WHERE id=12345 shows status='paid'
    
    **Owner (from Assignment Matrix):**
    [Who tested this: CDO/COO/CTO]
    Example: COO (business process) + CTO (payment verification)
    
    **Status:**
    ☑️ PASS — All steps executed, evidence confirms success
    or
    ❌ FAIL — [Describe what failed] [Document fix] [Re-test result]

  Repeat for TC-1002 through TC-1007

  Minimum 7 processes to test:
    [ ] TC-1001: Primary business process
    [ ] TC-1002: Secondary business process
    [ ] TC-1003: Third critical process
    [ ] TC-1004: Edge case handling
    [ ] TC-1005: Edge case handling #2
    [ ] TC-1006: [Third-party integration if applicable]
    [ ] TC-1007: [Data consistency verification]

Step 4: Gather Evidence (30 minutes)
  [ ] For EACH TC-1001-1007:
      - Screenshot of step execution
      - Screenshot of expected result
      - Database query output (if applicable)
      - API response log (if applicable)
      - Error message (if testing error case)
      
  [ ] Save all evidence in: designs/uat_screenshots/
      Naming: TC-1001_step1.png, TC-1001_expected.png, etc.

Step 5: Get Sign-Offs
  [ ] COO reviews all TC-1001-1007
      - Question: "Does this match Phase 4 actual implementation?"
      - If YES: COO signs this section
      - If NO: Discuss with CTO, update test, re-execute
      
  [ ] CTO reviews technical aspects (payments, integrations, database)
      - Question: "Is the technical verification correct?"
      - If YES: CTO signs this section
      - If NO: Update test, re-execute

Step 6: Resubmit Report
  [ ] Save updated report with TC-1001-1007 fully filled
  [ ] Include all evidence screenshots
  [ ] Include COO + CTO verification notes
  [ ] Notify Compliance Auditor: "Phase 5.2 UAT updated with TC-1001-1007"
```

---

### **Fix #5: Missing Evidence**

**The Problem:**
```
Compliance Auditor found:
  ❌ Tests marked ✅ PASS but no screenshot/log evidence
  ❌ Evidence file path mentioned but file doesn't exist
  ❌ Evidence doesn't match test (e.g., TC-101 login test but screenshot shows dashboard)
```

**The Fix:**

**For: Responsible Owner (CDO/COO/CTO)**

```
Step 1: Identify Missing Evidence Tests
  [ ] Find each test marked ✅ PASS
  [ ] Check: Is there evidence file referenced?
  [ ] Check: Does file exist at that path?
  [ ] Check: Does evidence match the test?

Step 2: For EACH missing evidence test:

Option A: ADD EVIDENCE
  - Re-execute the test (if bug was in test execution)
  - Capture screenshot during execution
  - Save to: designs/uat_screenshots/TC-[XXX]_evidence.png
  - Reference in report: "See: designs/uat_screenshots/TC-101_login_success.png"

Option B: CHANGE STATUS TO PARTIAL
  - If cannot re-execute or evidence is unclear
  - Change: ✅ PASS → ☐ PARTIAL
  - Add note: "Could not reproduce evidence, marked PARTIAL pending re-verification"
  - Include why can't provide evidence

Option C: RE-EXECUTE & FIX
  - If test was skipped or incompletely executed
  - Fully execute the test
  - Capture all steps
  - Provide complete evidence
  - Mark as: ✅ PASS with date of re-execution

Step 3: Update Report
  [ ] For each test fixed:
      Before: "TC-101: ✅ PASS [no evidence]"
      After: "TC-101: ✅ PASS [Screenshot: designs/uat_screenshots/TC-101_login.png]"

Step 4: Resubmit
  [ ] Save updated report
  [ ] Upload all evidence screenshots to correct folders
  [ ] Verify all file paths are correct
  [ ] Notify Auditor: "Evidence added for [X] tests"
```

---

## 🟡 WARNING FIXES

### **Warning: Incomplete Test Coverage (< 66 tests)**

**The Problem:**
```
Compliance Auditor warning:
  🟡 Only 45/66 tests executed (68% coverage)
  🟡 Missing full cross-browser testing
  🟡 Missing some UI navigation tests
```

**The Fix:**

```
Step 1: Identify Missing Tests
  [ ] Compare: Expected 66+ vs Actual # executed
  [ ] List specific tests NOT in report:
      Example: TC-401 NOT done, TC-402 NOT done, etc.

Step 2: For Each Missing Test
  [ ] Understand: Why was it skipped?
      - Tool broke?
      - Too time-consuming?
      - Blocker dependency?
      
  [ ] Plan: How to complete it?
      - Fix tool + re-run?
      - Use alternative method?
      - Escalate blocker?

Step 3: Execute Missing Tests
  [ ] Run each missing test
  [ ] Document steps + result
  [ ] Capture evidence (screenshot/log)

Step 4: Add to Report
  [ ] Include in appropriate category section
  [ ] Mark: ✅ PASS or ❌ FAIL with timestamp

Step 5: Resubmit
  [ ] Coverage should now be ≥ 66 tests
  [ ] Auditor re-checks, warning removed
```

---

## 📋 Remediation Checklist Template

**When Auditor sends back for fixes, use this template:**

```markdown
# Phase 5.2 UAT Remediation Checklist

Project: P2026-008
Date Issued: 2026-04-04
Deadline: 2026-04-05 (24 hours)

## Required Fixes

### Fix #1: Missing COO Sign-Off
- [ ] COO reviewed TC-201-203
- [ ] COO reviewed TC-1001-1007  
- [ ] COO verified all evidence authentic
- [ ] COO added signature to report
- Status: [NOT STARTED / IN PROGRESS / COMPLETE]

### Fix #2: Missing CTO Sign-Off
- [ ] CTO reviewed TC-101-106 (auth)
- [ ] CTO reviewed TC-301-305 (API)
- [ ] CTO reviewed TC-801-816 (CRUD)
- [ ] CTO verified all API responses
- [ ] CTO added signature to report
- Status: [NOT STARTED / IN PROGRESS / COMPLETE]

### Fix #3: TC-1001-1007 Not Filled
- [ ] CDO+COO completed Phase 5.2 STEP 1
- [ ] Compared Phase 2 vs Phase 4
- [ ] Filled TC-1001 with actual process
- [ ] Filled TC-1002-1007 with actual processes (minimum 7)
- [ ] Got COO approval on project-specific tests
- [ ] Got CTO approval on technical aspects
- [ ] Added all evidence screenshots
- Status: [NOT STARTED / IN PROGRESS / COMPLETE]

### Fix #4: Missing Evidence
- [ ] Added screenshot for TC-101 (login)
- [ ] Added screenshot for TC-201 (workflow)
- [ ] Added screenshot for TC-701 (desktop visual)
- [ ] Added database query for TC-801 (CRUD)
- [ ] Added curl output for TC-301 (API)
- Status: [NOT STARTED / IN PROGRESS / COMPLETE]

## Completion Checklist
- [ ] All fixes completed
- [ ] Report updated
- [ ] All evidence files uploaded to correct folder
- [ ] All 3 sign-offs present (CDO, COO, CTO)
- [ ] Ready for re-audit

## Sign-Off
- CDO: ____________________ Date: ________
- COO: ____________________ Date: ________
- CTO: ____________________ Date: ________
- Ready for re-audit by Compliance Auditor: ✅
```

---

## ⏱ Timeline

| Task | Owner | Deadline | Est. Time |
|------|-------|----------|-----------|
| Fix missing COO sign-off | COO | 1 hour | 30 min |
| Fix missing CTO sign-off | CTO | 1 hour | 45 min |
| Fix missing CDO sign-off | CDO | 1 hour | 30 min |
| Fill TC-1001-1007 | CDO+COO | 4 hours | 2 hours |
| Add missing evidence | All | 2 hours | 1 hour |
| Re-audit by Compliance | Auditor | 30 min | automatic |
| **TOTAL** | - | **24 hours** | ~5.5 hours |

---

*Last Updated: 2026-04-04*  
*Reference: phase5.2-uat-compliance.md*
