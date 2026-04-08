# P2026-008 Phase 4 — Test Credentials

**Project:** MADHORSE HQ  
**Date:** 2026-04-03 HKT  
**Environment:** Production (VPS: 76.13.215.13)

---

## Test Accounts

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| CEO | fabio@madhorse.cloud | admin123 | Primary admin account |
| Viewer | viewer@madhorse.cloud | viewer123 | Read-only guest |
| Member | member@madhorse.cloud | member123 | Team member |

---

## Seed Data Verification

```bash
# Verify users exist in DB
docker exec dashboard node /app/check_users.js

# Output: [{"email":"fabio@madhorse.cloud","name":"Fabio CEO"}, ...]
```

---

## Auth Endpoint Verification

```bash
# NextAuth providers (both Google OAuth and Credentials configured)
curl https://dashboard.marhorse.cloud/api/auth/providers

# Response:
# {"google":{...},"credentials":{...}}
```

---

## Callback URL Test

```bash
# Credentials callback returns 400 (expected - needs POST body)
curl -sI https://dashboard.marhorse.cloud/api/auth/callback/credentials
# HTTP/1.1 400 Bad Request (expected - missing credentials in body)
```

---

## Production URL

- **App:** https://dashboard.marhorse.cloud
- **Login:** https://dashboard.marhorse.cloud/login
- **Auth API:** https://dashboard.marhorse.cloud/api/auth/providers

---

## Known Issues

1. **Google OAuth** - Not yet configured (deferred to Phase 4.5)
2. **Credentials callback** - Returns 400 without POST body (expected behavior)
3. **Session cookies** - Require valid login flow through UI

---

## Database

- **Type:** SQLite (file-based)
- **Location in container:** `/app/prisma/dev.db`
- **Size:** 176,128 bytes
- **Seeded:** Yes (3 users, 4 projects, 8 tasks, 3 research entries, activities)
