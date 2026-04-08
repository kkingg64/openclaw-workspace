# P2026-008 MADHORSE HQ — Technical Specification

**Project:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 3 (Technical Specification)  
**Version:** v1.0  
**Date:** 2026-04-03 HKT  
**Owner:** CTO  
**Status:** 🔄 DRAFT — Ready for CISO Review

---

## 1. Goal

Define the complete technical architecture for MADHORSE HQ — an Enterprise Mission Control Dashboard targeting 100+ stars on GitHub, with zero-trust security model and mock-data-first approach for MVP.

---

## 2. MVP Scope (from Phase 2)

| Module | Scope | Notes |
|--------|-------|-------|
| Core Dashboard | 4 pages: Dashboard, Research, Trends, Agents | MVP only |
| UI Framework | shadcn/ui v0.3.0 | Dark theme (MADHORSE tokens) |
| External Integrations | Mock data for all | No live APIs until Phase 3.1+ |
| Authentication | MVP mock | Google OAuth deferred |

**Deferred (Phase 3.1+):**
- Live social media APIs (TikTok, 小紅書, Instagram, Twitter, YouTube)
- Real authentication (Google OAuth)
- Agent Discussions (threaded)
- Hot Reels Spotlight
- Mobile touch gestures

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         MADHORSE HQ                              │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Next.js 14+ App Router)                               │
│  └── shadcn/ui v0.3.0 + MADHORSE Dark Theme                    │
├─────────────────────────────────────────────────────────────────┤
│  API Layer (Next.js Route Handlers)                             │
│  └── /api/system | /api/agents | /api/discussions | /api/projects │
│      /api/research | /api/trends | /api/sessions                │
├─────────────────────────────────────────────────────────────────┤
│  Service Layer                                                   │
│  └── SystemMonitor | SessionService | ProjectService            │
│      ResearchService | TrendsService                            │
├─────────────────────────────────────────────────────────────────┤
│  Data Layer                                                      │
│  └── OpenClaw Sessions (JSONL) | Mock JSON (MVP)               │
│      SQLite via Prisma (Phase 3.1+)                            │
└─────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| Framework | Next.js | 14+ | App Router |
| UI Components | shadcn/ui | 0.3.0 | Radix UI primitives |
| Styling | Tailwind CSS | latest | + MADHORSE dark tokens |
| State/Fetching | TanStack Query | v5 | React Query |
| Real-time | SSE | — | 30s polling with EventSource |
| Validation | Zod | — | Schema validation |
| Icons | Lucide React | — | shadcn/ui default |
| Auth | Mock (MVP) | — | Real NextAuth in Phase 3.1+ |

---

## 4. Module Boundaries

| Module | Responsibility | Interface |
|--------|---------------|-----------|
| `SystemMonitor` | VPS metrics display | `/api/system` → 30s SSE |
| `AgentStatus` | 6 agent cards + detail | `/api/agents` → OpenClaw sessions_list |
| `ReasoningLog` | Expandable reasoning | `/api/sessions/:id` → JSONL history |
| `ProjectStatus` | Project grid + milestones | `/api/projects` → Mock JSON |
| `ResearchHub` | Featured + filtered research | `/api/research` → Mock JSON |
| `HotTrends` | Platform tabs + trend cards | `/api/trends` → Mock JSON (5 platforms) |

---

## 5. Data Flow

### 5.1 System Monitor Flow

```
1. Page load → React Query fetches /api/system
2. API route → exec() SSH commands on VPS (df -h | free -m | top -bn1)
3. Response parsed → SystemStatus type
4. 30s SSE subscription maintains real-time updates
5. MetricCard components render with progress bars
```

### 5.2 Agent Status Flow

```
1. Page load → React Query fetches /api/agents
2. API route → calls sessions_list() tool
3. Sessions parsed → AgentStatus derived (ACTIVE/BUSY/IDLE/ERROR)
4. 30s SSE subscription maintains real-time updates
5. AgentCard grid renders with status badges
```

### 5.3 Reasoning Log Flow

