# Meeting Minutes Compliance Guide (v11.2)

> **Purpose:** Detailed guidelines for MM creation, naming, and compliance across all Phases
> **Effective:** v11.2+
> **Last Updated:** 2026-04-03

---

## Quick Reference

| Phase | Gate | MM Format Example | Owner | SLA |
|-------|------|------------------|-------|-----|
| 0 | Register | `P2026-008_MM_Gate-0-1_2026-04-03.md` | CEO | 2h |
| 1 | Research | `P2026-008_MM_Gate-1-1.5_2026-04-01.md` | COO | 4h |
| 1.5 | AI Advisory | `P2026-008_MM_Gate-1.5-2_2026-04-01.md` | COO+CDO | 4h |
| 2 | Design→MR1 | `P2026-008_MM_Gate-2-MR1_2026-04-03.md` | CDO | 2h |
| MR-1 | Review | `P2026-008_MM_Gate-MR1-3_2026-04-03.md` | CTO | 4h |
| 3 | TechSpec→Build | `P2026-008_MM_Gate-3-4_2026-04-03.md` | CTO | 2h |
| 4 | Build→Deploy | `P2026-008_MM_Gate-4-4.5_2026-04-03.md` | CTO | 2h |
| 4.5 | Deploy→MR2 | `P2026-008_MM_Gate-4.5-MR2_2026-04-03.md` | CTO | 2h |
| MR-2 | Review | `P2026-008_MM_Gate-MR2-5_2026-04-03.md` | CISO | 4h |
| 5 | UAT→Closeout | `P2026-008_MM_Gate-5-6_2026-04-03.md` | CDO+CTO | 2h |
| 6 | Closeout→BAU | `P2026-008_MM_Gate-6-BAU_2026-04-03.md` | CEO | 2h |

---

## Phase-by-Phase Requirements

### Phase 0: Registration (Gate 0→1)

**Owner:** CEO  
**SLA:** 2 business hours

**MM Content Requirements:**
- Header: Project ID, Project Name, Registration Date
- Checklist items completed:
  - [ ] Project template copied
  - [ ] PROJECT.json created
  - [ ] PROJECT_REGISTER.md created
  - [ ] Boss approval status
- Decision: REGISTERED or BLOCKED
- Action Items: Next phase trigger (Phase 1 COO assignment)

**MM Location After CEO Approval:**
- From: `documents/Phase0_Registration/` (draft)
- To: `documents/meeting-minutes/P2026-008_MM_Gate-0-1_2026-04-XX.md`

**Screenshots Required:**
- 1x PROJECT.json content (first 20 lines)
- 1x PROJECT_REGISTER.md entry showing project listed

---

### Phase 1: Research (Gate 1→1.5)

**Owner:** COO  
**SLA:** 4 business hours

**MM Content Requirements:**
- Header: Project ID, Requirements research completion date, Attendees (COO)
- Deliverables verified:
  - [ ] `{ID}_Research.md` exists (≥500 words)
  - [ ] `{ID}_Requirements.md` exists (≥300 words)
  - [ ] ≥3 competitors analyzed
  - [ ] ROI score ≥60/100
- Cross-Examination: Q&A on requirements clarity, competitor analysis depth
- Decision: APPROVED for Phase 1.5 or BLOCKED with reasons
- Action Items: Phase 1.5 kickoff or re-research tasks

**MM Location After CEO Approval:**
- From: `documents/Phase1_Research/` (draft)
- To: `documents/meeting-minutes/P2026-008_MM_Gate-1-1.5_2026-04-XX.md`

**Screenshots Required:**
- 1x Research.md (first 30 lines showing project context)
- 1x Requirements.md (requirements table/checklist)
- 1x Competitor analysis section
- 1x ROI calculation (score + breakdown)

---

### Phase 1.5: AI Advisory Review (Gate 1.5→2)

**Owner:** COO (coordinator) + CDO (design input)  
**SLA:** 4 business hours

**MM Content Requirements:**
- Header: Project ID, AI Advisory completion date, Attendees (CEO, 4-Model results)
- Deliverables verified:
  - [ ] `{ID}_AI_Advisor_QA.md` exists (≥6 Q&A pairs with `[Source:]` tags)
  - [ ] `{ID}_CDO_Design_Brief.md` exists (≥300 words)
  - [ ] All 4 AI models participated in advisory
  - [ ] Design direction chosen (scope/style/technology)
