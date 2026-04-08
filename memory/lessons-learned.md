
## P2026-008 CSS/iPhone Safari 問題（2026-04-05）
- **問題：** iPhone Safari 顯示 raw HTML（CSS 未加载）
- **原因：** 客戶瀏覽器 cache 問題，非伺服器 MIME types
- **解決：** Settings → Safari → "Clear History and Website Data"
- **預防經驗：** 遇到 iPhone 特定問題，先清除 cache 再排查伺服器

## MADHORSE Dashboard v7 Deploy Issue（2026-04-05）
- **問題：** Dashboard rebuild v7 後登入成功但 JS chunks 404
- **原因：** Nginx static files 指向 `/opt/dashboard_build/.next/static/`（舊 v6 build），但 v7 container 有自己嘅新版 static files
- **解決：** `docker exec dashboard tar -C /app/.next -c static | tar -C /opt/dashboard_build/.next -x`
- **預防：** 每次 rebuild dashboard image 後要同步 static files，或改變 static files serving 方式（用 container 直接 serve）