```
1. User clicks AgentCard → navigate to /agents/[id]
2. Page load → fetch /api/agents/[id]
3. API route → calls sessions_history(sessionKey)
4. JSONL parsed → reasoning logs extracted
5. Collapsible component renders thought history
```

---

## 6. API Design

### 6.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/system` | CEO only | VPS metrics |
| GET | `/api/agents` | CEO only | Agent status list |
| GET | `/api/agents/[id]` | CEO only | Single agent detail |
| GET | `/api/sessions` | CEO only | Project sessions |
| GET | `/api/sessions/[id]` | CEO only | Session messages + reasoning |
| GET | `/api/projects` | CEO only | Project status |
| GET | `/api/research` | CEO only | Research items |
| GET | `/api/trends` | CEO only | Trending topics (mock) |
| GET | `/api/sse` | CEO only | Real-time updates |

### 6.2 Response Shapes

```typescript
// /api/system
{
  cpu: { usage: number; cores: number; temperature: number };
  ram: { used: number; total: number; percentage: number };
  storage: { used: number; total: number; percentage: number; mount: string };
  network: { inbound: number; outbound: number; unit: string };
  uptime: number;
  timestamp: string;
}

// /api/agents
{
  agents: Array<{
    id: string;
    name: string;
    role: string;
    status: 'ACTIVE' | 'BUSY' | 'IDLE' | 'ERROR';
    currentTask?: string;
    lastActive: string;
  }>;
  timestamp: string;
}

// /api/trends
{
  platform: 'tiktok' | 'xhs' | 'instagram' | 'twitter' | 'youtube';
  trends: Array<{
    rank: number;
    topic: string;
    views: number;
    engagement: 'High' | 'Medium' | 'Low';
  }>;
  lastUpdated: string;
}
```

### 6.3 Mock Data Strategy

| Endpoint | Mock Data Location | Refresh |
|----------|-------------------|---------|
| `/api/system` | Real SSH commands | 30s |
| `/api/agents` | OpenClaw sessions_list | 30s |
| `/api/sessions/*` | OpenClaw JSONL files | On-demand |
| `/api/projects` | `mock/projects.json` | Static |
| `/api/research` | `mock/research.json` | Static |
| `/api/trends` | `mock/trends/[platform].json` | Static (MVP) |

---

## 7. Security Model

### 7.1 Authentication (MVP Mock)

```typescript
// middleware.ts — MVP mock auth
// All /api/* routes require Authorization header
// Header format: "Bearer mock-token-ceo"
// Phase 3.1+ → NextAuth.js with real Google OAuth
```

### 7.2 Authorization Matrix

| Role | System | Agents | Projects | Research | Trends |
|------|--------|--------|----------|----------|--------|
| CEO | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Viewer | ❌ | ❌ | ❌ | ❌ | ❌ |

### 7.3 Security Headers

```typescript
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self' data:;",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};
```

### 7.4 Zero Trust Principles

- [ ] All API routes require authentication check
- [ ] Input validation at every system boundary (Zod schemas)
- [ ] No secrets in code — environment variables only
- [ ] No sensitive data in console.log
- [ ] SSH commands use parameterized inputs (no string concatenation)

---

## 8. File Structure

