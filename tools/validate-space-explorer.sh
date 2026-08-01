#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(git rev-parse --show-toplevel)"
command -v node >/dev/null 2>&1 || { echo 'FOUT: Node.js is verplicht voor de Space Explorer releasecontrole.'; exit 1; }
NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])")"
if (( NODE_MAJOR < 20 )); then
  echo "FOUT: Node.js 20 of nieuwer is vereist. Huidige versie: $(node --version)"
  exit 1
fi
node tools/validate-space-explorer.mjs
node theme/quark2-custom/js/space-explorer/engine/tests/smoke.mjs
python3 -m json.tool theme/quark2-custom/data/space-explorer/version.json >/dev/null
echo 'Alle Space Explorer releasecontroles zijn geslaagd.'
