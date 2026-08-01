# Secret Lab Space Explorer

Space Explorer bestaat uit twee gekoppelde ervaringen:

1. **Portal mini-game** op `/secret-lab`: rustige achtergrondgame, cursor/autopilot, optionele WASD-besturing en dezelfde actieve galaxy en hetzelfde schip als de volledige game.
2. **Full game** op `/secret-lab/space-explorer`: open 2D-ruimtewereld met locaties, quests, galaxy map, minimap, schepen, saves en later multiplayer.

## Einddoel

Een lichte browsergame die eenvoudig begint op de Secret Lab-pagina en geleidelijk uitgroeit tot een volledige ruimte-RPG met verhaal, sidequests, scheepsrollen, upgrades, galaxies, co-op, betrouwbare saves en gevalideerde leaderboards.

## Belangrijke regels

- De normale websitebediening heeft altijd voorrang.
- De mini-game verschijnt uitsluitend wanneer Secret Lab daadwerkelijk is ontgrendeld.
- Geen externe runtime libraries voor de game-engine.
- Geen secrets, accounts of productieconfiguratie in deze repository.
- Clientdata en scores zijn nooit betrouwbaar voor een publiek leaderboard. Online scores moeten later server-side worden gevalideerd.
- Canvasresolutie en aantallen deeltjes blijven begrensd voor mobiel en oudere hardware.
- Saves blijven versieerbaar en worden bij het laden opgeschoond.

## Workflow

```bash
grav-push
# updatescript uitvoeren
grav-pull
docker exec Grav_Dev sh -c 'cd /app/www/public && bin/grav clearcache'
```

Zie ook `ARCHITECTURE.md`, `ROADMAP.md`, `CHANGELOG.md` en `TESTING.md`.
