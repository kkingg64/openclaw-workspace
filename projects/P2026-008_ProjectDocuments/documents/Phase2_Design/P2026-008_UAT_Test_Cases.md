# P2026-008 UAT Test Cases

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 2 Design  
**Version:** v1.0  
**Date:** 2026-04-03  
**Author:** CDO  

---

## Overview

This document defines User Acceptance Testing (UAT) test cases for MADHORSE HQ dashboard. All test cases are derived from Phase 1 Requirements and cover P0 (Must Have) and P1 (Should Have) functionality.

---

## 1. Test Environment

| Item | Details |
|------|---------|
| URL | Local: `http://localhost:3000` |
| Browser | Chrome (latest), Firefox (latest), Safari (latest) |
| Viewport | Desktop: 1440x900, Tablet: 768x1024, Mobile: 375x812 |
| User | CEO (fabio-boss) - Full access |
| Tokens | All from `shadcn/themes/madhorse-cdo.json` |

---

## 2. P0 Critical Test Cases

### TC-01: System Monitor Display

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-01 |
| **Priority** | P0 - Critical |
| **Module** | Dashboard / System Monitor |
| **Description** | Verify VPS System Monitor displays all metrics correctly |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to Dashboard 2. Locate System Monitor row 3. Verify CPU metric card shows 4. Verify RAM metric card shows 5. Verify Storage metric card shows 6. Verify Network metric card shows |
| **Expected Results** | All 4 metric cards display with values and progress bars |
| **Pass Criteria** | CPU%, RAM (used/total), Storage (used/total), Network (inbound/outbound) all visible |
| **Tokens Verified** | `--card`, `--foreground`, `--muted-foreground`, `--accent` |
| **Status** | ⏳ |

### TC-02: Agent Status Panel

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-02 |
| **Priority** | P0 - Critical |
| **Module** | Dashboard / Agents |
| **Description** | Verify all 6 agents displayed with correct status |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to Dashboard 2. Locate Agent Status panel 3. Verify 6 agent cards present 4. Check each agent shows correct status (ACTIVE/BUSY/IDLE/ERROR) |
| **Expected Results** | All 6 agents (CEO, CTO, COO, CDO, CISO, Forex) displayed with status badges |
| **Pass Criteria** | 6 agent cards visible with correct role labels and status indicators |
| **Tokens Verified** | `--card`, `--foreground`, `--success`, `--accent`, `--muted` |
| **Status** | ⏳ |

### TC-03: Agent Reasoning Log Visibility

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-03 |
| **Priority** | P0 - Critical |
| **Module** | Agent Intelligence |
| **Description** | Verify reasoning logs are expandable and viewable |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /agents 2. Click on any agent card 3. Find Reasoning Log section 4. Click to expand 5. Verify log entries visible |
| **Expected Results** | Reasoning logs display with timestamps and thought content |
| **Pass Criteria** | Collapsible reasoning log visible, expands on click, shows history |
| **Tokens Verified** | `--card`, `--muted`, `--border` |
| **Status** | ⏳ |

### TC-04: Agent Discussion Threads

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-04 |
| **Priority** | P0 - Critical |
| **Module** | Agent Intelligence |
| **Description** | Verify discussion threads are displayed |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /agents 2. Select an agent 3. Locate Discussions section 4. Verify thread list visible |
| **Expected Results** | Discussion threads listed with title, participants, and outcome |
| **Pass Criteria** | Thread list visible with at least one thread or empty state |
| **Tokens Verified** | `--card`, `--foreground`, `--muted-foreground` |
| **Status** | ⏳ |

### TC-05: Project Status Grid

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-05 |
| **Priority** | P0 - Critical |
| **Module** | Dashboard / Projects |
| **Description** | Verify all projects displayed with progress |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to Dashboard 2. Locate Project Status panel 3. Verify project cards present 4. Check progress bars display correctly |
| **Expected Results** | Project cards with name, phase, owner, and progress bar |
| **Pass Criteria** | All projects from PROJECT_REGISTER visible with progress indication |
| **Tokens Verified** | `--card`, `--accent`, `--secondary`, `--foreground` |
| **Status** | ⏳ |

### TC-06: Research Page - COO Digest Display (Revised)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-06 |
| **Priority** | P0 - Critical |
| **Module** | Research Hub |
| **Description** | Verify COO Research Digest displays at top of Research page |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /research 2. Locate COO Research Digest section 3. Verify spotlight card visible 4. Verify topic title displayed 5. Verify Top 3 Insights visible 6. Verify Action Items table visible 7. Verify last updated timestamp |
| **Expected Results** | Digest card shows: topic title, 3 insights, action items, timestamp |
| **Pass Criteria** | Digest spotlight visible with all content sections |
| **Tokens Verified** | `--card`, `--card-foreground`, `--accent`, `--muted-foreground` |
| **Status** | ⏳ |

