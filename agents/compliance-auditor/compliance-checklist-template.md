# Compliance Checklist Template (All Phases)

> **Purpose:** Template for creating compliance checklists for each phase gate
> **Usage:** Copy this template and customize for each phase
> **Phases:** 2→3, 3→4, 4→4.5, 5.1, 5→6, 6

---

## [Phase X.Y Gate] Compliance Checklist

> **Gate:** Phase X → Phase X.Y
> **Compliance Auditor Function:** Verify all deliverables meet gate requirements
> **Gate Status:** BLOCK if ANY critical requirement missing

---

## 📋 Executive Checklist

**Total Requirements:** [NUMBER]

**Compliance Status:**
- [ ] [Critical Requirement 1]
- [ ] [Critical Requirement 2]
- [ ] [Critical Requirement 3]
- [ ] [Sign-Off Requirement 1]
- [ ] [Sign-Off Requirement 2]

---

## 🔴 CRITICAL BLOCKERS (Must PASS)

### **Blocker 1: [Name of blocker]**
```
Requirement: [Clear statement of what's required]

Check:
  [ ] [Specific instruction on what to look for]
  
If Missing:
  ❌ BLOCK GATE — [Consequence of missing this]
  Action: [What to do to fix]
```

### **Blocker 2: [Name of blocker]**
```
Requirement: [Clear statement]

Check:
  [ ] [Specific instruction]
  
If Missing:
  ❌ BLOCK GATE — [Consequence]
  Action: [Fix]
```

*... add more blockers as needed*

---

## 🟡 WARNINGS (Manual Review Needed)

### **Warning 1: [Name of warning]**
```
Condition: [When this warning appears]

Check:
  [ ] [Specific instruction]
  
If Found:
  🟡 FLAG FOR MANUAL REVIEW
  Decision needed from: [Who decides]
  Options:
    A) Approve anyway (consequences...)
    B) Send back for completion (recommended)
```

---

## ✅ PASSING REQUIREMENTS (Must ALL be met)

### **Requirement 1: [Name]**
```
Expected: [What should exist]

Verification:
  [ ] [Check 1]
  [ ] [Check 2]
  [ ] [Check 3]
  
Evidence:
  - [Where to find proof]
  - [What to look for]
```

### **Requirement 2: [Name]**
```
Expected: [What should exist]

Verification:
  [ ] [Check 1]
  [ ] [Check 2]
  
Evidence:
  - [Where to find proof]
```

*... add more requirements*

---

## 📊 Compliance Calculation

```
Total Requirements: [NUMBER]
PASS Criteria: [PERCENTAGE]% or [NUMBER] of [TOTAL] met

Scoring Example:
  [Requirement 1] done: [X] points
  [Requirement 2] done: [X] points
  ...
  
  Total: [X]/[TOTAL] = [%]
  
  If ≥ [percentage]: ✅ PASS
  If [percentage-10] to [percentage]: 🟡 WARN
  If < [percentage-10]: ❌ BLOCK
```

---

## 🔄 Audit Process

### **Step 1: Load Requirements**
Read this checklist

### **Step 2: Load Actual Deliverable**
Read the submitted [DELIVERABLE TYPE]: `[FILE PATH]`

### **Step 3: Check Critical Blockers**
For each blocker, verify:
- [ ] Blocker 1: [Check]? If NO → ❌ BLOCK
- [ ] Blocker 2: [Check]? If NO → ❌ BLOCK
- [ ] Blocker 3: [Check]? If NO → ❌ BLOCK

### **Step 4: Check Passing Requirements**
- [ ] Requirement 1: [Check]? ✅
- [ ] Requirement 2: [Check]? ✅
- [ ] Requirement 3: [Check]? ✅

### **Step 5: Check Warnings**
- [ ] Warning 1: [Condition]? If YES → 🟡 WARN
- [ ] Warning 2: [Condition]? If YES → 🟡 WARN

### **Step 6: Generate Report**
```
IF any blocker found:
  → Status: ❌ BLOCK
  → Generate: AUDIT_REPORT_BLOCK_[timestamp].md
  → Send back with remediation checklist

IF only warnings found:
  → Status: 🟡 WARN
  → Generate: AUDIT_REPORT_WARN_[timestamp].md
  → Escalate to [DECISION MAKER] for manual decision

IF all requirements met:
  → Status: ✅ PASS
  → Generate: AUDIT_REPORT_PASS_[timestamp].md
  → Approve gate → Move to next phase
```

---

## ✅ Gate Approval

**PASS Criteria:**
- [List specific must-haves]

**Result:** 
- ✅ APPROVED → Phase [X+1]
- ❌ BLOCKED → See remediation checklist

---

*Last Updated: [DATE]*  
*Template Version: 1.0*  
*Reference: compliance-auditor.md*
