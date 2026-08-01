# Architectuur

## Grav

- `pages/06.secret-lab/12.space-explorer/`: Engelstalige Grav-route.
- `theme/quark2-custom/templates/space-explorer.html.twig`: full-game shell.
- `theme/quark2-custom/templates/partials/base.html.twig`: laadt assets alleen voor relevante bodyclasses.

## Client

- `mini-game.js`: start pas nadat `#secret-lab-content` zichtbaar is. De unlockstatus wordt met een MutationObserver gevolgd.
- `full-game.js`: wereldcoördinaten, locaties, minimap, grote map, questtrigger en autosave.
- `save-manager.js`: gedeelde, opgeschoonde en versieerbare save in localStorage.
- `portal-refresh.css`: portal-lagen, transparantie, sticky categorieën en gameversie.
- `full-game.css`: HUD, kaarten en panelen.

## Lagen portal

1. Dynamische galaxy-achtergrond
2. Schip met gedeeltelijke transparantie
3. Websitecontent, banners en kaarten
4. Sticky categorieën, header en bediening

## Save

Sleutel: `secretLabSpaceSaveV2`.

Belangrijkste velden: pilotName, galaxy, ship, shipColor, shield, hull, credits, points, kills, skills, discovered, quests en settings.
