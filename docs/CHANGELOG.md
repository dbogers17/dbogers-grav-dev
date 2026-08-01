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

## 0.10.1 - Helix Approach - 2026-08-01

- Boost velocity now coasts down gradually instead of being clamped immediately to normal maximum speed.
- A/D lateral thrusters increased by 15 units, from 235 to 250.
- New explorers spawn beside Helix Station instead of inside its collision body.
- Existing saves found inside the station are moved to the safe spawn point.
- Helix Station enlarged and redesigned with pseudo-3D rings, central hub, docking arm, shield glow and animated navigation lights.
- Visible docking radius and proximity prompt: Press E to dock.
- Docking requires proximity and low speed.
- Asteroids receive stronger pseudo-3D lighting and shading.

## 0.10.2 - Helix Approach Hotfix - 2026-08-01

- Fixed the extra closing brace in `RenderSystem.js` that prevented the entire ES module graph from loading.
- Added release-blocking syntax validation to the hotfix checks.
- No gameplay or save data changes.

## 0.11.0 - Station Hub - 2026-08-01

- Docking now enters a separate top-down Helix Station scene.
- Simple explorer character moves with WASD.
- E interacts with staff and terminals near shop counters.
- Added Repair Workshop, Trade Market, Equipment Shop and Mission Terminal.
- Repair Workshop immediately restores ship hull, shield and boost.
- Industrial station art direction with tiled floors, walls, corridors, cyan lights, crates, central reactor and shop counters.
- Return to Ship and Escape safely undock beside Helix Station.
- Station scene remains isolated from Flight, Map and Menu states.

## 0.11.1 - Station Hub Hotfix - 2026-08-01

- Fixed the missing closing brace in `UIManager.render()` that prevented the engine from loading.
- Added a mandatory local release validator for every Space Explorer JavaScript module.
- Added import validation, version consistency checks, required-module checks and legacy-runtime detection.
- Added GitHub Actions validation for every relevant push and pull request.
- No save data or gameplay changes.

## 0.11.2 - Validator Compatibility Hotfix - 2026-08-01

- Marked the engine directory as an ES module package for Node validation.
- Added an explicit Node.js 20+ release requirement.
- Updated smoke tests to avoid legacy parser incompatibilities.
- Preserved and revalidated the v0.11.1 UIManager syntax repair.

## 0.11.4 - Visual Flight Systems - 2026-08-01

- Replaced the failed v0.11.3 coast model with a decreasing total-speed ceiling that cannot be offset by held thrust.
- Added deterministic tests for cruise, diagonal thrust, boost and coast-down.
- Redesigned the player ship with layered hull shading, wings, cockpit glass, navigation lights, dual engines and shield volume.
- Redesigned asteroids with irregular silhouettes, directional lighting, shadows and crater layers.
- Increased Station Hub depth with raised shop shells, vents, illuminated counters, shadows and more character-like NPC sprites.

## 0.11.5 - World Depth and Explorer Builder - 2026-08-01

- Added an English astronaut character builder with live preview, unique name, suit type, colors, helmet, visor, backpack, accents and Randomize.
- Explorer appearance is stored per save slot and used inside stations.
- Added modular astronaut, station and traffic renderers.
- Replaced Helix exterior with a central core, multiple asymmetric arms, docking modules, lights and attached satellite station.
- Added transports, patrol, mining and vendor traffic around the safe starting sector.
- Added Azure Relay and Cobalt Mining Post.
- Expanded deterministic asteroid generation to four large clusters with varied sizes.
- Rebuilt the galaxy map with object types, safe zone, route line, selected destination, distance, threat and legend.

## 0.12.2 - Industrial Universe Vertical Slice - 2026-08-01

- Added original industrial rendering foundation for distinct hauler, miner, vendor, patrol and maintenance silhouettes.
- Rebuilt Helix data as a large functional hub with outposts, routes and broader asteroid regions.
- Added deterministic NPC traffic waypoints instead of circular orbit motion.
- Added dark-space palette and background asteroid parallax layer.
- Added credits, cargo capacity, inventory items, prices and ship upgrade definitions.
- Added main-story and repeatable contract data with serializable mission progress.
- Added persistent navigation destination, bearing, distance and ETA HUD summary.
- Added interactive tactical-map engine with pan, zoom, coordinates, grid, object selection and double-click destination support.
- Added multiple-galaxy data foundation and authoritative multiplayer architecture documentation.

## 0.12.3 - Faction Art Foundation - 2026-08-01

