# Phase 5 → 6 Gate Requirements (v1.0)

> **Purpose:** Clearly document what must PASS for Phase 5 UAT gate to open to Phase 6
> **Version:** v1.0 (2026-04-04)
> **Gate:** 5→6
> **Owner:** CDO + CTO
> **Verifier:** CEO
> **SLA:** UAT test results must be submitted within 4 business days of Phase 5→4.5 gate opening
> **Referenced from:** `protocols/phase-gates.md` (row: 5→6)
> **Related:** `protocols/phase5-uat-protocol.md` (v1.3 — MANDATORY testing protocol)

---

## ✅ What MUST PASS (Blockers)

**GATE FAILS if ANY of these are TRUE:**

### 🔴 CRITICAL BLOCKERS (Must Pass Everything)

| # | Category | Test Cases | Blocker Rule |
|---|----------|-----------|--------------|
| 1 | **Authentication** | TC-101 to TC-106 (6 tests) | Any TC fails → GATE BLOCKS |
| 2 | **Visual Regression** | TC-701 to TC-703 (desktop/tablet/mobile) | Skipped = GATE BLOCKS<br/>No screenshots = GATE BLOCKS<br/>Layout != design = GATE BLOCKS |
| 3 | **Deep Functional** | TC-801 to TC-816 (16 tests) | Data validation FAIL → GATE BLOCKS<br/>CRUD operations FAIL → GATE BLOCKS<br/>State management issues → GATE BLOCKS<br/>Permission bugs → GATE BLOCKS<br/>Edge cases uncovered → GATE BLOCKS |
| 4 | **UI Navigation** | TC-901 to TC-920 (20 tests) | Any button doesn't work → GATE BLOCKS<br/>Any link broken (404) → GATE BLOCKS<br/>Form submission fails → GATE BLOCKS<br/>Keyboard navigation broken → GATE BLOCKS |
| 5 | **Project-Specific** | TC-1001 to TC-1007 (7+ tests) | Fewer than 5 tests defined → GATE BLOCKS<br/>Project tests skipped → GATE BLOCKS<br/>Domain logic failures → GATE BLOCKS |
| 6 | **Execution Evidence** | Screenshots + Logs + DB Verification | No screenshots = GATE BLOCKS<br/>No console logs = GATE BLOCKS<br/>No database verification = GATE BLOCKS<br/>Tests marked PASS without screenshot = INVALID = **GATE BLOCKS** |
| 7 | **Cross-browser** | TC-501 to TC-502 (2+ browsers) | Chrome test FAIL → GATE BLOCKS<br/>Firefox test FAIL → test counts as PARTIAL<br/>Safari test FAIL → test counts as PARTIAL |
| 8 | **API Endpoints** | TC-301 to TC-305 (5 tests) | Any endpoint ≠ HTTP 200 → GATE BLOCKS<br/>Response format invalid → GATE BLOCKS<br/>Error messages unclear → GATE BLOCKS |
| 9 | **Core Workflows** | TC-201 to TC-203 (3 tests) | Primary workflow FAIL → GATE BLOCKS<br/>Alternative flows incomplete → GATE BLOCKS |
| 10 | **Error Handling** | TC-401 to TC-404 (4 tests) | Error messages generic/unclear → GATE BLOCKS<br/>No recovery path → GATE BLOCKS |
| 11 | **Pre-Submission** | self-check | Checklist not completed → GATE BLOCKS<br/>Any item unchecked → GATE BLOCKS |

### 🟡 SOFT BLOCKERS (Count as PARTIAL)

- Cross-browser (non-critical browsers): Firefox, Safari on secondary devices
- Performance issues < 10% latency increase (if no critical path impact)
- Non-critical UI polish (micro-interactions, animations)

### 🟢 NOT BLOCKERS (Pass/Fail independent)

- Minor CSS tweaks (color, spacing)
- Accessibility improvements beyond WCAG AA compliance
- Analytics tracking (if feature logic passes)

---

## Required Test Summary

