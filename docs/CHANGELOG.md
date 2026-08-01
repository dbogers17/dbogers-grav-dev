# Changelog

Versies volgen SemVer: **major.minor.patch**.

- Major: ingrijpende game- of savewijzigingen.
- Minor: nieuwe gameplayfuncties die compatibel blijven.
- Patch: bugfixes, prestaties en visuele correcties.

## 0.6.0 - 2026-08-01

- Betrouwbare start van de portalgame nadat het Easter egg Secret Lab ontgrendelt.
- Versienummer zichtbaar op portal en full game.
- Dynamischere ruimteachtergrond met nevels, sterrenlagen en pulsaties.
- Projectdocumentatie toegevoegd: architectuur, roadmap, testing en changelog.
- Achterwaartse compatibiliteit met saveversie 2 behouden.

## 0.5.0 - 2026-08-01

- Navigabele wereldcoördinaten, minimap, grote map, locaties en Broken Beacon-quest.
- Schip achter portalkaarten en scrollgebonden positie.

## 0.4.0 - 2026-08-01

- Gedeelde savegame, galaxythema's, hangar, graphicsinstelling en eerste questmelding.

## 0.3.0 - 2026-08-01

- Portalachtergrond, categoriecorrecties en verbeterde scheepsbesturing.

## 0.2.0 - 2026-08-01

- Eerste visuele portalrefresh.

## 0.1.0 - 2026-08-01

- Eerste Grav-integratie met mini-game en aparte full-game route.

## 0.7.0 - First Flight - 2026-08-01

- Eerste grote Early Access UI-make-over.
- HUD-elementen gelijkgetrokken en acties meer ruimte gegeven.
- Betrouwbare globale close-afhandeling voor menu's, maps en dialogen.
- Flight dock met versie, thruststatus en navigatiestatus.
- Controls-paneel en sneltoets `M` voor de galaxy map.
- Grote map, panelen, knoppen, minimap en questmelding visueel vernieuwd.
- Responsieve layouts toegevoegd voor desktop, tablet en mobiel.

## 0.8.0 - Living Sector - 2026-08-01

- Portal-autopilot wacht 30 seconden bij een stille cursor en start direct wanneer de cursor het venster verlaat.
- Cursorvolging versneld en plotselinge beweging naar boven gecorrigeerd.
- Klikbare versiepopup met releasegeschiedenis.
- Klikbare galaxyinformatie met verhaal en verborgen aanwijzingen.
- Duidelijke save-and-exitknop in het gamemenu.
- Fullscreen kaartmodus met zoom en pan.
- Uitgebreide graphics-, FPS-, effecten-, audio- en accessibilityinstellingen.
- Permanente projectrequirements toegevoegd.

## 0.8.1 - Stabilization - 2026-08-01

- Eén centrale UI-state-machine vervangt conflicterende menu-uitbreidingen.
- Map en Menu kunnen elkaar niet meer in fullscreenstatus vasthouden.
- Galaxyknop teruggebracht tot normale HUD-tekstgrootte.
- Fullscreen map gebruikt één stabiele gameplay-overlay met zichtbare Close map-knop.
- Settings verdeeld in Video, Audio en Controls-submenu's.
- Exit teruggebracht tot normale menuknop met aparte bevestiging.
- Objective en flight dock opnieuw uitgelijnd.
- Portal Take Control verwijderd; galaxy, versie en Full game zijn gelijkvormig.
- Portalversie gecorrigeerd naar v0.8.1 met klikbare releasegeschiedenis.

## 0.9.0 - Engine Foundation - 2026-08-01

- Full game replaced by a modular ES6 Canvas engine.
- Fixed-timestep game loop, explicit state machine, central input manager, smooth camera and event bus.
- New English-only start screen: New Game, Continue and Settings.
- One UI manager owns Flight, Menu, Map and Settings states.
- Safe Azure Reach start sector with Neris, Helix Station and nearby points of interest.
- New save version 3; development progress intentionally resets.
- Node smoke tests added for state transitions and save validation.
- Legacy full-game scripts removed from asset registration.

## 0.9.1 - Flight Feel - 2026-08-01

- Version synchronized to v0.9.1 in the engine and Secret Lab portal.
- Closing Settings now returns to Start or Menu instead of entering Flight unexpectedly.
- `M` now toggles the map open and closed.
- Ship uses forward thrust, braking/reverse thrust, turning and lateral damping instead of unrestricted four-direction strafing.
- Ship nose now points toward the mouse/flight direction.
- Azure Reach background upgraded with multi-layer stars, animated nebulae, a distant star, atmospheric planet shading and an asteroid field.

## 0.9.2 - Flight Systems & Save Slots - 2026-08-01

- Three local save slots with required explorer name, unique-name validation in the browser, recovery code and last-saved timestamp.
- Drafted server save API for global names, server backups and recovery.
- Shift boost with energy usage and regeneration.
- Speed, shield, hull and boost HUD.
- Slower acceleration, speed-dependent turning and light A/D lateral thrusters.
- First asteroid and station collision damage model.
- Shield ring around the player ship.
- Larger labelled Close controls.

## 0.10.0 - Docking and Save UX - 2026-08-01

- Start screen renamed to New Game, Load Game and Settings.
- New Game creates the explorer; Load Game only shows existing saves.
- Fixed Menu and Map clicks by stopping per-frame DOM replacement.
- Telemetry now updates only speed, shield, hull and boost values.
- A/D lateral thrusters increased for controlled diagonal movement.
- Boost speed decays gradually instead of snapping to normal maximum speed.
- Shield regenerates after six seconds without damage.
- Save records exact coordinates, damage state, boost and playtime; autosave every fifteen seconds.
- Helix Station docking with E at low speed and full repair service.
