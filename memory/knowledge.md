# MADHORSE Ltd. — Knowledge Base

> Merged from MEMORY.md + lessons-learned.md (2026-04-01)

---

## Technical Knowledge

### Docker + Next.js
- Next.js 16.1.6 requires Node.js 20.9+ → `node:22-alpine`
- Use `docker compose` (v2) not `docker-compose` (v1)
- Don't have both `next.config.ts` and `next.config.js`

### MiniMax API
- API key can be domain-restricted → `{"success":false,"error":"invalid domain"}`
- Correct endpoint: `/v1/text/chatcompletion_v2` (not `/v1/chat/completions`)
- Correct model: `M2-her` (not `MiniMax-M2.5`)
- Strip `<|thinking|>` / `<|thought|>` tokens from response
- JSON cleaning: `indexOf('{')` + `lastIndexOf('}')`, remove markdown code blocks

### Penpot
- Plugin API `connectLibrary()` has bug — returns ClojureScript Promise, breaks plugin
- `get_style_guide()` / `get_style_guide_tags()` permanently broken (fetch failed)
- CDO 用 createBoard/createRectangle/createText 手砌 = 正確方案

### Pencil CLI
- Must use full path: `node /usr/lib/node_modules/@pencil.dev/cli/dist/index.cjs`
- `pencil` symlink breaks in Docker bind-mount
- `content` not `text` for text nodes
- Pencil templates (.pen) have schema issues — use Tabler HTML as reference instead

---

## Infrastructure

### VPS
- IP: 76.13.215.13
- SSH: `ssh root@76.13.215.13` (key auth, key at `/root/.ssh/id_ed25519`)

---

## Business Priorities (2026-Q1)

- Skills Economy — 最被低估嘅商業機會
- 垂直 AI Agent（汽車/醫療/物流/保險）— 東南亞藍海
- AI Safety Compliance — Anthropic × Pentagon 法律戰顯示需求爆發
- Meeting Intelligence — 中文市場無強力競爭者

---

## Lessons Learned

### 2026-03-06 | Dashboard Enhancement
- 任何改動必須經過 proper flow
- BAU enhancement 要先記錄 backlog → 老闆批 [GO_V2]

### 2026-03-07 | CEO 違反 Project Flow
- CEO 自己做曬所有 Phases，唔係 sub-agents 做
- **教訓：CEO = decision-maker，唔係 executor**

### 2026-03-07 | Card Animation Bug
- `useEffect` 30s time update → all Cards re-render → fadeIn re-trigger
- Fix: `hasAnimated` state，animation 只 mount 時 play 一次

### 2026-03-08 | MiniMax API JSON Parse
- Response 包含 `<|thinking|>` tokens + self-referential content
- Fix: Strengthen JSON cleaning logic
- **教訓：Official Doc 最可信**

### 2026-03-09 | Container .env Issue
- Container 冇讀取 `.env` environment variables
- Fix: `docker compose` 用 `env_file` or 傳 `-e` flags
