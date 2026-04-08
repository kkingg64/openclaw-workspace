# P2026-008 Research Page Tech Spec — Phase 3

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 3 Technical Specification  
**Version:** v1.0  
**Date:** 2026-04-04  
**Author:** CTO  
**Status:** 🔄 DRAFT — For CISO Review

---

## Overview

This document defines the technical implementation for the Research Page redesign. Following the scope change from "search engine" to "COO curated content + social media hot trends", this page is a **curated display only** with two primary API endpoints.

**Key Changes from Phase 2:**
- Search functionality removed (Minimax API no longer needed)
- New `/api/research/memory` endpoint for COO digest + file enumeration
- `/api/trends` endpoint integrated for social trends
- File system reads for markdown content

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| API Layer | Next.js API Routes (`/app/api/`) |
| File System | Node.js `fs` module for `.md` reads |
| Styling | shadcn/ui + MADHORSE theme tokens |
| Auth | Session-based (existing middleware) |
| Data Formats | JSON (API responses), Markdown (files) |

**No External Search API Required** — Minimax search removed from stack.

---

## API Endpoints

### 1. `GET /api/research/memory`

**Purpose:** Returns COO digest content and enumerated research files.

**File Sources:**
- Digest: `memory/research/DIGEST_latest.md` (parsed to JSON)
- Files: `memory/research/*.md` enumerated with metadata

**Request:**
```
GET /api/research/memory
Headers: Cookie: session=<valid_session>
```

**Success Response (200):**
```json
{
  "digest": {
    "topic": "string",
    "insights": ["string", "string", "string"],
    "actions": [
      { "priority": "P0", "action": "string", "expected": "string" }
    ],
    "roi": [
      { "type": "string", "input": "string", "monthly": 0, "payback": "string" }
    ],
    "lastUpdated": "2026-04-04T00:00:00Z"
  },
  "files": [
    {
      "name": "filename.md",
      "modified": "2026-04-04T00:00:00Z",
      "category": "string"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` — Invalid or missing session
- `404 Not Found` — DIGEST_latest.md not found
- `500 Internal Server Error` — File read error

**Implementation Notes:**
- Digest content parsed from Markdown at runtime (cached with 5-min TTL)
- File list sorted by modified date (newest first), limited to 20 most recent
- File metadata extracted from frontmatter or filename pattern

---

### 2. `GET /api/research/trends`

**Purpose:** Returns social media hot topics from existing trends API.

**Source:** Proxies to internal `/api/trends` or external trends service.

**Request:**
```
GET /api/research/trends
Headers: Cookie: session=<valid_session>
```

**Success Response (200):**
```json
{
  "platforms": {
    "youtube": {
      "topics": [
        { "rank": 1, "name": "string", "engagement": "High" }
      ]
    },
    "reddit": { "topics": [...] },
    "twitter": { "topics": [...] },
    "hackernews": { "topics": [...] }
  },
  "lastUpdated": "2026-04-04T00:00:00Z"
}
```

**Error Responses:**
- `401 Unauthorized` — Invalid or missing session
- `502 Bad Gateway` — Trends service unavailable
- `500 Internal Server Error` — Internal error

**Implementation Notes:**
- This endpoint may proxy to an existing `/api/trends` or call external API
- Response shape must match Phase 2 spec exactly
- Cache response for 10 minutes

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │ GET /research
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js Page (CSR)                          │
│                   /app/research/page.tsx                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ /api/research/  │ │   /api/trends   │ │  Static Assets  │
│    memory       │ │                 │ │  (shadcn comps) │
└────────┬────────┘ └────────┬────────┘ └─────────────────┘
         │                   │
         ▼                   │