```
madhorse-hq/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Auth layout with Header
│   │   ├── page.tsx                # Dashboard home
│   │   ├── agents/
│   │   │   ├── page.tsx            # Agents grid
│   │   │   └── [id]/page.tsx       # Agent detail + reasoning
│   │   ├── research/
│   │   │   └── page.tsx            # Research hub
│   │   └── trends/
│   │       └── page.tsx            # Hot trends
│   ├── api/
│   │   ├── system/route.ts
│   │   ├── agents/route.ts
│   │   ├── agents/[id]/route.ts
│   │   ├── sessions/route.ts
│   │   ├── sessions/[id]/route.ts
│   │   ├── projects/route.ts
│   │   ├── research/route.ts
│   │   ├── trends/route.ts
│   │   └── sse/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                         # shadcn/ui (button, card, badge, etc.)
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── PageContainer.tsx
│   ├── dashboard/
│   │   ├── SystemMonitor.tsx
│   │   ├── SystemMetricCard.tsx
│   │   ├── AgentStatusGrid.tsx
│   │   ├── AgentCard.tsx
│   │   ├── ProjectStatusGrid.tsx
│   │   └── ProjectCard.tsx
│   ├── agents/
│   │   ├── AgentDetail.tsx
│   │   └── ReasoningLog.tsx
│   ├── research/
│   │   ├── ResearchCard.tsx
│   │   ├── ResearchFeatured.tsx
│   │   └── ResearchFilters.tsx
│   └── trends/
│       ├── PlatformTabs.tsx
│       └── TrendCard.tsx
├── lib/
│   ├── openclaw.ts                 # sessions_list, sessions_history wrappers
│   ├── api.ts                      # Fetch functions
│   ├── auth.ts                     # Mock auth (MVP)
│   ├── utils.ts                    # cn(), formatDate(), etc.
│   └── constants.ts
├── hooks/
│   ├── useSystemStatus.ts
│   ├── useAgents.ts
│   ├── useSSE.ts
│   └── ...
├── services/
│   ├── system.service.ts           # SSH commands
│   └── session.service.ts         # OpenClaw integration
├── mock/
│   ├── projects.json
│   ├── research.json
│   └── trends/
│       ├── tiktok.json
│       ├── xhs.json
│       ├── instagram.json
│       ├── twitter.json
│       └── youtube.json
├── types/
│   ├── agent.ts
│   ├── system.ts
│   ├── project.ts
│   ├── research.ts
│   └── trend.ts
├── styles/
│   └── globals.css                 # MADHORSE dark tokens
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 9. Component Inventory (MVP Subset)

| Component | States | shadcn Base | Token Source |
|-----------|--------|-------------|-------------|
| `SystemMetricCard` | default, hover, loading, error | `Card`, `Progress` | `Component_Inventory.md` §2 |
| `AgentCard` | default, hover, active, disabled | `Card`, `Badge`, `Avatar` | `Component_Inventory.md` §3 |
| `ReasoningLog` | collapsed, expanded, loading | `Card`, `ScrollArea`, `Collapsible` | `Component_Inventory.md` §3 |
| `ProjectCard` | default, hover, active | `Card`, `Progress`, `Badge` | `Component_Inventory.md` §4 |
| `ResearchCard` | default, hover | `Card`, `Badge` | `Component_Inventory.md` §5 |
| `ResearchFeatured` | default, loading | `Card`, `Badge` | `Component_Inventory.md` §5 |
| `PlatformTabs` | default, hover, active, disabled | `Tabs`, `Button` | `Component_Inventory.md` §6 |
| `TrendCard` | default, hover | `Card` | `Component_Inventory.md` §6 |

---

## 10. Real-time Architecture

### SSE Endpoint

```typescript
// app/api/sse/route.ts
export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const sendUpdate = async () => {
        const [system, agents] = await Promise.all([
          fetchSystemStatus(),
          sessions_list(),
        ]);
        controller.enqueue(encoder.encode(
          `event: heartbeat\ndata: ${JSON.stringify({ timestamp: Date.now() })}\n\n`
        ));
        controller.enqueue(encoder.encode(
          `event: system_update\ndata: ${JSON.stringify(system)}\n\n`
        ));
        controller.enqueue(encoder.encode(
          `event: agent_update\ndata: ${JSON.stringify({ agents })}\n\n`
        ));
      };
      sendUpdate();
      const interval = setInterval(sendUpdate, 30000);
      req.signal.addEventListener('abort', () => clearInterval(interval));
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

### React Query Integration

```typescript
// hooks/useSSE.ts
export function useSSE(eventType: string, onMessage: (data: T) => void) {
  useEffect(() => {
    const eventSource = new EventSource('/api/sse');
    eventSource.addEventListener(eventType, (e) => onMessage(JSON.parse(e.data)));
    return () => eventSource.close();
  }, [eventType, onMessage]);
}
```

