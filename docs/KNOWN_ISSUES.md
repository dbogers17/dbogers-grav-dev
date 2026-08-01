# Known issues

## v0.9.0

- Audio controls are placeholders until the Web Audio system is introduced.
- The first map is informational; navigation target selection returns in v0.9.1.
- Multiplayer is not active; only architectural boundaries are prepared.
- Portal mini-game still uses the older renderer and will migrate after the full engine stabilizes.

## Resolved in v0.10.2

- v0.10.1 rendered a black screen because `RenderSystem.js` contained one extra closing brace and failed module parsing.

## Resolved in v0.11.1

- v0.11.0 failed with `Unexpected token '{'` because `UIManager.render()` was not closed before `setDockPrompt()`.
