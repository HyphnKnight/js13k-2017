import { clear } from 'pura/array';
import {
  getCharacterAtHex,
  getNearbyAllies,
  optionHexes,
} from 'battle/grid';
import Menu from 'menu';
import { controlCamera } from 'camera';
import { uiElements } from 'ui';

export default function* Defend(character) {
  const [{ abilities: { defend: { range, duration, percentage } } }, , position] = character;
  console.log(`1) Detect & Display possible attackers`);
  clear(optionHexes);
  const nearbyTargets = getNearbyAllies(position, range);
  optionHexes.push(...nearbyTargets);
  console.log(`2) Wait for confirmation`);
  let confirmed = false;
  const confirmMenuIndex = uiElements.push(Menu([
    [`Confirm`, () => confirmed = true],
    [`Cancel`, () => { }],
  ])) - 1;
  while(confirmed) yield controlCamera();
  uiElements.splice(confirmMenuIndex, 1);
  console.log(uiElements);
  clear(optionHexes);
  console.log(`3) Add status effect`);
  nearbyTargets
    .map(getCharacterAtHex)
    .filter(x => x)
    .forEach(([, , , status]) => status.push({
      type: `shield`,
      duration,
      percentage,
    }));
  console.log(`4) Play animation`);
}