---

## 11. Performance Budget (from Phase 2)

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | < 2.5s | P75 on 4G |
| TTI | < 3.8s | P75 on 4G |
| CLS | < 0.1 | P75 on 4G |
| Initial JS Bundle | < 250KB gzipped | webpack-bundle-analyzer |
| CSS | < 30KB gzipped | — |
| Total Initial Load | < 390KB gzipped | Lighthouse |

**Code Splitting:**
| Route | Loading Strategy |
|-------|-----------------|
| `/` (Dashboard) | Initial |
| `/agents` | Initial |
| `/research` | Lazy |
| `/trends` | Lazy |

---

## 12. Environment Variables

```env
# .env.local — MVP (no real secrets)

# Mock Auth (MVP)
MOCK_AUTH_TOKEN="mock-token-ceo"

# OpenClaw
OPENCLAW_STATE_DIR="/root/.openclaw"

# VPS SSH (for real System Monitor)
VPS_HOST="76.13.215.13"
VPS_USER="root"
# SSH key at: /root/.ssh/id_ed25519
```

---

## 13. Implementation Plan

### Phase 3.1: Foundation
- [ ] Initialize Next.js 14+ with App Router
- [ ] Install and configure shadcn/ui v0.3.0
- [ ] Apply MADHORSE dark theme tokens
- [ ] Set up project structure

### Phase 3.2: Core Pages
- [ ] Dashboard layout + Header
- [ ] SystemMonitor + 4 MetricCards
- [ ] AgentStatusGrid + AgentCard (6 agents)
- [ ] ProjectStatusGrid + ProjectCard

### Phase 3.3: Detail Pages
- [ ] Agent detail page + ReasoningLog
- [ ] Research hub + FeaturedResearch + ResearchFilters
- [ ] Hot trends + PlatformTabs + TrendCards

### Phase 3.4: Real-time
- [ ] SSE endpoint implementation
- [ ] React Query + useSSE hook
- [ ] 30s auto-refresh integration

### Phase 3.5: Mock Data
- [ ] Create mock JSON files for all data types
- [ ] Wire up API routes to mock data
- [ ] Verify all 4 pages render correctly

---

## 14. CISO Requirements for Phase 3→4 Gate

From `protocols/phase-gates.md`:

> **Phase 3→4 Gate blockers:**
> - CEO 未 APPROVE
> - **無 CISO Security Review**
> - **無 CISO_SAFE tag**
> - **Pre-Submission Self-Check FAIL**

**CISO_SAFE requirements:**
- [ ] Auth on all `/api/*` routes
- [ ] No hardcoded secrets (env vars only)
- [ ] Input validation with Zod
- [ ] Security headers configured
- [ ] No eval/exec with user input
- [ ] No sensitive data in logs

---

## 15. Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@tanstack/react-query": "^5.28.0",
    "shadcn-ui": "0.3.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.356.0",
    "zod": "^3.22.0",
    "date-fns": "^3.3.0",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-progress": "^1.0.3"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "eslint": "^8.56.0"
  }
}
```

---

## 16. Sign-off

| Role | Signature | Date |
|------|-----------|------|
| CTO (Owner) | `[FABIO_CTO_SIGNED_2026-04-03_HKT]` | ✅ Complete |
| CISO (Verifier) | `[FABIO_CISO_SIGNED_2026-04-03_1227_HKT]` | ✅ Complete |
| CEO (Approver) | `[FABIO_CEO_SIGNED_2026-04-03_1228_HKT]` | ✅ Complete |

---

**Document Status:** v1.0 — APPROVED
**CTO_SIGNED:** `[FABIO_CTO_SIGNED_2026-04-03_1222_HKT]`
**CISO_SIGNED:** `[FABIO_CISO_SIGNED_2026-04-03_1227_HKT]`
**CEO_SIGNED:** `[FABIO_CEO_SIGNED_2026-04-03_1228_HKT]`
