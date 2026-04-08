# Phase 4.5 — Deployment Verification Protocol (v1.0)

> **Purpose:** Verify deployment method and environment before UAT (Phase 5)
> **Version:** v1.0 (2026-04-03)
> **Owner:** CTO (deployment) + CISO (verification)
> **Gate:** 4.5→MR2 blocks if deployment verification FAILS
> **SLA:** 2 business hours from code push to verified deployment
> **Referenced from:** `protocols/phase-gates.md` → Protocol Quick Reference → Phase 4.5
> **Next Step:** `protocols/model-review.md` (v11.6) → MR-2 gate review by 3 models
> **Related:** `protocols/phase5-uat-protocol.md` (comes after MR-2 approval)

---

## Deployment Method Verification (MANDATORY)

Before Phase 4.5→MR2 gate approval, CTO must verify deployment method is correct:

### Supported Deployment Methods

| Method | Tool | Verification |
|--------|------|--------------|
| **Docker Compose** | `docker-compose.yml` at root | Must exist, must have all services |
| **Kubernetes** | `k8s/` folder + manifests | Must have pod specs, service, ingress |
| **Cloud Platform** | AWS/GCP/Azure console | Manual deployment checklist |
| **Direct Server** | SSH + systemd/supervisor | Process manager must be running |

**Blocker:** If deployment method is unclear or unstandardized = Gate 4.5→MR2 BLOCKS

---

## Environment Configuration Verification (CRITICAL)

### Pre-Deployment Checklist

**Developer (Local Environment):**
```bash
# Step 1: Verify .env template exists
ls projects/{ID}_{CODE_NAME}/.env.example || echo "❌ .env.example MISSING"

# Step 2: Verify all required .env variables are documented
grep -E "^[A-Z_]+" projects/{ID}_{CODE_NAME}/.env.example | wc -l

# Step 3: Check .env is in .gitignore
grep "^\.env" projects/{ID}_{CODE_NAME}/.gitignore || echo "❌ .env not in .gitignore"

# Step 4: Verify keys are NOT hardcoded in source
grep -r "password\|secret\|api_key" projects/{ID}_{CODE_NAME}/ --include="*.js" --include="*.ts" \
  | grep -v ".env" | head -5 || echo "✓ No hardcoded secrets found"
```

**Staging Environment:**
```bash
# Step 5: Verify .env.staging exists
ls /opt/.env.{ID}.staging || echo "❌ .env.staging MISSING"

# Step 6: Verify all required variables are SET (not empty)
cat /opt/.env.{ID}.staging | while read line; do
  VAR=$(echo $line | cut -d= -f1)
  VAL=$(echo $line | cut -d= -f2)
  if [ -z "$VAL" ]; then
    echo "❌ $VAR is empty"
  fi
done

# Step 7: Log mismatch check (never log passwords)
grep -E "password|token|secret" /opt/.env.{ID}.staging | wc -l
# Expected: 0 (secrets should not be visible in logs)
```

**Production Environment:**
```bash
# Step 8: Verify .env.production exists (separate from staging)
ssh prod-server "ls /opt/.env.{ID}.prod" || echo "❌ .env.prod MISSING on production"

# Step 9: Verify all required variables are SET
ssh prod-server "cat /opt/.env.{ID}.prod | grep -c '='" 
# Expected: at least N variables (count from .env.example)

# Step 10: Verify production uses DIFFERENT passwords than staging
STAGING_DB_PASS=$(grep "DB_PASSWORD" /opt/.env.{ID}.staging | cut -d= -f2)
PROD_DB_PASS=$(ssh prod-server "grep 'DB_PASSWORD' /opt/.env.{ID}.prod" | cut -d= -f2)
if [ "$STAGING_DB_PASS" = "$PROD_DB_PASS" ]; then
  echo "❌ CRITICAL: Production using SAME password as staging"
  exit 1
fi
```

---

## Database & Service Connectivity Verification (CRITICAL)

### Pre-UAT Connectivity Checks

**Database Connectivity:**
```bash
# Test database connection (CTO verifies locally first)
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS -e "SELECT 1" || echo "❌ Database unreachable"

# Verify database SCHEMA is correct (tables exist)
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS {DB_NAME} -e "SHOW TABLES;" | wc -l
# Expected: ≥ 3 tables

# Verify migrations ran
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS {DB_NAME} -e "SELECT version FROM migrations ORDER BY version DESC LIMIT 1;"
# Expected: Latest version

# Check for stale data from previous deploys
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS {DB_NAME} -e "SELECT COUNT(*) FROM users;" 
# Expected: Production should have realistic counts, not development fixtures
```

**Cache/Redis Connectivity:**
```bash
# Redis connection test
redis-cli -h $REDIS_HOST ping || echo "❌ Redis unreachable"

# Verify Redis has no stale dev data
redis-cli -h $REDIS_HOST FLUSHDB  # Only in staging; NEVER in production!
```

**External Service Dependencies:**
```bash
# Check API gateway / load balancer health
curl -s https://dashboard.madhorse.cloud/health | grep -q "ok" || echo "❌ API gateway unhealthy"

# Check microservice endpoints (if applicable)
for service in auth-service api-service worker-service; do
  curl -s https://$service.internal/health || echo "❌ $service unreachable"
done

# Check message queue (if applicable)
rabbitmq-admin list_connections -u guest -p guest || echo "❌ RabbitMQ unreachable"
```