- Replaced the diagram-like Helix exterior with a high-resolution top-down rich-faction station asset.
- Added modular faction-style definitions for Helix Cooperative, Frontier Union, Free Corsairs and Asterion Dynamics.
- Defined distinct visual module sets for haulers, miners, vendors, patrol craft and maintenance craft.
- Added infinite deterministic tiled starfields so deep space never becomes empty while travelling.
- Added persistent distant sun, dust clouds, gas fields and background asteroid silhouettes.
- Fixed the flight HUD to remain on one row with Menu anchored at the far right.

## 0.12.4 - Unified Faction Art - 2026-08-01

- Added Helix Cooperative raster atlases for fleet classes, astronaut roles, celestial bodies and station interiors.
- Added distinct hauler, miner, vendor, patrol and maintenance artwork regions.
- Added richer explorer, engineer, salvager and pilot astronaut definitions with visible backpacks.
- Added faction-consistent gas giant, rocky worlds, sun, nebula and asteroid-cluster art.
- Added detailed docking bay, mission terminal and modular prop artwork.
- Reduced starfield density and background asteroid count for cleaner readability.
- Fixed background object distribution to avoid vertical streak-like formations.
- Added stable integer-aligned station rendering to reduce texture shimmer while moving.
- Replaced the old map markup with an interactive tactical grid canvas with pan, zoom and coordinates.

## 0.12.5 - Integration Recovery - 2026-08-01

- Replaced the active legacy map branch with the interactive tactical canvas.
- Added map pan, wheel zoom, toolbar zoom, centering, coordinates, traffic, asteroids and double-click destinations.
- Added in-flight camera zoom from 70% to 160% with mouse wheel and Home reset.
- Replaced the active character preview with faction atlas artwork and added Helmet: None.
- Connected live TrafficSystem positions to visible faction ship sprites.
- Added cached integer-aligned Helix rendering to reduce shimmer and blur during camera movement.
- Added exclusion space around large planets and reduced overlapping celestial clutter.
- Improved the start panel and separated its visual hierarchy from the active flight HUD.

## 0.12.6 - Runtime Consolidation - 2026-08-01

- Removed obsolete renderer instances from the active world pipeline.
- Stopped mutating static Azure Reach content with runtime traffic state.
- Connected TrafficSystem directly to the single active RenderSystem.
- Isolated start, save and creator screens from active world rendering.
- Split planetary rings into rear and front passes.
- Consolidated asteroid, planet, traffic, station and background draw order.

## 0.13.0 - Clean Runtime Rebuild - 2026-08-01

- Split generated art atlases into individual transparent runtime assets.
- Replaced Suit Type with Skill Type and added role explanations and starting bonuses.
- Preserved explorer name while changing creator options.
- Replaced the player ship, NPC ships, planet, creator and docking bay with individual faction assets.
- Applied camera zoom to world positions and object sizes.
- Added an in-flight destination route, edge arrow, distance, bearing and ETA.
- Made the tactical map full-screen.
- Replaced hard station bounce with soft collision damping.
- Removed obsolete renderer files from the active runtime.

## 0.13.1 - Asset and UI Recovery - 2026-08-01

- Added creator Front, Side and Back views with reliable preloading.
- Removed active legacy atlas renderers and broad legacy sheets.
- Replaced station grid and procedural counters with the docking-bay artwork and interaction zones.
- Added separated seeded stars and distant background asteroids.
- Made the tactical map viewport truly full-screen while traffic simulation remains active.
- Added a flight minimap with stations, traffic, asteroids and destination.
- Rendered outposts and relays as scaled physical station modules instead of dots.
- Added SHA-256 release integrity verification.

## 0.13.2 - Pilot Creator Rebuild - 2026-08-01

- Replaced the previous creator renderer and creator layout instead of patching it.
- Added twelve dedicated pilot view assets: four skills with Front, Side and Back views.
- Made suit coating, helmet module, visor spectrum, backpack system and identification lights visibly alter the preview.
- Replaced arrow-only controls with direct labeled loadout selectors.
- Added a cinematic Helix Station start scene with a ringed planet and animated ship traffic.

## 0.13.3 - Menu Visual Consistency - 2026-08-01

- Replaced abstract CSS triangles on the home screen with the actual Helix patrol, hauler and maintenance ship assets.
- Fixed the Space Explorer title wrapping and orphaned final letter on wide displays.
- Applied the cinematic station background and dark visual shell to Start, Load, Creator and Settings.
- Added state-specific visual regression assertions for the complete pre-game menu flow.