### TC-06B: Research Page - Social Media Hot Topics (New)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-06B |
| **Priority** | P0 - Critical |
| **Module** | Research Hub / Hot Trends |
| **Description** | Verify Social Media Hot Topics section displays with 4 platforms |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /research 2. Locate Social Media Hot Topics section 3. Verify YouTube card visible 4. Verify Reddit card visible 5. Verify Twitter card visible 6. Verify HackerNews card visible 7. Verify each platform shows top 5 topics |
| **Expected Results** | 4 platform cards (YouTube, Reddit, Twitter, HackerNews), each with 5 trending topics |
| **Pass Criteria** | All 4 platform cards visible with topics list |
| **Tokens Verified** | `--card`, `--card-foreground`, `--muted`, `--muted-foreground`, `--accent` |
| **Status** | ⏳ |

### TC-06C: Research Page - Recent Research Files (New)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-06C |
| **Priority** | P0 - Critical |
| **Module** | Research Hub |
| **Description** | Verify Recent Research Files section displays file list |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /research 2. Locate Recent Research Files section 3. Verify file cards displayed 4. Check file name visible 5. Check date modified visible 6. Verify files sorted by date (newest first) |
| **Expected Results** | Grid of research file cards with name, date, category |
| **Pass Criteria** | At least 4 file cards visible with metadata |
| **Tokens Verified** | `--card`, `--card-foreground`, `--muted-foreground`, `--secondary` |
| **Status** | ⏳ |

### TC-06D: Research Page - No Search Input (New)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-06D |
| **Priority** | P1 - Should |
| **Module** | Research Hub |
| **Description** | Verify Research page has NO search input field |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /research 2. Inspect page for search input 3. Verify no search field exists within Research page content 4. Verify header global search is separate |
| **Expected Results** | No search input field within Research page main content area |
| **Pass Criteria** | Page is curated display only, no search functionality |
| **Tokens Verified** | N/A (design verification) |
| **Status** | ⏳ |

### TC-06E: Research Page - Mobile Layout (New)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-06E |
| **Priority** | P1 - Should |
| **Module** | Research Hub |
| **Description** | Verify Research page responsive on mobile |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Set viewport to mobile (375x812) 2. Navigate to /research 3. Verify COO Digest stacks vertically 4. Verify platform cards stack to single column 5. Verify file cards stack to single column 6. Check no horizontal scroll |
| **Expected Results** | Single column layout, all sections stacked |
| **Pass Criteria** | Mobile layout matches UI_Spec breakpoints |
| **Tokens Verified** | `--card`, `--background`, responsive breakpoints |
| **Status** | ⏳ |

### TC-07: Hot Trends Dashboard

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-07 |
| **Priority** | P0 - Critical |
| **Module** | Hot Trends |
| **Description** | Verify platform selector and trending topics |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /trends 2. Verify platform selector tabs visible (TikTok, 小紅書, Instagram, Twitter, YouTube) 3. Click each platform 4. Verify trending topics update |
| **Expected Results** | Platform tabs functional, trending topics display for selected platform |
| **Pass Criteria** | 5 platform tabs visible, content changes on tab selection |
| **Tokens Verified** | `--secondary`, `--accent`, `--foreground`, `--muted-foreground` |
| **Status** | ⏳ |

### TC-08: Real-time Auto-Update

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-08 |
| **Priority** | P0 - Critical |
| **Module** | Dashboard / System Monitor |
| **Description** | Verify data refreshes every 30 seconds |
| **Pre-conditions** | User logged in as CEO, watching Dashboard |
| **Test Steps** | 1. Navigate to Dashboard 2. Note current timestamp on metrics 3. Wait 35 seconds 4. Verify metrics updated |
| **Expected Results** | System metrics refresh without manual intervention |
| **Pass Criteria** | Auto-refresh occurs every 30s, data updates visibly |
| **Tokens Verified** | N/A (behavior) |
| **Status** | ⏳ |

### TC-09: Dark Theme Rendering

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-09 |
| **Priority** | P0 - Critical |
| **Module** | Global |
| **Description** | Verify dark theme applies correctly |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to Dashboard 2. Inspect page background color 3. Check card backgrounds 4. Verify text colors 5. Check accent colors |
| **Expected Results** | Dark theme colors from madhorse-cdo.json applied throughout |
| **Pass Criteria** | Background: 225 37% 6%, Cards: 225 37% 11%, Accent: 0 84% 60% |
| **Tokens Verified** | All `--background`, `--card`, `--accent`, `--foreground` tokens |
| **Status** | ⏳ |

