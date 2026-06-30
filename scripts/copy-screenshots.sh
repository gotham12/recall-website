#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
ASSETS="/Users/advaith/.cursor/projects/Users-advaith-Recall-recall/assets"
DEST="$ROOT/public/screenshots"
mkdir -p "$DEST"

copy_ts() {
  local ts="$1" name="$2"
  local src
  src=$(ls "$ASSETS"/*"$ts"* 2>/dev/null | head -1 || true)
  if [[ -z "$src" ]]; then
    echo "WARN: missing screenshot for $name (ts=$ts)" >&2
    return 1
  fi
  cp "$src" "$DEST/$name"
  echo "OK $name"
}

copy_ts "10.58.09" "supervisor-insights.png"
copy_ts "10.58.43" "supervisor-recall-ai.png"
copy_ts "10.58.59" "supervisor-overview.png"
copy_ts "10.59.13" "patient-meds.png"
copy_ts "10.59.26" "patient-routine.png"
copy_ts "10.59.39" "patient-clara.png"
copy_ts "10.59.49" "patient-today.png"
copy_ts "11.00.00" "patient-people.png"

echo "Screenshots ready in $DEST"
