#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="/Users/advaith/.cursor/projects/Users-advaith-Recall-recall/assets"
CURSOR_ASSETS="/Users/advaith/.cursor/projects/Users-advaith-Downloads-Recall-recall-website/assets"
DEST="$ROOT/public/screenshots"
mkdir -p "$DEST"

copy_file() {
  local src="$1" name="$2"
  if [[ ! -f "$src" ]]; then
    echo "WARN: missing $src" >&2
    return 1
  fi
  cp "$src" "$DEST/$name"
  echo "OK $name"
}

# App screenshots
copy_file "$ASSETS/image-752245aa-d9be-4fcb-a432-eeeac96ce173.png" "supervisor-overview.png" || true
copy_file "$ASSETS/image-52ae1612-52e5-4db7-81a0-2f894e61d6c4.png" "supervisor-recall-ai.png" || true
copy_file "$ASSETS/image-8f920cc4-ca76-43a3-b4b4-b9ca7872b503.png" "supervisor-insights.png" || true
copy_file "$ASSETS/image-840b5efa-9815-4258-86ad-c356a9cb8cf6.png" "supervisor-acse.png" || true
copy_file "$ASSETS/image-e43ffba7-4198-4c2e-8ee1-029b23dc10e5.png" "supervisor-schedule.png" || true
copy_file "$ASSETS/image-34b3e04f-9390-43ed-a4e9-05712ad260b2.png" "patient-today.png" || true
copy_file "$ASSETS/image-098aedc7-8768-47b8-89d6-26f7ed336a8b.png" "patient-clara.png" || true
copy_file "$ASSETS/image-5bbfaa66-dbd7-40e9-81bf-aa0310dfa23e.png" "patient-meds.png" || true
copy_file "$ASSETS/image-31b680e4-c5f4-476c-8185-2aca6434b569.png" "patient-people.png" || true
copy_file "$ASSETS/image-8c5624b4-ac5c-47f4-afde-2b16fac634eb.png" "patient-routine.png" || true

# Team photos
copy_file "$CURSOR_ASSETS/image-85609d6c-7396-4398-8638-824e9b3c946e.png" "advaith-vijayasankaran.png" || true
copy_file "$CURSOR_ASSETS/image-71b9c100-fc93-46ab-b808-1d8bed08e5e4.png" "param-tyagi.png" || true

# Generated visuals
copy_file "$CURSOR_ASSETS/problem-atmosphere.png" "problem-atmosphere.png" || true
copy_file "$CURSOR_ASSETS/product-hope.png" "product-hope.png" || true
copy_file "$CURSOR_ASSETS/recall-neural-care.png" "recall-neural-care.png" || true

echo "Assets ready in $DEST"