### TC-10: Authentication (Google OAuth)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-10 |
| **Priority** | P0 - Critical |
| **Module** | Auth |
| **Description** | Verify Google OAuth login works |
| **Pre-conditions** | User not logged in |
| **Test Steps** | 1. Navigate to /login 2. Click "Sign in with Google" 3. Complete Google auth flow 4. Verify redirect to Dashboard |
| **Expected Results** | Successful login redirects to dashboard as CEO |
| **Pass Criteria** | Auth completes, session established, dashboard accessible |
| **Tokens Verified** | N/A (auth flow) |
| **Status** | ⏳ |

### TC-RRV-01: Real-time Reasoning Stream Display on Agent Detail Page

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-RRV-01 |
| **Priority** | P0 - Critical |
| **Module** | Agent Intelligence / Real-time Reasoning |
| **Description** | Verify real-time reasoning stream displays on /agents/[id] page when agent is actively processing a task |
| **Pre-conditions** | User logged in as CEO; Agent assigned a task and actively reasoning |
| **Test Steps** | 1. Navigate to /agents/[id] for any agent (e.g., /agents/cto) 2. Locate the Reasoning Stream panel 3. Verify stream container is visible 4. Wait for agent to receive task assignment 5. Verify reasoning content appears in real-time 6. Check for streaming animation (new lines appearing) |
| **Expected Results** | Reasoning Stream panel shows live reasoning output with streaming text/blocks appearing as agent thinks |
| **Pass Criteria** | Stream visible, content updates in real-time (<2s latency), visual streaming indicator present |
| **Tokens Verified** | `--card`, `--muted`, `--muted-foreground`, `--accent`, streaming indicator |
| **Status** | ⏳ |

### TC-RRV-02: Agent Reasoning Events Triggered on Task Assignment

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-RRV-02 |
| **Priority** | P0 - Critical |
| **Module** | Agent Intelligence / Real-time Reasoning |
| **Description** | Verify reasoning events are triggered when Boss assigns a requirement to an agent |
| **Pre-conditions** | User logged in as CEO; At least one sub-agent available |
| **Test Steps** | 1. Navigate to Dashboard 2. Assign a new task to an agent (e.g., "CTO, analyze market trends") 3. Immediately navigate to /agents/cto 4. Verify Reasoning Stream shows "Task received" event 5. Verify initial planning thoughts appear 6. Confirm timestamp reflects task assignment time |
| **Expected Results** | Task assignment triggers new reasoning session; Stream shows task received → planning → execution flow |
| **Pass Criteria** | Reasoning event triggered within 1s of task assignment; Event shows task description and timestamp |
| **Tokens Verified** | `--accent` (event marker), `--muted-foreground` (timestamp), `--card` (event block) |
| **Status** | ⏳ |

### TC-RRV-03: Streaming of Reasoning Steps as They Happen

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-RRV-03 |
| **Priority** | P0 - Critical |
| **Module** | Agent Intelligence / Real-time Reasoning |
| **Description** | Verify reasoning steps stream incrementally as agent processes a multi-step task |
| **Pre-conditions** | User logged in as CEO; Agent receiving complex multi-step task |
| **Test Steps** | 1. Navigate to /agents/[id] 2. Assign complex task requiring multiple reasoning steps 3. Observe Reasoning Stream panel 4. Verify step 1 appears first (e.g., "Understanding requirement...") 5. Verify step 2 appears after (e.g., "Breaking down task...") 6. Verify step 3 appears (e.g., "Executing subtask...") 7. Confirm each step appears incrementally, not all at once |
| **Expected Results** | Reasoning steps appear one-by-one with 0.5-3s intervals; Each step clearly labeled with step number or thought type |
| **Pass Criteria** | Steps stream sequentially; Minimum 3 visible steps for complex task; No complete-then-display behavior |
| **Tokens Verified** | `--accent` (step indicator), `--muted` (step background), `--card` (step container) |
| **Status** | ⏳ |

