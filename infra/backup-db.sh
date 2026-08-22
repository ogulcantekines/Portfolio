#!/bin/bash
# Production PostgreSQL backup — the source of truth for the script that runs on
# the server. Deploy it there as ~/backup-db.sh and drive it from cron:
#
#   0 3 * * * /home/ubuntu/backup-db.sh >> /home/ubuntu/db-backups/backup.log 2>&1
#
# It expects the repo checked out at $HOME/Portfolio and, optionally, a
# healthchecks.io ping URL in $HOME/.hc-url (kept off the repo — it is a
# capability token). Cron runs with a bare environment, so PATH is set
# explicitly and every path is absolute.
set -euo pipefail
export PATH=/usr/bin:/usr/local/bin:$PATH

BACKUP_DIR="$HOME/db-backups"
HC_URL="$(cat "$HOME/.hc-url" 2>/dev/null || true)"
cd "$HOME/Portfolio"

FILE="$BACKUP_DIR/backup-$(date +%F-%H%M).sql.gz"
TMP="$FILE.partial"

# Report the outcome to healthchecks.io on every exit path: success pings the
# check, failure pings /fail so the alert fires now instead of a day later.
# Monitoring being down must never fail the backup itself -> `|| true`.
finish() {
  code=$?
  rm -f "$TMP"
  if [ -n "$HC_URL" ]; then
    if [ "$code" -eq 0 ]; then
      curl -fsS -m 10 --retry 3 "$HC_URL" >/dev/null || true
    else
      curl -fsS -m 10 --retry 3 "$HC_URL/fail" >/dev/null || true
    fi
  fi
}
trap finish EXIT

# Dump to a temp file first; a valid gzip'd dump always contains the schema, so
# grepping for CREATE TABLE catches truncation and gzip corruption before the
# file is promoted to its real name. `pipefail` makes a failing pg_dump fail the
# whole pipe even though gzip succeeds.
docker compose -f docker-compose.prod.yml --env-file .env.prod exec -T db \
  pg_dump -U portfolio -d portfolio | gzip > "$TMP"

if ! gunzip -c "$TMP" | grep -q "CREATE TABLE"; then
  echo "$(date): BACKUP FAILED — dump is incomplete, discarding"
  exit 1
fi

# Only a validated dump ever gets the real name — a half-written file can never
# be mistaken for a good backup. Then prune backups older than 7 days.
mv "$TMP" "$FILE"
find "$BACKUP_DIR" -name 'backup-*.sql*' -mtime +7 -delete
echo "$(date): backup done -> $FILE ($(du -h "$FILE" | cut -f1))"
