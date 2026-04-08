# P2026-008 MADHORSE HQ — Technical Specification

**項目:** MADHORSE HQ - Enterprise Mission Control Dashboard  
**Phase:** Phase 3 (Technical Architecture)  
**日期:** 2026-04-01 UTC  
**執行者:** CTO (Chief Technology Officer)  
**狀態:** ✅ PHASE 3 IN PROGRESS

---

## 1. Executive Summary

本文件定義 MADHORSE HQ 嘅完整技術架構。項目為 Enterprise Mission Control Dashboard，採用 Stripe Dashboard 風格（Light Mode），基於 OpenClaw 生態系統構建。

**Phase Definitions (Unified):**
| Phase | Name | Content |
|-------|------|---------|
| Phase 1 | Research | COO research, initial analysis |
| Phase 1.5 | Advisor Review | External AI advisor review |
| Phase 2 | Design | CDO design spec (UI/UX, Design System) |
| Phase 3 | Tech Spec + Implementation | CTO technical architecture + build |
| Phase 4 | Testing | UAT, integration testing |
| Phase 4.5 | Security Review | CISO security audit |
| Phase 5 | Deployment | Production deployment |
| Phase 6 | BAU | Business as usual |

> **Note:** Phase 3 = Tech Spec + Implementation (combined, not separate phases)

**Core Principle:** Discussion Threads 直接使用 OpenClaw Session Logs，唔需要自建 model 或 storage。

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MADHORSE HQ                                 │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   Frontend   │  │   Next.js    │  │  shadcn/ui   │               │
│  │   (React)    │←→│  App Router  │←→│  Components  │               │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘               │
│         │                │                                          │
│         │         ┌──────▼──────┐  ┌──────────────┐                  │
│         │         │ React Query │  │  NextAuth.js │                  │
│         │         │   (SSE)     │  │  (Auth v4)   │                  │
│         │         └──────┬──────┘  └──────────────┘                  │
│         │                │                                          │
│  ┌──────▼───────────────────────────────────────────────────────┐  │
│  │                     API Layer (Next.js Route Handlers)        │  │
│  │  /api/system | /api/agents | /api/discussions | /api/projects │  │
│  │  /api/research | /api/trends | /api/sse                        │  │
│  └──────┬───────────────────────────────────────────────────────┘  │
│         │                                                           │
│  ┌──────▼───────────────────────────────────────────────────────┐  │
│  │                   Service Layer                                 │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │  │
│  │  │ SystemMonitor│ │ SessionSvc │ │ ProjectSvc  │                │  │
│  │  │  Service    │ │  (OpenClaw) │ │             │                │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│         │                                                           │
│  ┌──────▼───────────────────────────────────────────────────────┐  │
│  │                    Data Layer                                  │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │  │
│  │  │  SQLite     │ │ OpenClaw   │ │ External    │                │  │
│  │  │  (Projects) │ │ (Sessions) │ │ APIs (YT/Reddit)              │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘                │  │
│  └────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Tech Stack

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| Framework | Next.js | 14+ | App Router |
| UI Components | shadcn/ui | latest | Based on Radix UI |
| State/Fetching | TanStack Query | v5 | React Query + SSE |
| Authentication | NextAuth.js | v4 (stable) | Auth.js |
| Database | SQLite | — | MVP / Phase 1 |
| ORM | Prisma | latest | SQLite → PostgreSQL |
| Real-time | SSE | — | Server-Sent Events |
| Styling | Tailwind CSS | latest | + CSS Variables |
| Icons | Lucide React | — | shadcn/ui default |
| Validation | Zod | — | Schema validation |

---

## 3. OpenClaw Integration

### 3.1 OpenClaw Architecture (Research Findings)

Based on OpenClaw internals research:

```
OpenClaw State Directory: ~/.openclaw/
├── agents/                    # Agent workspaces
│   └── {agent-name}/
│       └── sessions/
│           └── {session-id}.jsonl  # Session transcript (JSONL)
├── memory/
│   ├── fabio-boss.sqlite      # Memory database
│   └── runs.json              # Subagent run history
├── subagents/
│   └── runs.json              # Subagent orchestration
└── workspace/                  # Shared workspace
```

### 3.2 Session Log Format (JSONL)

Each message in a session transcript:
```json
{"type":"user","content":"...","timestamp":1775045340000}
{"type":"assistant","content":"...","timestamp":1775045341000,"reasoning":"..."}
```

