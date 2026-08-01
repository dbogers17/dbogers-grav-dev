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