- Model Inputs Documented: Which model provided which advisory
- Decision: APPROVED for Phase 2 or BLOCKED (missing inputs)
- Action Items: Phase 2 Design kickoff or advisory iteration

**MM Location After CEO Approval:**
- From: `documents/Phase1_Research/` (draft - same folder as Phase 1)
- To: `documents/meeting-minutes/P2026-008_MM_Gate-1.5-2_2026-04-XX.md`

**Screenshots Required:**
- 1x AI_Advisor_QA.md (Q&A pairs with Source tags)
- 1x CDO_Design_Brief.md (design direction section)
- 1x Model advisor list (showing all 4 models participated)
- 1x Design decision summary (chosen style/approach)

---

### Phase 2: Design (Gate 2→MR1, with sub-gates)

**Owner:** CDO (lead), with COO/CTO/CEO checkpoints  
**SLA:** 2-4 hours per sub-gate

**Sub-gates within Phase 2:**

#### 2a: COO QC Check (Gate 2→MR1 sub-step)
- **MM Name:** `P2026-008_MM_Gate-2-MR1_2026-04-XX.md`
- **Owner:** COO
- **Content:** Deliverables check, token application, performance budget, 4 states verification
- (See Phase 2 workflow doc for full details)

#### 2b: Design Submission Checklist (Gate 2→MR1 sub-step)
- **Owner:** COO/CEO
- **Content:** 10 deliverables present, version consistency, token mapping complete

#### 2c: MR-1 Multi-Model Review (Gate 2→MR1 final step)
- **MM Name:** Should be in MR-1 section (see below)
- **Owner:** CTO
- **Content:** 3-Model scores, borderline reviews if applicable

**MM Location After All Sub-gates Approved:**
- All Phase 2 sub-gate MMs consolidated/referenced in meeting-minutes/
- Primary MM: `P2026-008_MM_Gate-2-MR1_2026-04-03.md` (combines decision)

**Screenshots Required:**
- 1x Component inventory (showing 20+ components with states)
- 1x Token mapping table (madhorse-cdo.json references)
- 1x Theme_Preview.html (browser screenshot showing design)
- 1x Performance Budget (LCP/TTI/CLS numbers)
- 1x MR-1 model verdicts (all 3 model scores)

---

### Phase MR-1: Multi-Model Review (Gate MR1→3)

**Owner:** CTO  
**SLA:** 4 hours per model (parallel)

**MM Content Requirements:**
- Header: Project ID, Review phase date, CTO lead, 3 models listed
- Each Model's Output:
  - Dimension scores (Design Quality, Technical Feasibility, Token Application)
  - Aggregate score (0-100)
  - Findings (critical/major/minor)
  - Recommendation (PASS/FAIL/BORDERLINE)
- Borderline Review Rationale (if any model 85-89)
- Decision: Gate PASS (all ≥90 or Borderline) or Gate FAIL (any <85)
- Action Items: Next gate or rework scope

**MM Location After CTO Approval:**
- From: (stored in Phase 2 Design folder during review)
- To: `documents/meeting-minutes/P2026-008_MM_Gate-MR1-3_2026-04-XX.md`

**Screenshots Required:**
- 1x GPT-4.1 JSON output (score + findings top section)
- 1x Gemini 2.5 JSON output
- 1x o4-mini JSON output
- 1x Borderline Review rationale (if applicable)
- 1x Gate decision summary

---

### Phase 3: Tech Spec (Gate 3→4)

**Owner:** CTO + CISO  
**SLA:** 2 business hours

**MM Content Requirements:**
- Header: Project, TechSpec completion date, Attendees (CTO, CISO)
- Deliverables verified:
  - [ ] `{ID}_Technical_Spec.md` exists (completeness, architecture clarity)
  - [ ] `{ID}_CISO_SAFE.md` completed (security review signed off)
  - [ ] Code stars >100 (quality metric baseline set)
  - [ ] Zero-trust principles documented
- CISO Review Results: All security checks passed / issues listed
- Decision: APPROVED for Phase 4 or BLOCKED (tech/security issues)
- Action Items: Phase 4 Build kickoff

**MM Location After CEO Approval:**
- From: `documents/Phase3_Technical_Spec/` (draft)
- To: `documents/meeting-minutes/P2026-008_MM_Gate-3-4_2026-04-XX.md`