| Test Category | # of Tests | Required Passes | Status |
|---------------|-----------|-----------------|--------|
| **Authentication (CAT-1)** | 6 | 6/6 (100%) | ✓ Must pass |
| **Visual Regression (CAT-7)** | 3 | 3/3 (100%) | ✓ Must pass + screenshots |
| **Deep Functional (CAT-8)** | 16 | 16/16 (100%) | ✓ Must pass |
| **UI Navigation (CAT-9)** | 20 | 20/20 (100%) | ✓ Must pass |
| **Project-Specific (CAT-10)** | 7+ | 7+/7+ (100%) | ✓ Must pass |
| **Cross-browser (CAT-5)** | 2+ | 2+/2+ (100%) | ✓ Must pass Chrome |
| **API Endpoints (CAT-3)** | 5 | 5/5 (100%) | ✓ Must pass |
| **Core Workflows (CAT-2)** | 3 | 3/3 (100%) | ✓ Must pass |
| **Error Handling (CAT-4)** | 4 | 4/4 (100%) | ✓ Must pass |
| **Pre-Submission Checklist** | 1 | 1/1 (100%) | ✓ Must pass |
| **TOTAL** | **66+** | **66+/66+** | **MUST ALL PASS** |

---

## Evidence Requirements (MANDATORY)

**For EVERY test marked "PASS", must provide:**

### Screenshots
```
uat_screenshots/
├── TC-101_valid_login_success.png
├── TC-102_wrong_password_error.png
├── TC-701_desktop_layout.png
├── TC-701_tablet_layout.png
├── TC-701_mobile_layout.png
├── TC-801_data_validation_error.png
├── TC-901_homepage_loaded_all_buttons_visible.png
├── ... (all 66+ tests)
```

**Rule:** If screenshot doesn't exist → Test Status = INVALID → GATE BLOCKS

### Console Logs (If Applicable)
```
logs/
├── TC-301_api_health_check.log (curl output, HTTP 200, response time)
├── TC-305_error_response_format.log
├── TC-801_javascript_errors.log (should be EMPTY)
├── ... (all API/error tests)
```

**Rule:** 404 errors or uncaught exceptions in logs → Test Status = FAIL → GATE BLOCKS

### Database Verification (If Applicable)
```
db_verification/
├── TC-201_user_data_persisted.sql (query results)
├── TC-801_crud_create_verified.sql
├── TC-801_crud_update_verified.sql
├── TC-801_crud_delete_verified.sql
├── ... (all stateful tests)
```

**Rule:** Missing data in database → Test Status = FAIL → GATE BLOCKS

### Timestamp Log
```
{
  "uat_start": "2026-04-04T09:00:00Z",
  "uat_end": "2026-04-05T17:00:00Z",
  "total_duration": "32 hours",
  "test_count": 66,
  "passed": 66,
  "failed": 0,
  "partial": 0,
  "evidence_complete": true,
  "signed_by": "CDO_Username"
}
```

---

## ✅ Passing UAT Looks Like This

### Example PASS Summary
```markdown
## Phase 5 UAT Complete — READY FOR PHASE 6

| Test Category | Tests | Result | Evidence |
|---------------|-------|--------|----------|
| Authentication (CAT-1) | 6 | ✅ 6/6 PASS | TC-101→TC-106 screenshots in `uat_screenshots/` |
| Visual Regression (CAT-7) | 3 | ✅ 3/3 PASS + Desktop/Tablet/Mobile layout screenshots | `uat_screenshots/TC-701*` |
| Deep Functional (CAT-8) | 16 | ✅ 16/16 PASS | Data validation + CRUD + state management + permissions verified |
| UI Navigation (CAT-9) | 20 | ✅ 20/20 PASS | All buttons clickable, all links return 200 (not 404) |
| Project-Specific (CAT-10) | 7+ | ✅ 7+/7+ PASS | Domain-specific business logic verified per Phase 3 Tech Spec |
| Cross-browser (CAT-5) | 2+ | ✅ 2+/2+ PASS | Chrome + Firefox screenshots verified |
| API Endpoints (CAT-3) | 5 | ✅ 5/5 PASS | All endpoints HTTP 200 + response format valid |
| Core Workflows (CAT-2) | 3 | ✅ 3/3 PASS | Primary + secondary + multi-step workflows verified |
| Error Handling (CAT-4) | 4 | ✅ 4/4 PASS | Error messages specific + recovery paths documented |
| Pre-Submission Check | 1 | ✅ PASS | All checklist items verified before submission |
| **TOTAL** | **66+** | **✅ 66+/66+ PASS** | **GATE OPENS TO PHASE 6** |

**Evidence Location:** `documents/Phase5_UAT/{ID}_UAT_Test_Result.md`
**Screenshot Folder:** `designs/uat_screenshots/`
**Approval:** Signed by CDO + CTO, verified by CEO
**Gate Approved:** [date] → Phase 6 Closeout opens
```

