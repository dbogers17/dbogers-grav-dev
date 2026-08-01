# Architectuur

## Kernregel

Gameplay, rendering en interface hebben gescheiden verantwoordelijkheden. UI gebruikt exact één controller en één actieve mode: `closed`, `menu`, `map`, `settings`, `audio`, `video`, `controls` of `info`.

Deze state-machine voorkomt dat map-layout blijft hangen wanneer Menu opent. Iedere overgang reset de panelclass en panelinhoud.

## Modules

- `full-game.js`: wereld, beweging, locaties, questtrigger en rendering.
- `ui-controller.js`: alle menu-, map-, settings-, lore-, release- en exitstates.
- `mini-game.js`: Portal-rendering en schip.
- `portal-info.js`: Portalversie en galaxyinformatie.
- `save-manager.js`: valideert en bewaart saveversie 2.

## Open-source geleerde patronen

- Eén gamecontroller beheert de hoofdloop en gamestate.
- Menu, playing, paused en game-over zijn expliciete states.
- Input, rendering en UI worden gescheiden.
- Een fixed-timestep is later wenselijk voor consistente physics.
- Nieuwe features worden niet meer als meerdere concurrerende eventlisteners bovenop oude menu's geplaatst.