**Screenshots Required:**
- 1x Technical_Spec.md (architecture section)
- 1x CISO_SAFE.md (security checklist summary)
- 1x Code stars baseline
- 1x Zero-trust implementation summary

---

### Phase 4: Build (Gate 4→4.5)

**Owner:** CTO  
**SLA:** 2 business hours

**MM Content Requirements:**
- Header: Build completion date, code version/commit hash
- Deliverables verified:
  - [ ] Code deployed to staging (git commit SHA documented)
  - [ ] `{ID}_Version_Bug_List.md` completed
  - [ ] Test coverage ≥80%
  - [ ] All tests passing
- TDD Status: Unit tests + integration tests summary
- Decision: APPROVED for Phase 4.5 Deploy or BLOCKED (test failures)
- Action Items: Deployment to production

**MM Location:**
- To: `documents/meeting-minutes/P2026-008_MM_Gate-4-4.5_2026-04-XX.md`

**Screenshots Required:**
- 1x Git commit log (showing code deployment)
- 1x `npm test` output (showing all tests passing)
- 1x Code coverage report (≥80%)
- 1x Bug list (if any critical bugs documented)

---

### Phase 4.5: Deployment (Gate 4.5→MR2)

**Owner:** CTO + CISO  
**SLA:** 2 business hours

**MM Content Requirements:**
- Header: Deployment completion date, production URL
- Deliverables verified:
  - [ ] `{ID}_DeployVerification.md` completed
  - [ ] curl HTTP 200 response from production URL
  - [ ] Anti-Dummy checks passed (CISO_SAFE_TO_DEPLOY tag present)
  - [ ] Monitoring/alerts configured
- Deployment Status: Live production confirmation
- Decision: APPROVED for MR-2 or BLOCKED (deploy issues)
- Action Items: MR-2 production code review scheduling

**MM Location:**
- To: `documents/meeting-minutes/P2026-008_MM_Gate-4.5-MR2_2026-04-XX.md`

**Screenshots Required:**
- 1x curl HTTP 200 response
- 1x DeployVerification.md (deployment checklist completed)
- 1x CISO_SAFE_TO_DEPLOY confirmation
- 1x Production monitoring dashboard (first screenshot)

---

### Phase MR-2: Production Code Review (Gate MR2→5)

**Owner:** CISO (lead) + 3-Model review  
**SLA:** 4 hours per model

**MM Content Requirements:**
- All 3 models review production code/performance
- Findings focused on: performance degradation, security vulnerabilities, dependency issues
- Decision: APPROVED for UAT or BLOCKED (critical production issues)
- Same format as MR-1

**MM Location:**
- To: `documents/meeting-minutes/P2026-008_MM_Gate-MR2-5_2026-04-XX.md`

**Screenshots Required:**
- 1x Production performance metrics (before/after)
- 1x Security scan results
- 1x Model verdict summary

---

### Phase 5: UAT (Gate 5→6)

**Owner:** CDO + CTO  
**SLA:** 2 business hours

**MM Content Requirements:**
- Header: UAT completion date
- Deliverables verified:
  - [ ] `{ID}_UAT_Test_Result.md` completed
  - [ ] All UAT scenarios passed
  - [ ] Screenshots vs design comparison (visual regression check)
  - [ ] Performance within budget
- Test Results Summary: Pass rate %, failed scenarios (if any)
- Design vs Production: Visual discrepancies logged
- Decision: APPROVED for Closeout or BLOCKED (UAT failures)
- Action Items: Closeout phase or re-demo iterations

**MM Location:**
- To: `documents/meeting-minutes/P2026-008_MM_Gate-5-6_2026-04-XX.md`

**Screenshots Required:**
- 1x UAT_Test_Result.md (pass/fail summary)
- 1x Design vs Production side-by-side (at least 2 screens)
- 1x Performance metrics (LCP/TTI/CLS in production)
- 1x UAT sign-off form

---

### Phase 6: Closeout (Gate 6→BAU)

**Owner:** CEO (lead)  
**SLA:** 2 business hours

**MM Content Requirements:**
- Header: Closeout date, all agents present
- Deliverables verified:
  - [ ] Lessons learned documented
  - [ ] Risk log updated
  - [ ] Team retrospective completed
  - [ ] Project metrics finalized
