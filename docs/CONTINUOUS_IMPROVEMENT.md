# Continuous improvement loop

Every release must: inspect the live dev site; review requirements, known issues and technical debt; define acceptance tests; research more stable patterns; check licenses before reuse; keep rendering/input/UI/state separate; validate all save and user input; bound FPS, canvas resolution and entity counts; run syntax, unit and smoke tests; update documentation; support rollback; verify the live release after deployment; fix regressions before new features.

The assistant cannot work while the conversation is inactive, but every active development round follows this checklist.

## Mandatory release gate

Every update must run `tools/validate-space-explorer.sh` before commit and push. A failure blocks the release. GitHub Actions independently repeats the same validation. No syntax check may be skipped when Node.js is unavailable; Node.js is now a required release dependency.
