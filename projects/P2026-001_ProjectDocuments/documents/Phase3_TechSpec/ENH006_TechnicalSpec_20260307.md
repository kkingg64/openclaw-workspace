# ENH006 Technical Spec - Dashboard Live Data Integration

**項目:** P2026-001 Dashboard  
**階段:** Phase 3 - Technical Specification  
**負責人:** CTO  
**日期:** 2026-03-07  
**狀態:** IN_PROGRESS

---

## 📋 任務

為 ENH006 提供技術實現方案

---

## 1. 技術架構

### 1.1 整體架構

```
┌─────────────────────────────────────────────────────────────┐
│                     VERCEL (Frontend)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Clock.tsx   │  │AgentStatus  │  │  API Route  │        │
│  │(useEffect) │  │(useSWR)    │  │/api/agents  │        │
│  └─────────────┘  └─────────────┘  └──────┬──────┘        │
└─────────────────────────────────────────────┼───────────────┘
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   VPS (Bridge Service)                      │
│  ┌─────────────────────────────────────────────────────┐     │
│  │              Next.js API Route                      │     │
│  │         (Serverless Function on VPS)                │     │
│  └─────────────────────┬───────────────────────────────┘     │
│                        │                                      │
│  ┌─────────────────────▼───────────────────────────────┐    │
│  │            OpenClaw CLI Wrapper                      │    │
│  │  • openclaw agents list                             │    │
│  │  • openclaw sessions --active 30                    │    │
│  └───────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 部署選項

| 組件 | 位置 | 方式 |
|------|------|------|
| Dashboard (UI) | Vercel | Next.js |
| Bridge API | VPS | Node.js / Next.js |
| OpenClaw | VPS (已有) | Docker |

---

## 2. Clock Implementation

### 2.1 Code Change (Minimal)

```typescript
// app/components/Clock.tsx
"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { 
        hour12: false,
        hour: "2-digit",
        minute: "2-digit", 
        second: "2-digit" 
      }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000); // 1 second
    return () => clearInterval(timer);
  }, []);

  return (
    <span style={{ 
      fontFamily: "monospace",
      color: "#22D3EE",
      fontWeight: "bold"
    }}>
      {time}
    </span>
  );
}
```

### 2.2 文件位置
- 新建：`app/components/Clock.tsx`
- 修改：`app/page.tsx` - import Clock component

---

## 3. Agent Status Implementation

### 3.1 VPS Bridge API

```typescript
// pages/api/agents.ts (VPS Next.js)
import { execSync } from "child_process";

export default async function handler(req, res) {
  try {
    // Get agents list
    const agentsOutput = execSync('openclaw agents list', { 
      encoding: 'utf8',
      timeout: 10000 
    });
    
    // Get active sessions (last 30 mins)
    const sessionsOutput = execSync('openclaw sessions --active 30 --json', { 
      encoding: 'utf8',
      timeout: 10000 
    });
    
    const agents = parseAgents(agentsOutput);
    const sessions = JSON.parse(sessionsOutput);
    
    // Map agent status
    const statusMap = agents.map(agent => ({
      id: agent.id,
      name: agent.name,
      role: agent.role,
      status: getAgentStatus(agent.id, sessions), // ACTIVE/IDLE
      currentTask: getCurrentTask(agent.id, sessions),
    }));
    
    res.status(200).json({ agents: statusMap, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getAgentStatus(agentId, sessions) {
  const agentSessions = sessions.sessions?.filter(s => s.agentId === agentId);
  if (agentSessions?.some(s => s.ageMs < 30 * 60 * 1000)) {
    return "ACTIVE";
  }
  return "IDLE";
}
```

### 3.2 Vercel API Route (Proxy)

```typescript
// app/api/agents/route.ts (Vercel)
export async function GET() {
  const VPS_API_URL = process.env.VPS_API_URL || 'http://YOUR_VPS_IP:3000';
  
  try {
    const response = await fetch(`${VPS_API_URL}/api/agents`);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
```

### 3.3 Frontend Component

```typescript
// app/components/AgentStatus.tsx
"use client";
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function AgentStatus() {
  const { data, error } = useSWR('/api/agents', fetcher, {
    refreshInterval: 30000, // 30 seconds
  });

  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      {data.agents.map(agent => (
        <div key={agent.id} className="agent-row">
          <StatusDot status={agent.status} />
          <span>{agent.name}</span>
          <span>{agent.status}</span>
          <span>{agent.currentTask}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## 4. Environment Variables

### 4.1 Vercel
```
VPS_API_URL=https://your-vps-ip:port
```

### 4.2 VPS
```
OPENCLAW_STATE_DIR=/root/.openclaw
```

---

## 5. Security Considerations

| 項目 | 措施 |
|------|------|
| API 認證 | Basic Auth 或 API Key |
| Rate Limiting | 每分鐘 60 請求 |
| CORS | 只允許 Vercel domain |
| HTTPS | 強制 HTTPS |

---

## 6. 文件結構

```
P2026-001_Dashboard/
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── components/
│   │   ├── Clock.tsx         # NEW
│   │   ├── AgentStatus.tsx   # NEW
│   │   └── StatusDot.tsx     # NEW
│   └── api/
│       └── agents/
│           └── route.ts     # NEW (Vercel proxy)
├── pages/
│   └── api/
│       └── agents.ts         # Bridge API (VPS)
└── package.json
```

---

## 7. 開發時間估算

| Task | 小時 |
|------|------|
| Clock Component | 1 |
| VPS Bridge API | 3 |
| Vercel Proxy | 1 |
| AgentStatus Component | 2 |
| Testing & QA | 2 |
| **Total** | **9** |

---

## ✅ CTO 簽署

**CTO_APPROVED_20260307**

- ✅ Technical Spec completed
- ✅ Architecture defined
- ✅ Implementation plan ready

---

## ✅ CISO 簽署

**CISO_APPROVED_20260307**

- ✅ Security considerations reviewed
- ✅ API authentication required

---

## ✅ CEO 簽署

**[CEO_SIGNED_20260307_0305]**

- ✅ Technical Spec approved
- ✅ Security review passed
- ✅ **Implementation by CTO**

**批准進入 Phase 4 (Implementation)**

---

*Technical spec by CTO - 2026-03-07*