- Key Learnings: 3-5 main achievements/improvements
- PostMortem: Issues encountered + resolutions
- Decision: PROJECT COMPLETE or BLOCKED (pending items)
- Action Items: Knowledge Base update, team celebration

**MM Location:**
- To: `documents/meeting-minutes/P2026-008_MM_Gate-6-BAU_2026-04-XX.md`

**Screenshots Required:**
- 1x Lessons learned document (key points)
- 1x Risk log final status
- 1x Project metrics dashboard (timelines, budget, quality)
- 1x Team retrospective summary

---

## Special Cases

### Emergency Sprint (Mid-Gate Issues)

**MM Format:** `{ID}_MM_Special-EmergencySprint_{YYYY-MM-DD}.md`

**Trigger:** CEO initiates when fundamental design/scope misalignment detected

**Content:**
- Reason for emergency (what triggered it)
- Duration + attendees + agenda (5 items × 15 min format)
- Decisions made (keep/pivot/scope rewind)
- Action Items: New round start + modified deadlines

**Location:** `documents/meeting-minutes/` (after CEO decision)

---

### Scope Rewind (Boss REJECT)

**MM Format:** `{ID}_MM_Special-ScopeRewind_{YYYY-MM-DD}.md`

**Trigger:** Boss rejects Phase 2→3 (returns to Phase 2 COO QC)

**Content:**
- Reason for rejection (specific scope clarity items)
- Scope change decision
- New COO QC start date + SLA
- CDO re-work plan

**Location:** `documents/meeting-minutes/` (documented immediately)

---

### Borderline Review (CTO Override)

**MM Format:** `{ID}_MM_Special-BorderlineReview_{YYYY-MM-DD}.md`

**Trigger:** Model scores 85-89 (CTO judgment call)

**Content:**
- Which model, which dimension, why borderline
- CTO rationale: why accept this borderline score
- Risk assessment: remaining concerns
- Consensus/override decision

**Location:** Included in main MR-1/MR-2 MM + separate special MM

---

## Automated Compliance Check

**Script:** `bash protocols/check-mm-compliance.sh "PROJECT_ID"`

**Exit Codes:**
- 0 = 100% compliant ✓
- 1 = Missing MM files in meeting-minutes/
- 2 = Non-compliant MM names (not Gate-based)
- 4 = Missing screenshots for MM
- 8 = Old format MM found in Phase folders
- 16 = Missing required MM headers

**Usage Example:**
```bash
cd /opt/ai-fabio-corp/data/openclaw_home/workspace
bash protocols/check-mm-compliance.sh "P2026-008"

# Output:
# ✓ Gate-0-1: P2026-008_MM_Gate-0-1_2026-04-03.md [PASS] (1 screenshot)
# ✗ Gate-1-1.5: MISSING or NON-COMPLIANT
# ✓ Gate-1.5-2: ...
# ...
# COMPLIANCE: 10/11 gates = 90.9%
# Status: exit code 2 (non-compliant names found)
```

---

## Migration Steps (v11.1 → v11.2)

If you have old-format MMs:

```bash
# 1. BACKUP
cp -r projects/P2026-008_ProjectDocuments/documents/meeting-minutes/ \
      projects/P2026-008_ProjectDocuments/documents/meeting-minutes.backup/

# 2. MOVE OLD MMs FROM PHASE FOLDERS
mv projects/P2026-008_ProjectDocuments/documents/Phase1_Research/P2026-008_Phase1_MeetingMinutes.md \
   projects/P2026-008_ProjectDocuments/documents/meeting-minutes/P2026-008_MM_Gate-1-1.5_2026-04-01.md

# 3. RENAME OLD MMs ALREADY IN MEETING-MINUTES
cd projects/P2026-008_ProjectDocuments/documents/meeting-minutes/
mv P2026-008_MM_COO-QC_2026-04-03.md P2026-008_MM_Gate-2-MR1_2026-04-03.md

# 4. VERIFY COMPLIANCE
bash protocols/check-mm-compliance.sh "P2026-008"

# 5. GIT COMMIT
git add projects/P2026-008_ProjectDocuments/documents/meeting-minutes/
git commit -m "MM: Migrate v11.1 → v11.2 naming format (all gates now Gate-based)"
```

---

**Version History:**
- v11.2 (2026-04-03): Full Phase-by-Phase compliance guide + automation
- v11.1 (2026-04-02): Initial template guidelines
- v11.0 (2026-04-01): Basic MM requirements
