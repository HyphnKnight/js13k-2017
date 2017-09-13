import { dealDamage } from 'battle/actions/utility';
import mergeSort from 'pura/array/mergeSort';
import PanCameraTo from 'battle/actions/PanCameraTo';
import MoveCharacterOnPath from 'battle/actions/MoveCharacterOnPath';
import {
  getNearbyAllies,
  getNearbyEnemies,
  getPathToTarget,
  getGridHexFromVector2d,
} from 'battle/grid';

/* Abilities */

export function* AIAttack(character, nearbyGoodGuys) {
  const [{ abilities: { aiAttack: { damage } } }] = character;
  const target = mergeSort(nearbyGoodGuys, ([, health]) => health)[0];
  dealDamage(target, damage);
  yield* PanCameraTo(target[2]);
  yield;
}


export function* AIDefend(character, nearbyEnemies) {
  const [{ abilities: { aiDefend: { duration, percentage } } }] = character;
  const target = mergeSort(nearbyEnemies, ([, health]) => -health)[0];
  const [, , tPosition, tStatus] = target;
  yield* PanCameraTo(tPosition);
  tStatus.push({ type: `shield`, duration, percentage });
  yield* PanCameraTo(target[2]);
  yield;
}

export function* AIMagic(character, nearbyGoodGuys) {
  const [{ type, abilities: { aiMagic: { effect } } }] = character;
  const target = mergeSort(nearbyGoodGuys, ([, health]) => -health)[0];
  const [tData, , tPosition, tStatus] = target;
  yield* PanCameraTo(tPosition);
  tStatus.push({
    type: type === tData.type
      ? `heal`
      : `damage`,
    effect,
  });
  yield* PanCameraTo(target[2]);
  yield;
}

/* Movement */

const getAIPath = (position, tPosition, range) => {
  const path = getPathToTarget(
    getGridHexFromVector2d(position),
    getGridHexFromVector2d(tPosition)
  ).splice(0, range);
  path.pop();
  return path;
};

export function* AIMove([{ abilities: { aiMove: { range, type } } }, , position]) {
  yield* PanCameraTo(position);
  const goodGuys = mergeSort(
    getNearbyAllies(position, 100),
    ([, , aPosition]) => type
      ? getNearbyEnemies(aPosition, 1).length
      : getNearbyAllies(aPosition, 1).length
  );
  if(goodGuys[0]) yield* MoveCharacterOnPath(position, getAIPath(position, goodGuys[0][2], range));
}

/* Behaviors */

export function* Swarmer(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  if(nearbyGoodGuys.length) yield* AIAttack(character, nearbyGoodGuys);
  else yield* AIMove(character);
  yield;
}

export function* Vamp(character) {
  const [{ abilities: { aiMagic: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  if(nearbyGoodGuys.length) yield* AIMagic(character, nearbyGoodGuys);
  else yield* AIMove(character);
  yield;
}

export function* Skeli(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  const nearbyBadGuys = getNearbyEnemies(position, range);
  if(nearbyGoodGuys.length === 0) {
    yield* AIMove(character);
  } else if(nearbyBadGuys.length > nearbyGoodGuys.length) {
    yield* AIDefend(character, nearbyBadGuys);
  } else {
    yield* AIAttack(character, nearbyGoodGuys);
  }
  yield;
}

export function* Resentment(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  if(nearbyGoodGuys.length === 0) yield* AIMove(character);
  else yield* AIAttack(character, nearbyGoodGuys);
  yield;
}

export function* Deceit(character) {
  const [{ abilities: { aiAttack: { range }, aiMagic: { range: magRange } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  const nearbyBadGuys = getNearbyEnemies(position, range);
  const dotHotable = [...getNearbyAllies(position, magRange), ...getNearbyEnemies(position, magRange)];
  if(nearbyGoodGuys.length > 1) {
    yield* AIAttack(character, nearbyGoodGuys);
  } else if(nearbyBadGuys.length > 1) {
    yield* AIDefend(character, nearbyBadGuys);
  } else if(dotHotable.length) {
    yield* AIMagic(character, [...nearbyGoodGuys, ...nearbyBadGuys]);
  } else {
    yield* AIMove(character);
  }
  yield;
}

export function* Doubt(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range).filter(
    ([, , , statuses]) => statuses.find(({ type }) => type === `damage`)
  );
  if(nearbyGoodGuys.length) yield* AIAttack(character, nearbyGoodGuys);
  yield;
}
