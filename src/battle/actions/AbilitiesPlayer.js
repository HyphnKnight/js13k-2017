import {
  getCharacterAtHex,
  getNearbyEnemies,
  getNearbyAllies,
  getNearbyCharacters,
  getNearbyCharacterHexes,
  getPathToTarget,
  getGridHexFromVector2d,
  getMovementOptions,
} from 'battle/grid';
import { dealDamage } from 'battle/actions/utility';
import MoveCharacterOnPath from 'battle/actions/MoveCharacterOnPath';
import UserSelectLocation from 'battle/actions/UserSelectLocation';
import PanCameraTo from 'battle/actions/PanCameraTo';

import { uiElements } from 'ui';
import Menu from 'menu';

function* GetUserSelectTarget(fetch, position, range) {
  const selectedLocation = yield* UserSelectLocation(fetch(position, range));
  return getCharacterAtHex(selectedLocation);
}

export function* Attack([{ abilities: { attack: { damage, range } } }, , position]) {
  const target = yield* GetUserSelectTarget(getNearbyCharacterHexes(getNearbyEnemies), position, range);
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
  const [{ type: tType }, , tPosition, tStatus] = yield* GetUserSelectTarget(getNearbyCharacterHexes(getNearbyCharacters(null)), position, range);
  tStatus.push({
    type: type === tType
      ? `heal`
      : `damage`,
    effect,
  });
  yield* PanCameraTo(tPosition);
}

export function* Item(character) {
  const [{ abilities: { attack, defend, magic, reset } }] = character;
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
    reset.count && [`Remember (${reset.count})`, () => {
      --reset.count;
      selectedAction = Attack;
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