### TC-RRV-04: Learning Summary Generated After Task Completion

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-RRV-04 |
| **Priority** | P0 - Critical |
| **Module** | Agent Intelligence / Real-time Reasoning |
| **Description** | Verify learning summary/key learnings are generated and displayed after agent completes a task |
| **Pre-conditions** | User logged in as CEO; Agent has completed a task |
| **Test Steps** | 1. Navigate to /agents/[id] 2. Wait for agent to complete current task (or assign and wait) 3. Look for "Key Learnings" or "Learning Summary" section 4. Verify summary appears after task status changes to COMPLETED 5. Check that learnings are specific to the completed task 6. Verify format: bullet points or numbered list |
| **Expected Results** | After task completion, learning summary section appears with 1-5 key insights/learnings from the task |
| **Pass Criteria** | Learnings visible within 5s of task completion; Minimum 1 learning displayed; Learnings are task-specific |
| **Tokens Verified** | `--card` (summary container), `--accent` (insight marker), `--muted-foreground` (learning text) |
| **Status** | ⏳ |

### TC-RRV-05: Sub-Agent Reasoning Visibility (CTO, COO, CDO, CISO)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-RRV-05 |
| **Priority** | P0 - Critical |
| **Module** | Agent Intelligence / Real-time Reasoning |
| **Description** | Verify real-time reasoning is visible for all sub-agents (CTO, COO, CDO, CISO, etc.) when they are active |
| **Pre-conditions** | User logged in as CEO; Multiple sub-agents available |
| **Test Steps** | 1. Navigate to /agents/cto 2. Verify Reasoning Stream visible and functional 3. Navigate to /agents/coo 4. Verify Reasoning Stream visible and functional 5. Navigate to /agents/cdo 6. Verify Reasoning Stream visible and functional 7. Navigate to /agents/ciso 8. Verify Reasoning Stream visible and functional |
| **Expected Results** | All sub-agent pages (/agents/[id]) show Reasoning Stream panel; Each agent's stream is independent and shows that agent's thoughts |
| **Pass Criteria** | Reasoning Stream panel present on all 4+ sub-agent pages; Each stream shows agent-specific reasoning content |
| **Tokens Verified** | `--card`, `--muted`, `--accent`, consistent styling across all agent pages |
| **Status** | ⏳ |

### TC-RRV-06: CEO Reasoning Stream - Main Decision Visibility

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-RRV-06 |
| **Priority** | P0 - Critical |
| **Module** | Agent Intelligence / Real-time Reasoning |
| **Description** | Verify CEO (Boss) reasoning stream is visible on /agents/boss page showing how AI decomposes requirements |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /agents/boss (or /agents/ceo) 2. Assign a new complex requirement 3. Observe CEO Reasoning Stream 4. Verify CEO shows: requirement received → planning → sub-agent dispatch → monitoring → completion flow 5. Verify sub-agent call events appear (e.g., "Calling CTO...", "Calling COO...") 6. Check for decision rationale visible |
| **Expected Results** | CEO reasoning stream shows complete decision pipeline: requirement → planning → agent coordination → result synthesis |
| **Pass Criteria** | CEO stream visible; Sub-agent dispatch events shown with agent names; Pipeline stages clearly delineated |
| **Tokens Verified** | `--accent` (dispatch events), `--card` (pipeline stage), `--muted-foreground` (details) |
| **Status** | ⏳ |

### TC-RRV-07: Reasoning Log History and Persistence

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-RRV-07 |
| **Priority** | P1 - Should |
| **Module** | Agent Intelligence / Real-time Reasoning |
| **Description** | Verify reasoning logs persist and can be viewed after session ends |
| **Pre-conditions** | User logged in as CEO; Agent has completed tasks in past session |
| **Test Steps** | 1. Navigate to /agents/[id] 2. Locate "Reasoning History" or "Past Sessions" section 3. Click to expand previous reasoning logs 4. Verify historical entries show past tasks and learnings 5. Verify timestamps for historical entries 6. Check learnings from past tasks are accessible |
| **Expected Results** | Historical reasoning logs viewable; Past learnings accessible; Timestamps accurate |
| **Pass Criteria** | At least one historical session visible (if prior sessions exist); Learnings retrievable |
| **Tokens Verified** | `--muted` (history background), `--muted-foreground` (past timestamp), `--border` |
| **Status** | ⏳ |

---

## 3. P1 Should-Have Test Cases

### TC-11: Global Search

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-11 |
| **Priority** | P1 - Should |
| **Module** | Global |
| **Description** | Verify search returns results across modules |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Click search icon/field in header 2. Type search query (e.g., "Phase 3") 3. Verify results appear 4. Check results from multiple modules |
| **Expected Results** | Search results categorized by module (Agents, Projects, Research, etc.) |
| **Pass Criteria** | Results displayed with module labels |
| **Tokens Verified** | `--popover`, `--foreground`, `--muted-foreground` |
| **Status** | ⏳ |

