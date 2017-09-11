import { reduce } from 'pura/array';
import mergeSort from 'pura/array/mergeSort';
import { subtract, magnitudeSqr } from 'pura/vector/tuple';
import {
  getNearbyAllies,
  getNearbyEnemies,
  // getMovementOptions,
  getPathToTarget,
  getGridHexFromVector2d,
} from 'battle/grid';
// import UserSelectLocation from 'battle/actions/UserSelectLocation';
import PanCameraTo from 'battle/actions/PanCameraTo';
import MoveCharacterOnPath from 'battle/actions/MoveCharacterOnPath';

export default function* Swarm(character) {
  const [{ abilities: { swarm: { range } } }, , position] = character;
  yield* PanCameraTo(position);
  const badGuys = getNearbyEnemies(position, 10);
  const goodGuys = mergeSort(
    getNearbyAllies(position, 10),
    ([, , position]) => reduce(
      badGuys,
      (total, tPosition) => total + magnitudeSqr(subtract(tPosition, position)),
      0
    )
  );
  const [, , tPosition] = goodGuys[0];
  const path = getPathToTarget(
    getGridHexFromVector2d(position),
    getGridHexFromVector2d(tPosition)
  ).splice(0, range);
  path.pop();
  yield* MoveCharacterOnPath(position, path);
}
