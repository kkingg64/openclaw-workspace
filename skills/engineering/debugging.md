# Debugging Protocol

## ⛔ 3-Fix Hard Stop Rule (Iron Law)
```
同一個 bug 嘗試 3 次修復全部失敗：
  → STOP
  → 向 CEO 報告
  → 根源分析：架構問題？假設錯？
  → 用 gemini_advisor 或 copilot_reviewer 做 second opinion
```

> 連續猜測係浪費時間。3 次失敗 = 理解有根本性錯誤。

## 系統化排查順序
```
Layer 1: 環境   → Mount、路徑、權限、.env 變數
Layer 2: 容器   → docker ps、logs、exec sh
Layer 3: 網絡   → curl 測試端口、DNS、防火牆
Layer 4: 代碼   → 日誌、stack trace、Logic Bug
```

## 快速診斷指令
```bash
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker logs <container> --tail 50 -f
docker exec -it <container> sh
curl -v http://localhost:<port>/api/health
docker exec <container> env | grep -i api
docker stats --no-stream
```

## 常見問題
| 問題 | 第一步 | 指令 |
|------|--------|------|
| 404 | 路徑、Mount | `docker exec <c> ls /app/src/app/api` |
| 500 | 環境變數 | `docker exec <c> env \| grep API` |
| Crash loop | OOM / startup | `docker logs <c> --tail 100` |
| Build fail | TS error | `docker logs <c> \| grep "error TS"` |
| Port conflict | 占用 | `lsof -i :<port>` |
