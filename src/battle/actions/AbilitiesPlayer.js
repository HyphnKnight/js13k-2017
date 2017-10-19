import {
  getCharacterAtHex,
  getNearbyEnemies,
  getNearbyAllies,
  getNearbyCharacters,
  getNearbyCharacterHexes,
  getPathToTarget,
  getGridHexFromVector2d,
  getMovementOptions,
} from '../grid.js';
import { dealDamage } from './utility.js';
import MoveCharacterOnPath from './MoveCharacterOnPath.js';
import UserSelectLocation from './UserSelectLocation.js';
import PanCameraTo from './PanCameraTo.js';

import { uiElements } from '../../ui.js';
import Menu from '../../menu.js';

function* GetUserSelectTarget(fetch, position, range) {
  const options = fetch(position, range);
  if(!options.length) return null;
  const selectedLocation = yield* UserSelectLocation(options);
  return getCharacterAtHex(selectedLocation);
}

export function* Attack([{ abilities: { attack: { damage, range } } }, , position]) {
  const target = yield* GetUserSelectTarget(getNearbyCharacterHexes(getNearbyEnemies), position, range);
  if(!target) return yield* Move(arguments[0]);
  dealDamage(target, damage);
  yield* PanCameraTo(target[2]);
}

export function* Defend([{ abilities: { defend: { range, duration, percentage } } }, , position]) {
  getNearbyAllies(position, range)
    .forEach(([, , , status]) => status.push({
      type: `shield`,
      duration,
      percentage,
    }));
  yield;
}

export function* Magic([{ type, abilities: { magic: { effect, range } } }, , position]) {
  const target = yield* GetUserSelectTarget(getNearbyCharacterHexes(getNearbyCharacters(null)), position, range);
  if(!target) return yield* Move(arguments[0]);
  const [{ type: tType }, , tPosition, tStatus] = target;
  tStatus.push({
    type: type === tType
      ? `heal`
      : `damage`,
    effect,
  });
  yield* PanCameraTo(tPosition);
}

export function* Item(character) {
  const [{ abilities: { attack, defend, magic } }] = character;
  let selectedAction = null;
  const actions = [
    attack.count && [`Abuse (${attack.count})`, () => {
      --attack.count;
      selectedAction = Attack;
    }],
    defend.count && [`Pretend (${defend.count})`, () => {
      --defend.count;
      selectedAction = Defend;
    }],
    magic.count && [`Critique (${magic.count})`, () => {
      --magic.count;
      selectedAction = Magic;
    }],
  ].filter(x => x);

  const menuUIIndex = uiElements.push(Menu(actions)) - 1;
  while(!selectedAction) yield;
  uiElements.splice(menuUIIndex, 1);
  yield* selectedAction(character);
}

export function* Move([{ abilities: { move: { range } } }, , position]) {
  const positionHex = getGridHexFromVector2d(position);
  const selectedLocation = yield* UserSelectLocation(getMovementOptions(positionHex, range));
  yield* PanCameraTo(position);
  yield* MoveCharacterOnPath(position, getPathToTarget(positionHex, selectedLocation));
}