┌─────────────────────────────────────────────────────────────────┐
│                      File System                                 │
│  memory/research/DIGEST_latest.md  ←── parse at runtime         │
│  memory/research/*.md            ←── enumerate for file list     │
└─────────────────────────────────────────────────────────────────┘
```

**Data Flow Steps:**

1. **Build/Deploy Time:** None required (runtime-only reads)
2. **Page Load:** Client fetches both API endpoints in parallel
3. **API Processing:**
   - `/api/research/memory`: Reads DIGEST_latest.md, parses markdown, enumerates files
   - `/api/trends`: Returns cached or fresh trends data
4. **Rendering:** Components receive JSON, render with shadcn styling
5. **Refresh:** Client can poll or use SWR to refresh data

---

## File Structure

```
app/
├── research/
│   └── page.tsx              # Research page (CSR)
api/
├── research/
│   ├── memory/
│   │   └── route.ts          # GET /api/research/memory
│   └── trends/
│       └── route.ts          # GET /api/research/trends
memory/
└── research/
    ├── DIGEST_latest.md       # COO digest content
    └── *.md                   # Research files
```

---

## Security

### Authentication
- [x] All API routes require valid session cookie
- [x] Session validated via existing auth middleware (`middleware.ts` — `withAuth` wrapper)
- [x] 401 returned for unauthenticated requests

**Session Auth Implementation:**
```typescript
// middleware.ts
import { withAuth } from 'lib/auth-middleware';

export async function GET(req: Request) {
  return withAuth(req, async (session) => {
    // Authenticated handler logic
  });
}
```

### Authorization
- [x] No additional role requirements (all authenticated users)
- [x] Future: may restrict to specific user roles

### Input Validation
- [x] No user input accepted (read-only endpoints)
- [x] Query parameters validated if added later
- [x] File paths sanitized (no directory traversal)
- [x] File extension restricted to `.md` only

**File Path Traversal Prevention:**
```typescript
import path from 'path';
import { z } from 'zod';

const BASE_PATH = process.env.MEMORY_RESEARCH_PATH;

function safeFilePath(filename: string): string {
  const safeName = path.basename(filename); // strips any path
  const fullPath = path.resolve(BASE_PATH, safeName);
  
  if (!fullPath.startsWith(path.resolve(BASE_PATH))) {
    throw new Error('Invalid path');
  }
  if (path.extname(fullPath) !== '.md') {
    throw new Error('Invalid file type');
  }
  return fullPath;
}
```

### Rate Limiting
- [x] Rate limiting configured via existing rate limiter
- [x] Limit: **100 requests/minute per session**
- [x] 429 Too Many Requests returned when exceeded

**Rate Limit Implementation:**
```typescript
import { rateLimit } from 'lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  max: 100, // 100 requests per interval
});

export async function GET(req: Request) {
  const session = await getSession(req);
  const identifier = session.user.id;
  
  const { success } = await limiter.check(identifier);
  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }
  // Continue handler...
}
```

### Markdown XSS Prevention
- [x] Markdown parsed to JSON structure (no raw HTML)
- [x] Rendered via React components (not `dangerouslySetInnerHTML`)
- [x] If HTML rendering needed: sanitize with `isomorphic-dompurify`

**Markdown Sanitization:**
```typescript
// Option A: JSON-only output (preferred)
const parsed = grayMatter(content);
const output = {
  topic: parsed.data.topic,
  insights: parsed.data.insights,
  // ... no raw HTML
};

// Option B: If HTML rendering required
import DOMPurify from 'isomorphic-dompurify';
const cleanHTML = DOMPurify.sanitize(markdownToHTML(raw));
```

### Error Handling
- [x] Structured JSON error responses
- [x] No stack traces or internal paths leaked
- [x] Graceful degradation if files missing
- [x] Request timeout (5s) for file operations

### Security Checklist (CISO Approved)
- [x] Session auth enforced on both endpoints
- [x] File path traversal prevention (path.resolve + startsWith check)
- [x] Rate limiting configured (100 req/min/session)
- [x] No sensitive data in error messages
- [x] Markdown XSS prevented (JSON-only output or DOMPurify)
- [ ] HTTPS enforced in production (server config)

---

## Performance Considerations

| Metric | Target |
|--------|--------|
| API Response (memory) | < 500ms |
| API Response (trends) | < 1s |
| Page Load (LCP) | < 2.5s |
| Cache TTL (memory) | 5 minutes |
| Cache TTL (trends) | 10 minutes |

**Optimizations:**
- SWR for client-side caching and revalidation
- Lazy load trends data (lower priority)
- Skeleton loading states for perceived performance

---

## Environment Variables

```env
# Required
MEMORY_RESEARCH_PATH=/root/.openclaw/workspace/memory/research

# Optional
TRENDS_API_URL=https://api.example.com/trends
TRENDS_API_KEY=xxx  # If external trends service used
```

---

---

## Component Mapping

| Phase 2 Component | Implementation |
|-------------------|----------------|
| DigestSpotlightCard | `components/research/DigestSpotlightCard.tsx` |
| PlatformTrendsCard | `components/research/PlatformTrendsCard.tsx` |
| TopicItem | `components/research/TopicItem.tsx` |
| ResearchFileCard | `components/research/ResearchFileCard.tsx` |
| SectionHeader | `components/ui/section-header.tsx` (shared) |
| LoadingSkeleton | `components/ui/skeleton.tsx` (shadcn) |

---

## Testing Strategy

### Unit Tests
- Markdown parsing utilities
- File enumeration logic
- Error handling paths

### Integration Tests
- API route responses
- Session auth enforcement
- File system mock tests

### E2E Tests (Phase 5 UAT)
- Page loads without errors
- All three sections render
- Error states display correctly
- Loading skeletons appear

---

## Dependencies

**New npm packages required:**
- `zod` — request validation
- `gray-matter` — markdown frontmatter parsing
- `isomorphic-dompurify` — HTML sanitization (if HTML rendering needed)

Existing stack:
- `next` (framework)
- `fs` / `path` (Node.js built-ins)
- `swr` (data fetching)

---

**CTO_SIGNED:** `FABIO_CTO_SIGNED_2026-04-04`

**Document Status:** v1.1 — CISO APPROVED

**CISO_SIGNED:** `FABIO_CISO_SIGNED_2026-04-04`
**Review:** All 4 issues addressed — rate limiting (100 req/min), file path sanitization (path.resolve + startsWith), session auth (withAuth wrapper), markdown XSS (JSON-only output).
