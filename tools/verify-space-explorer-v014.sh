#!/usr/bin/env bash
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
for p in helix-cooperative helix-v2 creator-v2; do test ! -e "theme/quark2-custom/assets/space-explorer/$p" || { echo "FAIL legacy asset path: $p"; exit 1; }; done
if grep -RInE 'helix-cooperative|helix-v2|creator-v2|PilotCreatorV2|StableHelixRenderer|HelixStationRenderer|AssetManager' theme/quark2-custom/js/space-explorer theme/quark2-custom/css/space-explorer; then
  echo 'FAIL legacy asset or runtime reference'; exit 1
fi
# Old save names may occur exactly once in the intentional cleanup expression.
SAVE_CLEANUP_COUNT=$(grep -RhoE 'secretLabSpace' theme/quark2-custom/js/space-explorer | wc -l)
test "$SAVE_CLEANUP_COUNT" -eq 1 || { echo "FAIL old save cleanup references expected=1 actual=$SAVE_CLEANUP_COUNT"; exit 1; }
grep -Rq "spaceExplorer(?!V014)" theme/quark2-custom/js/space-explorer || { echo 'FAIL old save cleanup expression missing'; exit 1; }
sha256sum -c theme/quark2-custom/data/space-explorer/integrity-manifest.sha256
EXPECTED=$(wc -l < theme/quark2-custom/data/space-explorer/integrity-manifest.sha256)
ACTUAL=$(find theme/quark2-custom/js/space-explorer theme/quark2-custom/css/space-explorer theme/quark2-custom/assets/space-explorer/v014 theme/quark2-custom/data/space-explorer -type f ! -name integrity-manifest.sha256 | wc -l)
test "$EXPECTED" -eq "$ACTUAL" || { echo "FAIL unexpected files expected=$EXPECTED actual=$ACTUAL"; exit 1; }
echo "Space Explorer v0.14.0 two-way integrity passed: $EXPECTED files"
