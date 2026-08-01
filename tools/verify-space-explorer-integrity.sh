#!/usr/bin/env bash
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel)"; cd "$ROOT"
MANIFEST=theme/quark2-custom/data/space-explorer/integrity-manifest.sha256
[[ -s "$MANIFEST" ]] || { echo 'FOUT: integrity manifest ontbreekt'; exit 1; }
sha256sum -c "$MANIFEST"
COUNT=$(wc -l < "$MANIFEST")
echo "Space Explorer integrity verification passed"
echo "Files checked: $COUNT"
echo "Missing or modified files: 0"
