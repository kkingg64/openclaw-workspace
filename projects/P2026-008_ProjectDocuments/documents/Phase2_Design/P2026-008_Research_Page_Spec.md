# P2026-008 Research Page Spec — COO Curated Research + Social Trends

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 2 Design (Revised Scope)  
**Version:** v1.0  
**Date:** 2026-04-04  
**Author:** CDO  
**Status:** 🔄 DRAFT — For COO QC

---

## Overview

This document defines the Research Page redesign scope. Following the scope change from "search engine" to "COO curated content + social media hot trends", this page is a **curated display only** — no search input.

---

## Page Purpose

**Display COO-curated research content combined with social media hot trends.** The page serves as a curated intelligence hub where the CEO can view:

1. COO's latest research digest (top insights)
2. Real-time social media trends from multiple platforms
3. Recent research files from the COO's research library

**This is NOT a search engine.** Users consume curated content, they do not search for it.

---

## Content Sections

### Section 1: COO Research Digest

**Purpose:** Display the latest COO research insights as a curated spotlight.

**Data Source:** `/api/research/memory` → `memory/research/DIGEST_latest.md`

**Content:**
- Research topic title
- Top 3 key insights (bullet points)
- Recommended actions table (P0/P1 priorities)
- ROI quick calculations (if available)
- Last updated timestamp

**Layout:** Full-width spotlight card at top of page

**States:**
- Loading: Skeleton placeholder
- Loaded: Full digest card with content
- Error: Error message with retry button

---

### Section 2: Social Media Hot Topics

**Purpose:** Display trending topics across social media platforms.

**Data Source:** `/api/trends` → Trends API

**Platforms:**
- YouTube
- Reddit
- Twitter (X)
- HackerNews

**Content per platform:**
- Platform icon + name
- Top 5 trending topics list
- Each topic shows: rank, topic name, engagement indicator

**Layout:** 4-column grid (desktop), 2-column (tablet), 1-column (mobile)

**States:**
- Loading: Skeleton cards
- Loaded: Platform cards with topics
- Error: Platform card with error state
- Empty: "No trends available" message

---

### Section 3: Recent Research Files

**Purpose:** Display recent research documents from COO's library.

**Data Source:** `/api/research/memory` → `memory/research/` directory

**Content:**
- File name
- Date modified
- Category/tags
- File type indicator (markdown)

**Layout:** Card grid, sorted by date (newest first)

**Display:** Show latest 8 files in 4-column grid (desktop), 2-column (tablet), 1-column (mobile)

**States:**
- Loading: Skeleton cards
- Loaded: File cards with metadata
- Error: Error message for failed files
- Empty: "No research files" message

---

## UI Layout

### Desktop (≥1024px)
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Nav Tabs | Search | User Avatar | Logout  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ COO RESEARCH DIGEST (Spotlight)                      │   │
│  │ - Topic Title                                        │   │
│  │ - Top 3 Insights                                     │   │
│  │ - Action Items Table                                 │   │
│  │ - ROI Notes                                         │   │
│  │ - Last Updated: [timestamp]                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  SOCIAL MEDIA HOT TOPICS                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  │ YouTube      │ │ Reddit       │ │ Twitter      │ │ HackerNews   │
│  │ 1. Topic     │ │ 1. Topic     │ │ 1. Topic     │ │ 1. Topic     │
│  │ 2. Topic     │ │ 2. Topic     │ │ 2. Topic     │ │ 2. Topic     │
│  │ 3. Topic     │ │ 3. Topic     │ │ 3. Topic     │ │ 3. Topic     │
│  │ 4. Topic     │ │ 4. Topic     │ │ 4. Topic     │ │ 4. Topic     │
│  │ 5. Topic     │ │ 5. Topic     │ │ 5. Topic     │ │ 5. Topic     │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
│                                                             │
│  RECENT RESEARCH FILES                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  │ File 1       │ │ File 2       │ │ File 3       │ │ File 4       │
│  │ Date         │ │ Date         │ │ Date         │ │ Date         │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  │ File 5       │ │ File 6       │ │ File 7       │ │ File 8       │
│  │ Date         │ │ Date         │ │ Date         │ │ Date         │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1023px)
- Social Media: 2-column grid
- Research Files: 2-column grid

### Mobile (<768px)
- All sections: single column stack
- Hamburger menu active

---

## Data Sources

### API: `/api/research/memory`
Returns COO digest content and file list.

**Response shape:**
```json
{
  "digest": {
    "topic": "string",
    "insights": ["string", "string", "string"],
    "actions": [{ "priority": "P0|P1", "action": "string", "expected": "string" }],
    "roi": [{ "type": "string", "input": "string", "monthly": "number", "payback": "string" }],
    "lastUpdated": "ISO8601 timestamp"
  },
  "files": [
    { "name": "string", "modified": "ISO8601", "category": "string" }
  ]
}
```

### API: `/api/trends`
Returns social media trends.

**Response shape:**
```json
{
  "platforms": {
    "youtube": { "topics": [{ "rank": 1, "name": "string", "engagement": "High|Medium|Low" }] },
    "reddit": { "topics": [...] },
    "twitter": { "topics": [...] },
    "hackernews": { "topics": [...] }
  },
  "lastUpdated": "ISO8601 timestamp"
}
```

---

## Components Required

| Component | Purpose | States |
|-----------|---------|--------|
| DigestSpotlightCard | COO Research Digest display | default, loading, error |
| PlatformTrendsCard | Single platform trends | default, loading, error, empty |
| TopicItem | Individual trending topic | default |
| ResearchFileCard | Recent research file | default, hover |
| SectionHeader | Section title + subtitle | default |
| LoadingSkeleton | Placeholder while loading | animated |

---

## Token Usage

All components use tokens from `shadcn/themes/madhorse-cdo.json`:

| Token | Usage |
|-------|-------|
| `--card` | Card backgrounds |
| `--card-foreground` | Card text |
| `--foreground` | Primary text |
| `--muted-foreground` | Secondary text |
| `--accent` | Highlights, priority badges |
| `--border` | Card borders |
| `--muted` | Skeleton backgrounds |

---

## No Search Input

**Critical Design Decision:** This page has NO search input field. Content is entirely curated by COO. Users scroll through sections to consume content.

If user needs to find specific research, they should navigate to `/research/[filename]` directly or use the global search in the header (which searches across all modules).

---

## Accessibility

- All cards have proper heading hierarchy (h2 for section, h3 for card titles)
- Platform icons have aria-labels
- Loading states announced via aria-busy
- Focus visible on all interactive elements
- Color contrast 4.5:1 minimum

---

**CDO_SIGNED:** `FABIO_CDO_SIGNED_2026-04-04`

**Document Status:** v1.0 — DRAFT
