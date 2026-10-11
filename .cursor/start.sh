#!/usr/bin/env bash
set -euo pipefail

cd /workspace

# Next.js reads .env.local when present; Cloud Agent secrets are also injected as env vars.
if [[ ! -f .env.local ]] && [[ -n "${NEXT_PUBLIC_SUPABASE_URL:-}" ]]; then
  cat > .env.local <<EOF
NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY:-}
EOF
fi

exec pnpm exec next dev --hostname 0.0.0.0 --port 3000
