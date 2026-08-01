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

## v0.9.1 acceptance tests

- Portal and start screen both show v0.9.1.
- Start → Settings → Close returns to Start.
- Menu → Settings → Close returns to Menu.
- M opens Map from Flight and closes Map back to Flight.
- W applies forward thrust in the direction of the ship nose.
- S brakes and then applies limited reverse thrust.
- A/D adjust heading; lateral drift decays faster than forward motion.
- Ship nose follows mouse direction smoothly.
- Azure Reach shows nebulae, varied stars, Neris, asteroid silhouettes and a distant star.

## v0.9.2 acceptance tests

- Maximum three slots; duplicate browser-local names are rejected case-insensitively.
- Recovery code and last-saved timestamp appear in save list and game menu.
- Shift boost drains and regenerates boost.
- Speed HUD updates while flying.
- Shield absorbs regular collision damage before hull.
- High-speed asteroid collision can damage hull.
- Destroyed ship respawns at Helix Station.
- Close buttons use readable text and larger hit targets.

## v0.10.0 acceptance tests

- Start screen shows New Game, Load Game and Settings.
- Load Game never creates a new explorer.
- Menu and Map buttons remain clickable during continuous rendering.
- Save and autosave preserve exact coordinates and ship condition.
- A/D provide stronger lateral thrust without replacing mouse steering.
- Boost speed decays gradually after Shift is released.
- Shield starts regenerating six seconds after the last collision.
- At low speed near Helix Station, E opens Docked; Repair Ship restores all vitals.

## v0.10.1 acceptance tests

- Releasing Shift above 500 u/s causes a gradual coast-down, without an immediate speed snap.
- A/D lateral movement is noticeably stronger than v0.10.0.
- New explorer starts next to Helix Station and outside collision geometry.
- Docking circle is visible around the station.
- Dock prompt appears inside the radius and disappears outside it.
- E docks only while nearby and below 55 u/s.
- Helix Station has visible rings, hub, dock arm, shield glow and animated lights.

## v0.11.0 acceptance tests

- Docking enters Station state and no Flight controls continue in the background.
- WASD moves the explorer marker and walls block movement.
- E near each counter triggers only that shop or NPC.
- Repair Workshop restores hull, shield and boost.
- Return to Ship and Escape undock at the safe spawn point.
- Autosave remains active while inside the station.
- Map, Menu and Station never render simultaneously.

## v0.11.4 acceptance tests

- Cruise and diagonal thrust remain at or below 500 u/s.
- Shift produces BOOST, speeds above 500, purple dual-engine exhaust and energy drain.
- Releasing Shift produces COAST and returns to 500 within several seconds even while W remains held.
- Ship has visible layered hull, cockpit, wings, two engines, navigation lights and shield volume.
- Asteroids have irregular silhouettes, directional shading, shadows and craters.
- Station shops have raised shells, counters, vents, shadows, lights and recognizable NPC bodies.

## v0.11.5 acceptance tests

- New Game opens character builder and every arrow updates the live astronaut preview.
- Randomize produces valid options and Create Explorer stores appearance in the slot.
- Saved astronaut appearance is used in Helix Station.
- Helix Station exterior has a central core, multiple arms, lights and attached substation.
- At least five traffic ships move around the safe sector.
- Asteroids cover several broad regions while leaving safe space around Helix.
- Map identifies station, outposts, mission, field, gate, safe zone and route.
