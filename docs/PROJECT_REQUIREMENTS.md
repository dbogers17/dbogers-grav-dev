# Project requirements

Dit document is de permanente checklist voor iedere release.

## Proces per update

- Alle eerdere en nieuwe verzoeken nalopen.
- Devwebsite vooraf live controleren.
- Versie volgens SemVer verhogen.
- Code, JSON, routes en assets testen zover mogelijk.
- Changelog, roadmap, requirements, architectuur en testplan bijwerken.
- Updatescript leveren dat alleen de devrepository wijzigt.
- Na installatie live controleren en regressies vastleggen.
- Verbeteringen en plan voor de volgende update voorstellen.

## Portal

- Mini-game alleen op ontgrendelde Secret Lab-pagina.
- Cursor volgen, 30 seconden wachten bij stilstaande cursor, daarna autopilot.
- Cursor buiten browser start rustige autopilot zonder sprong naar boven.
- Schip zit achter banners en kaarten en gebruikt de actieve savegame-ship en galaxy.
- Klikbare galaxy- en versiebadges.
- Websitebediening en scrollen hebben voorrang.

## Full game

- Open 2D-ruimtewereld met onderscheidende galaxies.
- Minimap en fullscreen interactieve map.
- Verhaal, mainquests, sidequests, dialogen en verborgen locaties.
- Schepen met eigen silhouet, stats, rollen en upgrades.
- Settings voor graphics, FPS, effecten, audio, controls en accessibility.
- Duidelijk zichtbare `EXIT TO SECRET LAB`-knop met save en bevestiging.
- Later server-authoritative multiplayer, cloud saves en leaderboards.

## Vormgeving

- Game-achtige ruimteachtergronden als primaire inspiratie.
- Geloofwaardige lagen: sterren met variabele helderheid en kleur, gas/stof, objecten op verschillende schaal, planeten, stations, asteroïden en passerende schepen.
- Iedere galaxy heeft eigen kleur, objecten, verhaal, missies en geheimen.

## Veiligheid en prestaties

- Geen secrets of accounts in Git.
- Geen onbetrouwbare clientscore accepteren voor publieke leaderboards.
- Geen externe runtimecode tenzij expliciet beoordeeld.
- Begrensde canvasresolutie, deeltjes en FPS.
- DOM-content via veilige vaste templates en textContent waar dynamisch.