### TC-12: Milestone Details

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-12 |
| **Priority** | P1 - Should |
| **Module** | Projects |
| **Description** | Verify milestone details expandable |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Navigate to /projects 2. Click on a project card 3. Locate Milestone Tracker 4. Expand milestone details |
| **Expected Results** | Milestone details expand showing sub-tasks and completion status |
| **Pass Criteria** | Collapsible milestone sections expand/collapse |
| **Tokens Verified** | `--card`, `--accent`, `--muted` |
| **Status** | ⏳ |

### TC-13: Mobile Responsiveness

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-13 |
| **Priority** | P1 - Should |
| **Module** | Global |
| **Description** | Verify responsive layout on mobile |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Set viewport to mobile (375x812) 2. Navigate to Dashboard 3. Check metric cards stack vertically 4. Check navigation transforms to hamburger 5. Test hamburger menu opens |
| **Expected Results** | Mobile layout: single column, hamburger nav, stacked cards |
| **Pass Criteria** | All content accessible without horizontal scroll |
| **Tokens Verified** | All responsive breakpoints |
| **Status** | ⏳ |

### TC-14: Keyboard Navigation

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-14 |
| **Priority** | P1 - Should |
| **Module** | Global |
| **Description** | Verify all functionality accessible via keyboard |
| **Pre-conditions** | User logged in as CEO |
| **Test Steps** | 1. Press Tab to navigate through page 2. Verify focus visible on each element 3. Use Enter to activate buttons/links 4. Verify modal opens/closes with Escape |
| **Expected Results** | All interactive elements reachable via Tab, visible focus ring |
| **Pass Criteria** | Focus ring visible, Enter activates, Escape closes modals |
| **Tokens Verified** | `--ring` |
| **Status** | ⏳ |

---

## 4. Visual Regression Test Cases

### VRT-01: Theme Preview Comparison

| Field | Details |
|-------|---------|
| **Test Case ID** | VRT-01 |
| **Priority** | P0 - Critical |
| **Module** | Global |
| **Description** | Compare implementation against Theme_Preview.html |
| **Test Steps** | 1. Open Theme_Preview.html in browser 2. Open implemented Dashboard 3. Side-by-side compare 4. Check each component matches |
| **Expected Results** | Implementation matches Theme_Preview.html exactly |
| **Pass Criteria** | No visual differences in colors, spacing, typography |
| **Screenshot Reference** | Theme_Preview.html sections |
| **Status** | ⏳ |

---

## 5. Accessibility Test Cases

### A11Y-01: Color Contrast

| Field | Details |
|-------|---------|
| **Test Case ID** | A11Y-01 |
| **Priority** | P0 - Critical |
| **Module** | Global |
| **Description** | Verify all text meets WCAG 2.1 AA contrast |
| **Test Steps** | 1. Use browser DevTools or axe extension 2. Check contrast ratios 3. Verify minimum 4.5:1 for normal text 4. Verify 3:1 for large text/UI |
| **Expected Results** | All text passes contrast requirements |
| **Pass Criteria** | 4.5:1 for body text, 3:1 for large text/UI components |
| **Status** | ⏳ |

### A11Y-02: Screen Reader

| Field | Details |
|-------|---------|
| **Test Case ID** | A11Y-02 |
| **Priority** | P1 - Should |
| **Module** | Global |
| **Description** | Verify page works with screen reader |
| **Test Steps** | 1. Enable screen reader (NVDA/VoiceOver) 2. Navigate to Dashboard 3. Verify page structure announced 4. Check interactive elements labeled |
| **Expected Results** | Page structure and content announced correctly |
| **Pass Criteria** | Headings, landmarks, and interactive elements properly labeled |
| **Status** | ⏳ |

---

## 6. Test Case Summary

| Category | Total | Passed | Failed | Blocked |
|----------|-------|--------|--------|---------|
| P0 Critical | 19 | 0 | 0 | 0 |
| P1 Should | 7 | 0 | 0 | 0 |
| Visual Regression | 1 | 0 | 0 | 0 |
| Accessibility | 2 | 0 | 0 | 0 |
| **Total** | **29** | **0** | **0** | **0** |

---

## 7. Screenshot Capture

After each test case completion, capture screenshot:

```
projects/P2026-008_ProjectDocuments/designs/uat_screenshots/TC-XX.png
```

Reference screenshots for VRT:

```
projects/P2026-008_ProjectDocuments/designs/uat_screenshots/Theme_Preview_Reference.png
```

---

**CDO_SIGNED:** `FABIO_CDO_SIGNED_2026-04-08`

**Document Status:** v1.2 — Added Real-time Reasoning Visibility test cases (TC-RRV-01 through TC-RRV-07) for Phase 2 Boss requirement: visibility into AI thinking, sub-agent calls, task completion, and learnings
