# Operations & Recovery Runbook

Practical procedures for the production deployment (single Lightsail box, Docker
Compose behind Cloudflare). Read the relevant section top to bottom before
running anything.

All commands assume the repo is checked out at `~/Portfolio` on the server and
are run from there. The compose invocation is always:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod <command>
```

---

## What is NOT in git (recreate these on a fresh box)

The repo alone cannot bring the site back — these are server-local and
deliberately untracked:

| Item                              | Where                   | How to recreate                                                                                             |
| --------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.env.prod`                       | repo root on the server | from `.env.prod.example`; regenerate `JWT_SECRET` with `openssl rand -hex 32`, set the DB/admin secrets     |
| `infra/certs/origin.pem` + `.key` | mounted into nginx      | issue a new Cloudflare **Origin Certificate** (dashboard → SSL/TLS → Origin Server), paste into these files |
| `~/backup-db.sh`                  | home dir                | copy from `infra/backup-db.sh`, `chmod +x`                                                                  |
| cron entry                        | `crontab -e`            | `0 3 * * * /home/ubuntu/backup-db.sh >> /home/ubuntu/db-backups/backup.log 2>&1`                            |
| `~/.hc-url`                       | home dir                | the healthchecks.io ping URL, `chmod 600`                                                                   |

Keep a copy of `.env.prod` somewhere safe off the server — losing the
`JWT_SECRET` logs every admin session out; losing the DB secrets needs a DB
reset.

---

## Deploying a change

```bash
git pull

# App code (frontend/backend) changed -> rebuild the affected image:
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build frontend

# nginx.prod.conf changed -> see the gotcha below (a reload is NOT enough).
```

### nginx config gotcha — reload does not pick up a `git pull`

`infra/nginx.prod.conf` is bind-mounted as a **single file**. `git pull`
replaces the file (new inode), but the running container still holds the old
inode, so `nginx -s reload` re-reads the **stale** copy and nothing changes.
A config change needs the container recreated so the mount re-binds:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --force-recreate nginx

# verify the running config is the new one:
docker compose -f docker-compose.prod.yml --env-file .env.prod exec nginx \
  nginx -t
```

(Learned live during the 2026-08-20 SEO deploy.)

---

## Rolling back a bad deploy

Nothing in git is destructive to roll back — containers are stateless and images
rebuild from source. **Data and migrations are the exception** (see the DB
section).

```bash
# 1. Find the last good commit:
git log --oneline -10

# 2. Check it out and redeploy:
git checkout <good-commit>
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
# if nginx config differs between the two commits, add:
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --force-recreate nginx

# 3. Once main is fixed, return to it:
git checkout main
```

If a **migration** shipped in the bad deploy, code rollback alone will not undo
the schema change (`prisma migrate deploy` is one-way). Restore the database
from the pre-deploy backup, or write and apply a reverting migration.

---

## Restoring the database

Backups live in `~/db-backups/` (gzip'd, 7-day retention, nightly at 03:00).

```bash
# Restore into a THROWAWAY database first to confirm the dump is good:
docker compose -f docker-compose.prod.yml --env-file .env.prod exec -T db \
  psql -U portfolio -d postgres -c 'CREATE DATABASE restore_test;'
gunzip -c ~/db-backups/backup-<date>.sql.gz | \
  docker compose -f docker-compose.prod.yml --env-file .env.prod exec -T db \
  psql -U portfolio -d restore_test -v ON_ERROR_STOP=1

# Sanity check, then promote when satisfied (stop backend, drop+recreate, load).
```

A valid dump always contains `CREATE TABLE` and the `_prisma_migrations` rows,
so a restored DB reports its migrations as already applied and the backend does
not re-run them on start.

---

## Origin firewall (Lightsail)

The origin must be reachable **only through Cloudflare**, or the WAF, DDoS
protection and edge rate limiting are all optional for anyone who finds the IP,
and a forged `X-Forwarded-For` can bypass the app's own rate limiter.

**This is done in the Lightsail console, not ufw** — Docker publishes ports
through its own iptables chains and bypasses ufw's INPUT filter, so a ufw rule
on 80/443 does nothing. Lightsail filters upstream of the box.

Lightsail → instance → Networking → IPv4 Firewall:

1. **Disable IPv6 networking** (only if there is no `AAAA` record pointing at
   the origin — Cloudflare reaches an IPv4-only origin fine).
2. **HTTPS 443** → restrict to the Cloudflare IPv4 ranges from
   <https://www.cloudflare.com/ips-v4> (currently 15). Remove the "Anywhere"
   allowance.
3. **Delete the HTTP 80 rule** — Cloudflare connects to the origin on 443 only.
4. **Leave SSH 22 alone** — it is protected by key-only auth + fail2ban.

Verify from a non-Cloudflare host: a direct request to the origin IP must fail.

```bash
curl -sk https://<origin-ip>/ -H "Host: ogulcantekines.com" -m 10   # -> timeout
```

Re-check the Cloudflare ranges roughly once a year — Cloudflare changes them
rarely, but an added range that is not allow-listed would drop real traffic.

---

## Quick health checks

```bash
# Site up through Cloudflare:
curl -s -o /dev/null -w '%{http_code}\n' https://ogulcantekines.com/

# API reaching the database:
curl -s https://ogulcantekines.com/api/projects | head -c 80

# Containers and disk:
docker compose -f docker-compose.prod.yml --env-file .env.prod ps
df -h /
docker system df
```
