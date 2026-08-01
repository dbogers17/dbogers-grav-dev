# Testplan

## Portal

- Vergrendeld: geen canvas, schip of gameknoppen.
- Ontgrendeld: mini-game verschijnt zonder herladen.
- Scroll: schip gebruikt paginacoördinaten en blijft achter kaarten.
- Cursor buiten venster/tab verborgen: schip stopt.
- Take control: WASD werkt; Escape stopt besturing.
- Savewijziging: gekozen schip en galaxy verschijnen na terugkeer.

## Full game

- Route geeft HTTP 200.
- WASD verandert wereldcoördinaten.
- Minimap toont speler en locaties.
- Grote map kan navigatiedoel instellen.
- Broken Beacon is bereikbaar en ontgrendelt Crystal Void.
- Save blijft na refresh bestaan.

## Regressie

- Navigatie en gamekaarten blijven klikbaar.
- Geen game-assets op andere websitepagina's.
- Geen JavaScriptfouten in de browserconsole.
- Cache legen na iedere Twig-, CSS- of JS-update.

## v0.7.0 releasecontrole

- Alle HUD-vakken hebben dezelfde hoogte.
- Close, Escape en Resume sluiten panelen.
- `M` opent de galaxy map.
- Minimap overlapt het flight dock niet.
- Controls-paneel opent en sluit.
- Layout blijft bruikbaar op 620px en 900px breedte.

## v0.8.0 releasecontrole

- Portal toont exact v0.8.0 en opent changelog op klik.
- Galaxybadge opent lorevenster.
- Stille cursor: schip blijft 30 seconden staan en start daarna autopilot.
- Cursor buiten venster: rustige autopilot zonder sprong naar boven.
- Menu toont opvallende EXIT TO SECRET LAB-knop.
- Exit slaat op en opent `/secret-lab`.
- Map vult het beschikbare scherm en ondersteunt wheel-zoom en drag-pan.
- Instellingen blijven na refresh in saveversie 2 staan.

## v0.8.1 stabiliteitscontrole

- Portal heeft alleen Azure Reach, v0.8.1 en Full game; alle drie dezelfde hoogte.
- Azure Reach en v0.8.1 openen een popup.
- Menu is nooit fullscreen.
- Map opent groot maar met marges en een zichtbare Close map-knop.
- Eerst Map, daarna Menu levert een normaal menu op.
- Eerst Menu, daarna Map levert alleen de map op.
- Settings bevat Video, Audio en Controls.
- Exit is een normale knop; bevestiging toont Save & exit.
- Objective overlapt flight dock niet.

## v0.9.0 acceptance tests

- Only `engine/main.js` is loaded for the full game.
- Start screen shows New Game, Continue and Settings in English.
- New Game enters Flight and resets save version 3.
- WASD movement has light inertia and the camera follows smoothly.
- Menu, Map and Settings are mutually exclusive states.
- Escape closes Menu, Map and Settings.
- Map and Menu buttons always respond once.
- Exit saves and returns to `/secret-lab`.
- Invalid save values are clamped by SaveSystem.