### 3.3 Session Discovery API

| Endpoint | Source | Purpose |
|----------|--------|---------|
| `sessions_list()` tool | OpenClaw Gateway | List active sessions |
| `sessions_history(sessionKey)` | OpenClaw Gateway | Get session messages |
| `GET /api/sessions` | Next.js API | List project sessions |
| `GET /api/sessions/:id/messages` | Next.js API | Get session transcript |

### 3.4 Agent Status Derivation

Agent status derived from active sessions:
```typescript
type AgentStatus = 'ACTIVE' | 'BUSY' | 'IDLE' | 'ERROR';

function deriveAgentStatus(session: Session): AgentStatus {
  if (!session.active) return 'IDLE';
  const hasRecentMessages = Date.now() - session.updatedAt < 60000;
  return hasRecentMessages ? 'BUSY' : 'ACTIVE';
}
```

---

## 4. Database Schema

### 4.1 SQLite Schema (MVP)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// Project table (sourced from PROJECT_REGISTER.md)
model Project {
  id          String   @id @default(cuid())
  projectId   String   @unique  // e.g., "P2026-008"
  name        String
  phase       String   // "Phase 1", "Phase 2", "BAU", etc.
  status      String   // "Active", "Completed", "On Hold"
  owner       String   // Agent role
  progress    Int      @default(0)  // 0-100
  milestones  Json     // { completed: number, total: number }
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Research table
model Research {
  id          String   @id @default(cuid())
  title       String
  summary     String
  category    String   // "market" | "ai" | "strategy" | "tech"
  tags        String   // Comma-separated
  roiPotential String? // "High" | "Medium" | "Low"
  featured    Boolean  @default(false)
  source      String?  // Source URL or reference
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Discussion thread linking (lightweight join table)
model DiscussionLink {
  id          String   @id @default(cuid())
  sessionKey  String   @unique  // OpenClaw session key
  title       String
  projectId   String?  // Optional project association
  agentRole   String?  // Primary agent role
  createdAt   DateTime @default(now())
}
```

### 4.2 PostgreSQL Schema (Phase 2)

```prisma
// Same schema with provider = "postgresql"
// + Added indexes for performance

model Project {
  // ... same fields
  @@index([status])
  @@index([owner])
}

model Research {
  // ... same fields
  @@index([category])
  @@index([featured])
}
```

---

## 5. API Design

### 5.1 API Routes Structure

```
app/
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── system/route.ts           GET  /api/system
│   ├── agents/route.ts          GET  /api/agents
│   ├── agents/[id]/route.ts     GET  /api/agents/:id
│   ├── sessions/route.ts        GET  /api/sessions
│   ├── sessions/[id]/route.ts   GET  /api/sessions/:id
│   ├── discussions/route.ts      GET  /api/discussions
│   ├── projects/route.ts        GET  /api/projects
│   ├── research/route.ts        GET  /api/research
│   ├── trends/route.ts          GET  /api/trends
│   └── sse/route.ts             GET  /api/sse (real-time)
```

### 5.2 System Monitor API

**Endpoint:** `GET /api/system`  
**Auth:** CEO only  
**Data Source:** SSH commands on VPS

```typescript
// Response
{
  cpu: { usage: number; cores: number; temperature: number };
  ram: { used: number; total: number; percentage: number };
  storage: { used: number; total: number; percentage: number; mount: string };
  network: { inbound: number; outbound: number; unit: string };
  uptime: number;
  timestamp: string;  // ISO 8601
}
```

### 5.3 Agent Status API

**Endpoint:** `GET /api/agents`  
**Data Source:** OpenClaw sessions_list tool

```typescript
// Response
{
  agents: Array<{
    id: string;           // "fabio-boss"
    name: string;          // "CEO Fabio"
    role: string;          // "CEO"
    status: AgentStatus;   // "ACTIVE" | "BUSY" | "IDLE" | "ERROR"
    currentTask?: string;  // From latest session
    lastActive: string;    // ISO 8601
  }>;
  timestamp: string;
}
```

### 5.4 Discussion Threads API

**Endpoint:** `GET /api/discussions`  
**Query Params:** `?project=P2026-008&agent=CTO`  
**Data Source:** OpenClaw Session Logs (JSONL files)

```typescript
// Response
{
  discussions: Array<{
    id: string;            // OpenClaw session key
    title: string;         // Derived from first message or session metadata
    type: 'debate' | 'discussion' | 'advisor';
    participants: string[]; // Agent roles involved
    projectId?: string;
    messageCount: number;
    messages: Array<{
      id: string;
      role: 'user' | 'assistant';
      content: string;
      reasoning?: string;   // If available
      timestamp: string;
    }>;
    createdAt: string;
    updatedAt: string;
  }>;
  total: number;
}
```

**Key Design Decision:**  
> 直接使用 `/sessions/{id}/messages` 的 JSONL 格式，唔需要解析或轉換。
> 每個 discussion 即係一個 OpenClaw session，messages 係 session 內的對話。
> 需要自己建 `DiscussionLink` table 來追蹤哪些 session 屬於哪些 project/discussion。

### 5.5 Projects API

**Endpoint:** `GET /api/projects`  
**Data Source:** SQLite (PROJECT_REGISTER.md imported)

```typescript
// Response
{
  projects: Array<{
    id: string;
    projectId: string;
    name: string;
    phase: string;
    status: string;
    owner: string;
    progress: number;
    milestones: { completed: number; total: number };
  }>;
  timestamp: string;
}
```

### 5.6 Research API

**Endpoint:** `GET /api/research`  
**Query Params:** `?category=market&limit=20`  
**Data Source:** SQLite

```typescript
// Response
{
  items: Array<{
    id: string;
    title: string;
    summary: string;
    category: string;
    tags: string[];
    roiPotential?: string;
    featured: boolean;
    createdAt: string;
  }>;
  total: number;
}
```

### 5.7 Hot Trends API

**Endpoint:** `GET /api/trends`  
**Query Params:** `?platform=youtube|reddit`  
**Data Source:** External APIs (YouTube Data API, Reddit API)

```typescript
// Response
{
  platform: 'youtube' | 'reddit';
  trends: Array<{
    rank: number;
    topic: string;
    views?: number;        // YouTube
    comments?: number;     // Reddit
    engagement: 'High' | 'Medium' | 'Low';
    thumbnail?: string;
    url: string;
  }>;
  lastUpdated: string;
}
```

### 5.8 SSE Real-time API

**Endpoint:** `GET /api/sse`  
**Purpose:** Push real-time updates to dashboard

```typescript
// Event types
type SSEEvent =
  | { type: 'system_update'; data: SystemStatus }
  | { type: 'agent_update'; data: AgentStatus[] }
  | { type: 'discussion_new'; data: Discussion }
  | { type: 'heartbeat'; timestamp: number };

// Response: text/event-stream
event: system_update
data: {"cpu":{"usage":42.5},"ram":{...}}

event: agent_update
data: {"agents":[{"id":"fabio-boss","status":"ACTIVE",...}]}
```

---

## 6. Authentication & Authorization

### 6.1 NextAuth.js v4 Configuration

```typescript
// auth.ts
import { NextAuth } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role; // "CEO" | "Viewer"
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
  },
});

