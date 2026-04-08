# MADHORSE Ltd. - Long-term Memory

> Last Updated: 2026-04-05

---

## 🛠️ Technical Knowledge

### Docker + Next.js Deployment
- **Node Version**: Next.js 16.1.6 requires Node.js 20.9+ → Use `node:22-alpine`
- **Docker Compose**: Use `docker compose` (v2) not `docker-compose` (v1)
- **Config Files**: Don't have both `next.config.ts` and `next.config.js` - pick one

### MiniMax API
- API key can be domain-restricted → returns `{"success":false,"error":"invalid domain"}`
- Workaround: Use fallback data or switch to OpenAI/Claude

---

## 🎯 Project Status (as of 2026-03-08)

| Project | Phase | URL |
|---------|-------|-----|
| P2026-001 Dashboard | 5 - Running | http://76.13.215.13:3002 |
| P2026-002 Meal Planner | 4 - Running | http://76.13.215.13:3000 |
| P2026-003 Research Dashboard | 4 - Running | http://76.13.215.13:3001 |

---

## 🔑 Key Contacts & Access

### Hostinger VPS
- IP: 76.13.215.13
- SSH: `ssh root@76.13.215.13` — SSH key 方式，key 在 `/root/.ssh/id_ed25519`（已 mount 入 openclaw container）
- Key 已加入 VPS authorized_keys: ✅ `2026-03-30`
- Docker projects: /opt/ai-fabio-corp/

---

## 💡 Business Priorities

### Immediate Actions (2026-W14)
1. **🔴 緊急 — OpenClaw 安全漏洞** — 立即通知團隊進行安全評估（情緒操控漏洞）
2. **🔴 緊急 — AI 安全審計 SaaS** — 研究切入可行性（Anthropic × Pentagon 法律戰顯示需求爆發）
3. **🟠 高 — Meeting Intelligence 驗證** — 聯繫 5-10 個 CS Leaders，確認中文市場 PMF
4. **🟠 高 — Reels First 策略** — Instagram Reels 係 TikTok 遷移紅利最大受益者，立即啟動

### Ongoing Priorities
- Set DNS for marhorse.cloud
- Fix Meal Planner API
- Launch to market

### 2026-Q1 Key Insights (from Weekly Digest W11-W13)
- **Skills Economy** 係最被低估的商業機會，早入早搵
- **垂直 AI Agent**（汽車/醫療/物流/保險）係藍海，東南亞機會大
- **AI Startup 變現** — 三點核心：清晰用例、明確 ROI、靈活定價
- **Short Video** — 流量不值錢，變現能力先係核心競爭力
- **AI Agent 安全治理** — 企業級部署需求正在爆發
- **MCP 生態** — 2026 Q2 形成商業版圖，評測/整合服務係商機
- **W13 新增 ⭐ AI 安全合規** — Anthropic × Pentagon 法律戰揭示需求爆發，AI 安全審計 SaaS 係 NOW 機會（1-3 個月可回本）
- **W13 新增 ⭐ 設備端AI** — Google TurboQuant 突破，邊緣 AI 市場 CAGR 40%+，模型蒸餾服務係最佳切入點
- **W13 新增 ⭐ Meeting Intelligence** — 中文市場無強力競爭者，6 週可驗證 PMF
- **W13 新增 ⚠️ OpenClaw 情緒操控漏洞** — 需立即通知團隊進行安全評估

### 2026-W14 Key Insights (from Weekly Digest W14)
- **AI Agent定價** — $299/mo係魔法數字；用「pain cost × 30%」法則定價
- **海灣國家** — UAE/Saudi係被低估嘅AI市場，CAC低40-60%但願付意願高
- **TikTok算法突變** — ERS（情感共鳴分）取代完播率；發佈後45分鐘係黃金窗口
- **Micro-influencer** — 10K-100K粉絲engagement rate 3-8%，品牌prefer呢個區間
- **AI視頻爆發** — Kling 2.0/Pika 2.0成本跌至真人1/30，轉捩點已到
- **MCP生態** — 事實標準形成，垂直行業MCP Servers係藍海（法律/醫療/金融/製造）
- **Agent Reliability Infra** — 2026最大未滿足需求，Datadog唔會做呢個
- **Skills變現** — 成功公式：獨特數據/算法 + 測試覆蓋 + 持續維護訂閱
- **內容電商** — 取代直播帶貨，「教育型內容→私域→變現」漏斗係新主流
- **Outcome-based定價** — Hybrid（Base + Usage）係Enterprise AI SaaS最佳實踐