---

## ❌ Failing UAT Looks Like This

### Example FAIL Summary
```markdown
## Phase 5 UAT — GATE BLOCKED (ISSUES FOUND)

| Test Category | Tests | Result | Issue |
|---------------|-------|--------|-------|
| Authentication (CAT-1) | 6 | ❌ 4/6 PASS | TC-105 (rate limiting) not implemented, TC-104 (session timeout) screenshots missing |
| Visual Regression (CAT-7) | 3 | ❌ 1/3 PASS | Mobile layout (TC-703) shows different colors than design → Visual Regression FAIL |
| Deep Functional (CAT-8) | 16 | ❌ 14/16 PASS | TC-809 (permission bug) + TC-815 (edge case) failing |
| UI Navigation (CAT-9) | 20 | ✅ 20/20 PASS | All passed |
| --- | --- | --- | --- |
| **TOTAL** | **66+** | **❌ PARTIAL** | **GATE BLOCKED** |

**Reason for Failure:**
- ⛔ TC-105 screenshots missing (cannot verify rate limiting)
- ⛔ TC-703 mobile visual regression (layout ≠ design spec)
- ⛔ TC-809 + TC-815 data validation bugs found
- 🔴 **Result: Return to Phase 5 for bug fixes, then retry UAT**

**Required Actions Before Re-submission:**
1. Implement rate limiting (TC-105)
2. Fix mobile responsive layout (TC-703)
3. Fix permission bug (TC-809)
4. Fix edge case handling (TC-815)
5. Provide fresh screenshot evidence
6. Resubmit with Phase 5 UAT Protocol
```

---

## How to Move from Phase 5 → 6 (CEO Gate Flow)

### CEO's Gate Approval Workflow

1. **CEO receives UAT results**
   - Check: All 66+ tests documented
   - Check: All screenshots present in uat_screenshots/
   - Check: No tests marked PASS without evidence
   
2. **CEO verifies evidence**
   ```bash
   # CEO runs verification script
   ./protocols/validators/check-uat-evidence.sh {ProjectID}
   
   # Script checks:
   # - 66+ test cases defined
   # - 66+ screenshots present
   # - JSON evidence file complete (timestamp, signer)
   # - No "PASS" tests without evidence
   
   # If ALL pass → return exit code 0 ✅
   # If ANY fail → return exit code 1 ❌ (GATE BLOCKED)
   ```

3. **If AUTO-CHECK passes** → CEO approves gate (manual approver)
   ```
   CEO Action: Click APPROVE on {ProjectID} in HEARTBEAT.md
   → Triggers: phase-transition.md (5-step approval ritual)
   → Updates: HEARTBEAT.md 5 = ✅ complete (timestamp + CEO signature)
   → Opens: Phase 6 Closeout
   ```

4. **If AUTO-CHECK fails** → CEO rejects, comments reason
   ```
   CEO Action: Click REJECT on {ProjectID}
   → Fills in: "Screenshots missing for TC-105, TC-704, TC-805"
   → Updates: HEARTBEAT.md 5 = ❌ BLOCKED (reason + timeline to retry)
   → Returns to: Phase 5 → Fix issues → Resubmit UAT
   ```

---

## Related Files

- `protocols/phase5-uat-protocol.md` (v1.3) — Full UAT protocol with STEP 1-6 execution workflow
- `protocols/visual-verification-no-browser.md` — How to get screenshots without Chromium
- `protocols/phase-transition.md` — 5-step CEO approval ritual after gate
- `protocols/phase-gates.md` (v11.13) — Master gate flow document

---

## Summary: What Phase 5→6 Actually Means

| Before (Phase 5) | Gate Check ✓ | After (Phase 6) |
|-----------------|-------------|-----------------|
| Testing ongoing | CEO verifies 66+ tests + evidence complete | Ready for production |
| UAT not yet done | No PASS tests without screenshot | Launch approved |
| Issues being found | All blockers resolved | Lessons-learned collection |
| | 5-step transition ritual triggered | Project moves to BAU support |

**Status in HEARTBEAT.md:**
- Phase 5 = UAT in progress → 🟡 YELLOW
- Phase 5→6 = Gate open → 🟢 GREEN → phase-transition.md (5-step ritual)
- Phase 6 = Closeout complete → 🏁 FINISHED