// For use in API routes:
export { auth };
```

### 6.2 Role-Based Access Control

```typescript
// lib/rbac.ts
export const RBAC = {
  CEO: ["*"],                    // Full access
  Viewer: ["dashboard", "agents", "research", "trends"],  // Read-only
} as const;

export type Role = keyof typeof RBAC;

// Middleware
export function canAccess(role: Role, resource: string): boolean {
  const permissions = RBAC[role];
  return permissions.includes("*") || permissions.includes(resource);
}
```

### 6.3 Middleware

```typescript
// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");

  // All API routes require auth (including SSE)
  if (isApiRoute && !isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isLoggedIn && !isLoginPage) {
    return Response.redirect(new URL("/login", req.url));
  }
});
```

### 6.4 Security Headers

```typescript
// middleware.ts (security headers)
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' wss: https:; font-src 'self' data:; frame-ancestors 'none';",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}
```

---

## 7. Real-time Architecture

### 7.1 SSE Implementation

```typescript
// app/api/sse/route.ts
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { sessions_list } from "@/lib/openclaw";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // CRITICAL: Require authentication for SSE endpoint
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const encoder = new TextEncoder();
  let intervalId: NodeJS.Timeout;

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial data
      const sendUpdate = async () => {
        try {
          const sessions = await sessions_list();
          const system = await fetchSystemStatus();
          
          controller.enqueue(
            encoder.encode(
              `event: heartbeat\ndata: ${JSON.stringify({ timestamp: Date.now() })}\n\n`
            )
          );
          controller.enqueue(
            encoder.encode(
              `event: agent_update\ndata: ${JSON.stringify({ agents: sessions })}\n\n`
            )
          );
        } catch (error) {
          console.error("SSE error:", error);
        }
      };

      // Send immediately, then every 30s
      await sendUpdate();
      intervalId = setInterval(sendUpdate, 30000);

      // Cleanup on close
      req.signal.addEventListener("abort", () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

### 7.2 React Query Integration

```typescript
// hooks/useSSE.ts
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useSSE<T>(eventType: string, onMessage: (data: T) => void) {
  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.addEventListener(eventType, (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    });

    return () => eventSource.close();
  }, [eventType, onMessage]);
}
```

---

## 8. Project Structure

```
P2026-008_MADHORSE_HQ/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Authenticated layout with header/sidebar
│   │   ├── page.tsx                # Dashboard home
│   │   ├── agents/
│   │   │   ├── page.tsx            # Agents grid
│   │   │   └── [id]/page.tsx       # Agent detail
│   │   ├── discussions/
│   │   │   ├── page.tsx            # Discussion threads list
│   │   │   └── [id]/page.tsx       # Thread detail
│   │   ├── projects/
│   │   │   └── page.tsx            # Project status grid
│   │   ├── research/
│   │   │   ├── page.tsx            # Research hub
│   │   │   └── [id]/page.tsx       # Research detail
│   │   └── trends/
│   │       ├── page.tsx            # Hot trends
│   │       └── [id]/page.tsx       # Trend detail
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── system/route.ts
│   │   ├── agents/route.ts
│   │   ├── agents/[id]/route.ts
│   │   ├── sessions/route.ts
│   │   ├── sessions/[id]/route.ts
│   │   ├── discussions/route.ts
│   │   ├── projects/route.ts
│   │   ├── research/route.ts
│   │   ├── trends/route.ts
│   │   └── sse/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PageContainer.tsx
│   │   └── MobileNav.tsx
│   ├── dashboard/
│   │   ├── SystemMonitor.tsx
│   │   ├── SystemMetricCard.tsx
│   │   ├── AgentStatusGrid.tsx
│   │   ├── AgentCard.tsx
│   │   ├── ProjectStatusGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   └── RecentActivity.tsx
│   ├── agents/
│   │   ├── AgentDetail.tsx
│   │   ├── AgentReasoningLog.tsx
│   │   ├── AgentDiscussionList.tsx
│   │   └── AgentStats.tsx
│   ├── discussions/
│   │   ├── DiscussionThread.tsx
│   │   ├── DiscussionMessage.tsx
│   │   └── DiscussionHeader.tsx
│   ├── research/
│   │   ├── ResearchCard.tsx
│   │   ├── ResearchFeatured.tsx
│   │   └── ResearchFilters.tsx
│   ├── trends/
│   │   ├── PlatformTabs.tsx
│   │   ├── TrendCard.tsx
│   │   └── TrendDetail.tsx
│   └── shared/
│       ├── StatusBadge.tsx
│       ├── RefreshIndicator.tsx
│       ├── ErrorState.tsx
│       ├── EmptyState.tsx
│       └── LoadingSkeleton.tsx
├── lib/
│   ├── openclaw.ts                 # OpenClaw API wrapper
│   ├── auth.ts                     # NextAuth config
│   ├── db.ts                       # Prisma client
│   ├── api.ts                      # API client functions
│   ├── rbac.ts                     # Role-based access
│   ├── utils.ts                    # Utility functions
│   └── constants.ts                # App constants
├── hooks/
│   ├── useSSE.ts                   # SSE subscription hook
│   ├── useSystemStatus.ts          # System monitor hook
│   ├── useAgents.ts                # Agents hook
│   ├── useDiscussions.ts           # Discussions hook
│   ├── useProjects.ts              # Projects hook
│   ├── useResearch.ts              # Research hook
│   └── useTrends.ts                # Trends hook
├── services/
│   ├── system.service.ts           # System monitoring
│   ├── session.service.ts          # OpenClaw session handling
│   ├── discussion.service.ts       # Discussion aggregation
│   ├── project.service.ts          # Project management
│   ├── research.service.ts         # Research management
│   └── trends.service.ts           # Hot trends fetching
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts                     # Seed data
│   └── migrations/
├── types/
│   ├── agent.ts
│   ├── discussion.ts
│   ├── project.ts
│   ├── research.ts
│   ├── system.ts
│   └── trend.ts
├── styles/
│   └── globals.css                 # CSS variables, Tailwind config
├── .env.local                      # Environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 9. Design Tokens (CSS Variables)

From CDO Phase 2 Design Spec:

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Colors */
  --color-bg: #F6F9FC;
  --color-surface: #FFFFFF;
  --color-primary: #4338CA;
  --color-primary-hover: #3730A3;
  --color-accent: #0EA5E9;
  --color-text: #1A1A2E;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-focus: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-primary);

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 150ms !important;
  }
}
```

---

## 10. Environment Variables

```env
# .env.local

# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="[PLACEHOLDER - GENERATE WITH: openssl rand -base64 32]"

# Google OAuth
GOOGLE_CLIENT_ID="[FROM GOOGLE CLOUD CONSOLE]"
GOOGLE_CLIENT_SECRET="[FROM GOOGLE CLOUD CONSOLE]"

# OpenClaw
OPENCLAW_STATE_DIR="/root/.openclaw"

# External APIs (Phase 2)
YOUTUBE_API_KEY="[FROM GOOGLE CLOUD CONSOLE]"
REDDIT_CLIENT_ID="[FROM REDDIT APP]"
REDDIT_CLIENT_SECRET="[FROM REDDIT APP]"

# VPS SSH (for System Monitor)
# SSH key stored in secret manager, NOT in env files
VPS_HOST="76.13.215.13"
VPS_USER="root"
# SSH_KEY_PATH resolved from secret manager at runtime
```

### 10.1 Secret Management Policy

| Secret | Storage | Rotation |
|--------|---------|----------|
| NEXTAUTH_SECRET | VPS secret manager (1Password/secrets stored in /opt/secrets/) | 90 days |
| GOOGLE_CLIENT_ID/SECRET | VPS secret manager | 180 days |
| SSH private key | `/opt/secrets/ssh/id_ed25519` (chmod 600) | 365 days |
| Database URL | VPS secret manager | On DB migration |

**Generation Commands:**
```bash
# NEXTAUTH_SECRET (minimum 32 bytes entropy)
openssl rand -base64 32

# SSH key (if needed)
ssh-keygen -t ed25519 -C "madhorse-vps-2026" -f /opt/secrets/ssh/id_ed25519
```

---

## 11. Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Discussion Threads | OpenClaw Session Logs | Direct use of existing JSONL transcripts, no duplication |
| Agent Status | Derived from sessions_list | Real-time status without additional tracking |
| Real-time | SSE | Simpler than WebSocket, works well with React Query |
| Database | SQLite (MVP) → PostgreSQL (Phase 2) | Quick start, easy migration path |
| Auth | NextAuth.js v4 | Full-stack, handles OAuth + Credentials |
| State Management | React Query | Server state + caching + real-time |

---

## 12. Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@tanstack/react-query": "^5.28.0",
    "next-auth": "^4.24.7",
    "@prisma/client": "^5.10.0",
    "shadcn-ui": "latest",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.356.0",
    "zod": "^3.22.0",
    "date-fns": "^3.3.0",
    "@radix-ui/react-*": "latest"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "prisma": "^5.10.0",
    "eslint": "^8.56.0"
  }
}
```

---

## 13. Next Steps

| Step | Description | Owner |
|------|-------------|-------|
| 3.1 | Initialize Next.js project with shadcn/ui | CTO |
| 3.2 | Configure Prisma with SQLite | CTO |
| 3.3 | Implement NextAuth.js v5 | CTO |
| 3.4 | Build OpenClaw session service | CTO |
| 3.5 | Create API routes (system, agents, discussions) | CTO |
| 3.6 | Build dashboard UI components | CDO/CTO |
| 3.7 | Integrate SSE real-time updates | CTO |
| 3.8 | Test and verify all P0 features | CTO/COO |

---

**CTO_SIGNED:** `[FABIO_CTO_SIGNED_2026-04-01_1209_UTC]`  
**STATUS:** PHASE 3 IN PROGRESS