---

## Endpoint Availability Verification (CRITICAL)

### Login Endpoint Check (Phase 4.5→MR2 Hard Requirement)

```bash
# Test login endpoint exists and responds (HTTP 200)
curl -w "\nHTTP_CODE:%{http_code}\n" -X POST https://dashboard.madhorse.cloud/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@madhorse.cloud","password":"test"}' \
  -o /tmp/login_response.json

# Expected output:
# HTTP_CODE:200  (authentication failu expected, endpoint exists)
# OR HTTP_CODE:401 (credentials wrong, but endpoint responds)
# NOT HTTP_CODE:502 or 503 (bad deployment)

# If you get 502/503 → deployment failed, check:
# 1. Docker containers running? (docker ps)
# 2. Nginx/reverse proxy running? (systemctl status nginx)
# 3. Backend service logs? (docker logs {service-name})
# 4. Firewall rules? (should allow :3008, :443)
# 5. DNS resolving correctly? (nslookup dashboard.madhorse.cloud)
```

### Health Check Endpoints

```bash
# Standard health check
curl -s https://dashboard.madhorse.cloud/health | python3 -m json.tool

# Expected JSON response:
{
  "status": "ok",
  "timestamp": "2026-04-03T15:30:00Z",
  "version": "1.0.0",
  "checks": {
    "database": "connected",
    "redis": "connected",
    "auth": "ok"
  }
}

# Any "down" status = Gate 4.5→MR2 BLOCKS
```

---

## Deployment Method Validation Checklist (Gate 4.5→MR2)

**Before CISO can verify, CTO must complete:**

| Item | Expected Result | Owner | Status |
|------|-----------------|-------|--------|
| Deployment method documented | Docker/K8s/Cloud/SSH specified | CTO | ☐ |
| .env.example exists | File has all required keys | CTO | ☐ |
| .env.staging complete | All variables have values | CTO | ☐ |
| .env.production complete | All variables have values | CTO | ☐ |
| .env.production ≠ .env.staging | Different DB passwords | CTO | ☐ |
| Database schema migrated | Latest migration ran | CTO | ☐ |
| Cache/Redis connected | Responsive to ping | CTO | ☐ |
| Health endpoint HTTP 200 | /health returns valid JSON | CTO | ☐ |
| Login endpoint HTTP 200 or 401 | NOT 502/503 | CTO | ☐ |
| No hardcoded secrets | grep finds no credentials in code | CTO | ☐ |
| Load balancer health | API gateway responding | CTO | ☐ |
| Firewall rules | Production allows traffic to ports | CTO | ☐ |
| DNS resolution | dashboard.madhorse.cloud resolves | CTO | ☐ |

**If ANY item is ☐ (not verified):**
- Gate 4.5→MR2 is BLOCKED
- CTO must fix and re-verify
- CISO re-checks before approval

---

## Common Deployment Failures & Fixes

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| Login returns HTTP 502 Bad Gateway | Backend service not running | `docker ps` - start missing containers |
| Login returns HTTP 503 Service Unavailable | Reverse proxy (nginx) down | `systemctl restart nginx` |
| Endpoint returns HTTP 504 Gateway Timeout | Database hanging | Check database service, restart if needed |
| "Connection refused" | Port not exposed/forwarded | Check docker-compose ports, K8s service, firewall rules |
| 404 in /api/auth/login | Wrong deployment method (deployed to wrong server) | Verify DNS, load balancer routing |
| Database connection error | .env.staging pointed to production DB | Verify separate .env files per environment |
| "Access denied" in database logs | DB user credentials wrong in .env | Verify .env.production has correct credentials |
| Session token invalid after login | Redis cache not running | `docker ps` - check redis container |
| Email notification not sending | SMTP not configured | Verify SMTP settings in .env |
| File upload fails | Storage bucket credentials mismatched | Check AWS/GCS credentials in .env |

---

## Pre-Production Checklist (REQUIRED BEFORE 4.5→MR2 GATE)

```
CTO Deployment Verification:
☐ Deployment method is standardized (Docker/K8s/etc documented)
☐ Environment variables documented in .env.example
☐ Staging has separate .env.staging (never use production secrets in staging)
☐ Production has separate .env.production
☐ Database migrations completed (check version)
☐ Cache/Redis connected and working
☐ No hardcoded credentials in source code
☐ Health endpoint returns 200 with valid JSON
☐ Login endpoint returns 200 (on success) or 401 (on auth fail), NOT 502/503
☐ Load balancer/API gateway healthy
☐ DNS resolves correctly
☐ Firewall allows required ports

CISO Verification:
☐ Production .env is encrypted/secured (not in git)
☐ Secrets not logged anywhere
☐ Database backups running
☐ Production !== Staging (different passwords, different servers)
☐ Deployment method is documented (for disaster recovery)
☐ Rollback procedure documented
```

---

## SLA & Escalation

| Milestone | SLA | Soft Cap | Escalation |
|-----------|-----|----------|------------|
| Environment check complete | 2 hours | 4 hours | CEO notification |
| All endpoints verified | 2 hours | 4 hours | CEO escalation |
| Deployment FAIL | 24 hours to fix | — | Rollback to Phase 4 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-04-03 | Initial Phase 4.5 deployment verification protocol with environment checks + health endpoints + failure troubleshooting |
